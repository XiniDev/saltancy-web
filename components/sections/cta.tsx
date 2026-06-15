import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/contact-modal";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/typography";
import { Reveal } from "@/components/primitives/reveal";
import { MaskReveal } from "@/components/primitives/mask-reveal";
import { Magnetic } from "@/components/primitives/magnetic";
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { cta } from "@/lib/content/site";

export function CallToAction() {
  const lines: React.ReactNode[] = [
    ...cta.headlineLines,
    <span key="emphasis" className="text-primary">
      {cta.emphasis}
    </span>,
  ];

  return (
    <Section id="cta" pad="standard" className="relative w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow-warm-color), transparent 72%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-foreground/[0.07] dark:text-foreground/[0.10] [mask-image:radial-gradient(48%_62%_at_50%_50%,black,transparent_78%)]"
      >
        <LatticePattern id="cta-lattice" cell={42} />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="text-center">{cta.eyebrow}</Eyebrow>
          </Reveal>

          <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-tight text-foreground">
            <MaskReveal lines={lines} delay={0.05} />
          </h2>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-foreground/70">
              {cta.sub}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <ContactModal>
                  <Button
                    size="lg"
                    className="group h-12 rounded-2xl px-7 text-base shadow-[var(--shadow-elevated)] transition-shadow hover:shadow-[var(--shadow-floating)]"
                  >
                    {cta.primary}
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </ContactModal>
              </Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-2xl px-7 text-base"
              >
                <a href={cta.secondaryHref}>{cta.secondary}</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
