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
    className: "max-h-9 max-w-[130px] md:max-h-10 md:max-w-[150px]",
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

export function LabPhotos() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden bg-[#F7F7F5] px-6 py-14 md:px-10 md:py-16 lg:px-16 lg:py-20"
      aria-labelledby="represented-brands-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-[linear-gradient(180deg,rgba(213,84,43,0.12),rgba(213,84,43,0))]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 lg:min-h-[720px] lg:grid-cols-[42%_58%] lg:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center lg:justify-center"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[420px]"
          >
            <div className="absolute inset-x-8 bottom-0 h-24 rounded-full bg-[#101820]/18 blur-[34px]" />
            <div className="relative overflow-hidden rounded-[18px] border border-white bg-white shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
              <div className="relative aspect-[4/5] bg-white">
                <Image
                  src="/fotos/instalacion-hplc-equipo.jpg"
                  alt="Equipo de laboratorio Del Carpio usado como visual principal"
                  fill
                  sizes="(min-width: 1024px) 420px, 86vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_58%,rgba(247,247,245,0.64)_100%)]" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
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

      <motion.ul
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.055,
            },
          },
        }}
        className="relative z-20 mx-auto -mt-4 grid max-w-[1440px] grid-cols-2 gap-3 md:-mt-20 md:grid-cols-4 md:gap-[18px] lg:grid-cols-7"
      >
        {representedBrands.map((brand) => (
          <motion.li
            key={brand.name}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex h-[76px] min-w-[150px] items-center justify-center rounded-full border border-[#D5542B]/35 bg-white px-6 shadow-[0_10px_30px_rgba(16,24,32,0.04)] transition hover:-translate-y-1 hover:border-[#D5542B] hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className={`h-auto w-auto object-contain ${brand.className}`}
                sizes="150px"
              />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
