import { Logo } from "@/components/brand/logo";
import { ArrowUpRightIcon } from "@/components/ember/icons";
import { Accent, Eyebrow, SectionHeading } from "@/components/ember/type";
import { hub } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const mono = "font-mono text-[10px] sm:text-[11px]";

function PhaseBar({ state }: { state: string }) {
  if (state === "done") return <span className="block h-[5px] rounded-full bg-foreground/85 md:h-1.5" />;
  if (state === "in progress")
    return (
      <span className="block h-[5px] overflow-hidden rounded-full bg-foreground/10 md:h-1.5">
        <span className="block h-full w-[62%] bg-primary" />
      </span>
    );
  return <span className="block h-[5px] rounded-full border border-dashed border-hairline-strong md:h-1.5" />;
}

function StatusText({ state }: { state: string }) {
  return (
    <span className={cn(mono, state === "in progress" ? "text-primary" : "text-subtle-foreground")}>{state}</span>
  );
}

/** Illustrative product shot of the client hub. Every name in it is a sample. */
function HubShot() {
  const { sample } = hub;
  return (
    <div aria-hidden className="flex flex-col md:min-h-[540px] md:flex-row md:flex-wrap">
      <div className="hidden flex-[1_1_240px] flex-col gap-[22px] border-r border-hairline-soft bg-panel-sidebar px-[18px] py-[26px] md:flex">
        <span className="inline-flex items-center gap-2.5 px-2 font-serif text-lg text-foreground-strong">
          <Logo animate={false} showWordmark={false} />
          Saltancy
        </span>
        <div className="flex flex-col gap-1">
          <span className={cn(mono, "px-2 pb-2 tracking-[0.04em] text-faint-foreground")}>your projects</span>
          {sample.projects.map((name, i) => (
            <span
              key={name}
              className={cn(
                "flex items-center gap-2.5 rounded-[10px] p-2.5 text-sm",
                i === 0 ? "bg-[var(--ember-wash)] text-foreground-strong" : "text-muted-foreground"
              )}
            >
              <span className={cn("size-[7px] rounded-full", i === 0 ? "bg-primary" : "bg-muted-foreground/45")} />
              {name}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2.5 border-t border-hairline-soft px-2 pt-2.5">
          <span className="flex size-[30px] items-center justify-center rounded-full bg-muted text-xs text-foreground">C</span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[13px] text-foreground">{sample.client}</span>
            <span className={cn(mono, "text-faint-foreground")}>signed in</span>
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4 p-[18px] md:flex-[999_1_560px] md:gap-[22px] md:px-[30px] md:py-[26px]">
        <div className="flex flex-wrap items-center justify-between gap-2.5 md:gap-3.5">
          <div className="flex items-center gap-3.5">
            <span className="font-serif text-xl tracking-[-0.015em] text-foreground-strong md:text-[26px]">
              {sample.projects[0]}
            </span>
            <span
              className={cn(
                mono,
                "inline-flex items-center gap-1.5 rounded-full bg-[var(--ember-wash)] px-[9px] py-1 text-primary md:gap-[7px] md:px-2.5 md:py-[5px]"
              )}
            >
              <span className="ember-pulse size-[5px] rounded-full bg-primary md:size-1.5" />
              {sample.status}
            </span>
          </div>
          <span className="hidden items-center gap-2 rounded-[10px] border border-hairline px-3.5 py-2.5 text-[13px] text-foreground md:inline-flex">
            Open latest preview
            <ArrowUpRightIcon className="size-3" />
          </span>
        </div>

        <div className="hidden gap-[26px] border-b border-hairline-soft text-sm md:flex">
          {sample.tabs.map((tab, i) => (
            <span
              key={tab}
              className={cn("pb-3", i === 0 ? "border-b-2 border-primary text-foreground-strong" : "text-subtle-foreground")}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="flex gap-2 md:flex-wrap md:gap-2.5">
          {sample.phases.map((phase) => (
            <div key={phase.name} className="flex flex-1 flex-col gap-1.5 md:flex-[1_1_160px] md:gap-2">
              <PhaseBar state={phase.state} />
              <span className={cn(mono, "md:hidden", phase.state === "in progress" ? "text-primary" : "text-faint-foreground")}>
                {phase.short}
              </span>
              <span className={cn("hidden text-[13px] md:block", phase.state === "next" ? "text-muted-foreground" : "text-foreground")}>
                {phase.name}
              </span>
              <span className={cn(mono, "hidden md:block", phase.state === "in progress" ? "text-primary" : "text-faint-foreground")}>
                {phase.state}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[18px]">
          <div className="hidden min-w-0 flex-[1_1_300px] flex-col overflow-hidden rounded-[14px] border border-hairline-soft bg-panel-well md:flex">
            <div className="flex items-center gap-2 border-b border-hairline-soft px-3 py-2.5">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="size-2 rounded-full bg-muted-foreground/30" />
              ))}
              <span className={cn(mono, "ml-2 text-faint-foreground")}>{sample.build}</span>
            </div>
            <div className="flex flex-col gap-2.5 p-4">
              <span className="block h-2.5 w-[46%] rounded bg-foreground/80" />
              <span className="block h-1.5 w-[70%] rounded bg-foreground/18" />
              <div className="mt-1.5 grid grid-cols-7 gap-[5px]">
                {Array.from({ length: 14 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-[18px] rounded",
                      i === 3 ? "bg-primary/85" : i === 8 || i === 11 ? "bg-foreground/14" : "bg-foreground/8"
                    )}
                  />
                ))}
              </div>
              <span className="mt-1.5 block h-[26px] w-[38%] rounded-[7px] bg-primary/75" />
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-2 md:gap-2.5">
            <span className={cn(mono, "hidden tracking-[0.04em] text-faint-foreground md:block")}>your requests</span>
            {sample.requests.map((request, i) => (
              <span
                key={request.text}
                className={cn(
                  "items-center justify-between gap-2.5 rounded-[11px] border border-hairline-soft px-3 py-[11px] text-[13px] text-foreground md:gap-3 md:rounded-xl md:px-3.5 md:py-3 md:text-sm",
                  i === 2 ? "hidden md:flex" : "flex"
                )}
              >
                {request.text}
                <StatusText state={request.state} />
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-hairline bg-panel-well py-1.5 pr-1.5 pl-3 md:gap-2.5 md:rounded-[14px] md:py-2 md:pr-2 md:pl-4">
          <span className="flex-1 text-[13px] text-faint-foreground md:text-sm">
            <span className="md:hidden">{sample.composerShort}</span>
            <span className="hidden md:inline">{sample.composer}</span>
          </span>
          <span className="inline-flex items-center rounded-[9px] bg-primary px-3 py-[9px] text-xs font-semibold text-primary-foreground md:rounded-[10px] md:px-4 md:py-2.5 md:text-[13px]">
            <span className="md:hidden">{sample.sendShort}</span>
            <span className="hidden md:inline">{sample.send}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** "Your project hub". Ships behind the project hub flag. */
export function Hub() {
  const { heading } = hub;
  return (
    <section
      id="hub"
      className="relative z-10 flex min-h-[720px] justify-center px-4 pt-10 sm:min-h-[1060px] sm:px-6 sm:pt-[110px] sm:pb-[60px]"
    >
      <div className="flex w-full max-w-[1180px] flex-col items-center gap-7 sm:gap-14">
        <header className="text-halo flex max-w-[820px] flex-col items-center gap-3 px-2 text-center sm:gap-4">
          <Eyebrow>{hub.eyebrow}</Eyebrow>
          <SectionHeading className="text-[34px]">
            {heading.before} <Accent>{heading.emphasis}</Accent>
            {heading.end}
          </SectionHeading>
          <p className="text-[15px] leading-[1.6] text-muted-foreground sm:max-w-[560px] sm:text-lg">
            <span className="sm:hidden">{hub.subShort}</span>
            <span className="max-sm:hidden">{hub.sub}</span>
          </p>
        </header>

        <div className="w-full perspective-[1200px] sm:perspective-[2000px]">
          <figure
            data-stream-anchor="hub"
            className={cn(
              "m-0 origin-top overflow-hidden rounded-[20px] border border-hairline bg-[var(--panel-solid)] shadow-[var(--shadow-panel-compact)]",
              "rotate-x-10 mask-b-from-84% mask-b-to-100%",
              "sm:rounded-3xl sm:shadow-[var(--shadow-panel)] sm:rotate-x-13 sm:mask-b-from-86%",
              "md:bg-panel md:backdrop-blur-xl"
            )}
          >
            <figcaption className="sr-only">{hub.caption}</figcaption>
            <HubShot />
          </figure>
        </div>
      </div>
    </section>
  );
}
