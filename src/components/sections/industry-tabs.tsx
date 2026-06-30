import Image from "next/image";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { industries } from "@/content/site";

const visibleIndustries = industries.slice(0, 4);

export function IndustryTabs() {
  return (
    <section id="industrias" className="bg-[var(--background)]">
      <div className="mx-auto grid max-w-site gap-16 px-5 py-[75px] lg:grid-cols-2">
        <Reveal>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              Tecnologías
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-[240px_1fr] sm:items-start">
              <div className="relative h-[145px] overflow-hidden bg-white">
                <Image
                  src="/fotos/instalacion-hplc-operador.jpg"
                  alt="Especialista operando estación HPLC Del Carpio"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
              <div>
                <h3 className="font-display text-sm font-extrabold leading-[1.35] text-[var(--foreground)]">
                  Métodos HPLC y GC para operación real.
                </h3>
                <p className="mt-3 text-xs leading-[22px] text-[var(--muted-soft)]">
                  Selección de columna, detector, preparación de muestra y criterios de validación según sector.
                </p>
              </div>
            </div>
            <p className="mt-8 text-xs leading-[22px] text-[var(--muted-soft)]">
              Atendemos matrices de alimentos, minería, farmacéutica, aguas, ambiental e investigación. La conversación técnica comienza por el sector, porque cada matriz cambia la decisión.
            </p>
            <Button asChild className="mt-8 h-10 px-5 text-xs">
              <a href="#contacto">
                Consultar aplicación
                <ArrowRight size={15} weight="bold" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              Sectores atendidos
            </h2>
            <div className="relative mt-8 grid gap-7 before:absolute before:left-[19px] before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-[var(--border-strong)]">
              {visibleIndustries.map((industry, index) => (
                <div key={industry.name} className="relative grid grid-cols-[40px_1fr] gap-5">
                  <span className="relative z-10 grid size-10 place-items-center rounded-full bg-[var(--science-cyan)] text-white">
                    <CheckCircle size={18} weight="bold" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-extrabold uppercase leading-tight text-[var(--foreground)]">
                      {industry.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-[22px] text-[var(--muted-soft)]">
                      {industry.detail}
                    </p>
                  </div>
                  {index === 0 && (
                    <span className="absolute left-0 top-0 size-10 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
