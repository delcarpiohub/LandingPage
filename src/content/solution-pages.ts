import type { CoreService } from "@/content/site";

export type SolutionPageConfig = {
  heroTone: "light" | "dark";
  media?: {
    src: string;
    alt: string;
    // Permite preservar el punto de interés de una fotografía dentro del
    // encuadre panorámico compartido, sin alterar el layout del hero.
    objectPosition?: string;
    // Proporción natural de la foto bajo escritorio. Evita recortes y bandas
    // de relleno cuando el hero se apila en móvil o tablet.
    mobileAspectRatio?: number;
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
  // Fila de 5 diferenciadores reales de Del Carpio (no industria-específica,
  // por eso no requiere auditoría por industria — se activó primero solo en
  // alimentos y desde 2026-08-17 está activa en las 6 industrias). Contenido
  // tomado 1:1 de `coreServices`/`metrics` en site.ts, nunca frases de
  // marketing inventadas (ver DESIGN.md "Don't inventar frases como 'calidad
  // garantizada'").
  showDifferentiators?: boolean;
  // Copia específica de los pills bajo el hero. La técnica y la aplicación
  // proceden de la primera fila de solutionContent; estas dos piezas recogen
  // su resultado y la familia predominante de la grilla real de equipos.
  differentiatorCopy?: {
    outcome: string;
    outcomeDetail: string;
    equipmentFamily: string;
    equipmentDetail: string;
  };
  // Slugs de mock-products.ts con compatibilidad TEXTUAL EXPLÍCITA con esta
  // industria (mención literal en description/subtitle/advantages/tags/
  // aplicaciones) — no solo coincidencia de categoría. Auditado a mano
  // producto por producto el 2026-08-17; ver .agent-log/sessions.md para el
  // detalle de la metodología y la lista de exclusiones. Cuando está
  // presente, reemplaza el layout de 4 productos curados de la sección
  // "Equipamiento y consumibles" por una grilla con todos los equipos
  // verificados.
  compatibleEquipmentSlugs?: string[];
};

// Las asignaciones de servicios permanecen vacías hasta que Ventas valide
// qué capacidades corresponden realmente a cada industria.
export const solutionPages: Record<string, SolutionPageConfig> = {
  alimentos: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/alimentos-hero-inmersivo.jpg",
      alt: "Selección de frutas, huevos y preparaciones de desayuno sobre una mesa. Imagen editorial de referencia, no corresponde a un laboratorio ni instalación de Del Carpio.",
      mobileAspectRatio: 2400 / 1559,
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
    showDifferentiators: true,
    differentiatorCopy: {
      outcome: "Listo para exportación",
      outcomeDetail: "control de residuos antes del envío",
      equipmentFamily: "Línea Kjeldahl",
      equipmentDetail: "proteína, nitrógeno y preparación de muestra",
    },
    compatibleEquipmentSlugs: [
      "hanon-k1160",
      "hanon-k9860",
      "hanon-k9840",
      "hanon-k1100f",
      "hanon-sh420f",
      "hanon-sh520",
      "hanon-sox606",
      "hanon-sox406",
      "hanon-sh220f",
      "infitek-lyo60b-series",
      "decent-mezclador-tipo-v",
    ],
  },
  mineria: {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/mineria-hero-inmersivo.jpg",
      alt: "Maquinaria de excavación en una operación minera. Imagen editorial de referencia, no corresponde a una faena ni instalación de Del Carpio.",
      mobileAspectRatio: 16 / 9,
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
    showDifferentiators: true,
    differentiatorCopy: {
      outcome: "Ajuste de dosificación",
      outcomeDetail: "control de cianuro libre y WAD",
      equipmentFamily: "Preparación de muestras",
      equipmentDetail: "molienda, división y tratamiento de mineral",
    },
    compatibleEquipmentSlugs: [
      "decent-cargador-electrico-crisoles",
      "decent-cargador-manual-crisoles",
      "decent-copelas-magnesio",
      "decent-dosificador-automatico-litargirio",
      "decent-hornos-cupelacion",
      "decent-horno-copelacion-alta-temperatura",
      "decent-hornos-fusion-ensayo-fuego",
      "decent-mezclador-crisoles",
      "decent-molino-pulverizador-dp1000",
      "decent-drsd05",
      "decent-drsd40",
      "decent-trituradora-martillo",
      "decent-rodillo-botella",
      "decent-dsw350",
      "decent-trituradora-doble-rodillo",
      "decent-hornos-secado",
      "decent-mezclador-tipo-v",
    ],
  },
  farmaceutica: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/farmaceutica-hero-inmersivo.jpg",
      alt: "Manos con guantes de laboratorio sosteniendo una gradilla con viales de muestra. Imagen editorial de referencia, no corresponde a un laboratorio real de Del Carpio.",
      mobileAspectRatio: 2200 / 1048,
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
    showDifferentiators: true,
    differentiatorCopy: {
      outcome: "Métodos analíticos validados",
      outcomeDetail: "principios activos e impurezas de síntesis",
      equipmentFamily: "Línea Kjeldahl",
      equipmentDetail: "digestión y análisis elemental de materias primas",
    },
    compatibleEquipmentSlugs: [
      "hanon-k1160",
      "hanon-k9840",
      "hanon-sh220f",
      "hanon-sh420f",
      "hanon-sh520",
      "infitek-pr5-series",
      "decent-mezclador-tipo-v",
    ],
  },
  aguas: {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/agua-hero-inmersivo-fotografia.jpg",
      alt: "Gotas y ondas sobre una superficie de agua iluminada. Imagen editorial de referencia, no corresponde a una instalación de Del Carpio.",
      objectPosition: "center 72%",
      mobileAspectRatio: 3 / 2,
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
    showDifferentiators: true,
    differentiatorCopy: {
      outcome: "Control previo a fiscalización",
      outcomeDetail: "trihalometanos y COVs en agua potable",
      equipmentFamily: "Análisis de agua",
      equipmentDetail: "DQO y medición multiparamétrica",
    },
    compatibleEquipmentSlugs: [
      "infitek-cod-analyzer",
      "infitek-bep-m300f",
      "te-instruments-xplorer-aox-tox",
      "milestone-ethos-up",
      "hanon-k9840",
    ],
  },
  ambiental: {
    heroTone: "light",
    media: {
      src: "/fotos/industrias/ambiente-hero-inmersivo.jpg",
      alt: "Manos sosteniendo tierra con un brote verde sobre follaje. Imagen editorial de referencia, no corresponde a un terreno ni proyecto real de Del Carpio.",
      mobileAspectRatio: 2400 / 1374,
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
    showDifferentiators: true,
    differentiatorCopy: {
      outcome: "Línea de base lista",
      outcomeDetail: "COVs y HAPs para monitoreo continuo",
      equipmentFamily: "Línea Kjeldahl",
      equipmentDetail: "digestión y análisis de muestras ambientales",
    },
    compatibleEquipmentSlugs: [
      "hanon-k1160",
      "hanon-k9860",
      "hanon-k9840",
      "hanon-sox606",
      "hanon-sh220f",
      "hanon-sh420f",
      "hanon-k1100f",
      "hanon-sh520",
      "hanon-s402",
      "milestone-ethos-up",
      "te-instruments-xplorer-aox-tox",
      "te-instruments-vectra",
      "infitek-cod-analyzer",
      "infitek-bep-m300f",
    ],
  },
  "academia-id": {
    heroTone: "dark",
    media: {
      src: "/fotos/industrias/academia-id-hero-inmersivo.jpg",
      alt: "Personas con delantal de laboratorio manipulando un tubo de ensayo frente a una pizarra con fórmulas. Imagen editorial de referencia, no corresponde a un laboratorio real de Del Carpio.",
      mobileAspectRatio: 16 / 9,
    },
    serviceIds: [],
    heroVariant: "immersive",
    heroContentAlign: "left",
    showDifferentiators: true,
    differentiatorCopy: {
      outcome: "Trazable para publicación",
      outcomeDetail: "método para su matriz de investigación",
      equipmentFamily: "Autosamplers",
      equipmentDetail: "automatización de muestras en laboratorio",
    },
    compatibleEquipmentSlugs: [
      "hanon-k1160",
      "te-instruments-vectra",
      "te-instruments-newton",
      "infitek-cod-analyzer",
      "infitek-bep-m300f",
      "decent-drsd05",
      "decent-drsd40",
    ],
  },
};
