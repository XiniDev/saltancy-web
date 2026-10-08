/**
 * Geometry of the light stream: a rope of strands twisting around a centre
 * line that runs through the page, anchored to where the crystals and
 * sections actually sit. Pure functions, all in page pixels.
 */

export type Anchor = { x: number; y: number; top: number; h: number };

export type StreamAnchors = {
  hero: Anchor;
  services: Anchor;
  grow: Anchor;
  /** Absent while the project hub section is switched off. */
  hub: Anchor | null;
  /** The Start section, which the stream must not cross. */
  start: Anchor;
  seed: Anchor;
};

/** A point on the centre line: position, rope radius, normal, arc length, brightness. */
export type Sample = { x: number; y: number; r: number; nx: number; ny: number; s: number; I: number };

/** kind: 0 amber, 1 hot near-white, 2 ember accent, 3 cool salt-white. */
export type Strand = { phase: number; reach: number; twist: number; width: number; kind: 0 | 1 | 2 | 3 };
export type Packet = { strand: number; start: number; speed: number; size: number };
export type Glow = { x: number; y: number; radius: number; amp: number };

export type Route = {
  samples: Sample[];
  step: number;
  total: number;
  minY: number;
  maxY: number;
  glows: Glow[];
  strands: Strand[];
  packets: Packet[];
  /** Radians of twist per pixel of arc length. */
  twistRate: number;
  /** Phone sizing for line widths and packets. */
  narrow: boolean;
};

