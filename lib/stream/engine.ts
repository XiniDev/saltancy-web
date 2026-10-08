import { buildRoute, type Anchor, type Route } from "./route";
import { drawStream, VIEW_MARGIN, type StreamPalette } from "./render";

/** Backing-store pixel budget: keeps fill cost flat on dense phone screens. */
const PIXEL_BUDGET = 3.2e6;
/** Ambient animation runs at ~30fps; scrolling redraws every frame. */
const AMBIENT_FRAME_MS = 32;
/** Time offset so the first (and the reduced-motion) frame shows a developed rope. */
const STILL_T = 7.5;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Resolve a colour token to a canvas-ready value through a hidden probe element. */
function readPalette(host: HTMLElement): StreamPalette {
  const probe = document.createElement("span");
  probe.style.display = "none";
  host.appendChild(probe);
  const token = (name: string) => {
    probe.style.color = `var(${name})`;
    return getComputedStyle(probe).color;
  };

  const front: StreamPalette["front"] = [
    token("--stream-amber"),
    token("--stream-hot"),
    token("--stream-ember"),
    token("--stream-salt"),
  ];
  const back = token("--stream-rust");

  const sprite = document.createElement("canvas");
  sprite.width = 64;
  sprite.height = 64;
  const g = sprite.getContext("2d");
  if (g) {
    const gradient = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, token("--stream-spark-core"));
    gradient.addColorStop(0.18, token("--stream-spark-warm"));
    gradient.addColorStop(0.45, token("--stream-spark-ember"));
    gradient.addColorStop(1, token("--stream-spark-fade"));
    g.fillStyle = gradient;
    g.fillRect(0, 0, 64, 64);
  }

  probe.remove();
  return { front, back, sprite };
}

type Pin = {
  start: number;
  length: number;
  outerTop: number;
  outer: HTMLElement | null;
  inner: HTMLElement | null;
};

const NO_PIN: Pin = { start: 0, length: 0, outerTop: 0, outer: null, inner: null };

/**
 * The process section can pin (sticky) while its steps play out. The stream
 * works in "collapsed" page coordinates where that pinned stretch takes no
 * scroll distance, so it stays attached to the pinned crystal.
 */
function measurePin(): Pin {
  const outer = document.querySelector<HTMLElement>("[data-stream-pin]");
  const inner = outer?.querySelector<HTMLElement>("[data-stream-pin-inner]");
  if (!outer || !inner) return NO_PIN;
  const style = getComputedStyle(inner);
  if (style.position !== "sticky") return NO_PIN;
  const outerTop = outer.getBoundingClientRect().top + window.scrollY;
  return {
    start: outerTop - (parseFloat(style.top) || 0),
    length: Math.max(0, outer.offsetHeight - inner.offsetHeight),
    outerTop,
    outer,
    inner,
  };
}

function measureAnchor(name: string, pin: Pin): Anchor | null {
  const el = document.querySelector<HTMLElement>(`[data-stream-anchor="${name}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  let top = r.top + window.scrollY;
  if (pin.outer && pin.inner) {
    if (pin.inner.contains(el)) {
      // Where it sits while the section rests at its top, before pinning starts.
      top = r.top - pin.inner.getBoundingClientRect().top + pin.outerTop;
    } else if (pin.outer.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) {
      // After the pinned section in flow: decided by document order, not by a
      // pixel comparison that sub-pixel layout can tip either way.
      top -= pin.length;
    }
  }
  return { x: r.left + r.width / 2, y: top + r.height / 2, top, h: r.height };
}

/**
 * Run the light stream on a viewport-sized, fixed canvas. Draws only the part
 * of the route on screen, pauses when the tab is hidden or the route is off
 * screen, and holds a still frame for reduced motion. Returns a stop function.
 */
export function startStream(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduced = window.matchMedia(REDUCED_MOTION);
  const palette = readPalette(canvas.parentElement ?? document.body);
  const t0 = performance.now();

  let route: Route | null = null;
  let pin = NO_PIN;
  let cssH = 0;
  let scale = 1;
  let raf = 0;
  let layoutRaf = 0;
  let dirty = true;
  let painted = false;
  let lastAmbient = 0;
  let alive = true;

  const clear = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    painted = false;
  };

  const viewTop = () => {
    const y = window.scrollY;
    return y - Math.min(Math.max(y - pin.start, 0), pin.length);
  };

  const frame = (now: number) => {
    raf = 0;
    if (document.hidden || !route) return;
    const moving = !reduced.matches;
    const top = viewTop();
    const onScreen = top + cssH + VIEW_MARGIN > route.minY && top - VIEW_MARGIN < route.maxY;
    if (!onScreen) {
      if (painted) clear();
      return; // idle until a scroll brings the route back
    }
    const ambientDue = moving && now - lastAmbient >= AMBIENT_FRAME_MS;
    if (dirty || ambientDue) {
      const t = moving ? (now - t0) / 1000 + STILL_T : STILL_T;
      drawStream(ctx, route, palette, t, { top, height: cssH, scale });
      painted = true;
      dirty = false;
      if (ambientDue) lastAmbient = now;
    }
    if (moving) schedule();
  };

  const schedule = () => {
    if (alive && !raf) raf = requestAnimationFrame(frame);
  };

  const invalidate = () => {
    dirty = true;
    schedule();
  };

  const layout = () => {
    layoutRaf = 0;
    const cssW = canvas.clientWidth;
    cssH = canvas.clientHeight;
    if (!cssW || !cssH) return;

    const dpr = window.devicePixelRatio || 1;
    scale = Math.max(0.5, Math.min(dpr, 2, Math.sqrt(PIXEL_BUDGET / (cssW * cssH))));
    const pw = Math.round(cssW * scale);
    const ph = Math.round(cssH * scale);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }

    pin = measurePin();
    const hero = measureAnchor("hero", pin);
    const services = measureAnchor("services", pin);
    const grow = measureAnchor("grow", pin);
    const start = measureAnchor("start", pin);
    const seed = measureAnchor("seed", pin);
    const hub = measureAnchor("hub", pin);
    route =
      hero && services && grow && start && seed
        ? buildRoute({ hero, services, grow, hub, start, seed }, cssW)
        : null;
    if (!route) clear();
    invalidate();
  };

  const relayout = () => {
    if (alive && !layoutRaf) layoutRaf = requestAnimationFrame(layout);
  };

  const onVisibility = () => {
    if (!document.hidden) invalidate();
  };

  // The route follows the layout: resize, content reflow, fonts arriving.
  const observer = new ResizeObserver(relayout);
  observer.observe(document.body);
  observer.observe(canvas);
  window.addEventListener("scroll", invalidate, { passive: true });
  window.addEventListener("resize", relayout);
  document.addEventListener("visibilitychange", onVisibility);
  reduced.addEventListener("change", invalidate);
  document.fonts?.addEventListener("loadingdone", relayout);
  document.fonts?.ready.then(relayout);

  layout();

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    cancelAnimationFrame(layoutRaf);
    observer.disconnect();
    window.removeEventListener("scroll", invalidate);
    window.removeEventListener("resize", relayout);
    document.removeEventListener("visibilitychange", onVisibility);
    reduced.removeEventListener("change", invalidate);
    document.fonts?.removeEventListener("loadingdone", relayout);
    clear();
  };
}
