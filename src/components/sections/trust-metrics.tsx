import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function TrustMetrics() {
  return (
    <section id="nosotros" className="bg-[var(--background)]">
      <div className="mx-auto grid max-w-wide gap-10 px-5 py-16 md:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.82fr)] md:items-center md:gap-14 lg:py-24">
        <div>
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
