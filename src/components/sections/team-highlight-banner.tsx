"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export function TeamHighlightBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);
  const smoothedImageY = useSpring(imageY, {
    damping: 30,
    mass: 0.5,
    stiffness: 100,
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos de laboratorio"
      className="bg-[#101820] py-20 md:py-24 lg:min-h-[118vh] lg:py-0"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 md:px-10 lg:min-h-[118vh] lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-20 lg:px-8">
        <div className="pt-2 lg:py-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6532B] md:text-xs">
            Proyectos Del Carpio
          </p>

          <h2 className="mt-5 max-w-[11ch] font-display text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-white md:text-5xl lg:text-[54px]">
            Laboratorios completos. Ejecutados en{" "}
            <span className="text-[#D6532B]">terreno.</span>
          </h2>

          <p className="mt-6 max-w-[38ch] text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Diseño e infraestructura para espacios analíticos que acompañan cada
            operación, desde la definición técnica hasta su puesta en marcha.
          </p>

          <p className="mt-8 border-t border-white/15 pt-4 text-[11px] font-medium uppercase tracking-[0.13em] text-slate-400">
            Diseño · Infraestructura · Implementación
          </p>
        </div>

        <div className="lg:sticky lg:top-28 lg:py-24">
          <div className="relative min-h-[330px] overflow-hidden border border-white/15 bg-[#eef1f2] md:min-h-[410px] lg:min-h-[430px]">
            <motion.div
              className="absolute inset-x-0 -top-[3%] h-[106%]"
              style={{ y: reduceMotion ? 0 : smoothedImageY }}
            >
              <Image
                src="/proyectos/hero-planos-laboratorio-20260914.png"
                alt="Plano técnico de mobiliario para laboratorio"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
