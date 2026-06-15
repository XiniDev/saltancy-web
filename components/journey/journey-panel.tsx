"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useContext, useEffect, useRef, useState } from "react";
import { PagerContext } from "@/components/journey/scroll-journey";
import { cn } from "@/lib/utils";

const base =
  "relative flex min-h-svh shrink-0 snap-start snap-always flex-col overflow-hidden";

function DepthPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const container = useContext(PagerContext);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: container ?? undefined,
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02]);

  return (
    <m.div
      ref={ref}
      className={cn(base, className)}
      style={{ opacity, scale, transformOrigin: "center" }}
    >
      {children}
    </m.div>
  );
}

export function JourneyPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [depth, setDepth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setDepth(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!depth || reduce) {
    return <div className={cn(base, className)}>{children}</div>;
  }

  return <DepthPanel className={className}>{children}</DepthPanel>;
}
