import { metrics } from "@/content/site";

import { SolutionReveal } from "./solution-reveal";

// Ficha de valores reales (no íconos de librería) — reutiliza 1:1 el array
// `metrics` de site.ts, que ya existía redactado y aprobado pero no se
// mostraba en ninguna página. El tratamiento tipográfico "valor grande +
// etiqueta" reemplaza al patrón de ícono-genérico-sobre-título (Flask,
// SealCheck, etc. de Phosphor) que se sentía de plantilla — ver DESIGN.md
// Sección 11.
export function SolutionDifferentiators() {
  return (
    <section className="border-b border-[var(--border)] bg-white">
      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8 lg:px-12">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
          {metrics.map((metric, index) => (
            <li key={metric.value}>
              <SolutionReveal delay={index * 0.03}>
                <p className="font-display text-2xl font-extrabold leading-none tracking-tight text-[var(--foreground)] sm:text-[1.75rem]">
                  {metric.value}
                </p>
                <p className="mt-2.5 max-w-[24ch] text-xs leading-snug text-[var(--muted)]">
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
