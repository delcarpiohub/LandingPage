"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";

type SectorSolution = {
  sector: string;
  accentColor: string;
  cardBackground: string;
  href: string;
  imageBackground: string;
  imageSrc?: string;
};

// decisión final aprobada, ver docs/fase2-v2-revision-color.md
const sectorSolutions: SectorSolution[] = [
  {
    sector: "Alimentos",
    accentColor: "#FBE369",
    cardBackground: "#101820",
    href: "/servicios/implementacion-hplc",
    imageBackground: "linear-gradient(135deg,#1a2614,#2d4020)",
    imageSrc: "/fotos/hero-laboratorio.jpg",
  },
  {
    sector: "Minería",
    accentColor: "#D5542B",
    cardBackground: "#D5542B",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#2a1810,#3d2415)",
    imageSrc: "/fotos/instalacion-campana.jpg",
  },
  {
    sector: "Farmacéutica",
    accentColor: "#FFFFFF",
    cardBackground: "#101820",
    href: "/servicios/validacion-trazabilidad",
    imageBackground: "linear-gradient(135deg,#101820,#1a2535)",
    imageSrc: "/fotos/instalacion-hplc-equipo.jpg",
  },
  {
    sector: "Aguas",
    accentColor: "#53843A",
    cardBackground: "#53843A",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#0a1a14,#112b1e)",
    imageSrc: "/fotos/instalacion-hplc-operador.jpg",
  },
  {
    sector: "Ambiental",
    accentColor: "#53843A",
    cardBackground: "#53843A",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#0d1a0d,#162b16)",
    imageSrc: "/fotos/hero-laboratorio.jpg",
  },
  {
    sector: "Academia / I+D",
    accentColor: "#FFFFFF",
    cardBackground: "#101820",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#101820,#1e2c40)",
    imageSrc: "/fotos/instalacion-hplc-equipo.jpg",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function IndustryTabs() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const activeOffset = useMemo(
    () => Math.min(activeIndex * step, maxOffset),
    [activeIndex, maxOffset, step],
  );

  useEffect(() => {
    const updateMeasurements = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const firstCard = track?.querySelector<HTMLElement>("[data-sector-card]");

      if (!viewport || !track || !firstCard) {
        return;
      }

      const cardWidth = firstCard.getBoundingClientRect().width;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

      setStep(cardWidth + gap);
      setMaxOffset(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, []);

  return (
    <section id="industrias" className="bg-[#F7F7F5]">
      <div className="mx-auto grid max-w-site gap-12 px-5 py-20 md:grid-cols-[34%_66%] md:items-center lg:py-24">
        <div className="flex flex-col items-start justify-center">
          <Reveal delay={0}>
            <h2 className="max-w-[320px] font-display text-[36px] font-bold leading-[1.08] text-[#101820] md:text-[42px]">
              Soluciones por industria
            </h2>
          </Reveal>
          
          <Reveal delay={0.1} className="mt-4">
            <p className="max-w-[265px] text-[10px] leading-4 text-[#101820]/45">
              Aplicaciones analíticas para matrices industriales, laboratorios de
              control y equipos técnicos que necesitan evidencia defendible.
            </p>
          </Reveal>
          
          <Reveal delay={0.2} className="mt-8">
            <Link
              href="/servicios"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D5542B] px-6 text-[10px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_14px_34px_rgba(213,84,43,0.24)] transition hover:-translate-y-0.5 hover:bg-[#B8431E] hover:shadow-[0_18px_42px_rgba(213,84,43,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B] active:scale-[0.98]"
            >
              Ver todos los servicios
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
            </Link>
          </Reveal>
        </div>

        <div>
          <div ref={viewportRef} className="overflow-hidden">
            <motion.div
              ref={trackRef}
              drag="x"
              dragConstraints={{ left: -maxOffset, right: 0 }}
              dragElastic={0.08}
              animate={{ x: -activeOffset }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              onDragEnd={(_, info) => {
                if (!step) {
                  return;
                }

                const projectedOffset = clamp(
                  activeOffset - info.offset.x - info.velocity.x * 0.12,
                  0,
                  maxOffset,
                );

                setActiveIndex(
                  clamp(
                    Math.round(projectedOffset / step),
                    0,
                    sectorSolutions.length - 1,
                  ),
                );
              }}
              className="flex gap-3 py-2 md:gap-4"
            >
              {sectorSolutions.map((solution, index) => {
                const isFeatured = index === 0;

                return (
                <Reveal
                  key={solution.sector}
                  delay={index * 0.05}
                  className={
                    isFeatured
                      ? "flex w-[76vw] shrink-0 sm:w-[240px] md:w-[210px]"
                      : "flex w-[72vw] shrink-0 sm:w-[220px] md:w-[190px]"
                  }
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex h-full w-full shrink-0"
                  >
                    <Link
                      href={solution.href}
                      data-sector-card
                      className="group relative min-h-[212px] w-full overflow-hidden rounded-[2px] p-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B] md:min-h-[238px]"
                      style={{ background: solution.cardBackground }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ background: solution.imageBackground }}
                      />

                      {solution.imageSrc ? (
                        <Image
                          src={solution.imageSrc}
                          alt={`Aplicación para ${solution.sector}`}
                          fill
                          className="object-cover opacity-45 transition-transform duration-400 ease-out group-hover:scale-[1.04]"
                          sizes="(min-width: 768px) 210px, 76vw"
                        />
                      ) : null}

                      <div className="absolute inset-0 bg-[#101820]/38" />

                      {/* Borde de acento al hover */}
                      <span
                        className="absolute inset-0 z-30 pointer-events-none rounded-[2px] border-2 border-transparent transition-colors duration-[250ms] group-hover:border-current"
                        style={{ color: solution.accentColor }}
                      />

                      <div className="relative flex min-h-[188px] w-full flex-col justify-between md:min-h-[214px]">
                        <div>
                          <h3
                            className={
                              isFeatured
                                ? "font-display text-[22px] font-extrabold leading-none text-white md:text-[26px]"
                                : "font-display text-[21px] font-extrabold leading-none text-white md:text-[24px]"
                            }
                          >
                            {solution.sector}
                          </h3>
                        </div>

                        <div className="flex items-center justify-end">
                          <span className="grid size-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-transform duration-200 ease-out group-hover:translate-x-[3px] hover:bg-white/20">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </Reveal>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-4 flex justify-center gap-2 md:justify-start">
            {sectorSolutions.map((solution, index) => (
              <button
                key={solution.sector}
                type="button"
                aria-label={`Ver sector ${solution.sector}`}
                aria-current={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className="h-2.5 w-2.5 rounded-full bg-[#101820]/25 transition-all duration-200 aria-current:bg-[#D5542B] aria-current:scale-[1.3] scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
