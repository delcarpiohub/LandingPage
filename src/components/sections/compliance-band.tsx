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

      {/* Main Container Layout */}
      <div className="relative z-10 mx-auto max-w-[1340px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 lg:gap-12">
          
          {/* 1. LEFT SIDE: Specialist Photo Cutout - Height perfectly aligned with top of title (red line level) */}
          <div className="flex w-full justify-center lg:justify-start items-end">
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[540px] h-[440px] sm:h-[500px] lg:h-[550px] xl:h-[570px] flex items-end justify-center -mb-px">
              <Image
                src="/fotos/especialista-delcarpio-hero-cutout.png"
                alt="Especialista técnico Del Carpio realizando soporte e inspección en terreno"
                fill
                priority
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.14)] transition-transform duration-500 ease-out hover:scale-[1.02] origin-bottom"
              />
            </div>
          </div>

          {/* 2. RIGHT SIDE: Text Container & Action Row */}
          <div className="flex flex-col justify-center gap-6 w-full text-left py-6 lg:pb-16">
            <Reveal>
              {/* Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.12] tracking-tight text-[#101820] uppercase">
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
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D6532B]/10 text-[#D6532B] mt-0.5">
                        <IconComp size={18} weight="bold" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-extrabold text-[#101820] leading-snug">
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

            {/* ActionRow (ContactLink + TextSeparator + Button) */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-black/10">
                {/* ContactLink */}
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 font-display text-xl sm:text-2xl font-black text-[#101820] hover:text-[#D6532B] transition-colors"
                >
                  <Phone size={26} weight="bold" className="shrink-0 text-[#D6532B]" />
                  <span>{company.phone}</span>
                </a>

                {/* TextSeparator "O" */}
                <span className="text-sm font-semibold text-[#4A5560] uppercase tracking-wider px-1">
                  O
                </span>

                {/* Button "Cotizar Servicio" */}
                <Link
                  href={`/contacto/proyectos?from=${encodeURIComponent("/#capacidades")}`}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-[#D6532B] text-white hover:bg-[#c04723] px-6 py-3.5 text-xs font-black uppercase tracking-wider shadow-md transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                >
                  <span>Cotizar Servicio</span>
                  <ArrowRight size={15} weight="bold" />
                </Link>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}
