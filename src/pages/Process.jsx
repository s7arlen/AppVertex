import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/process.css';

export default function Process() {
  const [openFaq, setOpenFaq] = useState(0);
  useScrollReveal([openFaq]);

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
                        <p className="phase-sub">Understanding the situation and aligning on the direction before deciding what to build.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Discovery</h4>
                                    <p>We examine what is happening in the business: customer touchpoints, where inquiries stall, and what manual spreadsheets slow your team down.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Alignment &amp; Architectural Boundaries</h4>
                                    <p>We establish technical boundaries, verify data schemas, review third-party integration constraints, and define who does what.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>PRD (Product Requirement Document)</h4>
                                    <p>A formal, unambiguous specification detailing every feature, database entity, and API contract with transparent sprint timelines.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Approved Technical Scope &amp; PRD</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Entity Relationship Schemas</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Fixed-Price Sprint Timeline</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Integration Feasibility Audit</span></div>
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
                        <p className="phase-sub">Turning approved wireframes and database models into living, production-grade software.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Component Architecture</h4>
                                    <p>We engineer modular, type-safe components in TypeScript, linking databases, storage buckets, and payment APIs without legacy baggage.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Interactive Staging Access</h4>
                                    <p>You receive access to a private, password-protected staging URL from Week 2 onward to test real features as they are built.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Weekly Review Rounds</h4>
                                    <p>Structured weekly milestones with screen-recorded walkthroughs and focused feedback loops so adjustments happen immediately.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Live Staging Sandbox URL</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Full Git Repository Access</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Weekly Screen-Recorded Demos</span></div>
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
                        <p className="phase-sub">Rigorous cross-device quality assurance, DNS cutover, and seamless production deployment.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>User Acceptance Testing (UAT)</h4>
                                    <p>We run real user scenario tests across iOS, Android, macOS, and Windows to catch edge-case bugs and usability friction.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Performance &amp; Security Auditing</h4>
                                    <p>We optimize assets for 95+ Core Web Vitals, implement automated Cloudflare SSL, configure CORS rules, and secure environment variables.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Zero-Downtime Cutover</h4>
                                    <p>We manage DNS records, setup live MX/SPF/DKIM email records, and transfer 100% intellectual property directly to your team.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Verified Production DNS Launch</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>100% IP &amp; Code Ownership Transfer</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Comprehensive Admin Handover Guide</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>30-Day Guaranteed Code Warranty</span></div>
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
                        <p className="phase-sub">Dependable ongoing care to keep your systems fast, secure, and continuously adapted to your business growth.</p>
                    </div>
                    <div className="phase-content-grid">
                        <div className="phase-points-list">
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Proactive Infrastructure Care</h4>
                                    <p>Routine database vacuuming, dependency security patching, uptime monitors, and automated off-site cloud backups.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Emergency Triage SLA</h4>
                                    <p>Under 1-hour response SLA for any critical outages, domain disruptions, or payment gateway failures.</p>
                                </div>
                            </div>
                            <div className="phase-point-item">
                                <span className="phase-point-dot"></span>
                                <div>
                                    <h4>Iterative Sprints</h4>
                                    <p>As your user base expands, we design and deploy new portal features, CRM automations, and reporting modules on dedicated sprints.</p>
                                </div>
                            </div>
                        </div>
                        <div className="phase-deliverables-box">
                            <span className="deliverables-lbl">Phase Deliverables</span>
                            <div className="deliverables-chips">
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Annual Maintenance Contract (AMC)</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Monthly Performance &amp; Uptime Reports</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Priority Engineering Support Line</span></div>
                                <div className="deliv-chip-item"><i className="fa-solid fa-check"></i> <span>Quarterly Evolution Roadmaps</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* ═══════════════════════════════════════════════════
                 SECTION 4: DIAGNOSTIC REALITY GAP
                 ═══════════════════════════════════════════════════ */}
            <div style={{ margin: '6rem 0 3rem', textAlign: 'center' }}>
                <p className="section-eyebrow">THE REALITY GAP</p>
                <h2 className="section-title">Why Traditional Agency Projects Drag On</h2>
                <p className="section-lead" style={{ maxWidth: '660px', margin: '0 auto' }}>Most software projects fail to launch on time because of vague verbal agreements and detached middle managers. Here is why the AppVertex model delivers on schedule.</p>
            </div>
    
            <div className="diagnostic-comparison-grid">
                {/* Bad Column */}
                <div className="comparison-col bad">
                    <div className="comparison-header">
                        <i className="fa-solid fa-triangle-exclamation"></i> Traditional Agencies &amp; Contractors
                    </div>
                    <h3 className="comparison-title">Scope Creep, Delays &amp; Black Boxes</h3>
                    <ul className="comparison-list">
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>Vague Verbal Promises:</strong> Loose definitions of features that lead to endless disputes, budget ballooning, and delayed launches.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>Account Manager Telephone Game:</strong> You communicate through intermediaries who don't write code, distorting requirements.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>The 3-Month Black Box:</strong> You see nothing until a rushed launch day, when dozens of architectural flaws suddenly appear.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>Zero Post-Launch Ownership:</strong> Handoffs with zero documentation, leaving you locked into expensive proprietary maintenance contracts.</div>
                        </li>
                    </ul>
                </div>
    
                {/* Good Column */}
                <div className="comparison-col good">
                    <div className="comparison-header">
                        <i className="fa-solid fa-circle-check"></i> The AppVertex Sprint Standard
                    </div>
                    <h3 className="comparison-title">Transparent Sprints &amp; Founder Collaboration</h3>
                    <ul className="comparison-list">
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>Written PRD Specifications:</strong> Every deliverable, database schema, and API endpoint is formally approved before writing code.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>Direct Senior Developer Access:</strong> Direct Slack/WhatsApp channel with lead engineers architecting your platform.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>Staging Sandbox from Week 2:</strong> Clickable previews and live testing environments updated with every sprint milestone.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>100% Code Ownership &amp; Warranty:</strong> Complete repository rights, clean documentation, and 30 days of guaranteed bug triage.</div>
                        </li>
                    </ul>
                </div>
            </div>
    
            {/* ═══════════════════════════════════════════════════
                 SECTION 5: INTERACTIVE PROCESS FAQ ACCORDION
                 ═══════════════════════════════════════════════════ */}
            <div style={{ margin: '6rem 0 3rem', textAlign: 'center' }}>
                <p className="section-eyebrow">COMMON QUESTIONS</p>
                <h2 className="section-title">Frequently Asked Questions About Our Process</h2>
                <p className="section-lead" style={{ maxWidth: '640px', margin: '0 auto' }}>Everything you need to know about our sprints, communication rhythms, and delivery guarantees.</p>
            </div>
    
            <div className="process-faq-accordion">
                {/* FAQ 1 */}
                <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`}>
                    <div className="faq-question" style={{ cursor: 'pointer' }} onClick={() => setOpenFaq(prev => prev === 0 ? null : 0)}>
                        <span>How quickly can a project kick off after the Discovery Call?</span>
                        <i className="fa-solid fa-chevron-down faq-icon"></i>
                    </div>
                    <div className="faq-answer">
                        Following our initial 30-minute discovery call, we prepare your architectural scope and Product Requirement Document (PRD) within 3 to 5 business days. Once the specification and sprint schedule are approved, development officially kicks off within 48 hours.
                    </div>
                </div>

                {/* FAQ 2 */}
                <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`}>
                    <div className="faq-question" style={{ cursor: 'pointer' }} onClick={() => setOpenFaq(prev => prev === 1 ? null : 1)}>
                        <span>How do weekly sprint reviews and feedback work?</span>
                        <i className="fa-solid fa-chevron-down faq-icon"></i>
                    </div>
                    <div className="faq-answer">
                        At the end of each sprint cycle, we publish an interactive staging build and record a concise 5-minute video walkthrough showcasing completed functionality. Your team tests the live staging link and provides consolidated feedback directly in the client portal or via Slack.
                    </div>
                </div>

                {/* FAQ 3 */}
                <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`}>
                    <div className="faq-question" style={{ cursor: 'pointer' }} onClick={() => setOpenFaq(prev => prev === 2 ? null : 2)}>
                        <span>What happens if our requirements evolve mid-development?</span>
                        <i className="fa-solid fa-chevron-down faq-icon"></i>
                    </div>
                    <div className="faq-answer">
                        We maintain strict timeline protection. If you need new capabilities that fall outside the approved PRD, we discuss them transparently, provide an isolated scope and quote, and schedule them either into a rapid sprint adjustment or an immediate Phase 4 release without delaying the primary launch.
                    </div>
                </div>

                {/* FAQ 4 */}
                <div className={`faq-item ${openFaq === 3 ? 'active' : ''}`}>
                    <div className="faq-question" style={{ cursor: 'pointer' }} onClick={() => setOpenFaq(prev => prev === 3 ? null : 3)}>
                        <span>Do we own 100% of the code and digital infrastructure?</span>
                        <i className="fa-solid fa-chevron-down faq-icon"></i>
                    </div>
                    <div className="faq-answer">
                        Yes, absolutely. From day one of launch, 100% of the source code, repository rights, database schemas, domain records, and deployment keys are transferred directly to your organization. We believe in complete client independence with zero proprietary lock-in.
                    </div>
                </div>

                {/* FAQ 5 */}
                <div className={`faq-item ${openFaq === 4 ? 'active' : ''}`}>
                    <div className="faq-question" style={{ cursor: 'pointer' }} onClick={() => setOpenFaq(prev => prev === 4 ? null : 4)}>
                        <span>What is included in the 30-day post-launch warranty?</span>
                        <i className="fa-solid fa-chevron-down faq-icon"></i>
                    </div>
                    <div className="faq-answer">
                        Every project deployed by AppVertex includes a complimentary 30-day post-launch warranty covering bug fixes, edge-case browser adjustments, Core Web Vitals telemetry monitoring, and server configuration tuning. Following the warranty, you can opt into our Annual Maintenance Contract (AMC).
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                 SECTION 6: CLOSING DIAGNOSTIC BANNER
                 ═══════════════════════════════════════════════════ */}
            <div className="closing-banner">
                <h2 className="closing-banner-title">Tell Us About Your Project</h2>
                <p className="closing-banner-desc">
                    Share what is no longer working as it should. We use the Discovery Call to understand the situation together and identify the right starting point.
                </p>
                <div className="closing-banner-actions">
                    <a href="/contact#booking-calendar" className="btn btn-primary" style={{ padding: '15px 34px', fontSize: '1rem' }}>
                        BOOK DISCOVERY CALL <span className="arr">→</span>
                    </a>
                    <a href="/services" className="btn btn-secondary" style={{ padding: '15px 30px', fontSize: '1rem' }}>
                        EXPLORE SERVICES
                    </a>
                </div>
            </div>
        </section>
    </main>
  );
}
