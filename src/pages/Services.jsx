import { assetUrl } from '../utils/assetHelper';
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/services.css';

const SERVICES = [
  {
    id: 'service-01',
    category: 'Web Architecture',
    title: 'Website Development',
    img: '/services/srv-web-design.jpg',
    alt: 'Website Development Agency Landing Page',
    desc: 'Modern, high-converting websites engineered for sub-second speed, SEO dominance, and effortless updates.',
    deliverables: [
      'Custom responsive UI & landing pages',
      'Sub-second speed & Core Web Vitals 99+',
      'Dynamic contact routing & automated lead capture',
      'Clean, zero-bloat React codebase'
    ],
    contactParam: 'Website Development'
  },
  {
    id: 'service-02',
    category: 'Custom Software',
    title: 'Custom Web Applications',
    img: '/services/srv-custom-web-apps.jpg',
    alt: 'Custom Web Application SaaS Dashboard Interface',
    desc: 'Bespoke web platforms and client portals built to automate workflows and replace tedious manual operations.',
    deliverables: [
      'Role-based staff & client management dashboards',
      'Real-time database sync & automated pipelines',
      'Secure REST & WebSocket API integrations',
      'High-concurrency edge cloud deployment'
    ],
    contactParam: 'Custom Web Applications'
  },
  {
    id: 'service-03',
    category: 'Product Design',
    title: 'UI/UX Design',
    img: '/services/srv-ui-ux.jpg',
    alt: 'UI/UX Product Design Wireframing and Prototyping',
    desc: 'Intuitive interfaces and complete design systems that turn complex user flows into effortless digital products.',
    deliverables: [
      'End-to-end user journeys & wireframes',
      'Complete Figma design systems & reusable tokens',
      'Clickable interactive prototypes for testing',
      'Developer-ready specifications & asset handoff'
    ],
    contactParam: 'UI UX Design'
  },
  {
    id: 'service-04',
    category: 'Brand Identity',
    title: 'Branding & Digital Identity',
    img: '/services/srv-brand-identity.jpg',
    alt: 'Brand Identity and Typography Guidelines',
    desc: 'Distinctive visual identities that build instant trust and authority across web, print, and social media.',
    deliverables: [
      'Vector logo suite & responsive lockups',
      'Harmonious color palette & accessible type hierarchy',
      'Digital brand asset kit & social media templates',
      'Comprehensive corporate brand guidelines'
    ],
    contactParam: 'Brand Identity'
  },
  {
    id: 'service-05',
    category: 'Education Portals',
    title: 'School Management Portals',
    img: '/services/srv-school-portal.jpg',
    alt: 'Institutional Academic School Management Portal',
    desc: 'Unified institutional platforms bringing admissions, fee collections, attendance, and parent communication together.',
    deliverables: [
      'Online admissions & automated merit tracking',
      'Instant circulars & parent push notifications',
      'High-traffic examination results infrastructure',
      'Role-based faculty, parent, and admin portals'
    ],
    contactParam: 'School Management Portals'
  },
  {
    id: 'service-06',
    category: 'E-Commerce',
    title: 'E-commerce Development',
    img: '/services/srv-ecommerce.jpg',
    alt: 'Headless E-Commerce Digital Storefront',
    desc: 'Fast, friction-free digital storefronts optimized for quick product discovery, 1-click checkout, and high conversions.',
    deliverables: [
      'High-speed headless product catalog',
      '1-click checkout & multi-currency payments',
      'Real-time inventory synchronization',
      'Automated cart recovery & conversion tools'
    ],
    contactParam: 'Ecommerce Development'
  },
  {
    id: 'service-07',
    category: 'Search Optimization',
    title: 'SEO & Digital Growth',
    img: '/services/srv-seo.jpg',
    alt: 'SEO Performance and Growth Telemetry',
    desc: 'Technical search optimization and speed acceleration to rank higher on Google and capture high-intent buyers.',
    deliverables: [
      'Technical SEO audits & rich schema markup',
      'Google Business Profile & local dominance',
      'Core Web Vitals acceleration & indexation fixes',
      'Transparent keyword telemetry & rank tracking'
    ],
    contactParam: 'SEO Digital Growth'
  },
  {
    id: 'service-08',
    category: 'Support & Care',
    title: 'Website Maintenance',
    img: '/services/srv-maintenance.jpg',
    alt: '24/7 Cloud Server Uptime and Maintenance Telemetry',
    desc: 'Continuous 24/7 security monitoring, daily automated cloud backups, and proactive updates for complete peace of mind.',
    deliverables: [
      '24/7 automated uptime telemetry & incident triage',
      'Daily encrypted cloud backups & 1-click recovery',
      'Proactive security patching & SSL management',
      'Priority updates & dedicated support SLA'
    ],
    contactParam: 'Website Maintenance'
  }
];

