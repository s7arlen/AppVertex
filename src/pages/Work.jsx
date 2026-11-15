import { assetUrl } from '../utils/assetHelper';
import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useStudioData } from '../context/StudioDataContext';
import '../styles/pages/work.css';

const CURATED_TESTIMONIALS = [
  {
    id: "loretto-principal",
    name: "Sr. Mary Thomas",
    role: "Principal, Loretto Central School (CBSE)",
    rating: 5,
    text: "AppVertex built exactly what we needed. The institutional portal handles admissions, fee records, circulars, and parent communication without any fuss. Our staff picked it up immediately.",
    initials: "SM",
    image: assetUrl("/services/srv-school-portal.jpg")
  },
  {
    id: "alex-turner",
    name: "Alex Turner",
    role: "Founder & CEO, InnovateHub",
    rating: 5,
    text: "From architecture to production deployment, AppVertex shipped our complete platform in record time. Median load speed dropped under 800ms, and our conversion rate jumped 38% in the first month.",
    initials: "AT",
    image: assetUrl("/testimonials/testimonial_alex.jpg")
  },
  {
    id: "scarlett-rivers",
    name: "Scarlett Rivers",
    role: "Product Lead, Synerify",
    rating: 5,
    text: "Partnering with AppVertex was a turning point. Having direct access to senior founding engineers instead of account managers meant every architectural decision was crystal clear, rock-solid, and delivered in record time.",
    initials: "SR",
    image: assetUrl("/testimonials/testimonial_scarlett_highres.jpg")
  },
  {
    id: "launchpad-lead",
    name: "LaunchPad Tech Lead",
    role: "Founder & CTO, Developer Analytics SaaS",
    rating: 5,
    text: "Working directly with Leston and Lenstar eliminated all the frustration we usually have with agencies. They challenged our scope where it was unnecessary and delivered an ultra-fast web app in 3 weeks flat.",
    initials: "LP"
  },
  {
    id: "ethan-knight",
    name: "Ethan Knight",
    role: "Co-Founder @Inceptify",
    rating: 5,
    text: "AppVertex engineered our high-speed operational systems effortlessly — clean code, instantaneous reactivity, and total ownership from day one.",
    initials: "EK",
    image: assetUrl("/testimonials/testimonial_ethan.jpg")
  },
  {
    id: "nf-fashion",
    name: "NF Fashion Director",
    role: "Creative Lead, Luxury Boutique",
    rating: 5,
    text: "Our boutique e-commerce conversion rates doubled after the redesign. The speed on mobile devices is unbelievable, and the one-tap WhatsApp checkout was exactly what our customers needed.",
    initials: "NF"
  }
];

