export function getOpenPhoneConfigStatus() {
  const hasApiKey = Boolean(process.env.OPENPHONE_API_KEY);
  return {
    configured: hasApiKey,
    missing: hasApiKey ? [] : ["OPENPHONE_API_KEY"],
  };
}

export async function listOpenPhoneMessages(limit = 25) {
  const apiKey = process.env.OPENPHONE_API_KEY;
  if (!apiKey) {
    return { success: false as const, error: "Missing OPENPHONE_API_KEY" };
  }

  const url = new URL("https://api.openphone.com/v1/messages");
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: apiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false as const, error: `OpenPhone request failed (${res.status}): ${text}` };
  }

  const json = await res.json();
  return { success: true as const, data: json };
}
