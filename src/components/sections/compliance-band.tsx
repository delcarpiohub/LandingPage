import { ChartLineUp, FileText, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Evaluación técnica",
    text: "Se revisa matriz, interferencias, normativa, criticidad y condiciones reales de operación.",
  },
  {
    icon: ChartLineUp,
    title: "Método validable",
    text: "Se define columna, detector, sensibilidad, repetibilidad y límites esperados antes de instalar.",
  },
  {
    icon: FileText,
    title: "Documentación",
    text: "Se entrega criterio técnico, calificación y evidencia para auditorías o procesos de acreditación.",
  },
];

export function ComplianceBand() {
  return (
    <section id="capacidades" className="bg-white">
      <div className="mx-auto max-w-site px-5 py-[70px]">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-[var(--foreground)]">
              Con nuestros clientes en mente.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-bold leading-6 text-[var(--science-cyan-dark)]">
              Trabajamos meticulosamente para entregar soluciones analíticas que puedan sostenerse frente a operación y auditoría.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="border border-[var(--border)] bg-[var(--background)] p-7 text-center">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--science-cyan-light)] text-white">
                    <Icon size={30} weight="light" />
                  </span>
                  <h3 className="mt-6 font-display text-sm font-extrabold uppercase leading-tight text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-[22px] text-[var(--muted-soft)]">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
