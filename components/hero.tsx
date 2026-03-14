import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
      <Badge variant="secondary" className="mb-6 border-none px-4 py-1 text-sm">
        Technical Consultancy & Development
      </Badge>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mb-6 leading-tight">
        Essential technical solutions for <span className="text-primary">growing businesses.</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        Just like salt brings out the best flavors, Saltancy brings out the best in your business. 
        We build robust, scalable software, websites, and full-stack applications tailored to your needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button size="lg" className="rounded-full text-lg px-8 py-6 flex items-center gap-2">
          Start a Project <ArrowRight className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full text-lg px-8 py-6">
          View Our Services
        </Button>
      </div>
    </section>
  );
}
