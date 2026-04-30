# PROJECT MEMORY

Last updated: 2026-04-29

## Owner + Business
- Owner: AllCleanSystems (user)
- Business: All Clean Solutions (Bismarck, ND)
- Goal: Website + AI chat + reliable deploy workflow

## Hosting / Stack
- Frontend hosting: Netlify
- Frontend repo: https://github.com/AllCleanSystems/WEBSITE
- Production branch: master
- Active site URL: https://acsbismarckcom.netlify.app
- Active publish base in repo: acs-ops-replit/site (via netlify.toml)
- Functions directory: acs-ops-replit/netlify/functions
- AI endpoint path: /.netlify/functions/website-chat-handoff

## Backend Integrations
- Railway backend health endpoint in use: /health (not /api/health)
- Zoho and OpenAI env vars are used for AI + handoff logic

## Current Known Decisions
- User wants website style aligned with acsbismarck.com flow
- User wants logo-driven palette in this order: blue, white, pink, green
- User wants assistant to handle end-to-end updates and pushes

## Current Risks / Notes
- Netlify UI settings can override repo config; if site breaks, verify Build & Deploy settings first
- Branch mismatch (main vs master) previously caused stale deploy config
- Browser cache can show old logo/assets; use Ctrl+F5 after deploy

## Working Agreement
- Make changes directly
- Push to GitHub
- User redeploys from Netlify or waits for auto-deploy
- Keep this file updated every session

## Execution Doctrine (Owner Directive)
- Priority: production fast
- North-star goal: full automation setup across website + phone + lead ops
- Operating mode: maximum execution speed with reliable first-pass outcomes

### Speed/Results Program
1. Standardize repeat workflows
- Netlify deploy checklist
- Env var sync checklist
- QA smoke test checklist
2. Convert repeated actions into one-command scripts in repo
3. Use dual-path execution
- Assistant handles code + integration updates
- Owner handles only unavoidable auth/MFA confirmations
4. Build high-leverage automations
- Lead intake triage
- Missed-call follow-up
- Fast quote prefill
- Status dashboards
5. Enforce SLA targets
- Agent first response < 2s for common intents
- Lead capture completion < 90s
- Deploy-to-verification < 10 min

---

## Transcript Archive (Session Notes)

### 2026-04-29 Session A (summary)
- Diagnosed repeated Netlify failures caused by UTF-8 BOM in netlify.toml.
- Fixed BOM in root and nested netlify.toml files.
- Resolved main/master branch mismatch and pushed fixes to active branch.
- Diagnosed missing pages due to functions-only deploy.
- Restored website from user zip: Website (1).zip into acs-ops-replit/site.
- Added compatibility shim so legacy window.claude.complete routes to Netlify function endpoint.
- Updated branding to user-requested palette and logo variants.
- Added multi-page route attempt in Next app, then switched to static restored site per user preference.
- Current source of truth for website visuals is static files under acs-ops-replit/site.
