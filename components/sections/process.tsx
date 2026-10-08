"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GrowCrystal, type GrowStage } from "@/components/ember/crystal";
import { Accent, Eyebrow, SectionHeading } from "@/components/ember/type";
import { process } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

const toStage = (progress: number) =>
  (1 + Math.floor(Math.min(Math.max(progress, 0), 0.9999) * 4)) as GrowStage;

/**
 * "How a project runs". Scrolling drives the steps: each becomes active in
 * turn and the crystal grows to match. Where the section fits the viewport it
 * pins (sticky) while the four steps play out; otherwise the steps advance as
 * the row scrolls up the screen. The steps are buttons too, so click and
 * keyboard work. With reduced motion nothing is driven by scroll and the
 * complete crystal shows; without JavaScript every step reads as active.
 */
export function Process() {
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  const [fits, setFits] = useState(false);
  const [scrollStage, setScrollStage] = useState<GrowStage | null>(null);
  // A step chosen by click or keyboard holds until scrolling moves to another step.
  const [picked, setPicked] = useState<{ stage: GrowStage; band: GrowStage | null } | null>(null);

  const pinned = fits && !reduced;
  const stage: GrowStage | null = reduced
    ? (picked?.stage ?? 4)
    : picked && picked.band === scrollStage
      ? picked.stage
      : scrollStage;

  useEffect(() => {
    if (reduced) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const content = contentRef.current;
    const steps = stepsRef.current;
    if (!outer || !inner || !content || !steps) return;

    let frame = 0;

    const measureFit = () => {
      const header = document.querySelector<HTMLElement>("[data-site-header]")?.offsetHeight ?? 0;
      const room = document.documentElement.clientHeight - header - 32;
      setFits(content.offsetHeight <= room);
    };

    const readStage = () => {
      frame = 0;
      let progress: number;
      if (outer.dataset.pinned === "true") {
        const length = outer.offsetHeight - inner.offsetHeight;
        progress = length > 0 ? -outer.getBoundingClientRect().top / length : 0;
      } else {
        const viewport = window.innerHeight;
        progress = (viewport * 0.85 - steps.getBoundingClientRect().top) / (viewport * 0.5);
      }
      const next = toStage(progress);
      setScrollStage(next);
      setPicked((held) => (held && held.band !== next ? null : held));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(readStage);
    };
    const onResize = () => {
      measureFit();
      onScroll();
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(content);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const first = requestAnimationFrame(onResize);

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // Re-run when pinning flips so the stage is read against the new layout.
  }, [reduced, pinned]);

  const { heading } = process;

  return (
    <section
      id="approach"
      ref={outerRef}
      data-stream-pin
      data-pinned={pinned}
      className="group text-halo relative z-10 data-[pinned=true]:h-[220svh]"
    >
      <div
        ref={innerRef}
        data-stream-pin-inner
        className={cn(
          "flex min-h-[820px] items-start justify-center px-6 pt-14 sm:min-h-[920px] sm:pt-[110px] sm:pb-[90px]",
          "group-data-[pinned=true]:sticky group-data-[pinned=true]:top-0 group-data-[pinned=true]:h-svh",
          "group-data-[pinned=true]:min-h-0 group-data-[pinned=true]:items-center",
          "group-data-[pinned=true]:pt-16 group-data-[pinned=true]:pb-4 sm:group-data-[pinned=true]:pt-20"
        )}
      >
        <div ref={contentRef} className="flex w-full max-w-[1120px] flex-col items-center gap-5 sm:gap-10">
          <header className="flex flex-col items-center gap-3 text-center sm:gap-4">
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <SectionHeading>
              {heading.before} <Accent>{heading.emphasis}</Accent> {heading.end}
            </SectionHeading>
          </header>

          <GrowCrystal stage={stage} />

          <ol ref={stepsRef} className="grid w-full grid-cols-2 gap-x-4 gap-y-[22px] lg:flex lg:gap-5">
            {process.steps.map((step, i) => {
              const k = (i + 1) as GrowStage;
              const current = stage === k;
              const lit = stage === null || current;
              return (
                <li
                  key={step.index}
                  data-step={k}
                  data-active={current}
                  className={cn(
                    "flex min-w-0 flex-col gap-1.5 border-t-2 pt-3 sm:gap-2.5 sm:pt-[18px] lg:flex-1",
                    "motion-safe:transition-colors motion-safe:duration-400",
                    current ? "border-primary" : "border-hairline"
                  )}
                >
                  <button
                    type="button"
                    aria-pressed={current}
                    onClick={() => setPicked({ stage: k, band: scrollStage })}
                    className="flex min-h-11 cursor-pointer items-baseline gap-2 rounded-md text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:gap-3"
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] sm:text-xs motion-safe:transition-colors",
                        lit ? "text-primary" : "text-subtle-foreground"
                      )}
                    >
                      {step.index}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-[22px] tracking-[-0.02em] sm:text-[28px] motion-safe:transition-colors",
                        lit ? "text-foreground-strong" : "text-subtle-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                  <p
                    className={cn(
                      "text-[13px] leading-[1.55] sm:text-[15px] sm:leading-[1.6] motion-safe:transition-colors",
                      lit ? "text-muted-foreground" : "text-faint-foreground"
                    )}
                  >
                    <span className="sm:hidden">{step.short}</span>
                    <span className="max-sm:hidden">{step.body}</span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
