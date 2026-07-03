"use client";

import { ShieldCheck, ChartLineUp, FileText } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";

const items = [
  {
    icon: ShieldCheck,
    title: "Evaluación Técnica",
    text: "Analizamos la matriz, el entorno operativo y los requisitos normativos antes de recomendar cualquier solución.",
  },
  {
    icon: ChartLineUp,
    title: "Método Validable",
    text: "Diseñamos métodos reproducibles y alineados con los criterios de validación de su laboratorio.",
  },
  {
    icon: FileText,
    title: "Documentación y Evidencia",
    text: "Cada implementación incorpora respaldo documental para auditorías, acreditaciones y trazabilidad técnica.",
  },
];

export function ComplianceBand() {
  return (
    <section
      id="capacidades"
      className="w-full border-b border-black/5 bg-white"
    >
      <div className="mx-auto max-w-[1180px] px-6 py-12 md:px-12 md:py-16 lg:px-6 lg:py-[82px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[54%_46%]">
          <div>
            <Reveal>
              <div>
                <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#101820] lg:text-[38px]">
                  Soporte analítico y <br />
                  validación de procesos
                </h2>

                <div className="mt-5 mb-12 h-[3px] w-[90px] bg-[#D5542B]" />
              </div>
            </Reveal>

            <div className="flex flex-col">
              {items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 0.08}>
                    <div className="mb-10 grid grid-cols-[38px_1fr] items-start gap-6 last:mb-0">
                      <div className="flex justify-start pt-[2px] text-[#D5542B]">
                        <Icon size={32} weight="light" />
                      </div>

                      <div>
                        <h3 className="mb-2 font-display text-[20px] font-bold leading-none tracking-[-0.02em] text-[#101820]">
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
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] border border-black/8 bg-[#FAF9F6] shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                <Image
                  src="/fotos/laboratorio-frascos-procesos.jpg"
                  alt="Frascos de laboratorio con líquidos de colores usados como representación visual de procesos químicos."
                  fill
                  className="object-cover"
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