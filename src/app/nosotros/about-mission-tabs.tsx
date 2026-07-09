"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type TabKey = "mission" | "vision" | "goal";

const tabs: {
  key: TabKey;
  label: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
}[] = [
  {
    key: "mission",
    label: "NUESTRA MISIÓN",
    eyebrow: "Sobre el enfoque",
    title: "Criterio técnico antes de recomendar una solución.",
    paragraphs: [
      "Del Carpio acompaña a laboratorios e industrias chilenas en la selección, implementación y validación de instrumentación analítica con foco en operación real, no en catálogo.",
      "Cada recomendación parte por entender matriz, interferencias, trazabilidad y exigencia documental para que el resultado pueda sostenerse en laboratorio, planta o auditoría.",
    ],
  },
  {
    key: "vision",
    label: "NUESTRA VISIÓN",
    eyebrow: "Sobre la visión",
    title: "Ser el socio técnico al que se consulta antes de decidir.",
    paragraphs: [
      "La referencia no se construye con volumen de productos, sino con la capacidad de orientar decisiones críticas en HPLC, GC, validación de métodos y soporte especializado.",
      "Buscamos que cada implementación deje un laboratorio más estable, más defendible y mejor documentado que antes de nuestra intervención.",
    ],
  },
  {
    key: "goal",
    label: "NUESTRO OBJETIVO",
    eyebrow: "Sobre el objetivo",
    title: "Que cada sistema entregue resultados confiables y utilizables.",
    paragraphs: [
      "El objetivo no termina cuando el equipo queda instalado. Incluye calificación, continuidad operativa, mantención, consumibles y respaldo técnico para sostener el trabajo analítico.",
      "Por eso estructuramos cada proyecto con una lógica simple: elegir bien, documentar bien y operar con respaldo.",
    ],
  },
];

export function AboutMissionTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("mission");

  const activeItem = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];

  return (
    <div className="max-w-xl">
      <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-primary">
        {activeItem.eyebrow}
      </p>
      <h2 className="mt-5 text-balance font-display text-[clamp(2.2rem,4.2vw,4.2rem)] font-black leading-[0.98] tracking-[-0.02em] text-ink">
        {activeItem.title}
      </h2>

      <div className="mt-8 flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors duration-200",
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-ink-border bg-white text-ink-dark hover:border-primary hover:text-primary",
              )}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-5 border-t border-ink-border pt-7">
        {activeItem.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-pretty text-sm leading-8 text-ink-dark md:text-[0.97rem]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
