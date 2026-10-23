import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import '../../styles/vg-case.css';

/* ─────────────────────────────────────────────────────────────────────────
   App-screen carousel — Iccera Invest (TOL) case study.

   To add, remove, or reorder screenshots, edit TOL_SCREENS below.
   Each entry is a { src, alt } pair where src is the public path
   (relative to /). Leave src empty ('') to render a neutral placeholder
   until real screenshots are ready.
───────────────────────────────────────────────────────────────────────── */
interface TolScreen {
  src: string;
  alt: string;
}

const TOL_SCREENS: TolScreen[] = [
  { src: '/images/tol-screen-01.png', alt: 'Wallet home — overall balance and latest account movements' },
  { src: '/images/tol-screen-02.png', alt: 'Trading home — portfolio value, performance chart, and quick actions' },
  { src: '/images/tol-screen-03.png', alt: 'Securities account selector — switch between individual and advisory accounts' },
  { src: '/images/tol-screen-04.png', alt: 'Discover — browse stocks, ETFs, bonds and most actively traded instruments' },
  { src: '/images/tol-screen-05.png', alt: 'Watchlist — tracked instruments with live price and daily change' },
  { src: '/images/tol-screen-06.png', alt: 'Search — find any instrument across all asset types and countries' },
  { src: '/images/tol-screen-07.png', alt: 'Asset detail — Ferrari NV price chart, Bid/Ask data and time-range selector' },
  { src: '/images/tol-screen-08.png', alt: 'Exchange selector — choose between MIL, NYSE, XETR and other venues' },
  { src: '/images/tol-screen-09.png', alt: 'Buy — market order entry with quantity, exchange and account selection' },
  { src: '/images/tol-screen-10.png', alt: 'Buy — limit order entry with price, quantity and expiration controls' },
  { src: '/images/tol-screen-11.png', alt: 'Order review — full order summary before confirmation' },
  { src: '/images/tol-screen-12.png', alt: 'Face ID — biometric confirmation to authorise the trade' },
  { src: '/images/tol-screen-13.png', alt: 'Order submitted — confirmation screen with option to view the order' },
  { src: '/images/tol-screen-14.png', alt: 'Portfolio returns — performance chart and P/L summary across time ranges' },
  { src: '/images/tol-screen-15.png', alt: 'Portfolio allocation — composition by asset type and region' },
];

const CLONE_COUNT = 5;
const GAP = 12;
const INTERVAL = 3000;
const TRANSITION_MS = 520;

function tolVisibleCount(containerWidth: number): number {
  if (containerWidth >= 880) return 4;
  if (containerWidth >= 580) return 3;
  if (containerWidth >= 380) return 2;
  return 1.5;
}

