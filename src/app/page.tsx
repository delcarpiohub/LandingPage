import { ComplianceBand } from "@/components/sections/compliance-band";
import { ContactCTA } from "@/components/sections/contact-cta";
import { ExploreSection } from "@/components/sections/explore-section";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { LabPhotos } from "@/components/sections/lab-photos";
import { MetricsSection } from "@/components/sections/metrics-section";
import { Navigation } from "@/components/sections/navigation";
import { ProjectsShowcaseCarousel } from "@/components/sections/projects-showcase-carousel";
import { TeamHighlightBanner } from "@/components/sections/team-highlight-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Reveal } from "@/components/motion/reveal";
import { ChromatogramDivider } from "@/components/sections/chromatogram-divider";
import { CHROMATOGRAM_PRESETS } from "@/content/chromatogram-presets";

export default function Home() {
  return (
    <div className="min-h-dvh bg-transparent">
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        <Hero />

        <ChromatogramDivider
          peaks={CHROMATOGRAM_PRESETS.heroToExplore.peaks}
          peaksMobile={CHROMATOGRAM_PRESETS.heroToExplore.peaksMobile}
          label={CHROMATOGRAM_PRESETS.heroToExplore.label}
        />

        <Reveal>
          <ExploreSection />
        </Reveal>

        <Reveal>
          <ProjectsShowcaseCarousel />
        </Reveal>

        <ChromatogramDivider
          peaks={CHROMATOGRAM_PRESETS.proyectosToMetricas.peaks}
          peaksMobile={CHROMATOGRAM_PRESETS.proyectosToMetricas.peaksMobile}
          label={CHROMATOGRAM_PRESETS.proyectosToMetricas.label}
        />

        <Reveal>
          <MetricsSection />
        </Reveal>

        <Reveal>
          <ComplianceBand />
        </Reveal>

        <TeamHighlightBanner />

        <Reveal>
          <LabPhotos />
        </Reveal>

        <ChromatogramDivider
          peaks={CHROMATOGRAM_PRESETS.labToTestimonios.peaks}
          peaksMobile={CHROMATOGRAM_PRESETS.labToTestimonios.peaksMobile}
          label={CHROMATOGRAM_PRESETS.labToTestimonios.label}
        />

        <Reveal>
          <Testimonials />
        </Reveal>

        <Reveal>
          <ContactCTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
