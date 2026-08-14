import { GlobalSearch } from "@/components/search/global-search";
import { IndustryGrid } from "@/components/sections/industry-tabs";
import { PipeCornerAccent } from "@/components/ui/pipe-corner-accent";

// Bloque único de exploración: buscador global + industrias atendidas.
// Comparten un solo <section>, un solo contenedor de ancho y un solo ritmo
// de espaciado para leerse como una sola experiencia de navegación, en vez
// de dos componentes pegados uno sobre otro.
export function ExploreSection() {
  return (
    <section
      id="explora"
      aria-labelledby="explora-titulo"
      className="relative overflow-hidden bg-white px-4 py-14 sm:px-5 md:px-8 md:py-[4.5rem] lg:px-16 lg:py-20"
    >
      <PipeCornerAccent corner="top-right" size="sm" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Cabecera de exploración: buscador */}
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Explora Del Carpio
            </p>
            <h2
              id="explora-titulo"
              className="mt-4 font-display text-[34px] font-bold leading-[1] text-ink-dark sm:text-[40px] md:text-[48px] lg:text-[52px]"
            >
              Encuentra lo que necesitas
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="max-w-[46ch] text-base leading-6 text-ink-muted">
              Busca productos, servicios, marcas o explora soluciones según tu
              industria.
            </p>
            <div className="mt-6 max-w-[620px] sm:mt-8">
              <GlobalSearch />
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div
          aria-hidden="true"
          className="mt-14 mb-14 h-px w-full bg-ink-border lg:mt-[72px] lg:mb-[72px]"
        />

        {/* Cabecera de industrias */}
        <div
          id="industrias"
          className="mb-8 flex flex-col gap-3 md:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8"
        >
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
              Soluciones por industria
            </p>
            <h3 className="mt-3 max-w-[620px] font-display text-[28px] font-bold leading-[1.05] text-ink-dark sm:text-[32px] md:text-[38px] lg:text-[42px]">
              Sectores que atendemos
            </h3>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-6 text-ink-muted sm:text-base lg:text-right">
            Sectores donde la precisión analítica sostiene decisiones
            técnicas, auditorías y continuidad operacional.
          </p>
        </div>

        <IndustryGrid />
      </div>
    </section>
  );
}
