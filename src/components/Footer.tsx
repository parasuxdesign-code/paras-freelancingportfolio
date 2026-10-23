export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        background: 'var(--bg-subtle)',
        paddingTop: 20,
        paddingBottom: 28,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}> {/* WCAG 1.4.3 */}
          © {year} Paras Bhatnagar
        </span>
        <button
          onClick={scrollTop}
          aria-label="Back to top"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)', /* WCAG 1.4.3 */
            /* 44px tall touch target per WCAG 2.5.5 */
            padding: '12px 8px',
            minHeight: 44,
            transition: 'color 150ms ease',
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: 14 }}
          >
            arrow_upward
          </span>
          Top
        </button>
      </div>
    </footer>
  );
}
