import Link from "next/link";
import { QuoteRequestForm } from "./quote-request-form";

const allCleanSolutionsQuoteFormUrl =
  "https://getaquote.acsbismarck.com/allcleansolutions1/form/AllCleanSolutionsFreeQuote/formperma/GDjkQ4sXF6WUfRnN7S4Ip6cCkTOBBuXCkYKxhsmEsAA";

export default function ContactPage() {
  const zohoEmbedUrl = allCleanSolutionsQuoteFormUrl || process.env.NEXT_PUBLIC_ZOHO_FORM_EMBED_URL;

  return (
    <main className="siteMain">
      <section className="siteWrap">
        <h1>Contact Us</h1>
        <p className="lead">Request a quote and we will follow up quickly about your service request.</p>
        <div className="twoCol">
          <article className="serviceCard">
            <h3>Reach Us</h3>
            <p><strong>All Clean Solutions</strong></p>
            <p>Phone: (701) 587-1158</p>
            <p>Email: info@acsbismarck.com</p>
            <p>Service Area: Bismarck/Mandan, North Dakota</p>
            <p>Website: acsbismarck.com</p>
            <p className="muted">
              By submitting a quote request, you agree that All Clean Solutions may contact you about your request by phone or email. SMS text messages are only sent when you separately opt in on the quote form.
              <br />
              <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms & Conditions</Link> | <Link href="/sms-policy">SMS Terms</Link>
            </p>
          </article>
          {zohoEmbedUrl ? (
            <article className="serviceCard quoteEmbedCard">
              <div className="quoteEmbedHeader">
                <h3>Request a Free Quote</h3>
                <p className="muted">
                  Use this secure Zoho form to send your service details to All Clean Solutions.
                </p>
                <p className="quoteEmbedNote">
                  The SMS checkbox inside the form must be unchecked by default. Only check it if you agree to receive text messages about quotes, scheduling, service updates, reminders, and support. Reply STOP to opt out or HELP for help.
                </p>
              </div>
              <iframe
                aria-label="All Clean Solutions Free Quote"
                src={zohoEmbedUrl}
                title="All Clean Solutions Quote Form"
                className="quoteEmbedFrame"
                loading="lazy"
              />
              <p className="quoteEmbedNote">
                Submitting this quote request lets us contact you about this request. SMS is separate and requires the opt-in checkbox in the form.
              </p>
            </article>
          ) : (
            <QuoteRequestForm />
          )}
        </div>
      </section>
    </main>
  );
}
