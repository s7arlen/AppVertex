// AppVertex - Global Studio Footer Component
const footerHTML = `
<div class="container">
    <!-- Pre-Footer CTA Card -->
    <div class="footer-cta-card reveal-on-scroll">
        <h3 class="footer-cta-title">Let's Build Something Together</h3>
        <p class="footer-cta-desc">
            Have a project in mind or need an honest review of your existing systems? We're ready to engineer your digital advantage.
        </p>
        <a href="contact.html" class="footer-cta-btn">
            <span>START YOUR PROJECT</span>
            <span class="arr">→</span>
        </a>
    </div>

    <!-- Footer 4-Column Directory -->
    <div class="footer-grid-4">
        <!-- Col 1: Brand & Bio -->
        <div class="footer-col">
            <div class="footer-brand-title">
                <img src="logo.png" alt="AppVertex Logo" width="28" height="28">
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
                    <a href="https://github.com/s7arlen/AppVertex" target="_blank" rel="noopener noreferrer" class="footer-link">
                        <i class="fab fa-github" style="margin-right: 6px;"></i> GitHub Studio
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
} else {
    renderFooter();
}

export default renderFooter;
