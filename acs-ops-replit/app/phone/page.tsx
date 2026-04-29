export default function PhonePage() {
  return (
    <main className="wrap">
      <h1 className="h1">Phone Hub (OpenPhone)</h1>
      <p className="muted">Use this panel to validate your OpenPhone connection and pull live message data.</p>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Connection Checks</h3>
          <div className="row">
            <form action="/api/integrations/openphone/status" method="get">
              <button className="btn" type="submit">Check OpenPhone Status</button>
            </form>
            <form action="/api/integrations/openphone/messages?limit=25" method="get">
              <button className="btn primary" type="submit">Pull Recent Messages</button>
            </form>
          </div>
        </article>

        <article className="card">
          <h3>Next Build Steps</h3>
          <ul className="list">
            <li>Webhook receiver for incoming calls/texts.</li>
            <li>Auto-match phone numbers to customers.</li>
            <li>AI summary + follow-up task generation.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
