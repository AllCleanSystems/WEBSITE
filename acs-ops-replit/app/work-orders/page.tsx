import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function WorkOrdersPage() {
  const orders = await prisma.workOrder.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <main className="wrap">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1 className="h1">Work Orders</h1>
        <Link className="btn" href="/dispatch">Open Dispatch Board</Link>
      </div>
      <div className="card">
        <table className="table">
          <thead><tr><th>Title</th><th>Status</th><th>Priority</th><th>Customer</th><th>Action</th></tr></thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} className="muted">No work orders yet. Add via API POST /api/work-orders</td></tr>
            ) : orders.map((w) => (
              <tr key={w.id}>
                <td>{w.title}</td><td>{w.status}</td><td>{w.priority}</td><td>{w.customer.name}</td>
                <td><Link className="btn" href={`/work-orders/${w.id}`}>Execute</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
