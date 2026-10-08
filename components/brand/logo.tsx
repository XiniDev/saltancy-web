import { CrystalMark } from "@/components/ember/crystal";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
  animate = true,
}: {
  className?: string;
  showWordmark?: boolean;
  /** Turn the crystal. Off where several logos would otherwise spin at once. */
  animate?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <CrystalMark still={!animate} />
      {showWordmark && (
        <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Saltancy<span className="text-primary">.</span>
        </span>
      )}
    </span>
  );
}
