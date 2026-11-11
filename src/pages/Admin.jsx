import React, { useEffect } from 'react';
import '../styles/pages/admin.css';

export default function Admin() {
  useEffect(() => {
    // Zero-flash theme initialization for admin
    const savedTheme = localStorage.getItem('appvertex-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Global Event Delegation for Admin Actions (100% reliable, zero console warnings)
    const handleClick = (e) => {
      const el = e.target.closest('[data-onclick]');
      if (el) {
        const code = el.getAttribute('data-onclick');
        if (code) {
          try {
            const fn = new Function('event', code);
            fn.call(el, e);
          } catch (err) {
            console.warn('Admin click execution error:', err, code);
          }
        }
      }
    };

    const handleSubmit = (e) => {
      const el = e.target.closest('[data-onsubmit]');
      if (el) {
        e.preventDefault();
        const code = el.getAttribute('data-onsubmit');
        if (code) {
          try {
            const fn = new Function('event', code);
            fn.call(el, e);
          } catch (err) {
            console.warn('Admin submit execution error:', err, code);
          }
        }
      }
    };

    const handleInput = (e) => {
      const el = e.target.closest('[data-oninput]');
      if (el) {
        const code = el.getAttribute('data-oninput');
        if (code) {
          try {
            const fn = new Function('event', code);
            fn.call(el, e);
          } catch (err) {
            console.warn('Admin input execution error:', err, code);
          }
        }
      }
    };

    const handleChange = (e) => {
      const el = e.target.closest('[data-onchange]');
      if (el) {
        const code = el.getAttribute('data-onchange');
        if (code) {
          try {
            const fn = new Function('event', code);
            fn.call(el, e);
          } catch (err) {
            console.warn('Admin change execution error:', err, code);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);
    document.addEventListener('input', handleInput);
    document.addEventListener('change', handleChange);

    const scriptEl = document.createElement('script');
    scriptEl.type = 'module';
    scriptEl.src = '/admin-legacy.js?v=' + Date.now();
    document.body.appendChild(scriptEl);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
      document.removeEventListener('input', handleInput);
      document.removeEventListener('change', handleChange);
      if (document.body.contains(scriptEl)) {
        document.body.removeChild(scriptEl);
      }
    };
  }, []);

  return (
    <div className="admin-page-root">
      {/* LOGIN SCREEN */}
    <div id="loginScreen">
        <div className="login-card">
            <div className="login-header">
                <div className="login-logo">
                    <img src="/logo.png" alt="AppVertex Logo" />
                    <span>AppVertex <strong>Studio</strong></span>
                </div>
                <h1 className="login-title" id="authTitle">Sign In</h1>
                <p className="login-subtitle" id="authSubtitle">Enter your credentials to access the admin console</p>
            </div>
            
            <form className="login-form" id="loginForm" data-onsubmit="handleAuthSubmit(event)">
                <div className="form-group">
                    <label className="form-label" htmlFor="loginEmail">Email Address</label>
                    <div className="login-input-wrap">
                        <i className="fas fa-envelope"></i>
                        <input type="email" id="loginEmail" placeholder="admin@appvertex.in" autoComplete="username" required />
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label className="form-label" htmlFor="loginPassword" style={{ marginBottom: '0' }}>Password</label>
                        <button type="button" id="forgotPassLink" data-onclick="handleForgotPassword()" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', padding: '0', textDecoration: 'underline' }}>Forgot Password?</button>
                    </div>
                    <div className="login-input-wrap">
                        <i className="fas fa-lock"></i>
                        <input type="password" id="loginPassword" placeholder="••••••••" autoComplete="current-password" required />
                        <button type="button" className="password-toggle-btn" data-onclick="togglePasswordVisibility()" aria-label="Toggle password visibility">
                            <i className="fas fa-eye" id="passwordToggleIcon"></i>
                        </button>
                    </div>
                </div>
                
                <div className="login-error" id="loginError">
                    <i className="fas fa-exclamation-circle"></i> <span id="loginErrorMsg"></span>
                </div>

                <button type="submit" className="login-btn" id="loginBtn">
                    <span id="loginBtnText">Sign In</span>
                    <i className="fas fa-arrow-right" id="loginBtnIcon"></i>
                </button>
                      <button 
                          type="button" 
                          id="quickLocalBtn" 
                          className="btn" 
                          data-onclick="handleLocalMode(false)"
                          style={{
                              width: '100%',
                              marginTop: '0.85rem',
                              padding: '0.8rem',
                              background: 'var(--primary-soft, rgba(239, 135, 13, 0.08))',
                              border: '1px dashed var(--primary, #ef870d)',
                              borderRadius: '10px',
                              color: 'var(--primary, #ef870d)',
                              fontWeight: '700',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              transition: 'all 0.2s ease'
                          }}
                      >
                          <i className="fas fa-bolt"></i> Quick Studio Access (Local Dev)
                      </button>

            </form>

            {/* Public registration removed for administrative security */}
            <div style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Protected Studio Administrative Console
            </div>

            <div className="login-footer">
                <a href="index.html" className="back-link">
                    <i className="fas fa-arrow-left"></i> Return to Live Website
                </a>
            </div>
        </div>
    </div>

    {/* RESPONSIVE MOBILE TOP BAR */}
    <div className="mobile-top-bar" id="mobileTopBar">
        <div className="mobile-brand">
            <img src="/logo.png" alt="AppVertex" />
            <span>AppVertex <strong>Studio</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="theme-toggle-btn" id="mobileThemeToggle" data-onclick="toggleAdminTheme()" aria-label="Toggle Theme" title="Toggle Theme" style={{ width: '32px', height: '32px' }}>
                <i className="fas fa-moon" id="mobileThemeIcon"></i>
            </button>
            <button className="btn btn-primary" id="mobileSaveBtn" data-onclick="saveAllChanges()" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: '700' }}>
                <i className="fas fa-save"></i> Save All
            </button>
            <button className="mobile-menu-btn" id="mobileMenuBtn" data-onclick="toggleSidebar()" aria-label="Toggle Navigation">
                <i className="fas fa-bars"></i>
            </button>
        </div>
    </div>

    {/* BACKDROP FOR MOBILE SIDEBAR */}
    <div className="sidebar-backdrop" id="sidebarBackdrop" data-onclick="toggleSidebar(false)"></div>

    {/* ADMIN PANEL */}
    <div id="adminPanel">
        <div className="admin-container">
            <aside className="sidebar" id="sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <img src="/logo.png" alt="AppVertex Logo" />
                        AppVertex <span>Studio</span>
                    </div>
                    <button className="close-sidebar-btn" data-onclick="toggleSidebar(false)" aria-label="Close Sidebar">&times;</button>
                </div>

                <div className="nav-section">
                    <div className="nav-title">WORKSPACE &amp; INTAKE</div>
                    <a className="nav-item active" data-onclick="showSection('dashboard')">
                        <div className="nav-item-left"><i className="fas fa-home"></i> Home</div>
                    </a>
                    <a className="nav-item" data-onclick="showSection('appointments')">
                        <div className="nav-item-left"><i className="fas fa-calendar-check"></i> Discovery Calls</div>
                        <span className="nav-badge" id="badgeAppointmentsCount">0</span>
                    </a>
                    <a className="nav-item" data-onclick="showSection('inquiries')">
                        <div className="nav-item-left"><i className="fas fa-inbox"></i> Inquiries</div>
                        <span className="nav-badge" id="badgeInquiriesCount">0</span>
                    </a>
                    <a className="nav-item" data-onclick="showSection('applications')">
                        <div className="nav-item-left"><i className="fas fa-graduation-cap"></i> Upskill Intake</div>
                        <span className="nav-badge" id="badgeApplicationsCount">0</span>
                    </a>
                </div>

                <div className="nav-section">
                    <div className="nav-title">CONTENT &amp; PORTFOLIO</div>
                    <a className="nav-item" data-onclick="showSection('projects')">
                        <div className="nav-item-left"><i className="fas fa-briefcase"></i> Projects</div>
                        <span className="nav-badge" id="badgeProjectsCount">0</span>
                    </a>
                    <a className="nav-item" data-onclick="showSection('testimonials')">
                        <div className="nav-item-left"><i className="fas fa-quote-left"></i> Testimonials</div>
                        <span className="nav-badge" id="badgeTestimonialsCount">0</span>
                    </a>
                </div>

                <div className="nav-section">
                    <div className="nav-title">CONFIGURATION</div>
                    <a className="nav-item" data-onclick="showSection('settings')">
                        <div className="nav-item-left"><i className="fas fa-sliders-h"></i> Studio Settings</div>
                    </a>
                    <a className="nav-item" data-onclick="showSection('export')">
                        <div className="nav-item-left"><i className="fas fa-database"></i> Backup &amp; Code</div>
                    </a>
                </div>

                <div className="nav-section">
                    <div className="nav-title">LIVE WEBSITE</div>
                    <a href="index.html" target="_blank" rel="noopener noreferrer" className="nav-item">
                        <div className="nav-item-left"><i className="fas fa-external-link-alt"></i> Open Public Site</div>
                        <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem' }}></i>
                    </a>
                </div>

                <div className="sidebar-footer">
                    <div className="admin-user-info">
                        <div className="admin-avatar" id="adminAvatar">A</div>
                        <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: '700' }} id="adminRole">Admin</div>
                            <div className="admin-user-email" id="adminEmail">loading...</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <button className="theme-toggle-btn" id="sidebarThemeToggle" data-onclick="toggleAdminTheme()" aria-label="Toggle Theme" title="Toggle Theme" style={{ flex: '1', width: 'auto', height: '34px', fontSize: '0.8rem', fontWeight: '700', gap: '0.4rem' }}>
                            <i className="fas fa-moon" id="sidebarThemeIcon"></i> <span id="sidebarThemeText">Dark Mode</span>
                        </button>
                        <button className="logout-btn" data-onclick="handleLogout()" style={{ margin: '0' }}><i className="fas fa-sign-out-alt"></i> Sign Out</button>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                {/* SYSTEM MODE BANNER */}
                <div className="system-mode-banner">
                    <div className="banner-left">
                        <span id="modeStatusText" className="nav-badge" style={{ background: 'rgba(239,135,13,0.15)', border: '1px solid rgba(239,135,13,0.25)', color: 'var(--primary)', fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', marginRight: '0.75rem', fontWeight: '600' }}>Cloud Synchronized</span>
                        <div className="quick-page-links">
                            <span className="preview-label">Preview</span>
                            <a href="/" className="page-link-pill" target="_blank" rel="noopener noreferrer">Home</a>
                            <a href="/work" className="page-link-pill" target="_blank" rel="noopener noreferrer">Work</a>
                            <a href="/services" className="page-link-pill" target="_blank" rel="noopener noreferrer">Services</a>
                            <a href="/process" className="page-link-pill" target="_blank" rel="noopener noreferrer">Process</a>
                            <a href="/about" className="page-link-pill" target="_blank" rel="noopener noreferrer">About</a>
                            <a href="/upskill" className="page-link-pill" target="_blank" rel="noopener noreferrer">Upskill</a>
                            <a href="/contact" className="page-link-pill" target="_blank" rel="noopener noreferrer">Contact</a>
                        </div>
                    </div>
                    <div className="banner-right" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button className="theme-toggle-btn" id="desktopThemeToggle" data-onclick="toggleAdminTheme()" aria-label="Toggle Theme" title="Toggle Dark/Light Mode">
                            <i className="fas fa-moon" id="desktopThemeIcon"></i>
                        </button>
                        <button className="btn-save-master" id="btnSaveAll" data-onclick="saveAllChanges()" title="Save all changes (Ctrl+S)">
                            <i className="fas fa-save"></i>
                            <span id="saveAllBtnText">Save All</span>
                        </button>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
                     1. DASHBOARD OVERVIEW SECTION
                     ═══════════════════════════════════════════ */}
                <div id="dashboard" className="section-content active">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Studio Dashboard</h1>
                            <p className="header-subtitle">Performance, content inventory, and project intake pipeline</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" data-onclick="seedDefaultData()"><i className="fas fa-sync-alt"></i> Seed Content</button>
                            <button className="btn btn-primary" data-onclick="openProjectModal()"><i className="fas fa-plus"></i> New Project</button>
                        </div>
                    </div>

                    {/* STATS GRID */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-card-top">
                                <span className="stat-label">PROJECTS</span>
                                <div className="stat-icon"><i className="fas fa-briefcase"></i></div>
                            </div>
                            <div className="stat-value" id="statProjects">0</div>
                            <div className="stat-desc">Case studies &amp; launches</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-top">
                                <span className="stat-label">TESTIMONIALS</span>
                                <div className="stat-icon"><i className="fas fa-quote-left"></i></div>
                            </div>
                            <div className="stat-value" id="statTestimonials">0</div>
                            <div className="stat-desc">Client reviews &amp; ratings</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-top">
                                <span className="stat-label">INQUIRIES</span>
                                <div className="stat-icon"><i className="fas fa-inbox"></i></div>
                            </div>
                            <div className="stat-value" id="statInquiries">0</div>
                            <div className="stat-desc">Incoming client proposals</div>
                        </div>
                        <div className="stat-card" data-onclick="showSection('appointments')" style={{ cursor: 'pointer' }}>
                            <div className="stat-card-top">
                                <span className="stat-label">DISCOVERY CALLS</span>
                                <div className="stat-icon" style={{ color: 'var(--primary)' }}><i className="fas fa-calendar-check"></i></div>
                            </div>
                            <div className="stat-value" id="statAppointments">0</div>
                            <div className="stat-desc">30-min strategy sessions</div>
                        </div>
                        <div className="stat-card" data-onclick="showSection('applications')" style={{ cursor: 'pointer' }}>
                            <div className="stat-card-top">
                                <span className="stat-label">UPSKILL APPLICANTS</span>
                                <div className="stat-icon"><i className="fas fa-graduation-cap"></i></div>
                            </div>
                            <div className="stat-value" id="statApplications">0</div>
                            <div className="stat-desc">Mentorship candidates</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-top">
                                <span className="stat-label">FOOTER YEAR</span>
                                <div className="stat-icon"><i className="fas fa-calendar-check"></i></div>
                            </div>
                            <div className="stat-value" id="statYear">2026</div>
                            <div className="stat-desc">Active copyright year</div>
                        </div>
                    </div>

                    {/* UPCOMING DISCOVERY SESSIONS AGENDA CARD */}
                    <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                                    <h3 style={{ margin: '0' }}>Upcoming Discovery Sessions</h3>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Direct Google Meet calls booked via online Discovery Scheduler</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }} data-onclick="openAppointmentModal()"><i className="fas fa-plus"></i> Schedule Call</button>
                                <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }} data-onclick="showSection('appointments')">View All Agenda →</button>
                            </div>
                        </div>
                        <div id="dashboardRecentAppointments" className="item-list"></div>
                    </div>

                    {/* RECENT INQUIRIES PREVIEW CARD */}
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                                <h3 style={{ margin: '0' }}>Recent Client Leads &amp; Inquiries</h3>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Live intake pipeline from website proposal and contact forms</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }} data-onclick="addSampleInquiry()"><i className="fas fa-bolt" style={{ color: 'var(--primary)' }}></i> Simulate Lead</button>
                                <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }} data-onclick="showSection('inquiries')">Open Inbox →</button>
                            </div>
                        </div>
                        <div id="dashboardRecentInquiries" className="item-list"></div>
                    </div>

                    {/* RECENT UPSKILL APPLICATIONS PREVIEW CARD */}
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                                <h3 style={{ margin: '0' }}>Recent Mentorship Applicants</h3>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Live intake pipeline from the Upskill program</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }} data-onclick="addSampleApplication()"><i className="fas fa-bolt" style={{ color: 'var(--primary)' }}></i> Simulate Candidate</button>
                                <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }} data-onclick="showSection('applications')">Open Intake →</button>
                            </div>
                        </div>
                        <div id="dashboardRecentApplications" className="item-list"></div>
                    </div>

                    {/* RECENT PROJECTS PREVIEW CARD */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div>
                                <h3 style={{ margin: '0' }}>Featured Showcase Projects</h3>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Projects currently active in portfolio &amp; homepage showcase</div>
                            </div>
                            <button className="btn btn-secondary" data-onclick="showSection('projects')">View All Projects</button>
                        </div>
                        <div id="dashboardRecentProjects" className="item-list"></div>
                    </div>

                    {/* QUICK CLOUD / STORAGE SYNC */}
                    <div className="card" style={{ background: 'var(--gradient-surface)' }}>
                        <h3>Studio Sync &amp; Migration</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.25rem', fontSize: '0.9rem' }}>
                            Synchronize your projects, reviews, and settings between your browser's local cache and Cloud Firestore.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button className="btn btn-primary" data-onclick="seedDefaultData()"><i className="fas fa-seedling"></i> Restore Default Content</button>
                            <button className="btn btn-secondary" data-onclick="importLocalData()"><i className="fas fa-cloud-upload-alt"></i> Push to Cloud Firestore</button>
                            <button className="btn btn-secondary" data-onclick="downloadJSONBackup()"><i className="fas fa-download"></i> Download Full JSON Backup</button>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
                     2. INQUIRIES INBOX SECTION
                     ═══════════════════════════════════════════ */}
                <div id="inquiries" className="section-content">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Client Inquiries &amp; Intake</h1>
                            <p className="header-subtitle">Review incoming proposals submitted through website contact forms</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" data-onclick="exportInquiriesCSV()"><i className="fas fa-file-csv"></i> Export CSV</button>
                            <button className="btn btn-secondary" data-onclick="addSampleInquiry()"><i className="fas fa-plus"></i> Add Test Lead</button>
                            <button className="btn btn-danger-outline" data-onclick="clearAllInquiries()"><i className="fas fa-trash-alt"></i> Clear Inbox</button>
                        </div>
                    </div>

                    <div className="filter-controls-bar">
                        <div className="search-box-wrap">
                            <i className="fas fa-search"></i>
                            <input type="text" id="inquirySearchInput" aria-label="Search client inquiries" placeholder="Search inquiries by name, company, email, or message..." data-oninput="renderInquiries()" />
                        </div>
                        <div className="filter-pills-row" id="inquiryFilterRow">
                            <button className="filter-pill-btn active" data-onclick="setInquiryFilter('all', this)">All</button>
                            <button className="filter-pill-btn" data-onclick="setInquiryFilter('new', this)">New</button>
                            <button className="filter-pill-btn" data-onclick="setInquiryFilter('in_discussion', this)">In Discussion</button>
                            <button className="filter-pill-btn" data-onclick="setInquiryFilter('proposal_sent', this)">Proposal Sent</button>
                            <button className="filter-pill-btn" data-onclick="setInquiryFilter('won', this)">Won</button>
                            <button className="filter-pill-btn" data-onclick="setInquiryFilter('archived', this)">Archived</button>
                        </div>
                    </div>

                    <div id="inquiriesList"></div>
                </div>

                {/* ═══════════════════════════════════════════
                     2.1 UPSKILL APPLICATIONS SECTION
                     ═══════════════════════════════════════════ */}
                <div id="applications" className="section-content">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Upskill Mentorship Applications</h1>
                            <p className="header-subtitle">Manage student candidates, schedule cohort interviews, and track enrollment</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" data-onclick="exportApplicationsCSV()"><i className="fas fa-file-csv"></i> Export CSV</button>
                            <button className="btn btn-secondary" data-onclick="addSampleApplication()"><i className="fas fa-plus"></i> Simulate Candidate</button>
                            <button className="btn btn-danger-outline" data-onclick="clearArchivedApplications()"><i className="fas fa-archive"></i> Clean Archived</button>
                        </div>
                    </div>

                    <div className="filter-controls-bar">
                        <div className="search-box-wrap">
                            <i className="fas fa-search"></i>
                            <input type="text" id="applicationSearchInput" aria-label="Search mentorship applications" placeholder="Search applicants by candidate name, track, or goals..." data-oninput="renderApplications()" />
                        </div>
                        <div className="filter-pills-row" id="applicationFilterRow">
                            <button className="filter-pill-btn active" data-onclick="setApplicationFilter('all', this)">All</button>
                            <button className="filter-pill-btn" data-onclick="setApplicationFilter('new', this)">New</button>
                            <button className="filter-pill-btn" data-onclick="setApplicationFilter('interviewed', this)">Interviewed</button>
                            <button className="filter-pill-btn" data-onclick="setApplicationFilter('enrolled', this)">Enrolled</button>
                            <button className="filter-pill-btn" data-onclick="setApplicationFilter('archived', this)">Archived</button>
                        </div>
                    </div>

                    <div id="applicationsList"></div>
                </div>

                {/* ═══════════════════════════════════════════
                     3. PROJECTS SECTION
                     ═══════════════════════════════════════════ */}
                
                {/* ═══════════════════════════════════════════
                     2.2 DISCOVERY CALLS & AGENDA SECTION
                     ═══════════════════════════════════════════ */}
                <div id="appointments" className="section-content">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Discovery Calls &amp; Architecture Sessions</h1>
                            <p className="header-subtitle">Manage upcoming Google Meet client sessions, attendee roadmaps, and calendar agenda</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" data-onclick="exportAppointmentsCSV()"><i className="fas fa-file-csv"></i> Export Schedule</button>
                            <button className="btn btn-primary" data-onclick="openAppointmentModal()"><i className="fas fa-plus"></i> Schedule Call</button>
                        </div>
                    </div>

                    <div className="filter-controls-bar">
                        <div className="search-box-wrap">
                            <i className="fas fa-search"></i>
                            <input type="text" id="appointmentSearchInput" aria-label="Search discovery calls" placeholder="Search sessions by name, email, topic, or date..." data-oninput="renderAppointments()" />
                        </div>
                        <div className="filter-pills-row" id="appointmentFilterRow">
                            <button className="filter-pill-btn active" data-onclick="setAppointmentFilter('all', this)">All Sessions</button>
                            <button className="filter-pill-btn" data-onclick="setAppointmentFilter('upcoming', this)">Upcoming</button>
                            <button className="filter-pill-btn" data-onclick="setAppointmentFilter('completed', this)">Completed</button>
                            <button className="filter-pill-btn" data-onclick="setAppointmentFilter('rescheduled', this)">Rescheduled</button>
                            <button className="filter-pill-btn" data-onclick="setAppointmentFilter('cancelled', this)">Cancelled</button>
                        </div>
                    </div>

                    <div id="appointmentsList"></div>
                </div>

                <div id="projects" className="section-content">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Project Portfolio</h1>
                            <p className="header-subtitle">Manage client case studies, technology stacks, categories, and live links</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-primary" data-onclick="openProjectModal()"><i className="fas fa-plus"></i> Add Project</button>
                        </div>
                    </div>

                    <div className="filter-controls-bar">
                        <div className="search-box-wrap">
                            <i className="fas fa-search"></i>
                            <input type="text" id="projectSearchInput" aria-label="Search studio projects" placeholder="Search projects by title, tech, or description..." data-oninput="renderProjects()" />
                        </div>
                        <div className="filter-pills-row" id="projectCategoryFilterRow">
                            <button className="filter-pill-btn active" data-onclick="setProjectCategoryFilter('all', this)">All Categories</button>
                            <button className="filter-pill-btn" data-onclick="setProjectCategoryFilter('startup', this)">Startup / SaaS</button>
                            <button className="filter-pill-btn" data-onclick="setProjectCategoryFilter('ecommerce', this)">E-Commerce</button>
                            <button className="filter-pill-btn" data-onclick="setProjectCategoryFilter('school', this)">Institutional</button>
                            <button className="filter-pill-btn" data-onclick="setProjectCategoryFilter('brand', this)">Brand &amp; Mobile</button>
                        </div>
                    </div>

                    <div id="projectsList" className="item-list"></div>
                </div>

                {/* ═══════════════════════════════════════════
                     4. TESTIMONIALS SECTION
                     ═══════════════════════════════════════════ */}
                <div id="testimonials" className="section-content">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Client Testimonials</h1>
                            <p className="header-subtitle">Manage verified customer endorsements, ratings, and quotes</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-primary" data-onclick="openTestimonialModal()"><i className="fas fa-plus"></i> Add Testimonial</button>
                        </div>
                    </div>

                    <div className="filter-controls-bar">
                        <div className="search-box-wrap">
                            <i className="fas fa-search"></i>
                            <input type="text" id="testimonialSearchInput" aria-label="Search client reviews" placeholder="Search testimonials by name or company..." data-oninput="renderTestimonials()" />
                        </div>
                    </div>

                    <div id="testimonialsList" className="item-list"></div>
                </div>

                {/* ═══════════════════════════════════════════
                     5. STUDIO SETTINGS SECTION
                     ═══════════════════════════════════════════ */}
                <div id="settings" className="section-content">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Studio Settings</h1>
                            <p className="header-subtitle">Update global parameters, contact endpoints, and footer metadata</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Global Studio Configuration</h3>
                        <div className="form-row" style={{ marginTop: '1.25rem' }}>
                            <div className="form-group">
                                <label className="form-label">Copyright Year</label>
                                <input type="number" className="form-input" id="footerYear" aria-label="Copyright year" value="2026" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Studio Availability Status</label>
                                <input type="text" className="form-input" id="studioStatus" aria-label="Studio availability status" value="Open for Select Q4 / 2026 Engagements" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Direct Studio Email</label>
                                <input type="email" className="form-input" id="studioEmail" aria-label="Studio contact email" value="info@appvertex.in" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">WhatsApp Contact Number</label>
                                <input type="text" className="form-input" id="studioWhatsApp" aria-label="Studio WhatsApp number" value="+91 93229 71253" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                            <button className="btn btn-secondary" data-onclick="saveStudioSettings()">
                                <i className="fas fa-sliders-h"></i> Save Settings Only
                            </button>
                            <button className="btn btn-primary" data-onclick="saveAllChanges()">
                                <i className="fas fa-save"></i> Save All Studio Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
                     6. BACKUP & EXPORT SECTION
                     ═══════════════════════════════════════════ */}
                <div id="export" className="section-content">
                    <div className="header">
                        <div className="header-title-wrap">
                            <h1>Data Backup &amp; Code Export</h1>
                            <p className="header-subtitle">Export portable JSON backups or generate standalone code builds</p>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Complete JSON Data Backup</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.25rem', fontSize: '0.9rem' }}>
                            Download or restore an exact snapshot of your projects, testimonials, and studio inquiries.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button className="btn btn-primary" data-onclick="downloadJSONBackup()"><i className="fas fa-download"></i> Export JSON Backup</button>
                            <label className="btn btn-secondary" style={{ marginBottom: '0' }}>
                                <i className="fas fa-upload"></i> Restore from JSON
                                <input type="file" id="importJsonFileInput" aria-label="Import JSON backup file" accept=".json" style={{ display: 'none' }} data-onchange="importJSONBackup(this)" />
                            </label>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Static index.html Build Generator</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.25rem', fontSize: '0.9rem' }}>
                            Generates the live index.html with the synchronized copyright year and content embedded.
                        </p>
                        <button className="btn btn-primary" data-onclick="generateCode()"><i className="fas fa-code"></i> Generate Static index.html</button>
                        <div id="codeOutput" className="code-preview" style={{ marginTop: '1.25rem' }}>Click 'Generate Static index.html' to review code...</div>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                            <button className="btn btn-secondary" data-onclick="copyCode()"><i className="fas fa-copy"></i> Copy to Clipboard</button>
                            <button className="btn btn-primary" data-onclick="downloadCode()"><i className="fas fa-file-download"></i> Download index.html</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    {/* ═══════════════════════════════════════════
         PROJECT MODAL
         ═══════════════════════════════════════════ */}
    <div className="modal-overlay" id="projectModal" data-onclick="if(event.target===this)closeModal('projectModal')">
        <div className="modal">
            <div className="modal-header">
                <h3 id="projectModalTitle">Add Project</h3>
                <button className="modal-close-btn" data-onclick="closeModal('projectModal')">&times;</button>
            </div>
            <div className="modal-body">
                <input type="hidden" id="projectId" />
                
                <div className="form-group">
                    <label className="form-label">Project Name / Domain *</label>
                    <input type="text" className="form-input" id="projectName" aria-label="Project name" placeholder="e.g. lorettocentralschool.edu.in" required />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <select className="form-select" id="projectCategory">
                            <option value="startup">Startup &amp; SaaS</option>
                            <option value="ecommerce">Brand &amp; E-Commerce</option>
                            <option value="school">School &amp; Institutional</option>
                            <option value="brand">Brand &amp; Identity</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Year</label>
                        <input type="number" className="form-input" id="projectYear" aria-label="Project release year" value="2026" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Short Description</label>
                    <textarea className="form-textarea" id="projectDesc" rows="3" placeholder="Brief outline of the client solution, architecture, and results..."></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label">Tech Stack (comma separated, max 3)</label>
                    <input type="text" className="form-input" id="projectTech" aria-label="Project technology stack" placeholder="React.js, Node.js, MySQL" />
                </div>

                <div className="form-group">
                    <label className="form-label">Live Link (Optional)</label>
                    <input type="text" className="form-input" id="projectLink" aria-label="Project live URL" placeholder="https://example.com or #contact" />
                </div>

                <div className="form-group">
                    <label className="form-label">Project Cover / Screenshot</label>
                    <div className="image-upload" id="projectImageUpload">
                        <input type="file" id="projectImage" aria-label="Upload project preview image" accept="image/*" data-onchange="handleImageUpload(this, 'project')" />
                        <div id="projectPlaceholder">
                            <i className="fas fa-image" style={{ fontSize: '1.8rem', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}></i>
                            <p style={{ fontWeight: '600', fontSize: '0.88rem' }}>Click to upload screenshot</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PNG, JPG or WebP (Auto-optimized)</span>
                        </div>
                        <img id="projectPreview" className="upload-preview" style={{ display: 'none' }} alt="Project Preview" />
                    </div>
                    <div id="projectRemoveImageRow" style={{ display: 'none', textAlign: 'right' }}>
                        <button type="button" className="image-remove-btn" data-onclick="removeImage('project')"><i className="fas fa-trash"></i> Remove Image</button>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-onclick="closeModal('projectModal')">Cancel</button>
                <button type="button" className="btn btn-primary" data-onclick="saveProject()"><i className="fas fa-check"></i> Save Project</button>
            </div>
        </div>
    </div>

    {/* ═══════════════════════════════════════════
         TESTIMONIAL MODAL
         ═══════════════════════════════════════════ */}
    <div className="modal-overlay" id="testimonialModal" data-onclick="if(event.target===this)closeModal('testimonialModal')">
        <div className="modal">
            <div className="modal-header">
                <h3 id="testimonialModalTitle">Add Testimonial</h3>
                <button className="modal-close-btn" data-onclick="closeModal('testimonialModal')">&times;</button>
            </div>
            <div className="modal-body">
                <input type="hidden" id="testimonialId" />

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Client Name *</label>
                        <input type="text" className="form-input" id="testimonialName" aria-label="Testimonial author name" placeholder="e.g. Loretto Administration" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role &amp; Organization</label>
                        <input type="text" className="form-input" id="testimonialRole" aria-label="Testimonial author role" placeholder="e.g. Institutional Client" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Star Rating</label>
                    <select className="form-select" id="testimonialRating">
                        <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                        <option value="4">★★★★☆ (4 Stars - Great)</option>
                        <option value="3">★★★☆☆ (3 Stars - Satisfactory)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Testimonial Quote *</label>
                    <textarea className="form-textarea" id="testimonialText" rows="4" placeholder="Client feedback regarding delivery speed, quality, and architecture..." required></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label">Client Photo / Avatar (Optional)</label>
                    <div className="image-upload" id="testimonialImageUpload">
                        <input type="file" id="testimonialImage" aria-label="Upload author avatar" accept="image/*" data-onchange="handleImageUpload(this, 'testimonial')" />
                        <div id="testimonialPlaceholder">
                            <i className="fas fa-user-circle" style={{ fontSize: '1.8rem', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}></i>
                            <p style={{ fontWeight: '600', fontSize: '0.88rem' }}>Click to upload avatar</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Leave empty to use client initials badge</span>
                        </div>
                        <img id="testimonialPreview" className="upload-preview avatar" style={{ display: 'none' }} alt="Client Avatar" />
                    </div>
                    <div id="testimonialRemoveImageRow" style={{ display: 'none', textAlign: 'right' }}>
                        <button type="button" className="image-remove-btn" data-onclick="removeImage('testimonial')"><i className="fas fa-trash"></i> Remove Avatar</button>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-onclick="closeModal('testimonialModal')">Cancel</button>
                <button type="button" className="btn btn-primary" data-onclick="saveTestimonial()"><i className="fas fa-check"></i> Save Testimonial</button>
            </div>
        </div>
    </div>

    
    {/* ═══════════════════════════════════════════
         APPOINTMENT / DISCOVERY CALL MODAL
         ═══════════════════════════════════════════ */}
    <div className="modal-overlay" id="appointmentModal" data-onclick="if(event.target===this)closeModal('appointmentModal')">
        <div className="modal">
            <div className="modal-header">
                <h3 id="appointmentModalTitle">Schedule Discovery Session</h3>
                <button className="modal-close-btn" data-onclick="closeModal('appointmentModal')">&times;</button>
            </div>
            <div className="modal-body">
                <input type="hidden" id="appointmentId" />

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Client Name *</label>
                        <input type="text" className="form-input" id="apptClientName" placeholder="e.g. Alex Morgan" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Work Email *</label>
                        <input type="email" className="form-input" id="apptClientEmail" placeholder="alex@company.com" required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Phone / WhatsApp</label>
                        <input type="tel" className="form-input" id="apptClientPhone" placeholder="+91 93229 71253" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Company / Organization</label>
                        <input type="text" className="form-input" id="apptClientCompany" placeholder="e.g. Acme SaaS" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Session Date *</label>
                        <input type="date" className="form-input" id="apptDate" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Time Slot (IST) *</label>
                        <select className="form-select" id="apptTimeSlot">
                            <option value="10:00 AM">10:00 AM IST</option>
                            <option value="10:45 AM">10:45 AM IST</option>
                            <option value="11:30 AM">11:30 AM IST</option>
                            <option value="02:00 PM">02:00 PM IST</option>
                            <option value="02:45 PM">02:45 PM IST</option>
                            <option value="03:30 PM">03:30 PM IST</option>
                            <option value="04:15 PM">04:15 PM IST</option>
                            <option value="05:30 PM">05:30 PM IST</option>
                            <option value="06:15 PM">06:15 PM IST</option>
                            <option value="07:00 PM">07:00 PM IST</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Discussion Topic</label>
                    <select className="form-select" id="apptTopic">
                        <option value="New Web / SaaS Platform">New Web Application / Custom SaaS Platform</option>
                        <option value="Architecture Review & Performance Audit">Architecture Review &amp; Performance Audit</option>
                        <option value="Institutional / Corporate Portal">Institutional / Corporate Portal</option>
                        <option value="Modernization / Codebase Migration">Modernization / Codebase Migration</option>
                        <option value="Engineering Upskilling / Team Training">Engineering Upskilling / Team Training</option>
                        <option value="General Technical Consultation">General Technical Consultation</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Google Meet Link</label>
                    <input type="text" className="form-input" id="apptMeetUrl" placeholder="https://meet.google.com/apv-xxxx-xxx" />
                </div>

                <div className="form-group">
                    <label className="form-label">Discussion Notes &amp; Objectives</label>
                    <textarea className="form-textarea" id="apptNotes" rows="3" placeholder="Context on client requirements, pain points, or previous communication..."></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" id="apptStatus">
                        <option value="upcoming">🟢 Upcoming</option>
                        <option value="completed">✅ Completed</option>
                        <option value="rescheduled">🟡 Rescheduled</option>
                        <option value="cancelled">⚪ Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-onclick="closeModal('appointmentModal')">Cancel</button>
                <button type="button" className="btn btn-primary" data-onclick="saveAppointment()"><i className="fas fa-check"></i> Save Session</button>
            </div>
        </div>
    </div>


    {/* TOAST NOTIFICATION CONTAINER */}
    <div className="toast-container" id="toastContainer"></div>

    {/* ═══════════════════════════════════════════
         APPLICATION JAVASCRIPT LOGIC
         ═══════════════════════════════════════════ */}
    </div>
  );
}
