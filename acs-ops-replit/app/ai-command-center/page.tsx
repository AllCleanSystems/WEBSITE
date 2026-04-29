import { generateFollowups, optimizeDispatch, runCustomerSummary } from "./actions";

export default function AICommandCenterPage() {
  return (
    <main className="wrap">
      <h1 className="h1">AI Command Center</h1>
      <p className="muted">Automation-first assistant actions for dispatch, sales, and collections.</p>

      <section className="grid" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Customer Intelligence</h3>
          <ul className="list">
            <li>Summarize customer history before technician arrival.</li>
            <li>Flag churn risk from late payments and repeated callbacks.</li>
          </ul>
          <form action={runCustomerSummary} style={{ marginTop: 10 }}>
            <button className="btn" type="submit">Run Customer Summary</button>
          </form>
        </article>

        <article className="card">
          <h3>Dispatch Copilot</h3>
          <ul className="list">
            <li>Recommend best technician based on location + skill.</li>
            <li>Auto-prioritize urgent jobs.</li>
          </ul>
          <form action={optimizeDispatch} style={{ marginTop: 10 }}>
            <button className="btn" type="submit">Optimize Dispatch</button>
          </form>
        </article>

        <article className="card">
          <h3>Revenue Automation</h3>
          <ul className="list">
            <li>Draft quote follow-up messages.</li>
            <li>Create overdue invoice reminder campaigns.</li>
          </ul>
          <form action={generateFollowups} style={{ marginTop: 10 }}>
            <button className="btn" type="submit">Generate Follow-ups</button>
          </form>
        </article>
      </section>
    </main>
  );
}
