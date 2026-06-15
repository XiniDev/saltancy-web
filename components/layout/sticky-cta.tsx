"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/contact-modal";
import { cta } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const band = document.getElementById("cta");
    let passedHero = false;
    let bandVisible = false;
    const update = () => setShow(passedHero && !bandVisible);

    const heroObs = new IntersectionObserver(
      ([e]) => {
        passedHero = !e.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    const bandObs = new IntersectionObserver(
      ([e]) => {
        bandVisible = e.isIntersecting;
        update();
      },
      { threshold: 0 }
    );

    if (hero) heroObs.observe(hero);
    if (band) bandObs.observe(band);
    return () => {
      heroObs.disconnect();
      bandObs.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <ContactModal>
        <Button className="h-11 w-full rounded-2xl text-base">{cta.primary}</Button>
      </ContactModal>
    </div>
  );
}
