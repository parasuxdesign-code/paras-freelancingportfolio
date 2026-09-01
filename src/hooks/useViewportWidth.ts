import { useEffect, useState } from 'react';

/** Live viewport width. Mirrors DCLogic state.width. */
export function useViewportWidth(): number {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  useEffect(() => {
    const on = () => setWidth(window.innerWidth);
    on();
    window.addEventListener('resize', on, { passive: true });
    return () => window.removeEventListener('resize', on);
  }, []);
  return width;
}
