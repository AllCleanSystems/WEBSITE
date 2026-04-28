---
name: wix
description: Use this skill when working on Wix site architecture, CMS data operations, store/catalog workflows, and publish-readiness automation.
---

# Wix Skill

## Use This For

- Planning Wix site structure and content updates
- Mapping requirements to Wix CMS collections and fields
- Designing safe API payloads for site/content changes
- Coordinating eCommerce workflows for product and catalog updates
- Hardening publish checklists and rollback planning

## Working Rules

1. Prefer official Wix APIs and documented endpoints.
2. Validate request payloads before write operations.
3. Keep edits reversible and sequence publish steps safely.
4. Document assumptions when site IDs or collection IDs are unknown.
5. Separate read checks from write actions when risk is non-trivial.

## Standard Output Pattern

1. Short implementation summary
2. Concrete Wix steps or API calls
3. Validation checklist before publish
4. Rollback guidance when applicable

## Safety Checklist

- Confirm token scope matches requested action
- Confirm site ID and target environment (sandbox/prod)
- Confirm backup/export exists before destructive changes
- Confirm post-publish smoke tests are defined

## API Quick Commands

- `python scripts/wix_api.py list-sites`
- `python scripts/wix_api.py query-data --collection-id <collection-id>`
- `python scripts/wix_api.py query-products`
- `python scripts/wix_api.py custom --method GET --path /site-properties/v4/properties`
