"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const representedBrands = [
  {
    name: "Hanon Instruments",
    logo: "/marcas/hanon-instruments.png",
    width: 1744,
    height: 821,
  },
  {
    name: "Infitek",
    logo: "/marcas/infitek.png",
    width: 600,
    height: 300,
  },
  {
    name: "NCS Germany",
    logo: "/marcas/ncs-germany.png",
    width: 1024,
    height: 223,
  },
  {
    name: "Peak Instrument",
    logo: "/marcas/peak-instrument.webp",
    width: 640,
    height: 160,
  },
  {
    name: "Witeg",
    logo: "/marcas/witeg.png",
    width: 1000,
    height: 360,
  },
  {
    name: "Witeg Labortechnik",
    logo: "/marcas/witeg-labortechnik.png",
    width: 300,
    height: 300,
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
      className="overflow-hidden border-y border-white/10 bg-[#101820] py-5 select-none"
      aria-label="Marcas representadas por Del Carpio"
    >
      <ul className="sr-only">
        {representedBrands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>

      <div className="relative flex max-w-full items-center">
        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { x: ["0%", "-33.333%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 34,
          }}
          className="flex min-w-full items-center gap-5 whitespace-nowrap"
        >
          {visibleBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex h-16 min-w-[188px] items-center justify-center border border-white/15 bg-white px-7 shadow-sm"
            >
              <Image
                src={brand.logo}
                alt=""
                width={brand.width}
                height={brand.height}
                className="max-h-9 w-auto max-w-[138px] object-contain"
                sizes="138px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
