# AppVertex Studio — Architecture & Project Structure Guide

## 1. System Overview
AppVertex is a high-performance digital studio website and customer portal engineered as a modern **React 18 Single-Page Application (SPA)** with **Vite 5.4.x**.

- **Frontend Core**: React 18, React Router v6, Modular CSS3 (`style.css`), Vite 5.4.x.
- **Data & State Management**: `StudioDataContext` with local-first persistence (`localStorage`), cross-tab synchronization via `BroadcastChannel`, and portable JSON backups.
- **Admin Console**: Standalone studio management console (`/admin`) for portfolio case studies, reviews, client inquiries, upskill mentorship applications, and studio settings.
- **Hosting Target**: GitHub Pages & any static web hosting provider (via `dist/` build output). Zero external backend server dependencies required.

---

## 2. Directory Structure

```
appvertex/
├── .github/                     # Automated deployment workflows (GitHub Pages)
├── .vscode/                     # Recommended editor settings & workspace configurations
├── docs/                        # Architecture documentation, schemas, and developer guides
│   └── ARCHITECTURE.md          # Architecture, directory map, and workflows (this file)
├── public/                      # Vite Public Directory (unbundled static assets served at web root)
│   ├── .nojekyll                # Prevents GitHub Pages Jekyll processing
│   ├── robots.txt               # Search crawler permissions
│   ├── sitemap.xml              # Search engine XML index
│   ├── logo.png                 # Primary studio brand mark
│   ├── admin-legacy.js          # Admin console controller & local-first storage manager
│   ├── hero-*.png/jpg           # High-resolution portfolio visual showcases
│   └── services/                # Production service artboards & mockups (srv-*.jpg)
├── src/                         # React Application Source Code
│   ├── components/              # Modular UI components (Navbar, Footer, UniqueTestimonials, BottomDock)
│   ├── context/                 # Context providers (StudioDataContext, ThemeContext)
│   ├── hooks/                   # Custom React hooks (useTheme, useScrollReveal)
│   ├── pages/                   # Application route views (Home, Work, Services, Process, About, Contact, Upskill, Admin)
│   ├── styles/                  # Modular styles & Master Juniper & Desert Sand design system
│   ├── utils/                   # Helper utilities (assetHelper, SplashCursor)
│   ├── App.jsx                  # Root application & client-side route tree
│   └── main.jsx                 # Vite application entry point
├── package.json                 # Project scripts and dependencies
├── package-lock.json            # Frontend dependency lockfile
└── vite.config.js               # Vite Rollup build configuration & dev server settings
```

---

## 3. Technology Stack & Key Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18 + React Router v6 | Declarative component hierarchy and fast client-side navigation. |
| **Build Tooling** | Vite 5.4.x | Fast HMR development server and optimized Rollup production bundler. |
| **Styling** | Custom CSS3 Tokens | Juniper & Desert Sand color palette, Manrope + JetBrains Mono typography, zero-flash dark theme via `data-theme="dark"`. |
| **State & Persistence** | StudioDataContext | Local-first persistence in `localStorage`, real-time cross-tab updates with `BroadcastChannel`. |
| **Admin Console** | Standalone Studio Admin | Full client-side CRUD for projects, testimonials, inquiries, appointments, and studio settings. |

---

## 4. Development & Build Commands

```bash
# Start local development server (with network host binding)
npm run dev

# Compile optimized production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Coding & Organization Conventions

- **Component Layer (`src/components/`)**: Self-contained UI components and modular injectors.
- **Context Layer (`src/context/`)**: Application-wide state providers for studio data and theme preferences.
- **Styles Layer (`src/styles/`)**: Global tokens, variables, responsive breakpoints, and reset rules.
- **Static Assets (`public/`)**: Any file in `public/` is served at the absolute root `/`. In JSX, use `assetUrl(...)` from `src/utils/assetHelper.js` to ensure base-path portability across custom domains and GitHub Pages subpaths.
