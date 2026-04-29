// All Clean Solutions — Main Pages
// acs-pages.jsx

const TESTIMONIALS = [
  { quote: "I'm absolutely thrilled with the service provided by All Clean Solutions! Joe and their team were professional, friendly, and thorough in cleaning our hood. They showed up on time, worked efficiently, and left my kitchen spotless. The price was very reasonable and I appreciate the attention to detail.", name: "Verified Customer", role: "Hood Cleaning, Bismarck ND" },
  { quote: "I recently had my carpets cleaned by All Clean Solutions, and I'm beyond impressed! They were extremely professional, quick, and handled everything with care. They moved all my furniture and put it back exactly how I had it. The floors dried super fast and the results are unreal.", name: "Verified Customer", role: "Carpet Cleaning, Bismarck ND" },
  { quote: "All Clean Solutions did an amazing job cleaning our food truck and ensuring that our food hood was cleaned and certified for use! They were very thorough and did a great job. They saved us a lot of time and were very reasonably priced. 100/10 recommend!", name: "Verified Customer", role: "Hood & Food Truck Cleaning" },
  { quote: "Joe and Raymond are very personable. Awesome service, very friendly. Good company. My carpets looked really good when they were cleaned — will be calling back.", name: "Verified Customer", role: "Carpet Cleaning, Bismarck ND" },
  { quote: "Amazing cleaning service! Always professional, reliable, and super detailed. My restaurant looks spotless every time. My carpets look brand new. Plus their snow removal in the winter and lawn care in the summer — highly recommend!", name: "Verified Customer", role: "Restaurant Client, Bismarck ND" },
  { quote: "Did a great job cleaning my hood system. Would recommend their services. Got my driveway cleared right away and at a reasonable price. Thank you Joe!", name: "Verified Customer", role: "Hood Cleaning & Snow Removal" },
];

const HOME_FAQS = [
  { q: 'What areas of North Dakota do you serve?', a: 'We serve Bismarck and surrounding communities within approximately 150 miles, including Mandan, Dickinson, Jamestown, Minot, Watford City, Beulah, Hazen, Garrison, and more. Contact us if you\'re unsure whether your location is in our service area.' },
  { q: 'Are you licensed and insured?', a: 'Yes. All Clean Solutions is fully licensed in North Dakota and carries general liability insurance and workers\' compensation coverage. We can provide certificates of insurance upon request.' },
  { q: 'How do I schedule a service?', a: 'Fill out our online request form, call us directly at (701) 587-1158, or chat with our AI assistant. We respond to all quote requests within 1 business hour during normal business hours.' },
  { q: 'How much does hood cleaning cost?', a: 'Hood cleaning pricing depends on the size of your system, grease buildup level, and service frequency. Most restaurant hoods range from $150–$400 per service. Contact us for a free on-site estimate specific to your kitchen.' },
  { q: 'Do you work evenings and weekends?', a: 'Yes. Many of our services — especially hood cleaning and deep cleaning — are performed during off-hours to avoid disrupting your operations. We offer evening, overnight, and weekend scheduling.' },
  { q: 'Do you offer recurring service contracts?', a: 'Absolutely. Most of our customers are on recurring contracts — monthly janitorial, quarterly hood cleaning, weekly lawn care, and seasonal snow removal are common. Recurring contracts receive priority scheduling and discounted rates.' },
];

const SERVICES_PREVIEW = [
  { icon: 'flame',    key: 'service-hood',       title: 'Hood & Exhaust Cleaning', desc: 'NFPA-96 compliant hood, duct, and exhaust fan cleaning with photo documentation.' },
  { icon: 'building', key: 'service-commercial',  title: 'Commercial Cleaning',     desc: 'Recurring janitorial services for offices, retail, medical, and industrial facilities.' },
  { icon: 'droplets', key: 'service-carpet',      title: 'Carpet Cleaning',         desc: 'Hot-water extraction cleaning for commercial carpets — fast dry, deep clean.' },
  { icon: 'wind',     key: 'service-pressure',    title: 'Pressure Washing',        desc: 'Parking lots, building exteriors, sidewalks, and dumpster pads cleaned right.' },
  { icon: 'snowflake',key: 'service-snow',        title: 'Snow Removal',            desc: '24/7 plowing, salting, and ice management for commercial properties.' },
  { icon: 'leaf',     key: 'service-lawn',        title: 'Lawn Care & Grounds',     desc: 'Mowing, edging, fertilization, and seasonal cleanups for commercial properties.' },
  { icon: 'window',   key: 'service-window',      title: 'Window Cleaning',         desc: 'Interior and exterior cleaning for storefronts, offices, and multi-story buildings.' },
  { icon: 'zap',      key: 'service-degreasing',  title: 'Degreasing',              desc: 'Heavy-duty grease removal for commercial kitchens, floors, and industrial spaces.' },
];

