# AppVertex Studio — Architecture & Project Structure Guide

## 1. System Overview
AppVertex is a high-performance digital studio website and customer portal engineered as a **Vite Multi-Page Application (MPA)** with a serverless backend powered by **Firebase Functions** and **Firebase Firestore**.

- **Frontend Core**: Vanilla Semantic HTML5, Modular CSS3 (`style.css`), ES Modules (Vite 5.4.x).
- **Backend Services**: Firebase Cloud Functions (Node.js runtime, Express HTTP API in `functions/`).
- **Database & CMS**: Firebase Firestore (real-time collections for projects, inquiries, upskill registrations, and testimonials).
- **Hosting Target**: Firebase Hosting & GitHub Pages (via `dist/` build output).

---

## 2. Directory Structure

```
appvertex/
├── .github/                     # Continuous Integration & Automated Deployment workflows
├── .vscode/                     # Recommended editor settings & workspace configurations
├── docs/                        # Architecture documentation, schemas, and developer guides
│   └── ARCHITECTURE.md          # Architecture, directory map, and workflows (this file)
├── functions/                   # Serverless Firebase Cloud Functions backend
│   ├── index.js                 # Contact & lead intake API with validation and CORS
│   ├── package.json             # Backend dependencies (firebase-functions, admin, node-fetch)
│   └── package-lock.json        # Backend dependency lockfile
├── public/                      # Vite Public Directory (unbundled static assets served at web root)
│   ├── .nojekyll                # Prevents GitHub Pages Jekyll processing
│   ├── robots.txt               # Search crawler permissions
│   ├── sitemap.xml              # Search engine XML index
│   ├── logo.png                 # Primary studio brand mark
│   ├── hero-*.png/jpg           # High-resolution portfolio visual showcases
│   └── services/                # Production service artboards & mockups (srv-*.jpg)
├── src/                         # Modular Source Code (managed and bundled by Vite)
│   ├── components/
│   │   └── footer.js            # Universal studio footer web component & dynamic injector
│   ├── config/
│   │   └── firebase-config.js   # Firebase client SDK initialization & credentials
│   ├── styles/
│   │   └── style.css            # Master Juniper & Desert Sand design system & theme tokens
│   └── utils/
│       └── SplashCursor.js      # Interactive fluid canvas particle cursor utility
├── about.html                   # About the Studio, founders, and engineering philosophy
├── admin.html                   # Internal CMS console (Case studies, submissions, live telemetry)
├── contact.html                 # Booking calendar, interactive proposal form, project inquiry
├── index.html                   # Landing page (Hero, core stack, client testimonials, CTA)
├── process.html                 # 5-phase sprint & operational process, FAQ
├── services.html                # 8 core production services & technical specification matrices
├── upskill.html                 # Engineering fellowship / masterclass application
├── work.html                    # Selected case studies, portfolio filter, and live Firestore sync
├── .firebaserc                  # Firebase project aliases
├── .gitignore                   # Version control exclusion rules
├── firebase.json                # Firebase Hosting rewrites, Firestore rules, and Functions config
├── firestore.indexes.json       # Firestore database composite index definitions
├── firestore.rules              # Firestore security access control rules
├── package.json                 # Project scripts and dependencies
├── package-lock.json            # Frontend dependency lockfile
└── vite.config.js               # Multi-page Rollup input configuration & dev server settings
```

---

## 3. Technology Stack & Key Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Build Tooling** | Vite 5.4.x | Fast HMR development server and optimized Rollup MPA production bundler. |
| **Styling** | Custom CSS3 Tokens | Juniper & Desert Sand color palette, Manrope + JetBrains Mono typography, zero-flash dark theme via `data-theme="dark"`. |
| **Runtime Modules** | ES6 Modules | Clean native browser modules (`/src/components/footer.js`, `/src/config/firebase-config.js`). |
| **Backend API** | Firebase Cloud Functions | `functions/index.js` handling contact submissions, validation, sanitization, and alert webhooks. |
| **Persistence** | Firebase Firestore | Real-time cloud sync for dynamic case studies and lead storage. |

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

- **Component Layer (`src/components/`)**: Self-contained UI injectors or reusable modular functions.
- **Config Layer (`src/config/`)**: Environment variables, third-party API configurations, and Firebase client settings.
- **Styles Layer (`src/styles/`)**: Global tokens, variables, responsive breakpoints, and reset rules.
- **Static Assets (`public/`)**: Any file in `public/` is served at the absolute root `/`. In HTML, always refer to public static assets using a leading slash (e.g. `/logo.png`, `/services/srv-web-design.jpg`).
- **Entry Points (`*.html`)**: Keep HTML page routes at root to preserve 100% backward-compatible URLs, canonical tags, and anchor links.
