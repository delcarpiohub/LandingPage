import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function TrustMetrics() {
  return (
    <section
      id="nosotros"
      className="relative isolate overflow-hidden bg-[#4A5560] text-[#F5F5F5]"
      aria-labelledby="metodologia-del-carpio"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[41%] top-1/2 z-10 hidden h-[180px] w-[112px] -translate-y-1/2 opacity-20 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(245,245,245,0.42) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, #F5F5F5 0.8px, transparent 0.8px)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="grid lg:min-h-[560px] lg:grid-cols-12">
        <div className="relative z-20 px-6 py-14 sm:px-10 md:py-[72px] lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:px-[88px] lg:py-[88px] lg:pr-10">
          <Reveal delay={0.05}>
            <p className="font-mono text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#D6532B]">
              Nuestro enfoque
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="my-6 h-[2px] w-8 bg-[#D6532B] md:my-8" />
          </Reveal>

          <Reveal delay={0.18}>
            <h2
              id="metodologia-del-carpio"
              className="max-w-[620px] font-display text-[clamp(2.25rem,8vw,3.25rem)] font-black leading-[1] tracking-[-0.045em] text-[#F5F5F5] sm:text-[clamp(2.6rem,6vw,4rem)] lg:text-[clamp(3rem,4.8vw,5rem)] lg:leading-[0.96]"
            >
              Pensamos como ingenieros.
              <span className="block text-[#D6532B]">
                Actuamos como socios.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="my-8 h-px w-7 bg-[#F5F5F5]/45" />
          </Reveal>

          <Reveal delay={0.32}>
            <p className="max-w-[610px] text-[16px] font-normal leading-[1.75] text-[#F5F5F5]/80 md:text-[18px]">
              Acompañamos a laboratorios e industrias en cada decisión crítica,
              combinando conocimiento técnico, rigurosidad y experiencia real
              para generar resultados confiables y sostenibles.
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.12}>
          <figure className="group relative min-h-[300px] overflow-hidden bg-[#4A5560] md:min-h-[520px] lg:min-h-[560px] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
            <Image
              src="/fotos/laboratorio-metodologia-mg-0795.jpg"
              alt="Laboratorio técnico con instrumentación analítica avanzada"
              fill
              className="object-cover object-center grayscale brightness-[0.72] contrast-[1.05] transition-transform motion-safe:duration-[1400ms] motion-safe:group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-0 bg-[#4A5560]/35" aria-hidden="true" />
            <div
              className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-[#4A5560]/85 to-transparent lg:block"
              aria-hidden="true"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
