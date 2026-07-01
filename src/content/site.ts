export const company = {
  name: "Del Carpio Análisis y Asesorías Ltda.",
  shortName: "DC",
  email: "ventas@delcarpio.cl",
  phone: "+56 2 0000 0000",
  location: "Santiago, Chile",
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
    value: "NCh · ISO",
    label: "validación de métodos bajo normativa chilena e internacional",
  },
  {
    value: "6 sectores",
    label: "alimentos, minería, farmacéutica, aguas, ambiental y academia",
  },
  {
    value: "IQ/OQ/PQ",
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
      "Desarrollo y validación de métodos según NCh-ISO 17025: linealidad, repetibilidad, incertidumbre y exactitud. Documentación completa para auditorías y procesos de acreditación.",
  },
  {
    slug: "mantencion-soporte",
    title: "Mantención y soporte técnico",
    description:
      "Calibración periódica, calificación IQ/OQ/PQ, reemplazo de consumibles y atención en sitio para equipos HPLC, GC y sistemas de detección acoplados (DAD, FID, MS).",
  },
];

type Industry = {
  name: string;
  detail: string;
  featuredServices?: string[]; // pendiente: servicios reales por sector (ClickUp)
};

export const industries: Industry[] = [
  {
    name: "Alimentos",
    detail:
      "Residuos de pesticidas por HPLC-MS/MS y GC-MS, aditivos, contaminantes, perfil nutricional y trazabilidad en cadena productiva bajo normativa sanitaria chilena y de exportación.",
  },
  {
    name: "Minería",
    detail:
      "Análisis de cianuro libre y WAD, metales pesados, reactivos de flotación y efluentes de proceso. HPLC para control de reagentes e IC para aniones en soluciones de lixiviación.",
  },
  {
    name: "Farmacéutica",
    detail:
      "Cuantificación de principios activos, impurezas de síntesis y productos de degradación. Validación de métodos según ICH Q2/Q3 para registro sanitario y estudios de estabilidad.",
  },
  {
    name: "Aguas",
    detail:
      "Análisis de plaguicidas, trihalometanos, COVs y nitratos en matrices acuosas. Métodos validados para cumplimiento de NCh 409 y normativa ambiental de la autoridad sanitaria.",
  },
  {
    name: "Ambiental",
    detail:
      "Determinación de COVs y HAPs por GC-MS, metales en suelos y sedimentos, y caracterización de emisiones atmosféricas para informes de línea de base y monitoreo continuo.",
  },
  {
    name: "Academia / I+D",
    detail:
      "Desarrollo de métodos analíticos, transferencia de técnicas cromatográficas y validación de procedimientos para grupos de investigación, tesis y publicaciones científicas.",
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
    label: "Instalación, configuración y calificación del equipo (IQ/OQ/PQ)",
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
