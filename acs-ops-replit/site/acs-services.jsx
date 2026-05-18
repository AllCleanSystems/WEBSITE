// All Clean Solutions — Service Pages
// acs-services.jsx

const SERVICE_DATA = {
  'service-hood': {
    icon: 'flame', title: 'Hood & Exhaust Cleaning', short: 'NFPA-96 compliant hood and exhaust cleaning',
    eyebrow: 'Restaurant Hood Cleaning',
    hero: 'Keep your kitchen compliant and your team safe. We clean hoods, ducts, and exhaust fans to NFPA-96 standards — with full photo reports every visit.',
    tags: ['NFPA-96 Compliant', 'Grease Removal', 'Exhaust Fan Cleaning', 'Duct Cleaning'],
    included: [
      'Full hood canopy degreasing — filters, baffles, and all surfaces',
      'Duct interior cleaning from hood to rooftop',
      'Exhaust fan blades, housing, and motor area',
      'Grease trap and drip tray removal and cleaning',
      'Before & after photo documentation for compliance records',
      'Service certificate issued after every visit',
      'Inspection checklist aligned with NFPA-96 standards',
    ],
    why: 'Grease buildup in hoods and ducts is the #1 cause of commercial kitchen fires in the U.S. Most jurisdictions require professional hood cleaning every 3–6 months depending on cook volume. Failure to maintain records can result in failed health inspections, higher insurance premiums, and liability in the event of a fire.',
    process: [
      { n: '01', title: 'Pre-service walkthrough', desc: 'Our technician reviews your kitchen layout, equipment, and last service records before starting.' },
      { n: '02', title: 'Protection and containment', desc: 'We cover your equipment and floors with plastic sheeting to protect your kitchen during the cleaning process.' },
      { n: '03', title: 'Full degreasing', desc: 'Hot-water pressure washing with commercial-grade degreaser removes all accumulated grease from hood to rooftop.' },
      { n: '04', title: 'Fan and duct inspection', desc: 'We inspect the exhaust fan, belts, and accessible ductwork for damage or blockage and flag any issues.' },
      { n: '05', title: 'Final inspection and report', desc: 'Your technician walks you through before/after photos and hands you a signed service certificate for your records.' },
    ],
    faqs: [
      { q: 'How often does my hood need to be cleaned?', a: 'NFPA-96 requires cleaning frequency based on cooking volume: monthly for high-volume fryers, quarterly for most restaurants, semi-annually for light-use kitchens. We help you determine the right schedule during your first visit.' },
      { q: 'Do you provide a compliance certificate?', a: 'Yes. Every visit includes a signed service certificate with photos, technician name, date, and scope of work — exactly what your health inspector, insurance carrier, and fire marshal need.' },
      { q: 'Can you service hoods after business hours?', a: 'Absolutely. We routinely schedule cleanings during overnight or early morning hours so you experience zero disruption to your service.' },
      { q: 'What areas of North Dakota do you serve?', a: 'We serve Bismarck, Mandan, and surrounding communities within 150 miles, including Dickinson, Jamestown, Minot, and more.' },
    ],
  },
  'service-carpet': {
    icon: 'droplets', title: 'Carpet Cleaning', short: 'Commercial hot-water extraction carpet cleaning',
    eyebrow: 'Carpet Cleaning',
    hero: 'Deep-clean carpets that look and smell fresh. Our hot-water extraction process removes embedded dirt, allergens, and stains — with fast-dry times that keep your business running.',
    tags: ['Hot-Water Extraction', 'Fast Dry', 'Commercial', 'Odor Removal'],
    proofImage: 'uploads/carpet-cleaning-bismarck-before-after-rug.webp',
    proofAlt: 'Before and after area rug carpet cleaning by All Clean Solutions in Bismarck Mandan North Dakota',
    proofCaption: 'Before and after area rug cleaning by All Clean Solutions.',
    included: [
      'Pre-treatment of high-traffic lanes and stain spots',
      'Hot-water extraction (steam cleaning) — industry gold standard',
      'Post-extraction grooming for even drying and pile lift',
      'Deodorizing treatment included with every service',
      'Furniture moving for accessible areas (under 50 lbs)',
      'Spot treatment for pet stains, grease, and food spills',
      'Walk-through inspection before and after service',
    ],
    why: 'Commercial carpets harbor bacteria, allergens, and odors that vacuuming alone cannot remove. Regular professional cleaning extends carpet life significantly, maintains air quality, and creates a better impression for your customers and staff. Most commercial carpets should be professionally cleaned every 6–12 months, with high-traffic areas cleaned more frequently.',
    process: [
      { n: '01', title: 'Pre-inspection', desc: 'We identify stain types, high-traffic zones, and any areas requiring special treatment.' },
      { n: '02', title: 'Pre-treatment', desc: 'Commercial pre-conditioner is applied to break down soil and grease before extraction.' },
      { n: '03', title: 'Hot-water extraction', desc: 'Our truck-mounted or portable extraction equipment injects hot water and immediately recovers it along with dissolved soils.' },
      { n: '04', title: 'Spot treatment', desc: 'Stubborn stains receive targeted treatment with specialized spotting agents.' },
      { n: '05', title: 'Grooming and drying', desc: 'Carpet is groomed and air movers placed if needed. Most commercial carpets are dry within 4–6 hours.' },
    ],
    faqs: [
      { q: 'How long does carpet take to dry?', a: 'Most commercial carpets are dry within 4–6 hours. We can place air movers to accelerate drying if needed. Truck-mounted equipment extracts more moisture than portable units, so drying time is faster.' },
      { q: 'Can you clean carpets after hours?', a: 'Yes — we offer evening and weekend appointments specifically for businesses that cannot close during the day.' },
      { q: 'Do you move furniture?', a: 'We move light furniture (under 50 lbs) at no additional charge. For heavy items, we recommend moving them before we arrive or ask about our furniture-moving add-on.' },
    ],
  },
  'service-window': {
    icon: 'window', title: 'Window Cleaning', short: 'Interior and exterior commercial window cleaning',
    eyebrow: 'Window Cleaning',
    hero: 'Streak-free windows make a lasting first impression. We clean interior and exterior glass on commercial buildings, storefronts, and multi-story facilities — safely and efficiently.',
    tags: ['Interior & Exterior', 'Streak-Free', 'Multi-Story', 'Storefront'],
    included: [
      'Interior and exterior window pane cleaning',
      'Screen cleaning and reinstallation',
      'Window frame and sill wiping',
      'Storefront door glass, transoms, and sidelights',
      'High-reach access for multi-story buildings (up to 5 stories)',
      'Water-fed pole system for pure water spot-free finish',
      'Final squeegee and detail work on every pane',
    ],
    why: "Clean windows increase natural light, improve energy efficiency, and signal professionalism to customers. Mineral deposits, pollution film, and hard water stains become increasingly difficult to remove the longer they're left. Regular cleaning prevents permanent etching of commercial glass.",
    process: [
      { n: '01', title: 'Site assessment', desc: 'We assess window count, height, access requirements, and soiling level to price the job accurately.' },
      { n: '02', title: 'Screen removal', desc: 'Screens are removed, cleaned separately, and staged for reinstallation.' },
      { n: '03', title: 'Frame and sill prep', desc: 'Frames and sills are wiped down before glass cleaning begins to prevent drip contamination.' },
      { n: '04', title: 'Glass cleaning', desc: 'We use professional squeegee technique or water-fed pure-water pole systems for upper floors — no streaks, no spots.' },
      { n: '05', title: 'Detail and inspect', desc: 'Every pane is detailed, screens reinstalled, and a final walkthrough confirms your satisfaction.' },
    ],
    faqs: [
      { q: 'How high can you reach?', a: 'Our water-fed pole systems can reach windows up to 5 stories without ladders or lifts. For taller buildings, we can arrange appropriate access equipment.' },
      { q: 'How often should commercial windows be cleaned?', a: 'Storefronts and high-traffic retail benefit from monthly or quarterly cleaning. Office buildings typically schedule bi-annual exterior cleaning. We can set up a recurring schedule that fits your needs and budget.' },
      { q: 'Do you clean windows in winter?', a: 'Yes, as long as temperatures are above freezing. We use cold-water additives in our solutions when working in near-freezing conditions.' },
    ],
  },
  'service-pressure': {
    icon: 'wind', title: 'Pressure Washing', short: 'Commercial exterior pressure washing and surface cleaning',
    eyebrow: 'Pressure Washing',
    hero: 'Restore your property\'s curb appeal. We pressure wash parking lots, building exteriors, sidewalks, dumpster pads, and more — removing years of grime, oil stains, and algae.',
    tags: ['Parking Lots', 'Building Exterior', 'Sidewalks', 'Dumpster Pads'],
    included: [
      'Concrete and asphalt parking lot surface cleaning',
      'Sidewalk and walkway cleaning',
      'Building exterior siding, brick, and masonry washing',
      'Dumpster pad and trash enclosure degreasing',
      'Drive-through lane cleaning',
      'Loading dock and receiving area',
      'Graffiti removal (when applicable)',
      'Hot-water pressure washing available for grease-heavy surfaces',
    ],
    why: 'Dirt, oil stains, algae, and mold buildup degrade the appearance of your property and can create slip-and-fall hazards. Regular pressure washing protects pavement and building surfaces from premature deterioration, reduces slip liability, and communicates to customers that your business is clean and well-maintained.',
    process: [
      { n: '01', title: 'Surface inspection', desc: 'We assess surface type, staining, and any areas that need pre-treatment or special care to avoid damage.' },
      { n: '02', title: 'Pre-treatment', desc: 'Oil spots, grease stains, and organic growth receive a dwell-time pre-treatment to break down soiling.' },
      { n: '03', title: 'Pressure washing', desc: 'We match pressure (PSI) and temperature to the surface — hot water for grease, cold water for general cleaning.' },
      { n: '04', title: 'Rinse and edge detail', desc: 'All surfaces are fully rinsed. Expansion joints and edges are detail-cleaned to remove residual soil.' },
      { n: '05', title: 'Post-inspection', desc: 'A final walkthrough confirms all areas are complete. We note any surface damage or maintenance concerns found during cleaning.' },
    ],
    faqs: [
      { q: 'Will pressure washing damage my concrete or pavement?', a: 'In professional hands, no. We select the correct PSI and nozzle for each surface. Concrete, brick, and newer pavement are all safe. We avoid high pressure on older, deteriorating surfaces and will advise you if we identify concerns.' },
      { q: 'Can you remove oil stains from parking lots?', a: 'Yes. Hot-water pressure washing combined with commercial degreaser pre-treatment removes most petroleum stains. Very old, deeply set stains may require multiple treatments.' },
      { q: 'Do you offer spring cleanup packages?', a: 'We offer seasonal cleanup packages that bundle parking lot cleaning, building wash, and sidewalk service at a reduced rate. Contact us in March for spring availability.' },
    ],
  },
  'service-snow': {
    icon: 'snowflake', title: 'Snow Removal & Ice Management', short: '24/7 commercial snow plowing and ice treatment',
    eyebrow: 'Snow Removal',
    hero: '24/7 winter coverage so your customers and staff can always get in safely. Commercial plowing, salting, sanding, and ice management for parking lots, walkways, and loading docks.',
    tags: ['24/7 Response', 'Plowing', 'Salting & Sanding', 'Slip Liability'],
    included: [
      'Parking lot snow plowing after each qualifying snowfall',
      'Sidewalk and entrance clearing',
      'Loading dock and receiving area access maintenance',
      'Rock salt and/or sand application for ice management',
      'Liquid de-icer anti-icing (pre-treatment option)',
      'Snow stacking and haul-away when needed',
      '24/7 dispatch during winter weather events',
      'Seasonal contracts and per-event pricing available',
    ],
    why: 'Slip-and-fall claims are among the most common liability issues for commercial property owners in North Dakota winters. Maintaining clear, treated surfaces is not just a customer service issue — it\'s a legal one. Proactive snow and ice management also protects your pavement from freeze-thaw damage over time.',
    process: [
      { n: '01', title: 'Pre-season site walkthrough', desc: 'We map your property, identify obstacles, snow stacking areas, and priority zones before the first snowfall.' },
      { n: '02', title: 'Trigger-based dispatch', desc: 'We mobilize once snowfall exceeds your agreed trigger depth (typically 2"). You get a text when we\'re on our way.' },
      { n: '03', title: 'Plowing and clearing', desc: 'Parking lots are plowed, windrows are stacked at designated areas, and fire lane and handicap access is prioritized.' },
      { n: '04', title: 'Salt and sand application', desc: 'Ice treatment is applied to all cleared surfaces before freezing temperatures re-set the surface.' },
      { n: '05', title: 'Service log', desc: 'Every visit is logged with arrival time, departure time, conditions, and materials applied — your liability documentation.' },
    ],
    faqs: [
      { q: 'Do you offer seasonal contracts?', a: 'Yes. Seasonal contracts provide predictable monthly billing and guaranteed response regardless of snowfall totals. Per-event pricing is also available. We recommend seasonal contracts for properties that require consistent coverage.' },
      { q: 'What is your response time during a storm?', a: 'We begin plowing operations when accumulation reaches your trigger depth — typically 1–2 inches. During major storms, we run 24-hour crews to keep up with accumulation in real time.' },
      { q: 'Do you also clear sidewalks and building entrances?', a: 'Yes. Our sidewalk crews clear pedestrian access, building entrances, and fire exits. This is typically serviced within 1–2 hours of our parking lot pass.' },
    ],
  },
  'service-lawn': {
    icon: 'leaf', title: 'Lawn Care & Grounds Maintenance', short: 'Commercial landscaping and grounds maintenance',
    eyebrow: 'Lawn & Grounds',
    hero: 'Grounds that reflect well on your business year-round. Weekly mowing, edging, fertilization, and seasonal cleanups for commercial properties, HOAs, and retail centers across the region.',
    tags: ['Weekly Mowing', 'Edging', 'Fertilization', 'Seasonal Cleanups'],
    included: [
      'Weekly or bi-weekly mowing at agreed height',
      'String trimming around all obstacles and edges',
      'Edging along sidewalks, curbs, and beds',
      'Blowing clippings from hard surfaces',
      'Spring and fall cleanup (leaves, debris)',
      'Fertilization and weed control programs',
      'Mulch bed installation and refresh',
      'Irrigation system startup and winterization',
    ],
    why: "Well-maintained grounds signal professionalism and increase perceived property value. Neglected landscaping affects tenant satisfaction, customer first impressions, and can create code compliance issues. Consistent maintenance prevents small issues — overgrowth, bare spots, weed infiltration — from becoming expensive repairs.",
    process: [
      { n: '01', title: 'Property assessment', desc: 'We walk the property to understand mowing patterns, bed locations, obstacles, and any special requirements.' },
      { n: '02', title: 'Custom maintenance plan', desc: 'A schedule and scope are agreed upon — weekly, bi-weekly, or custom — with clear service inclusions and pricing.' },
      { n: '03', title: 'Routine visits', desc: 'On every scheduled visit: mow, edge, trim, blow. Consistent crews mean they know your property well.' },
      { n: '04', title: 'Seasonal add-ons', desc: 'Spring and fall cleanups, fertilization, overseeding, and aeration are scheduled as add-on services.' },
      { n: '05', title: 'Property manager updates', desc: 'Completion photos and any maintenance flags (irrigation issues, pest damage, etc.) are communicated after each visit.' },
    ],
    faqs: [
      { q: 'Do you work with HOAs and multi-family properties?', a: 'Yes, the majority of our grounds maintenance work is with property managers, HOAs, apartment complexes, and retail centers. We provide consolidated billing and property manager reporting.' },
      { q: 'What is included in a spring cleanup?', a: 'Spring cleanups typically include leaf and debris removal, bed edging, first mow of the season, and removal of winter damage. We can bundle fertilizer application and pre-emergent weed control as part of the spring service.' },
      { q: 'Do you provide fertilization and weed control?', a: 'Yes. We offer fertilization and weed control programs tailored to North Dakota\'s growing season — typically 4–5 applications per year starting in early spring.' },
    ],
  },
  'service-commercial': {
    icon: 'building', title: 'Commercial Cleaning', short: 'Recurring janitorial services for commercial facilities',
    eyebrow: 'Commercial Cleaning',
    hero: 'A consistently clean facility keeps your team productive and your customers confident. Recurring janitorial services for offices, medical facilities, retail, and industrial sites across the region.',
    tags: ['Recurring Service', 'Offices', 'Medical Facilities', 'Industrial'],
    included: [
      'Daily, weekly, or custom frequency scheduling',
      'Restroom sanitization and restocking',
      'Break room and kitchen cleaning',
      'Trash removal and liner replacement',
      'Vacuuming, sweeping, and mopping all floor surfaces',
      'Surface disinfection — desks, counters, door handles',
      'Glass interior cleaning',
      'Supply management and restocking programs available',
    ],
    why: 'A clean workplace directly affects employee health, morale, and productivity. For customer-facing businesses, cleanliness is a core component of brand perception. Our recurring service model means consistent cleaning standards — not just when it looks dirty, but before it gets there.',
    process: [
      { n: '01', title: 'Facility walkthrough', desc: 'We tour your space, identify all areas, square footage, surface types, and any special requirements like biohazard or medical protocols.' },
      { n: '02', title: 'Custom scope of work', desc: 'A detailed scope is written up specifying exactly what gets cleaned, how often, and to what standard. No surprises on the invoice.' },
      { n: '03', title: 'Assigned crew', desc: 'Where possible, you get the same crew on every visit — they learn your space and your preferences.' },
      { n: '04', title: 'Quality checks', desc: 'Supervisors conduct periodic quality inspections and we provide a communication channel for any concerns between visits.' },
      { n: '05', title: 'Flexible adjustments', desc: 'Scope and frequency can be adjusted seasonally or as your space needs change — we accommodate growth and reorganizations.' },
    ],
    faqs: [
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes. We supply all cleaning products, equipment, and consumables unless you have a specific product requirement for your facility. Restroom paper goods and hand soap can be managed as an add-on supply program.' },
      { q: 'Can you clean medical and healthcare facilities?', a: 'Yes. We have experience cleaning medical offices, clinics, and dental offices following appropriate disinfection protocols. For regulated healthcare environments, we can discuss specific certification requirements.' },
      { q: 'What happens if I am not satisfied with a clean?', a: 'We have a straightforward satisfaction guarantee: if a specific area does not meet standard, notify us within 24 hours and we will return to re-clean at no charge.' },
    ],
  },
  'service-deep': {
    icon: 'spray', title: 'Commercial Deep Cleaning', short: 'Comprehensive one-time or scheduled deep cleaning',
    eyebrow: 'Deep Cleaning',
    hero: 'When a regular clean is not enough. Our deep cleaning service goes behind, underneath, and inside every surface — ideal for quarterly resets, move-in/move-out, or post-construction cleanup.',
    tags: ['Quarterly Reset', 'Move-In/Out', 'Post-Construction', 'Comprehensive'],
    included: [
      'Behind and underneath all movable appliances and furniture',
      'Cabinet interior cleaning (kitchens and break rooms)',
      'Baseboard, door frame, and light switch plate scrubbing',
      'Vent cover and grille cleaning',
      'Ceiling corner cobweb and dust removal',
      'Tile grout scrubbing and brightening',
      'Deep bathroom and restroom sanitization',
      'Window sills, blinds, and door track cleaning',
    ],
    why: 'Standard janitorial services maintain cleanliness but do not address built-up soil in hard-to-reach areas. Deep cleaning removes the accumulated grime that contributes to odors, allergens, and deteriorating surface conditions. Most commercial facilities benefit from a quarterly deep clean in addition to their regular service.',
    process: [
      { n: '01', title: 'Room-by-room assessment', desc: 'We create a detailed checklist of every area and item to be deep-cleaned, reviewed with you before work begins.' },
      { n: '02', title: 'Top-to-bottom sequence', desc: 'Cleaning works from ceiling to floor in every room — dust and debris fall down, not onto already-cleaned surfaces.' },
      { n: '03', title: 'Detail work', desc: 'Every surface — including those rarely touched in routine cleaning — is scrubbed, wiped, or treated appropriately.' },
      { n: '04', title: 'Floor finishing', desc: 'Floors are the last step: swept, scrubbed, mopped, or buffed depending on surface type.' },
      { n: '05', title: 'Final walkthrough', desc: 'Client walkthrough with our technician confirms every item on the checklist was addressed.' },
    ],
    faqs: [
      { q: 'How long does a commercial deep clean take?', a: 'Timing depends on facility size and condition. A typical 2,000 sq ft office might take 4–6 hours with a 2-person crew. We provide time estimates during the quoting process.' },
      { q: 'Do I need to vacate the premises?', a: 'Not required for most deep cleans, but we do work more efficiently in an empty space. For large facilities, we can section off areas and clean in phases around your operations.' },
      { q: 'How does deep cleaning differ from regular janitorial?', a: 'Regular janitorial maintains visible surfaces on a routine schedule. Deep cleaning addresses every surface — including hard-to-reach, rarely-touched areas — to reset the facility to a baseline level of cleanliness.' },
    ],
  },
  'service-degreasing': {
    icon: 'zap', title: 'Commercial Degreasing', short: 'Heavy-duty industrial and kitchen degreasing',
    eyebrow: 'Industrial Degreasing',
    hero: 'Heavy grease and industrial buildup require more than standard cleaning. Our commercial degreasing service removes years of accumulated grease from commercial kitchens, manufacturing floors, and mechanical areas.',
    tags: ['Commercial Kitchens', 'Industrial', 'Manufacturing', 'Heavy Buildup'],
    included: [
      'Commercial-grade degreaser application and dwell-time treatment',
      'Hot-water pressure washing to remove loosened grease',
      'Floor drain cleaning and degreasing',
      'Equipment exterior degreasing (fryers, ovens, ranges)',
      'Wall and ceiling tile degreasing in kitchen environments',
      'Grease trap area cleaning',
      'Loading dock and warehouse floor degreasing',
      'Post-clean surface inspection and documentation',
    ],
    why: 'Grease buildup is a fire hazard, a food safety violation, and a slip hazard. In commercial kitchens, accumulated grease on floors, walls, and equipment surfaces creates dangerous working conditions and attracts pests. Industrial operations face similar risks in manufacturing and warehouse environments. Regular professional degreasing addresses buildup before it becomes a safety or regulatory issue.',
    process: [
      { n: '01', title: 'Grease assessment', desc: 'We evaluate buildup thickness, surface types, and drainage to determine appropriate degreasers and pressure settings.' },
      { n: '02', title: 'Surface protection', desc: 'Electrical panels, equipment intakes, and adjacent areas are masked and protected before work begins.' },
      { n: '03', title: 'Degreaser application', desc: 'Commercial degreaser is applied generously to all affected surfaces and allowed dwell time to penetrate and emulsify grease.' },
      { n: '04', title: 'Hot-water extraction', desc: 'Hot-water pressure washing removes emulsified grease. Multiple passes may be required for heavy buildup.' },
      { n: '05', title: 'Drainage and cleanup', desc: 'All wastewater is directed to floor drains. Surfaces are rinsed clean and inspected before completion.' },
    ],
    faqs: [
      { q: 'How often do commercial kitchens need professional degreasing?', a: 'High-volume kitchens typically need quarterly floor and wall degreasing in addition to their regular hood cleaning. Lower-volume kitchens may need it semi-annually. We assess your specific situation and recommend a schedule.' },
      { q: 'Is the degreaser safe for food-service environments?', a: 'We use NSF-rated, food-service-safe degreasers that are specifically formulated for commercial kitchen environments. All surfaces are fully rinsed before the space is returned to use.' },
      { q: 'Can you degrease warehouse and manufacturing floors?', a: 'Yes. We regularly clean industrial concrete floors with heavy oil and grease contamination using industrial-grade degreasers and hot-water surface cleaners.' },
    ],
  },
};

