# ACS Control Center (Zoho Creator) Build Pack

This is a copy/paste build guide (forms + fields + workflows + functions) to recreate a clean Creator backend that matches your FlutterFlow app layout (Dashboard, Customers, Jobs/Work Orders, Schedule, Quotes, Invoices, AI Inbox).

## Important Notes
- Zoho Creator does not support “uploading” workflows/functions as a standalone file. The fastest path is: create the forms/fields first, then paste the Deluge scripts into the correct workflows/functions.
- This pack assumes **new / clean** forms so the **field link names match** what the scripts expect.
- If your existing Creator app uses different field link names, either:
  1. Create a fresh app and match these names, or
  2. Tell me your exact field link names and I will remap the scripts.

## Connections (Use Your Existing Names)
Use these connection link names exactly (as you told me):
- CRM: `zohocrm_connection1`
- Books: `zoho_books_connection` (Books Org ID: `894211808`)
- FSM: `zoho_fsm_oauth` (FSM Org ID: `901888065`)
- (Optional) General Zoho: `zoho_oauth_connection`

## System Counters (Form)
### Form: `System_Counters`
Fields:
- `Counter_Name` (Single line, **Primary key** idea)
- `Prefix` (Single line)
- `Next_Number` (Number, no decimals)
- `Pad_Length` (Number, optional; default 0)
- `Active` (Checkbox, default true)

Seed records (your requested starting points):
- Customer: `Counter_Name="Customer"`, `Prefix="CUS-"`, `Next_Number=1001`, `Pad_Length=0`
- ServiceRequest: `Counter_Name="ServiceRequest"`, `Prefix="REQ-"`, `Next_Number=3`, `Pad_Length=6` (REQ-000003)
- Invoice: `Counter_Name="Invoice"`, `Prefix="INV-"`, `Next_Number=22`, `Pad_Length=7` (INV-0000022)
- Quote: `Counter_Name="Quote"`, `Prefix="QT-"`, `Next_Number=8`, `Pad_Length=0`
- WorkOrder: `Counter_Name="WorkOrder"`, `Prefix="WO-"`, `Next_Number=50`, `Pad_Length=0`
- MaintenancePlan: `Counter_Name="MaintenancePlan"`, `Prefix="MP-"`, `Next_Number=1001`, `Pad_Length=0`

## Sync Log (Form)
### Form: `Sync_Log`
Fields:
- `Event_Type` (Single line)
- `Source_App` (Single line)
- `Source_Record_ID` (Single line)
- `Target_App` (Single line)
- `Target_Record_ID` (Single line)
- `Status` (Single select: Success, Error)
- `Error_Details` (Multi-line)
- `Last_Attempt_Time` (Date-Time)
- `Added_User` (Single line)

## Message Log (Form)
### Form: `Message_Log`
Fields:
- `Channel` (Single select: SMS, Email)
- `Related_Form` (Single line)
- `Related_Record_ID` (Single line)
- `Customer_Name` (Single line)
- `Phone` (Single line)
- `Email` (Email)
- `Message_Type` (Single line)
- `Message_Body` (Multi-line)
- `Status` (Single select: Queued, Sent, Failed)
- `Sent_Time` (Date-Time)
- `Added_User` (Single line)

## AI Inbox (Form)
### Form: `AI_Intake_Log`
Purpose: single “AI Inbox” for Wix + Twilio + manual intake.

Fields (match these link names):
- `AI_Intake_ID` (Single line) optional (internal ID if you want)
- `Channel` (Single select: Website Chat, Phone, SMS, Manual)
- `Customer_Name` (Single line)
- `Phone` (Single line)
- `Email` (Email)
- `Address_Text` (Multi-line)  (keep it simple; avoid Creator Address type if it causes validation pain)
- `Service_Type` (Single select)
- `Urgency` (Single select: Normal, Soon, Emergency, High, Low)
- `Preferred_Window` (Single line) (example: "Today after 2pm", "Tue 9-12")
- `Request_Summary` (Multi-line)
- `Transcript` (Multi-line) (optional, store full transcript here)
- `Intent` (Single line)
- `Chat_Session_ID` (Single line)
- `AI_Confidence` (Number, 0-100)
- `Status` (Single select: New, Needs Info, In Review, Ready, Converted, Scheduled, Closed, Duplicate)
- `Assigned_To` (Single line or User field)
- `Escalation_Flag` (Checkbox)
- `Escalation_Reason` (Multi-line)
- `Last_Sync_Source` (Single line)
- `Last_Sync_Time` (Date-Time)

