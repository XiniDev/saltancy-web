import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { footer, legalLinks, navLinks, type NavLink } from "@/lib/content/home";
import { cn } from "@/lib/utils";

function LinkGroup({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <nav aria-label={label} className="flex flex-col gap-1 text-sm sm:gap-2.5">
      <p className="pb-1 font-mono text-[11px] tracking-[0.08em] text-faint-foreground uppercase">{label}</p>
      <ul className="flex flex-col sm:gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "inline-flex items-center rounded-sm text-muted-foreground transition-colors outline-none",
                "hover:text-foreground-strong focus-visible:ring-3 focus-visible:ring-ring/60",
                "max-sm:min-h-11 pointer-coarse:min-h-11"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer({ hubEnabled }: { hubEnabled: boolean }) {
  const year = new Date().getFullYear();
  const links = navLinks.filter((link) => hubEnabled || !link.hub);

  return (
    <footer className="relative z-10 border-t border-hairline-soft px-6 py-10 sm:py-12">
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap justify-between gap-10">
        <div className="flex max-w-[340px] flex-col gap-3.5">
          <Link
            href="/#top"
            aria-label="Saltancy home"
            className="inline-flex self-start rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <Logo animate={false} />
          </Link>
          <p className="text-sm leading-relaxed text-subtle-foreground">{footer.line}</p>
        </div>

        <div className="flex flex-wrap gap-16">
          <LinkGroup label={footer.navLabel} links={links} />
          <LinkGroup label={footer.legalLabel} links={legalLinks} />
        </div>

        <p className="w-full font-mono text-xs text-faint-foreground">© {year} Saltancy</p>
      </div>
    </footer>
  );
}
