import { NAV_ITEMS } from '../data/content';
import { Icon } from './Icon';

interface MobileMenuProps {
  open: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function MobileMenu({ open, onNavClick }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      style={{
        position: 'fixed',
        inset: '16px 16px auto 16px',
        zIndex: 99,
        padding: '80px 20px 20px',
        borderRadius: 32,
        background: 'rgba(10,10,16,.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,.08)',
        boxShadow: '0 30px 70px -20px rgba(0,0,0,.9)',
        animation: 'om-panel .34s cubic-bezier(.16,1,.3,1) both',
      }}
    >
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="mobile-link"
              onClick={onNavClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 56,
                padding: '14px 16px',
                borderRadius: 16,
                fontSize: 20,
                fontWeight: 600,
                color: '#F2F3F7',
                transition: 'background 220ms ease',
              }}
            >
              {item.label}
              <Icon name="arrow_forward" style={{ fontSize: 18, color: '#79D208' }} />
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="mobile-cta"
        onClick={onNavClick}
        style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          minHeight: 56,
          borderRadius: 20,
          background: 'linear-gradient(180deg,#171827,#0D0E16)',
          border: '1px solid rgba(121,210,8,.5)',
          color: '#F2F3F7',
          fontSize: 16,
          fontWeight: 600,
          boxShadow: '0 0 24px -10px rgba(121,210,8,.7)',
        }}
      >
        Book a Free Call <Icon name="arrow_forward" style={{ fontSize: 18 }} />
      </a>
    </div>
  );
}
