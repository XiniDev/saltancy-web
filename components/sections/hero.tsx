import { HeroCrystal } from "@/components/ember/crystal";
import { StartProjectButton, pill } from "@/components/ember/pill";
import { Accent } from "@/components/ember/type";
import { hero } from "@/lib/content/home";
import { cn } from "@/lib/utils";

export function Hero() {
  const { headline } = hero;

  return (
    <section
      id="top"
      className="text-halo relative z-10 flex min-h-[780px] flex-col items-center px-6 pt-24 text-center sm:min-h-[980px] sm:pt-[140px] sm:pb-[70px]"
    >
      <p className="font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase sm:text-xs">
        <span className="max-sm:hidden">{hero.kickerLead} </span>
        {hero.kicker}
      </p>

      <h1 className="mt-5 font-serif text-[clamp(2.5rem,11.8vw,2.875rem)] leading-[1.02] font-normal tracking-[-0.035em] text-foreground-strong sm:mt-7 sm:text-[clamp(3.5rem,8.6vw,7.75rem)] sm:leading-none">
        {/* The crystal sits inside the heading visually; assistive tech reads one sentence. */}
        <span className="sr-only">
          {headline.before} {headline.after} {headline.emphasis}
          {headline.end}
        </span>
        <span aria-hidden className="flex flex-col items-center">
          <span>{headline.before}</span>
          <HeroCrystal />
          <span>
            {headline.after} <Accent>{headline.emphasis}</Accent>
            {headline.end}
          </span>
        </span>
      </h1>

      <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:mt-[34px] sm:max-w-[560px] sm:text-[19px] sm:leading-[1.6]">
        {hero.sub}
      </p>

      <div className="mt-[26px] flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
        <StartProjectButton className="max-sm:w-full" />
        <a href={hero.secondary.href} className={cn(pill({ variant: "outline" }), "max-sm:w-full")}>
          {hero.secondary.label}
        </a>
      </div>
    </section>
  );
}
