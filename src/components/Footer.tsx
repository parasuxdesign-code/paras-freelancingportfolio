import { NAV_ITEMS, SOCIALS } from '../data/content';

interface FooterProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onToTop: () => void;
}

export function Footer({ onNavClick, onToTop }: FooterProps) {
  return (
    <footer
      style={{
        maxWidth: 1280,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(40px,5vw,56px) clamp(20px,3vw,40px) 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '.02em',
              color: '#F2F3F7',
            }}
          >
            Paras Bhatnagar
          </span>
          <span style={{ fontSize: 13, color: '#7A7C88' }}>
            Product Designer
          </span>
        </div>

        <nav aria-label="Footer">
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="footer-link"
                  onClick={onNavClick}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#9698A6',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            gap: 8,
          }}
        >
          {SOCIALS.map((so) => (
            <li key={so.label}>
              <a
                href={so.href}
                className="social-btn"
                aria-label={so.label}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid rgba(255,255,255,.09)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#C1C3CD',
                }}
              >
                {so.short}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,.07)',
        }}
      >
        <span style={{ fontSize: 12, color: '#61636F' }}>
          © 2026 Paras Bhatnagar. All rights reserved.
        </span>
        <button
          type="button"
          className="top-btn"
          onClick={onToTop}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            minHeight: 44,
            padding: '10px 18px',
            borderRadius: 16,
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.09)',
            color: '#C1C3CD',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
