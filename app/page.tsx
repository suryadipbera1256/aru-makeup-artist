import { Nav } from "@/components/ui/Nav";
import { MorphShowcase } from "@/components/sections/MorphShowcase";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Insights } from "@/components/sections/Insights";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <MorphShowcase />
        <ProjectGrid />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
