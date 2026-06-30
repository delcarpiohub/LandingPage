"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

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

export function LabPhotos() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden bg-[#F7F7F5] px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-16 lg:px-16 lg:pb-24 lg:pt-20"
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

      <div className="relative z-20 mx-auto grid max-w-[1440px] gap-10 lg:min-h-[610px] lg:grid-cols-[42%_58%] lg:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative flex justify-center lg:justify-center"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[400px] lg:max-w-[430px]"
          >
            <div className="absolute inset-x-10 bottom-4 h-20 rounded-full bg-[#101820]/18 blur-[34px]" />
            <div className="relative aspect-[1/1.18]">
              <Image
                src="/fotos/vanquish-flex.png"
                alt="Equipo cromatografico Vanquish Flex usado como visual principal"
                fill
                priority={false}
                sizes="(min-width: 1024px) 430px, 88vw"
                className="object-contain drop-shadow-[0_24px_42px_rgba(16,24,32,0.18)]"
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="relative z-30 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D5542B]"
          >
            Marcas representadas
          </motion.p>

          <motion.h2
            id="represented-brands-title"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 max-w-[620px] font-display text-[40px] font-bold leading-[0.98] text-[#101820] md:text-[58px] lg:text-[76px]"
          >
            Marcas que respaldan nuestro trabajo
          </motion.h2>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-10"
          >
            <Link
              href="/contacto"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#D5542B] px-9 py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(213,84,43,0.28)] transition hover:-translate-y-0.5 hover:bg-[#B54725] hover:shadow-[0_18px_42px_rgba(213,84,43,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
            >
              Agenda una demostraci&oacute;n
              <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative z-10 mx-[calc(50%-50vw)] mt-8 overflow-hidden py-3 md:mt-4 lg:mt-[-18px]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(90deg,#F7F7F5,rgba(247,247,245,0))] md:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(270deg,#F7F7F5,rgba(247,247,245,0))] md:w-44" />
        <div className="grid gap-3 md:gap-4">
          <BrandConveyor reverse={false} reduceMotion={Boolean(reduceMotion)} />
          <BrandConveyor reverse reduceMotion={Boolean(reduceMotion)} />
        </div>
      </div>
    </section>
  );
}

function BrandConveyor({
  reverse,
  reduceMotion,
}: {
  reverse: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : { x: reverse ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }
      }
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: reverse ? 46 : 42,
      }}
      className="flex min-w-full items-center gap-4 whitespace-nowrap px-4 opacity-95 md:gap-[18px]"
    >
      {conveyorBrands.map((brand, index) => (
        <div
          key={`${brand.name}-${index}-${reverse ? "reverse" : "forward"}`}
          className="flex h-16 min-w-[160px] items-center justify-center rounded-full border border-[#D5542B]/28 bg-white/94 px-6 shadow-[0_10px_30px_rgba(16,24,32,0.06)] backdrop-blur-sm md:h-[70px] md:min-w-[184px]"
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
