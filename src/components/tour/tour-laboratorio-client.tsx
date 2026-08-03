"use client";

import { ArrowRight, CheckCircle, ShieldCheck, Signpost } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Reveal } from "@/components/motion/reveal";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";

const labAreas = [
  {
    id: "cromatografia",
    title: "SALA DE CROMATOGRAFÍA HPLC / GC",
    description: "Equipamiento analítico de alta sensibilidad para separación de compuestos organolépticos y trazas.",
    image: "/proyectos/gallery-seremi.jpg",
  },
  {
    id: "elemental",
    title: "ANÁLISIS ELEMENTAL & DUMAS",
    description: "Determinación de nitrógeno y proteínas por método Dumas y digestión de muestras minerales.",
    image: "/proyectos/hero-equipo-tecnico-faena.jpg",
  },
  {
    id: "balanzas",
    title: "SALA DE BALANZAS DE PRECISIÓN",
    description: "Aislamiento antivibratorio con control térmico y humedad para pesajes de alta exactitud.",
    image: "/proyectos/about-tecnico-sala-balanzas.jpg",
  },
  {
    id: "extraccion",
    title: "SISTEMAS DE EXTRACCIÓN Y GASES",
    description: "Campanas EAA resistentes a corrosión con paneles de gases especiales y sensores de presión.",
    image: "/proyectos/gallery-sqm.jpg",
  },
  {
    id: "preparacion",
    title: "PREPARACIÓN Y DIGESTIÓN ÁCIDA",
    description: "Estaciones técnicas para manipulación segura de reactivos concentrados y matriz de muestras.",
    image: "/proyectos/gallery-labocar.jpg",
  },
  {
    id: "calificacion",
    title: "SOPORTE Y CALIFICACIÓN ISO 17025",
    description: "Servicios de validación de procesos, protocolos IQ/OQ/PQ y trazabilidad metrológica.",
    image: "/proyectos/gallery-bureau.jpg",
  },
];

const tickerItems = [
  "CROMATOGRAFÍA HPLC & GC",
  "ANÁLISIS ELEMENTAL DUMAS",
  "SALA DE BALANZAS DE ALTA PRECISIÓN",
  "ESPECTROMETRÍA DE MASAS",
  "REQUISITOS NCh-ISO/IEC 17025",
  "MONTAJE EN FAENA EN TODO CHILE",
  "SISTEMAS DE EXTRACCIÓN EAA Y GASES",
];

