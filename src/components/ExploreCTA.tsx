interface ExploreCTAProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function ExploreCTA({ onNavClick }: ExploreCTAProps) {
  return (
    <section
      aria-labelledby="explore-title"
      data-screen-label="Exploration CTA"
      style={{ maxWidth: 1280, width: '100%', margin: '0 auto' }}
    >
      <div
        className="reveal reveal--slow"
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(32px,5vw,56px)',
          borderRadius: 32,
          background: 'linear-gradient(120deg,#0B0B14,#0E1B06 60%,#0B0B14)',
          border: '1px solid rgba(255,255,255,.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            minWidth: 0,
            position: 'relative',
            zIndex: 1,
          }}
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
            Let&apos;s talk
          </span>
          <h2
            id="explore-title"
            style={{
              fontSize: 'clamp(24px,3vw,34px)',
              lineHeight: 1.24,
              letterSpacing: '-.025em',
              fontWeight: 600,
              maxWidth: '24ch',
            }}
          >
            Not sure what you need yet?
            <br />
            Let&apos;s figure it out together.
          </h2>
        </div>
        <a
          href="#contact"
          className="btn-explore"
          onClick={onNavClick}
          data-cursor="Explore"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 56,
            padding: '16px 30px',
            borderRadius: 20,
            background: 'linear-gradient(180deg,#1B1C2E,#0D0E16)',
            border: '1px solid rgba(121,210,8,.5)',
            color: '#F2F3F7',
            fontSize: 15,
            fontWeight: 600,
            boxShadow: '0 0 26px -10px rgba(121,210,8,.7)',
          }}
        >
          Book an Exploration Call <span aria-hidden="true">→</span>
        </a>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: -60,
            bottom: -140,
            zIndex: 0,
            pointerEvents: 'none',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 40% 35%,rgba(121,210,8,.55),rgba(52,110,10,.18) 55%,rgba(0,0,0,0) 72%)',
          }}
        />
      </div>
    </section>
  );
}
