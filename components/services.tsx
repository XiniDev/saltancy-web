import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Server, Smartphone } from "lucide-react";

export function Services() {
  return (
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
  );
}
