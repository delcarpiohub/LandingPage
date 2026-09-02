"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Blob {
  /** "r, g, b" — siempre un color de marca Del Carpio, nunca fuera de paleta */
  color: string;
  cx: number;
  cy: number;
  radius: number;
  /** fase estática por blob (hash fijo del seed, no se recalcula por frame) */
  px: number;
  py: number;
}

function hashPhase(seed: number) {
  const s = Math.sin(seed * 12.9898) * 43758.5453;
  return (s - Math.floor(s)) * Math.PI * 2;
}

// Blobs anclados a colores reales de marca (tailwind.config.ts):
// terracota primary, ink dark, verde oliva sector.aguas/ambiental, secondary gris.
const BLOBS: Blob[] = [
  { color: "214, 83, 43", cx: 70, cy: 38, radius: 62, px: hashPhase(1.7), py: hashPhase(4.1) },
  { color: "74, 85, 96", cx: 26, cy: 72, radius: 56, px: hashPhase(3.3), py: hashPhase(6.9) },
  { color: "83, 132, 58", cx: 82, cy: 84, radius: 48, px: hashPhase(5.9), py: hashPhase(2.2) },
  { color: "112, 126, 131", cx: 38, cy: 16, radius: 52, px: hashPhase(0.4), py: hashPhase(8.6) },
];

const BACKDROP = "#F4F4F4";
const SPEED = 1;
const AMOUNT = 0.4;

// Caída suave en coseno: 1 en el centro, 0 en el borde del blob, sin quiebres.
function falloff(f: number) {
  return (Math.cos(Math.min(f, 1) * Math.PI) + 1) / 2;
}

function buildBackground(ph: number) {
  return BLOBS.map((blob) => {
    const dx = (Math.sin(ph * 0.55 + blob.px) - Math.sin(blob.px)) * 14 * AMOUNT;
    const dy = (Math.sin(ph * 0.43 + blob.py) - Math.sin(blob.py)) * 14 * AMOUNT;
    const x = blob.cx + dx;
    const y = blob.cy + dy;
    const stops = [0, 0.25, 0.5, 0.75, 1]
      .map((f) => `rgba(${blob.color}, ${falloff(f).toFixed(3)}) ${(f * blob.radius).toFixed(2)}%`)
      .join(", ");
    return `radial-gradient(circle at ${x.toFixed(2)}% ${y.toFixed(2)}%, ${stops})`;
  }).join(", ");
}

interface BrandMeshGradientProps {
  className?: string;
  /** Color sólido detrás de los blobs. Usa "transparent" cuando el
   * componente se aplica como capa de blend sobre otro fondo (foto/video). */
  backdrop?: string;
}

export function BrandMeshGradient({ className, backdrop = BACKDROP }: BrandMeshGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layerRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.style.backgroundImage = buildBackground(0);
      return;
    }

    let frame: number | null = null;
    let isInViewport = false;
    const start = performance.now();

    const tick = (now: number) => {
      frame = null;
      if (!isInViewport || document.hidden) return;

      const t = (now - start) / 1000;
      el.style.backgroundImage = buildBackground(t * SPEED);
      frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (frame === null && isInViewport && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        if (!isInViewport && frame !== null) {
          cancelAnimationFrame(frame);
          frame = null;
          return;
        }

        schedule();
      },
      { threshold: 0.05 },
    );

    const handleVisibilityChange = () => {
      if (document.hidden && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
        return;
      }

      schedule();
    };

    observer.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ backgroundColor: backdrop }}
    >
      <div ref={layerRef} className="absolute inset-0" style={{ backgroundImage: buildBackground(0) }} />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
