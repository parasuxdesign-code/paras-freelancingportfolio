import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 'pangea',
    title: 'Pangea Design System',
    desc: 'Building a shared design language for scale.',
    img: '/images/work-02.png',
    href: '/work/pangea',
    tags: ['Travel', 'B2C'],
  },
  {
    id: 'tol',
    title: 'Iccera Invest',
    desc: 'Making European institutional investing easier to understand and easier to act on.',
    img: '/images/tol-cover.png',
    href: '/work/tol',
    tags: ['Fintech', 'B2B'],
  },
  {
    id: 'aristotle',
    title: 'Aristotle',
    desc: 'Rethinking how theories are built.',
    img: '/images/work-03.png',
    href: '/work/aristotle',
    tags: ['Edtech', 'B2B'],
  },
  {
    id: 'connectx',
    title: 'NovaWorks (ConnectX)',
    desc: 'Building a scalable product experience for modern banking — from product strategy to design system.',
    img: '/images/cx-thumbnail.png',
    href: '/work/connectx',
    tags: ['HRMS', 'B2C'],
  },
  {
    id: 'veggie-grill',
    title: 'Veggie Grill',
    desc: 'Redesigning the digital ordering and loyalty experience for a fast-growing restaurant brand.',
    img: '/images/vg-thumbnail.png',
    href: '/work/veggie-grill',
    tags: ['Restaurant tech', 'Loyalty', 'B2B'],
  },
  ];

function ProjectCard({
  project,
  reduced,
}: {
  project: typeof PROJECTS[0];
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isExternal = project.href.startsWith('http');
  const sharedProps = {
    className: "proj-card",
    style: { display: 'block', textDecoration: 'none', color: 'inherit' } as React.CSSProperties,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  const inner = (
    <>
      <div className="proj-card__img-wrap">
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          style={{
            transform: (!reduced && hovered) ? 'scale(1.03)' : 'scale(1)',
            transition: reduced ? 'none' : 'transform 320ms cubic-bezier(0.0, 0, 0.2, 1)',
          }}
        />
      </div>
      <h3 className="proj-card__title">{project.title}</h3>
      <p className="proj-card__desc">{project.desc}</p>
      <div className="proj-card__meta">
        {project.tags.map(t => (
          <span key={t} className="proj-card__tag">{t}</span>
        ))}
      </div>
    </>
  );
  return isExternal ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" {...sharedProps}>{inner}</a>
  ) : (
    <Link to={project.href} {...sharedProps}>{inner}</Link>
  );
}

export function Work() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <section
      id="work"
      ref={ref}
      className="section"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: reduced ? 'none' : 'opacity 450ms ease, transform 450ms ease',
      }}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Work</h2>
          <Link to="/work" className="section-link">
            View all
            <span className="icon" aria-hidden="true" style={{ fontSize: 16 }}>arrow_forward</span>
          </Link>
        </div>

        {/* 2-col grid — className enables global mobile-collapse rule */}
        <div
          className="work-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}
        >
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
