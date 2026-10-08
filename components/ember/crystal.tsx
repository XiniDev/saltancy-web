import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const FACES = ["front", "back", "right", "left", "top", "bottom"] as const;

type CubeProps = ComponentProps<"span"> & {
  tone?: "glass" | "ember" | "ember-soft";
  lattice?: boolean;
  glow?: boolean;
  style?: CSSVars;
};

/** A CSS 3D cube. Size comes from the inherited --cube custom property. */
export function Cube({ tone = "glass", lattice, glow, className, children, ...rest }: CubeProps) {
  return (
    <span
      className={cn("cube", className)}
      data-tone={tone}
      data-lattice={lattice || undefined}
      data-glow={glow || undefined}
      {...rest}
    >
      {FACES.map((face) => (
        <span key={face} className="cube-face" data-face={face} />
      ))}
      {children}
    </span>
  );
}

/**
 * The hero crystal: a slowly turning glass cube with a 2x2 lattice on its
 * faces and a small glowing ember cube counter-rotating inside it.
 */
export function HeroCrystal({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      data-stream-anchor="hero"
      className={cn(
        "crystal-stage h-[200px] w-[220px] perspective-[800px]",
        "[--core:40px] [--cube-glow:16px] [--cube-inner-glow:20px] [--hero:112px]",
        "sm:my-1.5 sm:h-[270px] sm:w-[280px] sm:perspective-[1000px]",
        "sm:[--core:56px] sm:[--cube-glow:22px] sm:[--cube-inner-glow:26px] sm:[--hero:160px]",
        className
      )}
    >
      <Cube lattice className="crystal-spin" style={{ "--cube": "var(--hero)" }}>
        <Cube
          tone="ember"
          glow
          className="crystal-core absolute top-[calc((var(--hero)-var(--core))/2)] left-[calc((var(--hero)-var(--core))/2)]"
          style={{ "--cube": "var(--core)" }}
        />
      </Cube>
    </span>
  );
}

export type GrowStage = 1 | 2 | 3 | 4;

/** Bottom layer first, then the ember-tinted top layer at the last step. */
const CELLS = [
  { x: -1, y: 1, z: 1, from: 1, delay: 0, top: false },
  { x: 1, y: 1, z: 1, from: 2, delay: 0, top: false },
  { x: -1, y: 1, z: -1, from: 3, delay: 0, top: false },
  { x: 1, y: 1, z: -1, from: 3, delay: 0.12, top: false },
  { x: -1, y: -1, z: 1, from: 4, delay: 0, top: true },
  { x: 1, y: -1, z: 1, from: 4, delay: 0.08, top: true },
  { x: -1, y: -1, z: -1, from: 4, delay: 0.16, top: true },
  { x: 1, y: -1, z: -1, from: 4, delay: 0.24, top: true },
] as const;

/**
 * The process crystal. It assembles from unit cubes as the steps progress:
 * 1, 2, 4, then 8. `stage` null means the complete crystal (no JavaScript).
 */
export function GrowCrystal({ stage, className }: { stage: GrowStage | null; className?: string }) {
  return (
    <div
      aria-hidden
      data-stream-anchor="grow"
      data-stage={stage ?? "all"}
      className={cn(
        "crystal-stage h-[240px] w-[260px] shrink-0 perspective-[900px] [--cube-inner-glow:20px] [--cube:60px]",
        "sm:h-[300px] sm:w-[320px] sm:perspective-[1100px] sm:[--cube-inner-glow:26px] sm:[--cube:84px]",
        className
      )}
    >
      <span className="cube crystal-turn">
        {CELLS.map((cell, i) => {
          const shown = stage === null || stage >= cell.from;
          return (
            <Cube
              key={i}
              tone={cell.top ? "ember-soft" : "glass"}
              className="grow-cell"
              data-cell={i + 1}
              data-shown={shown}
              style={{
                "--cell-x": cell.x,
                "--cell-y": cell.y,
                "--cell-z": cell.z,
                "--cell-shown": shown ? 1 : 0,
                "--cell-delay": `${cell.delay}s`,
              }}
            />
          );
        })}
      </span>
    </div>
  );
}

/**
 * The logo mark: the hero crystal in miniature, a glass cube with a glowing
 * ember core. It turns slowly unless `still`, and always holds still under
 * reduced motion. Its still SVG twin, for icons, is lib/brand/mark.ts.
 */
export function CrystalMark({ still, className }: { still?: boolean; className?: string }) {
  const hold = still && "[animation:none]";
  return (
    <span
      aria-hidden
      data-logo-mark
      className={cn(
        "crystal-stage logo-mark size-7 shrink-0 perspective-[120px]",
        "[--core:8px] [--cube-glow:7px] [--cube-inner-glow:5px] [--mark:18px]",
        className
      )}
    >
      <Cube lattice className={cn("crystal-spin", hold)} style={{ "--cube": "var(--mark)", "--spin-duration": "20s" }}>
        <Cube
          tone="ember"
          glow
          className={cn("crystal-core absolute top-[calc((var(--mark)-var(--core))/2)] left-[calc((var(--mark)-var(--core))/2)]", hold)}
          style={{ "--cube": "var(--core)" }}
        />
      </Cube>
    </span>
  );
}

/** The small ember seed crystal where the light stream ends. */
export function SeedCrystal({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      data-stream-anchor="seed"
      className={cn(
        "crystal-stage size-[100px] perspective-[500px] [--cube:28px]",
        "sm:size-[120px] sm:perspective-[600px] sm:[--cube:34px]",
        className
      )}
    >
      <Cube tone="ember" className="crystal-spin" style={{ "--spin-duration": "9s", "--spin-delay": "-2s" }} />
    </span>
  );
}
