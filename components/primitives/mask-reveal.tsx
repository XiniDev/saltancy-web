"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MaskReveal({
  lines,
  className,
  delay = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
          <m.span
            className="block"
            initial={{ y: reduce ? 0 : "115%" }}
            animate={inView ? { y: 0 } : undefined}
            transition={{ duration: DURATION, ease: EASE, delay: delay + i * STAGGER }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}
