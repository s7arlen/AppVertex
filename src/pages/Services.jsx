import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/services.css';

export default function Services() {
  useScrollReveal();

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
                <a href="#servicesTiers" className="services-scroll-cue" aria-label="Explore all 8 services below">
                    <span>EXPLORE ALL 8 SERVICES BELOW</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                    </svg>
                </a>
            </div>
        </section>
    
        {/* ═══════════════════════════════════════════════════
             SERVICES GRID: THE 8 PRODUCTION SERVICES
             Identical to the Home Page Services Section
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
                {/* SERVICE 01: WEBSITE DEVELOPMENT */}
                <article className="service-card-item" id="service-01">
                    <div className="service-card-media">
                        <img src="/services/srv-web-design.jpg" alt="Website Development Agency Landing Page" loading="lazy" />
                        <span className="service-category-pill">Web Architecture</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">Website Development</h3>
                            <p className="service-card-desc">Fast, modern websites designed to turn visitors into clients. Built with seamless mobile responsiveness, SEO best practices, and effortless content management.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Custom responsive UI &amp; high-conversion landing pages</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Sub-second LCP speed &amp; Core Web Vitals 99/100 score</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Dynamic contact routing &amp; automated lead capture</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Clean, zero-bloat React &amp; HTML5 production codebase</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=Website+Development" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
    
                {/* SERVICE 02: CUSTOM WEB APPLICATIONS */}
                <article className="service-card-item" id="service-02">
                    <div className="service-card-media">
                        <img src="/services/srv-custom-web-apps.jpg" alt="Custom Web Application SaaS Dashboard Interface" loading="lazy" />
                        <span className="service-category-pill">Custom Software</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">Custom Web Applications</h3>
                            <p className="service-card-desc">Tailored web platforms, client portals, and workflow tools designed around how your business actually runs. Automate repetitive tasks and give your team reliable tools.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Role-based staff &amp; client management dashboards</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Real-time database sync &amp; automated operational pipelines</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Secure REST &amp; WebSocket API integrations</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>High-concurrency edge cloud deployment architecture</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=Custom+Web+Applications" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
    
                {/* SERVICE 03: UI/UX DESIGN */}
                <article className="service-card-item" id="service-03">
                    <div className="service-card-media">
                        <img src="/services/srv-ui-ux.jpg" alt="UI/UX Product Design Wireframing and Prototyping" loading="lazy" />
                        <span className="service-category-pill">Product Design</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">UI/UX Design</h3>
                            <p className="service-card-desc">Intuitive, clean interfaces built to guide users effortlessly from their first click to checkout or inquiry. We turn complicated workflows into simple, elegant digital products.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>End-to-end user flow mapping &amp; structural wireframes</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Comprehensive Figma design system &amp; reusable tokens</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Interactive clickable prototypes for customer validation</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Developer-ready asset handoff with responsive CSS specs</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=UI+UX+Design" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
    
                {/* SERVICE 04: BRANDING & DIGITAL IDENTITY */}
                <article className="service-card-item" id="service-04">
                    <div className="service-card-media">
                        <img src="/services/srv-brand-identity.jpg" alt="Brand Identity and Typography Guidelines" loading="lazy" />
                        <span className="service-category-pill">Brand Identity</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">Branding &amp; Digital Identity</h3>
                            <p className="service-card-desc">Memorable visual identities that help your business stand out and build immediate trust with your audience across web, print, and social media.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Vector logo suite &amp; adaptive typography lockups</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Harmonious color palette &amp; WCAG accessibility guidelines</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Digital brand asset kit with iconography &amp; social templates</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Complete corporate brand book &amp; usage documentation</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=Brand+Identity" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
    
                {/* SERVICE 05: SCHOOL MANAGEMENT PORTALS */}
                <article className="service-card-item" id="service-05">
                    <div className="service-card-media">
                        <img src="/services/srv-school-portal.jpg" alt="Institutional Academic School Management Portal" loading="lazy" />
                        <span className="service-category-pill">Education Portals</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">School Management Portals</h3>
                            <p className="service-card-desc">Comprehensive institutional portals that bring student admissions, fee payments, attendance tracking, and parent communication into one secure, unified system.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Automated online admissions intake &amp; merit computation</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Instant circulars &amp; parent notification push dispatch</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>High-traffic examination result publication infrastructure</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Role-based faculty, parent, and administrative dashboards</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=School+Management+Portals" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
    
                {/* SERVICE 06: E-COMMERCE DEVELOPMENT */}
                <article className="service-card-item" id="service-06">
                    <div className="service-card-media">
                        <img src="/services/srv-ecommerce.jpg" alt="Headless E-Commerce Digital Storefront" loading="lazy" />
                        <span className="service-category-pill">E-Commerce</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">E-commerce Development</h3>
                            <p className="service-card-desc">Fast, friction-free online stores designed to boost conversions. From quick product discovery to smooth one-click checkout and automated inventory management.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Ultra-fast headless catalog with zero layout shift</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>1-click checkout &amp; automated multi-currency payment setup</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Real-time inventory synchronization &amp; order handling</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Abandoned cart automation &amp; conversion optimization</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=Ecommerce+Development" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
    
                {/* SERVICE 07: SEO & DIGITAL GROWTH */}
                <article className="service-card-item" id="service-07">
                    <div className="service-card-media">
                        <img src="/services/srv-seo.jpg" alt="SEO Performance and Growth Telemetry" loading="lazy" />
                        <span className="service-category-pill">Search Optimization</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">SEO &amp; Digital Growth</h3>
                            <p className="service-card-desc">Targeted search optimization and technical speed tuning that help your business rank higher on Google and attract high-intent local and global customers.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Comprehensive technical SEO audits &amp; rich schema markup</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Google Business Profile (GBP) &amp; local search dominance</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Core Web Vitals speed acceleration &amp; indexation fixes</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Keyword rankings tracking &amp; search telemetry reporting</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=SEO+Digital+Growth" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
    
                {/* SERVICE 08: WEBSITE MAINTENANCE & SUPPORT */}
                <article className="service-card-item" id="service-08">
                    <div className="service-card-media">
                        <img src="/services/srv-maintenance.jpg" alt="24/7 Cloud Server Uptime and Maintenance Telemetry" loading="lazy" />
                        <span className="service-category-pill">Support &amp; Care</span>
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-heading-group">
                            <h3 className="service-card-title">Website Maintenance</h3>
                            <p className="service-card-desc">Peace of mind for your online presence. We handle regular security patches, automated cloud backups, uptime monitoring, and fast support when you need updates.</p>
                        </div>
                        <div className="service-deliverables">
                            <span className="deliverables-heading">Key Deliverables</span>
                            <ul className="deliverables-grid">
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>24/7 automated uptime telemetry &amp; immediate incident triage</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Daily encrypted cloud backups &amp; 1-click disaster recovery</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Continuous security patching, dependency audits &amp; SSL care</span></li>
                                <li><i className="fa-solid fa-check" aria-hidden="true"></i><span>Priority content updates &amp; dedicated technical support SLA</span></li>
                            </ul>
                        </div>
                        <div className="service-card-actions">
                            <a href="/contact?service=Website+Maintenance" className="service-action-primary"><span>Start a Project</span> <span className="arr">→</span></a>
                            <a href="/contact#booking-calendar" className="service-action-secondary"><span>Book Discovery Call</span> <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                </article>
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
