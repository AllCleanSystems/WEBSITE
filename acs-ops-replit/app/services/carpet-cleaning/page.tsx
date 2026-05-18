import Link from "next/link";
import type { Metadata } from "next";

const imageUrl = "https://acsbismarck.com/images/carpet-cleaning-bismarck-before-after-rug.webp";
const extractionImageUrl = "https://acsbismarck.com/images/carpet-cleaning-bismarck-can-you-see-the-difference.webp";

export const metadata: Metadata = {
  title: "Carpet Cleaning in Bismarck, ND | All Clean Solutions",
  description:
    "Professional carpet cleaning in Bismarck and Mandan, ND. All Clean Solutions helps clean traffic lanes, spots, odors, and commercial or residential carpets.",
  alternates: {
    canonical: "https://acsbismarck.com/services/carpet-cleaning",
  },
  openGraph: {
    title: "Carpet Cleaning in Bismarck, ND | All Clean Solutions",
    description:
      "See the difference professional carpet cleaning can make for Bismarck and Mandan homes, offices, apartments, and commercial spaces.",
    url: "https://acsbismarck.com/services/carpet-cleaning",
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 2400,
        height: 1500,
        alt: "Before and after carpet cleaning by All Clean Solutions in Bismarck ND",
      },
      {
        url: extractionImageUrl,
        width: 1800,
        height: 1575,
        alt: "All Clean Solutions carpet extraction cleaning in Bismarck ND showing visible results",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Carpet Cleaning in Bismarck, ND",
  serviceType: "Carpet Cleaning",
  provider: {
    "@type": "LocalBusiness",
    name: "All Clean Solutions",
    telephone: "+17015871158",
    url: "https://acsbismarck.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bismarck",
      addressRegion: "ND",
      addressCountry: "US",
    },
    areaServed: ["Bismarck ND", "Mandan ND", "Lincoln ND", "Burleigh County ND", "Morton County ND"],
    image: imageUrl,
  },
  areaServed: ["Bismarck ND", "Mandan ND", "Lincoln ND"],
  description:
    "Professional carpet cleaning for residential and commercial properties in the Bismarck/Mandan area.",
  image: [imageUrl, extractionImageUrl],
};

const carpetSteps = [
  "Walk the carpet and identify stains, traffic lanes, odors, and sensitive areas.",
  "Pre-treat high-soil areas so the cleaning process can work deeper.",
  "Use hot-water extraction to rinse and recover soil from carpet fibers.",
  "Treat remaining spots when possible and groom the carpet for even drying.",
  "Review the cleaned areas and note any recommendations for future care.",
];

const goodFor = [
  "Homes and apartments",
  "Offices and commercial spaces",
  "Property managers and move-outs",
  "Traffic lanes and entry areas",
  "Pet odor concerns and common spots",
  "Scheduled maintenance cleaning",
];

export default function CarpetCleaningPage() {
  return (
    <main className="siteMain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section className="siteWrap carpetHero">
        <div className="carpetHeroCopy">
          <p className="eyebrow">All Clean Solutions carpet cleaning</p>
          <h1>Carpet Cleaning in Bismarck, ND</h1>
          <p className="lead">
            Professional carpet cleaning for homes, offices, apartments, and commercial properties across Bismarck,
            Mandan, Lincoln, and nearby North Dakota communities.
          </p>
          <div className="heroActions">
            <Link className="ctaBtn inlineCta" href="/contact">
              Request a carpet cleaning quote
            </Link>
            <a className="secondaryCta" href="tel:7015871158">
              Call 701-587-1158
            </a>
          </div>
        </div>

        <figure className="seoPhotoCard carpetHeroPhoto">
          <img
            src="/images/carpet-cleaning-bismarck-before-after-rug.webp"
            alt="Before and after area rug carpet cleaning by All Clean Solutions in Bismarck Mandan North Dakota"
            loading="eager"
          />
          <figcaption>Before and after area rug cleaning by All Clean Solutions.</figcaption>
        </figure>
      </section>

      <section className="siteWrap beforeAfterSpotlight">
        <div>
          <p className="eyebrow">Before and after proof</p>
          <h2>Area rug cleaning with a visible difference</h2>
          <p>
            This before and after carpet cleaning result shows how much cleaner a rug can look after a professional
            cleaning process. All Clean Solutions helps Bismarck and Mandan customers with area rug cleaning, carpet
            traffic lanes, spots, odor concerns, and commercial carpet maintenance.
          </p>
        </div>
        <figure className="seoPhotoCard">
          <img
            src="/images/carpet-cleaning-bismarck-can-you-see-the-difference.webp"
            alt="All Clean Solutions carpet extraction cleaning in Bismarck ND showing visible soil removal"
            loading="lazy"
          />
          <figcaption>Can You See the Difference?</figcaption>
        </figure>
      </section>

      <section className="siteWrap seoContentGrid">
        <article className="serviceCard">
          <h2>What our carpet cleaning helps with</h2>
          <p>
            Carpet can hold tracked-in soil, spills, odors, allergens, and traffic-lane buildup that normal vacuuming
            cannot fully remove. All Clean Solutions cleans carpet with a practical process built for visible results,
            better presentation, and a cleaner feel underfoot.
          </p>
          <div className="miniGrid">
            {goodFor.map((item) => (
              <span key={item} className="chip ok">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="serviceCard">
          <h2>Our carpet cleaning process</h2>
          <ol className="numberedList">
            {carpetSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="siteWrap localSeoBlock">
        <h2>Local carpet cleaning near Bismarck and Mandan</h2>
        <p>
          If you searched for carpet cleaning near me, carpet cleaners in Bismarck ND, or commercial carpet cleaning
          in Mandan, All Clean Solutions can help with one-time cleanings, move-out refreshes, office carpet care, and
          recurring carpet maintenance.
        </p>
        <p>
          We also provide hood cleaning, commercial cleaning, pressure washing, floor cleaning, window cleaning, snow
          removal, and lawn care, so you can keep more of your property service work with one local company.
        </p>
      </section>
    </main>
  );
}
