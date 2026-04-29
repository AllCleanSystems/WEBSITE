import { prisma } from "@/lib/prisma";

export default async function AutomationEventsPage() {
  const events = await prisma.automationEvent.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <main className="wrap">
      <h1 className="h1">Automation Events</h1>
      <div className="card">
        <table className="table">
          <thead><tr><th>When</th><th>Type</th><th>Entity</th><th>Message</th></tr></thead>
          <tbody>
            {events.length === 0 ? (
              <tr><td colSpan={4} className="muted">No automation events yet. Trigger work-order actions to populate.</td></tr>
            ) : events.map((e) => (
              <tr key={e.id}><td>{e.createdAt.toISOString()}</td><td>{e.eventType}</td><td>{e.entityType}:{e.entityId.slice(0,8)}</td><td>{e.message}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
