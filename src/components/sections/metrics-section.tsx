import {
  ChartBar,
  ClockCounterClockwise,
  HardDrives,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";

const metrics = [
  {
    icon: ClockCounterClockwise,
    value: "31",
    title: "Años de experiencia",
  },
  {
    icon: Handshake,
    value: "20+",
    title: "Marcas representadas",
  },
  {
    icon: HardDrives,
    value: "400+",
    title: "Equipos instalados",
  },
  {
    icon: ChartBar,
    value: "200+",
    title: "Proyectos completados",
  },
];

export function MetricsSection() {
  return (
    <section
      id="metricas"
      aria-labelledby="metrics-section-title"
      className="bg-[#101820] px-5 py-10 text-white md:py-12"
    >
      <div className="mx-auto grid max-w-site gap-8 md:grid-cols-[0.85fr_2fr] md:items-center">
        <Reveal>
          <div className="text-center md:text-left">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#D5542B]">
              Por qué elegirnos
            </p>
            <h2
              id="metrics-section-title"
              className="mt-3 font-display text-2xl font-extrabold leading-tight text-white md:text-[2rem]"
            >
              Nuestros números
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <Reveal key={metric.title} delay={index * 0.05}>
                <article className="group flex min-h-[128px] flex-col items-center justify-center border border-white/12 px-4 py-5 text-center transition-colors duration-200 hover:border-[#D5542B]">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center text-white transition-colors duration-200 group-hover:text-[#D5542B]"
                  >
                    <Icon size={34} weight="fill" />
                  </span>
                  <p className="mt-3 font-display text-[2rem] font-extrabold leading-none text-white transition-colors duration-200 group-hover:text-[#D5542B]">
                    {metric.value}
                  </p>
                  <h3 className="mt-2 max-w-[150px] text-sm font-bold leading-snug text-white/88">
                    {metric.title}
                  </h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
