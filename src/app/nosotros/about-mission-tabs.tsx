"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "mision",
    label: "Misión",
    title: "Excelencia técnica en cada etapa del laboratorio.",
    body: "Satisfacer las necesidades de nuestros clientes con equipos de la más alta gama de instrumentación analítica, un servicio técnico y de aplicaciones de excelencia, y un asesoramiento completo desde el diseño del laboratorio hasta su implementación y habilitación.",
  },
  {
    id: "vision",
    label: "Visión",
    title: "Estar presentes en cada laboratorio de Chile.",
    body: "Ser una empresa de excelencia para estar presentes en cada laboratorio de Chile, teniendo a los clientes más satisfechos del mercado.",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function AboutMissionTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("mision");
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div>
      <div aria-label="Misión y visión" className="flex border-b border-ink-border" role="tablist">
        {tabs.map((tab) => (
          <button
            aria-controls={`panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            className={cn(
              "min-h-12 flex-1 border-b-2 px-3 pb-4 text-left text-xs font-extrabold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-ink-secondary hover:text-ink",
            )}
            id={`tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div aria-labelledby={`tab-${active.id}`} className="pt-8" id={`panel-${active.id}`} role="tabpanel">
        <h2 className="max-w-2xl text-balance font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
          {active.title}
        </h2>
        <p className="mt-6 max-w-2xl text-pretty text-sm leading-7 text-ink-dark md:text-base md:leading-8">“{active.body}”</p>
      </div>
    </div>
  );
}
