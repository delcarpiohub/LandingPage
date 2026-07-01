"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function TeamHighlightBanner() {
  const reduceMotion = useReducedMotion();

  // Animaciones del banner
  const headingVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  const paragraphVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 0.96,
      transition: {
        duration: 0.7,
        delay: 0.15,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  const authorVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section
      className="relative w-full min-h-[520px] lg:h-[520px] lg:max-h-[620px] overflow-hidden bg-[#0E4B43] flex flex-col-reverse lg:flex-row items-stretch"
      aria-label="Equipo Humano"
    >
      {/* Contenido Izquierdo */}
      <div className="relative z-20 flex flex-col justify-center px-6 py-12 md:px-16 md:py-20 lg:py-0 lg:px-[120px] w-full lg:w-[50%] lg:min-w-[520px] text-white">
        <div className="max-w-[480px] space-y-6">
          {/* Título en color de acento amarillo #F4C542 */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headingVariants}
            className="font-display text-[34px] md:text-[44px] lg:text-[56px] font-extrabold leading-[1.05] text-[#F4C542] tracking-[-0.03em] whitespace-pre-line"
          >
            {"Las personas detrás\nde cada solución"}
          </motion.h2>

          {/* Párrafo descriptivo */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={paragraphVariants}
            className="font-sans text-[17px] md:text-[19px] leading-[1.7] text-white opacity-96 max-w-[480px]"
          >
            Cada proyecto comienza con una conversación. Nuestro equipo combina
            experiencia técnica, conocimiento de laboratorio y acompañamiento
            continuo para entregar soluciones confiables en cada etapa del proceso
            analítico.
          </motion.p>

          {/* Autor / Equipo Del Carpio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={authorVariants}
            className="flex flex-col space-y-[6px] pt-2"
          >
            <span className="font-display font-semibold text-white text-base">
              Equipo Del Carpio
            </span>
            <span className="font-mono text-xs text-white/75 tracking-wider uppercase">
              Asesoría Especializada
            </span>
          </motion.div>
        </div>
      </div>

      {/* Contenido Derecho (Fotografía de fondo) */}
      <div className="relative h-[280px] lg:h-auto lg:w-[55%] flex-grow overflow-hidden z-10">
        {/* Foto real del equipo con animación slow-scale */}
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/fotos/equipo-del-carpio.jpg"
            alt="Fotografía real del equipo Del Carpio sonriendo"
            fill
            priority
            className="object-cover object-center lg:object-[center_35%]"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        </motion.div>

        {/* Degradado lineal 90deg (Desktop) para mezcla de fondos */}
        <motion.div
          animate={reduceMotion ? undefined : { opacity: [0.93, 0.96, 0.93] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          className="absolute inset-0 z-20 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, #0E4B43 0%, rgba(14, 75, 67, 0.95) 15%, rgba(14, 75, 67, 0.88) 28%, rgba(14, 75, 67, 0.55) 55%, rgba(14, 75, 67, 0.18) 80%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        {/* Degradado para dispositivos móviles */}
        <div
          className="absolute inset-0 z-20 pointer-events-none lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14, 75, 67, 0.4) 0%, rgba(14, 75, 67, 0.95) 100%)",
          }}
        />
      </div>
    </section>
  );
}
