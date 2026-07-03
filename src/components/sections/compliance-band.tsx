"use client";

import { ShieldCheck, ChartLineUp, FileText } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";

const items = [
  {
    icon: ShieldCheck,
    title: "Evaluación Técnica",
    text: "Se revisa matriz, interferencias, normativa, criticidad y condiciones reales de operación.",
  },
  {
    icon: ChartLineUp,
    title: "Método Validable",
    text: "Se define columna, detector, sensibilidad, repetibilidad y límites esperados antes de instalar.",
  },
  {
    icon: FileText,
    title: "Documentación y Evidencia",
    text: "Se entrega criterio técnico, calificación y evidencia para auditorías o procesos de acreditación.",
  },
];

export function ComplianceBand() {
  return (
    <section id="capacidades" className="w-full bg-[#FFFFFF] border-b border-black/5">
      <div className="mx-auto max-w-[1180px] py-10 px-6 md:py-14 md:px-12 lg:py-[72px] lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[54%_46%] gap-[56px] items-center">
          
          {/* Left Column: Content and Features */}
          <div>
            <Reveal>
              <div>
                <h2 className="font-display text-3xl lg:text-[34px] font-extrabold leading-[1.1] text-[#101820]">
                  Soporte analítico y <br />
                  validación de procesos
                </h2>
                {/* Underline */}
                <div className="w-[72px] h-[4px] bg-[#D5542B] mt-4 mb-[42px]" />
              </div>
            </Reveal>

            {/* Feature List */}
            <div className="flex flex-col">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.08}>
                    <div className="grid grid-cols-[56px_1fr] gap-6 mb-10 last:mb-0 items-start">
                      {/* Icon (Much larger, no circle wrapper, clean text color) */}
                      <div className="flex justify-start pt-1 text-[#D5542B] shrink-0">
                        <Icon size={40} weight="light" />
                      </div>
                      
                      {/* Text Content */}
                      <div>
                        <h3 className="font-display text-[18px] font-extrabold text-[#101820] mb-1 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[13px] leading-6 text-[#4A5560] max-w-[430px]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="w-full flex justify-center lg:justify-end">
            <Reveal delay={0.12} className="w-full max-w-[480px]">
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] border border-black/8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] bg-[#FAF9F6]">
                <Image
                  src="/fotos/laboratorio-frascos-procesos.jpg"
                  alt="Frascos de laboratorio con líquidos de colores usados como representación visual de procesos químicos."
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 480px, 100vw"
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
