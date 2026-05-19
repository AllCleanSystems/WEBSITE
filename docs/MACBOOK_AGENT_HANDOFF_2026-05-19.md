# MacBook Agent Handoff - ACS Bismarck Switch Plan

Generated: 2026-05-19

Purpose: give the MacBook agent the current app + website plan so the owner can completely switch work to the MacBook without losing context.

Do not paste or commit secrets. Do not expose API keys, SignalWire tokens, Stripe keys, OpenAI keys, AWS credentials, database URLs, or private customer data.

## Primary Goal

Get All Clean Solutions operational on the new system fast enough to stop relying on Topline for day-to-day company control.

This is not the full sellable SaaS finish line yet. This is the internal ACS operating-system finish line.

## Domains

- App: `https://app.acsbismarck.com`
- Website: `https://acsbismarck.com`
- Temporary app URL: `https://main.d3nlz9z1itwk2f.amplifyapp.com`

Do not use the typo `app.asbismarck.com`.

## Repositories / Work Areas

### 1. AWS App / Service Business OS

Local Windows path:

```text
C:\Users\Owner\Music\Acs System\service-business-os
```

GitHub:

```text
https://github.com/AllCleanSystems/service-business-os.git
```

Deploy target:

```text
AWS Amplify
```

Current app purpose:

- Owner command center
- Service hub
- Call capture
- SignalWire phone workflow
- Zoho CSV import
- Printable quote/invoice/service report/checklist forms
- Technician service flow
- Manager review
- Service report builder
- App readiness and go-live command center

Current important app commits around launch:

- `68ae239` - corrected app domain target to `app.acsbismarck.com`
- `3d6825c` - added Claude fast-finish prompt and domain target packet
- `b0cee98` - fixed SignalWire voice callbacks to use public URL instead of localhost
- `f90b2cb` - ignored empty SignalWire call-state events
- `87a5177` - deduped forwarded SignalWire call events
- `057490b` - hid fake call capture samples and showed recordings

Current app status:

- Live AWS app routes have been responding with `200`.
- SignalWire, OpenAI, and Stripe are sandbox-ready in provider status.
- SignalWire phone forwarding works.
- Local Codex app runs on `http://localhost:3020`.
- Local call-capture API had at least one local draft in testing.
- Fake/sample call data should be hidden unless `CALL_CAPTURE_SHOW_SAMPLE_DATA=true`.
- The durable production database is not connected yet.
- S3/private recording storage is not connected yet.
- Live SMS/email/payments are not enabled.

Important app env vars:

```text
NEXT_PUBLIC_APP_URL=https://app.acsbismarck.com
SIGNALWIRE_CONNECTION_MODE=sandbox
SIGNALWIRE_LIVE_SEND_ENABLED=false
CALL_CAPTURE_LIVE_RECORDING_ENABLED=true
CALL_CAPTURE_S3_WRITE_ENABLED=false
CALL_CAPTURE_AI_EXTRACTION_ENABLED=false
OWNER_LIVE_API_APPROVAL=false
```

Database cutover env vars needed later:

```text
APP_DATA_DRIVER=aws-aurora-postgres
DATABASE_URL=[secret in Amplify/AWS only]
DATA_MIGRATION_APPROVED=true
AURORA_AUTO_SCHEMA_ENABLED=true
DB_SSL_REQUIRED=true
```

Do not put `DATABASE_URL` in chat or source.

## App Work Still Needed

Must finish before replacing Topline as system of record:

1. Connect durable database.
2. Import/verify Zoho data.
3. Connect `app.acsbismarck.com` in Amplify custom domains.
4. Verify SignalWire call capture creates exactly one draft per call.
5. Verify recordings show in `/call-capture`.
6. Confirm quote, invoice, checklist, and service report print/PDF flows.
7. Confirm backup/export path before using live company data.

Can wait until after internal go-live:

- Live SMS automation
- Live email sending
- Stripe live payments
- Full customer portal delivery
- Full SaaS multi-tenant sellable polish
- AI auto-extraction on live customer data

## Claude / UI Agent Lane

Claude should handle UI/page polish only.

Safe Claude file:

```text
C:\Users\Owner\Music\Acs System\service-business-os\CLAUDE_FAST_FINISH_PROMPT.md
```

Claude should not touch:

