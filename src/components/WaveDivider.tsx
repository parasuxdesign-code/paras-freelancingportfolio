/**
 * WaveDivider
 * A static, theme-aware wavy line separator.
 * Single SVG <path> — no fill, hairline stroke, uses --border token.
 *
 * Design decisions:
 *  • viewBox 1440×60 gives enough vertical room for a visible wave.
 *  • Only 3 smooth S-curves across the full width → long, organic wavelength.
 *  • Amplitude ≈ 18 px in viewBox space — clearly visible but restrained.
 *  • preserveAspectRatio="none" + vectorEffect="non-scaling-stroke" keeps the
 *    stroke hairline-thin at every viewport width without distorting the curve.
 *  • The wrapper div is 32 px tall (rendered), centred, no overflow.
 */
export function WaveDivider() {
  // ViewBox: 1440 wide × 60 tall. Centre line = y 30.
  // Three broad S-curves; control points pulled 18 px above/below centre.
  // Endpoints land exactly on y=30 so there is no visible join at either edge.
  const d =
    'M0 30 ' +
    'C 160 12, 320 48, 480 30 ' +
    'C 640 12, 800 48, 960 30 ' +
    'C 1120 12, 1280 48, 1440 30';

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        height: 32,
        pointerEvents: 'none',
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <path
          d={d}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
