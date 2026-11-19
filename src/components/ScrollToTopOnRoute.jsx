import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (e) {
          // ignore invalid selector
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetHash = anchor.getAttribute('href');
      if (!targetHash || targetHash === '#') return;

      try {
        const targetElement = document.querySelector(targetHash);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', targetHash);
        } else if (targetHash === '#contact' || targetHash === '#booking-calendar' || targetHash === '#calendarPanel') {
          e.preventDefault();
          navigate('/contact');
        }
      } catch (err) {
        // Fallback
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [navigate]);

  return null;
}
