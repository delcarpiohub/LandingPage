"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const representedBrands = [
  {
    name: "Thermo Fisher Scientific",
    logo: "/marcas/thermo-fisher-scientific.png",
    width: 3840,
    height: 864,
    className: "max-h-9 max-w-[132px] md:max-h-10 md:max-w-[150px]",
  },
  {
    name: "Milestone",
    logo: "/marcas/milestone.png",
    width: 800,
    height: 198,
    className: "max-h-9 max-w-[126px] md:max-h-10 md:max-w-[150px]",
  },
  {
    name: "Restek",
    logo: "/marcas/restek.png",
    width: 301,
    height: 96,
    className: "max-h-9 max-w-[116px] md:max-h-10 md:max-w-[132px]",
  },
  {
    name: "Suez",
    logo: "/marcas/suez.png",
    width: 900,
    height: 269,
    className: "max-h-9 max-w-[124px] md:max-h-10 md:max-w-[144px]",
  },
  {
    name: "Distek",
    logo: "/marcas/distek.png",
    width: 356,
    height: 146,
    className: "max-h-9 max-w-[112px] md:max-h-10 md:max-w-[130px]",
  },
  {
    name: "Infitek",
    logo: "/marcas/infitek.png",
    width: 180,
    height: 180,
    className: "max-h-10 max-w-[86px] md:max-h-11 md:max-w-[96px]",
  },
  {
    name: "JS Cartmay",
    logo: "/marcas/js-cartmay.png",
    width: 1000,
    height: 1000,
    className: "max-h-11 max-w-[76px] md:max-h-12 md:max-w-[84px]",
  },
];

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
      className="relative isolate overflow-hidden bg-[#F7F7F5] px-4 py-12 sm:px-6 md:px-8 md:py-14 lg:px-16 lg:py-20"
      aria-labelledby="represented-brands-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-[linear-gradient(180deg,rgba(213,84,43,0.12),rgba(213,84,43,0))]"
      />

      <ul className="sr-only">
        {representedBrands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>

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

        <div
          aria-hidden="true"
          className="relative z-20 mx-[calc(50%-50vw)] overflow-hidden border-y border-[#D6532B]/12 py-4 md:py-5"
        >
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
      className="flex min-w-full items-center gap-4 whitespace-nowrap px-5 will-change-transform md:gap-5 md:px-6"
    >
      {conveyorBrands.map((brand, index) => (
        <div
          key={`${brand.name}-${index}`}
          className="flex h-[60px] min-w-[142px] shrink-0 items-center justify-center rounded-full border border-[#D6532B]/30 bg-[#FDFDFC] px-5 transition duration-300 hover:-translate-y-1 hover:border-[#D6532B] hover:shadow-[0_14px_40px_rgba(16,24,32,0.08)] sm:h-[68px] sm:min-w-[158px] md:h-[76px] md:min-w-[176px]"
        >
          <Image
            src={brand.logo}
            alt=""
            width={brand.width}
            height={brand.height}
            className={`h-auto w-auto object-contain ${brand.className}`}
            sizes="170px"
          />
        </div>
      ))}
    </motion.div>
  );
}
