"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  DoorOpen,
  MapPin,
  Play,
  Siren,
  Table,
  Wind,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    src: "/proyectos/hero-equipo-tecnico-faena.jpg",
    alt: "Equipo técnico Del Carpio con chaleco reflectante y casco trabajando junto a campanas de extracción en un laboratorio de faena minera",
  },
  {
    src: "/proyectos/about-tecnico-sala-balanzas.jpg",
    alt: "Técnico Del Carpio ingresando a la sala de balanzas de un laboratorio recién instalado en faena minera",
  },
];

const scopeItems = [
  "Mobiliario técnico de laboratorio",
  "Líneas de gases con alarma",
  "Sistemas de extracción EAA",
  "Puertas y ventanas técnicas",
  "Instalación en faena, todo Chile",
  "Mantención de gases y equipos",
];

const serviceGrid = [
  {
    icon: Table,
    title: "Mobiliario técnico",
    description: "Mesones y estaciones de trabajo a medida.",
  },
  {
    icon: Siren,
    title: "Líneas de gases con alarma",
    description: "Instalación con alarma de seguridad.",
  },
  {
    icon: Wind,
    title: "Sistemas de extracción",
    description: "Campanas EAA y ventilación segura.",
  },
  {
    icon: DoorOpen,
    title: "Puertas y ventanas técnicas",
    description: "Provisión e instalación en laboratorio.",
  },
];

const faenas = [
  { region: "Tarapacá", detail: "SEREMI de Salud" },
  { region: "Atacama", detail: "Faenas CMP" },
  { region: "Coquimbo", detail: "Faena El Romeral" },
  { region: "Región Metropolitana", detail: "Casa matriz" },
];

function useSlider(length: number, autoPlayInterval?: number) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);

  useEffect(() => {
    if (!autoPlayInterval) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, next]);

  return { index, next, prev, setIndex };
}

