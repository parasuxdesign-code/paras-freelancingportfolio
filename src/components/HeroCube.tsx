import { useEffect, useRef, useState } from 'react';

// ── Geometry constants ────────────────────────────────────────────────────────
const CS   = 26;        // cubelet size (px)
const GAP  = 6;         // gap between cubelets
const STEP = CS + GAP;  // 32px per grid unit
const HALF = CS / 2;    // 13px

type Pos  = readonly [number, number, number]; // values ∈ {-1, 0, 1}
type Axis = 'x' | 'y' | 'z';
type Dir  = 1 | -1;

// Rotate a position 90° around an axis (right-hand rule)
function rotatePos(p: Pos, ax: Axis, d: Dir): Pos {
  const [x, y, z] = p;
  if (ax === 'y') return d > 0 ? [-z, y, x]  : [z, y, -x];
  if (ax === 'x') return d > 0 ? [x, -z, y]  : [x, z, -y];
  return                d > 0 ? [-y, x, z]  : [y, -x, z];
}

// Interpolate visual position during an in-progress rotation
function rotateVisual(p: Pos, ax: Axis, d: Dir, t: number): [number, number, number] {
  const theta = d * t * Math.PI / 2;
  const [x, y, z] = p;
  const c = Math.cos(theta), s = Math.sin(theta);
  if (ax === 'y') return [x * c - z * s, y, x * s + z * c];
  if (ax === 'x') return [x, y * c - z * s, y * s + z * c];
  return [x * c - y * s, x * s + y * c, z];
}

// Ease-in-out cubic
function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Orange cubelet target positions ──────────────────────────────────────────
// Full 3×3 front face (z=+1): all nine cubelets on the front layer.
// At camera angle (rotX=-22, rotY=33) this face points squarely toward the
// viewer — the large orange 3×3 grid in the reference image.
// Left (x=-1) and top (y=+1) faces remain grey.
// SOLVE is the mathematical inverse of SCRAMBLE so all nine cubelets
// are guaranteed to reassemble here after every animation cycle.
const ORANGE_POS: [number, number, number][] = [
  [-1, -1,  1],  // front bottom-left
  [ 0, -1,  1],  // front bottom-centre
  [ 1, -1,  1],  // front bottom-right
  [-1,  0,  1],  // front middle-left
  [ 0,  0,  1],  // front centre
  [ 1,  0,  1],  // front middle-right
  [-1,  1,  1],  // front top-left
  [ 0,  1,  1],  // front top-centre
  [ 1,  1,  1],  // front top-right
];

function isOrange(x: number, y: number, z: number): boolean {
  return ORANGE_POS.some(([ox, oy, oz]) => ox === x && oy === y && oz === z);
}

// ── Cubelet state ─────────────────────────────────────────────────────────────
interface Cubelet { id: number; pos: Pos; hi: boolean; }

function initCubelets(): Cubelet[] {
  const out: Cubelet[] = [];
  let id = 0;
  for (let z = -1; z <= 1; z++)
    for (let y = -1; y <= 1; y++)
      for (let x = -1; x <= 1; x++)
        out.push({ id: id++, pos: [x, y, z] as const, hi: isOrange(x, y, z) });
  return out;
}

// ── Move types ────────────────────────────────────────────────────────────────
// holdAfter: optional pause duration (ms) to apply AFTER this move settles.
// Used on the last SOLVE move to create a visible hold on the assembled pattern.
interface LayerMove { k: 'layer'; ax: Axis; li: -1 | 0 | 1; d: Dir; holdAfter?: number; }
interface CubeMove  { k: 'cube';  ax: Axis; d: Dir; }
type Move = LayerMove | CubeMove;

