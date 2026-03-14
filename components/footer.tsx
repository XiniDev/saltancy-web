import { Button } from "@/components/ui/button";
import { Leaf, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to build something great?</h2>
        <p className="max-w-xl mb-8 opacity-80">
          Let's discuss how Saltancy can help engineer your next business solution.
        </p>
        <Button size="lg" className="rounded-full text-lg px-8 py-6 flex items-center gap-2 mb-16 bg-primary text-primary-foreground hover:bg-primary/90">
          <Mail className="w-5 h-5" /> Contact Me
        </Button>
        
        <div className="w-full border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="font-bold">Saltancy.</span>
          </div>
          <p>© {new Date().getFullYear()} Saltancy Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
