console.log("K Sai Deepak Portfolio JS loaded");

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const revealElements = document.querySelectorAll(
    ".reveal, .fade-in, .reveal-left, .reveal-right, .reveal-scale"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHT (DESKTOP + MOBILE)
// ==========================================
const navLinks = document.querySelectorAll(".nav-page");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const sections = document.querySelectorAll(
    "#Home, #About, #skills, #projects, #education, #contact"
);

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const currentId = entry.target.id;

            // Desktop active state
            navLinks.forEach((link) => link.classList.remove("active"));
            const activeDesktopLink = document.querySelector(`.nav-page[href="#${currentId}"]`);
            if (activeDesktopLink) {
                activeDesktopLink.classList.add("active");
            }

            // Mobile active state
            mobileNavLinks.forEach((link) => link.classList.remove("active"));
            const activeMobileLink = document.querySelector(`.mobile-nav-link[href="#${currentId}"]`);
            if (activeMobileLink) {
                activeMobileLink.classList.add("active");
            }
        }
    });
}, {
    threshold: 0.3
});

sections.forEach((section) => {
    navObserver.observe(section);
});

// ==========================================
// NAVBAR SCROLL & BACK TO TOP BUTTON
// ==========================================
const navbar = document.getElementById("navbar");
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Glassmorphic background enhancement on scroll
    if (navbar) {
        if (scrollPos > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    // Back to top visibility
    if (backToTopBtn) {
        if (scrollPos > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    }
}, { passive: true });

// ==========================================
// MOBILE NAVIGATION DRAWER TOGGLE
// ==========================================
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileCloseBtn = document.getElementById("mobileCloseBtn");
const navBackdrop = document.getElementById("navBackdrop");

function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add("open");
    navBackdrop?.classList.add("active");
    navToggle?.classList.add("open");
    navToggle?.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("open");
    navBackdrop?.classList.remove("active");
    navToggle?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

navToggle?.addEventListener("click", () => {
    if (mobileNav?.classList.contains("open")) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
});

mobileCloseBtn?.addEventListener("click", closeMobileNav);
navBackdrop?.addEventListener("click", closeMobileNav);

// Close mobile nav when clicking any link inside it
mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
});

document.querySelector(".mobile-connect-link")?.addEventListener("click", closeMobileNav);

// Close mobile drawer on Escape key press
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav?.classList.contains("open")) {
        closeMobileNav();
    }
});

// ==========================================
// RESUME DOWNLOAD
// ==========================================
const resumeBtn = document.querySelector("#resumeBtn");

if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
        const resumePath = "resume.pdf";

        fetch(resumePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Resume not found");
                }

                const link = document.createElement("a");
                link.href = resumePath;
                link.download = "K-Sai-Deepak-Resume.pdf";

                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(() => {
                alert("Resume is currently unavailable");
            });
    });
}

// ==========================================
// CONTACT FORM WHATSAPP SUBMISSION
// ==========================================
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.querySelector("#name")?.value.trim() || "";
        const email = document.querySelector("#email")?.value.trim() || "";
        const subject = document.querySelector("#subject")?.value.trim() || "";
        const message = document.querySelector("#message")?.value.trim() || "";

        const whatsappMessage = `*New Portfolio Contact*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;

        const phoneNumber = "919182667685";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");
    });
}
