import React from 'react';
import { Link } from 'react-router-dom';
import { useStudioData } from '../context/StudioDataContext';
import { assetUrl } from '../utils/assetHelper';

export default function Footer() {
  const { settings } = useStudioData();
  const year = settings?.footerYear || '2026';
  const email = settings?.email || 'info@appvertex.in';
  const whatsapp = settings?.whatsapp || '+91 93229 71253';
  const linkedin = settings?.linkedin?.trim();
  const cleanWa = whatsapp.replace(/[^0-9]/g, '') || '919322971253';

  return (
    <footer id="siteFooter">
      <div className="container">
        {/* Desktop Directory Grid (> 768px) */}
        <div className="footer-grid-4 footer-desktop-only">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col">
            <div className="footer-brand-title">
              <img src={assetUrl('/logo.png')} alt="AppVertex Logo" width="28" height="28" />
              <span className="logo-text" style={{ fontSize: '1.25rem' }}>AppVertex</span>
            </div>
            <p className="footer-brand-desc">
              We Build Brands Online. High-performance websites, custom web apps, and dependable software solutions.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/work" className="footer-link">Selected Work</Link></li>
              <li><Link to="/process" className="footer-link">Our Process</Link></li>
              <li><Link to="/about" className="footer-link">About Studio</Link></li>
              <li><Link to="/upskill" className="footer-link">Upskill Mentorship</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links-list">
              <li><Link to="/services" className="footer-link">Website Development</Link></li>
              <li><Link to="/services" className="footer-link">Custom Web Applications</Link></li>
              <li><Link to="/services" className="footer-link">UI/UX Design</Link></li>
              <li><Link to="/services" className="footer-link">School Management Portals</Link></li>
              <li><Link to="/services" className="footer-link">E-commerce Stores</Link></li>
              <li><Link to="/services" className="footer-link">Website Maintenance</Link></li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-links-list">
              <li>
                <a href={`mailto:${email}`} className="footer-link">
                  <i className="fas fa-envelope" style={{ marginRight: '6px' }}></i> {email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer" className="footer-link">
                  <i className="fab fa-whatsapp" style={{ marginRight: '6px' }}></i> {whatsapp}
                </a>
              </li>
              {linkedin && (
                <li>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
                    <i className="fab fa-linkedin" style={{ marginRight: '6px' }}></i> LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile Micro Footer (<= 768px - Option B) */}
        <div className="footer-mobile-micro">
          <div className="footer-mobile-brand">
            <img src={assetUrl('/logo.png')} alt="AppVertex Logo" width="22" height="22" />
            <span className="logo-text">AppVertex</span>
          </div>
          <p className="footer-mobile-tagline">We Build Brands Online.</p>

          <div className="footer-mobile-socials">
            <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-mobile-social-icon">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href={`mailto:${email}`} aria-label="Email" className="footer-mobile-social-icon">
              <i className="fas fa-envelope"></i>
            </a>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-mobile-social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
          </div>

          <div className="footer-mobile-legal">
            <span>© {year} AppVertex</span>
            <span>·</span>
            <Link to="/privacy">Privacy</Link>
            <span>·</span>
            <Link to="/terms">Terms</Link>
          </div>
        </div>

        {/* Desktop Bottom Row (> 768px) */}
        <div className="footer-bottom-row footer-desktop-only">
          <div className="footer-bottom-left">
            <p className="footer-text">© {year} AppVertex. All rights reserved.</p>
            <span>•</span>
            <Link to="/privacy" className="footer-link" style={{ fontSize: '0.85rem' }}>Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="footer-link" style={{ fontSize: '0.85rem' }}>Terms of Service</Link>
          </div>
          <div>
            <span>Digital-First Studio · Worldwide Remote</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
