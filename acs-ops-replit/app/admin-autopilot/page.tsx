import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { runCollectionsOnly, runDailyAutopilot } from "./actions";

export default async function AdminAutopilotPage() {
  const [newLeads, unassignedOrders, readyToInvoice, draftInvoices, overdueInvoices] = await Promise.all([
    prisma.lead.count({ where: { status: "New" } }),
    prisma.workOrder.count({ where: { status: "Unassigned" } }),
    prisma.workOrder.count({ where: { status: "Ready to Invoice" } }),
    prisma.invoice.count({ where: { status: "Draft" } }),
    prisma.invoice.count({ where: { status: "Overdue" } }),
  ]);

  return (
    <main className="wrap">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1 className="h1">Admin Autopilot</h1>
        <Link className="btn" href="/automation-events">View Audit Logs</Link>
      </div>
      <p className="muted">Run full-office automation so you can stay focused on field execution.</p>

      <section className="grid" style={{ marginTop: 16 }}>
        <article className="card"><div className="muted">New Leads</div><div className="kpi">{newLeads}</div></article>
        <article className="card"><div className="muted">Unassigned Work Orders</div><div className="kpi">{unassignedOrders}</div></article>
        <article className="card"><div className="muted">Ready to Invoice</div><div className="kpi">{readyToInvoice}</div></article>
        <article className="card"><div className="muted">Draft / Overdue Invoices</div><div className="kpi">{draftInvoices} / {overdueInvoices}</div></article>
      </section>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Full Daily Autopilot</h3>
          <ul className="list">
            <li>Triages new leads into Contacted/Qualified.</li>
            <li>Schedules unassigned work orders.</li>
            <li>Auto-assigns scheduled jobs to available technicians.</li>
            <li>Generates work orders from due recurring rules.</li>
            <li>Creates invoice drafts for ready-to-invoice jobs.</li>
            <li>Moves invoice drafts into sent queue.</li>
          </ul>
          <form action={runDailyAutopilot} style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit">Run Full Autopilot</button>
          </form>
        </article>

        <article className="card">
          <h3>Collections Burst</h3>
          <ul className="list">
            <li>Logs follow-up events for overdue invoices.</li>
            <li>Creates clear audit trail for call/text/email tasks.</li>
          </ul>
          <form action={runCollectionsOnly} style={{ marginTop: 12 }}>
            <button className="btn" type="submit">Run Collections Automation</button>
          </form>
        </article>
      </section>
    </main>
  );
}
