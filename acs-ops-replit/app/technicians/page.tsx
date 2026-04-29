import { prisma } from "@/lib/prisma";
import { addTechnician, assignWorkOrder } from "./actions";

export default async function TechniciansPage() {
  const [techs, unassigned] = await Promise.all([
    prisma.technician.findMany({
      include: { assignments: { include: { workOrder: true }, orderBy: { assignedAt: "desc" }, take: 5 } },
      orderBy: { name: "asc" },
    }),
    prisma.workOrder.findMany({ where: { status: "Unassigned" }, orderBy: { createdAt: "asc" }, take: 50 }),
  ]);

  return (
    <main className="wrap">
      <h1 className="h1">Technicians & Assignments</h1>
      <p className="muted">Control field capacity and assign jobs from one place.</p>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Add Technician</h3>
          <form action={addTechnician} className="formStack">
            <input name="name" placeholder="Full name" required />
            <input name="phone" placeholder="Phone" />
            <input name="email" placeholder="Email" />
            <input name="skillTags" placeholder="Skills (e.g. HVAC,FloorCare,DeepClean)" />
            <button className="btn primary" type="submit">Add Technician</button>
          </form>
        </article>

        <article className="card">
          <h3>Assign Unassigned Work Order</h3>
          <form action={assignWorkOrder} className="formStack">
            <select name="workOrderId" required>
              <option value="">Select work order</option>
              {unassigned.map((w) => (
                <option key={w.id} value={w.id}>{w.title} ({w.priority})</option>
              ))}
            </select>
            <select name="technicianId" required>
              <option value="">Select technician</option>
              {techs.map((t) => (
                <option key={t.id} value={t.id}>{t.name} [{t.status}]</option>
              ))}
            </select>
            <button className="btn primary" type="submit">Assign</button>
          </form>
        </article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <h3>Technician Queue</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Status</th><th>Skills</th><th>Recent Assignments</th></tr></thead>
          <tbody>
            {techs.length === 0 ? (
              <tr><td colSpan={4} className="muted">No technicians yet.</td></tr>
            ) : techs.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.status}</td>
                <td>{t.skillTags ?? "-"}</td>
                <td>{t.assignments.map((a) => a.workOrder.title).join(", ") || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