### Workflow: AI_Intake_Log -> On Add -> On Success
Paste:
```deluge
// Defaults
if(input.Status == null || input.Status == "")
{
	input.Status = "New";
}
if(input.Last_Sync_Time == null)
{
	input.Last_Sync_Time = zoho.currenttime;
}
input.Last_Sync_Source = "Creator";

// Escalation rules
escalationFlag = false;
escalationReasonText = "";

if(input.Urgency == "Emergency")
{
	escalationFlag = true;
	escalationReasonText = "Emergency urgency from intake.";
}
else if(input.Channel == "Phone" || input.Channel == "SMS")
{
	escalationFlag = true;
	escalationReasonText = "Phone/SMS intake should be reviewed promptly.";
}
else if(input.AI_Confidence != null && input.AI_Confidence < 70)
{
	escalationFlag = true;
	escalationReasonText = "Low AI confidence on intake.";
}
else if(input.Intent == null || input.Intent == "")
{
	escalationFlag = true;
	escalationReasonText = "Intent unclear.";
}

input.Escalation_Flag = escalationFlag;
input.Escalation_Reason = escalationReasonText;

// If missing key fields, route to Needs Info
if((input.Customer_Name == null || input.Customer_Name == "") || (input.Phone == null || input.Phone == "") && (input.Email == null || input.Email == "") || (input.Address_Text == null || input.Address_Text == "") || (input.Service_Type == null || input.Service_Type == "") || (input.Preferred_Window == null || input.Preferred_Window == ""))
{
	input.Status = "Needs Info";
}
```

## Customers (Form)
### Form: `Customers`
Fields:
- `Customer_ID` (Single line) (business ID like CUS-1001)
- `Name` (Name field) OR (`First_Name`, `Last_Name`) (pick ONE pattern)
- `Phone` (Single line)
- `Email` (Email)
- `Address_Text` (Multi-line)
- `Customer_Type` (Single select: Residential, Commercial)
- `CRM_Contact_ID` (Single line)
- `CRM_Account_ID` (Single line) (for commercial)
- `Books_Contact_ID` (Single line)
- `FSM_Contact_ID` (Single line)
- `Last_Sync_Source` (Single line)
- `Last_Sync_Time` (Date-Time)
- `Sync_Status` (Single select: Pending, Synced, Error)
- `Sync_Error` (Multi-line)

### Workflow: Customers -> On Add -> On Success (ID generation)
Paste:
```deluge
customerCounter = System_Counters[Counter_Name == "Customer"];
if(customerCounter.count() == 0)
{
	// Safety: create the counter if missing
	insert into System_Counters
	[
		Counter_Name="Customer"
		Prefix="CUS-"
		Next_Number=1001
		Pad_Length=0
		Active=true
	];
	customerCounter = System_Counters[Counter_Name == "Customer"];
}

nextNum = customerCounter.Next_Number;
prefix = ifnull(customerCounter.Prefix,"CUS-");
pad = ifnull(customerCounter.Pad_Length,0);
numText = nextNum.toString();
if(pad != null && pad > 0)
{
	numText = numText.leftPad(pad.toLong(),"0");
}
input.Customer_ID = prefix + numText;
customerCounter.Next_Number = nextNum + 1;

input.Sync_Status = "Pending";
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

## Service Requests (Form)
### Form: `Service_Requests`
Fields:
- `Request_ID` (Single line, business ID like REQ-000003)
- `Customer` (Lookup to Customers)
- `Customer_ID` (Single line)
- `Service_Type` (Single select)
- `Urgency` (Single select)
- `Preferred_Window` (Single line)
- `Request_Summary` (Multi-line)
- `Status` (Single select: New, Approved, Scheduled, In Progress, Completed, Closed)
- `Quote_ID` (Single line) (optional link)
- `Work_Order_ID` (Single line) (optional link)
- `CRM_Deal_ID` (Single line)
- `FSM_Work_Order_ID` (Single line)
- `Last_Sync_Source` (Single line)
- `Last_Sync_Time` (Date-Time)

### Workflow: Service_Requests -> On Add -> On Success (ID generation)
```deluge
requestCounter = System_Counters[Counter_Name == "ServiceRequest"];
if(requestCounter.count() == 0)
{
	insert into System_Counters
	[
		Counter_Name="ServiceRequest"
		Prefix="REQ-"
		Next_Number=3
		Pad_Length=6
		Active=true
	];
	requestCounter = System_Counters[Counter_Name == "ServiceRequest"];
}

