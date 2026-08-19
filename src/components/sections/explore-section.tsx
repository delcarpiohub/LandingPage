import { IndustryGrid } from "@/components/sections/industry-tabs";
import { PipeCornerAccent } from "@/components/ui/pipe-corner-accent";

// El buscador global vive ahora en el header (ver navigation.tsx) — este
// bloque solo cubre industrias atendidas.
export function ExploreSection() {
  return (
    <section
      id="explora"
      aria-labelledby="explora-titulo"
      className="relative overflow-hidden bg-white px-4 py-11 sm:px-5 sm:py-12 md:px-8 md:py-14 lg:px-16 lg:py-16"
    >
      <PipeCornerAccent corner="top-right" size="sm" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Cabecera de industrias */}
        <div
          id="industrias"
          className="mb-6 flex flex-col gap-3 md:mb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8"
        >
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
              Soluciones por industria
            </p>
            <h3
              id="explora-titulo"
              className="mt-3 max-w-[620px] font-display text-[28px] font-bold leading-[1.05] text-ink-dark sm:text-[32px] md:text-[38px] lg:text-[42px]"
            >
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
