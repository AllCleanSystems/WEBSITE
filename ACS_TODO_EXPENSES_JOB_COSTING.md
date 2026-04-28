# TODO: Job Costing (Expenses -> Work Orders -> Profit)

Saved: 2026-04-19

Goal: super simple job costing so you can see profitability per Work Order (like Jobber, but better).

## A) Data Model (Creator)

### 1) Expenses form (existing)
Add fields (link names can match your naming style):
- `work_order` (Lookup -> `work_orders`)
- `vendor` (text) (if not already)
- `category` (picklist) (if not already)
- `amount` (currency/number) (if not already)
- `billable` (checkbox) default false
- `reimbursable` (checkbox) default false
- `receipt` (file upload or url) optional
- `notes` (textarea) optional

### 2) Work Orders form
Add fields (computed or stored):
- `labor_cost` (currency) optional later
- `materials_cost` (currency) rollup/sum of linked Expenses
- `other_cost` (currency) optional later
- `total_cost` (currency) = labor + materials + other
- `gross_profit` (currency) = `grand_total` - `total_cost`
- `margin_percent` (percent) = gross_profit / grand_total

## B) Easy Workflow (Minimal)

Option 1 (fastest): Stored totals
- On Add/Edit of an Expense: recalc the linked work order totals.

Pseudo:
- Find all expenses where `work_order == <woId>`
- Sum `amount`
- Update `work_orders.materials_cost`, `work_orders.total_cost`, `work_orders.gross_profit`, `work_orders.margin_percent`

Option 2 (cleanest): Rollups / Reports
- Use report aggregation instead of storing totals. (Less code, but UI varies.)

## C) UI (Creator)

- Add a related list on Work Order detail view: “Expenses”
- Add quick-add button: “Add Expense” pre-filling `work_order`
- Add a Work Orders report that shows:
  - grand_total
  - total_cost
  - gross_profit
  - margin_percent

## D) Books Integration (Later)

If you want: push billable expenses into Books (or attach receipts).
Decide which workflow:
- Create Books “Expense” when an Expense is created in Creator
- Or pull Books Expenses nightly and match them to Work Orders

## E) Decision Points (when you’re ready)

- Do you track labor cost? (Yes/no)
- Do you want expenses to be billable on invoices? (Yes/no)
- Do you want a simple “Job P&L” view per Work Order? (Yes/no)

