import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LINKS } from '../../data/content';

export function PromotewallCase() {
  useEffect(() => {
    document.title = 'PromoteWall · Paras Bhatnagar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study">
      <header className="cs-hero">
        <div className="container cs-hero__inner">
          <div className="cs-hero__meta">
            <span className="cs-tag">AI · Side project</span>
            <span className="cs-tag">Personal</span>
          </div>
          <h1 className="cs-hero__title">PromoteWall</h1>
          <p className="cs-hero__subtitle">
            An AI-powered experiment in promotional content — where machine intelligence meets design craft.
          </p>
          <div className="cs-hero__details">
            <div className="cs-detail">
              <span className="cs-detail__label">Role</span>
              <span className="cs-detail__value">Designer & Builder</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Type</span>
              <span className="cs-detail__value">Personal experiment</span>
            </div>
            <div className="cs-detail">
              <span className="cs-detail__label">Focus</span>
              <span className="cs-detail__value">AI, Product design, Indie building</span>
            </div>
          </div>
        </div>
      </header>

      <div className="cs-cover">
        <div className="container">
          <img src="/images/work-17.png" alt="PromoteWall interface" className="cs-cover__img" />
        </div>
      </div>

      <article className="cs-body">
        <div className="container cs-body__inner">
          <div className="cs-prose">
            <h2>Overview</h2>
            <p>
              PromoteWall is a personal AI project — an experiment in building at the intersection of
              design craft and machine intelligence. It explores how AI can assist in creating
              promotional content that feels intentional rather than generic.
            </p>

            <h2>Why I built it</h2>
            <p>
              I have always been curious about how AI changes the role of the designer.
              PromoteWall was my way to explore this hands-on — to understand where AI genuinely helps,
              where it falls short, and what design decisions are still irreducibly human.
            </p>

            <h2>What I learned</h2>
            <ul>
              <li>AI accelerates generation, but human judgment is still the bottleneck of quality</li>
              <li>Constraint is a feature — guardrails make AI outputs more useful, not less</li>
              <li>Building solo across design and implementation surfaces different problems than team work</li>
              <li>The most interesting design problems in AI are about trust and transparency, not just UI</li>
            </ul>

            <h2>Status</h2>
            <p>
              This is an ongoing experiment. I continue to iterate on it as my understanding of
              AI-assisted design deepens. It remains a personal laboratory rather than a product.
            </p>
          </div>

          <aside className="cs-sidebar">
            <div className="cs-work-grid">
              <img src="/images/work-17.png" alt="PromoteWall main view" />
              <img src="/images/work-16.png" alt="AI generation flow" />
              <img src="/images/work-15.png" alt="Output gallery" />
              <img src="/images/work-14.png" alt="Settings and controls" />
            </div>
          </aside>
        </div>
      </article>

      <div className="cs-cta">
        <div className="container cs-cta__inner">
          <p className="cs-cta__label">Curious about this?</p>
          <h2 className="cs-cta__title">Happy to talk through AI and design at any depth.</h2>
          <a href={LINKS.tally} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
            Let's talk
            <span className="material-symbols-rounded">arrow_forward</span>
          </a>
        </div>
      </div>

      <div className="cs-nav-projects">
        <div className="container cs-nav-projects__inner">
          <Link to="/work/pangea" className="cs-prev">
            <span className="material-symbols-rounded">arrow_back</span>
            <span className="cs-next__label">Previous</span>
            <span className="cs-next__name">Pangea</span>
          </Link>
          <Link to="/work/connectx" className="cs-next">
            <span className="cs-next__label">Back to start</span>
            <span className="cs-next__name">ConnectX</span>
            <span className="material-symbols-rounded">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
