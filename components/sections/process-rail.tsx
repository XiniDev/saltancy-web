"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { EASE, STAGGER } from "@/lib/motion";
import { process } from "@/lib/content/process";
import { cn } from "@/lib/utils";

export function ProcessRail() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  return (
    <ul ref={ref} className="relative space-y-8">
      <m.span
        aria-hidden
        className="absolute bottom-3 left-[11px] top-3 w-px bg-foreground/15"
        style={{ transformOrigin: "top" }}
        initial={{ scaleY: reduce ? 1 : 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
      />

      {process.map((step, i) => {
        const last = i === process.length - 1;
        return (
          <li key={step.index} className="relative flex gap-5">
            <span className="relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-foreground/40 bg-background">
              <m.span
                className={cn("size-2 rounded-full", last ? "bg-primary" : "bg-foreground")}
                initial={{ scale: reduce ? 1 : 0 }}
                animate={inView ? { scale: 1 } : undefined}
                transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * STAGGER }}
              />
            </span>
            <div className="pb-1">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {step.index} · {step.phase}
              </p>
              <h3 className="mt-1.5 font-serif text-xl font-medium tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-1 text-foreground/70">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
