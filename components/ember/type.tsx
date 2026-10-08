import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small mono line above a heading. */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase sm:text-xs", className)}>
      {children}
    </p>
  );
}

/** The one italic, ember-coloured word in each heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-light text-primary italic">{children}</em>;
}

/** Centred section heading. */
export function SectionHeading({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2
      className={cn(
        "font-serif text-[36px] leading-[1.06] font-normal tracking-[-0.03em] text-foreground-strong",
        "sm:text-[clamp(40px,4.4vw,64px)] sm:leading-[1.04]",
        className
      )}
    >
      {children}
    </h2>
  );
}
