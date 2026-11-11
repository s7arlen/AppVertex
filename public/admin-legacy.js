
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore, doc, setDoc, getDocs, getDoc, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
        import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
        import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
        import firebaseConfig from "/src/config/firebase-config.js";

        // Init Firebase Safe Wrap
        let app = null, db = null, auth = null, storage = null;
        try {
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            storage = getStorage(app);
        } catch (err) {
            console.warn("Firebase initialization notice:", err);
        }

        // State Store
        let isLocalMode = false;

        function escapeJsStr(val) {
            return String(val ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/</g, '\\x3c').replace(/>/g, '\\x3e');
        }

        function sanitizeCsv(val) {
            let s = String(val ?? '');
            if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
            return `"${s.replace(/"/g, '""')}"`;
        }

        let testimonials = [];
        let projects = [];
        let inquiries = [];
        let applications = [];
        let studioSettings = {
            footerYear: "2026",
            status: "Open for Select Q4 / 2026 Engagements",
            email: "info@appvertex.in",
            whatsapp: "+91 93229 71253"
        };
        let currentTestimonialImage = null;
        let currentProjectImage = null;
        let activeProjectCategory = 'all';
        let activeInquiryFilter = 'all';
        let activeApplicationFilter = 'all';

        // ─── UTILITY & NORMALIZATION HELPERS ───
        function escapeHTML(str) {
            return String(str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        }

        function safeImageSrc(url) {
            if (!url || typeof url !== 'string') return '';
            const clean = url.trim();
            if (/^(https?:\/\/|data:image\/|hero-|logo\.|\.\/)/i.test(clean) || /\.(png|jpg|jpeg|webp|svg)$/i.test(clean)) {
                return clean;
            }
            return '';
        }

        function normCat(cat) {
            const c = String(cat || '').toLowerCase().trim();
            if (c.includes('school') || c.includes('institution') || c.includes('edu')) return 'school';
            if (c.includes('ecom') || c.includes('boutique') || c.includes('store')) return 'ecommerce';
            if (c.includes('brand') || c.includes('identity')) return 'brand';
            return 'startup';
        }

        const DEFAULT_PROJECTS = [
            {
                id: "loretto-portal",
                name: "Loretto Central School Portal",
                title: "Loretto Central School Portal",
                category: "school",
                categoryLabel: "Education Portal",
                year: 2026,
                image: "hero-rosewood-showcase.png",
                previewImage: "hero-rosewood-showcase.png",
                emoji: "🎓",
                color: "linear-gradient(135deg,#1e1b4b,#4338ca)",
                description: "Redesigned and developed the official website for Loretto Central School with modern UI, student intake portal, and responsive architecture.",
                technologies: ["React.js", "Firebase", "Node.js"],
                link: "https://lorettocentralschool.edu.in",
                liveUrl: "https://lorettocentralschool.edu.in",
                urlDisplay: "lorettocentral.in"
            },
            {
                id: "launchpad-saas",
                name: "LaunchPad SaaS Platform",
                title: "LaunchPad SaaS Platform",
                category: "startup",
                categoryLabel: "SaaS & Startup",
                year: 2025,
                image: "hero-floating-phones-transparent.png",
                previewImage: "hero-floating-phones-transparent.png",
                emoji: "🚀",
                color: "linear-gradient(135deg,#0f172a,#0284c7)",
                description: "High-conversion landing experience and interactive analytics suite built for modern B2B SaaS teams.",
                technologies: ["React", "Node.js", "PostgreSQL"],
                link: "https://launchpad.dev",
                liveUrl: "https://launchpad.dev",
                urlDisplay: "launchpad.dev"
            },
            {
                id: "vimasneha-trust",
                name: "Vimasneha Trust",
                title: "Vimasneha Trust",
                category: "brand",
                categoryLabel: "Non-Profit Website",
                year: 2024,
                image: "hero-devices.png",
                previewImage: "hero-devices.png",
                emoji: "🤝",
                color: "linear-gradient(135deg,#7c2d12,#ea580c)",
                description: "Clean, accessible website for Vimasneha trust showcasing their social initiatives and enabling donations.",
                technologies: ["HTML/CSS", "JavaScript", "Firebase"],
                link: "https://vimasneha.org",
                liveUrl: "https://vimasneha.org",
                urlDisplay: "vimasneha.org"
            },
            {
                id: "rosewood-stage",
                name: "Rosewood Stage Studio",
                title: "Rosewood Stage Studio",
                category: "startup",
                categoryLabel: "Digital Showcase",
                year: 2024,
                image: "hero-rosewood-stage.png",
                previewImage: "hero-rosewood-stage.png",
                emoji: "🎨",
                color: "linear-gradient(135deg,#14532d,#22c55e)",
                description: "Interactive digital showcase and modern agency experience with fluid motion and responsive architecture.",
                technologies: ["JavaScript", "CSS3", "WebGL"],
                link: "https://s7arlen.github.io/AppVertex/",
                liveUrl: "https://s7arlen.github.io/AppVertex/",
                urlDisplay: "appvertex.in"
            }
        ];

        const DEFAULT_TESTIMONIALS = [
            {
                id: "alex-turner",
                name: "Alex Turner",
                role: "Founder & CEO, InnovateHub",
                rating: 5,
                text: "From architecture to production deployment, AppVertex shipped our complete platform in record time. Median load speed dropped under 800ms, and our conversion rate jumped 38% in the first month.",
                initials: "AT",
                image: "/testimonials/testimonial_alex.jpg"
            },
            {
                id: "scarlett-rivers",
                name: "Scarlett Rivers",
                role: "Product Lead, Synerify",
                rating: 5,
                text: "Partnering with AppVertex was a turning point. As a non-technical founder, having direct access to their senior founding engineers instead of account managers meant every architectural decision was crystal clear, rock-solid, and delivered in record time.",
                initials: "SR",
                image: "/testimonials/testimonial_scarlett_highres.jpg"
            },
            {
                id: "ethan-knight",
                name: "Ethan Knight",
                role: "Co-Founder @Inceptify",
                rating: 5,
                text: "AppVertex engineered our high-speed operational systems effortlessly — clean code, instantaneous reactivity, and total ownership from day one.",
                initials: "EK",
                image: "/testimonials/testimonial_ethan.jpg"
            },
            {
                id: "loretto-principal",
                name: "Sr. Mary Thomas",
                role: "Principal, Loretto Central School (CBSE)",
                rating: 5,
                text: "AppVertex built exactly what we needed. The institutional portal handles admissions, fee records, circulars, and parent communication without any fuss. Our staff picked it up immediately.",
                initials: "SM",
                image: "/services/srv-school-portal.jpg"
            }
        ];

        const DEFAULT_INQUIRIES = [
            {
                id: "inq-1",
                name: "Rahul Sharma",
                email: "rahul@apexfintech.io",
                phone: "+91 98450 12345",
                company: "Apex FinTech",
                service: "SaaS Product Engineering",
                budget: "₹1,00,000+",
                message: "Looking to build a customer self-serve dashboard with real-time analytics. Targeting Q4 launch.",
                date: "Today, 10:30 AM",
                status: "unread"
            },
            {
                id: "inq-2",
                name: "Sister Maria D'Souza",
                email: "principal@stpaulsedu.org",
                phone: "+91 94480 88219",
                company: "St. Paul's High School",
                service: "Institutional / School Portal",
                budget: "₹50,000 – ₹1,00,000",
                message: "Need a modern admissions portal with online fee collection and circular notices.",
                date: "Yesterday",
                status: "responded"
            }
        ];

        const DEFAULT_APPLICATIONS = [
            {
                id: "app-1718001",
                name: "Rohan Varma",
                email: "rohan.v@gmail.com",
                phone: "+91 98450 11223",
                track: "Track 01: Modern Frontend Architecture",
                background: "3rd year CS undergrad. Built React prototypes with Vite, eager to master real-world performance budgets, design tokens, and state management.",
                date: "2 hours ago",
                createdAt: "2026-10-22T10:00:00.000Z",
                status: "new"
            },
            {
                id: "app-1718002",
                name: "Sneha Patil",
                email: "sneha.designs@outlook.com",
                phone: "+91 97312 88490",
                track: "Track 03: UI/UX & Design Systems",
                background: "Junior UI designer with Figma experience. Looking to understand how high-converting design systems translate into code and responsive layouts.",
                date: "Yesterday",
                createdAt: "2026-10-21T15:30:00.000Z",
                status: "interviewed"
            }
        ];

        // ─── AUTHENTICATION HANDLERS ───
        if (auth) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const email = user.email || '';
                    const isAuthorized = email.endsWith('@appvertex.in') || email === 'appvertex.in@gmail.com' || email.includes('admin');
                    if (!isAuthorized) {
                        showToast("Access restricted: Administrator email required.", "error");
                        signOut(auth);
                        return;
                    }
                    isLocalMode = false;
                    document.getElementById('loginScreen').style.display = 'none';
                    document.getElementById('adminPanel').classList.add('visible');
                    document.getElementById('adminEmail').textContent = user.email;
                    document.getElementById('adminRole').textContent = "Cloud Admin";
                    document.getElementById('adminAvatar').textContent = (user.email[0] || 'A').toUpperCase();
                    const statusEl = document.getElementById('modeStatusText');
                    if (statusEl) statusEl.textContent = "Cloud Synchronized";
                    loadDataFromCloud();
                } else if (!isLocalMode) {
                    document.getElementById('loginScreen').style.display = 'flex';
                    document.getElementById('adminPanel').classList.remove('visible');
                }
            });
        }

        let isRegisterMode = false;

        function toggleAuthMode() {
            // Registration disabled for public security
        }

        async function handleAuthSubmit(e) {
            if (e) e.preventDefault();
            await handleLogin();
        }

        async function handleForgotPassword() {
            const emailInput = document.getElementById('loginEmail');
            const email = emailInput ? emailInput.value.trim() : '';
            const err = document.getElementById('loginError');
            const errMsg = document.getElementById('loginErrorMsg');

            if (!email) {
                if (err && errMsg) {
                    err.classList.add('show');
                    errMsg.textContent = "Please enter your admin email above first, then click Forgot Password.";
                }
                if (emailInput) emailInput.focus();
                return;
            }

            if (!auth) {
                showToast("Firebase Auth is unavailable in offline demo mode.", "error");
                return;
            }

            try {
                await sendPasswordResetEmail(auth, email);
                showToast(`Password reset link sent to ${email}! Check your inbox.`, "success");
                if (err) err.classList.remove('show');
            } catch(e) {
                if (err && errMsg) {
                    err.classList.add('show');
                    errMsg.textContent = e.message || "Failed to send reset email.";
                }
            }
        }

        function togglePasswordVisibility() {
            const input = document.getElementById('loginPassword');
            const icon = document.getElementById('passwordToggleIcon');
            if (!input || !icon) return;
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        }

        async function handleLogin() {
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPassword').value;
            const btn = document.getElementById('loginBtn');
            const btnText = document.getElementById('loginBtnText');
            const btnIcon = document.getElementById('loginBtnIcon');
            const err = document.getElementById('loginError');
            const errMsg = document.getElementById('loginErrorMsg');

            if (!email || !pass) {
                err.classList.add('show');
                errMsg.textContent = "Please enter both email and password.";
                return;
            }

            btn.disabled = true;
            if (btnText) btnText.textContent = "Signing In...";
            if (btnIcon) btnIcon.className = "fas fa-spinner fa-spin";
            err.classList.remove('show');

            try {
                await signInWithEmailAndPassword(auth, email, pass);
            } catch (e) {
                btn.disabled = false;
                if (btnText) btnText.textContent = "Sign In";
                if (btnIcon) btnIcon.className = "fas fa-arrow-right";
                err.classList.add('show');
                if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
                    errMsg.textContent = "Invalid email or password. Use 'Quick Local Access' for instant offline access.";
                } else {
                    errMsg.textContent = e.message;
                }
            }
        }

        async function handleRegister() {
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPassword').value;
            const btn = document.getElementById('loginBtn');
            const btnText = document.getElementById('loginBtnText');
            const btnIcon = document.getElementById('loginBtnIcon');
            const err = document.getElementById('loginError');
            const errMsg = document.getElementById('loginErrorMsg');

            if (!email || !pass) {
                err.classList.add('show');
                errMsg.textContent = "Enter your desired admin email and a password (min 6 chars).";
                return;
            }
            if (pass.length < 6) {
                err.classList.add('show');
                errMsg.textContent = "Password must be at least 6 characters.";
                return;
            }

            btn.disabled = true;
            if (btnText) btnText.textContent = "Creating Account...";
            if (btnIcon) btnIcon.className = "fas fa-spinner fa-spin";
            err.classList.remove('show');

            try {
                await createUserWithEmailAndPassword(auth, email, pass);
                showToast("Admin account registered!");
            } catch (e) {
                btn.disabled = false;
                if (btnText) btnText.textContent = "Create Account";
                if (btnIcon) btnIcon.className = "fas fa-arrow-right";
                err.classList.add('show');
                errMsg.textContent = e.message;
            }
        }

        function handleLocalMode(silent = false) {
            isLocalMode = true;
            localStorage.setItem('appvertex_admin_session', 'active');
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminPanel').classList.add('visible');
            document.getElementById('adminEmail').textContent = "developer@appvertex.local";
            document.getElementById('adminRole').textContent = "Studio Admin";
            document.getElementById('adminAvatar').textContent = "A";
            const modeEl = document.getElementById('modeStatusText');
            if (modeEl) modeEl.textContent = "Studio Admin Active";

            loadFromLocalStorage();
            saveToLocalStorage();
            refreshAllUI();
            if (!silent) showToast("Admin console active. Public site sync enabled!", "info");
        }

        async function handleLogout() {
            isLocalMode = false;
            localStorage.removeItem('appvertex_admin_session');
            if (auth) {
                try { await signOut(auth); } catch(e){}
            }
            document.getElementById('loginScreen').style.display = 'flex';
            document.getElementById('adminPanel').classList.remove('visible');
            showToast("Logged out of Admin Console", "info");
        }

        // ─── STORAGE SYNC HELPERS & CROSS-TAB BROADCAST ───
        const syncChannel = ('BroadcastChannel' in window) ? new BroadcastChannel('appvertex_sync') : null;
        if (syncChannel) {
            syncChannel.onmessage = (event) => {
                const msg = event.data;
                if (!msg) return;
                if (msg.type === 'NEW_INQUIRY' && msg.data) {
                    const exists = inquiries.some(i => i.id === msg.data.id);
                    if (!exists) {
                        inquiries.unshift(msg.data);
                        playChime();
                        const isCall = msg.data.type === 'SCHEDULED_DISCOVERY_CALL' || (msg.data.service && msg.data.service.includes('Discovery'));
                        if (isCall) {
                            showToast(`🗓️ New Discovery Call booked by ${msg.data.name}!`, "success");
                        } else {
                            showToast(`📩 New Proposal received from ${msg.data.name}!`, "info");
                        }
                        updateStats();
                        renderInquiries();
                        renderRecentInquiries();
                        renderAppointments();
                        renderRecentAppointments();
                    }
                } else if (msg.type === 'NEW_APPLICATION' && msg.data) {
                    const exists = applications.some(a => a.id === msg.data.id);
                    if (!exists) {
                        applications.unshift(msg.data);
                        playChime();
                        showToast(`🎓 New Upskill Application from ${msg.data.name}!`, "info");
                        updateStats();
                        renderApplications();
                        renderRecentApplications();
                    }
                }
            };
        }

        function mergeProjects(localList, cloudList, deletedIds = []) {
            const delSet = new Set(deletedIds || []);
            const map = new Map();

            if (Array.isArray(cloudList)) {
                cloudList.forEach(cp => {
                    const id = cp.id || cp.name;
                    if (id && !delSet.has(id)) {
                        map.set(id, cp);
                    }
                });
            }

            if (Array.isArray(localList)) {
                localList.forEach(lp => {
                    const id = lp.id || lp.name;
                    if (id && !delSet.has(id)) {
                        map.set(id, { ...(map.get(id) || {}), ...lp });
                    }
                });
            }

            return Array.from(map.values());
        }

        function mergeTestimonials(localList, cloudList, deletedIds = []) {
            const delSet = new Set(deletedIds || []);
            const map = new Map();
            if (Array.isArray(cloudList)) {
                cloudList.forEach(ct => {
                    const id = ct.id || ct.name;
                    if (id && !delSet.has(id)) map.set(id, ct);
                });
            }
            if (Array.isArray(localList)) {
                localList.forEach(lt => {
                    const id = lt.id || lt.name;
                    if (id && !delSet.has(id)) map.set(id, { ...(map.get(id) || {}), ...lt });
                });
            }
            return Array.from(map.values());
        }

        function saveToLocalStorage() {
            try {
                localStorage.setItem('appvertex_testimonials', JSON.stringify(testimonials));
                localStorage.setItem('appvertex_projects', JSON.stringify(projects));
                localStorage.setItem('appvertex_inquiries', JSON.stringify(inquiries));
                localStorage.setItem('appvertex_applications', JSON.stringify(applications));
                localStorage.setItem('appvertex_footer', JSON.stringify({ year: studioSettings.footerYear }));
                localStorage.setItem('appvertex_settings', JSON.stringify(studioSettings));

                // Instant broadcast to live website tabs (index.html, work.html)
                if (syncChannel) {
                    syncChannel.postMessage({
                        type: 'FULL_SYNC',
                        projects: projects,
                        testimonials: testimonials,
                        settings: studioSettings,
                        footerYear: studioSettings.footerYear,
                        timestamp: Date.now()
                    });
                }
            } catch(err) {
                console.warn("Storage quota notice:", err);
                if (err.name === 'QuotaExceededError' || err.code === 22) {
                    showToast("Browser local storage quota reached. Use Cloud mode or clean unneeded screenshots.", "error");
                }
            }
        }

        function loadFromLocalStorage() {
            try {
                const locT = localStorage.getItem('appvertex_testimonials');
                const locP = localStorage.getItem('appvertex_projects');
                const locI = localStorage.getItem('appvertex_inquiries');
                const locA = localStorage.getItem('appvertex_applications');
                const locF = localStorage.getItem('appvertex_footer');
                const locS = localStorage.getItem('appvertex_settings');
                
                try {
                    const parsedP = locP ? JSON.parse(locP) : null;
                    if (Array.isArray(parsedP) && parsedP.length > 0) {
                        const fallbackPool = ['hero-rosewood-showcase.png', 'hero-floating-phones-transparent.png', 'hero-devices.png', 'hero-rosewood-stage.png'];
                        projects = parsedP.map((p, i) => {
                            const img = safeImageSrc(p.image || p.previewImage) || fallbackPool[i % fallbackPool.length];
                            return {
                                ...p,
                                name: p.name || p.title || 'Project',
                                title: p.title || p.name || 'Project',
                                image: img,
                                previewImage: img,
                                link: p.link || p.liveUrl || '#contact',
                                liveUrl: p.liveUrl || p.link || '#contact'
                            };
                        });
                    } else {
                        projects = [...DEFAULT_PROJECTS];
                    }
                } catch(e) { projects = [...DEFAULT_PROJECTS]; }

                try {
                    const parsedT = locT ? JSON.parse(locT) : null;
                    testimonials = (Array.isArray(parsedT) && parsedT.length > 0) ? parsedT : [...DEFAULT_TESTIMONIALS];
                } catch(e) { testimonials = [...DEFAULT_TESTIMONIALS]; }

                try {
                    const parsedI = locI ? JSON.parse(locI) : null;
                    inquiries = (Array.isArray(parsedI) && parsedI.length > 0) ? parsedI : [...DEFAULT_INQUIRIES];
                } catch(e) { inquiries = [...DEFAULT_INQUIRIES]; }

                try {
                    const parsedA = locA ? JSON.parse(locA) : null;
                    applications = (Array.isArray(parsedA) && parsedA.length > 0) ? parsedA : [...DEFAULT_APPLICATIONS];
                } catch(e) { applications = [...DEFAULT_APPLICATIONS]; }

                if (locS) {
                    try { studioSettings = { ...studioSettings, ...JSON.parse(locS) }; } catch(e){}
                } else if (locF) {
                    try { studioSettings.footerYear = JSON.parse(locF).year || "2026"; } catch(e){}
                }
            } catch(e) {
                console.warn("Storage parse error:", e);
            }
        }

        // Listen for new inquiries or applications across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'appvertex_inquiries' && e.newValue) {
                try {
                    inquiries = JSON.parse(e.newValue);
                    renderInquiries();
                    renderRecentInquiries();
                    updateStats();
                    showToast("New client inquiry received!", "info");
                } catch(err){}
            }
            if (e.key === 'appvertex_applications' && e.newValue) {
                try {
                    applications = JSON.parse(e.newValue);
                    renderApplications();
                    renderRecentApplications();
                    updateStats();
                    showToast("New Upskill application received!", "info");
                } catch(err){}
            }
        });

        async function loadDataFromCloud() {
            loadFromLocalStorage();
            refreshAllUI();

            if (isLocalMode || !auth?.currentUser || !db) return;

            try {
                const tSnap = await getDocs(collection(db, "testimonials"));
                if (!tSnap.empty) {
                    const cloudT = tSnap.docs.map(d => ({id: d.id, ...d.data()}));
                    const delT = JSON.parse(localStorage.getItem('appvertex_deleted_testimonials') || '[]');
                    testimonials = mergeTestimonials(testimonials, cloudT, delT);
                }
                const pSnap = await getDocs(collection(db, "projects"));
                if (!pSnap.empty) {
                    const cloudP = pSnap.docs.map(d => ({id: d.id, ...d.data()}));
                    const delP = JSON.parse(localStorage.getItem('appvertex_deleted_projects') || '[]');
                    projects = mergeProjects(projects, cloudP, delP);
                }
                try {
                    const inqSnap = await getDocs(collection(db, "inquiries"));
                    if (!inqSnap.empty) {
                        inquiries = inqSnap.docs.map(d => ({id: d.id, ...d.data()}));
                    }
                } catch(e){}
                try {
                    const appSnap = await getDocs(collection(db, "applications"));
                    if (!appSnap.empty) {
                        applications = appSnap.docs.map(d => ({id: d.id, ...d.data()}));
                    }
                } catch(e){}

                const fSnap = await getDoc(doc(db, "settings", "footer"));
                if (fSnap.exists() && fSnap.data().year) {
                    studioSettings.footerYear = fSnap.data().year;
                }
                const sSnap = await getDoc(doc(db, "settings", "studio"));
                if (sSnap.exists()) {
                    studioSettings = { ...studioSettings, ...sSnap.data() };
                }

                if (tSnap.empty && pSnap.empty && projects.length === 0) {
                    await seedDefaultData(false);
                }

                saveToLocalStorage();
                refreshAllUI();
            } catch (e) {
                console.warn("Cloud sync warning:", e);
                showToast("Loaded from local cache", "info");
            }
        }

        async function seedDefaultData(showNotification = true) {
            if (showNotification) showToast("Seeding website content...", "info");
            projects = [...DEFAULT_PROJECTS];
            testimonials = [...DEFAULT_TESTIMONIALS];
            inquiries = [...DEFAULT_INQUIRIES];
            applications = [...DEFAULT_APPLICATIONS];
            studioSettings.footerYear = "2026";
            saveToLocalStorage();

            if (auth?.currentUser && db && !isLocalMode) {
                try {
                    for (const t of testimonials) await setDoc(doc(db, "testimonials", t.id), t);
                    for (const p of projects) await setDoc(doc(db, "projects", p.id), p);
                    for (const i of inquiries) await setDoc(doc(db, "inquiries", i.id), i);
                    for (const a of applications) await setDoc(doc(db, "applications", a.id), a);
                    await setDoc(doc(db, "settings", "footer"), { year: studioSettings.footerYear });
                    await setDoc(doc(db, "settings", "studio"), studioSettings);
                } catch (err) {
                    console.warn("Cloud write warning:", err);
                }
            }

            refreshAllUI();
            if (showNotification) showToast("Default portfolio & intake content restored!");
        }

        async function importLocalData() {
            loadFromLocalStorage();
            if (!auth?.currentUser || !db || isLocalMode) {
                refreshAllUI();
                return showToast("Refreshed from browser storage!");
            }

            showToast("Pushing local cache to Cloud...", "info");
            try {
                for (const t of testimonials) await setDoc(doc(db, "testimonials", t.id), t);
                for (const p of projects) await setDoc(doc(db, "projects", p.id), p);
                for (const i of inquiries) await setDoc(doc(db, "inquiries", i.id), i);
                for (const a of applications) await setDoc(doc(db, "applications", a.id), a);
                await setDoc(doc(db, "settings", "footer"), { year: studioSettings.footerYear });
                await setDoc(doc(db, "settings", "studio"), studioSettings);
                showToast("Cloud sync complete!");
                loadDataFromCloud();
            } catch (err) {
                showToast("Sync error: " + err.message, "error");
            }
        }

        function refreshAllUI() {
            updateStats();
            renderProjects();
            renderTestimonials();
            renderInquiries();
            renderApplications();
            renderRecentProjects();
            renderRecentInquiries();
            renderRecentApplications();
            document.getElementById('footerYear').value = studioSettings.footerYear;
            document.getElementById('studioStatus').value = studioSettings.status;
            document.getElementById('studioEmail').value = studioSettings.email;
            document.getElementById('studioWhatsApp').value = studioSettings.whatsapp;
        }

        function renderRecentInquiries() {
            const container = document.getElementById('dashboardRecentInquiries');
            if (!container) return;
            const recent = inquiries.slice(0, 3);
            if (recent.length === 0) {
                container.innerHTML = `<p style="color:var(--text-muted); font-size:0.88rem; padding:1rem; text-align:center; background:var(--bg-canvas); border-radius:var(--radius-sm);">No inquiries yet. Click "Simulate Lead" above to test the intake pipeline.</p>`;
                return;
            }
            container.innerHTML = recent.map(inq => {
                const isNew = inq.status === 'unread' || inq.status === 'new';
                const waUrl = inq.phone ? `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.name)}%2C%20thank%20you%20for%20contacting%20AppVertex%21` : '#';
                const mailUrl = `mailto:${encodeURIComponent(inq.email)}?subject=Re:%20AppVertex%20Project%20Inquiry`;
                return `
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1.1rem; background:var(--bg-canvas); border-radius:var(--radius-sm); border:1px solid var(--border); ${isNew ? 'border-left:3px solid var(--primary);' : ''}">
                        <div>
                            <div style="display:flex; align-items:center; gap:0.5rem;">
                                <strong>${escapeHTML(inq.name)}</strong>
                                ${isNew ? '<span class="nav-badge" style="background:#EF4444; color:#fff; font-size:0.65rem; padding:0.15rem 0.45rem;">NEW</span>' : ''}
                                <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(inq.date || 'Recent')}</span>
                            </div>
                            <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;">
                                ${escapeHTML(inq.service || 'Proposal')} · ${escapeHTML(inq.email)}
                            </div>
                        </div>
                        <div style="display:flex; gap:0.4rem;">
                            <a href="${mailUrl}" class="btn-icon" title="Email Lead"><i class="fas fa-envelope"></i></a>
                            ${inq.phone ? `<a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" style="color:#10B981;" title="WhatsApp Lead"><i class="fab fa-whatsapp"></i></a>` : ''}
                            <button class="btn-icon" onclick="showSection('inquiries')" title="View in Inbox"><i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderRecentApplications() {
            const container = document.getElementById('dashboardRecentApplications');
            if (!container) return;
            const recent = applications.slice(0, 3);
            if (recent.length === 0) {
                container.innerHTML = `<p style="color:var(--text-muted); font-size:0.88rem; padding:1rem; text-align:center; background:var(--bg-canvas); border-radius:var(--radius-sm);">No applicants yet. Click "Simulate Candidate" above to test the Upskill intake pipeline.</p>`;
                return;
            }
            container.innerHTML = recent.map(app => {
                const isNew = app.status === 'new';
                const waUrl = app.phone ? `https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(app.name)}%2C%20regarding%20your%20AppVertex%20Upskill%20application...` : '#';
                const mailUrl = `mailto:${encodeURIComponent(app.email)}?subject=Re:%20AppVertex%20Upskill%20Mentorship%20Application`;
                return `
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1.1rem; background:var(--bg-canvas); border-radius:var(--radius-sm); border:1px solid var(--border); ${isNew ? 'border-left:3px solid var(--primary);' : ''}">
                        <div>
                            <div style="display:flex; align-items:center; gap:0.5rem;">
                                <strong>${escapeHTML(app.name)}</strong>
                                ${isNew ? '<span class="nav-badge" style="background:#EF4444; color:#fff; font-size:0.65rem; padding:0.15rem 0.45rem;">NEW APPLICANT</span>' : `<span class="nav-badge" style="background:rgba(239,135,13,0.12); color:var(--primary); font-size:0.65rem; padding:0.15rem 0.45rem;">${escapeHTML(app.status.toUpperCase())}</span>`}
                                <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(app.date || 'Recent')}</span>
                            </div>
                            <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;">
                                <i class="fas fa-graduation-cap" style="color:var(--primary); font-size:0.75rem;"></i> ${escapeHTML(app.track || 'Track')} · ${escapeHTML(app.email)}
                            </div>
                        </div>
                        <div style="display:flex; gap:0.4rem;">
                            <a href="${mailUrl}" class="btn-icon" title="Email Candidate"><i class="fas fa-envelope"></i></a>
                            ${app.phone ? `<a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" style="color:#10B981;" title="WhatsApp Candidate"><i class="fab fa-whatsapp"></i></a>` : ''}
                            <button class="btn-icon" onclick="showSection('applications')" title="View in Intake"><i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function exportInquiriesCSV() {
            if (inquiries.length === 0) return showToast("No inquiries available to export", "info");
            const headers = ["ID", "Name", "Email", "Phone", "Company", "Service", "Budget", "Status", "Date", "Message"];
            const rows = inquiries.map(i => [
                sanitizeCsv(i.id),
                sanitizeCsv(i.name),
                sanitizeCsv(i.email),
                sanitizeCsv(i.phone),
                sanitizeCsv(i.company),
                sanitizeCsv(i.service),
                sanitizeCsv(i.budget),
                sanitizeCsv(i.status),
                sanitizeCsv(i.date),
                sanitizeCsv(i.message)
            ]);
            const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `appvertex-leads-${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            showToast(`Exported ${inquiries.length} leads to CSV!`);
        }

        function exportApplicationsCSV() {
            if (applications.length === 0) return showToast("No applications available to export", "info");
            const headers = ["ID", "Name", "Email", "Phone", "Track", "Status", "Applied Date", "Background"];
            const rows = applications.map(a => [
                sanitizeCsv(a.id),
                sanitizeCsv(a.name),
                sanitizeCsv(a.email),
                sanitizeCsv(a.phone),
                sanitizeCsv(a.track),
                sanitizeCsv(a.status),
                sanitizeCsv(a.date || a.createdAt),
                sanitizeCsv(a.background)
            ]);
            const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `appvertex-upskill-candidates-${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            showToast(`Exported ${applications.length} applicants to CSV!`);
        }

        function updateStats() {
            document.getElementById('statTestimonials').textContent = testimonials.length;
            document.getElementById('statProjects').textContent = projects.length;
            document.getElementById('statInquiries').textContent = inquiries.length;
            const statApp = document.getElementById('statApplications');
            if (statApp) statApp.textContent = applications.length;
            
            const calls = getAppointments();
            const statAppt = document.getElementById('statAppointments');
            if (statAppt) statAppt.textContent = calls.length;
            const badgeAppt = document.getElementById('badgeAppointmentsCount');
            if (badgeAppt) {
                const upcomingCalls = calls.filter(c => (c.status || 'upcoming').toLowerCase() === 'upcoming').length;
                badgeAppt.textContent = upcomingCalls;
                if (upcomingCalls > 0) {
                    badgeAppt.style.background = 'var(--primary)';
                    badgeAppt.style.color = '#fff';
                } else {
                    badgeAppt.style.background = 'var(--primary-soft)';
                    badgeAppt.style.color = 'var(--primary)';
                }
            }
            
            document.getElementById('statYear').textContent = studioSettings.footerYear;
            
            document.getElementById('badgeProjectsCount').textContent = projects.length;
            document.getElementById('badgeTestimonialsCount').textContent = testimonials.length;
            
            const unreadCount = inquiries.filter(i => i.status === 'unread' || i.status === 'new').length;
            const inqBadge = document.getElementById('badgeInquiriesCount');
            if (inqBadge) {
                inqBadge.textContent = unreadCount;
                if (unreadCount > 0) {
                    inqBadge.style.background = 'var(--primary)';
                    inqBadge.style.color = '#fff';
                } else {
                    inqBadge.style.background = 'var(--primary-soft)';
                    inqBadge.style.color = 'var(--primary)';
                }
            }

            const newAppsCount = applications.filter(a => a.status === 'new').length;
            const appBadge = document.getElementById('badgeApplicationsCount');
            if (appBadge) {
                appBadge.textContent = newAppsCount;
                if (newAppsCount > 0) {
                    appBadge.style.background = 'var(--primary)';
                    appBadge.style.color = '#fff';
                } else {
                    appBadge.style.background = 'var(--primary-soft)';
                    appBadge.style.color = 'var(--primary)';
                }
            }
        }

        // ─── NAVIGATION ───
        function showSection(id) {
            document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            const target = document.getElementById(id);
            if (target) target.classList.add('active');

            // Set active nav item
            const navLinks = document.querySelectorAll('.sidebar .nav-item');
            navLinks.forEach(link => {
                const clickAttr = link.getAttribute('onclick') || '';
                if (clickAttr.includes(`'${id}'`)) link.classList.add('active');
            });

            // Re-render target section to guarantee fresh contents
            if (id === 'projects') renderProjects();
            else if (id === 'testimonials') renderTestimonials();
            else if (id === 'inquiries') renderInquiries();
            else if (id === 'appointments') renderAppointments();
            else if (id === 'applications') renderApplications();
            else if (id === 'dashboard') {
                updateStats();
                renderRecentProjects();
                renderRecentAppointments();
                renderRecentInquiries();
                renderRecentApplications();
            }

            // Close mobile sidebar on selection only on mobile viewports
            if (window.innerWidth <= 1024) {
                toggleSidebar(false);
            }
        }

        function toggleSidebar(open = null) {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            if (!sidebar) return;

            if (open === true) {
                sidebar.classList.add('open');
                backdrop.classList.add('active');
            } else if (open === false) {
                sidebar.classList.remove('open');
                backdrop.classList.remove('active');
            } else {
                sidebar.classList.toggle('open');
                backdrop.classList.toggle('active');
            }
        }



        // ─── RENDER PROJECTS ───
        function setProjectCategoryFilter(cat, btn) {
            activeProjectCategory = cat;
            document.querySelectorAll('#projectCategoryFilterRow .filter-pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderProjects();
        }

        function renderProjects() {
            const list = document.getElementById('projectsList');
            if (!list) return;

            const q = (document.getElementById('projectSearchInput')?.value || '').toLowerCase().trim();
            let filtered = (Array.isArray(projects) ? projects : []).filter(p => {
                if (!p) return false;
                const pCat = normCat(p.category);
                const matchCat = (activeProjectCategory === 'all') || (pCat === activeProjectCategory);
                const techList = Array.isArray(p.technologies) 
                    ? p.technologies 
                    : (p.technologies ? String(p.technologies).split(',') : []);
                const matchQuery = !q || 
                    String(p.name || '').toLowerCase().includes(q) ||
                    String(p.description || '').toLowerCase().includes(q) ||
                    techList.some(t => String(t || '').toLowerCase().includes(q));
                return matchCat && matchQuery;
            });

            if (filtered.length === 0) {
                list.innerHTML = `<div class="card" style="text-align:center; padding:3rem; color:var(--text-muted);"><i class="fas fa-search" style="font-size:2rem; margin-bottom:0.75rem; opacity:0.4;"></i><p>No projects match your current filters. Click "+ Add Project" or clear search.</p></div>`;
                return;
            }

            list.innerHTML = filtered.map(p => {
                const rawTech = Array.isArray(p.technologies) 
                    ? p.technologies 
                    : (p.technologies ? String(p.technologies).split(',') : []);
                const techChips = rawTech
                    .map(t => String(t || '').trim())
                    .filter(t => t.length > 0)
                    .slice(0, 3)
                    .map(t => `<span class="tech-pill">${escapeHTML(t)}</span>`)
                    .join('');
                const imgSrc = safeImageSrc(p.image);

                return `
                    <div class="list-item">
                        ${imgSrc 
                            ? `<img src="${imgSrc}" class="item-image" alt="${escapeHTML(p.name || 'Project')}">`
                            : `<div class="item-image" style="background:var(--bg-canvas); display:flex; align-items:center; justify-content:center; font-size:1.8rem;">${escapeHTML(p.emoji || '🚀')}</div>`
                        }
                        <div class="item-content">
                            <div class="item-content-header">
                                <span class="item-title">${escapeHTML(p.name || 'Untitled Project')}</span>
                                <span class="category-tag-pill">${escapeHTML(p.categoryLabel || normCat(p.category).toUpperCase())}</span>
                                <span class="year-tag-pill">${escapeHTML(p.year || 2026)}</span>
                            </div>
                            <p class="item-desc">${escapeHTML(p.description || 'No description provided.')}</p>
                            <div class="item-tech-tags">${techChips}</div>
                        </div>
                        <div class="item-actions">
                            ${p.link && p.link !== '#contact' ? `<a href="${escapeHTML(p.link)}" target="_blank" rel="noopener" class="btn-icon" title="Open Live Site"><i class="fas fa-external-link-alt"></i></a>` : ''}
                            <button class="btn-icon" aria-label="Edit project" onclick="editProjectById('${escapeJsStr(p.id)}')" title="Edit" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon btn-danger" onclick="deleteProject('${escapeJsStr(p.id)}')" title="Delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderRecentProjects() {
            const container = document.getElementById('dashboardRecentProjects');
            if (!container) return;
            const topProjects = (Array.isArray(projects) ? projects : []).slice(0, 3);
            if (topProjects.length === 0) {
                container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">No projects yet. Click "+ New Project" to get started.</p>`;
                return;
            }
            container.innerHTML = topProjects.map(p => `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; background:var(--bg-canvas); border-radius:var(--radius-sm); border:1px solid var(--border);">
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                        <span style="font-size:1.3rem;">${escapeHTML(p.emoji || '🚀')}</span>
                        <div>
                            <strong>${escapeHTML(p.name || 'Untitled Project')}</strong>
                            <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(p.categoryLabel || normCat(p.category).toUpperCase())} · ${escapeHTML(p.year || 2026)}</div>
                        </div>
                    </div>
                    <button class="btn-icon" aria-label="Edit project" onclick="editProjectById('${escapeJsStr(p.id)}')" title="Edit"><i class="fas fa-edit"></i></button>
                </div>
            `).join('');
        }

        // ─── RENDER TESTIMONIALS ───
        function renderTestimonials() {
            const list = document.getElementById('testimonialsList');
            if (!list) return;

            const q = (document.getElementById('testimonialSearchInput')?.value || '').toLowerCase().trim();
            let filtered = (Array.isArray(testimonials) ? testimonials : []).filter(t => {
                if (!t) return false;
                return !q || 
                    String(t.name || '').toLowerCase().includes(q) ||
                    String(t.role || '').toLowerCase().includes(q) ||
                    String(t.text || '').toLowerCase().includes(q);
            });

            if (filtered.length === 0) {
                list.innerHTML = `<div class="card" style="text-align:center; padding:3rem; color:var(--text-muted);"><p>No testimonials found.</p></div>`;
                return;
            }

            list.innerHTML = filtered.map(t => {
                const imgSrc = safeImageSrc(t.image);
                const stars = '★'.repeat(Math.max(1, Math.min(5, Number(t.rating) || 5)));
                return `
                    <div class="list-item">
                        ${imgSrc 
                            ? `<img src="${imgSrc}" class="item-image avatar" alt="${escapeHTML(t.name || 'Client')}">`
                            : `<div class="item-image avatar" style="background:var(--primary); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:1.1rem;">${escapeHTML(t.initials || 'AV')}</div>`
                        }
                        <div class="item-content">
                            <div class="item-content-header">
                                <span class="item-title">${escapeHTML(t.name || 'Anonymous')}</span>
                                <span style="color:#F59E0B; font-size:0.9rem;">${stars}</span>
                                <span class="year-tag-pill">${escapeHTML(t.role || 'Client')}</span>
                            </div>
                            <p class="item-desc" style="font-style:italic;">"${escapeHTML(t.text || '')}"</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn-icon" onclick="editTestimonialById('${escapeJsStr(t.id)}')" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon btn-danger" onclick="deleteTestimonial('${escapeJsStr(t.id)}')" title="Delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // ─── RENDER INQUIRIES ───
        function setInquiryFilter(f, btn) {
            activeInquiryFilter = f;
            document.querySelectorAll('#inquiryFilterRow .filter-pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderInquiries();
        }

        function getInquiryStatusBadge(status) {
            switch(status) {
                case 'new':
                case 'unread':
                    return '<span class="nav-badge" style="background:#EF4444; color:#fff;">NEW LEAD</span>';
                case 'in_discussion':
                case 'responded':
                    return '<span class="nav-badge" style="background:#F59E0B; color:#fff;">IN DISCUSSION</span>';
                case 'proposal_sent':
                    return '<span class="nav-badge" style="background:#0284c7; color:#fff;">PROPOSAL SENT</span>';
                case 'won':
                    return '<span class="nav-badge" style="background:#10B981; color:#fff;">PROJECT WON</span>';
                case 'archived':
                    return '<span class="nav-badge" style="background:var(--border); color:var(--text-muted);">ARCHIVED</span>';
                default:
                    return `<span class="nav-badge">${escapeHTML((status||'new').toUpperCase())}</span>`;
            }
        }

        
        // ═══════════════════════════════════════════════════
        // DISCOVERY CALLS & APPOINTMENT CONTROLLER
        // ═══════════════════════════════════════════════════
        let activeAppointmentFilter = 'all';

        function getAppointments() {
            return (Array.isArray(inquiries) ? inquiries : []).filter(i => {
                if (!i) return false;
                return i.type === 'SCHEDULED_DISCOVERY_CALL' || 
                       (i.service && i.service.includes('Discovery Session')) ||
                       Boolean(i.scheduledDate);
            });
        }

        function renderAppointments() {
            const list = document.getElementById('appointmentsList');
            if (!list) return;

            const q = (document.getElementById('appointmentSearchInput')?.value || '').toLowerCase().trim();
            const allCalls = getAppointments();

            let filtered = allCalls.filter(call => {
                let status = (call.status || 'upcoming').toLowerCase();
                if (status === 'new' || status === 'unread') status = 'upcoming';

                const matchStatus = (activeAppointmentFilter === 'all') || (status === activeAppointmentFilter);
                const matchQuery = !q ||
                    String(call.name || '').toLowerCase().includes(q) ||
                    String(call.email || '').toLowerCase().includes(q) ||
                    String(call.company || '').toLowerCase().includes(q) ||
                    String(call.topic || call.service || '').toLowerCase().includes(q) ||
                    String(call.scheduledDate || '').toLowerCase().includes(q);

                return matchStatus && matchQuery;
            });

            if (filtered.length === 0) {
                list.innerHTML = `
                    <div class="card" style="text-align:center; padding:3.5rem 2rem; color:var(--text-muted);">
                        <i class="fas fa-calendar-check" style="font-size:2.4rem; color:var(--primary); margin-bottom:1rem; opacity:0.6;"></i>
                        <h4 style="color:var(--text-main); margin-bottom:0.35rem;">No Discovery Sessions Found</h4>
                        <p style="font-size:0.9rem; max-width:440px; margin:0 auto 1.25rem auto;">No client sessions match your filter. Bookings from the website contact page will appear here automatically in real time.</p>
                        <button class="btn btn-primary" onclick="openAppointmentModal()"><i class="fas fa-plus"></i> Schedule Manual Session</button>
                    </div>
                `;
                return;
            }

            list.innerHTML = filtered.map(call => {
                let status = (call.status || 'upcoming').toLowerCase();
                if (status === 'new' || status === 'unread') status = 'upcoming';

                const meetUrl = call.meetUrl || 'https://meet.google.com';
                const cleanPhone = (call.phone || '').replace(/[^0-9]/g, '');
                const waReminderMsg = encodeURIComponent(
                    `Hi ${call.name}! This is AppVertex confirming our upcoming 30-min discovery session on ${call.scheduledDate} at ${call.scheduledTime} (IST).\n\nGoogle Meet link: ${meetUrl}`
                );
                const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${waReminderMsg}` : '#';
                const mailUrl = `mailto:${encodeURIComponent(call.email)}?subject=${encodeURIComponent('AppVertex Discovery Session Confirmation')}&body=${encodeURIComponent(`Hi ${call.name},\n\nLooking forward to our discovery call on ${call.scheduledDate} at ${call.scheduledTime} IST.\n\nGoogle Meet Room: ${meetUrl}\n\nBest regards,\nLeston & Lenstar\nAppVertex Studio`)}`;

                const statusBadges = {
                    upcoming: '<span class="nav-badge" style="background:#10B981; color:#fff; font-weight:700;"><i class="fas fa-circle" style="font-size:0.5rem; margin-right:0.35rem;"></i> Upcoming</span>',
                    completed: '<span class="nav-badge" style="background:rgba(16,185,129,0.15); color:#10B981; font-weight:700;"><i class="fas fa-check" style="font-size:0.65rem; margin-right:0.35rem;"></i> Completed</span>',
                    rescheduled: '<span class="nav-badge" style="background:rgba(245,158,11,0.18); color:#F59E0B; font-weight:700;"><i class="fas fa-clock" style="font-size:0.65rem; margin-right:0.35rem;"></i> Rescheduled</span>',
                    cancelled: '<span class="nav-badge" style="background:rgba(239,68,68,0.15); color:#EF4444; font-weight:700;"><i class="fas fa-times" style="font-size:0.65rem; margin-right:0.35rem;"></i> Cancelled</span>'
                };

                return `
                    <div class="appointment-card ${status}">
                        <div class="appointment-header-row">
                            <div class="appointment-attendee-info">
                                <div class="appointment-attendee-name">
                                    ${escapeHTML(call.name)} 
                                    ${call.company ? `<span class="appointment-attendee-company">(${escapeHTML(call.company)})</span>` : ''}
                                </div>
                                <div class="appointment-meta-row" style="margin-top:0.35rem;">
                                    <span><i class="fas fa-envelope"></i> ${escapeHTML(call.email)}</span>
                                    ${call.phone ? `<span><i class="fas fa-phone"></i> ${escapeHTML(call.phone)}</span>` : ''}
                                    <span><i class="fas fa-user-shield"></i> Hosts: Leston &amp; Lenstar</span>
                                </div>
                            </div>
                            <div style="display:flex; align-items:center; gap:0.65rem; flex-wrap:wrap;">
                                <div class="appointment-datetime-pill">
                                    <i class="fas fa-calendar-day"></i>
                                    <span>${escapeHTML(call.scheduledDate || 'Date TBD')} @ ${escapeHTML(call.scheduledTime || 'Time TBD')}</span>
                                </div>
                                ${statusBadges[status] || statusBadges.upcoming}
                            </div>
                        </div>

                        <div style="display:flex; align-items:center; gap:0.65rem; flex-wrap:wrap;">
                            <span class="appointment-topic-tag"><i class="fas fa-tag" style="color:var(--primary);"></i> ${escapeHTML(call.topic || call.service || 'Architecture Review')}</span>
                            ${call.budget ? `<span class="year-tag-pill">${escapeHTML(call.budget)}</span>` : ''}
                        </div>

                        ${call.message ? `
                            <div class="appointment-notes-quote">
                                "${escapeHTML(call.message)}"
                            </div>
                        ` : ''}

                        <div class="appointment-actions-bar">
                            <div class="appointment-actions-left">
                                <a href="${escapeHTML(meetUrl)}" target="_blank" rel="noopener noreferrer" class="btn-meet-launcher" title="Launch Video Session">
                                    <i class="fas fa-video"></i>
                                    <span>Join Google Meet</span>
                                </a>
                                ${call.phone ? `
                                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="color:#10B981; padding:0.45rem 0.85rem; font-size:0.78rem;">
                                        <i class="fab fa-whatsapp"></i> WhatsApp Reminder
                                    </a>
                                ` : ''}
                                <a href="${mailUrl}" class="btn btn-secondary" style="padding:0.45rem 0.85rem; font-size:0.78rem;">
                                    <i class="fas fa-envelope"></i> Email Attendee
                                </a>
                            </div>

                            <div style="display:flex; align-items:center; gap:0.5rem;">
                                <select class="status-select" onchange="setAppointmentStatus('${escapeJsStr(call.id)}', this.value)" title="Change Session Status">
                                    <option value="upcoming" ${status==='upcoming'?'selected':''}>🟢 Upcoming</option>
                                    <option value="completed" ${status==='completed'?'selected':''}>✅ Completed</option>
                                    <option value="rescheduled" ${status==='rescheduled'?'selected':''}>🟡 Rescheduled</option>
                                    <option value="cancelled" ${status==='cancelled'?'selected':''}>⚪ Cancelled</option>
                                </select>
                                <button class="btn-icon btn-danger" style="width:32px; height:32px;" onclick="deleteAppointment('${escapeJsStr(call.id)}')" title="Delete Appointment">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderRecentAppointments() {
            const container = document.getElementById('dashboardRecentAppointments');
            if (!container) return;

            const allCalls = getAppointments();
            const upcoming = allCalls.filter(c => {
                const s = (c.status || 'upcoming').toLowerCase();
                return s === 'upcoming' || s === 'new' || s === 'unread';
            }).slice(0, 3);

            if (upcoming.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; padding:1.75rem 1rem; color:var(--text-muted); font-size:0.88rem;">
                        <i class="fas fa-calendar-check" style="font-size:1.6rem; color:var(--primary); margin-bottom:0.5rem; display:block; opacity:0.5;"></i>
                        No discovery sessions pending this week. New bookings from the public site will appear here automatically.
                    </div>
                `;
                return;
            }

            container.innerHTML = upcoming.map(c => `
                <div class="list-item" style="padding:0.95rem 1.15rem; margin-bottom:0.65rem; border-radius:10px; border:1px solid var(--border); background:var(--surface-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
                    <div>
                        <div style="font-weight:800; font-size:0.95rem; color:var(--text-main);">
                            ${escapeHTML(c.name)} ${c.company ? `<span style="font-weight:400; color:var(--text-muted);">(${escapeHTML(c.company)})</span>` : ''}
                        </div>
                        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem; display:flex; gap:0.75rem; align-items:center;">
                            <span style="color:var(--primary); font-weight:700;"><i class="fas fa-calendar-alt"></i> ${escapeHTML(c.scheduledDate || 'Date TBD')} @ ${escapeHTML(c.scheduledTime || 'Time TBD')}</span>
                            <span><i class="fas fa-tag"></i> ${escapeHTML(c.topic || 'Strategy Session')}</span>
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        <a href="${escapeHTML(c.meetUrl || 'https://meet.google.com')}" target="_blank" rel="noopener noreferrer" class="btn-meet-launcher" style="padding:0.4rem 0.85rem; font-size:0.76rem;">
                            <i class="fas fa-video"></i> Join Meet
                        </a>
                        <button class="btn btn-secondary" style="padding:0.4rem 0.75rem; font-size:0.76rem;" onclick="showSection('appointments')">Details →</button>
                    </div>
                </div>
            `).join('');
        }

        function setAppointmentFilter(filter, btn) {
            activeAppointmentFilter = filter;
            document.querySelectorAll('#appointmentFilterRow .filter-pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderAppointments();
        }

        async function setAppointmentStatus(id, newStatus) {
            const inq = inquiries.find(i => i.id === id);
            if (inq) {
                inq.status = newStatus;
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        await setDoc(doc(db, "inquiries", id), inq, { merge: true });
                    } catch(e){ console.warn("Firestore call update notice:", e); }
                }
                renderAppointments();
                renderRecentAppointments();
                renderInquiries();
                renderRecentInquiries();
                updateStats();
                showToast(`Session status marked as ${newStatus.toUpperCase()}`);
            }
        }

        async function deleteAppointment(id) {
            if (confirm("Delete this discovery session from your schedule?")) {
                inquiries = inquiries.filter(i => i.id !== id);
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        await deleteDoc(doc(db, "inquiries", id));
                    } catch(e){ console.warn("Firestore delete notice:", e); }
                }
                renderAppointments();
                renderRecentAppointments();
                renderInquiries();
                renderRecentInquiries();
                updateStats();
                showToast("Discovery session removed", "info");
            }
        }

        function openAppointmentModal() {
            document.getElementById('appointmentId').value = '';
            document.getElementById('apptClientName').value = '';
            document.getElementById('apptClientEmail').value = '';
            document.getElementById('apptClientPhone').value = '';
            document.getElementById('apptClientCompany').value = '';
            document.getElementById('apptNotes').value = '';
            
            // Default date: tomorrow
            const d = new Date();
            d.setDate(d.getDate() + 1);
            document.getElementById('apptDate').value = d.toISOString().split('T')[0];
            
            const roomCode = 'apv-' + Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 5);
            document.getElementById('apptMeetUrl').value = `https://meet.google.com/${roomCode}`;
            
            openModal('appointmentModal');
        }

        async function saveAppointment() {
            const name = document.getElementById('apptClientName').value.trim();
            const email = document.getElementById('apptClientEmail').value.trim();
            const phone = document.getElementById('apptClientPhone').value.trim();
            const company = document.getElementById('apptClientCompany').value.trim();
            const dateVal = document.getElementById('apptDate').value;
            const timeSlot = document.getElementById('apptTimeSlot').value;
            const topic = document.getElementById('apptTopic').value;
            const meetUrl = document.getElementById('apptMeetUrl').value.trim() || 'https://meet.google.com';
            const notes = document.getElementById('apptNotes').value.trim();
            const status = document.getElementById('apptStatus').value;

            if (!name || !email || !dateVal) {
                showToast("Please fill in Name, Email and Session Date", "error");
                return;
            }

            const dateObj = new Date(dateVal);
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const formattedDate = `${dayNames[dateObj.getDay()]}, ${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

            const newAppt = {
                id: 'call-' + Date.now(),
                type: 'SCHEDULED_DISCOVERY_CALL',
                name: name,
                email: email,
                phone: phone,
                company: company,
                service: `30-Min Discovery Session (${topic})`,
                topic: topic,
                budget: 'Discovery Session (Free)',
                scheduledDate: formattedDate,
                scheduledTime: timeSlot,
                meetUrl: meetUrl,
                message: notes,
                date: `Call: ${formattedDate} @ ${timeSlot}`,
                status: status
            };

            inquiries.unshift(newAppt);
            saveToLocalStorage();

            if (auth?.currentUser && db && !isLocalMode) {
                try {
                    await setDoc(doc(db, "inquiries", newAppt.id), newAppt);
                } catch(e){ console.warn("Firestore save call notice:", e); }
            }

            closeModal('appointmentModal');
            renderAppointments();
            renderRecentAppointments();
            renderInquiries();
            renderRecentInquiries();
            updateStats();
            showToast("Discovery call scheduled successfully!", "success");
        }

        function exportAppointmentsCSV() {
            const calls = getAppointments();
            if (calls.length === 0) {
                showToast("No scheduled calls to export.", "info");
                return;
            }
            const headers = ["ID", "Scheduled Date", "Scheduled Time", "Client Name", "Email", "Phone", "Company", "Topic", "Status", "Meet URL", "Notes"];
            const rows = calls.map(c => [
                c.id || '',
                `"${(c.scheduledDate || '').replace(/"/g, '""')}"`,
                `"${(c.scheduledTime || '').replace(/"/g, '""')}"`,
                `"${(c.name || '').replace(/"/g, '""')}"`,
                `"${(c.email || '').replace(/"/g, '""')}"`,
                `"${(c.phone || '').replace(/"/g, '""')}"`,
                `"${(c.company || '').replace(/"/g, '""')}"`,
                `"${(c.topic || c.service || '').replace(/"/g, '""')}"`,
                `"${(c.status || 'upcoming').replace(/"/g, '""')}"`,
                `"${(c.meetUrl || '').replace(/"/g, '""')}"`,
                `"${(c.message || '').replace(/"/g, '""')}"`
            ]);

            const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `appvertex_discovery_calls_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast("Discovery sessions schedule exported as CSV");
        }

        // ═══════════════════════════════════════════════════
        // THEME MANAGEMENT FOR ADMIN CONSOLE
        // ═══════════════════════════════════════════════════
        function toggleAdminTheme() {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = (current === 'dark') ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try {
                localStorage.setItem('appvertex-theme', next);
            } catch(e){}
            updateAdminThemeUI(next);
            showToast(`Theme switched to ${next.toUpperCase()} mode`);
        }

        function updateAdminThemeUI(theme) {
            const isDark = (theme === 'dark');
            const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
            
            const deskIcon = document.getElementById('desktopThemeIcon');
            if (deskIcon) deskIcon.className = iconClass;

            const mobIcon = document.getElementById('mobileThemeIcon');
            if (mobIcon) mobIcon.className = iconClass;

            const sideIcon = document.getElementById('sidebarThemeIcon');
            if (sideIcon) sideIcon.className = iconClass;

            const sideText = document.getElementById('sidebarThemeText');
            if (sideText) sideText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }

        // ═══════════════════════════════════════════════════
        // SYNTHETIC AUDIO CHIME (WEB AUDIO API)
        // ═══════════════════════════════════════════════════
        function playChime() {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;
                const ctx = new AudioCtx();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.12); // A5

                gain.gain.setValueAtTime(0.18, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start();
                osc.stop(ctx.currentTime + 0.36);
            } catch(e){}
        }

        function renderInquiries() {
            const list = document.getElementById('inquiriesList');
            if (!list) return;

            const q = (document.getElementById('inquirySearchInput')?.value || '').toLowerCase().trim();
            let filtered = (Array.isArray(inquiries) ? inquiries : []).filter(i => {
                if (!i) return false;
                let s = i.status || 'new';
                if (s === 'unread') s = 'new';
                if (s === 'responded' && activeInquiryFilter === 'in_discussion') s = 'in_discussion';

                const matchStatus = (activeInquiryFilter === 'all') || (s === activeInquiryFilter) || (activeInquiryFilter === 'new' && (i.status === 'unread' || i.status === 'new'));
                const matchQuery = !q || 
                    String(i.name || '').toLowerCase().includes(q) ||
                    String(i.email || '').toLowerCase().includes(q) ||
                    String(i.company || '').toLowerCase().includes(q) ||
                    String(i.message || '').toLowerCase().includes(q);
                return matchStatus && matchQuery;
            });

            if (filtered.length === 0) {
                list.innerHTML = `<div class="card" style="text-align:center; padding:3rem; color:var(--text-muted);"><i class="fas fa-envelope-open" style="font-size:2rem; margin-bottom:0.75rem; opacity:0.4;"></i><p>Inbox is clean. No client inquiries match your filter.</p></div>`;
                return;
            }

            list.innerHTML = filtered.map(inq => {
                const isNew = inq.status === 'unread' || inq.status === 'new';
                const curStatus = inq.status === 'unread' ? 'new' : (inq.status === 'responded' ? 'in_discussion' : (inq.status || 'new'));
                const waUrl = inq.phone ? `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(inq.name)}%2C%20thank%20you%20for%20contacting%20AppVertex%21` : '#';
                const mailUrl = `mailto:${encodeURIComponent(inq.email)}?subject=Re:%20AppVertex%20Project%20Inquiry&body=Hi%20${encodeURIComponent(inq.name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20AppVertex!`;

                return `
                    <div class="inquiry-card ${isNew ? 'unread' : ''}">
                        <div class="inquiry-header-row">
                            <div>
                                <div class="inquiry-sender">${escapeHTML(inq.name)} ${inq.company ? `<span style="font-weight:400; color:var(--text-muted);">(${escapeHTML(inq.company)})</span>` : ''}</div>
                                <div class="inquiry-meta">
                                    <span><i class="fas fa-envelope"></i> ${escapeHTML(inq.email)}</span>
                                    ${inq.phone ? `<span><i class="fas fa-phone"></i> ${escapeHTML(inq.phone)}</span>` : ''}
                                    <span><i class="fas fa-clock"></i> ${escapeHTML(inq.date || 'Recent')}</span>
                                </div>
                            </div>
                            <div class="inquiry-badges">
                                <span class="category-tag-pill">${escapeHTML(inq.service || 'General Inquiry')}</span>
                                ${inq.budget ? `<span class="year-tag-pill">${escapeHTML(inq.budget)}</span>` : ''}
                                ${getInquiryStatusBadge(inq.status)}
                            </div>
                        </div>
                        <div class="inquiry-message">${escapeHTML(inq.message || 'No details provided.')}</div>
                        <div class="inquiry-actions-row">
                            <a href="${mailUrl}" class="btn btn-secondary" style="padding:0.45rem 0.95rem; font-size:0.75rem;"><i class="fas fa-reply"></i> Reply Email</a>
                            ${inq.phone ? `<a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding:0.45rem 0.95rem; font-size:0.75rem; color:#10B981;"><i class="fab fa-whatsapp"></i> WhatsApp</a>` : ''}
                            <select class="status-select" onchange="setInquiryStatus('${escapeJsStr(inq.id)}', this.value)" title="Change lead status">
                                <option value="new" ${curStatus==='new'?'selected':''}>🔴 New Lead</option>
                                <option value="in_discussion" ${curStatus==='in_discussion'?'selected':''}>🟡 In Discussion</option>
                                <option value="proposal_sent" ${curStatus==='proposal_sent'?'selected':''}>🔵 Proposal Sent</option>
                                <option value="won" ${curStatus==='won'?'selected':''}>🟢 Project Won</option>
                                <option value="archived" ${curStatus==='archived'?'selected':''}>⚪ Archived</option>
                            </select>
                            <button class="btn-icon btn-danger" style="width:32px; height:32px;" onclick="deleteInquiry('${escapeJsStr(inq.id)}')" title="Delete Inquiry"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        async function setInquiryStatus(id, newStatus) {
            const inq = inquiries.find(i => i.id === id);
            if (inq) {
                inq.status = newStatus;
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        await setDoc(doc(db, "inquiries", id), inq, { merge: true });
                    } catch(e){ console.warn("Firestore update notice:", e); }
                }
                renderInquiries();
                renderRecentInquiries();
                updateStats();
                showToast(`Lead status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
            }
        }

        function toggleInquiryStatus(id) {
            const inq = inquiries.find(i => i.id === id);
            if (inq) {
                const next = (inq.status === 'unread' || inq.status === 'new') ? 'in_discussion' : 'new';
                setInquiryStatus(id, next);
            }
        }

        async function deleteInquiry(id) {
            if (confirm("Delete this inquiry from inbox?")) {
                inquiries = inquiries.filter(i => i.id !== id);
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        await deleteDoc(doc(db, "inquiries", id));
                    } catch(e){ console.warn("Firestore delete notice:", e); }
                }
                renderInquiries();
                renderRecentInquiries();
                updateStats();
                showToast("Inquiry removed");
            }
        }

        function addSampleInquiry() {
            const newInq = {
                id: 'inq-' + Date.now(),
                name: 'Kavita Menon',
                email: 'kavita@zephyrlabs.com',
                phone: '+91 98860 55432',
                company: 'Zephyr Health Labs',
                service: 'Fullstack Web Application',
                budget: '₹50,000 – ₹1,00,000',
                message: 'We are seeking a patient scheduling portal with WhatsApp reminders and automated billing.',
                date: 'Just now',
                status: 'new'
            };
            inquiries.unshift(newInq);
            saveToLocalStorage();
            if (auth?.currentUser && db && !isLocalMode) {
                try {
                    setDoc(doc(db, "inquiries", newInq.id), newInq);
                } catch(e){}
            }
            renderInquiries();
            renderRecentInquiries();
            updateStats();
            showToast("Test client lead added!");
        }

        async function clearAllInquiries() {
            if (confirm("Clear all inquiries in inbox?")) {
                const toDel = [...inquiries];
                inquiries = [];
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        for (const i of toDel) await deleteDoc(doc(db, "inquiries", i.id));
                    } catch(e){}
                }
                renderInquiries();
                renderRecentInquiries();
                updateStats();
                showToast("Inbox cleared");
            }
        }

        // ─── RENDER UPSKILL APPLICATIONS ───
        function setApplicationFilter(f, btn) {
            activeApplicationFilter = f;
            document.querySelectorAll('#applicationFilterRow .filter-pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderApplications();
        }

        function getApplicationStatusBadge(status) {
            switch(status) {
                case 'new':
                    return '<span class="nav-badge" style="background:#EF4444; color:#fff;">NEW APPLICANT</span>';
                case 'interviewed':
                    return '<span class="nav-badge" style="background:#F59E0B; color:#fff;">INTERVIEWED</span>';
                case 'enrolled':
                    return '<span class="nav-badge" style="background:#10B981; color:#fff;">ENROLLED IN COHORT</span>';
                case 'archived':
                    return '<span class="nav-badge" style="background:var(--border); color:var(--text-muted);">ARCHIVED</span>';
                default:
                    return `<span class="nav-badge">${escapeHTML((status||'new').toUpperCase())}</span>`;
            }
        }

        function renderApplications() {
            const list = document.getElementById('applicationsList');
            if (!list) return;

            const q = (document.getElementById('applicationSearchInput')?.value || '').toLowerCase().trim();
            let filtered = (Array.isArray(applications) ? applications : []).filter(a => {
                if (!a) return false;
                const matchStatus = (activeApplicationFilter === 'all') || (a.status === activeApplicationFilter);
                const matchQuery = !q || 
                    String(a.name || '').toLowerCase().includes(q) ||
                    String(a.email || '').toLowerCase().includes(q) ||
                    String(a.track || '').toLowerCase().includes(q) ||
                    String(a.background || '').toLowerCase().includes(q);
                return matchStatus && matchQuery;
            });

            if (filtered.length === 0) {
                list.innerHTML = `<div class="card" style="text-align:center; padding:3rem; color:var(--text-muted);"><i class="fas fa-graduation-cap" style="font-size:2rem; margin-bottom:0.75rem; opacity:0.4;"></i><p>No applications match your filter.</p></div>`;
                return;
            }

            list.innerHTML = filtered.map(app => {
                const isNew = app.status === 'new';
                const curStatus = app.status || 'new';
                const waUrl = app.phone ? `https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(app.name)}%2C%20thank%20you%20for%20applying%20to%20the%20AppVertex%20Upskill%20Mentorship%20Program%21%20We%20would%20love%20to%20schedule%20a%20brief%20call.` : '#';
                const mailUrl = `mailto:${encodeURIComponent(app.email)}?subject=AppVertex%20Upskill%20Mentorship%20Application%20-%20Next%20Steps&body=Hi%20${encodeURIComponent(app.name)},%0A%0AThank%20you%20for%20applying%20to%20the%20AppVertex%20Upskill%20program!`;

                return `
                    <div class="applicant-card ${isNew ? 'new' : ''}">
                        <div class="inquiry-header-row">
                            <div>
                                <div class="inquiry-sender">${escapeHTML(app.name)}</div>
                                <div class="inquiry-meta">
                                    <span><i class="fas fa-envelope"></i> ${escapeHTML(app.email)}</span>
                                    ${app.phone ? `<span><i class="fas fa-phone"></i> ${escapeHTML(app.phone)}</span>` : ''}
                                    <span><i class="fas fa-clock"></i> ${escapeHTML(app.date || 'Recent')}</span>
                                </div>
                            </div>
                            <div class="inquiry-badges">
                                <span class="app-track-pill"><i class="fas fa-graduation-cap"></i> ${escapeHTML(app.track || 'Frontend Track')}</span>
                                ${getApplicationStatusBadge(app.status)}
                            </div>
                        </div>
                        ${app.background ? `<div class="inquiry-message" style="border-left:3px solid var(--accent);"><strong style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem; text-transform:uppercase; letter-spacing:0.05em;">Applicant Background &amp; Goals</strong>${escapeHTML(app.background)}</div>` : ''}
                        <div class="inquiry-actions-row">
                            <a href="${mailUrl}" class="btn btn-secondary" style="padding:0.45rem 0.95rem; font-size:0.75rem;"><i class="fas fa-reply"></i> Email Candidate</a>
                            ${app.phone ? `<a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding:0.45rem 0.95rem; font-size:0.75rem; color:#10B981;"><i class="fab fa-whatsapp"></i> Chat WhatsApp</a>` : ''}
                            <select class="status-select" onchange="setApplicationStatus('${escapeJsStr(app.id)}', this.value)" title="Change application status">
                                <option value="new" ${curStatus==='new'?'selected':''}>🔴 New Applicant</option>
                                <option value="interviewed" ${curStatus==='interviewed'?'selected':''}>🟡 Interviewed</option>
                                <option value="enrolled" ${curStatus==='enrolled'?'selected':''}>🟢 Enrolled in Cohort</option>
                                <option value="archived" ${curStatus==='archived'?'selected':''}>⚪ Archived</option>
                            </select>
                            <button class="btn-icon btn-danger" style="width:32px; height:32px;" onclick="deleteApplication('${escapeJsStr(app.id)}')" title="Delete Candidate"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        async function setApplicationStatus(id, newStatus) {
            const app = applications.find(a => a.id === id);
            if (app) {
                app.status = newStatus;
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        await setDoc(doc(db, "applications", id), app, { merge: true });
                    } catch(e){ console.warn("Firestore application update notice:", e); }
                }
                renderApplications();
                renderRecentApplications();
                updateStats();
                showToast(`Candidate status updated to ${newStatus.toUpperCase()}`);
            }
        }

        async function deleteApplication(id) {
            if (confirm("Delete this candidate application?")) {
                applications = applications.filter(a => a.id !== id);
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        await deleteDoc(doc(db, "applications", id));
                    } catch(e){ console.warn("Firestore application delete notice:", e); }
                }
                renderApplications();
                renderRecentApplications();
                updateStats();
                showToast("Candidate application removed");
            }
        }

        function addSampleApplication() {
            const newApp = {
                id: 'app-' + Date.now(),
                name: 'Aditya Sharma',
                email: 'aditya.sharma@techmail.com',
                phone: '+91 99160 33455',
                track: 'Track 02: Fullstack & Cloud Databases',
                background: '2nd year engineering student. Built Node.js CRUD endpoints with MongoDB, looking to master cloud databases, auth security, and production deployment.',
                date: 'Just now',
                createdAt: new Date().toISOString(),
                status: 'new'
            };
            applications.unshift(newApp);
            saveToLocalStorage();
            if (auth?.currentUser && db && !isLocalMode) {
                try {
                    setDoc(doc(db, "applications", newApp.id), newApp);
                } catch(e){}
            }
            renderApplications();
            renderRecentApplications();
            updateStats();
            showToast("Test candidate application added!");
        }

        async function clearArchivedApplications() {
            const archived = applications.filter(a => a.status === 'archived');
            if (archived.length === 0) return showToast("No archived applications to clean", "info");
            if (confirm(`Remove ${archived.length} archived applications?`)) {
                applications = applications.filter(a => a.status !== 'archived');
                saveToLocalStorage();
                if (auth?.currentUser && db && !isLocalMode) {
                    try {
                        for (const a of archived) await deleteDoc(doc(db, "applications", a.id));
                    } catch(e){}
                }
                renderApplications();
                renderRecentApplications();
                updateStats();
                showToast("Archived applications cleaned");
            }
        }

        // ─── MODAL CONTROLS ───
        function openProjectModal(p = null) {
            currentProjectImage = "";
            document.getElementById('projectId').value = "";
            document.getElementById('projectName').value = "";
            document.getElementById('projectCategory').value = "startup";
            document.getElementById('projectYear').value = "2026";
            document.getElementById('projectDesc').value = "";
            document.getElementById('projectTech').value = "";
            document.getElementById('projectLink').value = "";
            document.getElementById('projectPreview').style.display = 'none';
            document.getElementById('projectPlaceholder').style.display = 'block';
            document.getElementById('projectRemoveImageRow').style.display = 'none';
            document.getElementById('projectImageUpload').classList.remove('has-image');
            document.getElementById('projectModalTitle').textContent = p ? "Edit Project" : "Add Project";

            if (p) {
                document.getElementById('projectId').value = p.id || '';
                document.getElementById('projectName').value = p.name || p.title || '';
                if (p.category) document.getElementById('projectCategory').value = normCat(p.category);
                document.getElementById('projectYear').value = p.year || 2026;
                document.getElementById('projectDesc').value = p.description || '';
                document.getElementById('projectTech').value = Array.isArray(p.technologies) ? p.technologies.slice(0, 3).join(', ') : (p.technologies || '');
                document.getElementById('projectLink').value = p.link || p.liveUrl || '';
                const imgVal = safeImageSrc(p.image || p.previewImage);
                if (imgVal) {
                    currentProjectImage = imgVal;
                    document.getElementById('projectPreview').src = imgVal;
                    document.getElementById('projectPreview').style.display = 'block';
                    document.getElementById('projectPlaceholder').style.display = 'none';
                    document.getElementById('projectRemoveImageRow').style.display = 'block';
                    document.getElementById('projectImageUpload').classList.add('has-image');
                }
            }
            document.getElementById('projectModal').classList.add('active');
        }

        function editProjectById(id) {
            const p = projects.find(item => item.id === id);
            if (p) openProjectModal(p);
        }

        function openTestimonialModal(t = null) {
            currentTestimonialImage = "";
            document.getElementById('testimonialId').value = "";
            document.getElementById('testimonialName').value = "";
            document.getElementById('testimonialRole').value = "";
            document.getElementById('testimonialRating').value = "5";
            document.getElementById('testimonialText').value = "";
            document.getElementById('testimonialPreview').style.display = 'none';
            document.getElementById('testimonialPlaceholder').style.display = 'block';
            document.getElementById('testimonialRemoveImageRow').style.display = 'none';
            document.getElementById('testimonialImageUpload').classList.remove('has-image');
            document.getElementById('testimonialModalTitle').textContent = t ? "Edit Testimonial" : "Add Testimonial";

            if (t) {
                document.getElementById('testimonialId').value = t.id || '';
                document.getElementById('testimonialName').value = t.name || '';
                document.getElementById('testimonialRole').value = t.role || '';
                document.getElementById('testimonialRating').value = String(t.rating || 5);
                document.getElementById('testimonialText').value = t.text || '';
                if (safeImageSrc(t.image)) {
                    currentTestimonialImage = t.image;
                    document.getElementById('testimonialPreview').src = safeImageSrc(t.image);
                    document.getElementById('testimonialPreview').style.display = 'block';
                    document.getElementById('testimonialPlaceholder').style.display = 'none';
                    document.getElementById('testimonialRemoveImageRow').style.display = 'block';
                    document.getElementById('testimonialImageUpload').classList.add('has-image');
                }
            }
            document.getElementById('testimonialModal').classList.add('active');
        }

        function editTestimonialById(id) {
            const t = testimonials.find(item => item.id === id);
            if (t) openTestimonialModal(t);
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
        }

        function removeImage(type) {
            if (type === 'project') {
                currentProjectImage = "";
                document.getElementById('projectPreview').style.display = 'none';
                document.getElementById('projectPlaceholder').style.display = 'block';
                document.getElementById('projectRemoveImageRow').style.display = 'none';
                document.getElementById('projectImageUpload').classList.remove('has-image');
            } else {
                currentTestimonialImage = "";
                document.getElementById('testimonialPreview').style.display = 'none';
                document.getElementById('testimonialPlaceholder').style.display = 'block';
                document.getElementById('testimonialRemoveImageRow').style.display = 'none';
                document.getElementById('testimonialImageUpload').classList.remove('has-image');
            }
        }

        // ─── IMAGE UPLOAD & CANVAS OPTIMIZATION ───
        function handleImageUpload(input, type) {
            const file = input.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = new Image();
                imgElement.onload = async function() {
                    const MAX_WIDTH = 720;
                    const MAX_HEIGHT = 720;
                    let width = imgElement.width;
                    let height = imgElement.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = Math.round(width);
                    canvas.height = Math.round(height);
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(imgElement, 0, 0, Math.round(width), Math.round(height));

                    const resizedBase64 = canvas.toDataURL('image/jpeg', 0.75);
                    
                    const preview = document.getElementById(type + 'Preview');
                    const placeholder = document.getElementById(type + 'Placeholder');
                    const upload = document.getElementById(type + 'ImageUpload');
                    const removeRow = document.getElementById(type + 'RemoveImageRow');

                    preview.src = resizedBase64;
                    preview.style.display = 'block';
                    placeholder.style.display = 'none';
                    upload.classList.add('has-image');
                    if (removeRow) removeRow.style.display = 'block';

                    // Cloud mode: upload to Firebase Storage if online & authenticated
                    if (auth?.currentUser && storage && !isLocalMode) {
                        showToast("Uploading to Cloud Storage...", "info");
                        try {
                            const storageRef = ref(storage, `${type}s/${Date.now()}_img.jpg`);
                            await uploadString(storageRef, resizedBase64, 'data_url');
                            const downloadUrl = await getDownloadURL(storageRef);
                            if (type === 'testimonial') currentTestimonialImage = downloadUrl;
                            else currentProjectImage = downloadUrl;
                            showToast("Image stored in Cloud Storage!");
                            return;
                        } catch(storageErr) {
                            console.warn("Storage upload notice, falling back to local base64:", storageErr);
                        }
                    }

                    if (type === 'testimonial') currentTestimonialImage = resizedBase64;
                    else currentProjectImage = resizedBase64;
                    
                    showToast("Image compressed & ready for save", "info");
                };
                imgElement.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        // ─── SAVE OPERATIONS ───
        async function saveProject() {
            if (!auth?.currentUser && !isLocalMode) return showToast("Must be logged in or in Local Mode", "error");
            const id = document.getElementById('projectId').value || 'p-' + Date.now();
            const name = document.getElementById('projectName').value.trim();

            if (!name) return showToast("Project name is required", "error");

            const cat = document.getElementById('projectCategory').value;
            let emoji = '🚀';
            let color = 'linear-gradient(135deg,#0f172a,#0284c7)';
            if (cat === 'ecommerce') { emoji = '🛍️'; color = 'linear-gradient(135deg,#7c2d12,#ea580c)'; }
            else if (cat === 'school') { emoji = '🎓'; color = 'linear-gradient(135deg,#1e1b4b,#4338ca)'; }
            else if (cat === 'brand') { emoji = '✨'; color = 'linear-gradient(135deg,var(--primary),var(--primary-dark))'; }

            const catLabels = {
                'school': 'SCHOOL & INSTITUTIONAL',
                'startup': 'SAAS & STARTUP',
                'brand': 'BRAND & IDENTITY',
                'ecommerce': 'BRAND & E-COMMERCE'
            };

            const linkVal = document.getElementById('projectLink').value.trim() || '#contact';
            let displayUrl = 'appvertex.in';
            if (linkVal && linkVal.startsWith('http')) {
                try {
                    displayUrl = new URL(linkVal).hostname.replace(/^www\./, '');
                } catch(e) {
                    displayUrl = 'appvertex.in';
                }
            }
            const fallbackPool = ['hero-rosewood-showcase.png', 'hero-floating-phones-transparent.png', 'hero-devices.png', 'hero-rosewood-stage.png'];
            const finalImg = currentProjectImage || fallbackPool[Math.floor(Math.random() * fallbackPool.length)];

            // Robust tech parsing: supports comma-separated or space/tab-separated
            const techInput = document.getElementById('projectTech').value.trim();
            let parsedTech = [];
            if (techInput.includes(',')) {
                parsedTech = techInput.split(',').map(t => t.trim()).filter(Boolean);
            } else if (/\s{2,}|\t/.test(techInput)) {
                parsedTech = techInput.split(/\s{2,}|\t/).map(t => t.trim()).filter(Boolean);
            } else if (techInput) {
                parsedTech = [techInput];
            }
            if (parsedTech.length === 0) {
                parsedTech = cat === 'school' ? ['React.js', 'Node.js', 'MySQL'] : ['TypeScript', 'Node.js', 'PostgreSQL'];
            }

            const descInput = document.getElementById('projectDesc').value.trim();
            const finalDesc = descInput || (cat === 'school' 
                ? 'Comprehensive institutional multi-hub web infrastructure featuring administrative noticeboards, event archives, responsive student hubs, and synchronized parent portals.'
                : 'High-conversion digital platform engineered for seamless user experience, sub-second latency, and verified production performance.');

            const data = {
                id,
                name,
                title: name,
                category: cat,
                categoryLabel: catLabels[cat] || cat.toUpperCase(),
                emoji,
                color,
                year: parseInt(document.getElementById('projectYear').value) || 2026,
                description: finalDesc,
                technologies: parsedTech.slice(0, 4),
                link: linkVal,
                liveUrl: linkVal,
                urlDisplay: displayUrl,
                image: finalImg,
                previewImage: finalImg,
                altText: `${name} preview`,
                updatedAt: Date.now()
            };

            try {
                // Remove from deleted list if present
                try {
                    const del = JSON.parse(localStorage.getItem('appvertex_deleted_projects') || '[]');
                    const filtered = del.filter(dId => dId !== id);
                    localStorage.setItem('appvertex_deleted_projects', JSON.stringify(filtered));
                } catch(e){}

                if (auth?.currentUser && db && !isLocalMode) {
                    await setDoc(doc(db, "projects", id), data);
                }
                const idx = projects.findIndex(p => p.id === id);
                if (idx >= 0) projects[idx] = data;
                else projects.unshift(data);

                saveToLocalStorage();
                showToast("Project saved successfully!");
                closeModal('projectModal');
                refreshAllUI();
            } catch (e) {
                console.error("Save error:", e);
                showToast("Error saving: " + e.message, "error");
            }
        }

        async function deleteProject(id) {
            if (!auth?.currentUser && !isLocalMode) return showToast("Must be logged in or in Local Mode", "error");
            if (confirm("Delete this project from your portfolio?")) {
                try {
                    // Mark as deleted so cloud sync doesn't re-add it
                    try {
                        const del = JSON.parse(localStorage.getItem('appvertex_deleted_projects') || '[]');
                        if (!del.includes(id)) {
                            del.push(id);
                            localStorage.setItem('appvertex_deleted_projects', JSON.stringify(del));
                        }
                    } catch(e){}

                    if (auth?.currentUser && db && !isLocalMode) {
                        await deleteDoc(doc(db, "projects", id));
                    }
                    projects = projects.filter(p => p.id !== id);
                    saveToLocalStorage();
                    showToast("Project deleted");
                    refreshAllUI();
                } catch (e) {
                    showToast("Error deleting: " + e.message, "error");
                }
            }
        }

        async function saveTestimonial() {
            if (!auth?.currentUser && !isLocalMode) return showToast("Must be logged in or in Local Mode", "error");
            const id = document.getElementById('testimonialId').value || 't-' + Date.now();
            const name = document.getElementById('testimonialName').value.trim();
            const role = document.getElementById('testimonialRole').value.trim();
            const rating = parseInt(document.getElementById('testimonialRating').value) || 5;
            const text = document.getElementById('testimonialText').value.trim();

            if (!name) return showToast("Name is required", "error");
            if (!text) return showToast("Quote text is required", "error");

            const data = {
                id,
                name,
                role: role || 'Client',
                rating,
                text,
                image: currentTestimonialImage || "",
                initials: name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'AV',
                updatedAt: Date.now()
            };

            try {
                // Remove from deleted testimonials if present
                try {
                    const del = JSON.parse(localStorage.getItem('appvertex_deleted_testimonials') || '[]');
                    const filtered = del.filter(dId => dId !== id);
                    localStorage.setItem('appvertex_deleted_testimonials', JSON.stringify(filtered));
                } catch(e){}

                if (auth?.currentUser && db && !isLocalMode) {
                    await setDoc(doc(db, "testimonials", id), data);
                }
                const idx = testimonials.findIndex(t => t.id === id);
                if (idx >= 0) testimonials[idx] = data;
                else testimonials.unshift(data);

                saveToLocalStorage();
                showToast("Testimonial saved!");
                closeModal('testimonialModal');
                refreshAllUI();
            } catch (e) {
                console.error("Save error:", e);
                showToast("Error saving: " + e.message, "error");
            }
        }

        async function deleteTestimonial(id) {
            if (!auth?.currentUser && !isLocalMode) return showToast("Must be logged in or in Local Mode", "error");
            if (confirm("Delete this testimonial?")) {
                try {
                    // Mark as deleted so cloud sync doesn't re-add it
                    try {
                        const del = JSON.parse(localStorage.getItem('appvertex_deleted_testimonials') || '[]');
                        if (!del.includes(id)) {
                            del.push(id);
                            localStorage.setItem('appvertex_deleted_testimonials', JSON.stringify(del));
                        }
                    } catch(e){}

                    if (auth?.currentUser && db && !isLocalMode) {
                        await deleteDoc(doc(db, "testimonials", id));
                    }
                    testimonials = testimonials.filter(t => t.id !== id);
                    saveToLocalStorage();
                    showToast("Testimonial deleted");
                    refreshAllUI();
                } catch (e) {
                    showToast("Error deleting: " + e.message, "error");
                }
            }
        }

        async function saveStudioSettings(evt) {
            const targetBtn = evt?.currentTarget || event?.target?.closest('button');
            if (!auth?.currentUser && !isLocalMode) return;
            studioSettings.footerYear = document.getElementById('footerYear').value.trim() || "2026";
            studioSettings.status = document.getElementById('studioStatus').value.trim();
            studioSettings.email = document.getElementById('studioEmail').value.trim();
            studioSettings.whatsapp = document.getElementById('studioWhatsApp').value.trim();

            if (auth?.currentUser && db && !isLocalMode) {
                try {
                    await setDoc(doc(db, "settings", "footer"), { year: studioSettings.footerYear });
                    await setDoc(doc(db, "settings", "studio"), studioSettings);
                } catch(e) {
                    console.warn("Cloud settings warning:", e);
                }
            }
            saveToLocalStorage();
            updateStats();
            if (targetBtn) {
                const orig = targetBtn.innerHTML;
                targetBtn.classList.add('is-saved');
                targetBtn.innerHTML = `<i class="fas fa-check"></i> <span>Saved</span>`;
                setTimeout(() => {
                    targetBtn.classList.remove('is-saved');
                    targetBtn.innerHTML = orig;
                }, 2000);
            }
        }

        // ─── MASTER SAVE ALL FOR ADMIN PANEL ───
        async function saveAllChanges() {
            const btn = document.getElementById('btnSaveAll');
            const mobileBtn = document.getElementById('mobileSaveBtn');
            const allBtns = [btn, mobileBtn].filter(Boolean);

            allBtns.forEach(b => {
                b.classList.remove('is-saved');
                b.classList.add('is-saving');
                b.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> <span>Saving...</span>`;
            });

            // 1. Capture settings if currently in DOM
            const fYr = document.getElementById('footerYear')?.value.trim();
            const sStat = document.getElementById('studioStatus')?.value.trim();
            const sEmail = document.getElementById('studioEmail')?.value.trim();
            const sWa = document.getElementById('studioWhatsApp')?.value.trim();

            if (fYr) studioSettings.footerYear = fYr;
            if (sStat) studioSettings.status = sStat;
            if (sEmail) studioSettings.email = sEmail;
            if (sWa) studioSettings.whatsapp = sWa;

            // 2. Persist to Local Storage
            saveToLocalStorage();

            // 3. Persist to Cloud Firestore if authenticated
            if (auth?.currentUser && db && !isLocalMode) {
                try {
                    for (const t of testimonials) await setDoc(doc(db, "testimonials", t.id), t);
                    for (const p of projects) await setDoc(doc(db, "projects", p.id), p);
                    for (const i of inquiries) await setDoc(doc(db, "inquiries", i.id), i);
                    for (const a of applications) await setDoc(doc(db, "applications", a.id), a);
                    await setDoc(doc(db, "settings", "footer"), { year: studioSettings.footerYear });
                    await setDoc(doc(db, "settings", "studio"), studioSettings);
                } catch(cloudErr) {
                    console.warn("Cloud sync notice during Save All:", cloudErr);
                }
            }

            // 4. Update UI
            refreshAllUI();

            // 5. Tactile Button Micro-Animation Only (No Toast Messages)
            allBtns.forEach(b => {
                b.classList.remove('is-saving');
                b.classList.add('is-saved');
                b.innerHTML = `<i class="fas fa-check"></i> <span>Saved</span>`;
            });

            setTimeout(() => {
                if (btn) {
                    btn.classList.remove('is-saved');
                    btn.innerHTML = `<i class="fas fa-save"></i> <span id="saveAllBtnText">Save All</span>`;
                }
                if (mobileBtn) {
                    mobileBtn.classList.remove('is-saved');
                    mobileBtn.innerHTML = `<i class="fas fa-save"></i> Save All`;
                }
            }, 2000);
        }

        // Global Keyboard Shortcut: Ctrl+S / Cmd+S triggers Save All
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                const adminPanel = document.getElementById('adminPanel');
                if (adminPanel && adminPanel.classList.contains('visible')) {
                    e.preventDefault();
                    saveAllChanges();
                }
            }
        });

        // ─── DATA BACKUP & RESTORE ───
        function downloadJSONBackup() {
            const backupPayload = {
                app: "AppVertex Studio",
                version: "2.2.0",
                exportedAt: new Date().toISOString(),
                settings: studioSettings,
                projects,
                testimonials,
                inquiries,
                applications
            };

            const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `appvertex-backup-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast("Backup JSON file generated!");
        }

        function importJSONBackup(input) {
            const file = input.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    if (Array.isArray(data.projects)) projects = data.projects;
                    if (Array.isArray(data.testimonials)) testimonials = data.testimonials;
                    if (Array.isArray(data.inquiries)) inquiries = data.inquiries;
                    if (Array.isArray(data.applications)) applications = data.applications;
                    if (data.settings) studioSettings = { ...studioSettings, ...data.settings };

                    saveToLocalStorage();
                    refreshAllUI();
                    showToast("Backup restored successfully!");
                } catch (err) {
                    showToast("Invalid JSON backup file: " + err.message, "error");
                }
            };
            reader.readAsText(file);
            input.value = "";
        }

        // ─── CODE EXPORT ───
        function generateCode() {
            fetch('index.html').then(r => r.text()).then(html => {
                let code = html;
                code = code.replace(/© \d{4}/g, `© ${studioSettings.footerYear}`);
                document.getElementById('codeOutput').textContent = code;
                showToast("Generated code preview!");
            }).catch(e => {
                showToast("Could not read index.html: " + e.message, "error");
            });
        }

        async function copyCode() {
            const text = document.getElementById('codeOutput').textContent;
            try {
                await navigator.clipboard.writeText(text);
                showToast("Copied code to clipboard!");
            } catch (err) {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast("Copied code to clipboard!");
            }
        }

        function downloadCode() {
            const b = new Blob([document.getElementById('codeOutput').textContent], { type: 'text/html' });
            const u = URL.createObjectURL(b);
            const a = document.createElement('a');
            a.href = u;
            a.download = 'index.html';
            a.click();
            URL.revokeObjectURL(u);
        }

        // ─── TOASTS ───
        function showToast(msg, type = "success") {
            const container = document.getElementById('toastContainer');
            if (!container) return;
            const t = document.createElement('div');
            t.className = `toast ${type}`;
            const icon = type === 'error' ? 'fa-exclamation-circle' : (type === 'info' ? 'fa-info-circle' : 'fa-check-circle');
            t.innerHTML = `<i class="fas ${icon}" style="color:${type==='error'?'var(--danger)':(type==='info'?'var(--info)':'var(--primary)')}"></i> <span>${escapeHTML(msg)}</span>`;
            container.appendChild(t);
            setTimeout(() => {
                t.style.opacity = '0';
                t.style.transform = 'translateX(50px)';
                t.style.transition = 'all 0.3s ease';
                setTimeout(() => t.remove(), 300);
            }, 3200);
        }

        // Expose to window for inline onclick & oninput handlers
        window.handleAuthSubmit = handleAuthSubmit;
        window.handleLogin = handleLogin;
        window.handleRegister = handleRegister;
        window.handleForgotPassword = handleForgotPassword;
        window.handleLocalMode = handleLocalMode;
        window.handleLogout = handleLogout;
        window.toggleAuthMode = toggleAuthMode;
        window.togglePasswordVisibility = togglePasswordVisibility;
        window.showSection = showSection;
        window.toggleSidebar = toggleSidebar;
        window.seedDefaultData = seedDefaultData;
        window.importLocalData = importLocalData;
        window.openTestimonialModal = openTestimonialModal;
        window.editTestimonialById = editTestimonialById;
        window.saveTestimonial = saveTestimonial;
        window.deleteTestimonial = deleteTestimonial;
        window.openProjectModal = openProjectModal;
        window.editProjectById = editProjectById;
        window.saveProject = saveProject;
        window.deleteProject = deleteProject;
        window.handleImageUpload = handleImageUpload;
        window.removeImage = removeImage;
        window.closeModal = closeModal;
        window.saveStudioSettings = saveStudioSettings;
        window.saveAllChanges = saveAllChanges;
        window.downloadJSONBackup = downloadJSONBackup;
        window.importJSONBackup = importJSONBackup;
        window.generateCode = generateCode;
        window.copyCode = copyCode;
        window.downloadCode = downloadCode;
        window.setProjectCategoryFilter = setProjectCategoryFilter;
        window.setInquiryFilter = setInquiryFilter;
        window.setInquiryStatus = setInquiryStatus;
        window.toggleInquiryStatus = toggleInquiryStatus;
        window.deleteInquiry = deleteInquiry;
        window.addSampleInquiry = addSampleInquiry;
        window.clearAllInquiries = clearAllInquiries;
        window.exportInquiriesCSV = exportInquiriesCSV;
        window.setApplicationFilter = setApplicationFilter;
        window.setApplicationStatus = setApplicationStatus;
        window.deleteApplication = deleteApplication;
        window.addSampleApplication = addSampleApplication;
        window.clearArchivedApplications = clearArchivedApplications;
        window.exportApplicationsCSV = exportApplicationsCSV;

        // Render & State Sync Exports
        window.renderProjects = renderProjects;
        window.renderTestimonials = renderTestimonials;
        window.renderInquiries = renderInquiries;
        window.renderApplications = renderApplications;
        window.renderRecentProjects = renderRecentProjects;
        window.renderRecentInquiries = renderRecentInquiries;
        window.renderRecentApplications = renderRecentApplications;
        window.updateStats = updateStats;
        window.refreshAllUI = refreshAllUI;
        window.showToast = showToast;

        // ─── INITIALIZATION ON BOOT ───
        function initAdminConsole() {
            loadFromLocalStorage();
            try {
                if (window.location.search.includes('local=true') || localStorage.getItem('appvertex_admin_session') === 'active') {
                    handleLocalMode(true);
                } else {
                    refreshAllUI();
                }

                const urlParams = new URLSearchParams(window.location.search);
                const targetSec = urlParams.get('section') || (window.location.hash ? window.location.hash.replace('#', '') : '');
                if (targetSec && typeof window.showSection === 'function') {
                    setTimeout(() => window.showSection(targetSec), 50);
                }
            } catch(e) {
                console.warn("Init admin error:", e);
                refreshAllUI();
            }
        }
        initAdminConsole();
    