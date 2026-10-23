import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV = [
  { label: 'About',   href: '#about',   section: 'about' },
  { label: 'Work',    href: '#work',    section: 'work' },
  { label: 'AI',      href: '#ai',      section: 'ai' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch { return 'light'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);
  return { theme, toggle };
}

export function Header() {
  const [active, setActive] = useState('');
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isWorkPage = location.pathname === '/work';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (isWorkPage) { setActive('work'); return; }
    if (!isHomePage) { setActive(''); return; }

    // Clear active when the user is back at the very top (hero visible, nothing scrolled into view)
    const onScroll = () => { if (window.scrollY < 80) setActive(''); };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Fire once immediately in case page loaded already scrolled to top
    onScroll();

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    NAV.forEach(n => {
      const el = document.getElementById(n.section);
      if (el) obs.observe(el);
    });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [isWorkPage, isHomePage]);

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (isHomePage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate({ pathname: '/', hash: href });
    }
  };

  const isDark = theme === 'dark';

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          /* Match horizontal padding to content container so nav edges align */
          padding: '14px var(--px)',
          pointerEvents: 'none',
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            background: 'var(--bg-surface)',
            boxShadow: 'var(--shadow-pill)',
            borderRadius: 'var(--r-pill)',
            /* Taller pill: 8px vertical padding (up from 6px) */
            padding: '5px 8px 5px 18px',
            pointerEvents: 'all',
            width: '100%',
            /* Match content max-width so nav edges align with layout */
            maxWidth: 'var(--max-w)',
          }}
        >
          {/* Wordmark */}
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              flexShrink: 0,
              marginRight: 'auto',
              paddingRight: 8,
              whiteSpace: 'nowrap',
            }}
          >
            Paras Bhatnagar
          </Link>

          {/* Nav links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 2, margin: 0, padding: 0, listStyle: 'none' }}>
            {NAV.map(item => {
              const isActive = active === item.section;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={e => handleAnchorClick(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={isActive ? 'nav-link nav-link--active' : 'nav-link'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '5px 12px',
                      borderRadius: 'var(--r-pill)',
                      fontSize: '0.8125rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--bg-surface)' : 'var(--text-secondary)',
                      background: isActive ? 'var(--text-primary)' : 'transparent',
                      transition: 'background 180ms ease, color 180ms ease',
                      whiteSpace: 'nowrap',
                      minHeight: 32,
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44, /* WCAG 2.5.5 */
              height: 44,
              borderRadius: 'var(--r-pill)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-secondary)',
              flexShrink: 0,
              marginLeft: 6,
              transition: 'background 180ms ease, color 180ms ease',
              cursor: 'pointer',
            }}
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Nav hover states — class-based so CSS handles the transition cleanly */}
      <style>{`
        .nav-link:not(.nav-link--active):hover {
          background: var(--bg-subtle) !important;
          color: var(--text-primary) !important;
        }
      `}</style>
    </>
  );
}
