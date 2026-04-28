---
name: flutterflow
description: Use this skill when working on FlutterFlow app architecture, API wiring, custom actions, Firestore or Supabase schema mapping, and production readiness.
---

# FlutterFlow Skill

## Use This For

- Planning FlutterFlow page and component structure
- Translating product requirements into FlutterFlow data models
- Designing API payloads and backend integration mapping
- Drafting custom functions and custom actions
- Hardening auth, permissions, and environment config
- Automating Project YAML workflows through FlutterFlow Project API

## Working Rules

1. Favor FlutterFlow-native features before custom code.
2. Keep generated Dart snippets small and production-safe.
3. Validate data contracts (types, nullability, defaults) before UI binding.
4. Document assumptions clearly when requirements are ambiguous.
5. For API automation, use Bearer token auth and validate before update writes.

## Standard Output Pattern

1. Brief implementation summary
2. FlutterFlow build steps (click path style)
3. Optional custom code block
4. Validation checklist for run mode and test cases

## Safety Checklist

- Confirm API secrets stay in secure environment variables
- Confirm auth rules align with user roles
- Confirm write paths enforce least privilege
- Confirm loading/error states exist for every network call

## API Quick Commands

- `python scripts/flutterflow_api.py list-projects`
- `python scripts/flutterflow_api.py list-files --project-id <project-id>`
- `python scripts/flutterflow_api.py validate-file --project-id <project-id> --file-key <file-key> --file-path <yaml-file>`
- `python scripts/flutterflow_api.py update-file --project-id <project-id> --file-key <file-key> --file-path <yaml-file>`
