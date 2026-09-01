import { type RefObject } from 'react';
import type { Row } from '../data/buildRows';

interface WorkProps {
  railRef: RefObject<HTMLDivElement>;
  rows: Row[];
  onPause: () => void;
  onResume: () => void;
}

export function Work({ railRef, rows, onPause, onResume }: WorkProps) {
  return (
    <section
      id="work"
      aria-label="Selected work"
      data-screen-label="Selected Work"
      style={{ maxWidth: 1440, width: '100%', margin: '0 auto', padding: 0 }}
    >
      <div
        data-reveal="1"
        data-delay="140"
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          opacity: 0,
          transform: 'translateY(14px)',
          transition:
            'opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <div
          ref={railRef}
          aria-label="Project gallery"
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {rows.map((row) => (
            <ul
              key={row.key}
              data-marquee={row.dir}
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'stretch',
                gap: 8,
                width: 'max-content',
                willChange: 'transform',
              }}
            >
              {row.items.map((tile, i) => {
                // Second half of each row is the duplicate used for the
                // seamless loop, so hide it from assistive tech.
                const isDupe = i >= row.items.length / 2;
                return (
                  <li key={`${tile.id}-${i}`} style={tile.itemStyle}>
                    <span
                      style={{
                        position: 'relative',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        background: '#0B0C12',
                      }}
                    >
                      <img
                        src={tile.src}
                        alt={isDupe ? '' : tile.alt}
                        aria-hidden={isDupe || undefined}
                        draggable={false}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '0 auto 0 -1px',
            width: 100,
            pointerEvents: 'none',
            background: 'linear-gradient(to right,#05050A,rgba(5,5,10,0))',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '0 -1px 0 auto',
            width: 100,
            pointerEvents: 'none',
            background: 'linear-gradient(to left,#05050A,rgba(5,5,10,0))',
          }}
        />
      </div>
    </section>
  );
}
