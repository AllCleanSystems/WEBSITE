# FlutterFlow Plugin

This plugin is configured for real FlutterFlow Project API workflows.

## Current structure

- `.codex-plugin/plugin.json` (required manifest)
- `skills/` (assistant behavior)
- `scripts/` (helper scripts)
- `hooks/` (lifecycle hooks)
- `assets/` (icons/screenshots)
- `.mcp.json` (MCP server wiring)
- `.app.json` (app connector wiring)

## Next steps

1. Add plugin images in `assets/` and keep names from `plugin.json`.
2. Create a FlutterFlow API token:
   - Open your FlutterFlow account page: `https://app.flutterflow.io`
   - Near the bottom, click `Create Token`.
3. Set environment variables before running API scripts:
   - `FLUTTERFLOW_API_TOKEN` (required)
   - `FLUTTERFLOW_API_BASE` (optional, defaults to `https://api.flutterflow.io/v2`)
4. Use the first two wired actions:
   - `python scripts/flutterflow_api.py list-projects`
   - `python scripts/flutterflow_api.py list-files --project-id <project-id>`
5. Validate then update safely:
   - `python scripts/flutterflow_api.py validate-file --project-id <project-id> --file-key app-state --file-path .\\app-state.yaml`
   - `python scripts/flutterflow_api.py update-file --project-id <project-id> --file-key app-state --file-path .\\app-state.yaml`

## Integration details

- Auth method: `Bearer` token (`Authorization: Bearer <token>`)
- Starter actions:
  - `list-projects` (`POST /l/listProjects`)
  - `list-files` (`GET /listPartitionedFileNames?projectId=...`)
  - `validate-file` (`POST /validateProjectYaml`)
  - `update-file` (`POST /updateProjectByYaml`)
