import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main id="mainContent" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 80px' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: '800',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#EF870D',
            background: 'rgba(239, 135, 13, 0.08)',
            border: '1px solid rgba(239, 135, 13, 0.2)',
            padding: '6px 16px',
            borderRadius: '9999px',
            display: 'inline-block',
            marginBottom: '1.5rem'
          }}
        >
          404 ERROR
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.15 }}>
          Page not found.
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            RETURN HOME <span className="arr">→</span>
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            CONTACT STUDIO
          </Link>
        </div>
      </div>
    </main>
  );
}
