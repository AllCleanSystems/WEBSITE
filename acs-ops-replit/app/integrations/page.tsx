const envRows = [
  "ZOHO_CLIENT_ID",
  "ZOHO_CLIENT_SECRET",
  "ZOHO_REFRESH_TOKEN",
  "ZOHO_ORG_ID",
  "OPENAI_API_KEY",
];

export default async function IntegrationsPage() {
  return (
    <main className="wrap">
      <h1 className="h1">Integrations</h1>
      <p className="muted">Central place to connect Zoho CRM/Books/FSM and your AI provider keys.</p>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Zoho Stack</h3>
          <ul className="list">
            <li>Zoho CRM: leads, contacts, accounts, deals sync.</li>
            <li>Zoho Books: invoices, payments, balances, dunning.</li>
            <li>Zoho FSM: job status, technician updates, completion notes.</li>
          </ul>
          <p className="muted" style={{ marginTop: 10 }}>
            Next step is wiring your OAuth credentials into environment variables and enabling sync workers.
          </p>
        </article>

        <article className="card">
          <h3>Required Environment Variables</h3>
          <table className="table">
            <thead><tr><th>Variable</th><th>Status</th></tr></thead>
            <tbody>
              {envRows.map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{process.env[key] ? "Set" : "Missing"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row" style={{ marginTop: 10 }}>
            <form action="/api/integrations/zoho/status" method="get">
              <button className="btn" type="submit">Check Zoho Status JSON</button>
            </form>
            <form action="/api/integrations/zoho/test-auth" method="post">
              <button className="btn" type="submit">Test Zoho Auth</button>
            </form>
            <form action="/api/integrations/zoho/pull-leads" method="post">
              <button className="btn" type="submit">Import Zoho Leads</button>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
}
