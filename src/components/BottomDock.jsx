import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomDock() {
  const location = useLocation();

  const dockItems = [
    { label: 'HOME', path: '/', icon: 'fas fa-home' },
    { label: 'SERVICES', path: '/services', icon: 'fas fa-th-large' },
    { label: 'WORK', path: '/work', icon: 'fas fa-briefcase' },
    { label: 'UPSKILL', path: '/upskill', icon: 'fas fa-graduation-cap' },
    { label: 'CONTACT', path: '/contact', icon: 'fas fa-envelope' },
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
    <nav className="mobile-bottom-dock" id="mobileBottomNav" aria-label="Mobile Bottom Navigation">
      <div className="dock-items-row">
        {dockItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`dock-item ${isActive(item.path) ? 'active' : ''}`}
            aria-label={item.label}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
