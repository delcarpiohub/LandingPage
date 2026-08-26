import type { SolutionMethodRow } from "@/content/solution-content";

import { SolutionReveal } from "./solution-reveal";

// Tabla real (no cards) — refuerza el tono de "informe técnico" del sistema
// de diseño y es el formato más rápido de escanear para un evaluador técnico
// que busca confirmar el problema que Del Carpio resuelve. Vive
// dentro de la sección ancla oscura de la página (fondo --nav-bg). El acento
// por industria se marca una sola vez, en el encabezado de la sección — ver
// solution-editorial-page.tsx —, no repetido fila por fila (el color es el
// mismo en las 17 filas de una industria como minería, así que repetirlo no
// aporta información y se sentía a "punto de dashboard" genérico).
export function SolutionMethods({ rows }: { rows: SolutionMethodRow[] }) {
  if (rows.length === 0) return null;

  return (
    <SolutionReveal>
      <dl className="mt-8 divide-y divide-white/10 border border-white/15 md:hidden">
        {rows.map((row) => (
          <div className="space-y-4 px-5 py-5" key={row.technique}>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">
                Técnica
              </dt>
              <dd className="mt-1.5 text-sm font-semibold leading-6 text-white">
                {row.technique}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">
                Problema del cliente
              </dt>
              <dd className="mt-1.5 text-sm leading-6 text-white/85">
                {row.application}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">
                Qué gana su empresa
              </dt>
              <dd className="mt-1.5 text-sm leading-6 text-white/85">
                {row.standard}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-10 hidden overflow-hidden border border-white/15 md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-white/15 bg-white/[0.04]">
              <th
                className="w-[28%] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90"
                scope="col"
              >
                Técnica
              </th>
              <th
                className="w-[40%] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90"
                scope="col"
              >
                Problema del cliente
              </th>
              <th
                className="w-[32%] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90"
                scope="col"
              >
                Qué gana su empresa
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
                  {row.technique}
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
