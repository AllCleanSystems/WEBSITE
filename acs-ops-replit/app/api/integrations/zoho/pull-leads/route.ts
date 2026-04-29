import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchZohoAccessToken } from "@/lib/zoho";
import { logAutomation } from "@/lib/workflows";

export async function POST() {
  const token = await fetchZohoAccessToken();
  if (!token.success) {
    return NextResponse.json({ success: false, error: token.error }, { status: 400 });
  }

  const res = await fetch("https://www.zohoapis.com/crm/v2/Leads?per_page=25", {
    headers: { Authorization: `Zoho-oauthtoken ${token.accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ success: false, error: `Zoho CRM request failed (${res.status}): ${text}` }, { status: 400 });
  }

  const json = await res.json();
  const leads = Array.isArray(json.data) ? json.data : [];

  let created = 0;
  for (const item of leads) {
    const name = [item.First_Name, item.Last_Name].filter(Boolean).join(" ").trim() || item.Company || "Unnamed Lead";
    const source = item.Lead_Source || "Zoho CRM";
    const email = item.Email || undefined;
    const phone = item.Phone || undefined;

    await prisma.lead.create({
      data: {
        name,
        source,
        status: "New",
        email,
        phone,
        notes: `Imported from Zoho lead id ${item.id}`,
      },
    });
    created += 1;
  }

  await logAutomation("zoho_pull_leads", "integration", "zoho_crm", `Imported ${created} leads from Zoho CRM.`);
  return NextResponse.json({ success: true, data: { imported: created } });
}
