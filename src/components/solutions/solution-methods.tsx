import type { SolutionMethodRow } from "@/content/solution-content";

import { SolutionReveal } from "./solution-reveal";

// Tabla real (no cards) — refuerza el tono de "informe técnico" del sistema
// de diseño y es el formato más rápido de escanear para un evaluador técnico
// que busca confirmar si Del Carpio cubre su técnica/matriz/norma. Vive
// dentro de la sección ancla oscura de la página (fondo --nav-bg): el punto
// de acento por industria es la única marca de color no-terracota en la
// tabla, con anillo oscuro propio para mantenerse legible incluso con el
// amarillo de marca.
export function SolutionMethods({
  rows,
  accentColor,
}: {
  rows: SolutionMethodRow[];
  accentColor: string;
}) {
  if (rows.length === 0) return null;

  return (
    <SolutionReveal>
      <div className="mt-10 overflow-x-auto border border-white/15">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/15 bg-white/[0.04]">
              <th
                className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90"
                scope="col"
              >
                Técnica
              </th>
              <th
                className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90"
                scope="col"
              >
                Aplicación
              </th>
              <th
                className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90"
                scope="col"
              >
                Norma / estándar
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                className={index !== rows.length - 1 ? "border-b border-white/10" : undefined}
                key={row.technique}
              >
                <td className="px-5 py-4 align-top text-sm font-semibold text-white">
                  <span className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-2 shrink-0 rounded-full ring-1 ring-white/40"
                      style={{ backgroundColor: accentColor }}
                    />
                    {row.technique}
                  </span>
                </td>
                <td className="px-5 py-4 align-top text-sm leading-6 text-white/80">
                  {row.application}
                </td>
                <td className="px-5 py-4 align-top text-sm leading-6 text-white/80">
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
