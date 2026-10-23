import { useEffect, useState, Fragment } from 'react';
import { WORK_ENTRIES } from '../data/content';
import { HeroCube } from './HeroCube';

const GREETINGS = ['Hello', 'Hola', 'नमस्ते', 'Bonjour', 'こんにちは'];

function useTypingAnimation(enabled: boolean) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing');

  useEffect(() => {
    if (!enabled) { setText(GREETINGS[0]); return; }

    const word = GREETINGS[idx];
    const chars = Array.from(word);
    const current = Array.from(text).length;

    if (phase === 'typing') {
      if (current < chars.length) {
        const t = setTimeout(() => setText(chars.slice(0, current + 1).join('')), 85);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('holding'), 1400);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('deleting'), 200);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (current > 0) {
        const t = setTimeout(() => setText(chars.slice(0, current - 1).join('')), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setIdx(i => (i + 1) % GREETINGS.length);
          setPhase('typing');
        }, 320);
        return () => clearTimeout(t);
      }
    }
  }, [text, phase, idx, enabled]);

  return { text, showCursor: phase !== 'holding' };
}

const TAGS = ['Product design', '0 → 1', 'Design + code'];

const PREVIOUSLY = WORK_ENTRIES.filter(e => ['ion', 'punchh', 'compunnel'].includes(e.id));

const SHORT_NAMES: Record<string, string> = {
  'Compunnel Digital': 'Compunnel',
};

export function Hero() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const { text: greeting, showCursor } = useTypingAnimation(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) { setVisible(true); return; }
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  return (
    <section
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'var(--header-h)',
        paddingBottom: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(10px)',
        transition: prefersReducedMotion ? 'none' : 'opacity 500ms var(--ease-out), transform 500ms var(--ease-out)',
      }}
    >
      <div className="container">
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 210px',
          gap: 40,
          alignItems: 'flex-start',
        }}>

          {/* Left: greeting + headline + subtext + tags + previously */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>

            {/* Typing greeting */}
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              marginBottom: 20,
              fontWeight: 400,
              minHeight: '1.4em',
            }}>
              {greeting}
              {showCursor && (
                <span className="typing-cursor" aria-hidden="true">|</span>
              )}
            </p>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.375rem)',
              fontWeight: 500,
              lineHeight: 1.18,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              maxWidth: 520,
              margin: 0,
            }}>
              In a world built by AI, I design for people.
            </h1>

            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginTop: 20,
              marginBottom: 0,
              maxWidth: 480,
            }}>
              With 12+ years in product design, I turn complex ideas into useful products — and use AI to take more of those ideas from concept to reality.
            </p>

            {/* Tag pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 24,
            }}>
              {TAGS.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 14px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: 9999,
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    lineHeight: 1,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Currently + Previously group */}
            <div style={{ marginTop: 36 }}>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              marginTop: 0,
              marginBottom: 10,
              fontWeight: 400,
            }}>
              <span style={{ color: 'var(--accent)', marginRight: 6 }}>●</span>
              Currently designing at Pangea
            </p>

            {/* Previously row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 0,
              rowGap: 8,
            }}>
              <span style={{
                fontSize: '0.9375rem',
                color: 'var(--text-tertiary)',
                marginRight: 12,
              }}>
                Previously
              </span>

              {PREVIOUSLY.map((entry, i) => (
                <Fragment key={entry.id}>
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-tertiary)',
                        marginLeft: 8,
                        marginRight: 8,
                        userSelect: 'none',
                      }}
                    >
                      ·
                    </span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: 9999,
                      overflow: 'hidden',
                      background: entry.logo ? 'var(--bg-surface)' : entry.color + '1a',
                      border: '1px solid var(--border)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {entry.logo
                        ? <img
                            src={entry.logo}
                            alt=""
                            aria-hidden="true"
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }}
                          />
                        : <span style={{ fontSize: 9, fontWeight: 700, color: entry.color, lineHeight: 1 }}>
                            {entry.company[0]}
                          </span>
                      }
                    </div>
                    <span style={{
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 400,
                    }}>
                      {SHORT_NAMES[entry.company] ?? entry.company}
                    </span>
                  </div>
                </Fragment>
              ))}

              <span
                aria-hidden="true"
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-tertiary)',
                  marginLeft: 8,
                  marginRight: 8,
                  userSelect: 'none',
                }}
              >
                ·
              </span>
              <span style={{
                fontSize: '0.9375rem',
                color: 'var(--text-tertiary)',
                fontWeight: 400,
              }}>
                More
              </span>
            </div>
            </div>{/* end currently+previously group */}

          </div>

          {/* Right: Rubik's cube — floats directly on hero background */}
          <div className="hero-cube" style={{ flexShrink: 0, width: 210, display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(1.3)', transformOrigin: 'top center' }}>
              <HeroCube />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .typing-cursor {
          display: inline-block;
          margin-left: 1px;
          color: var(--accent);
          animation: blink 900ms step-end infinite;
          font-weight: 300;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @media (max-width: 600px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-cube { display: none !important; }
        }
      `}</style>
    </section>
  );
}
