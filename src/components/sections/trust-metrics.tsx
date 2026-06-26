import { Reveal } from "@/components/motion/reveal";

const metrics = [
  { value: "HPLC / GC", label: "metodos cromatograficos para matrices complejas" },
  { value: "NCh / ISO", label: "documentacion lista para auditoria tecnica" },
  { value: "6 sectores", label: "alimentos, mineria, farma, aguas, ambiente e I+D" },
  { value: "IQ/OQ/PQ", label: "calificacion de instalacion, operacion y desempeno" },
];

export function TrustMetrics() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--foreground)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">

          <Reveal>
            <div className="lg:border-r lg:border-white/10 lg:pr-14">
              <p className="mt-5 text-2xl font-semibold leading-[1.25] md:text-3xl">
                Metodos cromatograficos que deben sostenerse frente a auditorias, compras y operacion real.
              </p>
            </div>
          </Reveal>

          <div className="divide-y divide-white/8">
            {metrics.map((metric, index) => (
              <Reveal key={metric.value} delay={index * 0.06}>
                <div className="flex items-baseline gap-6 py-5">
                  <p className="w-28 shrink-0 font-mono text-base font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="text-sm leading-6 text-white/52">{metric.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
