import net from "node:net";
import tls from "node:tls";

type WebsiteLeadInput = {
  leadId: string;
  name: string;
  email?: string;
  phone: string;
  serviceType: string;
  message?: string;
  smsConsent: boolean;
  sourcePage?: string;
  consentTimestamp: Date;
  ipAddress: string | null;
  userAgent: string | null;
};

type DeliveryResult =
  | { ok: true; skipped?: false; message: string }
  | { ok: false; skipped?: false; message: string }
  | { ok: true; skipped: true; message: string };

function envValue(key: string) {
  return String(process.env[key] ?? "").trim();
}

function requiredEmailEnv() {
  const keys = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "QUOTE_NOTIFICATION_EMAIL"] as const;
  return keys.filter((key) => !envValue(key));
}

function headerSafe(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function htmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatEmail(input: WebsiteLeadInput) {
  const lines = [
    ["Name", input.name],
    ["Phone", input.phone],
    ["Email", input.email || "(not provided)"],
    ["Service Type", input.serviceType],
    ["Message", input.message || "(none provided)"],
    ["SMS Consent", input.smsConsent ? "Yes" : "No"],
    ["Consent Time", input.consentTimestamp.toISOString()],
    ["Source Page", input.sourcePage || "/contact"],
    ["Lead ID", input.leadId],
    ["IP Address", input.ipAddress || "Unavailable"],
    ["User Agent", input.userAgent || "Unavailable"],
  ];

  const text = [
    "New website quote request",
    "",
    ...lines.map(([label, value]) => `${label}: ${value}`),
    "",
    "Next step: open the ACS app or Zoho CRM, review the request, and contact the customer.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#10213f">
      <h2 style="margin:0 0 12px">New website quote request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        ${lines
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #d8e1ef;padding:8px;font-weight:bold;background:#f7fafc">${htmlEscape(label)}</td>
                <td style="border:1px solid #d8e1ef;padding:8px">${htmlEscape(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <p style="margin-top:16px">Next step: open the ACS app or Zoho CRM, review the request, and contact the customer.</p>
    </div>
  `;

  return { text, html };
}

function encodeBase64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}

function createBoundary() {
  return `acs-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeRecipients(value: string) {
  return value
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function smtpConnect(host: string, port: number, secure: boolean, timeoutMs: number) {
  return new Promise<net.Socket>((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host })
      : net.connect({ host, port });

    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error("SMTP connection timed out."));
    }, timeoutMs);

    socket.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    socket.once("connect", () => {
      clearTimeout(timer);
      resolve(socket);
    });
  });
}

function createSmtpSession(socket: net.Socket, timeoutMs: number) {
  let buffer = "";
  const pending: Array<(line: string) => void> = [];

  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    while (buffer.includes("\n")) {
      const idx = buffer.indexOf("\n");
      const line = buffer.slice(0, idx + 1);
      buffer = buffer.slice(idx + 1);
      const next = pending.shift();
      if (next) next(line);
    }
  });

  function readLine() {
    return new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("SMTP response timed out.")), timeoutMs);
      pending.push((line) => {
        clearTimeout(timer);
        resolve(line.replace(/\r?\n$/, ""));
      });
    });
  }

  async function readResponse() {
    const lines: string[] = [];
    while (true) {
      const line = await readLine();
      lines.push(line);
      if (/^\d{3} /.test(line)) break;
    }
    const last = lines[lines.length - 1] ?? "";
    const code = Number(last.slice(0, 3));
    return { code, text: lines.join("\n") };
  }

  async function command(commandText: string, expected: number | number[]) {
    socket.write(`${commandText}\r\n`);
    const response = await readResponse();
    const expectedCodes = Array.isArray(expected) ? expected : [expected];
    if (!expectedCodes.includes(response.code)) {
      throw new Error(`SMTP command failed (${response.code}): ${response.text}`);
    }
    return response;
  }

  return { readResponse, command };
}

