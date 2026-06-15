import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/contact-modal";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/typography";
import { Reveal } from "@/components/primitives/reveal";
import { MaskReveal } from "@/components/primitives/mask-reveal";
import { Magnetic } from "@/components/primitives/magnetic";
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { HeroCrystal3D } from "@/components/brand/hero-crystal-3d";
import { hero } from "@/lib/content/hero";

export function Hero() {
  const lines: React.ReactNode[] = [
    ...hero.headlineLines,
    <span key="emphasis" className="text-primary">
      {hero.emphasis}
    </span>,
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden py-24 sm:py-28 lg:py-[clamp(6rem,12vmin,9rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--glow-warm)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground/[0.06] [mask-image:radial-gradient(85%_55%_at_50%_18%,black,transparent_78%)] lg:hidden"
      >
        <LatticePattern id="hero-lattice-mobile" cell={36} />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        <div className="relative lg:col-span-6 xl:col-span-5">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-10 h-[104px] w-[104px] lg:hidden"
          >
            <div
              className="absolute inset-[22%] rounded-full"
              style={{ background: "var(--glow-node)" }}
            />
            <HeroCrystal3D className="h-full w-full" />
          </div>
          <Reveal>
            <Eyebrow className="flex items-center gap-2">
              <span aria-hidden className="inline-block size-1.5 shrink-0 rotate-45 rounded-[1px] bg-primary" />
              {hero.eyebrow}
            </Eyebrow>
          </Reveal>

          <h1 className="mt-6 font-serif text-[1.875rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[clamp(3rem,3.4vw,4rem)]">
            <MaskReveal lines={lines} delay={0.05} />
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/70 sm:text-lg">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-4">
              <Magnetic className="w-full sm:w-auto">
                <ContactModal>
                  <Button
                    size="lg"
                    className="group h-12 w-full rounded-2xl px-7 text-base shadow-[var(--shadow-elevated)] transition-shadow hover:shadow-[var(--shadow-floating)] sm:w-auto"
                  >
                    {hero.primaryCta}
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </ContactModal>
              </Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-2xl px-7 text-base sm:w-auto"
              >
                <a href={hero.secondaryHref}>{hero.secondaryCta}</a>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative hidden min-h-[clamp(440px,42vw,640px)] lg:col-span-6 lg:block xl:col-span-7">
          <div
            aria-hidden
            className="absolute left-0 top-1/2 h-px w-[34%] -translate-y-1/2 bg-foreground/15 [mask-image:linear-gradient(to_right,transparent,black)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 text-foreground/[0.10] dark:text-foreground/[0.16] [mask-image:radial-gradient(58%_58%_at_64%_50%,black_16%,transparent_80%)]"
          >
            <LatticePattern id="hero-lattice" cell={42} />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-[64%] top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, var(--glow-warm-color), transparent 72%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[76%] top-[40%] h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px]"
            style={{ background: "var(--glow-node)" }}
          />
          <div aria-hidden className="absolute bottom-[16%] left-[8%] size-2 rounded-full bg-foreground/25" />
          <div aria-hidden className="absolute top-[18%] left-[24%] size-1.5 rounded-full bg-foreground/20" />
          <div aria-hidden className="absolute bottom-[10%] right-[10%] size-1 rounded-full bg-foreground/20" />
          <div className="absolute right-[-4%] top-1/2 h-[clamp(420px,38vw,620px)] w-[clamp(420px,38vw,620px)] -translate-y-1/2">
            <HeroCrystal3D className="h-full w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
