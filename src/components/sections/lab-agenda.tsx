import { features } from "@/config/features";
import { eventos, type Evento } from "@/data/eventos";

const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function parseIsoDateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function todayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatRango(fechaInicio: string, fechaFin?: string): string {
  const start = parseIsoDateLocal(fechaInicio);
  if (!fechaFin) {
    return `${start.getDate()} ${MESES[start.getMonth()]} ${start.getFullYear()}`;
  }
  const end = parseIsoDateLocal(fechaFin);
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${end.getDate()} ${MESES[start.getMonth()]} ${start.getFullYear()}`;
  }
  return `${start.getDate()} ${MESES[start.getMonth()]} – ${end.getDate()} ${MESES[end.getMonth()]} ${end.getFullYear()}`;
}

function getEventosFuturos(): Evento[] {
  const hoy = todayIso();
  return eventos
    .filter((evento) => (evento.fechaFin ?? evento.fechaInicio) >= hoy)
    .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
}

// Server Component: se oculta completo (return null) si el flag está en
// false o si no hay eventos futuros — nunca "próximamente" ni placeholders.
export function LabAgenda() {
  if (!features.agendaEventos) {
    return null;
  }

  const proximos = getEventosFuturos();
  if (proximos.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="agenda-laboratorio-title" className="bg-white px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-site">
        <h2
          id="agenda-laboratorio-title"
          className="font-display text-xl font-bold tracking-tight text-[#4A5560] sm:text-2xl"
        >
          Agenda de laboratorio
        </h2>

        {/* Desktop/tablet: tabla de secuencia */}
        <table className="mt-6 hidden w-full border-collapse text-sm sm:table">
          <thead>
            <tr className="border-b border-[#4A5560]/15 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4A5560]/60">
              <th scope="col" className="w-12 py-2 pr-3 font-medium tabular-nums">
                #
              </th>
              <th scope="col" className="w-48 py-2 pr-3 font-medium">
                Fecha
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Evento
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                Lugar
              </th>
              <th scope="col" className="w-28 py-2 font-medium">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            {proximos.map((evento, index) => (
              <tr key={evento.id} className="border-b border-[#4A5560]/10">
                <td className="py-3 pr-3 font-mono text-[13px] tabular-nums text-[#4A5560]/60">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-3 pr-3 font-mono text-[13px] tabular-nums text-[#333333]">
                  {formatRango(evento.fechaInicio, evento.fechaFin)}
                </td>
                <td className="py-3 pr-3 font-semibold text-[#333333]">
                  {evento.enlace ? (
                    <a
                      href={evento.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 hover:text-[#D6532B] hover:underline"
                    >
                      {evento.titulo}
                    </a>
                  ) : (
                    evento.titulo
                  )}
                </td>
                <td className="py-3 pr-3 text-[#666666]">{evento.lugar}</td>
                <td className="py-3 text-[#4A5560]">{evento.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: filas apiladas, sin scroll horizontal */}
        <div className="mt-6 flex flex-col divide-y divide-[#4A5560]/10 sm:hidden">
          {proximos.map((evento, index) => (
            <div key={evento.id} className="py-4">
              <div className="flex items-baseline gap-2 font-mono text-[13px] tabular-nums text-[#4A5560]/60">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{formatRango(evento.fechaInicio, evento.fechaFin)}</span>
              </div>
              <p className="mt-1 font-semibold text-[#333333]">
                {evento.enlace ? (
                  <a
                    href={evento.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:text-[#D6532B] hover:underline"
                  >
                    {evento.titulo}
                  </a>
                ) : (
                  evento.titulo
                )}
              </p>
              <p className="mt-0.5 text-sm text-[#666666]">{evento.lugar}</p>
              <p className="mt-0.5 text-sm text-[#4A5560]">{evento.tipo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
