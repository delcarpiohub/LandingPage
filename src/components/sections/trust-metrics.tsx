import { metrics } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function TrustMetrics() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="mx-auto grid max-w-7xl gap-px px-5 py-6 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.value} delay={index * 0.04}>
            <div className="h-full bg-[var(--background)] p-6">
              <p className="font-mono text-3xl font-semibold text-[var(--foreground)]">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
