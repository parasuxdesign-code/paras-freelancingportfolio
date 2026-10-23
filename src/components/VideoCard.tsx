import { useEffect, useRef, useState } from 'react';

export function VideoCard({ width = 160, height = 268 }: { width?: number; height?: number }) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {});
  }, []);

  const handleToggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    if (vid.paused) vid.play().catch(() => {});
    setMuted(vid.muted);
  };

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 28,
        overflow: 'hidden',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-hi)',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <button
        onClick={handleToggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.45)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      >
        <span
          className="material-symbols-rounded"
          aria-hidden="true"
          style={{ fontSize: 16, color: '#fff' }}
        >
          {muted ? 'volume_off' : 'volume_up'}
        </span>
      </button>
    </div>
  );
}
