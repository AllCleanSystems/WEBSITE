# ACS Control Center - Workflow Master Guide (Beginner Friendly)

This guide is a clean, simplified reference of the workflows that are working and should stay enabled.

It is written for a non-developer and uses your real setup decisions from this build.

---

## 1) Before You Start

## 1.1 Required Connections
- CRM: `zohocrm_connection1`
- Books: `zoho_books_connection`

## 1.2 Required Books Org ID
- Books org ID: `894211808`

## 1.3 Required System Counter Records
Form: `System_Counters`

Create these records:
- `Counter_Name = Customer`, `Prefix = CUS-`, `Next_Number = 1001`
- `Counter_Name = Request`, `Prefix = REQ-`, `Next_Number = 3`
- `Counter_Name = Invoice`, `Prefix = INV-`, `Next_Number = 22`
- `Counter_Name = Quote`, `Prefix = QT-`, `Next_Number = 8`
- `Counter_Name = WorkOrder`, `Prefix = WO-`, `Next_Number = 50`
- `Counter_Name = MaintenancePlan`, `Prefix = MP-`, `Next_Number = 1001`

Important:
- `Next_Number` must be a normal `Number` field.
- If counter is missing, workflows fail with: "no matching records".

---

## 2) Service Types (Current Standard)

Use this list in dropdowns and mappings:
- `Carpet Cleaning`
- `Window Cleaning`
- `Commercial Cleaning`
- `Lawn Maintenance`
- `Snow Removal`
- `Food Truck Cleaning`
- `Hood Cleaning`
- `Other`

Removed:
- `Gutter Cleaning`
- `House Wash`
- `Pressure Washing`
- `Roof Cleaning`

---

## 3) AI Intake Log (WF 1A)

Purpose:
- Takes website/phone intake
- Finds or creates customer
- Creates service request
- Adds escalation flags when needed

Workflow:
- Form: `AI Intake Log`
- Event: `Created`
- Trigger: `On Success`

Use this script:

