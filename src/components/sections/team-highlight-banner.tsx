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
  const blueprintY = useTransform(scrollYProgress, [0, 1], ["-24%", "24%"]);
  const blueprintScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.16]);

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos de laboratorio"
      className="relative h-[380px] overflow-hidden bg-[#101820] md:h-[420px] lg:h-[460px]"
    >
      <motion.div
        className="absolute inset-x-0 -top-[55%] h-[210%] will-change-transform"
        style={{
          scale: reduceMotion ? 1 : blueprintScale,
          y: reduceMotion ? 0 : blueprintY,
        }}
      >
        <Image
          src="/proyectos/hero-planos-laboratorio-20260914.png"
          alt="Plano técnico de mobiliario para laboratorio"
          fill
          sizes="100vw"
          className="object-cover object-center invert brightness-[2] contrast-[3]"
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
