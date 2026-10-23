import { useEffect, useRef } from 'react';
import { GreenSignal } from './GreenSignal';

const EXPERIENCE = [
  {
    company: 'ION',
    companyFull: 'ION Group',
    role: 'Lead Product Designer',
    period: '2021 — Present',
    year: '2021',
    description: 'Leading design for enterprise trading and capital markets platforms used by global financial institutions. Responsible for design system, component architecture and cross-product design consistency.',
    color: '#E8463A',
    current: true,
  },
  {
    company: 'Punchh',
    companyFull: 'Punchh (PAX Technology)',
    role: 'Senior Product Designer',
    period: '2019 — 2021',
    year: '2019',
    description: 'Redesigned the loyalty and engagement platform for enterprise hospitality and restaurant brands. Focused on operator experience and self-serve configurability.',
    color: '#7B5CF5',
    current: false,
  },
  {
    company: 'Freelance',
    companyFull: 'Independent / Consulting',
    role: 'Product Designer',
    period: '2017 — 2019',
    year: '2017',
    description: 'Worked with early-stage startups and growth-stage companies across mobile apps, SaaS products and brand systems. End-to-end: discovery through shipping.',
    color: '#16A34A',
    current: false,
  },
  {
    company: 'BITS',
    companyFull: 'BITS Pilani',
    role: 'Design Lead — Student Body',
    period: '2013 — 2017',
    year: '2013',
    description: 'Led visual communication and design for university publications, events and student initiatives. First structured design experience — and where the obsession began.',
    color: '#0EA5E9',
    current: false,
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('is-visible'); },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="exp section" id="experience" ref={ref} aria-labelledby="exp-heading">
      <div className="container">
        <div className="exp__header">
          <div>
            <p className="section-label">Experience</p>
            <h2 className="exp__headline" id="exp-heading">
              12+ years across products<br />that actually ship.
            </h2>
          </div>
        </div>

        <div className="exp__timeline" role="list">
          {EXPERIENCE.map((item, i) => (
            <div key={item.company} className="exp__item" role="listitem" style={{ transitionDelay: `${i * 80}ms` }}>
              {/* Year */}
              <div className="exp__year-col" aria-hidden="true">
                <span className="exp__year">{item.year}</span>
              </div>

              {/* Rail */}
              <div className="exp__rail" aria-hidden="true">
                <div className="exp__node">
                  {item.current
                    ? <GreenSignal variant="pulse" />
                    : <GreenSignal variant="node" />
                  }
                </div>
                {i < EXPERIENCE.length - 1 && (
                  <div className="exp__connector" />
                )}
              </div>

              {/* Content */}
              <div className="exp__content">
                <div className="exp__meta-row">
                  <span
                    className="exp__company-badge"
                    style={{
                      background: item.color + '15',
                      color: item.color,
                      borderColor: item.color + '30',
                    }}
                  >
                    {item.company}
                  </span>
                  <span className="exp__period">{item.period}</span>
                  {item.current && (
                    <span className="exp__current-pill">Current</span>
                  )}
                </div>
                <h3 className="exp__role">{item.role}</h3>
                <p className="exp__company-full">{item.companyFull}</p>
                <p className="exp__desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .exp.is-visible { opacity: 1; transform: none; }
        .exp.is-visible .exp__item {
          opacity: 1;
          transform: none;
        }

        .exp__header {
          margin-bottom: 56px;
        }
        .exp__headline {
          font-size: clamp(1.5rem, 2.8vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin-top: 14px;
          line-height: 1.18;
        }

        .exp__timeline {
          display: flex;
          flex-direction: column;
          max-width: 820px;
        }

        .exp__item {
          display: grid;
          grid-template-columns: 72px 36px 1fr;
          gap: 0 20px;
          align-items: start;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        /* Year */
        .exp__year-col {
          display: flex;
          justify-content: flex-end;
          padding-top: 1px;
        }
        .exp__year {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-secondary); /* WCAG 1.4.3 */
          text-align: right;
          font-variant-numeric: tabular-nums;
        }

        /* Rail */
        .exp__rail {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .exp__node { flex-shrink: 0; }
        .exp__connector {
          width: 2px;
          flex: 1;
          min-height: 32px;
          margin-top: 8px;
          background: linear-gradient(
            to bottom,
            color-mix(in srgb, var(--accent) 30%, transparent) 0%,
            var(--border) 50%,
            transparent 100%
          );
        }

        /* Content */
        .exp__content {
          padding-bottom: 52px;
        }
        .exp__item:last-child .exp__content { padding-bottom: 0; }

        .exp__meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }

        .exp__company-badge {
          font-size: 0.625rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 9999px;
          border: 1px solid;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .exp__period {
          font-size: 0.8125rem;
          color: var(--text-secondary); /* WCAG 1.4.3 */
          font-weight: 400;
          font-variant-numeric: tabular-nums;
        }

        .exp__current-pill {
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          padding: 2px 8px;
          border-radius: 9999px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .exp__role {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin-bottom: 3px;
          line-height: 1.3;
        }

        .exp__company-full {
          font-size: 0.8125rem;
          color: var(--text-secondary); /* WCAG 1.4.3 */
          margin-bottom: 12px;
          font-weight: 400;
        }

        .exp__desc {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 58ch;
        }

        @media (max-width: 640px) {
          .exp__item { grid-template-columns: 48px 28px 1fr; gap: 0 12px; }
          .exp__year { font-size: 0.6875rem; }
          .exp__content { padding-bottom: 36px; }
        }
      `}</style>
    </section>
  );
}
