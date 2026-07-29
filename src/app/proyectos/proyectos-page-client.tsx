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
import { useCallback, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";

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

export function ProyectosPageClient() {
  const reduceMotion = useReducedMotion();
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
        {/* TOP SECTION IMPLEMENTATION (DESIGN JSON & REFERENCE MATCH) */}
        <section className="w-full bg-[#212121] text-white pt-24 pb-16 px-6 sm:px-12 lg:px-20 font-[Helvetica_Neue,Arial,sans-serif]">
          <div className="mx-auto max-w-[1440px]">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-white/10 pb-10">
              {/* Left Headline */}
              <div className="flex flex-col w-full lg:w-[60%] text-left">
                <span className="text-[#888888] text-xs font-semibold uppercase tracking-widest">
                  (02)
                </span>
                <span className="text-[#888888] text-xs font-semibold uppercase tracking-widest mt-2">
                  Proyectos Ejecutados
                </span>
                <h1 className="text-[#FFFFFF] font-bold text-3xl sm:text-4xl lg:text-[48px] leading-[1.1] tracking-tight mt-6">
                  Del contrato a una instalación operativa.
                </h1>
              </div>

              {/* Right Categories List */}
              <div className="flex flex-wrap lg:flex-col items-start lg:items-end text-left lg:text-right gap-3 sm:gap-4 w-full lg:w-[35%] pt-2">
                {galleryProjects.map((proj, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`text-lg sm:text-2xl transition-colors cursor-pointer ${
                        isActive
                          ? "font-bold text-[#FFFFFF]"
                          : "font-normal text-[#888888] hover:text-white/80"
                      }`}
                    >
                      {proj.category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gallery Carousel */}
            <div className="flex flex-col lg:flex-row items-start mt-10 gap-8 overflow-hidden">
              {/* Main Gallery Card (70%) */}
              <div className="flex flex-col w-full lg:w-[70%] text-left">
                <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#151515] shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
                  {/* Text Labels */}
                  <div className="flex flex-col text-left">
                    <h2 className="text-[#FFFFFF] text-base sm:text-lg font-normal leading-snug">
                      {currentItem.title}
                    </h2>
                    <span className="text-[#888888] text-xs sm:text-sm uppercase tracking-wider mt-1.5">
                      {currentItem.location}
                    </span>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={prevProject}
                      aria-label="Proyecto anterior"
                      className="flex items-center justify-center w-12 h-12 rounded-full border border-[#FFFFFF] bg-[#212121] text-[#FFFFFF] hover:bg-white/10 transition-colors"
                    >
                      <ArrowLeft size={18} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={nextProject}
                      aria-label="Proyecto siguiente"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFFFF] text-[#212121] hover:bg-white/90 transition-transform active:scale-95 shadow-md"
                    >
                      <ArrowRight size={18} weight="bold" />
                    </button>
                  </div>
                </div>

                {/* See All Link */}
                <div className="mt-4">
                  <a
                    href="#evidencia-ejecucion"
                    className="inline-flex items-center text-[#FFFFFF] text-sm hover:underline"
                  >
                    <span>Ver todos los proyectos</span>
                    <ArrowRight size={16} weight="bold" className="ml-2.5" />
                  </a>
                </div>
              </div>

              {/* Secondary Gallery Card (30% peek card) */}
              <div className="hidden lg:flex flex-col w-[30%] opacity-60 transition-opacity hover:opacity-80">
                <button
                  type="button"
                  onClick={nextProject}
                  className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#151515] text-left cursor-pointer"
                >
                  <Image
                    src={nextItem.src}
                    alt={nextItem.alt}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                </button>
                <span className="text-[#888888] text-xs uppercase tracking-wider mt-3">
                  Siguiente: {nextItem.category}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SPLIT - REDESIGN */}
        <section id="casos-ejecutados" className="border-b border-[var(--border)] bg-white py-16 md:py-24">
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
                      <span className="text-4xl font-black text-[#D6532B]">31</span>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820]">
                        Años de<br />Experiencia
                      </span>
                    </div>
                    <div className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#D6532B]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D6532B]/10 text-[#D6532B]">
                        <MapPin size={22} weight="fill" />
                      </div>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820]">
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
                        <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#101820]">
                          {stat.num}
                        </span>
                        <span className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A5560]">
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
