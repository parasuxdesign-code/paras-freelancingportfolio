/**
 * PongEasterEgg
 * Idle: a thin line with a small orange ball sitting on it.
 * Hover: ball scales up, "Play a round" hint fades in.
 * Click / Enter: canvas expands into a playable Pong game.
 * Esc / click-when-done: restores the idle bar.
 *
 * All game state lives in a ref — zero React re-renders per frame.
 * RAF and event listeners are fully cleaned up on exit and unmount.
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Game constants ─────────────────────────────────────────────────────── */
const GAME_H       = 108;   // rendered CSS height of the canvas
const PADDLE_W     = 5;
const PADDLE_H     = 30;
const BALL_R       = 4.5;
const SPEED_INIT   = 3.6;
const SPEED_INC    = 0.14;  // per paddle hit
const SPEED_MAX    = 8.5;
const AI_SPEED     = 1.9;   // canvas units per frame (imperfect)
const WIN           = 5;

/* ── Types ──────────────────────────────────────────────────────────────── */
type RoundPhase = 'countdown' | 'rally' | 'point' | 'done';

interface GS {
  W: number; H: number;
  bx: number; by: number; vx: number; vy: number;
  py: number;   // player paddle centre
  ay: number;   // ai paddle centre
  ps: number; as_: number;  // scores
  phase: RoundPhase;
  timer: number;
  winner: 'player' | 'ai' | null;
  speed: number;
  mouseY: number;
  keys: Set<string>;
  serving: 1 | -1;  // direction ball was last served
}

/* ── Helpers ─────────────────────────────────────────────────────────────  */
function freshBall(W: number, H: number, towardX: 1 | -1, speed: number) {
  const a = (Math.random() * 0.55 + 0.15) * (Math.random() < 0.5 ? 1 : -1);
  return {
    bx: W / 2, by: H / 2,
    vx: Math.cos(a) * speed * towardX,
    vy: Math.sin(a) * speed,
  };
}

function initGS(W: number, H: number): GS {
  const b = freshBall(W, H, Math.random() < 0.5 ? 1 : -1, SPEED_INIT);
  return {
    W, H,
    ...b,
    py: H / 2, ay: H / 2,
    ps: 0, as_: 0,
    phase: 'countdown', timer: 70,
    winner: null,
    speed: SPEED_INIT,
    mouseY: H / 2,
    keys: new Set(),
    serving: 1,
  };
}

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getColors() {
  return {
    accent:  cssVar('--accent')          || '#f97316',
    text:    cssVar('--text-secondary')  || '#888',
    muted:   cssVar('--text-tertiary')   || cssVar('--text-secondary') || '#666',
    border:  cssVar('--border')          || 'rgba(128,128,128,.12)',
  };
}

/* ── Canvas drawing helpers ──────────────────────────────────────────────  */
function pill(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  const safe = Math.min(r, w / 2, h / 2);
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, safe);
  } else {
    ctx.rect(x, y, w, h);
  }
}

