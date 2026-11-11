import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/about.css';

export default function About() {
  useScrollReveal();

  return (
    <main id="mainContent">
        {/* ═══════════════════════════════════════════════════
             HERO SECTION: AN IDEATECH ALIGNED & APPVERTEX THEMED
             ═══════════════════════════════════════════════════ */}
        <section className="subpage-hero" aria-label="About AppVertex Studio">
            <div className="container subpage-hero-content">
                <h1 className="subpage-title">
                    Websites &amp; software built around how your <span className="gradient-text">team works.</span>
                </h1>
                <p className="subpage-desc">
                    We build websites, customer portals, and internal tools that eliminate friction, replace messy spreadsheets, and fit how your organization actually runs.
                </p>
                <div className="subpage-actions">
                    <a href="/contact#booking-calendar" className="btn btn-primary">START A PROJECT <span className="arr">→</span></a>
                    <a href="/work" className="btn btn-secondary">SEE OUR WORK</a>
                </div>
            </div>
        </section>
    
        {/* ═══════════════════════════════════════════════════
             SECTION 1: OUR CAPABILITIES (WHAT WE BUILD)
             ═══════════════════════════════════════════════════ */}
        <section className="container" style={{ padding: '1.5rem 1.5rem 5rem' }}>

            {/* ═══════════════════════════════════════════════════
                 SECTION 2: CHRONICLE (FOUNDERS' BACKGROUND & LAUNCH)
                 ═══════════════════════════════════════════════════ */}
            <div className="chronicle-section" style={{ marginTop: 0 }}>
                <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem' }}>
                    <p className="section-eyebrow">FOUNDERS' BACKGROUND &amp; STUDIO LAUNCH</p>
                    <h2 className="section-title">How AppVertex Came To Be</h2>
                    <p className="section-lead">
                        Years of seeing businesses struggle with bloated agency templates, slow page speeds, and impersonal handoffs led us to unite and build software the right way.
                    </p>
                </div>
    
                <div className="chronicle-timeline">
                    {/* Milestone 1: The Background */}
                    <div className="chronicle-entry">
                        <div className="chronicle-era">
                            <div className="chronicle-years">BACKGROUND</div>
                            <div className="chronicle-dot"></div>
                        </div>
                        <div className="chronicle-body">
                            <h3 className="chronicle-title">The Problem: Bloated Templates &amp; Shallow Agency Work</h3>
                            <p className="chronicle-text">
                                Working individually across engineering and product design, we repeatedly saw businesses trapped in sluggish CMS templates, fragile plugins, and outsourced junior teams. Software was handed off without real understanding of how the business operated, leading to high maintenance costs and frustrated users.
                            </p>
                        </div>
                    </div>
    
                    {/* Milestone 2: The Experience */}
                    <div className="chronicle-entry">
                        <div className="chronicle-era">
                            <div className="chronicle-years">EXPERIENCE</div>
                            <div className="chronicle-dot"></div>
                        </div>
                        <div className="chronicle-body">
                            <h3 className="chronicle-title">Proven Craftsmanship: Real Systems &amp; Live Deployments</h3>
                            <p className="chronicle-text">
                                Before uniting, our hands-on engineering focused on mission-critical applications—from institutional school portals handling admissions and communication to bespoke web applications where downtime and slow queries were unacceptable. We honed our standard: semantic code, sub-second load times, and intuitive design.
                            </p>
                        </div>
                    </div>
    
                    {/* Milestone 3: Studio Launch */}
                    <div className="chronicle-entry">
                        <div className="chronicle-era">
                            <div className="chronicle-years">2026 LAUNCH</div>
                            <div className="chronicle-dot"></div>
                        </div>
                        <div className="chronicle-body">
                            <h3 className="chronicle-title">2026: Uniting as AppVertex Studio</h3>
                            <p className="chronicle-text">
                                We officially launched AppVertex to offer growing businesses a better alternative: a founder-led product engineering studio where clients work directly with senior builders. No account managers, no junior handoffs—just clean, high-performance digital systems engineered to convert and built to last.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* ═══════════════════════════════════════════════════
                 SECTION 4: WHO WE WORK WITH (WHERE OUR WORK FITS BEST)
                 ═══════════════════════════════════════════════════ */}
            <div style={{ margin: '6rem 0 3rem', textAlign: 'center' }}>
                <p className="section-eyebrow">WHO WE WORK WITH</p>
                <h2 className="section-title">Where Our Work Fits Best</h2>
                <p className="section-lead" style={{ maxWidth: '680px', margin: '0 auto' }}>
                    We partner with three types of organizations where our bespoke engineering yields maximum impact.
                </p>
            </div>
    
            <div className="fit-grid">
                <div className="fit-card">
                    <span className="fit-badge">PROFILE 01</span>
                    <h3 className="fit-title">Growing Businesses Outgrowing Manual Workflows</h3>
                    <p className="fit-desc">
                        Companies managing inquiries across emails, tracking client records in messy spreadsheets, and losing hours to duplicated clerical entry every single week.
                    </p>
                    <div className="fit-symptom">
                        <strong>Common Symptom:</strong>
                        "Our team spends more time updating spreadsheets and chasing updates on WhatsApp than actually serving clients."
                    </div>
                </div>
    
                <div className="fit-card">
                    <span className="fit-badge">PROFILE 02</span>
                    <h3 className="fit-title">Educational Institutions &amp; Multi-Branch Hubs</h3>
                    <p className="fit-desc">
                        Schools, academies, and multi-location institutions needing unified portals where parents, students, teachers, and admins collaborate securely without paper trails.
                    </p>
                    <div className="fit-symptom">
                        <strong>Common Symptom:</strong>
                        "Our public site looks dated, and administrative communications are fragmented across three separate disconnected channels."
                    </div>
                </div>
    
                <div className="fit-card">
                    <span className="fit-badge">PROFILE 03</span>
                    <h3 className="fit-title">Founders Launching Scalable MVPs</h3>
                    <p className="fit-desc">
                        Entrepreneurs with validated market demand who need a production-ready, beautifully designed web product built right the first time on a fixed schedule.
                    </p>
                    <div className="fit-symptom">
                        <strong>Common Symptom:</strong>
                        "We need an engineering partner who understands product design, database architecture, and won't cut corners on security."
                    </div>
                </div>
            </div>
    
            {/* ═══════════════════════════════════════════════════
                 SECTION 5: LEADERSHIP & FOUNDER PHILOSOPHY
                 ═══════════════════════════════════════════════════ */}
            <div className="philosophy-banner">
                <p className="philosophy-quote">
                    &ldquo;Most software fails not because of bad code, but because of bad communication. When you eliminate middle managers and put business owners directly in touch with senior developers, software becomes simple, fast, and remarkably durable.&rdquo;
                </p>
                <div className="philosophy-author">
                    <div>
                        <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-primary)', fontSize: '1.1rem', display: 'block' }}>The AppVertex Studio Commitment</strong>
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono, monospace)' }}>Architected for Performance &bull; Handcrafted with Integrity</span>
                    </div>
                </div>
            </div>
    
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p className="section-eyebrow">STUDIO LEADERSHIP</p>
                <h2 className="section-title">Senior Craftsmanship On Every Project</h2>
            </div>
    
            <div className="founders-grid">
                <div className="founder-card">
                    <span className="founder-role">FOUNDER &amp; LEAD DEVELOPER</span>
                    <h3 className="founder-name">Leston Coelho</h3>
                    <p className="founder-bio">
                        Oversees core system architecture, cloud deployment pipelines, database integrity, and high-performance frontend engineering. Ensures every release runs with sub-second responsiveness and zero tech debt.
                    </p>
                    <a href="mailto:leston@appvertex.in" className="founder-email">
                        <i className="fa-regular fa-envelope"></i> leston@appvertex.in
                    </a>
                </div>
    
                <div className="founder-card">
                    <span className="founder-role">CO-FOUNDER &amp; CREATIVE DIRECTOR</span>
                    <h3 className="founder-name">Lenstar Monteiro</h3>
                    <p className="founder-bio">
                        Leads product design, brand identity systems, user experience hierarchies, and design systems. Translates intricate business workflows into intuitive, human-centered digital interfaces.
                    </p>
                    <a href="mailto:lenstar@appvertex.in" className="founder-email">
                        <i className="fa-regular fa-envelope"></i> lenstar@appvertex.in
                    </a>
                </div>
            </div>
    
            {/* ═══════════════════════════════════════════════════
                 SECTION 6: CLOSING DIAGNOSTIC BANNER
                 ═══════════════════════════════════════════════════ */}
            <div className="closing-banner">
                <h2 className="closing-banner-title">Tell us what is no longer working as it should.</h2>
                <p className="closing-banner-desc">
                    Whether you're replacing legacy systems, consolidating fragmented spreadsheets into a custom portal, or launching a new product, we'll give you a clear, honest assessment of what to build and what to leave out.
                </p>
                <div className="closing-banner-actions">
                    <a href="/contact#booking-calendar" className="btn btn-primary" style={{ padding: '15px 34px', fontSize: '1rem' }}>
                        BOOK A DISCOVERY CALL <span className="arr">→</span>
                    </a>
                    <a href="/work" className="btn btn-secondary" style={{ padding: '15px 30px', fontSize: '1rem' }}>
                        VIEW SHIPPED WORK
                    </a>
                </div>
            </div>
        </section>
    </main>
  );
}
