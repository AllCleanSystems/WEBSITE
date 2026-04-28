# ACS Jobber Plus Blueprint

## Goal
Build a Jobber-style field service platform in FlutterFlow, but with stronger AI ops, social, and sync visibility.

## Core Modules (Jobber + More)
1. CRM and Leads
- `Customers2`, `CustomerDetail`, `LeadsManagement2`, `CommsLeads2`, `CrmData`

2. Jobs and Work Orders
- `JobsWorkOrders`, `WorkOrderExecution`, `TechnicianDashboardPage`, `FSMOperations`, `ServiceRequests`

3. Scheduling and Dispatch
- `schedule`, `ScheduleDispatch`

4. Estimates, Quotes, and Invoices
- `Estimates`, `Estimates2`, `Quotes2`, `QuotesOverview`, `QuoteDetail`, `InvoicesAndPayments`

5. Field Checklists and Compliance
- `Checklist`, `fieldchecklist`, `ChecklistsReports`, `ComplianceReports`

6. Communications and Inbox
- `UnifiedInbox`, `AllInboxConnected`, `Requestpage`

7. Marketing and Social (More than Jobber)
- `ZohoSocial`, `Social`, `GoogleAdsPerformance`

8. Integrations and Data Reliability (More than Jobber)
- `IntegrationsSettings`, `DataSyncAPILogs`, `DataSyncAndAPILogs`, `NetworkPerformance`

9. AI Layer (More than Jobber)
- `AICommandCenter`

10. Auth and Empty/Loading States
- `SignIn2`, `JobsEmptyState`, `InvoicesLoadingState`

## Primary Navigation (Bottom Tabs)
1. Home -> `Homepage`
2. Jobs -> `JobsWorkOrders`
3. Customers -> `Customers2`
4. Invoices -> `InvoicesAndPayments`
5. More -> `AICommandCenter` (drawer to settings/reports/social/integrations)

## Homepage Quick Links
1. Work Orders card -> `JobsWorkOrders`
2. Open Requests card -> `ServiceRequests`
3. Pending Invoices card -> `InvoicesAndPayments`
4. Sync Errors card -> `DataSyncAndAPILogs`
5. Invoices/Quotes summary tile -> `QuotesOverview`
6. System Sync Health tile -> `NetworkPerformance`

## Standard Drill-Down Links
1. `Customers2` list item -> `CustomerDetail`
2. `JobsWorkOrders` list item -> `WorkOrderExecution`
3. `LeadsManagement2` row -> `IntakeDetails`
4. `QuotesOverview` row -> `QuoteDetail`
5. `Checklist` row -> `fieldchecklist`

## Required Action Rules
1. If widget already has API call, keep API action first.
2. Put navigation action last (on success path).
3. Every list row/card must have one clear destination.
4. Every detail page must include a back action.

## Data and API Pattern
1. Keep one `getCountsHomepage` style aggregator for dashboard counts.
2. Keep feature-specific endpoints for detailed pages (jobs, customers, invoices, quotes).
3. Standardize auth/header handling in one API group.
4. Log all sync/API failures to `DataSyncAndAPILogs`.

## Jobber-Plus Differentiators
1. AI command center for ops questions, summaries, and recommendations.
2. Unified inbox across requests, leads, and channels.
3. Real-time sync health and API observability pages.
4. Social and ads performance tied to leads and revenue outcomes.

## Build Order (Fastest Safe Sequence)
1. Lock nav skeleton: tabs + drawer + back behavior.
2. Wire homepage cards.
3. Wire CRM flow (Customers -> Detail).
4. Wire Jobs flow (Jobs -> WorkOrderExecution).
5. Wire Quotes/Invoices flow.
6. Wire Checklist + Compliance flow.
7. Wire Inbox + Request flow.
8. Wire Integrations + Sync logs + Network performance.
9. Wire AI Command Center.
10. End-to-end test every tap path.

## Done Criteria
1. No dead-end tap targets.
2. All major list items navigate to detail pages.
3. Dashboard cards navigate correctly.
4. Back navigation is consistent across all detail pages.
5. API and loading states are defined on every data page.
