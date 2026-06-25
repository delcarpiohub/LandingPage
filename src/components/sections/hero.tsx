import { ArrowRight, Flask, Gauge, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto grid min-h-[calc(100dvh-80px)] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-6 w-fit border-l-2 border-[var(--accent)] bg-[var(--surface-muted)] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              Tecnologia quimica para operaciones industriales
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-[var(--foreground)] md:text-7xl">
              Cromatografía analítica HPLC y GC para la industria que no admite error.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Diagnostico, suministro, implementacion y soporte tecnico para plantas, laboratorios y operaciones industriales que necesitan control, trazabilidad y continuidad.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href="#contacto">
                  {company.primaryCta}
                  <ArrowRight size={17} weight="bold" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href="#capacidades">{company.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_24px_80px_rgba(12,24,33,0.12)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(213,84,43,0.12),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(51,88,118,0.18),transparent_32%)]" />
            <div className="relative grid h-full min-h-[480px] grid-rows-[1fr_auto]">
              <div className="grid place-items-center">
                <div className="relative size-72 rounded-full border border-[var(--border-strong)] bg-white/50">
                  <div className="absolute inset-8 rounded-full border border-dashed border-[var(--accent)]" />
                  <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--foreground)] shadow-2xl" />
                  <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">
                    <Flask size={38} weight="duotone" />
                  </div>
                  <StatusPoint className="left-2 top-16" icon={<Gauge size={22} />} label="control" />
                  <StatusPoint className="right-0 top-28" icon={<ShieldCheck size={22} />} label="seguridad" />
                  <StatusPoint className="bottom-6 left-20" icon={<Flask size={22} />} label="quimica" />
                </div>
              </div>
              <div className="grid gap-3 rounded-3xl border border-white/70 bg-white/70 p-4 backdrop-blur-xl md:grid-cols-3">
                {["riesgo", "compatibilidad", "continuidad"].map((item) => (
                  <div key={item} className="rounded-2xl bg-[var(--surface-muted)] p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                      modulo
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatusPoint({
  className,
  icon,
  label,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-lg ${className}`}
    >
      <span className="text-[var(--accent)]">{icon}</span>
      {label}
    </div>
  );
}
