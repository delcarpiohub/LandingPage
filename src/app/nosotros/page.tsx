import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";

import { ClientsBanner } from "./clients-banner";
import { TestimonialsMarquee } from "./testimonials-marquee";

export const metadata: Metadata = {
  title: "Nosotros | Del Carpio Análisis y Asesorías",
  description:
    "31 años acompañando a laboratorios en Chile con instrumentación analítica, desarrollo de métodos y proyectos integrales.",
  alternates: { canonical: "/nosotros" },
};

const operatingPrinciples = [
  {
    title: "MISIÓN",
    body:
      "“Satisfacer las necesidades de nuestros clientes con los equipos de la más alta gama de instrumentación analítica, un servicio técnico y de aplicaciones de excelencia, y un asesoramiento completo desde el diseño del laboratorio hasta su implementación y habilitación”.",
  },
  {
    title: "VISIÓN",
    body:
      "“Ser una empresa de excelencia para estar presentes en cada laboratorio de Chile, teniendo a los clientes más satisfechos del mercado”.",
  },
  {
    title: "PROPUESTA DE VALOR",
    body:
      "Entregar excelencia a nuestros clientes, siendo la única empresa del mercado capaz de desarrollar un proyecto de laboratorio completo, desde su diseño y planificación, hasta su completa habilitación; ofreciendo la mejor tecnología disponible en equipos de instrumentación; y otorgando un servicio técnico y soporte analítico de primera.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-dvh bg-ink-bg/70 text-ink">
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

              <h1 className="mt-5 text-balance font-display text-[clamp(2.65rem,5.2vw,5.25rem)] font-extrabold leading-[0.96] tracking-[-0.045em]">
                <span className="text-primary [text-shadow:_0_2px_10px_rgba(0,0,0,0.75)]">31 años</span> acompañando proyectos de laboratorio.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-sm font-medium leading-7 text-white/88 md:text-base md:leading-8">
                Desde simplificar y optimizar la preparación de muestras, hasta el desarrollo y montaje de métodos analíticos complejos para aplicaciones revolucionarias.      
              </p>
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

        <section className="relative bg-[var(--background)] py-16 sm:py-20 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-12 items-start">
              {/* Columna Izquierda: Nuestra Historia */}
              <Reveal className="lg:col-span-5">
                <h2 className="font-display text-[32px] sm:text-[40px] md:text-[46px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink">
                  NUESTRA<br />HISTORIA
                </h2>
                <p className="mt-6 text-sm sm:text-[14.5px] leading-relaxed text-ink-dark">
                  En Del Carpio, llevamos 31 años ayudando a los laboratorios en Chile a llevar a cabo sus proyectos,
                  desde simplificar y optimizar la preparación de muestras,
                  hasta el desarrollo y montaje de métodos analíticos complejos para aplicaciones revolucionarias.
                </p>
                <p className="mt-5 text-sm sm:text-[14.5px] leading-relaxed text-ink-dark">
                  Somos mucho más que un proveedor de equipos, somos una solución integral de principio a fin,
                  poniendo toda nuestra experiencia y conocimiento para que cada uno de nuestros clientes logre resultados óptimos,
                  precisos y confiables, sea cual sea su objetivo.
                </p>
              </Reveal>

              {/* Columna Derecha: Misión, Visión, Propuesta de Valor */}
              <Reveal className="lg:col-span-7" delay={0.08}>
                <div className="divide-y divide-ink-border/50">
                  {operatingPrinciples.map((principle) => (
                    <article
                      className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12 sm:gap-6 first:pt-0 last:pb-0"
                      key={principle.title}
                    >
                      <div className="sm:col-span-4">
                        <h3 className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                          {principle.title}
                        </h3>
                      </div>
                      <div className="sm:col-span-8">
                        <p className="text-xs sm:text-[13.5px] leading-relaxed text-ink-dark font-medium">
                          {principle.body}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <ClientsBanner />
        <TestimonialsMarquee />
      </main>

      <Footer />
    </div>
  );
}