```deluge
input.AI_Status = "New";
input.Last_Sync_Source = "AI";
input.Last_Sync_Time = zoho.currenttime;

normalizedEmail = "";
normalizedPhone = "";

if(input.Email != null)
{
	normalizedEmail = input.Email.trim().toLowerCase();
}
if(input.Phone != null)
{
	normalizedPhone = input.Phone.toString().trim();
	normalizedPhone = normalizedPhone.replaceAll(" ", "", true);
	normalizedPhone = normalizedPhone.replaceAll("-", "", true);
	normalizedPhone = normalizedPhone.replaceAll("(", "", true);
	normalizedPhone = normalizedPhone.replaceAll(")", "", true);
	normalizedPhone = normalizedPhone.replaceAll("+", "", true);
	normalizedPhone = normalizedPhone.replaceAll(".", "", true);
}

phoneMatches = Customers[ID == 0];
emailMatches = Customers[ID == 0];

customerRecordID = 0;
customerBusinessID = "";
escalationFlag = false;
escalationReasonText = "";

if(normalizedPhone != "")
{
	phoneMatches = Customers[Normalized_Phone == normalizedPhone];
}
if(phoneMatches.count() == 0 && normalizedEmail != "")
{
	emailMatches = Customers[Normalized_Email == normalizedEmail];
}

if(phoneMatches.count() > 0)
{
	c = Customers[ID == phoneMatches.ID];
	customerRecordID = c.ID;

	if(c.Customer_ID == null || c.Customer_ID == "")
	{
		cc = System_Counters[Counter_Name == "Customer"];
		if(cc.count() == 0)
		{
			input.AI_Status = "Error";
			input.Escalation_Reason = "Missing System_Counters record for Customer.";
			return;
		}
		c.Customer_ID = cc.Prefix + cc.Next_Number.toString();
		cc.Next_Number = cc.Next_Number + 1;
	}
	customerBusinessID = c.Customer_ID;
}
else if(emailMatches.count() > 0)
{
	c = Customers[ID == emailMatches.ID];
	customerRecordID = c.ID;

	if(c.Customer_ID == null || c.Customer_ID == "")
	{
		cc = System_Counters[Counter_Name == "Customer"];
		if(cc.count() == 0)
		{
			input.AI_Status = "Error";
			input.Escalation_Reason = "Missing System_Counters record for Customer.";
			return;
		}
		c.Customer_ID = cc.Prefix + cc.Next_Number.toString();
		cc.Next_Number = cc.Next_Number + 1;
	}
	customerBusinessID = c.Customer_ID;
}
else
{
	cc = System_Counters[Counter_Name == "Customer"];
	if(cc.count() == 0)
	{
		input.AI_Status = "Error";
		input.Escalation_Reason = "Missing System_Counters record for Customer.";
		return;
	}

	newCID = cc.Prefix + cc.Next_Number.toString();

	newCustomerID = insert into Customers
	[
		Customer_ID = newCID
		Name.first_name = input.Customer_Name
		Name.last_name = ""
		Phone = input.Phone
		Email = input.Email
		Address = input.Address
		Normalized_Email = normalizedEmail
		Normalized_Phone = normalizedPhone
		Customer_Status = "Prospect"
		Customer_Type1 = "Residential"
		CRM_Record_Type = "Contact"
		Source = input.Channel
		Last_Sync_Source = "AI"
		Last_Sync_Time = zoho.currenttime
	];

	cc.Next_Number = cc.Next_Number + 1;

	nc = Customers[ID == newCustomerID];
	customerRecordID = nc.ID;
	customerBusinessID = nc.Customer_ID;
}

if(input.Urgency == "Emergency")
{
	escalationFlag = true;
	escalationReasonText = "Emergency urgency from AI intake.";
}
else if(input.Channel == "Phone")
{
	escalationFlag = true;
	escalationReasonText = "Phone intake should be reviewed promptly.";
}
else if(input.Channel == "Website Chat" && input.AI_Confidence != null && input.AI_Confidence < 70)
{
	escalationFlag = true;
	escalationReasonText = "Low AI confidence on website chat intake.";
}
else if(input.Intent == null || input.Intent == "")
{
	escalationFlag = true;
	escalationReasonText = "Website chat intent unclear.";
}

assignedToValue = "";
aiStatusValue = "Processed";
if(escalationFlag == true)
{
	assignedToValue = "Dispatch";
	aiStatusValue = "Escalated";
}

rc = System_Counters[Counter_Name == "Request"];
if(rc.count() == 0)
{
	input.AI_Status = "Error";
	input.Escalation_Reason = "Missing System_Counters record for Request.";
	return;
}

n = rc.Next_Number.toString();
if(n.length() == 1) { n = "00000" + n; }
else if(n.length() == 2) { n = "0000" + n; }
else if(n.length() == 3) { n = "000" + n; }
else if(n.length() == 4) { n = "00" + n; }
else if(n.length() == 5) { n = "0" + n; }

newRID = rc.Prefix + n;

insert into Service_Requests
[
	Request_ID = newRID
	Customer_Name = input.Customer_Name
	Phone = input.Phone
	Email = input.Email
	Address = input.Address
	Service_Type = input.Service_Type
	Request_Status = "New"
	Customer_ID = customerRecordID.toString()
	Source = input.Channel
	AI_Intake_ID = input.Intake_ID
	Urgency = input.Urgency
	Request_Summary = input.Request_Summary
	Escalation_Needed = escalationFlag
	Assigned_To = assignedToValue
	Last_Sync_Source = "AI"
	Last_Sync_Time = zoho.currenttime
];

rc.Next_Number = rc.Next_Number + 1;

input.Matched_Customer_ID = customerBusinessID;
input.Created_Request_ID = newRID;
input.Escalation_Needed = escalationFlag;
input.Escalation_Reason = escalationReasonText;
input.AI_Status = aiStatusValue;
input.Last_Sync_Source = "AI";
input.Last_Sync_Time = zoho.currenttime;
```

