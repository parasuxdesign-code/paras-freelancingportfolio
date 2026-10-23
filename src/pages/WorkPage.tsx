import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const projects = [
  {
    id: 'connectx',
    title: 'ConnectX',
    desc: 'Redesigned the core banking product experience — from product strategy to design system.',
    image: '/images/hero-connectx.png',
    tags: ['Fintech', 'Enterprise'],
    href: '/work/connectx',
  },
  {
    id: 'tol',
    title: 'TOL — Trading Online',
    desc: 'Making European institutional investing easier to understand and easier to act on.',
    image: '/images/work-09.png',
    tags: ['Investment', 'SaaS'],
    href: '/work/tol',
  },
  {
    id: 'veggie-grill',
    title: 'Veggie Grill',
    desc: 'Redesigning the digital ordering and loyalty experience for a fast-growing restaurant brand.',
    image: '/images/work-04.png',
    tags: ['Consumer', 'Restaurant tech'],
    href: '/work/veggie-grill',
  },
  {
    id: 'pangea',
    title: 'Pangea',
    desc: 'A more human way to communicate across languages — AI-powered and built for real people.',
    image: '/images/work-02.png',
    tags: ['AI', 'Consumer'],
    href: '/work/pangea',
  },
];

export function WorkPage() {
  return (
    <div className="site-content site-content--visible">
      <Header />
      <main id="main" tabIndex={-1} style={{ paddingTop: 'calc(var(--header-h) + 56px)', paddingBottom: 'var(--section-py)' }}>
        <div className="container">
          {/* Page heading */}
          <div style={{ marginBottom: 48 }}>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: 10,
              }}
            >
              Work
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 480 }}>
              Selected projects across product design, systems and strategy.
            </p>
          </div>

          {/* 2-col grid */}
          <div
            className="work-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '48px 24px',
            }}
          >
            {projects.map(proj => (
              <Link
                key={proj.id}
                to={proj.href}
                className="proj-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="proj-card__img-wrap">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                  />
                </div>
                <h2 className="proj-card__title">{proj.title}</h2>
                <p className="proj-card__desc">{proj.desc}</p>
                <div className="proj-card__meta">
                  {proj.tags.map(t => (
                    <span key={t} className="proj-card__tag">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Confidential note */}
          <div
            style={{
              marginTop: 48,
              padding: '14px 20px',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--border)',
            }}
          >
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }}>lock</span>
              Some case studies require an NDA. Reach out to request access.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
