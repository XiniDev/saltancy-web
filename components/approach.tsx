import { Terminal } from "lucide-react";

export function Approach() {
  return (
    <section id="approach" className="container mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-[#0d1117] rounded-3xl overflow-hidden relative border border-border shadow-2xl flex flex-col font-mono text-sm md:text-base selection:bg-primary/30">
            <div className="h-12 bg-[#161b22] border-b border-white/5 flex items-center px-4 gap-2 w-full">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="ml-4 text-xs text-stone-500 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> saltancy-engine.ts
              </div>
            </div>

            <div className="p-6 overflow-x-auto leading-loose text-stone-300">
              <div>
                <span className="text-pink-400">import</span> {`{ buildSolution }`} <span className="text-pink-400">from</span> <span className="text-green-300">"@saltancy/core"</span>;
              </div>
              <br />
              <div>
                <span className="text-pink-400">export async function</span> <span className="text-blue-400">optimizeBusiness</span>(
                <span className="text-orange-300">client</span>: <span className="text-teal-300">Business</span>
                ) {`{`}
              </div>
              
              <div className="pl-4 border-l border-white/10 ml-2 mt-1">
                <span className="text-stone-500">{"// Analyze pain points and bottlenecks"}</span>
              </div>
              <div className="pl-4">
                <span className="text-pink-400">const</span> requirements = <span className="text-pink-400">await</span> <span className="text-blue-400">analyze</span>(client.needs);
              </div>
              <br />

              <div className="pl-4 border-l border-white/10 ml-2 mt-1">
                <span className="text-stone-500">{"// Engineer the perfect technical solution"}</span>
              </div>
              <div className="pl-4">
                <span className="text-pink-400">const</span> solution = <span className="text-blue-400">buildSolution</span>({`{`}
              </div>
              <div className="pl-8">
                stack: [<span className="text-green-300">"Next.js"</span>, <span className="text-green-300">"Node.js"</span>, <span className="text-green-300">"PostgreSQL"</span>],
              </div>
              <div className="pl-8">
                architecture: <span className="text-green-300">"highly-scalable"</span>,
              </div>
              <div className="pl-8">
                focus: <span className="text-green-300">"maximum-ROI"</span>,
              </div>
              <div className="pl-4">{`});`}</div>
              <br />

              <div className="pl-4">
                <span className="text-pink-400">return</span> solution.<span className="text-blue-400">deploy</span>();
              </div>
              <div>{`}`}</div>
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