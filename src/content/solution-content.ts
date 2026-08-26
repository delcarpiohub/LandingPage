// Contenido técnico adicional de las páginas /soluciones/[industria]:
// métodos y normativa, casos de aplicación, FAQ y guía de selección de
// equipo. Todo derivado 1:1 de contenido ya real y aprobado del sitio
// (`industry.detail`, `process`, `coreServices`/`metrics` en site.ts, y las
// descripciones reales auditadas de `compatibleEquipmentSlugs` en
// solution-pages.ts) — nunca cifras de LOD/LOQ, plazos de entrega ni
// resultados de cliente que no estén ya verificados en el sitio. Ver
// .agent-log/sessions.md, entrada 2026-08-17 "métodos/normativa, casos de
// aplicación, FAQ y CTA segmentado en las 6 páginas de industria".

export type SolutionMethodRow = {
  technique: string;
  application: string;
  standard: string;
};

export type SolutionApplicationCase = {
  title: string;
  description: string;
  tags: string[];
};

export type SolutionFaqItem = {
  question: string;
  answer: string;
};

export type SolutionContent = {
  methods: SolutionMethodRow[];
  applicationCases: SolutionApplicationCase[];
  faqs: SolutionFaqItem[];
  selectionGuideIntro: string;
};

// FAQ compartida entre las 6 industrias — capacidades reales de Del Carpio
// que no son industria-específicas (mismo contenido que ya usa la fila de
// diferenciadores: IQ/OQ/PQ, NCh-ISO 17025, soporte en sitio, capacitación).
const sharedFaqs: SolutionFaqItem[] = [
  {
    question: "¿La compra del equipo incluye instalación y calificación?",
    answer:
      "Sí. El proceso incluye instalación, configuración y calificación (IQ/OQ/PQ) del equipo antes de la entrega operativa.",
  },
  {
    question: "¿Dan soporte técnico después de la venta?",
    answer:
      "Sí, con diagnóstico y soporte en sitio, además de mantención preventiva y servicio correctivo ante fallas.",
  },
  {
    question: "¿Ofrecen capacitación para el equipo técnico?",
    answer:
      "Sí, capacitación técnica teórica y práctica para el personal que va a operar el instrumento.",
  },
  {
    question: "¿Cómo eligen el equipo correcto para mi problema?",
    answer:
      "Revisamos la matriz, el análisis requerido y el flujo de trabajo antes de proponer el equipamiento adecuado.",
  },
];

