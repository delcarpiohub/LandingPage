"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { BowlSteam, Flask, Leaf, Microscope, Mountains, Pill, Waves } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { industries } from "@/content/site";

const industryIcons: Record<string, Icon> = {
  "Alimentos": BowlSteam,
  "Minería": Mountains,
  "Farmacéutica": Pill,
  "Aguas": Waves,
  "Ambiental": Leaf,
  "Academia / I+D": Microscope,
};

export function IndustryTabs() {
  return (
    <section id="industrias" className="mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Sectores</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-6xl">
          Métodos analíticos adaptados a cada sector.
        </h2>
      </div>
      <Tabs.Root defaultValue={industries[0].name} className="mt-12 grid gap-6 lg:grid-cols-[360px_1fr]">
        <Tabs.List className="grid gap-2" aria-label="Sectores">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.name] ?? Flask;
            return (
              <Tabs.Trigger
                key={industry.name}
                value={industry.name}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 text-left text-base font-semibold text-[var(--foreground)] transition-colors data-[state=active]:border-[var(--accent)] data-[state=active]:bg-[var(--surface-muted)]"
              >
                <span className="grid size-11 place-items-center rounded-full bg-[var(--surface-muted)] text-[var(--accent)] group-data-[state=active]:bg-[var(--accent)] group-data-[state=active]:text-[var(--accent-foreground)]">
                  <Icon size={22} />
                </span>
                {industry.name}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {industries.map((industry) => (
          <Tabs.Content
            key={industry.name}
            value={industry.name}
            className="min-h-96 rounded-[2rem] border border-[var(--border)] bg-[var(--panel)] p-8"
          >
            <p className="font-mono text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
              aplicacion prioritaria
            </p>
            <h3 className="mt-8 text-4xl font-semibold text-[var(--foreground)]">{industry.name}</h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{industry.detail}</p>
            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {["diagnostico", "control", "soporte"].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  );
}
