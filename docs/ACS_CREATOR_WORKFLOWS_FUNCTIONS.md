# ACS Creator Workflows + Functions (Copy/Paste)

This file is only Deluge scripts, organized by where to paste them in Zoho Creator.

Assumptions:
- You have forms named: `System_Counters`, `AI_Intake_Log`, `Customers`, `Service_Requests`, `Quotes`, `Quote_Line_Items`, `FSM_Work_Orders`, `Books_Invoices`.
- Your link names match the field names used below. If not, tell me your link names and I’ll remap.

---

## 1) AI_Intake_Log

### Workflow: AI_Intake_Log -> On Add -> On Success
```deluge
// Defaults
if(input.Status == null || input.Status == "")
{
	input.Status = "New";
}
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;

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

// Route to Needs Info if key fields missing
missingKey = false;
if(input.Customer_Name == null || input.Customer_Name == "")
{
	missingKey = true;
}
if((input.Phone == null || input.Phone == "") && (input.Email == null || input.Email == ""))
{
	missingKey = true;
}
if(input.Address_Text == null || input.Address_Text == "")
{
	missingKey = true;
}
if(input.Service_Type == null || input.Service_Type == "")
{
	missingKey = true;
}
if(input.Preferred_Window == null || input.Preferred_Window == "")
{
	missingKey = true;
}
if(missingKey == true)
{
	input.Status = "Needs Info";
}
```

---

## 2) System_Counters Helpers

### Function: `GetNextCounterId`
Create a Creator Function with inputs:
- `counterName` (String)
- `defaultPrefix` (String)
- `defaultNextNumber` (Number)
- `padLength` (Number)

Returns a Map: `{ "id": "REQ-000003", "next": 4 }`
```deluge
resp = Map();
cn = input.counterName;

counterRec = System_Counters[Counter_Name == cn];
if(counterRec.count() == 0)
{
	insert into System_Counters
	[
		Counter_Name=cn
		Prefix=input.defaultPrefix
		Next_Number=input.defaultNextNumber
		Pad_Length=input.padLength
		Active=true
	];
	counterRec = System_Counters[Counter_Name == cn];
}

nextNum = counterRec.Next_Number;
prefix = ifnull(counterRec.Prefix,input.defaultPrefix);
pad = ifnull(counterRec.Pad_Length,input.padLength);

numText = nextNum.toString();
if(pad != null && pad > 0)
{
	numText = numText.leftPad(pad.toLong(),"0");
}

resp.put("id",prefix + numText);
resp.put("next",nextNum + 1);
return resp;
```

---

## 3) Customers

### Workflow: Customers -> On Add -> On Success (Customer_ID)
```deluge
r = GetNextCounterId("Customer","CUS-",1001,0);
input.Customer_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "Customer"];
counterRec.Next_Number = r.get("next");

input.Sync_Status = "Pending";
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

---

## 4) Service_Requests

### Workflow: Service_Requests -> On Add -> On Success (Request_ID)
```deluge
r = GetNextCounterId("ServiceRequest","REQ-",3,6);
input.Request_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "ServiceRequest"];
counterRec.Next_Number = r.get("next");

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

---

## 5) Quotes

### Workflow: Quotes -> On Add -> On Success (Quote_ID)
```deluge
r = GetNextCounterId("Quote","QT-",8,0);
input.Quote_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "Quote"];
counterRec.Next_Number = r.get("next");

if(input.Subtotal == null) input.Subtotal = 0;
if(input.Tax_Total == null) input.Tax_Total = 0;
if(input.Grand_Total == null) input.Grand_Total = 0;

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

### Function: `Recalc_Quote_Totals`
Inputs:
- `quoteId` (Number)  (this is the Creator record ID of the Quotes form)
```deluge
q = Quotes[ID == input.quoteId];
if(q.count() == 0)
{
	return;
}

subtotalValue = 0;
taxTotalValue = 0;

