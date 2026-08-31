import type { SolutionMethodRow } from "@/content/solution-content";
import type { SolutionPageConfig } from "@/content/solution-pages";

import { SolutionReveal } from "./solution-reveal";

type SolutionDifferentiatorsProps = {
  industryName: string;
  firstMethod: SolutionMethodRow;
  copy: NonNullable<SolutionPageConfig["differentiatorCopy"]>;
};

// Los cuatro valores se derivan de la primera fila de "Qué resolvemos" y de
// la familia predominante de la grilla de equipos de cada industria. El
// tratamiento tipográfico evita el patrón de ícono decorativo de plantilla.
export function SolutionDifferentiators({
  industryName,
  firstMethod,
  copy,
}: SolutionDifferentiatorsProps) {
  const metrics = [
    {
      value: firstMethod.technique.replace(" y ", " · "),
      label: firstMethod.application,
    },
    { value: copy.outcome, label: copy.outcomeDetail },
    {
      value: `Especialistas en ${industryName}`,
      label: `análisis y equipamiento para ${industryName.toLowerCase()}`,
    },
    { value: copy.equipmentFamily, label: copy.equipmentDetail },
  ];

  return (
    <section className="border-b border-[var(--border)] bg-white">
      <div className="mx-auto max-w-[1320px] px-5 py-7 sm:px-8 sm:py-8 lg:px-12">
        <ul className="mx-auto grid max-w-[1160px] grid-cols-2 justify-items-center gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-12">
          {metrics.map((metric, index) => (
            <li key={metric.value} className="w-full max-w-[15rem]">
              <SolutionReveal className="text-center" delay={index * 0.03}>
                <p className="text-balance font-display text-2xl font-extrabold leading-none tracking-tight text-[var(--foreground)] sm:text-[1.75rem]">
                  {metric.value}
                </p>
                <p className="mx-auto mt-2.5 max-w-[22ch] text-pretty text-xs leading-snug text-[var(--muted)]">
                  {metric.label}
                </p>
              </SolutionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
