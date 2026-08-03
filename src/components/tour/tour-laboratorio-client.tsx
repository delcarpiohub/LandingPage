"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Reveal } from "@/components/motion/reveal";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";
import { TourSceneGallery } from "@/components/tour/tour-scene-gallery";
import { TourSceneNavigation } from "@/components/tour/tour-scene-navigation";
import { tourScenes } from "@/content/tour-scenes";
import type { TourSceneId } from "@/content/tour-scenes";

export function TourLaboratorioClient() {
  const [selectedSceneId, setSelectedSceneId] = useState<TourSceneId>(tourScenes[0].id);
  const handleSceneSelect = useCallback((sceneId: TourSceneId) => {
    setSelectedSceneId(sceneId);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("recorrido-360")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-[#F5F5F5] text-[#4A5560]">
      <Navigation />

      <main id="main-content" className="flex-grow pt-16">
        <section className="bg-[#4A5560] text-white">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex min-h-[440px] items-center px-5 py-14 md:px-8 md:py-20 lg:px-14">
              <div className="max-w-xl">
                <Reveal>
                  <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FBE369]">
                    Recorrido virtual / 01-06
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] md:text-5xl lg:text-6xl">
                    Conozca el laboratorio antes de su visita tecnica.
                  </h1>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 max-w-lg text-base leading-7 text-white/80 md:text-lg">
                    Recorra seis puntos del laboratorio y explore el espacio con libertad antes de coordinar una visita presencial.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#recorrido-360"
                      className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#D6532B] px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#D6532B]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
                    >
                      Iniciar recorrido virtual
                      <ArrowRight size={16} weight="bold" />
                    </a>
                    <Link
                      href="/contacto"
                      className="inline-flex min-h-12 items-center justify-center border border-white/40 px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#FBE369] hover:text-[#FBE369] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369]"
                    >
                      Agendar visita tecnica
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal className="relative min-h-[320px] overflow-hidden lg:min-h-full">
              <Image
                src={tourScenes[0].imageSource}
                alt="Vista panoramica real de una zona del laboratorio Del Carpio"
                fill
                priority
                quality={72}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/30 bg-[#4A5560]/90 px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white md:px-8">
                Seis puntos conectados para explorar el laboratorio.
              </div>
            </Reveal>
          </div>
        </section>

        <TourSceneNavigation activeSceneId={selectedSceneId} onSceneSelect={handleSceneSelect} />

        <section className="bg-[#4A5560]">
          <PanoramaViewer requestedSceneId={selectedSceneId} onSceneChange={setSelectedSceneId} />
        </section>

        <TourSceneGallery activeSceneId={selectedSceneId} onSceneSelect={handleSceneSelect} />

        <section className="border-t border-[#707E83]/35 bg-[#F5F5F5]">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:px-8 md:py-20">
            <Reveal className="relative min-h-64 overflow-hidden border border-[#707E83]/35 md:min-h-full">
              <Image
                src={tourScenes[5].imageSource}
                alt="Vista panoramica del area de analisis del laboratorio Del Carpio"
                fill
                quality={72}
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
            </Reveal>
            <div className="flex items-center">
              <Reveal delay={0.08}>
                <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Visita tecnica
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-[#4A5560] md:text-4xl">
                  Conocer la infraestructura ayuda a preparar la conversacion tecnica.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#4A5560]/80">
                  Coordine una visita para revisar en terreno el contexto de su requerimiento junto al equipo Del Carpio.
                </p>
                <Link
                  href="/contacto"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 bg-[#D6532B] px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#D6532B]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
                >
                  Solicitar visita tecnica
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
