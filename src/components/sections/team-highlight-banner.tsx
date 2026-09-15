"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const projectStages = [
  ["01", "Diseño técnico"],
  ["02", "Implementación"],
  ["03", "Puesta en marcha"],
] as const;

export function TeamHighlightBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const smoothedImageY = useSpring(imageY, {
    damping: 26,
    mass: 0.45,
    stiffness: 90,
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Proyectos de laboratorio"
      className="relative w-full overflow-hidden bg-[#101820] py-12 md:py-16 lg:min-h-[152vh] lg:py-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:min-h-[152vh] lg:px-10">
        <div className="grid gap-8 lg:sticky lg:top-20 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center lg:gap-14">
          <div className="py-6 lg:py-0">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D6532B] md:text-xs">
              Proyectos Del Carpio
            </p>

            <h2 className="max-w-[13ch] font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-white md:text-5xl lg:text-6xl">
              Laboratorios completos.
              <br />
              Ejecutados en <span className="text-[#D6532B]">terreno.</span>
            </h2>

            <p className="mt-7 max-w-[47ch] text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              Del plano a la operación: diseño, infraestructura y puesta en
              marcha para espacios analíticos concebidos para el trabajo real.
            </p>

            <ol className="mt-10 grid max-w-md grid-cols-3 border-t border-white/20 pt-5">
              {projectStages.map(([number, label], index) => (
                <li
                  key={number}
                  className={`border-l pl-3 first:border-l-0 first:pl-0 ${
                    index === 1 ? "border-[#D6532B]" : "border-white/20"
                  }`}
                >
                  <span
                    className={`block text-xs font-bold tracking-[0.14em] ${
                      index === 1 ? "text-[#D6532B]" : "text-slate-500"
                    }`}
                  >
                    {number}
                  </span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-300">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative min-h-[410px] overflow-hidden border border-white/15 bg-[#eef1f2] md:min-h-[530px] lg:min-h-[calc(100vh-10rem)]">
            <motion.div
              className="absolute inset-x-0 -top-[9%] h-[118%]"
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

            <div className="absolute inset-x-0 bottom-0 border-t border-slate-900/10 bg-white/90 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600 md:px-6 md:text-xs">
              Infraestructura diseñada para cada operación
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
