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
  // Solo aplica con heroVariant "immersive". Lado donde va el bloque de
  // texto — depende de dónde esté despejado el sujeto principal de la
  // foto. Default "right".
  heroContentAlign?: "left" | "right";
};

// Las asignaciones de servicios permanecen vacías hasta que Ventas valide
// qué capacidades corresponden realmente a cada industria.
export const solutionPages: Record<string, SolutionPageConfig> = {
  alimentos: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/alimentos-hero-inmersivo.jpg",
      alt: "Selección de frutas, huevos y preparaciones de desayuno sobre una mesa. Imagen editorial de referencia, no corresponde a un laboratorio ni instalación de Del Carpio.",
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
  },
  mineria: {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/mineria-hero-inmersivo.jpg",
      alt: "Maquinaria de excavación en una operación minera. Imagen editorial de referencia, no corresponde a una faena ni instalación de Del Carpio.",
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
  },
  farmaceutica: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/farmaceutica-hero-inmersivo.jpg",
      alt: "Manos con guantes de laboratorio sosteniendo una gradilla con viales de muestra. Imagen editorial de referencia, no corresponde a un laboratorio real de Del Carpio.",
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
  },
  aguas: {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/agua-hero-inmersivo.jpg",
      alt: "Mano con guante de laboratorio sosteniendo un vaso de precipitado con líquido claro. Imagen editorial de referencia, no corresponde a un laboratorio real de Del Carpio.",
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
  },
  ambiental: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/ambiente-hero-inmersivo.jpg",
      alt: "Manos sosteniendo tierra con un brote verde sobre follaje. Imagen editorial de referencia, no corresponde a un terreno ni proyecto real de Del Carpio.",
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
  },
  "academia-id": {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/academia-id-hero-inmersivo.jpg",
      alt: "Personas con delantal de laboratorio manipulando un tubo de ensayo frente a una pizarra con fórmulas. Imagen editorial de referencia, no corresponde a un laboratorio real de Del Carpio.",
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
  },
};
