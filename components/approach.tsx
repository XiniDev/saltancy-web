import { Terminal } from "lucide-react";

export function Approach() {
  return (
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
  );
}
