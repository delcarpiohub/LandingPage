import { process } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function ProcessTimeline() {
  return (
    <section id="proceso" className="bg-[var(--foreground)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Proceso</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-6xl">
              De la condicion real de planta a una solucion controlada.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-4">
          {process.map((step, index) => (
            <Reveal key={step.label} delay={index * 0.05}>
              <div className="grid gap-6 border-t border-white/15 py-7 md:grid-cols-[140px_1fr]">
                <p className="font-mono text-sm text-[var(--accent)]">0{index + 1}</p>
                <p className="text-xl font-medium text-white">
                  {step.shortLabel ?? step.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
