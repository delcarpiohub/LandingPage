import { FileText, Flask, ShieldCheck, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Matriz real",
    text: "Se observa muestra, interferencias, criticidad y condiciones de operación.",
  },
  {
    icon: Flask,
    title: "Método defendible",
    text: "Se define columna, detector, preparación, sensibilidad y límites esperados.",
  },
  {
    icon: FileText,
    title: "Evidencia auditable",
    text: "Se documenta criterio, calificación, validación y soporte para responder frente a auditoría.",
  },
];

export function ComplianceBand() {
  return (
    <section id="capacidades" className="bg-[var(--foreground)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
            <div>
              <h2 className="text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
                Criterio técnico antes que catálogo.
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-white/55">
                Cada recomendación parte de auditar la realidad del laboratorio: la matriz, el equipo disponible, la normativa vigente y la urgencia operacional.
              </p>
              <div className="mt-10 border-l border-white/14 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/38">
                  Decisión de compra
                </p>
                <p className="mt-3 max-w-sm text-lg font-semibold leading-7 text-white">
                  Lo relevante no es tener más opciones. Es saber cuál soporta la muestra real.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
            <div className="overflow-hidden rounded-[1.25rem] border border-white/12 bg-white/[0.035]">
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.07}>
                    <div
                      className={`grid gap-5 px-6 py-7 sm:grid-cols-[3rem_1fr] ${
                        index > 0 ? "border-t border-white/8" : ""
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.04]">
                        <Icon
                          size={20}
                          className="text-[var(--accent)]"
                          weight="light"
                        />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/36">
                          0{index + 1}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-7 text-white/52">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.12}>
              <aside className="rounded-[1.25rem] border border-[var(--accent)]/45 bg-[var(--accent)] px-6 py-7 text-white lg:mt-16">
                <WarningCircle size={22} weight="light" />
                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                  Lo que se evita
                </p>
                <p className="mt-3 text-2xl font-semibold leading-tight">
                  Comprar equipo sin método, validar sin matriz o documentar cuando el problema ya ocurrió.
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
