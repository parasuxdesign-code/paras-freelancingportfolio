import { useEffect } from 'react';
import '../../styles/vg-case.css';

export function PangeaCase() {
  useEffect(() => {
    document.title = 'Pangea Design System · Paras Bhatnagar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study">

      {/* ── A. Hero ── */}
      <header className="cs-hero">
        <div className="container cs-hero__inner">
          <div className="cs-hero__meta">
            <span className="cs-tag">Design System</span>
            <span className="cs-tag">Pangea</span>
          </div>
          <h1 className="cs-hero__title">Pangea Design System</h1>
          <p className="cs-hero__subtitle">
            Building a shared design language for scale.
          </p>
          <div className="cs-hero__details">
            <div className="cs-detail">
              <span className="cs-detail__label">Role</span>
              <span className="cs-detail__value">Design System Lead</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Scope</span>
              <span className="cs-detail__value">Foundations · Tokens · Components · Documentation</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Platform</span>
              <span className="cs-detail__value">Figma</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero cover ── */}
      <div className="cs-cover">
        <div className="container">
          <img
            src="/images/work-02.png"
            alt="Pangea Design System — token architecture and component library"
            className="cs-cover__img"
            loading="eager"
          />
        </div>
      </div>

      {/* ── Body ── */}
      <article className="cs-body">
        <div className="container">

          {/* ── B. Overview ── */}
          <section className="vg-section" style={{ paddingTop: 0 }}>
            <div className="vg-prose">
              <span className="vg-kicker">Overview</span>
              <h2>From inconsistency to a shared design language</h2>
              <p>
                As Pangea evolved, inconsistencies across the product made it harder to maintain a
                cohesive experience and scale design efficiently. There was no established design
                system, and developers were relying on hard-coded hexadecimal colour values instead
                of a structured token architecture.
              </p>
              <p>
                I built the design system from the ground up, translating the existing brand
                guidelines into a reusable, tokenised UI foundation. The goal was to establish
                consistency across the product while creating a shared language between design
                and development.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── C. Challenge ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">The challenge</span>
              <h2>How might we create a consistent, scalable design foundation that helps design and engineering move faster together?</h2>
              <p>
                The product was growing, but its interface lacked consistency. Without design tokens,
                reusable components, and shared conventions, even basic visual changes could become
                difficult to maintain.
              </p>
              <p>
                The problem extended beyond the UI. Design and development needed a common
                understanding of design decisions, naming conventions, and implementation rules.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── D. Approach ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">My approach</span>
              <h2>A systematic foundation built in four stages</h2>
            </div>

            <div className="pg-stages">
              {/* Stage 01 */}
              <div className="pg-stage">
                <span className="pg-stage__num">01</span>
                <h3 className="pg-stage__title">Establishing the foundations</h3>
                <p className="pg-stage__body">
                  I translated Pangea's existing brand book into a systematic design foundation
                  without changing the established brand identity. This included typography, colour
                  scales, spacing, border radius, grid, and core design principles — the rules that
                  would govern the wider component library.
                </p>
                <figure className="pg-stage__fig">
                  <img
                    src="/images/pangea-atomic-design.png"
                    alt="Atomic Design Principles — design tokens, atoms, molecules, organisms, templates, pages"
                    className="vg-img"
                    loading="lazy"
                  />
                </figure>
              </div>

              {/* Stage 02 */}
              <div className="pg-stage">
                <span className="pg-stage__num">02</span>
                <h3 className="pg-stage__title">Building a three-layer token architecture</h3>
                <p className="pg-stage__body">
                  I structured the design tokens into three layers to separate raw values from their
                  intended use, creating a clearer relationship between foundational values,
                  interface meaning, and component implementation.
                </p>
                <div className="pg-token-layers">
                  <div className="pg-token-layer">
                    <span className="pg-token-layer__label">Literal</span>
                    <p>Foundational values such as colour scales and spacing.</p>
                  </div>
                  <div className="pg-token-layer">
                    <span className="pg-token-layer__label">Contextual</span>
                    <p>Purpose-driven values for interface elements and their roles.</p>
                  </div>
                  <div className="pg-token-layer">
                    <span className="pg-token-layer__label">Component</span>
                    <p>Values assigned to specific components for consistent styling.</p>
                  </div>
                </div>
                <figure className="pg-stage__fig">
                  <img
                    src="/images/pangea-token-arch.png"
                    alt="Semantic variables table and colour-contrast check — Pangea Design System"
                    className="vg-img"
                    loading="lazy"
                  />
                </figure>
              </div>

              {/* Stage 03 */}
              <div className="pg-stage">
                <span className="pg-stage__num">03</span>
                <h3 className="pg-stage__title">Creating a reusable component library</h3>
                <p className="pg-stage__body">
                  With the foundations in place, I built reusable components — inputs, icons, radio
                  buttons, checkboxes, date pickers, dropdowns, tags, and cards. Each component
                  included variants and states to support consistent behaviour across different
                  product contexts.
                </p>
                <figure className="pg-stage__fig">
                  <img
                    src="/images/pangea-components.png"
                    alt="Reusable component library — buttons, inputs, dropdowns, date picker, toggles, radio buttons, checkboxes, chips, and pagination"
                    className="vg-img"
                    loading="lazy"
                  />
                </figure>
              </div>

              {/* Stage 04 */}
              <div className="pg-stage">
                <span className="pg-stage__num">04</span>
                <h3 className="pg-stage__title">Aligning design and development</h3>
                <p className="pg-stage__body">
                  Documentation was only one part of the process. I worked directly with developers
                  throughout the build, aligned naming conventions, and repeatedly walked the team
                  through the system. By involving engineering in the foundation itself, I helped
                  establish a shared understanding of how tokens and components should be used —
                  rather than treating the design system as a handoff artifact.
                </p>
                <figure className="pg-stage__fig">
                  <img
                    src="/images/pangea-design-dev.png"
                    alt="Design system in Figma alongside Button.tsx in VS Code — design and development aligned"
                    className="vg-img"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── E. Outcome ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">The outcome</span>
              <h2>A common design language that supported faster execution</h2>
              <p>
                The process between design and development became more synchronised, giving both
                teams a shared vocabulary for discussing and implementing the interface.
              </p>
              <p>
                The system established a consistent foundation for building new screens, maintaining
                UI patterns, and iterating more efficiently.
              </p>
              <blockquote className="vg-pullquote">
                The key outcome was alignment: a common design language that supported faster
                execution and iteration as Pangea continued to grow.
              </blockquote>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
