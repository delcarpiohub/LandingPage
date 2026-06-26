import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
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
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <a href={`/servicios/${service.slug}`} className="block">
              <div className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white px-6 py-5 transition-colors hover:border-[var(--accent)]">
                <span className="text-base font-semibold text-[var(--foreground)]">
                  {service.title}
                </span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-[var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
