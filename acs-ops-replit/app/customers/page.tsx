import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <main className="wrap">
      <h1 className="h1">Customers</h1>
      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
          <tbody>
            {customers.length === 0 ? (
              <tr><td colSpan={3} className="muted">No customers yet. Add via API POST /api/customers</td></tr>
            ) : customers.map((c) => (
              <tr key={c.id}><td>{c.name}</td><td>{c.email ?? "-"}</td><td>{c.phone ?? "-"}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