// SCRAMBLE: 8 varied layer moves that disperse the orange cubelets
const SCRAMBLE: LayerMove[] = [
  { k: 'layer', ax: 'x', li:  1, d:  1 },   // R
  { k: 'layer', ax: 'y', li:  1, d:  1 },   // U
  { k: 'layer', ax: 'z', li:  1, d: -1 },   // F′
  { k: 'layer', ax: 'x', li: -1, d:  1 },   // L
  { k: 'layer', ax: 'y', li: -1, d: -1 },   // D′
  { k: 'layer', ax: 'z', li: -1, d:  1 },   // B
  { k: 'layer', ax: 'x', li:  0, d:  1 },   // M
  { k: 'layer', ax: 'y', li:  0, d: -1 },   // E′
];

// SOLVE: exact inverse of SCRAMBLE (reversed order, each direction flipped).
// Mathematical proof: applying SCRAMBLE then SOLVE returns every cubelet to its
// initial position, so the orange cross+dot is guaranteed to reassemble.
const SOLVE: LayerMove[] = [
  { k: 'layer', ax: 'y', li:  0, d:  1 },        // E  (undoes E′)
  { k: 'layer', ax: 'x', li:  0, d: -1 },        // M′ (undoes M)
  { k: 'layer', ax: 'z', li: -1, d: -1 },        // B′ (undoes B)
  { k: 'layer', ax: 'y', li: -1, d:  1 },        // D  (undoes D′)
  { k: 'layer', ax: 'x', li: -1, d: -1 },        // L′ (undoes L)
  { k: 'layer', ax: 'z', li:  1, d:  1 },        // F  (undoes F′)
  { k: 'layer', ax: 'y', li:  1, d: -1 },        // U′ (undoes U)
  { k: 'layer', ax: 'x', li:  1, d: -1, holdAfter: 2000 },  // R′ (undoes R) → 2 s hold
];

// Full looping sequence: scramble → solve → 2 s hold → repeat
const SEQ: Move[] = [...SCRAMBLE, ...SOLVE];

const ANIM_MS  = 650;
const PAUSE_MS = 380;  // default inter-move pause; overridden by holdAfter

