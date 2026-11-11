import { useEffect } from 'react';

export function useScrollReveal(deps = []) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
      return;
    }

    const candidates = document.querySelectorAll(
      'section > .container > .section-header, ' +
      'section > .container > .section-title, ' +
      '.process-step-item, .method-card, .testimonial-card, .about-tile, .founder-card, ' +
      '.metrics-bar-container, .contact-card, .footer-cta-card, .service-card, .case-card, .subservice-card'
    );

    candidates.forEach(el => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.1
      });

      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

      return () => observer.disconnect();
    } else {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    }
  }, deps);
}
