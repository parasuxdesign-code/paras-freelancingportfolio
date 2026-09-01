/** Material Symbols Rounded glyph, rendered via the .om-ms font class. */
export function Icon({
  name,
  style,
}: {
  name: string;
  style?: React.CSSProperties;
}) {
  return (
    <span aria-hidden="true" className="om-ms" style={style}>
      {name}
    </span>
  );
}
