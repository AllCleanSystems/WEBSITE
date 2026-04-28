# First Automation Sequence

## Target

Set up one complete automation path first:

`Service Request -> Customer Match/Create -> CRM Contact -> FSM Work Order -> Books Invoice`

## Sequence

### 1. Service Request Submitted

Creator should:

- normalize phone and email
- search `Customers`
- if no match, create `Customers` record
- update `Service Requests.Customer ID`

### 2. CRM Contact Sync

After customer is linked:

- create CRM contact if `CRM ID` is blank
- otherwise update the CRM contact
- write returned `CRM ID` to `Customers` and `Service Requests`

### 3. Approval Event

When `Request Status = Approved`:

- create FSM work order
- write `Work Order ID`
- set `Request Status = Dispatched`

### 4. Completion Event

When FSM work order status becomes completed:

- update `FSM Work Orders`
- create invoice payload
- create invoice in Books
- write returned `Invoice ID`

### 5. Closeout Event

When invoice is paid:

- update `Books Invoices`
- update customer balance
- mark service request closed

## Important Rule

Every cross-app action must write one record to `Sync Log`.
