"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const slides = [
  {
    title: "Las personas detrás de cada solución",
    quote: "Cada proyecto comienza con una conversación. Nuestro equipo combina experiencia técnica, conocimiento de laboratorio y acompañamiento continuo para entregar soluciones confiables en cada etapa del proceso analítico.",
    author: "Equipo Del Carpio",
    role: "Asesoría Especializada",
  },
  {
    title: "Soporte Técnico y Científico",
    quote: "No solo entregamos equipos, garantizamos su operatividad continua. Nuestro soporte post-venta y servicio técnico certificado aseguran la máxima precisión y cumplimiento de normativas.",
    author: "Servicio de Soporte",
    role: "Post-Venta & Mantenimiento",
  },
  {
    title: "Calidad y Confianza Analítica",
    quote: "Guiamos a laboratorios industriales hacia la acreditación ISO 17025 y cumplimiento de estándares internacionales, transformando el control de calidad en una ventaja competitiva.",
    author: "Acompañamiento Regulatorio",
    role: "Sistemas de Gestión e ISO 17025",
  },
];

export function TeamTestimonialHero() {
  const reduceMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Transiciones de texto sutiles
  const slideVariants = {
    enter: (reduce: boolean) => ({
      opacity: 0,
      x: reduce ? 0 : 15,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
    exit: (reduce: boolean) => ({
      opacity: 0,
      x: reduce ? 0 : -15,
      transition: {
        duration: 0.45,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section
      className="relative w-full h-[610px] overflow-hidden bg-[#09403A] flex items-center"
      aria-label="Equipo Humano y Valores"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Imagen de fondo */}
      <Image
        src="/fotos/equipo-del-carpio.jpg"
        alt="Equipo técnico y especialistas de Del Carpio"
        fill
        priority
        className="object-cover object-[center_right] lg:object-[80%_center]"
        sizes="100vw"
      />

      {/* Degradado para legibilidad en pantallas grandes */}
      <div
        className="absolute inset-0 z-10 hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(9, 64, 58, 0.96) 0%, rgba(9, 64, 58, 0.90) 35%, rgba(9, 64, 58, 0.50) 65%, rgba(9, 64, 58, 0.15) 100%)",
        }}
      />

      {/* Degradado completo para pantallas chicas */}
      <div
        className="absolute inset-0 z-10 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9, 64, 58, 0.98) 0%, rgba(9, 64, 58, 0.92) 100%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-20 mx-auto w-full max-w-[1130px] px-6 md:px-16 lg:px-[120px]">
        <div className="max-w-[690px] text-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIdx}
              custom={Boolean(reduceMotion)}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-start"
            >
              {/* Título en color de acento amarillo de la marca */}
              <h2 className="font-display text-2xl font-bold leading-tight text-[#FBE369] md:text-3xl lg:text-[40px] mb-8">
                {slides[currentIdx].title}
              </h2>

              {/* Mensaje principal en blockquote */}
              <blockquote className="mb-6 max-w-[700px]">
                <p className="text-lg font-medium leading-relaxed md:text-xl lg:text-[25px] text-white/95">
                  “{slides[currentIdx].quote}”
                </p>
              </blockquote>

              {/* Autor */}
              <cite className="not-italic mb-8">
                <span className="block text-sm font-bold tracking-wider text-white/70 uppercase">
                  {slides[currentIdx].author}
                </span>
                <span className="block text-xs text-white/50 mt-1">
                  {slides[currentIdx].role}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>

          {/* Controles del Slider */}
          <div className="flex items-center gap-[22px] select-none mt-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Diapositiva anterior"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <CaretLeft size={20} weight="bold" />
            </button>

            <span className="font-mono text-sm font-semibold tracking-widest text-white/90">
              {currentIdx + 1} — {slides.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Diapositiva siguiente"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
