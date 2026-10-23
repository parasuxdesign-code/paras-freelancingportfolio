import { useEffect, useRef, useState, useCallback } from 'react';
import { LINKS } from '../data/content';
import { PongEasterEgg } from './PongEasterEgg';

const EMAIL = 'parasuxdesign@gmail.com';

const SOCIALS = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Dribbble', href: LINKS.dribbble },
  { label: 'Behance',  href: LINKS.behance  },
  { label: 'Medium',   href: LINKS.medium   },
  { label: 'Resume',   href: LINKS.resume   },
];

export function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied]   = useState(false);
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    if (prefersReducedMotion) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = EMAIL;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="contact"
      ref={ref}
      style={{
        background: 'var(--bg-subtle)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: prefersReducedMotion
          ? 'none'
          : 'opacity 450ms var(--ease-out), transform 450ms var(--ease-out)',
      }}
    >
      {/* ── Wavy top edge — overlaps the section above ── */}
      <div aria-hidden="true" style={{ marginTop: -31, lineHeight: 0, pointerEvents: 'none' }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%', height: 32 }}
        >
          <path
            d="M0 30 C 160 12, 320 48, 480 30 C 640 12, 800 48, 960 30 C 1120 12, 1280 48, 1440 30 L1440 60 L0 60 Z"
            fill="var(--bg-subtle)"
          />
        </svg>
      </div>

      {/* ── Contact body ── */}
      <div
        className="container"
        style={{ paddingTop: 'var(--section-py)', paddingBottom: 48 }}
      >
        <h2 className="section-title" style={{ marginBottom: 12 }}>Let's talk</h2>
        <p style={{
          fontSize: '0.9375rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: 480,
          marginBottom: 28,
        }}>
          Available for executive design roles, product leadership, and design consulting.
        </p>

        {/* Email CTA */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <a href={`mailto:${EMAIL}`} className="contact-email-link">
            {EMAIL}
            <span className="icon" aria-hidden="true" style={{ fontSize: 16 }}>arrow_outward</span>
          </a>
          <button
            onClick={handleCopy}
            aria-label={copied ? 'Email address copied!' : 'Copy email address'}
            title={copied ? 'Copied!' : 'Copy email'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              padding: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: copied ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'color 200ms ease',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: 18 }}>
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        {/* Social + Resume pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
              {...(s.label === 'Resume' ? { download: 'Paras.Resume.pdf' } : {})}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Pong Easter Egg + Footer bar ── */}
      <div className="container">
        <PongEasterEgg />
      </div>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 12,
          paddingBottom: 24,
        }}
      >
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          © {year} Paras Bhatnagar
        </span>
        <button
          onClick={scrollTop}
          aria-label="Back to top"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
            padding: '12px 8px',
            minHeight: 44,
            transition: 'color 150ms ease',
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 14 }}>arrow_upward</span>
          Top
        </button>
      </div>
    </footer>
  );
}
