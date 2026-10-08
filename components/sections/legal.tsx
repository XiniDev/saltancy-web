import { Eyebrow } from "@/components/ember/type";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { clientSignInHref, projectHubEnabled } from "@/lib/flags";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-xl font-normal tracking-tight text-foreground-strong">{title}</h2>
      <div className="space-y-4 leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
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
      <Navbar hubEnabled={projectHubEnabled} signInHref={clientSignInHref} />

      <main className="relative overflow-hidden pt-32 pb-24 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] text-foreground/[0.05] [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]"
        >
          <LatticePattern id="legal-lattice" cell={42} />
        </div>

        <div className="relative mx-auto w-full max-w-3xl px-6">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] font-normal tracking-[-0.03em] text-foreground-strong md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-mono text-xs tracking-[0.08em] text-subtle-foreground uppercase">
            Last updated · {lastUpdated}
          </p>
          <div className="mt-12 space-y-10 border-t border-hairline pt-12">{children}</div>
        </div>
      </main>

      <Footer hubEnabled={projectHubEnabled} />
    </div>
  );
}
