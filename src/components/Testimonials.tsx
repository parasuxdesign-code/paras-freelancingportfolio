import { useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/content';

// Curated — 3 strongest voices, representing different contexts
const SELECTED_NAMES = ['Matthew Tormey', 'Wei-Te Shyu', 'Daniel Atwood'];

const AVATAR_MAP: Record<string, string> = {
  'Matthew Tormey': '/images/testimonial-01.jpg',
  'Wei-Te Shyu':    '/images/t-weite.jpg',
  'Daniel Atwood':  '/images/t-daniel.jpg',
};

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const selected = TESTIMONIALS.filter(t => SELECTED_NAMES.includes(t.name));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('.tc');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('is-visible'); });
      },
      { threshold: 0.1 }
    );
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="testimonials section" id="testimonials" ref={ref} aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="testimonials__header">
          <p className="section-label">People I've worked with</p>
          <h2 className="testimonials__headline" id="testimonials-heading">
            What collaborators say.
          </h2>
        </div>

        <div className="testimonials__grid" role="list">
          {selected.map((t, i) => {
            const avatar = AVATAR_MAP[t.name];
            return (
              <article
                key={t.name}
                className="tc"
                role="listitem"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <blockquote className="tc__quote">
                  <p>"{t.quote}"</p>
                </blockquote>
                <footer className="tc__footer">
                  <div className="tc__avatar" aria-hidden="true">
                    {avatar
                      ? <img src={avatar} alt={t.name} loading="lazy" />
                      : <span className="tc__initials">{initials(t.name)}</span>
                    }
                  </div>
                  <div className="tc__meta">
                    <span className="tc__name">{t.name}</span>
                    <span className="tc__role">{t.title}</span>
                    <span className="tc__company">{t.company}</span>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .testimonials {
          background: var(--bg-subtle);
        }

        .testimonials__header {
          margin-bottom: 48px;
        }
        .testimonials__headline {
          font-size: clamp(1.5rem, 2.5vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 1.1;
          color: var(--text-primary);
          margin-top: 10px;
        }

        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .tc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
          padding: 32px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .tc.is-visible { opacity: 1; transform: none; }

        .tc__quote {
          margin: 0;
          flex: 1;
        }
        .tc__quote p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          letter-spacing: -0.01em;
          margin: 0;
        }

        .tc__footer {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle, var(--border));
        }

        .tc__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: var(--bg-inset);
        }
        .tc__avatar img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .tc__initials {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%; height: 100%;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
        }

        .tc__meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .tc__name {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .tc__role {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .tc__company {
          font-size: 0.6875rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .testimonials__grid { grid-template-columns: 1fr; gap: 16px; }
          .tc { padding: 24px; }
        }
      `}</style>
    </section>
  );
}
