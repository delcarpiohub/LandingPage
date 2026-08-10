"use client";

import { Play, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { BrandMeshGradient } from "@/components/ui/brand-mesh-gradient";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const easeOut = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#4A5560] pt-28 pb-14 text-white sm:min-h-[600px] sm:pt-32 sm:pb-20 lg:min-h-[720px] lg:pt-36">
      
      {/* 1. BACKGROUND MEDIA (video en desktop, foto en móvil/tablet) */}
      <div className="absolute inset-0 z-0 select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/fotos/hero-laboratorio.jpg"
          src="/video/hero-bg.mp4"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
        <Image
          src="/fotos/hero-laboratorio.jpg"
          alt="Recepción de Del Carpio"
          fill
          priority
          className="object-cover md:hidden"
        />
      </div>

      {/* 2. OVERLAYS */}
      <BrandMeshGradient
        backdrop="transparent"
        className="z-[5] mix-blend-soft-light opacity-70"
      />
      <div className="absolute inset-0 z-10 bg-[#4A5560]/60" />
      <div className="absolute left-0 top-0 z-10 h-full w-px bg-[#D6532B]/70" />
      <div className="absolute right-[12%] top-0 z-10 h-full w-px bg-white/8" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#4A5560] to-transparent pointer-events-none" />

      {/* 3. CONTENT AREA */}
      <div className="relative z-20 mx-auto flex w-full max-w-site flex-grow items-center px-5 py-8 sm:py-10 lg:py-0">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
        >
          {/* Left Column: Copy & Actions (expanded to 9 columns) */}
          <div className="lg:col-span-9 space-y-5 text-left">
            <div className="space-y-3">
              <motion.h1
                className="font-display text-[28px] font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-[36px] md:max-w-[720px] lg:text-[42px] xl:text-[48px]"
                aria-label="Soluciones técnicas para análisis, medición y control industrial."
              >
                {"Soluciones técnicas para análisis, medición y control industrial.".split(" ").map((word, wordIdx) => (
                  <span
                    key={wordIdx}
                    className="mr-[0.22em] inline-block whitespace-nowrap"
                  >
                    {word}
                  </span>
                ))}
              </motion.h1>
            </div>
            <motion.div 
              variants={textVariants}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-2"
            >
              <InteractiveHoverButton
                aria-label="Solicitar asesoría técnica"
                className="w-full border-[#F5F5F5] text-[#F5F5F5] sm:w-auto"
                onClick={() => {
                  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
                text="Solicitar asesoría técnica"
              />
              <Button asChild variant="ghost-white" className="w-full sm:w-auto rounded-[2px] border-[#F5F5F5] text-[#F5F5F5] hover:bg-white hover:text-[#4A5560]">
                <a href="#servicios">
                  Explorar soluciones
                </a>
              </Button>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* 4. MODAL: CAPACIDADES TÉCNICAS (Video Placeholder) */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="relative w-full max-w-4xl bg-[#4A5560] border border-[var(--border)] rounded-[4px] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 bg-stone-900/30">
                <span className="font-mono text-[9px] font-bold tracking-wider text-[var(--primary)]">
                  DEMOSTRACIÓN TÉCNICA - LAB DEL CARPIO
                </span>
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(false)}
                  className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Video Simulated Sandbox View */}
              <div className="relative aspect-video w-full bg-[#4A5560] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,24,32,1)_0%,rgba(16,24,32,0.94)_54%,rgba(213,84,43,0.28)_100%)]" />
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:42px_42px]" />
                <div className="absolute left-8 top-8 h-24 w-px bg-[#D6532B]" />
                <div className="absolute bottom-8 right-8 h-px w-36 bg-[#FBE369]/70" />
                
                {/* Floating technical analytics simulation */}
                <div className="absolute inset-x-0 top-0 p-4 flex justify-between pointer-events-none">
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 p-2 font-mono text-[9px] text-white/80 space-y-0.5">
                    <p>DETECTOR: HPLC_UV_254nm</p>
                    <p>STATUS: RUNNING (DEMO)</p>
                    <p>ELUENT FLOW: 1.00 mL/min</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 p-2 font-mono text-[9px] text-emerald-400">
                    <p>CALIBRACIÓN OK</p>
                    <p>SIGNAL INTENSITY: 98.4%</p>
                  </div>
                </div>

                {/* Centered technical overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-[2px]">
                  <div className="p-3 border border-[#D6532B]/40 rounded-full bg-black/60 text-[#D6532B] mb-4">
                    <Play size={24} weight="fill" className="translate-x-0.5" />
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                    Estación de Calibración Cromatográfica HPLC
                  </h3>
                  <p className="mt-2 text-xs text-white/70 max-w-md font-sans">
                    Nuestros especialistas operan y calibran equipamiento de alta complejidad directamente en laboratorio de terreno o en nuestras instalaciones.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsVideoOpen(false);
                      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-6 bg-[#D6532B] hover:bg-[#b54725] text-white font-mono text-[10px] py-2 px-5 rounded-[2px]"
                  >
                    Agendar Capacitación o Visita
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
