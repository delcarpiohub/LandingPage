import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function ServiceMatrix() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-5 py-24">
      <Reveal>
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Servicios</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-6xl">
            Un sistema de trabajo completo, no una lista de productos.
          </h2>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <article className="group min-h-64 rounded-[1.5rem] border border-[var(--border)] bg-white p-7 transition-colors hover:border-[var(--accent)]">
              <div className="flex items-start justify-between gap-6">
                <CheckCircle size={28} weight="duotone" className="text-[var(--accent)]" />
                <ArrowUpRight
                  size={22}
                  className="text-[var(--muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <h3 className="mt-12 text-2xl font-semibold text-[var(--foreground)]">{service.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">{service.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