---

## 4) Books Invoices

## 4.1 B1 - Invoice ID Generation
- Form: `Books Invoices`
- Event: `Created`
- Trigger: `On Success`

```deluge
if(input.Invoice_ID == null || input.Invoice_ID == "")
{
	invoiceCounter = System_Counters[Counter_Name == "Invoice"];
	numText = invoiceCounter.Next_Number.toString();

	if(numText.length() == 1) { numText = "000000" + numText; }
	else if(numText.length() == 2) { numText = "00000" + numText; }
	else if(numText.length() == 3) { numText = "0000" + numText; }
	else if(numText.length() == 4) { numText = "000" + numText; }
	else if(numText.length() == 5) { numText = "00" + numText; }
	else if(numText.length() == 6) { numText = "0" + numText; }

	newInvoiceID = invoiceCounter.Prefix + numText;
	input.Invoice_ID = newInvoiceID;
	invoiceCounter.Next_Number = invoiceCounter.Next_Number + 1;
	input.Last_Sync_Source = "Creator";
	input.Last_Sync_Time = zoho.currenttime;
}
```

## 4.2 B2 - Paid Closeout
- Form: `Books Invoices`
- Event: `Edited`
- Field: `Status`

```deluge
if(input.Status == "Paid")
{
	if(input.Creator_Request_ID != null && input.Creator_Request_ID != "")
	{
		relatedRequests = Service_Requests[Request_ID == input.Creator_Request_ID];
		for each req in relatedRequests
		{
			req.Request_Status = "Completed";
			req.Payment_Status = "Paid";
			req.Last_Sync_Source = "Books to Creator";
			req.Last_Sync_Time = zoho.currenttime;
		}
	}

	if(input.Work_Order_ID != null && input.Work_Order_ID != "")
	{
		relatedWOs = FSM_Work_Orders[Work_Order_ID == input.Work_Order_ID];
		for each wo in relatedWOs
		{
			wo.Status = "Completed";
			wo.Payment_Status = "Paid";
			wo.Last_Sync_Source = "Books to Creator";
			wo.Last_Sync_Time = zoho.currenttime;
		}
	}

	input.Balance_Due = 0;
	input.Last_Sync_Source = "Books to Creator";
	input.Last_Sync_Time = zoho.currenttime;
}
```

---

## 5) Customers

## 5.1 C1 - Customer ID

```deluge
if(input.Customer_ID == null || input.Customer_ID == "")
{
	customerCounter = System_Counters[Counter_Name == "Customer"];
	input.Customer_ID = customerCounter.Prefix + customerCounter.Next_Number.toString();
	customerCounter.Next_Number = customerCounter.Next_Number + 1;
	input.Last_Sync_Source = "Creator";
	input.Last_Sync_Time = zoho.currenttime;
}
```

## 5.2 C2 - Normalize Email/Phone

```deluge
normalizedEmail = "";
normalizedPhone = "";

if(input.Email != null)
{
	normalizedEmail = input.Email.trim().toLowerCase();
}
if(input.Phone != null)
{
	normalizedPhone = input.Phone.toString().trim();
	normalizedPhone = normalizedPhone.replaceAll(" ", "", true);
	normalizedPhone = normalizedPhone.replaceAll("-", "", true);
	normalizedPhone = normalizedPhone.replaceAll("(", "", true);
	normalizedPhone = normalizedPhone.replaceAll(")", "", true);
	normalizedPhone = normalizedPhone.replaceAll("+", "", true);
	normalizedPhone = normalizedPhone.replaceAll(".", "", true);
}

input.Normalized_Email = normalizedEmail;
input.Normalized_Phone = normalizedPhone;
input.Last_Sync_Source = "Creator";
input.Last_Sync_Time = zoho.currenttime;
```

## 5.3 C3 - CRM Sync

