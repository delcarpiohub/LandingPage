import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AboutMissionTabs } from "@/app/nosotros/about-mission-tabs";
import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nosotros | Del Carpio Análisis y Asesorías",
  description:
    "Conoce el enfoque técnico de Del Carpio en instrumentación analítica, validación de métodos y soporte especializado para laboratorios industriales.",
  alternates: {
    canonical: "/nosotros",
  },
};

const responsibilityItems = [
  "Sss.",
  "Iii.",
  "Deee.",
  "Acom.",
];

const frequentComments = [
  {
    text: "Necesitamos que el método quede documentado y defendible antes de la próxima auditoría.",
    context: "Consulta recurrente en validación y trazabilidad",
  },
  {
    text: "No buscamos solo instalar un equipo; necesitamos continuidad operativa y soporte técnico real.",
    context: "Comentario habitual en proyectos de implementación",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-dvh bg-ink-bg text-ink">
      {/* nano banana pro */}
      <span className="sr-only">nano banana pro</span>
      <Navigation />

      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-ink-dark pt-28 text-white md:pt-32">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/fotos/hero-laboratorio.jpg"
              alt="Laboratorio Del Carpio con instrumentación analítica en operación"
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A5560] via-[#4A5560]/90 to-[#4A5560]/40" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-bg to-transparent" />
          </div>

          <div className="mx-auto grid max-w-wide gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[0.92fr_0.58fr] lg:px-10 lg:pb-28">
            <Reveal>
              <div className="max-w-4xl">
                <nav aria-label="Breadcrumb" className="mb-12">
                  <ol className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                    <li>
                      <Link className="transition-colors hover:text-white" href="/">
                        Inicio
                      </Link>
                    </li>
                    <li aria-hidden="true" className="text-primary">
                      /
                    </li>
                    <li className="text-white">Nosotros</li>
                  </ol>
                </nav>
                <h1 className="max-w-5xl text-balance font-display text-[clamp(2.65rem,6vw,5.7rem)] font-black leading-[0.98] tracking-[-0.02em] text-white">
                  Crrrrrr.
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-base font-medium leading-8 text-white/80 md:text-lg">
                  Aaa
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto grid max-w-wide gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-10">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-primary">
                Cómo trabajamos
              </p>
              <h2 className="mt-5 text-balance font-display text-[clamp(2.2rem,4.8vw,4.8rem)] font-black leading-[1] tracking-[-0.02em] text-ink">
                La decisión correcta no empieza en el equipo.
              </h2>
              <p className="mt-7 text-pretty text-base leading-8 text-ink-dark md:text-lg">
                Empieza en la matriz, en el método y en las condiciones reales
                donde ese resultado tendrá que sostenerse.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative min-h-[420px] overflow-hidden rounded-[20px] border border-ink-border bg-white md:min-h-[520px]">
              <Image
                src="/fotos/laboratorio-metodologia-mg-0795.jpg"
                alt="Equipo técnico de Del Carpio revisando condiciones de laboratorio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 760px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/80 via-[#101820]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 max-w-xl p-7 text-white md:p-10">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-primary">
                  Evidencia real
                </p>
                <p className="mt-3 text-pretty text-xl font-extrabold leading-tight md:text-2xl">
                  Laboratorio, equipo y contexto operativo como punto de
                  partida para cada recomendación.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-ink-border bg-white">
          <div className="mx-auto grid max-w-wide gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-10">
            <Reveal>
              <div className="order-2 lg:order-1">
                <AboutMissionTabs />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="order-1 lg:order-2">
              <div className="relative min-h-[340px] overflow-hidden rounded-[24px] border border-ink-border bg-white md:min-h-[460px]">
                <Image
                  src="/fotos/instalacion-campana.jpg"
                  alt="Equipo de Del Carpio revisando instrumentación y condiciones de laboratorio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 580px"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto grid max-w-wide gap-14 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:px-10">
          <Reveal>
            <div className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-ink-border bg-white md:min-h-[500px]">
              <Image
                src="/fotos/instalacion-hplc-operador.jpg"
                alt="Especialista de Del Carpio trabajando con sistema HPLC en laboratorio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 680px"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl lg:pl-2">
              <h2 className="text-balance font-display text-[clamp(2.6rem,5vw,6rem)] font-black leading-[0.96] tracking-[-0.03em] text-ink">
                Q
              </h2>
              <ul className="mt-10 divide-y divide-ink-border border-y border-ink-border">
                {responsibilityItems.map((item) => (
                  <li
                    key={item}
                    className="py-6 text-lg font-semibold leading-9 text-ink-dark md:text-[1.05rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="bg-ink-dark px-5 py-16 text-white sm:px-8 md:py-20 lg:px-10">
          <Reveal>
            <div className="mx-auto flex max-w-wide flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-primary">
                  Próximo paso
                </p>
                <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4vw,4.5rem)] font-black leading-[1] tracking-[-0.02em]">
                  Converse con un equipo que entiende la operación del
                  laboratorio.
                </h2>
              </div>
              <Button asChild className="w-fit shrink-0 rounded-[2px] px-7 uppercase tracking-[0.12em]">
                <Link href="/contacto">Iniciar consulta</Link>
              </Button>
            </div>
          </Reveal>
        </section>

        <section className="px-5 py-20 sm:px-8 md:py-24 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-wide">
              <div className="max-w-2xl">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-primary">
                  Comentarios frecuentes
                </p>
                <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4vw,4rem)] font-black leading-[0.98] tracking-[-0.02em] text-ink">
                  Lo que suele importar antes de tomar una decisión.
                </h2>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {frequentComments.map((comment, index) => (
                  <Reveal key={comment.text} delay={index * 0.08}>
                    <article className="flex h-full flex-col justify-between rounded-[24px] border border-ink-border bg-white p-8">
                      <p className="text-pretty text-xl font-semibold leading-9 text-ink md:text-2xl md:leading-10">
                        “{comment.text}”
                      </p>
                      <p className="mt-8 border-t border-ink-border pt-5 text-sm font-medium leading-7 text-ink-dark">
                        {comment.context}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
