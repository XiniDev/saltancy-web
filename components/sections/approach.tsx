import { Lock } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { ContactModal } from "@/components/contact-modal";
import { Section } from "@/components/primitives/section";
import { Eyebrow, Lead, SectionHeading } from "@/components/primitives/typography";
import { Reveal } from "@/components/primitives/reveal";
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { CrystalIcon } from "@/components/brand/crystal-icon";
import { ProcessRail } from "@/components/sections/process-rail";

function StructureWindow() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-3 border-b border-border bg-muted px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-primary/40" />
          <span className="size-2.5 rounded-full bg-primary/70" />
          <span className="size-2.5 rounded-full bg-primary" />
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <CrystalIcon name="backend" className="size-3.5" />
          structure.ts
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          backend
        </span>
      </div>
      <pre className="whitespace-pre-wrap p-4 font-mono text-[11px] leading-relaxed text-foreground/80 sm:text-xs md:p-6 md:text-sm">
        <code>
          <span className="text-muted-foreground/70">{`// map stress points before laying a bond`}</span>
          {"\n"}
          <span className="text-foreground/55">export function</span>{" "}
          <span className="text-foreground">setStructure</span>
          {"(b: "}
          <span className="text-foreground">Brief</span>
          {") {"}
          {"\n"}
          {"  "}
          <span className="text-foreground/55">const</span> lattice ={" "}
          <span className="text-foreground">analyze</span>
          {"(b.constraints)"}
          {"\n\n"}
          {"  "}
          <span className="text-foreground/55">return</span>{" "}
          <span className="text-primary">load</span>
          {"({"}
          {"\n"}
          {"    lattice,"}
          {"\n"}
          {"    bonds: "}
          <span className="text-secondary-foreground">{`"typed, tested"`}</span>
          {","}
          {"\n"}
          {"    loadBearing: "}
          <span className="text-foreground/55">true</span>
          {","}
          {"\n"}
          {"  })"}
          {"\n"}
          {"}"}
        </code>
      </pre>
    </div>
  );
}

function SurfaceWindow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-primary/40" />
          <span className="size-2 rounded-full bg-primary/70" />
          <span className="size-2 rounded-full bg-primary" />
        </span>
        <span className="mx-1 flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground">
          <Lock className="size-3" />
          saltancy.app
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          <span aria-hidden className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
          frontend
        </span>
      </div>
      <div className="relative overflow-hidden p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 text-foreground/[0.05] [mask-image:radial-gradient(80%_80%_at_82%_18%,black,transparent)]"
        >
          <LatticePattern id="surface-lattice" cell={26} />
        </div>
        <div className="relative flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary">
            <CrystalIcon name="web" className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Interface
            </p>
            <h4 className="mt-1 font-serif text-lg font-medium tracking-tight text-foreground">
              Built to hold.
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
              A surface rendered from the structure above — same lattice, every screen.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <ContactModal>
                <button
                  type="button"
                  className="inline-flex h-8 cursor-pointer items-center rounded-xl bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Start a project
                </button>
              </ContactModal>
              <a
                href="/#services"
                className="inline-flex h-8 items-center rounded-xl border border-border px-3 text-xs text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneWindow() {
  return (
    <div className="mx-auto w-[min(248px,82%)]">
      <div className="rounded-[2.25rem] border border-border bg-card p-2 shadow-[var(--shadow-elevated)]">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-background">
          <div className="relative flex items-center justify-between px-5 pb-1.5 pt-3 font-mono text-[9px] text-muted-foreground">
            <span>9:41</span>
            <span aria-hidden className="absolute left-1/2 top-2 h-4 w-14 -translate-x-1/2 rounded-full bg-card" />
            <span className="flex items-center gap-1">
              <span aria-hidden className="size-1 rounded-full bg-primary motion-safe:animate-pulse" />
              live
            </span>
          </div>

          <div className="relative px-5 pb-5 pt-2">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 text-foreground/[0.05] [mask-image:radial-gradient(80%_70%_at_80%_8%,black,transparent)]"
            >
              <LatticePattern id="phone-lattice" cell={24} />
            </div>
            <div className="relative">
              <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                <CrystalIcon name="web" className="size-5" />
              </div>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Interface
              </p>
              <h4 className="mt-1 font-serif text-base font-medium tracking-tight text-foreground">
                Built to hold.
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/70">
                A surface rendered from the structure above — same lattice, every screen.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <ContactModal>
                  <button
                    type="button"
                    className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-xl bg-primary text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Start a project
                  </button>
                </ContactModal>
                <a
                  href="/#services"
                  className="inline-flex h-9 w-full items-center justify-center rounded-xl border border-border text-xs text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 border-t border-border py-3">
            <span aria-hidden className="size-1.5 rotate-45 rounded-[1px] bg-primary" />
            <span aria-hidden className="size-1.5 rounded-full bg-foreground/25" />
            <span aria-hidden className="size-1.5 rounded-full bg-foreground/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Approach() {
  return (
    <Section id="approach" pad="standard" className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-8 text-foreground/[0.07] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      >
        <LatticePattern id="approach-divider" cell={40} />
      </div>

      <Container className="relative">
        <div className="relative max-w-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-8 h-44 w-[460px] text-foreground/[0.06] [mask-image:radial-gradient(60%_80%_at_22%_35%,black,transparent)]"
          >
            <LatticePattern id="approach-ghost" cell={34} />
          </div>
          <div className="relative">
            <Reveal>
              <Eyebrow>Process / How we set</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <SectionHeading className="mt-4">
                We don&apos;t type code. We <span className="text-primary">set structure.</span>
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.12}>
              <Lead className="mt-5">
                Every engagement is a lattice — discrete bonds that lock into something
                load-bearing, from the data layer up to the surface your users touch.
              </Lead>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <StructureWindow />
              <div className="flex justify-center" aria-hidden>
                <div className="flex flex-col items-center py-1">
                  <span className="h-5 w-px bg-foreground/20" />
                  <span className="my-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    renders
                  </span>
                  <span className="h-5 w-px bg-foreground/20" />
                </div>
              </div>
              <div className="hidden lg:block">
                <SurfaceWindow />
              </div>
              <div className="lg:hidden">
                <PhoneWindow />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <Reveal delay={0.1}>
              <ProcessRail />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
