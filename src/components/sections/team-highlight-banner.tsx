"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function TeamHighlightBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const blueprintX = useTransform(scrollYProgress, [0, 0.5, 1], ["3%", "0%", "-3%"]);
  const blueprintY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const blueprintScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos de laboratorio"
      className="relative h-[440px] bg-black sm:h-[480px] md:h-[520px] lg:h-[200svh] motion-reduce:lg:h-[111.112svh]"
    >
      <div className="relative h-full overflow-hidden border-y border-white/10 lg:sticky lg:top-0 lg:h-[111.112svh] motion-reduce:lg:relative">
        <div className="absolute inset-y-0 left-1/2 w-[150%] -translate-x-1/2 opacity-55 sm:w-[125%] sm:opacity-70 md:w-full md:opacity-90 lg:opacity-100">
          <motion.div
            className="absolute inset-0 origin-center will-change-transform"
            style={{
              x: reduceMotion ? 0 : blueprintX,
              y: reduceMotion ? 0 : blueprintY,
              scale: reduceMotion ? 1 : blueprintScale,
            }}
          >
            <Image
              src="/proyectos/hero-planos-laboratorio-blueprint-negro-20260916.png"
              alt="Plano técnico de mobiliario para laboratorio"
              fill
              sizes="(max-width: 639px) 150vw, (max-width: 767px) 125vw, 100vw"
              className="object-contain object-center"
            />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-black/55 sm:w-[70%] sm:bg-black/75 md:w-[58%] lg:w-[52%] lg:bg-black/80 xl:w-[46%]" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1240px] items-center px-6 md:px-10 lg:px-8">
          <div className="max-w-[410px] text-white">
            <h2 className="font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-balance md:text-[42px] lg:text-[46px]">
              Laboratorios completos. Ejecutados en{" "}
              <span className="text-[#D5542B]">terreno.</span>
            </h2>

            <p className="mt-5 max-w-[37ch] text-sm leading-6 text-white/85 md:text-[15px] md:leading-7">
              Diseño e infraestructura para espacios analíticos, desde la definición
              técnica hasta su puesta en marcha.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
