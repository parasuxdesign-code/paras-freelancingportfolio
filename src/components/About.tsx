import { useEffect, useRef } from 'react';
import { GreenSignal } from './GreenSignal';

const INTERESTS = [
  { icon: 'sports_cricket', label: 'Cricket', desc: 'Following the game since childhood. It taught me patience and pattern recognition.' },
  { icon: 'sports_esports', label: 'Gaming', desc: 'Strategy games, mostly. The game design parallels are impossible to ignore.' },
  { icon: 'flight', label: 'Travel', desc: 'New cities, new contexts. The best design research happens off the clock.' },
  { icon: 'water_drop', label: 'Paani Originals', desc: 'A personal creative project exploring visual storytelling.' },
];

export function About() {
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
    <section className="about section" id="about" ref={ref} aria-labelledby="about-heading">
      <div className="container">
        <div className="about__layout">
          <div className="about__intro">
            <p className="section-label">About</p>
            <h2 className="about__headline" id="about-heading">
              The person behind the pixels.
            </h2>
            <p className="about__body">
              I am a Lead Product Designer based in Noida, India with 12+ years of experience across fintech,
              hospitality, enterprise software and emerging AI products. I joined this field because complex problems
              genuinely interest me — and design is one of the few disciplines that sits between the business, the
              technology and the people using it.
            </p>
            <p className="about__body">
              Outside of work, I follow cricket, play strategy games, travel when possible, and spend time on a few
              personal creative projects. These aren&apos;t decorative hobbies — they keep my thinking sharp and my
              references wide.
            </p>
            <div className="about__portrait img-placeholder" aria-label="Portrait of Paras Bhatnagar" role="img">
              <img src="/images/paras-portrait.jpg" alt="Paras Bhatnagar" loading="lazy" />
            </div>
          </div>

          <div className="about__interests">
            <p className="about__interests-label">Outside the pixels</p>
            <div className="about__grid">
              {INTERESTS.map((item, i) => (
                <div key={item.label} className="about__interest-card" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="about__interest-top">
                    <span className="material-symbols-rounded about__interest-icon" aria-hidden="true">{item.icon}</span>
                    <GreenSignal variant="branch" />
                  </div>
                  <h3 className="about__interest-title">{item.label}</h3>
                  <p className="about__interest-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .about.is-visible { opacity: 1; transform: none; }

        .about__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .about__headline {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.035em;
          color: var(--text-primary);
          margin-top: 12px;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .about__body {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        .about__body:last-of-type { margin-bottom: 32px; }

        .about__portrait {
          width: 100%;
          aspect-ratio: 3 / 4;
          max-width: 260px;
          background: var(--bg-inset);
          border-radius: var(--r-xl);
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .about__portrait img { width: 100%; height: 100%; object-fit: cover; }

        .about__interests-label {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 24px;
        }

        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .about__interest-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          padding: 20px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .about__interest-card:hover {
          box-shadow: var(--shadow-sm);
          transform: translateY(-2px);
        }

        .about__interest-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .about__interest-icon {
          font-size: 22px;
          color: var(--text-secondary);
        }

        .about__interest-title {
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .about__interest-desc {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .about__layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .about__portrait { max-width: 200px; }
        }
        @media (max-width: 480px) {
          .about__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
