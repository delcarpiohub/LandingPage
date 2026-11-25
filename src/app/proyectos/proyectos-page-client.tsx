"use client";

import {
  ArrowRight,
  Check,
  DoorOpen,
  MapPin,
  Siren,
  Table,
  Wind,
} from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { Reveal } from "@/components/motion/reveal";
import {
  CaseStudiesReel,
  type CaseStudy,
} from "@/components/sections/case-studies-reel";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { PageBanner } from "@/components/sections/page-banner";
import { Button } from "@/components/ui/button";

const galleryProjects: CaseStudy[] = [
  {
    id: "modulo-tecnico-estructura",
    category: "Infraestructura técnica",
    title: "Estructura de módulo técnico en faena",
    location: "Montaje de estructura metálica y albañilería",
    src: "/proyectos/gallery-modulo-tecnico-estructura.jpg",
    alt: "Estructura metálica y muros de bloque de un módulo técnico en construcción",
  },
  {
    id: "laboratorio-mesones-equipos",
    category: "Mobiliario técnico",
    title: "Laboratorio con mesones y equipos analíticos",
    location: "Mesones, lavaderos y campanas de extracción",
    src: "/proyectos/gallery-laboratorio-mesones-equipos.jpg",
    alt: "Laboratorio equipado con mesones, lavaderos, campana de extracción y equipos analíticos",
  },
  {
    id: "laboratorio-analitico-equipos",
    category: "Implementación de laboratorio",
    title: "Laboratorio analítico equipado",
    location: "Mesones técnicos con instrumentación instalada",
    src: "/proyectos/gallery-laboratorio-analitico-equipos.jpg",
    alt: "Laboratorio analítico con mesones técnicos y equipos de instrumentación instalados",
  },
  {
    id: "laboratorio-modular-container",
    category: "Mobiliario técnico",
    title: "Laboratorio modular tipo contenedor",
    location: "Mesones, gabinetes y climatización",
    src: "/proyectos/gallery-laboratorio-modular-container.jpg",
    alt: "Laboratorio modular tipo contenedor con mesones, gabinetes y climatización",
  },
  {
    id: "modulo-tecnico-exterior-acceso",
    category: "Infraestructura técnica",
    title: "Módulo técnico exterior con acceso de servicio",
    location: "Estructura, cerramiento y jaulas de almacenamiento",
    src: "/proyectos/gallery-modulo-tecnico-exterior-acceso.jpg",
    alt: "Módulo técnico exterior con puerta de acceso metálica y jaulas de almacenamiento",
  },
  {
    id: "redes-gases-almacenamiento",
    category: "Infraestructura técnica",
    title: "Almacenamiento de cilindros de gases",
    location: "Gabinetes individuales con señalética normada",
    src: "/proyectos/gallery-redes-gases-almacenamiento.jpg",
    alt: "Gabinetes de almacenamiento de cilindros de gases con señalética de seguridad",
  },
  {
    id: "mesones-almacenamiento-abierto",
    category: "Mobiliario técnico",
    title: "Mesones y repisas de almacenamiento",
    location: "Mobiliario interior para operación analítica",
    src: "/proyectos/gallery-mesones-almacenamiento-abierto.jpg",
    alt: "Mesones técnicos con repisas de almacenamiento abiertas en un laboratorio",
  },
  {
    id: "regulador-gases-instalacion",
    category: "Infraestructura técnica",
    title: "Instalación de reguladores de gases",
    location: "Red de distribución con puntos de uso en pared",
    src: "/proyectos/gallery-regulador-gases-instalacion.jpg",
    alt: "Reguladores de gases instalados en pared como parte de una red de distribución de laboratorio",
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

const desktopMediaQuery = "(min-width: 1024px)";
const PROJECT_VIDEO_READY_TIMEOUT_MS = 5000;

function subscribeToDesktopViewport(callback: () => void) {
  const query = window.matchMedia(desktopMediaQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getDesktopViewportSnapshot() {
  return window.matchMedia(desktopMediaQuery).matches;
}

function getServerDesktopViewportSnapshot() {
  return false;
}

function ProjectExecutionMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [hasVideoFailed, setHasVideoFailed] = useState(false);
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerDesktopViewportSnapshot,
  );
  const canPlayVideo = isDesktop && isInView && !reduceMotion;
  const shouldRenderVideo = canPlayVideo && !hasVideoFailed;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldRenderVideo) {
      return;
    }

    let didReachCanPlay = video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
    const handleCanPlay = () => {
      didReachCanPlay = true;
    };
    const handleFailure = () => {
      video.pause();
      setHasVideoFailed(true);
    };
    const timeoutId = window.setTimeout(() => {
      if (!didReachCanPlay) {
        handleFailure();
      }
    }, PROJECT_VIDEO_READY_TIMEOUT_MS);

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("error", handleFailure, { once: true });
    void video.play().catch(handleFailure);

    return () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleFailure);
      video.pause();
    };
  }, [shouldRenderVideo]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] w-[85%] overflow-hidden bg-[#101820] shadow-xl"
    >
      {shouldRenderVideo ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/proyectos/laboratorio-completo-moderno.jpg"
          preload="none"
          src="/proyectos/0722-web-compact.mp4"
          className="size-full object-cover"
          aria-label="Ejecución de un laboratorio completo por el equipo Del Carpio"
        />
      ) : (
        <Image
          src="/proyectos/laboratorio-completo-moderno.jpg"
          alt="Laboratorio analítico completo instalado por Del Carpio"
          fill
          sizes="(min-width: 1024px) 42vw, 85vw"
          className="object-cover"
        />
      )}
    </div>
  );
}

