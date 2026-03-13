import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-800 font-sans selection:bg-orange-200">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-orange-600" />
          <span className="text-2xl font-bold tracking-tighter text-stone-900">
            Saltancy<span className="text-orange-600">.</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
          <a href="#services" className="hover:text-orange-600 transition-colors">Services</a>
          <a href="#approach" className="hover:text-orange-600 transition-colors">Approach</a>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6">
          Let's Talk
        </Button>
      </nav>

      <section className="container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 mb-6 border-none px-4 py-1">
          Technical Consultancy & Development
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 max-w-4xl mb-6 leading-tight">
          Essential technical solutions for <span className="text-orange-600">growing businesses.</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mb-10 leading-relaxed">
          Just like salt brings out the best flavors, Saltancy brings out the best in your business. 
          We build robust, scalable software, websites, and full-stack applications tailored to your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 rounded-full flex items-center gap-2">
            Start a Project <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 text-lg px-8 py-6 rounded-full">
            View Our Services
          </Button>
        </div>
      </section>

      <section id="services" className="bg-white py-24 border-y border-stone-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">What We Build</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">From frontend polish to backend architecture, we provide end-to-end technical expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow bg-[#FAFAF9]">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-orange-700" />
                </div>
                <CardTitle className="text-xl">Web Applications</CardTitle>
                <CardDescription className="text-stone-500">Fast, responsive, and SEO-friendly websites using modern frameworks like Next.js and React.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow bg-[#FAFAF9]">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-orange-700" />
                </div>
                <CardTitle className="text-xl">Backend Systems</CardTitle>
                <CardDescription className="text-stone-500">Secure, scalable APIs, databases, and cloud infrastructure designed to handle your business logic.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow bg-[#FAFAF9]">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-orange-700" />
                </div>
                <CardTitle className="text-xl">Mobile Apps</CardTitle>
                <CardDescription className="text-stone-500">Cross-platform mobile applications that give your users a seamless experience on any device.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="approach" className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-stone-200 rounded-3xl overflow-hidden relative border border-stone-300">
              <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-stone-200 flex items-center justify-center">
                 <Terminal className="w-32 h-32 text-orange-200 opacity-50" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Grounded in code. Focused on business.</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              Technology shouldn't be complicated for the sake of being complicated. At Saltancy, we believe in clean, elemental solutions that solve real-world problems.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Fullstack expertise from database to UI",
                "Clean, maintainable, and modern codebases",
                "Transparent communication and consulting",
                "Agile delivery focused on your ROI"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to build something great?</h2>
          <p className="max-w-xl mb-8 text-stone-300">
            Let's discuss how Saltancy can help engineer your next business solution.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-500 text-white text-lg px-8 py-6 rounded-full flex items-center gap-2 mb-16">
            <Mail className="w-5 h-5" /> Contact Me
          </Button>
          
          <div className="w-full border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="w-4 h-4 text-orange-500" />
              <span className="text-white font-bold">Saltancy.</span>
            </div>
            <p>© {new Date().getFullYear()} Saltancy Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
