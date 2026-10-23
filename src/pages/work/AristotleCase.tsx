import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import '../../styles/vg-case.css';

/* ─────────────────────────────────────────────────────────────────────────
   App-screen carousel — Aristotle case study only.

   Each entry is a { src, alt } pair where src is the public path.
   Leave src empty ('') to render a neutral placeholder until real
   screenshots are ready.
───────────────────────────────────────────────────────────────────────── */
interface ArScreen {
  src: string;
  alt: string;
}

const AR_SCREENS: ArScreen[] = [
  { src: '/images/aristotle-screen-01.png', alt: 'Aristotle dashboard — home screen with case and challenge navigation' },
  { src: '/images/aristotle-screen-02.png', alt: 'Case Library — browsable grid of real-world strategic decision cases' },
  { src: '/images/aristotle-screen-03.png', alt: 'Commit to a theory — theory selection and reasoning input' },
  { src: '/images/aristotle-screen-04.png', alt: 'Theory committed successfully — confirmation state' },
  { src: '/images/aristotle-screen-05.png', alt: 'Explore theory — target outcome view with AI Theory Copilot' },
  { src: '/images/aristotle-screen-06.png', alt: 'Build logic — drag-and-drop attribute canvas' },
  { src: '/images/aristotle-screen-07.png', alt: 'Build logic — node being placed on canvas' },
  { src: '/images/aristotle-screen-08.png', alt: 'Build logic — nodes connected with directed edges' },
  { src: '/images/aristotle-screen-09.png', alt: 'Build logic — complete attribute graph with generate probability' },
  { src: '/images/aristotle-screen-10.png', alt: 'Add subjective beliefs — Bayesian probability graph' },
  { src: '/images/aristotle-screen-11.png', alt: 'Add subjective beliefs — probability slider interaction' },
];

// Slides cloned on each side to achieve seamless infinite loop
const CLONE_COUNT = 4;
// Gap between cards in px
const GAP = 16;
// Auto-advance interval in ms
const INTERVAL = 3200;
// Transition duration in ms
const TRANSITION_MS = 520;

function visibleCount(containerWidth: number): number {
  if (containerWidth >= 900) return 3;
  if (containerWidth >= 580) return 2;
  return 1;
}

