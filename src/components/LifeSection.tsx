import { useEffect, useRef } from 'react';

const INTERESTS = [
  {
    id: 'cricket',
    label: 'Cricket',
    icon: 'sports_cricket',
    headline: 'On the pitch or in the stands.',
    body: 'Cricket is my sport, my rhythm and my first education in patience. There is a reason good design and a good innings both require composure.',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: 'sports_esports',
    headline: 'Strategy, worlds and slow builds.',
    body: 'Open worlds and strategy games. I am drawn to the systems underneath. The way a great game teaches you its rules without stating them is a UX lesson every time.',
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: 'flight',
    headline: 'Chasing perspectives.',
    body: 'I travel for context, not checkboxes. New cities change how I think about space, density and how people move through designed environments.',
  },
  {
    id: 'paani',
    label: 'Paani Originals',
    icon: 'movie',
    headline: 'Creative work outside work.',
    body: 'A personal creative project. Storytelling, visual experiments and ideas that do not fit a brief. Some of the best thinking comes from making things just to make them.',
  },
];

export function LifeSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.life-item');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('is-visible'); });
      },
      { threshold: 0.08 }
    );
    items.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="life section" id="play" ref={ref} aria-labelledby="life-heading">
      <div className="container">
        <div className="life__header">
          <p className="section-label">Outside the pixels</p>
          <h2 className="life__headline" id="life-heading">
            Same curiosity.<br />
            Different <span className="life__accent">playgrounds.</span>
          </h2>
        </div>

        <div className="life__grid" role="list">
          {INTERESTS.map((item, i) => (
            <div
              key={item.id}
              className="life-item"
              role="listitem"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="life-item__icon-wrap" aria-hidden="true">
                <span className="material-symbols-rounded life-item__icon">{item.icon}</span>
              </div>
              <div className="life-item__body">
                <span className="life-item__label">{item.label}</span>
                <h3 className="life-item__headline">{item.headline}</h3>
                <p className="life-item__text">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .life {
          border-top: 1px solid var(--border);
        }

        .life__header {
          margin-bottom: 56px;
        }
        .life__headline {
          font-size: clamp(1.5rem, 2.5vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 1.15;
          color: var(--text-primary);
          margin-top: 12px;
        }
        .life__accent { color: var(--accent); }

        .life__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          overflow: hidden;
        }

        .life-item {
          background: var(--bg-surface);
          padding: 32px 28px 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s;
        }
        .life-item:hover { background: var(--bg-subtle); }
        .life-item.is-visible { opacity: 1; transform: none; }

        .life-item__icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--r-md);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .life-item__icon {
          font-size: 22px;
          color: var(--accent);
        }

        .life-item__body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .life-item__label {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .life-item__headline {
          font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .life-item__text {
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 900px) {
          .life__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .life__grid { grid-template-columns: 1fr; }
          .life-item { padding: 24px 20px; }
        }
      `}</style>
    </section>
  );
}
