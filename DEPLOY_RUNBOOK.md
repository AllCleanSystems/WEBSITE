# DEPLOY RUNBOOK

Last updated: 2026-04-29

## Repo + Branch
- Repo: https://github.com/AllCleanSystems/WEBSITE
- Branch: master

## Active Site
- https://acsbismarckcom.netlify.app

## Source of Website Pages
- Static website files in: acs-ops-replit/site
- Main file: acs-ops-replit/site/index.html

## Netlify Config (critical)
- File: acs-ops-replit/netlify.toml
- Current expected:
  - [build]
  - publish = "site"
  - functions = "netlify/functions"

## Standard Deploy Steps
1. Commit + push to master
2. In Netlify: Deploys -> Clear cache and deploy site
3. Hard refresh browser (Ctrl+F5)

## AI Health Checks
1. Open website URL and launch chat
2. Endpoint existence check:
   - https://acsbismarckcom.netlify.app/.netlify/functions/website-chat-handoff
   - Non-404 means function is present

## If Site Shows 404
1. Confirm Netlify site is connected to WEBSITE repo/master
2. Confirm publish path resolves to acs-ops-replit/site
3. Verify latest commit is deployed
4. Clear cache + redeploy

## If Build Fails
- Check for BOM parsing errors in netlify.toml
- Check typed route/type errors only if building Next pages
- For static mode, ensure no Next plugin/publish conflicts are present

---

## Transcript Archive (Deploy Incidents)
- BOM parse failures fixed in both root and nested netlify.toml files.
- Branch mismatch (main vs master) caused stale config deploys.
- Functions-only publish caused website page loss; fixed by static site publish.
- Current stable strategy: static publish + Netlify functions.