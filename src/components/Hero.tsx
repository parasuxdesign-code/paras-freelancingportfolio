import { STATS } from '../data/content';

interface HeroProps {
  showStats?: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const rise = (delay: number) => ({
  animation: 'om-rise .7s cubic-bezier(.16,1,.3,1) both',
  animationDelay: `${delay}ms`,
});

export function Hero({ showStats = true, onNavClick }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      data-screen-label="Hero"
      style={{
        maxWidth: 900,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(140px,16vw,220px) 0 clamp(32px,4vw,48px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 30,
      }}
    >
      <span
        style={{
          padding: '8px 18px',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,.1)',
          background: 'rgba(255,255,255,.03)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: '#9698A6',
          ...rise(120),
        }}
      >
        Product Designer &amp; Design Partner
      </span>

      <h1
        id="hero-title"
        style={{
          fontSize: 'clamp(38px,6.6vw,76px)',
          lineHeight: 1.06,
          letterSpacing: '-.035em',
          fontWeight: 600,
          textWrap: 'pretty',
          maxWidth: '18ch',
        }}
      >
        <span style={{ display: 'block', ...rise(220) }}>Designing digital</span>
        <span style={{ display: 'block', ...rise(300) }}>
          products people <span style={{ color: '#8FE02E' }}>love</span>
        </span>
        <span style={{ display: 'block', ...rise(380) }}>
          and businesses <span style={{ color: '#8FE02E' }}>grow.</span>
        </span>
      </h1>

      <p
        style={{
          maxWidth: '48ch',
          fontSize: 'clamp(15px,1.2vw,17px)',
          lineHeight: 1.7,
          color: '#9698A6',
          ...rise(460),
        }}
      >
        I help startups and businesses design beautiful, functional and
        meaningful digital experiences.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
          ...rise(540),
        }}
      >
        <a
          href="#contact"
          className="btn-primary"
          onClick={onNavClick}
          data-cursor="Explore"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 54,
            padding: '15px 28px',
            borderRadius: 18,
            background: 'linear-gradient(180deg,#191A2B,#0D0E16)',
            border: '1px solid rgba(121,210,8,.5)',
            color: '#F2F3F7',
            fontSize: 15,
            fontWeight: 600,
            boxShadow: '0 0 26px -10px rgba(121,210,8,.65)',
          }}
        >
          Start a Project <span aria-hidden="true">→</span>
        </a>
        <a
          href="#work"
          className="btn-ghost"
          onClick={onNavClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 54,
            padding: '15px 28px',
            borderRadius: 18,
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.1)',
            color: '#F2F3F7',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          View My Work <span aria-hidden="true">→</span>
        </a>
      </div>

      {showStats && (
        <dl
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 14,
            margin: '10px 0 0',
            padding: 0,
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 22px',
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,.07)',
                background: 'rgba(255,255,255,.02)',
                ...rise(620),
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: 'rgba(121,210,8,.12)',
                  border: '1px solid rgba(121,210,8,.28)',
                  color: '#A6E85C',
                  fontSize: 14,
                }}
              >
                {s.icon}
              </span>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                }}
              >
                <dt
                  style={{
                    order: 2,
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#7A7C88',
                    lineHeight: 1.35,
                  }}
                >
                  {s.label}
                </dt>
                <dd
                  style={{
                    order: 1,
                    margin: 0,
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: '-.02em',
                    color: '#F2F3F7',
                  }}
                >
                  {s.value}
                </dd>
              </span>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
