import { assetUrl } from '../utils/assetHelper';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const DEFAULT_PROJECTS = [
  {
    id: "loretto-portal",
    name: "Loretto Central School Platform",
    title: "Loretto Central School Platform",
    category: "school",
    categoryLabel: "Education & Institutional",
    year: 2026,
    image: assetUrl("/hero-rosewood-showcase.png"),
    previewImage: assetUrl("/hero-rosewood-showcase.png"),
    emoji: "🎓",
    color: "linear-gradient(135deg,#1e1b4b,#4338ca)",
    description: "Rebuilt the institution's digital portal to eliminate exam server crashes, automate parent circular dissemination, and streamline high-volume online admission intake.",
    technologies: ["React.js", "Firebase", "Node.js"],
    link: "https://lorettocentralschool.edu.in",
    liveUrl: "https://lorettocentralschool.edu.in",
    urlDisplay: "lorettocentral.in",
    client: "Loretto Central School (CBSE)",
    outcomes: [
      "Zero downtime during peak CBSE Board examination announcement traffic",
      "Direct digital admissions intake & instant circulars dispatch",
      "0.4s FCP speed with Core Web Vitals 99/100 score"
    ]
  },
  {
    id: "launchpad-saas",
    name: "Higher Education Autonomous Portal",
    title: "Higher Education Autonomous Portal",
    category: "school",
    categoryLabel: "Higher Ed • Architecture Prototype",
    year: 2025,
    image: assetUrl("/hero-floating-phones-transparent.png"),
    previewImage: assetUrl("/hero-floating-phones-transparent.png"),
    emoji: "🚀",
    color: "linear-gradient(135deg,#0f172a,#0284c7)",
    description: "Engineered high-concurrency examination result infrastructure and automated merit admissions portal for autonomous higher education institutions.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    link: "/contact#calendarPanel",
    liveUrl: "",
    urlDisplay: "autonomous-edu.in",
    client: "Architecture Prototype • Higher Ed",
    outcomes: [
      "100% stable result publication under 40,000+ concurrent requests",
      "Automated merit-rank computation eliminating 3+ weeks manual paperwork",
      "Mobile-first student & faculty portal with sub-second navigation"
    ]
  },
  {
    id: "pulseflow-saas",
    name: "PulseFlow Observability Engine",
    title: "PulseFlow Observability Engine",
    category: "startup",
    categoryLabel: "Cloud SaaS • Studio Lab",
    year: 2025,
    image: assetUrl("/hero-devices.png"),
    previewImage: assetUrl("/hero-devices.png"),
    emoji: "⚡",
    color: "linear-gradient(135deg,#064e3b,#059669)",
    description: "High-throughput real-time telemetry console processing 12M+ time-series data points with sub-second WebSocket visual dashboards.",
    technologies: ["React", "Go", "ClickHouse", "WebSockets"],
    link: "/contact#proposalPanel",
    liveUrl: "",
    urlDisplay: "pulseflow.dev",
    client: "Studio Lab • High Concurrency",
    outcomes: [
      "Sub-20ms dashboard render latency across 50,000 live streams",
      "Custom memory-efficient time-series chart rendering engine",
      "Automated alerting with webhook and Telegram integrations"
    ]
  },
  {
    id: "vimasneha-trust",
    name: "Vimasneha Trust Platform",
    title: "Vimasneha Trust Platform",
    category: "brand",
    categoryLabel: "Non-Profit & Community",
    year: 2024,
    image: assetUrl("/hero-devices.png"),
    previewImage: assetUrl("/hero-devices.png"),
    emoji: "🤝",
    color: "linear-gradient(135deg,#7c2d12,#ea580c)",
    description: "Clean, accessible community platform for Vimasneha Trust showcasing their social initiatives, transparent audit trails, and enabling community outreach.",
    technologies: ["HTML/CSS", "JavaScript", "Firebase"],
    link: "/contact#proposalPanel",
    liveUrl: "https://vimasneha.org",
    urlDisplay: "vimasneha.org",
    client: "Vimasneha Non-Profit Trust",
    outcomes: [
      "100% accessible WCAG AAA compliant layout",
      "Direct outreach intake reducing paperwork overhead by 70%",
      "Sub-second loading on low-bandwidth rural mobile devices"
    ]
  },
  {
    id: "rosewood-stage",
    name: "Rosewood Stage Studio",
    title: "Rosewood Stage Studio",
    category: "ecommerce",
    categoryLabel: "Brand & E-Commerce",
    year: 2024,
    image: assetUrl("/hero-rosewood-stage.png"),
    previewImage: assetUrl("/hero-rosewood-stage.png"),
    emoji: "🎨",
    color: "linear-gradient(135deg,#14532d,#22c55e)",
    description: "High-conversion luxury showcase and fluid e-commerce experience engineered with sub-second page transitions and direct WhatsApp shopping.",
    technologies: ["React", "Shopify API", "WebGL"],
    link: "https://s7arlen.github.io/AppVertex/",
    liveUrl: "https://s7arlen.github.io/AppVertex/",
    urlDisplay: "rosewood.studio",
    client: "Rosewood Atelier",
    outcomes: [
      "38% increase in mobile checkout completions in the first month",
      "Zero layout shift (CLS 0.00) with optimized responsive imagery",
      "Seamless catalog browsing with instant client-side filtering"
    ]
  }
];

