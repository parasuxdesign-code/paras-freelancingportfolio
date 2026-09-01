import { useEffect, type RefObject } from 'react';

const SECTIONS = ['work', 'services', 'process', 'about', 'testimonials'];

/**
 * Ports DCLogic.onScroll + paintDot: shifts the floating nav to its "scrolled"
 * surface past 24px, and lights the active section's nav link + underline dot
 * via scroll-spy. Values match the source exactly.
 */
export function useScrollSpy(navRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const paintDot = (link: HTMLElement, on: boolean) => {
      link.style.color = on ? '#FFFFFF' : 'rgba(255,255,255,.7)';
      link.style.webkitTextStrokeWidth = on ? '.4px' : '0px';
      link.style.webkitTextStrokeColor = '#FFFFFF';
      const dot = link.querySelector<HTMLElement>('[data-navdot]');
      if (!dot) return;
      dot.style.opacity = on ? '1' : '0';
      dot.style.transform = on
        ? 'translateX(-50%) scaleX(1)'
        : 'translateX(-50%) scaleX(.2)';
    };

    const onScroll = () => {
      const nav = navRef.current;
      if (nav) {
        const on = window.scrollY > 24;
        nav.style.background = on
          ? 'rgba(255,255,255,.08)'
          : 'rgba(255,255,255,.1)';
        const blur = on ? 'blur(26px)' : 'blur(20px)';
        nav.style.backdropFilter = blur;
        nav.style.setProperty('-webkit-backdrop-filter', blur);
        nav.style.boxShadow = on
          ? '0 26px 62px -34px rgba(0,0,0,1)'
          : '0 22px 54px -34px rgba(0,0,0,.9)';
      }

      let active: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) active = id;
      }

      document.querySelectorAll<HTMLElement>('[data-navlink]').forEach((a) => {
        const on = a.getAttribute('data-navlink') === active;
        a.dataset.active = on ? '1' : '';
        paintDot(a, on);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [navRef]);
}
