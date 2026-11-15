import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Terms() {
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
            TERMS &bull; CLIENT ENGAGEMENT
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Terms of Service
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Effective Date: January 1, 2026 &bull; Last Updated: November 2026
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '1.02rem' }}>
          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              1. Engagement &amp; Scope
            </h2>
            <p>
              AppVertex provides bespoke software engineering, website development, product design, and architectural consulting services. All client engagements are governed by an approved Statement of Work (SOW) or Product Requirement Document (PRD) detailing project milestones, deliverables, timelines, and commercial terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              2. Intellectual Property &amp; Code Ownership
            </h2>
            <p>
              We believe in zero vendor lock-in. Upon settlement of final milestone invoices, 100% of all bespoke source code, database architectures, digital assets, and repository ownership created specifically for the client are assigned directly to the client organization.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              3. Post-Launch Warranty
            </h2>
            <p>
              Production deployments by AppVertex include a complimentary 30-day post-launch warranty period. During this period, our engineering team remediates any functional bugs or regressions that diverge from the approved PRD specification at no additional charge. Following the 30-day warranty, ongoing maintenance is available via an Annual Maintenance Contract (AMC).
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              4. Client Responsibilities
            </h2>
            <p>
              Timely project delivery requires active client collaboration, including the provision of domain access credentials, third-party API keys (e.g. payment gateways), required branding copy, and milestone feedback within agreed sprint review windows.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              5. Governing Law
            </h2>
            <p>
              These terms and any commercial contracts entered into with AppVertex shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Karnataka.
            </p>
          </section>

          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <Link to="/" className="btn btn-secondary">Return Home</Link>
            <Link to="/contact" className="btn btn-primary">Book a Discovery Call <span className="arr">→</span></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
