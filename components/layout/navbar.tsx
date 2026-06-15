"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { Logo } from "@/components/brand/logo";
import { Magnetic } from "@/components/primitives/magnetic";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ContactModal } from "@/components/contact-modal";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { clientLogin, nav, primaryCta } from "@/lib/content/nav";

function sectionId(href: string) {
  return href.split("#")[1] ?? "";
}

function getScrollTarget(): { el: HTMLElement | null; read: () => number } {
  const pager = document.querySelector<HTMLElement>(".pager");
  if (pager) return { el: pager, read: () => pager.scrollTop };
  return { el: null, read: () => window.scrollY };
}

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const { el, read } = getScrollTarget();
    const target: HTMLElement | Window = el ?? window;
    const onScroll = () => setScrolled(read() > threshold);
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection() {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const ids = nav.map((n) => sectionId(n.href)).filter(Boolean);
    if (!ids.length) return;
    const pager = document.querySelector<HTMLElement>(".pager");
    const target: HTMLElement | Window = pager ?? window;

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActiveId(current);
    };

    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return activeId;
}

function NavLink({
  href,
  label,
  active,
  onClick,
  className,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group relative inline-flex items-center text-sm transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left bg-foreground/20 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-1.5 right-0 size-1 translate-x-1 rounded-[1px] bg-primary transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
      />
    </Link>
  );
}

export function Navbar({ homeHref = "/" }: { homeHref?: string }) {
  const scrolled = useScrolled();
  const activeId = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-foreground/10 transition-opacity duration-500 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <Container
        className={cn(
          "flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Magnetic>
          <Link href={homeHref} aria-label="Saltancy home" className="inline-flex">
            <Logo />
          </Link>
        </Magnetic>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={activeId === sectionId(item.href)}
            />
          ))}
          <span aria-hidden className="h-5 w-px bg-border" />
          <ThemeSwitcher />
          {clientLogin && (
            <Link
              href={clientLogin.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {clientLogin.label}
            </Link>
          )}
          <Magnetic>
            <ContactModal>
              <Button className="rounded-2xl px-5">{primaryCta.label}</Button>
            </ContactModal>
          </Magnetic>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-md" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Saltancy site navigation</SheetDescription>
              </SheetHeader>

              <div className="flex items-center">
                <Logo animate={false} />
              </div>

              <nav className="mt-8 flex flex-col">
                {nav.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={activeId === sectionId(item.href)}
                    onClick={() => setOpen(false)}
                    className="h-14 border-b border-border text-lg"
                  />
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-4">
                <ContactModal>
                  <Button className="h-12 w-full rounded-2xl text-base">{primaryCta.label}</Button>
                </ContactModal>
                {clientLogin && (
                  <Link
                    href={clientLogin.href}
                    className="rounded-md bg-muted/40 px-4 py-3 text-center text-sm text-muted-foreground"
                  >
                    {clientLogin.label}
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
