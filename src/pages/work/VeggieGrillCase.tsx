import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import '../../styles/vg-case.css';

/* ─────────────────────────────────────────────────────────────────────────
   Image placeholder — VeggieGrill case study only.
   Self-contained, no global side-effects.
───────────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────────
   App-screen carousel — Veggie Grill case study only.

   To add, remove, or reorder screenshots, edit VG_SCREENS below.
   Each entry is a { src, alt } pair where src is the public path
   (relative to /). Leave src empty ('') to render a neutral placeholder
   at the correct aspect ratio until real screenshots are ready.
───────────────────────────────────────────────────────────────────────── */
interface VgScreen {
  src: string;
  alt: string;
}

const VG_SCREENS: VgScreen[] = [
  { src: '/images/projects/vg-screen-01.png', alt: 'Login screen' },
  { src: '/images/projects/vg-screen-02.png', alt: 'Sign up screen' },
  { src: '/images/projects/vg-screen-03.png', alt: 'Rewards home' },
  { src: '/images/projects/vg-screen-04.png', alt: 'Earn points — QR code' },
  { src: '/images/projects/vg-screen-05.png', alt: 'Scan receipt barcode' },
  { src: '/images/projects/vg-screen-06.png', alt: 'Review us' },
  { src: '/images/projects/vg-screen-07.png', alt: 'Congratulations — points earned' },
  { src: '/images/projects/vg-screen-08.png', alt: 'Stores list' },
  { src: '/images/projects/vg-screen-09.png', alt: 'Stores map' },
  { src: '/images/projects/vg-screen-10.png', alt: 'Store detail' },
  { src: '/images/projects/vg-screen-11.png', alt: 'Order now — menu categories' },
  { src: '/images/projects/vg-screen-12.png', alt: 'Wings — item detail & customise' },
  { src: '/images/projects/vg-screen-13.png', alt: 'Gift cards' },
  { src: '/images/projects/vg-screen-14.png', alt: 'Buy gift card — choose design' },
  { src: '/images/projects/vg-screen-15.png', alt: 'Redeem bank rewards — amount entry' },
  { src: '/images/projects/vg-screen-16.png', alt: 'Redeem offer — confirmation' },
];

// Slides cloned on each side to achieve seamless infinite loop
const CLONE_COUNT = 5;
// Gap between cards in px
const GAP = 12;
// Auto-advance interval in ms
const INTERVAL = 3000;
// Transition duration in ms (keep in sync with CSS)
const TRANSITION_MS = 520;

/** Returns how many cards are visible for the given container pixel width. */
function visibleCount(containerWidth: number): number {
  if (containerWidth >= 880) return 4;
  if (containerWidth >= 580) return 3;
  if (containerWidth >= 380) return 2;
  return 1.5;
}

