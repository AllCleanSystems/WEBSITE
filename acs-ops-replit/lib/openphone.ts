export function getOpenPhoneConfigStatus() {
  const hasApiKey = Boolean(process.env.OPENPHONE_API_KEY);
  return {
    configured: hasApiKey,
    missing: hasApiKey ? [] : ["OPENPHONE_API_KEY"],
  };
}

const OPENPHONE_TIMEOUT_MS = 8000;

function buildAuthHeaders(apiKey: string) {
  return [
    { Authorization: apiKey, Accept: "application/json" },
    { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
  ];
}

export async function listOpenPhoneMessages(limit = 25) {
  const apiKey = process.env.OPENPHONE_API_KEY;
  if (!apiKey) {
    return { success: false as const, error: "Missing OPENPHONE_API_KEY" };
  }

  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(100, Math.trunc(limit))) : 25;
  const url = new URL("https://api.openphone.com/v1/messages");
  url.searchParams.set("limit", String(safeLimit));

  let lastError = "OpenPhone request failed";

  for (const headers of buildAuthHeaders(apiKey)) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), OPENPHONE_TIMEOUT_MS);

    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        headers,
        cache: "no-store",
        signal: controller.signal,
      });

      if (res.ok) {
        const json = await res.json();
        return { success: true as const, data: json };
      }

      const text = await res.text();
      lastError = `OpenPhone request failed (${res.status}): ${text}`;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      lastError = msg.includes("aborted")
        ? "OpenPhone request timed out"
        : `OpenPhone request error: ${msg}`;
    } finally {
      clearTimeout(timeout);
    }
  }

  return { success: false as const, error: lastError };
}
