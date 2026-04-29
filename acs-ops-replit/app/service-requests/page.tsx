import { prisma } from "@/lib/prisma";

export default async function ServiceRequestsPage() {
  const items = await prisma.serviceRequest.findMany({ include: { customer: true, workOrder: true }, orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <main className="wrap">
      <h1 className="h1">Service Requests</h1>
      <div className="card">
        <table className="table">
          <thead><tr><th>Title</th><th>Status</th><th>Priority</th><th>Customer</th><th>Linked WO</th></tr></thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={5} className="muted">No requests yet. POST /api/service-requests to create one.</td></tr>
            ) : items.map((r) => (
              <tr key={r.id}><td>{r.title}</td><td>{r.status}</td><td>{r.priority}</td><td>{r.customer.name}</td><td>{r.workOrder?.title ?? "-"}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
