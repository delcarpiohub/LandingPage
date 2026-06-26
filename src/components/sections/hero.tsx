import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto grid min-h-[calc(100dvh-80px)] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-6 w-fit border-l-2 border-[var(--accent)] bg-[var(--surface-muted)] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              Tecnologia quimica para operaciones industriales
            </p>
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-normal text-[var(--foreground)] md:text-7xl">
              HPLC y GC para la industria que no admite error.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Diagnóstico, implementación y soporte técnico para plantas y laboratorios que necesitan control y trazabilidad.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild>
                <a href="#contacto">
                  {company.primaryCta}
                  <ArrowRight size={17} weight="bold" />
                </a>
              </Button>
              <a
                href="#capacidades"
                className="text-sm font-medium text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--foreground)]"
              >
                {company.secondaryCta}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="hidden min-h-[520px] rounded-[2rem] bg-[var(--accent)] lg:block" />
        </Reveal>
      </div>
    </section>
  );
}
