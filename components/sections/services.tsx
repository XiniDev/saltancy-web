import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Eyebrow, Lead, SectionHeading } from "@/components/primitives/typography";
import { Reveal } from "@/components/primitives/reveal";
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { CrystalIcon } from "@/components/brand/crystal-icon";
import { services, type Service } from "@/lib/content/services";
import { cn } from "@/lib/utils";

function ServiceCard({
  service,
  featured,
  className,
  delay,
}: {
  service: Service;
  featured?: boolean;
  className?: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <article
        className={cn(
          "group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-floating)]",
          featured ? "p-8 md:p-10" : "p-6 md:p-8"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 text-foreground/[0.05] transition-colors duration-300 group-hover/card:text-foreground/[0.09] [mask-image:radial-gradient(closest-side,black,transparent)]"
        >
          <LatticePattern id={`svc-${service.slug}`} cell={26} />
        </div>

        <div
          className={cn(
            "flex items-center justify-center rounded-lg bg-secondary text-foreground",
            featured ? "size-16" : "size-14"
          )}
        >
          <CrystalIcon name={service.icon} className={cn(featured ? "size-9" : "size-8")} />
        </div>

        <h3
          className={cn(
            "mt-6 font-serif font-medium tracking-tight text-foreground",
            featured ? "text-2xl" : "text-xl"
          )}
        >
          {service.title}
        </h3>
        <p className="mt-3 max-w-[44ch] text-foreground/70">{service.description}</p>

        {service.capabilities.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {service.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Services() {
  if (!services.length) return null;

  const featured = services.find((s) => s.featured) ?? services[0];
  const rest = services.filter((s) => s !== featured);

  return (
    <Section id="services" pad="standard" className="w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-8 text-foreground/[0.06] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      >
        <LatticePattern id="services-divider" cell={40} />
      </div>

      <Container className="relative">
        <div className="relative max-w-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-8 -z-0 h-44 w-[460px] text-foreground/[0.05] [mask-image:radial-gradient(60%_80%_at_22%_35%,black,transparent)]"
          >
            <LatticePattern id="services-ghost" cell={34} />
          </div>

          <div className="relative">
            <Reveal>
              <Eyebrow>// What we build</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <SectionHeading className="mt-4">
                Software built to <span className="text-primary">hold its shape.</span>
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.12}>
              <Lead className="mt-5">
                Web, backend, and mobile systems engineered like a crystal lattice — every
                part bonded, load-bearing, and built to set under pressure.
              </Lead>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-12">
          <ServiceCard
            service={featured}
            featured
            delay={0}
            className="lg:col-span-7 lg:row-span-2"
          />
          {rest.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              delay={0.08 * (i + 1)}
              className="lg:col-span-5"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
