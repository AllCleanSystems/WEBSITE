import { SiteShell } from "../site-shell";

const services = [
  "Hood & Exhaust Cleaning",
  "Carpet Cleaning",
  "Window Cleaning",
  "Pressure Washing",
  "Snow Removal & Ice Management",
  "Lawn Care & Grounds Maintenance",
  "Commercial Cleaning",
  "Deep Cleaning",
  "Degreasing",
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <main className="siteMain">
        <section className="siteWrap">
          <h1>Our Services</h1>
          <p className="lead">Complete cleaning and property services for residential and commercial clients.</p>
          <div className="cardGrid">
            {services.map((s) => (
              <article key={s} className="serviceCard">
                <h3>{s}</h3>
                <p>Professional crews, clear communication, and dependable scheduling for every service visit.</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

