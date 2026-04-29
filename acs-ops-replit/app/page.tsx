import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Route } from "next";

const quick = [
  { href: "/customers", label: "Customers" },
  { href: "/leads", label: "Leads" },
  { href: "/service-requests", label: "Service Requests" },
  { href: "/work-orders", label: "Work Orders" },
  { href: "/dispatch", label: "Dispatch Board" },
  { href: "/technicians", label: "Technicians" },
  { href: "/recurring-jobs", label: "Recurring Jobs" },
  { href: "/quotes-invoices", label: "Quotes & Invoices" },
  { href: "/payments", label: "Payments" },
  { href: "/ops-console", label: "Ops Console" },
  { href: "/admin-autopilot", label: "Admin Autopilot" },
  { href: "/ai-command-center", label: "AI Command Center" },
  { href: "/integrations", label: "Integrations" },
  { href: "/phone", label: "Phone Hub" },
  { href: "/automation-events", label: "Automation Logs" },
  { href: "/api/health", label: "API Health" },
];

export default async function HomePage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [openOrders, pendingInvoices, openRequests, todaysEvents] = await Promise.all([
    prisma.workOrder.count({ where: { status: { in: ["Unassigned", "Scheduled", "En Route", "On Site", "In Progress", "Ready to Invoice"] } } }),
    prisma.invoice.count({ where: { status: { in: ["Draft", "Sent", "Overdue"] } } }),
    prisma.serviceRequest.count({ where: { status: { in: ["Open", "Assigned", "In Progress"] } } }),
    prisma.automationEvent.count({ where: { createdAt: { gte: today } } }),
  ]);

  return (
    <main className="wrap">
      <h1 className="h1">ACS Ops Fast Launch</h1>
      <p className="muted">Own-stack CRM + FSM with automation-first workflows.</p>

      <section className="grid" style={{ marginTop: 16 }}>
        <article className="card"><div className="muted">Open Work Orders</div><div className="kpi">{openOrders}</div></article>
        <article className="card"><div className="muted">Pending Invoices</div><div className="kpi">{pendingInvoices}</div></article>
        <article className="card"><div className="muted">Open Service Requests</div><div className="kpi">{openRequests}</div></article>
        <article className="card"><div className="muted">Automation Events Today</div><div className="kpi">{todaysEvents}</div></article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>Workspace Navigation</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {quick.map((q) => (
            <Link className="btn" key={q.href} href={q.href as Route}>{q.label}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}
