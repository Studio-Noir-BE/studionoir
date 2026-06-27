import { gsap } from 'gsap';

export const initAccordions = () => {
    const $accordions = Array.from(document.querySelectorAll('.accordion-container'));
    
    if ($accordions.length) {
        // Group accordions by parentId for quick lookups
        const groups = new Map();
        for (const $acc of $accordions) {
            const pid = $acc.dataset.parentId || '__no_parent__';
            if (!groups.has(pid)) groups.set(pid, []);
            groups.get(pid).push($acc);
    
            // Basic a11y hooks
            const $toggle = $acc.querySelector('.accordion-toggle');
            const $content = $acc.querySelector('.accordion-content');
            if ($toggle && $content) {
                $toggle.setAttribute('aria-controls', $content.id || '');
                $toggle.setAttribute('aria-expanded', String(!!$toggle.checked));
                $content.setAttribute('role', 'region');
                // Ensure overflow is hidden for height animation
                $content.style.overflow = 'hidden';
            }
        }
    
        // Helpers
        const closeContent = ($content) => {
            gsap.killTweensOf($content);
            gsap.to($content, { height: 0, duration: 0.4, ease: 'power2.out' });
        };
    
        const openContent = ($content) => {
            gsap.killTweensOf($content);
            // Measure target height (use scrollHeight) and tween to it, then set to 'auto' for responsive content
            const target = $content.scrollHeight;
            gsap.fromTo(
                $content,
                { height: $content.offsetHeight },
                {
                    height: target,
                    duration: 0.4,
                    ease: 'power2.out',
                    onComplete: () => {
                    // Clear inline height so content can grow/shrink naturally after animation
                    $content.style.height = 'auto';
                    }
                }
            );
        };
    
        // Initialize heights based on current checked state
        for (const $acc of $accordions) {
            const $toggle = $acc.querySelector('.accordion-toggle');
            const $content = $acc.querySelector('.accordion-content');
            if (!$toggle || !$content) continue;
            if ($toggle.checked) {
            // Set to auto but keep overflow hidden for subsequent animations
                $content.style.height = 'auto';
            } else {
                $content.style.height = '0px';
            }
        }
    
        // Wire events
        for (const $acc of $accordions) {
            const $toggle = $acc.querySelector('.accordion-toggle');
            const $content = $acc.querySelector('.accordion-content');
            if (!$toggle || !$content) continue;
    
            $toggle.addEventListener('change', () => {
                const parentId = $acc.dataset.parentId || '__no_parent__';
                const group = groups.get(parentId) || [];
    
                if ($toggle.checked) {
                    // Close all siblings in the same group
                    for (const $other of group) {
                    if ($other === $acc) continue;
                    const $otherToggle = $other.querySelector('.accordion-toggle');
                    const $otherContent = $other.querySelector('.accordion-content');
                    if ($otherToggle && $otherContent) {
                        $otherToggle.checked = false;
                        $otherToggle.setAttribute('aria-expanded', 'false');
                        closeContent($otherContent);
                    }
                    }
                    // Open current
                    $toggle.setAttribute('aria-expanded', 'true');
                    // If height was previously 0, set to 0 explicitly before opening to avoid jump when it was 'auto'
                    if (getComputedStyle($content).height === 'auto') $content.style.height = $content.offsetHeight + 'px';
                    openContent($content);
                } else {
                    // Just close current
                    $toggle.setAttribute('aria-expanded', 'false');
                    closeContent($content);
                }
            });
        }
    }
}