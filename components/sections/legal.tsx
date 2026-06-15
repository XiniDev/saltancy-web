import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/typography";
import { Grain } from "@/components/primitives/grain";
import { CustomCursor } from "@/components/primitives/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LatticePattern } from "@/components/primitives/lattice-pattern";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-xl font-medium tracking-tight text-foreground">
        {title}
      </h2>
      <div className="space-y-4 leading-relaxed text-foreground/70 [&_a]:text-primary [&_a:hover]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <Grain />
      <CustomCursor />
      <Navbar homeHref="/" />

      <main className="relative overflow-hidden pb-24 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] text-foreground/[0.05] [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]"
        >
          <LatticePattern id="legal-lattice" cell={42} />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Last updated · {lastUpdated}
            </p>
            <div className="mt-12 space-y-10 border-t border-border pt-12">
              {children}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
