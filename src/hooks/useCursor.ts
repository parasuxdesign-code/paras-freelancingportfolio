import { useEffect } from 'react';

/**
 * Custom green hover cursor that expands to show a label when hovering any
 * element carrying a `data-cursor="..."` attribute. Desktop + fine-pointer
 * only, and disabled under reduced motion. Ported from DC's initCursor().
 */
export function useCursor(enabled: boolean, reduced: boolean): void {
  useEffect(() => {
    if (
      !enabled ||
      reduced ||
      !window.matchMedia('(hover: hover) and (min-width: 1024px)').matches
    ) {
      return;
    }

    const c = document.createElement('div');
    c.setAttribute('aria-hidden', 'true');
    c.className = 'dc-cursor';
    document.body.appendChild(c);

    let label = '';
    const move = (e: MouseEvent) => {
      c.style.left = `${e.clientX}px`;
      c.style.top = `${e.clientY}px`;
      c.style.opacity = '1';
      const target = (e.target as Element)?.closest?.('[data-cursor]');
      const next = target ? target.getAttribute('data-cursor') || '' : '';
      if (next !== label) {
        label = next;
        if (label) {
          c.textContent = `${label} →`;
          c.style.width = '82px';
          c.style.height = '32px';
        } else {
          c.textContent = '';
          c.style.width = '10px';
          c.style.height = '10px';
        }
      }
    };

    document.addEventListener('mousemove', move, { passive: true });
    return () => {
      document.removeEventListener('mousemove', move);
      c.remove();
    };
  }, [enabled, reduced]);
}
