"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";

type IndustryColumn = {
  title: string;
  description: string;
  href: string;
  posterSrc: string;
  videoSrc: string;
  accent: string;
};

// Enlaza a las páginas reales de solución por industria (src/app/soluciones/
// [industria]), que agregan servicios + productos reales para cada sector.
// "Aguas" no está en este carrusel: no existe foto/video real para esa
// industria todavía (ver public/fotos/industrias/ y public/videos/industrias/)
// — sí está disponible en /soluciones/aguas y en el header, ambos sin video.
const industries: IndustryColumn[] = [
  {
    title: "Alimentos",
    description: "Matrices complejas para control y exportación.",
    href: "/soluciones/alimentos",
    posterSrc: "/fotos/industrias/alimentos.jpg",
    videoSrc: "/videos/industrias/alimentos.mp4",
    accent: "#FBE369",
  },
  {
    title: "Minería",
    description: "Trazabilidad elemental para operación crítica.",
    href: "/soluciones/mineria",
    posterSrc: "/fotos/industrias/mineria.jpg",
    videoSrc: "/videos/industrias/mineria.mp4",
    accent: "#D6532B",
  },
  {
    title: "Farmacéutica",
    description: "Validación analítica con exigencia regulatoria.",
    href: "/soluciones/farmaceutica",
    posterSrc: "/fotos/industrias/farmaceutica.jpg",
    videoSrc: "/videos/industrias/farmaceutica.mp4",
    accent: "#FFFFFF",
  },
  {
    title: "Ambiente",
    description: "Monitoreo técnico para matrices ambientales.",
    href: "/soluciones/ambiental",
    posterSrc: "/fotos/industrias/ambiente.jpg",
    videoSrc: "/videos/industrias/ambiente.mp4",
    accent: "#53843A",
  },
  {
    title: "Academia/I+D",
    description: "Soporte instrumental para investigación aplicada.",
    href: "/soluciones/academia-id",
    posterSrc: "/fotos/industrias/academia-id.jpg",
    videoSrc: "/videos/industrias/academia-id.mp4",
    accent: "#FFFFFF",
  },
];

const INDUSTRY_VIDEO_READY_TIMEOUT_MS = 5000;

function useIsDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function IndustryMedia({
  videoSrc,
  posterSrc,
  title,
  shouldPlay,
  mediaRef,
  canMountVideo,
}: {
  videoSrc: string;
  posterSrc: string;
  title: string;
  shouldPlay: boolean;
  mediaRef: React.RefObject<HTMLDivElement | null>;
  canMountVideo: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoFailed, setHasVideoFailed] = useState(false);
  const shouldRenderVideo = canMountVideo && !hasVideoFailed;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || hasVideoFailed) {
      return;
    }

    if (!shouldPlay) {
      video.pause();
      video.currentTime = 0;
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
    }, INDUSTRY_VIDEO_READY_TIMEOUT_MS);

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("error", handleFailure, { once: true });
    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      void playPromise.catch(handleFailure);
    }

    return () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleFailure);
      video.pause();
      video.currentTime = 0;
    };
  }, [hasVideoFailed, shouldPlay, videoSrc]);

  const sharedClassName = `pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] ${
    shouldPlay ? "opacity-58" : "opacity-44"
  }`;

  return (
    <div ref={mediaRef} className="absolute inset-0">
      {shouldRenderVideo ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="none"
          className={sharedClassName}
          aria-hidden="true"
        >
          Tu navegador no soporta video HTML5.
        </video>
      ) : (
        <Image
          src={posterSrc}
          alt={`Industria ${title} atendida por Del Carpio`}
          fill
          sizes="(min-width: 1024px) 20vw, 50vw"
          className={sharedClassName}
        />
      )}
    </div>
  );
}

