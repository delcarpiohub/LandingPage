import { ComplianceBand } from "@/components/sections/compliance-band";
import { ContactForm } from "@/components/sections/contact-form";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { IndustryTabs } from "@/components/sections/industry-tabs";
import { LabPhotos } from "@/components/sections/lab-photos";
import { Navigation } from "@/components/sections/navigation";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ServiceMatrix } from "@/components/sections/service-matrix";
import { TrustMetrics } from "@/components/sections/trust-metrics";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <Navigation />
      <main>
        <Hero />
        <TrustMetrics />
        <ServiceMatrix />
        <ComplianceBand />
        <ProcessTimeline />
        <LabPhotos />
        <IndustryTabs />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