items = Quote_Line_Items[Quote == q.ID];
for each li in items
{
	includeLine = true;

	// Optional item logic: only include if selected
	if(li.Optional_Item != null && li.Optional_Item == true)
	{
		includeLine = (li.Selected_By_Customer != null && li.Selected_By_Customer == true);
	}

	if(includeLine == true)
	{
		if(li.Line_Total != null)
		{
			subtotalValue = subtotalValue + li.Line_Total;
		}
		if(li.Tax_Amount != null)
		{
			taxTotalValue = taxTotalValue + li.Tax_Amount;
		}
	}
}

q.Subtotal = subtotalValue;
q.Tax_Total = taxTotalValue;
q.Grand_Total = subtotalValue + taxTotalValue;
q.Last_Sync_Source = "Creator";
q.Last_Sync_Time = zoho.currenttime;
```

### Workflow: Quote_Line_Items -> On Add -> On Success
```deluge
if(input.Quote != null)
{
	Recalc_Quote_Totals(input.Quote);
}
```

### Workflow: Quote_Line_Items -> On Update -> On Success
```deluge
if(input.Quote != null)
{
	Recalc_Quote_Totals(input.Quote);
}
```

### Workflow: Quote_Line_Items -> On Delete -> On Success
```deluge
// input.Quote is not always available on delete depending on setup.
// If you have the quote id in a variable, call Recalc_Quote_Totals(<quoteId>).
```

---

## 6) FSM_Work_Orders (Creator mirror)

### Workflow: FSM_Work_Orders -> On Add -> On Success (Work_Order_ID)
```deluge
r = GetNextCounterId("WorkOrder","WO-",50,0);
input.Work_Order_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "WorkOrder"];
counterRec.Next_Number = r.get("next");

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

---

## 7) Books_Invoices (Creator mirror)

### Workflow: Books_Invoices -> On Add -> On Success (Invoice_ID)
```deluge
r = GetNextCounterId("Invoice","INV-",22,7);
input.Invoice_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "Invoice"];
counterRec.Next_Number = r.get("next");

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

---

## 8) Playbook: Convert AI Intake -> Customer + Service Request + Work Order

### Function: `Playbook_Convert_AI_Intake`
Inputs:
- `aiIntakeId` (Number) (Creator record ID for `AI_Intake_Log`)
```deluge
ai = AI_Intake_Log[ID == input.aiIntakeId];
if(ai.count() == 0)
{
	return {"ok":false,"error":"AI intake not found"};
}

// Match/Create Customer by phone/email
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
	// If your Customers form uses a Name field instead of First/Last, change this insert accordingly.
	custId = insert into Customers
	[
		Phone=ai.Phone
		Email=ai.Email
		Address_Text=ai.Address_Text
		Customer_Type="Commercial"
		Last_Sync_Source="Creator"
		Last_Sync_Time=zoho.currenttime
		Sync_Status="Pending"
	];
}

// Create Service Request
reqId = insert into Service_Requests
[
	Customer=custId
	Service_Type=ai.Service_Type
	Urgency=ai.Urgency
	Preferred_Window=ai.Preferred_Window
	Request_Summary=ai.Request_Summary
	Status="New"
	Last_Sync_Source="Creator"
	Last_Sync_Time=zoho.currenttime
];

// Create Work Order (Creator mirror)
woId = insert into FSM_Work_Orders
[
	Customer=custId
	Service_Request=reqId
	Service_Type=ai.Service_Type
	Status="New"
	Last_Sync_Source="Creator"
	Last_Sync_Time=zoho.currenttime
];

// Update AI intake status
ai.Status = "Converted";
ai.Last_Sync_Source = "Creator";
ai.Last_Sync_Time = zoho.currenttime;

return {"ok":true,"customer_id":custId,"service_request_id":reqId,"work_order_id":woId};

# ACS Control Center (Zoho Creator) Master Pack

This is the **one file** you can follow to rebuild the core setup: **forms**, **fields**, **workflows**, and **functions**.

Goal:
- Website + Phone AI create `AI_Intake_Log`
- You can convert an intake into `Customer` + `Service Request` + `Work Order`
- Consistent business IDs (CUS-, REQ-, QT-, WO-, INV-, MP-)
- Quote totals auto-calc from line items