- `src/app/api/**`
- `.env*`
- `amplify.yml`
- `package.json`
- `package-lock.json`
- provider/env/status logic
- SignalWire/OpenAI/Stripe/AWS live flags
- database/Aurora/Postgres wiring
- live send/payment/deploy logic

Claude can polish:

- Dashboard launch shortcuts
- Detail pages
- Empty states
- Owner-use guidance
- App readiness wording
- Navigation
- Printable forms UI

## Codex / Live Wiring Lane

Codex should handle:

- SignalWire call/recording webhooks
- Call-capture dedupe
- Database/Postgres/Aurora wiring
- Amplify env/domain readiness
- Provider status
- Live-readiness validation
- API route verification
- Zoho import-to-database path

## 2. Public Website

Website/root domain:

```text
https://acsbismarck.com
```

Likely local website workspace:

```text
C:\Users\Owner\Music\Acs System\acs-ops-replit
```

Root ACS/website repo:

```text
https://github.com/AllCleanSystems/WEBSITE.git
```

Important warning:

The website repo/worktree has many existing modified and untracked files. Do not mass-add or mass-reset. Commit only intentional files.

Website purpose:

- Public customer-facing All Clean Solutions website
- Service pages
- Lead capture
- Blog/marketing
- Google/SEO content
- Route customers toward calls/forms
- Eventually connect to the operations app, but keep public site and private app separate

Website launch target:

- Public website: `acsbismarck.com`
- App login/operations: `app.acsbismarck.com`

Website should not expose:

- Internal owner dashboards
- Private app routes
- API secrets
- Customer records
- Internal provider readiness pages

Website work still needed:

1. Confirm which repo/deploy is currently live for `acsbismarck.com`.
2. Confirm hosting target: Netlify or current provider.
3. Confirm DNS provider and records.
4. Confirm homepage, services, contact/intake, and phone CTA load correctly.
5. Confirm public lead forms go to the right destination.
6. Confirm public website does not depend on unfinished private app features.
7. Keep marketing/blog drafts approval-first.

## Fast Cutover Plan

### Tonight

1. Keep AWS app usable on temporary Amplify URL.
2. Set `NEXT_PUBLIC_APP_URL=https://app.acsbismarck.com` in Amplify before custom-domain cutover.
3. Finish SignalWire call capture test.
4. Confirm local `/call-capture` and AWS `/call-capture` behavior.
5. Let Claude finish UI polish from `CLAUDE_FAST_FINISH_PROMPT.md`.

### Next

1. Connect durable database.
2. Test Zoho CSV import into durable storage.
3. Connect Amplify custom domain `app.acsbismarck.com`.
4. Connect/confirm public website `acsbismarck.com`.
5. Verify quote/invoice/report/checklist workflows with real ACS test data.

### Before Firing Topline

Do not fully replace Topline until:

- Durable database is connected.
- Zoho data is imported and spot-checked.
- Backup/export path works.
- App domain works on phone and desktop.
- Calls are captured reliably.
- Quotes/invoices/service reports can be printed or saved as PDF.

## MacBook Agent Startup Instructions

1. Clone or pull:

```text
https://github.com/AllCleanSystems/service-business-os.git
https://github.com/AllCleanSystems/WEBSITE.git
```

2. Start with the app repo:

```text
service-business-os
```

3. Read first:

```text
CODEX_BUILD_LOG.md
CLAUDE_FAST_FINISH_PROMPT.md
CLAUDE_FAST_FINISH_RESULTS.md
APP_BUILD_OUT_REPORT.md
```

4. Then check:

```text
https://main.d3nlz9z1itwk2f.amplifyapp.com/api/health
https://main.d3nlz9z1itwk2f.amplifyapp.com/api/provider-status
https://main.d3nlz9z1itwk2f.amplifyapp.com/api/signalwire/call-capture-readiness
https://main.d3nlz9z1itwk2f.amplifyapp.com/api/call-capture
```

5. Do not change website repo or DNS without confirming exact target:

```text
Website: acsbismarck.com
App: app.acsbismarck.com
```

## Owner Preference

The owner wants speed and low friction, but not broken customer-facing systems.

Default approach:

- Fewer questions.
- Direct steps.
- Protect secrets.
- Do not overbuild.
- Focus on replacing Topline for ACS first.
- Keep sellable SaaS work secondary.
