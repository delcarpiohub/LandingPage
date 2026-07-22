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
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[52%_48%] lg:gap-16">
          <div>
            <Reveal>
              <div>
                <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#101820] lg:text-[38px]">
                  Soporte Tecnico y <br />
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

          <div className="flex w-full justify-center lg:justify-end">
            <Reveal delay={0.12} className="w-full max-w-[500px]">
              <figure className="relative aspect-[4/3] w-full overflow-visible bg-transparent">
                <Image
                  src="/fotos/duopur-6380111a.png"
                  alt="Equipo duoPUR de purificación de ácidos para laboratorio."
                  fill
                  className="object-contain p-4 drop-shadow-[0_24px_38px_rgba(16,24,32,0.16)] md:p-6"
                  sizes="(min-width: 1024px) 500px, 100vw"
                  priority
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
