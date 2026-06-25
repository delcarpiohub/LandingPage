import { FileText, ShieldCheck, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";

const items = [
  { icon: ShieldCheck, title: "Seguridad operacional", text: "Criterios de uso, compatibilidad y manejo responsable." },
  { icon: FileText, title: "Documentacion tecnica", text: "Fichas, registros y soporte para auditorias y compras." },
  { icon: WarningCircle, title: "Riesgo controlado", text: "Decisiones basadas en criticidad, continuidad y trazabilidad." },
];

export function ComplianceBand() {
  return (
    <section id="capacidades" className="border-y border-[var(--border)] bg-[var(--panel)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Capacidades</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-6xl">
              Lo premium en industria es reducir incertidumbre.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="grid gap-5 rounded-[1.5rem] border border-[var(--border)] bg-white p-6 sm:grid-cols-[56px_1fr]">
                  <span className="grid size-14 place-items-center rounded-full bg-[var(--surface-muted)] text-[var(--accent)]">
                    <Icon size={28} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="mt-2 leading-7 text-[var(--muted)]">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
