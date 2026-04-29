import { prisma } from "@/lib/prisma";

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function QuotesInvoicesPage() {
  const [quotes, invoices] = await Promise.all([
    prisma.quote.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.invoice.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" }, take: 50 }),
  ]);

  return (
    <main className="wrap">
      <h1 className="h1">Quotes & Invoices</h1>
      <section className="split" style={{ marginTop: 16 }}>
        <article className="card">
          <h3>Quote Pipeline</h3>
          <table className="table">
            <thead><tr><th>Quote</th><th>Status</th><th>Customer</th><th>Amount</th></tr></thead>
            <tbody>
              {quotes.length === 0 ? (
                <tr><td colSpan={4} className="muted">No quotes yet. POST /api/quotes to create one.</td></tr>
              ) : quotes.map((q) => (
                <tr key={q.id}><td>{q.quoteNumber}</td><td>{q.status}</td><td>{q.customer.name}</td><td>{money(q.amountCents)}</td></tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className="card">
          <h3>Invoice Queue</h3>
          <table className="table">
            <thead><tr><th>Invoice</th><th>Status</th><th>Customer</th><th>Balance</th></tr></thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr><td colSpan={4} className="muted">No invoices yet. Work-order completion can auto-create draft invoices.</td></tr>
              ) : invoices.map((i) => (
                <tr key={i.id}><td>{i.invoiceNumber}</td><td>{i.status}</td><td>{i.customer.name}</td><td>{money(i.amountCents)}</td></tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
