"use client";

import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";

const easeOut = [0.23, 1, 0.32, 1] as const;

const slides = [
  {
    src: "/fotos/hero-laboratorio.jpg",
    alt: "Laboratorio Del Carpio con instrumentación analítica en operación",
  },
  {
    src: "/fotos/instalacion-hplc-operador.jpg",
    alt: "Especialista operando estación HPLC Del Carpio",
  },
  {
    src: "/fotos/instalacion-hplc-equipo.jpg",
    alt: "Sistema cromatográfico Del Carpio instalado en laboratorio",
  },
  {
    src: "/fotos/instalacion-campana.jpg",
    alt: "Campana de extracción y equipos de laboratorio Del Carpio",
  },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, transform: "translateY(14px)" },
        animate: { opacity: 1, transform: "translateY(0px)" },
        transition: { duration: 0.55, ease: easeOut },
      };

  return (
    <section className="relative min-h-[580px] overflow-hidden bg-[#101820] text-white md:min-h-[480px]">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 size-full"
          >
            <Image
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-10 bg-black/35" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(16,24,32,0.22)_0%,rgba(16,24,32,0.68)_50%,rgba(16,24,32,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />

      <div className="pointer-events-none absolute -left-1/4 -top-1/4 z-10 size-[600px] rounded-full bg-[var(--primary)]/8 blur-[120px]" />

      <div className="relative z-20 mx-auto flex min-h-[580px] max-w-site items-center justify-center px-5 text-center md:min-h-[480px]">
        <motion.div className="max-w-3xl" {...motionProps}>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/60">
            Servicio técnico científico
          </p>
          <h1 className="font-display text-[2.2rem] font-extrabold uppercase leading-[1.05] text-white drop-shadow-sm sm:text-[3rem] md:text-[3.25rem]">
            Instrumentación analítica
          </h1>
          <p className="mt-2 font-display text-xl font-bold uppercase leading-tight text-white/90 sm:text-2xl">
            para laboratorios industriales
          </p>
          <p className="mx-auto mt-6 max-w-xl text-[14px] font-medium leading-7 text-white/80">
            Implementación, validación y soporte HPLC/GC con criterio técnico, documentación y respuesta en terreno.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <a href="#contacto">
                {company.primaryCta}
                <ArrowRight size={17} weight="bold" />
              </a>
            </Button>
            <Button asChild variant="ghost-white">
              <a href="#servicios">Ver servicios</a>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-5 z-20 flex gap-2">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Imagen anterior"
          className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:border-white/40 cursor-pointer"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Imagen siguiente"
          className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:border-white/40 cursor-pointer"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>

      <div className="absolute bottom-6 left-5 z-20 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index ? "w-6 bg-[var(--primary)]" : "w-1.5 bg-white/35"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
