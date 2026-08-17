"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

// Traza tipo cromatograma/espectro — motivo visual propio del sitio, no un
// ícono de librería ni un patrón decorativo genérico: es literalmente lo que
// producen los instrumentos HPLC/GC que vende Del Carpio (línea base + picos
// asimétricos con "tailing", igual que un cromatograma real). El número de
// picos se deriva del número real de equipos compatibles auditados para esa
// industria (ver solution-pages.ts) — no es aleatorio decorativo, tiene una
// razón detrás. La posición/altura de cada pico es pseudo-aleatoria pero
// determinística (semillada por `industry.slug`), así que es estable entre
// server y cliente y no cambia en cada render.
const WIDTH = 1000;
const HEIGHT = 140;
const BASELINE = HEIGHT - 20;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (Math.imul(31, hash) + value.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateTracePath(seed: string, peakCount: number): string {
  const random = mulberry32(hashString(seed));
  const segment = WIDTH / (peakCount + 1);
  let d = `M 0 ${BASELINE}`;

  for (let i = 0; i < peakCount; i++) {
    const center = segment * (i + 1) + (random() - 0.5) * segment * 0.25;
    const height = HEIGHT * (0.34 + random() * 0.5);
    const peakY = BASELINE - height;
    const rise = segment * (0.16 + random() * 0.08);
    const tail = segment * (0.32 + random() * 0.16);
    const startX = Math.max(0, center - rise);
    const endX = Math.min(WIDTH, center + tail);

    d += ` L ${startX.toFixed(1)} ${BASELINE}`;
    d += ` C ${(startX + rise * 0.25).toFixed(1)} ${BASELINE} ${(center - rise * 0.1).toFixed(1)} ${peakY.toFixed(1)} ${center.toFixed(1)} ${peakY.toFixed(1)}`;
    d += ` C ${(center + tail * 0.35).toFixed(1)} ${peakY.toFixed(1)} ${(center + tail * 0.78).toFixed(1)} ${BASELINE} ${endX.toFixed(1)} ${BASELINE}`;
  }

  d += ` L ${WIDTH} ${BASELINE}`;
  return d;
}

export function SolutionChromatogram({
  seed,
  peakCount,
  accentColor,
}: {
  seed: string;
  peakCount: number;
  accentColor: string;
}) {
  const reduceMotion = useReducedMotion();
  const path = useMemo(() => generateTracePath(seed, peakCount), [seed, peakCount]);
  const draw = reduceMotion
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      preserveAspectRatio="none"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    >
      <line
        stroke="var(--border)"
        strokeWidth={1}
        x1={0}
        x2={WIDTH}
        y1={BASELINE}
        y2={BASELINE}
      />
      {/* Halo oscuro debajo del trazo de color — mantiene la línea legible
          incluso con el amarillo de marca, que es demasiado claro para leerse
          solo sobre blanco. */}
      <motion.path
        d={path}
        fill="none"
        stroke="var(--nav-bg)"
        strokeLinecap="round"
        strokeWidth={5}
        {...draw}
      />
      <motion.path d={path} fill="none" stroke={accentColor} strokeLinecap="round" strokeWidth={2} {...draw} />
    </svg>
  );
}
