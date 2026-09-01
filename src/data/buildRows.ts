import type { Project } from './content';

export interface Tile extends Project {
  w: number;
  itemStyle: React.CSSProperties;
}

export interface Row {
  key: string;
  dir: 'ltr' | 'rtl';
  items: Tile[];
}

/**
 * Two edge-to-edge rows. Tile width follows each shot's own ratio at the row
 * height, then items are split so both rows come out to a similar total width.
 * Each row's items are duplicated once so translating the track by half its
 * width wraps seamlessly. Ported verbatim from DCLogic.buildRows().
 */
export function buildRows(list: Project[], h: number): Row[] {
  const tiles = list.map((p) => ({ ...p, w: Math.round(h * p.ratio) }));

  const rows: (typeof tiles)[] = [[], []];
  const widths = [0, 0];
  tiles.forEach((t) => {
    const i = widths[0] <= widths[1] ? 0 : 1;
    rows[i].push(t);
    widths[i] += t.w + 8;
  });
  if (!rows[1].length && rows[0].length > 1) rows[1].push(rows[0].pop()!);

  return rows
    .filter((r) => r.length)
    .map((items, ri) => ({
      key: 'row' + ri,
      dir: (ri === 0 ? 'ltr' : 'rtl') as 'ltr' | 'rtl',
      items: items.concat(items).map((t) => ({
        ...t,
        itemStyle: {
          flex: '0 0 auto',
          height: `${h}px`,
          width: `${t.w}px`,
        } as React.CSSProperties,
      })),
    }));
}
