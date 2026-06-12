/*================================================================
   SMARTSERVICE COMPONENT INJECTORS (WEB COMPONENTS)
   Vanilla Custom Elements for DRY Architecture
================================================================*/

// Global client-side Auth Check
const isLoggedIn = localStorage.getItem("smartservice_logged_in") === "true";
(function() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const isLoginPage = currentPath === "login.html";
    
    // Define pages that require login (special services)
    const specialPages = [
        "govt-id-print.html",
        "farmer-data-extractor.html",
        "id-card-maker.html"
    ];
    
    const requiresLogin = specialPages.includes(currentPath);

    if (requiresLogin && !isLoggedIn && !isLoginPage) {
        // Remember where the user wanted to go
        localStorage.setItem("smartservice_redirect_target", currentPath);
        window.location.href = "login.html";
    }
})();

// Site Header Component
class SiteHeader extends HTMLElement {
    connectedCallback() {
        // Highlight active page
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        
        const isLoggedIn = localStorage.getItem("smartservice_logged_in") === "true";
        const authLink = isLoggedIn 
            ? `<a href="#" class="nav-link" id="btnLogout" style="color: #ef4444;"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            : `<a href="login.html" class="nav-link" style="color: var(--primary); font-weight: 700;"><i class="fas fa-sign-in-alt"></i> VLE Login</a>`;

        const mobileAuthLink = isLoggedIn
            ? `<a href="#" class="nav-link" id="btnMobileLogout" style="color: #ef4444; margin-top: auto;"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            : `<a href="login.html" class="nav-link" style="color: var(--primary); margin-top: auto; font-weight: 700;"><i class="fas fa-sign-in-alt"></i> VLE Login</a>`;
        
        const headerHTML = `
            <style>
                header {
                    background: #ffffff;
                    border-bottom: 1px solid var(--border-color);
                    position: fixed;
                    width: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                    box-shadow: var(--shadow-sm);
                }
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 70px;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .nav-links {
                    display: flex;
                    gap: 32px;
                    align-items: center;
                }
                .nav-link {
                    font-weight: 500;
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    padding: 6px 0;
                    position: relative;
                }
                .nav-link:hover, .nav-link.active {
                    color: var(--primary);
                }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--gradient-primary);
                    border-radius: 2px;
                }
                .hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 6px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                }
                .hamburger span {
                    width: 24px;
                    height: 2px;
                    background-color: var(--text-main);
                    transition: var(--transition-fast);
                }
                
                /* Mobile Menu */
                .mobile-menu {
                    position: fixed;
                    top: 70px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: #ffffff;
                    z-index: 999;
                    display: flex;
                    flex-direction: column;
                    padding: 32px 24px;
                    gap: 24px;
                    transition: var(--transition-normal);
                    box-shadow: var(--shadow-lg);
                }
                .mobile-menu.open {
                    left: 0;
                }
                .mobile-menu .nav-link {
                    font-size: 1.2rem;
                }
 
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    .hamburger {
                        display: flex;
                    }
                }
            </style>
            <header class="no-print">
                <div class="nav-container">
                    <a href="index.html" class="nav-logo">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="6" fill="url(#grad)" />
                            <path d="M7 11.5L10.5 15L17 8.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#3b82f6" />
                                    <stop offset="1" stop-color="#1d4ed8" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span>SmartService</span>
                    </a>
                    <nav class="nav-links">
                        <a href="index.html" class="nav-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Home</a>
                        <a href="govt-id-print.html" class="nav-link ${currentPath === 'govt-id-print.html' ? 'active' : ''}">Govt ID Print</a>
                        <a href="farmer-data-extractor.html" class="nav-link ${currentPath === 'farmer-data-extractor.html' ? 'active' : ''}">Farmer Extractor</a>
                        <a href="image-resizer.html" class="nav-link ${currentPath === 'image-resizer.html' ? 'active' : ''}">Image Resizer</a>
                        <a href="whatsapp-direct.html" class="nav-link ${currentPath === 'whatsapp-direct.html' ? 'active' : ''}">WhatsApp Direct</a>
                        <a href="about.html" class="nav-link ${currentPath === 'about.html' ? 'active' : ''}">About Us</a>
                        <a href="contact.html" class="nav-link ${currentPath === 'contact.html' ? 'active' : ''}">Contact</a>
                        ${authLink}
                    </nav>
                    <button class="hamburger" id="menuToggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>
            <div class="mobile-menu no-print" id="mobileDrawer">
                <a href="index.html" class="nav-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Home</a>
                <a href="govt-id-print.html" class="nav-link ${currentPath === 'govt-id-print.html' ? 'active' : ''}">Govt ID Print</a>
                <a href="farmer-data-extractor.html" class="nav-link ${currentPath === 'farmer-data-extractor.html' ? 'active' : ''}">Farmer Extractor</a>
                <a href="image-resizer.html" class="nav-link ${currentPath === 'image-resizer.html' ? 'active' : ''}">Image Resizer</a>
                <a href="whatsapp-direct.html" class="nav-link ${currentPath === 'whatsapp-direct.html' ? 'active' : ''}">WhatsApp Direct</a>
                <a href="about.html" class="nav-link ${currentPath === 'about.html' ? 'active' : ''}">About Us</a>
                <a href="contact.html" class="nav-link ${currentPath === 'contact.html' ? 'active' : ''}">Contact</a>
                ${mobileAuthLink}
            </div>
        `;
        
        this.innerHTML = headerHTML;

        // Logout Event Logic
        const logoutBtn = this.querySelector("#btnLogout");
        const mobileLogoutBtn = this.querySelector("#btnMobileLogout");
        const handleLogout = (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to logout of the CSC Console?")) {
                localStorage.removeItem("smartservice_logged_in");
                window.location.href = "login.html";
            }
        };
        if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
        if (mobileLogoutBtn) mobileLogoutBtn.addEventListener("click", handleLogout);
        
