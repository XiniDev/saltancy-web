import { cn } from "@/lib/utils";

type LatticePatternProps = {
  id?: string;
  cell?: number;
  className?: string;
};

export function LatticePattern({
  id = "saltancy-lattice",
  cell = 44,
  className,
}: LatticePatternProps) {
  return (
    <svg aria-hidden className={cn("h-full w-full", className)}>
      <defs>
        <pattern id={id} width={cell} height={cell} patternUnits="userSpaceOnUse">
          <path
            d={`M0 0 H${cell} M0 0 V${cell}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <circle cx="0" cy="0" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
