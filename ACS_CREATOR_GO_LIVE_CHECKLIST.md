# ACS Creator Go-Live Checklist (ACS Control Center)

Date: 2026-04-19

This is the fastest path to a *stable* Creator hub (CRM + Books + FSM) before we spend more time on FlutterFlow/Wix.

## Step 1: Remove Duplicate Customer Sync Triggers (10 minutes)

Goal: when a customer is added, we sync **once** (not 2-4 times).

1. Zoho Creator -> open app `ACS Control Center`
2. Left menu -> `Workflow`
3. Filter:
   - Component: `Form`
   - Form: `customers`
   - Event: `On Add`
4. Set these workflows to **Inactive/Disabled**:
   - `auto-sync when added)`
   - `auto_sync_when_added_`
   - `Customers_Workflow (auto-run)`
   - `Customers_Workflow_auto_r`
5. Keep this ONE workflow **Active**:
   - `TOOL_SYNC_CUSTOMER_ALL`

Expected result: one customer add = one CRM+Books sync + one FSM ensure contact/address.

## Step 2: Fix FSM Work Order Function Parameter Order (15 minutes)

Problem today: all your workflows call:
`TOOL_SYNC_SERVICE_REQUEST_TO_FSM_WORK_ORDER1(<requestId>, <customerId>)`
but the function signature is currently:
`TOOL_SYNC_SERVICE_REQUEST_TO_FSM_WORK_ORDER1(customerId, requestId)`
which can make FSM creation silently fail.

Fix: edit the function so the **first** argument is the Service Request record ID.

1. Zoho Creator -> `Workflow` -> `Functions`
2. Open function: `TOOL_SYNC_SERVICE_REQUEST_TO_FSM_WORK_ORDER1`
3. Change the function signature to:
   - `map TOOL_SYNC_SERVICE_REQUEST_TO_FSM_WORK_ORDER1(int requestId, long customerId)`
4. In the function body, ensure the first line is:
   - `req = service_requests[ID == requestId];`
5. Keep using `custId = req.customer;` inside (customerId param can be ignored or used as fallback).

Expected result: any workflow that passes `(req.ID, req.customer.toLong())` works.

## Step 3: Make Retry Sync Buttons Actually Work (10 minutes)

Right now, `sync_action` fields are **Checkboxes** (multi-select), but your workflows compare them like a single string.

Fastest fix: convert `sync_action` to a Picklist (single select).

Do this on each form:
- `customers` -> field `sync_action`
- `service_requests` -> field `sync_action`
- `work_orders` -> field `sync_action`

Picklist values:
- `None`
- `Retry Sync`

Then your existing workflows like:
`if(input.sync_action == "Retry Sync") { ... }`
will work correctly.

## Step 4: Verify Connections (5 minutes)

1. Creator -> `Integrations` (or `Settings` -> `Connections`)
2. Confirm these connections are authorized and green:
   - `zohocrm_connection1`
   - `zoho_books_connection`
   - `zoho_fsm_oauth`

If any are expired, re-auth them now. Nothing else will be reliable until this is green.

## Step 5: End-to-End Test (15 minutes)

Run these tests in order and confirm each “writes back” IDs in Creator:

1. Create (or edit) one `ai_intake_log` record:
   - Make sure it has at least phone/email + address + service_type + urgency
2. Set `ai_intake_log.status = Ready`
Expected:
   - It becomes `Converted`
   - A `customers` record exists (or is found)
   - A `service_requests` record is created
3. Open the created customer:
Expected:
   - `crm_contact_id` populated
   - `books_contact_id` populated
   - `fsm_contact_id` populated
   - `fsm_service_address_id` populated
4. If the request is Emergency/High (or set Service Request status Approved):
Expected:
   - `service_requests.fsm_work_order_id` populated
5. Create a work order (or use an existing one), set `status = Completed` and `grand_total > 0`:
Expected:
   - `work_orders.books_invoice_id` populated
   - A Creator `invoices` record created with the Books invoice id

## What “Ready” Means After This

Creator becomes your reliable hub:
- AI intake routing and conversion works.
- Customer sync is deterministic (no duplicates).
- FSM work order creation works consistently.
- Books invoice creation on completion works.
- Retry buttons work.
- Scheduled pull keeps two-way sync current.

