import { SiteShell } from "../site-shell";

const areas = [
  "Bismarck",
  "Mandan",
  "Lincoln",
  "Dickinson",
  "Jamestown",
  "Minot",
  "Surrounding communities (up to 150 miles)",
];

export default function AreasPage() {
  return (
    <SiteShell>
      <main className="siteMain">
        <section className="siteWrap">
          <h1>Service Areas</h1>
          <p className="lead">Proudly serving Bismarck and surrounding North Dakota communities.</p>
          <ul className="areaList">
            {areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}

