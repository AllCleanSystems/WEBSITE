import { SiteShell } from "../site-shell";

const examples = [
  "Restaurant hood degreasing",
  "Commercial lobby deep clean",
  "Exterior pressure washing",
  "Snow event lot clearing",
  "Office carpet restoration",
  "Window detailing",
];

export default function GalleryPage() {
  return (
    <SiteShell>
      <main className="siteMain">
        <section className="siteWrap">
          <h1>Before & After Gallery</h1>
          <p className="lead">Examples of recent work across our service lines.</p>
          <div className="cardGrid">
            {examples.map((e) => (
              <article key={e} className="serviceCard">
                <div className="imgPlaceholder">Project Photo</div>
                <h3>{e}</h3>
                <p>Ask us for similar results at your property.</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

