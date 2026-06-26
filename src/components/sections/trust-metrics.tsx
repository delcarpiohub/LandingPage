import { metrics } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function TrustMetrics() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--foreground)] text-white">
      <div className="mx-auto grid max-w-7xl gap-px px-5 pb-10 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.value} delay={index * 0.04}>
            <div className="h-full border-t border-white/14 py-6 md:px-6">
              <p className="font-mono text-2xl font-semibold text-white md:text-3xl">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-white/62">{metric.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
