export type Pt = readonly [number, number];

export const FRONT = { A: [7, 14], B: [23, 14], C: [23, 30], D: [7, 30] } as const;
export const BACK = { E: [13, 8], F: [29, 8], G: [29, 24], H: [13, 24] } as const;

export type Edge = { x1: number; y1: number; x2: number; y2: number; back?: boolean };

const edge = (a: Pt, b: Pt, back = false): Edge => ({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], back });

export const EDGES: Edge[] = [
  edge(FRONT.A, FRONT.B), edge(FRONT.B, FRONT.C), edge(FRONT.C, FRONT.D), edge(FRONT.D, FRONT.A),
  edge(BACK.E, BACK.F, true), edge(BACK.F, BACK.G, true), edge(BACK.G, BACK.H, true), edge(BACK.H, BACK.E, true),
  edge(FRONT.A, BACK.E), edge(FRONT.B, BACK.F), edge(FRONT.C, BACK.G), edge(FRONT.D, BACK.H),
];

export const NODES: { p: Pt; orange?: boolean }[] = [
  { p: FRONT.A }, { p: FRONT.B, orange: true }, { p: FRONT.C }, { p: FRONT.D },
  { p: BACK.E }, { p: BACK.F }, { p: BACK.G }, { p: BACK.H },
];
