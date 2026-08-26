import { useMemo, useRef, useState } from 'react';
import { Nav } from './components/Nav';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { About } from './components/About';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { ExploreCTA } from './components/ExploreCTA';
import { Footer } from './components/Footer';

import { PROJECTS } from './data/content';
import { buildRows } from './data/buildRows';

import { useReducedMotion } from './hooks/useReducedMotion';
import { useViewportWidth } from './hooks/useViewportWidth';
import { useReveal } from './hooks/useReveal';
import { useCursor } from './hooks/useCursor';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useMarquee } from './hooks/useMarquee';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Optional tuning knobs, mirroring the original DC component props.
interface AppProps {
  enableCursor?: boolean;
  showStats?: boolean;
  autoScroll?: boolean;
  scrollSpeed?: number;
  railHeight?: number;
}

export default function App({
  enableCursor = true,
  showStats = true,
  autoScroll = true,
  scrollSpeed = 7,
  railHeight = 360,
}: AppProps) {
  const reduced = useReducedMotion();
  const width = useViewportWidth();
  const isDesktop = width >= 900;

  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // Row height shrinks on small screens (matches DC: w < 640 -> 280).
  const rowHeight = width < 640 ? 280 : railHeight;
  const rows = useMemo(
    () => buildRows(PROJECTS, rowHeight),
    [rowHeight]
  );

  const { onNavClick, toTop } = useSmoothScroll(reduced, () =>
    setMenuOpen(false)
  );

  useReveal(reduced);
  useScrollSpy(navRef);
  useCursor(enableCursor, reduced);
  useMarquee(railRef, pausedRef, { reduced, autoScroll, scrollSpeed });

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100vw',
        position: 'relative',
        background: '#05050A',
        overflow: 'hidden',
      }}
    >
      {/* Ambient radial glows */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -260,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1100,
          height: 700,
          pointerEvents: 'none',
          background:
            'radial-gradient(50% 50% at 50% 50%,rgba(86,170,10,.28),rgba(86,170,10,0) 70%)',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 1400,
          right: -200,
          width: 760,
          height: 760,
          pointerEvents: 'none',
          background:
            'radial-gradient(50% 50% at 50% 50%,rgba(70,150,10,.16),rgba(70,150,10,0) 70%)',
        }}
      />

      <a href="#work" className="skip-link">
        Skip to content
      </a>

      <Nav
        navRef={navRef}
        isDesktop={isDesktop}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onNavClick={onNavClick}
      />

      <MobileMenu open={menuOpen} onNavClick={onNavClick} />

      <main
        id="top"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 16px 0',
          gap: 0,
        }}
      >
        <Hero showStats={showStats} onNavClick={onNavClick} />
        <Work
          railRef={railRef}
          rows={rows}
          onPause={() => {
            pausedRef.current = true;
          }}
          onResume={() => {
            pausedRef.current = false;
          }}
        />
        <About onNavClick={onNavClick} />
        <Services />
        <Testimonials reduced={reduced} />
        <Contact />
        <ExploreCTA onNavClick={onNavClick} />
        <Footer onNavClick={onNavClick} onToTop={toTop} />
      </main>
    </div>
  );
}
