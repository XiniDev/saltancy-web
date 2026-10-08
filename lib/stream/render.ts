import type { Route } from "./route";

/** Colours come from theme tokens, resolved by the caller. Strokes are opaque; alpha is set per stroke. */
export type StreamPalette = {
  /** Front strand colours by strand kind: amber, hot, ember, salt. */
  front: [string, string, string, string];
  /** Strands behind the centre line: dimmer, deeper rust. */
  back: string;
  /** Soft glow sprite for packets and crystal glows. */
  sprite: CanvasImageSource;
};

export type StreamView = {
  /** Top of the viewport in (collapsed) page pixels. */
  top: number;
  height: number;
  /** Device pixels per CSS pixel on the backing store. */
  scale: number;
};

/** Draw margin above and below the viewport: the widest rope plus glow reach. */
export const VIEW_MARGIN = 300;

const SPIN = 0.42;
/** Points per stroked run: short enough that brightness follows the route. */
const MAX_RUN = 24;

/**
 * Draw one frame of the stream at time `t` (seconds). Only the part of the
 * route inside the viewport (plus margin) is touched.
 */
export function drawStream(
  ctx: CanvasRenderingContext2D,
  route: Route,
  palette: StreamPalette,
  t: number,
  view: StreamView
) {
  const { samples, step, total, strands, packets, twistRate, narrow } = route;
  const { top, height, scale } = view;
  const y0 = top - VIEW_MARGIN;
  const y1 = top + height + VIEW_MARGIN;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.setTransform(scale, 0, 0, scale, 0, -top * scale);
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Warm light pooled around each crystal, breathing slightly.
  for (const g of route.glows) {
    if (g.y + g.radius < y0 || g.y - g.radius > y1) continue;
    const r = g.radius * (0.9 + 0.1 * Math.sin(t * 1.3 + g.x * 0.01));
    ctx.globalAlpha = g.amp;
    ctx.drawImage(palette.sprite, g.x - r, g.y - r, r * 2, r * 2);
  }

  const glowWidth = narrow ? 5 : 6;
  const coreWidth = narrow ? 0.5 : 0.6;
  const backWidth = narrow ? 0.35 : 0.4;

  const stroke = (pts: number[]) => {
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let j = 2; j < pts.length; j += 2) ctx.lineTo(pts[j], pts[j + 1]);
    ctx.stroke();
  };

  for (const st of strands) {
    const colour = palette.front[st.kind];
    let pts: number[] = [];
    let front: boolean | null = null;
    let sumI = 0;

    const flush = () => {
      if (pts.length < 4) return;
      const I = sumI / (pts.length / 2);
      if (front) {
        ctx.strokeStyle = colour;
        ctx.globalAlpha = Math.min(0.5, 0.07 * I);
        ctx.lineWidth = glowWidth * st.width + 2;
        stroke(pts);
        ctx.globalAlpha = Math.min(1, 0.5 * I);
        ctx.lineWidth = coreWidth + st.width;
      } else {
        ctx.strokeStyle = palette.back;
        ctx.globalAlpha = Math.min(0.7, 0.26 * I);
        ctx.lineWidth = backWidth + st.width * 0.6;
      }
      stroke(pts);
    };

    for (const p of samples) {
      if (p.y < y0 || p.y > y1) {
        if (pts.length) {
          flush();
          pts = [];
          sumI = 0;
          front = null;
        }
        continue;
      }
      const th = st.phase + p.s * twistRate * st.twist + t * SPIN;
      const c = Math.cos(th);
      const sn = Math.sin(th);
      const rad = p.r * st.reach;
      const x = p.x + p.nx * rad * c;
      const y = p.y + p.ny * rad * c - sn * rad * 0.16;
      const isFront = sn >= 0;
      if (front === null) front = isFront;
      pts.push(x, y);
      sumI += p.I;
      // Split runs where the strand passes behind the centre line, and keep paths short.
      if (isFront !== front || pts.length >= MAX_RUN * 2) {
        flush();
        pts = [x, y];
        sumI = p.I;
        front = isFront;
      }
    }
    flush();
  }

  // Bright packets of light travelling along the rope.
  const packetBase = narrow ? 8 : 10;
  const packetGrow = narrow ? 6 : 8;
  for (const pk of packets) {
    const st = strands[pk.strand % strands.length];
    const s = (pk.start + pk.speed * t) % total;
    const p = samples[Math.min(samples.length - 1, Math.floor(s / step))];
    if (!p || p.y < y0 || p.y > y1) continue;
    const th = st.phase + p.s * twistRate * st.twist + t * SPIN;
    const c = Math.cos(th);
    const sn = Math.sin(th);
    if (sn < -0.2) continue;
    const rad = p.r * st.reach;
    const x = p.x + p.nx * rad * c;
    const y = p.y + p.ny * rad * c - sn * rad * 0.16;
    const size = (packetBase + packetGrow * pk.size) * (0.75 + 0.35 * sn);
    ctx.globalAlpha = Math.max(0, Math.min(1, (0.55 + 0.4 * sn) * Math.min(1, p.I)));
    ctx.drawImage(palette.sprite, x - size, y - size, size * 2, size * 2);
  }

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}
