"use client";

import {
  ArrowLeft,
  ArrowRight,
  ChartBar,
  Check,
  ClockCounterClockwise,
  DoorOpen,
  Handshake,
  HardDrives,
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

const galleryProjects = [
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
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = useCallback(() => {
    setActiveIndex((i) => (i + 1) % galleryProjects.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveIndex((i) => (i - 1 + galleryProjects.length) % galleryProjects.length);
  }, []);

  const currentItem = galleryProjects[activeIndex];
  const nextItem = galleryProjects[(activeIndex + 1) % galleryProjects.length];

  return (
    <div className="min-h-dvh bg-white">
      <Navigation />
      <main id="main-content">
        {/* HERO PORTADA RESTAURADO */}
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
                  <a href="#evidencia-ejecucion">Ver casos ejecutados</a>
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

            {/* Bottom Row: Stats - Sin fondo (Clean icon stats layout) */}
            <Reveal delay={0.12}>
              <div className="mt-16 pt-12 border-t border-black/10">
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4">
                  {[
                    { num: "200+", label: "Proyectos completados", icon: ChartBar },
                    { num: "100%", label: "Clientes satisfechos", icon: Handshake },
                    { num: "< 48h", label: "Tiempo de despliegue", icon: ClockCounterClockwise },
                    { num: "6+", label: "Faenas activas", icon: HardDrives },
                  ].map((stat, i) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={i} className="group flex flex-col items-center text-center px-2">
                        <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#D6532B]/10 text-[#D6532B] transition-transform duration-300 group-hover:scale-110">
                          <StatIcon size={22} weight="bold" />
                        </div>
                        <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#101820] font-display">
                          {stat.num}
                        </span>
                        <span className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A5560] font-sans">
                          {stat.label}
                        </span>
                      </div>
                    );
                  })}
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

        {/* SECCIÓN REEL DE CASOS DE ÉXITO - COMPACTO (DEL CONTRATO A UNA INSTALACIÓN OPERATIVA) */}
        <section id="evidencia-ejecucion" className="w-full bg-[#212121] text-white py-8 sm:py-12 px-6 sm:px-10 lg:px-14 font-sans">
          <div className="mx-auto max-w-[1320px]">
            {/* Section Header - Compact */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5 border-b border-white/10 pb-5">
              {/* Left Headline */}
              <div className="flex flex-col w-full lg:w-[60%] text-left">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#888888]">
                  <span>(02)</span>
                  <span>·</span>
                  <span className="text-[#D6532B]">Casos de Éxito Ejecutados</span>
                </div>
                <h2 className="text-[#FFFFFF] font-display font-extrabold text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-tight mt-2 uppercase">
                  Del contrato a una instalación operativa.
                </h2>
              </div>

              {/* Right Categories List - Compact Pill Style */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto pt-1">
                {galleryProjects.map((proj, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer font-sans rounded-full px-3 py-1.5 border ${
                        isActive
                          ? "text-[#FFFFFF] bg-white/15 border-white/40 shadow-xs"
                          : "text-[#888888] border-transparent hover:text-white hover:border-white/20"
                      }`}
                    >
                      {proj.category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gallery Carousel - Compact */}
            <div className="flex flex-col lg:flex-row items-start mt-6 gap-6 overflow-hidden">
              {/* Main Gallery Card (72%) */}
              <div className="flex flex-col w-full lg:w-[72%] text-left">
                <div className="relative w-full h-[220px] sm:h-[290px] lg:h-[320px] rounded-[10px] overflow-hidden bg-[#151515] shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentItem.src}
                        alt={currentItem.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Image Details + Controls Row */}
                <div className="flex flex-row justify-between items-center mt-3.5 gap-4">
                  {/* Text Labels */}
                  <div className="flex flex-col text-left min-w-0">
                    <h3 className="text-[#FFFFFF] text-base sm:text-lg font-bold font-display leading-snug truncate">
                      {currentItem.title}
                    </h3>
                    <span className="text-[#888888] text-xs font-semibold font-sans uppercase tracking-wider mt-0.5 truncate">
                      {currentItem.location}
                    </span>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={prevProject}
                      aria-label="Proyecto anterior"
                      className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FFFFFF] bg-[#212121] text-[#FFFFFF] hover:bg-white/10 transition-colors"
                    >
                      <ArrowLeft size={16} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={nextProject}
                      aria-label="Proyecto siguiente"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FFFFFF] text-[#212121] hover:bg-white/90 transition-transform active:scale-95 shadow-md"
                    >
                      <ArrowRight size={16} weight="bold" />
                    </button>
                  </div>
                </div>

                {/* See All Link */}
                <div className="mt-2.5">
                  <Link
                    href="/contacto/proyectos"
                    className="inline-flex items-center text-[#FFFFFF] text-xs font-semibold font-sans hover:text-[#D6532B] transition-colors"
                  >
                    <span>Cotizar un proyecto similar</span>
                    <ArrowRight size={14} weight="bold" className="ml-2" />
                  </Link>
                </div>
              </div>

              {/* Secondary Gallery Card (Peek Card 28%) */}
              <div className="hidden lg:flex flex-col w-[28%] opacity-60 transition-opacity hover:opacity-80">
                <button
                  type="button"
                  onClick={nextProject}
                  className="relative w-full h-[220px] sm:h-[290px] lg:h-[320px] rounded-[10px] overflow-hidden bg-[#151515] text-left cursor-pointer"
                >
                  <Image
                    src={nextItem.src}
                    alt={nextItem.alt}
                    fill
                    sizes="28vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6532B]">
                      Siguiente
                    </span>
                    <p className="text-xs font-bold font-display truncate text-white mt-0.5">
                      {nextItem.title}
                    </p>
                  </div>
                </button>
              </div>
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
