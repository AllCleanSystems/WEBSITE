const OPENAI_URL = "https://api.openai.com/v1/responses";
const ZOHO_TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";

function clean(v) {
  return v === null || v === undefined ? "" : String(v).trim();
}

function mapServiceType(value) {
  const key = clean(value).toLowerCase();
  const map = {
    "restaurant hood cleaning": "Hood Cleaning",
    "hood cleaning": "Hood Cleaning",
    "carpet cleaning": "Carpet Cleaning",
    "window cleaning": "Window Cleaning",
    "commercial cleaning": "Commercial Cleaning",
    "lawn care": "Lawn Care",
    "lawn maintenance": "Lawn Care",
    "snow removing": "Snow Removing",
    "snow removal": "Snow Removing",
    "pressure washer": "Pressure Washer",
    "pressure washing": "Pressure Washer",
    "deep cleaning": "Deep Cleaning",
    "degreasing": "Degreasing"
  };
  return map[key] || clean(value) || "Other";
}

function mapUrgency(value) {
  const key = clean(value).toLowerCase();
  const map = {
    emergency: "Emergency",
    high: "High",
    normal: "Normal",
    low: "Low"
  };
  return map[key] || (clean(value) ? clean(value) : "Normal");
}

function extractText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }
  const out = Array.isArray(data?.output) ? data.output : [];
  const parts = [];
  for (const item of out) {
    if (item?.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) {
        if (typeof c?.text === "string" && c.text.trim()) parts.push(c.text);
      }
    } else if (typeof item?.text === "string" && item.text.trim()) {
      parts.push(item.text);
    }
  }
  return parts.join("").trim();
}

function parseJsonMaybeWrapped(text) {
  if (!text || typeof text !== "string") return null;
  try {
    return JSON.parse(text);
  } catch (_) {}
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch (_) {}
  }
  return null;
}

function mergeIntake(base, patch) {
  const out = { ...(base || {}) };
  if (patch && typeof patch === "object") {
    for (const key of Object.keys(patch)) {
      const val = patch[key];
      if (val !== undefined && val !== null && String(val).trim() !== "") {
        out[key] = String(val).trim();
      }
    }
  }
  return out;
}

function missingRequired(intake) {
  const missing = [];
  if (!clean(intake.customer_name)) missing.push("customer_name");
  if (!clean(intake.address)) missing.push("address");
  if (!clean(intake.service_type)) missing.push("service_type");
  if (!clean(intake.urgency)) missing.push("urgency");
  if (!clean(intake.request_summary)) missing.push("request_summary");
  if (!clean(intake.preferred_window)) missing.push("preferred_window");
  if (!clean(intake.phone) && !clean(intake.email)) missing.push("contact");
  return missing;
}

async function getZohoAccessToken() {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token"
  });
  const r = await fetch(`${ZOHO_TOKEN_URL}?${params.toString()}`, { method: "POST" });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error(j.error || "Zoho token error");
  return j.access_token;
}

async function createZohoIntake(intake) {
  const owner = process.env.ZOHO_ACCOUNT_OWNER_NAME;
  const app = process.env.ZOHO_APP_LINK_NAME;
  const form = process.env.ZOHO_FORM_LINK_NAME;
  if (!owner || !app || !form) {
    throw new Error("Missing Zoho Creator env vars (owner/app/form).");
  }

  const token = await getZohoAccessToken();
  const url = `https://www.zohoapis.com/creator/v2.1/data/${owner}/${app}/form/${form}`;

  const payload = {
    data: {
      Name: clean(intake.customer_name),
      Phone: clean(intake.phone),
      Email: clean(intake.email),
      Address: clean(intake.address),
      Service_Type: mapServiceType(intake.service_type),
      Urgency: mapUrgency(intake.urgency),
      Preferred_Date: clean(intake.preferred_window),
      Message: clean(intake.request_summary),
      Source: "Website Chat",
      Session_ID: clean(intake.chat_session_id)
    }
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(result?.message || "Zoho create failed");
  }
  return result;
}

