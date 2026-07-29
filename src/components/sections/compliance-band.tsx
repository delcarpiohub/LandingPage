"use client";

import Image from "next/image";
import { ShieldCheck, ChartLineUp, FileText } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Instalación e Integración Operativa",
    text: "Ejecutamos el montaje físico y la puesta en marcha de sus nuevos equipos, verificando los parámetros críticos para asegurar un inicio de operación óptimo",
  },
  {
    icon: ChartLineUp,
    title: "Capacitación Técnica de Usuarios",
    text: "Instruimos en sitio a los operadores y al personal técnico a cargo del sistema, cubriendo desde los fundamentos de uso diario hasta los protocolos de seguridad indispensables.",
  },
  {
    icon: FileText,
    title: "Diagnóstico y Mantención Preventiva",
    text: "Evaluamos la integridad de los componentes mediante diagnósticos especializados y rutinas de mantención planificadas para prevenir desviaciones analíticas y fallas críticas.",
  },
];

export function ComplianceBand() {
  return (
    <section
      id="capacidades"
      className="relative w-full overflow-hidden bg-white text-[#101820] pt-12 sm:pt-16 lg:pt-20 pb-0 border-b border-black/5"
    >
      {/* Pipe outlines SVG drawing in top-right and bottom-right corners (faint-pipe-outlines style) */}
      <svg
        className="absolute top-0 right-0 w-[240px] md:w-[360px] h-[240px] md:h-[360px] text-black/5 pointer-events-none z-0"
        fill="none"
        viewBox="0 0 300 300"
      >
        <path
          d="M 150 0 L 150 80 Q 150 100 170 100 L 300 100 M 180 0 L 180 60 Q 180 80 200 80 L 300 80 M 300 160 L 220 160 Q 200 160 200 180 L 200 300"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-[240px] md:w-[320px] h-[240px] md:h-[320px] text-black/5 pointer-events-none z-0"
        fill="none"
        viewBox="0 0 300 300"
      >
        <path
          d="M 300 180 L 200 180 Q 180 180 180 200 L 180 300 M 300 240 L 240 240 Q 220 240 220 260 L 220 300"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>

      {/* Main Container Layout - Narrower max-w-[1140px] */}
      <div className="relative z-10 mx-auto max-w-[1140px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6 lg:gap-8">
          
          {/* 1. LEFT SIDE: Specialist Photo Cutout - Shifted further left & bottom extended past border */}
          <div className="lg:col-span-5 flex w-full justify-center lg:justify-start items-end lg:-translate-x-20 lg:-ml-4">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px] h-[340px] sm:h-[420px] lg:h-[460px] flex items-end justify-center -mb-6">
              {/* Sombra de base para anclar la figura al piso */}
              <div className="absolute inset-x-8 bottom-4 h-8 rounded-full bg-black/12 blur-xl" />

              <Image
                src="/fotos/especialista-delcarpio-hero-cutout-tight.png"
                alt="Especialista técnico Del Carpio realizando soporte e inspección en terreno"
                fill
                priority
                sizes="(min-width: 1024px) 440px, 100vw"
                className="relative object-contain object-bottom drop-shadow-[0_14px_22px_rgba(16,24,32,0.16)] transition-transform duration-500 ease-out hover:scale-[1.02] origin-bottom translate-y-3 -mb-4"
              />
            </div>
          </div>

          {/* 2. RIGHT SIDE: Text Container */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-5 w-full text-left pt-2 pb-6 lg:pb-8 self-center">
            <Reveal>
              {/* Heading */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black leading-[1.15] tracking-tight text-[#101820] uppercase">
                Soporte Técnico y<br />
                Validación de Procesos
              </h2>
            </Reveal>

            {/* Paragraph / Services List */}
            <div className="flex flex-col gap-3.5 my-1">
              {items.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D6532B]/10 text-[#D6532B] mt-0.5">
                        <IconComp size={16} weight="bold" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-sm sm:text-base font-extrabold text-[#101820] leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-[#4A5560] font-medium">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
