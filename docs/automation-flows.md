# ACS Control Center Automation Flows

## Creator Function Groups

These are the function groups I recommend implementing in Zoho Creator Deluge.

### CRM Sync
- `crm_sync_account_from_deal()`
- `crm_sync_contact_from_deal()`
- `crm_pull_customer_updates()`
- `crm_push_service_status()`

### FSM Sync
- `fsm_create_work_order()`
- `fsm_create_service_appointment()`
- `fsm_assign_technician()`
- `fsm_pull_completion_updates()`

### Books Sync
- `books_create_customer_if_missing()`
- `books_create_estimate()`
- `books_convert_estimate_to_invoice()`
- `books_pull_payment_status()`

### Shared Utilities
- `log_sync_event()`
- `mark_sync_failure()`
- `retry_failed_sync()`
- `normalize_status_values()`

## Event-Based Workflow Map

### Flow 1: CRM Deal Approved

Trigger:
- deal reaches approved sales stage in CRM

Actions:
1. sync account and contact into Creator
2. create service request in Creator
3. notify dispatch team

## Flow 2: Service Request Approved

Trigger:
- office team approves service request in Creator

Actions:
1. ensure customer exists in Books
2. create work order in FSM
3. create service appointment in FSM
4. store returned FSM IDs in Creator

## Flow 3: Technician Completion

Trigger:
- work order or service appointment marked complete in FSM

Actions:
1. update work order status in Creator
2. capture notes, labor, parts, and completion date
3. evaluate billing rule
4. send billing-ready alert if review is required

## Flow 4: Invoice Creation

Trigger:
- work order marked billing-ready in Creator

Actions:
1. create estimate or invoice in Books
2. store Books record ID in Creator
3. update billing status dashboard

## Flow 5: Payment Received

Trigger:
- invoice payment posted in Books

Actions:
1. update customer balance in Creator
2. mark invoice paid or partially paid
3. close service workflow if all deliverables are complete

## Minimal End-To-End Version

If we build the first version fast, these are the only automations we need to go live:

1. CRM customer sync to Creator
2. Creator approved request to FSM work order
3. FSM completion to Creator update
4. Creator billing-ready to Books invoice
5. Books payment to Creator status refresh

## Suggested Build Order In Creator

1. forms and reports
2. connections and auth
3. shared logging utilities
4. CRM sync functions
5. FSM functions
6. Books functions
7. dashboards and exception reporting