// ── Home Page ────────────────────────────────────────────────
function HomePage({ onNav }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: C.navy, padding: '96px 40px 104px', position: 'relative', overflow: 'hidden' }}>
        {/* Background pattern */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 60%, rgba(45,92,53,0.3) 0%, transparent 55%), radial-gradient(circle at 85% 25%, rgba(139,30,90,0.2) 0%, transparent 50%)' }}></div>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>

        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,30,90,0.2)', border: '1px solid rgba(139,30,90,0.4)', borderRadius: 9999, padding: '6px 16px', marginBottom: 28 }}>
            <Icon name="shield" size={13} color="#d96fa8" sw={2}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#d96fa8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Licensed · Insured · Bismarck, ND</span>
          </div>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(40px, 6vw, 66px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 14 }}>
            Cleaning in a<br/><span style={{ color: '#E8387A' }}>Real Way.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: 18, letterSpacing: '0.01em' }}>Residential &amp; Commercial Cleaning — Bismarck, ND</p>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Hood cleaning, carpet cleaning, pressure washing, snow removal, lawn care, and more — for homeowners and businesses across Bismarck and surrounding communities.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn variant="primary" onClick={() => onNav('contact')} style={{ fontSize: 16, padding: '15px 34px' }}>
              Get a free estimate <Icon name="arrow" size={16} color="#fff"/>
            </Btn>
            <Btn variant="ghost" onClick={() => window.open('tel:7015871158')} style={{ fontSize: 16, padding: '15px 34px' }}>
              <Icon name="phone" size={16} color="#fff"/> Call (701) 587-1158
            </Btn>
          </div>
          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 56, flexWrap: 'wrap' }}>
            {[['150+', 'miles served'], ['500+', 'jobs completed'], ['24/7', 'emergency response'], ['5★', 'average rating']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 28, fontWeight: 800, color: '#fff' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBar/>

      {/* Services snapshot */}
      <section style={{ padding: '80px 40px', maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>What we do</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 38, fontWeight: 800, color: C.charcoal, letterSpacing: '-0.02em', marginBottom: 14 }}>Residential &amp; commercial services</h2>
          <p style={{ fontSize: 16, color: C.slate, maxWidth: 520, margin: '0 auto' }}>One call covers it all. From home carpet cleaning to restaurant hood systems — we handle the dirty work so you can focus on what matters. Serving Bismarck and surrounding communities.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18, marginBottom: 36 }}>
          {SERVICES_PREVIEW.map(s => (
            <ServiceCard key={s.key} icon={s.icon} title={s.title} desc={s.desc} onClick={() => onNav(s.key)}/>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Btn variant="outline" onClick={() => onNav('services')}>View all services</Btn>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: C.charcoal, padding: '80px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#7eb88a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>How it works</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 52 }}>Simple from start to finish</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              { n: '01', icon: 'phone', title: 'We respond quickly', desc: 'Reach out by phone, form, or chat. We respond quickly to find a time that works for you — usually within a few minutes by text.' },
              { n: '02', icon: 'clipboard', title: 'We gather the details', desc: 'We learn more about your specific project — size, scope, surface type, and any special requirements — so we can price it accurately.' },
              { n: '03', icon: 'file', title: 'We share a transparent quote', desc: 'You get a clear, no-obligation quote with everything spelled out. No surprises on the invoice — ever.' },
            ].map(step => (
              <div key={step.n}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: C.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Icon name={step.icon} size={24} color="#fff" sw={1.8}/>
                </div>
                <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: C.pink, letterSpacing: '0.08em', marginBottom: 10 }}>{step.n}</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.52)', lineHeight: 1.75 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 40px', maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>What clients say</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 36, fontWeight: 800, color: C.charcoal, letterSpacing: '-0.02em' }}>Trusted by Bismarck businesses</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map(t => <TestimonialCard key={t.name} {...t}/>)}
        </div>
      </section>

      {/* Before & After Preview */}
      <section style={{ background: C.surface, padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Results speak for themselves</div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 36, fontWeight: 800, color: C.charcoal, letterSpacing: '-0.02em', marginBottom: 12 }}>Before & after</h2>
            <p style={{ fontSize: 15, color: C.slate, maxWidth: 480, margin: '0 auto' }}>Real results from real jobs in the Bismarck area. Our work is documented on every visit.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
            {[
              { label: 'Commercial hood cleaning', cat: 'Hood Cleaning' },
              { label: 'Parking lot pressure wash', cat: 'Pressure Washing' },
              { label: 'Commercial carpet', cat: 'Carpet Cleaning' },
            ].map(item => (
              <div key={item.label} style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 160 }}>
                  <div style={{ background: 'linear-gradient(135deg, #3a2a1a 0%, #2c1f12 100%)', display: 'flex', alignItems: 'flex-end', padding: '10px 12px' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Before</span>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #e8f0ec 0%, #c8e0d4 100%)', display: 'flex', alignItems: 'flex-end', padding: '10px 12px' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.08em' }}>After</span>
                  </div>
                </div>
                <div style={{ background: C.white, padding: '14px 16px', borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: C.charcoal }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{item.cat}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Btn variant="outline" onClick={() => onNav('gallery')}>View full gallery <Icon name="image" size={14} color={C.navy}/></Btn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 40px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Got questions?</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 36, fontWeight: 800, color: C.charcoal, letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
        </div>
        {HOME_FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a}/>)}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 14 }}>Still have questions? Our AI assistant can help 24/7.</p>
        </div>
      </section>

      <CTABanner onNav={onNav}/>
      <SiteFooter onNav={onNav}/>
    </div>
  );
}