const CASE_STUDIES = [
  {
    id: 'loretto',
    category: 'institutional',
    tag: 'Education & Institutional',
    title: 'Loretto Central School Platform',
    desc: "Rebuilt the institution's digital portal to eliminate exam server crashes, automate parent circular dissemination, and streamline high-volume online admission intake.",
    image: assetUrl('/hero-rosewood-showcase.png'),
    client: 'Loretto Central School (CBSE)',
    link: 'https://lorettocentralschool.edu.in',
    externalLink: true,
    outcomes: [
      'Zero downtime during peak 1st PUC examination result traffic',
      'Direct digital admissions intake & instant circulars dispatch',
      '0.4s FCP speed with Core Web Vitals 99/100 score'
    ],
    challenges: [
      'Repeated server crashes and timeouts during high-traffic 1st PUC result publishing days',
      'Disorganized physical circulars requiring manual WhatsApp forwarding to 1,800+ parents',
      'Slow paper-based admission queues creating administrative overhead each academic term'
    ],
    architecture: [
      'Edge-cached stateless result architecture handling massive concurrent request bursts',
      'Automated parent announcement pipeline with instant broadcast archive',
      'Responsive, mobile-first self-service student and faculty portal with sub-second speeds'
    ]
  },
  {
    id: 'philomena',
    category: 'institutional',
    tag: 'College & Autonomous',
    title: 'St. Philomena Autonomous College Cloud',
    desc: 'Engineered high-concurrency examination result infrastructure and automated merit admissions portal for autonomous higher education.',
    image: assetUrl('/hero-floating-phones-transparent.png'),
    client: 'St. Philomena Autonomous',
    link: 'https://stphilomenacollege.edu.in',
    externalLink: true,
    outcomes: [
      '100% stable result publication under 40,000+ concurrent requests',
      'Automated merit-rank computation eliminating 3+ weeks manual paperwork',
      'Mobile-first student & faculty portal with sub-second navigation'
    ],
    challenges: [
      'Server downtime during semester grade release causing student panic and support tickets',
      'Over 3 weeks of manual paper computation for college merit admissions',
      'Legacy website inaccessible on smartphones with frequent visual layout breakage'
    ],
    architecture: [
      'High-throughput cloud result distribution engine with automatic compute failovers',
      'Algorithmic merit rank generator sorting candidates across reservation quotas',
      'Accessible, mobile-optimized progressive web portal with instant search'
    ]
  },
  {
    id: 'pulseflow',
    category: 'saas',
    tag: 'Cloud & DevOps SaaS',
    title: 'PulseFlow Observability Engine',
    desc: 'High-throughput real-time telemetry console processing 12M+ time-series data points with sub-second WebSocket visual dashboards.',
    image: assetUrl('/hero-devices.png'),
    client: 'PulseFlow Systems',
    link: '/contact',
    externalLink: false,
    outcomes: [
      'Real-time ingestion of 12M+ time-series metrics per minute',
      'Sub-15ms WebSocket live streaming telemetry dashboards',
      'Zero data loss failover architecture across distributed edge nodes'
    ],
    challenges: [
      'UI lag and browser memory leaks when plotting dense time-series metrics live',
      'WebSocket connection drops during edge node network fluctuations',
      'Steep onboarding curve with clunky legacy dashboard configurations'
    ],
    architecture: [
      'Hardware-accelerated virtualized 60fps graph engine with canvas streaming',
      'Auto-reconnecting duplex WebSocket broker with message deduplication',
      'Zero-config pre-built telemetry templates with role-based access'
    ]
  },
  {
    id: 'nexus',
    category: 'saas',
    tag: 'Enterprise ERP & Logistics',
    title: 'Nexus Multi-Warehouse ERP',
    desc: 'Role-based logistics and inventory intelligence platform tracking 45,000+ SKUs across automated multi-location dispatch routes.',
    image: assetUrl('/hero-machine.png'),
    client: 'Nexus Distribution',
    link: '/contact',
    externalLink: false,
    outcomes: [
      'Automated tracking of 45,000+ SKUs across 8 regional distribution hubs',
      'Dynamic route optimization reducing dispatch delays by 34%',
      'Immutable audit logging with role-based fine-grained security'
    ],
    challenges: [
      'Constant inventory sync discrepancies across 8 disparate regional warehouses',
      'Inefficient dispatch routes causing 34% delivery delays and driver overtime',
      'Lack of granular security controls and audit trails for stock adjustments'
    ],
    architecture: [
      'Atomic inventory ledger with optimistic concurrency locking across facilities',
      'Intelligent dispatch route optimizer calculating vehicle loads and traffic',
      'Cryptographically verified tamper-proof audit trails for every transaction'
    ]
  },
  {
    id: 'maison',
    category: 'ecommerce',
    tag: 'Luxury E-Commerce',
    title: 'Maison Vellum Luxury Boutique',
    desc: 'Editorial headless e-commerce store with zero layout shift, sub-second checkout transitions, and international currency conversions.',
    image: assetUrl('/hero-rosewood-stage.png'),
    client: 'Maison Vellum',
    link: '/contact',
    externalLink: false,
    outcomes: [
      'Headless storefront achieving 0ms layout shift on checkout',
      'Multi-currency localization with automated regional tax calculations',
      '42% lift in mobile session conversion via 1-click cart flows'
    ],
    challenges: [
      'Bloated CMS template causing 4.2s mobile load time and 62% cart dropoff',
      'Severe layout shift (CLS) as high-res lookbook photography popped into view',
      'Manual multi-currency setup failing to calculate cross-border duties'
    ],
    architecture: [
      'Headless React architecture delivering pre-rendered edge catalog pages in <300ms',
      'Strict zero-CLS image layout engine with WebP responsive srcsets',
      'Frictionless 1-tap WhatsApp ordering and Stripe localized payments'
    ]
  },
  {
    id: 'pipeline',
    category: 'saas',
    tag: 'Active Deployments',
    title: 'More Case Studies In Pipeline',
    desc: 'We are documenting upcoming enterprise SaaS architectures, medical portals, and automated logistics platforms scheduled for production deployment.',
    customStyle: { border: '2px dashed var(--border)', background: 'rgba(0,0,0,0.01)' },
    customMedia: (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <i className="fa-solid fa-layer-group" style={{ fontSize: '2.5rem', color: 'var(--burgundy, #EF870D)', opacity: '0.6', marginBottom: '0.75rem' }}></i>
        <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>IN DEPLOYMENT // 2026</span>
      </div>
    ),
    client: 'Confidential Active Builds',
    link: '/contact',
    ctaText: 'Discuss Your Scope',
    externalLink: false,
    outcomes: [
      'Medical specialty practice portal with automated slot scheduling',
      'Enterprise multi-tenant workflow engine with SOC2 compliance',
      'High-security verification vault for authenticated digital documents'
    ],
    challenges: [
      'Strict medical data privacy and regional health record regulations',
      'Complex multi-organization tenant separation without noisy-neighbor slowdowns',
      'Legacy document forgery risks requiring immutable verification'
    ],
    architecture: [
      'Zero-knowledge encryption for records at rest and in transit',
      'Isolated tenant databases with automated scaling and daily automated backups',
      'Digital signature verification engine with instant tamper alerts'
    ]
  }
];