export function TourLaboratorioClient() {
  return (
    <div className="flex min-h-dvh flex-col justify-between bg-[#0A0A0A] text-white selection:bg-[#E65C19] selection:text-white font-sans">
      <Navigation />

      <main id="main-content" className="flex-grow pt-16">
        {/* SECTION 1: HERO (DARK INDUSTRIAL #0A0A0A) */}
        <section className="relative overflow-hidden bg-[#0A0A0A] pb-16 pt-10 md:pb-24 md:pt-14">
          {/* Subtle Warm Orange Glow Background */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E65C19]/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#E65C19]/08 blur-[140px]" />

          <div className="mx-auto max-w-[1320px] px-5">
            <header className="mx-auto max-w-4xl text-center">
              <Reveal>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#E65C19]">
                  + TOUR VIRTUAL DE LABORATORIO
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.08]">
                  INFRAESTRUCTURA ANALÍTICA DE VANGUARDIA
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
                  Explore nuestro laboratorio en un recorrido interactivo 360°. Conozca las estaciones de cromatografía, salas de balanzas, espectrometría y preparación de muestras.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contacto"
                    className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-[#E65C19] px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-[#c84d12] hover:shadow-[#E65C19]/25 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E65C19]"
                  >
                    AGENDAR TOUR PRESENCIAL
                    <ArrowRight size={16} weight="bold" />
                  </Link>

                  <a
                    href="#areas-laboratorio"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#262626] bg-[#121212]/80 px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-all duration-300 hover:border-[#E65C19] hover:bg-[#E65C19]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E65C19]"
                  >
                    EXPLORAR ÁREAS
                  </a>
                </div>
              </Reveal>
            </header>

            {/* 360 PANORAMA VIEWER SHOWCASE */}
            <div className="mt-10">
              <PanoramaViewer />
            </div>
          </div>
        </section>

        {/* SECTION 2: TICKER BAR (SOLID PRIMARY ORANGE #E65C19) */}
        <section className="relative z-10 w-full overflow-hidden bg-[#E65C19] py-3.5 text-white">
          <div className="flex w-max animate-marquee items-center gap-8 font-display text-xs font-extrabold uppercase tracking-widest sm:text-sm">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="h-2 w-2 rounded-full bg-white/60" />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: ABOUT SPLIT SECTION (DARK SECONDARY #121212) */}
        <section className="border-t border-[#262626] bg-[#121212] py-16 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Left Pane: Image + Overlay Badge */}
              <Reveal>
                <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#262626] bg-[#0A0A0A] shadow-2xl">
                    <Image
                      src="/proyectos/gallery-bureau.jpg"
                      alt="Infraestructura analítica Del Carpio"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Overlay Badge at Bottom Right Corner */}
                  <div className="absolute -bottom-6 -right-2 z-10 flex items-center gap-3.5 rounded-2xl border border-[#E65C19]/40 bg-[#0A0A0A] p-4 sm:p-5 shadow-2xl backdrop-blur-md">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E65C19] text-white shadow-md">
                      <ShieldCheck size={26} weight="bold" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-black uppercase tracking-wider text-[#E65C19]">
                        100% TECNOLOGÍA CERTIFICADA
                      </p>
                      <p className="font-sans text-xs text-slate-300">
                        Equipamiento y soporte cualificado NCh-ISO 17025
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Pane: Content */}
              <Reveal delay={0.12}>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E65C19]">
                    + SOBRE NUESTRA INFRAESTRUCTURA
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl md:text-4xl">
                    REFERENCIA EN CAPACIDADES ANALÍTICAS Y CONTROL EN CHILE
                  </h2>

                  <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                    Del Carpio integra infraestructura técnica de laboratorio diseñada bajo especificaciones de alta precisión. Desde redes de gases ultrapuros y extracción EAA hasta espectrometría y cromatografía de nivel industrial.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    Cada estación responde a normativas internacionales de seguridad y repetibilidad, asegurando que la puesta en marcha cumpla rigurosos criterios de trazabilidad en terreno.
                  </p>

                  <ul className="mt-8 flex flex-col gap-3.5">
                    {[
                      "Equipamiento de alta precisión HPLC, GC y Espectrometría de Masas",
                      "Ambientes con temperatura y humedad controlada para salas de balanzas",
                      "Sistemas de extracción EAA y redes de gases industriales con alarma",
                      "Instalación, soporte técnico y trazabilidad NCh-ISO 17025",
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                        <span className="size-2 shrink-0 rounded-full bg-[#E65C19]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 4: SERVICES / LAB AREAS SECTION (SOLID DARK #0A0A0A) */}
        <section id="areas-laboratorio" className="border-t border-[#262626] bg-[#0A0A0A] py-16 md:py-24">
          <div className="mx-auto max-w-[1320px] px-5">
            {/* Header Row */}
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Reveal>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E65C19]">
                    + NUESTRAS ÁREAS Y EQUIPOS
                  </span>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl md:text-4xl">
                    ÁREAS DEL LABORATORIO
                  </h2>
                </Reveal>
              </div>

              <Reveal delay={0.12}>
                <Link
                  href="/contacto"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#262626] bg-[#121212] px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:border-[#E65C19] hover:bg-[#E65C19]/10"
                >
                  AGENDAR VISITA PRESENCIAL
                  <ArrowRight size={15} weight="bold" />
                </Link>
              </Reveal>
            </div>

            {/* 3 columns x 2 rows Grid (6 Cards total) */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {labAreas.map((area, index) => (
                <Reveal key={area.id} delay={index * 0.06}>
                  <div className="group relative flex h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-[#262626] bg-[#121212] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#E65C19] hover:shadow-2xl hover:shadow-[#E65C19]/10">
                    {/* Dark Industrial Image Background */}
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                    {/* Bottom-left aligned text */}
                    <div className="relative z-10">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#E65C19]">
                        ÁREA 0{index + 1}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-extrabold uppercase leading-snug text-white transition-colors duration-200 group-hover:text-[#E65C19]">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300 font-sans line-clamp-2">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: DIFFERENTIATORS PREVIEW / FOOTER TOP (DARK WITH WARM ORANGE GLOW) */}
        <section className="relative overflow-hidden border-t border-[#262626] bg-gradient-to-b from-[#0A0A0A] via-[#121212] to-[#E65C19]/15 py-20 text-white md:py-28">
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#E65C19]/20 to-transparent" />

          <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
            <Reveal>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E65C19]">
                + VENTAJA COMPETITIVA
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl md:text-5xl">
                ¿POR QUÉ AGENDAR UN TOUR EN DEL CARPIO?
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base font-sans">
                Acompañamos a laboratorios industriales, mineros y académicos en la configuración completa de sus espacios. Compruebe en terreno la calidad del mobiliario, la disposición de redes analíticas y el soporte técnico especializado.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-[#E65C19] px-8 py-4 font-display text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:bg-[#c84d12] hover:shadow-[#E65C19]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E65C19]"
                >
                  SOLICITAR EVALUACIÓN TÉCNICA
                  <ArrowRight size={16} weight="bold" />
                </Link>

                <Link
                  href="/contacto/proyectos"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#262626] bg-[#0A0A0A]/90 px-8 py-4 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur transition-all duration-300 hover:border-[#E65C19] hover:bg-[#E65C19]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E65C19]"
                >
                  CONTACTAR ESPECIALISTA
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
