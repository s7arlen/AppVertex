import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/process.css';

export default function Process() {
  useScrollReveal();

  return (
    <main id="mainContent">
        {/* ═══════════════════════════════════════════════════
             SECTION 0: HERO + SPRINT TELEMETRY CARD
             ═══════════════════════════════════════════════════ */}
        <section className="subpage-hero" aria-label="Process Overview">
            <div className="container subpage-hero-content">
                <h1 className="subpage-title">
                    What working together<br />
                    <span className="gradient-text">looks like.</span>
                </h1>
                <p className="subpage-desc">
                    Every project follows a clear sequence, from understanding the issue to getting the website or application into day-to-day use. Progress and items needing your input stay visible in the client portal.
                </p>
                <div className="subpage-actions">
                    <a href="/contact#booking-calendar" className="btn btn-primary">Book Discovery Call <span className="arr">→</span></a>
                    <a href="#fourPhases" className="btn btn-secondary">Explore The Method</a>
                </div>
            </div>
        </section>
    
        {/* ═══════════════════════════════════════════════════
             SECTION 1: THE FOUR PHASES
             ═══════════════════════════════════════════════════ */}
        <section className="container" id="fourPhases" style={{ padding: '1.5rem 1.5rem 5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 2.5rem' }}>
                <p className="section-eyebrow">THE METHOD</p>
                <h2 className="section-title">The Four Phases</h2>
                <p className="section-lead">Each phase has a defined start, clear review points, and concrete deliverables. You always know where the project stands and what comes next.</p>
            </div>
    
            <div className="phases-stack">
                {/* PHASE 1: DISCOVERY, SCOPE & PRD */}
                <div className="phase-block">
                    <div className="phase-header">
                        <div className="phase-num-title">
                            <span className="phase-badge-num">Phase 1</span>
                            <h3 className="phase-title">Discovery, Scope &amp; PRD</h3>
                        </div>
                        <p className="phase-sub">Aligning on business goals, architecture, and fixed deliverables before writing code.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Workflow Audit</h4>
                                    <p>Identify bottlenecks, customer touchpoints, and core operational objectives.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>System Architecture</h4>
                                    <p>Map data schemas, third-party API integrations, and security constraints.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Fixed PRD &amp; Sprints</h4>
                                    <p>Finalize formal feature specifications, milestones, and guaranteed timelines.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Approved PRD &amp; Scope</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Database Schemas</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Fixed Sprint Timeline</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Integration Audit</span></div>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* PHASE 2: BUILD & BETA */}
                <div className="phase-block">
                    <div className="phase-header">
                        <div className="phase-num-title">
                            <span className="phase-badge-num">Phase 2</span>
                            <h3 className="phase-title">Build &amp; Beta</h3>
                        </div>
                        <p className="phase-sub">Engineering production-grade software with live visibility from sprint one.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Modular Engineering</h4>
                                    <p>Clean, scalable TypeScript components with modern databases and APIs.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Live Staging Sandbox</h4>
                                    <p>Private preview URL updated weekly to test functional features in real time.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Weekly Async Demos</h4>
                                    <p>Screen-recorded walkthroughs and rapid feedback loops at every milestone.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Private Staging URL</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Full Git Repository Access</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Weekly Demo Walkthroughs</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Working Auth &amp; Database CRUD</span></div>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* PHASE 3: REVIEW, REVISE & LAUNCH */}
                <div className="phase-block">
                    <div className="phase-header">
                        <div className="phase-num-title">
                            <span className="phase-badge-num">Phase 3</span>
                            <h3 className="phase-title">Review, Revise &amp; Launch</h3>
                        </div>
                        <p className="phase-sub">Rigorous cross-device testing, zero-downtime deployment, and complete IP transfer.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Cross-Device QA &amp; UAT</h4>
                                    <p>Comprehensive user journey testing across mobile, tablet, and desktop.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Speed &amp; Security Hardening</h4>
                                    <p>95+ Core Web Vitals optimization, SSL certification, and hardened secrets.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Zero-Downtime Go-Live</h4>
                                    <p>Flawless DNS cutover, mail authentication, and full IP handover.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Live Production Launch</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>100% Code &amp; IP Ownership</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Admin Handover Guide</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>30-Day Bug Warranty</span></div>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* PHASE 4: MAINTAIN & EVOLVE */}
                <div className="phase-block">
                    <div className="phase-header">
                        <div className="phase-num-title">
                            <span className="phase-badge-num">Phase 4</span>
                            <h3 className="phase-title">Maintain &amp; Evolve</h3>
                        </div>
                        <p className="phase-sub">Dependable post-launch care, continuous monitoring, and on-demand feature sprints.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Proactive System Care</h4>
                                    <p>Continuous uptime monitoring, automated backups, and security patching.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Rapid Incident SLA</h4>
                                    <p>Under 1-hour response guarantee for mission-critical issues.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Iterative Growth Sprints</h4>
                                    <p>Flexible roadmaps for new integrations, automations, and custom modules.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Annual Maintenance (AMC)</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Monthly Health &amp; Uptime Reports</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Priority Engineering Hotline</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Quarterly Feature Roadmaps</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                 SECTION 2: CLOSING SPRINT KICKOFF BANNER
                 ═══════════════════════════════════════════════════ */}
            <div className="closing-banner">
                <h2 className="closing-banner-title">Ready to plan your next sprint?</h2>
                <p className="closing-banner-desc">
                    Book a 30-minute discovery session with our founding engineers to walk through technical scope, milestones, and fixed pricing.
                </p>
                <div className="closing-banner-actions">
                    <a href="/contact#booking-calendar" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '0.98rem' }}>
                        BOOK DISCOVERY CALL <span className="arr">→</span>
                    </a>
                    <a href="/work" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '0.98rem' }}>
                        VIEW SELECTED WORK
                    </a>
                </div>
            </div>
        </section>
    </main>
  );
}
