export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { forwardWebsiteLeadToApp, sendWebsiteQuoteEmail } from "@/lib/website-lead-delivery";
import { fetchZohoAccessToken } from "@/lib/zoho";
import { logAutomation } from "@/lib/workflows";

const QuoteRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7),
  serviceType: z.string().min(2),
  message: z.string().optional().or(z.literal("")),
  smsConsent: z.boolean(),
  sourcePage: z.string().optional().default("/contact"),
});

const SMS_CONSENT_TEXT_VERSION =
  "I agree to receive SMS from All Clean Solutions about quotes, scheduling, service updates, reminders, and support. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return { firstName: parts[0] ?? "Customer", lastName: "Customer" };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] };
}

export async function POST(req: NextRequest) {
  const parsed = QuoteRequestSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid request payload." }, { status: 400 });
  }

  const input = parsed.data;
  const consentTimestamp = new Date();
  const ipAddress = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "").split(",")[0].trim() || null;
  const userAgent = req.headers.get("user-agent") || null;

  if (!input.smsConsent) {
    return NextResponse.json({ success: false, error: "SMS consent checkbox must be explicitly checked." }, { status: 400 });
  }

  if (!input.phone.trim()) {
    return NextResponse.json({ success: false, error: "Phone number is required for SMS consent." }, { status: 400 });
  }

  const notes = [
    `Service Type: ${input.serviceType}`,
    `Quote Request Message: ${input.message || "(none provided)"}`,
    `SMS Consent: ${input.smsConsent ? "Yes" : "No"}`,
    "Consent Source: Website quote form",
    `Consent Timestamp: ${consentTimestamp.toISOString()}`,
    `Consent Text: ${SMS_CONSENT_TEXT_VERSION}`,
    `Source Page: ${input.sourcePage}`,
    `IP Address: ${ipAddress ?? "Unavailable"}`,
    `User Agent: ${userAgent ?? "Unavailable"}`,
  ].join("\n");

  const lead = await prisma.lead.create({
    data: {
      name: input.name,
      source: "Website Quote Form",
      status: "New",
      email: input.email || undefined,
      phone: input.phone,
      notes,
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventType: "website_quote_request_submitted",
      entityType: "lead",
      entityId: lead.id,
      message: "Website quote request captured with SMS consent metadata.",
      success: true,
      metadata: JSON.stringify({
        name: input.name,
        phone: input.phone,
        email: input.email || null,
        serviceType: input.serviceType,
        message: input.message || "",
        smsConsent: input.smsConsent,
        smsConsentTimestamp: consentTimestamp.toISOString(),
        smsConsentText: SMS_CONSENT_TEXT_VERSION,
        sourcePage: input.sourcePage,
        ipAddress,
        userAgent,
      }),
    },
  });

  const deliveryPayload = {
    leadId: lead.id,
    name: input.name,
    email: input.email || undefined,
    phone: input.phone,
    serviceType: input.serviceType,
    message: input.message || undefined,
    smsConsent: input.smsConsent,
    sourcePage: input.sourcePage,
    consentTimestamp,
    ipAddress,
    userAgent,
  };

  const emailResult = await sendWebsiteQuoteEmail(deliveryPayload);
  await prisma.automationEvent.create({
    data: {
      eventType: emailResult.skipped
        ? "website_quote_email_skipped"
        : emailResult.ok
          ? "website_quote_email_sent"
          : "website_quote_email_failed",
      entityType: "lead",
      entityId: lead.id,
      message: emailResult.message,
      success: emailResult.ok,
      metadata: JSON.stringify({ serviceType: input.serviceType, sourcePage: input.sourcePage }),
    },
  });

  const appForwardResult = await forwardWebsiteLeadToApp(deliveryPayload);
  await prisma.automationEvent.create({
    data: {
      eventType: appForwardResult.skipped
        ? "website_quote_new_app_forward_skipped"
        : appForwardResult.ok
          ? "website_quote_new_app_forwarded"
          : "website_quote_new_app_forward_failed",
      entityType: "lead",
      entityId: lead.id,
      message: appForwardResult.message,
      success: appForwardResult.ok,
      metadata: JSON.stringify({ destinationConfigured: !appForwardResult.skipped }),
    },
  });

  const deliveryWarnings = [emailResult, appForwardResult]
    .filter((result) => !result.ok)
    .map((result) => result.message);

  let zohoLeadId = "";
  try {
    const token = await fetchZohoAccessToken();
    if (!token.success) {
      await prisma.automationEvent.create({
        data: {
          eventType: "zoho_quote_lead_push_failed",
          entityType: "lead",
          entityId: lead.id,
          message: token.error,
          success: false,
          metadata: JSON.stringify({ input }),
        },
      });
      return NextResponse.json({
        success: true,
        warning: ["Saved in app, but Zoho push failed due to auth config.", ...deliveryWarnings].join(" "),
        data: { leadId: lead.id, emailNotification: emailResult, newAppForward: appForwardResult },
      });
    }

    const { firstName, lastName } = splitName(input.name);
    const body = {
      data: [
        {
          First_Name: firstName,
          Last_Name: lastName,
          Company: "All Clean Solutions Website",
          Email: input.email || undefined,
          Phone: input.phone,
          Lead_Source: "Website",
          Description: notes,
        },
      ],
      trigger: ["workflow"],
    };

    const res = await fetch("https://www.zohoapis.com/crm/v2/Leads", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = `Zoho lead push failed (${res.status})`;
      await prisma.automationEvent.create({
        data: {
          eventType: "zoho_quote_lead_push_failed",
          entityType: "lead",
          entityId: lead.id,
          message: msg,
          success: false,
          metadata: JSON.stringify({ response: json }),
        },
      });
      return NextResponse.json({
        success: true,
        warning: ["Saved in app, but Zoho lead create failed.", ...deliveryWarnings].join(" "),
        data: { leadId: lead.id, zohoResponse: json, emailNotification: emailResult, newAppForward: appForwardResult },
      });
    }

    zohoLeadId = String(json?.data?.[0]?.details?.id ?? "");
    await logAutomation(
      "zoho_quote_lead_pushed",
      "lead",
      lead.id,
      `Website quote request pushed to Zoho CRM lead ${zohoLeadId || "(id unavailable)"}.`
    );
  } catch (error) {
    await prisma.automationEvent.create({
      data: {
        eventType: "zoho_quote_lead_push_failed",
        entityType: "lead",
        entityId: lead.id,
        message: error instanceof Error ? error.message : "Zoho push exception",
        success: false,
      },
    });
    return NextResponse.json({
      success: true,
      warning: ["Saved in app, but Zoho push threw an exception.", ...deliveryWarnings].join(" "),
      data: { leadId: lead.id, emailNotification: emailResult, newAppForward: appForwardResult },
    });
  }

  return NextResponse.json({
    success: true,
    warning: deliveryWarnings.length ? deliveryWarnings.join(" ") : undefined,
    data: { leadId: lead.id, zohoLeadId, emailNotification: emailResult, newAppForward: appForwardResult },
  });
}
