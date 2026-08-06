import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nosotros | Del Carpio Análisis y Asesorías",
  description:
    "31 años acompañando a laboratorios en Chile con instrumentación analítica, desarrollo de métodos y proyectos integrales.",
  alternates: { canonical: "/nosotros" },
};

const principles = [
  {
    number: "01",
    title: "Misión",
    body:
      "Satisfacer las necesidades de nuestros clientes con equipos de la más alta gama de instrumentación analítica, un servicio técnico y de aplicaciones de excelencia, y un asesoramiento completo desde el diseño del laboratorio hasta su implementación y habilitación.",
  },
  {
    number: "02",
    title: "Visión",
    body:
      "Ser una empresa de excelencia para estar presentes en cada laboratorio de Chile, teniendo a los clientes más satisfechos del mercado.",
  },
  {
    number: "03",
    title: "Propuesta de valor",
    body:
      "Entregar excelencia a nuestros clientes, siendo la única empresa del mercado capaz de desarrollar un proyecto de laboratorio completo, desde su diseño y planificación hasta su completa habilitación; ofreciendo la mejor tecnología disponible y soporte analítico de primera.",
  },
];

const operatingPrinciples = [
  {
    title: "Matriz antes que catálogo",
    body:
      "Partimos por comprender muestra, interferencias, límite de detección, operación y exigencia documental antes de recomendar un sistema.",
  },
  {
    title: "Método que se puede defender",
    body:
      "La conversación técnica se aterriza en condiciones reproducibles, criterios de validación y trazabilidad para auditorías o control interno.",
  },
  {
    title: "Soporte después de instalar",
    body:
      "La implementación no termina con el equipo encendido. Acompañamos calificación, mantención, consumibles y continuidad operativa.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-dvh bg-ink-bg text-ink">
      <Navigation />

      <main id="main-content">
        <section className="relative isolate min-h-[600px] overflow-hidden bg-ink-dark text-white md:min-h-[660px] lg:min-h-[720px]">
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
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4A5560]/92 via-[#4A5560]/64 to-[#4A5560]/16" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-[#4A5560]/62 to-transparent" />

          <div className="mx-auto flex min-h-[600px] w-full max-w-wide flex-col justify-end px-5 pb-28 pt-20 sm:px-8 md:min-h-[660px] md:pb-32 lg:min-h-[720px] lg:px-10">
            <Reveal className="max-w-2xl">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
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

              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#FBE369]">
                Del Carpio Análisis y Asesorías
              </p>
              <h1 className="mt-5 text-balance font-display text-[clamp(2.65rem,5.2vw,5.25rem)] font-extrabold leading-[0.96] tracking-[-0.045em]">
                31 años acompañando proyectos de laboratorio.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-sm font-medium leading-7 text-white/88 md:text-base md:leading-8">
                Desde la preparación de muestras hasta el desarrollo y montaje
                de métodos analíticos complejos, acompañamos decisiones que
                requieren precisión y continuidad técnica.
              </p>
              <Button asChild className="mt-9">
                <Link href="/contacto">Hablar con un especialista</Link>
              </Button>
            </Reveal>
          </div>

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-[var(--background)] sm:h-20 md:h-24"
            focusable="false"
            preserveAspectRatio="none"
            viewBox="0 0 1440 120"
          >
            <path
              d="M0,40 C150,82 294,87 450,66 C608,45 695,12 856,24 C1020,37 1114,92 1270,77 C1342,70 1399,53 1440,42 L1440,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </section>

        <section className="relative bg-[var(--background)]">
          <div className="mx-auto grid max-w-wide gap-12 px-5 pb-20 pt-9 sm:px-8 md:gap-16 md:pb-28 md:pt-12 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
            <Reveal>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">
                Nuestra forma de acompañar
              </p>
              <h2 className="mt-5 max-w-md text-[clamp(2.2rem,4.2vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                Más criterio técnico desde el inicio.
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-ink-dark">
                En Del Carpio llevamos 31 años ayudando a laboratorios en Chile
                a simplificar y optimizar la preparación de muestras, y a llevar
                adelante proyectos analíticos complejos.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-t border-ink-border">
                {operatingPrinciples.map((principle, index) => (
                  <article
                    className="grid gap-4 border-b border-ink-border py-7 md:grid-cols-[minmax(10rem,0.72fr)_1.28fr] md:gap-8"
                    key={principle.title}
                  >
                    <div className="flex items-start gap-4">
                      <span className="pt-1 text-[11px] font-extrabold tracking-[0.16em] text-primary">
                        0{index + 1}
                      </span>
                      <h3 className="max-w-[13rem] text-lg font-extrabold leading-[1.12] tracking-[-0.025em]">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-ink-dark md:text-base md:leading-8">
                      {principle.body}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink-dark text-white">
          <div className="mx-auto grid max-w-wide gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
            <Reveal className="max-w-md">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#FBE369]">
                Principios que orientan cada proyecto
              </p>
              <h2 className="mt-5 text-[clamp(2.15rem,3.8vw,3.85rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                Tecnología, servicio y asesoría en una misma responsabilidad.
              </h2>
              <p className="mt-6 text-sm leading-7 text-white/78 md:text-base md:leading-8">
                No somos solo un proveedor de equipos. Integramos experiencia,
                conocimiento y acompañamiento para que cada solución responda a
                una necesidad concreta de laboratorio.
              </p>
            </Reveal>

            <div className="divide-y divide-white/15 border-y border-white/15">
              {principles.map((principle, index) => (
                <Reveal delay={index * 0.06} key={principle.number}>
                  <article className="grid gap-5 py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-7">
                    <span className="text-sm font-extrabold tracking-[0.16em] text-[#FBE369]">
                      {principle.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-[-0.025em] text-white">
                        {principle.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                        {principle.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)]">
          <div className="mx-auto grid max-w-wide gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10">
            <Reveal className="relative overflow-hidden rounded-[20px] border border-ink-border bg-white">
              <div className="relative aspect-[4/3]">
                <Image
                  alt="Especialista de Del Carpio operando instrumentación analítica"
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  src="/fotos/laboratorio-metodologia-mg-0795.jpg"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">
                Experiencia aplicada
              </p>
              <h2 className="mt-5 max-w-lg text-[clamp(2.15rem,3.8vw,3.85rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                Cada resultado tiene que sostenerse en operación.
              </h2>
              <div className="mt-7 max-w-xl space-y-5 text-base leading-8 text-ink-dark">
                <p>
                  Cada proyecto se orienta a resultados óptimos, precisos y
                  confiables, sea cual sea su objetivo.
                </p>
                <p>
                  Nuestra participación considera la condición real del
                  laboratorio, desde la selección técnica hasta la continuidad
                  del sistema en terreno.
                </p>
              </div>
              <Button asChild className="mt-9">
                <Link href="/contacto">Conversemos sobre su proyecto</Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
