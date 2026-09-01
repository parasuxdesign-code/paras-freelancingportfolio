import { type RefObject } from 'react';
import { NAV_ITEMS, LINKS } from '../data/content';

interface NavProps {
  navRef: RefObject<HTMLElement>;
  isDesktop: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const arrowMask: React.CSSProperties = {
  display: 'inline-block',
  width: 16,
  height: 16,
  background: 'currentColor',
  WebkitMask: "url('/images/arrow-right.svg') no-repeat center/10.383px 7.417px",
  mask: "url('/images/arrow-right.svg') no-repeat center/10.383px 7.417px",
};

export function Nav({
  navRef,
  isDesktop,
  menuOpen,
  onToggleMenu,
  onNavClick,
}: NavProps) {
  const paintDot = (link: HTMLElement | null, on: boolean) => {
    if (!link) return;
    link.style.color = on ? '#FFFFFF' : 'rgba(255,255,255,.7)';
    link.style.webkitTextStrokeWidth = on ? '.4px' : '0px';
    link.style.webkitTextStrokeColor = '#FFFFFF';
    const dot = link.querySelector<HTMLElement>('[data-navdot]');
    if (!dot) return;
    dot.style.opacity = on ? '1' : '0';
    dot.style.transform = on
      ? 'translateX(-50%) scaleX(1)'
      : 'translateX(-50%) scaleX(.2)';
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
          position: 'relative',
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 1200,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between',
          padding: '11px 28px 11px 16px',
          borderRadius: 48,
          background: 'rgba(255,255,255,.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 22px 54px -34px rgba(0,0,0,.9)',
          transition: 'background 300ms ease,box-shadow 300ms ease',
          animation: 'om-rise .7s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        {/* Brand */}
        <a
          href="#top"
          aria-label="Paras Bhatnagar, home"
          onClick={onNavClick}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'inherit',
            flex: 'none',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'relative',
              flex: 'none',
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: '#90E02E',
              overflow: 'hidden',
            }}
          >
            <img
              src="/images/logo-mark.svg"
              alt=""
              style={{
                position: 'absolute',
                left: 8.184,
                top: 10.313,
                width: 23.228,
                height: 21.497,
              }}
            />
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: '25px',
              letterSpacing: '-.05em',
              color: '#fff',
            }}
          >
            Paras
          </span>
        </a>

        {isDesktop && (
          <>
            <ul
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
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
                      height: 36,
                      padding: 10,
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: '100%',
                      color: 'rgba(255,255,255,.7)',
                      transition:
                        'color 280ms cubic-bezier(.16,1,.3,1),-webkit-text-stroke-width 280ms ease',
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
                        bottom: 1,
                        width: 22,
                        height: 2,
                        borderRadius: 2,
                        background: '#90E02E',
                        opacity: 0,
                        transform: 'translateX(-50%) scaleX(.2)',
                        transformOrigin: '50% 50%',
                        transition:
                          'opacity 320ms cubic-bezier(.16,1,.3,1),transform 420ms cubic-bezier(.16,1,.3,1)',
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={LINKS.tally}
              className="nav-talk"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                flex: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                height: 40,
                padding: 12,
                borderRadius: 14,
                color: '#90E02E',
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '100%',
                transition: 'color 200ms ease,filter 300ms ease',
              }}
            >
              Let&rsquo;s Talk <span aria-hidden="true" style={arrowMask} />
            </a>
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
              transition: 'transform 200ms ease,box-shadow 300ms ease',
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
