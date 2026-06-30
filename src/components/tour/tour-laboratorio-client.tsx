"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, HandPointing } from "@phosphor-icons/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";
import { Reveal } from "@/components/motion/reveal";

export function TourLaboratorioClient() {
  const [isViewerLoaded, setIsViewerLoaded] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [activeSection, setActiveSection] = useState(1);
  const [totalSections, setTotalSections] = useState(1);

  // 1. Detección de carga de Pannellum (inspeccionando el DOM de forma no invasiva)
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const loadBox = document.querySelector("#tour-laboratorio-seccion1 .pnlm-load-box");
      if (loadBox) {
        const isHidden = (loadBox as HTMLElement).style.display === "none";
        if (isHidden) {
          setIsViewerLoaded(true);
          clearInterval(checkInterval);
        }
      }
    }, 200);

    return () => clearInterval(checkInterval);
  }, []);

  // 2. Ocultar instrucción de interacción después de 4 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstruction(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleUserInteraction = () => {
    if (showInstruction) {
      setShowInstruction(false);
    }
  };

  // 3. Intersection Observer para actualizar automáticamente el contador de secciones
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    setTotalSections(sections.length || 1);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionNum = parseInt(entry.target.getAttribute("data-section") || "1", 10);
            setActiveSection(sectionNum);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-dvh bg-white text-[#101820] flex flex-col justify-between select-none">
      <Navigation />

      {/* Floating Section Counter (Left margin, desktop only) */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4">
        <span className="font-mono text-[9px] font-bold text-[#101820]/40 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
          SECCIÓN {activeSection.toString().padStart(2, "0")} / {totalSections.toString().padStart(2, "0")}
        </span>
        <div className="w-[1.5px] h-16 bg-[#D5542B] transition-all duration-300" />
      </div>

      <main id="main-content" className="flex-grow pt-16">
        
        {/* ========================================== */}
        {/* SECCIÓN 1 — Entrada e Identidad del Laboratorio. Más secciones se agregan aquí a medida que lleguen las fotos. */}
        {/* ========================================== */}

        {/* Visor 360 Section (Pannellum wrapped with custom loading states and interaction helpers) */}
        <section
          data-section="1"
          className="mx-auto max-w-[1320px] px-5 py-6 md:py-10"
        >
          <div 
            className="relative w-full overflow-hidden"
            onMouseMove={handleUserInteraction}
            onTouchStart={handleUserInteraction}
          >
            {/* 360 Viewer Loading Indicator */}
            {!isViewerLoaded && (
              <div className="absolute inset-0 bg-[#101820] z-20 flex flex-col items-center justify-center min-h-[300px] md:min-h-[500px] transition-opacity duration-300">
                {/* Minimalist Terracotta Spinner */}
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D5542B]/20 border-t-[#D5542B] mb-3" />
                <p className="font-sans text-[11px] tracking-wider text-white/50 uppercase">
                  Cargando tour virtual...
                </p>
              </div>
            )}

            {/* Interaction Guideline Pill */}
            {isViewerLoaded && showInstruction && (
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none animate-fade-in">
                <div className="flex items-center gap-2 bg-[#101820]/75 backdrop-blur-md border border-white/10 rounded-full py-1.5 px-3.5 text-white/90">
                  <HandPointing size={14} className="text-[#D5542B] animate-pulse" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">
                    Arrastra para explorar
                  </span>
                </div>
              </div>
            )}

            <PanoramaViewer imageSource="/tour/seccion1/panorama-laboratorio.jpg" />
          </div>

          {/* Section Footer Call To Action (wrapped with Reveal component for scroll reveal) */}
          <div className="mt-10 flex justify-center border-t border-[#101820]/10 pt-8">
            <Reveal>
              <Link 
                href="/contacto"
                className="inline-flex items-center gap-2 cursor-pointer bg-[#D5542B] hover:bg-[#b54725] text-white font-display text-[10px] font-bold uppercase tracking-widest py-4 px-8 rounded-[2px] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
              >
                Solicitar visita técnica
                <ArrowRight size={14} weight="bold" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* // FUTURAS SECCIONES — Más secciones del tour se agregarán de forma vertical debajo de esta línea a medida que se disponga de las fotos. */}

      </main>

      <Footer />
    </div>
  );
}
