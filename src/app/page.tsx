import { ComplianceBand } from "@/components/sections/compliance-band";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { IndustryTabs } from "@/components/sections/industry-tabs";
import { LabPhotos } from "@/components/sections/lab-photos";
import { MetricsSection } from "@/components/sections/metrics-section";
import { Navigation } from "@/components/sections/navigation";
import { ServiceMatrix } from "@/components/sections/service-matrix";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { TeamTestimonialHero } from "@/components/sections/team-testimonial-hero";
import { ScrollProgress } from "@/components/motion/scroll-progress";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        <Hero />
        <TrustMetrics />
        <ServiceMatrix />
        <IndustryTabs />
        <MetricsSection />
        <ComplianceBand />
        <TeamTestimonialHero />
        <LabPhotos />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
