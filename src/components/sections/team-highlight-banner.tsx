"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function TeamHighlightBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const blueprintY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos de laboratorio"
      className="relative h-[360px] sm:h-[380px] md:h-[400px] lg:h-[380px]"
    >
      <div className="relative h-full overflow-hidden border-y border-white/10 bg-black">
        <motion.div
          className="absolute inset-x-0 -top-[20%] h-[140%] will-change-transform"
          style={{ y: reduceMotion ? 0 : blueprintY }}
        >
          <Image
            src="/proyectos/hero-planos-laboratorio-atmosferico-20260922.png"
            alt="Plano técnico de mobiliario para laboratorio"
            fill
            sizes="100vw"
            className="object-cover object-right sm:object-contain"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black from-0% via-black via-[53%] to-transparent to-[69%] sm:via-[52%] sm:to-[67%] lg:via-[53%] lg:to-[68%]" />

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
