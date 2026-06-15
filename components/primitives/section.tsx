import { cn } from "@/lib/utils";

const PAD = {
  tight: "py-16",
  standard: "py-24 md:py-32",
  hero: "py-28 md:py-40",
} as const;

type SectionProps = React.ComponentProps<"section"> & {
  pad?: keyof typeof PAD;
};

export function Section({ className, pad = "standard", ...props }: SectionProps) {
  return <section className={cn("relative", PAD[pad], className)} {...props} />;
}
