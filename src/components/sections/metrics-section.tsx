"use client";

import {
  ChartBar,
  ClockCounterClockwise,
  HardDrives,
  Handshake,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";

const metrics = [
  {
    icon: ClockCounterClockwise,
    value: "31",
    title: "Años de experiencia",
  },
  {
    icon: Handshake,
    value: "20+",
    title: "Marcas representadas",
  },
  {
    icon: HardDrives,
    value: "400+",
    title: "Equipos instalados",
  },
  {
    icon: ChartBar,
    value: "200+",
    title: "Proyectos completados",
  },
];

export function MetricsSection() {
  return (
    <section
      id="metricas"
      aria-labelledby="metrics-section-title"
      className="relative overflow-hidden bg-gradient-to-br from-[#3a4652] via-[#202932] to-[#101820] px-5 py-14 md:py-[4.5rem] lg:py-20 text-white"
    >
      <div className="mx-auto max-w-site">
        <h2 id="metrics-section-title" className="sr-only">
          Métricas de confianza de Del Carpio
        </h2>

        {/* Technical divider line across the center in desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
        />

        <div className="relative mx-auto grid max-w-[820px] gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <Reveal key={metric.title} delay={index * 0.05}>
                <article className="group relative flex min-h-[126px] flex-col items-center justify-center px-4 py-6 text-center">
                  {/* Underline hover effect */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 bottom-3 h-px origin-center scale-x-0 bg-[#D5542B] transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100"
                  />
                  {/* Icon wrapper */}
                  <span
                    aria-hidden="true"
                    className="relative grid size-12 place-items-center text-white/90 transition-colors duration-200 group-hover:text-[#D5542B]"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/0 blur-md transition-colors duration-300 group-hover:bg-[#D5542B]/10" />
                    <Icon size={38} weight="fill" />
                  </span>
                  {/* Value number */}
                  <p className="mt-3 font-display text-[2.5rem] lg:text-[2.75rem] font-extrabold leading-none text-white transition-colors duration-200 group-hover:text-[#D5542B]">
                    {metric.value}
                  </p>
                  {/* Title */}
                  <h3 className="mt-2 max-w-[150px] text-xs font-semibold leading-snug text-white/80 group-hover:text-white transition-colors duration-200">
                    {metric.title}
                  </h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
