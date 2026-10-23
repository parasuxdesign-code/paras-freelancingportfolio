import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const AI_PROJECTS = [
  {
    id: 'promotewall',
    title: 'PromoteWall',
    desc: 'An AI-powered wall of fame for social proof — curated, beautiful, and ready to embed.',
    img: '/images/promotewall-cover.png',
    href: 'https://promotewall.lol/',
    cta: 'View case study',
    external: false,
    meta: 'Live product',
  },
  {
    id: 'ai-placeholder',
    title: 'Coming soon',
    desc: 'Another AI project in progress. Details available upon request.',
    img: null,
    href: 'mailto:parasbhatnagar33@gmail.com',
    cta: 'Get in touch',
    external: true,
    meta: 'In development',
  },
];

export function AIProject() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (prefersReducedMotion) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      id="ai"
      ref={ref}
      className="section"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: prefersReducedMotion ? 'none' : 'opacity 450ms var(--ease-out), transform 450ms var(--ease-out)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">AI Projects</h2>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', letterSpacing: '-0.01em' }}>
            Built with AI
          </span>
        </div>

        <div className="work-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '32px 24px',
        }}>
          {AI_PROJECTS.map((p) => (
            <div key={p.id}>
              {/* Image */}
              <div style={{
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                background: p.img ? 'var(--bg-subtle)' : 'var(--bg-inset)',
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <span
                      className="icon"
                      aria-hidden="true"
                      style={{ fontSize: 32, color: 'var(--text-tertiary)', display: 'block', marginBottom: 8 }}
                    >
                      auto_awesome
                    </span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>In development</p>
                  </div>
                )}
              </div>

              {/* Text */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 5 }}>
                <h3 className="proj-card__title" style={{ margin: 0 }}>{p.title}</h3>
                {p.meta && (
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-tertiary)',
                    whiteSpace: 'nowrap',
                  }}>{p.meta}</span>
                )}
              </div>
              <p className="proj-card__desc" style={{ marginBottom: 12 }}>{p.desc}</p>
              {p.external ? (
                <a
                  href={p.href}
                  className="card-link"
                >
                  {p.cta}
                  <span className="icon" aria-hidden="true" style={{ fontSize: 15 }}>arrow_forward</span>
                </a>
              ) : (
                <Link to={p.href} className="card-link">
                  {p.cta}
                  <span className="icon" aria-hidden="true" style={{ fontSize: 15 }}>arrow_forward</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
