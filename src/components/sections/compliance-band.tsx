import { FileText, ShieldCheck, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Seguridad operacional",
    text: "Compatibilidad, manejo y continuidad del sistema antes de recomendar una solución.",
  },
  {
    icon: FileText,
    title: "Documentación técnica",
    text: "Registros, fichas y criterios de validación preparados para auditoría o compra.",
  },
  {
    icon: WarningCircle,
    title: "Riesgo controlado",
    text: "Priorización según criticidad, matriz, urgencia y trazabilidad requerida.",
  },
];

export function ComplianceBand() {
  return (
    <section id="capacidades" className="bg-[var(--foreground)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

          <Reveal>
            <div>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
                Lo premium en industria analítica es reducir incertidumbre antes de comprometerse.
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-white/55">
                Cada recomendación parte de auditar la realidad del laboratorio: la matriz, el equipo disponible, la normativa vigente y la urgencia operacional.
              </p>
            </div>
          </Reveal>

          <div className="lg:border-l lg:border-white/10 lg:pl-16">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.07}>
                  <div
                    className={`flex gap-5 py-8 ${
                      index > 0 ? "border-t border-white/8" : ""
                    }`}
                  >
                    <Icon
                      size={20}
                      className="mt-0.5 shrink-0 text-[var(--accent)]"
                      weight="light"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-2.5 text-sm leading-7 text-white/52">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
