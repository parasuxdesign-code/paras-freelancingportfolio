interface ProjectCardProps {
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  delay?: number;
}

export function ProjectCard({ num, title, description, tags, image, href, delay = 0 }: ProjectCardProps) {
  return (
    <a
      href={href}
      className="project-card"
      aria-label={`${title} — case study`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="project-card__img img-placeholder">
        <img src={image} alt={`${title} project thumbnail`} loading="lazy" />
        <div className="project-card__arrow-wrap" aria-hidden="true">
          <span className="material-symbols-rounded project-card__arrow">arrow_outward</span>
        </div>
      </div>

      {/* Content */}
      <div className="project-card__body">
        <span className="project-card__num">{num}</span>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tags">
          {tags.map(t => (
            <span key={t} className="project-card__tag">{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .project-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }
        .project-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .project-card__img {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: var(--bg-inset);
          overflow: hidden;
        }
        .project-card__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .project-card:hover .project-card__img img {
          transform: scale(1.03);
        }
        .project-card__arrow-wrap {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .project-card:hover .project-card__arrow-wrap {
          transform: translate(2px, -2px);
          box-shadow: var(--shadow-sm);
        }
        .project-card__arrow {
          font-size: 16px;
          color: var(--text-primary);
        }
        .project-card__body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .project-card__num {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-secondary); /* WCAG 1.4.3 */
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .project-card__title {
          font-size: 1rem;
          font-weight: 650;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .project-card__desc {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-secondary);
          flex: 1;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .project-card__tag {
          font-size: 0.6875rem;
          font-weight: 500;
          color: var(--text-secondary); /* WCAG 1.4.3 */
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 3px 10px;
          letter-spacing: 0.01em;
        }
      `}</style>
    </a>
  );
}
