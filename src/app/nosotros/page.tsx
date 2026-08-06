import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";
import { PipeCornerAccent } from "@/components/ui/pipe-corner-accent";

export const metadata: Metadata = {
  title: "Nosotros | Del Carpio Analisis y Asesorias",
  description:
    "31 anos acompanando a laboratorios en Chile con instrumentacion analitica, desarrollo de metodos y proyectos integrales.",
  alternates: { canonical: "/nosotros" },
};

const beliefs = [
  {
    number: "1",
    title: "Mision",
    body:
      "Satisfacer las necesidades de nuestros clientes con equipos de la mas alta gama de instrumentacion analitica, un servicio tecnico y de aplicaciones de excelencia, y un asesoramiento completo desde el diseno del laboratorio hasta su implementacion y habilitacion.",
  },
  {
    number: "2",
    title: "Vision",
    body:
      "Ser una empresa de excelencia para estar presentes en cada laboratorio de Chile, teniendo a los clientes mas satisfechos del mercado.",
  },
  {
    number: "3",
    title: "Propuesta de valor",
    body:
      "Entregar excelencia a nuestros clientes, siendo la unica empresa del mercado capaz de desarrollar un proyecto de laboratorio completo, desde su diseno y planificacion hasta su completa habilitacion, ofreciendo la mejor tecnologia disponible en equipos de instrumentacion y otorgando un servicio tecnico y soporte analitico de primera.",
  },
];

