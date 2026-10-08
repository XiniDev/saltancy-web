"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { StartProjectButton, pill } from "@/components/ember/pill";
import { LockIcon, MenuIcon } from "@/components/ember/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ctaLabels, navLinks } from "@/lib/content/home";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolled(threshold = 16) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > threshold,
    () => false
  );
}

const iconButton =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong text-foreground transition-colors hover:border-foreground/40 hover:text-foreground-strong outline-none focus-visible:ring-3 focus-visible:ring-ring/60";

export function Navbar({ hubEnabled, signInHref }: { hubEnabled: boolean; signInHref: string }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = navLinks.filter((link) => hubEnabled || !link.hub);

  return (
    <header
      data-site-header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-hairline-soft bg-background/92" : "border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[1288px] items-center justify-between gap-6 pr-4 pl-5 sm:h-20 sm:px-6"
      >
        <Link
          href="/#top"
          aria-label="Saltancy home"
          className="inline-flex min-h-11 items-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
        >
          <Logo />
        </Link>

        <ul className="hidden items-center gap-[34px] text-sm lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-sm text-muted-foreground transition-colors outline-none hover:text-foreground-strong focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 lg:gap-[18px]">
          {hubEnabled && (
            <>
              <Link
                href={signInHref}
                prefetch={false}
                data-signin
                className="hidden min-h-11 items-center gap-2 rounded-sm text-sm text-foreground transition-colors outline-none hover:text-foreground-strong focus-visible:ring-3 focus-visible:ring-ring/60 lg:inline-flex"
              >
                <LockIcon className="size-3.5" />
                {ctaLabels.signIn}
              </Link>
              <Link
                href={signInHref}
                prefetch={false}
                data-signin
                aria-label={ctaLabels.signIn}
                className={cn(iconButton, "lg:hidden")}
              >
                <LockIcon className="size-4" />
              </Link>
            </>
          )}

          <div className="hidden md:flex">
            <StartProjectButton size="md" />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Open menu" className={cn(iconButton, "lg:hidden noscript:hidden")}>
                <MenuIcon className="size-[18px]" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 border-hairline-soft">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Saltancy site navigation</SheetDescription>
              </SheetHeader>

              <Logo animate={false} />

              <ul className="mt-8 flex flex-col">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex h-14 items-center border-b border-hairline font-serif text-xl text-foreground-strong outline-none focus-visible:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <StartProjectButton block />
                {hubEnabled && (
                  <Link
                    href={signInHref}
                    prefetch={false}
                    data-signin
                    onClick={() => setOpen(false)}
                    className={pill({ variant: "outline", block: true })}
                  >
                    <LockIcon className="size-3.5" />
                    {ctaLabels.signIn}
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
