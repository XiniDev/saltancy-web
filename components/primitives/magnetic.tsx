"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function Magnetic({
  children,
  strength = 0.35,
  max = 8,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength, -max, max));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength, -max, max));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </m.div>
  );
}
