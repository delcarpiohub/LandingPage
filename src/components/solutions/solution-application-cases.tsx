import type { SolutionApplicationCase } from "@/content/solution-content";

import { SolutionReveal } from "./solution-reveal";

// Minería usa dos tarjetas resumidas; los demás sectores mantienen sus casos
// editoriales con el texto y las etiquetas técnicas completos.
export function SolutionApplicationCases({ cases }: { cases: SolutionApplicationCase[] }) {
  if (cases.length === 0) return null;

  if (cases.every((item) => item.summary)) {
    return (
      <div className="mt-9 grid max-w-5xl gap-4 sm:grid-cols-2">
        {cases.map((item, index) => (
          <SolutionReveal className="h-full" delay={index * 0.04} key={item.title}>
            <article className="flex h-full flex-col items-center justify-center rounded-[1rem] border border-[var(--border)] bg-white px-6 py-8 text-center">
              <h3 className="font-display text-lg font-bold leading-snug text-[#4A5560]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#4A5560]">
                {item.summary}
              </p>
            </article>
          </SolutionReveal>
        ))}
      </div>
    );
  }

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
          <h3 className="font-display text-xl leading-tight text-[var(--foreground)]">{item.title}</h3>
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
