import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ContactModal } from "@/components/contact-modal";
import { ctaLabels } from "@/lib/content/home";
import { cn } from "@/lib/utils";

export const pill = cva(
  [
    "inline-flex items-center justify-center gap-2.5 rounded-full whitespace-nowrap [text-shadow:none]",
    "transition-colors duration-200 outline-none",
    "focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ],
  {
    variants: {
      variant: {
        accent: "bg-primary font-semibold text-primary-foreground hover:bg-primary/88",
        outline: "border border-hairline-strong text-foreground hover:border-foreground/40 hover:text-foreground-strong",
      },
      size: {
        md: "min-h-11 px-5 text-sm",
        lg: "min-h-13 px-7 text-[15px]",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "accent", size: "lg", block: false },
  }
);

type PillProps = VariantProps<typeof pill> & { className?: string };

/**
 * Opens the contact pop-up. Without JavaScript the pop-up can't open, so the
 * button is swapped for a plain link: to the Start section, or straight to
 * email when `email` is given.
 */
export function StartProjectButton({
  className,
  email,
  ...variants
}: PillProps & { email?: string | null }) {
  const classes = cn(pill(variants), className);
  return (
    <>
      <ContactModal>
        <button type="button" className={cn(classes, "noscript:hidden")}>
          {ctaLabels.start}
        </button>
      </ContactModal>
      {email ? (
        <a href={`mailto:${email}`} className={cn(classes, "hidden noscript:inline-flex")}>
          {email}
        </a>
      ) : (
        <Link href="/#contact" className={cn(classes, "hidden noscript:inline-flex")}>
          {ctaLabels.start}
        </Link>
      )}
    </>
  );
}
