# ACS Control Center Discovery Checklist

This checklist captures the information we still need before we wire the live Zoho environment.

## Business Setup

- legal business name
- departments that will use the app
- user roles and who needs access
- service territories / locations
- types of jobs ACS performs

## CRM Questions

- which CRM modules are already in use
- are Leads, Accounts, Contacts, and Deals already configured
- required custom fields already in CRM
- sales stages that should trigger service intake

## FSM Questions

- are service resources / technicians already created
- do you use work orders, service appointments, or both
- required job statuses
- parts, labor, and completion details that technicians must capture

## Books Questions

- organization name in Zoho Books
- estimate and invoice approval workflow
- tax settings
- payment methods
- products / services item list

## Creator Build Questions

- dashboard widgets needed on the home screen
- forms needed for office staff
- forms needed for technicians
- reports needed by dispatch
- reports needed by billing
- reports needed by management

## Required Field Mapping

- customer identifiers across CRM, FSM, Books, and Creator
- job identifiers across Creator and FSM
- billing identifiers across Creator and Books
- status value mappings between systems

## Implementation Prerequisites

- Zoho Creator environment access
- Zoho CRM admin access
- Zoho FSM admin access
- Zoho Books admin access
- OAuth/API connection permission
- sandbox or test records for safe integration testing

## Recommended Next Working Session

1. confirm business workflow from lead to payment
2. confirm all required modules and fields
3. build the Creator forms and reports
4. connect CRM, FSM, and Books
5. test one full scenario end to end
