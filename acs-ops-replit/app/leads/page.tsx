import { prisma } from "@/lib/prisma";
import { convertLeadToActive, updateLeadStage } from "./actions";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <main className="wrap">
      <h1 className="h1">Leads</h1>
      <div className="card">
        <table className="table">
          <thead><tr><th>Name</th><th>Source</th><th>Status</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead>
          <tbody>
            {leads.length === 0 ? (
              <tr><td colSpan={6} className="muted">No leads yet. POST /api/leads to create one.</td></tr>
            ) : leads.map((l) => (
              <tr key={l.id}>
                <td>{l.name}</td>
                <td>{l.source}</td>
                <td>{l.status}</td>
                <td>{l.email ?? "-"}</td>
                <td>{l.phone ?? "-"}</td>
                <td>
                  <div className="row">
                    <form action={updateLeadStage}>
                      <input type="hidden" name="id" value={l.id} />
                      <select name="status" defaultValue={l.status} style={{ border: "1px solid #d8e1ef", borderRadius: 6, padding: "4px 6px" }}>
                        {["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"].map((stage) => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                      <button className="btn" style={{ marginLeft: 6 }} type="submit">Save</button>
                    </form>
                    {(l.status !== "Won" && l.status !== "Lost") ? (
                      <form action={convertLeadToActive}>
                        <input type="hidden" name="leadId" value={l.id} />
                        <button className="btn primary" type="submit">Convert</button>
                      </form>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
