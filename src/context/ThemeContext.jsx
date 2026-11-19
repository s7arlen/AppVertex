import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const transitionFrame = useRef(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appvertex-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('appvertex-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const root = document.documentElement;
    // Read the current DOM value so rapid consecutive clicks also toggle
    // correctly before React has committed the previous state update.
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';

    // Theme colours are intentionally applied in one paint. Without this guard,
    // the many component-level colour transitions make the whole page look like
    // it is reloading and can expose a brief font flicker.
    root.classList.add('theme-changing');
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('appvertex-theme', nextTheme);
    setTheme(nextTheme);

    if (transitionFrame.current) {
      cancelAnimationFrame(transitionFrame.current);
    }

    // Wait for the new theme to be painted before re-enabling normal hover and
    // interaction transitions.
    requestAnimationFrame(() => {
      transitionFrame.current = requestAnimationFrame(() => {
        root.classList.remove('theme-changing');
        transitionFrame.current = null;
      });
    });
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
