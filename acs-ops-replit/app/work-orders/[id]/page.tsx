import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  createInvoiceDraft,
  markArrived,
  markComplete,
  markOnMyWay,
  saveDraft,
} from "./actions";

export default async function WorkOrderExecutionPage({ params }: { params: { id: string } }) {
  const order = await prisma.workOrder.findUnique({ where: { id: params.id }, include: { customer: true } });

  if (!order) {
    return <main className="wrap"><h1 className="h1">Work order not found</h1><Link href="/work-orders" className="btn">Back</Link></main>;
  }

  return (
    <main className="wrap">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="h1">Work Order Execution</h1>
          <div className="muted">{order.title} · {order.id}</div>
        </div>
        <div className="chips">
          <span className={`chip ${order.priority === "High" ? "warn" : ""}`}>{order.priority}</span>
          <span className={`chip ${order.status === "Completed" ? "ok" : ""}`}>{order.status}</span>
        </div>
      </div>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Customer & Site</h3>
          <p><strong>{order.customer.name}</strong></p>
          <p className="muted">{order.customer.phone ?? "No phone"}</p>
          <p className="muted">{order.customer.address ?? "No address"}</p>
          <div className="row">
            <form action={markOnMyWay}>
              <input type="hidden" name="id" value={order.id} />
              <button className="btn" type="submit">On My Way</button>
            </form>
            <form action={markArrived}>
              <input type="hidden" name="id" value={order.id} />
              <button className="btn" type="submit">Arrived</button>
            </form>
          </div>
        </article>

        <article className="card">
          <h3>Checklist Progress</h3>
          <ul className="list">
            <li>Safety check complete</li>
            <li>Before photos captured</li>
            <li>Service steps completed</li>
            <li>Customer sign-off</li>
          </ul>
          <p className="muted">Required for completion: checklist + photos + signature.</p>
        </article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>Evidence & Notes</h3>
        <div className="row"><button className="btn">Upload Before Photo</button><button className="btn">Upload After Photo</button><button className="btn">Capture Signature</button></div>
        <form action={saveDraft}>
          <input type="hidden" name="id" value={order.id} />
          <textarea
            name="notes"
            defaultValue={order.notes ?? ""}
            style={{ width: "100%", minHeight: 90, marginTop: 12, border: "1px solid #d8e1ef", borderRadius: 8, padding: 10 }}
            placeholder="Work performed notes"
          />
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn" type="submit">Save Draft Notes</button>
          </div>
        </form>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>Completion Actions</h3>
        <div className="row">
          <form action={createInvoiceDraft}>
            <input type="hidden" name="id" value={order.id} />
            <button className="btn" type="submit">Create Invoice Draft</button>
          </form>
          <form action={markComplete}>
            <input type="hidden" name="id" value={order.id} />
            <button className="btn primary" type="submit">Mark Complete</button>
          </form>
        </div>
      </section>
    </main>
  );
}