// ── About Page ───────────────────────────────────────────────
function AboutPage({ onNav }) {
  return (
    <div>
      <PageHero eyebrow="About Us" title="Built on the belief that clean matters." subtitle="All Clean Solutions was founded in Bismarck, ND to give commercial businesses a single, reliable cleaning partner they could actually count on — not just for the big jobs, but for every job." size="md"/>
      <TrustBar/>

      {/* Story */}
      <section style={{ padding: '72px 40px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Our story</div>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 32, fontWeight: 800, color: C.charcoal, letterSpacing: '-0.02em', marginBottom: 18, lineHeight: 1.2 }}>Local roots, professional standards</h2>
          <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.8, marginBottom: 16 }}>We started All Clean Solutions because we kept hearing the same frustrations from restaurant owners and property managers: cleaning companies that didn't show up on time, left out critical steps, or disappeared after the first job.</p>
          <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.8, marginBottom: 16 }}>We built our business around the opposite. Every job gets documented. Every client gets a real person to call. And every technician is trained to the same standard — whether they're cleaning a hood at 2 a.m. or mowing a commercial property on a Tuesday afternoon.</p>
          <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.8 }}>Today we serve hundreds of businesses across Bismarck and the surrounding region, and we're growing because our clients refer us. That's the only marketing we need.</p>
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { n: '500+', l: 'Jobs completed' },
              { n: '150mi', l: 'Service radius' },
              { n: '100%', l: 'Documented jobs' },
              { n: '24/7', l: 'Emergency coverage' },
            ].map(i => (
              <div key={i.l} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 32, fontWeight: 800, color: C.navy, marginBottom: 6 }}>{i.n}</div>
                <div style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{i.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: C.surface, padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>How we operate</div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 34, fontWeight: 800, color: C.charcoal, letterSpacing: '-0.02em' }}>Our commitments to you</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: 'clock', title: 'On time, every time', desc: 'We confirm appointments 24 hours in advance and notify you when we\'re en route. If we\'re ever late, we make it right.' },
              { icon: 'clipboard', title: 'Full documentation', desc: 'Every job includes before/after photos, a service checklist, and a signed certificate — so you always have the records you need.' },
              { icon: 'shield', title: 'Licensed and insured', desc: 'We carry full liability insurance and workers\' comp on every job. You can request our certificate of insurance at any time.' },
              { icon: 'users', title: 'Trained technicians', desc: 'Our team is trained on proper techniques, chemical handling, and safety protocols for every service we offer.' },
              { icon: 'check-circle', title: 'Satisfaction guaranteed', desc: 'If you\'re not satisfied with any aspect of our work, contact us within 24 hours and we\'ll return to make it right at no charge.' },
              { icon: 'map-pin', title: 'Local and accountable', desc: 'We\'re based in Bismarck, ND. When you call, you reach a real person from our team — not a national call center.' },
            ].map(v => (
              <div key={v.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px' }}>
                <div style={{ width: 42, height: 42, background: C.navyLight, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon name={v.icon} size={20} color={C.navy} sw={1.8}/>
                </div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 700, color: C.charcoal, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner onNav={onNav}/>
      <SiteFooter onNav={onNav}/>
    </div>
  );
}

// ── Service Areas Page ───────────────────────────────────────
function ServiceAreasPage({ onNav }) {
  const cities = [
    { name: 'Bismarck', note: 'Primary location', dist: 'HQ' },
    { name: 'Mandan', note: 'Adjoining city', dist: '3 mi' },
    { name: 'Lincoln', note: 'Burleigh County', dist: '8 mi' },
    { name: 'New Salem', note: 'Morton County', dist: '40 mi' },
    { name: 'Washburn', note: 'McLean County', dist: '35 mi' },
    { name: 'Garrison', note: 'McLean County', dist: '50 mi' },
    { name: 'Glen Ullin', note: 'Morton County', dist: '56 mi' },
    { name: 'Beulah', note: 'Mercer County', dist: '67 mi' },
    { name: 'Hazen', note: 'Mercer County', dist: '63 mi' },
    { name: 'Hebron', note: 'Morton County', dist: '72 mi' },
    { name: 'Dickinson', note: 'Stark County', dist: '96 mi' },
    { name: 'Jamestown', note: 'Stutsman County', dist: '97 mi' },
    { name: 'Valley City', note: 'Barnes County', dist: '100 mi' },
    { name: 'Carrington', note: 'Foster County', dist: '100 mi' },
    { name: 'Minot', note: 'Ward County', dist: '104 mi' },
    { name: 'Hettinger', note: 'Adams County', dist: '120 mi' },
    { name: 'Watford City', note: 'McKenzie County', dist: '138 mi' },
    { name: 'Mobridge, SD', note: 'Walworth County SD', dist: '109 mi' },
  ];

  return (
    <div>
      <PageHero eyebrow="Service Areas" title="Bismarck and surrounding 150 miles" subtitle="Based in Bismarck, ND, we provide professional cleaning and maintenance services across central and western North Dakota. If your location is within 150 miles, we can help." size="md"/>
      <TrustBar/>

      <section style={{ padding: '72px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 28, fontWeight: 800, color: C.charcoal, marginBottom: 8 }}>Communities we serve</h2>
            <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.7, marginBottom: 28 }}>We regularly travel throughout the region to serve our commercial clients. Travel fees may apply beyond 50 miles from Bismarck.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {cities.map(c => (
                <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: c.dist === 'HQ' ? C.navyLight : C.surface, border: `1px solid ${c.dist === 'HQ' ? C.navy : C.border}`, borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: c.dist === 'HQ' ? C.navy : C.charcoal }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{c.note}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.dist === 'HQ' ? C.pink : C.muted, background: c.dist === 'HQ' ? C.pinkLight : 'transparent', padding: '2px 7px', borderRadius: 4 }}>{c.dist}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Map placeholder */}
            <div style={{ background: C.navyLight, border: `2px dashed ${C.navy}`, borderRadius: 16, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Icon name="map-pin" size={40} color={C.navy} sw={1.4}/>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 700, color: C.navy, marginTop: 12 }}>Bismarck, ND — 150 mile radius</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Interactive map coming soon</div>
            </div>

            <div style={{ background: C.navy, borderRadius: 14, padding: '24px' }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Not sure if we serve your area?</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 18 }}>Call or email us — if you're outside our standard radius, we may still be able to accommodate your job depending on size and frequency.</p>
              <Btn variant="primary" onClick={() => onNav('contact')} style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}>Contact us</Btn>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 18, fontWeight: 700, color: C.charcoal, marginBottom: 14 }}>Services available in all areas</h3>
              {[
                ['Hood & Exhaust Cleaning', 'service-hood'],
                ['Carpet Cleaning', 'service-carpet'],
                ['Commercial Cleaning', 'service-commercial'],
                ['Pressure Washing', 'service-pressure'],
                ['Snow Removal', 'service-snow'],
              ].map(([l, k]) => (
                <div key={l} onClick={() => onNav(k)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                  <Icon name="check" size={14} color={C.green} sw={2.5}/>
                  <span style={{ fontSize: 14, color: C.slate }}>{l}</span>
                  <Icon name="arrow" size={13} color={C.silver} sw={1.8} style={{ marginLeft: 'auto' }}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.surface, padding: '56px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 28, fontWeight: 800, color: C.charcoal, marginBottom: 12 }}>Local SEO: Cleaning services near Bismarck, ND</h2>
          <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.8, maxWidth: 700, margin: '0 auto 24px' }}>Looking for hood cleaning near Bismarck? Commercial carpet cleaning in Mandan? Pressure washing in Dickinson? Snow removal for Minot businesses? All Clean Solutions travels throughout central and western North Dakota to serve commercial clients with the same level of professionalism and documentation regardless of location.</p>
          <Btn variant="primary" onClick={() => onNav('contact')}>Request service in your area</Btn>
        </div>
      </section>

      <SiteFooter onNav={onNav}/>
    </div>
  );
}