/* ── Component ───────────────────────────────────────────────────────────  */
export function PongEasterEgg() {
  const [playing,  setPlaying]  = useState(false);
  const [hovered,  setHovered]  = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef     = useRef<GS | null>(null);
  const rafRef    = useRef<number>(0);

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  /* ── Draw one frame ────────────────────────────────────────────────── */
  const drawFrame = useCallback((g: GS, dpr: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { W, H } = g;
    const c = getColors();
    const MARGIN = 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    /* centre dashed line */
    ctx.setLineDash([3, 7]);
    ctx.strokeStyle = c.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2, 6);
    ctx.lineTo(W / 2, H - 6);
    ctx.stroke();
    ctx.setLineDash([]);

    /* paddles */
    ctx.fillStyle = c.text;

    // player (left)
    ctx.beginPath();
    pill(ctx, MARGIN, g.py - PADDLE_H / 2, PADDLE_W, PADDLE_H, 3);
    ctx.fill();

    // AI (right)
    ctx.beginPath();
    pill(ctx, W - MARGIN - PADDLE_W, g.ay - PADDLE_H / 2, PADDLE_W, PADDLE_H, 3);
    ctx.fill();

    /* ball */
    ctx.beginPath();
    ctx.arc(g.bx, g.by, BALL_R, 0, Math.PI * 2);
    ctx.fillStyle = c.accent;
    ctx.fill();

    /* scores */
    ctx.fillStyle = c.text;
    ctx.font = '600 11px Poppins, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(String(g.ps),  W / 2 - 22, 6);
    ctx.fillText(String(g.as_), W / 2 + 22, 6);

    /* phase messages */
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = c.muted;
    ctx.font = '400 10px Poppins, system-ui, sans-serif';
    if (g.phase === 'countdown') {
      ctx.fillText('Move to play · Esc to exit', W / 2, H - 5);
    }
    if (g.phase === 'point') {
      ctx.textBaseline = 'middle';
      ctx.fillText(g.serving === 1 ? 'Ouch.' : 'Nice!', W / 2, H / 2);
    }
    if (g.phase === 'done' && g.winner) {
      ctx.textBaseline = 'middle';
      ctx.font = '600 11px Poppins, system-ui, sans-serif';
      ctx.fillStyle = c.text;
      ctx.fillText(
        g.winner === 'player' ? 'Still got it.' : 'Close one.',
        W / 2, H / 2 - 9
      );
      ctx.font = '400 10px Poppins, system-ui, sans-serif';
      ctx.fillStyle = c.muted;
      ctx.fillText('Click to play again · Esc to exit', W / 2, H / 2 + 9);
    }

    ctx.restore();
  }, []);

  /* ── Update one tick ───────────────────────────────────────────────── */
  const tick = useCallback((g: GS, dpr: number) => {
    const { W, H } = g;
    const MARGIN   = 10;
    const LEFT_X   = MARGIN + PADDLE_W;
    const RIGHT_X  = W - MARGIN - PADDLE_W;

    if (g.phase === 'done') { drawFrame(g, dpr); return; }

    /* countdown / point pause */
    if (g.phase === 'countdown' || g.phase === 'point') {
      g.timer--;
      if (g.timer <= 0) {
        if (g.phase === 'point') {
          const b = freshBall(W, H, g.serving, SPEED_INIT);
          Object.assign(g, b);
          g.speed = SPEED_INIT;
        }
        g.phase = g.phase === 'countdown' ? 'rally' : 'rally';
        /* first rally phase also shows hint — keep it as 'rally' */
      }
      drawFrame(g, dpr);
      return;
    }

    /* player paddle — mouse blend + keyboard */
    const PSPD = 5;
    if (g.keys.has('ArrowUp')   || g.keys.has('w') || g.keys.has('W'))
      g.mouseY = Math.max(PADDLE_H / 2, g.mouseY - PSPD);
    if (g.keys.has('ArrowDown') || g.keys.has('s') || g.keys.has('S'))
      g.mouseY = Math.min(H - PADDLE_H / 2, g.mouseY + PSPD);
    g.py += (g.mouseY - g.py) * 0.16;
    g.py = Math.max(PADDLE_H / 2, Math.min(H - PADDLE_H / 2, g.py));

    /* AI paddle — imperfect follow */
    const aiTarget = g.by + (Math.random() - 0.5) * 14;
    const aiDiff   = aiTarget - g.ay;
    g.ay += Math.sign(aiDiff) * Math.min(Math.abs(aiDiff), AI_SPEED);
    g.ay = Math.max(PADDLE_H / 2, Math.min(H - PADDLE_H / 2, g.ay));

    /* ball movement */
    g.bx += g.vx;
    g.by += g.vy;

    /* top / bottom wall bounce */
    if (g.by - BALL_R <= 0)  { g.by = BALL_R;      g.vy =  Math.abs(g.vy); }
    if (g.by + BALL_R >= H)  { g.by = H - BALL_R;  g.vy = -Math.abs(g.vy); }

    /* player paddle (left) collision */
    if (
      g.vx < 0 &&
      g.bx - BALL_R <= LEFT_X + 1 &&
      g.bx + BALL_R >= MARGIN &&
      g.by >= g.py - PADDLE_H / 2 - BALL_R &&
      g.by <= g.py + PADDLE_H / 2 + BALL_R
    ) {
      const offset = (g.by - g.py) / (PADDLE_H / 2);
      g.speed = Math.min(g.speed + SPEED_INC, SPEED_MAX);
      const a = offset * 0.85;
      g.vx = Math.cos(a) * g.speed;
      g.vy = Math.sin(a) * g.speed;
      g.bx = LEFT_X + BALL_R + 1;
    }

    /* AI paddle (right) collision */
    if (
      g.vx > 0 &&
      g.bx + BALL_R >= RIGHT_X - 1 &&
      g.bx - BALL_R <= W - MARGIN &&
      g.by >= g.ay - PADDLE_H / 2 - BALL_R &&
      g.by <= g.ay + PADDLE_H / 2 + BALL_R
    ) {
      const offset = (g.by - g.ay) / (PADDLE_H / 2);
      g.speed = Math.min(g.speed + SPEED_INC, SPEED_MAX);
      const a = offset * 0.85;
      g.vx = -Math.cos(a) * g.speed;
      g.vy =  Math.sin(a) * g.speed;
      g.bx = RIGHT_X - BALL_R - 1;
    }

    /* scoring */
    if (g.bx + BALL_R < 0) {
      g.as_++;
      g.serving = -1;
      if (g.as_ >= WIN) { g.phase = 'done'; g.winner = 'ai'; }
      else              { g.phase = 'point'; g.timer = 55; }
    }
    if (g.bx - BALL_R > W) {
      g.ps++;
      g.serving = 1;
      if (g.ps >= WIN) { g.phase = 'done'; g.winner = 'player'; }
      else             { g.phase = 'point'; g.timer = 55; }
    }

    drawFrame(g, dpr);
  }, [drawFrame]);

  /* ── Start / stop loop ─────────────────────────────────────────────── */
  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Size canvas for DPR */
    const dpr  = window.devicePixelRatio || 1;
    const rect  = canvas.getBoundingClientRect();
    const W     = rect.width;
    const H     = rect.height;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    if (!gsRef.current) gsRef.current = initGS(W, H);

    function loop() {
      if (!gsRef.current) return;
      tick(gsRef.current, dpr);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
  }, [tick]);

  /* ── Activate / deactivate ─────────────────────────────────────────── */
  const activate = useCallback(() => {
    if (reduced) return;
    gsRef.current = null;
    setPlaying(true);
  }, [reduced]);

  const deactivate = useCallback(() => {
    stopLoop();
    gsRef.current = null;
    setPlaying(false);
    setHovered(false);
  }, [stopLoop]);

  /* ── Effect: boot loop when playing ───────────────────────────────── */
  useEffect(() => {
    if (!playing) return;
    /* canvas not in DOM yet — wait one frame */
    const id = requestAnimationFrame(() => startLoop());
    return () => {
      cancelAnimationFrame(id);
      stopLoop();
    };
  }, [playing, startLoop, stopLoop]);

  /* ── Mouse move on canvas ──────────────────────────────────────────── */
  useEffect(() => {
    if (!playing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    const onMouse = (e: MouseEvent) => {
      if (!gsRef.current) return;
      const rect = canvas.getBoundingClientRect();
      gsRef.current.mouseY = ((e.clientY - rect.top) / rect.height) * (canvas.height / dpr);
    };
    const onTouch = (e: TouchEvent) => {
      if (!gsRef.current || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      gsRef.current.mouseY = ((e.touches[0].clientY - rect.top) / rect.height) * (canvas.height / dpr);
    };
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('touchmove', onTouch);
    };
  }, [playing]);

  /* ── Keyboard while playing ────────────────────────────────────────── */
  useEffect(() => {
    if (!playing) return;
    const onDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { deactivate(); return; }
      gsRef.current?.keys.add(e.key);
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
    };
    const onUp = (e: KeyboardEvent) => gsRef.current?.keys.delete(e.key);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup',   onUp);
    };
  }, [playing, deactivate]);

  /* ── Click canvas: restart when done ──────────────────────────────── */
  const onCanvasClick = useCallback(() => {
    if (gsRef.current?.phase === 'done') {
      stopLoop();
      gsRef.current = null;
      startLoop();
    }
  }, [stopLoop, startLoop]);

  /* ── Render ─────────────────────────────────────────────────────────── */
  if (playing) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <canvas
          ref={canvasRef}
          onClick={onCanvasClick}
          tabIndex={0}
          aria-label="Pong Easter egg — move mouse to control left paddle, Esc to exit"
          style={{
            display: 'block',
            width: '100%',
            height: GAME_H,
            cursor: 'crosshair',
            outline: 'none',
            touchAction: 'none',
          }}
        />
      </div>
    );
  }

  /* idle / hover bar */
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Click to play Pong Easter egg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={activate}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && activate()}
      style={{
        position: 'relative',
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* thin line */}
      <div style={{
        position: 'absolute',
        inset: '50% 0 auto',
        height: 1,
        background: 'var(--border-subtle)',
        transform: 'translateY(-50%)',
      }} />

      {/* orange ball on the line */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 1,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          transition: 'transform 180ms ease',
          transform: hovered ? 'scale(1.6)' : 'scale(1)',
          flexShrink: 0,
        }}
      />

      {/* hover hint */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 'calc(100% + 2px)',
          fontSize: '0.625rem',
          letterSpacing: '0.04em',
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 180ms ease',
        }}
      >
        Play a round
      </span>
    </div>
  );
}
