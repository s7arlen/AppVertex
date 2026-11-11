import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      document.body.classList.toggle('scrolled', isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('scrolled');
    };
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Close drawer on route change or ESC
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SERVICES', path: '/services' },
    { label: 'WORK', path: '/work' },
    { label: 'PROCESS', path: '/process' },
    { label: 'ABOUT', path: '/about' },
    { label: 'UPSKILL', path: '/upskill' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/index.html';
    }
    return (
      location.pathname === path ||
      location.pathname === `${path}.html` ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <>
      <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="nav-inner">
            {/* Brand Logo: logo.png (32px) + AppVertex text */}
            <Link to="/" className="brand-logo" aria-label="AppVertex Home">
              <img src="/logo.png" alt="AppVertex Logo" className="brand-logo-img" width="32" height="32" />
              <span className="logo-text">AppVertex</span>
            </Link>

            {/* Desktop Navigation Menu */}
            <nav className="nav-menu" aria-label="Main Navigation">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions: Dark Mode Toggle + Book a Call CTA */}
            <div className="header-actions">
              <button
                className="theme-toggle-btn"
                id="themeToggle"
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
              >
                <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`} id="themeIcon"></i>
              </button>
              {location.pathname === '/' || location.pathname === '/index.html' ? (
                <a href="#contact" className="nav-cta-btn">Book a Call</a>
              ) : (
                <Link to="/contact" className="nav-cta-btn">Book a Call</Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className={`hamburger-btn ${drawerOpen ? 'open active' : ''}`}
              id="mobileMenuBtn"
              aria-label="Toggle Navigation Menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Glass Island Mobile Navigation */}
      <div
        className={`mobile-island-overlay ${drawerOpen ? 'open' : ''}`}
        id="mobileDrawerOverlay"
        onClick={(e) => {
          if (e.target.id === 'mobileDrawerOverlay') setDrawerOpen(false);
        }}
      >
        <div className={`mobile-glass-island ${drawerOpen ? 'open' : ''}`} id="mobileDrawer">
          {/* Clean Studio Header */}
          <div className="island-header">
            <div className="island-brand">
              <img src="/logo.png" alt="AppVertex Logo" width="24" height="24" className="island-logo-img" />
              <span className="island-brand-name">AppVertex</span>
            </div>
            <button
              className="island-close-btn"
              id="mobileDrawerClose"
              aria-label="Close Navigation Menu"
              onClick={() => setDrawerOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Clean Navigation Links (Tab Names Only) */}
          <div className="island-menu-list">
            {navLinks.map((item, idx) => (
              <Link
                key={item.label}
                to={item.path}
                className={`island-menu-item ${isActive(item.path) ? 'active' : ''}`}
                style={{ '--delay': `${idx * 24}ms` }}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="island-item-title">{item.label}</span>
                {isActive(item.path) && <span className="island-active-dot"></span>}
              </Link>
            ))}
          </div>

          {/* Studio Action Row */}
          <div className="island-footer">
            <div className="island-footer-actions">
              <button
                className="island-theme-toggle"
                id="drawerThemeToggle"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`} id="drawerThemeIcon"></i>
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>

              {location.pathname === '/' || location.pathname === '/index.html' ? (
                <a
                  href="#contact"
                  className="btn btn-primary island-cta-btn"
                  onClick={() => setDrawerOpen(false)}
                >
                  Book a Call <span className="arr">→</span>
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="btn btn-primary island-cta-btn"
                  onClick={() => setDrawerOpen(false)}
                >
                  Book a Call <span className="arr">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