function IndustryCard({
  industry,
  isActive,
  isAnyActive,
  reduceMotion,
  isDesktop,
  onActivate,
}: {
  industry: IndustryColumn;
  isActive: boolean;
  isAnyActive: boolean;
  reduceMotion: boolean | null;
  isDesktop: boolean;
  onActivate: () => void;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { once: true, amount: 0.3 });
  const flexGrow = !isAnyActive ? 1 : isActive ? 2.55 : 0.64;

  return (
    <motion.article
      style={{ flexGrow }}
      animate={reduceMotion ? undefined : { flexGrow }}
      transition={{
        type: "spring",
        duration: 0.58,
        bounce: 0.12,
      }}
      onMouseEnter={onActivate}
      className="group relative min-h-[178px] overflow-hidden border border-[#4A5560]/12 bg-[#4A5560] outline-none focus-within:z-10 focus-within:ring-2 focus-within:ring-[#D6532B] focus-within:ring-offset-2 focus-within:ring-offset-white sm:min-h-[210px] lg:min-w-0 lg:basis-0 lg:border-r-0 lg:last:border-r"
    >
      <IndustryMedia
        videoSrc={industry.videoSrc}
        posterSrc={industry.posterSrc}
        title={industry.title}
        shouldPlay={isActive && !reduceMotion}
        mediaRef={mediaRef}
        canMountVideo={isDesktop && inView}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,32,0.42),rgba(16,24,32,0.84))]" />
      <div className="absolute inset-y-0 left-0 w-px bg-white/14" />
      <div
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
        style={{ backgroundColor: "#D6532B" }}
      />

      <button
        type="button"
        onClick={onActivate}
        onFocus={onActivate}
        aria-label={`Mostrar información de ${industry.title}`}
        aria-expanded={isActive}
        className="absolute inset-0 z-[5] hidden cursor-pointer focus-visible:outline-none lg:block"
      />

      <div className="pointer-events-none relative z-10 flex h-full min-h-[178px] flex-col justify-between p-5 sm:min-h-[210px] md:p-6 lg:min-h-[300px] lg:p-7">
        <div
          className={
            isActive
              ? "flex min-h-[156px] flex-col justify-start"
              : "relative flex min-h-[112px] flex-col justify-start lg:min-h-[216px] lg:[--industry-indicator-y:196px] lg:[--industry-rail-x:38px]"
          }
        >
          <div
            className={
              isActive
                ? ""
                : "lg:absolute lg:left-[var(--industry-rail-x)] lg:top-0 lg:flex lg:h-[calc(var(--industry-indicator-y)-10px)] lg:items-end"
            }
          >
            <motion.h3
              initial={false}
              animate={
                isActive
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      filter: "blur(0px)",
                    }
                  : {
                      opacity: 0.94,
                      x: 0,
                      y: 0,
                      filter: "blur(0px)",
                    }
              }
              transition={{
                duration: 0.28,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={
                isActive
                  ? "max-w-[10ch] font-display text-4xl font-bold leading-none text-white md:text-[44px] lg:[writing-mode:horizontal-tb] lg:rotate-0"
                  : "max-w-[9ch] font-display text-3xl font-bold leading-none text-white transition-[letter-spacing] duration-300 md:text-[34px] lg:max-h-[198px] lg:max-w-none lg:origin-center lg:rotate-180 lg:text-[26px] lg:tracking-[0.02em] lg:[writing-mode:vertical-rl]"
              }
            >
              {industry.title}
            </motion.h3>
          </div>
          <motion.div
            initial={false}
            animate={
              isActive
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0.28, opacity: 0.7 }
            }
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className={
              isActive
                ? "mt-5 h-[2px] w-20 origin-left bg-[#D6532B]"
                : "mt-5 h-[2px] w-14 origin-left bg-[#D6532B] lg:absolute lg:left-[var(--industry-rail-x)] lg:top-[var(--industry-indicator-y)] lg:mt-0"
            }
          />
        </div>

        <motion.div
          initial={false}
          animate={
            isActive
              ? {
                  opacity: 1,
                  transform: "translateY(0px)",
                  filter: "blur(0px)",
                }
              : {
                  opacity: 0,
                  transform: "translateY(10px)",
                  filter: "blur(2px)",
                }
          }
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          className="hidden max-w-[250px] lg:block"
        >
          <p className="text-sm leading-6 text-white/80">
            {industry.description}
          </p>
          <Link
            href={industry.href}
            tabIndex={isActive ? 0 : -1}
            aria-hidden={!isActive}
            className="pointer-events-auto relative z-20 mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#D6532B] px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B] active:scale-[0.98]"
          >
            Ver soluciones
          </Link>
        </motion.div>

        <Link
          href={industry.href}
          className="pointer-events-auto absolute bottom-5 left-5 inline-flex min-h-11 items-center text-[11px] font-bold uppercase tracking-[0.08em] text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBE369] lg:hidden"
        >
          Ver soluciones
        </Link>
      </div>

      <div
        className="pointer-events-none absolute bottom-6 right-6 size-2 rounded-full opacity-80"
        style={{ backgroundColor: industry.accent }}
      />
    </motion.article>
  );
}

// Grid de tarjetas de industria. Sin section/header propios: el bloque
// "Explora Del Carpio" (src/components/sections/explore-section.tsx) provee
// el contenedor, el header y el ancho — este componente solo es responsable
// del grid interactivo y su estado (misma lógica que tenía IndustryTabs
// antes de separarse del header, sin cambios funcionales).
export function IndustryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktopViewport();

  return (
    <div
      className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:flex lg:min-h-[430px] lg:flex-row lg:gap-0"
      onMouseLeave={() => setActiveIndex(null)}
    >
      {industries.map((industry, index) => (
        <IndustryCard
          key={industry.title}
          industry={industry}
          isActive={activeIndex === index}
          isAnyActive={activeIndex !== null}
          reduceMotion={reduceMotion}
          isDesktop={isDesktop}
          onActivate={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}
