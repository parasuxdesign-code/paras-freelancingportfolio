import { useEffect } from 'react';

/**
 * Scroll-linked reveal for the Process section: each step resolves on its own
 * as it rises through the viewport, its accent bar scales up, and the watermark
 * drifts. Ported verbatim from DCLogic.processParallax(). Runs on scroll and
 * resize. Under reduced motion, steps are simply shown.
 */
export function useProcessParallax(reduced: boolean): void {
  useEffect(() => {
    const run = () => {
      const sec = document.getElementById('process');
      if (!sec) return;
      const h = window.innerHeight || 800;

      sec.querySelectorAll<HTMLElement>('[data-pstep]').forEach((el) => {
        if (reduced) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          const bar0 = el.querySelector<HTMLElement>('[data-pbar]');
          if (bar0) bar0.style.transform = 'scaleY(1)';
          return;
        }
        const r = el.getBoundingClientRect();
        const raw = (h * 0.9 - r.top) / (h * 0.44);
        const p = Math.max(0, Math.min(1, raw));
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const shift = el.querySelector('[data-pbar]') ? 64 : 48;
        el.style.opacity = (0.18 + 0.82 * e).toFixed(3);
        el.style.transform = `translate3d(0,${((1 - e) * shift).toFixed(1)}px,0)`;
        const bar = el.querySelector<HTMLElement>('[data-pbar]');
        if (bar) bar.style.transform = `scaleY(${e.toFixed(3)})`;
      });

      const wm = sec.querySelector<HTMLElement>('[data-pwm]');
      if (wm && !reduced) {
        const r = sec.getBoundingClientRect();
        wm.style.transform = `translate3d(0,${(-r.top * 0.07).toFixed(1)}px,0)`;
      }
    };

    run();
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', run, { passive: true });
    return () => {
      window.removeEventListener('scroll', run);
      window.removeEventListener('resize', run);
    };
  }, [reduced]);
}