If something in your app uses different field link names, tell me the exact link names and I will remap.

---

## A) Forms To Create (Minimum)

Create these forms in Zoho Creator (Form link names in **bold** are what the scripts below assume):

1. **System_Counters**
2. **AI_Intake_Log**
3. **Customers**
4. **Service_Requests**
5. **Quotes**
6. **Quote_Line_Items**
7. **FSM_Work_Orders** (Creator mirror for FSM)
8. **Books_Invoices** (Creator mirror for Books)

Optional (recommended later):
9. `Sync_Log`
10. `Message_Log`

---

## B) Fields Needed (Core)

### 1) System_Counters (Form: `System_Counters`)
Fields:
- `Counter_Name` (Single Line)
- `Prefix` (Single Line)
- `Next_Number` (Number)
- `Pad_Length` (Number)
- `Active` (Checkbox)

Seed records you MUST add (exact spelling matters):
- Customer: `Counter_Name=Customer`, `Prefix=CUS-`, `Next_Number=1001`, `Pad_Length=0`, `Active=true`
- Service Request: `Counter_Name=ServiceRequest`, `Prefix=REQ-`, `Next_Number=3`, `Pad_Length=6`, `Active=true`
- Quote: `Counter_Name=Quote`, `Prefix=QT-`, `Next_Number=8`, `Pad_Length=0`, `Active=true`
- Work Order: `Counter_Name=WorkOrder`, `Prefix=WO-`, `Next_Number=50`, `Pad_Length=0`, `Active=true`
- Invoice: `Counter_Name=Invoice`, `Prefix=INV-`, `Next_Number=22`, `Pad_Length=7`, `Active=true`
- Maintenance Plan: `Counter_Name=MaintenancePlan`, `Prefix=MP-`, `Next_Number=1001`, `Pad_Length=0`, `Active=true`

If you ever see:
`'requestCounter' has no matching records`
It means your `Counter_Name` spelling does not match what the workflow is searching for.

### 2) AI_Intake_Log (Form: `AI_Intake_Log`)
Fields (minimum):
- `Status` (Dropdown)
- `Channel` (Dropdown)
- `Customer_Name` (Single Line)
- `Phone` (Phone)
- `Email` (Email)
- `Address_Text` (Multi Line or Single Line)
- `Service_Type` (Dropdown)
- `Urgency` (Dropdown)
- `Preferred_Window` (Dropdown)
- `Request_Summary` (Multi Line)
- `Intent` (Single Line)
- `AI_Confidence` (Number)
- `Chat_Session_ID` (Single Line)
- `Escalation_Flag` (Checkbox)
- `Escalation_Reason` (Multi Line)
- `Last_Sync_Source` (Single Line)
- `Last_Sync_Time` (Single Line OR Date-Time)

Service Type options (replace yours with this list):
- Restaurant Hood Cleaning
- Deep Cleaning
- Commercial Cleaning
- Carpet Cleaning
- Lawn Maintenance
- Mowing
- Shrub Trimming
- Mulch Installation
- Snow Removal
- Other Services

Urgency options:
- Normal
- Urgent
- Emergency

Preferred_Window options (simple starter):
- Morning
- Afternoon
- Evening
- ASAP

### 3) Customers (Form: `Customers`)
Fields (minimum):
- `Customer_ID` (Single Line)
- `Customer_Name` (Single Line) (or a Name field if you prefer)
- `Phone` (Phone)
- `Email` (Email)
- `Address_Text` (Multi Line or Single Line)
- `Customer_Type` (Dropdown)
- `Sync_Status` (Dropdown or Single Line)
- `Last_Sync_Source` (Single Line)
- `Last_Sync_Time` (Single Line OR Date-Time)

