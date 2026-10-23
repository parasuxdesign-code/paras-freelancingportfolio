import { useEffect, useRef } from 'react';
import { GreenSignal } from './GreenSignal';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Start with the problem, not the interface.',
    body: 'Good design starts before the first screen. The real work is understanding why something is broken — not rushing to how it should look.',
  },
  {
    num: '02',
    title: 'Systems create consistency.',
    body: 'Individual screens are decisions. Systems are the framework those decisions live inside. I build for the pattern, not just the moment.',
  },
  {
    num: '03',
    title: 'Complexity needs choreography.',
    body: 'When the domain is inherently complex — trading platforms, enterprise tools, multi-step workflows — the design work is sequencing, not simplifying.',
  },
  {
    num: '04',
    title: 'Design is a team sport.',
    body: 'The best product decisions happen in the space between design, engineering and product. I care as much about alignment as I do about the artefact.',
  },
];

export function Thinking() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('is-visible'); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="thinking section" id="thinking" ref={ref} aria-labelledby="thinking-heading">
      <div className="container">
        <div className="thinking__layout">
          <div className="thinking__left">
            <p className="section-label">Thinking</p>
            <h2 className="thinking__headline" id="thinking-heading">
              I design<br />beyond<br />the screen.
            </h2>
            <div className="thinking__signal-stack" aria-hidden="true">
              <GreenSignal variant="node" />
              <div className="thinking__signal-thread" />
              <GreenSignal variant="dot" />
            </div>
          </div>

          <div className="thinking__right">
            {PRINCIPLES.map((p, i) => (
              <div key={p.num} className="thinking__item" style={{ transitionDelay: `${i * 55}ms` }}>
                <div className="thinking__item-num-col">
                  <span className="thinking__item-numtext">{p.num}</span>
                  <div className="thinking__item-indicator" aria-hidden="true">
                    <GreenSignal variant="dot" />
                  </div>
                </div>
                <div className="thinking__item-content">
                  <h3 className="thinking__item-title">{p.title}</h3>
                  <p className="thinking__item-body">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .thinking {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .thinking.is-visible { opacity: 1; transform: none; }
        .thinking.is-visible .thinking__item {
          opacity: 1;
          transform: none;
        }

        .thinking__layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 96px;
          align-items: start;
        }

        .thinking__left {
          position: sticky;
          top: calc(var(--header-h, 64px) + 48px);
        }

        .thinking__headline {
          font-size: clamp(2.75rem, 5vw, 4.25rem);
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 1.02;
          color: var(--text-primary);
          margin-top: 16px;
          margin-bottom: 44px;
        }

        .thinking__signal-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }
        .thinking__signal-thread {
          width: 2px;
          height: 48px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          margin: 5px 3.5px;
        }

        /* Right column */
        .thinking__right {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .thinking__item {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 24px;
          padding: 40px 0;
          border-bottom: 1px solid var(--border);
          align-items: start;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .thinking__item:first-child { border-top: 1px solid var(--border); }

        .thinking__item-num-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding-top: 3px;
        }
        .thinking__item-numtext {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        .thinking__item-indicator { margin-top: 2px; }

        .thinking__item-title {
          font-size: clamp(1.0625rem, 1.6vw, 1.3125rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1.28;
          margin-bottom: 14px;
        }

        .thinking__item-body {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 56ch;
        }

        @media (max-width: 900px) {
          .thinking__layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .thinking__left { position: static; }
          .thinking__signal-stack { display: none; }
          .thinking__item { grid-template-columns: 44px 1fr; gap: 16px; padding: 28px 0; }
        }
      `}</style>
    </section>
  );
}
