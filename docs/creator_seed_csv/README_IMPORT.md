# Zoho Creator Seed CSV Pack (New App)

These CSV files are **seed data only**. They help you populate reference tables fast (counters, service types, statuses).

Important:
- A CSV **cannot create forms/fields/workflows** in Zoho Creator.
- You must first create the matching **forms (tables)** in Creator (with the same field names), then import each CSV into the corresponding form.

## Recommended Reference Forms To Create (Minimal)
Create these simple forms (tables) in your new Creator app:

1) `System_Counters`
- `Counter_Name` (Single Line, unique)
- `Prefix` (Single Line)
- `Next_Number` (Number)
- `Pad_Length` (Number)
- `Active` (Yes/No)

2) `Service_Types`
- `Service_Type` (Single Line, unique)
- `Active` (Yes/No)

3) `AI_Intake_Statuses`
- `Status` (Single Line, unique)
- `Active` (Yes/No)

4) `Urgency_Options`
- `Urgency` (Single Line, unique)
- `Active` (Yes/No)

Optional (if you want these as dynamic lists instead of picklists):
- `Quote_Statuses` (Status, Active)
- `Invoice_Statuses` (Status, Active)
- `Work_Order_Statuses` (Status, Active)

## Import Steps (repeat per CSV)
Creator -> Create your app -> Create the form -> Import -> Upload CSV -> Map columns -> Import.

If your field names differ, tell me your exact field link names and I’ll regenerate the CSV headers to match.

