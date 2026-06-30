"use client";

import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";

const easeOut = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, transform: "translateY(14px)" },
        animate: { opacity: 1, transform: "translateY(0px)" },
        transition: { duration: 0.55, ease: easeOut },
      };

  return (
    <section className="relative min-h-[520px] overflow-hidden bg-[var(--science-cyan)] text-white md:min-h-[400px]">
      <Image
        src="/fotos/hero-laboratorio.jpg"
        alt="Laboratorio Del Carpio con instrumentación analítica en operación"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,182,207,0.12)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0.22)_100%)]" />

      <div className="relative mx-auto flex min-h-[520px] max-w-site items-center justify-center px-5 text-center md:min-h-[400px]">
        <motion.div className="max-w-3xl" {...motionProps}>
          <p className="mb-3 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-white/90">
            Servicio técnico científico
          </p>
          <h1 className="font-display text-[2.05rem] font-extrabold uppercase leading-[1] text-white drop-shadow-sm sm:text-[2.75rem] md:text-[2.95rem]">
            Instrumentación analítica
          </h1>
          <p className="mt-1 font-display text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
            para laboratorios industriales
          </p>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-semibold leading-7 text-white/92">
            Implementación, validación y soporte HPLC/GC con criterio técnico, documentación y respuesta en terreno.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2">
        <button
          type="button"
          aria-label="Imagen anterior"
          className="grid size-6 place-items-center bg-[var(--accent)] text-white transition-colors hover:bg-[var(--accent-strong)]"
        >
          <CaretLeft size={14} weight="bold" />
        </button>
        <button
          type="button"
          aria-label="Imagen siguiente"
          className="ml-px grid size-6 place-items-center bg-[var(--accent)] text-white transition-colors hover:bg-[var(--accent-strong)]"
        >
          <CaretRight size={14} weight="bold" />
        </button>
      </div>
    </section>
  );
}
