import { SOCIALS, LINKS } from '../data/content';


interface ClosingCTAProps {
  onToTop: () => void;
}

export function ClosingCTA({ onToTop }: ClosingCTAProps) {
  return (
    <section
      id="contact"
      aria-labelledby="explore-title"
      data-screen-label="Closing CTA"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        marginTop: 'clamp(64px,8vw,110px)',
        padding: 'clamp(72px,10vw,130px) clamp(20px,3vw,40px) 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        backgroundColor: '#08090E',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(80% 55% at 50% 108%,rgba(144,224,46,.28),rgba(144,224,46,0) 70%)',
          left: -127,
          top: 0,
        }}
      />

      <div
        data-reveal="1"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(30px,4vw,44px)',
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(14px)',
          transition:
            'opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <h2
          id="explore-title"
          style={{
            margin: 0,
            fontFamily: "'The Seasons'",
            fontSize: 'clamp(34px,5.4vw,66px)',
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: '-.01em',
            color: '#F4F6F1',
            maxWidth: '17ch',
            textWrap: 'pretty',
          }}
        >
          Bring me the hard problem. Leave with the clarity.
        </h2>
        <a
          href={LINKS.tally}
          className="btn-green-lg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            minHeight: 56,
            padding: '16px 26px',
            borderRadius: 19,
            background: '#90E02E',
            color: '#000',
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '100%',
            whiteSpace: 'nowrap',
            transition:
              'background 260ms ease,box-shadow 300ms ease,transform 220ms ease',
          }}
        >
          Let's Connect
        </a>
      </div>

      <footer
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1240,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(28px,4vw,44px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 40,
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(24px,4vw,52px)',
            }}
          >
            {SOCIALS.map((so) => (
              <li key={so.label}>
                <a
                  href={so.href}
                  className="footer-link"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.82)',
                    transition: 'color 240ms ease',
                  }}
                >
                  {so.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={onToTop}
                className="footer-top"
                style={{
                  padding: 0,
                  background: 'none',
                  border: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.5)',
                  cursor: 'pointer',
                  transition: 'color 240ms ease',
                }}
              >
                Back to top
              </button>
            </li>
          </ul>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
            © 2026 Paras Bhatnagar. All rights reserved.
          </span>
        </div>
      </footer>
    </section>
  );
}
