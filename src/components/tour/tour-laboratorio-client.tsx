"use client";

import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";

export function TourLaboratorioClient() {
  return (
    <div className="flex min-h-dvh flex-col justify-between bg-white text-[#4A5560]">
      <Navigation />

      <main id="main-content" className="flex-grow pt-16">
        <PanoramaViewer />
      </main>

      <Footer />
    </div>
  );
}
