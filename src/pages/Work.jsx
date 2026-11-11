import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/work.css';

export default function Work() {
  const [filter, setFilter] = useState('all');
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
      
              {/* 2-Column Responsive Work Grid with Visual Browser Mockups */}
              <div className="work-grid" id="caseStudiesGrid">
      
                  {/* ─── CASE STUDY 01: LORETTO CENTRAL SCHOOL ─── */}
                  <div className={`case-card ${filter === 'all' || filter === 'institutional' ? '' : 'is-hidden'}`} data-category="institutional">
                      <div className="case-media">
                          <span className="case-media-tag">Education &amp; Institutional</span>
                          <a href="https://lorettocentralschool.edu.in" target="_blank" rel="noopener noreferrer" className="case-action-btn" aria-label="Open Loretto Central School in new tab">
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </a>
                          <img src="/hero-rosewood-showcase.png" alt="Loretto Central School Platform" loading="lazy" />
                      </div>
                      <div className="case-body">
                          <div className="case-content-top">
                              <h3 className="case-title">Loretto Central School Platform</h3>
                              <p className="case-desc">Rebuilt the institution's digital portal to eliminate exam server crashes, automate parent circular dissemination, and streamline high-volume online admission intake.</p>
                          </div>
                          <div className="case-outcomes">
                              <div className="case-outcomes-header">
                                  <span className="case-outcomes-label">KEY OUTCOMES</span>
                                  <span className="case-outcomes-line"></span>
                              </div>
                              <ul className="case-outcomes-list">
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Zero downtime during peak 1st PUC examination result traffic</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Direct digital admissions intake &amp; instant circulars dispatch</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>0.4s FCP speed with Core Web Vitals 99/100 score</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="case-footer">
                              <span className="case-client">Client: Loretto Central School (CBSE)</span>
                              <a href="https://lorettocentralschool.edu.in" target="_blank" rel="noopener noreferrer" className="case-cta-link">
                                  <span>Read Case Study</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>
      
                  {/* ─── CASE STUDY 02: ST. PHILOMENA COLLEGE ─── */}
                  <div className={`case-card ${filter === 'all' || filter === 'institutional' ? '' : 'is-hidden'}`} data-category="institutional">
                      <div className="case-media">
                          <span className="case-media-tag">College &amp; Autonomous</span>
                          <a href="https://stphilomenacollege.edu.in" target="_blank" rel="noopener noreferrer" className="case-action-btn" aria-label="Open St. Philomena College in new tab">
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </a>
                          <img src="/hero-floating-phones-transparent.png" alt="St. Philomena Autonomous College Cloud" loading="lazy" />
                      </div>
                      <div className="case-body">
                          <div className="case-content-top">
                              <h3 className="case-title">St. Philomena Autonomous College Cloud</h3>
                              <p className="case-desc">Engineered high-concurrency examination result infrastructure and automated merit admissions portal for autonomous higher education.</p>
                          </div>
                          <div className="case-outcomes">
                              <div className="case-outcomes-header">
                                  <span className="case-outcomes-label">KEY OUTCOMES</span>
                                  <span className="case-outcomes-line"></span>
                              </div>
                              <ul className="case-outcomes-list">
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>100% stable result publication under 40,000+ concurrent requests</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Automated merit-rank computation eliminating 3+ weeks manual paperwork</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Mobile-first student &amp; faculty portal with sub-second navigation</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="case-footer">
                              <span className="case-client">Client: St. Philomena Autonomous</span>
                              <a href="https://stphilomenacollege.edu.in" target="_blank" rel="noopener noreferrer" className="case-cta-link">
                                  <span>Read Case Study</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>
      
                  {/* ─── CASE STUDY 03: PULSEFLOW TELEMETRY ─── */}
                  <div className={`case-card ${filter === 'all' || filter === 'saas' ? '' : 'is-hidden'}`} data-category="saas">
                      <div className="case-media">
                          <span className="case-media-tag">Cloud &amp; DevOps SaaS</span>
                          <a href="/contact" className="case-action-btn" aria-label="Explore PulseFlow Engine">
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </a>
                          <img src="/hero-devices.png" alt="PulseFlow Observability Engine" loading="lazy" />
                      </div>
                      <div className="case-body">
                          <div className="case-content-top">
                              <h3 className="case-title">PulseFlow Observability Engine</h3>
                              <p className="case-desc">High-throughput real-time telemetry console processing 12M+ time-series data points with sub-second WebSocket visual dashboards.</p>
                          </div>
                          <div className="case-outcomes">
                              <div className="case-outcomes-header">
                                  <span className="case-outcomes-label">KEY OUTCOMES</span>
                                  <span className="case-outcomes-line"></span>
                              </div>
                              <ul className="case-outcomes-list">
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Real-time ingestion of 12M+ time-series metrics per minute</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Sub-15ms WebSocket live streaming telemetry dashboards</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Zero data loss failover architecture across distributed edge nodes</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="case-footer">
                              <span className="case-client">Client: PulseFlow Systems</span>
                              <a href="/contact" className="case-cta-link">
                                  <span>Read Case Study</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>
      
                  {/* ─── CASE STUDY 04: NEXUS ERP CLOUD ─── */}
                  <div className={`case-card ${filter === 'all' || filter === 'saas' ? '' : 'is-hidden'}`} data-category="saas">
                      <div className="case-media">
                          <span className="case-media-tag">Enterprise ERP &amp; Logistics</span>
                          <a href="/contact" className="case-action-btn" aria-label="Explore Nexus ERP">
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </a>
                          <img src="/hero-machine.png" alt="Nexus Multi-Warehouse ERP" loading="lazy" />
                      </div>
                      <div className="case-body">
                          <div className="case-content-top">
                              <h3 className="case-title">Nexus Multi-Warehouse ERP</h3>
                              <p className="case-desc">Role-based logistics and inventory intelligence platform tracking 45,000+ SKUs across automated multi-location dispatch routes.</p>
                          </div>
                          <div className="case-outcomes">
                              <div className="case-outcomes-header">
                                  <span className="case-outcomes-label">KEY OUTCOMES</span>
                                  <span className="case-outcomes-line"></span>
                              </div>
                              <ul className="case-outcomes-list">
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Automated tracking of 45,000+ SKUs across 8 regional distribution hubs</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Dynamic route optimization reducing dispatch delays by 34%</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Immutable audit logging with role-based fine-grained security</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="case-footer">
                              <span className="case-client">Client: Nexus Distribution</span>
                              <a href="/contact" className="case-cta-link">
                                  <span>Read Case Study</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>
      
                  {/* ─── CASE STUDY 05: MAISON VELLUM ATELIER ─── */}
                  <div className={`case-card ${filter === 'all' || filter === 'ecommerce' ? '' : 'is-hidden'}`} data-category="ecommerce">
                      <div className="case-media">
                          <span className="case-media-tag">Luxury E-Commerce</span>
                          <a href="/contact" className="case-action-btn" aria-label="Explore Maison Vellum Storefront">
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </a>
                          <img src="/hero-rosewood-stage.png" alt="Maison Vellum Luxury Boutique" loading="lazy" />
                      </div>
                      <div className="case-body">
                          <div className="case-content-top">
                              <h3 className="case-title">Maison Vellum Luxury Boutique</h3>
                              <p className="case-desc">Editorial headless e-commerce store with zero layout shift, sub-second checkout transitions, and international currency conversions.</p>
                          </div>
                          <div className="case-outcomes">
                              <div className="case-outcomes-header">
                                  <span className="case-outcomes-label">KEY OUTCOMES</span>
                                  <span className="case-outcomes-line"></span>
                              </div>
                              <ul className="case-outcomes-list">
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Headless storefront achieving 0ms layout shift on checkout</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Multi-currency localization with automated regional tax calculations</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>42% lift in mobile session conversion via 1-click cart flows</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="case-footer">
                              <span className="case-client">Client: Maison Vellum</span>
                              <a href="/contact" className="case-cta-link">
                                  <span>Read Case Study</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>
              
                  {/* ─── CASE STUDY 06: COMING SOON ─── */}
                  <div className={`case-card ${filter === 'all' || filter === 'saas' ? '' : 'is-hidden'}`} data-category="saas" style={{ border: '2px dashed var(--border)', background: 'rgba(0,0,0,0.01)' }}>
                      <div className="case-media" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-raised, #FAF8F5)' }}>
                          <span className="case-media-tag">Active Deployments</span>
                          <a href="/contact" className="case-action-btn" aria-label="Inquire about upcoming projects">
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </a>
                          <div style={{ textAlign: 'center', padding: '2rem' }}>
                              <i className="fa-solid fa-layer-group" style={{ fontSize: '2.5rem', color: 'var(--burgundy, #EF870D)', opacity: '0.6', marginBottom: '0.75rem' }}></i>
                              <span style={{ display: 'block', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>IN DEPLOYMENT // 2026</span>
                          </div>
                      </div>
                      <div className="case-body">
                          <div className="case-content-top">
                              <h3 className="case-title">More case studies on the way</h3>
                              <p className="case-desc">We are documenting upcoming enterprise SaaS architectures, medical portals, and automated logistics platforms scheduled for production deployment.</p>
                          </div>
                          <div className="case-outcomes">
                              <div className="case-outcomes-header">
                                  <span className="case-outcomes-label">KEY OUTCOMES</span>
                                  <span className="case-outcomes-line"></span>
                              </div>
                              <ul className="case-outcomes-list">
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Medical specialty practice portal with automated slot scheduling</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>Enterprise multi-tenant workflow engine with SOC2 compliance</span>
                                  </li>
                                  <li>
                                      <i className="fa-solid fa-circle-check"></i>
                                      <span>High-security verification vault for authenticated digital documents</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="case-footer">
                              <span className="case-client">Client: Confidential Active Builds</span>
                              <a href="/contact" className="case-cta-link">
                                  <span>Discuss Your Scope</span>
                                  <i className="fa-solid fa-arrow-right"></i>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      
          {/* ═══════════════════════════════════════════════════
               SECTION 3: VERIFIED CLIENT ENDORSEMENTS
               ═══════════════════════════════════════════════════ */}
          <section id="client-testimonials" className="container work-testimonials-section" aria-label="Client Testimonials" style={{ padding: '4rem 1.5rem 2rem' }}>
              <div className="testimonials-header" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                  <p className="section-eyebrow" style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#EF870D', display: 'inline-block', marginBottom: '0.75rem' }}>CLIENT ENDORSEMENTS</p>
                  <h2 className="section-title" style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>What Clients Say About Working With Us</h2>
                  <p className="section-lead" style={{ fontSize: '1.05rem', lineHeight: '1.65', color: 'var(--text-secondary)', margin: '0' }}>Direct feedback from school administrators, venture founders, and business owners who rely on our production software daily.</p>
              </div>
      
              <div className="testimonials-grid">
                  {/* Testimonial 01 */}
                  <div className="testimonial-card">
                      <div className="testimonial-rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                      </div>
                      <p className="testimonial-quote">
                          &ldquo;AppVertex transformed how our school communicates. The parents constantly compliment the speed of the new portal, and the administrative burden on our staff dropped noticeably from day one.&rdquo;
                      </p>
                      <div className="testimonial-author-row">
                          <div className="testimonial-avatar">LC</div>
                          <div>
                              <h4 className="testimonial-author-name">Loretto Administration</h4>
                              <div className="testimonial-author-role">Institutional Leadership &bull; CBSE Central School</div>
                          </div>
                      </div>
                  </div>
      
                  {/* Testimonial 02 */}
                  <div className="testimonial-card">
                      <div className="testimonial-rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                      </div>
                      <p className="testimonial-quote">
                          &ldquo;Working directly with Leston and Lenstar eliminated all the frustration we usually have with agencies. They challenged our scope where it was unnecessary and delivered an ultra-fast web app in 3 weeks flat.&rdquo;
                      </p>
                      <div className="testimonial-author-row">
                          <div className="testimonial-avatar">LP</div>
                          <div>
                              <h4 className="testimonial-author-name">LaunchPad Tech Lead</h4>
                              <div className="testimonial-author-role">Founder &amp; CTO &bull; Developer Analytics SaaS</div>
                          </div>
                      </div>
                  </div>
      
                  {/* Testimonial 03 */}
                  <div className="testimonial-card">
                      <div className="testimonial-rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                      </div>
                      <p className="testimonial-quote">
                          &ldquo;Our boutique e-commerce conversion rates doubled after the redesign. The speed on mobile devices is unbelievable, and the one-tap WhatsApp checkout was exactly what our customers needed.&rdquo;
                      </p>
                      <div className="testimonial-author-row">
                          <div className="testimonial-avatar">NF</div>
                          <div>
                              <h4 className="testimonial-author-name">NF Fashion Director</h4>
                              <div className="testimonial-author-role">Creative Lead &bull; Luxury Boutique</div>
                          </div>
                      </div>
                  </div>
              </div>
      
              {/* ═══════════════════════════════════════════════════
                   SECTION 7: CLOSING EDITORIAL STRIP
                   ═══════════════════════════════════════════════════ */}
              <div className="closing-banner">
                  <span className="closing-banner-eyebrow">DIAGNOSTIC &amp; SCOPE</span>
                  <h2 className="closing-banner-title">Tell us what needs to work differently.</h2>
                  <p className="closing-banner-desc">
                      Whether you need an institutional portal, a high-converting web app, or an automated internal workflow, talk through the challenges before deciding what to build.
                  </p>
                  <div className="closing-banner-actions">
                      <a href="/contact#calendarPanel" className="closing-action-primary">
                          <span>Book a Discovery Call</span> <span className="arr">→</span>
                      </a>
                      <a href="/contact#proposalPanel" className="closing-action-secondary">
                          <span>Send a Project Brief</span> <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                  </div>
              </div>
          </section>
      </main>
    </div>
  );
}
