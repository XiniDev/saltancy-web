import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ContactModal } from "@/components/contact-modal";

export function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Leaf className="w-6 h-6 text-primary" />
        <span className="text-2xl font-bold tracking-tighter text-foreground">
          Saltancy<span className="text-primary">.</span>
        </span>
      </div>
      
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#approach" className="hover:text-primary transition-colors">Approach</a>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <ContactModal>
            <Button className="rounded-full px-6">
              Let's Talk
            </Button>
          </ContactModal>
        </div>
      </div>
    </nav>
  );
}
