const ZOHO_TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";

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

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const {
      name = "", phone = "", email = "", serviceType = "",
      address = "", preferredDate = "", message = ""
    } = body;

    if (!name.trim()) return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Name required" }) };
    if (!phone.trim() && !email.trim()) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Phone or email required" }) };
    }

    const accessToken = await getZohoAccessToken();

    const owner = process.env.ZOHO_ACCOUNT_OWNER_NAME;
    const app = process.env.ZOHO_APP_LINK_NAME;
    const form = process.env.ZOHO_FORM_LINK_NAME;

    const creatorUrl = `https://www.zohoapis.com/creator/v2.1/data/${owner}/${app}/form/${form}`;

    const data = {
      data: {
        Name: name,
        Phone: phone,
        Email: email,
        Service_Type: serviceType,
        Address: address,
        Preferred_Date: preferredDate,
        Message: message,
        Source: "Website Form"
      }
    };

    const resp = await fetch(creatorUrl, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await resp.json();

    if (!resp.ok) {
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Zoho create failed", debug: result }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, result }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: e.message }) };
  }
};
