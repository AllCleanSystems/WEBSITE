import { prisma } from "@/lib/prisma";
import { moveWorkOrder } from "./actions";

const lanes = ["Unassigned", "Scheduled", "En Route", "On Site", "In Progress", "Ready to Invoice", "Completed", "Blocked"] as const;

export default async function DispatchPage() {
  const orders = await prisma.workOrder.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" }, take: 200 });
  const laneMap = new Map<string, typeof orders>();
  for (const lane of lanes) laneMap.set(lane, orders.filter((o) => o.status === lane));

  return (
    <main className="wrap">
      <h1 className="h1">Dispatch Board</h1>
      <p className="muted">Move work orders across lanes to drive workflow automation.</p>
      <section className="grid" style={{ marginTop: 16, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        {lanes.map((lane) => (
          <article className="card" key={lane}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>{lane}</strong><span className="chip">{laneMap.get(lane)?.length ?? 0}</span>
            </div>
            <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
              {(laneMap.get(lane) ?? []).map((o) => (
                <div key={o.id} style={{ border: "1px solid #e8edf5", borderRadius: 8, padding: 8 }}>
                  <div style={{ fontWeight: 600 }}>{o.title}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{o.customer.name}</div>
                  <div className="row" style={{ marginTop: 6 }}>
                    <form action={moveWorkOrder}>
                      <input type="hidden" name="id" value={o.id} />
                      <select name="status" defaultValue={lane} style={{ border: "1px solid #d8e1ef", borderRadius: 6, padding: "4px 6px" }}>
                        {lanes.map((x) => <option key={x} value={x}>{x}</option>)}
                      </select>
                      <button className="btn" style={{ marginLeft: 6 }} type="submit">Move</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
