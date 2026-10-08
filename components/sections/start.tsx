import Link from "next/link";
import { SeedCrystal } from "@/components/ember/crystal";
import { StartProjectButton, pill } from "@/components/ember/pill";
import { Accent, Eyebrow } from "@/components/ember/type";
import { ctaLabels, start } from "@/lib/content/home";
import { cn } from "@/lib/utils";

export function Start({
  hubEnabled,
  signInHref,
  email,
}: {
  hubEnabled: boolean;
  signInHref: string;
  email: string | null;
}) {
  const { heading } = start;

  return (
    <section
      id="contact"
      data-stream-anchor="start"
      className="text-halo relative z-10 flex min-h-[560px] flex-col items-center px-6 pt-14 text-center sm:min-h-[760px] sm:pt-[120px] sm:pb-20"
    >
      <Eyebrow>{start.eyebrow}</Eyebrow>
      <h2 className="mt-4 font-serif text-[42px] leading-[1.04] font-normal tracking-[-0.035em] text-foreground-strong sm:mt-6 sm:text-[clamp(46px,5.6vw,80px)] sm:leading-[1.02]">
        {heading.before}
        <br />
        {heading.after} <Accent>{heading.emphasis}</Accent>
        {heading.end}
      </h2>
      <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground sm:mt-6 sm:max-w-[520px] sm:text-lg">
        {start.sub}
      </p>

      <div className="mt-[22px] flex w-full flex-col gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
        <StartProjectButton email={email} className="max-sm:w-full" />
        {hubEnabled && (
          <Link
            href={signInHref}
            prefetch={false}
            data-signin
            className={cn(pill({ variant: "outline" }), "max-sm:hidden")}
          >
            {ctaLabels.signIn}
          </Link>
        )}
      </div>

      <SeedCrystal className="mt-11 sm:mt-[70px]" />
    </section>
  );
}
