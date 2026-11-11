import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import CustomSelect from '../components/CustomSelect';
import UniqueTestimonials from '../components/UniqueTestimonials';

const SERVICE_OPTIONS = [
  { value: 'Website Development', label: 'Website Development' },
  { value: 'Custom Web Applications', label: 'Custom Web Applications' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Branding & Digital Identity', label: 'Branding & Digital Identity' },
  { value: 'School Management Portals', label: 'School Management Portals' },
  { value: 'E-commerce Development', label: 'E-commerce Development' },
  { value: 'SEO & Digital Growth', label: 'SEO & Digital Growth' },
  { value: 'Website Maintenance', label: 'Website Maintenance & Support' },
];

const BUDGET_OPTIONS = [
  { value: 'Flexible', label: 'Select budget range...' },
  { value: 'Under 25k', label: 'Under ₹25,000' },
  { value: '25k-50k', label: '₹25,000 – ₹50,000' },
  { value: '50k-100k', label: '₹50,000 – ₹1,00,000' },
  { value: '100k+', label: '₹1,00,000+' },
];

const DEFAULT_PROJECTS = [
  {
    id: 'loretto-central-school',
    title: 'Loretto Central School',
    name: 'Loretto Central School',
    category: 'Education Portal',
    categoryLabel: 'Education Portal',
    description: 'A complete school management portal with admissions, circulars and parent communication built for Loretto Central School.',
    previewImage: 'hero-rosewood-showcase.png',
    image: 'hero-rosewood-showcase.png',
    technologies: ['HTML/CSS', 'Firebase', 'JavaScript'],
    liveUrl: 'https://lorettocentralschool.edu.in',
    link: 'https://lorettocentralschool.edu.in',
    caseStudyUrl: '#contact',
    altText: 'Loretto Central School portal showcase',
    year: '2026',
    urlDisplay: 'lorettocentral.in'
  },
  {
    id: 'vimasneha',
    title: 'Vimasneha Trust',
    name: 'Vimasneha Trust',
    category: 'Non-Profit Website',
    categoryLabel: 'Non-Profit Website',
    description: 'A clean, accessible website for Vimasneha trust showcasing their social initiatives and enabling donations.',
    previewImage: 'hero-floating-phones-transparent.png',
    image: 'hero-floating-phones-transparent.png',
    technologies: ['HTML/CSS', 'JavaScript'],
    liveUrl: 'https://vimasneha.org',
    link: 'https://vimasneha.org',
    caseStudyUrl: '#contact',
    altText: 'Vimasneha non-profit website preview',
    year: '2025',
    urlDisplay: 'vimasneha.org'
  },
  {
    id: 'appvertex-studio',
    title: 'AppVertex Studio',
    name: 'AppVertex Studio',
    category: 'Digital Agency',
    categoryLabel: 'Digital Agency',
    description: "Our own studio website — a showcase of AppVertex's capabilities, services and portfolio.",
    previewImage: 'hero-devices.png',
    image: 'hero-devices.png',
    technologies: ['HTML/CSS', 'Firebase'],
    liveUrl: 'https://s7arlen.github.io/AppVertex/',
    link: 'https://s7arlen.github.io/AppVertex/',
    caseStudyUrl: '#about',
    altText: 'AppVertex Studio showcase preview',
    year: '2024',
    urlDisplay: 'appvertex.in'
  }
];

export default function Home() {
  useScrollReveal();

  // Metrics counter animation
  const [metricsAnimated, setMetricsAnimated] = useState(false);
  const [counts, setCounts] = useState({ founder: 100, ownership: 100 });
  const metricsRef = useRef(null);

  useEffect(() => {
    if (!metricsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !metricsAnimated) {
          setMetricsAnimated(true);
          const duration = 1800;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounts({
              founder: Math.round(ease * 100),
              ownership: Math.round(ease * 100)
            });
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, [metricsAnimated]);

  // 3D Fan Carousel State
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const stageRef = useRef(null);
  const dragInfoRef = useRef({ isDragging: false, startX: 0, hasMoved: false });

  // Sync projects from localStorage or BroadcastChannel
  useEffect(() => {
    try {
      const cached = localStorage.getItem('appvertex_projects');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      }
    } catch (e) {}

    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('appvertex_sync');
      channel.onmessage = (e) => {
        if (e.data && (e.data.type === 'PROJECTS_UPDATED' || e.data.type === 'FULL_SYNC') && Array.isArray(e.data.projects)) {
          setProjects(e.data.projects);
        }
      };
      return () => channel.close();
    }
  }, []);

  // Autoplay for 3D Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!dragInfoRef.current.isDragging && !isAnimating && !document.hidden) {
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [projects.length, isAnimating]);

  const goToProject = (idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((idx + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const currentProject = projects[activeIndex] || projects[0];

  // Services Scroll Stack logic
  const stackRef = useRef(null);
  useEffect(() => {
    const inner = stackRef.current;
    if (!inner) return;
    const slots = Array.from(inner.querySelectorAll('[data-stack-slot]'));
    if (!slots.length) return;

    const handleScroll = () => {
      const stackTop = window.innerWidth <= 900 ? 84 : 110;
      const tops = slots.map((s) => s.getBoundingClientRect().top);
      const heights = slots.map((s) => s.offsetHeight || 420);

      slots.forEach((slot, i) => {
        const card = slot.firstElementChild;
        if (!card) return;

        let covered = 0;
        if (i < slots.length - 1) {
          const nextTop = tops[i + 1];
          const span = heights[i] || 420;
          const overlap = stackTop + span - nextTop;
          covered = Math.min(1, Math.max(0, overlap / span));
        }

        const scale = 1 - covered * 0.05;
        const opacity = covered > 0.8 ? Math.max(0, (1 - covered) / 0.2) : 1;

        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.opacity = opacity.toFixed(3);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Quick Lead Contact Form Handling
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Website Development',
    budget: 'Flexible',
    message: '',
    website: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (formData.website.trim() !== '') return; // honeypot

    setSubmitting(true);
    setSubmitStatus(null);

    const newInq = {
      id: 'inq-' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: '',
      company: '',
      service: formData.service || 'Custom Software / Web',
      budget: formData.budget || 'Flexible',
      message: `Project Type: ${formData.service}\nBudget: ${formData.budget}\n\nDetails:\n${formData.message.trim()}`,
      date: 'Just now',
      status: 'unread'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('appvertex_inquiries') || '[]');
      existing.unshift(newInq);
      localStorage.setItem('appvertex_inquiries', JSON.stringify(existing));

      if ('BroadcastChannel' in window) {
        const syncChannel = new BroadcastChannel('appvertex_sync');
        syncChannel.postMessage({ type: 'NEW_INQUIRY', data: newInq });
        syncChannel.close();
      }

      const response = await fetch('https://us-central1-appvertex-e09c8.cloudfunctions.net/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newInq.name,
          email: newInq.email,
          message: newInq.message,
          website: ''
        })
      });

      if (!response.ok) {
        throw new Error(`Contact notification failed with status ${response.status}`);
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        service: 'Website Development',
        budget: 'Flexible',
        message: '',
        website: ''
      });
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch (err) {
      console.warn('Contact notification delivery error:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  const servicesData = [
    {
      num: '01',
      badge: 'Web Development',
      title: 'Website Development',
      desc: 'Fast, modern websites designed to turn visitors into clients. Built with seamless mobile responsiveness, SEO best practices, and effortless content management.',
      url: 'appvertex.in/web-development',
      img: '/services/srv-web-design.jpg',
      alt: 'Website Development Agency Landing Page',
      slotZ: 1
    },
    {
      num: '02',
      badge: 'Custom Software',
      title: 'Custom Web Applications',
      desc: 'Tailored web platforms, client portals, and workflow tools designed around how your business actually runs. Automate repetitive tasks and give your team reliable tools.',
      url: 'appvertex.in/cloud-apps',
      img: '/services/srv-custom-web-apps.jpg',
      alt: 'Custom Web Application SaaS Dashboard Interface',
      slotZ: 2
    },
    {
      num: '03',
      badge: 'Product Design',
      title: 'UI/UX Design',
      desc: 'Intuitive, clean interfaces built to guide users effortlessly from their first click to checkout or inquiry. We turn complicated workflows into simple, elegant digital products.',
      url: 'appvertex.in/ui-ux-design',
      img: '/services/srv-ui-ux.jpg',
      alt: 'UI/UX Product Design Wireframing and Prototyping',
      slotZ: 3
    },
    {
      num: '04',
      badge: 'Brand Identity',
      title: 'Branding & Digital Identity',
      desc: 'Memorable visual identities that help your business stand out and build immediate trust with your audience across web, print, and social media.',
      url: 'appvertex.in/brand-identity',
      img: '/services/srv-brand-identity.jpg',
      alt: 'Brand Identity and Typography Guidelines',
      slotZ: 4
    },
    {
      num: '05',
      badge: 'Education Portals',
      title: 'School Management Portals',
      desc: 'Comprehensive institutional portals that bring student admissions, fee payments, attendance tracking, and parent communication into one secure, unified system.',
      url: 'lorettocentralschool.edu.in',
      img: '/services/srv-school-portal.jpg',
      alt: 'Institutional Academic School Management Portal',
      slotZ: 5
    },
    {
      num: '06',
      badge: 'E-Commerce',
      title: 'E-commerce Development',
      desc: 'Fast, friction-free online stores designed to boost conversions. From quick product discovery to smooth one-click checkout and automated inventory management.',
      url: 'appvertex.in/ecommerce-engine',
      img: '/services/srv-ecommerce.jpg',
      alt: 'Headless E-Commerce Digital Storefront',
      slotZ: 6
    },
    {
      num: '07',
      badge: 'Search Optimization',
      title: 'SEO & Digital Growth',
      desc: 'Targeted search optimization and technical speed tuning that help your business rank higher on Google and attract high-intent local and global customers.',
      url: 'appvertex.in/growth-engine',
      img: '/services/srv-seo.jpg',
      alt: 'SEO Performance and Growth Telemetry',
      slotZ: 7
    },
    {
      num: '08',
      badge: 'Support & Care',
      title: 'Website Maintenance',
      desc: 'Peace of mind for your online presence. We handle regular security patches, automated cloud backups, uptime monitoring, and fast support when you need updates.',
      url: 'appvertex.in/maintenance-sre',
      img: '/services/srv-maintenance.jpg',
      alt: '24/7 Cloud Server Uptime and Maintenance Telemetry',
      slotZ: 8,
      isLast: true
    }
  ];

  return (
    <main>
      {/* ═══════════════════════════════════════════════════
           SECTION C: HERO SECTION
           ═══════════════════════════════════════════════════ */}
      <section id="hero" className="hero-anidea-section" aria-label="Hero Overview">
        <div className="container hero-container">
          <div className="hero-headline-group">
            <span className="hero-line hero-line-top">WE BUILD</span>
            <h1 className="hero-line hero-line-main">DEPENDABLE SYSTEMS</h1>
            <span className="hero-line hero-line-bottom">FOR GROWING BUSINESSES.</span>
          </div>

          <div className="hero-info-panel">
            <div className="hero-info-left">
              <p className="hero-desc">
                Websites and custom software built around the way your business works. Customers find what they need without confusion, and your team gets reliable tools to handle daily orders, inquiries, and handoffs.
              </p>
              <p className="hero-subnote">
                A first conversation to understand the situation before deciding what to build.
              </p>
            </div>
            <div className="hero-info-right">
              <a href="#contact" className="hero-btn-pill-primary">
                <span>Book Discovery Call</span>
                <span className="hero-btn-arrow-circle" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
              <a href="#process" className="hero-btn-pill-secondary">
                <span>Our Process</span>
              </a>
            </div>
          </div>

          <div id="metrics" ref={metricsRef} className="hero-metrics-grid">
            <div className="hero-stat-item">
              <span className="hero-stat-num metric-number">{counts.founder}%</span>
              <span className="hero-stat-label">FOUNDER-LED</span>
              <span className="hero-stat-sub">Zero junior handoffs</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-num metric-number">&lt;1s</span>
              <span className="hero-stat-label">MEDIAN LOAD SPEED</span>
              <span className="hero-stat-sub">Sub-second performance</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-num metric-number">24h</span>
              <span className="hero-stat-label">RESPONSE TIME</span>
              <span className="hero-stat-sub">Direct builder communication</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-num metric-number">{counts.ownership}%</span>
              <span className="hero-stat-label">CODE OWNERSHIP</span>
              <span className="hero-stat-sub">Zero vendor lock-in</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SECTION E: SERVICES SECTION (8 SERVICES)
           ═══════════════════════════════════════════════════ */}
      <section id="services" aria-label="Our Services">
        <div className="container">
          <div className="services-header-split reveal-on-scroll">
            <div className="services-header-left">
              <p className="section-eyebrow">WHAT WE BUILD</p>
              <h2 className="section-title">
                Services that drive<br />
                <span className="accent-text">real results.</span>
              </h2>
            </div>
            <div className="services-header-right">
              <p className="section-subtitle">
                From conversion-focused websites to bespoke software systems, we build digital infrastructure tailored to how your business actually runs.
              </p>
              <Link to="/services" className="editorial-link" style={{ marginTop: '16px' }}>
                EXPLORE ALL SERVICES <span className="arr">→</span>
              </Link>
            </div>
          </div>

          <div className="scroll-stack scroll-stack--window" id="servicesScrollStack">
            <div className="scroll-stack__inner" id="servicesStackInner" ref={stackRef}>
              {servicesData.map((item) => (
                <div
                  key={item.num}
                  className="scroll-stack__slot"
                  data-stack-slot
                  style={{
                    top: '110px',
                    marginBottom: item.isLast ? '60px' : '260px',
                    zIndex: item.slotZ
                  }}
                >
                  <div className="scroll-stack-card service-stack-card">
                    <div className="service-stack-card__header">
                      <div className="service-stack-meta">
                        <span className="service-stack-num">{item.num}</span>
                        <span className="service-stack-badge">{item.badge}</span>
                      </div>
                    </div>
                    <div className="service-stack-card__body">
                      <div className="service-stack-main">
                        <h3 className="service-stack-title">{item.title}</h3>
                        <p className="service-stack-desc">{item.desc}</p>
                        <div className="service-stack-actions">
                          <a href="#contact" className="btn btn-primary btn-sm">
                            Start a Project <span className="arr">→</span>
                          </a>
                          <Link to="/services" className="btn btn-secondary btn-sm">
                            View Details
                          </Link>
                        </div>
                      </div>
                      <div className="service-stack-browser-frame">
                        <div className="service-browser-topbar">
                          <div className="service-browser-dots">
                            <span className="s-dot s-dot-red"></span>
                            <span className="s-dot s-dot-yellow"></span>
                            <span className="s-dot s-dot-green"></span>
                          </div>
                          <div className="service-browser-address">
                            <i className="fa-solid fa-lock"></i>
                            <span>{item.url}</span>
                          </div>
                        </div>
                        <div className="service-browser-viewport">
                          <img
                            src={item.img}
                            alt={item.alt}
                            loading="lazy"
                            className="service-browser-img"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="scroll-stack-card__shade" aria-hidden="true"></span>
                  </div>
                </div>
              ))}
              <div className="scroll-stack__end" id="servicesStackEnd" style={{ height: '220px' }} aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SECTION F: PORTFOLIO / SELECTED WORK (3D FAN CAROUSEL)
           ═══════════════════════════════════════════════════ */}
      <section id="projects" aria-label="Selected Projects">
        <div className="container">
          <div className="projects-editorial-header reveal-on-scroll">
            <div className="projects-meta-bar">
              <p className="section-eyebrow">SELECTED WORK</p>
              <div className="projects-counter-badge" aria-live="polite">
                <span className="counter-prefix">PROJECT</span>
                <span className="counter-curr" id="projectCounterCurrent">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="counter-divider">/</span>
                <span className="counter-total" id="projectCounterTotal">
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            </div>
            <div className="projects-editorial-intro">
              <h2 className="section-title">
                Engineered with purpose,<br />
                <span className="accent-text">designed to convert.</span>
              </h2>
              <p className="section-subtitle">Real digital products shipped for forward-thinking clients.</p>
            </div>
          </div>

          {/* 3D Fan Carousel Stage */}
          <div
            className="fan-carousel-stage"
            id="fanCarouselStage"
            ref={stageRef}
            tabIndex={0}
            role="region"
            aria-label="Interactive 3D Fan Carousel of Projects"
            onMouseDown={(e) => {
              dragInfoRef.current = { isDragging: true, startX: e.clientX, hasMoved: false };
            }}
            onMouseMove={(e) => {
              if (!dragInfoRef.current.isDragging) return;
              if (Math.abs(e.clientX - dragInfoRef.current.startX) > 8) {
                dragInfoRef.current.hasMoved = true;
              }
            }}
            onMouseUp={(e) => {
              if (!dragInfoRef.current.isDragging) return;
              dragInfoRef.current.isDragging = false;
              if (dragInfoRef.current.hasMoved) {
                const deltaX = e.clientX - dragInfoRef.current.startX;
                if (deltaX < -45) goToProject(activeIndex + 1);
                else if (deltaX > 45) goToProject(activeIndex - 1);
              }
            }}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                dragInfoRef.current = { isDragging: true, startX: e.touches[0].clientX, hasMoved: false };
              }
            }}
            onTouchEnd={(e) => {
              if (e.changedTouches.length > 0) {
                const deltaX = e.changedTouches[0].clientX - dragInfoRef.current.startX;
                if (Math.abs(deltaX) > 35) {
                  if (deltaX < 0) goToProject(activeIndex + 1);
                  else goToProject(activeIndex - 1);
                }
              }
              dragInfoRef.current.isDragging = false;
            }}
          >
            <div className="fan-deck" id="fanDeck">
              {projects.map((proj, idx) => {
                const total = projects.length;
                let offset = idx - activeIndex;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const absOffset = Math.abs(offset);
                const dir = offset < 0 ? -1 : offset > 0 ? 1 : 0;
                const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
                const isTablet = typeof window !== 'undefined' && window.innerWidth <= 1024 && !isMobile;

                let cardTransform = 'translate3d(0, 0, 0) rotateZ(0deg) scale(1)';
                let zIdx = '20';
                let opacity = '1';
                let visibility = 'visible';
                let pointerEvents = 'auto';

                if (offset === 0) {
                  cardTransform = 'translate3d(0, 0, 0) rotateZ(0deg) scale(1)';
                  zIdx = '20';
                  opacity = '1';
                } else if (absOffset === 1) {
                  const x = isMobile ? dir * 115 : isTablet ? dir * 180 : dir * 240;
                  const y = isMobile ? 16 : 24;
                  const z = isMobile ? -50 : -70;
                  const rot = isMobile ? dir * 5.5 : dir * 9;
                  const sc = isMobile ? 0.88 : 0.92;
                  cardTransform = `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rot}deg) scale(${sc})`;
                  zIdx = '15';
                  opacity = '0.94';
                } else {
                  const x = isMobile ? dir * 160 : isTablet ? dir * 220 : dir * 280;
                  cardTransform = `translate3d(${x}px, 40px, -150px) scale(0.75)`;
                  zIdx = '5';
                  opacity = '0';
                  visibility = 'hidden';
                  pointerEvents = 'none';
                }

                return (
                  <div
                    key={proj.id || idx}
                    className={`fan-card ${offset === 0 ? 'is-active' : ''}`}
                    data-index={idx}
                    role="group"
                    aria-label={`${proj.title || proj.name || 'Featured Project'} project preview`}
                    tabIndex={0}
                    style={{
                      transform: cardTransform,
                      zIndex: zIdx,
                      opacity: opacity,
                      visibility: visibility,
                      pointerEvents: pointerEvents
                    }}
                    onClick={() => {
                      if (dragInfoRef.current.hasMoved) return;
                      if (idx !== activeIndex) {
                        goToProject(idx);
                      } else if (proj.liveUrl && /^https?:\/\//i.test(proj.liveUrl)) {
                        window.open(proj.liveUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (idx !== activeIndex) goToProject(idx);
                        else if (proj.liveUrl && /^https?:\/\//i.test(proj.liveUrl)) {
                          window.open(proj.liveUrl, '_blank', 'noopener,noreferrer');
                        }
                      }
                    }}
                  >
                    <div className="fan-card-chrome">
                      <div className="browser-dots" aria-hidden="true">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                      <div className="browser-address-bar">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>{proj.urlDisplay || 'appvertex.in'}</span>
                      </div>
                      <span className="card-year-badge">{proj.year || '2026'}</span>
                    </div>
                    <div className="fan-card-preview">
                      <img
                        src={proj.previewImage || 'hero-devices.png'}
                        alt={proj.altText || proj.title || proj.name || 'Featured Project'}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = '/hero-devices.png'; }}
                      />
                    </div>
                    <div className="fan-card-caption">
                      <span className="fan-card-cat">{proj.category || proj.categoryLabel || 'Web Solution'}</span>
                      <span className="fan-card-title">{proj.title || proj.name || 'Featured Project'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Synchronized Project Information Panel */}
          <div className="project-info-stage reveal-on-scroll" id="projectInfoStage" aria-live="polite">
            <div className="project-info-top">
              <span className="project-info-category" id="projectInfoCategory">
                {currentProject?.category || currentProject?.categoryLabel || 'Web Solution'}
              </span>
              <div className="project-info-tech" id="projectInfoTech">
                {(currentProject?.technologies || []).map((t, i) => (
                  <span key={i} className="fan-tech-pill">{t}</span>
                ))}
              </div>
            </div>
            <h3 className="project-info-title" id="projectInfoTitle">
              {currentProject?.title || currentProject?.name || 'Featured Project'}
            </h3>
            <p className="project-info-desc" id="projectInfoDesc">
              {currentProject?.description || 'Engineered with precision, speed, and clean code.'}
            </p>
            <div className="project-info-actions">
              <a
                href={currentProject?.liveUrl || '#contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="fan-action-btn fan-action-primary"
                id="fanPrimaryBtn"
              >
                <span>View Live Project</span>
                <i className="fa-solid fa-arrow-up-right-from-square arr" aria-hidden="true"></i>
              </a>
              <a
                href={currentProject?.caseStudyUrl || '#contact'}
                className="fan-action-btn fan-action-secondary"
                id="fanSecondaryBtn"
              >
                <span>Start Similar Project</span>
                <i className="fa-solid fa-arrow-right arr" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Fan Pagination Indicators */}
          <div className="fan-pagination-row" id="fanPaginationRow" role="tablist" aria-label="Select project">
            {projects.map((proj, idx) => (
              <button
                key={proj.id || idx}
                className={`fan-page-dot ${idx === activeIndex ? 'active' : ''}`}
                aria-label={`Go to project ${idx + 1}: ${proj.title || proj.name || 'Featured Project'}`}
                onClick={() => goToProject(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SECTION G: ABOUT APPVERTEX
           ═══════════════════════════════════════════════════ */}
      <section id="about" aria-label="About AppVertex">
        <div className="about-bg-text" aria-hidden="true">STUDIO</div>
        <div className="container">
          <div className="about-split-layout">
            <div className="about-split-left reveal-on-scroll">
              <p className="section-eyebrow"><span className="dash"></span> ABOUT APPVERTEX</p>
              <h2 className="section-title">
                Built by creators,<br />
                <span className="accent-text">for creators.</span>
              </h2>
              <p className="about-manifesto-text">
                We're <strong>AppVertex</strong> — an independent app studio founded by two friends obsessed with making the internet work better for small businesses. Quality software, honest pricing, and direct collaboration from day one.
              </p>
              <a href="#contact" className="editorial-link">
                GET IN TOUCH <span className="arr">→</span>
              </a>
            </div>

            <div className="about-split-right reveal-on-scroll">
              <p className="section-eyebrow who-we-are-eyebrow"><span className="dash"></span> WHO WE ARE</p>
              <div className="founder-card">
                <span className="founder-role">FOUNDER &amp; LEAD DEVELOPER</span>
                <h3 className="founder-name">Leston Coelho</h3>
                <p className="founder-bio">
                  Turning ideas into elegant code. Leston leads development ensuring every site is fast, scalable, and built to last.
                </p>
                <a href="mailto:leston@appvertex.in" className="founder-email">leston@appvertex.in</a>
              </div>

              <div className="founder-card">
                <span className="founder-role">CO-FOUNDER &amp; CREATIVE DIRECTOR</span>
                <h3 className="founder-name">Lenstar Monteiro</h3>
                <p className="founder-bio">
                  Where design meets strategy. Lenstar crafts interfaces that are both beautiful and intuitive.
                </p>
                <a href="mailto:lenstar@appvertex.in" className="founder-email">lenstar@appvertex.in</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SECTION H: OUR PROCESS (4 STEPS)
           ═══════════════════════════════════════════════════ */}
      <section id="process">
        <div className="container">
          <div className="services-header-split reveal-on-scroll" style={{ marginBottom: 0 }}>
            <div>
              <p className="section-eyebrow">OUR PROCESS</p>
              <h2 className="section-title">
                From raw idea to<br />
                <span className="accent-text">dependable system.</span>
              </h2>
            </div>
            <div>
              <p className="section-subtitle">
                A clear, disciplined roadmap that keeps you completely aligned at every milestone without surprises.
              </p>
            </div>
          </div>

          <div className="process-pipeline-container">
            <div className="process-pipeline-track" aria-hidden="true">
              <div className="process-track-line"></div>
              <div className="process-track-milestones">
                <div className="process-milestone" data-step="1"><span className="process-milestone-disc">01</span></div>
                <div className="process-milestone" data-step="2"><span className="process-milestone-disc">02</span></div>
                <div className="process-milestone" data-step="3"><span className="process-milestone-disc">03</span></div>
                <div className="process-milestone" data-step="4"><span className="process-milestone-disc">04</span></div>
              </div>
            </div>

            <div className="process-grid-4">
              <div className="process-step-item reveal-on-scroll" data-step="1">
                <div className="process-step-top">
                  <span className="process-step-num-mobile">01</span>
                  <h3 className="process-step-title">Discover</h3>
                  <i className="fas fa-comments process-step-icon" aria-hidden="true"></i>
                </div>
                <p className="process-step-desc">
                  We learn how your business actually operates — the real workflows, not the ideal ones.
                </p>
              </div>

              <div className="process-step-item reveal-on-scroll" data-step="2">
                <div className="process-step-top">
                  <span className="process-step-num-mobile">02</span>
                  <h3 className="process-step-title">Design</h3>
                  <i className="fas fa-pen-ruler process-step-icon" aria-hidden="true"></i>
                </div>
                <p className="process-step-desc">
                  We map the user journey and build a prototype that your team can react to before we write code.
                </p>
              </div>

              <div className="process-step-item reveal-on-scroll" data-step="3">
                <div className="process-step-top">
                  <span className="process-step-num-mobile">03</span>
                  <h3 className="process-step-title">Build</h3>
                  <i className="fas fa-code process-step-icon" aria-hidden="true"></i>
                </div>
                <p className="process-step-desc">
                  Clean, maintainable code. No bloat. We build what's needed and nothing that isn't.
                </p>
              </div>

              <div className="process-step-item reveal-on-scroll" data-step="4">
                <div className="process-step-top">
                  <span className="process-step-num-mobile">04</span>
                  <h3 className="process-step-title">Launch &amp; Support</h3>
                  <i className="fas fa-rocket process-step-icon" aria-hidden="true"></i>
                </div>
                <p className="process-step-desc">
                  We deploy, monitor, and stay available. Fast fixes, honest communication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SECTION I: OUR METHOD
           ═══════════════════════════════════════════════════ */}
      <section id="method">
        <div className="container">
          <div className="services-header-split reveal-on-scroll" style={{ marginBottom: 0 }}>
            <div>
              <p className="section-eyebrow">OUR METHOD</p>
              <h2 className="section-title">
                Why we work differently from<br />
                <span className="accent-text">typical agencies.</span>
              </h2>
            </div>
            <div>
              <p className="section-subtitle">
                We don't hand over templates and vanish. Here is how we ensure your software creates real business value.
              </p>
            </div>
          </div>

          <div className="method-grid">
            <div className="method-card reveal-on-scroll">
              <span className="method-num">01 / DIAGNOSIS</span>
              <h3 className="method-card-title">We diagnose before we build</h3>
              <p className="method-card-desc">
                Most agencies skip discovery. We spend real time understanding the problem before writing a line of code.
              </p>
            </div>

            <div className="method-card reveal-on-scroll">
              <span className="method-num">02 / USABILITY</span>
              <h3 className="method-card-title">We build for real use</h3>
              <p className="method-card-desc">
                Software that your team fights against is worse than no software. We build tools your people will actually use.
              </p>
            </div>

            <div className="method-card reveal-on-scroll">
              <span className="method-num">03 / COMMITMENT</span>
              <h3 className="method-card-title">We stay after launch</h3>
              <p className="method-card-desc">
                We're not a hand-off studio. We stick around, respond fast, and keep your systems running.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
           SECTION J: BESPOKE ASYMMETRIC TESTIMONIALS
           ═══════════════════════════════════════════════════ */}
      <UniqueTestimonials />

      {/* ═══════════════════════════════════════════════════
           SECTION K: CONTACT / DISCOVERY CALL SECTION
           ═══════════════════════════════════════════════════ */}
      <section id="contact">
        <div className="container">
          <div className="contact-grid-split">
            <div className="contact-info-col reveal-on-scroll">
              <p className="section-eyebrow">GET IN TOUCH</p>
              <h2 className="section-title">
                Ready to build something<br />
                <span className="accent-text">that works?</span>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '24px' }}>
                Tell us about your business and what you're trying to solve. We'll come back with an honest assessment and a clear plan.
              </p>

              <a href="mailto:info@appvertex.in" className="contact-direct-card">
                <div className="contact-direct-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <span className="contact-direct-label">DIRECT EMAIL</span>
                  <span className="contact-direct-val">info@appvertex.in</span>
                </div>
              </a>

              <a
                href="https://wa.me/919322971253?text=Hi%20AppVertex%21%20I%27m%20interested%20in%20building%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-card"
              >
                <div className="contact-direct-icon" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <span className="contact-direct-label">WHATSAPP CHAT</span>
                  <span className="contact-direct-val">+91 93229 71253</span>
                </div>
              </a>
            </div>

            <div className="contact-card reveal-on-scroll">
              <form id="contactForm" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">Your Name</label>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">Email Address</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="jane@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactService">Service / Project Type</label>
                  <CustomSelect
                    id="contactService"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    options={SERVICE_OPTIONS}
                    placeholder="Select service..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactBudget">Estimated Budget (Optional)</label>
                  <CustomSelect
                    id="contactBudget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    options={BUDGET_OPTIONS}
                    placeholder="Select budget range..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactMessage">Project Overview</label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control"
                    rows={4}
                    placeholder="Tell us about your business, what you're trying to achieve, and desired timelines..."
                    required
                  />
                </div>

                {/* Bot Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  id="contactBtn"
                  className="form-submit-btn"
                  disabled={submitting}
                  style={
                    submitStatus === 'success'
                      ? { backgroundColor: '#10B981', borderColor: '#10B981' }
                      : {}
                  }
                >
                  <span>
                    {submitting
                      ? 'SENDING PROPOSAL...'
                      : submitStatus === 'success'
                      ? 'PROPOSAL RECEIVED ✓'
                      : submitStatus === 'error'
                      ? 'DELIVERY FAILED — TRY AGAIN'
                      : 'SEND PROPOSAL REQUEST'}
                  </span>
                  <span className="arr">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
