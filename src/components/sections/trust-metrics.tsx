import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const decisionMarkers = [
  "Matriz real",
  "Método defendible",
  "Instalación trazable",
  "Operación sostenida",
] as const;

export function TrustMetrics() {
  return (
    <section id="nosotros" className="bg-[var(--background)]">
      <div className="mx-auto grid max-w-wide gap-10 px-5 py-16 md:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.82fr)] md:items-center md:gap-14 lg:py-24">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
              Criterio técnico
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[820px] font-display text-[clamp(2.6rem,5.8vw,5.15rem)] font-extrabold leading-[0.95] tracking-tight text-[var(--foreground)]">
              La decisión correcta no empieza en el equipo.
              <span className="block text-[var(--primary)]">
                Empieza en la matriz.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[620px] text-[17px] leading-8 text-[var(--muted)] md:text-[18px]">
              Antes de recomendar una solución, Del Carpio revisa muestra,
              método, límite de detección, auditoría y operación real. Menos
              catálogo. Más criterio técnico.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl
              aria-label="Método de evaluación técnica Del Carpio"
              className="mt-10 grid max-w-[760px] gap-0 border-y border-[var(--border-strong)] sm:grid-cols-2 lg:grid-cols-4"
            >
              {decisionMarkers.map((marker, index) => (
                <div
                  key={marker}
                  className="border-t border-[var(--border)] py-4 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0 lg:px-5"
                >
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                    0{index + 1}
                  </dt>
                  <dd className="mt-2 font-display text-[1rem] font-extrabold leading-tight text-[var(--foreground)]">
                    {marker}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <figure className="relative min-h-[360px] overflow-hidden rounded-[4px] border border-[var(--border-strong)] bg-[var(--panel)] md:min-h-[500px]">
            <Image
              src="/fotos/instalacion-hplc-operador.jpg"
              alt="Especialista de Del Carpio operando equipamiento HPLC en laboratorio real"
              fill
              className="object-cover object-[54%_50%]"
              sizes="(min-width: 1024px) 430px, (min-width: 768px) 38vw, 100vw"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