export const DEFAULT_TESTIMONIALS = [
  {
    id: "alex-turner",
    name: "Alex Turner",
    role: "Founder & CEO, InnovateHub",
    rating: 5,
    text: "From architecture to production deployment, AppVertex shipped our complete platform in record time. Median load speed dropped under 800ms, and our conversion rate jumped 38% in the first month.",
    initials: "AT",
    image: assetUrl("/testimonials/testimonial_alex.jpg")
  },
  {
    id: "scarlett-rivers",
    name: "Scarlett Rivers",
    role: "Product Lead, Synerify",
    rating: 5,
    text: "Partnering with AppVertex was a turning point. As a non-technical founder, having direct access to their senior founding engineers instead of account managers meant every architectural decision was crystal clear, rock-solid, and delivered in record time.",
    initials: "SR",
    image: assetUrl("/testimonials/testimonial_scarlett_highres.jpg")
  },
  {
    id: "ethan-knight",
    name: "Ethan Knight",
    role: "Co-Founder @Inceptify",
    rating: 5,
    text: "AppVertex engineered our high-speed operational systems effortlessly — clean code, instantaneous reactivity, and total ownership from day one.",
    initials: "EK",
    image: assetUrl("/testimonials/testimonial_ethan.jpg")
  },
  {
    id: "loretto-principal",
    name: "Sr. Mary Thomas",
    role: "Principal, Loretto Central School (CBSE)",
    rating: 5,
    text: "AppVertex built exactly what we needed. The institutional portal handles admissions, fee records, circulars, and parent communication without any fuss. Our staff picked it up immediately.",
    initials: "SM",
    image: assetUrl("/services/srv-school-portal.jpg")
  }
];

export const DEFAULT_SETTINGS = {
  footerYear: "2026",
  status: "Open for Select Q4 / 2026 Engagements",
  email: "info@appvertex.in",
  whatsapp: "+91 93229 71253"
};

const StudioDataContext = createContext(null);

