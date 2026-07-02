"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Reveal } from "@/components/motion/reveal";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";

export function TourLaboratorioClient() {
  return (
    <div className="flex min-h-dvh flex-col justify-between bg-white text-[#4A5560]">
      <Navigation />

      <main id="main-content" className="flex-grow pt-16">
        <section
          data-section="1"
          className="mx-auto max-w-[1320px] px-5 py-6 md:py-10"
        >
          <PanoramaViewer />

          <div className="mt-10 flex justify-center border-t border-[#4A5560]/10 pt-8">
            <Reveal>
              <Link
                href="/contacto"
                className="inline-flex cursor-pointer items-center gap-2 rounded-[2px] bg-[#D6532B] px-8 py-4 font-display text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#b54725] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
              >
                Solicitar visita t&eacute;cnica
                <ArrowRight size={14} weight="bold" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
