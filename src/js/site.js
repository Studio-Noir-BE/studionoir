/**
 * Studio Noir — public website behaviour.
 * Dependency-free: FAQ accordion, mobile navigation, header scroll state and
 * a lightweight contact-form handler (placeholder logic until the CMS/Formie
 * backend is wired up).
 */

import "@css/site.scss";

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
 * Header scroll state (compact + backdrop after scrolling)
 * ------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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
function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-visible"));
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
        { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    initFaq();
    initNav();
    initHeaderScroll();
    initForms();
    initReveal();
    document.body.classList.add("is-ready");
});