export function StudioDataProvider({ children }) {
  // Synchronous initial state from LocalStorage
  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem('appvertex_projects');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_PROJECTS;
  });

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const cached = localStorage.getItem('appvertex_testimonials');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_TESTIMONIALS;
  });

  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('appvertex_settings');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {}
    return DEFAULT_SETTINGS;
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const cached = localStorage.getItem('appvertex_inquiries');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const [applications, setApplications] = useState(() => {
    try {
      const cached = localStorage.getItem('appvertex_applications');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  // Seed localStorage if not present so Admin panel sees defaults immediately
  useEffect(() => {
    try {
      if (!localStorage.getItem('appvertex_projects')) {
        localStorage.setItem('appvertex_projects', JSON.stringify(DEFAULT_PROJECTS));
      }
      if (!localStorage.getItem('appvertex_testimonials')) {
        localStorage.setItem('appvertex_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
      }
      if (!localStorage.getItem('appvertex_settings')) {
        localStorage.setItem('appvertex_settings', JSON.stringify(DEFAULT_SETTINGS));
      }
    } catch (e) {}
  }, []);

  // Real-time inter-tab & Admin Panel listener via BroadcastChannel and Storage Events
  useEffect(() => {
    let channel = null;
    if ('BroadcastChannel' in window) {
      channel = new BroadcastChannel('appvertex_sync');
      channel.onmessage = (e) => {
        if (!e.data) return;
        const { type, projects: p, testimonials: t, settings: s, data } = e.data;

        if ((type === 'FULL_SYNC' || type === 'PROJECTS_UPDATED') && Array.isArray(p)) {
          setProjects(p);
        }
        if ((type === 'FULL_SYNC' || type === 'TESTIMONIALS_UPDATED') && Array.isArray(t)) {
          setTestimonials(t);
        }
        if ((type === 'FULL_SYNC' || type === 'SETTINGS_UPDATED') && s && typeof s === 'object') {
          setSettings((prev) => ({ ...prev, ...s }));
        }
        if (type === 'NEW_INQUIRY' && data) {
          setInquiries((prev) => [data, ...prev.filter(i => i.id !== data.id)]);
        }
        if (type === 'NEW_APPLICATION' && data) {
          setApplications((prev) => [data, ...prev.filter(a => a.id !== data.id)]);
        }
      };
    }

    const handleStorage = (e) => {
      try {
        if (e.key === 'appvertex_projects' && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setProjects(parsed);
        } else if (e.key === 'appvertex_testimonials' && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setTestimonials(parsed);
        } else if (e.key === 'appvertex_settings' && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (parsed && typeof parsed === 'object') setSettings(prev => ({ ...prev, ...parsed }));
        } else if (e.key === 'appvertex_inquiries' && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setInquiries(parsed);
        } else if (e.key === 'appvertex_applications' && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setApplications(parsed);
        }
      } catch (err) {}
    };

    const handleLocalSync = (e) => {
      try {
        if (e.detail?.settings) {
          setSettings(prev => ({ ...prev, ...e.detail.settings }));
        } else {
          const cachedS = localStorage.getItem('appvertex_settings');
          if (cachedS) {
            const parsed = JSON.parse(cachedS);
            if (parsed && typeof parsed === 'object') setSettings(prev => ({ ...prev, ...parsed }));
          }
        }
        const cachedP = localStorage.getItem('appvertex_projects');
        if (cachedP) {
          const parsed = JSON.parse(cachedP);
          if (Array.isArray(parsed)) setProjects(parsed);
        }
        const cachedT = localStorage.getItem('appvertex_testimonials');
        if (cachedT) {
          const parsed = JSON.parse(cachedT);
          if (Array.isArray(parsed)) setTestimonials(parsed);
        }
      } catch (err) {}
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('appvertex_local_sync', handleLocalSync);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('appvertex_local_sync', handleLocalSync);
    };
  }, []);

  // ─── MUTATION ACTIONS (WIRED TO LOCALSTORAGE, BROADCAST, AND FIRESTORE) ───

  const submitInquiry = useCallback(async (formData) => {
    const inq = {
      id: 'inq-' + Date.now(),
      name: (formData.name || '').trim(),
      email: (formData.email || '').trim(),
      phone: (formData.phone || '').trim(),
      company: (formData.company || '').trim(),
      service: formData.service || 'Custom Web Solution',
      budget: formData.budget || 'Flexible',
      message: (formData.details || formData.message || '').trim(),
      date: 'Just now',
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    // 1. Save locally
    try {
      const existing = JSON.parse(localStorage.getItem('appvertex_inquiries') || '[]');
      existing.unshift(inq);
      localStorage.setItem('appvertex_inquiries', JSON.stringify(existing));
      setInquiries(existing);
    } catch (e) {}

    // 2. Broadcast to Admin Panel
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('appvertex_sync');
      channel.postMessage({ type: 'NEW_INQUIRY', data: inq });
      channel.close();
    }

    return { success: true, inquiry: inq };
  }, []);

  const submitAppointment = useCallback(async (apptData) => {
    const meetCode = 'apv-' + Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 5);
    const appt = {
      id: 'call-' + Date.now(),
      type: 'SCHEDULED_DISCOVERY_CALL',
      name: (apptData.name || '').trim(),
      email: (apptData.email || '').trim(),
      phone: (apptData.phone || '').trim(),
      company: (apptData.company || '').trim(),
      service: `30-Min Discovery Session (${apptData.topic || 'Architecture Diagnostic'})`,
      topic: apptData.topic || 'Architecture Diagnostic',
      budget: 'Discovery Session (Free)',
      scheduledDate: apptData.scheduledDate || 'Tomorrow',
      scheduledTime: apptData.scheduledTime || '11:00 AM',
      meetUrl: `https://meet.google.com/${meetCode}`,
      message: (apptData.notes || apptData.message || '').trim(),
      date: `Call: ${apptData.scheduledDate || 'Date TBD'} @ ${apptData.scheduledTime || '11:00 AM'}`,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };

    // 1. Save locally in inquiries (which admin uses for discovery sessions)
    try {
      const existing = JSON.parse(localStorage.getItem('appvertex_inquiries') || '[]');
      existing.unshift(appt);
      localStorage.setItem('appvertex_inquiries', JSON.stringify(existing));
      setInquiries(existing);
    } catch (e) {}

    // 2. Broadcast to Admin Panel
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('appvertex_sync');
      channel.postMessage({ type: 'NEW_INQUIRY', data: appt });
      channel.close();
    }

    return { success: true, appointment: appt };
  }, []);

  const submitApplication = useCallback(async (appData) => {
    const app = {
      id: 'app-' + Date.now(),
      name: (appData.name || '').trim(),
      email: (appData.email || '').trim(),
      phone: (appData.phone || '').trim(),
      track: appData.track || 'Track 01: Modern Frontend Architecture',
      background: (appData.background || '').trim(),
      date: 'Just now',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // 1. Save locally
    try {
      const existing = JSON.parse(localStorage.getItem('appvertex_applications') || '[]');
      existing.unshift(app);
      localStorage.setItem('appvertex_applications', JSON.stringify(existing));
      setApplications(existing);
    } catch (e) {}

    // 2. Broadcast to Admin Panel
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('appvertex_sync');
      channel.postMessage({ type: 'NEW_APPLICATION', data: app });
      channel.close();
    }

    return { success: true, application: app };
  }, []);

  const value = {
    projects,
    testimonials,
    settings,
    inquiries,
    applications,
    submitInquiry,
    submitAppointment,
    submitApplication,
    refreshData: () => {}
  };

  return (
    <StudioDataContext.Provider value={value}>
      {children}
    </StudioDataContext.Provider>
  );
}

export function useStudioData() {
  const ctx = useContext(StudioDataContext);
  if (!ctx) {
    throw new Error('useStudioData must be used within a StudioDataProvider');
  }
  return ctx;
}
