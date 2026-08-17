import {
  Flask,
  GraduationCap,
  Gauge,
  MagnifyingGlass,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";

import { SolutionReveal } from "./solution-reveal";

// Contenido tomado 1:1 de `coreServices`/`metrics` (src/content/site.ts) —
// no son frases de marketing nuevas. Ver SolutionPageConfig.showDifferentiators
// en solution-pages.ts.
const differentiators = [
  { icon: Flask, title: "Cromatografía HPLC y GC" },
  { icon: SealCheck, title: "Validación NCh-ISO 17025" },
  { icon: Gauge, title: "Calificación IQ/OQ/PQ" },
  { icon: MagnifyingGlass, title: "Diagnóstico y soporte en sitio" },
  { icon: GraduationCap, title: "Capacitación técnica" },
];

export function SolutionDifferentiators() {
  return (
    <section className="border-b border-[var(--border)] bg-white/70">
      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-8 lg:px-12">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {differentiators.map(({ icon: Icon, title }, index) => (
            <SolutionReveal key={title} delay={index * 0.03}>
              <li className="flex flex-col items-start gap-3">
                <Icon size={26} weight="light" className="text-[var(--primary)]" />
                <span className="text-sm font-semibold leading-5 text-[var(--foreground)]">
                  {title}
                </span>
              </li>
            </SolutionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
