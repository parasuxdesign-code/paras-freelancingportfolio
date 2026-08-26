import { useRef } from 'react';
import { TESTIMONIALS } from '../data/content';

interface TestimonialsProps {
  reduced: boolean;
}

export function Testimonials({ reduced }: TestimonialsProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  // Ported from DC's slide(): advance by one card width, wrapping at the ends.
  const slide = (dir: number) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 16 : 320;
    let next = t.scrollLeft + dir * step;
    if (next > t.scrollWidth - t.clientWidth - 8) next = dir > 0 ? 0 : next;
    if (next < 0) next = t.scrollWidth;
    t.scrollTo({
      left: Math.max(0, next),
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      data-screen-label="Testimonials"
      style={{
        maxWidth: 1280,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(40px,5vw,64px) clamp(20px,3vw,40px)',
        background:
          'linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.012))',
        borderRadius: 32,
        border: '1px solid rgba(255,255,255,.07)',
        display: 'grid',
        gap: 'clamp(24px,3vw,40px)',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))',
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
          Testimonials
        </span>
        <h2
          id="testimonials-title"
          style={{
            fontSize: 'clamp(26px,3vw,36px)',
            lineHeight: 1.14,
            letterSpacing: '-.03em',
            fontWeight: 600,
            maxWidth: '14ch',
          }}
        >
          Kind words from amazing people
        </h2>
      </div>

      <div
        className="reveal"
        data-delay="80"
        style={{
          gridColumn: 'span 2',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <ul
          ref={trackRef}
          className="carousel-track"
          aria-live="polite"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 4,
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
          }}
        >
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              style={{
                scrollSnapAlign: 'start',
                flex: '0 0 min(320px,86%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                padding: 24,
                borderRadius: 22,
                background: 'rgba(255,255,255,.025)',
                border: '1px solid rgba(255,255,255,.07)',
              }}
            >
              <span
                aria-hidden="true"
                style={{ fontSize: 22, lineHeight: 0.8, color: '#5E8F32' }}
              >
                &#8220;
              </span>
              <blockquote
                style={{ fontSize: 14, lineHeight: 1.75, color: '#C1C3CD' }}
              >
                {t.quote}
              </blockquote>
              <figcaption
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: 'none',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,.08)',
                    background:
                      'repeating-linear-gradient(135deg,rgba(255,255,255,.06) 0 6px,rgba(255,255,255,.02) 6px 12px)',
                  }}
                />
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: '#F2F3F7' }}
                  >
                    {t.name}
                  </span>
                  <span style={{ fontSize: 12, color: '#7A7C88' }}>
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => slide(-1)}
            aria-label="Previous testimonial"
            style={{
              width: 40,
              height: 40,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.1)',
              background: 'rgba(255,255,255,.03)',
              color: '#C9CBD4',
              cursor: 'pointer',
            }}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => slide(1)}
            aria-label="Next testimonial"
            style={{
              width: 40,
              height: 40,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.1)',
              background: 'rgba(255,255,255,.03)',
              color: '#C9CBD4',
              cursor: 'pointer',
            }}
          >
            <span aria-hidden="true">→</span>
          </button>
          <span style={{ fontSize: 12, color: '#61636F', marginLeft: 8 }}>
            Swipe or use the arrows
          </span>
        </div>
      </div>
    </section>
  );
}
