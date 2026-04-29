import { prisma } from "@/lib/prisma";
import { capturePayment } from "./actions";

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function PaymentsPage() {
  const [invoices, payments] = await Promise.all([
    prisma.invoice.findMany({ include: { customer: true, payments: true }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.payment.findMany({ include: { invoice: true }, orderBy: { createdAt: "desc" }, take: 100 }),
  ]);

  return (
    <main className="wrap">
      <h1 className="h1">Payments & Collections</h1>
      <p className="muted">Track captured payments and close invoice loops.</p>

      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Capture Payment</h3>
          <form action={capturePayment} className="formStack">
            <select name="invoiceId" required>
              <option value="">Select invoice</option>
              {invoices.map((i) => <option key={i.id} value={i.id}>{i.invoiceNumber} · {i.customer.name} · {money(i.amountCents)}</option>)}
            </select>
            <input name="amount" type="number" step="0.01" min="0.01" placeholder="Amount (USD)" required />
            <select name="method" defaultValue="Card">
              {["Card", "ACH", "Cash", "Check", "Wire"].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <input name="externalRef" placeholder="External transaction/reference (optional)" />
            <button className="btn primary" type="submit">Capture Payment</button>
          </form>
        </article>

        <article className="card">
          <h3>Recent Payments</h3>
          <table className="table">
            <thead><tr><th>When</th><th>Invoice</th><th>Amount</th><th>Method</th></tr></thead>
            <tbody>
              {payments.length === 0 ? (
                <tr><td colSpan={4} className="muted">No payments captured yet.</td></tr>
              ) : payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.receivedAt.toISOString()}</td>
                  <td>{p.invoice.invoiceNumber}</td>
                  <td>{money(p.amountCents)}</td>
                  <td>{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
