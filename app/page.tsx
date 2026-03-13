import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Smartphone, 
  Server, 
  ArrowRight, 
  Leaf, 
  Terminal, 
  Mail 
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-secondary">
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
            <Button className="rounded-full px-6">
              Let's Talk
            </Button>
          </div>
        </div>
      </nav>

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

      <section id="services" className="bg-card py-24 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Build</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From frontend polish to backend architecture, we provide end-to-end technical expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-background">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Web Applications</CardTitle>
                <CardDescription>Fast, responsive, and SEO-friendly websites using modern frameworks like Next.js and React.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow bg-background">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Backend Systems</CardTitle>
                <CardDescription>Secure, scalable APIs, databases, and cloud infrastructure designed to handle your business logic.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow bg-background">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Mobile Apps</CardTitle>
                <CardDescription>Cross-platform mobile applications that give your users a seamless experience on any device.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="approach" className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-muted rounded-3xl overflow-hidden relative border border-border">
              <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-secondary to-muted">
                 <Terminal className="w-32 h-32 text-primary opacity-20" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Grounded in code. Focused on business.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Technology shouldn't be complicated for the sake of being complicated. At Saltancy, we believe in clean, elemental solutions that solve real-world problems.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Fullstack expertise from database to UI",
                "Clean, maintainable, and modern codebases",
                "Transparent communication and consulting",
                "Agile delivery focused on your ROI"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-primary text-sm font-bold">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
    </div>
  );
}
