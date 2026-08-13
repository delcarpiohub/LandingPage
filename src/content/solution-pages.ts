import type { CoreService } from "@/content/site";

export type SolutionPageConfig = {
  heroTone: "light" | "dark";
  media?: {
    src: string;
    alt: string;
  };
  serviceIds: CoreService["id"][];
  // Variante de hero opcional. "split" (default) es el hero dividido
  // compartido por todas las industrias. "immersive" es una excepción
  // puntual con foto a sección completa — ver solution-immersive-hero.tsx.
  heroVariant?: "split" | "immersive";
};

// Las asignaciones de servicios permanecen vacías hasta que Ventas valide
// qué capacidades corresponden realmente a cada industria.
export const solutionPages: Record<string, SolutionPageConfig> = {
  alimentos: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/alimentos.jpg",
      alt: "Fotografía documental de apoyo para soluciones en alimentos.",
    },
    serviceIds: [],
  },
  mineria: {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/mineria-hero-inmersivo.jpg",
      alt: "Maquinaria de excavación en una operación minera. Imagen editorial de referencia, no corresponde a una faena ni instalación de Del Carpio.",
    },
    serviceIds: [],
    heroVariant: "immersive",
  },
  farmaceutica: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/farmaceutica.jpg",
      alt: "Fotografía documental de apoyo para soluciones farmacéuticas.",
    },
    serviceIds: [],
  },
  aguas: {
    heroTone: "dark",
    serviceIds: [],
  },
  ambiental: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/ambiente.jpg",
      alt: "Fotografía documental de apoyo para soluciones ambientales.",
    },
    serviceIds: [],
  },
  "academia-id": {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/academia-id.jpg",
      alt: "Fotografía documental de apoyo para academia e investigación.",
    },
    serviceIds: [],
  },
};
