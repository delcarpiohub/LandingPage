import { FileText, ShieldCheck, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";

const items = [
  { icon: ShieldCheck, title: "Seguridad operacional", text: "Compatibilidad, manejo y continuidad del sistema antes de recomendar una solucion." },
  { icon: FileText, title: "Documentacion tecnica", text: "Registros, fichas y criterios de validacion preparados para auditoria o compra." },
  { icon: WarningCircle, title: "Riesgo controlado", text: "Priorizacion segun criticidad, matriz, urgencia y trazabilidad requerida." },
];

export function ComplianceBand() {
  return (
    <section id="capacidades" className="bg-[var(--panel)]">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Capacidades</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-6xl">
              Lo premium en industria es reducir incertidumbre antes de comprar.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="min-h-72 bg-white p-7">
                  <span className="grid size-14 place-items-center rounded-full bg-[var(--surface-muted)] text-[var(--accent)]">
                    <Icon size={28} weight="duotone" />
                  </span>
                  <p className="mt-10 font-mono text-xs text-[var(--muted)]">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-4 leading-7 text-[var(--muted)]">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
