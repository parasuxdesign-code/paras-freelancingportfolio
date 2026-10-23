import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the element matching location.hash after navigation.
 * Enables hash-based scroll-on-navigate without arbitrary setTimeout.
 */
export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1); // strip the '#'
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  return null;
}