// Six CSS 3D face transforms for a CS×CS box.
// Face index → outward normal in cube coordinates (Y-up):
//   fi=0  +Z (front)    fi=1  -Z (back)
//   fi=2  -X (left)     fi=3  +X (right)
//   fi=4  +Y (top)      fi=5  -Y (bottom)
const FACE_TRANSFORMS = [
  `translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
] as const;

// Only render a face when the cubelet occupies the exterior shell of the 3×3×3
// in the direction that face points. Eliminates 108 interior faces which would
// bleed through in CSS 3D (no depth buffer). backface-visibility:hidden handles
// camera-facing culling on the remaining 54 exterior faces.
function isFaceExterior(pos: Pos, fi: number): boolean {
  switch (fi) {
    case 0: return pos[2] ===  1; // +Z front
    case 1: return pos[2] === -1; // -Z back
    case 2: return pos[0] === -1; // -X left
    case 3: return pos[0] ===  1; // +X right
    case 4: return pos[1] ===  1; // +Y top
    case 5: return pos[1] === -1; // -Y bottom
    default: return false;
  }
}

// ── Internal scene state (mutable ref, not React state) ───────────────────────
interface Scene {
  cubelets: Cubelet[];
  cRotX: number;
  cRotY: number;
  move: Move | null;
  prog: number;     // eased 0→1
  pauseMs: number;  // current inter-move pause; holdAfter overwrites it temporarily
}

// ── Component ─────────────────────────────────────────────────────────────────
export function HeroCube() {
  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const sceneRef = useRef<Scene>({
    cubelets: initCubelets(),
    cRotX: -22,
    cRotY: 33,
    move: null,
    prog: 0,
    pauseMs: PAUSE_MS,
  });
  const [, bump] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let phase: 'pause' | 'anim' = 'pause';
    let t0 = performance.now();
    let si = 0;
    let raf: number;

    function tick(now: number) {
      const s = sceneRef.current;
      const dt = now - t0;

      if (phase === 'pause') {
        if (dt >= s.pauseMs) {
          phase = 'anim';
          t0 = now;
          s.move = SEQ[si % SEQ.length];
          s.prog = 0;
          s.pauseMs = PAUSE_MS;  // reset to default for the NEXT pause
        }
      } else {
        const raw = Math.min(dt / ANIM_MS, 1);
        s.prog = ease(raw);

        if (raw >= 1) {
          const m = s.move!;
          if (m.k === 'layer') {
            const ai: 0 | 1 | 2 = m.ax === 'x' ? 0 : m.ax === 'y' ? 1 : 2;
            s.cubelets = s.cubelets.map(c =>
              (c.pos[ai] as number) === m.li
                ? { ...c, pos: rotatePos(c.pos, m.ax, m.d) }
                : c
            );
            // Extend the upcoming pause if this move specifies a hold
            if (m.holdAfter !== undefined) s.pauseMs = m.holdAfter;
          } else {
            const delta = m.d * 90;
            if (m.ax === 'y') s.cRotY += delta;
            else              s.cRotX += delta;
          }
          s.move = null;
          s.prog = 0;
          si++;
          phase = 'pause';
          t0 = now;
        }
      }

      bump(n => n + 1);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const { cubelets, cRotX, cRotY, move, prog } = sceneRef.current;

  // Extra rotation for whole-cube move in progress
  let exRX = 0, exRY = 0;
  if (move?.k === 'cube') {
    const delta = move.d * 90 * prog;
    if (move.ax === 'y') exRY = delta;
    else                 exRX = delta;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        width: 160,
        height: 200,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 460,
        perspectiveOrigin: '50% 48%',
      }}
    >
      {/* 3D scene root — pivot at cube center */}
      <div
        style={{
          position: 'relative',
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${cRotX + exRX}deg) rotateY(${cRotY + exRY}deg)`,
        }}
      >
        {cubelets.map(c => {
          // Visual position: rotate if this cubelet is in the animating layer
          let vp: [number, number, number];
          if (move?.k === 'layer') {
            const ai: 0 | 1 | 2 = move.ax === 'x' ? 0 : move.ax === 'y' ? 1 : 2;
            vp = (c.pos[ai] as number) === move.li
              ? rotateVisual(c.pos, move.ax, move.d, prog)
              : [c.pos[0], c.pos[1], c.pos[2]];
          } else {
            vp = [c.pos[0], c.pos[1], c.pos[2]];
          }

          return (
            <div
              key={c.id}
              style={{
                position: 'absolute',
                width: CS,
                height: CS,
                // Center the box on the 3D position
                marginLeft: -HALF,
                marginTop: -HALF,
                transformStyle: 'preserve-3d',
                // CSS Y is down; cube Y is up — negate vy
                transform: `translate3d(${vp[0] * STEP}px, ${-vp[1] * STEP}px, ${vp[2] * STEP}px)`,
              }}
            >
              {FACE_TRANSFORMS.map((tf, fi) => {
                // During a layer move, show the UNION of exterior faces at both
                // the current logical position and the target position.
                // backface-visibility:hidden silently culls any face pointing
                // away from the camera, so extra faces cost nothing visually.
                // This prevents the abrupt face-set swap on the commit frame
                // that causes the settling jerk.
                let showFace: boolean;
                if (move?.k === 'layer') {
                  const ai: 0|1|2 = move.ax === 'x' ? 0 : move.ax === 'y' ? 1 : 2;
                  if ((c.pos[ai] as number) === move.li) {
                    const targetPos = rotatePos(c.pos, move.ax, move.d);
                    showFace = isFaceExterior(c.pos, fi) || isFaceExterior(targetPos, fi);
                  } else {
                    showFace = isFaceExterior(c.pos, fi);
                  }
                } else {
                  showFace = isFaceExterior(c.pos, fi);
                }
                if (!showFace) return null;

                return (
                  <div
                    key={fi}
                    style={{
                      position: 'absolute',
                      width: CS,
                      height: CS,
                      transform: tf,
                      background: c.hi ? 'var(--cube-hi-fill)' : 'var(--cube-face)',
                      border: c.hi
                        ? '1px solid var(--cube-hi-edge)'
                        : '1px solid var(--cube-edge)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['backfaceVisibility'],
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
