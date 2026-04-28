# ACS Control Center Competitive Edge Roadmap

## Product Goal

Build `ACS Control Center` into an automation-first field service operating system that removes as much office/admin work as possible and creates an advantage over Jobber.

The app should handle:

- intake
- quoting
- scheduling
- work order orchestration
- invoicing
- payment follow-up
- customer updates
- reporting
- AI-assisted communication

The only thing left for people should be high-value decision making and the actual field work.

## What Already Exists

From the current app structure and form screenshots, the app already has a useful base:

- `Service Requests`
- `FSM Work Orders`
- `Books Customers`
- `Books Invoices`
- `CRM Contacts`
- `Customers`
- `Quote Catalog`
- `Quote Items`
- `Quote Line Items`
- dashboards and reports

## Current Strength

The forms already include key sync-oriented fields such as:

- external IDs like `CRM ID`, `Books Customer ID`, `Invoice ID`, `Work Order ID`
- status fields
- last sync tracking
- source-system references

That is the correct foundation for an orchestration app.

## Main Problem To Fix

Right now the app appears to be organized as data-entry forms plus report storage, but the real competitive edge will come from turning it into an event-driven system.

The app should not require staff to enter the same information in multiple places.

## Recommended System Of Record

`Creator`
- service requests
- dispatch dashboard
- quote building workflow
- AI command center
- sync log
- admin exception queue

`CRM`
- leads
- contacts
- account relationship history

`FSM`
- work orders
- appointments
- technician execution

`Books`
- invoice objects
- customer finance data
- payments

## Immediate Architecture Cleanup

1. Standardize the naming of forms and reports.
2. Make one report per form the default operational view.
3. Add one `Sync Log` form and report for all integration events.
4. Add one `Automation Queue` form for retries and failures.
5. Add one `AI Activity Log` form to track AI actions, summaries, and messages sent.

## Recommended Core Automations

### 1. Intake Automation

When a service request is submitted:

- detect if customer already exists
- match by phone/email/address
- create or update customer record
- create CRM contact if missing
- classify service type automatically
- assign priority automatically

### 2. Quote Automation

When a quote is being built:

- auto-load line items from quote catalog
- suggest bundles based on service type
- suggest upsells
- calculate totals automatically
- generate customer-ready quote text

### 3. Dispatch Automation

When a request is approved:

- create FSM work order
- set initial status
- create appointment window
- notify assigned technician
- notify customer with ETA window

### 4. Completion Automation

When FSM marks work complete:

- pull completion details into Creator
- verify billable items
- build invoice draft automatically
- trigger customer follow-up message

### 5. Billing Automation

When an invoice is created or updated:

- sync invoice to Books
- refresh balance due in Creator
- remind on overdue balances
- mark jobs financially closed once paid

## Competitive Features Beyond Jobber

### AI Receptionist

- answer missed calls
- collect caller info
- classify emergency vs standard request
- create service request automatically
- book callback slots

### Website AI Chat

- qualify inbound leads
- answer service questions
- recommend service category
- create service request or quote request
- hand off to human only when needed

### AI Dispatcher Assistant

- summarize new requests
- suggest which tech should take the job
- flag schedule conflicts
- suggest route and priority changes

### AI Quote Assistant

- draft quote descriptions
- recommend line items
- generate customer-friendly scope wording
- propose upsell options

### AI Collections / Follow-Up

- send payment reminders
- send appointment reminders
- send review requests
- send maintenance follow-up messages

## Best Next Build Order

### Phase 1
- stabilize form structure
- add sync log
- add automation queue
- finalize field mapping across CRM, Books, FSM, and Creator

### Phase 2
- automate `Service Request -> Customer Match/Create`
- automate `Approved Request -> FSM Work Order`
- automate `FSM Complete -> Invoice Draft`

### Phase 3
- automate quote assembly from quote catalog
- automate customer messaging
- automate payment reminders and closeout

### Phase 4
- integrate OpenAI-powered receptionist and web chat
- add AI summaries and recommended actions for staff

## Forms To Add

### Sync Log
- Event Type
- Source App
- Source Record ID
- Target App
- Target Record ID
- Status
- Error Details
- Retry Count
- Last Attempt Time

### Automation Queue
- Queue Type
- Related Form
- Related Record ID
- Action Name
- Payload JSON
- Queue Status
- Next Retry Time

### AI Activity Log
- Channel
- Related Customer
- Related Request
- Prompt Summary
- Action Taken
- Output Summary
- Human Review Required

## Success Metric

The app wins when the office team only needs to handle exceptions.

Everything else should be triggered, suggested, drafted, synced, or sent automatically.
