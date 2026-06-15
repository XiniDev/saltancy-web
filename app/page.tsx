import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyCta } from "@/components/layout/sticky-cta";
import { Grain } from "@/components/primitives/grain";
import { CustomCursor } from "@/components/primitives/custom-cursor";
import { LatticeRail } from "@/components/journey/lattice-rail";
import { ScrollJourney } from "@/components/journey/scroll-journey";
import { JourneyPanel } from "@/components/journey/journey-panel";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Approach } from "@/components/sections/approach";
import { CallToAction } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Grain />
      <CustomCursor />
      <Navbar homeHref="/#top" />
      <LatticeRail />

      <ScrollJourney>
        <JourneyPanel className="justify-center">
          <Hero />
        </JourneyPanel>

        <JourneyPanel className="justify-start bg-muted/40">
          <Services />
        </JourneyPanel>

        <JourneyPanel className="justify-start bg-muted/40">
          <Approach />
        </JourneyPanel>

        <JourneyPanel className="justify-between bg-muted/40">
          <div className="flex flex-1 items-center">
            <div className="w-full">
              <CallToAction />
            </div>
          </div>
          <Footer />
        </JourneyPanel>
      </ScrollJourney>

      <StickyCta />
    </>
  );
}