### 4) Service_Requests (Form: `Service_Requests`)
Fields (minimum):
- `Request_ID` (Single Line)
- `Customer` (Lookup -> Customers)
- `Customer_ID` (Single Line) (optional, if you want a stored copy)
- `Customer_Name` (Single Line) (optional, stored copy)
- `Phone` (Phone) (optional, stored copy)
- `Email` (Email) (optional, stored copy)
- `Address_Text` (Multi Line) (optional, stored copy)
- `Service_Type` (Dropdown)
- `Urgency` (Dropdown)
- `Preferred_Window` (Dropdown)
- `Request_Summary` (Multi Line)
- `Request_Status` (Dropdown) (New, Needs Info, Approved, Scheduled, Completed, Canceled)
- `Quote_ID` (Single Line) (optional)
- `Last_Sync_Source` (Single Line)
- `Last_Sync_Time` (Single Line OR Date-Time)

### 5) Quotes (Form: `Quotes`)
Fields:
- `Quote_ID` (Single Line)
- `Customer` (Lookup -> Customers) (optional but recommended)
- `Service_Request` (Lookup -> Service_Requests) (optional but recommended)
- `Service_Request_ID` (Single Line) (optional stored copy)
- `Customer_ID` (Single Line) (optional stored copy)
- `Service_Type` (Dropdown)
- `Notes` (Multi Line)
- `Subtotal` (Currency/Number)
- `Tax_Total` (Currency/Number)
- `Grand_Total` (Currency/Number)
- `AI_Quote_Status` (Dropdown) (Drafted, Sent, Approved, Declined)
- `Last_Sync_Source` (Single Line)
- `Last_Sync_Time` (Single Line OR Date-Time)

### 6) Quote_Line_Items (Form: `Quote_Line_Items`)
Fields:
- `Quote` (Lookup -> Quotes)
- `Line_Description` (Single Line / Multi Line)
- `Quantity` (Number)
- `Unit_Price` (Currency/Number)
- `Line_Total` (Currency/Number)
- `Tax_Amount` (Currency/Number)
- `Optional_Item` (Checkbox)
- `Selected_By_Customer` (Checkbox)

### 7) FSM_Work_Orders (Form: `FSM_Work_Orders`)
Fields (minimum):
- `Work_Order_ID` (Single Line)
- `Customer` (Lookup -> Customers)
- `Service_Request` (Lookup -> Service_Requests)
- `Service_Type` (Dropdown)
- `Status` (Dropdown) (New, Assigned, Scheduled, In Progress, Completed, Canceled)
- `Completion_Notes` (Multi Line) (optional)
- `Completion_Summary` (Multi Line) (optional for AI)
- `Dispatch_Status` (Dropdown) (optional)
- `Dispatch_Summary` (Multi Line) (optional)
- `Last_Sync_Source` (Single Line)
- `Last_Sync_Time` (Single Line OR Date-Time)

### 8) Books_Invoices (Form: `Books_Invoices`)
Fields (minimum):
- `Invoice_ID` (Single Line)
- `Customer` (Lookup -> Customers)
- `Work_Order_ID` (Single Line) (optional)
- `Total` (Currency/Number)
- `Balance_Due` (Currency/Number)
- `Status` (Dropdown) (Draft, Sent, Paid, Overdue)
- `Last_Sync_Source` (Single Line)
- `Last_Sync_Time` (Single Line OR Date-Time)

---

## C) Functions (Create These First)

Create these in:
`Zoho Creator -> Workflow -> Functions -> + New Function`

### Function 1: `GetNextCounterId`
Inputs:
- `counterName` (String)
- `defaultPrefix` (String)
- `defaultNextNumber` (Number)
- `padLength` (Number)

Returns a Map: `{ "id": "...", "next": <number> }`

```deluge
resp = Map();
cn = input.counterName;

counterRec = System_Counters[Counter_Name == cn];
if(counterRec.count() == 0)
{
	insert into System_Counters
	[
		Counter_Name=cn
		Prefix=input.defaultPrefix
		Next_Number=input.defaultNextNumber
		Pad_Length=input.padLength
		Active=true
	];
	counterRec = System_Counters[Counter_Name == cn];
}

nextNum = counterRec.Next_Number;
prefix = ifnull(counterRec.Prefix,input.defaultPrefix);
pad = ifnull(counterRec.Pad_Length,input.padLength);

numText = nextNum.toString();
if(pad != null && pad > 0)
{
	numText = numText.leftPad(pad.toLong(),"0");
}

resp.put("id",prefix + numText);
resp.put("next",nextNum + 1);
return resp;
```

