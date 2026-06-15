"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE, STAGGER } from "@/lib/motion";
import { EDGES, NODES } from "@/lib/unit-cell";

export function Logo({
  className,
  showWordmark = true,
  animate = true,
}: {
  className?: string;
  showWordmark?: boolean;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const play = animate && !reduce;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <m.svg
        viewBox="0 0 36 36"
        className="h-7 w-7 shrink-0 text-foreground"
        initial={play ? "hidden" : false}
        animate="show"
        variants={{ show: { transition: { staggerChildren: STAGGER * 0.4, delayChildren: 0.05 } } }}
        aria-hidden
      >
        {EDGES.map((e, i) => (
          <m.line
            key={`e${i}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={e.back ? 0.45 : 1}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
            }}
          />
        ))}
        {NODES.map((n, i) => (
          <m.circle
            key={`n${i}`}
            cx={n.p[0]}
            cy={n.p[1]}
            r={n.orange ? 2.2 : 1.7}
            className={n.orange ? "fill-primary" : "fill-current"}
            style={{ transformOrigin: `${n.p[0]}px ${n.p[1]}px` }}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
            }}
          />
        ))}
      </m.svg>
      {showWordmark && (
        <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Saltancy<span className="text-primary">.</span>
        </span>
      )}
    </span>
  );
}