        // Add Mobile Toggle Logic
        const menuToggle = this.querySelector("#menuToggle");
        const mobileDrawer = this.querySelector("#mobileDrawer");
        if (menuToggle && mobileDrawer) {
            menuToggle.addEventListener("click", () => {
                mobileDrawer.classList.toggle("open");
                const spans = menuToggle.querySelectorAll("span");
                if (mobileDrawer.classList.contains("open")) {
                    spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
                    spans[1].style.opacity = "0";
                    spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
                } else {
                    spans[0].style.transform = "none";
                    spans[1].style.opacity = "1";
                    spans[2].style.transform = "none";
                }
            });
        }
    }
}

// Site Footer Component
class SiteFooter extends HTMLElement {
    connectedCallback() {
        const footerHTML = `
            <style>
                .footer-wrapper {
                    background-color: var(--bg-dark);
                    color: #94a3b8;
                    padding: 64px 24px 24px 24px;
                    border-top: 1px solid #1e293b;
                    font-size: 0.9rem;
                }
                .footer-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.5fr;
                    gap: 48px;
                    max-width: 1280px;
                    margin: 0 auto 48px auto;
                }
                .footer-logo {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #ffffff;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .footer-title {
                    color: #ffffff;
                    font-size: 1.05rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                }
                .footer-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .footer-link:hover {
                    color: #ffffff;
                }
                .copyright {
                    border-top: 1px solid #1e293b;
                    padding-top: 24px;
                    text-align: center;
                    font-size: 0.85rem;
                    max-width: 1280px;
                    margin: 0 auto;
                }
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 32px;
                    }
                }
            </style>
            <footer class="footer-wrapper no-print">
                <div class="footer-grid">
                    <div>
                        <div class="footer-logo">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="6" fill="#3b82f6" />
                                <path d="M7 11.5L10.5 15L17 8.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>SmartService</span>
                        </div>
                        <p style="margin-bottom: 16px; line-height: 1.6;">
                            India’s Most Trusted Platform for CSC VLEs & Operators. Fast, secure, and 100% free document creation, ID printing, and image utility tools.
                        </p>
                    </div>
                    <div>
                        <div class="footer-title">Quick Links</div>
                        <ul class="footer-links">
                            <li><a href="index.html" class="footer-link">Home</a></li>
                            <li><a href="about.html" class="footer-link">About Us</a></li>
                            <li><a href="contact.html" class="footer-link">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <div class="footer-title">Popular Tools</div>
                        <ul class="footer-links">
                            <li><a href="govt-id-print.html" class="footer-link">Govt ID Card Print</a></li>
                            <li><a href="image-resizer.html" class="footer-link">Image Resizer</a></li>
                            <li><a href="whatsapp-direct.html" class="footer-link">WhatsApp Direct</a></li>
                        </ul>
                    </div>
                    <div>
                        <div class="footer-title">Privacy & Terms</div>
                        <p style="line-height: 1.6; margin-bottom: 12px;">
                            We do not upload or store your personal documents. All operations run locally inside your browser.
                        </p>
                        <ul class="footer-links" style="flex-direction: row; gap: 16px;">
                            <li><a href="privacy.html" class="footer-link">Privacy</a></li>
                            <li><a href="terms.html" class="footer-link">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    &copy; 2026 SmartService. All rights reserved. Designed for CSC VLEs in India.
                </div>
            </footer>
        `;
        this.innerHTML = footerHTML;
    }
}

