import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createCustomer, createServiceRequest, createWorkOrder } from "./actions";

export default async function OpsConsolePage() {
  const customers = await prisma.customer.findMany({ orderBy: { name: "asc" }, take: 200 });

  return (
    <main className="wrap">
      <h1 className="h1">Ops Console</h1>
      <p className="muted">Fast operator workspace: create records quickly and trigger integration automations.</p>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Quick Add Customer</h3>
          <form action={createCustomer} className="formStack">
            <input name="name" placeholder="Customer name" required />
            <input name="email" placeholder="Email (optional)" />
            <input name="phone" placeholder="Phone (optional)" />
            <button className="btn primary" type="submit">Create Customer</button>
          </form>
        </article>

        <article className="card">
          <h3>Quick Add Work Order</h3>
          <form action={createWorkOrder} className="formStack">
            <input name="title" placeholder="Work order title" required />
            <select name="customerId" required>
              <option value="">Select customer</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select name="priority" defaultValue="Medium">
              {["Low", "Medium", "High", "Urgent"].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <button className="btn primary" type="submit">Create Work Order</button>
          </form>
        </article>
      </section>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Quick Add Service Request</h3>
          <form action={createServiceRequest} className="formStack">
            <input name="title" placeholder="Request title" required />
            <select name="customerId" required>
              <option value="">Select customer</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select name="priority" defaultValue="Medium">
              {["Low", "Medium", "High", "Urgent"].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <button className="btn primary" type="submit">Create Service Request</button>
          </form>
        </article>

        <article className="card">
          <h3>Zoho Integration Actions</h3>
          <div className="row">
            <form action="/api/integrations/zoho/test-auth" method="post">
              <button className="btn" type="submit">Test Zoho Auth</button>
            </form>
            <form action="/api/integrations/zoho/pull-leads" method="post">
              <button className="btn" type="submit">Pull Leads from Zoho</button>
            </form>
            <form action="/api/automation/run" method="post">
              <button className="btn" type="submit">Run API Autopilot</button>
            </form>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>
            Use <Link href="/automation-events">Automation Logs</Link> to verify what each action executed.
          </p>
        </article>
      </section>
    </main>
  );
}