```deluge
crmMatches = List();

if(input.Email != null && input.Email.trim() != "")
{
	customerEmail = input.Email.trim().toLowerCase();

	crmContacts = zoho.crm.getRecords("Contacts", 1, 200, Map(), "zohocrm_connection1");

	for each crmContact in crmContacts
	{
		crmEmail = ifnull(crmContact.get("Email"), "");
		if(crmEmail != "" && crmEmail.toLowerCase() == customerEmail)
		{
			crmMatches.add(crmContact);
		}
	}

	if(crmMatches.size() == 0)
	{
		dataMap = Map();

		crmLastName = "Unknown";
		if(input.Name.last_name != null && input.Name.last_name.trim() != "")
		{
			crmLastName = input.Name.last_name.trim();
		}
		else if(input.Name.first_name != null && input.Name.first_name.trim() != "")
		{
			crmLastName = input.Name.first_name.trim();
		}

		dataMap.put("Last_Name", crmLastName);
		dataMap.put("Email", input.Email);
		dataMap.put("Phone", ifnull(input.Phone, ""));

		createResp = zoho.crm.createRecord("Contacts", dataMap, Map(), "zohocrm_connection1");

		if(createResp.get("id") != null)
		{
			input.CRM_ID = createResp.get("id").toString();
			input.CRM_Sync_Status = "Created";
			input.Last_Sync_Source = "Creator to CRM";
			input.Last_Sync_Time = zoho.currenttime;
		}
	}
	else
	{
		input.CRM_ID = crmMatches.get(0).get("id").toString();
		input.CRM_Sync_Status = "Matched Existing";
		input.Last_Sync_Source = "Matched Existing CRM";
		input.Last_Sync_Time = zoho.currenttime;
	}
}
else
{
	input.CRM_Sync_Status = "Skipped - No Email";
	input.Last_Sync_Source = "CRM Sync Skipped";
	input.Last_Sync_Time = zoho.currenttime;
}
```

## 5.4 C4 - Books Sync

```deluge
orgId = "894211808";

if(input.Email != null && input.Email.trim() != "")
{
	customerEmail = input.Email.trim().toLowerCase();

	customerName = "";
	if(input.Name.first_name != null && input.Name.first_name.trim() != "")
	{
		customerName = input.Name.first_name.trim();
	}
	if(input.Name.last_name != null && input.Name.last_name.trim() != "")
	{
		if(customerName != "")
		{
			customerName = customerName + " " + input.Name.last_name.trim();
		}
		else
		{
			customerName = input.Name.last_name.trim();
		}
	}
	if(customerName == "")
	{
		customerName = "Unknown";
	}

	existingBooksId = ifnull(input.Books_Customer_ID, "");

	if(existingBooksId != "")
	{
		updateMap = Map();
		updateMap.put("contact_name", customerName);
		updateMap.put("email", customerEmail);
		updateMap.put("phone", ifnull(input.Phone, ""));

		invokeurl
		[
			url :"https://www.zohoapis.com/books/v3/contacts/" + existingBooksId + "?organization_id=" + orgId
			type :PUT
			parameters:updateMap.toString()
			connection:"zoho_books_connection"
		];

		input.Books_Sync_Status = "Updated";
	}
	else
	{
		searchResp = invokeurl
		[
			url :"https://www.zohoapis.com/books/v3/contacts?organization_id=" + orgId + "&email=" + customerEmail
			type :GET
			connection:"zoho_books_connection"
		];

		contactsList = ifnull(searchResp.get("contacts"), List());

		if(contactsList.size() > 0)
		{
			firstContact = contactsList.get(0);
			booksContactId = ifnull(firstContact.get("contact_id"), "");

			if(booksContactId != "")
			{
				input.Books_Customer_ID = booksContactId.toString();
				input.Books_Sync_Status = "Matched Existing";
			}
		}
		else
		{
			createMap = Map();
			createMap.put("contact_name", customerName);
			createMap.put("email", customerEmail);
			createMap.put("phone", ifnull(input.Phone, ""));

			createResp = invokeurl
			[
				url :"https://www.zohoapis.com/books/v3/contacts?organization_id=" + orgId
				type :POST
				parameters:createMap.toString()
				connection:"zoho_books_connection"
			];

			newContact = ifnull(createResp.get("contact"), Map());
			newContactId = ifnull(newContact.get("contact_id"), "");

			if(newContactId != "")
			{
				input.Books_Customer_ID = newContactId.toString();
				input.Books_Sync_Status = "Created";
			}
		}
	}

	input.Last_Sync_Source = "Creator to Books";
	input.Last_Sync_Time = zoho.currenttime;
}
else
{
	input.Books_Sync_Status = "Skipped - No Email";
	input.Last_Sync_Source = "Books Sync Skipped";
	input.Last_Sync_Time = zoho.currenttime;
}
```

