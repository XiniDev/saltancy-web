import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Logo } from "@/components/brand/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { footer } from "@/lib/content/site";
import { clientLogin } from "@/lib/content/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-8 text-foreground/[0.07] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      >
        <LatticePattern id="footer-lattice" cell={40} />
      </div>

      <Container className="relative py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo animate={false} />
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
              {footer.positioning}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:justify-items-end">
            {footer.groups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {year} Saltancy</p>
          <div className="flex items-center gap-4">
            {clientLogin && (
              <Link
                href={clientLogin.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {clientLogin.label}
              </Link>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  );
}
