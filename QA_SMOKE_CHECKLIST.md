# QA SMOKE CHECKLIST

Last updated: 2026-04-30

## Goal
Verify production is healthy in under 10 minutes after each deploy.

## Smoke Sequence (Fast)
1. Run:
- `npm run ops:smoke`
2. Open production site:
- `https://acsbismarckcom.netlify.app`
3. Open chat and test:
- "What areas do you serve?"
- "Call me at 701-555-1234"
- "How much for hood cleaning?"
4. Verify `/phone`:
- OpenPhone status endpoint succeeds
- Message pull endpoint succeeds
5. Submit a test quote from contact form.
6. Confirm Zoho intake record is created.

## Pass Criteria
- Home page status OK (200/3xx).
- Function endpoint returns `ok=true` with non-empty reply.
- Chat stays on-topic and asks for intake details when needed.
- Phone and quote flows complete without server error.

## Stop-Ship Criteria
- Any 5xx response from Netlify function.
- Chat returns empty/invalid JSON repeatedly.
- Zoho intake creation fails.
- OpenPhone status not configured in production.