// ── Services Hub Page ────────────────────────────────────────
function ServicesHubPage({ onNav }) {
  const entries = Object.entries(SERVICE_DATA);
  return (
    <div>
      <PageHero
        eyebrow="Our Services"
        title="Everything clean, covered"
        subtitle="One trusted company for all your cleaning and maintenance needs — from restaurant hood cleaning to snow removal. Serving Bismarck, ND and surrounding communities within 150 miles."
        size="md"
      />
      <TrustBar/>
      <section style={{ padding: '72px 40px', maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {entries.map(([key, svc]) => (
            <ServiceCard
              key={key}
              icon={svc.icon}
              title={svc.title}
              desc={svc.hero.split('.')[0] + '.'}
              tags={svc.tags.slice(0, 3)}
              onClick={() => onNav(key)}
            />
          ))}
        </div>
      </section>
      {/* Internal links section */}
      <section style={{ background: C.surface, padding: '48px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 24, fontWeight: 700, color: C.charcoal, marginBottom: 8, textAlign: 'center' }}>Commercial cleaning for every industry</h2>
          <p style={{ fontSize: 15, color: C.slate, textAlign: 'center', marginBottom: 32, lineHeight: 1.7 }}>We work with restaurants, property managers, medical offices, retail centers, industrial sites, and municipalities across the Bismarck region.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: 'flame', title: 'Restaurants & food service', desc: 'Hood cleaning, degreasing, deep cleaning, and pest-prevention maintenance.' },
              { icon: 'building', title: 'Property management', desc: 'Janitorial, carpet cleaning, pressure washing, snow removal, and lawn care.' },
              { icon: 'zap', title: 'Industrial & manufacturing', desc: 'Floor degreasing, pressure washing, and facility maintenance at scale.' },
            ].map(i => (
              <div key={i.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px' }}>
                <Icon name={i.icon} size={22} color={C.navy} sw={1.6}/>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, fontWeight: 700, color: C.charcoal, margin: '10px 0 6px' }}>{i.title}</div>
                <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.6 }}>{i.desc}</div>
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

// ── Individual Service Page ──────────────────────────────────
function ServiceDetailPage({ serviceKey, onNav }) {
  const svc = SERVICE_DATA[serviceKey];
  if (!svc) return null;

  return (
    <div>
      <PageHero eyebrow={svc.eyebrow} title={svc.title} subtitle={svc.hero} size="md">
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
          <Btn variant="primary" onClick={() => onNav('contact')} style={{ fontSize: 15 }}>Request a free estimate <Icon name="arrow" size={14} color="#fff"/></Btn>
          <Btn variant="outlineW" onClick={() => window.open('tel:7015871158')} style={{ fontSize: 15 }}><Icon name="phone" size={14} color="#fff"/> (701) 587-1158</Btn>
        </div>
      </PageHero>
      <TrustBar/>

      {/* Tags */}
      <div style={{ background: C.surface, padding: '18px 40px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {svc.tags.map(t => <span key={t} style={{ background: C.navyLight, color: C.navy, fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 6 }}>{t}</span>)}
        </div>
      </div>

      {svc.proofImage && (
        <section style={{ background: '#fff', padding: '34px 40px 0' }}>
          <figure style={{ maxWidth: 980, margin: '0 auto', borderRadius: 18, overflow: 'hidden', boxShadow: '0 18px 38px rgba(11,31,58,0.18)', background: C.navy }}>
            <img src={svc.proofImage} alt={svc.proofAlt} loading="eager" style={{ display: 'block', width: '100%', aspectRatio: '16 / 10', objectFit: 'cover' }} />
            <figcaption style={{ padding: '13px 16px', textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: 18, background: 'linear-gradient(135deg, #0b1f3a, #123765)' }}>{svc.proofCaption}</figcaption>
          </figure>
        </section>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        {/* Main content */}
        <div>
          {/* What's included */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: C.charcoal, marginBottom: 24 }}>What's included</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {svc.included.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: C.surface, borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <Icon name="check-circle" size={18} color={C.green} sw={2}/><span style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Why it matters */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: C.charcoal, marginBottom: 16 }}>Why it matters</h2>
            <div style={{ background: C.navyLight, border: `1px solid rgba(11,31,58,0.12)`, borderRadius: 12, padding: '24px', borderLeft: `4px solid ${C.navy}` }}>
              <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.8 }}>{svc.why}</p>
            </div>
          </section>

          {/* Our process */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: C.charcoal, marginBottom: 28 }}>Our process</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {svc.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.pink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff' }}>{step.n}</div>
                  <div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 700, color: C.charcoal, marginBottom: 5 }}>{step.title}</div>
                    <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: C.charcoal, marginBottom: 20 }}>Frequently asked questions</h2>
            {svc.faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a}/>)}
          </section>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ position: 'sticky', top: 80 }}>
            {/* Quote CTA */}
            <div style={{ background: C.navy, borderRadius: 14, padding: '28px', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Get a free estimate</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 20 }}>We respond within 1 business hour with a detailed, no-obligation quote for your {svc.title.toLowerCase()} needs.</p>
              <Btn variant="primary" onClick={() => onNav('contact')} style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}>Request a quote <Icon name="arrow" size={13} color="#fff"/></Btn>
              <div style={{ textAlign: 'center', marginTop: 14 }}>
                <a href="tel:7015871158" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}><Icon name="phone" size={13} color="rgba(255,255,255,0.45)"/> (701) 429-1829</a>
              </div>
            </div>
            {/* Other services */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px' }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 700, color: C.charcoal, marginBottom: 14 }}>Other services</div>
              {Object.entries(SERVICE_DATA).filter(([k]) => k !== serviceKey).slice(0, 5).map(([k, s]) => (
                <div key={k} onClick={() => onNav(k)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                  <Icon name={s.icon} size={15} color={C.slate} sw={1.6}/>
                  <span style={{ fontSize: 13, color: C.slate }}>{s.title}</span>
                  <Icon name="arrow" size={12} color={C.silver} style={{ marginLeft: 'auto' }}/>
                </div>
              ))}
              <div onClick={() => onNav('services')} style={{ paddingTop: 12, fontSize: 13, fontWeight: 600, color: C.pink, cursor: 'pointer' }}>View all services →</div>
            </div>
          </div>
        </div>
      </div>

      <CTABanner onNav={onNav}/>
      <SiteFooter onNav={onNav}/>
    </div>
  );
}

Object.assign(window, { SERVICE_DATA, ServicesHubPage, ServiceDetailPage });
