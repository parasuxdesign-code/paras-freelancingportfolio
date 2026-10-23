interface GreenSignalProps {
  variant?: 'dot' | 'pulse' | 'node' | 'branch';
  label?: string;
  className?: string;
}

export function GreenSignal({ variant = 'dot', label, className = '' }: GreenSignalProps) {
  return (
    <span
      className={`gs gs--${variant} ${className}`}
      aria-hidden="true"
      title={label}
    >
      <style>{`
        .gs {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gs--dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
        }
        .gs--pulse {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }
        .gs--pulse::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid var(--accent);
          opacity: 0.4;
          animation: gs-pulse 2s ease-in-out infinite;
        }
        @keyframes gs-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0; }
        }
        .gs--node {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
        .gs--branch {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.6;
        }
        @media (prefers-reduced-motion: reduce) {
          .gs--pulse::after { animation: none; }
        }
      `}</style>
    </span>
  );
}
