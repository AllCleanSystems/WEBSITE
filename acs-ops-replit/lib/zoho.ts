export function getZohoConfigStatus() {
  const required = [
    "ZOHO_CLIENT_ID",
    "ZOHO_CLIENT_SECRET",
    "ZOHO_REFRESH_TOKEN",
    "ZOHO_ORG_ID",
  ] as const;

  const missing = required.filter((key) => !process.env[key]);
  return {
    configured: missing.length === 0,
    missing,
  };
}

export async function fetchZohoAccessToken() {
  const { configured, missing } = getZohoConfigStatus();
  if (!configured) {
    return { success: false as const, error: `Missing env vars: ${missing.join(", ")}` };
  }

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN as string,
    client_id: process.env.ZOHO_CLIENT_ID as string,
    client_secret: process.env.ZOHO_CLIENT_SECRET as string,
    grant_type: "refresh_token",
  });

  const res = await fetch(`https://accounts.zoho.com/oauth/v2/token?${params.toString()}`, {
    method: "POST",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false as const, error: `Zoho token refresh failed (${res.status}): ${text}` };
  }

  const json = await res.json();
  return { success: true as const, accessToken: json.access_token as string };
}
