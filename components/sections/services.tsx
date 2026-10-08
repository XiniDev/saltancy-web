import { Accent, Eyebrow, SectionHeading } from "@/components/ember/type";
import { services } from "@/lib/content/home";

export function Services() {
  const { heading } = services;

  return (
    <section
      id="services"
      data-stream-anchor="services"
      className="text-halo relative z-10 flex min-h-[780px] justify-center px-6 pt-14 sm:min-h-[900px] sm:pt-[120px] sm:pb-[100px]"
    >
      <div className="flex w-full max-w-[1120px] flex-col gap-7 sm:gap-14">
        <header className="flex flex-col items-center gap-3 text-center sm:gap-4">
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <SectionHeading>
            {heading.before} <Accent>{heading.emphasis}</Accent>
            {heading.end}
          </SectionHeading>
        </header>

        <ol className="flex flex-col border-b border-hairline">
          {services.items.map((item) => (
            <li
              key={item.index}
              className="grid gap-2.5 border-t border-hairline py-6 sm:py-[34px] lg:grid-cols-[56px_minmax(0,1.08fr)_minmax(0,1fr)] lg:items-baseline lg:gap-x-10"
            >
              <div className="flex items-baseline gap-3.5 lg:contents">
                <span className="font-mono text-xs text-primary lg:text-[13px]">{item.index}</span>
                <h3 className="font-serif text-[28px] leading-[1.1] font-normal tracking-[-0.02em] text-foreground-strong lg:text-[clamp(32px,3.4vw,48px)] lg:leading-[1.05] lg:tracking-[-0.025em]">
                  {item.title}
                </h3>
              </div>
              <div className="flex min-w-0 flex-col gap-2.5 lg:gap-3.5">
                <p className="text-[15px] leading-[1.55] text-muted-foreground sm:text-base sm:leading-[1.6]">
                  {item.body}
                </p>
                <p className="font-mono text-[11px] text-subtle-foreground sm:text-xs">{item.stack}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
