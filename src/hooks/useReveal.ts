import { useEffect } from 'react';

/**
 * Reveal-on-scroll, ported from DCLogic observe()/reveal()/sweep():
 *  - IntersectionObserver reveals elements as they enter the viewport
 *  - a rect-based "sweep" runs on mount, on scroll, and once on a timer so
 *    content is never gated on an IO callback (fail-open)
 *  - reduced motion reveals everything immediately
 *
 * Elements opt in with `[data-reveal]` and optional `data-delay="<ms>"`.
 * They start at opacity:0 / translateY(14px) inline (matching the source) and
 * are set to opacity:1 / transform:none here.
 */
export function useReveal(reduced: boolean): void {
  useEffect(() => {
    const reveal = (el: HTMLElement, instant?: boolean) => {
      if (el.dataset.shown) return;
      el.dataset.shown = '1';
      if (instant) el.style.transition = 'none';
      el.style.transitionDelay = instant
        ? '0ms'
        : `${el.getAttribute('data-delay') || 0}ms`;
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    const nodes = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced) {
      nodes().forEach((el) => reveal(el, true));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    nodes().forEach((el) => io.observe(el));

    const sweep = (all?: boolean) => {
      const h = window.innerHeight || 800;
      nodes().forEach((el) => {
        if (el.dataset.shown) return;
        if (all) return reveal(el, true);
        if (el.getBoundingClientRect().top < h * 0.92) reveal(el);
      });
    };

    sweep();
    const onScroll = () => sweep();
    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(() => sweep(true), 1600);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, [reduced]);
}
