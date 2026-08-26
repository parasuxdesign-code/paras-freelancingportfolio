import { SERVICES } from '../data/content';

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      data-screen-label="Services"
      style={{
        maxWidth: 1280,
        width: '100%',
        margin: '24px auto 0',
        padding: 'clamp(56px,7vw,88px) clamp(20px,3vw,40px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 40,
        }}
      >
        <div
          className="reveal"
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
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
            What I do
          </span>
          <h2
            id="services-title"
            style={{
              fontSize: 'clamp(28px,3.4vw,42px)',
              lineHeight: 1.12,
              letterSpacing: '-.03em',
              fontWeight: 600,
            }}
          >
            Services I provide
          </h2>
        </div>
        <p
          className="reveal"
          data-delay="80"
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: '#7A7C88',
            maxWidth: '40ch',
          }}
        >
          I help businesses at every stage of their product journey.
        </p>
      </div>

      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fill,minmax(min(260px,100%),1fr))',
        }}
      >
        {SERVICES.map((sv) => (
          <li key={sv.title} className="reveal" data-delay={sv.delay}>
            <div
              className="service-card"
              tabIndex={0}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minHeight: 200,
                padding: 24,
                borderRadius: 22,
                background:
                  'linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015))',
                border: '1px solid rgba(255,255,255,.07)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'rgba(121,210,8,.1)',
                  border: '1px solid rgba(121,210,8,.25)',
                  color: '#A6E85C',
                  fontSize: 16,
                }}
              >
                {sv.icon}
              </span>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: '-.01em',
                  color: '#F2F3F7',
                }}
              >
                {sv.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#7A7C88' }}>
                {sv.body}
              </p>
              <span
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <span
                  aria-hidden="true"
                  className="service-arrow"
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,.1)',
                    fontSize: 13,
                    color: '#9698A6',
                  }}
                >
                  →
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