---

## 6) FSM Work Orders

## 6.1 F1 - Work Order ID

```deluge
if(input.Work_Order_ID == null || input.Work_Order_ID == "")
{
	workCounter = System_Counters[Counter_Name == "WorkOrder"];
	input.Work_Order_ID = workCounter.Prefix + workCounter.Next_Number.toString();
	workCounter.Next_Number = workCounter.Next_Number + 1;
}
```

## 6.2 F2 - Assigned Tech

```deluge
if(input.Assigned_Tech != null && input.Assigned_Tech != "")
{
	input.Status = "Assigned";
	input.Dispatch_Status = "Assigned";
	input.Dispatch_Summary = "Assigned to " + input.Assigned_Tech + ".";
	input.Last_Sync_Source = "Creator";
	input.Last_Sync_Time = zoho.currenttime;
}
```

## 6.3 F3 - Scheduled Start

```deluge
if(input.Scheduled_Start != null)
{
	input.Status = "Scheduled";
	input.Dispatch_Status = "Scheduled";

	summaryText = "Scheduled for " + input.Scheduled_Start.toString();

	if(input.Assigned_Tech != null && input.Assigned_Tech != "")
	{
		summaryText = summaryText + " with " + input.Assigned_Tech;
	}
	if(input.Arrival_Window != null && input.Arrival_Window != "")
	{
		summaryText = summaryText + ". Arrival window: " + input.Arrival_Window;
	}
	if(input.Route_Zone != null && input.Route_Zone != "")
	{
		summaryText = summaryText + ". Route zone: " + input.Route_Zone;
	}

	summaryText = summaryText + ".";
	input.Dispatch_Summary = summaryText;
	input.Last_Sync_Source = "Creator";
	input.Last_Sync_Time = zoho.currenttime;
}
```

## 6.4 F4 - Completion Summary for AI

```deluge
if(input.Status == "Completed")
{
	summaryText = "Work order completed.";

	if(input.Work_Order_ID != null && input.Work_Order_ID != "")
	{
		summaryText = summaryText + "\nWork Order: " + input.Work_Order_ID;
	}
	if(input.Customer_Name != null && input.Customer_Name != "")
	{
		summaryText = summaryText + "\nCustomer: " + input.Customer_Name;
	}
	if(input.Service_Type != null && input.Service_Type != "")
	{
		summaryText = summaryText + "\nService Type: " + input.Service_Type;
	}
	if(input.Completion_Notes != null && input.Completion_Notes != "")
	{
		summaryText = summaryText + "\nNotes: " + input.Completion_Notes;
	}
	if(input.Labor_Hours != null)
	{
		summaryText = summaryText + "\nLabor Hours: " + input.Labor_Hours.toString();
	}
	if(input.Materials_Used != null && input.Materials_Used != "")
	{
		summaryText = summaryText + "\nMaterials Used: " + input.Materials_Used;
	}
	if(input.Customer_Signoff != null && input.Customer_Signoff.toString() != "")
	{
		summaryText = summaryText + "\nCustomer signoff captured.";
	}

	input.Dispatch_Status = "Completed";
	input.Dispatch_Summary = "Work order completed.";
	input.Completion_Summary = summaryText;
	input.Last_Sync_Source = "Creator";
	input.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
}
```

