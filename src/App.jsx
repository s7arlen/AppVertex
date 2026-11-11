import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import BottomDock from './components/BottomDock';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnRoute from './components/ScrollToTopOnRoute';

import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Process from './pages/Process';
import About from './pages/About';
import Upskill from './pages/Upskill';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

import './styles/style.css';

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTopOnRoute />
      {!isAdmin && <BackgroundLayer />}
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services.html" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work.html" element={<Work />} />
        <Route path="/process" element={<Process />} />
        <Route path="/process.html" element={<Process />} />
        <Route path="/about" element={<About />} />
        <Route path="/about.html" element={<About />} />
        <Route path="/upskill" element={<Upskill />} />
        <Route path="/upskill.html" element={<Upskill />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact.html" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin.html" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdmin && (
        <a
          href="https://wa.me/919322971253?text=Hi%20AppVertex%21%20I%27m%20interested%20in%20building%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-btn"
          aria-label="Chat with AppVertex on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      )}

      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <BottomDock />}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </BrowserRouter>
  );
}
