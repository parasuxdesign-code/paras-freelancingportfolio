import { useState, useEffect } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<'namaste' | 'hello' | 'exit'>('namaste');
  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    // Skip or shorten if already visited this session
    const visited = sessionStorage.getItem('intro-shown');

    if (reducedMotion || visited) {
      onComplete();
      return;
    }

    sessionStorage.setItem('intro-shown', '1');

    const t1 = setTimeout(() => setPhase('hello'), 700);
    const t2 = setTimeout(() => setPhase('exit'), 1400);
    const t3 = setTimeout(() => onComplete(), 1800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro__text">
        <span className={`intro__word intro__word--namaste${phase === 'namaste' ? ' is-active' : ''}`}>
          नमस्ते
        </span>
        <span className={`intro__word intro__word--hello${phase === 'hello' ? ' is-active' : ''}`}>
          Hello.
        </span>
      </div>

      <style>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .intro--exit {
          opacity: 0;
        }
        .intro__text {
          position: relative;
          height: 1.2em;
        }
        .intro__word {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          font-family: var(--font-sans);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          white-space: nowrap;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .intro__word--namaste { font-weight: 400; }
        .intro__word.is-active {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>
    </div>
  );
}
