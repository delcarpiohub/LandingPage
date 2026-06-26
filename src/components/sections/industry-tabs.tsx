import { BowlSteam, Flask, Leaf, Microscope, Mountains, Pill, Waves } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { industries } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

const industryIcons: Record<string, Icon> = {
  Alimentos: BowlSteam,
  Mineria: Mountains,
  Farmaceutica: Pill,
  Aguas: Waves,
  Ambiental: Leaf,
  "Academia / I+D": Microscope,
};

const industrySummaries: Record<string, string> = {
  Alimentos: "Residuos, aditivos y trazabilidad para control sanitario.",
  Mineria: "Control de proceso, efluentes y reactivos criticos.",
  Farmaceutica: "Principios activos, impurezas y estabilidad.",
  Aguas: "Matrices acuosas para cumplimiento sanitario y ambiental.",
  Ambiental: "COVs, HAPs, suelos y monitoreo tecnico.",
  "Academia / I+D": "Transferencia metodologica para investigacion aplicada.",
};

const sectorColors: Record<string, string> = {
  Alimentos: "#FBE369",
  Mineria: "#D5542B",
  Farmaceutica: "#101820",
  Aguas: "#53843A",
  Ambiental: "#53843A",
  "Academia / I+D": "#101820",
};

function normalizeName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function IndustryTabs() {
  return (
    <section id="industrias" className="border-y border-[var(--border)] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Sectores</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-6xl">
                Seis contextos industriales. Una misma exigencia: metodo defendible.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[var(--muted)] lg:ml-auto">
              Cada sector se muestra como decision rapida: nombre, senal tecnica y una frase corta. El detalle profundo vive en la pagina de servicio, no en un bloque saturado.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const normalizedName = normalizeName(industry.name);
            const Icon = industryIcons[normalizedName] ?? Flask;
            const accentColor = sectorColors[normalizedName] ?? "#D5542B";
            const iconTextColor = accentColor === "#FBE369" ? "#101820" : "#ffffff";
            return (
              <Reveal key={industry.name} delay={index * 0.04}>
                <article className="group min-h-56 bg-white p-6 transition-colors hover:bg-[var(--surface-muted)]">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="grid size-12 shrink-0 place-items-center rounded-full"
                      style={{ backgroundColor: accentColor, color: iconTextColor }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs text-[var(--muted)]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold text-[var(--foreground)]">{industry.name}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--muted)]">
                    {industrySummaries[normalizedName] ?? industry.detail}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
