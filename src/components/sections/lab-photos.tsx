"use client";

import { ArrowRight, Pause, Play } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useInView,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { brands as representedBrands } from "@/content/brands";
import { unlockBrandsPage } from "@/lib/brands-gate";

const rotationProducts = [
  {
    src: "/fotos/vanquish-flex.png",
    alt: "Sistema cromatográfico HPLC Vanquish Flex",
  },
  {
    src: "/productos-rotacion/equipo-1.png",
    alt: "Sistema de digestión por microondas Milestone",
  },
  {
    src: "/productos-rotacion/equipo-2.png",
    alt: "Espectrómetro ICP-OES iCAP PRO",
  },
  {
    src: "/productos-rotacion/equipo-3.png",
    alt: "Cromatógrafo iónico Inuvion",
  },
  {
    src: "/productos-rotacion/equipo-4.png",
    alt: "Analizador de gases Trace GC 1600",
  },
];

export function LabPhotos() {
  const reduceMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isProductInteracting, setIsProductInteracting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    if (reduceMotion || !isInView || isAutoplayPaused || isProductInteracting) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIdx((current) => (current + 1) % rotationProducts.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isAutoplayPaused, isInView, isProductInteracting, reduceMotion]);

  const flipVariants = {
    enter: (reduce: boolean) => ({
      opacity: 0,
      y: reduce ? 0 : 8,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
    exit: (reduce: boolean) => ({
      opacity: 0,
      y: reduce ? 0 : -8,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="marcas"
      className="relative isolate overflow-hidden bg-[#F7F7F5] px-4 py-12 sm:px-6 md:px-8 md:py-14 lg:px-16 lg:py-20"
      aria-labelledby="represented-brands-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-[linear-gradient(180deg,rgba(213,84,43,0.12),rgba(213,84,43,0))]"
      />

      <div className="relative z-20 mx-auto flex max-w-[1440px] flex-col justify-center gap-8 md:gap-10 lg:min-h-[720px] lg:gap-12">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-[42%_58%] lg:gap-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative order-1 flex flex-col items-center justify-center lg:justify-center"
            onPointerEnter={() => setIsProductInteracting(true)}
            onPointerLeave={() => setIsProductInteracting(false)}
            onFocusCapture={() => setIsProductInteracting(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsProductInteracting(false);
              }
            }}
          >
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px]">
              <div className="absolute inset-x-8 bottom-3 h-20 rounded-full bg-[#4A5560]/18 blur-[36px]" />

              <div
                className="relative aspect-[1/1.18] w-full"
                style={{ perspective: 1200 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIdx}
                    custom={Boolean(reduceMotion)}
                    variants={flipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 size-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={rotationProducts[currentIdx].src}
                      alt={rotationProducts[currentIdx].alt}
                      fill
                      priority={currentIdx === 0}
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 380px, 86vw"
                      className="object-contain drop-shadow-[0_24px_42px_rgba(16,24,32,0.18)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative z-30 mt-4 flex justify-center gap-1 md:mt-6">
                {rotationProducts.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Ver producto ${index + 1}`}
                    aria-current={currentIdx === index}
                    onClick={() => setCurrentIdx(index)}
                    className="grid size-11 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        currentIdx === index
                          ? "bg-[#D6532B]"
                          : "bg-[#4A5560]/15"
                      }`}
                    />
                  </button>
                ))}
                {!reduceMotion ? (
                  <button
                    type="button"
                    aria-label={
                      isAutoplayPaused
                        ? "Reproducir carrusel"
                        : "Pausar carrusel"
                    }
                    aria-pressed={isAutoplayPaused}
                    onClick={() => setIsAutoplayPaused((paused) => !paused)}
                    className="grid size-11 place-items-center rounded-full text-[#4A5560] transition-colors hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                  >
                    {isAutoplayPaused ? (
                      <Play size={15} weight="fill" aria-hidden="true" />
                    ) : (
                      <Pause size={15} weight="fill" aria-hidden="true" />
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </motion.div>

          <div className="relative z-30 order-2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h2
              id="represented-brands-title"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-[620px] font-display text-[34px] font-bold leading-[0.98] text-[#4A5560] sm:text-[40px] md:text-[52px] lg:text-[76px]"
            >
              Todos los clientes que han confiado en nosotros
            </motion.h2>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-8 md:mt-10 lg:mt-12"
            >
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6532B] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(213,84,43,0.28)] transition hover:-translate-y-0.5 hover:bg-[#B8431E] hover:shadow-[0_18px_42px_rgba(213,84,43,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B] active:scale-[0.98] md:px-9 md:py-4"
              >
                Solicita una Demostracion
                <ArrowRight size={16} weight="bold" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 mx-[calc(50%-50vw)] overflow-hidden py-4 md:py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-[linear-gradient(90deg,#F7F7F5,rgba(247,247,245,0))] md:w-48" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-[linear-gradient(270deg,#F7F7F5,rgba(247,247,245,0))] md:w-48" />
          <BrandConveyor
            isPaused={Boolean(reduceMotion) || !isInView || isAutoplayPaused}
          />
        </div>
      </div>
    </section>
  );
}

function BrandConveyor({ isPaused }: { isPaused: boolean }) {
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="dc-brand-conveyor overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-6"
      onPointerEnter={() => setIsHovering(true)}
      onPointerDown={() => setIsPointerActive(true)}
      onPointerUp={() => setIsPointerActive(false)}
      onPointerCancel={() => setIsPointerActive(false)}
      onPointerLeave={() => {
        setIsHovering(false);
        setIsPointerActive(false);
      }}
    >
      <Link
        href="/marcas"
        onClick={unlockBrandsPage}
        aria-label="Ver todas las marcas representadas por Del Carpio"
        className="block w-max min-w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
      >
        <div
          className="dc-brand-conveyor-track flex w-max min-w-full items-center py-1"
          style={{
            animationPlayState:
              isPaused || isPointerActive || isHovering ? "paused" : "running",
          }}
        >
          {[0, 1, 2].map((sequenceIndex) => (
            <div
              key={sequenceIndex}
              aria-hidden="true"
              className="flex shrink-0 items-center gap-6 pr-6 md:gap-8 md:pr-8"
            >
              {representedBrands.map((brand) => (
                <span
                  key={`${sequenceIndex}-${brand.name}`}
                  className="flex h-[60px] min-w-[164px] shrink-0 items-center justify-center px-3 sm:h-[68px] sm:min-w-[176px] md:h-[76px] md:min-w-[188px]"
                >
                  <Image
                    src={brand.logo}
                    alt=""
                    width={brand.width}
                    height={brand.height}
                    style={{ transform: `scale(${brand.scale ?? 1})` }}
                    className="h-[38px] w-[140px] object-contain opacity-90 transition-opacity hover:opacity-100 sm:h-[44px] sm:w-[150px] md:h-[50px] md:w-[160px]"
                    sizes="160px"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
