import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const capabilities = [
  { value: "31", label: "Años de experiencia", isExperience: true },
  { value: "01", label: "Asesoría especializada", isExperience: false },
  { value: "02", label: "Implementación integral", isExperience: false },
  { value: "03", label: "Continuidad y soporte", isExperience: false },
];

export function WhoWeAreSection() {
  return (
    <section aria-labelledby="quienes-somos-title" className="bg-[var(--background)] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-wide px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 lg:items-stretch">
          <Reveal className="relative lg:col-span-5 lg:row-span-2 lg:h-full">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-white lg:h-full lg:aspect-auto lg:rounded-none">
              <Image
                alt="Especialista de Del Carpio operando instrumentación analítica"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                src="/fotos/laboratorio-metodologia-mg-0795.jpg"
              />
            </div>
          </Reveal>

          <Reveal className="bg-ink-dark text-white lg:col-span-7" delay={0.08}>
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
                Quiénes somos
              </p>
              <h2
                className="mt-5 max-w-[11ch] text-[clamp(2.15rem,3.4vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white"
                id="quienes-somos-title"
              >
                Mucho más que un proveedor de equipos.
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
                <p>
                  En Del Carpio llevamos 31 años ayudando a los laboratorios en Chile a llevar a cabo sus proyectos,
                  desde simplificar y optimizar la preparación de muestras hasta desarrollar y montar métodos analíticos
                  complejos.
                </p>
                <p>
                  Somos mucho más que un proveedor de equipos. Somos una solución integral de principio a fin, poniendo
                  toda nuestra experiencia y conocimiento para que cada cliente logre resultados óptimos, precisos y
                  confiables.
                </p>
              </div>
              <Button asChild className="mt-9" variant="ghost-white">
                <Link href="/servicios">Conocer nuestras soluciones</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal className="bg-primary text-white lg:col-span-7" delay={0.14}>
            <p className="sr-only">
              Instrumentación, métodos y soporte técnico para laboratorios en Chile.
            </p>
            <div className="grid divide-y divide-white/25 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {capabilities.map((capability) => (
                <article className="min-h-32 px-6 py-6 sm:px-7 lg:min-h-36 lg:px-7 lg:py-7" key={capability.value}>
                  <p className="text-[clamp(2rem,3vw,3.2rem)] font-extrabold leading-none tracking-[-0.04em]">
                    {capability.value}
                  </p>
                  <p className="mt-3 max-w-[13rem] text-sm font-bold leading-5 text-white/90">
                    {capability.label}
                  </p>
                  {capability.isExperience ? (
                    <p className="mt-2 text-xs leading-5 text-white/75">
                      Instrumentación, métodos y soporte técnico para laboratorios en Chile.
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