function AristotleCarousel({ screens }: { screens: ArScreen[] }) {
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
      className="vg-carousel ar-carousel"
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
        aria-label="Aristotle product screens"
        role="region"
      >
        {display.map((screen, i) => (
          <div
            key={i}
            className="vg-carousel__card ar-carousel__card"
            style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
            aria-hidden={i < CLONE_COUNT || i >= screens.length + CLONE_COUNT ? true : undefined}
          >
            {screen.src ? (
              <img
                src={screen.src}
                alt={screen.alt}
                className="vg-carousel__img ar-carousel__img"
                draggable={false}
              />
            ) : (
              <div className="vg-carousel__placeholder ar-carousel__placeholder">
                <span>{screen.alt || 'Aristotle product screen'}</span>
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

export function AristotleCase() {
  useEffect(() => {
    document.title = 'Aristotle — University of Milan · Paras Bhatnagar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study">

      {/* ── Hero ── */}
      <header className="cs-hero">
        <div className="container cs-hero__inner">
          <div className="cs-hero__meta">
            <span className="cs-tag">EdTech</span>
            <span className="cs-tag">Academic</span>
            <span className="cs-tag">AI Product</span>
          </div>
          <h1 className="cs-hero__title">Aristotle — Rethinking how theories are built</h1>
          <p className="cs-hero__subtitle">
            Designing Aristotle — a visual theory-building workspace with an integrated AI copilot
            to help students explore, build, and experiment with theories.
          </p>
        </div>
      </header>

      {/* ── Cover ── */}
      <div className="cs-cover">
        <div className="container">
          <img
            src="/images/work-03.png"
            alt="Aristotle — AI-powered theory building platform for University of Milan"
            className="cs-cover__img"
            loading="eager"
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
                Aristotle is an AI-powered platform developed for the University of Milan to help
                students explore, build, and experiment with theories. The product brings together
                a visual theory-building workspace and an integrated AI copilot, making a complex
                academic process interactive.
              </p>
              <p>
                I led the project from discovery to design delivery, translating faculty expertise
                into a digital product while coordinating stakeholders and maintaining a structured,
                sprint-based delivery process.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 02 The challenge ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">02 — The challenge</span>
              <p>
                How do you turn a complex academic methodology into an intuitive digital experience?
              </p>
              <p>
                Faculty members taught theory-building concepts through books, examples, and manual
                exercises. Students needed a way to move beyond understanding existing theories and
                begin developing and experimenting with their own.
              </p>
              <p>
                The challenge was to understand the underlying concepts, beliefs, relationships, and
                attributes before translating them into product interactions — all within a 90-day
                deadline.
              </p>
            </div>
            <div className="vg-visual">
              <img
                src="/images/aristotle-challenge.png"
                alt="University lecture — students studying theory-building methodology"
                className="vg-img vg-img--rounded"
                loading="lazy"
              />
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 03 My role ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">03 — My role</span>
              <p>
                <strong>Role</strong><br />
                Design Lead &amp; Project Manager
              </p>
              <p>
                <strong>Ownership</strong><br />
                End to end — from discovery to design delivery
              </p>
              <h3>Responsibilities</h3>
              <ul>
                <li>Led product discovery and facilitated whiteboarding workshops</li>
                <li>Collaborated daily with faculty and the Product Owner to clarify academic concepts</li>
                <li>Translated requirements into user flows, interaction models, and high-fidelity designs</li>
                <li>Designed the visual theory-building canvas, node interactions, and AI copilot</li>
                <li>Coordinated cross-functional collaboration and weekly feature releases</li>
              </ul>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 04 The approach ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">04 — The approach</span>

              <h2>Start with understanding, not screens</h2>
              <p>
                The first challenge was understanding theory building, beliefs, and the academic
                logic behind the process. Rather than make assumptions, I kept faculty involved
                throughout discovery and design.
              </p>
              <p>
                Daily catch-ups helped us clarify concepts, validate our understanding, and keep
                everyone aligned. Their knowledge became the foundation for translating academic
                thinking into product requirements.
              </p>
            </div>
            <div className="vg-visual">
              <img
                src="/images/aristotle-whiteboard.png"
                alt="Theory-building workshop — whiteboard with wireframes and process mapping"
                className="vg-img vg-img--rounded"
                loading="lazy"
              />
            </div>
            <div className="vg-prose">

              <h2 style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>Build the experience around theory</h2>
              <p>
                The node-based canvas was a deliberate design decision. Each case contained important
                nodes and attributes that students needed to connect and explore.
              </p>
              <p>
                Instead of relying on static forms or a chat-only interface, the workspace made
                relationships visible and interactive. Students could build logic, add subjective
                beliefs, review theories, and experiment with different scenarios.
              </p>

              <h2 style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>Introduce AI as a thinking partner</h2>
              <p>
                The Theory Copilot brought an LLM-powered conversational experience directly into
                the workspace. Students could generate ideas and develop theories with AI assistance
                without losing the context of their visual work.
              </p>
              <p>
                The goal was to integrate AI into the theory-building process, rather than treat it
                as a separate destination.
              </p>

              <h2 style={{ marginTop: 'clamp(32px, 4vw, 48px)' }}>Deliver through structured collaboration</h2>
              <p>
                With only 90 days available, we established a structured sprint model from day one,
                targeting a new feature release every week. Continuous collaboration between design,
                the Product Owner, faculty, and the wider team helped us maintain alignment and make
                progress without losing sight of the product's academic foundations.
              </p>
            </div>
          </section>

        </div>

        {/* ── Screen Carousel ── full width, breaks out of 860 px container */}
        <div className="ar-showcase">
          <AristotleCarousel screens={AR_SCREENS} />
        </div>

        <div className="container">

          {/* ── 05 The outcome ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">05 — The outcome</span>
              <h2>From discovery to a working product in 90 days.</h2>
              <p>
                Aristotle progressed from discovery to a working product within the project timeline.
                The University of Milan shared an appreciation email following delivery.
              </p>
              <p>
                The project demonstrated how close stakeholder collaboration, structured delivery,
                and an AI-assisted interaction model can help translate a complex domain into a
                digital product.
              </p>
            </div>
          </section>

        </div>
      </article>

    </div>
  );
}
