import { useEffect, type RefObject } from 'react';

/**
 * Continuous auto-scroll for the work gallery. Each row's items are duplicated
 * once, so translating the track by half its width and wrapping produces a
 * seamless loop. Rows opt in with `data-marquee="ltr|rtl"`. Hover-pause is
 * driven by `pausedRef`. Ported verbatim from DCLogic.startMarquee().
 */
export function useMarquee(
  railRef: RefObject<HTMLElement>,
  pausedRef: RefObject<boolean>,
  opts: { reduced: boolean; autoScroll?: boolean; scrollSpeed?: number }
): void {
  const { reduced, autoScroll = true, scrollSpeed = 7 } = opts;

  useEffect(() => {
    if (reduced || autoScroll === false) return;
    const speed = Math.max(2, scrollSpeed); // px per second
    let last: number | null = null;
    let raf = 0;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const root = railRef.current || document;
      const rows = root.querySelectorAll<HTMLElement>('[data-marquee]');
      if (!rows.length) return;
      if (last == null) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (pausedRef.current) return;

      rows.forEach((row) => {
        const half = row.scrollWidth / 2;
        if (!half) return;
        const dir = row.getAttribute('data-marquee') === 'rtl' ? -1 : 1;
        let x =
          (parseFloat(row.dataset.x || '') || (dir < 0 ? -half : 0)) -
          dir * speed * dt;
        if (x <= -half) x += half;
        if (x >= 0) x -= half;
        row.dataset.x = String(x);
        row.style.transform = `translate3d(${x}px,0,0)`;
      });
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [railRef, pausedRef, reduced, autoScroll, scrollSpeed]);
}
