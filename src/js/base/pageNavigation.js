import { gsap } from 'gsap';
import { debounce } from "@js/base/debounce";

// Reveal the page once fonts + CSS are ready.
// No gradual fade — an animated reveal creates a window during which
// other JS initialisations (classes, styles) are visible mid-transition.
export function revealPage() {
    const body = document.body;
    const html = document.documentElement;
    if (!body || body.classList.contains('is-ready')) return;

    html.classList.add('is-ready');
    body.classList.add('is-ready');
}

export function pageNavigation() {
    // Needed elements to make everything work
    const body = document.body;
    const header = document.querySelector('.js-header');
    const toggle = document.querySelector('.js-toggle');
    const siteNavigation = document.querySelector('.js-siteNavigation');

    // Always reveal the page, even when nav elements are absent
    if (!header || !toggle || !siteNavigation) {
        const reveal = () => requestAnimationFrame(() => revealPage());
        if (document.fonts && document.fonts.ready) {
            const timeout = setTimeout(reveal, 300);
            document.fonts.ready.then(() => { clearTimeout(timeout); reveal(); });
        } else {
            reveal();
        }
        return;
    }

    if (body && header && toggle && siteNavigation) {
        const topNavigation = header.querySelector('.js-header--top');
        const primaryNavigation = header.querySelector('.js-header--primary');

        // Function to update header height CSS variable
        const updateHeaderHeight = () => {
            // Use requestAnimationFrame to ensure layout is calculated
            requestAnimationFrame(() => {
                gsap.set(body, {
                    '--header-height': header.scrollHeight + 'px'
                });
            });
        };

        const initHeaderHeight = () => {
            requestAnimationFrame(() => {
                updateHeaderHeight();

                if (window.ResizeObserver) {
                    const resizeObserver = new ResizeObserver(() => {
                        updateHeaderHeight();
                    });
                    resizeObserver.observe(header);
                }

                // Wait for fonts before revealing — prevents fallback→Inter swap flash.
                // Fonts are self-hosted so this resolves in <100ms in practice.
                // Hard cap at 300ms so a slow connection never blocks the page long.
                const reveal = () => requestAnimationFrame(() => {
                    updateHeaderHeight();
                    revealPage();
                });

                if (document.fonts && document.fonts.ready) {
                    const timeout = setTimeout(reveal, 300);
                    document.fonts.ready.then(() => {
                        clearTimeout(timeout);
                        reveal();
                    });
                } else {
                    reveal();
                }
            });
        };


        // Initialize header height
        initHeaderHeight();

        // Also update on window load as a fallback (waits for all resources)
        window.addEventListener('load', () => {
            updateHeaderHeight();
        });

        // When clicking on the toggle do stuff..
        toggle.addEventListener('click', (e) => {
            // Set the header height variable again, since screen size might have changed since page load
            updateHeaderHeight();

            // Check if the navigatin is currently active
            if (document.querySelector('.Toggle').classList.contains('is-active')) {
                // Close if its active
                closeNavigation();
            } else {
                // Open if its closed
                openNavigation();

                // Only when its open, close it again when esc is pressed
                document.addEventListener('keydown', function (event) {
                        if (event.key === 'Escape' || event.key === 'Esc') { // For older browsers that might still use 'Esc'
                            closeNavigation();
                        }
                });
            }
        })

        // On window resize, with debounce so only runs when at the end of the resize
        window.addEventListener("resize", debounce(function (e) {
            // Always update header height on resize (responsive breakpoints might change it)
            updateHeaderHeight();

            // Check if the navigatin is currently active
            if (document.querySelector('.Toggle').classList.contains('is-active')) {
                // Set the siteNavigation height again
                gsap.set(siteNavigation, {
                        height: window.innerHeight
                });
            }
        }));

        // Logic to open the navigation
        const openNavigation = () => {
            toggle.classList.add('is-active');
            body.classList.add('show-nav');

            gsap.to(siteNavigation, {
                height: window.innerHeight
            });

            if (topNavigation) {
                gsap.to(topNavigation, {
                        opacity: 0,
                        pointerEvents: 'none'
                })
            }

            if (primaryNavigation) {
                gsap.to(primaryNavigation, {
                        opacity: 0,
                        pointerEvents: 'none'
                })
            }
        }

        // Logic to close the navigation
        const closeNavigation = () => {
            toggle.classList.remove('is-active');
            body.classList.remove('show-nav');

            gsap.to(siteNavigation, {
                height: 0
            });

            if (topNavigation) {
                gsap.to(topNavigation, {
                        opacity: 1,
                        pointerEvents: 'auto'
                })
            }
            
            if (primaryNavigation) {
                gsap.to(primaryNavigation, {
                        opacity: 1,
                        pointerEvents: 'auto'
                })
            }
        }
    }
}