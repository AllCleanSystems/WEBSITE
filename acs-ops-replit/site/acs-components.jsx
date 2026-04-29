// All Clean Solutions — Shared Components
// acs-components.jsx

const C = {
  navy:       '#0B1F3A',
  navyMid:    '#12365E',
  navyLight:  '#E8F2FB',
  white:      '#FFFFFF',
  pink:       '#D98BB3',
  pinkHover:  '#C778A1',
  pinkLight:  '#FCEEF6',
  green:      '#3A6F4D',
  greenMid:   '#2F5C40',
  greenLight: '#E6F7EF',
  black:      '#000000',
  charcoal:   '#111827',
  slate:      '#4A5568',
  muted:      '#718096',
  silver:     '#A0AEC0',
  border:     '#E2E8F0',
  surface:    '#F7F9FC',
  amber:      '#B45309',
  amberLight: '#FEF3C7',
  red:        '#C0392B',
  redLight:   '#fee2e2',
};

// ── Icon Library ────────────────────────────────────────────
function Icon({ name, size = 20, color = 'currentColor', sw = 1.8 }) {
  const s = { width: size, height: size, display: 'block', flexShrink: 0 };
  const p = { fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    flame:       <svg style={s} viewBox="0 0 24 24" {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    droplets:    <svg style={s} viewBox="0 0 24 24" {...p}><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>,
    wind:        <svg style={s} viewBox="0 0 24 24" {...p}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
    snowflake:   <svg style={s} viewBox="0 0 24 24" {...p}><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>,
    leaf:        <svg style={s} viewBox="0 0 24 24" {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    window:      <svg style={s} viewBox="0 0 24 24" {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="12" y1="3" x2="12" y2="17"/></svg>,
    building:    <svg style={s} viewBox="0 0 24 24" {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>,
    spray:       <svg style={s} viewBox="0 0 24 24" {...p}><path d="M3 3l4 4"/><path d="M14 3c1.7 0 3 1.3 3 3s-1.3 3-3 3H7V3h7z"/><path d="M7 9v6"/><path d="M10 15v6"/><line x1="17" y1="9" x2="21" y2="9"/><line x1="17" y1="12" x2="21" y2="12"/><line x1="17" y1="15" x2="21" y2="15"/></svg>,
    check:       <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    'check-circle': <svg style={s} viewBox="0 0 24 24" {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    star:        <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    phone:       <svg style={s} viewBox="0 0 24 24" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.09 6.09l.96-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    shield:      <svg style={s} viewBox="0 0 24 24" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    arrow:       <svg style={s} viewBox="0 0 24 24" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    arrowLeft:   <svg style={s} viewBox="0 0 24 24" {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    menu:        <svg style={s} viewBox="0 0 24 24" {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x:           <svg style={s} viewBox="0 0 24 24" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    'map-pin':   <svg style={s} viewBox="0 0 24 24" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    mail:        <svg style={s} viewBox="0 0 24 24" {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
    clock:       <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    calendar:    <svg style={s} viewBox="0 0 24 24" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    bot:         <svg style={s} viewBox="0 0 24 24" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
    send:        <svg style={s} viewBox="0 0 24 24" {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    'chevron-down': <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="6 9 12 15 18 9"/></svg>,
    'chevron-up':   <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="18 15 12 9 6 15"/></svg>,
    'image':     <svg style={s} viewBox="0 0 24 24" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    users:       <svg style={s} viewBox="0 0 24 24" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    truck:       <svg style={s} viewBox="0 0 24 24" {...p}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    zap:         <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    info:        <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    'plus':      <svg style={s} viewBox="0 0 24 24" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    minus:       <svg style={s} viewBox="0 0 24 24" {...p}><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    clipboard:   <svg style={s} viewBox="0 0 24 24" {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
    file:        <svg style={s} viewBox="0 0 24 24" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  };
  return icons[name] || <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="8"/></svg>;
}

// ── Button ───────────────────────────────────────────────────
function Btn({ children, variant = 'primary', onClick, href, style = {}, type = 'button' }) {
  const base = {
    fontFamily: 'Inter, sans-serif', fontWeight: 600, border: 'none', borderRadius: 8,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'all 150ms cubic-bezier(0.4,0,0.2,1)', fontSize: 15, padding: '13px 26px',
    textDecoration: 'none', lineHeight: 1, whiteSpace: 'nowrap', ...style
  };
  const variants = {
    primary:   { background: C.pink,    color: '#fff' },
    green:     { background: C.green,   color: '#fff' },
    navy:      { background: C.navy,    color: '#fff' },
    outline:   { background: 'transparent', color: C.navy, border: `2px solid ${C.navy}` },
    outlineW:  { background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)' },
    ghost:     { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)' },
    danger:    { background: C.red,     color: '#fff' },
  };
  const merged = { ...base, ...variants[variant] };
  if (href) return <a href={href} style={merged} onClick={onClick}>{children}</a>;
  return <button type={type} style={merged} onClick={onClick}>{children}</button>;
}

// ── Trust Bar ────────────────────────────────────────────────
function TrustBar() {
  return (
    <div style={{ background: C.charcoal, padding: '14px 40px', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
      {[
        { icon: 'shield', text: 'Licensed & insured' },
        { icon: 'check-circle', text: 'Satisfaction guaranteed' },
        { icon: 'star', text: '5-star rated' },
        { icon: 'clock', text: '24/7 emergency response' },
        { icon: 'map-pin', text: 'Bismarck, ND & 150 mi' },
      ].map(i => (
        <div key={i.text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Icon name={i.icon} size={14} color={C.green} sw={2}/>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.01em' }}>{i.text}</span>
        </div>
      ))}
    </div>
  );
}

// ── Service Card ─────────────────────────────────────────────
function ServiceCard({ icon, title, desc, tags, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white, border: `1px solid ${hov ? C.pink : C.border}`,
        borderRadius: 14, padding: '24px', cursor: onClick ? 'pointer' : 'default',
        boxShadow: hov ? `0 4px 20px rgba(139,30,90,0.12)` : '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'all 200ms', transform: hov ? 'translateY(-2px)' : 'none'
      }}
    >
      <div style={{ width: 48, height: 48, background: C.navyLight, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Icon name={icon} size={22} color={C.navy}/>
      </div>
      <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 17, fontWeight: 700, color: C.charcoal, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.6, marginBottom: tags ? 14 : 0 }}>{desc}</div>
      {tags && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tags.map(t => <span key={t} style={{ background: C.navyLight, color: C.navy, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 4 }}>{t}</span>)}
        </div>
      )}
      {onClick && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 14, fontSize: 13, fontWeight: 600, color: C.pink }}>
          Learn more <Icon name="arrow" size={13} color={C.pink}/>
        </div>
      )}
    </div>
  );
}

// ── Testimonial Card ─────────────────────────────────────────
function TestimonialCard({ quote, name, role }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={C.pink} stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>"{quote}"</div>
      <div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal }}>{name}</div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{role}</div>
    </div>
  );
}

// ── Page Hero ────────────────────────────────────────────────
function PageHero({ eyebrow, title, subtitle, children, size = 'md' }) {
  const py = size === 'lg' ? '96px' : size === 'sm' ? '40px' : '60px';
  return (
    <section style={{ background: C.navy, padding: `${py} 40px`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(45,92,53,0.25) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(139,30,90,0.15) 0%, transparent 55%)', pointerEvents: 'none' }}></div>
      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        {eyebrow && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(139,30,90,0.2)', border: '1px solid rgba(139,30,90,0.35)', borderRadius: 9999, padding: '5px 14px', marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#d96fa8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{eyebrow}</span>
        </div>}
        <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 24px' }}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

// ── FAQ Item ─────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: open ? C.navyLight : C.white, border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, fontWeight: 600, color: C.charcoal }}>{q}</span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={18} color={C.slate} sw={2}/>
      </button>
      {open && <div style={{ padding: '0 22px 18px', fontSize: 14, color: C.slate, lineHeight: 1.75, background: C.white }}>{a}</div>}
    </div>
  );
}

// ── CTA Banner ───────────────────────────────────────────────
function CTABanner({ onNav }) {
  return (
    <section style={{ background: C.navy, padding: '64px 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 14 }}>Ready to schedule your service?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.7 }}>Get a free, no-obligation estimate within 1 hour. Serving Bismarck and surrounding communities.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Btn variant="primary" onClick={() => onNav('contact')} style={{ fontSize: 16, padding: '14px 32px' }}>Request a free estimate <Icon name="arrow" size={15} color="#fff"/></Btn>
          <Btn variant="outlineW" onClick={() => window.open('tel:7015550100')} style={{ fontSize: 16, padding: '14px 32px' }}><Icon name="phone" size={15} color="#fff"/> Call (701) 555-0100</Btn>
        </div>
      </div>
    </section>
  );
}

// ── Sticky Header / Nav ──────────────────────────────────────
function SiteNav({ page, onNav, onChatOpen }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [svcOpen, setSvcOpen] = React.useState(false);
  const svcRef = React.useRef(null);

  const SERVICES_NAV = [
    { key: 'service-hood',       label: 'Hood & Exhaust Cleaning',    icon: 'flame' },
    { key: 'service-carpet',     label: 'Carpet Cleaning',             icon: 'droplets' },
    { key: 'service-window',     label: 'Window Cleaning',             icon: 'window' },
    { key: 'service-pressure',   label: 'Pressure Washing',            icon: 'wind' },
    { key: 'service-snow',       label: 'Snow Removal',                icon: 'snowflake' },
    { key: 'service-lawn',       label: 'Lawn Care',                   icon: 'leaf' },
    { key: 'service-commercial', label: 'Commercial Cleaning',         icon: 'building' },
    { key: 'service-deep',       label: 'Deep Cleaning',               icon: 'spray' },
    { key: 'service-degreasing', label: 'Degreasing',                  icon: 'zap' },
  ];

  React.useEffect(() => {
    const h = (e) => { if (svcRef.current && !svcRef.current.contains(e.target)) setSvcOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const navLink = (key, label) => (
    <button key={key} onClick={() => { onNav(key); setMenuOpen(false); }} style={{
      background: 'none', border: 'none', padding: '8px 12px', borderRadius: 6, fontSize: 14, fontWeight: 500,
      color: page === key ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
      borderBottom: page === key ? `2px solid ${C.pink}` : '2px solid transparent', transition: 'all 150ms'
    }}>{label}</button>
  );

  return (
    <nav style={{ background: C.navy, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', position: 'sticky', top: 0, zIndex: 200, boxShadow: '0 2px 16px rgba(0,0,0,0.35)' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginRight: 28, flexShrink: 0 }} onClick={() => onNav('home')}>
        <img src="uploads/acs-logo-transparent.png" alt="All Clean Solutions logo" style={{ width: 42, height: 42, objectFit: 'contain' }} />
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>All Clean Solutions</span>
      </div>

      {/* Desktop nav */}
      <div className="desktop-nav" style={{ display: 'flex', gap: 2, flex: 1, alignItems: 'center' }}>
        {navLink('home', 'Home')}

        {/* Services dropdown */}
        <div ref={svcRef} style={{ position: 'relative' }}>
          <button onClick={() => setSvcOpen(o => !o)} style={{
            background: 'none', border: 'none', padding: '8px 12px', borderRadius: 6, fontSize: 14, fontWeight: 500,
            color: page.startsWith('service') || page === 'services' ? '#fff' : 'rgba(255,255,255,0.65)',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 4,
            borderBottom: (page.startsWith('service') || page === 'services') ? `2px solid ${C.pink}` : '2px solid transparent', transition: 'all 150ms'
          }}>
            Services <Icon name="chevron-down" size={13} color="rgba(255,255,255,0.5)" sw={2.5}/>
          </button>
          {svcOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '8px', width: 260, zIndex: 300 }}>
              <div onClick={() => { onNav('services'); setSvcOpen(false); }} style={{ padding: '8px 12px', borderRadius: 7, fontSize: 12, fontWeight: 700, color: C.pink, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' }}>All Services →</div>
              {SERVICES_NAV.map(s => (
                <div key={s.key} onClick={() => { onNav(s.key); setSvcOpen(false); }} style={{ padding: '9px 12px', borderRadius: 7, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'background 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.background = C.surface}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Icon name={s.icon} size={15} color={C.navy}/><span style={{ fontSize: 13, color: C.charcoal, fontFamily: 'Inter, sans-serif' }}>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {navLink('areas', 'Service Areas')}
        {navLink('about', 'About')}
        {navLink('gallery', 'Gallery')}
        {navLink('contact', 'Contact')}
      </div>

      {/* Right actions */}
      <div className="desktop-nav" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          id="chatOpenButton"
          onClick={onChatOpen}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 8, background: 'rgba(45,92,53,0.3)', border: `1.5px solid rgba(45,92,53,0.6)`, color: '#7eb88a', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 150ms' }}
        >
          <Icon name="bot" size={15} color="#7eb88a" sw={1.8}/> AI Assistant
        </button>
        <Btn variant="primary" onClick={() => onNav('contact')} style={{ padding: '9px 18px', fontSize: 13 }}>Get a free estimate</Btn>
      </div>

      {/* Mobile hamburger */}
      <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginLeft: 'auto' }}>
        <Icon name={menuOpen ? 'x' : 'menu'} size={24} color="#fff"/>
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, background: C.navy, zIndex: 250, overflowY: 'auto', padding: '20px 24px' }}>
          {[
            { k: 'home', l: 'Home' }, { k: 'services', l: 'All Services' }, { k: 'service-hood', l: 'Hood Cleaning' },
            { k: 'service-carpet', l: 'Carpet Cleaning' }, { k: 'service-window', l: 'Window Cleaning' },
            { k: 'service-pressure', l: 'Pressure Washing' }, { k: 'service-snow', l: 'Snow Removal' },
            { k: 'service-lawn', l: 'Lawn Care' }, { k: 'service-commercial', l: 'Commercial Cleaning' },
            { k: 'service-deep', l: 'Deep Cleaning' }, { k: 'service-degreasing', l: 'Degreasing' },
            { k: 'areas', l: 'Service Areas' }, { k: 'about', l: 'About' }, { k: 'gallery', l: 'Gallery' }, { k: 'contact', l: 'Contact' },
          ].map(({ k, l }) => (
            <button key={k} onClick={() => { onNav(k); setMenuOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: `1px solid rgba(255,255,255,0.08)`, padding: '14px 0', fontSize: 16, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{l}</button>
          ))}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn variant="primary" onClick={() => { onChatOpen(); setMenuOpen(false); }} style={{ justifyContent: 'center' }}><Icon name="bot" size={16} color="#fff"/> AI Assistant</Btn>
            <Btn variant="ghost" onClick={() => { onNav('contact'); setMenuOpen(false); }} style={{ justifyContent: 'center' }}>Get a free estimate</Btn>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Site Footer ──────────────────────────────────────────────
function SiteFooter({ onNav }) {
  const services = [
    ['Hood & Exhaust Cleaning', 'service-hood'],
    ['Carpet Cleaning', 'service-carpet'],
    ['Window Cleaning', 'service-window'],
    ['Pressure Washing', 'service-pressure'],
    ['Snow Removal & Ice Mgmt', 'service-snow'],
    ['Lawn Care & Grounds', 'service-lawn'],
    ['Commercial Cleaning', 'service-commercial'],
    ['Deep Cleaning', 'service-deep'],
    ['Degreasing', 'service-degreasing'],
  ];
  const lnk = (label, key) => (
    <div key={label} onClick={() => onNav(key)} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 9, cursor: 'pointer', transition: 'color 150ms' }}
      onMouseEnter={e => e.target.style.color = '#fff'}
      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>{label}</div>
  );
  return (
    <footer style={{ background: C.navy, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '56px 40px 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1.5fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <img src="uploads/acs-logo-transparent.png" alt="All Clean Solutions logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 800, color: '#fff' }}>All Clean Solutions</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 300, marginBottom: 20 }}>
              Residential & commercial cleaning across Bismarck, ND and surrounding communities. Cleaning in a Real Way.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: 'phone', text: '(701) 587-1158' },
                { icon: 'mail', text: 'info@acsbismarck.com' },
                { icon: 'map-pin', text: 'Bismarck, ND 58501' },
              ].map(c => (
                <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                  <Icon name={c.icon} size={13} color="rgba(255,255,255,0.35)" sw={1.8}/>{c.text}
                </div>
              ))}
            </div>
          </div>
          {/* Services */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Services</div>
            {services.map(([l, k]) => lnk(l, k))}
          </div>
          {/* Company */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Company</div>
            {lnk('About us', 'about')}
            {lnk('Service areas', 'areas')}
            {lnk('Before & After Gallery', 'gallery')}
            {lnk('Contact us', 'contact')}
            {lnk('Request a quote', 'contact')}
          </div>
          {/* Legal */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Legal</div>
            {lnk('Privacy Policy', 'privacy')}
            {lnk('Terms & Conditions', 'terms')}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© 2025 All Clean Solutions LLC. All rights reserved. Bismarck, ND.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <span onClick={() => onNav('privacy')} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Privacy Policy</span>
            <span onClick={() => onNav('terms')} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { C, Icon, Btn, TrustBar, ServiceCard, TestimonialCard, PageHero, FAQItem, CTABanner, SiteNav, SiteFooter });
