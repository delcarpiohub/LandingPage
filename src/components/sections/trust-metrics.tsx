import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function TrustMetrics() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-[70px] md:grid-cols-[270px_1fr_1.15fr] md:items-center">
        <Reveal>
          <div className="relative h-[180px] overflow-hidden bg-[var(--background)]">
            <Image
              src="/fotos/instalacion-hplc-equipo.jpg"
              alt="Sistema cromatográfico Del Carpio instalado en laboratorio"
              fill
              className="object-cover"
              sizes="270px"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div>
            <h2 className="font-display text-[2.35rem] font-extrabold leading-none text-[var(--accent)]">
              Bienvenido.
            </h2>
            <p className="mt-3 max-w-[16rem] font-display text-[1.35rem] font-semibold leading-[1.08] text-[var(--science-cyan-dark)]">
              La ciencia aplicada hace más confiable cada decisión de laboratorio.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="text-xs leading-[22px] text-[var(--muted-soft)]">
            <p>
              Del Carpio acompaña a laboratorios industriales que necesitan seleccionar,
              instalar, validar y sostener métodos analíticos con evidencia. El foco no es
              vender más opciones, sino definir la alternativa correcta para cada matriz,
              auditoría y condición de operación.
            </p>
            <p className="mt-5 text-[11px] font-bold text-[var(--accent)]">
              Equipo técnico Del Carpio{" "}
              <span className="text-[var(--science-cyan)]">Instrumentación analítica</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
