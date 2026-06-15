"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "services", label: "Services" },
  { id: "approach", label: "Approach" },
  { id: "cta", label: "Contact" },
];

export function LatticeRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const pager = document.querySelector<HTMLElement>(".pager");
    const target: HTMLElement | Window = pager ?? window;

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) current = s.id;
      }
      setActive(current);
    };

    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ul className="relative flex flex-col items-center gap-5">
        <span
          aria-hidden
          className="absolute bottom-2 left-1/2 top-2 -z-10 w-px -translate-x-1/2 bg-foreground/15"
        />
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`/#${s.id}`}
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex size-4 items-center justify-center"
              >
                <span
                  className={cn(
                    "size-2 rotate-45 rounded-[1px] border bg-background transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "scale-125 border-primary bg-primary"
                      : "border-foreground/40 group-hover:border-foreground"
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
