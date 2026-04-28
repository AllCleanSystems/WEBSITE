# ACS Creator "Jobber-Plus" Keep/Disable Checklist

Applies to your latest export: `ACS Control Center` generated 2026-04-19.

Goal: keep the automations that make you *faster than Jobber* (AI intake -> customer -> service request -> FSM -> Books) and remove the duplicate/redundant ones that cause double-sync, rate limits, or confusing behavior.

## 1) Keep These (High Value)

### AI Intake Pipeline (this is your competitive advantage)
- Workflow: `Needs Info” routing for AI intakes` (Form `ai_intake_log`, on add)
- Workflow: `ai_intake_log.status changes to` (Form `ai_intake_log`, on edit)
- Function: `TOOL_CONVERT_AI_INTAKE_TO_REQUEST(intakeId)`

Why keep: auto-triage, escalation, and one-click conversion from intake to real work.

### Customer Sync (CRM + Books + FSM)
Keep exactly ONE "customer on add" orchestrator that:
- calls CRM+Books sync
- calls FSM ensure contact + address
- stamps `sync_status/sync_error/last_sync_*`

Recommended keeper (best structured in your export):
- Workflow: `TOOL_SYNC_CUSTOMER_ALL` (Form `customers`, on add)

Why keep: prevents duplicate external calls and gives you a reliable "source of truth" sync status in Creator.

### Service Request Automation (quote + FSM work order)
- Workflow: `AutocreateFSMworkorderforurgentrequests` (Form `service_requests`, on add or edit)
- Workflow: `Auto-create Quote Service Request Approved` (Form `service_requests`, on edit)
- Workflow: `Urgent Request Email Alert` (Form `service_requests`, on add or edit)
- Workflow: `New Service Request Notification` (Form `service_requests`, on add)
- Function: `TOOL_SYNC_SERVICE_REQUEST_TO_FSM_WORK_ORDER1(...)`
- Function: `TOOL_CREATE_QUOTE_FROM_SERVICE_REQUEST(requestId)`

Why keep: this is what makes dispatch + quoting automatic.

### Work Order Automation (Books invoice + close-out)
- Workflow: `work_orders:_invoicing` (Form `work_orders`, on edit)
- Workflow: `Work Order Completed close the Service Request` (Form `work_orders`, on edit)
- Function: `TOOL_CREATE_BOOKS_INVOICE_FROM_WORK_ORDER(workOrderId)`

Why keep: auto-invoicing + lifecycle closure saves hours/week.

### Retry + Two-Way Pull (stability)
- Workflow: `one_click_retry_button` (Form `customers`, on edit) (optional)
- Workflows:
  - `one_picklist_one_button` (customers)
  - `Service Re one picklist + one button` (service_requests)
  - `WO one picklist + one button` (work_orders)
- Schedules:
  - `Nightly two-way pull`
  - `TOOL_PULL_INVOICE_FROM_BOOKS`
  - `TOOL_PULL_WORK_ORDER_FROM_FSM`
- Functions:
  - `TOOL_PULL_CUSTOMER_FROM_CRM_AND_BOOKS(customerId)`
  - `TOOL_PULL_INVOICE_FROM_BOOKS(invoiceRecordId)`
  - `TOOL_PULL_WORK_ORDER_FROM_FSM(workOrderRecordId)`
  - `TOOL_RETRY_ALL_SYNC(recordType, recordId)`

Why keep: makes the system self-healing instead of fragile.

## 2) Disable These (Duplicate / Noisy)

These are duplicating the same “customers on add” sync work:
- Workflow: `auto-sync when added)` (customers, on add)
- Workflow: `auto_sync_when_added_` (customers, on add)
- Workflow: `Customers_Workflow (auto-run)` (customers, on add)

If you keep `TOOL_SYNC_CUSTOMER_ALL`, disable the three above so a new customer doesn’t trigger 2-4 external syncs at once.

## 3) Fix These (Small Changes, Huge Impact)

### A) `sync_action` is a checkbox list but your scripts treat it like a single value
In your export, these are `checkboxes`:
- `customers.sync_action`
- `service_requests.sync_action`
- `work_orders.sync_action`

Fastest fix: change each field type to a **Picklist** with values `None`, `Retry Sync`.

If you don’t want to change field type, then the workflow code must change from:
`if(input.sync_action == "Retry Sync")`
to a list-contains check.

### B) Standardize function argument order to avoid future mistakes
Your function name suggests `TOOL_SYNC_SERVICE_REQUEST_TO_FSM_WORK_ORDER1(customerId, requestId)` but the body uses `req = service_requests[ID == requestId]`.

Best fix: rename parameters to match what it actually uses (or update callers so the order is consistent).

## 4) Click-by-Click: Where To Disable Workflows

1. In Zoho Creator: open your app `ACS Control Center`.
2. Left sidebar: `Workflow`.
3. Filter by `Form = customers` and `On Add`.
4. Open each of these and toggle them to **Inactive/Disabled**:
   - `auto-sync when added)`
   - `auto_sync_when_added_`
   - `Customers_Workflow (auto-run)`
5. Verify the remaining active one is:
   - `TOOL_SYNC_CUSTOMER_ALL`

## 5) What This Gets You (Jobber-Plus)

- AI Intake triage + escalation routing.
- One-click conversion Intake -> Customer + Service Request (and auto sync).
- Auto quote creation and FSM work order creation based on urgency/approval.
- Auto invoicing on completion.
- Two-way pull jobs keep Books/CRM/FSM reflected in Creator.