## 6.5 F5 - Completed -> Create/Update Books Invoice

```deluge
if(input.Status == "Completed")
{
	existingInvoice = Books_Invoices[Work_Order_ID == input.Work_Order_ID];

	if(existingInvoice.count() == 0)
	{
		totalValue = 0;
		if(input.Grand_Total != null)
		{
			totalValue = input.Grand_Total;
		}

		newInvoiceID = insert into Books_Invoices
		[
			Customer_Name = input.Customer_Name
			Work_Order_ID = input.Work_Order_ID
			FSM_Native_Work_Order_ID = input.FSM_Native_Work_Order_ID
			Creator_Request_ID = input.Creator_Request_ID
			Customer_ID = input.Customer_ID
			Phone = input.Phone
			Email = input.Email
			Address = input.Address
			Total = totalValue
			Balance_Due = totalValue
			Status = "Draft"
			Contact_Name = ""
			Last_Sync_Source = "Creator"
			Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss")
			Added_User = zoho.loginuser
		];

		newInvoiceRecord = Books_Invoices[ID == newInvoiceID];

		insert into Sync_Log
		[
			Event_Type = "Invoice Created"
			Source_App = "FSM"
			Source_Record_ID = input.Work_Order_ID
			Target_App = "Books"
			Target_Record_ID = newInvoiceRecord.Invoice_ID
			Status = "Success"
			Error_Details = ""
			Last_Attempt_Time = zoho.currenttime
			Added_User = zoho.loginuser
		];
	}
	else
	{
		for each invoiceRecord in existingInvoice
		{
			if(invoiceRecord.Status != "Paid" && invoiceRecord.Status != "Void")
			{
				totalValue = 0;
				if(input.Grand_Total != null)
				{
					totalValue = input.Grand_Total;
				}

				invoiceRecord.Total = totalValue;
				if(invoiceRecord.Status == "Draft" || invoiceRecord.Status == "Sent")
				{
					invoiceRecord.Balance_Due = totalValue;
				}

				invoiceRecord.Last_Sync_Source = "Creator";
				invoiceRecord.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
			}
		}
	}
}
```

---

## 7) Maintenance Plans

## 7.1 M1 - Plan ID

```deluge
if(input.Plan_ID == null || input.Plan_ID == "")
{
	counterRecord = System_Counters[Counter_Name == "MaintenancePlan"];
	nextNumberValue = counterRecord.Next_Number;
	prefixValue = counterRecord.Prefix;
	generatedPlanID = prefixValue + nextNumberValue.toString();
	input.Plan_ID = generatedPlanID;
	counterRecord.Next_Number = nextNumberValue + 1;
}
```

## 7.2 M2 - Default Active Status

```deluge
if(input.Status == null || input.Status == "")
{
	input.Status = "Active";
}
```

## 7.3 M3 - Daily Auto-Generate Service Requests
- Type: Scheduled
- Frequency: Daily

