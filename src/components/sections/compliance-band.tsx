"use client";

import { ShieldCheck, ChartLineUp, FileText } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";

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
      className="w-full border-b border-black/5 bg-white py-12 md:py-16 lg:py-[82px]"
    >
      <div className="mx-auto max-w-[1180px] px-6 lg:px-6">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[54%_46%] lg:gap-14">

          {/* Columna de Texto */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <div>
                <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#101820] lg:text-[38px]">
                  Soporte Técnico y <br />
                  Validación de Procesos
                </h2>

                <div className="mt-5 mb-12 h-[3px] w-[90px] bg-[#D6532B]" />
              </div>
            </Reveal>

            <div className="grid gap-9">
              {items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 0.08}>
                    <div className="grid grid-cols-[42px_minmax(0,1fr)] items-start gap-5 md:gap-7">
                      <div className="flex h-9 w-9 items-start justify-center pt-[1px] text-[#D6532B]">
                        <Icon size={30} weight="light" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="mb-2 font-display text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-[#101820]">
                          {item.title}
                        </h3>

                        <p className="max-w-[500px] text-[15px] leading-[1.7] text-[#4A5560]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Columna de Imagen integrada */}
          <Reveal delay={0.12} className="w-full">
            <figure className="group relative overflow-hidden rounded-[20px] border border-black/[0.06] bg-[#101820] shadow-card">
              <div className="relative h-[440px] lg:h-[514px]">
                <Image
                  src="/fotos/especialista-soporte-terreno-close.jpg"
                  alt="Especialista de soporte técnico Del Carpio sonriendo durante una validación de equipos en terreno"
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#101820] to-transparent" />
              </div>

              <figcaption className="relative z-10 border-t border-white/10 px-6 py-5">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                  Soporte técnico · Del Carpio
                </span>
                <span className="mt-1.5 block font-display text-[15px] font-semibold leading-snug text-white">
                  Diagnóstico y validación de equipos en las instalaciones del cliente
                </span>
              </figcaption>
            </figure>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
