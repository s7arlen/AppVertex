import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PrivacyPolicy() {
  useScrollReveal();

  return (
    <main id="mainContent" style={{ paddingTop: 'calc(72px + 2.5rem)', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: '800',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#EF870D',
              display: 'inline-block',
              marginBottom: '0.75rem'
            }}
          >
            LEGAL COMPLIANCE &bull; PRIVACY NOTICE
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Effective Date: January 1, 2026 &bull; Last Updated: November 2026
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '1.02rem' }}>
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              1. Overview &amp; Data Controller
            </h2>
            <p>
              AppVertex (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;studio&rdquo;) operates as an independent digital engineering studio based in Mangaluru, Karnataka, India. This Privacy Policy outlines how we collect, process, and safeguard information submitted through our website and intake channels, in compliance with India&rsquo;s Digital Personal Data Protection Act (DPDPA 2023) and international data protection standards.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              2. Information We Collect
            </h2>
            <p>We only collect personal information that you voluntarily provide to us when contacting our studio or applying for mentorship:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Contact &amp; Discovery Inquiries:</strong> Name, work email address, telephone/WhatsApp number, company name, service requirement, estimated budget, and project overview.</li>
              <li><strong>Mentorship Applications:</strong> Name, email address, telephone/WhatsApp number, preferred track, and current experience background.</li>
              <li><strong>Technical &amp; Telemetry Data:</strong> Non-personally identifiable browser preferences (such as light/dark mode preference stored locally) to provide a consistent visual experience.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              3. Purpose of Processing
            </h2>
            <p>We process your submitted data exclusively for legitimate business communication:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>To evaluate project feasibility and respond to your inquiry within 24 hours.</li>
              <li>To schedule technical discovery calls via Google Calendar / Google Meet.</li>
              <li>To review candidate suitability for mentorship cohorts.</li>
              <li>We <strong>never sell, lease, or monetize</strong> your personal contact information to third-party advertisers or brokers.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              4. Data Retention &amp; Security
            </h2>
            <p>
              Your inquiries and application records are stored securely using encrypted cloud infrastructure. We retain communication history only for as long as necessary to conduct active project scoping or maintain business relationships. You may request deletion of your records at any time by contacting us directly.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              5. Your Rights &amp; Contact Information
            </h2>
            <p>
              Under applicable data protection legislation, you have the right to access, rectify, or request deletion of your personal data. For any data inquiries or privacy-related requests, please contact our lead data coordinator:
            </p>
            <div style={{ marginTop: '1rem', padding: '1.25rem', background: 'var(--surface-raised, #FAF8F5)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-primary)' }}>AppVertex Privacy Office</p>
              <p style={{ margin: '4px 0', fontSize: '0.92rem' }}>Mangaluru, Karnataka, India</p>
              <p style={{ margin: 0, fontSize: '0.92rem' }}>
                Email: <a href="mailto:info@appvertex.in" style={{ color: '#EF870D', textDecoration: 'underline' }}>info@appvertex.in</a>
              </p>
            </div>
          </section>

          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link to="/" className="btn btn-secondary">Return Home</Link>
            <Link to="/contact" className="btn btn-primary">Contact Studio <span className="arr">→</span></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
