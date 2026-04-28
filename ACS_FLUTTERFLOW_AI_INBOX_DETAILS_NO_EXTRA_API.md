# ACS Control Center: AI Inbox -> Details (No Extra GET API)

This setup uses your existing **GetAllInbox** list API only. When you tap a card, you pass the **whole record** to the Details page, so the Details page does **not** need a separate "Get single record" API call.

## 1) Details Page: Add A Page Parameter

1. Open your **Details** page (the page you navigate to when tapping a card).
2. Right panel -> **Page Parameters**.
3. Click **+ Add Parameter**.
4. Name: `intake`
5. Type: `JSON` / `Any` / `Dynamic` (use whatever your FlutterFlow shows that can hold an object).
6. Save.

## 2) AI Inbox Page: Pass The Current List Item On Tap

1. Open **AI Inbox** page.
2. Click the **tap target** that repeats inside the ListView (usually the Container/InkWell that wraps the whole card).
3. Add Action -> **On Tap** -> **Navigate To** -> select the **Details** page.
4. In **Parameters**, set:
   - `intake` = **From Variable** -> (Current ListView Item) -> choose the whole item/object

## 3) Details Page: Bind UI From `intake`

Bind your text fields using **From Variable** -> **Page Parameters** -> `intake`:

- Customer Name: `intake.customer_name`
- Service Type: `intake.service_type`
- Preferred Window: `intake.preferred_window`
- Urgency: `intake.urgency`
- Status: `intake.status`
- Request Summary: `intake.request_summary`
- Phone: `intake.phone`
- Email: `intake.email`
- Address: `intake.address_text`
- Transcript/Notes (optional): `intake.transcript`

## 4) What This Solves

- No more "recordId variable substitution" issues just to show a Details screen.
- The Details page will always show exactly what was tapped.

## 5) Next Essential Step (Status Buttons)

To update status (Ready / Needs Info / Converted) in Zoho Creator, we still need **one update API call** because the app must save changes back to Creator.

When we wire buttons, we will use:
- Record ID: `intake.ID` (this is the Zoho Creator record ID)

