import type { CoreService } from "@/content/site";

export type SolutionPageConfig = {
  heroTone: "light" | "dark";
  media?: {
    src: string;
    alt: string;
  };
  serviceIds: CoreService["id"][];
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
      src: "/fotos/industrias/mineria.jpg",
      alt: "Fotografía documental de apoyo para soluciones en minería.",
    },
    serviceIds: [],
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
