import type { SolutionMethodRow } from "@/content/solution-content";

import { SolutionReveal } from "./solution-reveal";

// Tabla real (no cards) — refuerza el tono de "informe técnico" del sistema
// de diseño y es el formato más rápido de escanear para un evaluador técnico
// que busca confirmar si Del Carpio cubre su técnica/matriz/norma.
export function SolutionMethods({ rows }: { rows: SolutionMethodRow[] }) {
  if (rows.length === 0) return null;

  return (
    <SolutionReveal>
      <div className="mt-10 overflow-x-auto border border-[var(--border)]">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--panel)]">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]" scope="col">
                Técnica
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]" scope="col">
                Aplicación
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]" scope="col">
                Norma / estándar
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                className={
                  index !== rows.length - 1 ? "border-b border-[var(--border)]" : undefined
                }
                key={row.technique}
              >
                <td className="px-5 py-4 align-top text-sm font-semibold text-[var(--foreground)]">
                  {row.technique}
                </td>
                <td className="px-5 py-4 align-top text-sm leading-6 text-[var(--muted)]">
                  {row.application}
                </td>
                <td className="px-5 py-4 align-top text-sm leading-6 text-[var(--muted)]">
                  {row.standard}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SolutionReveal>
  );
}
