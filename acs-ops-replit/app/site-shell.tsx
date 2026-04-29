import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <header className="siteHeader">
        <div className="siteWrap navRow">
          <Link href="/" className="brand">
            All Clean Solutions
          </Link>
          <nav className="siteNav">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a className="ctaBtn" href="tel:7015871158">
            Call (701) 587-1158
          </a>
        </div>
      </header>

      <div>{children}</div>

      <footer className="siteFooter">
        <div className="siteWrap footGrid">
          <div>
            <h4>All Clean Solutions</h4>
            <p>Professional cleaning and maintenance services in Bismarck, ND and surrounding communities.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>(701) 587-1158</p>
            <p>info@acsbismarck.com</p>
          </div>
          <div>
            <h4>Core Services</h4>
            <p>Hood cleaning, commercial cleaning, pressure washing, carpet, windows, snow, lawn care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

