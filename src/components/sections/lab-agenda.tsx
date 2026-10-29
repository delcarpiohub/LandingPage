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

const MILISEGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;

type TimelineEvent = Evento & {
  date: Date;
  position: number;
  isNearest: boolean;
};

type MonthTick = {
  label: string;
  position: number;
};

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

function diffDays(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / MILISEGUNDOS_POR_DIA);
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

function getMonthTicks(start: Date, end: Date, rangeDays: number): MonthTick[] {
  const ticks: MonthTick[] = [];
  const cursor = new Date(start.getFullYear(), start.getMonth() + 1, 1);

  while (cursor < end) {
    ticks.push({
      label: `${MESES[cursor.getMonth()]} ${String(cursor.getFullYear()).slice(-2)}`,
      position: (diffDays(start, cursor) / rangeDays) * 100,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return ticks;
}

function getTimeline(events: Evento[]): {
  events: TimelineEvent[];
  start: Date;
  monthTicks: MonthTick[];
} {
  const start = parseIsoDateLocal(todayIso());
  const end = events.reduce((latest, event) => {
    const eventEnd = parseIsoDateLocal(event.fechaFin ?? event.fechaInicio);
    return eventEnd > latest ? eventEnd : latest;
  }, start);
  const rangeDays = Math.max(1, diffDays(start, end));
  const nearestId = events[0]?.id;

  return {
    start,
    monthTicks: getMonthTicks(start, end, rangeDays),
    events: events.map((event) => {
      const date = parseIsoDateLocal(event.fechaInicio);
      return {
        ...event,
        date,
        position: Math.max(0, Math.min(100, (diffDays(start, date) / rangeDays) * 100)),
        isNearest: event.id === nearestId,
      };
    }),
  };
}

function pointColor(tipo: Evento["tipo"]): string {
  if (tipo === "Feria") {
    return "bg-[#D6532B]";
  }

  if (tipo === "Seminario") {
    return "bg-[#53843A]";
  }

  return "bg-[#FBE369]";
}

function EventTitle({ event }: { event: Evento }) {
  const className = "font-display text-base font-bold leading-tight text-[#333333] transition-colors hover:text-[#D6532B]";

  if (event.enlace) {
    return (
      <a href={event.enlace} target="_blank" rel="noopener noreferrer" className={className}>
        {event.titulo}
      </a>
    );
  }

  return <p className={className}>{event.titulo}</p>;
}

function EventDetail({ event }: { event: Evento }) {
  return (
    <>
      <time
        dateTime={event.fechaFin ? `${event.fechaInicio}/${event.fechaFin}` : event.fechaInicio}
        className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] tabular-nums text-[#4A5560]/70"
      >
        {formatRango(event.fechaInicio, event.fechaFin)}
      </time>
      <EventTitle event={event} />
      <p className="mt-1 text-sm leading-snug text-[#4A5560]/70">{event.lugar}</p>
      <span className="sr-only">Tipo: {event.tipo}.</span>
    </>
  );
}

// Server Component: se oculta completo si el flag está en false o no quedan
// fechas vigentes. Los datos permanecen fuera de esta pieza; solo se traduce
// su escala temporal a posiciones reales cuando hay eventos que mostrar.
export function LabAgenda() {
  if (!features.agendaEventos) {
    return null;
  }

  const proximos = getEventosFuturos();
  if (proximos.length === 0) {
    return null;
  }

  const timeline = getTimeline(proximos);

  return (
    <section aria-labelledby="agenda-laboratorio-title" className="bg-white px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-site">
        <header className="max-w-xl">
          <h2
            id="agenda-laboratorio-title"
            className="font-display text-3xl font-bold tracking-[-0.04em] text-[#4A5560] sm:text-4xl"
          >
            Agenda de laboratorio
          </h2>
        </header>

        <div className="relative mt-20 hidden min-h-[25rem] sm:block" aria-label="Línea de tiempo de próximos encuentros">
          <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-[#4A5560]/30" />

          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <span aria-hidden="true" className="block size-2 rounded-full bg-[#4A5560]" />
            <span className="absolute left-0 top-5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#4A5560]/70">
              Hoy
            </span>
          </div>

          {timeline.monthTicks.map((tick) => (
            <div
              key={`${tick.label}-${tick.position}`}
              aria-hidden="true"
              className="absolute top-1/2 -translate-x-1/2"
              style={{ left: `${tick.position}%` }}
            >
              <span className="block h-2 w-px bg-[#4A5560]/35" />
              <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-[#4A5560]/55">
                {tick.label}
              </span>
            </div>
          ))}

          {timeline.events.map((event, index) => {
            const aboveLine = index % 2 === 0;
            const horizontalAlignment =
              event.position <= 12
                ? "translate-x-0"
                : event.position >= 88
                  ? "-translate-x-full"
                  : "-translate-x-1/2";
            return (
              <div
                key={event.id}
                className="absolute top-1/2 z-10"
                style={{ left: `${event.position}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-1.5 -top-1.5 block size-3 rounded-full border-2 border-white ${
                    event.isNearest
                      ? `${pointColor(event.tipo)} shadow-[0_0_0_4px_rgba(74,85,96,0.13)]`
                      : pointColor(event.tipo)
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute left-0 w-px bg-[#4A5560]/35 ${aboveLine ? "-top-12 h-10" : "top-2 h-10"}`}
                />
                <article
                  className={`absolute left-0 w-48 text-left ${horizontalAlignment} ${
                    aboveLine ? "-top-56" : "top-12"
                  }`}
                >
                  <EventDetail event={event} />
                </article>
              </div>
            );
          })}
        </div>

        <div className="relative mt-10 pl-8 sm:hidden" aria-label="Línea de tiempo de próximos encuentros">
          <div aria-hidden="true" className="absolute bottom-2 left-1.5 top-1.5 w-px bg-[#4A5560]/30" />
          <div className="relative">
            <span aria-hidden="true" className="absolute -left-[1.72rem] top-1 block size-2 rounded-full bg-[#4A5560]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#4A5560]/70">Hoy</span>
          </div>

          {timeline.events.map((event, index) => {
            const previousDate = index === 0 ? timeline.start : timeline.events[index - 1].date;
            // La base evita colisiones de lectura; cada día adicional amplía la
            // distancia vertical de manera proporcional a la fecha real.
            const gap = Math.max(56, diffDays(previousDate, event.date) * 1.2);

            return (
              <article key={event.id} className="relative" style={{ marginTop: `${gap}px` }}>
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2.1rem] top-1 block size-3 rounded-full border-2 border-white ${
                    event.isNearest
                      ? `${pointColor(event.tipo)} shadow-[0_0_0_4px_rgba(74,85,96,0.13)]`
                      : pointColor(event.tipo)
                  }`}
                />
                <EventDetail event={event} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
