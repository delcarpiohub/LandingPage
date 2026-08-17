import type { SolutionApplicationCase } from "@/content/solution-content";

import { SolutionReveal } from "./solution-reveal";

// Dos bloques editoriales lado a lado con un divisor, no cards con borde
// propio — evita el patrón de "grilla de cards idénticas" y mantiene el
// sistema plano (sin sombra) ya establecido para el resto de la página. El
// punto de acento por industria marca el título de cada caso, con anillo
// para mantenerse legible con el amarillo de marca sobre fondo claro.
export function SolutionApplicationCases({
  cases,
  accentColor,
}: {
  cases: SolutionApplicationCase[];
  accentColor: string;
}) {
  if (cases.length === 0) return null;

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 border-t border-[var(--border)] pt-10 sm:grid-cols-2 sm:gap-0">
      {cases.map((item, index) => (
        <SolutionReveal
          className={
            index > 0 ? "sm:border-l sm:border-[var(--border)] sm:pl-10" : undefined
          }
          delay={index * 0.05}
          key={item.title}
        >
          <span
            aria-hidden="true"
            className="mb-3 block size-2.5 rounded-full ring-1 ring-[var(--border-strong)]"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="text-xl leading-tight text-[var(--foreground)]">{item.title}</h3>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--muted)]">
            {item.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                className="border border-[var(--border-strong)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </SolutionReveal>
      ))}
    </div>
  );
}
