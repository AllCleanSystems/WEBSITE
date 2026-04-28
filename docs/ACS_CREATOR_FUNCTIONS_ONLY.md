# ACS Creator Functions Only (Copy/Paste)

This file contains **only Deluge functions** (no workflows). Create these in:
`Zoho Creator -> Workflow -> Functions -> + New Function`

## Important (Timestamp vs Text)
If your `Last_Sync_Time` field is a **Date-Time** field, use:
`zoho.currenttime`

If your `Last_Sync_Time` field is a **Single Line (Text)** field, use:
`zoho.currenttime.toString("yyyy-MM-dd HH:mm:ss")`

In the functions below, I use `NOW_TEXT` (Text) by default to avoid the common error:
“Expecting STRING expression found TIMESTAMP expression”.

---

## Function: `GetNextCounterId`
Create a Creator Function with inputs:
- `counterName` (String)
- `defaultPrefix` (String)
- `defaultNextNumber` (Number)
- `padLength` (Number)

Returns a Map like: `{ "id": "REQ-000003", "next": 4 }`

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

## Function: `Recalc_Quote_Totals`
Inputs:
- `quoteId` (Number) (Creator record ID from `Quotes`)

```deluge
q = Quotes[ID == input.quoteId];
if(q.count() == 0)
{
	return;
}

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

---

## Function: `Playbook_Convert_AI_Intake`
Inputs:
- `aiIntakeId` (Number) (Creator record ID from `AI_Intake_Log`)

What it does:
- Matches or creates a `Customers` record (by phone, then email)
- Creates a `Service_Requests` record
- Creates a `FSM_Work_Orders` record (Creator mirror)
- Marks the AI intake as `Converted`

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
	// If your Customers form uses a Name field instead of First/Last,
	// change this insert accordingly.
	custId = insert into Customers
	[
		Phone=ai.Phone
		Email=ai.Email
		Address_Text=ai.Address_Text
		Customer_Type="Commercial"
		Last_Sync_Source="Creator"
		Last_Sync_Time=NOW_TEXT
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