export default function Services() {
  useScrollReveal();
  const [expandedCards, setExpandedCards] = useState({});

  const toggleDeliverables = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main id="mainContent">
      {/* ═══════════════════════════════════════════════════
           HERO SECTION: STUDIO SERVICES
           ═══════════════════════════════════════════════════ */}
      <section className="subpage-hero services-hero-section" aria-label="Services Overview">
        <div className="container subpage-hero-content services-hero-header">
          <span className="services-hero-eyebrow">STUDIO CAPABILITIES &amp; ARCHITECTURE</span>
          <h1 className="subpage-title services-hero-title">
            Websites &amp; software built around<br />
            <span className="services-h1-gradient">how your business runs.</span>
          </h1>
          <p className="subpage-desc services-hero-desc">
            We organize our work by the operational challenge you face. From your first customer impression to daily backend workflows, we fix what is broken before recommending what to build.
          </p>
          <div className="subpage-actions services-hero-actions">
            <a href="/contact#booking-calendar" className="hero-btn-primary">
              <span>Book Discovery Call</span>
              <span className="arr">→</span>
            </a>
            <a href="#servicesTiers" className="hero-btn-secondary">
              <span>Explore All 8 Services</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SERVICES GRID: THE 8 PRODUCTION SERVICES
           ═══════════════════════════════════════════════════ */}
      <section className="container" id="servicesTiers">
        <div className="services-tiers-heading">
          <p className="section-eyebrow" style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#EF870D', display: 'inline-block', marginBottom: '0.65rem' }}>WHAT WE BUILD &amp; DELIVER</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)', marginBottom: '0.85rem' }}>Services that drive real results.</h2>
          <p className="section-lead" style={{ maxWidth: '620px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            From conversion-focused websites to bespoke software systems, we build digital infrastructure tailored to how your business actually runs.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((srv) => {
            const isExpanded = !!expandedCards[srv.id];
            return (
              <article className="service-card-item" id={srv.id} key={srv.id}>
                <div className="service-card-media">
                  <img src={assetUrl(srv.img)} alt={srv.alt} loading="lazy" />
                  <span className="service-category-pill">{srv.category}</span>
                </div>
                <div className="service-card-body">
                  <div className="service-card-heading-group">
                    <h3 className="service-card-title">{srv.title}</h3>
                    <p className="service-card-desc">{srv.desc}</p>
                  </div>

                  <div className="service-deliverables-drawer">
                    <button
                      type="button"
                      className={`deliverables-toggle-btn ${isExpanded ? 'active' : ''}`}
                      onClick={() => toggleDeliverables(srv.id)}
                      aria-expanded={isExpanded}
                    >
                      <span className="deliverables-heading">
                        {isExpanded ? 'Hide Deliverables' : `Key Deliverables (${srv.deliverables.length})`}
                      </span>
                      <svg
                        className="toggle-chevron"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <div className={`deliverables-collapse ${isExpanded ? 'open' : ''}`}>
                      <div className="deliverables-collapse-inner">
                        <ul className="deliverables-grid">
                          {srv.deliverables.map((item, idx) => (
                            <li key={idx}>
                              <i className="fa-solid fa-check" aria-hidden="true"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="service-card-actions">
                    <a href={`/contact?service=${encodeURIComponent(srv.contactParam)}`} className="service-action-primary">
                      <span>Start a Project</span> <span className="arr">→</span>
                    </a>
                    <a href="/contact#booking-calendar" className="service-action-secondary">
                      <span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           FINAL CTA: NOT SURE WHICH SERVICE APPLIES?
           ═══════════════════════════════════════════════════ */}
      <section className="container" id="diagnosticConsult" style={{ padding: '1rem 1.5rem 5rem' }}>
        <div className="diagnostic-consult-box">
          <span className="subpage-eyebrow" style={{ marginBottom: '0.75rem' }}>Start With The Problem</span>
          <h3>Not Sure Which Service Applies?</h3>
          <p>
            Our services are structured around the problem you are solving, not sold as rigid packages. If you can describe what is slowing your team down, a Discovery Call will help clarify the right starting point. We only recommend building software if it genuinely solves the problem.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact#booking-calendar" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              Book a 30-Minute Discovery Call <span className="arr">→</span>
            </a>
            <a href="/process" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Our Process <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
