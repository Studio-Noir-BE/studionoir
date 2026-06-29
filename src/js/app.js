// CSS
import "@css/app.scss";

// Cookie banner — dynamic so it doesn't block the main bundle
import('@js/base/cookie-banner');

// Design grid — dev only helper
import "@js/base/design-grid";

// Studio Noir — Figma design behaviour (glow blob, Lenis, FAQ, mobile nav,
// header scroll state + page reveal, scroll reveal, features track). This
// replaces the boilerplate's gsap-based pageNavigation, so no paid GreenSock
// dependency is needed to install/build the site.
import { figmaSite } from "@js/base/figma";
window.addEventListener('DOMContentLoaded', figmaSite);

// Conditional modules — only loaded when matching elements are present
window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js-dialog')) {
        import('@js/base/a11y-dialog').then(({ a11yDialog }) => a11yDialog());
    }

    if (document.querySelector('.fui-form')) {
        import('@js/base/forms').then(({ formieForm }) => formieForm());
    }

    if (document.querySelector('.clicktrough')) {
        import('@js/base/clicktrough').then(({ clickTroughInit }) => clickTroughInit());
    }
});