export const solutionContent: Record<string, SolutionContent> = {
  alimentos: {
    methods: [
      {
        technique: "HPLC-MS/MS y GC-MS",
        application: "Necesita asegurar que su fruta/hortaliza de exportación no supere límites de pesticidas",
        standard: "Detección y cuantificación antes de que el envío llegue a destino",
      },
      {
        technique: "Kjeldahl automatizada",
        application: "Debe declarar proteína/nitrógeno en el etiquetado nutricional",
        standard: "Perfil nutricional confiable y trazable",
      },
      {
        technique: "Extracción Soxhlet",
        application: "Debe declarar grasa total",
        standard: "Resultado preciso y repetible",
      },
      {
        technique: "Trazabilidad en cadena productiva",
        application: "Necesita responder ante una auditoría o reclamo de un cliente",
        standard: "Trazabilidad documentada de aditivos y contaminantes por lote",
      },
    ],
    applicationCases: [
      {
        title: "Residuos de pesticidas para exportación",
        description:
          "Implementación de sistema HPLC-MS/MS para residuos de pesticidas en frutas y hortalizas de exportación.",
        tags: ["HPLC-MS/MS", "Residuos", "Listo para exportar a la UE"],
      },
      {
        title: "Laboratorio de control de calidad vitivinícola",
        description:
          "Diseño e implementación de laboratorio analítico completo para bodega de exportación: HPLC-DAD para polifenoles y azúcares y GC-FID para compuestos aromáticos.",
        tags: ["HPLC-DAD", "GC-FID", "Calidad vitivinícola certificable"],
      },
    ],
    faqs: [
      {
        question: "¿Pueden apoyar análisis para exportación?",
        answer:
          "Sí. Revisamos residuos de pesticidas, aditivos, contaminantes, perfil nutricional y trazabilidad según la necesidad de su línea de producción.",
      },
      ...sharedFaqs,
    ],
    selectionGuideIntro:
      "Si su matriz es un alimento o pienso y necesita perfil nutricional, mineralización o preparación de muestra, estos son los equipos con aplicación verificada para su industria.",
  },
  mineria: {
    methods: [
      {
        technique: "Destilación + electrodo ion-selectivo o titulación",
        application: "Necesita controlar consumo de cianuro y riesgo ambiental",
        standard: "Medición confiable de cianuro libre/WAD para ajustar dosificación",
      },
      {
        technique: "Ensayo por fuego (fire assay)",
        application: "Necesita saber la ley real de metales preciosos del mineral",
        standard: "Resultado trazable para decisiones de planta",
      },
      {
        technique: "HPLC",
        application: "Necesita optimizar el consumo de reactivo",
        standard: "Control de proceso que reduce costo",
      },
      {
        technique: "IC (cromatografía iónica)",
        application: "Necesita monitorear efluentes de proceso",
        standard: "Datos para gestionar el efluente a tiempo",
      },
    ],
    applicationCases: [
      {
        title: "Unidad analítica para planta minera",
        description:
          "Montaje de laboratorio de análisis de proceso en faena: IC para cianuro libre y WAD, ICP-OES para metales en pulpa y efluentes, integración con LIMS y soporte de calificación IQ/OQ/PQ.",
        tags: ["IC", "ICP-OES", "LIMS"],
      },
      {
        title: "Laboratorio de ensayo por fuego",
        description:
          "Equipamiento del flujo completo de ensayo por fuego (fundición, copelación, cuarteo y molienda de muestra) para determinación de metales preciosos en mineral triturado.",
        tags: ["Fire Assay", "Muestreo minero", "Preparación de muestra"],
      },
    ],
    faqs: [
      {
        question: "¿Trabajan con muestreo y preparación de muestra en faena?",
        answer:
          "Sí, contamos con equipos de muestreo, trituración y preparación de muestra pensados para operación minera, además del análisis de cianuro y metales en laboratorio.",
      },
      ...sharedFaqs,
    ],
    selectionGuideIntro:
      "Si trabaja con cianuro, ensayo por fuego o preparación de muestra de mineral, estos son los equipos con aplicación verificada para minería.",
  },
  farmaceutica: {
    methods: [
      {
        technique: "HPLC/GC con validación de método",
        application: "Principios activos e impurezas de síntesis",
        standard: "ICH Q2/Q3",
      },
      {
        technique: "Estudios de estabilidad",
        application: "Productos de degradación",
        standard: "ICH Q2/Q3, registro sanitario",
      },
      {
        technique: "Digestión ácida / Kjeldahl",
        application: "Verificación de materias primas",
        standard: "Control de procesos GMP",
      },
    ],
    applicationCases: [
      {
        title: "Validación de método para registro sanitario",
        description:
          "Cuantificación de un principio activo por HPLC con validación según ICH Q2 (linealidad, precisión, exactitud, límites de detección y cuantificación) para respaldar un expediente de registro sanitario.",
        tags: ["HPLC", "ICH Q2", "Registro sanitario"],
      },
      {
        title: "Estudio de estabilidad",
        description:
          "Seguimiento de productos de degradación en condiciones de estrés (temperatura, humedad, luz) mediante HPLC, conforme a ICH Q1A/Q3B, para definir vida útil y condiciones de almacenamiento.",
        tags: ["HPLC", "ICH Q1A", "Estabilidad"],
      },
    ],
    faqs: [
      {
        question: "¿Sus métodos cumplen los lineamientos ICH?",
        answer:
          "Sí, la validación de métodos que desarrollamos sigue los lineamientos ICH Q2/Q3 para registro sanitario y estudios de estabilidad.",
      },
      ...sharedFaqs,
    ],
    selectionGuideIntro:
      "Si necesita cuantificar principios activos, impurezas o productos de degradación bajo ICH Q2/Q3, estos son los equipos con aplicación verificada para farmacéutica.",
  },
  aguas: {
    methods: [
      {
        technique: "GC-MS",
        application: "Trihalometanos y COVs en agua potable",
        standard: "NCh 409",
      },
      {
        technique: "HPLC",
        application: "Plaguicidas en matrices acuosas",
        standard: "Normativa ambiental de la autoridad sanitaria",
      },
      {
        technique: "Análisis de nitratos",
        application: "Aguas de consumo y de proceso",
        standard: "NCh 409",
      },
      {
        technique: "Demanda química de oxígeno (DQO)",
        application: "Calidad de agua y efluentes",
        standard: "Normativa ambiental",
      },
    ],
    applicationCases: [
      {
        title: "Cumplimiento NCh 409 para agua potable",
        description:
          "Determinación de trihalometanos, COVs y nitratos en agua potable por GC-MS y HPLC, conforme a los parámetros exigidos por NCh 409 para consumo humano.",
        tags: ["GC-MS", "NCh 409", "Agua potable"],
      },
      {
        title: "Control de aguas de proceso y efluentes",
        description:
          "Monitoreo de demanda química de oxígeno (DQO) y plaguicidas en matrices acuosas de proceso e industriales, bajo normativa ambiental de la autoridad sanitaria.",
        tags: ["DQO", "Efluentes", "Normativa ambiental"],
      },
    ],
    faqs: [
      {
        question: "¿Cubren los parámetros exigidos por NCh 409?",
        answer:
          "Sí, trabajamos los parámetros de NCh 409 para agua potable, además de normativa ambiental para efluentes y aguas de proceso.",
      },
      ...sharedFaqs,
    ],
    selectionGuideIntro:
      "Si necesita cumplir NCh 409 o monitorear calidad de agua de proceso, estos son los equipos con aplicación verificada para aguas.",
  },
  ambiental: {
    methods: [
      {
        technique: "GC-MS",
        application: "COVs y HAPs",
        standard: "Línea de base y monitoreo continuo",
      },
      {
        technique: "Digestión ácida (microondas)",
        application: "Metales en suelos y sedimentos",
        standard: "Caracterización ambiental",
      },
      {
        technique: "Muestreo y análisis de emisiones atmosféricas",
        application: "Fuentes fijas / línea de base",
        standard: "Informes de monitoreo continuo",
      },
    ],
    applicationCases: [
      {
        title: "Línea de base ambiental",
        description:
          "Caracterización de suelos y sedimentos por metales pesados (digestión ácida) y determinación de COVs/HAPs por GC-MS, para informes de línea de base previos a un proyecto.",
        tags: ["GC-MS", "Digestión ácida", "Línea de base"],
      },
      {
        title: "Monitoreo continuo de emisiones",
        description:
          "Muestreo y análisis de emisiones atmosféricas de fuentes fijas para programas de monitoreo continuo y reporte a la autoridad ambiental.",
        tags: ["Emisiones", "Monitoreo continuo"],
      },
    ],
    faqs: [
      {
        question: "¿Apoyan la elaboración de informes de línea de base?",
        answer:
          "Sí, apoyamos la caracterización de suelos, sedimentos y emisiones necesaria para informes de línea de base y monitoreo continuo.",
      },
      ...sharedFaqs,
    ],
    selectionGuideIntro:
      "Si necesita caracterizar suelos, sedimentos o emisiones para línea de base o monitoreo continuo, estos son los equipos con aplicación verificada para ambiental.",
  },
  "academia-id": {
    methods: [
      {
        technique: "Desarrollo y validación de método",
        application: "Matriz del proyecto de investigación",
        standard: "Trazable para publicación científica",
      },
      {
        technique: "Transferencia de técnica cromatográfica (HPLC/GC)",
        application: "Migración de método entre equipos o laboratorios",
        standard: "Continuidad de tesis y proyectos",
      },
      {
        technique: "Capacitación en operación de equipos",
        application: "Formación de nuevos investigadores y tesistas",
        standard: "Autonomía del grupo de investigación",
      },
    ],
    applicationCases: [
      {
        title: "Desarrollo de método para tesis o publicación",
        description:
          "Desarrollo y validación de un método cromatográfico (HPLC o GC) para una matriz específica del proyecto de investigación, con documentación trazable para publicación científica.",
        tags: ["HPLC/GC", "Validación", "Publicación"],
      },
      {
        title: "Transferencia de técnica entre laboratorios",
        description:
          "Migración de un método cromatográfico validado desde un equipo o laboratorio de referencia hacia el equipamiento del grupo de investigación, con capacitación del equipo técnico.",
        tags: ["Transferencia de método", "Capacitación"],
      },
    ],
    faqs: [
      {
        question: "¿Trabajan con proyectos de investigación de bajo volumen de muestras?",
        answer:
          "Sí, apoyamos el desarrollo y transferencia de métodos para proyectos de investigación, tesis y publicaciones, sin importar el volumen de muestras.",
      },
      ...sharedFaqs,
    ],
    selectionGuideIntro:
      "Si necesita desarrollar, validar o transferir un método analítico para investigación, estos son los equipos con aplicación verificada para academia/I+D.",
  },
};
