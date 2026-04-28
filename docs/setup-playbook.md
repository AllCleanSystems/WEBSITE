# ACS Control Center Setup Playbook

## Goal

Set up `ACS Control Center` so the app runs the office workflow automatically:

- intake
- customer matching
- quote preparation
- work order creation
- invoicing
- payment follow-up
- AI-assisted communication

## Build Order

Do the setup in this order:

1. standardize forms
2. add system forms
3. connect Zoho apps
4. set workflow triggers
5. build sync functions
6. build dashboard and exception views
7. add AI channels

## Step 1: Standardize Existing Forms

Keep these as core forms:

- `Service Requests`
- `Customers`
- `CRM Contacts`
- `FSM Work Orders`
- `Books Customers`
- `Books Invoices`
- `Quote Catalog`
- `Quote Items`
- `Quote Line Items`

For each form:

1. make sure there is one primary key field
2. make sure there is one external ID field per connected app
3. make sure there is one status field
4. make sure there is one last sync timestamp field
5. make sure there is one last sync source field

Recommended required fields by form:

### Service Requests
- `Request ID`
- `Customer Name`
- `Phone`
- `Email`
- `Service Type`
- `Request Status`
- `Square Footage`
- `Preferred Date`
- `Special Instructions`
- `Customer ID`
- `CRM ID`
- `FSM Work Order ID`

### Customers
- `Customer ID`
- `Name`
- `Phone`
- `Email`
- `Address`
- `CRM ID`
- `Books Customer ID`
- `Customer Status`

### CRM Contacts
- `CRM ID`
- `Full Name`
- `Email`
- `Phone`
- `Last Sync Source`
- `Books Customers` lookup or `Customer ID`

### FSM Work Orders
- `Work Order ID`
- `Customer Name`
- `Status`
- `Scheduled Date`
- `Raw JSON`
- `Creator Request ID`

### Books Invoices
- `Invoice ID`
- `Customer ID`
- `CRM ID`
- `Total`
- `Balance Due`
- `Status`
- `Books Customer`
- `Contact Name`

### Quote Catalog
- `Item Name`
- `Service Type`
- `Item Category`
- `Item Description`
- `Base Price`
- `Unit Type`
- `Default Qty`
- `Active`

## Step 2: Add System Forms

Add these 3 forms next.

### Sync Log
- `Event Type`
- `Source App`
- `Source Record ID`
- `Target App`
- `Target Record ID`
- `Status`
- `Error Details`
- `Retry Count`
- `Last Attempt Time`

### Automation Queue
- `Queue Type`
- `Related Form`
- `Related Record ID`
- `Action Name`
- `Payload JSON`
- `Queue Status`
- `Next Retry Time`

### AI Activity Log
- `Channel`
- `Related Customer`
- `Related Request`
- `Prompt Summary`
- `Action Taken`
- `Output Summary`
- `Human Review Required`

## Step 3: Set Up Connections

Inside Zoho Creator:

1. open `Settings`
2. open `Connections`
3. add connections for:
   - `Zoho CRM`
   - `Zoho Books`
   - `Zoho FSM`

Use clear names:

- `crm_connection`
- `books_connection`
- `fsm_connection`

## Step 4: Create Workflow Triggers

Start with these workflows only.

### Workflow A: On Service Request Submit

Trigger:
- on successful form submission

Actions:
- find matching customer by phone/email
- create customer if missing
- create or update CRM contact
- write to sync log

### Workflow B: On Service Request Approval

Trigger:
- when `Request Status` changes to `Approved`

Actions:
- create FSM work order
- store returned `Work Order ID`
- set request status to `Dispatched`
- log event

### Workflow C: On Work Order Completion

Trigger:
- when `FSM Work Orders.Status` becomes `Completed`

Actions:
- prepare invoice data
- create Books invoice
- update service request
- log event

### Workflow D: On Invoice Paid

Trigger:
- invoice sync or scheduled payment refresh

Actions:
- update balance due
- mark request financially closed
- trigger customer thank-you / review request

## Step 5: Build Deluge Function Groups

Create these function groups:

### Shared
- `log_sync_event`
- `queue_failed_automation`
- `normalize_phone`
- `find_existing_customer`

### CRM
- `crm_upsert_contact_from_request`
- `crm_push_customer_update`

### FSM
- `fsm_create_work_order_from_request`
- `fsm_pull_work_order_status`

### Books
- `books_create_customer_if_missing`
- `books_create_invoice_from_work_order`
- `books_refresh_payment_status`

## Step 6: Dashboard

The home dashboard should show:

- open requests
- open jobs
- jobs due today
- overdue invoices
- outstanding balance
- automation failures
- AI conversations needing review

## Step 7: AI Layer

Add AI only after the operational workflow is stable.

### AI Receptionist
- capture caller name
- capture service need
- identify emergency
- create service request

### Website Chat
- qualify lead
- answer common questions
- create request or callback

### Internal AI Assistant
- summarize customer history
- draft quotes
- draft job summaries
- recommend next actions

## First Live Scenario To Test

1. create a new service request
2. auto-create or match customer
3. create CRM contact
4. approve request
5. create FSM work order
6. mark work order complete
7. create Books invoice
8. mark payment received
9. confirm dashboard updates
