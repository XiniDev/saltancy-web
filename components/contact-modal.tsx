"use client";

import { useState } from "react";
import { sendEmail } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
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
import { LatticePattern } from "@/components/primitives/lattice-pattern";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldKey = "name" | "email" | "message";

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

function CheckCube() {
  return (
    <svg viewBox="0 0 48 48" className="size-16 text-primary" fill="none" aria-hidden>
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M17 24.5l4.5 4.5 9-11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-in fade-in zoom-in-50 duration-500"
      />
    </svg>
  );
}

export function ContactModal({ children }: { children: React.ReactNode }) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  function check(field: FieldKey, value: string) {
    const v = value.trim();
    const ok =
      field === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : v.length > 1;
    setValid((s) => ({ ...s, [field]: ok }));
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
      setError("Something didn't connect. Please try again in a moment.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden rounded-2xl border border-border bg-card ring-0 sm:max-w-md">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 text-foreground/[0.05] [mask-image:radial-gradient(70%_50%_at_82%_0%,black,transparent)]"
        >
          <LatticePattern id="modal-lattice" cell={28} />
        </div>

        {isSuccess ? (
          <div role="status" aria-live="polite" className="relative flex flex-col items-center justify-center gap-3 py-8 text-center">
            <CheckCube />
            <div>
              <p className="font-serif text-2xl font-medium tracking-tight text-foreground">
                You&apos;re in.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Message received — I&apos;ll get back within 24 hours.
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Get in touch
              </p>
              <DialogTitle className="font-serif text-2xl font-medium tracking-tight text-foreground">
                Let&apos;s <span className="text-primary">talk</span>
              </DialogTitle>
              <DialogDescription>
                Tell me what you&apos;re building — I&apos;ll get back within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <FieldNode valid={valid.name} /> Your name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Rivera"
                  className="rounded-md bg-background"
                  onChange={(e) => check("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <FieldNode valid={valid.email} /> Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="rounded-md bg-background"
                  onChange={(e) => check("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <FieldNode valid={valid.message} /> What are you building?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="A scalable backend, a new web app, a system that needs to hold up under load…"
                  className="min-h-28 rounded-md bg-background"
                  onChange={(e) => check("message", e.target.value)}
                />
              </div>

              {error && (
                <p role="alert" className="border-t border-destructive/40 pt-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="group h-11 w-full rounded-2xl text-base"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
