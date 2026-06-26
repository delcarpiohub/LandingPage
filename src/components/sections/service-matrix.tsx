import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function ServiceMatrix() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-5 py-24">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="max-w-3xl text-4xl font-semibold text-[var(--foreground)] md:text-6xl">
            Una mesa técnica para decidir, instalar y sostener el método.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Cuatro capacidades con trazabilidad completa: del diagnóstico de matriz al soporte técnico continuo.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-[0.95fr_1.35fr]">
        <Reveal>
          <div className="relative min-h-[520px] overflow-hidden rounded-[1.25rem] bg-[var(--foreground)]">
            <Image
              src="/fotos/instalacion-hplc-operador.jpg"
              alt="Operadora trabajando en estacion HPLC Del Carpio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,24,32,0.88)_0%,rgba(16,24,32,0.08)_58%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/52">
                En sitio + documentación
              </p>
              <p className="mt-3 max-w-sm text-xl font-semibold leading-snug">
                Del diagnóstico de matriz al sistema funcionando con trazabilidad.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border)]">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05}>
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex items-center gap-5 bg-white px-6 py-6 transition-colors duration-200 hover:bg-[var(--surface-muted)] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[var(--border)]"
              >
                <p className="w-7 shrink-0 font-mono text-xs text-[var(--muted)]">
                  0{index + 1}
                </p>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold leading-tight text-[var(--foreground)]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                    {service.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-[var(--accent)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
