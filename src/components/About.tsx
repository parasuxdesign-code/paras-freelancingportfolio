import { PRINCIPLES } from '../data/content';

interface AboutProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function About({ onNavClick }: AboutProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-screen-label="About"
      style={{
        maxWidth: 1280,
        width: '100%',
        margin: '24px auto 0',
        padding: 'clamp(40px,5vw,56px) clamp(20px,3vw,40px)',
        background:
          'linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.012))',
        borderRadius: 32,
        border: '1px solid rgba(255,255,255,.07)',
        display: 'grid',
        gap: 'clamp(32px,4vw,48px)',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))',
      }}
    >
      {/* Portrait placeholder */}
      <div
        className="reveal reveal--slow"
        style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          background: '#0B0C12',
          border: '1px solid rgba(255,255,255,.07)',
          aspectRatio: '3 / 4',
          minHeight: 280,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(135deg,rgba(255,255,255,.05) 0 10px,rgba(255,255,255,.015) 10px 20px)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 16,
            bottom: 16,
            font: '500 10px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: '#61636F',
          }}
        >
          portrait — 900×1200
        </span>
      </div>

      {/* Bio */}
      <div
        className="reveal"
        data-delay="80"
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: '#7A7C88',
          }}
        >
          About me
        </span>
        <h2
          id="about-title"
          style={{
            fontSize: 'clamp(26px,3vw,36px)',
            lineHeight: 1.14,
            letterSpacing: '-.03em',
            fontWeight: 600,
            maxWidth: '16ch',
          }}
        >
          I&apos;m Paras, nice to meet you.
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: '#9698A6',
            maxWidth: '52ch',
          }}
        >
          I&apos;m a Product Designer with 12+ years of experience building
          digital products from the ground up. I love turning complex problems
          into simple, intuitive and delightful experiences.
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: '#9698A6',
            maxWidth: '52ch',
          }}
        >
          Over the years, I&apos;ve partnered with startups and enterprises
          across industries, helping them create products that not only look
          good but solve real problems.
        </p>
        <a
          href="#contact"
          className="btn-ghost-strong"
          onClick={onNavClick}
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 48,
            padding: '13px 24px',
            borderRadius: 18,
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.1)',
            color: '#F2F3F7',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Know more about me <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Principles */}
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          justifyContent: 'center',
        }}
      >
        {PRINCIPLES.map((pr) => (
          <li
            key={pr.title}
            className="reveal"
            data-delay={pr.delay}
            style={{ display: 'flex', gap: 16 }}
          >
            <span
              aria-hidden="true"
              style={{
                flex: 'none',
                display: 'grid',
                placeItems: 'center',
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'rgba(121,210,8,.1)',
                border: '1px solid rgba(121,210,8,.25)',
                color: '#A6E85C',
                fontSize: 15,
              }}
            >
              {pr.icon}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '-.005em',
                  color: '#F2F3F7',
                }}
              >
                {pr.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: '#7A7C88',
                  maxWidth: '42ch',
                }}
              >
                {pr.body}
              </p>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
