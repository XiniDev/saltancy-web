import { LightStream } from "@/components/ember/light-stream";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Hub } from "@/components/sections/hub";
import { Start } from "@/components/sections/start";
import { clientSignInHref, contactEmail, projectHubEnabled } from "@/lib/flags";

export default function Home() {
  return (
    <>
      <LightStream />
      <Navbar hubEnabled={projectHubEnabled} signInHref={clientSignInHref} />
      <main className="relative overflow-x-clip">
        <Hero />
        <Services />
        <Process />
        {projectHubEnabled && <Hub />}
        <Start hubEnabled={projectHubEnabled} signInHref={clientSignInHref} email={contactEmail} />
      </main>
      <Footer hubEnabled={projectHubEnabled} />
    </>
  );
}
