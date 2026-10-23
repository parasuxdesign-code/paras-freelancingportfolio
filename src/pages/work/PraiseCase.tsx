import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../data/content';
import '../../styles/praise-case.css';

export function PraiseCase() {
  useEffect(() => {
    document.title = 'Praise – Paras Bhatnagar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study">
      {/* ── Hero ── */}
      <header className="cs-hero">
        <div className="container cs-hero__inner">
          <div className="cs-hero__meta">
            <span className="cs-tag">B2B HR Platform</span>
            <span className="cs-tag">Employee Recognition</span>
          </div>
          <h1 className="cs-hero__title">Praise: Redesigning Employee Recognition at Scale</h1>
          <p className="cs-hero__subtitle">
            Redesigning the Praise feature within NovaWorks — a B2B HR platform — to make recognition
            more meaningful, visible, and easy to give.
          </p>
          <div className="cs-hero__details">
            <div className="cs-detail">
              <span className="cs-detail__label">Client</span>
              <span className="cs-detail__value">NovaWorks</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Industry</span>
              <span className="cs-detail__value">HR Technology</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Role</span>
              <span className="cs-detail__value">Lead Product Designer</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Platform</span>
              <span className="cs-detail__value">Web · Mobile</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero cover ── */}
      <div className="cs-cover">
        <div className="container">
          <img
            src="/images/hero-connectx.png"
            alt="NovaWorks (ConnectX) employee experience platform — hero artwork"
            className="cs-cover__img"
          />
        </div>
      </div>

      {/* ── Body ── */}
      <article className="cs-body">
        <div className="container">

          {/* ── Project overview ── */}
          <section className="praise-section">
            <div className="praise-prose">
              <h2>Project overview</h2>
              <p>
                Praise is an employee-recognition feature embedded within NovaWorks, a B2B HR platform
                used by organisations to manage people, performance, and culture. This case study focuses
                on redesigning the end-to-end Praise experience as part of a broader product redesign.
              </p>
              <p>
                As Lead Product Designer, I drove the design from problem framing and stakeholder
                alignment through to interaction design and final delivery. The central challenge was
                that recognition felt transactional and fragmented — praise was difficult to give,
                lacked visibility, and arrived without enough context to feel meaningful.
              </p>
              <p>
                The goal was to shift recognition from a one-off action to an integrated part of
                everyday workflows — by designing a seamless loop between creating, receiving, and
                engaging with praise.
              </p>
              <ul>
                <li>System-level redesign of the full Praise feature — not just individual screens</li>
                <li>Reduced friction in the creation flow, making praise feel spontaneous rather than effortful</li>
                <li>Improved visibility of recognition within the shared feed</li>
                <li>A more cohesive experience connecting creation, receipt, and engagement</li>
              </ul>
            </div>
            <div className="praise-visual">
              <img
                src="/images/praise/praise-overview.png"
                alt="30-second project overview: Redesigned an internal recognition system to make praise more meaningful, visible, and easy to give"
                className="praise-img praise-img--rounded"
              />
            </div>
          </section>

          {/* ── The problem ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>The problem</h2>
              <p>
                The existing Praise experience wasn't working. The creation flow was form-first — it
                felt like data entry rather than appreciation. Users had to navigate to someone's profile
                before they could even begin, and the multi-step process demanded structured effort at a
                moment that should feel spontaneous.
              </p>
              <p>
                Once created, praise blended into the activity feed like any other update. There was
                no strong visual signal, no reason given for the recognition, and no encouragement for
                others to engage. Meaningful contributions frequently went unnoticed — not because
                people didn't want to recognise them, but because the system made recognition too hard
                and too easy to miss.
              </p>
            </div>
            <div className="praise-visual-pair">
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-old-create.png"
                  alt="Old create praise experience showing form-first design with high cognitive load: multiple required fields and structured input prioritised over expression"
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">Old create experience — form-first, high cognitive load</figcaption>
              </figure>
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-old-read.png"
                  alt="Old read praise experience showing praise blending into the feed with low emotional signal, no clear reason for recognition, and weak social visibility"
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">Old read experience — low signal, praise blends into the feed</figcaption>
              </figure>
            </div>
            <div className="praise-visual">
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-old-flow.png"
                  alt="Old praise creation flow diagram showing six steps: search person, visit profile, click praise, write step 1, add skills step 2, share — annotated with 'too much effort for something meant to be spontaneous'"
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">The old flow required navigation to a profile before praise could even begin</figcaption>
              </figure>
            </div>
          </section>

          {/* ── The real problem ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>The real problem</h2>
              <p>
                What looked like a UI problem was, on closer inspection, a system problem. The existing
                experience assumed that recognition was a deliberate, scheduled activity — something
                you planned and completed. But meaningful recognition is almost always spontaneous. It
                happens at the moment something is felt, not when someone has time to fill in a form.
              </p>
              <p>
                Recognition depended too heavily on individual effort, social confidence, and
                visibility. If you weren't already comfortable initiating praise — if you didn't know
                exactly when it was appropriate, or what to write — the system offered no help.
                The result was that quieter or less visible contributors were systematically
                under-recognised, not because their work was less valuable, but because the system
                made recognition a product of personality rather than impact.
              </p>
            </div>
          </section>

          {/* ── From user friction to design decisions ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>From user friction to design decisions</h2>
              <p>
                The design decisions followed directly from the patterns in user feedback. Rather than
                solving individual interface complaints, the goal was to address the underlying
                conditions that made each problem possible.
              </p>
            </div>
            <div className="praise-visual">
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-friction-decisions.png"
                  alt="Three-column diagram mapping what users said to why it was happening to the design decision that addressed it. Five rows cover: giving praise feels forced, unclear when to use praise, creation feels like a form, cluttered praise card, and contributions going unnoticed."
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">Each design decision traced to a specific user experience and its root cause</figcaption>
              </figure>
            </div>
          </section>

          {/* ── Redesign banner ── */}
          <div className="praise-banner">
            <img
              src="/images/praise/praise-redesign-banner.png"
              alt="Let's peek into the redesign — NovaWorks"
              className="praise-img"
            />
          </div>

          {/* ── Rethinking how praise is created ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>Rethinking how praise is created</h2>
              <p>
                The redesigned creation experience had a clear brief: reduce the effort required while
                helping people express meaningful appreciation with real context. This meant removing
                mandatory structure where it added friction, and adding optional guidance where it
                reduced blank-page anxiety.
              </p>
              <p>
                The key changes were: making praise a global action (always one click away, regardless
                of where you are in the product), introducing optional prompts and suggested headlines
                to help people get started, and capturing the related project at creation time so
                context doesn't have to be reconstructed later. Skills tagging transforms a moment
                of recognition into a durable signal connected to a person's professional profile.
              </p>
            </div>
            <div className="praise-visual">
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-new-flow.png"
                  alt="New praise creation flow: Create praise (global action) branches to Add/select person and optional Headlines, then Write praise with optional Related project, then Add relevant skills, then Share"
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">The redesigned flow — praise is always one click away, context is captured at creation</figcaption>
              </figure>
            </div>
          </section>

          {/* ── Exploration 1: Create experience ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>Exploration 1: Create praise experience</h2>
              <p>
                Three creation patterns were explored before landing on the final direction.
              </p>
              <p>
                A <strong>centre modal</strong> was familiar and easy to implement, but pulled users
                out of the context where the impulse to give praise was felt. It felt transactional —
                like filling in a form — and translated poorly to mobile.
              </p>
              <p>
                A <strong>dedicated creation page</strong> offered more space for guidance and prompts,
                but required navigation away from the current work. It made praise feel heavy and
                deliberate, working against the in-the-moment nature of recognition.
              </p>
              <p>
                A <strong>side panel</strong> was the right balance. It preserves context while
                creating praise, feels lightweight but expressive, scales naturally to include optional
                elements, and maps to a bottom sheet on mobile. Praise remains one click away as a
                global action — an extension of the work, not an interruption to it.
              </p>
            </div>
            <div className="praise-visual">
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-create-iterations.png"
                  alt="Three creation flow explorations: centre modal (rejected — felt transactional, poor mobile translation), dedicated creation page (rejected — high commitment, broke in-the-moment nature), and side panel creation (selected — preserves context, feels lightweight, maps to bottom sheet on mobile)"
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">Three directions explored — the side panel preserved context and supported spontaneous recognition</figcaption>
              </figure>
            </div>
          </section>

          {/* ── Exploration 2: Read experience ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>Exploration 2: Read experience iterations</h2>
              <p>
                The read experience needed to make recognition immediately visible without
                overwhelming the feed. Three directions were explored.
              </p>
              <p>
                A <strong>compact praise card</strong> kept visual separation from other feed items and
                was easy to implement, but pulled users out of the ambient, social nature of the feed.
                Praise felt transactional, and scrolling continuity was broken.
              </p>
              <p>
                A <strong>context-rich feed item</strong> kept praise within the feed and reduced
                interaction cost, but praise blended too much with regular updates. The emotional
                intent wasn't immediately legible, and there was no strong cue that "this is
                appreciation."
              </p>
              <p>
                The <strong>enhanced feed card</strong> was the final direction. Recognition is
                immediately visible and emotionally clear. Strong recipient emphasis reinforces the
                moment of being praised. The hierarchy highlights appreciation without overpowering
                the feed — celebratory but natural in context, supporting both quick scanning and
                deeper reading.
              </p>
            </div>
            <div className="praise-visual">
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-read-iterations.png"
                  alt="Three read experience iterations: compact praise card (rejected — broke feed continuity), context-rich feed item (rejected — lacked strong emotional signal), and enhanced feed card (selected — recognition immediately visible, strong recipient emphasis, balanced hierarchy)"
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">Read experience iterations — the enhanced feed card balanced emotional clarity with feed cohesion</figcaption>
              </figure>
            </div>
            <div className="praise-visual" style={{ marginTop: '24px' }}>
              <figure className="praise-figure">
                <img
                  src="/images/praise/praise-card-colors.png"
                  alt="Enhanced praise card shown in five colour variations — blue, peach/orange, green, purple, and pink — exploring how the card's accent colour could reflect the emotional tone of recognition"
                  className="praise-img praise-img--rounded"
                />
                <figcaption className="praise-caption">Colour explorations for the enhanced praise card — finding the right emotional register</figcaption>
              </figure>
            </div>
          </section>

          {/* ── The Praise loop ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>The Praise loop: From creation to recognition</h2>
              <p>
                The redesign was built around an end-to-end loop rather than isolated screens. Each
                stage needed to connect clearly to the next.
              </p>
              <ul>
                <li>
                  <strong>Creating praise</strong> — a global action, always one click away. The
                  side panel keeps you in context. Optional prompts and headlines reduce blank-page
                  anxiety without scripting the message. A related project can be linked at
                  creation time.
                </li>
                <li>
                  <strong>Receiving praise</strong> — the recipient is notified and sees the full
                  praise card in their feed. The enhanced card design ensures the moment of recognition
                  is visible and emotionally clear, not buried in updates.
                </li>
                <li>
                  <strong>Understanding the context</strong> — the linked project and demonstrated
                  skills give the recognition meaning beyond the headline. Praise is not just a
                  moment — it becomes a durable signal attached to real work.
                </li>
                <li>
                  <strong>Engaging with recognition</strong> — others in the team can see, like, and
                  comment. Recognition extends beyond the giver and receiver, creating a shared
                  moment that reinforces the culture of appreciation.
                </li>
              </ul>
            </div>

            {/* Prototype videos — placed here, closest to the interaction they demonstrate */}
            <div className="praise-prototypes">
              <h3 className="praise-prototypes__label">Prototype</h3>
              <p className="praise-prototypes__desc">
                These recordings show the interaction in motion — the side panel creation flow and
                the enhanced feed card as they behave in context.
              </p>
              <div className="praise-video-pair">
                <figure className="praise-figure">
                  <video
                    src="/images/praise/praise-prototype-1.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="praise-video"
                    aria-label="Prototype recording 1: praise creation via side panel"
                  />
                  <figcaption className="praise-caption">Side panel creation — global action, in-context flow</figcaption>
                </figure>
                <figure className="praise-figure">
                  <video
                    src="/images/praise/praise-prototype-2.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="praise-video"
                    aria-label="Prototype recording 2: enhanced praise card in the feed"
                  />
                  <figcaption className="praise-caption">Enhanced feed card — recognition visible, emotionally clear</figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* ── Impact and outcomes ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-prose praise-prose--wide">
              <h2>Impact and outcomes</h2>
              <p>
                Formal quantitative metrics were not captured for this project, so I won't claim
                validated business results. What the redesign delivered was a measurable improvement
                in the coherence and quality of the experience — at the product, user, and system level.
              </p>

              <h3>Product impact</h3>
              <ul>
                <li>Praise was elevated from a secondary feature to a first-class action with a clear entry point throughout the product</li>
                <li>The enhanced card design gave recognition a distinct visual presence in the feed, without requiring a separate view</li>
                <li>The side panel creation pattern scaled consistently from desktop to mobile (bottom sheet)</li>
              </ul>

              <h3>User impact</h3>
              <ul>
                <li>Creation effort was substantially reduced — fewer steps, no mandatory navigation to a profile, optional guidance to overcome blank-page anxiety</li>
                <li>Recipients receive recognition that feels considered, with visible context and demonstrated skills</li>
                <li>Teams see recognition in a shared feed, creating moments of collective acknowledgement</li>
              </ul>

              <h3>System impact</h3>
              <ul>
                <li>Recognition is no longer dependent on individual confidence or social visibility — the system supports the behaviour rather than requiring it</li>
                <li>Praise is connected to real work via linked projects and skills, making it a durable professional signal rather than a one-off message</li>
                <li>The loop between creation, receipt, and engagement creates a coherent experience that scales with the organisation</li>
              </ul>
            </div>
          </section>

          {/* ── What I learned ── */}
          <section className="praise-section praise-section--full">
            <div className="praise-visual">
              <img
                src="/images/praise/praise-reflections.png"
                alt="Reflections: designing for recognition is about timing, context, and emotional nuance. Balancing visibility with restraint. Thinking in systems. Next steps: validate through behavioural metrics, explore private vs public recognition, understand team dynamics."
                className="praise-img praise-img--rounded"
              />
            </div>
            <div className="praise-prose praise-prose--wide" style={{ marginTop: '48px' }}>
              <h2>What I learned</h2>
              <p>
                This project reinforced that designing for recognition goes beyond interface decisions
                — it's about timing, context, and emotional nuance. Small choices in how praise is
                surfaced can significantly influence how it is perceived and valued.
              </p>
              <p>
                A key challenge was balancing visibility with restraint. Making recognition visible
                without making it feel performative required a more subtle approach — where the
                experience supports authenticity rather than amplifying noise. The difference between
                a praise card that feels celebratory and one that feels forced comes down to hierarchy,
                restraint, and where emphasis is placed.
              </p>
              <p>
                Thinking in terms of a system — a loop between creation, visibility, and engagement —
                helped move the solution beyond isolated features toward something more cohesive and
                scalable. Designing one screen at a time would have missed the conditions that made
                recognition difficult in the first place.
              </p>
              <p>
                If I were to take this further, I would focus on validating impact through behavioural
                metrics, exploring the balance between private and public recognition, and
                understanding how these patterns evolve across different team dynamics and
                organisational cultures.
              </p>
            </div>
          </section>

        </div>
      </article>

      {/* ── CTA ── */}
      <div className="cs-cta">
        <div className="container cs-cta__inner">
          <p className="cs-cta__label">Want to see more?</p>
          <h2 className="cs-cta__title">Full prototype and design files available on request.</h2>
          <a href={LINKS.tally} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
            Get in touch
            <span className="material-symbols-rounded">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* ── Project nav ── */}
      <div className="cs-nav-projects">
        <div className="container cs-nav-projects__inner">
          <Link to="/work/connectx" className="cs-prev">
            <span className="cs-next__label">Previous project</span>
            <span className="cs-next__name">NovaWorks (ConnectX)</span>
            <span className="material-symbols-rounded">arrow_back</span>
          </Link>
          <Link to="/work/tol" className="cs-next">
            <span className="cs-next__label">Next project</span>
            <span className="cs-next__name">TOL — Trading Online</span>
            <span className="material-symbols-rounded">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
