"use client";

import { m, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const INTERACTIVE = "a,button,[role='button'],[data-cursor='interactive']";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const next = Boolean((e.target as Element | null)?.closest(INTERACTIVE));
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    let attached = false;
    const attach = () => {
      if (attached) return;
      attached = true;
      document.documentElement.classList.add("cursor-none");
      window.addEventListener("pointermove", onMove, { passive: true });
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", onMove);
    };

    const sync = () => {
      const on = mq.matches && !reduceMq.matches;
      setEnabled(on);
      if (on) attach();
      else detach();
    };

    sync();
    mq.addEventListener("change", sync);
    reduceMq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      reduceMq.removeEventListener("change", sync);
      detach();
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
      style={{ x, y }}
    >
      <m.div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 rounded-full transition-[background-color,border-color,box-shadow] duration-200",
          active ? "bg-primary ring-2 ring-background" : "border border-foreground/40"
        )}
        animate={{ width: active ? 10 : 22, height: active ? 10 : 22 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
    </m.div>
  );
}