nextNum = requestCounter.Next_Number;
prefix = ifnull(requestCounter.Prefix,"REQ-");
pad = ifnull(requestCounter.Pad_Length,6);
numText = nextNum.toString().leftPad(pad.toLong(),"0");
input.Request_ID = prefix + numText;
requestCounter.Next_Number = nextNum + 1;

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

## Quotes (Form)
### Form: `Quotes`
Fields:
- `Quote_ID` (Single line, like QT-8)
- `Customer` (Lookup to Customers)
- `Service_Request` (Lookup to Service_Requests)
- `Service_Type` (Single select)
- `Status` (Single select: Draft, Sent, Accepted, Declined)
- `Subtotal` (Currency/Number)
- `Tax_Total` (Currency/Number)
- `Grand_Total` (Currency/Number)
- `AI_Quote_Status` (Single select: Drafted, Approved, Sent)
- `Books_Estimate_ID` (Single line)
- `Last_Sync_Source` (Single line)
- `Last_Sync_Time` (Date-Time)

### Workflow: Quotes -> On Add -> On Success (ID generation)
```deluge
quoteCounter = System_Counters[Counter_Name == "Quote"];
if(quoteCounter.count() == 0)
{
	insert into System_Counters
	[
		Counter_Name="Quote"
		Prefix="QT-"
		Next_Number=8
		Pad_Length=0
		Active=true
	];
	quoteCounter = System_Counters[Counter_Name == "Quote"];
}
nextNum = quoteCounter.Next_Number;
prefix = ifnull(quoteCounter.Prefix,"QT-");
input.Quote_ID = prefix + nextNum.toString();
quoteCounter.Next_Number = nextNum + 1;
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

## Work Orders (Form)
### Form: `FSM_Work_Orders` (your Creator-side mirror)
Fields:
- `Work_Order_ID` (Single line, like WO-50)
- `Customer` (Lookup to Customers)
- `Service_Request` (Lookup to Service_Requests)
- `Service_Type` (Single select)
- `Status` (Single select: New, Assigned, Scheduled, In Progress, Completed, Closed)
- `Assigned_Tech` (Single line)
- `Scheduled_Start` (Date-Time)
- `Arrival_Window` (Single line)
- `Completion_Notes` (Multi-line)
- `Completion_Summary` (Multi-line)
- `Grand_Total` (Number/Currency)
- `Books_Invoice_ID` (Single line)
- `FSM_Native_Work_Order_ID` (Single line) (actual FSM record id)
- `Last_Sync_Source` (Single line)
- `Last_Sync_Time` (Date-Time)

### Workflow: FSM_Work_Orders -> On Add -> On Success (ID generation)
```deluge
woCounter = System_Counters[Counter_Name == "WorkOrder"];
if(woCounter.count() == 0)
{
	insert into System_Counters
	[
		Counter_Name="WorkOrder"
		Prefix="WO-"
		Next_Number=50
		Pad_Length=0
		Active=true
	];
	woCounter = System_Counters[Counter_Name == "WorkOrder"];
}
nextNum = woCounter.Next_Number;
prefix = ifnull(woCounter.Prefix,"WO-");
input.Work_Order_ID = prefix + nextNum.toString();
woCounter.Next_Number = nextNum + 1;
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

