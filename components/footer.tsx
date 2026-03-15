import { Button } from "@/components/ui/button";
import { Hexagon, Mail } from "lucide-react";
import Link from "next/link";
import { ContactModal } from "@/components/contact-modal";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to build something great?</h2>
        <p className="max-w-xl mb-8 opacity-80">
          Let's discuss how Saltancy can help engineer your next business solution.
        </p>
        <ContactModal>
          <Button size="lg" className="rounded-full text-lg px-8 py-6 flex items-center gap-2 mb-16 bg-primary text-primary-foreground hover:bg-primary/90">
            <Mail className="w-5 h-5" /> Contact Me
          </Button>
        </ContactModal>
        <div className="w-full border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Hexagon className="w-5 h-5 text-primary" strokeWidth={2.5} />
              <span className="font-bold text-base">Saltancy.</span>
            </div>
            <span className="hidden md:inline-block opacity-40">|</span>
            <p className="opacity-60">© {new Date().getFullYear()} Saltancy Consulting.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center gap-6 opacity-80">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
            <span className="hidden md:inline-block opacity-40">|</span>
            <ThemeSwitcher inverted={true} />
          </div>
          
        </div>
      </div>
    </footer>
  );
}