### Function 2: `Recalc_Quote_Totals`
Inputs:
- `quoteId` (Number) (Creator record ID of `Quotes`)

IMPORTANT:
- If `Quotes.Last_Sync_Time` is Date-Time: set it to `zoho.currenttime`
- If it is Text: set it to `zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss")`

```deluge
q = Quotes[ID == input.quoteId];
if(q.count() == 0)
{
	return;
}

// If Last_Sync_Time is TEXT use NOW_TEXT; if it's Date-Time use zoho.currenttime directly.
NOW_TEXT = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");

subtotalValue = 0;
taxTotalValue = 0;

items = Quote_Line_Items[Quote == q.ID];
for each li in items
{
	includeLine = true;

	// Optional item logic: only include if selected
	if(li.Optional_Item != null && li.Optional_Item == true)
	{
		includeLine = (li.Selected_By_Customer != null && li.Selected_By_Customer == true);
	}

	if(includeLine == true)
	{
		if(li.Line_Total != null)
		{
			subtotalValue = subtotalValue + li.Line_Total;
		}
		if(li.Tax_Amount != null)
		{
			taxTotalValue = taxTotalValue + li.Tax_Amount;
		}
	}
}

q.Subtotal = subtotalValue;
q.Tax_Total = taxTotalValue;
q.Grand_Total = subtotalValue + taxTotalValue;
q.Last_Sync_Source = "Creator";
q.Last_Sync_Time = NOW_TEXT;
```

### Function 3: `Playbook_Convert_AI_Intake`
Inputs:
- `aiIntakeId` (Number) (Creator record ID of `AI_Intake_Log`)

```deluge
ai = AI_Intake_Log[ID == input.aiIntakeId];
if(ai.count() == 0)
{
	return {"ok":false,"error":"AI intake not found"};
}

NOW_TEXT = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");

// Match/Create Customer by phone/email
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
		Customer_Name=ai.Customer_Name
		Phone=ai.Phone
		Email=ai.Email
		Address_Text=ai.Address_Text
		Customer_Type="Commercial"
		Sync_Status="Pending"
		Last_Sync_Source="Creator"
		Last_Sync_Time=NOW_TEXT
	];
}

// Create Service Request
reqId = insert into Service_Requests
[
	Customer=custId
	Service_Type=ai.Service_Type
	Urgency=ai.Urgency
	Preferred_Window=ai.Preferred_Window
	Request_Summary=ai.Request_Summary
	Request_Status="New"
	Last_Sync_Source="Creator"
	Last_Sync_Time=NOW_TEXT
];

// Create Work Order (Creator mirror)
woId = insert into FSM_Work_Orders
[
	Customer=custId
	Service_Request=reqId
	Service_Type=ai.Service_Type
	Status="New"
	Last_Sync_Source="Creator"
	Last_Sync_Time=NOW_TEXT
];

// Update AI intake status
ai.Status = "Converted";
ai.Last_Sync_Source = "Creator";
ai.Last_Sync_Time = NOW_TEXT;

return {"ok":true,"customer_id":custId,"service_request_id":reqId,"work_order_id":woId};
```

---

## D) Workflows (Paste These After Functions Exist)

Create these in:
`Zoho Creator -> Workflow -> Create Workflow`