// ── Before & After Gallery ───────────────────────────────────
function GalleryPage({ onNav }) {
  const items = [
    { title: 'Restaurant hood system', desc: 'Full hood, duct, and exhaust fan cleaning at a Bismarck restaurant', cat: 'Hood Cleaning', before: '#2c1f12', after: '#c8d8d0' },
    { title: 'Commercial parking lot', desc: 'Pressure washing removed oil stains and years of grime buildup', cat: 'Pressure Washing', before: '#28241e', after: '#d8d4cc' },
    { title: 'Office carpet', desc: 'High-traffic lane restoration using hot-water extraction', cat: 'Carpet Cleaning', before: '#3a2e28', after: '#e4ddd8' },
    { title: 'Commercial kitchen floor', desc: 'Heavy grease buildup removed from tile floor and grout lines', cat: 'Degreasing', before: '#2a2418', after: '#ddd8cc' },
    { title: 'Building exterior siding', desc: 'Algae, mold, and oxidation removed from commercial building', cat: 'Pressure Washing', before: '#2c2c24', after: '#e8e8e4' },
    { title: 'Winter snow removal', desc: 'Parking lot cleared and treated after 8" overnight snowfall', cat: 'Snow Removal', before: '#a0a8b0', after: '#e8eef2' },
    { title: 'Restaurant kitchen deep clean', desc: 'Quarterly deep clean — equipment, walls, floors, drains', cat: 'Deep Cleaning', before: '#2e2218', after: '#d8d4cc' },
    { title: 'Storefront windows', desc: '3-story building exterior window cleaning — streak-free', cat: 'Window Cleaning', before: '#b8c0c8', after: '#e8f0f8' },
    { title: 'Commercial lawn grounds', desc: 'Spring cleanup and first mow — retail strip mall', cat: 'Lawn Care', before: '#4c4830', after: '#c0d4b0' },
  ];

  return (
    <div>
      <PageHero eyebrow="Before & After Gallery" title="Results you can see" subtitle="Every job we complete is documented with before and after photos. These are real jobs from real clients across the Bismarck region." size="md"/>
      <TrustBar/>

      <section style={{ padding: '72px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {items.map(item => (
            <div key={item.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
              {/* Before/After visual */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 180, position: 'relative' }}>
                <div style={{ background: `linear-gradient(135deg, ${item.before} 0%, ${item.before}dd 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Before</span>
                  <div style={{ width: '100%', height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 1 }}></div>
                </div>
                <div style={{ background: `linear-gradient(135deg, ${item.after} 0%, ${item.after}ee 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: C.green, textTransform: 'uppercase', letterSpacing: '0.1em' }}>After</span>
                  <Icon name="check-circle" size={20} color={C.green} sw={2}/>
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 28, height: 28, borderRadius: '50%', background: C.white, border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <Icon name="arrow" size={12} color={C.navy} sw={2.5}/>
                </div>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.cat}</span>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 700, color: C.charcoal, margin: '6px 0 6px' }}>{item.title}</div>
                <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>All jobs are documented with real photos. Ask to see photos specific to your service type when you request a quote.</p>
          <Btn variant="primary" onClick={() => onNav('contact')}>Request a free estimate</Btn>
        </div>
      </section>

      <SiteFooter onNav={onNav}/>
    </div>
  );
}

