# ACS Control Center Solution Architecture

## Platform Design

`ACS Control Center` should be built in Zoho Creator with Creator acting as the command center for data, UI, and workflow orchestration.

### System Responsibilities

`Zoho Creator`
- custom forms, reports, dashboards, and admin console
- business-specific workflow logic
- approval routing
- cross-app automation and sync monitoring

`Zoho CRM`
- leads
- accounts
- contacts
- deals / opportunities
- customer lifecycle status

`Zoho FSM`
- service requests
- work orders
- service appointments
- technician assignment
- job completion notes, parts, and field updates

`Zoho Books`
- customer records used for finance
- estimates
- invoices
- payments
- balance tracking

## Recommended Creator Data Model

### 1. Customers
- Customer_ID
- CRM_Account_ID
- Books_Customer_ID
- Primary_Contact_ID
- Customer_Name
- Service_Address
- Billing_Address
- Phone
- Email
- Customer_Status
- Balance_Due

### 2. Contacts
- Contact_ID
- CRM_Contact_ID
- Customer_ID
- Full_Name
- Role
- Phone
- Email

### 3. Service_Requests
- Request_ID
- CRM_Deal_ID
- Customer_ID
- Request_Type
- Priority
- Source
- Problem_Description
- Requested_Date
- Approval_Status
- Requested_By

### 4. Work_Orders
- Work_Order_ID
- FSM_Work_Order_ID
- Customer_ID
- Request_ID
- Assigned_Tech
- Scheduled_Start
- Scheduled_End
- Job_Status
- Completion_Date
- Completion_Notes

### 5. Estimates
- Estimate_ID
- Books_Estimate_ID
- Customer_ID
- Work_Order_ID
- Amount
- Status
- Approved_Date

### 6. Invoices
- Invoice_ID
- Books_Invoice_ID
- Customer_ID
- Work_Order_ID
- Invoice_Number
- Amount
- Due_Date
- Payment_Status

### 7. Sync_Log
- Sync_Log_ID
- Source_System
- Target_System
- Record_Type
- Source_Record_ID
- Target_Record_ID
- Sync_Status
- Sync_Time
- Error_Message

## Key Workflow Design

### Sales To Service
1. Lead enters CRM.
2. Lead is qualified and converted to Account / Contact / Deal.
3. Creator receives or pulls the customer and opportunity data.
4. Service request is created in Creator.

### Service Approval To Dispatch
1. Office team reviews request in Creator.
2. Once approved, Creator creates the job in FSM.
3. Technician is assigned and appointment is scheduled in FSM.
4. Creator dashboard reflects dispatch status.

### Job Completion To Billing
1. Technician completes work in FSM.
2. Completion data syncs to Creator.
3. Creator checks billable status and pricing rules.
4. Creator creates estimate or invoice in Books.
5. Payment status syncs back into Creator.

## Automation Priorities

### Priority 1
- CRM account/contact sync into Creator
- Creator to FSM work order creation
- FSM completion status back into Creator
- Creator to Books invoice creation

### Priority 2
- payment sync from Books
- overdue invoice alerts
- technician productivity dashboard
- SLA breach tracking

### Priority 3
- customer self-service portal
- job photo/document attachments
- renewal reminders
- recurring maintenance contract automation

## Security And Roles

### Office Admin
- full access

### Dispatch
- customers, service requests, schedules, work orders

### Billing
- estimates, invoices, balances, payment tracking

### Technician
- assigned work orders only
- job status update
- notes and completion details

### Management
- dashboards, KPIs, audit views

## Integration Approach

Use Zoho OAuth connections inside Creator and centralize integration logic in Deluge functions.

Recommended pattern:

1. Create one integration function group per app:
   - `crm_sync_*`
   - `fsm_sync_*`
   - `books_sync_*`
2. Route all creates and updates through reusable functions.
3. Log every sync result into `Sync_Log`.
4. Add retry handling for transient failures.

## First Build Milestone

The first usable release should support:

1. create customer records
2. create service requests
3. send approved work to FSM
4. receive completion updates
5. create invoices in Books
6. display open balances and job status in a single dashboard
