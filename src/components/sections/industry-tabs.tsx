"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { PipeCornerAccent } from "@/components/ui/pipe-corner-accent";

type IndustryColumn = {
  title: string;
  description: string;
  href: string;
  posterSrc: string;
  videoSrc: string;
  accent: string;
};

const industries: IndustryColumn[] = [
  {
    title: "Alimentos",
    description: "Matrices complejas para control y exportación.",
    href: "/servicios/implementacion-hplc",
    posterSrc: "/fotos/industrias/alimentos.jpg",
    videoSrc: "/videos/industrias/alimentos.mp4",
    accent: "#FBE369",
  },
  {
    title: "Minería",
    description: "Trazabilidad elemental para operación crítica.",
    href: "/servicios",
    posterSrc: "/fotos/industrias/mineria.jpg",
    videoSrc: "/videos/industrias/mineria.mp4",
    accent: "#D6532B",
  },
  {
    title: "Farmacéutica",
    description: "Validación analítica con exigencia regulatoria.",
    href: "/servicios/validacion-trazabilidad",
    posterSrc: "/fotos/industrias/farmaceutica.jpg",
    videoSrc: "/videos/industrias/farmaceutica.mp4",
    accent: "#FFFFFF",
  },
  {
    title: "Ambiente",
    description: "Monitoreo técnico para matrices ambientales.",
    href: "/servicios",
    posterSrc: "/fotos/industrias/ambiente.jpg",
    videoSrc: "/videos/industrias/ambiente.mp4",
    accent: "#53843A",
  },
  {
    title: "Academia/I+D",
    description: "Soporte instrumental para investigación aplicada.",
    href: "/servicios",
    posterSrc: "/fotos/industrias/academia-id.jpg",
    videoSrc: "/videos/industrias/academia-id.mp4",
    accent: "#FFFFFF",
  },
  {
    title: "Laboratorios",
    description: "Implementación y soporte para equipos HPLC/GC.",
    href: "/servicios/metodos-gc",
    posterSrc: "/fotos/industrias/laboratorios.jpg",
    videoSrc: "/videos/industrias/laboratorios.mp4",
    accent: "#FBE369",
  },
];

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

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (!shouldPlay) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      void playPromise.catch(() => {
        video.pause();
      });
    }

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [shouldPlay, videoSrc]);

  const sharedClassName = `pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] ${
    shouldPlay ? "opacity-58" : "opacity-44"
  }`;

  return (
    <div ref={mediaRef} className="absolute inset-0">
      {canMountVideo ? (
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
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate();
        }
      }}
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`Ver soluciones para ${industry.title}`}
      className="group relative min-h-[260px] overflow-hidden border border-[#4A5560]/12 bg-[#4A5560] outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#D6532B] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-[300px] lg:min-w-0 lg:basis-0 lg:border-r-0 lg:last:border-r"
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

      <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-between p-5 sm:min-h-[300px] md:p-6 lg:min-h-[340px] lg:p-7">
        <div
          className={
            isActive
              ? "flex min-h-[156px] flex-col justify-start"
              : "relative flex min-h-[156px] flex-col justify-start lg:min-h-[246px] lg:[--industry-indicator-y:226px] lg:[--industry-rail-x:38px]"
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
          className="max-w-[250px]"
        >
          <p className="text-sm leading-6 text-white/80">
            {industry.description}
          </p>
          <Link
            href={industry.href}
            tabIndex={isActive ? 0 : -1}
            aria-hidden={!isActive}
            className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#D6532B] px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B] active:scale-[0.98]"
          >
            Ver soluciones
          </Link>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute bottom-6 right-6 size-2 rounded-full opacity-80"
        style={{ backgroundColor: industry.accent }}
      />
    </motion.article>
  );
}

export function IndustryTabs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktopViewport();

  return (
    <section
      id="industrias"
      className="relative overflow-hidden bg-white px-4 py-14 sm:px-5 md:px-8 md:py-[4.5rem] lg:px-16 lg:py-20"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <PipeCornerAccent corner="top-right" size="sm" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[20px] font-bold uppercase tracking-[0.18em] text-[#D6532B]">
              Industrias atendidas
            </p>
            <h2 className="mt-4 max-w-[620px] font-display text-[34px] font-bold leading-[1] text-[#4A5560] sm:text-[40px] md:text-[52px] lg:text-[58px]">
              Soluciones por industria
            </h2>
          </div>
          <p className="max-w-[340px] text-sm leading-6 text-[#4A5560]/62">
            Sectores donde la precisión analítica sostiene decisiones técnicas,
            auditorías y continuidad operacional.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:flex lg:min-h-[500px] lg:flex-row lg:gap-0">
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
      </div>
    </section>
  );
}
