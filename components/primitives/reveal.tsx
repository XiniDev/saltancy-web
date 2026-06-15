"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { DURATION, EASE } from "@/lib/motion";

export function Reveal({
  children,
  y = 24,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: DURATION, ease: EASE, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
