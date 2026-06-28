/**
 * Studio Noir — public website behaviour.
 * Dependency-free: FAQ accordion, mobile navigation, header scroll state and
 * a lightweight contact-form handler (placeholder logic until the CMS/Formie
 * backend is wired up).
 */

import "@css/site.scss";
import Lenis from "lenis";

/* ----------------------------------------------------------------------------
 * FAQ accordion
 * ------------------------------------------------------------------------- */
function initFaq() {
    document.querySelectorAll("[data-faq]").forEach((group) => {
        const items = group.querySelectorAll(".faq-item");
        items.forEach((item) => {
            const trigger = item.querySelector(".faq-trigger");
            if (!trigger) return;
            trigger.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");
                // Accordion behaviour: close siblings
                items.forEach((other) => {
                    other.classList.remove("is-open");
                    other.querySelector(".faq-trigger")?.setAttribute("aria-expanded", "false");
                });
                if (!isOpen) {
                    item.classList.add("is-open");
                    trigger.setAttribute("aria-expanded", "true");
                }
            });
        });
    });
}

/* ----------------------------------------------------------------------------
 * Mobile navigation
 * ------------------------------------------------------------------------- */
function initNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
        menu.classList.toggle("is-open", open);
        toggle.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("overflow-hidden", open);
    };

    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
    });
}

/* ----------------------------------------------------------------------------
 * Header scroll state — hide on scroll down, reveal on scroll up
 * ------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    let lastY = window.scrollY;
    const onScroll = () => {
        const y = window.scrollY;
        header.classList.toggle("is-scrolled", y > 24);
        // Hide when scrolling down past 80px, reveal on any upward movement
        if (y > 80) {
            header.classList.toggle("is-hidden", y > lastY);
        } else {
            header.classList.remove("is-hidden");
        }
        lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

/* ----------------------------------------------------------------------------
 * Header logo hides when contact-card logo enters full view
 * ------------------------------------------------------------------------- */
function initContactLogoObserver() {
    const contactLogo = document.querySelector("[data-contact-logo]");
    const headerLogo  = document.querySelector("[data-header-logo]");
    if (!contactLogo || !headerLogo) return;
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                headerLogo.classList.toggle("logo-hidden", entry.isIntersecting);
            });
        },
        { threshold: 0.85 }
    );
    io.observe(contactLogo);
}

/* ----------------------------------------------------------------------------
 * Lenis smooth scroll
 * ------------------------------------------------------------------------- */
function initLenis() {
    const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return lenis;
}

/* ----------------------------------------------------------------------------
 * Contact form (front-end placeholder — no backend yet)
 * ------------------------------------------------------------------------- */
function initForms() {
    document.querySelectorAll("[data-contact-form]").forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const note = form.querySelector("[data-form-note]");
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            if (note) {
                note.textContent =
                    "Bedankt! Je bericht is klaar om verstuurd te worden. (Formulier wordt later gekoppeld aan de backend.)";
                note.classList.remove("hidden");
            }
            form.reset();
        });
    });
}

/* ----------------------------------------------------------------------------
 * Reveal on scroll (subtle fade/translate)
 * ------------------------------------------------------------------------- */
function revealAll() {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
}

function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
        revealAll();
        return;
    }
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        },
        // threshold 0 so even sections taller than the viewport reveal as soon
        // as their edge appears (the old 0.12 threshold never fired for tall
        // sections on small screens, leaving them blank).
        { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: never leave content hidden if the observer misses anything.
    window.addEventListener("load", () => setTimeout(revealAll, 1200));
}

/* ----------------------------------------------------------------------------
 * Global glow blob — subtle mouse-following, snaps to positions on scroll
 * ------------------------------------------------------------------------- */
function initBlob() {
    const blob = document.getElementById("sn-blob");
    if (!blob) return;

    let blobX = window.innerWidth * 0.5;
    let blobY = window.innerHeight * 0.4;
    let targetX = blobX;
    let targetY = blobY;
    let fixedMode = false;
    let fixedBaseX = blobX;
    let fixedBaseY = blobY;

    document.addEventListener("mousemove", (e) => {
        if (fixedMode) {
            // Subtle influence: 12% drift toward cursor from the fixed anchor
            targetX = fixedBaseX + (e.clientX - fixedBaseX) * 0.12;
            targetY = fixedBaseY + (e.clientY - fixedBaseY) * 0.12;
        } else {
            targetX = e.clientX;
            targetY = e.clientY;
        }
    }, { passive: true });

    (function tick() {
        blobX += (targetX - blobX) * 0.07;
        blobY += (targetY - blobY) * 0.07;
        blob.style.left = blobX + "px";
        blob.style.top  = blobY + "px";
        requestAnimationFrame(tick);
    })();

    // Public API for ScrollTrigger callbacks
    window.__snBlob = {
        snap: (x, y) => { fixedMode = true;  fixedBaseX = x; fixedBaseY = y; targetX = x; targetY = y; },
        free: ()       => { fixedMode = false; },
    };
}

/* ----------------------------------------------------------------------------
 * Features section — scroll-driven card activation (vanilla, no GSAP needed)
 * ------------------------------------------------------------------------- */
function initFeatures() {
    const section = document.getElementById("features-section");
    if (!section) return;

    const cards = section.querySelectorAll(".feature-card");
    if (!cards.length) return;

    const viewport = document.getElementById("feature-viewport");
    const track    = document.getElementById("feature-track");

    const activateCard = (index) => {
        cards.forEach((card, i) => {
            const dist = Math.abs(i - index);
            card.classList.toggle("is-active", dist === 0);
            card.style.opacity = Math.pow(0.5, dist);
            card.style.filter  = dist === 0 ? "blur(0px)" : `blur(${dist * 6}px)`;
        });

        // Translate track so the active card is vertically centred in the viewport
        if (track && viewport) {
            const viewportH  = viewport.offsetHeight;
            const activeCard = cards[index];
            const cardTop    = activeCard.offsetTop;
            const cardH      = activeCard.offsetHeight;
            track.style.transform = `translateY(${viewportH / 2 - cardTop - cardH / 2}px)`;
        }
    };
    activateCard(0);

    // Drive card state from scroll progress through the tall sticky section
    const onScroll = () => {
        const rect = section.getBoundingClientRect();
        const scrolled   = -rect.top;
        const scrollable = rect.height - window.innerHeight;
        const progress   = Math.max(0, Math.min(1, scrolled / scrollable));
        activateCard(Math.min(Math.floor(progress * cards.length), cards.length - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Snap global blob to left quarter of screen while section is visible
    const blobObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    window.__snBlob?.snap(window.innerWidth * 0.25, window.innerHeight * 0.5);
                } else {
                    window.__snBlob?.free();
                }
            });
        },
        { threshold: 0, rootMargin: "-15% 0px -15% 0px" }
    );
    blobObserver.observe(section);
}

document.addEventListener("DOMContentLoaded", () => {
    window.__snReady = true;
    initLenis();
    initFaq();
    initNav();
    initHeaderScroll();
    initContactLogoObserver();
    initForms();
    initReveal();
    initBlob();
    initFeatures();
    document.body.classList.add("is-ready");
});
