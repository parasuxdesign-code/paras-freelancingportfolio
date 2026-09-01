import { useRef } from 'react';
import { TESTIMONIALS, type Testimonial } from '../data/content';

const serif = "'The Seasons','Playfair Display',Georgia,serif";

interface LoopItem extends Testimonial {
  dupe: boolean;
  fade: string;
  initials: string;
}

// Mirrors DCLogic testimonialsLoop: the list is concatenated with itself for a
// seamless CSS marquee; long quotes get a bottom fade mask.
const LOOP: LoopItem[] = TESTIMONIALS.concat(TESTIMONIALS).map((t, i) => ({
  ...t,
  dupe: i >= TESTIMONIALS.length,
  fade:
    (t.quote.length + (t.quote2 || '').length) > 500
      ? 'linear-gradient(180deg,#000 78%,transparent)'
      : 'none',
  initials: t.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join(''),
}));

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const setPaused = (paused: boolean) => {
    const row = trackRef.current?.querySelector<HTMLElement>('[data-tmarquee]');
    if (row) row.style.animationPlayState = paused ? 'paused' : 'running';
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      data-screen-label="Testimonials"
      style={{
        maxWidth: 1240,
        width: '100%',
        margin: 'clamp(24px,3vw,40px) auto',
        padding: 'clamp(40px,5vw,56px) clamp(28px,4vw,48px)',
        background:
          'linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.012))',
        borderRadius: 32,
        border: '1px solid rgba(255,255,255,.07)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(24px,3vw,32px)',
      }}
    >
      <div
        data-reveal="1"
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
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: '28px',
            color: '#90E02E',
          }}
        >
          Testimonials
        </span>
        <h2
          id="testimonials-title"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(28px,3.4vw,38px)',
            lineHeight: 1.15,
            fontWeight: 700,
            maxWidth: '22ch',
            textWrap: 'pretty',
          }}
        >
          Kind words from amazing people
        </h2>
      </div>

      <div
        data-reveal="1"
        data-delay="80"
        style={{
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          opacity: 0,
          transform: 'translateY(14px)',
          transition:
            'opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: 'relative',
            overflow: 'hidden',
            margin: '0 -4px',
            padding: 4,
            WebkitMask:
              'linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)',
            mask: 'linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)',
          }}
        >
          <ul
            data-tmarquee="1"
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              alignItems: 'stretch',
              gap: 16,
              width: 'max-content',
              animation: 'om-tscroll 68s linear infinite',
            }}
          >
            {LOOP.map((t, i) => (
              <li
                key={`${t.name}-${i}`}
                aria-hidden={t.dupe || undefined}
                style={{
                  flex: '0 0 min(440px,calc(100vw - 72px))',
                  width: 'min(440px,calc(100vw - 72px))',
                  height: 380,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 20,
                  padding: 28,
                  borderRadius: 22,
                  background: 'rgba(255,255,255,.025)',
                  border: '1px solid rgba(255,255,255,.07)',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ fontSize: 22, lineHeight: 0.8, color: '#5E8F32' }}
                >
                  &ldquo;
                </span>
                <blockquote
                  style={{
                    margin: 0,
                    flex: '0 0 auto',
                    height: 214,
                    overflow: 'hidden',
                    WebkitMask: t.fade,
                    mask: t.fade,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#C1C3CD',
                  }}
                >
                  <span>{t.quote}</span>
                  {t.quote2 && <span style={{ color: '#9EA0AD' }}>{t.quote2}</span>}
                </blockquote>
                <figcaption
                  style={{
                    paddingTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  {t.photo ? (
                    <span
                      role="img"
                      aria-label={t.name}
                      style={{
                        flex: 'none',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,.12)',
                        backgroundImage: `url(${t.photo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#14161D',
                      }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      style={{
                        flex: 'none',
                        display: 'grid',
                        placeItems: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: '1px solid rgba(121,210,8,.25)',
                        background: 'rgba(121,210,8,.1)',
                        color: '#A6E85C',
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {t.initials}
                    </span>
                  )}
                  <span
                    style={{
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: '#F2F3F7' }}
                    >
                      {t.name}
                    </span>
                    {t.role && (
                      <span style={{ fontSize: 12, color: '#7A7C88' }}>
                        {t.role}
                      </span>
                    )}
                  </span>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener"
                    aria-label="View profile on LinkedIn"
                    className="tlink"
                    tabIndex={t.dupe ? -1 : undefined}
                    style={{
                      flex: 'none',
                      display: 'grid',
                      placeItems: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(255,255,255,.04)',
                      border: '1px solid rgba(255,255,255,.09)',
                      color: '#8A8C99',
                      transition:
                        'color 260ms ease,border-color 260ms ease,background 260ms ease',
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                      style={{ display: 'block' }}
                    >
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.9 21.5h4.16V9.4H2.9v12.1ZM9.6 9.4h3.98v1.65h.06c.55-1.02 1.9-2.1 3.92-2.1 3.2 0 3.94 2 3.94 5.03v7.52h-4.15v-6.67c0-1.59-.29-2.98-2.05-2.98-1.7 0-2.05 1.28-2.05 2.9v6.75H9.6V9.4Z" />
                    </svg>
                  </a>
                </figcaption>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
