# ACS Control Center

`ACS Control Center` is the operating app for managing customers, work orders, field service, estimates, invoices, payments, and internal dispatch workflows using:

- Zoho Creator as the main application layer
- Zoho CRM as the customer and sales system
- Zoho FSM as the field service and work execution system
- Zoho Books as the accounting and invoicing system

## Target Outcome

The goal is to give ACS one control center where office staff can:

- create and manage customers
- track leads, accounts, deals, and service jobs
- dispatch technicians
- create estimates and invoices
- sync operational and financial data across Zoho apps
- automate status updates, billing triggers, and service follow-up

## Recommended System Role

Use Zoho Creator as the orchestration layer.

- CRM owns leads, accounts, contacts, and sales pipeline
- FSM owns service appointments, technicians, work orders, and job completion
- Books owns estimates, invoices, payments, and customer financial records
- Creator owns the ACS-specific workflow, dashboards, approvals, automation rules, and cross-app control logic

## Proposed Core Modules In Creator

1. Customer Intake
2. Accounts and Contacts
3. Jobs / Service Requests
4. Scheduling and Dispatch
5. Estimates and Approvals
6. Invoicing and Payments
7. Technician Job Updates
8. Service History
9. Automation Monitor
10. Admin Settings / API Connections

## Primary Automations

1. When a lead is converted in CRM, create or update the customer record in Creator.
2. When a service job is approved in Creator, create the work order / service appointment in FSM.
3. When a technician marks a job complete in FSM, sync completion details back to Creator.
4. When a completed job is billable, create the estimate or invoice in Books.
5. When payment is received in Books, update the account balance and job status in Creator.
6. When high-priority jobs are created, trigger dispatch alerts and SLA tracking.

## Delivery Phases

1. Discovery and field mapping
2. Creator data model and UI build
3. OAuth connections and app integrations
4. Workflow automation in Deluge
5. Reports, dashboards, and role permissions
6. Testing with live business scenarios
7. Production rollout

## What I Added In This Workspace

- solution architecture
- integration map
- discovery checklist

The next step is to turn this blueprint into actual Zoho Creator forms, reports, Deluge workflows, and integration functions.
