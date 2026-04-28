# ACS Control Center — Current Status (Saved)

Last updated: 2026-04-18 (America/Chicago)

## What We’re Building

Goal: a working business “operating system” with **Zoho Creator as the hub**, integrating:
- Zoho CRM
- Zoho Books
- Zoho FSM
- Later: Wix + Twilio + AI

Frontend UI: FlutterFlow (in progress), but we are prioritizing getting the backend + Creator integrations stable first.

## Live Backend (Railway)

Base URL:
- https://acs-ai-backend-production.up.railway.app

Auth header for `/ui/*` endpoints:
- `x-acs-key: 21872164752187216475218259054626`

Creator report link name used for AI inbox:
- `ai_intake_log_Report`

Working endpoints (verified via PowerShell previously):
- `GET /` health
- `GET /ui/ai-inbox`
- `GET /ui/record/ai_intake_log_Report?recordId=<ID>`
- `PATCH /ui/record/ai_intake_log_Report?recordId=<ID>` with JSON body `{ "data": { ... } }`

## FlutterFlow “AI Inbox” (Where We Left Off)

What works:
- List page can show real fields (customer_name etc.) from the inbox list.

Best approach to avoid “recordId substitution” issues:
- Don’t do a second “Get single record” API just to show Details.
- On tap, **pass the whole list item** to the Details page.

Saved step-by-step file:
- `C:\\Users\\Owner\\Music\\Acs System\\ACS_FLUTTERFLOW_AI_INBOX_DETAILS_NO_EXTRA_API.md`

Remaining gap:
- Updating status from FlutterFlow is flaky due to variable substitution.

Most reliable fix:
- Use a FlutterFlow **Custom Action** for status update:
  - Inputs: `recordId` (String digits), `status` (String)
  - Calls: `PATCH /ui/report/ai_intake_log_Report/<recordId>` with body `{ "data": { "status": "<status>" } }`

## Website AI (What We’ll Test Next)

Endpoints in Railway backend:
- `POST /api/ai/chat` (needs `OPENAI_API_KEY` configured in Railway)
- `POST /api/ai/create-intake` (creates Creator intake record)

Success criteria:
- AI chat returns a reply.
- When required fields are collected, it creates an intake in Creator (code 3000).