type Key = { x: number; y: number; r: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/** Centripetal Catmull-Rom between p1 and p2 (no cusps or self-intersections). */
function catmullRom(p0: Key, p1: Key, p2: Key, p3: Key, u: number) {
  const d = (p: Key, q: Key) => Math.max(1e-4, Math.sqrt(Math.hypot(q.x - p.x, q.y - p.y)));
  const t0 = 0;
  const t1 = t0 + d(p0, p1);
  const t2 = t1 + d(p1, p2);
  const t3 = t2 + d(p2, p3);
  const t = t1 + (t2 - t1) * u;
  const lerp = (p: { x: number; y: number }, q: { x: number; y: number }, ta: number, tb: number) => {
    const w = tb - ta || 1e-4;
    return { x: ((tb - t) * p.x + (t - ta) * q.x) / w, y: ((tb - t) * p.y + (t - ta) * q.y) / w };
  };
  const a1 = lerp(p0, p1, t0, t1);
  const a2 = lerp(p1, p2, t1, t2);
  const a3 = lerp(p2, p3, t2, t3);
  const b1 = lerp(a1, a2, t0, t2);
  const b2 = lerp(a2, a3, t1, t3);
  return lerp(b1, b2, t1, t2);
}

/** Deterministic PRNG so the rope looks the same on every load. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * The route: enters from the right level with the hero crystal, pinches inside
 * it, swings down the left and across behind the services list, narrows into
 * the process crystal, runs down the left (behind the hub screen when it is
 * shown), then curves in from the right and ends in the seed crystal.
 */
function keyPoints(a: StreamAnchors, width: number, compact: boolean): Key[] {
  const { hero: c1, services: sv, grow: c2, hub, start, seed: c3 } = a;
  const W = width;
  const margin = clamp(W * 0.13, 40, 200) * (compact ? 0.6 : 1);
  const o1 = Math.min(170, W * 0.3);
  const o2 = Math.min(210, W * 0.3) + (compact ? 20 : 40);
  const o3 = Math.min(160, W * 0.28);
  const rs = compact ? 0.42 : 1;

  const keys: [number, number, number][] = [
    [W + (compact ? 60 : 140), c1.y, compact ? 2 : 3],
    [c1.x + o1, c1.y, compact ? 3 : 4],
    [c1.x, c1.y, 2],
    [c1.x - o1, c1.y + (compact ? 24 : 34), compact ? 8 : 12],
    [margin, c1.y + (compact ? 260 : 300), 56 * rs],
    [W * 0.2, sv.top + sv.h * 0.35, 92 * rs],
    [W * 0.8, sv.top + sv.h * 0.9, 110 * rs],
    [c2.x + o2, c2.y - (compact ? 60 : 70), (compact ? 28 : 34) * rs],
    [c2.x, c2.y, 2],
    [c2.x - o2, c2.y + (compact ? 60 : 70), (compact ? 28 : 34) * rs],
  ];

  if (hub) {
    // Down the left, then across behind the hub screen.
    keys.push([margin, hub.top + (compact ? 30 : 40), 96 * rs], [W - margin, hub.top + hub.h * 0.65, 120 * rs]);
  } else {
    // Down the left, then across in the gap above the Start section, clear of its text.
    keys.push([margin, start.top - (compact ? 20 : 40), 64 * rs], [W - margin, start.top + (compact ? 30 : 70), 72 * rs]);
  }

  keys.push(
    [W * 0.86, c3.y - (compact ? 160 : 220), 70 * rs],
    [c3.x + o3, c3.y, compact ? 8 : 10],
    [c3.x, c3.y, 1]
  );

  return keys.map(([x, y, r]) => ({ x, y, r }));
}

export function buildRoute(anchors: StreamAnchors, width: number): Route {
  const compact = width < 700;
  const narrow = width < 600;
  const P = keyPoints(anchors, width, compact);

  // Dense spline through the key points; rope radius eases between them.
  const ends = [P[0], ...P, P[P.length - 1]];
  const dense: Key[] = [];
  for (let i = 1; i < ends.length - 2; i++) {
    const [p0, p1, p2, p3] = [ends[i - 1], ends[i], ends[i + 1], ends[i + 2]];
    const n = Math.max(6, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / 4));
    for (let j = 0; j < n; j++) {
      const u = j / n;
      const q = catmullRom(p0, p1, p2, p3, u);
      const e = u * u * (3 - 2 * u);
      dense.push({ x: q.x, y: q.y, r: p1.r + (p2.r - p1.r) * e });
    }
  }
  dense.push(P[P.length - 1]);

  // Resample at an even arc-length step.
  const step = narrow ? 5 : 6;
  const pts: Key[] = [{ ...dense[0] }];
  let need = step;
  for (let i = 1; i < dense.length; i++) {
    let { x: ax, y: ay, r: ar } = dense[i - 1];
    const { x: bx, y: by, r: br } = dense[i];
    let d = Math.hypot(bx - ax, by - ay);
    while (d >= need && d > 0) {
      const f = need / d;
      ax += (bx - ax) * f;
      ay += (by - ay) * f;
      ar += (br - ar) * f;
      pts.push({ x: ax, y: ay, r: ar });
      d = Math.hypot(bx - ax, by - ay);
      need = step;
    }
    need -= d;
  }

  const { hero: c1, grow: c2, seed: c3 } = anchors;
  const gauss = (dx: number, dy: number, s: number) => Math.exp(-(dx * dx + dy * dy) / (s * s));
  const R1 = compact ? 150 : 230;
  const R3 = compact ? 120 : 190;

  let heroIndex = 0;
  let best = Infinity;
  const samples: Sample[] = pts.map((p, i) => {
    const a = pts[Math.max(0, i - 2)];
    const b = pts[Math.min(pts.length - 1, i + 2)];
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const dd = (p.x - c1.x) ** 2 + (p.y - c1.y) ** 2;
    if (dd < best) {
      best = dd;
      heroIndex = i;
    }
    return { x: p.x, y: p.y, r: p.r, nx: -(b.y - a.y) / len, ny: (b.x - a.x) / len, s: i * step, I: 0 };
  });

  // Bright and tight near the crystals, wider and dimmer elsewhere.
  let minY = Infinity;
  let maxY = -Infinity;
  samples.forEach((p, i) => {
    let I =
      0.34 +
      1.05 * gauss(p.x - c1.x, p.y - c1.y, R1) +
      0.95 * gauss(p.x - c2.x, p.y - c2.y, R1) +
      0.9 * gauss(p.x - c3.x, p.y - c3.y, R3);
    if (i < heroIndex) I += 0.45;
    const toEnd = (samples.length - 1 - i) * step;
    if (toEnd < 40) I *= Math.max(0, toEnd / 40);
    p.I = Math.min(1.7, I);
    minY = Math.min(minY, p.y - p.r);
    maxY = Math.max(maxY, p.y + p.r);
  });

  const glowR = compact ? [150, 140, 100] : [230, 210, 150];
  const glows: Glow[] = [
    { x: c1.x, y: c1.y, radius: glowR[0], amp: 0.55 },
    { x: c2.x, y: c2.y, radius: glowR[1], amp: 0.5 },
    { x: c3.x, y: c3.y, radius: glowR[2], amp: 0.65 },
  ];
  for (const g of glows) {
    minY = Math.min(minY, g.y - g.radius);
    maxY = Math.max(maxY, g.y + g.radius);
  }

  const rnd = seeded(7);
  const strandCount = narrow ? 14 : 26;
  const strands: Strand[] = Array.from({ length: strandCount }, (_, i) => ({
    phase: (i / strandCount) * Math.PI * 2 + rnd() * 0.3,
    reach: 0.55 + rnd() * 0.55,
    twist: 0.92 + rnd() * 0.16,
    width: narrow ? 0.5 + rnd() * 0.8 : 0.55 + rnd() * 0.9,
    kind: i % 7 === 3 ? 3 : i % 4 === 0 ? 1 : i % 3 === 1 ? 2 : 0,
  }));

  const total = samples.length * step;
  const packetCount = narrow ? 10 : 22;
  const packets: Packet[] = Array.from({ length: packetCount }, () => ({
    strand: Math.floor(rnd() * strandCount),
    start: rnd() * total,
    speed: narrow ? 90 + rnd() * 110 : 110 + rnd() * 140,
    size: narrow ? 0.5 + rnd() * 0.6 : 0.6 + rnd() * 0.8,
  }));

  return {
    samples,
    step,
    total,
    minY,
    maxY,
    glows,
    strands,
    packets,
    twistRate: (Math.PI * 2) / (compact ? 300 : 460),
    narrow,
  };
}
