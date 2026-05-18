import Link from "next/link";
import type { Metadata, Route } from "next";

export const metadata: Metadata = {
  title: "Cleaning Services in Bismarck, ND | All Clean Solutions",
  description:
    "All Clean Solutions provides carpet cleaning, hood cleaning, commercial cleaning, pressure washing, window cleaning, snow removal, and lawn care in Bismarck and Mandan, ND.",
  alternates: {
    canonical: "https://acsbismarck.com/services",
  },
  openGraph: {
    title: "Cleaning Services in Bismarck, ND | All Clean Solutions",
    description:
      "Local cleaning services for Bismarck and Mandan properties, including carpet cleaning, hood cleaning, commercial cleaning, pressure washing, and more.",
    url: "https://acsbismarck.com/services",
    type: "website",
  },
};

const services: Array<{ name: string; href: string; text: string }> = [
  {
    name: "Hood & Exhaust Cleaning",
    href: "/services",
    text: "Kitchen hood, exhaust, filter, fan, and grease removal support for restaurants and food-service spaces.",
  },
  {
    name: "Carpet Cleaning",
    href: "/services/carpet-cleaning",
    text: "Hot-water extraction carpet cleaning for homes, offices, apartments, and commercial spaces in Bismarck/Mandan.",
  },
  {
    name: "Window Cleaning",
    href: "/services",
    text: "Interior and exterior glass cleaning for storefronts, offices, and property managers.",
  },
  {
    name: "Pressure Washing",
    href: "/services",
    text: "Concrete, entryway, dumpster pad, siding, and exterior surface cleaning.",
  },
  {
    name: "Snow Removal & Ice Management",
    href: "/services",
    text: "Winter parking lot, walkway, and entry access support for local properties.",
  },
  {
    name: "Lawn Care & Grounds Maintenance",
    href: "/services",
    text: "Mowing, cleanup, and exterior property care for residential and commercial clients.",
  },
  {
    name: "Commercial Cleaning",
    href: "/services",
    text: "Recurring janitorial and detail cleaning for professional spaces.",
  },
  {
    name: "Deep Cleaning",
    href: "/services",
    text: "One-time reset cleaning for move-outs, neglected areas, seasonal cleanups, and special projects.",
  },
  {
    name: "Degreasing",
    href: "/services",
    text: "Heavy-duty grease and grime removal for kitchens, equipment areas, floors, and workspaces.",
  },
];

export default function ServicesPage() {
  return (
    <main className="siteMain">
      <section className="siteWrap">
        <h1>Our Services</h1>
        <p className="lead">
          Complete cleaning and property services for residential and commercial clients in Bismarck, Mandan, and
          surrounding North Dakota communities.
        </p>

        <section className="featuredService">
          <div className="featuredServiceCopy">
            <p className="eyebrow">Featured carpet cleaning result</p>
            <h2>Carpet Cleaning in Bismarck/Mandan, ND</h2>
            <p>
              All Clean Solutions uses professional carpet cleaning equipment to lift tracked-in soil, traffic lanes,
              and everyday buildup from residential and commercial carpets. If you need carpet cleaning near Bismarck,
              Mandan, Lincoln, or nearby communities, this is the kind of visible difference we want you to see.
            </p>
            <Link className="ctaBtn inlineCta" href={"/services/carpet-cleaning" as Route}>
              See carpet cleaning details
            </Link>
          </div>
          <figure className="seoPhotoCard">
            <img
              src="/images/carpet-cleaning-bismarck-can-you-see-the-difference.webp"
              alt="All Clean Solutions carpet cleaning in Bismarck ND showing a clear clean carpet difference"
              loading="eager"
            />
            <figcaption>Can You See the Difference?</figcaption>
          </figure>
        </section>

        <div className="cardGrid">
          {services.map((s) => (
            <Link key={s.name} href={s.href as Route} className="serviceCard serviceLinkCard">
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
