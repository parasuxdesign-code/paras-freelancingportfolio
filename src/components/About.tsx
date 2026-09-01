import { PRINCIPLES, LINKS } from '../data/content';
import { Icon } from './Icon';

const serif = "'The Seasons','Playfair Display',Georgia,serif";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-screen-label="About"
      style={{
        maxWidth: 1240,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(40px,5vw,56px) clamp(28px,4vw,48px)',
        background:
          'linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.012))',
        borderRadius: 32,
        border: '1px solid rgba(255,255,255,.07)',
        display: 'grid',
        gap: 'clamp(32px,4vw,48px)',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))',
      }}
    >
      <div
        data-reveal="1"
        style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          background: '#0B0C12',
          border: '1px solid rgba(255,255,255,.07)',
          height: '100%',
          minHeight: 420,
          opacity: 0,
          transform: 'translateY(14px)',
          transition:
            'opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <img
          src="/images/paras-about.png"
          alt="Paras Bhatnagar"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 22%',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg,rgba(5,5,10,0) 45%,rgba(5,5,10,.55))',
          }}
        />
      </div>

      <div
        data-reveal="1"
        data-delay="80"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          opacity: 0,
          transform: 'translateY(14px)',
          transition:
            'opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: '28px',
            color: '#90E02E',
          }}
        >
          About me
        </span>
        <h2
          id="about-title"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(28px,3.4vw,38px)',
            lineHeight: 1.15,
            fontWeight: 700,
            maxWidth: '18ch',
            textWrap: 'pretty',
          }}
        >
          Paras again, nice to meet you.
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: '#9698A6',
            maxWidth: '52ch',
          }}
        >
          I'm a Product Designer with 12+ years of experience building digital
          products from the ground up. I love turning complex problems into
          simple, intuitive and delightful experiences.
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: '#9698A6',
            maxWidth: '52ch',
          }}
        >
          Over the years, I've partnered with startups and enterprises across
          industries, helping them create products that not only look good but
          solve real problems.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="Paras Bhatnagar on LinkedIn"
            className="btn-green-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              minHeight: 48,
              padding: '13px 24px',
              borderRadius: 18,
              background: '#90E02E',
              color: '#000',
              fontSize: 14,
              fontWeight: 600,
              transition:
                'background 260ms ease,box-shadow 300ms ease,transform 200ms ease',
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              style={{ flex: 'none', display: 'block' }}
            >
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.9 21.5h4.16V9.4H2.9v12.1ZM9.6 9.4h3.98v1.65h.06c.55-1.02 1.9-2.1 3.92-2.1 3.2 0 3.94 2 3.94 5.03v7.52h-4.15v-6.67c0-1.59-.29-2.98-2.05-2.98-1.7 0-2.05 1.28-2.05 2.9v6.75H9.6V9.4Z" />
            </svg>{' '}
            LinkedIn
          </a>
        </div>

        <ul
          style={{
            listStyle: 'none',
            margin: '4px 0 0',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(170px,100%),1fr))',
            gap: '24px 28px',
          }}
        >
          {PRINCIPLES.map((pr) => (
            <li
              key={pr.title}
              data-reveal="1"
              data-delay={pr.delay}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                opacity: 0,
                transform: 'translateY(14px)',
                transition:
                  'opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <Icon
                name={pr.icon}
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
                  fontSize: 21,
                }}
              />
              <span
                style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              >
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
                <p style={{ fontSize: 13, lineHeight: 1.65, color: '#7A7C88' }}>
                  {pr.body}
                </p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
