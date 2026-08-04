"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Reveal } from "@/components/motion/reveal";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";

export function TourLaboratorioClient() {
  return (
    <div className="flex min-h-dvh flex-col justify-between bg-[#FAF9F8] text-[#1A1A1A] font-sans selection:bg-[#5A534F] selection:text-white">
      {/* HEADER / NAVIGATION */}
      <Navigation />

      <main id="main-content" className="flex-grow pt-20">
        {/* HERO SECTION (PAGE BACKGROUND #FAF9F8) */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-16 pt-6 md:pb-24 md:pt-10 bg-[#FAF9F8]">
          <div className="mx-auto max-w-[1360px]">
            {/* HERO OVERLAY TITLE HEADER */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
              <Reveal>
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] max-w-3xl leading-[1.08]">
                    Infraestructura analítica para decisiones de alta precisión.
                  </h1>
                </div>
              </Reveal>
            </div>

            {/* MAIN SHOWCASE AREA WITH MASSIVE ROUNDED CORNERS */}
            <div className="relative mt-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1A1A1A] shadow-2xl border border-black/5">
                  <PanoramaViewer />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ABOUT COMPANY / INFRAESTRUCTURA (TWO-COLUMN SPLIT, PAGE BG #FAF9F8) */}
        <section className="border-t border-black/5 bg-[#FAF9F8] py-16 md:py-24">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              {/* LEFT COLUMN: HEADINGS */}
              <div className="flex flex-col">
                <Reveal>
                  <h2 className="font-display text-3xl font-extrabold text-[#1A1A1A] sm:text-4xl md:text-5xl leading-tight">
                    Infraestructura técnica para decisiones de alta precisión.
                  </h2>
                </Reveal>
              </div>

              {/* RIGHT COLUMN: 3 PARAGRAPHS */}
              <div className="flex flex-col justify-center lg:pt-4 text-[#1A1A1A] space-y-6">
                <Reveal delay={0.06}>
                  <p className="font-display text-lg font-bold leading-relaxed text-[#1A1A1A]">
                    En Del Carpio desarrollamos espacios analíticos donde cada detalle técnico responde a exigencias normativas y operativas de alta frecuencia.
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-[#5A534F]">
                    Nuestra infraestructura física e instrumental integra salas de cromatografía, áreas de balanzas aisladas térmicamente, campanas de extracción EAA y redes de gases ultrapuros con monitoreo de presión continuo.
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-[#5A534F]">
                    A través de este tour virtual, clientes industriales, mineros y académicos pueden explorar el diseño interior, la ergonomía de estaciones de trabajo y la calidad de los acabados técnicos antes de una visita presencial.
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="pt-2">
                    <Link
                      href="/contacto"
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#5A534F] px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#1A1A1A] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A534F]"
                    >
                      SOLICITAR CONSULTA TÉCNICA
                      <ArrowRight size={16} weight="bold" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
