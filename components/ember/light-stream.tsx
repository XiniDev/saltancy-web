"use client";

import { useEffect, useRef } from "react";
import { startStream } from "@/lib/stream/engine";

/**
 * The light stream: one continuous rope of light behind the whole page, drawn
 * on a fixed, viewport-sized canvas. Purely decorative. If it can't run, the
 * page is complete without it.
 */
export function LightStream() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let stop = () => {};
    try {
      stop = startStream(canvas);
    } catch {
      // Decoration only: the page stands without it.
    }
    return () => stop();
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      data-stream
      className="pointer-events-none fixed inset-x-0 top-0 z-0 block h-lvh w-full"
    />
  );
}
