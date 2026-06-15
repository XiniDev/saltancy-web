import { cn } from "@/lib/utils";

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-[1.05] tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "max-w-[60ch] text-lg leading-relaxed text-foreground/70",
        className
      )}
    >
      {children}
    </p>
  );
}
