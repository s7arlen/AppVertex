// AppVertex - Global Studio Footer Component
const footerHTML = `
<div class="container">
    <!-- Footer 4-Column Directory -->
    <div class="footer-grid-4">
        <!-- Col 1: Brand & Bio -->
        <div class="footer-col">
            <div class="footer-brand-title">
                <img src="/logo.png" alt="AppVertex Logo" width="28" height="28">
                <span class="logo-text" style="font-size: 1.25rem;">AppVertex</span>
            </div>
            <p class="footer-brand-desc">
                We Build Brands Online. High-performance websites, custom web apps, and dependable software solutions.
            </p>
        </div>

        <!-- Col 2: Navigation -->
        <div class="footer-col">
            <h4 class="footer-col-title">Navigation</h4>
            <ul class="footer-links-list">
                <li><a href="index.html" class="footer-link">Home</a></li>
                <li><a href="services.html" class="footer-link">Services</a></li>
                <li><a href="work.html" class="footer-link">Selected Work</a></li>
                <li><a href="process.html" class="footer-link">Our Process</a></li>
                <li><a href="about.html" class="footer-link">About Studio</a></li>
                <li><a href="contact.html" class="footer-link">Contact</a></li>
            </ul>
        </div>

        <!-- Col 3: Services -->
        <div class="footer-col">
            <h4 class="footer-col-title">Services</h4>
            <ul class="footer-links-list">
                <li><a href="services.html" class="footer-link">Website Development</a></li>
                <li><a href="services.html" class="footer-link">Custom Web Applications</a></li>
                <li><a href="services.html" class="footer-link">UI/UX Design</a></li>
                <li><a href="services.html" class="footer-link">School Management Portals</a></li>
                <li><a href="services.html" class="footer-link">E-commerce Stores</a></li>
                <li><a href="services.html" class="footer-link">Website Maintenance</a></li>
            </ul>
        </div>

        <!-- Col 4: Connect -->
        <div class="footer-col">
            <h4 class="footer-col-title">Connect</h4>
            <ul class="footer-links-list">
                <li>
                    <a href="mailto:appvertex.in@gmail.com" class="footer-link">
                        <i class="fas fa-envelope" style="margin-right: 6px;"></i> appvertex.in@gmail.com
                    </a>
                </li>
                <li>
                    <a href="https://wa.me/919322971253" target="_blank" rel="noopener noreferrer" class="footer-link">
                        <i class="fab fa-whatsapp" style="margin-right: 6px;"></i> +91 93229 71253
                    </a>
                </li>
                <li>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-link">
                        <i class="fab fa-linkedin" style="margin-right: 6px;"></i> LinkedIn
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <!-- Footer Bottom Row -->
    <div class="footer-bottom-row">
        <div class="footer-bottom-left">
            <p class="footer-text">© 2024 AppVertex. All rights reserved.</p>
            <span>•</span>
            <span>Built with precision &amp; modern web architectures</span>
        </div>
        <div>
            <span>Mangaluru, India · Worldwide Remote</span>
        </div>
    </div>
</div>
`;

function renderFooter() {
    const footer = document.getElementById('siteFooter');
    if (footer && (!footer.innerHTML || footer.innerHTML.trim() === '')) {
        footer.innerHTML = footerHTML;
    }
}

function initCustomSelects() {
    const selects = document.querySelectorAll('select.form-control:not([data-customized])');
    selects.forEach(select => {
        select.setAttribute('data-customized', 'true');

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        select.classList.add('custom-select-hidden');

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'custom-select-trigger';
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');

        const selectedOpt = select.options[select.selectedIndex] || select.options[0];
        const label = document.createElement('span');
        label.className = 'custom-select-label';
        label.textContent = selectedOpt ? selectedOpt.text : 'Select...';

        const arrow = document.createElement('span');
        arrow.className = 'custom-select-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.innerHTML = `
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        `;

        trigger.appendChild(label);
        trigger.appendChild(arrow);
        wrapper.appendChild(trigger);

        const dropdown = document.createElement('div');
        dropdown.className = 'custom-select-dropdown';
        dropdown.setAttribute('role', 'listbox');
        dropdown.setAttribute('tabindex', '-1');

        Array.from(select.options).forEach((opt, idx) => {
            const optEl = document.createElement('div');
            optEl.className = 'custom-select-option' + (idx === select.selectedIndex ? ' is-selected' : '');
            optEl.setAttribute('role', 'option');
            optEl.setAttribute('aria-selected', idx === select.selectedIndex ? 'true' : 'false');
            optEl.dataset.value = opt.value;

            const text = document.createElement('span');
            text.className = 'custom-select-option-text';
            text.textContent = opt.text;

            const check = document.createElement('i');
            check.className = 'fas fa-check custom-select-check';
            check.setAttribute('aria-hidden', 'true');

            optEl.appendChild(text);
            optEl.appendChild(check);

            optEl.addEventListener('click', (e) => {
                e.stopPropagation();
                select.selectedIndex = idx;
                label.textContent = opt.text;

                dropdown.querySelectorAll('.custom-select-option').forEach(o => {
                    o.classList.remove('is-selected');
                    o.setAttribute('aria-selected', 'false');
                });
                optEl.classList.add('is-selected');
                optEl.setAttribute('aria-selected', 'true');

                closeDropdown();
                select.dispatchEvent(new Event('change', { bubbles: true }));
                trigger.focus();
            });

            dropdown.appendChild(optEl);
        });

        wrapper.appendChild(dropdown);

        function openDropdown() {
            document.querySelectorAll('.custom-select-wrapper.is-open').forEach(w => {
                if (w !== wrapper) {
                    w.classList.remove('is-open');
                    const t = w.querySelector('.custom-select-trigger');
                    if (t) t.setAttribute('aria-expanded', 'false');
                }
            });

            wrapper.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
            const selectedOption = dropdown.querySelector('.is-selected');
            if (selectedOption) {
                selectedOption.scrollIntoView({ block: 'nearest' });
            }
        }

        function closeDropdown() {
            wrapper.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
        }

        function toggleDropdown() {
            if (wrapper.classList.contains('is-open')) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        trigger.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleDropdown();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!wrapper.classList.contains('is-open')) {
                    openDropdown();
                } else {
                    const nextIdx = Math.min(select.options.length - 1, select.selectedIndex + 1);
                    dropdown.children[nextIdx]?.click();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!wrapper.classList.contains('is-open')) {
                    openDropdown();
                } else {
                    const prevIdx = Math.max(0, select.selectedIndex - 1);
                    dropdown.children[prevIdx]?.click();
                }
            } else if (e.key === 'Escape') {
                closeDropdown();
            }
        });

        select.addEventListener('change', () => {
            const curOpt = select.options[select.selectedIndex];
            if (curOpt) {
                label.textContent = curOpt.text;
                dropdown.querySelectorAll('.custom-select-option').forEach((o, i) => {
                    const isSel = i === select.selectedIndex;
                    o.classList.toggle('is-selected', isSel);
                    o.setAttribute('aria-selected', isSel ? 'true' : 'false');
                });
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-select-wrapper.is-open').forEach(w => {
                w.classList.remove('is-open');
                const t = w.querySelector('.custom-select-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

function initAll() {
    renderFooter();
    initCustomSelects();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

export default renderFooter;
