"use client";

import { useRef, type RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export type ChromatogramPeak = {
  /** Posición horizontal del pico, 0-1 (fracción del ancho total). */
  pos: number;
  /** Altura del pico, 0-1 (fracción del alto disponible sobre la línea base). */
  altura: number;
  /** Ancho del pico (FWHM aproximado), 0-1 (fracción del ancho total). */
  ancho: number;
  /** Único pico de acento por línea: se dibuja en terracota con relleno plano. */
  acento?: boolean;
};

type Geometry = {
  width: number;
  height: number;
  baseY: number;
  baselineD: string;
  tickXs: number[];
  slateD: string;
  accentStrokeD: string | null;
  accentFillD: string | null;
};

const VIEWBOX_WIDTH = 1000;
const SAMPLES = 160;
const BASELINE_RATIO = 0.82;

// Curva = línea base + suma de gaussianas. Determinista (sin Math.random):
// mismos props producen siempre el mismo path, en servidor y cliente.
function gaussianAt(x: number, peaks: ChromatogramPeak[]): number {
  let y = 0;
  for (const peak of peaks) {
    const sigma = Math.max(peak.ancho, 0.015) / 2.3548;
    const dx = x - peak.pos;
    y += peak.altura * Math.exp(-(dx * dx) / (2 * sigma * sigma));
  }
  return y;
}

function buildGeometry(peaks: ChromatogramPeak[], height: number, ticks: number): Geometry {
  const width = VIEWBOX_WIDTH;
  const baseY = height * BASELINE_RATIO;
  const usableHeight = baseY * 0.88;
  const accent = peaks.find((peak) => peak.acento);

  const points: Array<[number, number]> = [];
  for (let i = 0; i <= SAMPLES; i += 1) {
    const xFrac = i / SAMPLES;
    const y = baseY - gaussianAt(xFrac, peaks) * usableHeight;
    points.push([xFrac * width, y]);
  }
  const slateD = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");

  let accentStrokeD: string | null = null;
  let accentFillD: string | null = null;
  if (accent) {
    const sigma = Math.max(accent.ancho, 0.015) / 2.3548;
    const start = Math.max(0, accent.pos - 2.2 * sigma);
    const end = Math.min(1, accent.pos + 2.2 * sigma);
    const accentPoints = points.filter(([x]) => x / width >= start && x / width <= end);
    if (accentPoints.length > 1) {
      accentStrokeD = accentPoints
        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
        .join(" ");
      const firstX = accentPoints[0][0];
      const lastX = accentPoints[accentPoints.length - 1][0];
      accentFillD = `${accentStrokeD} L${lastX.toFixed(2)},${baseY.toFixed(2)} L${firstX.toFixed(2)},${baseY.toFixed(2)} Z`;
    }
  }

  const tickXs = Array.from({ length: ticks }, (_, i) => ((i + 1) / (ticks + 1)) * width);
  const baselineD = `M0,${baseY.toFixed(2)} L${width},${baseY.toFixed(2)}`;

  return { width, height, baseY, baselineD, tickXs, slateD, accentStrokeD, accentFillD };
}

function StaticTrace({ geometry }: { geometry: Geometry }) {
  return (
    <>
      {geometry.accentFillD ? (
        <path d={geometry.accentFillD} fill="#D6532B" opacity={0.08} stroke="none" />
      ) : null}
      <path d={geometry.slateD} fill="none" stroke="#4A5560" strokeWidth={1.25} />
      {geometry.accentStrokeD ? (
        <path d={geometry.accentStrokeD} fill="none" stroke="#D6532B" strokeWidth={1.75} />
      ) : null}
    </>
  );
}

function AnimatedTrace({
  geometry,
  containerRef,
}: {
  geometry: Geometry;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 55%"],
  });
  const fillOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.08]);

  return (
    <>
      {geometry.accentFillD ? (
        <motion.path
          d={geometry.accentFillD}
          fill="#D6532B"
          stroke="none"
          style={{ opacity: fillOpacity }}
        />
      ) : null}
      <motion.path
        d={geometry.slateD}
        fill="none"
        stroke="#4A5560"
        strokeWidth={1.25}
        style={{ pathLength: scrollYProgress }}
      />
      {geometry.accentStrokeD ? (
        <motion.path
          d={geometry.accentStrokeD}
          fill="none"
          stroke="#D6532B"
          strokeWidth={1.75}
          style={{ pathLength: scrollYProgress }}
        />
      ) : null}
    </>
  );
}

function ChromatogramSvg({
  peaks,
  height,
  ticks,
  label,
  reduceMotion,
}: {
  peaks: ChromatogramPeak[];
  height: number;
  ticks: number;
  label?: string;
  reduceMotion: boolean;
}) {
  const geometry = buildGeometry(peaks, height, ticks);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      <svg
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={geometry.baselineD} stroke="#4A5560" strokeOpacity={0.18} strokeWidth={1} />
        {geometry.tickXs.map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={geometry.baseY - 5}
            y2={geometry.baseY + 5}
            stroke="#4A5560"
            strokeOpacity={0.18}
            strokeWidth={1}
          />
        ))}
        {reduceMotion ? (
          <StaticTrace geometry={geometry} />
        ) : (
          <AnimatedTrace geometry={geometry} containerRef={containerRef} />
        )}
      </svg>
      {label ? (
        <span className="absolute right-0 top-0 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#4A5560]/60">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export interface ChromatogramLineProps {
  peaks: ChromatogramPeak[];
  peaksMobile?: ChromatogramPeak[];
  alto?: number;
  altoMobile?: number;
  ticks?: number;
  label?: string;
  className?: string;
}

// Línea fina SVG que se dibuja al hacer scroll, extensión de la línea de
// calibración ya usada en metrics-section.tsx. aria-hidden y altura fija
// (cero CLS): es decorativo, no transmite información.
export function ChromatogramLine({
  peaks,
  peaksMobile,
  alto = 64,
  altoMobile = 40,
  ticks = 5,
  label,
  className,
}: ChromatogramLineProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className ?? ""}`}>
      <div className="hidden sm:block">
        <ChromatogramSvg peaks={peaks} height={alto} ticks={ticks} label={label} reduceMotion={reduceMotion} />
      </div>
      <div className="sm:hidden">
        <ChromatogramSvg
          peaks={peaksMobile ?? peaks.slice(0, 3)}
          height={altoMobile}
          ticks={Math.min(ticks, 4)}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
}
