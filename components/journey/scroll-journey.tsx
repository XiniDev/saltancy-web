"use client";

import { createContext, useRef } from "react";
import { cn } from "@/lib/utils";

export const PagerContext =
  createContext<React.RefObject<HTMLElement | null> | null>(null);

export function ScrollJourney({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <PagerContext.Provider value={ref}>
      <main
        ref={ref}
        className={cn(
          "pager h-svh overflow-y-auto overflow-x-hidden overscroll-y-contain bg-background",
          className
        )}
      >
        {children}
      </main>
    </PagerContext.Provider>
  );
}
