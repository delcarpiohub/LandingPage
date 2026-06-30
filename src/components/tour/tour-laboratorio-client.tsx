"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Microscope, ShieldCheck, HandPointing } from "@phosphor-icons/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";
import { Reveal } from "@/components/motion/reveal";

export function TourLaboratorioClient() {
  const reduceMotion = useReducedMotion();
  const [isViewerLoaded, setIsViewerLoaded] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [activeSection, setActiveSection] = useState(1);
  const [totalSections, setTotalSections] = useState(2);

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
    setTotalSections(sections.length);

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

  const easeOutTransition = { duration: 0.6, ease: "easeOut" as const };

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

        {/* Hero Section (Framer Motion page entrance animations) */}
        <section
          data-section="1"
          className="w-full"
        >
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={easeOutTransition}
            className="relative min-h-[560px] overflow-hidden bg-[#101820] md:min-h-[680px]"
          >
            <Image
              src="/tour/seccion1/puerta-icp-oes.jpg"
              alt="Puerta del laboratorio Del Carpio con letrero AA, ICP-OES e ICP-MS y sala visible"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60"
            />
            {/* Dark Technical Overlay (40% opacity as requested to keep details visible) */}
            <div className="absolute inset-0 bg-[#101820]/40 z-10" />

            <div className="relative z-10 flex min-h-[560px] items-end p-6 md:min-h-[680px] md:p-12 lg:p-16 text-white">
              <div className="max-w-2xl">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#D5542B] block mb-3">
                  // TOUR VIRTUAL DEL CARPIO
                </span>
                
                <motion.h1
                  initial={reduceMotion ? {} : { opacity: 0, y: 15 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={reduceMotion ? {} : { ...easeOutTransition, delay: 0.2 }}
                  className="font-display text-4xl font-bold leading-[1.05] md:text-6xl uppercase"
                >
                  Laboratorio de An&aacute;lisis
                </motion.h1>

                <p className="mt-5 font-sans text-lg font-semibold leading-8 text-white/86 md:text-2xl">
                  AA &middot; ICP-OES &middot; ICP-MS
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Visor 360 Section (Pannellum wrapped with custom loading states and interaction helpers) */}
        <section
          data-section="2"
          className="mx-auto max-w-[1320px] px-5 py-10 md:py-14"
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

          {/* Supporting Gallery Grid */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <figure className="border border-[#101820]/10 bg-white shadow-[0_18px_50px_rgba(16,24,32,0.06)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#101820]/5">
                <Image
                  src="/tour/seccion1/corredor-principal.jpg"
                  alt="Corredor limpio de acceso al laboratorio Del Carpio"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-[#101820]/10 px-5 py-4 text-xs leading-6 text-[#101820]/72 flex items-center gap-2">
                <Microscope size={14} className="text-[#D5542B]" />
                Acceso limpio y controlado hacia el &aacute;rea anal&iacute;tica.
              </figcaption>
            </figure>

            <figure className="border border-[#101820]/10 bg-white shadow-[0_18px_50px_rgba(16,24,32,0.06)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#101820]/5">
                <Image
                  src="/tour/seccion1/letrero-analisis.jpg"
                  alt="Corredor con letrero de Análisis en laboratorio Del Carpio"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-[#101820]/10 px-5 py-4 text-xs leading-6 text-[#101820]/72 flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#D5542B]" />
                Identificaci&oacute;n clara del &aacute;rea de An&aacute;lisis.
              </figcaption>
            </figure>
          </div>

          {/* Section Footer Call To Action (wrapped with Reveal component for scroll reveal) */}
          <div className="mt-14 flex justify-center border-t border-[#101820]/10 pt-10">
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
