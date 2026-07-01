"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

type SectorSolution = {
  sector: string;
  location: string;
  accentColor: string;
  cardBackground: string;
  labelColor: string;
  title: string;
  description: string;
  technicalLabel: string;
  href: string;
  imageBackground: string;
  imageSrc?: string;
};

const sectorSolutions: SectorSolution[] = [
  {
    sector: "Alimentos",
    location: "Alimentos · Chile",
    accentColor: "#FBE369",
    cardBackground: "#101820",
    labelColor: "#FBE369",
    title: "Control analítico en matrices alimentarias",
    description:
      "Pesticidas, metales pesados, microbiología y parámetros fisicoquímicos para exportación y consumo nacional.",
    technicalLabel: "HPLC · GC · AA",
    href: "/servicios/implementacion-hplc",
    imageBackground: "linear-gradient(135deg,#1a2614,#2d4020)",
  },
  {
    sector: "Minería",
    location: "Minería · Antofagasta",
    accentColor: "#D5542B",
    cardBackground: "#D5542B",
    labelColor: "rgba(255,255,255,0.75)",
    title: "Caracterización elemental de minerales",
    description:
      "ICP-OES, ICP-MS y AA para análisis de concentrados, efluentes y control de procesos mineros.",
    technicalLabel: "ICP-OES · ICP-MS · AA",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#2a1810,#3d2415)",
  },
  {
    sector: "Farmacéutica",
    location: "Farmacéutica · Santiago",
    accentColor: "#FFFFFF",
    cardBackground: "#101820",
    labelColor: "rgba(255,255,255,0.55)",
    title: "Validación y trazabilidad regulatoria",
    description:
      "HPLC, GC y validación de métodos según ICH Q2/Q3 para laboratorios farmacéuticos con exigencia regulatoria.",
    technicalLabel: "HPLC · GC · ICH Q2",
    href: "/servicios/validacion-trazabilidad",
    imageBackground: "linear-gradient(135deg,#101820,#1a2535)",
  },
  {
    sector: "Aguas",
    location: "Aguas · Bio-Bío",
    accentColor: "#53843A",
    cardBackground: "#53843A",
    labelColor: "rgba(255,255,255,0.75)",
    title: "Análisis fisicoquímico y microbiológico",
    description:
      "Parámetros bajo NCh 409, normas sanitarias chilenas y protocolos internacionales para agua potable e industrial.",
    technicalLabel: "NCh 409 · ISO 17025",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#0a1a14,#112b1e)",
  },
  {
    sector: "Ambiental",
    location: "Ambiental · Valparaíso",
    accentColor: "#53843A",
    cardBackground: "#53843A",
    labelColor: "rgba(255,255,255,0.75)",
    title: "Monitoreo de emisiones y suelos",
    description:
      "Caracterización de suelos, aguas residuales y emisiones bajo normativa SEIA y estándares ISO 17025.",
    technicalLabel: "SEIA · ISO 17025",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#0d1a0d,#162b16)",
  },
  {
    sector: "Academia / I+D",
    location: "Academia · I+D",
    accentColor: "#FFFFFF",
    cardBackground: "#101820",
    labelColor: "rgba(255,255,255,0.55)",
    title: "Soporte técnico para investigación",
    description:
      "Calibración de equipos, desarrollo de métodos analíticos y soporte técnico para proyectos de investigación.",
    technicalLabel: "Calibración · Métodos",
    href: "/servicios",
    imageBackground: "linear-gradient(135deg,#101820,#1e2c40)",
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
    <section id="industrias" className="bg-[var(--background)]">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-[75px] lg:grid-cols-[34%_66%] lg:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
            Sectores de aplicación
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold uppercase leading-tight text-[var(--foreground)] md:text-3xl">
            Soluciones por industria
          </h2>
          <p className="mt-5 max-w-sm text-xs leading-[22px] text-[var(--muted-soft)]">
            Aplicaciones analíticas para matrices industriales, laboratorios de
            control y equipos técnicos que necesitan evidencia defendible.
          </p>
          <Link
            href="/servicios"
            className="mt-7 inline-flex items-center gap-2 rounded-[2px] bg-[#D5542B] px-6 py-[13px] text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
          >
            Ver todos los servicios
            <span aria-hidden="true">→</span>
          </Link>
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
              className="flex gap-5 lg:gap-6"
            >
              {sectorSolutions.map((solution) => (
                <Link
                  key={solution.sector}
                  href={solution.href}
                  data-sector-card
                  className="relative min-h-[390px] w-[85vw] shrink-0 overflow-hidden rounded-[2px] p-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B] sm:w-[62vw] lg:w-[340px]"
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
                      className="object-cover opacity-45"
                      sizes="(min-width: 1024px) 340px, 85vw"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-[#101820]/35" />

                  <div className="relative flex min-h-[342px] flex-col justify-between">
                    <div>
                      <p
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: solution.labelColor }}
                      >
                        {solution.location}
                      </p>

                      <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight">
                        {solution.title}
                      </h3>

                      <p className="mt-4 text-sm leading-6 text-white/80">
                        {solution.description}
                      </p>
                    </div>

                    <div>
                      <span
                        className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: solution.accentColor }}
                      >
                        {solution.technicalLabel}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center gap-2 lg:justify-start">
            {sectorSolutions.map((solution, index) => (
              <button
                key={solution.sector}
                type="button"
                aria-label={`Ver sector ${solution.sector}`}
                aria-current={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className="h-2.5 w-2.5 rounded-full bg-[#101820]/25 transition-colors aria-current:bg-[#D5542B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