function TolCarousel({ screens }: { screens: TolScreen[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [offset, setOffset]   = useState(CLONE_COUNT);
  const [animated, setAnimated] = useState(true);
  const pausedRef  = useRef(false);
  const reducedRef = useRef(false);
  const offsetRef  = useRef(CLONE_COUNT);

  const display = useMemo(() => [
    ...screens.slice(-CLONE_COUNT),
    ...screens,
    ...screens.slice(0, CLONE_COUNT),
  ], [screens]);

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const visible = tolVisibleCount(w);
    const totalGap = Math.floor(visible) * GAP;
    setCardWidth((w - totalGap) / visible);
  }, []);

  useLayoutEffect(() => { measure(); }, [measure]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(measure);
    obs.observe(el);
    return () => obs.disconnect();
  }, [measure]);

  const goTo = useCallback((newOffset: number, animate = true) => {
    offsetRef.current = newOffset;
    setAnimated(animate);
    setOffset(newOffset);
  }, []);

  useEffect(() => {
    if (reducedRef.current || screens.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) goTo(offsetRef.current + 1);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [screens.length, goTo]);

  const handleTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    const o = offsetRef.current;
    const n = screens.length;
    if (o >= n + CLONE_COUNT) {
      goTo(CLONE_COUNT + (o - n - CLONE_COUNT), false);
    } else if (o < CLONE_COUNT) {
      goTo(n + CLONE_COUNT - (CLONE_COUNT - o), false);
    }
  }, [screens.length, goTo]);

  const realIdx = ((offsetRef.current - CLONE_COUNT) % screens.length + screens.length) % screens.length;

  const dragStartX = useRef<number | null>(null);
  const startDrag = (clientX: number) => {
    dragStartX.current = clientX;
    pausedRef.current = true;
  };
  const endDrag = (clientX: number) => {
    if (dragStartX.current !== null) {
      const dx = clientX - dragStartX.current;
      if (Math.abs(dx) > 44) goTo(offsetRef.current + (dx < 0 ? 1 : -1));
      dragStartX.current = null;
    }
    pausedRef.current = false;
  };

  const translateX = cardWidth ? -(offset * (cardWidth + GAP)) : 0;

  return (
    <div
      className="vg-carousel"
      ref={containerRef}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={e => {
        endDrag(e.clientX);
        pausedRef.current = false;
      }}
      onTouchStart={e => startDrag(e.touches[0].clientX)}
      onTouchEnd={e => endDrag(e.changedTouches[0].clientX)}
      onMouseDown={e => startDrag(e.clientX)}
      onMouseUp={e => endDrag(e.clientX)}
    >
      <div
        className="vg-carousel__track"
        style={{
          transform: cardWidth ? `translateX(${translateX}px)` : undefined,
          transition: animated && cardWidth
            ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
            : 'none',
          gap: `${GAP}px`,
        }}
        onTransitionEnd={handleTransitionEnd}
        aria-label="Iccera Invest app screens"
        role="region"
      >
        {display.map((screen, i) => (
          <div
            key={i}
            className="vg-carousel__card"
            style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
            aria-hidden={i < CLONE_COUNT || i >= screens.length + CLONE_COUNT ? true : undefined}
          >
            {screen.src ? (
              <img
                src={screen.src}
                alt={screen.alt}
                className="vg-carousel__img"
                draggable={false}
              />
            ) : (
              <div className="vg-carousel__placeholder">
                <span>{screen.alt || 'Iccera Invest screen'}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {screens.length > 1 && (
        <div className="vg-carousel__dots" aria-hidden="true">
          {screens.map((_, i) => (
            <button
              key={i}
              className={`vg-carousel__dot${i === realIdx ? ' vg-carousel__dot--active' : ''}`}
              onClick={() => goTo(CLONE_COUNT + i)}
              tabIndex={-1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TOLCase() {
  useEffect(() => {
    document.title = 'TOL — Iccera Invest · Paras Bhatnagar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study">

      {/* ── Hero ── */}
      <header className="cs-hero">
        <div className="container cs-hero__inner">
          <div className="cs-hero__meta">
            <span className="cs-tag">Fintech</span>
            <span className="cs-tag">Investment</span>
            <span className="cs-tag">Lead Designer</span>
          </div>
          <h1 className="cs-hero__title">Making investing more accessible through thoughtful product design.</h1>
          <p className="cs-hero__subtitle">
            Designing Iccera Invest — a digital investing experience that helps retail banking customers
            explore financial markets, understand their investments, and trade independently.
          </p>
          <div className="cs-hero__details">
            <div className="cs-detail">
              <span className="cs-detail__label">Role</span>
              <span className="cs-detail__value">Lead Designer</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Product</span>
              <span className="cs-detail__value">Digital investing and trading platform</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Client</span>
              <span className="cs-detail__value">European bank</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Status</span>
              <span className="cs-detail__value">In development</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Cover ── */}
      <div className="cs-cover">
        <div className="container">
          <img
            src="/images/tol-cover.png"
            alt="Iccera Invest — Gruppo BCC trading app on iPhone, showing portfolio balance and watchlist"
            className="cs-cover__img"
            loading="eager"
          />
        </div>
      </div>

      {/* ── Body ── */}
      <article className="cs-body">
        <div className="container">

          {/* ── Overview ── */}
          <section className="vg-section" style={{ paddingTop: 0 }}>
            <div className="vg-prose">
              <span className="vg-kicker">Overview</span>
              <p>
                Iccera Invest is a digital investing experience designed to help retail banking
                customers explore financial markets, understand their investments, and trade
                independently. The project aimed to support the bank's ambition to increase
                investment awareness and make self-service investing more approachable.
              </p>
              <p>
                As Lead Designer, I worked with the design team and Product Owner to shape the
                experience from the ground up, collaborating closely with engineering throughout
                the design process.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── The challenge ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">The challenge</span>
              <p>
                Many customers were accustomed to traditional investment methods and had limited
                knowledge of financial markets. Complex terminology and financial information
                could make independent investing difficult to navigate.
              </p>
              <p>
                The challenge was to design an experience that made investment information
                easier to understand while supporting customers through essential portfolio
                and trading journeys.
              </p>
              <img
                src="/images/tol-challenge.png"
                alt="Bank advisor showing the trading app to a customer — illustrating the need for a clearer investing experience"
                className="vg-img vg-img--rounded"
                loading="lazy"
              />
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── My role ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">My role</span>
              <p>
                I led the design effort across discovery, UX, and visual design, working
                collaboratively with the Product Owner and Development Lead.
              </p>
              <ul>
                <li>Partnered with the Product Owner to understand the bank's business context and research needs.</li>
                <li>Helped structure research scripts using the available product knowledge base.</li>
                <li>Shaped the portfolio, asset-detail, and buying and selling experiences.</li>
                <li>Defined information hierarchy and visual presentation to improve clarity.</li>
                <li>Considered accessibility throughout the interface design.</li>
                <li>Collaborated with engineering from the earliest design stages to align UX decisions with technical architecture.</li>
              </ul>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── The approach ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">The approach</span>

              <h2>01 — Establishing context</h2>
              <p>
                The design team worked with the Product Owner to understand the bank's objectives
                and customer needs. Since direct communication with end users was limited, we
                developed structured research scripts to guide information gathering.
              </p>

              <img
                src="/images/tol-establishing-context.png"
                alt="Research board showing proto-personas and competitive analysis for Iccera Invest"
                className="vg-img vg-img--rounded"
                loading="lazy"
                style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}
              />

              <h2 style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>02 — Organising financial information</h2>
              <p>
                Information hierarchy was a central design consideration. Portfolio summaries,
                asset details, and trading actions needed to be presented in a way that helped
                customers understand the information relevant to each decision.
              </p>

              <h2 style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>03 — Designing for clarity and accessibility</h2>
              <p>
                Visual design played an important role in making the experience approachable.
                We focused on clear content structure, readable information, and accessible
                interface patterns across the core investment journeys.
              </p>

              <img
                src="/images/tol-accessibility.png"
                alt="WCAG accessibility checklist spreadsheet used during the Iccera Invest design process"
                className="vg-img vg-img--rounded"
                loading="lazy"
                style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}
              />

              <h2 style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>04 — Collaborating throughout delivery</h2>
              <p>
                The Development Lead was involved from the earliest design discussions, bringing
                knowledge of the technical architecture into the process. This collaboration
                continued throughout the sprints, helping the team consider implementation
                constraints while refining the experience.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── Key journeys ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">Key journeys</span>
              <ul>
                <li>
                  <strong>Portfolio</strong> — Understand investment holdings and portfolio performance.
                </li>
                <li>
                  <strong>Asset details</strong> — Explore individual financial instruments and their relevant information.
                </li>
                <li>
                  <strong>Buying and selling</strong> — Navigate the core trading journey through a self-service interface.
                </li>
              </ul>
            </div>

            {/* ── App-screen carousel ── */}
            <div className="vg-visual">
              <TolCarousel screens={TOL_SCREENS} />
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── Current status ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">Current status</span>
              <p>
                The designs have been shared, and Iccera Invest remains in development. The work
                establishes the UX and visual direction for a digital investment experience focused
                on clarity, accessibility, and independent customer use.
              </p>
              <p>
                As the product progresses, post-launch adoption and business outcomes remain
                to be measured.
              </p>
            </div>
          </section>

        </div>
      </article>

    </div>
  );
}
