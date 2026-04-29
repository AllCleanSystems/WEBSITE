import { SiteShell } from "../site-shell";

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="siteMain">
        <section className="siteWrap">
          <h1>About All Clean Solutions</h1>
          <p className="lead">
            We help homes and businesses stay clean, safe, and operational with responsive service and long-term care plans.
          </p>
          <div className="twoCol">
            <article className="serviceCard">
              <h3>Our Mission</h3>
              <p>
                Deliver consistent, high-quality service with integrity, speed, and clear communication.
              </p>
            </article>
            <article className="serviceCard">
              <h3>Why Clients Choose Us</h3>
              <p>
                Local team, practical scheduling, emergency responsiveness, and a one-stop service model across cleaning, snow, and grounds.
              </p>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