// Register Web Components
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

// Toast Notification System
function showToast(message, type = 'success') {
    const existing = document.getElementById('toast-container');
    if (existing) {
        existing.remove();
    }

    const container = document.createElement('div');
    container.id = 'toast-container';
    
    let icon = '✔';
    let bgColor = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Success Green
    if (type === 'error') {
        icon = '✖';
        bgColor = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'; // Error Red
    } else if (type === 'info') {
        icon = 'ℹ';
        bgColor = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'; // Info Blue
    }

    container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${bgColor};
        color: white;
        padding: 14px 24px;
        border-radius: var(--radius-md, 8px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        font-size: 0.95rem;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    container.innerHTML = `
        <span style="font-size: 1.1rem; display: inline-flex; justify-content: center; align-items: center; width: 20px; height: 20px; background: rgba(255,255,255,0.2); border-radius: 50%;">${icon}</span>
        <span>${message}</span>
    `;

    document.body.appendChild(container);

    // Trigger animate-in
    setTimeout(() => {
        container.style.transform = 'translateY(0)';
        container.style.opacity = '1';
    }, 50);

    // Dismiss after 3.5s
    setTimeout(() => {
        container.style.transform = 'translateY(100px)';
        container.style.opacity = '0';
        setTimeout(() => container.remove(), 300);
    }, 3500);
}

// Dynamic VLE locks overlay scan on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("smartservice_logged_in") === "true";
    if (!isLoggedIn) {
        // List of pages/queries that require user session
        const protectedHrefs = [
            "govt-id-print.html",
            "farmer-data-extractor.html",
            "id-card-maker.html"
        ];
        
        const cards = document.querySelectorAll(".interactive-card");
        cards.forEach(card => {
            const link = card.querySelector("a");
            if (!link) return;

            const href = link.getAttribute("href");
            const isProtected = protectedHrefs.some(p => href && href.includes(p));

            if (isProtected) {
                // Style button to indicate it is locked
                link.innerHTML = `<i class="fas fa-lock"></i> Unlock Service`;
                link.style.background = "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)";
                link.style.boxShadow = "0 4px 12px rgba(245, 158, 11, 0.25)";
                link.style.border = "none";
                link.style.color = "#ffffff";

                // Add a cute floating lock badge in the visual header
                const imgBox = card.querySelector(".card-image-box");
                if (imgBox) {
                    const lockBadge = document.createElement("div");
                    lockBadge.className = "card-lock-badge";
                    lockBadge.style.cssText = `
                        position: absolute;
                        top: 12px;
                        left: 12px;
                        background: rgba(15, 23, 42, 0.82);
                        color: #fbbf24;
                        padding: 5px 10px;
                        border-radius: var(--radius-sm, 6px);
                        font-size: 0.72rem;
                        font-weight: 800;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        border: 1px solid rgba(251, 191, 36, 0.25);
                        backdrop-filter: blur(6px);
                        -webkit-backdrop-filter: blur(6px);
                        box-shadow: var(--shadow-sm);
                        z-index: 5;
                    `;
                    lockBadge.innerHTML = `<i class="fas fa-lock"></i> VLE LOGIN`;
                    imgBox.appendChild(lockBadge);
                }
            }
        });
    }
});
