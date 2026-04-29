import { SiteShell } from "../site-shell";

export default function ContactPage() {
  return (
    <SiteShell>
      <main className="siteMain">
        <section className="siteWrap">
          <h1>Contact Us</h1>
          <p className="lead">Request a quote and we will follow up quickly.</p>
          <div className="twoCol">
            <article className="serviceCard">
              <h3>Reach Us</h3>
              <p>Phone: (701) 587-1158</p>
              <p>Email: info@acsbismarck.com</p>
              <p>Location: Bismarck, ND</p>
            </article>
            <article className="serviceCard">
              <h3>Quick Request</h3>
              <p>Use the AI assistant on the homepage to submit your service request 24/7.</p>
              <p>For urgent needs, call us directly.</p>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

