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
      className="relative w-full overflow-hidden bg-[#4A5560] py-16 md:py-20 lg:py-24 text-white border-y border-[#E5E5E5]/20 shadow-md"
    >
      {/* Background technical line art overlay (faint-pipe-outlines style) */}
      <div className="absolute inset-0 pointer-events-none opacity-10 select-none z-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]">
        <svg
          className="absolute inset-0 w-full h-full text-white/20"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
        >
          <path
            d="M-100 100 L300 -300 M200 600 L800 0 M500 800 L1200 100"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <circle cx="20%" cy="80%" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="85%" cy="15%" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Main Grid Layout - 100% full width container */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          
          {/* 1. LEFT ELEMENT: Image (50% Width on Desktop) */}
          <div className="flex w-full justify-center lg:justify-start">
            <Reveal className="w-full max-w-[560px]">
              <figure className="group relative aspect-[4/3] sm:aspect-[14/10] w-full overflow-hidden rounded-[20px] border border-white/15 bg-[#38434E] shadow-2xl">
                <Image
                  src="/fotos/especialista-soporte-terreno.jpg"
                  alt="Especialista técnico Del Carpio realizando soporte e inspección en terreno"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4A5560]/40 via-transparent to-transparent" />
              </figure>
            </Reveal>
          </div>

          {/* 2. RIGHT ELEMENT: Container (50% Width on Desktop with 40px padding feel & 24px gap) */}
          <div className="flex flex-col justify-center gap-6 w-full text-left">
            <Reveal>
              {/* Heading (Level 1 / Title) */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.12] tracking-tight text-white uppercase drop-shadow-sm">
                Soporte Técnico y<br />
                Validación de Procesos
              </h2>
            </Reveal>

            {/* Paragraph / Services List (Sin cambiar ninguna palabra del texto en español) */}
            <div className="flex flex-col gap-5 my-1">
              {items.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm mt-0.5">
                        <IconComp size={18} weight="bold" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-extrabold text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-white/90 font-medium">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* ActionRow (flex-row, items-center, gap-20px, marginTop-16px) */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-white/20">
                {/* ContactLink with phone-outline */}
                <a
                  href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 font-display text-xl sm:text-2xl font-black text-white hover:text-white/90 transition-colors"
                >
                  <Phone size={24} weight="bold" className="shrink-0 text-[#FBE369]" />
                  <span>{company.phone}</span>
                </a>

                {/* TextSeparator "O" */}
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest px-1">
                  O
                </span>

                {/* Button "Cotizar Servicio" (Get a quote style) */}
                <Link
                  href={`/contacto/proyectos?from=${encodeURIComponent("/#capacidades")}`}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-white text-[#4A5560] hover:bg-[#F8F9FA] px-6 py-3.5 text-xs font-black uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
