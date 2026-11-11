import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="siteFooter">
      <div className="container">
        {/* Footer 4-Column Directory */}
        <div className="footer-grid-4">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col">
            <div className="footer-brand-title">
              <img src="/logo.png" alt="AppVertex Logo" width="28" height="28" />
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
                <a href="mailto:info@appvertex.in" className="footer-link">
                  <i className="fas fa-envelope" style={{ marginRight: '6px' }}></i> info@appvertex.in
                </a>
              </li>
              <li>
                <a href="https://wa.me/919322971253" target="_blank" rel="noopener noreferrer" className="footer-link">
                  <i className="fab fa-whatsapp" style={{ marginRight: '6px' }}></i> +91 93229 71253
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  <i className="fab fa-linkedin" style={{ marginRight: '6px' }}></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <div className="footer-bottom-left">
            <p className="footer-text">© 2024 AppVertex. All rights reserved.</p>
            <span>•</span>
            <span>Built with precision &amp; modern web architectures</span>
          </div>
          <div>
            <span>Mangaluru, India · Worldwide Remote</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
