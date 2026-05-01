export default function SmsPolicyPage() {
  return (
    <main className="wrap">
      <h1 className="h1">SMS Terms &amp; Conditions</h1>
      <p className="muted">All Clean Solutions SMS Terms &amp; Conditions</p>

      <section className="card" style={{ marginTop: 12 }}>
        <p>
          By opting in to receive SMS messages from All Clean Solutions, you agree to receive text messages related to cleaning service quotes, scheduling, appointment reminders, service updates, technician arrival updates, invoices, payment reminders, review requests, and customer support.
        </p>
        <p>
          Message frequency varies depending on your service request and account activity. Message and data rates may apply.
        </p>
        <p>
          You can cancel SMS messages at any time by replying STOP. After you reply STOP, we may send one confirmation message that you have been unsubscribed. After this, you will no longer receive SMS messages unless you opt in again.
        </p>
        <p>For help, reply HELP or contact All Clean Solutions at 701-587-1158.</p>
        <p>Carriers are not liable for delayed or undelivered messages.</p>
        <p>
          We do not sell, rent, or share SMS opt-in consent or phone numbers with third parties for their marketing purposes.
        </p>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <h3>Phone/Call Verbal Consent Script</h3>
        <p>
          By continuing, you agree to receive text messages from All Clean Solutions related to your request, scheduling, service updates, reminders, and support. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Do we have your consent to text you?
        </p>

        <h3>First Text After Verbal Opt-In</h3>
        <p>
          All Clean Solutions: Thanks for confirming SMS consent. We’ll text you about your service request, scheduling, and support. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.
        </p>
      </section>
    </main>
  );
}
