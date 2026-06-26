// Temporal: grid estático sin interactividad — revisar si se recupera
// la versión con Radix Tabs en la revisión de diseño definitiva.
import { BowlSteam, Flask, Leaf, Microscope, Mountains, Pill, Waves } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { industries } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

const industryIcons: Record<string, Icon> = {
  Alimentos: BowlSteam,
  Minería: Mountains,
  Farmacéutica: Pill,
  Aguas: Waves,
  Ambiental: Leaf,
  "Academia / I+D": Microscope,
};

const sectorColors: Record<string, string> = {
  Alimentos: "#FBE369",
  Minería: "#D5542B",
  Farmacéutica: "#101820",
  Aguas: "#53843A",
  Ambiental: "#53843A",
  "Academia / I+D": "#101820",
};

export function IndustryTabs() {
  return (
    <section id="industrias" className="mx-auto max-w-7xl px-5 py-24">
      <Reveal>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Sectores</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-6xl">
            Métodos analíticos adaptados a cada sector.
          </h2>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => {
          const IndustryIcon = industryIcons[industry.name] ?? Flask;
          const accentColor = sectorColors[industry.name] ?? "#D5542B";
          const iconTextColor = accentColor === "#FBE369" ? "#101820" : "#ffffff";
          return (
            <Reveal key={industry.name} delay={index * 0.05}>
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-white px-6 py-5">
                <div
                  className="grid size-10 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: accentColor, color: iconTextColor }}
                >
                  <IndustryIcon size={20} />
                </div>
                <span className="text-base font-semibold text-[var(--foreground)]">
                  {industry.name}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
