import React from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/contact" className="btn btn-primary">START A PROJECT <span className="arr">→</span></Link>
                    <Link to="/work" className="btn btn-secondary">SEE OUR WORK</Link>
                </div>
            </div>
        </section>
    
        {/* ═══════════════════════════════════════════════════
             SECTION 1: WHO WE WORK WITH (LAYOUT 09)
             ═══════════════════════════════════════════════════ */}
        <section className="container" style={{ padding: '0.5rem 1.5rem 5rem' }}>
            <div className="who-we-work-section reveal-on-scroll" aria-label="Who We Work With">
                <div className="who-we-work-layout">
                    {/* LEFT SIDE (40%) */}
                    <div className="who-we-work-left">
                        <div className="who-we-work-eyebrow-wrap">
                            <span className="who-we-work-eyebrow">WHO WE WORK WITH</span>
                            <span className="who-we-work-eyebrow-line" aria-hidden="true"></span>
                        </div>
                        <h2 className="who-we-work-title">
                            Different Challenges.<br />
                            One <span className="who-we-work-accent">Engineering</span><br />
                            Partner.
                        </h2>
                        <p className="who-we-work-desc">
                            We partner with organizations that need reliable digital solutions, thoughtful engineering and technology built for long-term growth.
                        </p>
                        <div className="who-we-work-bottom-pill" aria-hidden="true"></div>
                    </div>

                    {/* VERTICAL DIVIDER */}
                    <div className="who-we-work-divider" aria-hidden="true"></div>

                    {/* RIGHT SIDE (60%) */}
                    <div className="who-we-work-right">
                        {/* 01 — Growing Businesses */}
                        <div className="profile-row-item">
                            <div className="profile-num-col">
                                <span className="profile-num">01</span>
                            </div>
                            <div className="profile-main-col">
                                <h3 className="profile-name">Growing Businesses</h3>
                                <p className="profile-summary">
                                    Managing client records &amp; inquiries beyond spreadsheets.
                                </p>
                            </div>
                            <div className="profile-symptom-col">
                                <p className="symptom-quote">
                                    &ldquo;Our team spends more time updating sheets and chasing WhatsApp than actually serving clients.&rdquo;
                                </p>
                            </div>
                        </div>

                        <div className="profile-row-divider" aria-hidden="true"></div>

                        {/* 02 — Educational Institutions */}
                        <div className="profile-row-item">
                            <div className="profile-num-col">
                                <span className="profile-num">02</span>
                            </div>
                            <div className="profile-main-col">
                                <h3 className="profile-name">Educational Institutions</h3>
                                <p className="profile-summary">
                                    Unified portals for academies &amp; multi-branch campuses.
                                </p>
                            </div>
                            <div className="profile-symptom-col">
                                <p className="symptom-quote">
                                    &ldquo;Our public site looks dated, and communications are fragmented across disconnected channels.&rdquo;
                                </p>
                            </div>
                        </div>

                        <div className="profile-row-divider" aria-hidden="true"></div>

                        {/* 03 — Founders Launching Scalable MVPs */}
                        <div className="profile-row-item">
                            <div className="profile-num-col">
                                <span className="profile-num">03</span>
                            </div>
                            <div className="profile-main-col">
                                <h3 className="profile-name">Founders Launching Scalable MVPs</h3>
                                <p className="profile-summary">
                                    Production-ready web applications on a fixed schedule.
                                </p>
                            </div>
                            <div className="profile-symptom-col">
                                <p className="symptom-quote">
                                    &ldquo;We need an engineering partner who understands architecture and won't cut corners on security.&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                 SECTION 2: STUDIO LEADERSHIP
                 ═══════════════════════════════════════════════════ */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
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
                    <Link to="/contact" className="btn btn-primary" style={{ padding: '15px 34px', fontSize: '1rem' }}>
                        BOOK A DISCOVERY CALL <span className="arr">→</span>
                    </Link>
                    <Link to="/work" className="btn btn-secondary" style={{ padding: '15px 30px', fontSize: '1rem' }}>
                        VIEW SHIPPED WORK
                    </Link>
                </div>
            </div>
        </section>
    </main>
  );
}
