# TODO: Service-Specific Checklists + QA/Compliance + Social Posting

Saved: 2026-04-19

This is the “Jobber-plus” ops layer: repeatable quality, compliance proof, and simple marketing outputs.

## A) Service-Specific Checklists (Before / During / After)

### Data Model (Creator)

1) **checklist_templates**
- `name` (text) e.g., "Restaurant Hood Cleaning - Standard"
- `service_type` (picklist) must match your existing service list
- `phase` (picklist) `Before`, `During`, `After`
- `version` (number) default 1
- `active` (checkbox) default true
- `notes` (textarea) optional

2) **checklist_template_items**
- `template` (lookup -> checklist_templates)
- `sort_order` (number)
- `label` (text) e.g., "Verify power supply disconnected"
- `item_type` (picklist) `Yes/No`, `Number`, `Text`, `Photo`, `Signature`
- `required` (checkbox)
- `min_value` (number) optional
- `max_value` (number) optional
- `help_text` (textarea) optional
- `compliance_tag` (picklist/text) e.g., "Safety", "PPE", "FoodSafe", "EPA", "Insurance"

3) **work_order_checklists** (one record per WO per phase)
- `work_order` (lookup -> work_orders)
- `template` (lookup -> checklist_templates)
- `service_type` (text/picklist) stored copy
- `phase` (text/picklist) stored copy
- `status` (picklist) `Not Started`, `In Progress`, `Submitted`, `Approved`, `Rejected`
- `submitted_by` (user)
- `submitted_at` (datetime)
- `approved_by` (user)
- `approved_at` (datetime)
- `score_percent` (number) optional

4) **work_order_checklist_responses** (one row per checklist item)
- `work_order_checklist` (lookup -> work_order_checklists)
- `template_item` (lookup -> checklist_template_items)
- `value_yesno` (checkbox) (for Yes/No)
- `value_number` (number)
- `value_text` (textarea)
- `photo` (file upload / image)
- `signature` (signature field if available)
- `notes` (textarea)
- `captured_at` (datetime)

### How It Works (UX)
- Technician opens Work Order.
- Taps `Start Before Checklist` (creates WO checklist + expands items).
- Submits checklist (locks it, manager can approve/reject).
- Repeat for After checklist.

## B) Equipment Checklist (Per Service + Per Tech)

Two options:

Option 1 (fastest): checklist items include equipment lines
- Add template items like "Truck stocked: degreaser, scrapers, filters".

Option 2 (better long-term): equipment inventory module

**equipment_assets**
- `name`, `sku`, `category`, `active`, `notes`

**service_equipment_requirements**
- `service_type`
- `equipment_asset`
- `required_qty`

Then “Before Checklist” can auto-generate “equipment present?” lines based on service type.

## C) Compliance + QA Rules (Make It Enforceable)

### Compliance gates
- Work Order can’t be marked `Completed` unless:
  - Before checklist is `Approved`
  - After checklist is `Submitted` (or Approved, your choice)
  - Required photos exist (if required items include Photo)

### QA scoring (simple)
- Score = % of required items completed and passing
- Auto flag to manager if:
  - Any Safety item fails
  - Any required item missing

### Audit trail (proof)
- Always stamp: who/when
- Optional later: device location (GPS) if you capture it

## D) Social Posting (via “Social Social”)

Assumption: you mean a social scheduling tool (possibly Zoho Social). We can connect either:
- Native integration (best)
- Or webhook automation (fastest) to Social Social API

### Data Model

**marketing_posts**
- `title`
- `platforms` (multi-select) e.g., FB/IG/Google Business
- `caption`
- `media` (attachments)
- `status` (Draft/Scheduled/Posted/Failed)
- `scheduled_at`
- `posted_at`
- `related_work_order` (lookup) optional
- `error` (textarea)

### Workflow
- On Work Order completion:
  - If customer has consent and after photos exist, create a Draft marketing post.
  - Manager reviews and clicks “Schedule/Publish”.

## E) Decisions Needed (When You’re Ready)

1) Which services need checklists first?
- Recommend starting with your highest risk / highest value services:
  - Restaurant Hood Cleaning
  - Deep Cleaning (commercial)
  - Lawn Maintenance (repeat work)

2) Do you want manager approval required, or only for exceptions?

3) For social: which platforms are priority (IG/FB/Google Business)?