export function ProyectosPageClient() {
  return (
    <div className="min-h-dvh bg-white/70">
      <Navigation />
      <main id="main-content">
        <PageBanner
          src="/banners/banner-proyectos-20261125.jpg"
          alt="Proyectos"
        />

        <h1 className="sr-only">
          Laboratorios completos. Ejecutados en terreno.
        </h1>

        {/* ABOUT SPLIT - REDESIGN */}
        <section className="border-b border-[var(--border)] bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Left Column: Video (Back) & Image (Front) */}
              <Reveal delay={0.08}>
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  {/* Main Video (Atrás) */}
                  <ProjectExecutionMedia />

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
                        <Check
                          size={20}
                          weight="bold"
                          className="mt-0.5 shrink-0 text-[#D6532B]"
                        />
                        <span className="text-[15px] font-semibold text-[#4A5560] font-sans">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Info Cards Row */}
                  <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#D6532B]">
                      <span className="text-4xl font-black text-[#D6532B] font-display">
                        31
                      </span>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820] font-display">
                        Años de
                        <br />
                        Experiencia
                      </span>
                    </div>
                    <div className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-[3px] border-b-[#D6532B]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D6532B]/10 text-[#D6532B]">
                        <MapPin size={22} weight="fill" />
                      </div>
                      <span className="text-[11px] font-bold uppercase leading-snug text-[#101820] font-display">
                        Disponibles en
                        <br />
                        Todo Chile
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Franja independiente: sus límites espaciales no dependen de la
            sección editorial anterior ni de la grilla de servicios siguiente. */}
        <section
          aria-label="Indicadores de operación"
          className="relative grid min-h-[clamp(16.25rem,22vw,21.25rem)] place-items-center border-y border-[var(--border)] bg-white px-6 py-[clamp(4.5rem,8vw,7.5rem)] sm:px-8 lg:px-10"
        >
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-2 gap-y-8 [&>div:nth-child(n+3)]:border-t [&>div:nth-child(n+3)]:border-[var(--border)] sm:grid-cols-4 sm:divide-x sm:divide-[var(--border)] sm:[&>div:nth-child(n+3)]:border-t-0">
              {[
                { num: "200+", label: "Proyectos completados" },
                { num: "100%", label: "Clientes satisfechos" },
                { num: "< 48h", label: "Tiempo de despliegue" },
                { num: "6+", label: "Faenas activas" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center px-3 text-center sm:px-7"
                >
                  <span className="font-display text-[clamp(2rem,3.1vw,2.6rem)] font-black leading-none tracking-[-0.04em] tabular-nums text-[#101820] transition-colors duration-200 group-hover:text-[#D6532B]">
                    {stat.num}
                  </span>
                  <span className="mt-2 font-sans text-[11px] font-semibold leading-snug text-[#4A5560] sm:text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
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
                    <service.icon
                      size={30}
                      weight="light"
                      className="text-[#D6532B]"
                    />
                    <h3 className="mt-5 text-lg font-bold text-[#4A5560] font-display">
                      {service.title}
                    </h3>
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
