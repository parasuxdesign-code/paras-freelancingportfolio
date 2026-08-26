import { type RefObject } from 'react';
import type { Row, Tile } from '../data/buildRows';

interface WorkProps {
  railRef: RefObject<HTMLDivElement>;
  rows: Row[];
  onPause: () => void;
  onResume: () => void;
}

function TileCard({ tile }: { tile: Tile }) {
  return (
    <li style={tile.itemStyle}>
      <a
        href="#work"
        className="work-tile"
        data-cursor="View"
        aria-label={tile.aria}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#0B0C12',
          color: 'inherit',
        }}
      >
        {/* Diagonal hatch base */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(135deg,rgba(255,255,255,.045) 0 10px,rgba(255,255,255,.015) 10px 20px)',
          }}
        />
        {/* Slot label */}
        <span
          style={{
            position: 'absolute',
            left: 14,
            top: 12,
            right: 14,
            font: '500 9px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: '#61636F',
          }}
        >
          {tile.slot}
        </span>
        {/* Real screenshot (when the project has one) */}
        {tile.src && (
          <img
            src={tile.src}
            alt={tile.alt || ''}
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
        )}
        {/* Hover scrim */}
        <span
          aria-hidden="true"
          className="work-tile__scrim"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top,rgba(5,5,10,.88) 0%,rgba(5,5,10,.25) 45%,rgba(5,5,10,0) 75%)',
          }}
        />
        {/* Hover meta */}
        <span
          className="work-tile__meta"
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 14,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-.01em',
                color: '#F7F8FB',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {tile.title}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: '#B0B2BC',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {tile.category}
            </span>
          </span>
          <span
            aria-hidden="true"
            style={{
              flex: 'none',
              display: 'grid',
              placeItems: 'center',
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(121,210,8,.95)',
              color: '#0A1400',
              fontSize: 12,
              boxShadow: '0 0 18px -4px rgba(121,210,8,.9)',
            }}
          >
            →
          </span>
        </span>
      </a>
    </li>
  );
}

export function Work({ railRef, rows, onPause, onResume }: WorkProps) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      data-screen-label="Selected Work"
      style={{
        maxWidth: 1280,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(16px,2vw,28px) 0 clamp(40px,5vw,56px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginBottom: 18,
          padding: '0 clamp(4px,1vw,12px)',
        }}
      >
        <div
          className="reveal"
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: '#7A7C88',
            }}
          >
            Selected work
          </span>
          <h2
            id="work-title"
            style={{
              fontSize: 'clamp(28px,3.4vw,42px)',
              lineHeight: 1.12,
              letterSpacing: '-.03em',
              fontWeight: 600,
              maxWidth: '16ch',
            }}
          >
            A few things I&apos;m proud of
          </h2>
        </div>
      </div>

      <div
        className="reveal"
        data-delay="140"
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
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
              {row.items.map((tile, i) => (
                <TileCard key={`${tile.id}-${i}`} tile={tile} />
              ))}
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
