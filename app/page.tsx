import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Approach } from "@/components/approach";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-secondary">
      <Navbar />
      <Hero />
      <Services />
      <Approach />
      <Footer />
    </div>
  );
}