```deluge
todayDate = zoho.currentdate;

plans = Maintenance_Plans[Status == "Active" && Next_Service_Date != null && Next_Service_Date <= todayDate];

for each plan in plans
{
	requestCounter = System_Counters[Counter_Name == "Request"];
	numText = requestCounter.Next_Number.toString();

	if(numText.length() == 1) { numText = "00000" + numText; }
	else if(numText.length() == 2) { numText = "0000" + numText; }
	else if(numText.length() == 3) { numText = "000" + numText; }
	else if(numText.length() == 4) { numText = "00" + numText; }
	else if(numText.length() == 5) { numText = "0" + numText; }

	newRequestID = requestCounter.Prefix + numText;

	insert into Service_Requests
	[
		Request_ID = newRequestID
		Customer_ID = plan.Customer_ID
		Customer_Name = plan.Customer_Name
		Service_Type = plan.Service_Type
		Request_Status = "New"
		Source = "Maintenance Plan"
		Request_Summary = "Auto-generated from Maintenance Plan " + plan.Plan_ID
		Urgency = "Normal"
		Last_Sync_Source = "Creator"
		Last_Sync_Time = zoho.currenttime
	];

	requestCounter.Next_Number = requestCounter.Next_Number + 1;
	plan.Last_Generated_Request_ID = newRequestID;

	if(plan.Frequency == "Weekly")
	{
		plan.Next_Service_Date = plan.Next_Service_Date.addDay(7);
	}
	else if(plan.Frequency == "Biweekly")
	{
		plan.Next_Service_Date = plan.Next_Service_Date.addDay(14);
	}
	else if(plan.Frequency == "Monthly")
	{
		plan.Next_Service_Date = plan.Next_Service_Date.addMonth(1);
	}
	else if(plan.Frequency == "Quarterly")
	{
		plan.Next_Service_Date = plan.Next_Service_Date.addMonth(3);
	}
	else if(plan.Frequency == "Semiannual")
	{
		plan.Next_Service_Date = plan.Next_Service_Date.addMonth(6);
	}
	else if(plan.Frequency == "Annual")
	{
		plan.Next_Service_Date = plan.Next_Service_Date.addYear(1);
	}
}
```

---

## 8) Quotes + Quote Line Items

## 8.1 Q1 - Quote ID

```deluge
if(input.Quote_ID == null || input.Quote_ID == "")
{
	counterRecord = System_Counters[Counter_Name == "Quote"];
	nextNumberValue = counterRecord.Next_Number;
	prefixValue = counterRecord.Prefix;
	generatedQuoteID = prefixValue + nextNumberValue.toString();
	input.Quote_ID = generatedQuoteID;
	counterRecord.Next_Number = nextNumberValue + 1;
}
```

## 8.2 Q2 - Default AI Quote Status

```deluge
if(input.AI_Quote_Status == null || input.AI_Quote_Status == "")
{
	input.AI_Quote_Status = "Drafted";
}
```

## 8.3 Q3 - Auto-add Core Line Items

```deluge
catalogItems = Quote_Catalog[Service_Type == input.Service_Type && Item_Category == "Core" && Active == true];

for each itemRecord in catalogItems
{
	existingLine = Quote_Line_Items[Quote == input.ID && Line_Description == itemRecord.Description];
	if(existingLine.count() == 0)
	{
		qtyValue = 1;
		if(itemRecord.Default_Qty != null)
		{
			qtyValue = itemRecord.Default_Qty;
		}

		unitPriceValue = 0;
		if(itemRecord.Base_Price != null)
		{
			unitPriceValue = itemRecord.Base_Price;
		}

		lineTotalValue = qtyValue * unitPriceValue;

		insert into Quote_Line_Items
		[
			Quote_ID = input.Quote_ID
			Quote = input.ID
			Line_Description = itemRecord.Description
			Sort_Order = itemRecord.Sort_Order
			Quantity = qtyValue
			Unit_Price = unitPriceValue
			Line_Total = lineTotalValue
			AI_Suggested = true
			Added_User = zoho.loginuser
		];
	}
}

input.Notes = "Core quote items added: " + catalogItems.count();
```

## 8.4 QLI1 - Recalculate Quote Totals

```deluge
quoteLineItems = Quote_Line_Items[Quote == input.Quote];

subtotalValue = 0;
taxTotalValue = 0;

for each lineRecord in quoteLineItems
{
	includeLine = false;

	optionalValue = ifnull(lineRecord.Optional_Item, "").toString();
	selectedValue = ifnull(lineRecord.Selected_By_Customer, "").toString();

	if(optionalValue != "")
	{
		if(selectedValue != "")
		{
			includeLine = true;
		}
	}
	else
	{
		includeLine = true;
	}

	if(includeLine == true)
	{
		if(lineRecord.Line_Total != null)
		{
			subtotalValue = subtotalValue + lineRecord.Line_Total;
		}
		if(lineRecord.Tax_Amount != null)
		{
			taxTotalValue = taxTotalValue + lineRecord.Tax_Amount;
		}
	}
}

grandTotalValue = subtotalValue + taxTotalValue;

quoteRecord = Quotes[ID == input.Quote];
quoteRecord.Subtotal = subtotalValue;
quoteRecord.Tax_Total = taxTotalValue;
quoteRecord.Grand_Total = grandTotalValue;
quoteRecord.Last_Sync_Source = "Creator";
quoteRecord.Last_Sync_Time = zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss");
```

