import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The Halite palette, read from app/globals.css so that generated images (the
 * icons and the social card) use exactly the site's colour tokens. Build time
 * only: every route that uses this is prerendered.
 */
let palette: Map<string, string> | null = null;

function hslToHex(h: number, s: number, l: number) {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const value = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

/** A Halite base token at some opacity, as rgba(). */
export function haliteAlpha(name: string, alpha: number): string {
  const hex = halite(name);
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** A Halite base token (`--halite-<name>`) as a hex colour. */
export function halite(name: string): string {
  if (!palette) {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    palette = new Map(
      [...css.matchAll(/--halite-([a-z-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%;/g)].map((m) => [
        m[1],
        hslToHex(Number(m[2]), Number(m[3]), Number(m[4])),
      ])
    );
  }
  const hex = palette.get(name);
  if (!hex) throw new Error(`No --halite-${name} token in app/globals.css`);
  return hex;
}
