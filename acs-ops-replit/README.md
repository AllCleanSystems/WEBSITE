# ACS Ops Replit MVP

This is a fast-launch, own-stack CRM + FSM starter built with Next.js + Prisma.

## Features included
- Dashboard shell (`/`)
- Customers list (`/customers`)
- Work orders list (`/work-orders`)
- Health endpoint (`/api/health`)
- Customers API (`GET/POST /api/customers`)
- Work orders API (`GET/POST /api/work-orders`)
- SQLite Prisma schema for quick local/Replit start

## Quick start
1. Copy `.env.example` to `.env`
2. Install deps: `npm install`
3. Generate Prisma client: `npm run prisma:generate`
4. Create DB: `npm run prisma:migrate -- --name init`
5. Run app: `npm run dev`

## Next build phases
- Auth + roles
- Dispatch board
- Quotes + invoices
- Automation engine (reminders, follow-ups)
- AI command center