const operatingComments = [
  {
    quote:
      "Simplificar y optimizar la preparacion de muestras tambien es una forma de mejorar la precision del resultado.",
    author: "Del Carpio",
    role: "Experiencia aplicada",
  },
  {
    quote:
      "No somos solo un proveedor de equipos. Somos una solucion integral de principio a fin.",
    author: "Del Carpio",
    role: "Compromiso tecnico",
  },
  {
    quote:
      "Cada proyecto se orienta a resultados optimos, precisos y confiables, sea cual sea su objetivo.",
    author: "Del Carpio",
    role: "Propuesta de valor",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-dvh bg-ink-bg text-ink">
      <Navigation />

      <main id="main-content">
        <section className="relative isolate min-h-[390px] overflow-hidden bg-[#56616b] pt-24 text-white md:min-h-[480px] md:pt-28 lg:min-h-[540px]">
          <video
            autoPlay
            className="absolute inset-0 -z-20 hidden h-full w-full object-cover object-center md:block"
            loop
            muted
            playsInline
            poster="/fotos/nosotros-hero-poster.jpg"
            preload="metadata"
          >
            <source src="/video/nosotros-hero.mp4" type="video/mp4" />
          </video>
          <Image
            alt="Edificio corporativo de Del Carpio"
            className="-z-20 object-cover object-center md:hidden"
            fill
            priority
            sizes="100vw"
            src="/fotos/nosotros-hero-poster.jpg"
          />
          <div className="absolute inset-0 -z-10 bg-[#56616b]/55" />

          <div className="mx-auto flex min-h-[390px] w-full max-w-7xl flex-col justify-center px-5 pb-12 sm:px-8 md:min-h-[480px] md:pb-14 lg:min-h-[540px] lg:px-10">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-10">
                <ol className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white/75">
                  <li>
                    <Link className="transition-colors hover:text-white" href="/">
                      Inicio
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-primary">
                    /
                  </li>
                  <li aria-current="page">Nosotros</li>
                </ol>
              </nav>

              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/75">
                </p>
                <h1 className="mt-4 max-w-2xl text-balance font-display text-[clamp(2.3rem,5vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                  Nosotros
                </h1>
                <p className="mt-5 max-w-xl text-pretty text-sm font-medium leading-7 text-white/84 md:text-base md:leading-8">
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative mx-auto grid max-w-7xl gap-12 overflow-hidden px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-10">
          <PipeCornerAccent corner="top-right" size="sm" />

          <Reveal className="max-w-xl">
            <h2 className="text-[clamp(2.1rem,4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
              Quienes somos
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-ink-dark md:text-base md:leading-8">
              <p>
                En Del Carpio llevamos 31 anos ayudando a los laboratorios en
                Chile a llevar a cabo sus proyectos, desde simplificar y
                optimizar la preparacion de muestras hasta desarrollar y montar
                metodos analiticos complejos.
              </p>
              <p>
                Somos mucho mas que un proveedor de equipos. Somos una solucion
                integral de principio a fin, poniendo toda nuestra experiencia y
                conocimiento para que cada cliente logre resultados optimos,
                precisos y confiables.
              </p>
            </div>

            <div className="mt-10 border-t border-ink-border/70 pt-6">
              <div className="flex items-end gap-3 md:gap-4">
                <span className="text-[clamp(3.25rem,7vw,5.5rem)] font-extrabold leading-[0.84] tracking-[-0.06em] text-primary">
                  31
                </span>
                <div className="pb-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                    anos de experiencia
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-7 text-ink-dark">
                    Instrumentacion, metodos y soporte tecnico para
                    laboratorios en Chile.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-[0.92fr_1.08fr]">
              <div className="grid gap-4">
                <div className="relative aspect-[1.3/1] overflow-hidden rounded-[18px]">
                  <Image
                    alt="Equipo tecnico de Del Carpio en laboratorio"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 280px"
                    src="/fotos/MG_1527.jpg"
                  />
                </div>
                <div className="relative aspect-[1.3/1] overflow-hidden rounded-[18px]">
                  <Image
                    alt="Instalacion de campana y equipamiento tecnico"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 280px"
                    src="/fotos/instalacion-campana.jpg"
                  />
                </div>
              </div>

              <div className="relative min-h-[340px] overflow-hidden rounded-[22px]">
                <Image
                  alt="Especialista de Del Carpio operando instrumentacion analitica"
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 340px"
                  src="/fotos/instalacion-hplc-operador.jpg"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className="bg-[#f6f1e8]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-10">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                </p>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
                  La forma en que entendemos el laboratorio.
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {beliefs.map((belief, index) => (
                <Reveal delay={index * 0.06} key={belief.number}>
                  <article className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[10px] bg-ink text-lg font-extrabold text-white">
                      {belief.number}
                    </div>
                    <h3 className="mt-5 text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
                      {belief.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-ink-dark">
                      {belief.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1c1918] text-white">
          <Reveal>
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16 lg:px-10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Trayectoria
                </p>
                <h2 className="mt-4 max-w-lg text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
                  Nuestra Historia
                </h2>
                <div className="mt-7 max-w-xl space-y-5 text-sm leading-7 text-white/78 md:text-base md:leading-8">
                  <p>
                    Del Carpio ha construido su experiencia acompanando proyectos
                    analiticos desde la seleccion del equipo hasta la
                    implementacion, validacion y continuidad operativa.
                  </p>
                  <p>
                    La relacion con cada laboratorio parte en la necesidad real y
                    termina cuando el sistema puede sostenerse con respaldo
                    tecnico, documental y humano.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative mx-auto aspect-[1.15/1] max-w-[520px] overflow-hidden rounded-[22px] bg-white/5">
                  <Image
                    alt="Equipo Del Carpio"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    src="/fotos/equipo-del-carpio.jpg"
                  />
                </div>

                <div className="border-t border-white/12 pt-8 text-center">
                  <blockquote className="mx-auto max-w-3xl text-balance text-[clamp(1.3rem,2.2vw,2rem)] font-semibold leading-[1.45] tracking-[-0.02em] text-white">
                    "Somos mucho mas que un proveedor de equipos. Somos una
                    solucion integral de principio a fin."
                  </blockquote>
                  <p className="mt-5 text-sm font-semibold text-white">
                    Del Carpio
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/52">
                    Analisis y asesorias
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="bg-white/85">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-10">
            <Reveal>
              <div className="grid gap-8 border-t border-ink-border/75 pt-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                    Comentarios
                  </p>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-ink-dark">
                    Tres ideas que explican por que el trabajo tecnico de Del
                    Carpio no parte en el catalogo, sino en la condicion real
                    del laboratorio.
                  </p>
                </div>

                <div className="md:col-span-8">
                  <h2 className="max-w-5xl text-[clamp(2.2rem,4.6vw,4.5rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-ink">
                    Lo que se recuerda de Del Carpio no es el discurso.
                    <span className="block text-primary">
                      Es el criterio con que responde.
                    </span>
                  </h2>
                </div>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-10">
              <Reveal className="md:col-span-7" delay={0}>
                <article className="flex h-full flex-col justify-between border-t border-ink-border/75 pt-6 md:min-h-[440px] md:pr-12">
                  <p className="max-w-3xl text-[clamp(2rem,3.25vw,4rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink">
                    {operatingComments[0].quote}
                  </p>

                  <div className="mt-10 flex items-end justify-between gap-6 border-t border-ink-border/55 pt-4">
                    <div>
                      <p className="text-sm font-extrabold text-ink">
                        {operatingComments[0].author}
                      </p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                        {operatingComments[0].role}
                      </p>
                    </div>

                    <span className="hidden h-px w-16 bg-primary/55 md:block" />
                  </div>
                </article>
              </Reveal>

              <Reveal className="md:col-span-5" delay={0.08}>
                <div className="flex h-full flex-col divide-y divide-ink-border/75 border-t border-ink-border/75">
                  {operatingComments.slice(1).map((comment, index) => (
                    <article
                      className="flex flex-1 flex-col justify-between py-6 first:pt-6 last:pb-4"
                      key={comment.quote}
                    >
                      <p className="max-w-lg text-[clamp(1.2rem,1.7vw,1.7rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
                        {comment.quote}
                      </p>

                      <div className="mt-8">
                        <p className="text-sm font-extrabold text-ink">
                          {comment.author}
                        </p>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                          {comment.role}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[26px] bg-[#111111] px-6 py-14 text-center text-white sm:px-10 md:px-14 md:py-16">
              <h2 className="mx-auto max-w-2xl text-balance text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.04em]">
                Orientacion diaria disenada para objetivos reales de
                laboratorio.
              </h2>
              <Button asChild className="mt-8 min-h-11 px-7">
                <Link href="/contacto">Contactanos</Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
