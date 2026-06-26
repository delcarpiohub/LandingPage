"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";

const easeOut = [0.23, 1, 0.32, 1] as const;

function heroAnimation({
  delay,
  duration,
  y,
  reduceMotion,
}: {
  delay: number;
  duration: number;
  y: number;
  reduceMotion: boolean | null;
}) {
  return {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { duration, delay, ease: easeOut },
  };
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100dvh-80px)] overflow-hidden border-b border-[var(--border)] bg-[var(--foreground)] text-white"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale: reduceMotion ? 1 : photoScale }}
      >
        <Image
          src="/fotos/hero-laboratorio.jpg"
          alt="Laboratorio Del Carpio con equipo analitico en operacion"
          fill
          className="object-cover object-center opacity-[0.65]"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(16,24,32,0.96)_0%,rgba(16,24,32,0.72)_48%,rgba(16,24,32,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,var(--foreground)_0%,transparent_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-80px)] max-w-7xl flex-col justify-end px-5 pb-12 pt-28">
        <div className="max-w-[52rem]">
          <motion.p
            className="mb-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45"
            {...heroAnimation({ delay: 0.15, duration: 0.5, y: 10, reduceMotion })}
          >
            Instrumentación analítica / HPLC, GC, ICP-OES / Santiago, Chile
          </motion.p>

          <motion.h1
            className="text-[2.6rem] font-semibold leading-[1.08] sm:text-5xl md:text-[5rem] md:leading-[1.04]"
            {...heroAnimation({ delay: 0.28, duration: 0.65, y: 16, reduceMotion })}
          >
            Cromatografía para laboratorios que deben responder con evidencia.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[38rem] text-lg leading-8 text-white/68"
            {...heroAnimation({ delay: 0.42, duration: 0.6, y: 12, reduceMotion })}
          >
            Implementamos, validamos y mantenemos sistemas HPLC y GC para procesos industriales donde la trazabilidad pesa tanto como el resultado.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            {...heroAnimation({ delay: 0.55, duration: 0.5, y: 10, reduceMotion })}
          >
            <Button asChild className="w-full sm:w-auto">
              <a href="#contacto">
                {company.primaryCta}
                <ArrowRight size={17} weight="bold" />
              </a>
            </Button>
            <a
              href="#servicios"
              className="text-sm font-medium text-white/60 underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-white/85"
            >
              Revisar servicios
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
