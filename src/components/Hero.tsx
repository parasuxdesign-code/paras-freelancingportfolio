import { LINKS } from '../data/content';

interface HeroProps {
  showStats?: boolean;
}

const rise = (delay: number): React.CSSProperties => ({
  animation: 'om-rise .7s cubic-bezier(.16,1,.3,1) both',
  animationDelay: `${delay}ms`,
});

const serif = "'The Seasons','Playfair Display',Georgia,serif";

export function Hero({ showStats = true }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      data-screen-label="Hero"
      style={{
        maxWidth: 1240,
        width: '100%',
        margin: '0 auto',
        padding:
          'clamp(120px,14vw,169px) clamp(20px,3vw,40px) clamp(48px,6vw,72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(40px,6vw,61px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 523,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          textAlign: 'center',
        }}
      >
        {/* Availability pill with animated live pulse */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 13px',
            borderRadius: 48,
            background: 'rgba(255,255,255,.1)',
            ...rise(120),
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'relative',
              flex: 'none',
              display: 'grid',
              placeItems: 'center',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'rgba(65,255,122,.24)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                margin: 'auto',
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: '1.5px solid rgba(140,232,96,.9)',
                animation: 'om-live 3.6s ease-out infinite',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                margin: 'auto',
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: '1.5px solid rgba(140,232,96,.7)',
                animation: 'om-live 3.6s ease-out infinite',
                animationDelay: '1.8s',
              }}
            />
            <span
              style={{
                position: 'relative',
                display: 'block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#70D44B',
                boxShadow: '0 0 8px rgba(112,212,75,.8)',
                animation: 'om-live-core 3.6s ease-in-out infinite',
              }}
            />
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              lineHeight: '28px',
              color: '#fff',
            }}
          >
            Available
          </span>
        </span>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <h1
            id="hero-title"
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: 'clamp(30px,4.2vw,42px)',
              lineHeight: '100%',
              color: '#fff',
              textWrap: 'pretty',
              ...rise(220),
            }}
          >
            design brands and products
          </h1>
          <p
            style={{
              maxWidth: 456,
              fontSize: 'clamp(17px,1.5vw,20px)',
              fontWeight: 500,
              lineHeight: '28px',
              color: 'rgba(255,255,255,.8)',
              textWrap: 'pretty',
              ...rise(320),
            }}
          >
            Your vision. My craft. Let&rsquo;s make something great together.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            ...rise(420),
          }}
        >
          <a
            href={LINKS.tally}
            className="btn-green"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              minHeight: 48,
              padding: '13px 19px',
              borderRadius: 19,
              background: '#90E02E',
              color: '#000',
              fontSize: 16,
              fontWeight: 700,
              lineHeight: '100%',
              whiteSpace: 'nowrap',
              transition:
                'background 260ms ease,box-shadow 300ms ease,transform 220ms ease',
            }}
          >
            Book a Free Call
          </a>
          <a
            href={LINKS.whatsapp}
            className="btn-ghost"
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 48,
              padding: '13px 19px',
              borderRadius: 19,
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.14)',
              color: '#F2F3F7',
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '100%',
              whiteSpace: 'nowrap',
              transition:
                'border-color 300ms ease,background 300ms ease,box-shadow 320ms ease,transform 220ms ease',
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="#25D366"
              style={{ flex: 'none', display: 'block' }}
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
            </svg>{' '}
            WhatsApp
          </a>
        </div>
      </div>

      {showStats && (
        <div
          style={{
            width: '100%',
            maxWidth: 533,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '1px 10px',
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
              ...rise(520),
            }}
          >
            <span
              style={{
                fontSize: 25,
                fontWeight: 700,
                lineHeight: '28px',
                color: '#fff',
              }}
            >
              12+
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                lineHeight: '28px',
                color: 'rgba(255,255,255,.6)',
              }}
            >
              Years of experience
            </span>
          </div>
          <span
            aria-hidden="true"
            style={{
              flex: 'none',
              alignSelf: 'center',
              width: 1,
              height: 85,
              background: 'rgba(255,255,255,.16)',
            }}
          />
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
              ...rise(580),
            }}
          >
            <span
              style={{
                fontSize: 25,
                fontWeight: 700,
                lineHeight: '28px',
                color: '#fff',
              }}
            >
              50+
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                lineHeight: '28px',
                color: 'rgba(255,255,255,.6)',
              }}
            >
              Project Delivered
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
