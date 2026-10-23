import { useEffect } from 'react';
import '../../styles/vg-case.css';
import '../../styles/praise-case.css';

export function ConnectXCase() {
  useEffect(() => {
    document.title = 'ConnectX Praise — Making employee recognition easier to discover · Paras Bhatnagar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study cx-case-study">

      {/* ── Hero ── */}
      <header className="cs-hero">
        <div className="container cs-hero__inner">
          <div className="cs-hero__meta">
            <span className="cs-tag">Enterprise SaaS</span>
            <span className="cs-tag">Employee Experience</span>
            <span className="cs-tag">Product Design</span>
          </div>
          <h1 className="cs-hero__title">Making employee recognition easier to discover.</h1>
          <p className="cs-hero__subtitle">
            Redesigning the Praise experience in ConnectX to help employees recognize their colleagues
            through a more accessible, intuitive, and flexible workflow.
          </p>
        </div>
      </header>

      {/* ── Cover ── */}
      <div className="cs-cover">
        <div className="container">
          <img src="/images/cx-thumbnail.png" alt="NovaWorks ConnectX — Praise feature" className="cs-cover__img" />
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
                ConnectX is an enterprise platform that includes a Praise feature for employee
                recognition. I led the end-to-end design of the feature, improving how employees
                discovered, created, and shared praise within the platform.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 02 The challenge ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">02 — The challenge</span>
              <p>
                The existing Praise experience was difficult to discover and cumbersome to use.
                Scattered navigation made the feature hard to find, while a lengthy submission flow
                and limited skill-selection options created additional friction.
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
                Senior Product Designer
              </p>
              <p>
                <strong>Ownership</strong><br />
                End to end
              </p>
              <h3>Responsibilities</h3>
              <ul>
                <li>User conversations and problem identification</li>
                <li>Existing and proposed user-flow design</li>
                <li>Interaction design and form structure</li>
                <li>High-fidelity UI design</li>
                <li>Stakeholder alignment and usability testing</li>
              </ul>
              <p>
                I owned the Praise feature from initial discovery through design, validation, and
                delivery, collaborating with stakeholders to agree on the information presented in
                the experience.
              </p>
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 04 The problem ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">04 — The problem</span>
              <p>Conversations with existing users revealed three key issues:</p>
              <p>
                <strong>Low discoverability</strong><br />
                Users were unaware of the feature or struggled to find it within the platform.
              </p>
              <p>
                <strong>Fragmented workflow</strong><br />
                Scattered navigation and too many steps made creating praise less intuitive.
              </p>
              <p>
                <strong>Limited flexibility</strong><br />
                The predefined skill options lacked an easy way to find or add a relevant skill.
              </p>
            </div>
            <div className="vg-visual">
              <img src="/images/cx-problem.png" alt="ConnectX Praise — existing experience showing the old interface" className="praise-img praise-img--rounded" />
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 05 The solution ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">05 — The solution</span>
              <h2>01. Create a clearer entry point</h2>
              <p>
                Introduced a global Create Praise action, giving employees a more direct way to
                initiate recognition without relying on the previous navigation path.
              </p>
            </div>
            <div className="vg-visual">
              <img src="/images/cx-solution-dashboard.png" alt="ConnectX — Global Create Praise entry point in the platform navigation" className="praise-img praise-img--rounded" />
            </div>

            <div className="vg-prose" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
              <h2>02. Redesign the complete flow</h2>
              <p>
                Reworked the experience from start to finish, including the headline, action fields,
                and form structure. I proposed the information to display and aligned with
                stakeholders on the final direction.
              </p>
            </div>
            <div className="vg-visual">
              <img src="/images/cx-solution-flow.png" alt="ConnectX Praise — redesigned creation flow diagram" className="praise-img praise-img--rounded" />
            </div>

            <div className="vg-prose" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
              <h2>03. Improve the recognition experience</h2>
              <p>
                Redesigned the interface and skill-selection experience to address the usability
                issues identified through user conversations.
              </p>
            </div>
            <div className="vg-visual">
              <video
                src="/images/cx-solution-skills.mov"
                autoPlay
                loop
                muted
                playsInline
                className="praise-img praise-img--rounded"
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            <div className="vg-prose" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
              <h2>04. Validate before release</h2>
              <p>
                Conducted usability testing with selected employees. The redesigned experience
                received generally positive feedback before being implemented and released.
              </p>
            </div>
            <div className="vg-visual">
              <img src="/images/cx-validation.png" alt="ConnectX Praise — usability testing notes and participant feedback" className="praise-img praise-img--rounded" />
            </div>
          </section>

          <hr className="vg-divider" />

          {/* ── 06 Impact ── */}
          <section className="vg-section">
            <div className="vg-prose">
              <span className="vg-kicker">06 — Impact</span>
              <h2>From a hard-to-find feature to a released experience.</h2>
              <p>
                The redesigned Praise experience was implemented and released after stakeholder
                alignment and usability testing. It addressed the identified issues around
                discoverability, workflow complexity, and skill selection.
              </p>
              <p>
                The project demonstrates my ability to identify usability problems through user
                conversations, rethink an end-to-end feature, align stakeholders around design
                decisions, and take a solution through validation to production.
              </p>
            </div>
          </section>

        </div>
      </article>

    </div>
  );
}
