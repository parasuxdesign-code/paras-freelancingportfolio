import { useEffect, useRef } from 'react';

const PRINCIPLES = [
  {
    icon: 'manage_search',
    title: 'Understand',
    desc: 'Dig deep before drawing a single pixel. Research, listen, and map the real problem — not just the surface request.',
  },
  {
    icon: 'edit_square',
    title: 'Design',
    desc: 'Translate insight into clarity. Iterate fast, think in systems, and let constraints drive better decisions.',
  },
  {
    icon: 'code_blocks',
    title: 'Build',
    desc: 'Stay close to engineering. Design that can\'t be built isn\'t design — it\'s illustration. Ship, learn, iterate.',
  },
  {
    icon: 'groups',
    title: 'Collaborate',
    desc: 'The best outcomes come from aligned teams. I bridge product, engineering and business to move as one unit.',
  },
];

export function Approach() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('is-visible'); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="approach section" id="approach" ref={ref} aria-labelledby="approach-heading">
      <div className="container">
        <div className="approach__inner">
          {/* Left */}
          <div className="approach__left">
            <p className="section-label">My Approach</p>
            <h2 className="approach__headline" id="approach-heading">
              From complexity<br />
              to <span className="approach__accent">clarity.</span>
            </h2>
            <p className="approach__body">
              I believe great design starts with asking better questions. Every project
              follows the same north star: reduce cognitive load, respect the user's
              time, and build something that actually ships.
            </p>
            <a href="#contact" className="approach__link">
              Learn more about my approach
              <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
            </a>
          </div>

          {/* Right */}
          <div className="approach__right">
            <div className="approach__grid">
              {PRINCIPLES.map(p => (
                <div key={p.title} className="approach__item">
                  <div className="approach__icon" aria-hidden="true">
                    <span className="material-symbols-rounded">{p.icon}</span>
                  </div>
                  <h3 className="approach__item-title">{p.title}</h3>
                  <p className="approach__item-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .approach {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .approach.is-visible { opacity: 1; transform: none; }
        .approach__inner {
          display: grid;
          grid-template-columns: 42% 58%;
          gap: 80px;
          align-items: start;
        }
        .approach__left { position: sticky; top: 80px; }
        .approach__headline {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 12px 0 20px;
        }
        .approach__accent { color: var(--accent); }
        .approach__body {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .approach__link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          text-decoration: none;
          border-bottom: 1px solid var(--border-hi);
          padding-bottom: 2px;
          transition: color 0.15s, border-color 0.15s;
        }
        .approach__link .material-symbols-rounded { font-size: 16px; transition: transform 0.2s; }
        .approach__link:hover { color: var(--accent); border-color: var(--accent); }
        .approach__link:hover .material-symbols-rounded { transform: translateX(3px); }

        .approach__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .approach__item {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .approach__item:hover {
          box-shadow: var(--shadow-sm);
          transform: translateY(-1px);
        }
        .approach__icon {
          width: 40px;
          height: 40px;
          background: var(--accent-soft);
          border-radius: var(--r-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .approach__icon .material-symbols-rounded {
          font-size: 20px;
          color: var(--accent);
        }
        .approach__item-title {
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .approach__item-desc {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .approach__inner { grid-template-columns: 1fr; gap: 40px; }
          .approach__left { position: static; }
        }
        @media (max-width: 640px) {
          .approach__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
