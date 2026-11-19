import { assetUrl } from '../utils/assetHelper';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/services.css';

const SERVICES = [
  {
    id: 'service-01',
    num: '01',
    category: 'Web Architecture',
    title: 'Website Development',
    img: '/services/srv-web-design.jpg',
    alt: 'Website Development Agency Landing Page',
    desc: 'Modern, high-converting websites engineered for sub-second speed, SEO dominance, and effortless updates.',
    chips: ['Core Web Vitals 99+', 'Custom Responsive UI', 'Clean React Code'],
    deliverables: [
      'Custom responsive UI & landing pages',
      'Sub-second speed & Core Web Vitals 99+',
      'Dynamic contact routing & automated lead capture',
      'Clean, zero-bloat React codebase'
    ],
    contactParam: 'Website Development',
    pill: 'High Performance',
    variant: 'dark',
    categoryGroup: 'development'
  },
  {
    id: 'service-02',
    num: '02',
    category: 'Custom Software',
    title: 'Custom Web Applications',
    img: '/services/srv-custom-web-apps.jpg',
    alt: 'Custom Web Application SaaS Dashboard Interface',
    desc: 'Bespoke web platforms and client portals built to automate workflows and replace tedious manual operations.',
    chips: ['Role-Based Portals', 'Automated Pipelines', 'Secure Edge APIs'],
    deliverables: [
      'Role-based staff & client management dashboards',
      'Real-time database sync & automated pipelines',
      'Secure REST & WebSocket API integrations',
      'High-concurrency edge cloud deployment'
    ],
    contactParam: 'Custom Web Applications',
    pill: 'Flagship Platform',
    variant: 'accent',
    categoryGroup: 'development'
  },
  {
    id: 'service-03',
    num: '03',
    category: 'Product Design',
    title: 'UI/UX Design',
    img: '/services/srv-ui-ux.jpg',
    alt: 'UI/UX Product Design Wireframing and Prototyping',
    desc: 'Intuitive interfaces and complete design systems that turn complex user flows into effortless digital products.',
    chips: ['Figma Design Systems', 'User Journeys', 'Interactive Prototypes'],
    deliverables: [
      'End-to-end user journeys & wireframes',
      'Complete Figma design systems & reusable tokens',
      'Clickable interactive prototypes for testing',
      'Developer-ready specifications & asset handoff'
    ],
    contactParam: 'UI UX Design',
    pill: 'Design Systems',
    variant: 'light',
    categoryGroup: 'design'
  },
  {
    id: 'service-04',
    num: '04',
    category: 'Brand Identity',
    title: 'Branding & Digital Identity',
    img: '/services/srv-brand-identity.jpg',
    alt: 'Brand Identity and Typography Guidelines',
    desc: 'Distinctive visual identities that build instant trust and authority across web, print, and social media.',
    chips: ['Vector Logo Suites', 'Typography Hierarchy', 'Brand Asset Kit'],
    deliverables: [
      'Vector logo suite & responsive lockups',
      'Harmonious color palette & accessible type hierarchy',
      'Digital brand asset kit & social media templates',
      'Comprehensive corporate brand guidelines'
    ],
    contactParam: 'Brand Identity',
    pill: 'Brand Authority',
    variant: 'dark',
    categoryGroup: 'design'
  },
  {
    id: 'service-05',
    num: '05',
    category: 'Education Portals',
    title: 'School Management Portals',
    img: '/services/srv-school-portal.jpg',
    alt: 'Institutional Academic School Management Portal',
    desc: 'Unified institutional platforms bringing admissions, fee collections, attendance, and parent communication together.',
    chips: ['Online Admissions', 'Parent Push Circulars', 'CBSE / Academic Suite'],
    deliverables: [
      'Online admissions & automated merit tracking',
      'Instant circulars & parent push notifications',
      'High-traffic examination results infrastructure',
      'Role-based faculty, parent, and admin portals'
    ],
    contactParam: 'School Management Portals',
    pill: 'Institutional Cloud',
    variant: 'accent',
    categoryGroup: 'development'
  },
  {
    id: 'service-06',
    num: '06',
    category: 'E-Commerce',
    title: 'E-commerce Development',
    img: '/services/srv-ecommerce.jpg',
    alt: 'Headless E-Commerce Digital Storefront',
    desc: 'Fast, friction-free digital storefronts optimized for quick product discovery, 1-click checkout, and high conversions.',
    chips: ['1-Click Fast Checkout', 'Real-Time Inventory', 'Headless Storefront'],
    deliverables: [
      'High-speed headless product catalog',
      '1-click checkout & multi-currency payments',
      'Real-time inventory synchronization',
      'Automated cart recovery & conversion tools'
    ],
    contactParam: 'Ecommerce Development',
    pill: 'High Conversion',
    variant: 'light',
    categoryGroup: 'development'
  },
  {
    id: 'service-07',
    num: '07',
    category: 'Search Optimization',
    title: 'SEO & Digital Growth',
    img: '/services/srv-seo.jpg',
    alt: 'SEO Performance and Growth Telemetry',
    desc: 'Technical search optimization and speed acceleration to rank higher on Google and capture high-intent buyers.',
    chips: ['Technical SEO Audits', 'Google Business Dominance', 'Indexation Fixes'],
    deliverables: [
      'Technical SEO audits & rich schema markup',
      'Google Business Profile & local dominance',
      'Core Web Vitals acceleration & indexation fixes',
      'Transparent keyword telemetry & rank tracking'
    ],
    contactParam: 'SEO Digital Growth',
    pill: 'Rank 1 Visibility',
    variant: 'dark',
    categoryGroup: 'growth'
  },
  {
    id: 'service-08',
    num: '08',
    category: 'Support & Care',
    title: 'Website Maintenance',
    img: '/services/srv-maintenance.jpg',
    alt: '24/7 Cloud Server Uptime and Maintenance Telemetry',
    desc: 'Continuous 24/7 security monitoring, daily automated cloud backups, and proactive updates for complete peace of mind.',
    chips: ['24/7 Uptime Telemetry', 'Daily Cloud Backups', 'Dedicated SLA Care'],
    deliverables: [
      '24/7 automated uptime telemetry & incident triage',
      'Daily encrypted cloud backups & 1-click recovery',
      'Proactive security patching & SSL management',
      'Priority updates & dedicated support SLA'
    ],
    contactParam: 'Website Maintenance',
    pill: '24/7 Monitored',
    variant: 'dark',
    categoryGroup: 'growth'
  }
];

