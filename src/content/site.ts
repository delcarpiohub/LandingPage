import type { ProductCategory } from "@/lib/mock-products";

// `industries`, `services` y `coreServices` en este archivo alimentan el
// buscador global (src/content/search-index.ts) de forma automática. Agregar
// una industria o un servicio aquí lo hace buscable sin editar nada más.

export const company = {
  name: "Del Carpio Análisis y Asesorías Ltda.",
  shortName: "DC",
  email: "ventas@delcarpio.cl",
  phone: "+56 2 2581 9500",
  whatsapp: "+56 9 9158 3010",
  mapsUrl: "https://maps.app.goo.gl/a51HTC9zsr3En23F9",
  location: "Av. Sucre 2596, Ñuñoa, Región Metropolitana",
  street: "Av. Sucre 2596",
  addressLocality: "Ñuñoa",
  addressRegion: "Región Metropolitana",
  postalCode: "7750000",
  addressCountry: "CL",
  primaryCta: "Solicitar evaluación técnica",
  secondaryCta: "Ver capacidades analíticas",
};

export const metrics = [
  {
    value: "HPLC · GC",
    label: "técnicas cromatográficas para análisis de alta precisión en matrices complejas",
  },
  {
    value: "Métodos validados",
    label: "validación de métodos según los requisitos de su industria",
  },
  {
    value: "6 sectores",
    label: "alimentos, minería, farmacéutica, aguas, ambiental y academia",
  },
  {
    value: "Equipos calificados",
    label: "calificación de instalación, operación y desempeño de equipos analíticos",
  },
];

type Service = {
  slug: string;
  title: string;
  description: string;
  sectors?: string[]; // pendiente: sectores reales por servicio (ClickUp)
};

export const services: Service[] = [
  {
    slug: "implementacion-hplc",
    title: "Implementación HPLC",
    description:
      "Selección de columna, detector y condiciones cromatográficas para análisis de pesticidas, compuestos fenólicos, azúcares, principios activos y matrices de proceso industrial.",
  },
  {
    slug: "metodos-gc",
    title: "Métodos analíticos por GC",
    description:
      "Separación y cuantificación de compuestos volátiles y semivolátiles: disolventes residuales, aromas, agroquímicos, COVs y contaminantes en matrices industriales y ambientales.",
  },
  {
    slug: "validacion-trazabilidad",
    title: "Validación y trazabilidad",
    description:
      "Desarrollo y validación de métodos analíticos según los requisitos de su industria: linealidad, repetibilidad, incertidumbre y exactitud. Documentación completa para auditorías y procesos de acreditación.",
  },
  {
    slug: "mantencion-soporte",
    title: "Mantención y soporte técnico",
    description:
      "Calibración periódica, calificación de equipos, reemplazo de consumibles y atención en sitio para equipos HPLC, GC y sistemas de detección acoplados (DAD, FID, MS).",
  },
];

// Servicios reales confirmados en /servicios (cards visibles) y en
// /contacto/[tipo] (formularios dedicados: mantencion, correctivo,
// diagnostico, capacitacion). Fuente única — la usan tanto el dropdown de
// navegación (nav-dropdown.tsx) como las páginas de solución por industria.
export type CoreService = {
  id: "mantencion" | "correctivo" | "diagnostico" | "capacitacion";
  title: string;
  description: string;
};

export const coreServices: CoreService[] = [
  {
    id: "mantencion",
    title: "Mantención preventiva",
    description: "Mantenimiento preventivo periódico de instrumentos de laboratorio.",
  },
  {
    id: "correctivo",
    title: "Servicio correctivo",
    description: "Diagnóstico y reparación de equipos ante fallas o averías.",
  },
  {
    id: "diagnostico",
    title: "Diagnóstico técnico",
    description: "Auditoría técnica del parque de instrumentos y sus métodos.",
  },
  {
    id: "capacitacion",
    title: "Capacitación técnica",
    description: "Formación técnica teórica y práctica para su equipo.",
  },
];

type Industry = {
  slug: string;
  name: string;
  detail: string;
  // Categorías reales de producto (mock-products.ts) relevantes para esta
  // industria. Es un mapeo editorial basado en el nombre/temática real de
  // cada categoría — no proviene de una fuente verificada por el cliente
  // (no existe hoy un campo de industria en los productos). Confirmado con
  // el cliente el 2026-08-12 antes de publicarse.
  productCategories: ProductCategory[];
};

