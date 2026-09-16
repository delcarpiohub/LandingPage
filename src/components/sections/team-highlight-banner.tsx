"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function TeamHighlightBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blueprintY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const blueprintScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos de laboratorio"
      className="relative h-[380px] overflow-hidden bg-black md:h-[420px] lg:h-[460px]"
    >
      <motion.div
        className="absolute inset-y-0 right-[-18%] w-[136%] origin-right opacity-45 will-change-transform sm:right-[-12%] sm:w-[118%] sm:opacity-55 md:right-[-5%] md:w-[92%] md:opacity-75 lg:right-0 lg:w-[62%] lg:opacity-100 xl:w-[68%]"
        style={{
          scale: reduceMotion ? 1 : blueprintScale,
          y: reduceMotion ? 0 : blueprintY,
        }}
      >
        <Image
          src="/proyectos/hero-planos-laboratorio-blueprint-negro-20260916.png"
          alt="Plano técnico de mobiliario para laboratorio"
          fill
          sizes="(max-width: 639px) 136vw, (max-width: 767px) 118vw, (max-width: 1023px) 92vw, (max-width: 1279px) 62vw, 68vw"
          className="object-contain object-right"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 border-y border-white/10" />

      <div className="relative mx-auto flex h-full w-full max-w-[1240px] items-center px-6 md:px-10 lg:px-8">
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
    </section>
  );
}