---

## 9) Service Requests

## 9.1 S1 - Request ID

```deluge
if(input.Request_ID == null || input.Request_ID == "")
{
	counter = System_Counters[Counter_Name == "Request"];
	numText = counter.Next_Number.toString();
	if(numText.length() == 1) { numText = "00000" + numText; }
	else if(numText.length() == 2) { numText = "0000" + numText; }
	else if(numText.length() == 3) { numText = "000" + numText; }
	else if(numText.length() == 4) { numText = "00" + numText; }
	else if(numText.length() == 5) { numText = "0" + numText; }
	input.Request_ID = counter.Prefix + numText;
	counter.Next_Number = counter.Next_Number + 1;
}
```

## 9.2 S2 - Approved -> Auto-create Quote

```deluge
if(input.Request_Status == "Approved")
{
	existingQuote = Quotes[Service_Request_ID == input.Request_ID];

	if(existingQuote.count() == 0)
	{
		quoteCounter = System_Counters[Counter_Name == "Quote"];
		newQuoteBusinessID = quoteCounter.Prefix + quoteCounter.Next_Number.toString();

		customerLookupId = null;
		customerRec = Customers[Customer_ID == input.Customer_ID];
		if(customerRec.count() > 0)
		{
			customerLookupId = customerRec.ID;
		}

		newQuoteID = 0;
		if(customerLookupId != null)
		{
			newQuoteID = insert into Quotes
			[
				Quote_ID = newQuoteBusinessID
				Service_Request_ID = input.Request_ID
				Customer_ID = input.Customer_ID
				Service_Type = input.Service_Type
				CRM_Deal_ID = input.CRM_Deal_ID
				Deal_Stage = "New Opportunity"
				Customer = customerLookupId
				Notes = "Created automatically from Service Request " + input.Request_ID
				Added_User = zoho.loginuser
			];
		}
		else
		{
			newQuoteID = insert into Quotes
			[
				Quote_ID = newQuoteBusinessID
				Service_Request_ID = input.Request_ID
				Customer_ID = input.Customer_ID
				Service_Type = input.Service_Type
				CRM_Deal_ID = input.CRM_Deal_ID
				Deal_Stage = "New Opportunity"
				Notes = "Created automatically from Service Request " + input.Request_ID
				Added_User = zoho.loginuser
			];
		}

		quoteCounter.Next_Number = quoteCounter.Next_Number + 1;

		newQuoteRecord = Quotes[ID == newQuoteID];
		input.Quote_ID = newQuoteRecord.Quote_ID;
		input.Last_Sync_Source = "Creator";
		input.Last_Sync_Time = zoho.currenttime;
	}
}
```

---

## 10) Disable Duplicates

Keep one final version per workflow purpose. Disable older duplicates.

Most common duplicates to disable:
- Old AI escalation-only script in AI Intake Log
- Duplicate invoice ID generators
- Duplicate "Status=Paid" closeout scripts
- Old quote creation script that writes `Customer` as plain text
- Duplicate quote totals scripts

---

## 11) Quick End-to-End Test

1. Create AI intake record
2. Confirm Customer and Service Request created
3. Approve request, confirm Quote created
4. Complete Work Order, confirm Books Invoice created
5. Set invoice status to Paid, confirm request/work order closeout updates

---

If you want this as PDF:
- Open this file in your editor/browser
- Print -> Save as PDF

