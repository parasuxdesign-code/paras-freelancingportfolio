import { PROCESS_STEPS } from '../data/content';
import { Icon } from './Icon';


export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      data-screen-label="Process"
      style={{
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 1240,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(72px,8vw,104px) clamp(20px,3vw,40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <img
        data-pwm="1"
        src="/images/svc-watermark.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: -60,
          top: '8%',
          width: 'clamp(320px,38vw,520px)',
          height: 'auto',
          opacity: 0.1,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <div
        data-reveal="1"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          opacity: 0,
          transform: 'translateY(14px)',
          transition:
            'opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: '28px',
            color: '#90E02E',
          }}
        >
          How I work
        </span>
        <h2
          id="process-title"
          style={{
            fontFamily: "'The Seasons'",
            fontSize: 'clamp(30px,4.2vw,42px)',
            lineHeight: 1.15,
            fontWeight: 700,
            maxWidth: '20ch',
            textWrap: 'pretty',
            color: 'rgba(255,255,255,.34)',
          }}
        >
          Simple steps,
          <br />
          <span style={{ color: '#F2F3F7' }}>extraordinary results.</span>
        </h2>
      </div>

      <ol
        style={{
          position: 'relative',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))',
        }}
      >
        {PROCESS_STEPS.map((s, i) => (
          <li
            key={s.title}
            data-pstep={i + 1}
            style={{
              position: 'relative',
              display: 'flex',
              gap: 16,
              opacity: 0.18,
              transform: 'translate3d(0,64px,0)',
              willChange: 'opacity,transform',
            }}
          >
            <span
              aria-hidden="true"
              data-pbar="1"
              style={{
                flex: 'none',
                width: 2,
                borderRadius: 2,
                background:
                  'linear-gradient(180deg,#90E02E,rgba(144,224,46,.05))',
                transform: 'scaleY(0)',
                transformOrigin: 'top',
                transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                alignItems: 'flex-start',
                minWidth: 0,
              }}
            >
              <Icon
                name={s.icon}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: 'rgba(121,210,8,.1)',
                  border: '1px solid rgba(121,210,8,.25)',
                  color: '#A6E85C',
                  fontSize: 22,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.16em',
                  color: '#61636F',
                }}
              >
                {s.step}
              </span>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: '#F2F3F7',
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: '#9698A6',
                  maxWidth: '34ch',
                  textWrap: 'pretty',
                }}
              >
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
