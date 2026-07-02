"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function TeamHighlightBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden bg-[#101820] py-16 md:py-24 lg:py-28 flex items-center"
      aria-label="Equipo Humano"
    >
      {/* SVG Grain Overlay sutil (1.5%) */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 md:px-12 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Columna de Texto - Ocupa 5 columnas en desktop */}
        <div className="lg:col-span-5 space-y-6 lg:space-y-8 flex flex-col justify-center text-white">
          <div className="space-y-4 lg:space-y-5">
            {/* Título editorial */}
            <motion.h2
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="font-display text-[28px] md:text-[36px] lg:text-[42px] font-extrabold leading-[1.1] text-[#F5F5F5] tracking-[-0.03em] whitespace-pre-line"
            >
              {"Las personas detrás\nde cada "}
              <span className="text-[#D5542B]">solución</span>.
            </motion.h2>

            {/* Párrafo descriptivo en rgba(245,245,245,.72) */}
            <motion.p
              initial={reduceMotion ? { opacity: 0.72 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.72, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.7] text-[#F5F5F5]/72 max-w-[450px]"
            >
              Cada proyecto comienza con una conversación. Nuestro equipo combina
              experiencia técnica, conocimiento de laboratorio y acompañamiento
              continuo para entregar soluciones confiables en cada etapa del proceso
              analítico.
            </motion.p>
          </div>

          {/* Firma sobria y discreta */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col space-y-[2px] pt-1"
          >
            <span className="font-sans font-semibold text-[#F5F5F5] text-[14px]">
              Equipo Del Carpio
            </span>
            <span className="font-sans text-xs text-[#F5F5F5]/50">
              Asesoría especializada
            </span>
          </motion.div>
        </div>

        {/* Columna de Fotografía - Ocupa 7 columnas en desktop */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="group relative w-full aspect-[4/3] lg:aspect-auto lg:h-[430px] rounded-[8px] overflow-hidden border border-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src="/fotos/equipo-del-carpio.jpg"
                alt="Fotografía real del equipo Del Carpio sonriendo"
                fill
                priority
                className="object-cover object-center lg:object-[center_35%] filter saturate-[1.05] contrast-[1.02] brightness-[0.96]"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
