import { useEffect, useRef, useState, Fragment } from 'react';
import { ABOUT_SOCIALS } from '../data/content';
import { VideoCard } from './VideoCard';

const METRICS: { value: string; label: string }[] = [];

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case 'x':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.733-8.835L1.254 2.25H8.08l4.261 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}

export function AboutSection() {
  const [visible, setVisible] = useState(false);
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

  return (
    <section
      id="about"
      ref={ref}
      className="section"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: prefersReducedMotion
          ? 'none'
          : 'opacity 450ms var(--ease-out), transform 450ms var(--ease-out)',
      }}
    >
      <div className="container">
        <div className="about-grid">

          {/* Left: bio text */}
          <div>
            <h2 className="section-title">About</h2>

            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginTop: 20,
            }}>
              Grew up in Jaipur — surrounded by culture and a lot of computer
              games. Not just playing, but noticing: how actions triggered
              outcomes, how people connected through early platforms like Orkut,
              how WhatsApp made it all feel obvious.
            </p>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginTop: 12,
            }}>
              That curiosity about how things work eventually became product
              design. I've spent 12 years helping teams bring clarity to complex
              problems — across systems, strategy, and craft. I believe good
              design is often unnoticeable. If you notice it, something's
              probably off.
            </p>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginTop: 12,
            }}>
              Outside work: history, psychology, and still gaming.
            </p>

            {/* Stats row */}
            {METRICS.length > 0 && <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'nowrap',
              marginTop: 28,
            }}>
              {METRICS.map((m, i) => (
                <Fragment key={m.label}>
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'block',
                        width: 1,
                        height: 26,
                        background: 'var(--border)',
                        flexShrink: 0,
                        marginTop: 4,
                        marginLeft: 18,
                        marginRight: 18,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      letterSpacing: '-0.025em',
                      color: 'var(--text-primary)',
                      lineHeight: 1.15,
                      marginBottom: 3,
                    }}>
                      {m.value}
                    </p>
                    <p style={{
                      fontSize: '0.6875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                    }}>
                      {m.label}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>}

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 24 }}>
              {ABOUT_SOCIALS.map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: 9999,
                    color: 'var(--text-secondary)',
                    transition: 'color 150ms ease, background 150ms ease',
                    textDecoration: 'none',
                  }}
                >
                  <SocialIcon type={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: video */}
          <div className="about-video-col" style={{ flexShrink: 0 }}>
            <VideoCard width={208} height={348} />
          </div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 208px;
          gap: 56px;
          align-items: flex-start;
        }
        .about-social-btn:hover {
          color: var(--accent) !important;
          background: var(--accent-soft) !important;
        }
        @media (max-width: 680px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-video-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
