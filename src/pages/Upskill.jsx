import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/pages/upskill.css';

export default function Upskill() {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    track: '',
    background: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const newApp = {
      id: 'app-' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      track: formData.track,
      background: formData.background.trim(),
      date: 'Just now',
      status: 'pending'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('appvertex_applications') || '[]');
      existing.unshift(newApp);
      localStorage.setItem('appvertex_applications', JSON.stringify(existing));

      if ('BroadcastChannel' in window) {
        const syncChannel = new BroadcastChannel('appvertex_sync');
        syncChannel.postMessage({ type: 'NEW_APPLICATION', data: newApp });
        syncChannel.close();
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', track: '', background: '' });
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (err) {
      console.error('Failed to submit application:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 6000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main id="mainContent">
        {/* ═══════════════════════════════════════════════════
             HERO SECTION: AN IDEATECH ALIGNED & APPVERTEX THEMED
             ═══════════════════════════════════════════════════ */}
        <section className="subpage-hero" aria-label="Upskill Overview">
            <div className="container subpage-hero-content">
                <h1 className="subpage-title">
                    Learn by shipping real software.<br />
                    <span className="gradient-text">Not toy tutorials.</span>
                </h1>
                <p className="subpage-desc">
                    An intensive software engineering mentorship led directly by active studio builders. Master real architectural workflows, clean code standards, and production deployments by shipping actual client-grade software.
                </p>
                <div className="subpage-actions">
                    <a href="#applyForm" className="btn btn-primary">APPLY FOR NEXT COHORT <span className="arr">→</span></a>
                    <a href="#upskill-tracks" className="btn btn-secondary">EXPLORE TRACKS</a>
                </div>
            </div>
        </section>
    
        {/* ═══════════════════════════════════════════════════
             DIAGNOSTIC COMPARISON: WHERE BOOTCAMPS FAIL
             ═══════════════════════════════════════════════════ */}
        <section className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3rem' }}>
                <p className="section-eyebrow">THE REALITY GAP</p>
                <h2 className="section-title">Where Traditional Coding Bootcamps Fail</h2>
                <p className="section-lead">Most online courses and bootcamps churn out surface-level tutorials with zero real-world deployment experience. Here is why the studio apprenticeship model is completely different.</p>
            </div>
    
            <div className="diagnostic-comparison-grid">
                {/* Bad Column */}
                <div className="comparison-col bad">
                    <div className="comparison-header">
                        <i className="fa-solid fa-triangle-exclamation"></i> Traditional Coding Bootcamps
                    </div>
                    <h3 className="comparison-title">Passive Tutorials &amp; Cookie-Cutter Clones</h3>
                    <ul className="comparison-list">
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>Passive Video Consumption:</strong> Students follow along with scripted tutorials without ever designing data schemas or debugging real production failures.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>Generic Toy Projects:</strong> Cloned Netflix or Todo apps that technical hiring managers instantly recognize and ignore.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>Zero Engineering Workflow:</strong> No PR reviews, no merge conflict resolution, no performance budgets, and no architectural design documents.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-xmark"></i>
                            <div><strong>Shallow Framework Hype:</strong> Skips fundamentals like DOM rendering, network waterfalls, and database indexation in favor of superficial syntax.</div>
                        </li>
                    </ul>
                </div>
    
                {/* Good Column */}
                <div className="comparison-col good">
                    <div className="comparison-header">
                        <i className="fa-solid fa-circle-check"></i> The AppVertex Apprenticeship
                    </div>
                    <h3 className="comparison-title">Bespoke Mentorship &amp; Production Craftsmanship</h3>
                    <ul className="comparison-list">
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>Senior PR Reviews:</strong> Line-by-line critiques on your pull requests covering clean abstractions, edge cases, and algorithmic complexity.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>Authentic Production Systems:</strong> Build high-converting corporate sites, authenticated portals, and real-time dashboard analytics.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>Studio-Grade Workflows:</strong> Learn how real dev shops ship: feature branching, PR templates, automated testing, and zero-downtime deployment.</div>
                        </li>
                        <li className="comparison-item">
                            <i className="fa-solid fa-check"></i>
                            <div><strong>Deep Architectural Mastery:</strong> Master sub-second Core Web Vitals, relational &amp; NoSQL schemas, caching strategies, and robust security.</div>
                        </li>
                    </ul>
                </div>
            </div>
    
            {/* ═══════════════════════════════════════════════════
                 PRACTICAL TRACKS
                 ═══════════════════════════════════════════════════ */}
            <div id="upskill-tracks" style={{ marginTop: '5rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
                    <p className="section-eyebrow">PRACTICAL SPECIALIZATIONS</p>
                    <h2 className="section-title">Three Production-Driven Tracks</h2>
                    <p className="section-lead">Choose your focus area and build real-world portfolio capstones reviewed directly by studio engineers.</p>
                </div>
    
                <div className="upskill-tracks-grid">
                    {/* Track 01: Modern Frontend */}
                    <div className="upskill-track-card">
                        <div>
                            <div className="track-badge">TRACK 01 &bull; 8 WEEKS</div>
                            <h3 className="track-title">Modern Frontend &amp; Web Architectures</h3>
                            <p className="track-desc">Master TypeScript, React component internals, CSS variable design systems, micro-interactions, and 100/100 Core Web Vitals optimization.</p>
                            <ul className="track-modules-list">
                                <li><i className="fa-solid fa-check"></i> Advanced TypeScript &amp; State Management</li>
                                <li><i className="fa-solid fa-check"></i> CSS Design Tokens &amp; Motion Architectures</li>
                                <li><i className="fa-solid fa-check"></i> Performance Budgets &amp; CWV Tuning</li>
                                <li><i className="fa-solid fa-check"></i> Production Capstone: High-Conversion Web App</li>
                            </ul>
                        </div>
                        <div>
                            <a href="#applyForm" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Apply for Track <span className="arr">→</span></a>
                        </div>
                    </div>
    
                    {/* Track 02: Fullstack & Cloud */}
                    <div className="upskill-track-card">
                        <div>
                            <div className="track-badge">TRACK 02 &bull; 10 WEEKS</div>
                            <h3 className="track-title">Fullstack Systems &amp; Cloud Databases</h3>
                            <p className="track-desc">Engineer secure REST and GraphQL APIs, integrate Firebase Firestore &amp; PostgreSQL, implement multi-tenant auth, and automate cloud deployments.</p>
                            <ul className="track-modules-list">
                                <li><i className="fa-solid fa-check"></i> Node.js &amp; Express API Pipelines</li>
                                <li><i className="fa-solid fa-check"></i> Relational &amp; NoSQL Cloud Databases</li>
                                <li><i className="fa-solid fa-check"></i> JWT, OAuth &amp; Security Best Practices</li>
                                <li><i className="fa-solid fa-check"></i> Production Capstone: Portal with Admin CMS</li>
                            </ul>
                        </div>
                        <div>
                            <a href="#applyForm" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Apply for Track <span className="arr">→</span></a>
                        </div>
                    </div>
    
                    {/* Track 03: UI/UX & Design Systems */}
                    <div className="upskill-track-card">
                        <div>
                            <div className="track-badge">TRACK 03 &bull; 6 WEEKS</div>
                            <h3 className="track-title">UI / UX &amp; Design Systems Engineering</h3>
                            <p className="track-desc">Bridge the gap between design and code. Learn professional Figma workflows, responsive design token systems, user testing, and clickable prototypes.</p>
                            <ul className="track-modules-list">
                                <li><i className="fa-solid fa-check"></i> Figma Auto-Layout &amp; Token Architecture</li>
                                <li><i className="fa-solid fa-check"></i> Micro-interactions &amp; Component Hierarchies</li>
                                <li><i className="fa-solid fa-check"></i> WCAG 2.1 Accessibility &amp; Heuristics</li>
                                <li><i className="fa-solid fa-check"></i> Production Capstone: Full Design System</li>
                            </ul>
                        </div>
                        <div>
                            <a href="#applyForm" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Apply for Track <span className="arr">→</span></a>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* ═══════════════════════════════════════════════════
                 COHORT APPLICATION FORM
                 ═══════════════════════════════════════════════════ */}
            <div className="upskill-app-wrap" id="applyForm">
                <div className="text-center" style={{ maxWidth: '580px', margin: '0 auto 2.5rem' }}>
                    <p className="section-eyebrow">JOIN THE NEXT COHORT</p>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Apply for Mentorship</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Cohorts are strictly capped at 12 students per track to ensure dedicated 1-on-1 attention from founders.</p>
                </div>
    
                <form id="upskillApplicationForm" onSubmit={handleSubmit}>
                    {submitStatus === 'success' && (
                        <div style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <i className="fa-solid fa-circle-check"></i>
                            <span>Application submitted successfully! Our founders will review your profile and reach out within 24 hours.</span>
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <i className="fa-solid fa-triangle-exclamation"></i>
                            <span>Unable to submit application right now. Please message us directly on WhatsApp or email.</span>
                        </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="appName">Full Name</label>
                            <input type="text" id="appName" name="name" value={formData.name} onChange={handleInputChange} className="form-control" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="appEmail">Email Address</label>
                            <input type="email" id="appEmail" name="email" value={formData.email} onChange={handleInputChange} className="form-control" placeholder="you@domain.com" required />
                        </div>
                    </div>
    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="appPhone">Phone / WhatsApp</label>
                            <input type="tel" id="appPhone" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" placeholder="+91 00000 00000" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="appTrack">Preferred Track</label>
                            <select id="appTrack" name="track" value={formData.track} onChange={handleInputChange} className="form-control" required>
                                <option value="">Select track...</option>
                                <option value="Track 01: Modern Frontend Architecture">Track 01: Modern Frontend Architecture</option>
                                <option value="Track 02: Fullstack &amp; Cloud Databases">Track 02: Fullstack &amp; Cloud Databases</option>
                                <option value="Track 03: UI/UX &amp; Design Systems">Track 03: UI/UX &amp; Design Systems</option>
                            </select>
                        </div>
                    </div>
    
                    <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                        <label className="form-label" htmlFor="appBackground">Current Experience Level &amp; Goals</label>
                        <textarea id="appBackground" name="background" value={formData.background} onChange={handleInputChange} className="form-control" rows="3" placeholder="Tell us about what you have built so far and what you hope to achieve..."></textarea>
                    </div>
    
                    <button type="submit" id="upskillSubmitBtn" disabled={submitting} className="btn btn-primary" style={{ width: '100%', height: '50px', justifyContent: 'center' }}>
                        {submitting ? 'SUBMITTING...' : submitStatus === 'success' ? 'APPLICATION SENT ✓' : <>SUBMIT APPLICATION <span className="arr">→</span></>}
                    </button>
                </form>
            </div>
    
                    </section>
    </main>
  );
}
