import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import CustomSelect from '../components/CustomSelect';
import '../styles/pages/contact.css';

const CONTACT_SERVICE_OPTIONS = [
  { value: '', label: 'Select service...' },
  { value: 'web-dev', label: 'Fullstack Web Application' },
  { value: 'web-design', label: 'Web Design & Design System' },
  { value: 'portal', label: 'Institutional / School Portal' },
  { value: 'saas', label: 'SaaS Product Engineering' },
  { value: 'ecommerce', label: 'Luxury E-Commerce' },
  { value: 'maintenance', label: 'Cloud Maintenance & SLA' },
];

const CONTACT_BUDGET_OPTIONS = [
  { value: 'flexible', label: 'Flexible / Exploring' },
  { value: '25k-50k', label: '₹25,000 – ₹50,000' },
  { value: '50k-100k', label: '₹50,000 – ₹1,00,000' },
  { value: '100k+', label: '₹1,00,000+' },
];

const serviceMap = {
  'Solutions Consulting': 'web-design',
  'Website Design & Development': 'web-dev',
  'MVP Development': 'saas',
  'Custom Web Applications': 'web-dev',
  'Ecommerce Solutions': 'ecommerce',
  'Institutional & School Portals': 'portal',
  'Custom Software Solutions': 'saas',
  'Process Building': 'maintenance',
  'PRD (Product Requirement Document)': 'saas',
  'High-Conversion Landing Pages': 'web-design',
  'Growth Consulting': 'web-design',
  'Brand Identity': 'web-design',
  'GBP & Local SEO': 'maintenance',
  'Domain & Hosting Architecture': 'maintenance'
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'proposal'
  const [requestedService, setRequestedService] = useState('');
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default
  const [activeCol, setActiveCol] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: 'flexible',
    details: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useScrollReveal([activeTab, openFaq]);

  // Pre-select service from URL parameter
  useEffect(() => {
    const s = searchParams.get('service');
    if (s) {
      setActiveTab('proposal');
      setRequestedService(s);
      if (serviceMap[s]) {
        setFormData(prev => ({ ...prev, service: serviceMap[s] }));
      }
    }
  }, [searchParams]);

  // Sync tab active classes
  useEffect(() => {
    const calBtn = document.getElementById('tabCalendarBtn');
    const propBtn = document.getElementById('tabProposalBtn');
    const calPanel = document.getElementById('calendarPanel');
    const propPanel = document.getElementById('proposalPanel');

    if (activeTab === 'calendar') {
      calBtn?.classList.add('active');
      propBtn?.classList.remove('active');
      calPanel?.classList.add('active');
      propPanel?.classList.remove('active');
    } else {
      propBtn?.classList.add('active');
      calBtn?.classList.remove('active');
      propPanel?.classList.add('active');
      calPanel?.classList.remove('active');
    }
  }, [activeTab]);

  // Sync FAQ active classes
  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-wrapper .faq-item');
    faqItems.forEach((item, idx) => {
      const isThisOpen = openFaq === idx;
      item.classList.toggle('active', isThisOpen);
      const btn = item.querySelector('.faq-btn');
      if (btn) {
        btn.setAttribute('aria-expanded', isThisOpen ? 'true' : 'false');
      }
    });
  }, [openFaq]);

  // Sync Conversation Columns active class & auto-cycle
  useEffect(() => {
    const cols = document.querySelectorAll('.anidea-col');
    cols.forEach((col, idx) => {
      col.classList.toggle('is-active', activeCol === idx);
    });
  }, [activeCol]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCol(prev => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const submitBtn = e.target.querySelector('button[type="submit"]');

    const inquiry = {
      id: 'inq-' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      service: requestedService || formData.service || '',
      budget: formData.budget || '',
      message: requestedService
        ? `Requested service: ${requestedService}\n\n${formData.details.trim()}`
        : formData.details.trim(),
      date: 'Just now',
      status: 'unread'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('appvertex_inquiries') || '[]');
      existing.unshift(inquiry);
      localStorage.setItem('appvertex_inquiries', JSON.stringify(existing));

      if ('BroadcastChannel' in window) {
        const syncChannel = new BroadcastChannel('appvertex_sync');
        syncChannel.postMessage({ type: 'NEW_INQUIRY', data: inquiry });
        syncChannel.close();
      }

      try {
        const response = await fetch('https://us-central1-appvertex-e09c8.cloudfunctions.net/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: inquiry.name,
            email: inquiry.email,
            message: inquiry.message,
            website: ''
          })
        });
        if (!response.ok) {
          console.warn(`Contact endpoint response status: ${response.status}`);
        }
      } catch (netErr) {
        console.warn('Contact endpoint network notice (inquiry stored locally):', netErr);
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: 'flexible',
        details: ''
      });
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (err) {
      console.warn('Project proposal delivery failed:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 6000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.closest('#tabCalendarBtn')) {
          setActiveTab('calendar');
        } else if (e.target.closest('#tabProposalBtn')) {
          setActiveTab('proposal');
        }

        const faqBtn = e.target.closest('.faq-btn');
        if (faqBtn) {
          const faqItem = faqBtn.closest('.faq-item');
          const allItems = Array.from(document.querySelectorAll('.faq-wrapper .faq-item'));
          const idx = allItems.indexOf(faqItem);
          if (idx !== -1) {
            setOpenFaq(prev => prev === idx ? null : idx);
          }
        }

        const col = e.target.closest('.anidea-col');
        if (col) {
          const allCols = Array.from(document.querySelectorAll('.anidea-col'));
          const idx = allCols.indexOf(col);
          if (idx !== -1) {
            setActiveCol(idx);
          }
        }
      }}
      onMouseEnter={(e) => {
        const col = e.target.closest('.anidea-col');
        if (col) {
          const allCols = Array.from(document.querySelectorAll('.anidea-col'));
          const idx = allCols.indexOf(col);
          if (idx !== -1) {
            setActiveCol(idx);
          }
        }
      }}
      onSubmit={(e) => {
        if (e.target.id === 'contactPageForm') {
          handleSubmit(e);
        }
      }}
    >
      <main id="mainContent">
        
            {/* ═══════════════════════════════════════════════════
                 SECTION 0: HERO (START WITH THE PROBLEM)
                 ═══════════════════════════════════════════════════ */}
            <section className="contact-section" style={{ paddingTop: 'calc(72px + 2rem)', paddingBottom: '3.5rem' }}>
                <div className="contact-section-inner">
                    <div className="hero-contact-grid">
                        {/* Left Column: Display Copy & CTAs */}
                        <div className="hero-contact-left">
                            <div>
                                <h1 className="hero-contact-h1">
                                    <span className="hero-h1-line1">Talk through</span>
                                    <span className="hero-h1-gradient">what isn't working</span>
                                    <span className="hero-h1-line3">before deciding what to build.</span>
                                </h1>
                                <p className="hero-contact-lead">
                                    Tell us what is not working, and we'll work out what would help.
                                </p>
                            </div>
        
                            <div>
                                <div className="hero-actions-row">
                                    <a href="#booking-calendar" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                                        Book a Call <span className="arr">→</span>
                                    </a>
                                    <a href="mailto:info@appvertex.in" className="btn btn-secondary" style={{ padding: '12px 26px', fontSize: '0.95rem' }}>
                                        Email Us Directly
                                    </a>
                                </div>
                            </div>
                        </div>
        
                        {/* Right Column: Studio Commitments Card */}
                        <div>
                            <div className="commitments-card">
                                {/* Technical Watermark Background */}
                                <svg className="commitments-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <polygon points="50 3, 90 25, 90 75, 50 97, 10 75, 10 25"/>
                                    <line x1="50" y1="3" x2="50" y2="97"/>
                                    <line x1="10" y1="25" x2="90" y2="75"/>
                                    <line x1="90" y1="25" x2="10" y2="75"/>
                                </svg>
        
                                <div className="commitments-header">
                                    <span className="commitments-eyebrow">STUDIO COMMITMENTS</span>
                                    <h3 className="commitments-title">What you can expect:</h3>
                                </div>
        
                                <div className="commitments-list">
                                    <div className="commitment-item">
                                        <span className="commitment-num">01</span>
                                        <div>
                                            <h4>Honest Recommendations</h4>
                                            <p>If your existing tools already do the job, we tell you directly instead of proposing custom software.</p>
                                        </div>
                                    </div>
                                    <div className="commitment-item">
                                        <span className="commitment-num">02</span>
                                        <div>
                                            <h4>Practical assessment</h4>
                                            <p>We identify where customer enquiries stall, where delivery slows down, and where workarounds occur.</p>
                                        </div>
                                    </div>
                                    <div className="commitment-item">
                                        <span className="commitment-num">03</span>
                                        <div>
                                            <h4>A Practical Next Step</h4>
                                            <p>You leave the call with a practical next step: whether to update your website, adjust an internal routine, or build software.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            {/* ═══════════════════════════════════════════════════
                 SECTION 1: BOOKING & INTAKE (SCHEDULE YOUR DISCOVERY CALL)
                 ═══════════════════════════════════════════════════ */}
            <section id="booking-calendar" className="contact-section">
                <div className="contact-section-inner" style={{ maxWidth: '1040px' }}>
                    <div className="contact-section-header">
                        <span className="contact-eyebrow">Choose a Time</span>
                        <h2 className="contact-title">Schedule Your Discovery Call.</h2>
                        <p className="contact-subtitle">
                            Talk through what is not working before deciding what to build. A short outline of what is happening in the business is enough.
                        </p>
                    </div>
        
                    {/* Intake Option Switcher Tabs */}
                    <div className="intake-tabs-bar">
                        <button type="button" className="intake-tab-btn active" id="tabCalendarBtn">
                            <i className="fa-solid fa-calendar-check"></i> 30-Min Discovery Call
                        </button>
                        <button type="button" className="intake-tab-btn" id="tabProposalBtn">
                            <i className="fa-solid fa-paper-plane"></i> Direct Project Proposal
                        </button>
                    </div>
        
                    {/* Panel A: Founder Diagnostic Session (Option 4 - Human Studio Style) */}
                    <div className="intake-panel active" id="calendarPanel">
                        <div className="founder-diag-card">
                            {/* Top Founder Header */}
                            <div className="founder-diag-header">
                                <div className="founder-avatar-stack" aria-hidden="true">
                                    <span className="founder-avatar av-1" title="Leston Coelho">LC</span>
                                    <span className="founder-avatar av-2" title="Lenstar Monteiro">LM</span>
                                </div>
                                <div className="founder-diag-meta">
                                    <h3 className="founder-diag-names">Leston Coelho &amp; Lenstar Monteiro</h3>
                                    <span className="founder-diag-role">Founders &amp; Technical Directors • AppVertex</span>
                                </div>
                            </div>
        
                            {/* Core Call Title & Honest Studio Statement */}
                            <div className="founder-diag-body">
                                <h4 className="founder-diag-title">
                                    <span className="diag-title-desktop">30-Minute Architecture &amp; Diagnostics Session</span>
                                    <span className="diag-title-mobile">Architecture Diagnostic Session</span>
                                </h4>
                                <div className="founder-diag-quote">
                                    <span className="diag-quote-desktop">&ldquo;Before writing any code or proposing a budget, we sit down with you to understand where the system or workflow is actually breaking down. If custom software isn&rsquo;t the most profitable fix for your business, we will tell you upfront.&rdquo;</span>
                                    <span className="diag-quote-mobile">A direct 1-on-1 working session with Leston &amp; Lenstar to review your current system, diagnose bottlenecks, and map out a concrete build roadmap &mdash; zero sales pitch.</span>
                                </div>
                            </div>
        
                            {/* Bottom Action Bar */}
                            <div className="founder-diag-footer">
                                <div className="founder-diag-specs">
                                    <span><i className="fa-regular fa-clock"></i> 30 mins</span>
                                    <span className="diag-dot">&bull;</span>
                                    <span><i className="fa-solid fa-video"></i> Google Meet</span>
                                    <span className="diag-dot">&bull;</span>
                                    <span><i className="fa-solid fa-shield-halved"></i> 0% Sales Pressure</span>
                                </div>
        
                                <a href="https://calendar.app.google/91mkbLLM83uv7oC47" 
                                   target="_blank" rel="noopener noreferrer" className="founder-diag-cta">
                                    <span>Select a Time on Google Calendar</span>
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                            </div>
                        </div>
                    </div>
        
                    {/* Panel B: Interactive Project Estimator & Proposal Form (Cloud Synced) */}
                    <div className="intake-panel" id="proposalPanel">
                        <div className="intake-form-wrapper">
                            <div style={{ marginBottom: '1.75rem' }}>
                                <span className="contact-eyebrow">PROJECT ESTIMATOR &amp; INTAKE</span>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>Tell Us About Your Project</h3>
                                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: '0' }}>We review every project proposal within 24 hours and reply with transparent scope breakdown and feasibility notes.</p>
                            </div>
        
                            <form id="contactPageForm">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contactName">Your Name</label>
                                        <input type="text" id="contactName" name="name" className="form-control" placeholder="John Doe" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contactEmail">Work Email</label>
                                        <input type="email" id="contactEmail" name="email" className="form-control" placeholder="john@company.com" required />
                                    </div>
                                </div>
        
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contactPhone">Phone / WhatsApp</label>
                                        <input type="tel" id="contactPhone" name="phone" className="form-control" placeholder="+91 93229 71253" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contactCompany">Company / Organization</label>
                                        <input type="text" id="contactCompany" name="company" className="form-control" placeholder="Acme Studio" />
                                    </div>
                                </div>
        
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contactService">Primary Requirement</label>
                                        <CustomSelect
                                            id="contactService"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleInputChange}
                                            options={CONTACT_SERVICE_OPTIONS}
                                            placeholder="Select service..."
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contactBudget">Estimated Budget Range</label>
                                        <CustomSelect
                                            id="contactBudget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            options={CONTACT_BUDGET_OPTIONS}
                                            placeholder="Select budget range..."
                                        />
                                    </div>
                                </div>
        
                                <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                                    <label className="form-label" htmlFor="contactDetails">Project Overview &amp; Current Bottlenecks</label>
                                    <textarea
                                        id="contactDetails"
                                        name="details"
                                        value={formData.details}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows="4"
                                        placeholder="Briefly describe what is not working in your current workflow, your timeline, or key objectives..."
                                        required
                                    ></textarea>
                                </div>

                                {submitStatus === 'success' && (
                                    <div style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <i className="fa-solid fa-circle-check"></i>
                                        <span>Thank you! Your project proposal has been received. We will analyze your requirements and reach out within 24 hours.</span>
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                        <span>Unable to send proposal right now. Please message us directly at info@appvertex.in or on WhatsApp.</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn btn-primary"
                                    style={{ width: '100%', height: '50px', justifyContent: 'center', fontSize: '0.95rem' }}
                                >
                                    {submitting ? (
                                        'SUBMITTING...'
                                    ) : submitStatus === 'success' ? (
                                        'PROPOSAL SENT ✓'
                                    ) : (
                                        <>SUBMIT PROPOSAL <span className="arr">→</span></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        
            {/* ═══════════════════════════════════════════════════
                 SECTION 3: CONVERSATION BLUEPRINT (WHAT WE'LL LOOK AT)
                 ═══════════════════════════════════════════════════ */}
            <section className="contact-section anidea-conversation-section">
                <div className="contact-section-inner">
                    <div className="anidea-section-header">
                        <span className="anidea-eyebrow">The Conversation</span>
                        <h2 className="anidea-title">What We'll Look At</h2>
                        <p className="anidea-subtitle">
                            A structured conversation to understand where routine work has become difficult.
                        </p>
                    </div>
        
                    <div className="anidea-blueprint-frame">
                        <div className="anidea-grid">
                            {/* Column 01: Diagnose */}
                            <div className="anidea-col reveal-on-scroll" style={{ transitionDelay: '0s' }}>
                                <div className="anidea-step-lead">
                                    <span className="anidea-step-num">01</span>
                                    <span className="anidea-step-tag">DIAGNOSE</span>
                                </div>
                                <h3 className="anidea-col-title">What is getting in the way</h3>
                                <p className="anidea-col-desc">
                                    We start with the specific friction points you are seeing, which team members or customers are affected, and what an ideal fix looks like.
                                </p>
                            </div>
        
                            {/* Column 02: Examine */}
                            <div className="anidea-col reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
                                <div className="anidea-step-lead">
                                    <span className="anidea-step-num">02</span>
                                    <span className="anidea-step-tag">EXAMINE</span>
                                </div>
                                <h3 className="anidea-col-title">How things work now</h3>
                                <p className="anidea-col-desc">
                                    Then we look at the questions customers ask, what happens after an enquiry arrives, the day-to-day work, and the tools you already use.
                                </p>
                            </div>
        
                            {/* Column 03: Next Steps */}
                            <div className="anidea-col reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
                                <div className="anidea-step-lead">
                                    <span className="anidea-step-num">03</span>
                                    <span className="anidea-step-tag">NEXT STEPS</span>
                                </div>
                                <h3 className="anidea-col-title">What becomes clear</h3>
                                <p className="anidea-col-desc">
                                    By the end of the conversation, you will have a clear idea of what to fix first, with zero obligation to hire us or start a project.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            {/* ═══════════════════════════════════════════════════
                 SECTION 5: INTERACTIVE FAQ
                 ═══════════════════════════════════════════════════ */}
            <section className="contact-section" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
                <div className="contact-section-inner">
                    <div className="contact-section-header">
                        <span className="contact-eyebrow">Common Questions</span>
                        <h2 className="contact-title">Questions before you begin</h2>
                        <p className="contact-subtitle">
                            Common questions about finding the right starting point, existing tools, and our discovery process.
                        </p>
                    </div>
        
                    <div className="faq-wrapper">
                        {/* FAQ 1 */}
                        <div className="faq-item active">
                            <button type="button" className="faq-btn" aria-expanded="true">
                                <span>Do I need to know which service I need before getting in touch?</span>
                                <div className="faq-icon-bubble">
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                            </button>
                            <div className="faq-answer-body">
                                <p className="faq-answer-text">
                                    Tell us what is not working in your business, and we will help you identify the most practical starting point.
                                </p>
                            </div>
                        </div>
        
                        {/* FAQ 2 */}
                        <div className="faq-item">
                            <button type="button" className="faq-btn" aria-expanded="false">
                                <span>Can you work with the tools we already use?</span>
                                <div className="faq-icon-bubble">
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                            </button>
                            <div className="faq-answer-body">
                                <p className="faq-answer-text">
                                    Yes. We do not replace tools that already do the job. If your existing spreadsheets or software support the workflow with an integration or smaller adjustment, we keep them in place.
                                </p>
                            </div>
                        </div>
        
                        {/* FAQ 3 */}
                        <div className="faq-item">
                            <button type="button" className="faq-btn" aria-expanded="false">
                                <span>What if I'm not sure where the problem starts?</span>
                                <div className="faq-icon-bubble">
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                            </button>
                            <div className="faq-answer-body">
                                <p className="faq-answer-text">
                                    That is completely normal. Share what you have noticed, such as customer confusion, slow handoffs, or dropped follow-ups. We will use the call to understand what needs attention first.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            {/* ═══════════════════════════════════════════════════
                 SECTION 6: MINIMALIST DIRECT STUDIO CONTACT CHANNELS
                 ═══════════════════════════════════════════════════ */}
            <section className="contact-section studio-contact-section" style={{ borderTop: '1px solid var(--border-light, #E8E4E7)', paddingBottom: '5rem' }}>
                <div className="contact-section-inner">
                    <div className="contact-section-header">
                        <span className="contact-eyebrow">Direct Channels</span>
                        <h2 className="contact-title">Reach Out Directly.</h2>
                        <p className="contact-subtitle">
                            No ticketing queues or junior gatekeepers. Every message goes directly to our lead engineers and founders.
                        </p>
                    </div>
        
                    <div className="studio-direct-deck">
                        {/* Channel 1: Email */}
                        <div className="studio-direct-card">
                            <div className="direct-card-head">
                                <span className="direct-card-label">DIRECT EMAIL</span>
                                <i className="fa-regular fa-envelope direct-card-icon"></i>
                            </div>
                            <a href="mailto:info@appvertex.in" className="direct-card-main-link">info@appvertex.in</a>
                            <p className="direct-card-note">Monitored daily. We reply within 24 hours on business days with engineering scope feedback.</p>
                        </div>
        
                        {/* Channel 2: WhatsApp & Quick Chat */}
                        <div className="studio-direct-card">
                            <div className="direct-card-head">
                                <span className="direct-card-label">WHATSAPP / QUICK CHAT</span>
                                <i className="fa-brands fa-whatsapp direct-card-icon"></i>
                            </div>
                            <a href="https://wa.me/919322971253?text=Hi%20AppVertex%21%20I%27d%20like%20to%20discuss%20a%20project." 
                               target="_blank" rel="noopener noreferrer" className="direct-card-main-link">+91 93229 71253</a>
                            <p className="direct-card-note">Direct line for quick scoping questions, urgent technical reviews, and immediate availability.</p>
                        </div>
        
                        {/* Channel 3: Studio Location */}
                        <div className="studio-direct-card">
                            <div className="direct-card-head">
                                <span className="direct-card-label">STUDIO BASE</span>
                                <i className="fa-solid fa-location-dot direct-card-icon"></i>
                            </div>
                            <div className="direct-card-main-text">Bangalore &amp; Mangaluru</div>
                            <p className="direct-card-note">Karnataka, India &bull; Operating across Indian Standard Time (IST &bull; UTC+5:30) with global client overlap.</p>
                        </div>
                    </div>
                </div>
            </section>
        
      </main>
    </div>
  );
}