function CaseStudyCard({ study, filter }) {
  const [activeTab, setActiveTab] = useState('outcomes');
  const isMatch = filter === 'all' || study.category === filter;

  return (
    <div
      className={`case-card ${isMatch ? '' : 'is-hidden'}`}
      data-category={study.category}
      style={study.customStyle || {}}
    >
      <div className="case-media" style={study.customMedia ? { display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-raised, #FAF8F5)' } : {}}>
        <span className="case-media-tag">{study.tag}</span>
        <a
          href={study.link}
          target={study.externalLink ? '_blank' : undefined}
          rel={study.externalLink ? 'noopener noreferrer' : undefined}
          className="case-action-btn"
          aria-label={`Open ${study.title}`}
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        {study.image ? (
          <img src={study.image} alt={study.title} loading="lazy" />
        ) : (
          study.customMedia
        )}
      </div>

      <div className="case-body">
        <div className="case-content-top">
          <h3 className="case-title">{study.title}</h3>
          <p className="case-desc">{study.desc}</p>
        </div>

        {/* ── INTERACTIVE TABBED CASE DRAWER ── */}
        <div className="case-outcomes">
          <div className="case-drawer-nav">
            <button
              type="button"
              className={`case-drawer-tab-btn tab-outcomes ${activeTab === 'outcomes' ? 'active' : ''}`}
              onClick={() => setActiveTab('outcomes')}
            >
              <i className="fa-solid fa-circle-check"></i>
              <span>Key Outcomes</span>
            </button>
            <button
              type="button"
              className={`case-drawer-tab-btn tab-challenge ${activeTab === 'challenge' ? 'active' : ''}`}
              onClick={() => setActiveTab('challenge')}
            >
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>The Bottleneck</span>
            </button>
            <button
              type="button"
              className={`case-drawer-tab-btn tab-architecture ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <i className="fa-solid fa-code-branch"></i>
              <span>Architecture</span>
            </button>
          </div>

          <div key={activeTab} className="case-drawer-panel">
            <ul className="case-outcomes-list">
              {activeTab === 'outcomes' &&
                study.outcomes.map((item, idx) => (
                  <li key={idx} className="drawer-item-outcome">
                    <i className="fa-solid fa-circle-check outcome-icon"></i>
                    <span>{item}</span>
                  </li>
                ))}
              {activeTab === 'challenge' &&
                study.challenges.map((item, idx) => (
                  <li key={idx} className="drawer-item-challenge">
                    <i className="fa-solid fa-circle-exclamation challenge-icon"></i>
                    <span>{item}</span>
                  </li>
                ))}
              {activeTab === 'architecture' &&
                study.architecture.map((item, idx) => (
                  <li key={idx} className="drawer-item-architecture">
                    <i className="fa-solid fa-layer-group arch-icon"></i>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="case-footer">
          <span className="case-client">Client: {study.client}</span>
          <a
            href={study.link}
            target={study.externalLink ? '_blank' : undefined}
            rel={study.externalLink ? 'noopener noreferrer' : undefined}
            className="case-cta-link"
          >
            <span>{study.ctaText || 'Read Case Study'}</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState('all');
  const { testimonials: dynamicTestimonials } = useStudioData();
  useScrollReveal([filter]);

  useEffect(() => {
    // Dynamic projects sync check
    const syncChannel = ('BroadcastChannel' in window) ? new BroadcastChannel('appvertex_sync') : null;
    if (syncChannel) {
      syncChannel.onmessage = (e) => {
        if (e.data && (e.data.type === 'PROJECTS_UPDATED' || e.data.type === 'FULL_SYNC')) {
          // If projects updated dynamically
        }
      };
      return () => syncChannel.close();
    }
  }, []);

  useEffect(() => {
    document.querySelectorAll('.case-study-deep-card, .case-card').forEach(card => {
      const cat = card.getAttribute('data-category');
      const isMatch = (filter === 'all' || cat === filter);
      if (isMatch) {
        card.style.setProperty('display', 'flex', 'important');
        card.classList.remove('is-hidden');
      } else {
        card.style.setProperty('display', 'none', 'important');
        card.classList.add('is-hidden');
      }
    });
  }, [filter]);

  return (
    <div>
      <main id="mainContent">
          {/* ═══════════════════════════════════════════════════
               SECTION 1: SUBPAGE HERO & ARCHITECTURAL PREMISE
               ═══════════════════════════════════════════════════ */}
          <section className="subpage-hero" aria-label="Work Overview">
              <div className="container subpage-hero-content">
                  <span className="subpage-eyebrow" style={{ fontSize: '0.76rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--burgundy, #EF870D)', background: 'rgba(239, 135, 13, 0.08)', border: '1px solid rgba(239, 135, 13, 0.2)', padding: '5px 14px', borderRadius: '9999px', display: 'inline-block', marginBottom: '1.25rem' }}>
                      SELECTED WORK
                  </span>
                  <h1 className="subpage-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', marginBottom: '1.25rem' }}>
                      Real systems &amp; case studies<br />
                      <span className="gradient-text">delivered in production.</span>
                  </h1>
                  <p className="subpage-desc" style={{ maxWidth: '740px', margin: '0 auto 2.5rem', fontSize: 'clamp(1.05rem, 1.35vw, 1.18rem)', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                      Websites, web applications, and internal tools built for educational institutions, service businesses, and retail operations across India &amp; global remote.
                  </p>
                  <div className="subpage-actions" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <a href="/contact#calendarPanel" className="btn btn-primary">BOOK DISCOVERY CALL <span className="arr">→</span></a>
                      <a href="#caseStudiesSection" className="btn btn-secondary">VIEW CASE STUDIES</a>
                  </div>
              </div>
          </section>
      
          {/* ═══════════════════════════════════════════════════
               SECTION 2 & 3: FILTER BAR & FEATURED CASE STUDIES STACK
               ═══════════════════════════════════════════════════ */}
          <section className="container" id="caseStudiesSection" style={{ padding: '2.5rem 1.5rem 3.5rem' }}>
              {/* Category Filter Tabs (An Idea Tech Mirrored) */}
              <div className="work-filter-bar">
                  <button
                      type="button"
                      className={`work-filter-btn ${filter === 'all' ? 'active' : ''}`}
                      onClick={() => setFilter('all')}
                  >
                      All Case Studies
                  </button>
                  <button
                      type="button"
                      className={`work-filter-btn ${filter === 'institutional' ? 'active' : ''}`}
                      onClick={() => setFilter('institutional')}
                  >
                      Education &amp; Institutional
                  </button>
                  <button
                      type="button"
                      className={`work-filter-btn ${filter === 'saas' ? 'active' : ''}`}
                      onClick={() => setFilter('saas')}
                  >
                      SaaS &amp; Web Apps
                  </button>
                  <button
                      type="button"
                      className={`work-filter-btn ${filter === 'ecommerce' ? 'active' : ''}`}
                      onClick={() => setFilter('ecommerce')}
                  >
                      Brand &amp; E-Commerce
                  </button>
              </div>
      
              {/* Interactive Tabbed Case Drawer Grid */}
              <div className="work-grid" id="caseStudiesGrid">
                {CASE_STUDIES.map((study) => (
                  <CaseStudyCard key={study.id} study={study} filter={filter} />
                ))}
              </div>
          </section>

          {/* ═══════════════════════════════════════════════════
               SECTION 3: VERIFIED CLIENT ENDORSEMENTS (DUAL-TRACK VELOCITY MARQUEE)
               ═══════════════════════════════════════════════════ */}
          {(() => {
            const combinedTestimonials = dynamicTestimonials && dynamicTestimonials.length >= 3 
              ? dynamicTestimonials 
              : CURATED_TESTIMONIALS;

            const half = Math.ceil(combinedTestimonials.length / 2);
            const row1Raw = combinedTestimonials.slice(0, half);
            const row2Raw = combinedTestimonials.slice(half);

            // Repeat to ensure continuous seamless loop across all viewport resolutions
            const row1 = [...row1Raw, ...row1Raw, ...row1Raw];
            const row2 = [...row2Raw, ...row2Raw, ...row2Raw];

            const renderCard = (t, idx, keyPrefix) => {
              const stars = Number(t.rating) || 5;
              const initials = t.initials || (t.name || 'Client').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

              return (
                <div key={`${keyPrefix}-${t.id || idx}-${idx}`} className="marquee-card">
                  <div className="marquee-card-header">
                    <div className="testimonial-rating">
                      {Array.from({ length: stars }).map((_, sIdx) => (
                        <i key={sIdx} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                  </div>
                  <p className="testimonial-quote">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="testimonial-author-row">
                    {t.image ? (
                      <img 
                        src={t.image} 
                        alt={t.name} 
                        className="testimonial-avatar"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }
                        }} 
                      />
                    ) : null}
                    <div className="testimonial-avatar" style={{ display: t.image ? 'none' : 'flex' }}>
                      {initials}
                    </div>
                    <div className="testimonial-author-meta">
                      <h4 className="testimonial-author-name">{t.name}</h4>
                      <div className="testimonial-author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            };

            return (
              <section id="client-testimonials" className="work-testimonials-section" aria-label="Client Testimonials">
                <div className="container testimonials-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem', padding: '0 1.5rem' }}>
                  <p className="section-eyebrow" style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#EF870D', display: 'inline-block', marginBottom: '0.75rem' }}>CLIENT ENDORSEMENTS</p>
                  <h2 className="section-title" style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>What Clients Say About Working With Us</h2>
                  <p className="section-lead" style={{ fontSize: '1.05rem', lineHeight: '1.65', color: 'var(--text-secondary)', margin: '0' }}>Direct feedback from school administrators, venture founders, and business owners who rely on our production software daily.</p>
                </div>

                {/* Dual-Track Velocity Marquee */}
                <div className="testimonials-marquee-wrapper">
                  {/* Track 1: Flowing to the Left */}
                  <div className="marquee-row marquee-row-left">
                    <div className="marquee-track">
                      {row1.map((t, idx) => renderCard(t, idx, 'row1-a'))}
                      {row1.map((t, idx) => renderCard(t, idx, 'row1-b'))}
                    </div>
                  </div>

                  {/* Track 2: Flowing to the Right */}
                  <div className="marquee-row marquee-row-right">
                    <div className="marquee-track">
                      {row2.map((t, idx) => renderCard(t, idx, 'row2-a'))}
                      {row2.map((t, idx) => renderCard(t, idx, 'row2-b'))}
                    </div>
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════
                     SECTION 7: CLOSING EDITORIAL STRIP
                     ═══════════════════════════════════════════════════ */}
                <div className="container" style={{ padding: '0 1.5rem' }}>
                  <div className="closing-banner">
                    <h2 className="closing-banner-title">Let&apos;s build your product&apos;s next benchmark.</h2>
                    <p className="closing-banner-desc">
                      From zero-downtime portals to ultra-fast web applications, we turn ambitious ideas into reliable production software.
                    </p>
                    <div className="closing-banner-actions">
                      <a href="/contact#proposalPanel" className="closing-action-primary">
                        <span>Discuss Your Project</span> <span className="arr">→</span>
                      </a>
                      <a href="/contact#calendarPanel" className="closing-action-secondary">
                        <span>Book a Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}
      </main>
    </div>
  );
}
