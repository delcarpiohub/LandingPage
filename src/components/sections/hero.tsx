import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-80px)] overflow-hidden border-b border-[var(--border)] bg-[var(--foreground)] text-white">
      <Image
        src="/fotos/hero-laboratorio.jpg"
        alt="Laboratorio Del Carpio con equipo analitico en operacion"
        fill
        className="object-cover object-center opacity-[0.65]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(16,24,32,0.96)_0%,rgba(16,24,32,0.72)_48%,rgba(16,24,32,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,var(--foreground)_0%,transparent_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-80px)] max-w-7xl flex-col justify-end px-5 pb-12 pt-28">
        <Reveal>
          <div className="max-w-[52rem]">
            <p className="mb-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45">
              Instrumentación analítica / HPLC, GC, ICP-OES / Santiago, Chile
            </p>

            <h1 className="text-[2.6rem] font-semibold leading-[1.08] sm:text-5xl md:text-[5rem] md:leading-[1.04]">
              Cromatografía para laboratorios que deben responder con evidencia.
            </h1>

            <p className="mt-8 max-w-[38rem] text-lg leading-8 text-white/68">
              Implementamos, validamos y mantenemos sistemas HPLC y GC para procesos industriales donde la trazabilidad pesa tanto como el resultado.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild className="w-full sm:w-auto">
                <a href="#contacto">
                  {company.primaryCta}
                  <ArrowRight size={17} weight="bold" />
                </a>
              </Button>
              <a
                href="#servicios"
                className="text-sm font-medium text-white/60 underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-white/85"
              >
                Revisar servicios
              </a>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
