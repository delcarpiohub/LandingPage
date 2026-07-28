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
      className="w-full border-b border-black/5 bg-white"
    >
      <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-12 md:py-16 lg:px-6 lg:py-[82px]">
        {/* Contenedor unificado de composición */}
        <div className="relative rounded-[24px] bg-[#F8F9FA] p-8 sm:p-10 md:p-12 lg:p-14 border border-[#E5E5E5]/80 shadow-xs">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-12">
            
            {/* Columna de Texto */}
            <div>
              <Reveal>
                <div>
                  <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#101820] lg:text-[38px]">
                    Soporte Técnico y <br />
                    Validación de Procesos
                  </h2>

                  <div className="mt-4 mb-9 h-[3px] w-[80px] bg-[#D6532B]" />
                </div>
              </Reveal>

              <div className="grid gap-7">
                {items.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={item.title} delay={index * 0.08}>
                      <div className="grid grid-cols-[36px_minmax(0,1fr)] items-start gap-4 md:gap-5">
                        <div className="flex h-8 w-8 items-start justify-center pt-[1px] text-[#D6532B]">
                          <Icon size={26} weight="light" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="mb-1.5 font-display text-[18px] font-bold leading-[1.18] tracking-[-0.02em] text-[#101820]">
                            {item.title}
                          </h3>

                          <p className="max-w-[460px] text-[14px] leading-[1.65] text-[#4A5560]">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Columna de Imagen Integrada */}
            <div className="flex w-full justify-center lg:justify-end">
              <Reveal delay={0.12} className="w-full max-w-[420px]">
                <div className="relative">
                  {/* Sombra de acento sutil con el color de marca */}
                  <div className="absolute -inset-2 rounded-[20px] bg-gradient-to-tr from-[#D6532B]/15 via-transparent to-[#4A5560]/10 blur-sm pointer-events-none" />

                  <figure className="group relative aspect-[3/4] w-full overflow-hidden rounded-[16px] border border-[#D4DFDC] bg-white shadow-md">
                    <Image
                      src="/fotos/especialista-soporte-terreno.jpg"
                      alt="Especialista de soporte técnico Del Carpio realizando validación e inspección en terreno."
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                      sizes="(min-width: 1024px) 420px, 100vw"
                      priority
                    />
                  </figure>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
