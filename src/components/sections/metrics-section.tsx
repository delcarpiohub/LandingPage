"use client";

import {
  ChartBar,
  ClockCounterClockwise,
  HardDrives,
  Handshake,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const metrics: Array<{
  icon: Icon;
  value: number;
  suffix: string;
  title: string;
}> = [
  {
    icon: ClockCounterClockwise,
    value: 31,
    suffix: "",
    title: "Años de Experiencia",
  },
  {
    icon: Handshake,
    value: 20,
    suffix: "+",
    title: "Marcas Representadas",
  },
  {
    icon: HardDrives,
    value: 400,
    suffix: "+",
    title: "Equipos Instalados",
  },
  {
    icon: ChartBar,
    value: 200,
    suffix: "+",
    title: "Proyectos Completados",
  },
];

function MetricValue({
  value,
  suffix,
  shouldStart,
}: {
  value: number;
  suffix: string;
  shouldStart: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    if (!shouldStart || reduceMotion) {
      return;
    }

    let frame = 0;
    const duration = 1100;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    let startedAt = 0;

    frame = requestAnimationFrame((currentTime) => {
      startedAt = currentTime;
      setAnimatedValue(0);
      frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, shouldStart, value]);

  const displayValue = reduceMotion ? value : animatedValue;

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="metricas"
      aria-labelledby="metrics-section-title"
      className="bg-[#101820] px-6 py-[72px] text-white md:px-12 md:py-24 lg:px-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1280px] text-center">
        <motion.p
          className="font-sans text-[18px] font-normal tracking-[0.03em] text-white/45 md:text-[20px]"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          Por Qué Elegirnos
        </motion.p>

        <motion.h2
          id="metrics-section-title"
          className="mt-[18px] font-display text-[38px] font-extrabold leading-[1.05] text-white md:text-[52px] lg:text-[64px]"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          Nuestros Números
        </motion.h2>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-20">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.article
                key={metric.title}
                className="group flex flex-col items-center text-center transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-2"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <motion.span
                  aria-hidden="true"
                  className="grid size-16 place-items-center text-white transition-colors duration-300 group-hover:text-[#D5542B]"
                  animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.18,
                  }}
                >
                  <Icon size={64} weight="fill" />
                </motion.span>

                <p className="mt-7 font-display text-[48px] font-extrabold leading-none text-white transition-colors duration-300 group-hover:text-[#D5542B] md:text-[54px]">
                  <MetricValue
                    value={metric.value}
                    suffix={metric.suffix}
                    shouldStart={isInView}
                  />
                </p>

                <h3 className="mt-3 max-w-[240px] font-sans text-[22px] font-bold leading-[1.25] text-white md:text-[28px] md:leading-[1.35]">
                  {metric.title}
                </h3>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
