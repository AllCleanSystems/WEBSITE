import Link from "next/link";
import { QuoteRequestForm } from "./quote-request-form";

export default function ContactPage() {
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
          <QuoteRequestForm />
        </div>
      </section>
    </main>
  );
}
