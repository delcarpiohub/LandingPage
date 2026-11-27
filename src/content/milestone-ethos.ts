/**
 * Familia Milestone ETHOS (LEAN, EASY, UP). Ver DESIGN.md sección 23.
 *
 * Fuentes: CAT448EN-002 (ETHOS), CAT450EN-002 (ETHOS LEAN), fichas técnicas
 * ETHOS LEAN y ETHOS UP REV. 02/2026 y ETHOS EASY REV. 01/2025. No agregar
 * datos que no estén en ellas. La compatibilidad de rotores y accesorios entre
 * modelos no está confirmada por escrito: no afirmarla.
 */

export const ETHOS_FAMILY_PATH = "/productos/milestone-ethos";

export const ETHOS_COMPATIBILITY_NOTE =
  "La compatibilidad de rotores y accesorios entre modelos se confirma al cotizar.";

const NOT_STATED = "No indicado en ficha";

/** `summary`: línea de cada modelo; origen en DESIGN.md sección 23. */
export const ethosModels = [
  {
    slug: "milestone-ethos-lean",
    name: "ETHOS LEAN",
    image: "/productos/milestone-ethos-lean/imagen-1-sin-fondo.webp",
    summary: "Digestión por microondas compacta",
  },
  {
    slug: "milestone-ethos-easy",
    name: "ETHOS EASY",
    image: "/productos/milestone-ethos-easy/imagen-1-sin-fondo.webp",
    summary: "Tecnología de rotor avanzada",
  },
  {
    slug: "milestone-ethos-up",
    name: "ETHOS UP",
    image: "/productos/milestone-ethos-up/imagen-1-sin-fondo.webp",
    summary: "Cámara SafeVIEW y conexión a balanza",
  },
] as const;

export function isEthosModelSlug(slug: string) {
  return ethosModels.some((model) => model.slug === slug);
}

/**
 * Título, bajada e imagen representativa de la familia: los usan la página de
 * familia y su tarjeta del catálogo (src/lib/catalog-entries.ts).
 */
export const ethosFamily = {
  slug: "milestone-ethos",
  brand: "Milestone",
  model: "ETHOS",
  name: "Milestone ETHOS",
  lead: "Digestión por microondas en recipiente cerrado en tres modelos: LEAN, compacto, y las configuraciones EASY y UP de ETHOS.",
  image: ethosModels[2].image,
} as const;

/** `values` sigue el orden de `ethosModels`: LEAN, EASY, UP. */
export const ethosComparisonRows: ReadonlyArray<{
  label: string;
  values: readonly [string, string, string];
}> = [
  {
    label: "Software",
    values: ["easyCONTROL 3", "easyCONTROL 3", "easyCONTROL 3"],
  },
  { label: "Pantalla del terminal", values: ['5"', '5"', '6,5"'] },
  { label: "Biblioteca de aplicaciones", values: ["Sí", "Sí", "Sí"] },
  { label: "USB", values: ["Sí", "Sí", "Sí"] },
  { label: "21 CFR Part 11", values: ["Sí", "Sí", "Sí"] },
  { label: "Milestone Connect", values: ["Sí", "Sí", "Sí"] },
  { label: "Cámara SafeVIEW", values: [NOT_STATED, "No", "Sí"] },
  { label: "Conexión a balanza", values: [NOT_STATED, "No", "Sí"] },
];

type EthosAccessory = {
  name: string;
  description: string;
  image?: string;
};

const UP_ASSETS = "/productos/milestone-ethos-up";

export const ethosLeanRotors: readonly EthosAccessory[] = [
  {
    name: "Rotor MAXI-14",
    description:
      "Hasta 14 vasos PTFE-TFM de hasta 100 mL; 300 °C y 35 bar máximos. Para suelos, aguas residuales y bebidas.",
  },
  {
    name: "Rotor MAXI-14 HP",
    description:
      "Hasta 14 posiciones con vasos PTFE-TFM de 80 mL; 300 °C y 60 bar máximos. Para alimentos, nutracéuticos y farmacéuticos.",
  },
  {
    name: "Rotor SK-6",
    description:
      "Hasta 6 vasos PTFE-TFM de hasta 100 mL; 300 °C y 100 bar máximos. Para muestras reactivas, difíciles de digerir o de gran masa.",
  },
];

export const ethosRotors: readonly EthosAccessory[] = [
  {
    name: "Rotor SK-15",
    description:
      "Hasta 15 vasos PTFE-TFM de hasta 100 mL; 300 °C y 100 bar máximos. Para muestras difíciles, reactivas o de gran masa.",
    image: `${UP_ASSETS}/rotor-sk-15.jpg`,
  },
  {
    name: "Rotor MAXI-44",
    description:
      "Hasta 44 vasos PTFE-TFM de hasta 100 mL; 300 °C y 35 bar máximos. Para grandes lotes de suelos, sedimentos y matrices acuosas.",
    image: `${UP_ASSETS}/rotor-maxi-44.jpg`,
  },
  {
    name: "Rotor MAXI-24 HP",
    description:
      "Hasta 24 posiciones con vasos PTFE-TFM de 80 mL; 300 °C y 60 bar máximos. Para trabajo rutinario con matrices diversas.",
    image: `${UP_ASSETS}/rotor-maxi-24-hp.jpg`,
  },
];

/** Accesorio nombrado tanto en CAT448 (ETHOS) como en CAT450 (ETHOS LEAN). */
export const ethosCommonAccessory: EthosAccessory = {
  name: "ultraFAST",
  description: "Accesorio de alta temperatura que funciona como mufla.",
  image: `${UP_ASSETS}/ultrafast.png`,
};

/** CAT450 nombra estas capacidades de ETHOS LEAN, sin identificar accesorios. */
export const ethosLeanWorkflows = [
  "Extracción con solventes",
  "Extracción sin solventes de productos naturales",
  "Síntesis por microondas",
] as const;

/** Accesorios que CAT448 nombra para ETHOS (configuraciones EASY y UP). */
export const ethosAccessories: readonly EthosAccessory[] = [
  {
    name: "FastEX-24",
    description: "Rotor de extracción para aplicaciones ambientales.",
    image: `${UP_ASSETS}/fastex-24.png`,
  },
  {
    name: "XTR-44",
    description: "Rotor de extracción con viales desechables de polipropileno.",
    image: `${UP_ASSETS}/xtr-44.png`,
  },
  {
    name: "SR-15",
    description:
      "Rotor para determinación de grasa total en alimentos y alimentación animal.",
    image: `${UP_ASSETS}/sr-15.png`,
  },
  {
    name: "MMR-15",
    description: "Rotor de evaporación y concentración.",
    image: `${UP_ASSETS}/mmr-15.png`,
  },
  {
    name: "RAR-15",
    description: "Rotor de evaporación con vasos desechables.",
    image: `${UP_ASSETS}/rar-15.png`,
  },
];

/** Pestaña "Rotores y accesorios" de cada ficha. */
export const ethosConsumablesBySlug: Record<string, EthosAccessory[]> = {
  "milestone-ethos-lean": [...ethosLeanRotors, ethosCommonAccessory],
  "milestone-ethos-easy": [
    ...ethosRotors,
    ethosCommonAccessory,
    ...ethosAccessories,
  ],
  "milestone-ethos-up": [
    ...ethosRotors,
    ethosCommonAccessory,
    ...ethosAccessories,
  ],
};
