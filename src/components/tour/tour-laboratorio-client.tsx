"use client";

import { ArrowRight, Compass, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Reveal } from "@/components/motion/reveal";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";

export function TourLaboratorioClient() {
  return (
    <div className="flex min-h-dvh flex-col justify-between bg-[#FAF9F8] text-[#1A1A1A] font-sans selection:bg-[#5A534F] selection:text-white">
      {/* HEADER / NAVIGATION */}
      <Navigation />

      <main id="main-content" className="flex-grow pt-20">
        {/* HERO SECTION (PAGE BACKGROUND #FAF9F8) */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-16 pt-6 md:pb-24 md:pt-10 bg-[#FAF9F8]">
          <div className="mx-auto max-w-[1360px]">
            {/* HERO OVERLAY TITLE HEADER */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
              <Reveal>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#F0F0F0] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#5A534F]">
                    <Sparkle size={14} className="text-[#D6532B]" />
                    TOUR VIRTUAL DE LABORATORIO
                  </span>
                  <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] max-w-3xl leading-[1.08]">
                    Infraestructura analítica para decisiones de alta precisión.
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#5A534F] px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#1A1A1A] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A534F] self-start md:self-end shrink-0"
                >
                  AGENDAR VISITA PRESENCIAL
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </Reveal>
            </div>

            {/* MAIN SHOWCASE AREA WITH MASSIVE ROUNDED CORNERS AND FLOATING CARDS */}
            <div className="relative mt-6">
              {/* LARGE FULL-WIDTH MAIN SHOWCASE WITH MASSIVE ROUNDED CORNERS */}
              <Reveal>
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1A1A1A] shadow-2xl border border-black/5">
                  <PanoramaViewer />
                </div>
              </Reveal>

              {/* OVERLAY FLOATING CARDS WITH LARGE ROUNDED CORNERS */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {/* BOTTOM LEFT FLOATING CARD */}
                <Reveal delay={0.12}>
                  <div className="flex items-center gap-4 rounded-3xl bg-white p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/5 transition-transform hover:-translate-y-1">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#F0F0F0]">
                      <Image
                        src="/proyectos/gallery-seremi.jpg"
                        alt="Equipamiento analítico"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-[#1A1A1A]">
                        Equipamiento analítico de alta precisión
                      </p>
                      <p className="font-sans text-xs text-[#5A534F] mt-0.5">
                        Cromatografía HPLC, GC y salas de balanzas aisladas
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* BOTTOM RIGHT FLOATING CARD */}
                <Reveal delay={0.18}>
                  <div className="flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/5 transition-transform hover:-translate-y-1">
                    {/* 3 PILL-SHAPED CATEGORY TAGS */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="rounded-full bg-[#F0F0F0] px-3 py-1 font-mono text-[11px] font-bold text-[#5A534F]">
                        Cromatografía
                      </span>
                      <span className="rounded-full bg-[#F0F0F0] px-3 py-1 font-mono text-[11px] font-bold text-[#5A534F]">
                        Balanzas
                      </span>
                      <span className="rounded-full bg-[#F0F0F0] px-3 py-1 font-mono text-[11px] font-bold text-[#5A534F]">
                        Extracción EAA
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display text-base font-extrabold text-[#1A1A1A]">
                          Infraestructura Certificada ISO 17025
                        </h3>
                        <p className="font-sans text-xs text-[#5A534F] mt-0.5">
                          Trazabilidad analítica y control de procesos en terreno
                        </p>
                      </div>

                      <Link
                        href="/contacto/proyectos"
                        aria-label="Ver proyectos"
                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#5A534F] text-white transition-all hover:bg-[#1A1A1A] hover:scale-105"
                      >
                        <Compass size={20} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT COMPANY / INFRAESTRUCTURA (TWO-COLUMN SPLIT, PAGE BG #FAF9F8) */}
        <section className="border-t border-black/5 bg-[#FAF9F8] py-16 md:py-24">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              {/* LEFT COLUMN: HEADINGS & METRICS ROW */}
              <div className="flex flex-col">
                <Reveal>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D6532B]">
                    DEL CARPIO ANALÍTICA
                  </span>
                  <h2 className="mt-3 font-display text-3xl font-extrabold text-[#1A1A1A] sm:text-4xl md:text-5xl leading-tight">
                    Infraestructura técnica para decisiones de alta precisión.
                  </h2>
                </Reveal>

                {/* ROW OF 3 LIGHT GRAY ROUNDED CARDS WITH STAT NUMBERS */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { number: "300+", label: "Proyectos ejecutados en Chile" },
                    { number: "55", label: "Faenas mineras e industriales" },
                    { number: "21", label: "Años de especialización técnica" },
                  ].map((stat, idx) => (
                    <Reveal key={idx} delay={idx * 0.08}>
                      <div className="flex flex-col justify-center rounded-3xl bg-[#F0F0F0] p-5 border border-black/5 text-center sm:text-left transition-transform hover:-translate-y-1">
                        <span className="font-display text-3xl sm:text-4xl font-black text-[#5A534F]">
                          {stat.number}
                        </span>
                        <span className="mt-2 font-sans text-xs font-semibold text-[#5A534F] leading-snug">
                          {stat.label}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: 3 PARAGRAPHS */}
              <div className="flex flex-col justify-center lg:pt-4 text-[#1A1A1A] space-y-6">
                <Reveal delay={0.06}>
                  <p className="font-display text-lg font-bold leading-relaxed text-[#1A1A1A]">
                    En Del Carpio desarrollamos espacios analíticos donde cada detalle técnico responde a exigencias normativas y operativas de alta frecuencia.
                  </p>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-[#5A534F]">
                    Nuestra infraestructura física e instrumental integra salas de cromatografía, áreas de balanzas aisladas térmicamente, campanas de extracción EAA y redes de gases ultrapuros con monitoreo de presión continuo.
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-[#5A534F]">
                    A través de este tour virtual, clientes industriales, mineros y académicos pueden explorar el diseño interior, la ergonomía de estaciones de trabajo y la calidad de los acabados técnicos antes de una visita presencial.
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="pt-2">
                    <Link
                      href="/contacto"
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#5A534F] px-7 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#1A1A1A] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A534F]"
                    >
                      SOLICITAR CONSULTA TÉCNICA
                      <ArrowRight size={16} weight="bold" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
