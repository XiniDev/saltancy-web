"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const V: number[][] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];
const ORANGE = 5;

const VIEW = 360;
const C = VIEW / 2;
const SIZE = 74;
const PERSP = 4.5;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function HeroCrystal3D({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const st = useRef({ rotX: -0.32, rotY: 0.6, tX: 0, tY: 0, cX: 0, cY: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function project(v: number[], rx: number, ry: number) {
      const x = v[0], y = v[1], z = v[2];
      const X = x * Math.cos(ry) + z * Math.sin(ry);
      const Z = -x * Math.sin(ry) + z * Math.cos(ry);
      const Y2 = y * Math.cos(rx) - Z * Math.sin(rx);
      const Z2 = y * Math.sin(rx) + Z * Math.cos(rx);
      const s = PERSP / (PERSP - Z2);
      return { sx: C + X * SIZE * s, sy: C + Y2 * SIZE * s, s, z: Z2 };
    }

    function frame(spin: boolean) {
      const s = st.current;
      if (spin) s.rotY += 0.0016;
      s.cX += (s.tX - s.cX) * 0.08;
      s.cY += (s.tY - s.cY) * 0.08;
      const rx = s.rotX + s.cX;
      const ry = s.rotY + s.cY;
      const p = V.map((v) => project(v, rx, ry));

      EDGES.forEach((e, i) => {
        const a = p[e[0]];
        const b = p[e[1]];
        const ln = lineRefs.current[i];
        if (!ln) return;
        ln.setAttribute("x1", a.sx.toFixed(1));
        ln.setAttribute("y1", a.sy.toFixed(1));
        ln.setAttribute("x2", b.sx.toFixed(1));
        ln.setAttribute("y2", b.sy.toFixed(1));
        const za = (a.z + b.z) / 2;
        ln.setAttribute("stroke-opacity", (0.4 + 0.45 * clamp((za + 1.4) / 2.8, 0, 1)).toFixed(2));
      });
      p.forEach((pt, i) => {
        const c = nodeRefs.current[i];
        if (!c) return;
        c.setAttribute("cx", pt.sx.toFixed(1));
        c.setAttribute("cy", pt.sy.toFixed(1));
        c.setAttribute("r", (pt.s * (i === ORANGE ? 3.6 : 2.6)).toFixed(1));
      });
    }

    frame(false);
    if (reduce) return;

    let raf = 0;
    const loop = () => {
      frame(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      st.current.tY = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1.4, 1.4) * 0.5;
      st.current.tX = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1.4, 1.4) * -0.4;
    };
    const onLeave = () => {
      st.current.tX = 0;
      st.current.tY = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) raf = requestAnimationFrame(loop);
        else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    if (svgRef.current) io.observe(svgRef.current);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={cn("h-full w-full text-foreground animate-in fade-in duration-700", className)}
      aria-hidden
    >
      {EDGES.map((_, i) => (
        <line
          key={`e${i}`}
          ref={(el) => {
            lineRefs.current[i] = el;
          }}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      ))}
      {V.map((_, i) => (
        <circle
          key={`n${i}`}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          className={i === ORANGE ? "fill-primary" : "fill-current"}
          fillOpacity={i === ORANGE ? 1 : 0.85}
        />
      ))}
    </svg>
  );
}