export default function Services() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('all');

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
            <Link to="/contact" className="hero-btn-primary">
              <span>Book Discovery Call</span>
              <span className="arr">→</span>
            </Link>
            <a href="#servicesTiers" className="hero-btn-secondary">
              <span>Explore All 8 Services</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SERVICES GRID: THE 8 PRODUCTION SERVICES (MINIMAL CARDS UI)
           ═══════════════════════════════════════════════════ */}
      <section className="container" id="servicesTiers">
        <div className="services-tiers-heading">
          <p className="section-eyebrow" style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#EF870D', display: 'inline-block', marginBottom: '0.65rem' }}>WHAT WE BUILD &amp; DELIVER</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)', marginBottom: '0.85rem' }}>Services that drive real results.</h2>
          <p className="section-lead" style={{ maxWidth: '620px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            From conversion-focused websites to bespoke software systems, we build digital infrastructure tailored to how your business actually runs.
          </p>
        </div>

        <div className="minimal-services-wrapper">
          {/* Category Filter Pills */}
          <div className="minimal-filter-bar" role="tablist" aria-label="Filter services by category">
            {[
              { id: 'all', label: 'All Services (8)' },
              { id: 'development', label: 'Web & Systems (4)' },
              { id: 'design', label: 'Design & Brand (2)' },
              { id: 'growth', label: 'Growth & Support (2)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === tab.id}
                className={`minimal-filter-btn ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="minimal-services-grid">
            {SERVICES
              .filter((srv) => activeCategory === 'all' || srv.categoryGroup === activeCategory)
              .map((srv) => (
                <Link
                  to={`/contact?service=${encodeURIComponent(srv.contactParam)}`}
                  className={`minimal-card minimal-card--${srv.variant}`}
                  id={srv.id}
                  key={srv.id}
                  aria-label={`Start a project with ${srv.title}`}
                >
                  <div className="minimal-card-top">
                    <div className="minimal-card-title-row">
                      <h3 className="minimal-card-title">{srv.title}</h3>
                      <span className="minimal-card-corner-arrow" aria-hidden="true">↗</span>
                    </div>
                    <p className="minimal-card-desc">{srv.desc}</p>
                  </div>

                  {/* Bottom Visual Anchor (Clean, unobstructed 3D visual) */}
                  <div className="minimal-card-visual">
                    <div className="minimal-card-img-wrapper">
                      <img
                        src={assetUrl(srv.img)}
                        alt={srv.alt}
                        loading="lazy"
                        className="minimal-card-img"
                      />
                    </div>
                    <div className="minimal-card-visual-gradient" aria-hidden="true"></div>
                  </div>
                </Link>
              ))}
          </div>
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
            <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              Book a 30-Minute Discovery Call <span className="arr">→</span>
            </Link>
            <Link to="/process" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Our Process <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
