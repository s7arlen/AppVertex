import React from 'react';
import { useStudioData, DEFAULT_TESTIMONIALS } from '../context/StudioDataContext';
import '../styles/components/unique-testimonials.css';

const FALLBACK_AVATARS = [
  '/testimonials/testimonial_alex.jpg',
  '/testimonials/testimonial_scarlett_highres.jpg',
  '/testimonials/testimonial_ethan.jpg',
  '/services/srv-school-portal.jpg'
];

export default function UniqueTestimonials() {
  const { testimonials } = useStudioData();
  const baseItems = Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  // Build a seamless loop track: ensure at least 6 items in base before mirroring
  let displayPool = [...baseItems];
  while (displayPool.length < 6) {
    displayPool = [...displayPool, ...baseItems];
  }
  const marqueeList = [...displayPool, ...displayPool];

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
      </div>

      {/* CONTINUOUS INFINITE MARQUEE TRACK (OPTION 3 - IDENTICAL CARD UI) */}
      <div className="testimonials-marquee-viewport" role="region" aria-label="Client Testimonials Carousel">
        <div className="testimonials-marquee-track">
          {marqueeList.map((item, idx) => {
            const cardType = idx % 3;
            const imgSrc = item.image || FALLBACK_AVATARS[idx % FALLBACK_AVATARS.length];

            if (cardType === 0) {
              // CARD 1: Full-Bleed Story Card (Exact UI)
              return (
                <article
                  key={`marquee-${item.id || idx}-${idx}`}
                  className="asym-card card-video-story"
                  tabIndex={0}
                  aria-label={`${item.name} client spotlight`}
                >
                  <div className="video-card-media">
                    <img
                      src={imgSrc}
                      alt={`${item.name} - ${item.role}`}
                      className="video-portrait-img"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = FALLBACK_AVATARS[0]; }}
                    />
                    <div className="video-card-gradient" />
                  </div>

                  {/* Floating Glass Pill */}
                  <div className="floating-video-pill" style={{ cursor: 'default' }}>
                    <div className="pill-meta" style={{ padding: '6px 10px' }}>
                      <span className="pill-name">{item.name}</span>
                      <span className="pill-company">{item.role}</span>
                    </div>
                  </div>
                </article>
              );
            } else if (cardType === 1) {
              // CARD 2: Deep Contrast Midnight Editorial Card (Exact UI)
              return (
                <article
                  key={`marquee-${item.id || idx}-${idx}`}
                  className="asym-card card-midnight-editorial"
                >
                  <div className="midnight-glow-accent" />
                  <div className="midnight-content-wrapper">
                    <div className="midnight-quote-mark">“</div>
                    <p className="midnight-quote">{item.text}</p>

                    <div className="midnight-author-row">
                      <img
                        src={imgSrc}
                        alt={item.name}
                        className="midnight-avatar-img"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = FALLBACK_AVATARS[1]; }}
                      />
                      <div className="midnight-author-info">
                        <h4 className="midnight-author-name">{item.name}</h4>
                        <span className="midnight-author-company">{item.role}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            } else {
              // CARD 3: Two-Tone Organic Split Card (Exact UI)
              return (
                <article
                  key={`marquee-${item.id || idx}-${idx}`}
                  className="asym-card card-two-tone"
                >
                  <div className="two-tone-top-media">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="two-tone-portrait"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = FALLBACK_AVATARS[2]; }}
                    />
                  </div>

                  {/* Seamless curved terracotta block */}
                  <div className="two-tone-bottom-block">
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
                      <p className="two-tone-quote">"{item.text}"</p>

                      <div className="two-tone-author-meta">
                        <h4 className="two-tone-author-name">{item.name}</h4>
                        <span className="two-tone-author-role">{item.role}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
