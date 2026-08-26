import { type RefObject } from 'react';
import { NAV_ITEMS } from '../data/content';

interface NavProps {
  navRef: RefObject<HTMLElement>;
  isDesktop: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Nav({
  navRef,
  isDesktop,
  menuOpen,
  onToggleMenu,
  onNavClick,
}: NavProps) {
  const paintDot = (el: HTMLElement | null, on: boolean) => {
    const dot = el?.querySelector<HTMLElement>('[data-navdot]');
    if (!dot) return;
    dot.style.opacity = on ? '1' : '0';
    dot.style.transform = on ? 'translate(-50%,0)' : 'translate(-50%,10px)';
  };

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 16,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <nav
        aria-label="Primary"
        ref={navRef as RefObject<HTMLElement>}
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 1180,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between',
          padding: '10px 12px 10px 16px',
          borderRadius: 32,
          background: 'rgba(13,13,20,.72)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          border: '1px solid rgba(255,255,255,.07)',
          boxShadow:
            '0 1px 0 rgba(255,255,255,.04) inset,0 18px 40px -28px rgba(0,0,0,.9)',
          transition:
            'background 300ms ease,box-shadow 300ms ease,border-color 300ms ease',
          animation: 'om-rise .7s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        <a
          href="#top"
          aria-label="Paras Bhatnagar, home"
          onClick={onNavClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: 'inherit',
            flex: 'none',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(160deg,#1B1C29,#101018)',
              border: '1px solid rgba(255,255,255,.1)',
              color: '#F2F3F7',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '.02em',
              boxShadow: '0 0 20px -8px rgba(121,210,8,.7)',
            }}
          >
            PB
          </span>
        </a>

        {isDesktop && (
          <>
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="nav-link"
                    data-navlink={item.id}
                    onClick={onNavClick}
                    onMouseEnter={(e) => paintDot(e.currentTarget, true)}
                    onMouseLeave={(e) =>
                      paintDot(
                        e.currentTarget,
                        e.currentTarget.dataset.active === '1'
                      )
                    }
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 18px',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#9698A6',
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      data-navdot="1"
                      style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: -13,
                        width: '66%',
                        height: 22,
                        borderRadius: '50%',
                        background:
                          'radial-gradient(60% 100% at 50% 100%,#8FE02E,rgba(121,210,8,.55) 55%,rgba(121,210,8,0))',
                        filter: 'blur(7px)',
                        opacity: 0,
                        transform: 'translate(-50%,10px)',
                        transition:
                          'opacity 200ms cubic-bezier(.16,1,.3,1),transform 200ms cubic-bezier(.16,1,.3,1)',
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flex: 'none',
              }}
            >
              <a
                href="#contact"
                className="nav-cta"
                onClick={onNavClick}
                data-cursor="Explore"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 24px',
                  borderRadius: 18,
                  background: 'linear-gradient(180deg,#171827,#0D0E16)',
                  border: '1px solid rgba(121,210,8,.45)',
                  color: '#F2F3F7',
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: '0 0 22px -10px rgba(121,210,8,.6)',
                }}
              >
                Start a Project <span aria-hidden="true">→</span>
              </a>
            </div>
          </>
        )}

        {!isDesktop && (
          <button
            type="button"
            className="menu-btn"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              minHeight: 44,
              padding: '10px 18px',
              borderRadius: 20,
              border: '1px solid rgba(121,210,8,.4)',
              background: 'linear-gradient(180deg,#171827,#0D0E16)',
              color: '#F2F3F7',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 20px -10px rgba(121,210,8,.6)',
            }}
          >
            Menu
            <span
              aria-hidden="true"
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <span
                style={{
                  display: 'block',
                  width: 16,
                  height: 1.5,
                  background: '#F2F3F7',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 16,
                  height: 1.5,
                  background: '#F2F3F7',
                }}
              />
            </span>
          </button>
        )}
      </nav>
    </header>
  );
}