function VgCarousel({ screens }: { screens: VgScreen[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  // offset = index into display array (which includes clones)
  const [offset, setOffset]   = useState(CLONE_COUNT);
  const [animated, setAnimated] = useState(true);
  const pausedRef  = useRef(false);
  const reducedRef = useRef(false);
  const offsetRef  = useRef(CLONE_COUNT);

  // Build display array: [last N clones] + [real slides] + [first N clones]
  const display = useMemo(() => [
    ...screens.slice(-CLONE_COUNT),
    ...screens,
    ...screens.slice(0, CLONE_COUNT),
  ], [screens]);

  // Detect prefers-reduced-motion once
  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Re-enable animation one frame after a silent jump
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  // Calculate card width from container; update on resize
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const visible = visibleCount(w);
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

  // Programmatic navigation — always keeps offsetRef in sync
  const goTo = useCallback((newOffset: number, animate = true) => {
    offsetRef.current = newOffset;
    setAnimated(animate);
    setOffset(newOffset);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (reducedRef.current || screens.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) goTo(offsetRef.current + 1);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [screens.length, goTo]);

  // After a transition completes: silently jump back to real range
  const handleTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    // Only act on the track's own transform transition, not children
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    const o = offsetRef.current;
    const n = screens.length;
    if (o >= n + CLONE_COUNT) {
      goTo(CLONE_COUNT + (o - n - CLONE_COUNT), false);
    } else if (o < CLONE_COUNT) {
      goTo(n + CLONE_COUNT - (CLONE_COUNT - o), false);
    }
  }, [screens.length, goTo]);

  // Real slide index for dot highlight
  const realIdx = ((offsetRef.current - CLONE_COUNT) % screens.length + screens.length) % screens.length;

  // Touch / mouse-drag support
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
      {/* ── Slide track ── */}
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
        aria-label="Veggie Grill app screenshots"
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
                <span>{screen.alt || 'Screenshot coming soon'}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Dot indicators ── */}
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

export function VeggieGrillCase() {
  useEffect(() => {
    document.title = 'Veggie Grill — Punchh · Paras Bhatnagar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study vg-case-study">

      {/* ── Hero ── */}
      <header className="cs-hero">
        <div className="container cs-hero__inner">
          <div className="cs-hero__meta">
            <span className="cs-tag">Punchh · Mobile App</span>
            <span className="cs-tag">Product Design · 2018</span>
          </div>
          <h1 className="cs-hero__title">Bringing a restaurant experience together.</h1>
          <p className="cs-hero__subtitle">
            Adapting an existing app framework into a cohesive, brand-specific mobile experience for Veggie Grill.
          </p>
          <div className="cs-hero__details">
            <div className="cs-detail">
              <span className="cs-detail__label">Client</span>
              <span className="cs-detail__value">Veggie Grill</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Platform</span>
              <span className="cs-detail__value">Punchh</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Role</span>
              <span className="cs-detail__value">Product Designer</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Platforms</span>
              <span className="cs-detail__value">iOS · Android</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Cover image ── */}
      <div className="cs-cover">
        <div className="container">
          <img
            src="/images/projects/vg-cover.png"
            alt="Veggie Grill app — reward screen showing loyalty progress and bottom navigation"
            className="cs-cover__img"
          />
        </div>
      </div>

      {/* ── Body ── */}
      <article className="cs-body">
        <div className="container">

          {/* ── 01 Overview ── */}
          <section className="vg-section" style={{ paddingTop: 0 }}>
            <div className="vg-prose">
              <span className="vg-kicker">01 — Overview</span>
              <p>
                Veggie Grill is a plant-based restaurant brand with a digital experience spanning food ordering,
                loyalty and rewards, location discovery, and gift cards.
              </p>
              <p>
                At Punchh, I worked on customizing its existing mobile app framework to deliver a cohesive
                experience tailored to the Veggie Grill brand.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 02 The challenge ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">02 — The challenge</span>
              <p>
                The app needed to bring multiple customer journeys together while retaining a consistent
                experience across its different features.
              </p>
              <p>
                The challenge was to translate the existing framework into an app that felt distinctly
                Veggie Grill, with a unified visual language across ordering, rewards, account access,
                locations, and gift cards.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 03 My role ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">03 — My role</span>
              <p>
                <strong>Role</strong><br />
                Product Designer
              </p>
              <p>
                <strong>Team</strong><br />
                Lead Product Designer, with cross-functional collaboration
              </p>
              <h3>Responsibilities</h3>
              <ul>
                <li>User flows and low-fidelity wireframes</li>
                <li>Brand adaptation and high-fidelity UI design</li>
                <li>Design consistency across app features</li>
                <li>Developer-ready design handoff</li>
              </ul>
              <p>
                I owned the app design end to end, collaborating with the Lead Product Designer on UX
                decisions and translating the agreed direction into detailed, implementation-ready interfaces.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 04 The problem ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">04 — The problem</span>
              <p>
                The existing framework provided a foundation, but the experience needed to feel cohesive
                across several distinct features without losing Veggie Grill's brand identity.
              </p>
              <p>
                The design challenge was to balance shared app patterns with a visual experience tailored
                to the restaurant, ensuring that each feature felt like part of the same product.
              </p>
            </div>
            <div className="vg-visual">
              <img src="/images/projects/vg-problem.png" alt="Veggie Grill — the problem: outdated brand, cluttered experience, inconsistent UI" className="vg-problem-img" />
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 05 The solution ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">05 — The solution</span>
              <h2>Structure the experience</h2>
              <p>
                I worked with user flows and low-fidelity wireframes to define the screen structures and
                journeys before translating them into detailed UI.
              </p>
            </div>
            <div className="vg-visual">
              <img
                src="/images/projects/vg-structure.png"
                alt="Veggie Grill app — sketching and planning: user flows, wireframes, and key screen layouts"
                className="cs-cover__img"
              />
            </div>

            <div className="vg-prose" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
              <h2>Translate the brand</h2>
              <p>
                I combined Veggie Grill's existing brand identity with app-specific visual decisions to
                create a consistent look and feel across the experience.
              </p>
            </div>
            <div className="vg-visual">
              <img
                src="/images/projects/vg-brand.png"
                alt="Veggie Grill brand system — color palette, typography (Montserrat), and iconography"
                className="cs-cover__img"
              />
            </div>

            <div className="vg-prose" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
              <h2>Design for the complete app</h2>
              <p>
                I created high-fidelity screens across onboarding, login, home and menu, ordering and
                checkout, rewards and account, gift cards, and location discovery.
              </p>
            </div>
            {/* ── App-screen carousel (replaces placeholder) ── */}
            <div className="vg-visual">
              <VgCarousel screens={VG_SCREENS} />
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 06 Impact ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">06 — Impact</span>
              <p>
                The app went live, and my work progressed through developer-ready handoff.
              </p>
              <p>
                The delivered design brought Veggie Grill's key customer journeys into a single,
                brand-specific mobile experience built on Punchh's existing framework.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── Closing ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <h2>Designed end to end. Delivered to production.</h2>
              <p>
                The project demonstrates my ability to adapt an existing product framework, translate brand
                requirements into polished UI, and deliver a complete app design for implementation.
              </p>
            </div>
          </section>

        </div>
      </article>

    </div>
  );
}
