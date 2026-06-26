import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { services } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function ServiceMatrix() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Servicios</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-6xl">
              Una mesa tecnica para decidir, instalar y sostener el metodo.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted)] lg:ml-auto">
            Primero evidencia visual, luego capacidades concretas. Sin catalogo inflado ni promesas genericas.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-[0.95fr_1.35fr]">
        <Reveal>
          <div className="relative min-h-[560px] overflow-hidden rounded-[1.25rem] bg-[var(--foreground)]">
            <Image
              src="/fotos/instalacion-hplc-operador.jpg"
              alt="Operadora trabajando en estacion HPLC Del Carpio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,24,32,0.86)_0%,rgba(16,24,32,0.10)_62%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/62">En sitio + documentacion</p>
              <p className="mt-3 max-w-sm text-2xl font-semibold leading-tight">
                Del diagnostico de matriz al sistema funcionando con trazabilidad.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05}>
              <a href={`/servicios/${service.slug}`} className="group flex min-h-64 flex-col justify-between rounded-[1.25rem] border border-[var(--border)] bg-white p-6 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--accent)]">
                <div>
                  <p className="font-mono text-xs text-[var(--accent)]">0{index + 1}</p>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight text-[var(--foreground)]">
                    {service.title}
                  </h3>
                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--muted)]">
                    {service.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5 text-sm font-semibold text-[var(--foreground)]">
                  Ver alcance
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[var(--accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
