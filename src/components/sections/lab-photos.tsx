"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const representedBrands = [
  {
    name: "Thermo Fisher Scientific",
    logo: "/marcas/thermo-fisher-scientific.png",
    width: 3840,
    height: 864,
    className: "max-h-12 max-w-[230px]",
  },
  {
    name: "Milestone",
    logo: "/marcas/milestone.png",
    width: 800,
    height: 198,
    className: "max-h-14 max-w-[220px]",
  },
  {
    name: "Restek",
    logo: "/marcas/restek.png",
    width: 301,
    height: 96,
    className: "max-h-11 max-w-[150px]",
  },
  {
    name: "Suez",
    logo: "/marcas/suez.png",
    width: 900,
    height: 269,
    className: "max-h-12 max-w-[170px]",
  },
  {
    name: "Distek",
    logo: "/marcas/distek.png",
    width: 356,
    height: 146,
    className: "max-h-12 max-w-[150px]",
  },
  {
    name: "Infitek",
    logo: "/marcas/infitek.png",
    width: 180,
    height: 180,
    className: "max-h-14 max-w-[112px]",
  },
  {
    name: "JS Cartmay",
    logo: "/marcas/js-cartmay.png",
    width: 1000,
    height: 1000,
    className: "max-h-16 max-w-[96px]",
  },
];

const duplicatedBrands = [
  ...representedBrands,
  ...representedBrands,
  ...representedBrands,
];

export function LabPhotos() {
  const reduceMotion = useReducedMotion();
  const visibleBrands = reduceMotion ? representedBrands : duplicatedBrands;

  return (
    <section
      className="overflow-hidden border-y border-[#101820]/10 bg-white py-10 select-none"
      aria-label="Marcas representadas por Del Carpio"
    >
      <div className="mx-auto mb-8 flex max-w-site justify-center px-5 text-center">
        <p className="font-sans text-sm font-medium leading-6 text-[#101820]/70">
          Marcas representadas por Del Carpio
          <span className="mx-3 text-[#D5542B]" aria-hidden="true">
            |
          </span>
          soporte tecnico para laboratorios e industria
        </p>
      </div>

      <ul className="sr-only">
        {representedBrands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>

      <div className="relative flex max-w-full items-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { x: ["0%", "-33.333%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 38,
          }}
          className="flex min-w-full items-center gap-14 whitespace-nowrap px-8 md:gap-20"
        >
          {visibleBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex h-24 min-w-[180px] items-center justify-center md:min-w-[230px]"
            >
              <Image
                src={brand.logo}
                alt=""
                width={brand.width}
                height={brand.height}
                className={`h-auto w-auto object-contain ${brand.className}`}
                sizes="(min-width: 768px) 230px, 170px"
              />
            </div>
          ))}
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent md:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white from-35% via-white/85 via-65% to-transparent md:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-px shadow-[-18px_0_48px_18px_rgba(16,24,32,0.08)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="mx-auto mt-7 h-px max-w-site bg-gradient-to-r from-transparent via-[#101820]/10 to-transparent"
      />
    </section>
  );
}
