import React, { useState, useEffect } from 'react';
import '../styles/components/unique-testimonials.css';

export default function UniqueTestimonials() {
  const [activeModal, setActiveModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModal(false);
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  return (
    <section id="testimonials" className="unique-testimonials-section" aria-label="Client Testimonials">
      <div className="container">
        {/* SECTION HEADER MATCHING APPVERTEX DESIGN SYSTEM */}
        <div className="unique-testimonials-header reveal-on-scroll">
          <p className="section-eyebrow">
            <span className="dash"></span> SUCCESS STORIES
          </p>
          <h2 className="section-title">
            Client Testimonials<br />
            <span className="accent-text">That Speak Volumes.</span>
          </h2>
          <p className="section-subtitle">
            Dive into the tapestry of experiences shared by those who built their platforms with us — where satisfaction finds its voice.
          </p>
        </div>

        {/* 3 ASYMMETRIC TESTIMONIAL CARDS */}
        <div className="unique-testimonials-grid">
          {/* CARD 1: Full-Bleed Video / Story Card */}
          <article 
            className="asym-card card-video-story reveal-on-scroll" 
            onClick={() => setActiveModal(true)}
            role="button"
            tabIndex={0}
            aria-label="Watch Alex Turner's client story video"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal(true); } }}
          >
            <div className="video-card-media">
              <img 
                src="/testimonials/testimonial_alex.jpg" 
                alt="Alex Turner - InnovateHub" 
                className="video-portrait-img"
                loading="lazy"
              />
              <div className="video-card-gradient" />
            </div>

            {/* Floating Glass Pill */}
            <div className="floating-video-pill">
              <button 
                type="button" 
                className="pill-play-btn" 
                aria-label="Play video testimonial"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModal(true);
                }}
              >
                <i className="fa-solid fa-play" aria-hidden="true"></i>
              </button>
              <div className="pill-meta">
                <span className="pill-name">Alex Turner</span>
                <span className="pill-company">InnovateHub</span>
              </div>
            </div>
          </article>

          {/* CARD 2: Deep Contrast Midnight Editorial Card */}
          <article className="asym-card card-midnight-editorial reveal-on-scroll">
            <div className="midnight-glow-accent" />
            <div className="midnight-content-wrapper">
              <div className="midnight-quote-mark">“</div>
              <p className="midnight-quote">
                Partnering with AppVertex was a turning point for us. As a non-technical founder, having direct access to their senior founding engineers instead of account managers meant every architectural decision was crystal clear, rock-solid, and delivered in record time.
              </p>

              <div className="midnight-author-row">
                <img 
                  src="/testimonials/testimonial_scarlett_highres.jpg" 
                  alt="Scarlett Rivers" 
                  className="midnight-avatar-img"
                  loading="lazy"
                />
                <div className="midnight-author-info">
                  <h4 className="midnight-author-name">Scarlett Rivers</h4>
                  <span className="midnight-author-company">Synerify</span>
                </div>
              </div>
            </div>
          </article>

          {/* CARD 3: Two-Tone Organic Split Card (Portrait + Brand Orange) */}
          <article className="asym-card card-two-tone reveal-on-scroll">
            <div className="two-tone-top-media">
              <img 
                src="/testimonials/testimonial_ethan.jpg" 
                alt="Ethan Knight" 
                className="two-tone-portrait"
                loading="lazy"
              />
            </div>

            {/* Seamless curved terracotta block */}
            <div className="two-tone-bottom-block">
              {/* Organic wave seam matching AppVertex's curved branding */}
              <svg 
                className="two-tone-wave-seam" 
                viewBox="0 0 400 36" 
                preserveAspectRatio="none" 
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="waveBrandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef870d" />
                    <stop offset="100%" stopColor="#ff5722" />
                  </linearGradient>
                </defs>
                <path d="M-2,36 L-2,16 Q85,0 200,16 T402,10 L402,36 Z" fill="url(#waveBrandGrad)" />
              </svg>

              <div className="two-tone-body">
                <p className="two-tone-quote">
                  "AppVertex engineered our high-speed operational systems effortlessly — clean code, instantaneous reactivity, and total ownership from day one."
                </p>

                <div className="two-tone-author-meta">
                  <h4 className="two-tone-author-name">Ethan Knight</h4>
                  <span className="two-tone-author-role">Co-Founder @Inceptify</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* INTERACTIVE VIDEO / SPOTLIGHT MODAL */}
      {activeModal && (
        <div 
          className="testimonial-modal-backdrop" 
          onClick={() => setActiveModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-story-title"
        >
          <div 
            className="testimonial-modal-dialog" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="testimonial-modal-close" 
              onClick={() => setActiveModal(false)}
              aria-label="Close story modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="testimonial-modal-video-box">
              <div className="modal-video-cover">
                <img 
                  src="/testimonials/testimonial_alex.jpg" 
                  alt="Alex Turner Video Story" 
                  className="modal-cover-img"
                />
                <div className="modal-video-overlay">
                  <div className="modal-video-pulse-play" onClick={() => setIsPlaying(!isPlaying)}>
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                  </div>
                  <div className="modal-video-status">
                    {isPlaying ? 'Playing Founder Spotlight Reel' : 'Click to Play Founder Story'}
                  </div>
                </div>
              </div>

              <div className="testimonial-modal-meta-content">
                <span className="modal-story-tag">Founder Case Study</span>
                <h3 id="modal-story-title" className="modal-story-title">
                  "AppVertex transformed our product launch velocity by 4x."
                </h3>
                <p className="modal-story-quote">
                  "Working with AppVertex felt like having senior engineers sitting right next to us. From architecture to launch, there was zero fluff, flawless execution, and a median page speed under 800ms. I couldn't recommend them higher."
                </p>
                <div className="modal-author-identity">
                  <strong>Alex Turner</strong> — Founder &amp; CEO, InnovateHub
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
