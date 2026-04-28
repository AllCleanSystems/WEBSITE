# Wix Plugin

This plugin is configured for practical Wix site workflows.

## Current structure

- `.codex-plugin/plugin.json` (required manifest)
- `skills/` (assistant behavior)
- `scripts/` (helper scripts)
- `hooks/` (lifecycle hooks)
- `assets/` (icons/screenshots)
- `.mcp.json` (MCP server wiring)
- `.app.json` (app connector wiring)

## Quick setup

1. Set environment variables:
   - `WIX_API_TOKEN` (required)
   - `WIX_SITE_ID` (recommended)
   - `WIX_ACCOUNT_ID` (optional, account-level calls)
2. Test connectivity:
   - `python scripts/wix_api.py list-sites`
3. Query data collections:
   - `python scripts/wix_api.py query-data --collection-id <collection-id>`
4. Query store products:
   - `python scripts/wix_api.py query-products`

## Integration details

- Base URL: `https://www.wixapis.com`
- Auth header: `Authorization: Bearer <WIX_API_TOKEN>`
- Starter actions:
  - `list-sites` (`POST /site-list/v2/sites/query`)
  - `query-collections` (`POST /wix-data/v2/items/query`)
  - `query-products` (`POST /stores-reader/v1/products/query`)
  - `publish-site` (`POST /site-publisher/v1/site/publish`)
