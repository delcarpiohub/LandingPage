"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function TeamHighlightBanner() {
  const reduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverPos({ x, y });

    if (!reduceMotion) {
      // Parallax sutil del fondo (movimiento máximo de 10px)
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: px * 10, y: py * 10 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[420px] lg:h-[420px] lg:max-h-[500px] overflow-hidden bg-[#D6532B] flex flex-col-reverse lg:flex-row items-stretch"
      aria-label="Equipo Humano"
    >
      {/* Halo radial de iluminación interactivo siguiendo al cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 hidden lg:block"
          style={{
            background: `radial-gradient(circle 320px at ${hoverPos.x}px ${hoverPos.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Contenido Izquierdo */}
      <div className="relative z-20 flex flex-col justify-center px-6 py-10 md:px-16 md:py-14 lg:py-0 lg:pl-[120px] lg:pr-12 w-full lg:w-[48%] lg:min-w-[500px] text-white">
        <div className="max-w-[450px] space-y-5">
          {/* Título en color negro de la página #4A5560 */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headingVariants}
            className="font-display text-[26px] md:text-[34px] lg:text-[40px] font-extrabold leading-[1.1] text-[#4A5560] tracking-[-0.03em] whitespace-pre-line"
          >
            {"Las personas detrás\nde cada solución"}
          </motion.h2>

          {/* Párrafo descriptivo (tamaño un poco más chico y legible) */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={paragraphVariants}
            className="font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.7] text-white opacity-96 max-w-[440px]"
          >
            Cada proyecto comienza con una conversación. Nuestro equipo combina
            experiencia técnica, conocimiento de laboratorio y acompañamiento
            continuo para entregar soluciones confiables en cada etapa del proceso
            analítico.
          </motion.p>

          {/* Autor / Equipo Del Carpio (interactivo al hover) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={authorVariants}
            whileHover={{ x: 4 }}
            className="flex flex-col space-y-[4px] pt-1 cursor-default select-none"
          >
            <span className="font-display font-semibold text-[#4A5560] text-base">
              Equipo Del Carpio
            </span>
            <span className="font-mono text-xs text-white/80 tracking-wider uppercase">
              Asesoría Especializada
            </span>
          </motion.div>
        </div>
      </div>

      {/* Contenido Derecho (Fotografía de fondo ajustada e interactiva) */}
      <div className="relative h-[280px] lg:h-auto lg:w-[55%] flex-grow overflow-hidden z-10">
        {/* Foto real del equipo con animación slow-scale + parallax del mouse */}
        <motion.div
          animate={reduceMotion ? undefined : { 
            scale: [1, 1.03, 1],
            x: mousePos.x,
            y: mousePos.y
          }}
          transition={{
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
            x: { type: "spring", stiffness: 80, damping: 15 },
            y: { type: "spring", stiffness: 80, damping: 15 }
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

        {/* Degradado lineal 90deg (Desktop) para mezcla de fondos en terracota */}
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
              "linear-gradient(90deg, #D6532B 0%, rgba(213, 84, 43, 0.95) 15%, rgba(213, 84, 43, 0.88) 28%, rgba(213, 84, 43, 0.55) 55%, rgba(213, 84, 43, 0.18) 80%, rgba(213, 84, 43, 0) 100%)",
          }}
        />

        {/* Degradado para dispositivos móviles */}
        <div
          className="absolute inset-0 z-20 pointer-events-none lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(213, 84, 43, 0.4) 0%, rgba(213, 84, 43, 0.95) 100%)",
          }}
        />
      </div>
    </section>
  );
}