## Invoices (Form)
### Form: `Books_Invoices` (Creator-side mirror)
Fields:
- `Invoice_ID` (Single line, like INV-0000022)
- `Customer` (Lookup to Customers)
- `Work_Order` (Lookup to FSM_Work_Orders)
- `Status` (Single select: Draft, Sent, Paid, Void)
- `Total` (Currency/Number)
- `Balance_Due` (Currency/Number)
- `Books_Invoice_ID` (Single line) (actual Books invoice id)
- `Last_Sync_Source` (Single line)
- `Last_Sync_Time` (Date-Time)

### Workflow: Books_Invoices -> On Add -> On Success (ID generation)
```deluge
invoiceCounter = System_Counters[Counter_Name == "Invoice"];
if(invoiceCounter.count() == 0)
{
	insert into System_Counters
	[
		Counter_Name="Invoice"
		Prefix="INV-"
		Next_Number=22
		Pad_Length=7
		Active=true
	];
	invoiceCounter = System_Counters[Counter_Name == "Invoice"];
}

nextNum = invoiceCounter.Next_Number;
prefix = ifnull(invoiceCounter.Prefix,"INV-");
pad = ifnull(invoiceCounter.Pad_Length,7);
numText = nextNum.toString().leftPad(pad.toLong(),"0");

input.Invoice_ID = prefix + numText;
invoiceCounter.Next_Number = nextNum + 1;

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

## “Playbooks” (Functions)
Create these as **Creator Functions** (Setup -> Developer Space -> Functions) and call them from your AI Inbox buttons.

### Function: `Playbook_CreateCustomerRequestWorkOrder`
Inputs:
- `aiIntakeId` (AI_Intake_Log record ID)

Behavior:
1) Create/Link Customer
2) Create Service Request
3) Create Work Order
4) Update AI Intake Status -> Converted

Skeleton (you will paste and then map fields):
```deluge
ai = AI_Intake_Log[ID == input.aiIntakeId];
if(ai.count() == 0)
{
	return {"ok":false,"error":"AI intake not found"};
}

// 1) Match/Create Customer by phone/email
cust = Customers[Phone == ai.Phone];
if(cust.count() == 0 && ai.Email != null && ai.Email != "")
{
	cust = Customers[Email == ai.Email];
}

custId = 0;
if(cust.count() > 0)
{
	custId = cust.ID;
}
else
{
	custId = insert into Customers
	[
		// If you use Name field, set Name.first_name/last_name instead of Customer_Name
		Phone=ai.Phone
		Email=ai.Email
		Address_Text=ai.Address_Text
		Customer_Type="Commercial" // change if needed
		Added_User=zoho.loginuser
	];
}

// 2) Create Service Request
reqId = insert into Service_Requests
[
	Customer=custId
	Customer_ID=Customers[ID == custId].Customer_ID
	Service_Type=ai.Service_Type
	Urgency=ai.Urgency
	Preferred_Window=ai.Preferred_Window
	Request_Summary=ai.Request_Summary
	Status="New"
	Added_User=zoho.loginuser
];

// 3) Create Work Order
woId = insert into FSM_Work_Orders
[
	Customer=custId
	Service_Request=reqId
	Service_Type=ai.Service_Type
	Status="New"
	Added_User=zoho.loginuser
];

// 4) Update AI intake
ai.Status = "Converted";
ai.Last_Sync_Source = "Creator";
ai.Last_Sync_Time = zoho.currenttime;

insert into Sync_Log
[
	Event_Type="Playbook Convert"
	Source_App="Creator"
	Source_Record_ID=ai.ID.toString()
	Target_App="Creator"
	Target_Record_ID=reqId.toString()
	Status="Success"
	Error_Details=""
	Last_Attempt_Time=zoho.currenttime
	Added_User=zoho.loginuser
];

return {"ok":true,"customer_id":custId,"request_id":reqId,"work_order_id":woId};
```

---

## What To Do Next (Fastest Launch Path)
1) Create these forms with the specified field link names.
2) Paste the counter workflows (Customers, Service Requests, Quotes, Work Orders, Invoices).
3) Use AI_Intake_Log as your “AI Inbox” list in FlutterFlow immediately.
4) Add playbook buttons later (start with Convert -> create Customer + Request + Work Order).

