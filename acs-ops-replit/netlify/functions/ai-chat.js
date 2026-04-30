const OPENAI_URL = "https://api.openai.com/v1/responses";
const ZOHO_TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";

function envFirst(...keys) {
  for (const k of keys) {
    const v = process.env[k];
    if (v && String(v).trim()) return String(v).trim();
  }
  return "";
}

function cleanRefreshToken(raw) {
  const t = String(raw || "").trim();
  if (!t) return "";
  return t.split(/\s+/)[0];
}


async function getZohoAccessToken() {
  const params = new URLSearchParams({
    refresh_token: cleanRefreshToken(envFirst("ZOHO_REFRESH_TOKEN")),
    client_id: envFirst("ZOHO_CLIENT_ID"),
    client_secret: envFirst("ZOHO_CLIENT_SECRET"),
    grant_type: "refresh_token"
  });
  const r = await fetch(`${ZOHO_TOKEN_URL}?${params.toString()}`, { method: "POST" });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error(j.error || "Zoho token error");
  return j.access_token;
}

function extractText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  const out = Array.isArray(data?.output) ? data.output : [];
  const parts = [];
  for (const item of out) {
    if (item?.type === "message" && Array.isArray(item.content)) {
      for (const c of item.content) if (typeof c?.text === "string") parts.push(c.text);
    } else if (typeof item?.text === "string") {
      parts.push(item.text);
    }
  }
  return parts.join("").trim();
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const { message = "", sessionId = "", transcript = "" } = body;
    if (!message.trim()) return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Message required" }) };

    const instructions = process.env.WEBSITE_AGENT_INSTRUCTIONS ||
      "You are All Clean Solutions assistant. Be concise, friendly, and collect job intake details.";

    const openaiResp = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions,
        input: transcript
          ? `Conversation:\n${transcript}\n\nCustomer: ${message}`
          : message,
        max_output_tokens: 350,
        store: false
      })
    });

    const openaiData = await openaiResp.json();
    if (!openaiResp.ok) {
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: openaiData?.error?.message || "OpenAI error" }) };
    }

    const reply = extractText(openaiData) || "Thanks. Can you share your name and best contact number?";

    if (process.env.CHAT_LOG_FORM_LINK_NAME) {
      try {
        const token = await getZohoAccessToken();
        const owner = envFirst("ZOHO_ACCOUNT_OWNER_NAME", "ZOHO_CREATOR_OWNER");
        const app = envFirst("ZOHO_APP_LINK_NAME", "ZOHO_CREATOR_APP_LINK");
        const form = process.env.CHAT_LOG_FORM_LINK_NAME;
        const url = `https://www.zohoapis.com/creator/v2.1/data/${owner}/${app}/form/${form}`;

        await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              Session_ID: sessionId || `web_${Date.now()}`,
              User_Message: message,
              AI_Reply: reply,
              Transcript: transcript || "",
              Source: "Website Chat"
            }
          })
        });
      } catch (_) {}
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, reply }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: e.message }) };
  }
};