export function ProyectosPageClient() {
  const reduceMotion = useReducedMotion();
  const hero = useSlider(heroSlides.length, 5000);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-dvh bg-white">
      <Navigation />
      <main id="main-content">
        {/* HERO */}
        <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#101820] text-white sm:min-h-[680px] lg:min-h-[760px]">
          <div className="absolute inset-0 z-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={hero.index}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[hero.index].src}
                  alt={heroSlides[hero.index].alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(16,24,32,0.94)] via-[rgba(16,24,32,0.62)] to-[rgba(16,24,32,0.16)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#101820] to-transparent" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 text-left sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#D6532B]">
                Proyectos de laboratorio completo
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Laboratorios completos. Ejecutados en terreno.
              </h1>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button asChild>
                  <Link href="/contacto/proyectos">
                    Cotizar un proyecto
                    <ArrowRight size={17} weight="bold" />
                  </Link>
                </Button>
                <Button asChild variant="ghost-white">
                  <a href="#casos-ejecutados">Ver casos ejecutados</a>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Slider arrows */}
          <div className="absolute bottom-6 right-5 z-10 flex items-center gap-2 lg:bottom-10 lg:right-10">
            <span className="sr-only" aria-live="polite">
              {`Foto ${hero.index + 1} de ${heroSlides.length}`}
            </span>
            <button
              type="button"
              onClick={hero.prev}
              aria-label="Foto anterior"
              className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              onClick={hero.next}
              aria-label="Foto siguiente"
              className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
            >
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </section>

        {/* ABOUT SPLIT - REDESIGN */}
        <section id="casos-ejecutados" className="border-b border-[var(--border)] bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              
              {/* Left Column: Images / Video */}
              <Reveal delay={0.08}>
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  {/* Main Image */}
                  <div className="relative aspect-[4/5] w-[85%] overflow-hidden bg-[#F4F4F4]">
                    <Image
                      src="/proyectos/about-tecnico-sala-balanzas.jpg"
                      alt="Técnico Del Carpio ingresando a la sala de balanzas"
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Overlapping Video / Secondary Image */}
                  <div className="absolute -bottom-8 -right-4 z-10 w-[60%] lg:-right-8">
                    <div className="relative aspect-[4/3] overflow-hidden border-[8px] border-white bg-white shadow-2xl">
                      {isVideoPlaying ? (
                        <video
                          controls
                          autoPlay
                          poster="/proyectos/video-instalacion-faena-poster.jpg"
                          src="/proyectos/video-instalacion-faena.mp4"
                          className="size-full object-cover"
                        />
                      ) : (
                        <>
                          <Image
                            src="/proyectos/hero-equipo-tecnico-faena.jpg"
                            alt="Video de instalación"
                            fill
                            sizes="30vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-[#D6532B]/30 mix-blend-multiply" />
                          <button
                            type="button"
                            onClick={() => setIsVideoPlaying(true)}
                            className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#D6532B] shadow-xl transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                            aria-label="Reproducir video"
                          >
                            <Play size={24} weight="fill" className="translate-x-0.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Decorative lines */}
                  <div className="absolute -top-4 right-10 flex flex-col gap-2">
                    <div className="h-8 w-1.5 bg-[#D6532B]" />
                    <div className="h-4 w-1.5 bg-[#101820]" />
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Text & List */}
              <Reveal>
                <div className="flex flex-col text-left lg:pl-10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D6532B]">
                    <span className="h-3 w-0.5 bg-[#D6532B]" />
                    QUÉ HACEMOS
                  </div>
                  <h2 className="mt-4 text-4xl font-extrabold leading-[1.15] text-[#101820] sm:text-5xl">
                    Ejecutamos laboratorios completos.
                  </h2>
                  <p className="mt-6 text-[15px] leading-relaxed text-[#4A5560]/90">
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4">
                    {scopeItems.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-[#D6532B]" />
                        <span className="text-[15px] font-semibold text-[#4A5560]">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Info Cards Row */}
                  <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#D6532B]">
                      <span className="text-4xl font-black text-[#D6532B]">25</span>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820]">
                        Años de<br />Experiencia
                      </span>
                    </div>
                    <div className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#D6532B]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D6532B]/10 text-[#D6532B]">
                        <MapPin size={22} weight="fill" />
                      </div>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820]">
                        Servicio de<br />Excelencia
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bottom Row: Stats */}
            <Reveal delay={0.12}>
              <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[var(--border)] pt-16 sm:grid-cols-4">
                {[
                  { num: "35+", label: "PROYECTOS COMPLETADOS" },
                  { num: "100%", label: "CLIENTES SATISFECHOS" },
                  { num: "24/7", label: "SOPORTE TÉCNICO" },
                  { num: "4+", label: "FAENAS ACTIVAS" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="relative">
                      {/* Circular blob behind text */}
                      <div className="absolute -left-2 -top-1 size-8 rounded-full bg-[#D6532B]/15" />
                      <span className="relative text-4xl font-black tracking-tighter text-[#101820]">{stat.num}</span>
                    </div>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#4A5560]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPEDIENTE DE EJECUCIÓN */}
        <section
          id="evidencia-ejecucion"
          className="border-y border-[#E8E8E8] bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 md:py-12 lg:px-10">
            <Reveal>
              <header className="grid gap-4 border-b border-[#E8E8E8] pb-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end">
                <h2 className="max-w-lg text-2xl font-extrabold leading-[1.12] text-[#333333] sm:text-3xl">
                  Del contrato a una instalación operativa.
                </h2>
                <p className="max-w-[62ch] text-sm leading-6 text-[#666666] md:justify-self-end md:text-base md:leading-7">
                </p>
              </header>
            </Reveal>

            <div className="grid md:grid-cols-2 md:divide-x md:divide-[#E8E8E8]">
              <article className="py-5 md:pr-8">
                <figure>
                  <div className="relative overflow-hidden" style={{ height: 190 }}>
                    <Image
                      src="/proyectos/feature-4-mesones-tarapaca.jpg"
                      alt="Mesón y muebles de laboratorio instalados para la SEREMI de Salud Región de Tarapacá"
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs font-medium leading-4 text-[#707E83]">
                  </figcaption>
                </figure>

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D6532B]">
                    SEREMI de Salud · Región de Tarapacá
                  </p>
                  <h3 className="mt-2 max-w-xl text-lg font-bold leading-snug text-[#333333] sm:text-xl">
                    Laboratorio de Salud Pública Ambiental y Laboral
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#666666]">
                    Provisión e instalación de mobiliario técnico.
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#707E83]">
                  </p>
                </div>
              </article>

              <article className="border-t border-[#E8E8E8] py-5 md:border-t-0 md:pl-8">
                <figure>
                  <div className="relative overflow-hidden" style={{ height: 190 }}>
                    <Image
                      src="/proyectos/feature-1-analizador-leco.jpg"
                      alt="Técnico operando un analizador elemental LECO en un laboratorio de faena minera"
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs font-medium leading-4 text-[#707E83]">
                  </figcaption>
                </figure>

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D6532B]">
                    CMP · Proyectos 2025–2026
                  </p>
                  <h3 className="mt-2 max-w-xl text-lg font-bold leading-snug text-[#333333] sm:text-xl">
                    Planta Magnetita · Cerro Negro Norte · Los Colorados · El Romeral
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#666666]">
                    Mobiliario de laboratorio, líneas de gases con alarma, extracción EAA, puertas y ventanas técnicas, y mantención de líneas.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal>
              <h2 className="mx-auto max-w-lg text-center text-3xl font-extrabold leading-tight text-[#4A5560] sm:text-4xl">
                Qué incluye un proyecto completo.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {serviceGrid.map((service, index) => (
                <Reveal key={service.title} delay={index * 0.05}>
                  <article className="flex h-full flex-col items-center rounded-[1rem] border border-[var(--border)] p-6 text-center transition-colors duration-200 hover:border-[#D6532B]">
                    <service.icon size={30} weight="light" className="text-[#D6532B]" />
                    <h3 className="mt-5 text-lg font-bold text-[#4A5560]">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                      {service.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 md:py-20 lg:px-10">
            <Reveal>
              <h2 className="text-3xl font-extrabold text-[#4A5560] sm:text-4xl">
                ¿Necesitas un laboratorio completo?
              </h2>
              <Button asChild className="mt-8">
                <Link href="/contacto/proyectos">
                  Cotizar un proyecto
                  <ArrowRight size={17} weight="bold" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
