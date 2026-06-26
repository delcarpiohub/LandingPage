import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

const proofPoints = ["HPLC / GC", "IQ/OQ/PQ", "Validacion documental"];

export function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-80px)] overflow-hidden border-b border-[var(--border)] bg-[var(--foreground)] text-white">
      <Image
        src="/fotos/hero-laboratorio.jpg"
        alt="Laboratorio Del Carpio con equipo analitico en operacion"
        fill
        className="object-cover object-center opacity-[0.72]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,32,0.94)_0%,rgba(16,24,32,0.78)_42%,rgba(16,24,32,0.16)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,var(--foreground)_0%,transparent_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-80px)] max-w-7xl items-end px-5 pb-10 pt-28">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-6 w-fit border-l-2 border-[var(--accent)] bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/78 backdrop-blur-md">
              Tecnologia analitica para operaciones criticas
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-normal sm:text-5xl md:text-7xl">
              Cromatografia para laboratorios que deben responder con evidencia.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
              Implementamos, validamos y mantenemos sistemas HPLC y GC para procesos industriales donde la trazabilidad pesa tanto como el resultado.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild className="w-full sm:w-auto">
                <a href="#contacto">
                  {company.primaryCta}
                  <ArrowRight size={17} weight="bold" />
                </a>
              </Button>
              <a
                href="#servicios"
                className="text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-white/78"
              >
                Revisar servicios
              </a>
            </div>
            <div className="mt-12 grid gap-3 border-t border-white/18 pt-5 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm font-medium text-white/78">
                  <CheckCircle size={17} className="text-[var(--accent)]" weight="fill" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
