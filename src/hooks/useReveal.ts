import { useEffect } from 'react';

/**
 * Ports the original data-reveal system:
 *  - IntersectionObserver adds `is-visible` when an element scrolls into view
 *  - a rect-based "sweep" runs on mount, on scroll, and once on a timer so
 *    content is never gated on an IO callback being delivered (fail-open)
 *  - respects prefers-reduced-motion by revealing everything immediately
 *
 * Elements opt in with the `.reveal` class and an optional
 * `data-delay="<ms>"` attribute.
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
      el.classList.add('is-visible');
    };

    const nodes = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

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