async function callOpenAI({ instructions, inputText }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  const r = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions,
      input: [{ role: "user", content: [{ type: "input_text", text: inputText }] }],
      max_output_tokens: 380,
      store: false
    })
  });

  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.error?.message || `OpenAI error (HTTP ${r.status})`);
  return j;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const message = clean(body.message);
    const chatSessionId = clean(body.chatSessionId);
    const knownIntake = body.knownIntake && typeof body.knownIntake === "object" ? body.knownIntake : {};
    const intakeAlreadySubmitted = Boolean(body.intakeAlreadySubmitted);
    const chatTranscript = clean(body.chatTranscript);

    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Message is required." }) };
    }

    const agent = process.env.WEBSITE_AGENT_INSTRUCTIONS ||
      "You are All Clean Solutions (ACS) website assistant. Ask one concise question at a time.";

    const contract = [
      "Return ONLY valid JSON. No extra text.",
      "KNOWN_INTAKE fields are already collected. Do NOT ask for them again.",
      "If intakeAlreadySubmitted=true, set create_intake=false.",
      "Required before submit: customer_name, (phone or email), address, service_type, urgency, request_summary, preferred_window.",
      "JSON schema:",
      "{",
      '  \"reply\":\"string\",',
      '  \"create_intake\":true/false,',
      '  \"intake_patch\":{\"customer_name\":\"\",\"phone\":\"\",\"email\":\"\",\"address\":\"\",\"service_type\":\"\",\"urgency\":\"\",\"request_summary\":\"\",\"preferred_window\":\"\"},',
      '  \"end_chat\":true/false',
      "}"
    ].join("\n");

    const inputText =
      `KNOWN_INTAKE:\n${JSON.stringify(knownIntake)}\n` +
      `intakeAlreadySubmitted: ${intakeAlreadySubmitted ? "true" : "false"}\n\n` +
      `Customer: ${message}`;

    const ai = await callOpenAI({ instructions: `${agent}\n\n${contract}`, inputText });
    const text = extractText(ai);
    const parsed = parseJsonMaybeWrapped(text);

    if (!parsed || typeof parsed !== "object") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          reply: text || "Thanks. Can you share your name and best contact number?",
          intake: knownIntake,
          intakeCreated: false,
          endChat: false
        })
      };
    }

    const patch = parsed.intake_patch && typeof parsed.intake_patch === "object" ? parsed.intake_patch : {};
    const intake = mergeIntake(knownIntake, patch);
    intake.channel = "Website Chat";
    intake.chat_session_id = chatSessionId || clean(intake.chat_session_id);
    intake.service_type = mapServiceType(intake.service_type);
    intake.urgency = mapUrgency(intake.urgency);

    const missing = missingRequired(intake);

    if (intakeAlreadySubmitted) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          reply: clean(parsed.reply) || "Got it. Anything else to add?",
          intake,
          intakeCreated: false,
          endChat: false,
          missing
        })
      };
    }

    if (missing.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          reply: clean(parsed.reply) || `Quick question: what is your ${missing[0].replace("_", " ")}?`,
          intake,
          intakeCreated: false,
          endChat: false,
          missing
        })
      };
    }

    if (!parsed.create_intake) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          reply: clean(parsed.reply) || "Please confirm you want me to submit this request.",
          intake,
          intakeCreated: false,
          endChat: false,
          missing: []
        })
      };
    }

    if (chatTranscript) {
      const clipped = chatTranscript.length > 2500 ? chatTranscript.slice(chatTranscript.length - 2500) : chatTranscript;
      intake.request_summary = `${clean(intake.request_summary)}\n\nChat Transcript:\n${clipped}`.trim();
    }

    const zoho = await createZohoIntake(intake);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        reply: clean(parsed.reply) || "Perfect. I submitted your request.",
        intake,
        intakeCreated: true,
        endChat: parsed.end_chat === true,
        missing: [],
        zoho
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: e.message || "Server error" })
    };
  }
};