### 1) AI_Intake_Log -> On Add -> On Success
```deluge
// Defaults
if(input.Status == null || input.Status == "")
{
	input.Status = "New";
}

// If Last_Sync_Time is Date-Time, set it to zoho.currenttime.
// If Last_Sync_Time is Text, set it to a string timestamp:
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");

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

// Route to Needs Info if key fields missing
missingKey = false;
if(input.Customer_Name == null || input.Customer_Name == "")
{
	missingKey = true;
}
if((input.Phone == null || input.Phone == "") && (input.Email == null || input.Email == ""))
{
	missingKey = true;
}
if(input.Address_Text == null || input.Address_Text == "")
{
	missingKey = true;
}
if(input.Service_Type == null || input.Service_Type == "")
{
	missingKey = true;
}
if(input.Preferred_Window == null || input.Preferred_Window == "")
{
	missingKey = true;
}
if(missingKey == true)
{
	input.Status = "Needs Info";
}
```

### 2) Customers -> On Add -> On Success (Generate Customer_ID)
```deluge
r = GetNextCounterId("Customer","CUS-",1001,0);
input.Customer_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "Customer"];
if(counterRec.count() > 0)
{
	counterRec.Next_Number = r.get("next");
}

input.Sync_Status = "Pending";
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
```

### 3) Service_Requests -> On Add -> On Success (Generate Request_ID)
```deluge
r = GetNextCounterId("ServiceRequest","REQ-",3,6);
input.Request_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "ServiceRequest"];
if(counterRec.count() > 0)
{
	counterRec.Next_Number = r.get("next");
}

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
```

### 4) Quotes -> On Add -> On Success (Generate Quote_ID)
```deluge
r = GetNextCounterId("Quote","QT-",8,0);
input.Quote_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "Quote"];
if(counterRec.count() > 0)
{
	counterRec.Next_Number = r.get("next");
}

if(input.Subtotal == null) input.Subtotal = 0;
if(input.Tax_Total == null) input.Tax_Total = 0;
if(input.Grand_Total == null) input.Grand_Total = 0;
if(input.AI_Quote_Status == null || input.AI_Quote_Status == "")
{
	input.AI_Quote_Status = "Drafted";
}

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
```

### 5) Quote_Line_Items -> On Add -> On Success (Recalc Quote Totals)
```deluge
if(input.Quote != null)
{
	Recalc_Quote_Totals(input.Quote);
}
```

### 6) Quote_Line_Items -> On Update -> On Success (Recalc Quote Totals)
```deluge
if(input.Quote != null)
{
	Recalc_Quote_Totals(input.Quote);
}
```

### 7) FSM_Work_Orders -> On Add -> On Success (Generate Work_Order_ID)
```deluge
r = GetNextCounterId("WorkOrder","WO-",50,0);
input.Work_Order_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "WorkOrder"];
if(counterRec.count() > 0)
{
	counterRec.Next_Number = r.get("next");
}

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
```

### 8) Books_Invoices -> On Add -> On Success (Generate Invoice_ID)
```deluge
r = GetNextCounterId("Invoice","INV-",22,7);
input.Invoice_ID = r.get("id");

counterRec = System_Counters[Counter_Name == "Invoice"];
if(counterRec.count() > 0)
{
	counterRec.Next_Number = r.get("next");
}

input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
```

---

## E) Quick Test Checklist

1. Add a Customer manually and confirm `Customer_ID` becomes `CUS-1001`, next becomes `CUS-1002`.
2. Add a Service Request and confirm `Request_ID` becomes `REQ-000003`.
3. Add a Quote and confirm `Quote_ID` becomes `QT-8` (or `QT-000008` if you decide to add padding).
4. Add Quote Line Items and confirm Subtotal/Tax/Grand Total update.
5. Add an AI Intake and confirm escalation rules and status routing work.
6. Run `Playbook_Convert_AI_Intake(aiIntakeId)` and confirm Customer + Request + Work Order created.

---

## F) If You Want, I’ll Remap This To Your Existing App

If you’re using your copied app (like `copy-of-copy-of-acs-control-center7`), the #1 thing that breaks scripts is **link names**.

If you send me screenshots or the link names for these fields:
- `AI_Intake_Log.Address_Text` (or Address)
- `Service_Requests.Customer` lookup link name
- `Quotes.Quote_ID`
- `System_Counters.Counter_Name`

I can rewrite this pack so it matches your exact app with zero errors.


```

