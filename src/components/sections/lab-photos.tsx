"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

import { brands as representedBrands } from "@/content/brands";
import { unlockBrandsPage } from "@/lib/brands-gate";

const conveyorBrands = [
  ...representedBrands,
  ...representedBrands,
  ...representedBrands,
];

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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % rotationProducts.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Animación flip de página premium
  const flipVariants = {
    enter: (reduce: boolean) => ({
      opacity: 0,
      rotateY: reduce ? 0 : 18,
      scale: 0.96,
      x: reduce ? 0 : 24,
    }),
    center: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
    exit: (reduce: boolean) => ({
      opacity: 0,
      rotateY: reduce ? 0 : -18,
      scale: 0.96,
      x: reduce ? 0 : -24,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    }),
  };

  return (
    <section
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
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative order-1 flex flex-col items-center justify-center lg:justify-center"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px]"
            >
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

              {/* Puntos de navegación manual opcionales */}
              <div className="relative z-30 mt-4 flex select-none justify-center gap-2 md:mt-6">
                {rotationProducts.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Ver producto ${index + 1}`}
                    aria-current={currentIdx === index}
                    onClick={() => setCurrentIdx(index)}
                    className="h-1.5 w-1.5 rounded-full bg-[#4A5560]/15 aria-current:bg-[#D6532B] transition-all duration-200 cursor-pointer border-none outline-none hover:scale-125"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="relative z-30 order-2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h2
              id="represented-brands-title"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-[620px] font-display text-[34px] font-bold leading-[0.98] text-[#4A5560] sm:text-[40px] md:text-[52px] lg:text-[76px]"
            >
              Todos los clientes que han confiado en nosotros
            </motion.h2>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
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
          <BrandConveyor reduceMotion={Boolean(reduceMotion)} />
        </div>
      </div>
    </section>
  );
}

function BrandConveyor({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      animate={reduceMotion ? undefined : { x: ["0%", "-33.333%"] }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 48,
      }}
      className="flex min-w-full items-center gap-6 whitespace-nowrap px-5 will-change-transform md:gap-8 md:px-6"
    >
      {conveyorBrands.map((brand, index) => {
        // La cinta se triplica para el loop infinito; solo el primer set
        // (index < representedBrands.length) queda en el árbol de
        // accesibilidad — los duplicados visuales se saltan por teclado y
        // lector de pantalla (aria-hidden + tabIndex -1) para no repetir 7
        // links 3 veces, aunque siguen siendo clickeables con mouse/touch.
        const isPrimaryCopy = index < representedBrands.length;
        return (
          <Link
            key={`${brand.name}-${index}`}
            href="/marcas"
            onClick={unlockBrandsPage}
            aria-hidden={isPrimaryCopy ? undefined : true}
            tabIndex={isPrimaryCopy ? undefined : -1}
            aria-label={`Ver marcas representadas por Del Carpio — ${brand.name}`}
            className="flex h-[60px] min-w-[120px] shrink-0 items-center justify-center px-4 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2 sm:h-[68px] sm:min-w-[140px] md:h-[76px] md:min-w-[160px]"
          >
            <Image
              src={brand.logo}
              alt=""
              width={brand.width}
              height={brand.height}
              className={`h-auto w-auto max-h-[38px] sm:max-h-[44px] md:max-h-[50px] object-contain opacity-90 transition-opacity hover:opacity-100 ${brand.className}`}
              sizes="170px"
            />
          </Link>
        );
      })}
    </motion.div>
  );
}