// ── Contact / Quote Page ─────────────────────────────────────
function ContactPage({ onNav }) {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ name: '', phone: '', email: '', company: '', services: [], address: '', notes: '', frequency: 'one-time' });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSvc = s => upd('services', form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s]);

  const inp = { fontFamily: 'Inter, sans-serif', fontSize: 14, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '11px 14px', width: '100%', outline: 'none', color: C.black, background: C.white, marginTop: 6, boxSizing: 'border-box' };
  const lbl = { fontSize: 12, fontWeight: 600, color: C.slate, display: 'block' };

  const SVCS = ['Hood & Exhaust Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Pressure Washing', 'Snow Removal', 'Lawn Care', 'Commercial Cleaning', 'Deep Cleaning', 'Degreasing'];

  return (
    <div style={{ background: C.surface, minHeight: '80vh', padding: '64px 40px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.pink, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Free estimate</div>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 36, fontWeight: 800, color: C.charcoal, letterSpacing: '-0.02em', marginBottom: 10 }}>Request a quote</h1>
          <p style={{ fontSize: 15, color: C.muted }}>We respond within 1 business hour. No obligation.</p>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, alignItems: 'center' }}>
          {[1, 2, 3].map(n => (
            <React.Fragment key={n}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: n <= step ? C.pink : C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: n <= step ? '#fff' : C.muted, transition: 'all 250ms', flexShrink: 0 }}>
                {n < step ? <Icon name="check" size={14} color="#fff" sw={2.5}/> : n}
              </div>
              {n < 3 && <div style={{ flex: 1, height: 3, background: n < step ? C.pink : C.border, borderRadius: 9999, transition: 'all 250ms' }}></div>}
            </React.Fragment>
          ))}
        </div>

        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 22, fontWeight: 800, color: C.charcoal, marginBottom: 4 }}>Your contact information</h2>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>We'll use this to send your estimate and follow up.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div><label style={lbl}>Full name <span style={{ color: C.pink }}>*</span></label><input style={inp} placeholder="Jane Smith" value={form.name} onChange={e => upd('name', e.target.value)}/></div>
                <div><label style={lbl}>Phone number <span style={{ color: C.pink }}>*</span></label><input style={inp} placeholder="(701) 555-0100" value={form.phone} onChange={e => upd('phone', e.target.value)}/></div>
                <div><label style={lbl}>Email address <span style={{ color: C.pink }}>*</span></label><input style={inp} type="email" placeholder="jane@business.com" value={form.email} onChange={e => upd('email', e.target.value)}/></div>
                <div><label style={lbl}>Business / property name</label><input style={inp} placeholder="Acme Restaurant" value={form.company} onChange={e => upd('company', e.target.value)}/></div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 22, fontWeight: 800, color: C.charcoal, marginBottom: 4 }}>Services needed</h2>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>Select all that apply — we'll quote each one.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {SVCS.map(s => {
                  const sel = form.services.includes(s);
                  return (
                    <div key={s} onClick={() => toggleSvc(s)} style={{ padding: '11px 14px', borderRadius: 9, border: `2px solid ${sel ? C.pink : C.border}`, background: sel ? C.pinkLight : C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 150ms' }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${sel ? C.pink : C.border}`, background: sel ? C.pink : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <Icon name="check" size={10} color="#fff" sw={3}/>}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: sel ? C.pink : C.charcoal }}>{s}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Service address <span style={{ color: C.pink }}>*</span></label>
                <input style={inp} placeholder="123 Main St, Bismarck ND 58501" value={form.address} onChange={e => upd('address', e.target.value)}/>
              </div>
              <div>
                <label style={lbl}>Service frequency</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  {['one-time', 'weekly', 'monthly', 'quarterly', 'as-needed'].map(f => (
                    <div key={f} onClick={() => upd('frequency', f)} style={{ padding: '7px 14px', borderRadius: 8, border: `2px solid ${form.frequency === f ? C.navy : C.border}`, background: form.frequency === f ? C.navyLight : C.white, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: form.frequency === f ? C.navy : C.muted, textTransform: 'capitalize', transition: 'all 150ms' }}>{f}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 22, fontWeight: 800, color: C.charcoal, marginBottom: 4 }}>Additional notes</h2>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Anything else we should know? Size of facility, special access requirements, preferred times, etc.</p>
              <textarea style={{ ...inp, resize: 'vertical', minHeight: 120 }} placeholder="e.g. 3,000 sq ft restaurant, two hood systems, prefer overnight cleaning..." value={form.notes} onChange={e => upd('notes', e.target.value)}></textarea>

              <div style={{ background: C.surface, borderRadius: 10, padding: '16px', marginTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Review your request</div>
                <div style={{ fontSize: 14, color: C.charcoal, marginBottom: 4 }}><strong>Name:</strong> {form.name || '—'}</div>
                <div style={{ fontSize: 14, color: C.charcoal, marginBottom: 4 }}><strong>Phone:</strong> {form.phone || '—'}</div>
                <div style={{ fontSize: 14, color: C.charcoal, marginBottom: 4 }}><strong>Email:</strong> {form.email || '—'}</div>
                <div style={{ fontSize: 14, color: C.charcoal, marginBottom: 4 }}><strong>Address:</strong> {form.address || '—'}</div>
                <div style={{ fontSize: 14, color: C.charcoal }}><strong>Services:</strong> {form.services.length ? form.services.join(', ') : 'None selected'}</div>
              </div>
            </div>
          )}

          {step < 3 ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
              {step > 1 ? <button onClick={() => setStep(s => s - 1)} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: C.slate, background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0' }}>← Back</button> : <div></div>}
              <Btn variant="primary" onClick={() => setStep(s => s + 1)}>Continue →</Btn>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
              <button onClick={() => setStep(2)} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: C.slate, background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0' }}>← Back</button>
              <Btn variant="primary" onClick={() => setStep(4)}>Submit request <Icon name="send" size={14} color="#fff"/></Btn>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Icon name="check-circle" size={32} color={C.green} sw={1.8}/>
              </div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 24, fontWeight: 800, color: C.charcoal, marginBottom: 8 }}>Request received!</h2>
              <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.7, marginBottom: 28 }}>Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}! We'll follow up within 1 business hour at <strong>{form.email || 'your email'}</strong>.</p>
              <Btn variant="navy" onClick={() => { setStep(1); setForm({ name: '', phone: '', email: '', company: '', services: [], address: '', notes: '', frequency: 'one-time' }); }} style={{ fontSize: 14 }}>Submit another request</Btn>
            </div>
          )}
        </div>

        {/* Contact info block */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 24 }}>
          {[
            { icon: 'phone', title: 'Call us', detail: '(701) 587-1158', sub: 'Mon–Sat 7am–7pm' },
            { icon: 'mail', title: 'Email us', detail: 'info@acsbismarck.com', sub: 'Response within 1 hour' },
            { icon: 'map-pin', title: 'Based in', detail: 'Bismarck, ND', sub: 'Serving 150-mi radius' },
          ].map(c => (
            <div key={c.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <Icon name={c.icon} size={20} color={C.navy} sw={1.8}/>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 700, color: C.charcoal, margin: '8px 0 4px' }}>{c.title}</div>
              <div style={{ fontSize: 12, color: C.slate, wordBreak: 'break-all' }}>{c.detail}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Privacy Policy ───────────────────────────────────────────
function PrivacyPage({ onNav }) {
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 20, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>{title}</h2>
      <div style={{ fontSize: 15, color: C.slate, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
  return (
    <div>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated January 1, 2025" size="sm"/>
      <section style={{ padding: '64px 40px', maxWidth: 820, margin: '0 auto' }}>
        <Section title="Information we collect">
          When you request a quote or contact us, we collect information you provide directly — including your name, phone number, email address, business name, and service address. We also collect standard web analytics data (page views, referral source) through standard analytics tools.
        </Section>
        <Section title="How we use your information">
          We use your contact information to respond to quote requests, schedule and confirm services, send invoices and service reports, and communicate about your account. We do not sell your information to third parties. We may share information with service providers who help us operate our business (e.g., scheduling software, payment processing) under strict confidentiality agreements.
        </Section>
        <Section title="Data retention">
          We retain customer records for a minimum of 7 years to comply with business and tax record requirements. Service reports and photo documentation are retained as part of your service history and may be requested by you at any time.
        </Section>
        <Section title="Your rights">
          You may request access to, correction of, or deletion of your personal information at any time by contacting us at info@acsbismarck.com. We will respond to all requests within 30 days.
        </Section>
        <Section title="Cookies and tracking">
          Our website uses standard cookies for analytics and basic functionality. We do not use advertising or behavioral tracking cookies. You may disable cookies in your browser settings without affecting your ability to use our site.
        </Section>
        <Section title="Security">
          We implement reasonable technical and organizational measures to protect your information from unauthorized access, disclosure, or loss. All sensitive communications are transmitted over encrypted connections (HTTPS).
        </Section>
        <Section title="Contact">
          For privacy-related questions, contact us at: All Clean Solutions LLC, Bismarck, ND 58501. Email: info@acsbismarck.com. Phone: (701) 587-1158.
        </Section>
      </section>
      <SiteFooter onNav={onNav}/>
    </div>
  );
}

// ── Terms & Conditions ───────────────────────────────────────
function TermsPage({ onNav }) {
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 20, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>{title}</h2>
      <div style={{ fontSize: 15, color: C.slate, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
  return (
    <div>
      <PageHero eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated January 1, 2025" size="sm"/>
      <section style={{ padding: '64px 40px', maxWidth: 820, margin: '0 auto' }}>
        <Section title="Services and scheduling">
          All Clean Solutions LLC ("Company") provides commercial cleaning and maintenance services in Bismarck, ND and surrounding areas. Services are performed as described in the agreed scope of work. Scheduling is subject to availability. We will make reasonable efforts to accommodate your preferred dates and times but cannot guarantee specific scheduling outside of our standard service windows.
        </Section>
        <Section title="Estimates and pricing">
          All estimates are provided in good faith based on information available at time of quoting. Final pricing may differ if actual conditions differ materially from what was described (e.g., significantly greater grease buildup than indicated, additional square footage discovered on-site). We will notify you of any pricing adjustments before proceeding.
        </Section>
        <Section title="Payment terms">
          Payment is due upon completion of services unless a recurring contract specifies otherwise. We accept check, ACH transfer, and major credit cards. Invoices not paid within 30 days are subject to a 1.5% monthly late fee. Returned payments incur a $35 fee.
        </Section>
        <Section title="Cancellation policy">
          Cancellations made with less than 24 hours notice may incur a cancellation fee of up to 25% of the quoted service price. Recurring contract customers may cancel with 30 days written notice. We reserve the right to charge for mobilization costs on jobs cancelled after our crew has departed for your location.
        </Section>
        <Section title="Liability and damage">
          We carry general liability insurance and will address any damage caused by our negligence. We are not responsible for pre-existing damage or conditions not disclosed prior to service. We are not liable for incidental or consequential damages. Our liability is limited to the cost of the service performed.
        </Section>
        <Section title="Access and safety">
          Customer is responsible for providing safe access to all areas to be serviced. Any known hazards, fragile items, or areas to avoid must be communicated before service begins. We reserve the right to decline service in conditions that pose safety risks to our team.
        </Section>
        <Section title="Governing law">
          These terms are governed by the laws of the State of North Dakota. Disputes shall be resolved in the courts of Burleigh County, ND. These terms represent the entire agreement between the parties and supersede any prior agreements.
        </Section>
        <Section title="Contact">
          Questions about these terms: All Clean Solutions LLC, Bismarck, ND 58501. Email: info@acsbismarck.com. Phone: (701) 587-1158.
        </Section>
      </section>
      <SiteFooter onNav={onNav}/>
    </div>
  );
}

Object.assign(window, { HomePage, AboutPage, ServiceAreasPage, GalleryPage, ContactPage, PrivacyPage, TermsPage });
