import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden strokeWidth={1.4} {...stroke} {...props}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden strokeWidth={1.5} {...stroke} {...props}>
      <path d="M3 6h12M3 12h12" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden strokeWidth={1.4} {...stroke} {...props}>
      <path d="M4 2h6v6M10 2L3 9" />
    </svg>
  );
}