export const industries: Industry[] = [
  {
    slug: "alimentos",
    name: "Alimentos",
    detail:
      "Detectamos residuos de pesticidas, aditivos y contaminantes en su línea de producción, y le entregamos el perfil nutricional y la trazabilidad que sus clientes de exportación le exigen.",
    productCategories: [
      "Cromatografía",
      "Análisis elemental",
      "Preparación de muestras",
      "Espectrometría de masa",
    ],
  },
  {
    slug: "mineria",
    name: "Minería",
    detail:
      "Controlamos cianuro libre y WAD, metales pesados y reactivos de flotación en su proceso de lixiviación, para que su planta opere sin sorpresas en el balance metalúrgico.",
    productCategories: ["Minería", "Fire Assay", "Trace Elemental", "Análisis elemental"],
  },
  {
    slug: "farmaceutica",
    name: "Farmacéutica",
    detail:
      "Cuantificamos principios activos, impurezas y productos de degradación con métodos validados, para que su expediente de registro sanitario avance sin observaciones y su estudio de estabilidad tenga resultados defendibles.",
    productCategories: ["Área farmacéutica", "Cromatografía", "Espectrometría de masa"],
  },
  {
    slug: "aguas",
    name: "Aguas",
    detail:
      "Medimos plaguicidas, trihalometanos, COVs y nitratos en su agua potable o de proceso, y le entregamos el respaldo técnico que necesita frente a la autoridad sanitaria.",
    productCategories: ["Análisis de agua", "Purificadores de agua", "Trace Elemental"],
  },
  {
    slug: "ambiental",
    name: "Ambiental",
    detail:
      "Caracterizamos suelos, sedimentos y emisiones de su proyecto — COVs, HAPs y metales — para que su informe de línea de base o su monitoreo continuo estén listos a tiempo.",
    productCategories: [
      "Análisis de agua",
      "Análisis elemental",
      "Cromatografía",
      "Trace Elemental",
    ],
  },
  {
    slug: "academia-id",
    name: "Academia / I+D",
    detail:
      "Desarrollamos y validamos el método analítico que necesita su tesis o publicación, y transferimos la técnica a su equipo para que su grupo de investigación gane autonomía.",
    productCategories: [
      "Equipamiento analítico",
      "Equipamiento menor",
      "Cromatografía",
      "Análisis elemental",
    ],
  },
];

type ProcessStep = {
  label: string;
  shortLabel?: string; // versión corta para el home (pendiente revisión de diseño definitiva)
};

export const process: ProcessStep[] = [
  {
    label: "Diagnóstico de la necesidad analítica y caracterización de la matriz de trabajo",
  },
  {
    label: "Especificación técnica del sistema y selección del método cromatográfico adecuado",
    shortLabel: "Especificación técnica y selección del método",
  },
  {
    label: "Instalación, configuración y calificación del equipo",
  },
  {
    label: "Desarrollo o transferencia del método analítico con criterios de validación completos",
    shortLabel: "Desarrollo o validación del método analítico",
  },
  {
    label: "Entrega del informe de trazabilidad, capacitación del equipo técnico y soporte continuo",
    shortLabel: "Entrega de informe, capacitación y soporte continuo",
  },
];

export const labProjects = [
  {
    title: "Laboratorio de control de calidad vitivinícola",
    description:
      "Diseño e implementación de laboratorio analítico completo para bodega de exportación: HPLC-DAD para polifenoles y azúcares, GC-FID para compuestos aromáticos, validación bajo protocolos OIV.",
    tags: ["HPLC-DAD", "GC-FID", "Validación OIV"],
  },
  {
    title: "Unidad analítica para planta minera",
    description:
      "Montaje de laboratorio de análisis de proceso en faena: IC para cianuro libre y WAD, ICP-OES para metales en pulpa y efluentes, integración con LIMS y soporte de calificación IQ/OQ/PQ.",
    tags: ["IC", "ICP-OES", "LIMS"],
  },
  {
    title: "Módulo de análisis de residuos agrícolas",
    description:
      "Implementación de sistema HPLC-MS/MS para residuos de pesticidas en frutas y hortalizas de exportación. Validación conforme Reglamento UE 396/2005 y límites MRL para mercados europeos.",
    tags: ["HPLC-MS/MS", "Residuos", "Normativa UE"],
  },
];
