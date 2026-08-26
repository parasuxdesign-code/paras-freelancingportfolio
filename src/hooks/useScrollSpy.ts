import { useEffect, type RefObject } from 'react';
import { NAV_ITEMS } from '../data/content';

const SECTIONS = NAV_ITEMS.map((n) => n.id);

/**
 * Ports DC's onScroll: shifts the floating nav to its "scrolled" surface after
 * 24px, and lights the active section's nav link + glowing dot via scroll-spy.
 */
export function useScrollSpy(navRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const paintDot = (link: HTMLElement, on: boolean) => {
      const dot = link.querySelector<HTMLElement>('[data-navdot]');
      if (!dot) return;
      dot.style.opacity = on ? '1' : '0';
      dot.style.transform = on ? 'translate(-50%,0)' : 'translate(-50%,10px)';
    };

    const onScroll = () => {
      const nav = navRef.current;
      if (nav) {
        const on = window.scrollY > 24;
        nav.style.background = on
          ? 'rgba(9,9,15,.88)'
          : 'rgba(13,13,20,.72)';
        nav.style.borderColor = on
          ? 'rgba(255,255,255,.1)'
          : 'rgba(255,255,255,.07)';
        nav.style.boxShadow = on
          ? '0 1px 0 rgba(255,255,255,.05) inset,0 24px 50px -30px rgba(0,0,0,1)'
          : '0 1px 0 rgba(255,255,255,.04) inset,0 18px 40px -28px rgba(0,0,0,.9)';
      }

      let active: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) active = id;
      }

      document.querySelectorAll<HTMLElement>('[data-navlink]').forEach((a) => {
        const on = a.getAttribute('data-navlink') === active;
        a.dataset.active = on ? '1' : '';
        a.style.color = on ? '#F2F3F7' : '#9698A6';
        paintDot(a, on);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [navRef]);
}
