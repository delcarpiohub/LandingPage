"use client";

import { ArrowRight, Play, X } from "@phosphor-icons/react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const easeOut = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
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
    <section className="relative min-h-[580px] lg:h-[92vh] lg:min-h-[700px] overflow-hidden bg-[#101820] text-white flex flex-col justify-between pt-24">
      
      {/* 1. BACKGROUND IMAGES (Diagonal Split Visual Partition + Cinematic Slow Breathing Scale) */}
      <div className="absolute inset-0 z-0 select-none">
        
        {/* Mobile Background: Single full-screen image */}
        <div className="lg:hidden absolute inset-0 size-full">
          <motion.div
            animate={reduceMotion ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" as const }}
            className="absolute inset-0 size-full"
          >
            <Image
              src="/fotos/instalacion-hplc-operador.jpg"
              alt="Especialista operando estación HPLC Del Carpio"
              fill
              priority
              className="object-cover object-center opacity-40"
              sizes="100vw"
            />
          </motion.div>
        </div>

        {/* Desktop Background: Diagonal split */}
        <div className="hidden lg:block absolute inset-0 size-full">
          
          {/* Left Side Background: Base layer (Cinematic breathing scale) */}
          <motion.div 
            animate={reduceMotion ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" as const }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/fotos/instalacion-hplc-operador.jpg"
              alt="Especialista operando estación HPLC Del Carpio"
              fill
              priority
              className="object-cover object-center opacity-40"
              sizes="100vw"
            />
          </motion.div>

          {/* Right Side Background: Diagonal clipped panel */}
          <div 
            className="absolute inset-0 w-full h-full z-10 overflow-hidden"
            style={{ 
              clipPath: "polygon(58% 0, 100% 0, 100% 100%, 48% 100%)" 
            }}
          >
            <motion.div 
              animate={reduceMotion ? {} : { scale: [1.03, 1, 1.03] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" as const }}
              className="absolute inset-0 size-full"
            >
              <Image
                src="/fotos/instalacion-hplc-equipo.jpg"
                alt="Sistema cromatográfico Del Carpio instalado en laboratorio"
                fill
                className="object-cover object-center opacity-30"
                sizes="100vw"
              />
            </motion.div>
          </div>

          {/* Terracotta Division Line base */}
          <div 
            className="absolute inset-0 bg-[#D5542B]/35 z-20 pointer-events-none"
            style={{ 
              clipPath: "polygon(58% 0, 58.25% 0, 48.25% 100%, 48% 100%)" 
            }}
          />

          {/* Innovative Diagonal Light Beam Pulse (technical glow scan) */}
          {!reduceMotion && (
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" as const }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D5542B] to-transparent opacity-80 z-20 pointer-events-none"
              style={{ 
                clipPath: "polygon(58% 0, 58.25% 0, 48.25% 100%, 48% 100%)" 
              }}
            />
          )}
        </div>

      </div>

      {/* 2. OVERLAYS & TEXTURES */}
      {/* Technical Grid Texture (6% opacity) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      {/* Dark Technical Overlay (Ink #101820, 62% opacity) */}
      <div className="absolute inset-0 z-10 bg-[#101820]/62" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#101820] to-transparent pointer-events-none" />

      {/* 3. CONTENT AREA */}
      <div className="relative z-20 mx-auto max-w-site w-full flex-grow flex items-center py-10 lg:py-0 px-5">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
        >
          {/* Left Column: Copy & Actions (58% / 7 columns) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <motion.div variants={textVariants} className="space-y-3">
              <h1 
                className="font-display text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] font-extrabold uppercase leading-[1.12] text-white tracking-tight"
              >
                Soluciones técnicas para análisis, medición y control industrial.
              </h1>
            </motion.div>
            <motion.div 
              variants={textVariants}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-2"
            >
              <Button asChild className="w-full sm:w-auto bg-[#D5542B] hover:bg-[#b54725] text-[#F5F5F5] rounded-[2px] py-4 px-6 border-none">
                <a href="#contacto">
                  Solicitar asesoría técnica
                  <ArrowRight size={17} weight="bold" />
                </a>
              </Button>
              <Button asChild variant="ghost-white" className="w-full sm:w-auto rounded-[2px] border-[#F5F5F5] text-[#F5F5F5] hover:bg-white hover:text-[#101820]">
                <a href="#servicios">
                  Explorar soluciones
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Capacidades Técnicas Video play button (42% / 5 columns) */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <motion.button
              variants={textVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 cursor-pointer group focus:outline-none"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="relative size-16 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-black transition-all">
                {/* Pulsing ripple ring */}
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-45 pointer-events-none" />
                <Play size={20} weight="fill" className="text-white group-hover:text-[#101820] translate-x-0.5" />
              </div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                Ver capacidades técnicas
              </span>
            </motion.button>
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
              className="relative w-full max-w-4xl bg-[#101820] border border-[var(--border)] rounded-[4px] shadow-2xl overflow-hidden"
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
              <div className="relative aspect-video w-full bg-stone-950 flex items-center justify-center overflow-hidden">
                <Image
                  src="/fotos/hero-laboratorio.jpg"
                  alt="Laboratorio de calibración y análisis Del Carpio"
                  fill
                  className="object-cover object-center opacity-70"
                />
                
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
                  <div className="p-3 border border-[#D5542B]/40 rounded-full bg-black/60 text-[#D5542B] mb-4">
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
                    className="mt-6 bg-[#D5542B] hover:bg-[#b54725] text-white font-mono text-[10px] py-2 px-5 rounded-[2px]"
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
