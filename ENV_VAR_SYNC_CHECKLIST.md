# ENV VAR SYNC CHECKLIST

Last updated: 2026-04-30

## Goal
Keep Netlify runtime keys aligned with code expectations to avoid AI/phone/quote outages.

## Required Keys (Production)
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENPHONE_API_KEY`
- `ZOHO_REFRESH_TOKEN`
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_CREATOR_OWNER` (or `ZOHO_ACCOUNT_OWNER_NAME`)
- `ZOHO_CREATOR_APP_LINK` (or `ZOHO_APP_LINK_NAME`)
- `ZOHO_FORM_LINK_NAME` (or `ZOHO_CREATOR_FORM_LINK` / `ZOHO_FORM_NAME`)

## Sync Steps
1. Open Netlify -> Site configuration -> Environment variables.
2. Confirm every required key exists in `all` or `production` context.
3. Confirm no accidental pasted content in `ZOHO_REFRESH_TOKEN`.
4. Confirm `OPENAI_MODEL` is set for speed target (`gpt-4.1-mini` default).
5. Save changes and trigger deploy.
6. Run smoke check:
- `npm run ops:smoke`

## Validation Rules
- Any missing required key = deployment blocked.
- Any malformed refresh token = deployment blocked.
- If key is updated, redeploy immediately.

