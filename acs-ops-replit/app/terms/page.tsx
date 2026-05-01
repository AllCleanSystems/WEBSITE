export default function TermsPage() {
  return (
    <main className="wrap">
      <h1 className="h1">Terms and Conditions</h1>
      <p className="muted">Effective date: April 30, 2026</p>

      <section className="card" style={{ marginTop: 12 }}>
        <h3>Service Terms</h3>
        <p>By requesting service from All Clean Solutions, you agree to our scheduling, pricing, and communication policies.</p>
        <h3>SMS Messaging Consent</h3>
        <p>
          If you choose to receive text messages from All Clean Solutions, you consent to receive SMS messages related to quotes, scheduling, reminders, service updates, invoices, payment reminders, review requests, and customer support. Message and data rates may apply. Message frequency varies. Reply STOP to opt out. Reply HELP for help.
        </p>
        <ul className="list">
          <li>Message and data rates may apply.</li>
          <li>Message frequency varies.</li>
          <li>Reply STOP to opt out at any time.</li>
          <li>Reply HELP for help.</li>
          <li>Consent to receive SMS is not a condition of purchase.</li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h3>Support</h3>
        <p>For support, contact All Clean Solutions at (701) 587-1158 or info@acsbismarck.com.</p>
      </section>
    </main>
  );
}
