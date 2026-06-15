import { cn } from "@/lib/utils";
import type { ServiceIcon } from "@/lib/content/services";

function Cube({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const k = 0.866 * r;
  const top: [number, number] = [cx, cy - r];
  const ur: [number, number] = [cx + k, cy - r / 2];
  const lr: [number, number] = [cx + k, cy + r / 2];
  const bot: [number, number] = [cx, cy + r];
  const ll: [number, number] = [cx - k, cy + r / 2];
  const ul: [number, number] = [cx - k, cy - r / 2];
  const pts = [top, ur, lr, bot, ll, ul].map((p) => p.join(",")).join(" ");
  return (
    <>
      <polygon points={pts} />
      <line x1={cx} y1={cy} x2={top[0]} y2={top[1]} />
      <line x1={cx} y1={cy} x2={lr[0]} y2={lr[1]} />
      <line x1={cx} y1={cy} x2={ll[0]} y2={ll[1]} />
    </>
  );
}

export function CrystalIcon({
  name,
  className,
}: {
  name: ServiceIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("text-foreground", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      {name === "web" && <Cube cx={20} cy={21} r={13} />}
      {name === "backend" && (
        <>
          <Cube cx={20} cy={13} r={8} />
          <Cube cx={20} cy={27} r={8} />
        </>
      )}
      {name === "mobile" && (
        <>
          <Cube cx={13} cy={22} r={8} />
          <Cube cx={28} cy={19} r={8} />
        </>
      )}
      {name === "data" && (
        <>
          <Cube cx={14} cy={15} r={7} />
          <Cube cx={27} cy={16} r={7} />
          <Cube cx={20} cy={28} r={7} />
        </>
      )}
      <circle
        cx={20}
        cy={name === "web" ? 8 : 6}
        r={1.8}
        className="fill-foreground stroke-none transition-colors duration-300 group-hover/card:fill-primary"
      />
    </svg>
  );
}
