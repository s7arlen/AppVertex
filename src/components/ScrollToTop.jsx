import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [dashOffset, setDashOffset] = useState(125.66);

  useEffect(() => {
    const totalLength = 125.66;
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setVisible(scrollY > 320);

      if (docHeight > 0) {
        const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
        const offset = totalLength - progress * totalLength;
        setDashOffset(Number(offset.toFixed(2)));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="scrollToTopBtn"
      className={`scroll-to-top-btn ${visible ? 'visible' : ''}`}
      aria-label="Scroll to top of page"
      title="Scroll to top"
      onClick={scrollToTop}
    >
      <svg className="scroll-progress-ring" width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
        <circle className="progress-ring-bg" cx="23" cy="23" r="20"></circle>
        <circle
          className="progress-ring-fill"
          id="scrollProgressCircle"
          cx="23"
          cy="23"
          r="20"
          style={{ strokeDashoffset: dashOffset }}
        ></circle>
      </svg>
      <i className="fa-solid fa-arrow-up scroll-top-icon" aria-hidden="true"></i>
    </button>
  );
}
