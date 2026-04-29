import { prisma } from "@/lib/prisma";
import { createRecurringJob, runRecurringGenerator } from "./actions";

export default async function RecurringJobsPage() {
  const [customers, jobs] = await Promise.all([
    prisma.customer.findMany({ orderBy: { name: "asc" }, take: 200 }),
    prisma.recurringJob.findMany({ include: { customer: true }, orderBy: { nextRunAt: "asc" }, take: 100 }),
  ]);

  return (
    <main className="wrap">
      <h1 className="h1">Recurring Jobs Engine</h1>
      <p className="muted">Automate repeat cleanings into work orders without admin effort.</p>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Create Recurring Job</h3>
          <form action={createRecurringJob} className="formStack">
            <input name="title" placeholder="Recurring service title" required />
            <select name="customerId" required>
              <option value="">Select customer</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="row">
              <select name="frequency" defaultValue="Weekly">
                {["Daily", "Weekly", "Biweekly", "Monthly"].map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <input name="intervalCount" type="number" min={1} defaultValue={1} />
              <select name="priority" defaultValue="Medium">
                {["Low", "Medium", "High", "Urgent"].map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button className="btn primary" type="submit">Create Recurring Rule</button>
          </form>
        </article>

        <article className="card">
          <h3>Run Generator Now</h3>
          <p className="muted">Creates due work orders instantly from all active recurring rules.</p>
          <form action={runRecurringGenerator}>
            <button className="btn primary" type="submit">Generate Due Work Orders</button>
          </form>
        </article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>Recurring Rules</h3>
        <table className="table">
          <thead><tr><th>Title</th><th>Customer</th><th>Frequency</th><th>Next Run</th><th>Priority</th><th>Active</th></tr></thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr><td colSpan={6} className="muted">No recurring jobs yet.</td></tr>
            ) : jobs.map((j) => (
              <tr key={j.id}>
                <td>{j.title}</td>
                <td>{j.customer.name}</td>
                <td>{j.frequency} x{j.intervalCount}</td>
                <td>{j.nextRunAt.toISOString()}</td>
                <td>{j.priority}</td>
                <td>{j.active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