async function sendSmtpEmail(options: {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}) {
  const timeoutMs = Number(process.env.SMTP_TIMEOUT_MS || "15000");
  const socket = await smtpConnect(options.host, options.port, options.secure, timeoutMs);
  let session = createSmtpSession(socket, timeoutMs);

  try {
    await session.readResponse();
    await session.command("EHLO acsbismarck.com", 250);

    if (!options.secure && envValue("SMTP_STARTTLS").toLowerCase() !== "false") {
      await session.command("STARTTLS", 220);
      const secureSocket = tls.connect({ socket, servername: options.host });
      session = createSmtpSession(secureSocket, timeoutMs);
      await session.command("EHLO acsbismarck.com", 250);
    }

    await session.command("AUTH LOGIN", 334);
    await session.command(encodeBase64(options.username), 334);
    await session.command(encodeBase64(options.password), 235);

    await session.command(`MAIL FROM:<${options.from}>`, 250);
    for (const recipient of options.to) {
      await session.command(`RCPT TO:<${recipient}>`, [250, 251]);
    }

    const boundary = createBoundary();
    const headers = [
      `From: ${headerSafe(options.from)}`,
      `To: ${options.to.map(headerSafe).join(", ")}`,
      options.replyTo ? `Reply-To: ${headerSafe(options.replyTo)}` : "",
      `Subject: ${headerSafe(options.subject)}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ].filter(Boolean);

    const body = [
      ...headers,
      "",
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
      options.text,
      "",
      `--${boundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
      options.html,
      "",
      `--${boundary}--`,
      "",
    ].join("\r\n");

    await session.command("DATA", 354);
    socket.write(`${body}\r\n.\r\n`);
    const response = await session.readResponse();
    if (response.code !== 250) {
      throw new Error(`SMTP DATA failed (${response.code}): ${response.text}`);
    }

    await session.command("QUIT", 221).catch(() => undefined);
  } finally {
    socket.destroy();
  }
}

export async function sendWebsiteQuoteEmail(input: WebsiteLeadInput): Promise<DeliveryResult> {
  const missing = requiredEmailEnv();
  if (missing.length > 0) {
    return {
      ok: true,
      skipped: true,
      message: `Email skipped. Missing env vars: ${missing.join(", ")}`,
    };
  }

  const host = envValue("SMTP_HOST");
  const port = Number(envValue("SMTP_PORT") || "465");
  const secure = envValue("SMTP_SECURE")
    ? envValue("SMTP_SECURE").toLowerCase() === "true"
    : port === 465;
  const from = envValue("QUOTE_NOTIFICATION_FROM") || envValue("SMTP_USER");
  const to = normalizeRecipients(envValue("QUOTE_NOTIFICATION_EMAIL"));
  const { text, html } = formatEmail(input);

  try {
    await sendSmtpEmail({
      host,
      port,
      secure,
      username: envValue("SMTP_USER"),
      password: envValue("SMTP_PASS"),
      from,
      to,
      replyTo: input.email || undefined,
      subject: `New website quote request: ${input.serviceType} - ${input.name}`,
      text,
      html,
    });
    return { ok: true, message: `Email sent to ${to.join(", ")}.` };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Email send failed.",
    };
  }
}

export async function forwardWebsiteLeadToApp(input: WebsiteLeadInput): Promise<DeliveryResult> {
  const url = envValue("WEBSITE_LEAD_WEBHOOK_URL");
  if (!url) {
    return { ok: true, skipped: true, message: "New app webhook skipped. WEBSITE_LEAD_WEBHOOK_URL is not set." };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-acs-source": "public-website",
  };
  const secret = envValue("WEBSITE_LEAD_WEBHOOK_SECRET");
  if (secret) headers.Authorization = `Bearer ${secret}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event: "website_quote_request_submitted",
        lead: {
          ...input,
          consentTimestamp: input.consentTimestamp.toISOString(),
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return { ok: false, message: `New app webhook failed (${response.status}): ${text.slice(0, 300)}` };
    }

    return { ok: true, message: "New app webhook accepted the website lead." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "New app webhook failed.",
    };
  }
}
