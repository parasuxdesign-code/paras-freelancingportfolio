import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

function getEffectiveTheme(pref: Theme): 'light' | 'dark' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return pref;
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
}

export function useTheme() {
  const [pref, setPref] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('theme') as Theme) || 'system';
    } catch {
      return 'system';
    }
  });

  useEffect(() => {
    const effective = getEffectiveTheme(pref);
    applyTheme(effective);
    try { localStorage.setItem('theme', pref); } catch { /* ignore */ }
  }, [pref]);

  // Watch system preference changes when pref = 'system'
  useEffect(() => {
    if (pref !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme(getEffectiveTheme('system'));
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [pref]);

  const toggle = () => {
    const effective = getEffectiveTheme(pref);
    setPref(effective === 'dark' ? 'light' : 'dark');
  };

  return { pref, toggle, effectiveTheme: getEffectiveTheme(pref) };
}

interface Props {
  className?: string;
}

export function ThemeToggle({ className = '' }: Props) {
  const { effectiveTheme, toggle } = useTheme();
  const isDark = effectiveTheme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`theme-toggle ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 'var(--r-sm)',
        color: 'var(--text-secondary)',
        transition: 'background var(--dur-quick) var(--ease-quick), color var(--dur-quick) var(--ease-quick)',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = 'var(--bg-subtle)';
        el.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = 'transparent';
        el.style.color = 'var(--text-secondary)';
      }}
    >
      {isDark ? (
        /* Sun icon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
