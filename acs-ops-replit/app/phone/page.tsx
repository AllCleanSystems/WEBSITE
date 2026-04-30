import { getOpenPhoneConfigStatus } from "@/lib/openphone";

export default function PhonePage() {
  const status = getOpenPhoneConfigStatus();

  return (
    <main className="wrap">
      <h1 className="h1">Phone Hub (OpenPhone)</h1>
      <p className="muted">Use this panel to validate your OpenPhone connection and pull live message data.</p>
      <p className="muted" style={{ marginTop: 8 }}>
        Config status:{" "}
        <strong style={{ color: status.configured ? "#0f766e" : "#b91c1c" }}>
          {status.configured ? "Connected" : "Missing OPENPHONE_API_KEY"}
        </strong>
      </p>

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
          <h3>Phone Agent Fast Path</h3>
          <ul className="list">
            <li>Website agent captures phone numbers from user messages automatically.</li>
            <li>Phone/pricing/service-area questions return instantly from fast knowledge rules.</li>
            <li>OpenAI fallback is timeout-limited to keep response times tight.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
