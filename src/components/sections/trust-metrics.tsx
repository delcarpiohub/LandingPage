"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function TrustMetrics() {
  return (
    <section
      id="nosotros"
      className="relative isolate overflow-hidden bg-[#F9FAFB] text-[#101820] border-b border-black/5"
      aria-labelledby="metodologia-del-carpio"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[41%] top-1/2 z-10 hidden h-[180px] w-[112px] -translate-y-1/2 opacity-30 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,24,32,0.15) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, #101820 0.8px, transparent 0.8px)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="grid lg:grid-cols-12">
        {/* Left Column (Content) */}
        <div className="relative z-20 px-6 py-12 sm:px-10 md:py-16 lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:px-16 lg:py-20 lg:pr-10">
          <Reveal delay={0.05}>
            <p className="font-mono text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#D5542B]">
              Nuestro enfoque
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="my-5 h-[2px] w-8 bg-[#D5542B] md:my-6" />
          </Reveal>

          <Reveal delay={0.18}>
            <h2
              id="metodologia-del-carpio"
              className="max-w-[620px] font-display text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold leading-[1.05] tracking-tight text-[#101820]"
            >
              Pensamos como ingenieros.
              <span className="block text-[#D5542B]">
                Actuamos como socios.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="my-6 h-px w-7 bg-black/10" />
          </Reveal>

          <Reveal delay={0.32}>
            <p className="max-w-[610px] text-[15px] font-normal leading-[1.65] text-[#4A5560] md:text-[16px]">
              Acompañamos a laboratorios e industrias en cada decisión crítica,
              combinando conocimiento técnico, rigurosidad y experiencia real
              para generar resultados confiables y sostenibles.
            </p>
          </Reveal>
        </div>

        {/* Right Column (Visual) */}
        <Reveal className="lg:col-span-7" delay={0.12}>
          <figure className="group relative min-h-[300px] overflow-hidden bg-slate-100 md:min-h-[460px] lg:min-h-[500px] lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)] border-l border-black/5">
            <Image
              src="/fotos/laboratorio-metodologia-mg-0795.jpg"
              alt="Laboratorio técnico con instrumentación analítica avanzada"
              fill
              className="object-cover object-center grayscale brightness-[0.92] contrast-[0.98] transition-transform motion-safe:duration-[1400ms] motion-safe:group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/[0.03]" aria-hidden="true" />
            <div
              className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-[#F9FAFB]/80 to-transparent lg:block"
              aria-hidden="true"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
