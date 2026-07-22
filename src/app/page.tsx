import { ComplianceBand } from "@/components/sections/compliance-band";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { IndustryTabs } from "@/components/sections/industry-tabs";
import { LabPhotos } from "@/components/sections/lab-photos";
import { MetricsSection } from "@/components/sections/metrics-section";
import { Navigation } from "@/components/sections/navigation";
import { ProjectsShowcaseCarousel } from "@/components/sections/projects-showcase-carousel";
import { TeamHighlightBanner } from "@/components/sections/team-highlight-banner";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Reveal } from "@/components/motion/reveal";

export default function Home() {
  return (
    <div className="min-h-dvh bg-transparent">
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        <Hero />
        
        <Reveal>
          <IndustryTabs />
        </Reveal>
        
        <Reveal>
          <ProjectsShowcaseCarousel />
        </Reveal>
        
        <Reveal>
          <MetricsSection />
        </Reveal>
        
        <Reveal>
          <ComplianceBand />
        </Reveal>
        
        <Reveal>
          <TeamHighlightBanner />
        </Reveal>
        
        <Reveal>
          <LabPhotos />
        </Reveal>
        
        <Reveal>
          <ContactCTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
