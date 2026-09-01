import { SERVICE_CARDS, SERVICE_ICON_STYLE } from '../data/content';

const serif = "'The Seasons','Playfair Display',Georgia,serif";

const revealStyle: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(14px)',
  transition:
    'opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)',
};

function Card({
  icon,
  title,
  body,
  delay,
  gradient,
}: (typeof SERVICE_CARDS)[number]) {
  const iconStyle = SERVICE_ICON_STYLE[icon] || {};
  return (
    <li
      data-reveal="1"
      data-delay={delay}
      style={{
        position: 'relative',
        flex: '0 1 350px',
        width: 350,
        maxWidth: '100%',
        minHeight: 180,
        overflow: 'hidden',
        borderRadius: 32,
        background: `linear-gradient(46.143deg,rgb(0,0,0) 51.17%,${gradient} 162.52%)`,
        padding: '28px 24px',
        ...revealStyle,
      }}
    >
      <img
        src="/images/svc-watermark.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'matrix(1,.009,-.009,1,240.693,-11.34)',
          transformOrigin: '0 0',
          width: 130.865,
          height: 121.112,
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: 'flex-start',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'relative',
            flex: 'none',
            width: 32,
            height: 32,
            display: 'block',
            overflow: 'hidden',
          }}
        >
          <img src={icon} alt="" style={{ position: 'absolute', ...iconStyle }} />
        </span>
        <div
          style={{
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <h3
            style={{
              alignSelf: 'stretch',
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'rgb(255,255,255)',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              alignSelf: 'stretch',
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,.6)',
              textWrap: 'pretty',
            }}
          >
            {body}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Services() {
  // The source lays the 5 cards out in two rows (3 + 2) inside a stack.
  const rowA = SERVICE_CARDS.slice(0, 3);
  const rowB = SERVICE_CARDS.slice(3);

  const ulStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 24,
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      data-screen-label="Services"
      style={{
        width: '100%',
        padding: 'clamp(72px,8vw,104px) clamp(20px,3vw,40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1229,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(40px,5vw,61px)',
        }}
      >
        <div
          data-reveal="1"
          style={{
            width: '100%',
            maxWidth: 456,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            textAlign: 'center',
            ...revealStyle,
          }}
        >
          <span
            style={{
              alignSelf: 'stretch',
              fontSize: 20,
              fontWeight: 500,
              lineHeight: '28px',
              color: 'rgb(144,224,46)',
            }}
          >
            My Services
          </span>
          <h2
            id="services-title"
            style={{
              maxWidth: 370,
              fontFamily: serif,
              fontSize: 'clamp(30px,4.2vw,42px)',
              fontWeight: 700,
              lineHeight: '100%',
              color: 'rgb(255,255,255)',
              textWrap: 'pretty',
            }}
          >
            Expertise to help you move forward
          </h2>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          <ul style={ulStyle}>
            {rowA.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </ul>
          <ul style={ulStyle}>
            {rowB.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
