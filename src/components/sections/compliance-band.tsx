"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, ChartLineUp, FileText, ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";
import { company } from "@/content/site";

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
      className="relative w-full overflow-hidden bg-[#3b82f6] text-white py-14 sm:py-16 lg:py-20 shadow-md"
    >
      {/* Pipe outlines SVG drawing in top-right and bottom-right corners (faint-pipe-outlines) */}
      <svg
        className="absolute top-0 right-0 w-[240px] md:w-[360px] h-[240px] md:h-[360px] text-white/20 pointer-events-none z-0"
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
        className="absolute bottom-0 right-0 w-[240px] md:w-[320px] h-[240px] md:h-[320px] text-white/20 pointer-events-none z-0"
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

      {/* Main Container Layout */}
      <div className="relative z-10 mx-auto max-w-[1340px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 min-h-[460px]">
          
          {/* 1. LEFT SIDE: Cutout Specialist Photo (Large & Prominent Visual Presence) */}
          <div className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px] xl:h-[620px] flex items-end justify-center lg:justify-start">
            <Image
              src="/fotos/especialista-delcarpio-hero-cutout.png"
              alt="Especialista técnico Del Carpio realizando soporte e inspección en terreno"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain object-bottom scale-105 lg:scale-110 xl:scale-115 drop-shadow-[0_25px_40px_rgba(0,0,0,0.28)] transition-transform duration-700 ease-out hover:scale-120 origin-bottom"
            />
          </div>

          {/* 2. RIGHT SIDE: Text Container & Action Row (50% Width) */}
          <div className="flex flex-col justify-center gap-6 w-full text-left py-4">
            <Reveal>
              {/* Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] tracking-tight text-white drop-shadow-xs">
                Soporte Técnico y<br />
                Validación de Procesos
              </h2>
            </Reveal>

            {/* Paragraph / Services List */}
            <div className="flex flex-col gap-4 my-1">
              {items.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs mt-0.5">
                        <IconComp size={18} weight="bold" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-extrabold text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-white/90 font-normal">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* ActionRow (ContactLink + TextSeparator + Button) */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-5 pt-3">
                {/* ContactLink */}
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 font-display text-xl sm:text-2xl font-bold text-white hover:text-white/90 transition-colors"
                >
                  <Phone size={26} weight="bold" className="shrink-0 text-white" />
                  <span>{company.phone}</span>
                </a>

                {/* TextSeparator "O" */}
                <span className="text-sm font-normal text-white/90 px-1">
                  O
                </span>

                {/* Button "Cotizar Servicio" */}
                <Link
                  href={`/contacto/proyectos?from=${encodeURIComponent("/#capacidades")}`}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-white text-[#3b82f6] hover:bg-white/95 px-6 py-3.5 text-sm font-semibold shadow-md transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span>Cotizar Servicio</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}
