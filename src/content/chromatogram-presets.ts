import type { ChromatogramPeak } from "@/components/motion/chromatogram-line";

// Datos puramente decorativos para la "firma científica" del home (Pieza A,
// flag firmaCromatograma en src/config/features.ts). No representan corridas
// reales: pos/altura/ancho se eligieron solo por composición visual.
type ChromatogramPreset = {
  label: string;
  peaks: ChromatogramPeak[];
  peaksMobile: ChromatogramPeak[];
};

export const CHROMATOGRAM_PRESETS: Record<
  "heroToExplore" | "proyectosToMetricas" | "labToTestimonios",
  ChromatogramPreset
> = {
  heroToExplore: {
    label: "Catálogo",
    peaks: [
      { pos: 0.12, altura: 0.22, ancho: 0.05 },
      { pos: 0.3, altura: 0.38, ancho: 0.06 },
      { pos: 0.52, altura: 0.9, ancho: 0.05, acento: true },
      { pos: 0.72, altura: 0.3, ancho: 0.07 },
      { pos: 0.88, altura: 0.18, ancho: 0.05 },
    ],
    peaksMobile: [
      { pos: 0.25, altura: 0.3, ancho: 0.08 },
      { pos: 0.55, altura: 0.85, ancho: 0.07, acento: true },
      { pos: 0.82, altura: 0.2, ancho: 0.07 },
    ],
  },
  proyectosToMetricas: {
    label: "Métricas",
    peaks: [
      { pos: 0.1, altura: 0.16, ancho: 0.04 },
      { pos: 0.26, altura: 0.5, ancho: 0.05 },
      { pos: 0.4, altura: 0.26, ancho: 0.04 },
      { pos: 0.6, altura: 0.95, ancho: 0.045, acento: true },
      { pos: 0.78, altura: 0.32, ancho: 0.06 },
      { pos: 0.92, altura: 0.14, ancho: 0.04 },
    ],
    peaksMobile: [
      { pos: 0.22, altura: 0.35, ancho: 0.07 },
      { pos: 0.58, altura: 0.9, ancho: 0.06, acento: true },
      { pos: 0.85, altura: 0.18, ancho: 0.06 },
    ],
  },
  labToTestimonios: {
    label: "Testimonios",
    peaks: [
      { pos: 0.15, altura: 0.3, ancho: 0.06 },
      { pos: 0.34, altura: 0.2, ancho: 0.05 },
      { pos: 0.5, altura: 0.6, ancho: 0.05 },
      { pos: 0.68, altura: 0.92, ancho: 0.05, acento: true },
      { pos: 0.86, altura: 0.22, ancho: 0.05 },
    ],
    peaksMobile: [
      { pos: 0.28, altura: 0.32, ancho: 0.08 },
      { pos: 0.62, altura: 0.88, ancho: 0.07, acento: true },
      { pos: 0.88, altura: 0.16, ancho: 0.06 },
    ],
  },
};
