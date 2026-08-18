"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  DoorOpen,
  MapPin,
  Siren,
  Table,
  Wind,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { CaseStudiesReel, type CaseStudy } from "@/components/sections/case-studies-reel";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    src: "/proyectos/laboratorio-completo-moderno.jpg",
    alt: "Laboratorio analítico completo e integral con mesones de trabajo, campanas e instrumentación instalado por Del Carpio",
  },
  {
    src: "/proyectos/hero-equipo-tecnico-faena.jpg",
    alt: "Equipo técnico Del Carpio con chaleco reflectante y casco trabajando junto a campanas de extracción en un laboratorio de faena minera",
  },
];

const galleryProjects: CaseStudy[] = [
  {
    id: "salud",
    category: "Salud Pública",
    title: "Laboratorio de Salud Pública Ambiental y Laboral",
    location: "SEREMI de Salud · Región de Tarapacá",
    src: "/proyectos/gallery-seremi.jpg",
    alt: "Mesón y muebles de laboratorio instalados para la SEREMI de Salud Región de Tarapacá",
  },
  {
    id: "mineria",
    category: "Minería & Faenas",
    title: "Planta Magnetita · Cerro Negro Norte · Los Colorados · El Romeral",
    location: "CMP · Proyectos 2025–2026",
    src: "/proyectos/gallery-sqm.jpg",
    alt: "Laboratorio completo instalado en faena minera por Del Carpio",
  },
  {
    id: "criminalistica",
    category: "Criminalística",
    title: "Laboratorio de Criminalística Regional Temuco",
    location: "Carabineros de Chile · Región de la Araucanía",
    src: "/proyectos/gallery-labocar.jpg",
    alt: "Equipamiento analítico y mesas de trabajo en Labocar Temuco",
  },
  {
    id: "academia",
    category: "Academia & I+D",
    title: "Facultad de Química y Farmacia",
    location: "Pontificia Universidad Católica de Chile",
    src: "/proyectos/gallery-puc.jpg",
    alt: "Laboratorio docente e investigación en Facultad de Química PUC",
  },
  {
    id: "inspeccion",
    category: "Inspección & Calidad",
    title: "Línea de Distribución de Aire Comprimido y Gases",
    location: "Bureau Veritas · Laboratorio de Certificación",
    src: "/proyectos/gallery-bureau.jpg",
    alt: "Redes de aire comprimido e inspección técnica Bureau Veritas",
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

  return (
    <div className="min-h-dvh bg-white/70">
      <Navigation />
      <main id="main-content">
        {/* HERO PORTADA RESTAURADO - VERSIÓN ANGOSTA */}
        <section className="relative flex min-h-[320px] items-center overflow-hidden bg-[#101820] text-white sm:min-h-[360px] lg:min-h-[400px]">
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
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#101820] to-transparent" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-8 text-left sm:px-8 sm:pt-28 sm:pb-10 lg:px-10 lg:pt-32 lg:pb-12">
            <Reveal>
              <h1 className="max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                Laboratorios completos. Ejecutados en terreno.
              </h1>
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button asChild>
                  <Link href="/contacto/proyectos">
                    Cotizar un proyecto
                    <ArrowRight size={17} weight="bold" />
                  </Link>
                </Button>
                <Button asChild variant="ghost-white">
                  <a href="#evidencia-ejecucion">Ver casos ejecutados</a>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Slider arrows */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 lg:bottom-6 lg:right-8">
            <span className="sr-only" aria-live="polite">
              {`Foto ${hero.index + 1} de ${heroSlides.length}`}
            </span>
            <button
              type="button"
              onClick={hero.prev}
              aria-label="Foto anterior"
              className="grid size-9 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
            >
              <ArrowLeft size={15} weight="bold" />
            </button>
            <button
              type="button"
              onClick={hero.next}
              aria-label="Foto siguiente"
              className="grid size-9 place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
            >
              <ArrowRight size={15} weight="bold" />
            </button>
          </div>
        </section>

        {/* ABOUT SPLIT - REDESIGN */}
        <section className="border-b border-[var(--border)] bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Left Column: Video (Back) & Image (Front) */}
              <Reveal delay={0.08}>
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  {/* Main Video (Atrás) */}
                  <div className="relative aspect-[4/5] w-[85%] overflow-hidden bg-[#101820] shadow-xl">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      src="/proyectos/0722-web-compact.mp4"
                      className="size-full object-cover"
                    />
                  </div>
                  
                  {/* Overlapping Image (Adelante) */}
                  <div className="absolute -bottom-8 -right-4 z-10 w-[60%] lg:-right-8">
                    <div className="relative aspect-[4/3] overflow-hidden border-[8px] border-white bg-white shadow-2xl">
                      <Image
                        src="/proyectos/about-tecnico-sala-balanzas.jpg"
                        alt="Técnico Del Carpio ingresando a la sala de balanzas"
                        fill
                        sizes="30vw"
                        className="object-cover"
                      />
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
                  <h2 className="mt-4 text-4xl font-extrabold leading-[1.15] text-[#101820] sm:text-5xl font-display">
                    Ejecutamos laboratorios completos.
                  </h2>
                  
                  <div className="mt-8 flex flex-col gap-4">
                    {scopeItems.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-[#D6532B]" />
                        <span className="text-[15px] font-semibold text-[#4A5560] font-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Info Cards Row */}
                  <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#D6532B]">
                      <span className="text-4xl font-black text-[#D6532B] font-display">31</span>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820] font-display">
                        Años de<br />Experiencia
                      </span>
                    </div>
                    <div className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#D6532B]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D6532B]/10 text-[#D6532B]">
                        <MapPin size={22} weight="fill" />
                      </div>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820] font-display">
                        Disponibles en<br />Todo Chile
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bottom Row: Stats — ancho completo, alineada con los bordes
                del bloque de 2 columnas de arriba (no una isla mas angosta:
                eso la hacia ver descentrada respecto al checklist/tarjetas
                que llegan hasta el borde derecho del contenedor). Divisores
                verticales finos entre columnas: separan la informacion como
                una tabla de datos real, no decoracion — coherente con el
                resto del sistema (tablas de metodos, sin iconos genericos
                sobre metricas). */}
            <Reveal delay={0.12}>
              <div className="mt-16 border-t border-black/10 pt-12">
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 sm:divide-x sm:divide-[var(--border)]">
                  {[
                    { num: "200+", label: "Proyectos completados" },
                    { num: "100%", label: "Clientes satisfechos" },
                    { num: "< 48h", label: "Tiempo de despliegue" },
                    { num: "6+", label: "Faenas activas" },
                  ].map((stat, i) => (
                    <div key={i} className="group flex flex-col items-center px-2 text-center sm:px-6">
                      <span className="font-display text-3xl font-black tracking-tight tabular-nums text-[#101820] transition-colors duration-200 group-hover:text-[#D6532B] sm:text-4xl">
                        {stat.num}
                      </span>
                      <span className="mt-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#4A5560]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="bg-white py-16 md:py-20 border-t border-[#E8E8E8]">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal>
              <h2 className="mx-auto max-w-lg text-center text-3xl font-extrabold leading-tight text-[#4A5560] sm:text-4xl font-display">
                Qué incluye un proyecto completo.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {serviceGrid.map((service, index) => (
                <Reveal key={service.title} delay={index * 0.05}>
                  <article className="flex h-full flex-col items-center rounded-[1rem] border border-[var(--border)] p-6 text-center transition-colors duration-200 hover:border-[#D6532B]">
                    <service.icon size={30} weight="light" className="text-[#D6532B]" />
                    <h3 className="mt-5 text-lg font-bold text-[#4A5560] font-display">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#666666] font-sans">
                      {service.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CaseStudiesReel projects={galleryProjects} />

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
