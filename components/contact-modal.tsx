"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { sendEmail } from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cube } from "@/components/ember/crystal";
import { pill } from "@/components/ember/pill";
import { Accent, Eyebrow } from "@/components/ember/type";
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { contact } from "@/lib/content/home";
import { cn } from "@/lib/utils";

type FieldKey = keyof typeof contact.fields;

/** The lattice node beside each label: lights up ember once the field is filled in properly. */
function FieldNode({ valid }: { valid: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 rotate-45 rounded-[1px] border transition-colors duration-300",
        valid ? "border-primary bg-primary" : "border-foreground/40 bg-transparent"
      )}
    />
  );
}

/** A small turning ember cube: the site's crystal language, standing in for a tick. */
function SentCrystal() {
  return (
    <span aria-hidden className="crystal-stage size-20 perspective-[320px] [--cube-glow:14px] [--cube:30px]">
      <Cube tone="ember" glow className="crystal-spin" style={{ "--spin-duration": "9s" }} />
    </span>
  );
}

const heading = "font-serif text-[34px] leading-[1.05] font-normal tracking-[-0.03em] text-foreground-strong";
const label = "flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase";
const field = cn(
  "rounded-xl border-hairline-strong bg-background/60 px-3.5 text-[15px] text-foreground md:text-[15px]",
  "placeholder:text-subtle-foreground/80",
  "focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-ring/15"
);

export function ContactModal({ children }: { children: React.ReactNode }) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  function check(key: FieldKey, value: string) {
    const v = value.trim();
    const ok = key === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : v.length > 1;
    setValid((s) => ({ ...s, [key]: ok }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData);

    setIsPending(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 6000);
    } else {
      setError(contact.error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="overflow-hidden rounded-3xl border border-hairline bg-card p-7 ring-0 sm:max-w-md"
        onOpenAutoFocus={(event) => {
          // On touch screens, focusing the first field would throw the keyboard over the form
          // before anyone has read it. Focus the dialog itself there instead.
          if (window.matchMedia("(pointer: coarse)").matches) {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus();
          }
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 text-foreground/[0.05] [mask-image:radial-gradient(70%_50%_at_82%_0%,black,transparent)]"
        >
          <LatticePattern id="modal-lattice" cell={28} />
        </div>

        {isSuccess ? (
          <div role="status" aria-live="polite" className="relative flex flex-col items-center gap-4 py-6 text-center">
            <SentCrystal />
            <div>
              <p className={heading}>
                {contact.success.before} <Accent>{contact.success.emphasis}</Accent>
                {contact.success.end}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-balance text-muted-foreground">{contact.success.body}</p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="relative gap-3">
              <Eyebrow>{contact.eyebrow}</Eyebrow>
              <DialogTitle className={heading}>
                {contact.heading.before} <Accent>{contact.heading.emphasis}</Accent>
                {contact.heading.end}
              </DialogTitle>
              <DialogDescription className="text-[15px] leading-relaxed text-pretty text-muted-foreground">
                {contact.sub}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="name" className={label}>
                  <FieldNode valid={valid.name} /> {contact.fields.name.label}
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={contact.fields.name.placeholder}
                  className={cn(field, "h-11")}
                  onChange={(e) => check("name", e.target.value)}
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="email" className={label}>
                  <FieldNode valid={valid.email} /> {contact.fields.email.label}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={contact.fields.email.placeholder}
                  className={cn(field, "h-11")}
                  onChange={(e) => check("email", e.target.value)}
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="message" className={label}>
                  <FieldNode valid={valid.message} /> {contact.fields.message.label}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder={contact.fields.message.placeholder}
                  className={cn(field, "min-h-28 py-3")}
                  onChange={(e) => check("message", e.target.value)}
                />
              </div>

              {error && (
                <p role="alert" className="border-t border-destructive/40 pt-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className={cn(pill({ variant: "accent", size: "lg", block: true }), "group disabled:cursor-wait disabled:opacity-70")}
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> {contact.sending}
                  </>
                ) : (
                  <>
                    {contact.submit}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
