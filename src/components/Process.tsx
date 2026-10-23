import { useEffect, useRef, useState } from 'react';
import { GreenSignal } from './GreenSignal';

const STAGES = [
  {
    id: 'frame',
    num: '01',
    label: 'Frame',
    icon: 'frame_inspect',
    shortDesc: 'Define what needs solving',
    body: 'Understand the problem, constraints and opportunity space. Define what success looks like before any sketching begins. Bad framing makes everything downstream wrong.',
  },
  {
    id: 'align',
    num: '02',
    label: 'Align',
    icon: 'group',
    shortDesc: 'Build shared understanding',
    body: 'Create shared understanding across product, engineering and business stakeholders. No design survives contact with silos. Alignment isn\'t a meeting — it\'s a practice.',
  },
  {
    id: 'design',
    num: '03',
    label: 'Design',
    icon: 'draw',
    shortDesc: 'Turn complexity into clarity',
    body: 'Turn complexity into clear flows, systems and interfaces. Start with structure: IA, states, edge cases. End with polish: spacing, micro-interactions, motion.',
  },
  {
    id: 'ship',
    num: '04',
    label: 'Ship',
    icon: 'rocket_launch',
    shortDesc: 'Make the design real',
    body: 'Work closely with engineering to make the design real. The handoff is not the end — it\'s where intent meets implementation. Spec thoroughly, stay close.',
  },
  {
    id: 'learn',
    num: '05',
    label: 'Learn',
    icon: 'monitoring',
    shortDesc: 'Measure and iterate',
    body: 'Measure outcomes against the original framing, gather usage signals and iterate. Every shipped product teaches something the research didn\'t anticipate.',
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('is-visible'); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="process section" id="process" ref={ref} aria-labelledby="process-heading">
      <div className="container">
        <div className="process__header">
          <div>
            <p className="section-label">How I work</p>
            <h2 className="process__headline" id="process-heading">
              Five stages. Every time.
            </h2>
          </div>
          <p className="process__sub">A repeatable framework adapted to the complexity of each engagement.</p>
        </div>

        {/* Desktop: card grid */}
        <div className="process__stages" role="tablist" aria-label="Process stages">
          {STAGES.map((stage, i) => (
            <button
              key={stage.id}
              role="tab"
              aria-selected={activeIdx === i}
              className={`process__stage${activeIdx === i ? ' is-active' : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              <div className="process__stage-head">
                <span className="process__stage-num">{stage.num}</span>
                {activeIdx === i
                  ? <GreenSignal variant="pulse" />
                  : <div className="process__stage-idle-dot" aria-hidden="true" />
                }
              </div>
              <span className="material-symbols-rounded process__stage-icon" aria-hidden="true">{stage.icon}</span>
              <h3 className="process__stage-label">{stage.label}</h3>
              <p className="process__stage-short">{stage.shortDesc}</p>
              {activeIdx === i && (
                <p className="process__stage-body">{stage.body}</p>
              )}
            </button>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="process__accordion" aria-label="Process stages">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="process__acc-item">
              <button
                className="process__acc-trigger"
                onClick={() => setActiveIdx(activeIdx === i ? -1 : i)}
                aria-expanded={activeIdx === i}
              >
                <div className="process__acc-left">
                  <span className="process__acc-num">{stage.num}</span>
                  {activeIdx === i
                    ? <GreenSignal variant="dot" />
                    : <div className="process__stage-idle-dot" />
                  }
                  <span className="process__acc-label">{stage.label}</span>
                </div>
                <span className="material-symbols-rounded process__acc-chevron" aria-hidden="true">
                  {activeIdx === i ? 'remove' : 'add'}
                </span>
              </button>
              {activeIdx === i && (
                <div className="process__acc-body">
                  <p>{stage.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
          background: var(--bg-subtle);
        }
        .process.is-visible { opacity: 1; transform: none; }

        .process__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 40px;
        }
        .process__headline {
          font-size: clamp(1.5rem, 2.5vw, 2.125rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin-top: 12px;
          line-height: 1.1;
        }
        .process__sub {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-tertiary);
          max-width: 30ch;
          text-align: right;
          flex-shrink: 0;
        }

        /* Card grid */
        .process__stages {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          overflow: hidden;
        }

        .process__stage {
          background: var(--bg-surface);
          border: none;
          padding: 28px 22px 28px;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
          min-height: 200px;
        }
        .process__stage:hover:not(.is-active) { background: var(--bg-subtle); }
        .process__stage.is-active {
          background: var(--bg);
          min-height: 240px;
        }

        .process__stage-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 8px;
        }
        .process__stage-num {
          font-size: 0.625rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        .process__stage.is-active .process__stage-num { color: var(--accent); }
        .process__stage-idle-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--border-hi, #D1D5DB);
          flex-shrink: 0;
        }

        .process__stage-icon {
          font-size: 22px;
          color: var(--text-tertiary);
          margin-top: 2px;
        }
        .process__stage.is-active .process__stage-icon { color: var(--accent); }

        .process__stage-label {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .process__stage-short {
          font-size: 0.75rem;
          line-height: 1.5;
          color: var(--text-tertiary);
          margin: 0;
        }
        .process__stage-body {
          font-size: 0.8125rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin: 0;
          animation: fadeUp 0.25s ease;
          flex: 1;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }

        /* Mobile accordion */
        .process__accordion { display: none; }

        @media (max-width: 900px) {
          .process__stages { display: none; }
          .process__header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .process__sub { text-align: left; }
          .process__accordion {
            display: flex;
            flex-direction: column;
            border: 1px solid var(--border);
            border-radius: var(--r-xl);
            overflow: hidden;
          }
          .process__acc-item {
            background: var(--bg-surface);
            border-bottom: 1px solid var(--border);
          }
          .process__acc-item:last-child { border-bottom: none; }
          .process__acc-trigger {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 18px 20px;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            gap: 12px;
          }
          .process__acc-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .process__acc-num {
            font-size: 0.625rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: var(--text-tertiary);
            text-transform: uppercase;
          }
          .process__acc-label {
            font-size: 0.9375rem;
            font-weight: 600;
            color: var(--text-primary);
            letter-spacing: -0.02em;
          }
          .process__acc-chevron { color: var(--text-tertiary); font-size: 20px; }
          .process__acc-body {
            padding: 0 20px 18px 20px;
          }
          .process__acc-body p {
            font-size: 0.875rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin: 0;
          }
        }
      `}</style>
    </section>
  );
}
