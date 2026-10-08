import { halite } from "./tokens";

/**
 * The Saltancy mark as a still SVG drawing: the hero crystal (a glass cube
 * with a glowing ember core) seen from the isometric angle. The live header
 * mark is the CSS 3D `CrystalMark`; this drawing is for the places that can't
 * run CSS: the favicon, the Apple icon and the social card.
 *
 * "small" is drawn for 16 to 48 pixels: heavy glass edges, a large core, no
 * hidden edges or lattice. "full" is drawn for 120 pixels and up.
 */
export type MarkDetail = "small" | "full";
/** The dark backing: rounded for browser tabs, square for iOS (which rounds it itself), or none. */
export type MarkTile = "rounded" | "square" | "none";

type Point = readonly [number, number];

const VIEW = 64;
const CENTRE: Point = [32, 33];

const DETAIL = {
  small: { edge: 21, core: 10, stroke: 3.6, glassEdge: 0.92, topFill: 0.22, sideFill: 0.08, glow: 17 },
  full: { edge: 22, core: 8.5, stroke: 1.3, glassEdge: 0.6, topFill: 0.17, sideFill: 0.06, glow: 19 },
} as const;

const round = (n: number) => Math.round(n * 100) / 100;
const points = (...ps: Point[]) => ps.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");
const mid = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const line = (a: Point, b: Point, attrs: string) =>
  `<line x1="${round(a[0])}" y1="${round(a[1])}" x2="${round(b[0])}" y2="${round(b[1])}" ${attrs}/>`;

/** The outline corners of an isometric cube, plus its near corner at the centre. */
function isoCube(edge: number, [cx, cy]: Point) {
  const dx = edge * Math.cos(Math.PI / 6);
  const dy = edge / 2;
  const top: Point = [cx, cy - edge];
  const upperRight: Point = [cx + dx, cy - dy];
  const lowerRight: Point = [cx + dx, cy + dy];
  const bottom: Point = [cx, cy + edge];
  const lowerLeft: Point = [cx - dx, cy + dy];
  const upperLeft: Point = [cx - dx, cy - dy];
  const near: Point = [cx, cy];
  return {
    top,
    upperRight,
    lowerRight,
    bottom,
    lowerLeft,
    upperLeft,
    near,
    faces: {
      top: [top, upperRight, near, upperLeft] as const,
      left: [upperLeft, near, bottom, lowerLeft] as const,
      right: [near, upperRight, lowerRight, bottom] as const,
    },
  };
}

/** The two lines that split a face into the 2 x 2 lattice. */
function lattice([a, b, c, d]: readonly [Point, Point, Point, Point]) {
  return [
    [mid(a, b), mid(d, c)],
    [mid(a, d), mid(b, c)],
  ] as const;
}

export function markSvg({ detail, tile, size }: { detail: MarkDetail; tile: MarkTile; size: number }) {
  const d = DETAIL[detail];
  const glass = isoCube(d.edge, CENTRE);
  const core = isoCube(d.core, CENTRE);

  const ink = halite("ink-raised");
  const ember = halite("ember");
  const glassEdge = halite("glass");
  const glassFill = halite("glass-light");

  const parts: string[] = [];

  parts.push(
    `<defs>`,
    `<radialGradient id="glow"><stop offset="0" stop-color="${ember}" stop-opacity="0.7"/><stop offset="1" stop-color="${ember}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="wash"><stop offset="0" stop-color="${ember}" stop-opacity="0.22"/><stop offset="1" stop-color="${ember}" stop-opacity="0"/></radialGradient>`,
    `</defs>`
  );

  if (tile !== "none") {
    const radius = tile === "rounded" ? 14 : 0;
    parts.push(`<rect width="${VIEW}" height="${VIEW}" rx="${radius}" fill="${ink}"/>`);
    parts.push(`<circle cx="${CENTRE[0]}" cy="${CENTRE[1]}" r="31" fill="url(#wash)"/>`);
  }

  // Glass is see-through: the edges that meet at the far corner show faintly.
  if (detail === "full") {
    const hidden = `stroke="${glassEdge}" stroke-opacity="0.24" stroke-width="${d.stroke * 0.75}" stroke-linecap="round"`;
    parts.push(line(glass.near, glass.top, hidden), line(glass.near, glass.lowerLeft, hidden), line(glass.near, glass.lowerRight, hidden));
  }

  // The ember core and its glow, inside the glass.
  parts.push(`<circle cx="${CENTRE[0]}" cy="${CENTRE[1]}" r="${d.glow}" fill="url(#glow)"/>`);
  parts.push(
    `<polygon points="${points(...core.faces.top)}" fill="${halite("amber")}"/>`,
    `<polygon points="${points(...core.faces.left)}" fill="${ember}"/>`,
    `<polygon points="${points(...core.faces.right)}" fill="${halite("ember-deep")}"/>`,
    `<polygon points="${points(core.top, core.upperRight, core.lowerRight, core.bottom, core.lowerLeft, core.upperLeft)}" fill="none" stroke="${halite("hot")}" stroke-opacity="0.85" stroke-width="${detail === "small" ? 1.2 : 0.7}" stroke-linejoin="round"/>`
  );

  // The glass faces: a faint fill, brighter on top.
  parts.push(
    `<polygon points="${points(...glass.faces.top)}" fill="${glassFill}" fill-opacity="${d.topFill}"/>`,
    `<polygon points="${points(...glass.faces.left)}" fill="${glassFill}" fill-opacity="${d.sideFill}"/>`,
    `<polygon points="${points(...glass.faces.right)}" fill="${glassFill}" fill-opacity="${d.sideFill}"/>`
  );

  if (detail === "full") {
    const grid = `stroke="${glassEdge}" stroke-opacity="0.22" stroke-width="${d.stroke * 0.6}"`;
    for (const face of [glass.faces.top, glass.faces.left, glass.faces.right]) {
      for (const [a, b] of lattice(face)) parts.push(line(a, b, grid));
    }
  }

  const edge = `stroke="${glassEdge}" stroke-opacity="${d.glassEdge}" stroke-width="${d.stroke}" stroke-linecap="round" stroke-linejoin="round"`;
  parts.push(
    `<polygon points="${points(glass.top, glass.upperRight, glass.lowerRight, glass.bottom, glass.lowerLeft, glass.upperLeft)}" fill="none" ${edge}/>`,
    line(glass.near, glass.upperLeft, edge),
    line(glass.near, glass.upperRight, edge),
    line(glass.near, glass.bottom, edge)
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}" width="${size}" height="${size}">${parts.join("")}</svg>`;
}

/** The mark as a data URI, for `<img>` inside generated images. */
export function markDataUri(options: Parameters<typeof markSvg>[0]) {
  return `data:image/svg+xml;base64,${Buffer.from(markSvg(options)).toString("base64")}`;
}
