import { useCallback } from 'react';

/**
 * Smooth in-page navigation, ported from DCLogic onNavClick/scrollTo/toTop.
 * Hash links scroll to the target section with a 104px offset to clear the
 * floating nav; `#top` scrolls to the very top. Non-hash links (external, e.g.
 * Tally/WhatsApp) are left to the browser. Respects reduced motion.
 */
export function useSmoothScroll(reduced: boolean, onNavigate?: () => void) {
  const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 104;
      window.scrollTo({ top, behavior });
    },
    [behavior]
  );

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute('href') || '';
      if (!href.startsWith('#')) return; // external links behave normally
      e.preventDefault();
      onNavigate?.();
      if (href === '#top') window.scrollTo({ top: 0, behavior });
      else scrollToId(href.slice(1));
    },
    [behavior, onNavigate, scrollToId]
  );

  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior });
  }, [behavior]);

  return { onNavClick, toTop };
}
