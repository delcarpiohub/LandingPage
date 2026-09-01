// Este archivo alimenta el buscador global (src/content/search-index.ts) de
// forma automática: cada producto, categoría (productFilters) y marca
// (detail.brand) que agregues aquí queda indexado sin tocar ningún otro
// archivo. No crear una lista de búsqueda separada para productos.

export type ProductCategory =
  | "Marcas"
  | "Análisis elemental"
  | "Cromatografía"
  | "Espectrometría de masa"
  | "Preparación de muestras"
  | "Destiladores de ácidos"
  | "Automatización"
  | "Bioprocesos"
  | "Área farmacéutica"
  | "Equipamiento menor"
  | "Equipamiento analítico"
  | "Minería"
  | "Análisis de agua"
  | "Purificadores de agua"
  | "Trace Elemental"
  | "Fire Assay";

export const productFilters: ProductCategory[] = [
  "Marcas",
  "Análisis elemental",
  "Cromatografía",
  "Espectrometría de masa",
  "Preparación de muestras",
  "Destiladores de ácidos",
  "Automatización",
  "Bioprocesos",
  "Área farmacéutica",
  "Equipamiento menor",
  "Equipamiento analítico",
  "Minería",
  "Análisis de agua",
  "Purificadores de agua",
  "Trace Elemental",
  "Fire Assay",
];

export interface TechnicalParameterRow {
  leftParameter: string;
  leftValue: string;
  rightParameter: string;
  rightValue: string;
}

export interface DetailBlock {
  title: string;
  tone: "yellow" | "blue" | "red" | "green";
  items: string[];
}

export interface ProductDescriptionImage {
  src: string;
  alt: string;
  title?: string;
  caption: string;
}

export interface ProductDescriptionVideo {
  src: string;
  poster: string;
  alt: string;
  title: string;
  caption: string;
}

export interface ProductDetail {
  brand: string;
  model: string;
  fullTitle: string;
  subtitle: string;
  highlights: string[];
  advantages: string[];
  technicalParameters: TechnicalParameterRow[];
  detailBlocks: DetailBlock[];
  specificationNotes?: { title: string; items: string[] }[];
  descriptionImage?: ProductDescriptionImage;
  descriptionImages?: ProductDescriptionImage[];
  descriptionVideos?: ProductDescriptionVideo[];
  complianceNotes?: { title: string; text: string }[];
  applicationNotes?: { label: string; text: string }[];
  relatedVideo?: { label: string; src: string; poster: string };
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  category: ProductCategory;
  filters?: ProductCategory[];
  description: string;
  features: string[];
  imageUrl: string;
  detail?: ProductDetail;
  tags?: string[];
  relatedProducts?: string[];
}

export const mockProducts: Product[] = [
  {
    id: "hanon-k1160",
    slug: "hanon-k1160",
    name: "Analizador Kjeldahl automático K1160",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Automatización",
      "Área farmacéutica",
    ],
    description:
      "Nitrógeno y proteína sin intervención manual: destila, titula, calcula, imprime y limpia en un solo ciclo. Operación desatendida con autosampler de 24 posiciones.",
    features: [
      "Automatización total del método Kjeldahl",
      "Pantalla táctil Android de 10 pulgadas",
      "Compatible con autosampler K1124",
    ],
    imageUrl: "/productos/hanon-k1160/sistema.png",
    detail: {
      brand: "Hanon",
      model: "K1160",
      fullTitle:
        "Hanon K1160 Analizador Automático Kjeldahl de Nitrógeno y Proteína",
      subtitle:
        "Sistema automático para laboratorios que requieren control preciso de nitrógeno o proteína en alimentos, piensos, suelos, medio ambiente, farmacéutica, agricultura, investigación y control de calidad.",
      highlights: [
        "Automatización total del método Kjeldahl",
        "Máxima precisión y control avanzado",
        "Gestión inteligente de datos y cumplimiento normativo",
      ],
      advantages: [
        "Analizador Kjeldahl totalmente automático: destilación, titulación, cálculo, impresión y gestión de residuos en un solo equipo.",
        "Diseñado para determinación de nitrógeno o proteína en alimentos, piensos, tabaco, suelos, medio ambiente, fármacos y más.",
        "Compatible con muestreador automático de 24 posiciones K1124 para trabajo verdaderamente desatendido.",
        "Nuevo sistema de condensación metálico de alta eficiencia que reduce hasta un 50% el consumo de agua.",
        "Alta precisión: bureta con resolución seleccionable de 0,2 / 0,4 / 1,0 uL por paso, con titulación en tiempo real a velocidad variable.",
        "Sistema operativo Android con pantalla táctil a color de 10 pulgadas, controlando en tiempo real todo el proceso experimental.",
        "Funciones de ensayo por lotes y muestreo automático que acortan el tiempo total de análisis.",
        "Monitoreo online de la curva de titulación y de la temperatura del condensado para asegurar resultados precisos y repetibles.",
        "Gestión de usuarios, privilegios, auditoría y protección de edición de datos, con trazabilidad completa del proceso.",
        "Informes personalizables en PDF o impresos, conexión directa con balanza y ajuste de sensor de color RGB configurable según el método analítico.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "0,1 mg - 240 mg N",
          rightParameter: "Tiempo de análisis",
          rightValue: "3 - 8 min por muestra",
        },
        {
          leftParameter: "Precisión de la bureta",
          leftValue: "0,2 / 0,4 / 1,0 uL por paso",
          rightParameter: "RSD",
          rightValue: "<= 0,5%",
        },
        {
          leftParameter: "Recuperación",
          leftValue: ">= 99,5%",
          rightParameter: "Capacidad de muestra",
          rightValue: "Sólidos <= 5 g · Líquidos <= 20 mL",
        },
        {
          leftParameter: "Consumo de agua en destilación",
          leftValue: "1,5 L/min",
          rightParameter: "Almacenamiento de datos",
          rightValue: "1 millón de registros interno / ilimitado en PC",
        },
        {
          leftParameter: "Interfaces",
          leftValue: "USB, LAN, RS232, CAN, WIFI",
          rightParameter: "Alimentación eléctrica",
          rightValue: "220 VAC +/-10%, 50/60 Hz",
        },
        {
          leftParameter: "Potencia",
          leftValue: "2000 W",
          rightParameter: "Dimensiones y peso",
          rightValue: "460 x 360 x 725 mm / 38 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Operación, titulación y control",
          tone: "yellow",
          items: [
            "Automatización completa: destilación, titulación, cálculo, reporte y gestión de residuos.",
            "Titulación en tiempo real con velocidad variable para reducir hasta un 30% el tiempo experimental.",
            "Bureta de alta resolución ajustable a 0,2 uL, 0,4 uL o 1,0 uL por paso.",
            "Pantalla táctil de 10 pulgadas con sistema Android para controlar y ajustar métodos durante el ensayo.",
            "Curva de titulación online para visualizar el proceso y afinar parámetros.",
            "Monitor de condensado con control en tiempo real de temperatura del efluente.",
          ],
        },
        {
          title: "Auto Sampler K1124",
          tone: "blue",
          items: [
            "Capacidad de 24 muestras por lote, con posición de limpieza separada para evitar contaminación cruzada.",
            "Velocidad de rotor: +/- 0,04 1/s.",
            "Velocidad de muestreo: >= 40 mm/s.",
            "Tanques de reactivos: 4 x 15 L para series largas de análisis.",
            "Alimentación: 24 V DC, 40 W de potencia.",
            "Comunicación mediante bus CAN directamente con el K1160, sin fuente de poder adicional.",
            "Dimensiones y peso: 920 x 625 x 908 mm - 80 kg.",
          ],
        },
        {
          title: "Gestión de datos y cumplimiento normativo",
          tone: "red",
          items: [
            "Almacenamiento interno de hasta 1 millón de registros, con opción de almacenamiento ilimitado en PC.",
            "Interfaces USB, LAN, RS232, CAN y WIFI para integración con redes y sistemas LIMS.",
            "Gestión de cuentas, privilegios, caducidad de contraseñas y trazabilidad completa de operaciones.",
            "Generación de reportes personalizables en PDF o impresos.",
            "Importación directa del peso de muestra desde balanza compatible.",
            "Sensor de color RGB ajustable según el método analítico utilizado.",
          ],
        },
        {
          title: "Aplicaciones principales",
          tone: "green",
          items: [
            "Industria de alimentos y piensos: determinación de nitrógeno y proteína bruta.",
            "Tabaco y productos agrícolas: control de calidad y análisis de contenido de nitrógeno.",
            "Medio ambiente y suelos: fertilidad, contaminación y monitoreo ambiental.",
            "Farmacéutica y química: control de procesos y verificación de materias primas.",
            "Investigación y enseñanza: laboratorios académicos que requieren automatización del método Kjeldahl.",
            "Supervisión de calidad y laboratorios oficiales: organismos reguladores y laboratorios de referencia.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-k9860",
    slug: "hanon-k9860",
    name: "Analizador Kjeldahl automático K9860",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Automatización",
      "Área farmacéutica",
    ],
    description:
      "Analizador automático Kjeldahl para determinar nitrógeno y proteína. Integra destilación, titulación, control de vapor, detección de la temperatura del destilado y limpieza de las líneas del ensayo.",
    features: [
      "Destilación y titulación automatizadas integradas",
      "Alta precisión de bureta hasta 2.0 μL/step",
      "Impresora integrada y almacenamiento de 1.000 registros",
    ],
    imageUrl: "/productos/hanon-k9860/frontal-v3.png",
    detail: {
      brand: "Hanon",
      model: "K9860",
      fullTitle:
        "Hanon K9860 Analizador Automático Kjeldahl de Nitrógeno y Proteína",
      subtitle:
        "Sistema automático que integra destilación y titulación en un solo ciclo para laboratorios que requieren control de calidad preciso, repetible y eficiente de nitrógeno y proteínas.",
      highlights: [
        "Destilación y titulación automatizadas integradas",
        "Alta resolución de bureta hasta 2.0 μL/step",
        "Seguridad avanzada y autolimpieza inteligente",
      ],
      advantages: [
        "Analizador Kjeldahl automático que integra destilación y titulación en un solo ciclo continuo.",
        "Alta precisión analítica gracias a su bomba de carga de alta exactitud con resolución de bureta de 2.0 μL por paso.",
        "Copa de titulación externa que permite el monitoreo visual en tiempo real de todo el proceso de valoración y destilación.",
        "Monitoreo de temperatura del condensado en tiempo real con parada automática ante anomalías para garantizar resultados seguros.",
        "Funciones automáticas integradas de limpieza de tubos de digestión, copa de titulación y líneas de reactivos químicos.",
        "Seguridad para el operador: evacuación automática de residuos calientes sin contacto manual con reactivos químicos.",
        "Almacenamiento local de hasta 1.000 registros experimentales.",
        "Impresora integrada para registrar los resultados del análisis.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "0.1 – 240 mg N",
          rightParameter: "Tiempo de análisis",
          rightValue: "5 – 10 min por muestra",
        },
        {
          leftParameter: "Precisión de bureta",
          leftValue: "2.0 μL/step",
          rightParameter: "RSD",
          rightValue: "≤ 0.5%",
        },
        {
          leftParameter: "Recuperación",
          leftValue: "≥ 99.5%",
          rightParameter: "Capacidad de muestra",
          rightValue: "Sólidos ≤ 5 g · Líquidos ≤ 20 mL",
        },
        {
          leftParameter: "Consumo de agua",
          leftValue: "1.5 L/min en destilación",
          rightParameter: "Almacenamiento",
          rightValue: "1000 registros locales",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "220 VAC ±10%, 50/60 Hz",
          rightParameter: "Potencia",
          rightValue: "2000 W",
        },
        {
          leftParameter: "Dimensiones y peso",
          leftValue: "455 × 391 × 730 mm",
          rightParameter: "Peso neto",
          rightValue: "38 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Características Operativas",
          tone: "blue",
          items: [
            "Equipo automático que integra destilación y titulación en un solo sistema.",
            "Detecta en tiempo real la temperatura del condensado.",
            "Se detiene automáticamente ante anomalías para asegurar la precisión del ensayo.",
            "Copa de titulación externa para visualización del proceso.",
            "Alta precisión en la dosificación gracias a bomba de carga de alta exactitud.",
          ],
        },
        {
          title: "Limpieza Automática y Seguridad",
          tone: "yellow",
          items: [
            "Limpieza automática de tubo de digestión y copa de titulación.",
            "Limpieza de tubería alcalina y tubería de ácido bórico.",
            "Lavado ácido y evacuación de botella de vapor incluidas.",
            "Evitación de contacto del operador con reactivos calientes.",
            "Integración de funciones que reducen riesgos y tiempos muertos.",
          ],
        },
        {
          title: "Precisión y Desempeño Analítico",
          tone: "red",
          items: [
            "RSD ≤ 0.5% y recuperación ≥ 99.5%.",
            "Titulación con resolución de 2.0 μL/step.",
            "Compatible con múltiples métodos Kjeldahl estándar.",
            "Resultados altamente estables gracias al sistema de control avanzado.",
          ],
        },
        {
          title: "Aplicaciones Principales",
          tone: "green",
          items: [
            "Alimentos: análisis de nitrógeno y proteínas.",
            "Piensos: análisis de nitrógeno y proteínas.",
            "Tabaco: análisis mediante el método Kjeldahl.",
            "Medio ambiente: aplicaciones indicadas por el fabricante.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-k9840",
    slug: "hanon-k9840",
    name: "Analizador Kjeldahl K9840",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Automatización"],
    description:
      "Unidad de destilación automática Kjeldahl de alta precisión para determinación rápida de nitrógeno. Dosificación precisa de reactivos y rutinas automáticas de limpieza.",
    features: [
      "Dosificación automática de alcali y ácido bórico",
      "Pantalla LCD a color de 4.3 pulgadas",
      "Sistema de autolimpieza de tuberías y destilador",
    ],
    imageUrl: "/productos/hanon-k9840/frontal.png",
    tags: [
      "Kjeldahl",
      "nitrogeno",
      "proteina",
      "alimentos",
      "automatizacion",
      "hanon",
      "destilador",
      "quimica",
      "destilacion",
    ],
    relatedProducts: ["hanon-k1160", "hanon-k9860", "hanon-sh220f"],
    detail: {
      brand: "Hanon",
      model: "K9840",
      fullTitle: "Hanon K9840 Unidad de Destilación Kjeldahl Automática",
      subtitle:
        "Equipo de destilación automática de nitrógeno Kjeldahl para laboratorios que requieren determinaciones rápidas, precisas y seguras con dosificación inteligente de reactivos.",
      highlights: [
        "Dosificación automatizada de reactivos de alta precisión",
        "Seguridad de nivel industrial y autolimpieza integrada",
        "Modos de control manual y automático programables",
      ],
      advantages: [
        "Dosificación automática y exacta de solución alcalina y agua de dilución.",
        "Pantalla a color de 4.3 pulgadas para configurar y monitorear el ensayo en tiempo real.",
        "Flexibilidad total de control gracias a la selección libre entre modo manual y automático.",
        "Programación flexible del tiempo de destilación con alarma audible al finalizar el ciclo.",
        "Limpieza automatizada del destilador y tuberías que previene la contaminación cruzada.",
        "Diseño inteligente de seguridad con sensores en tiempo real de puerta, tubo de digestión y flujo de agua.",
        "Operación de parada de emergencia para respuesta inmediata ante incidencias críticas.",
        "Calibración integrada de flujo para agua, alcali y ácido bórico para máxima constancia.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "0.1 mg – 240 mg N",
          rightParameter: "Tiempo de análisis",
          rightValue: "3 – 6 min por muestra",
        },
        {
          leftParameter: "Recuperación",
          leftValue: "≥ 99.5%",
          rightParameter: "Capacidad de muestra",
          rightValue: "Sólidos ≤ 6 g · Líquidos ≤ 16 mL",
        },
        {
          leftParameter: "Consumo de agua",
          leftValue: "1.5 L/min",
          rightParameter: "Modo de operación",
          rightValue: "Manual / Automático",
        },
        {
          leftParameter: "Pantalla de interfaz",
          leftValue: "LCD de 4.3 pulgadas",
          rightParameter: "Potencia nominal",
          rightValue: "1300 W",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "220 VAC ±10%, 50/60 Hz",
          rightParameter: "Peso neto",
          rightValue: "30 kg",
        },
        {
          leftParameter: "Dimensiones del chasis",
          leftValue: "400 × 385 × 735 mm",
          rightParameter: "Calibraciones",
          rightValue: "Agua / Álcali / Ácido bórico",
        },
      ],
      detailBlocks: [
        {
          title: "Características Operativas",
          tone: "blue",
          items: [
            "Pantalla LCD de 4.3 pulgadas con navegación clara y simple.",
            "Conmutación libre y directa entre control manual y automático.",
            "Edición de tiempo de destilación con alertas automáticas de fin de ciclo.",
            "Control inteligente del agua de refrigeración durante el ensayo.",
            "Modo de prueba integrado para verificar cada módulo individualmente.",
          ],
        },
        {
          title: "Seguridad y Diagnóstico",
          tone: "yellow",
          items: [
            "Monitoreo en tiempo real de puerta de seguridad y flujo de agua.",
            "Evacuación de residuos y limpieza automática de la copa del destilador.",
            "Interruptor de parada de emergencia para protección del operador.",
            "Detección y alerta visual/audible de fallos automáticos.",
          ],
        },
        {
          title: "Calibración y Precisión",
          tone: "red",
          items: [
            "Calibración integrada de flujo para agua de dilución.",
            "Calibración de dosificación para soluciones alcalinas.",
            "Calibración de dosificación para ácido bórico.",
            "Mantención sencilla con acceso directo a diagnósticos de componentes.",
          ],
        },
        {
          title: "Aplicaciones Principales",
          tone: "green",
          items: [
            "Alimentos y piensos: determinación de nitrógeno o proteínas.",
            "Agricultura y suelos: aplicaciones de fertilidad de suelos indicadas por el fabricante.",
            "Medicina, investigación, docencia y control de calidad: ámbitos de uso indicados por el fabricante.",
            "Tabaco y ganadería: ámbitos de uso indicados por el fabricante.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Nitrógeno y proteína",
          text: "Determinación de nitrógeno o proteínas por Kjeldahl en procesamiento de alimentos, producción de piensos, tabaco, ganadería, fertilidad de suelos, medicina, agricultura, investigación, docencia y control de calidad.",
        },
        {
          label: "Determinaciones adicionales",
          text: "La ficha técnica también indica uso para amonio y ácidos grasos volátiles o álcali.",
        },
      ],
    },
  },
  {
    id: "hanon-sox606",
    slug: "hanon-sox606",
    name: "Extractor Soxhlet automático SOX606",
    category: "Preparación de muestras",
    filters: [
      "Marcas",
      "Preparación de muestras",
      "Automatización",
      "Área farmacéutica",
    ],
    description:
      "Extractor de grasa automático Soxhlet de 6 posiciones. Rango de 0.1% a 100% con recuperación de solventes superior al 85% y calefacción de metal rápida y uniforme.",
    features: [
      "Capacidad para 6 muestras simultáneas por lote",
      "5 métodos de extracción Soxhlet integrados",
      "Recuperación de solventes de alta eficiencia ≥85%",
    ],
    imageUrl: "/productos/hanon-sox606/imagen-7.png",
    tags: [
      "Soxhlet",
      "grasa",
      "extraccion",
      "solvente",
      "lipidos",
      "alimentos",
      "automatizacion",
      "hanon",
      "quimica",
    ],
    relatedProducts: [
      "hanon-sox406",
      "hanon-f800",
      "hanon-sh220f",
      "hanon-k1160",
    ],
    detail: {
      brand: "Hanon",
      model: "SOX606",
      fullTitle: "Hanon SOX606 Extractor Automático de Grasa Soxhlet",
      subtitle:
        "Sistema automático de extracción por solventes con 6 posiciones independientes basado en el método Soxhlet tradicional, ideal para alimentos, piensos y matrices ambientales.",
      highlights: [
        "Calefacción metálica uniforme y de rápido calentamiento",
        "Cinco métodos de extracción incorporados",
        "Detección y seguridad de solventes de alta sensibilidad",
      ],
      advantages: [
        "Cinco métodos de extracción de un solo toque: Soxhlet tradicional, Soxhlet caliente, flujo continuo, extracción caliente y Soxhlet estándar CH.",
        "Calentamiento uniforme por bloque metálico que disminuye gradientes térmicos entre copas.",
        "Excelente tasa de recuperación de solventes ≥85% que reduce el costo operacional del ensayo.",
        "Capacidad de proceso de 6 muestras en paralelo para un rendimiento industrial optimizado.",
        "Diseño robusto con juntas de PTFE y cristalería de borosilicato resistente a agentes químicos.",
        "Detección integrada de fugas de éter para resguardar la seguridad física de los analistas.",
        "Control avanzado de temperatura con precisión de ±1°C y rango amplio hasta 300°C.",
        "Pantalla digital intuitiva de fácil manejo y configuración de métodos de rampa.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "0.1% – 100%",
          rightParameter: "Rango de temperatura",
          rightValue: "Temp. ambiente +5°C a 300°C",
        },
        {
          leftParameter: "Precisión de temperatura",
          leftValue: "±1°C",
          rightParameter: "Repetibilidad analítica",
          rightValue: "Error relativo ≤ 1%",
        },
        {
          leftParameter: "Capacidad por lote",
          leftValue: "6 muestras simultáneas",
          rightParameter: "Peso de muestra",
          rightValue: "0.5 g – 15 g",
        },
        {
          leftParameter: "Volumen de copa",
          leftValue: "150 mL",
          rightParameter: "Recuperación de solventes",
          rightValue: "≥ 85%",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "220 VAC ±10%, 50 Hz",
          rightParameter: "Potencia consumida",
          rightValue: "2600 W",
        },
        {
          leftParameter: "Dimensiones y peso",
          leftValue: "650 × 380 × 720 mm",
          rightParameter: "Peso neto",
          rightValue: "50 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Métodos de Extracción",
          tone: "blue",
          items: [
            "Soxhlet tradicional para máxima compatibilidad con normas oficiales.",
            "Soxhlet caliente para acortar tiempos de destilación y remojo.",
            "Extracción por flujo continuo y lavado directo.",
            "Extracción en caliente y evaporación/recuperación automática de solventes.",
          ],
        },
        {
          title: "Seguridad en Solventes",
          tone: "yellow",
          items: [
            "Sensor electrónico de fugas de gases orgánicos integrado.",
            "Control inteligente del circuito de refrigeración por agua.",
            "Copas metálicas calefactoras herméticas libres de chispas.",
            "Alarmas visuales y sonoras por anomalías térmicas.",
          ],
        },
        {
          title: "Consistencia y Rendimiento",
          tone: "red",
          items: [
            "Resultados de alta precisión con error relativo menor al 1%.",
            "Copas de 150 mL de borosilicato durables y de fácil manejo.",
            "Uniformidad térmica estricta entre las 6 posiciones de ensayo.",
            "Diseñado para soportar alta carga de trabajo diario en laboratorios de control de calidad.",
          ],
        },
        {
          title: "Aplicaciones Principales",
          tone: "green",
          items: [
            "Alimentos: extracción y cuantificación de grasa libre en carnes, lácteos y frituras.",
            "Alimento Animal: análisis de lípidos totales en piensos e insumos agropecuarios.",
            "Semillas y Granos: determinación de rendimiento de aceite en cultivos oleaginosas.",
            "Medio ambiente: extracción de hidrocarburos, pesticidas e insolubles en suelos.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-sh220f",
    slug: "hanon-sh220f",
    name: "Digestor Kjeldahl bloque de grafito SH220F",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización"],
    description:
      "Digestor Kjeldahl de bloque de grafito de 20 posiciones con control PID avanzado. Rango de temperatura hasta 450°C con calentamiento por rampa o curvas.",
    features: [
      "Capacidad para 20 tubos de 300 mL simultáneos",
      "Bloque de calefacción de grafito de alta pureza",
      "Control de temperatura PID con 10 programas",
    ],
    imageUrl: "/productos/hanon-sh220f/imagen-1.png",
    tags: [
      "Kjeldahl",
      "nitrogeno",
      "proteina",
      "digestor",
      "hanon",
      "preparacion",
      "grafito",
      "quimica",
      "digestión",
    ],
    relatedProducts: ["hanon-k9840", "hanon-k9860", "hanon-k1160"],
    detail: {
      brand: "Hanon",
      model: "SH220F",
      fullTitle: "Hanon SH220F Digestor de Bloque de Grafito Kjeldahl",
      subtitle:
        "Sistema de digestión ácida por bloque de grafito de 20 posiciones con calentamiento de alta homogeneidad y control avanzado de rampas para pre-tratamiento de muestras.",
      highlights: [
        "Bloque de grafito de alta pureza con tratamiento antioxidante",
        "Controlador PID con rampa y almacenamiento de 10 programas",
        "Aislamiento térmico exclusivo para chasis frío al tacto",
      ],
      advantages: [
        "Bloque de grafito de alta pureza que garantiza una transferencia térmica rápida y homogénea entre tubos.",
        "Aislamiento térmico mediante conductos de aire documentado por el fabricante.",
        "Tecnología de control de temperatura PID que alcanza 400°C en 25 minutos con precisión de ±1°C.",
        "Capacidad de digestión en rampa con almacenamiento de 10 recetas programables de hasta 5 etapas de temperatura y tiempo.",
        "Amplia capacidad de pre-tratamiento con soporte para 20 tubos de 300 mL en un solo lote de ensayo.",
        "Seguridad incorporada con parada automática por sobretemperatura, cortocircuito o sobrecorriente.",
        "Construcción duradera con recubrimientos anti-corrosión que extienden el ciclo de vida útil en campanas de extracción.",
      ],
      technicalParameters: [
        {
          leftParameter: "Capacidad de muestras",
          leftValue: "20 tubos en simultáneo",
          rightParameter: "Capacidad de tubos",
          rightValue: "300 mL cada uno",
        },
        {
          leftParameter: "Rango de temperatura",
          leftValue: "Temp. ambiente +5°C a 450°C",
          rightParameter: "Precisión de control",
          rightValue: "±1°C",
        },
        {
          leftParameter: "Tecnología de control",
          leftValue: "PID con rampa programable",
          rightParameter: "Programas integrados",
          rightValue: "10 curvas de digestión",
        },
        {
          leftParameter: "Etapas por curva",
          leftValue: "Hasta 5 etapas / rampas",
          rightParameter: "Material del bloque",
          rightValue: "Grafito tratado antioxidación",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "220 VAC ±10%, 50 Hz",
          rightParameter: "Potencia nominal",
          rightValue: "3600 W",
        },
        {
          leftParameter: "Dimensiones y peso",
          leftValue: "515 × 421 × 211 mm",
          rightParameter: "Peso neto",
          rightValue: "25 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Homogeneidad y Aislamiento",
          tone: "blue",
          items: [
            "Bloque de grafito de alta densidad para reducir diferencias de calor entre tubos.",
            "Canales de aire para aislamiento térmico del sistema.",
            "Calentamiento infrarrojo rápido y eficiente.",
            "Termoaislamiento avanzado que reduce pérdidas de calor.",
          ],
        },
        {
          title: "Programación de Curvas",
          tone: "yellow",
          items: [
            "Ajuste digital preciso mediante controlador PID de alta estabilidad.",
            "Configuración de rampas de calentamiento multietapa.",
            "Almacenamiento de programas habituales del laboratorio.",
            "Temporizador automático por tramo de temperatura.",
          ],
        },
        {
          title: "Seguridad y Campana de Gases",
          tone: "red",
          items: [
            "Monitoreo y corte por sobrecorriente o cortocircuitos eléctricos.",
            "Bloque de grafito con tratamiento antioxidante.",
            "Control PID para el seguimiento de la temperatura de digestión.",
            "Modos de calentamiento lineal y por curva.",
          ],
        },
        {
          title: "Aplicaciones Principales",
          tone: "green",
          items: [
            "Preparación de muestras para análisis Kjeldahl (nitrógeno y proteínas).",
            "Digestión de muestras de alimentos, piensos y suelos antes del análisis químico.",
            "Aplicaciones en las industrias alimentaria, farmacéutica y agrícola.",
            "Uso en universidades y departamentos de investigación científica.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Preparación por digestión",
          text: "Digestión de suelo, piensos y otras muestras antes del análisis químico, en alimentos, industria farmacéutica y agricultura.",
        },
        {
          label: "Investigación y docencia",
          text: "La ficha técnica identifica universidades y departamentos de investigación científica entre sus ámbitos de uso.",
        },
      ],
    },
  },
  {
    id: "hanon-sh420f",
    slug: "hanon-sh420f",
    name: "Digestor Kjeldahl bloque de grafito SH420F",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Automatización",
      "Área farmacéutica",
    ],
    description:
      "Digestor Kjeldahl de bloque de grafito de 20 posiciones con calentamiento infrarrojo rápido y control PID. Temperatura de ambiente +5°C a 450°C para digestiones eficientes y uniformes.",
    features: [
      "Calentamiento infrarrojo rápido y estable",
      "Bloque de grafito de alta densidad antioxidante",
      "Control de temperatura PID de hasta 5 etapas",
    ],
    imageUrl: "/productos/hanon-sh420f/imagen-1.png",
    detail: {
      brand: "Hanon",
      model: "SH420F",
      fullTitle:
        "Hanon SH420F Digestor Kjeldahl de Bloque de Grafito de 20 Posiciones",
      subtitle:
        "Sistema de digestión Kjeldahl programable de alta capacidad para el pretratamiento de muestras en alimentos, agricultura, farmacéutica y análisis ambiental.",
      highlights: [
        "Calentamiento rápido infrarrojo",
        "Control PID digital de precisión",
        "20 posiciones simultáneas",
      ],
      advantages: [
        "Calentamiento infrarrojo de respuesta rápida: alcanza 400°C en tan solo 25 minutos.",
        "Programación avanzada: almacene hasta 20 programas de digestión con curvas, rampas y gradientes de temperatura multietapa de hasta 5 segmentos.",
        "Máxima uniformidad térmica: bloque de grafito de alta pureza con tratamiento especial antioxidación para asegurar calor uniforme en todos los tubos.",
        "Pantalla LCD a color de 5.7 pulgadas para visualizar el proceso.",
        "Diseño anticorrosivo integral: chasis e interfaces selladas para resistir los vapores ácidos y uso rudo en el laboratorio.",
        "Módulo de neutralización modular S402 con triple sistema de filtración (carbón activo, neutralización alcalina y condensación).",
        "Campana de recolección de gases WD03 incluida en la configuración estándar, con tapa PFA y diseño clip-on.",
        "Seguridad de nivel industrial: protección contra sobrecorriente, alertas de alta temperatura residual y protección ante sobrecargas.",
      ],
      technicalParameters: [
        {
          leftParameter: "Capacidad por lote",
          leftValue: "20 tubos / muestras simultáneas",
          rightParameter: "Capacidad de tubo",
          rightValue: "300 mL por tubo",
        },
        {
          leftParameter: "Rango de temperatura",
          leftValue: "Ambiente +5°C - 450°C",
          rightParameter: "Precisión de temperatura",
          rightValue: "±1°C",
        },
        {
          leftParameter: "Método de calentamiento",
          leftValue: "Calor Infrarrojo y Grafito",
          rightParameter: "Aislamiento térmico",
          rightValue: "Técnica de ducto de aire",
        },
        {
          leftParameter: "Programas de digestión",
          leftValue: "20 curvas guardadas",
          rightParameter: "Segmentos por programa",
          rightValue: "Hasta 5 etapas / curvas",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "220 VAC ±10%, 50/60 Hz",
          rightParameter: "Potencia nominal",
          rightValue: "3600 W",
        },
        {
          leftParameter: "Dimensiones del digestor",
          leftValue: "515 × 458 × 730 mm",
          rightParameter: "Peso neto",
          rightValue: "40 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Calentamiento Infrarrojo y Grafito",
          tone: "blue",
          items: [
            "Conducción térmica eficiente y homogénea mediante bloque de grafito de alta densidad.",
            "Transferencia infrarroja rápida que alcanza la temperatura objetivo de forma ágil.",
            "Distribución uniforme de calor para una digestión homogénea en las 20 posiciones.",
            "Menor tiempo de precalentamiento (400°C en 25 minutos).",
          ],
        },
        {
          title: "Programación Inteligente PID",
          tone: "yellow",
          items: [
            "Controlador PID integrado para máxima estabilidad y protección contra sobretemperaturas.",
            "Modos de control por curva o lineales para adaptarse a diferentes tipos de matrices.",
            "Programas multietapa editables directamente desde el panel LCD frontal.",
            "Programación del perfil térmico de la muestra mediante curvas o modo lineal.",
          ],
        },
        {
          title: "Módulo Exhausting S402 y Recolección WD03",
          tone: "red",
          items: [
            "Campana WD03 con sellado anticorrosión PFA hermético.",
            "Bomba de vacío silenciosa integrada de alta succión.",
            "Triple neutralización de vapores ácidos con condensación alcalina y carbón activo.",
            "Tuberías y sellos de PTFE para una larga vida útil sin desgaste por ácido.",
          ],
        },
        {
          title: "Aplicaciones del SH420F",
          tone: "green",
          items: [
            "Digestión de muestras de alimentos, piensos y suelos antes del análisis químico.",
            "Aplicaciones en las industrias alimentaria, farmacéutica y agrícola.",
            "Uso en universidades y departamentos de investigación científica.",
            "Preparación de muestras mediante digestión Kjeldahl.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-k1100f",
    slug: "hanon-k1100f",
    name: "Analizador Kjeldahl automático K1100F",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Automatización",
      "Área farmacéutica",
    ],
    description:
      "Analizador Kjeldahl automático de nitrógeno y proteína que integra destilación, titulación, cálculo e impresión. Equipado con pantalla táctil de 5.6” y doble destilación programable.",
    features: [
      "Automatización de destilación y titulación",
      "Pantalla táctil LCD a color de 5.6”",
      "Titulación durante la destilación",
    ],
    imageUrl: "/productos/hanon-k1100f/imagen-1.png",
    detail: {
      brand: "Hanon",
      model: "K1100F",
      fullTitle:
        "Hanon K1100F Analizador Automático Kjeldahl de Nitrógeno y Proteína",
      subtitle:
        "Sistema automático Kjeldahl que destila, titula, calcula, imprime resultados, descarga residuos y limpia el circuito del ensayo.",
      highlights: [
        "Destilación y titulación automáticas",
        "Titulación simultánea en tiempo real",
        "Doble destilación para muestras difíciles",
      ],
      advantages: [
        "Automatización completa: realiza las etapas de destilación, titulación, cálculo de resultados, impresión, descarga rápida de residuos y auto-limpieza en un único ciclo.",
        "Pantalla táctil a color de 5.6 pulgadas: interfaz visual moderna con monitoreo en tiempo real del proceso y alarmas de seguridad.",
        "Realiza la titulación durante la destilación; la ficha indica un tiempo de análisis de 3 a 8 minutos por muestra.",
        "Bomba de dosificación y sistema de titulación con resolución de bureta de 1.0 μL por paso y RSD ≤ 0.5%.",
        "Control avanzado de vapor: flujo ajustable para adaptarse a distintas metodologías y tipos de muestras analíticas.",
        "Diseño robusto de seguridad: sensores de puerta, posicionamiento de tubos, flujo de agua de refrigeración y control térmico del destilador en tiempo real.",
        "Capacidad de almacenamiento de hasta 1.800 registros; la conexión al computador puede ser por USB o RS485.",
        "Drenaje rápido y seguro: evacúa automáticamente los residuos ácidos calientes de los tubos al terminar, protegiendo al operador.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "0,1 mg - 240 mg N",
          rightParameter: "Tiempo de análisis",
          rightValue: "3 - 8 min por muestra",
        },
        {
          leftParameter: "Precisión de bureta",
          leftValue: "1.0 μL por paso",
          rightParameter: "RSD (Repetibilidad)",
          rightValue: "<= 0.5%",
        },
        {
          leftParameter: "Recuperación de nitrógeno",
          leftValue: ">= 99.5%",
          rightParameter: "Capacidad de muestra",
          rightValue: "Sólidos ≤ 5 g, Líquidos ≤ 20 mL",
        },
        {
          leftParameter: "Consumo de agua",
          leftValue: "1.5 L/min (en destilación)",
          rightParameter: "Almacenamiento de datos",
          rightValue: "1800 registros completos",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "220 VAC ±10%, 50/60 Hz",
          rightParameter: "Potencia nominal",
          rightValue: "2000 W",
        },
        {
          leftParameter: "Dimensiones y peso",
          leftValue: "455 × 391 × 730 mm",
          rightParameter: "Peso neto",
          rightValue: "38 kg",
        },
        {
          leftParameter: "Conexión a computador",
          leftValue: "USB o RS485 (opcional)",
          rightParameter: "Compatibilidad documentada",
          rightValue: "Tubo de digestión φ42 mm",
        },
      ],
      detailBlocks: [
        {
          title: "Destilación y Titulación Integradas",
          tone: "blue",
          items: [
            "Titulación en tiempo real mientras se realiza la destilación de la muestra.",
            "Bomba dosificadora y sistema de titulación de alta exactitud para máxima reproducibilidad.",
            "Función de doble destilación documentada por el fabricante.",
            "Consumo eficiente de agua de refrigeración controlado por sensores.",
          ],
        },
        {
          title: "Operación y Control Inteligente",
          tone: "yellow",
          items: [
            "Pantalla LCD táctil intuitiva de 5.6” para configurar parámetros y tiempos.",
            "Detección y alerta automática por falta de reactivos en los contenedores de llenado.",
            "Monitoreo en tiempo real de la temperatura del destilado y control de flujo de vapor.",
            "Drenaje automático rápido de los tubos para evitar manipulación directa de reactivos calientes.",
          ],
        },
        {
          title: "Seguridad y Diagnóstico Activo",
          tone: "red",
          items: [
            "Autodiagnóstico y avisos por falta de agua de condensación, puerta de seguridad y ubicación del tubo de digestión.",
            "Parada de emergencia ante anomalías de temperatura del destilado.",
            "Aviso por ausencia de reactivos para mantener la continuidad del ensayo.",
            "Drenaje rápido de los tubos para evitar el contacto con reactivos calientes.",
          ],
        },
        {
          title: "Aplicaciones del K1100F",
          tone: "green",
          items: [
            "Alimentos: determinación de nitrógeno y proteínas mediante Kjeldahl.",
            "Piensos: determinación de nitrógeno y proteínas mediante Kjeldahl.",
            "Tabaco: aplicaciones indicadas por el fabricante.",
            "Medio ambiente: aplicaciones indicadas por el fabricante.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-sh520",
    slug: "hanon-sh520",
    name: "Digestor automático Kjeldahl SH520/SH508",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Automatización"],
    description:
      "Digestión Kjeldahl automática con soporte de elevación, sistema Android y almacenamiento integrado. Puede controlar el depurador de gases S403 opcional durante el proceso.",
    features: [
      "Operación completamente automática con sistema Android",
      "Soporte de elevación automática para enfriamiento rápido",
      "Control del digestor, la elevación y el depurador S403 opcional",
    ],
    imageUrl: "/productos/hanon-sh520/imagen-1.png",
    detail: {
      brand: "Hanon",
      model: "SH520 / SH508",
      fullTitle:
        "Hanon SH520 / SH508 Digestor Automático Kjeldahl de Alta Productividad",
      subtitle:
        "Sistema de digestión Kjeldahl automatizado con configuraciones de 20 posiciones (SH520) u 8 posiciones (SH508), elevación automática y control de métodos.",
      highlights: [
        "Automatización integral del proceso de digestión",
        "Control PID difuso y velocidad de calentamiento programable",
        "Trazabilidad completa de registros digitales",
      ],
      advantages: [
        "Operación completamente automática a través del sistema operativo Android, controlando de manera simultánea el dispositivo de elevación y el neutralizador de gases.",
        "Equipado con un sistema de elevación automático que sube y baja el soporte de tubos reduciendo la mano de obra y acelerando el enfriamiento.",
        "Módulo de calentamiento de aluminio con orificios profundos que mejora la transferencia térmica homogénea y evita salpicaduras o golpes.",
        "Excelente conservación de calor mediante aislamiento térmico de cerámica y conductos de aire exclusivos, reduciendo el consumo de energía.",
        "Monitoreo de curvas térmicas en tiempo real con almacenamiento de 8 GB integrado para registrar información experimental de forma ilimitada.",
        "Más de 20 métodos preinstalados y capacidad de almacenar más de 500 métodos personalizados.",
        "Carcasa con revestimiento anticorrosivo de teflón de alto grado, capaz de soportar altas temperaturas y exposición prolongada a ácidos fuertes.",
        "Múltiples sistemas de seguridad activa con alarmas por sobretensión, sobrecorriente, sobrecalentamiento y fallas de comunicación.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de temperatura",
          leftValue: "Temp. ambiente +5°C a 450°C",
          rightParameter: "Precisión de temperatura",
          rightValue: "±1°C",
        },
        {
          leftParameter: "Método de calentamiento",
          leftValue: "Tubo de calefacción eléctrica",
          rightParameter: "Capacidad de digestión",
          rightValue: "20 posiciones (SH520) / 8 posiciones (SH508)",
        },
        {
          leftParameter: "Tubos de digestión",
          leftValue: "300 mL (SH520) / 300 mL o 380 mL (SH508)",
          rightParameter: "Dispositivo de elevación",
          rightValue: "Automático integrado",
        },
        {
          leftParameter: "Interfaces",
          leftValue: "WiFi / USB",
          rightParameter: "Alimentación eléctrica",
          rightValue: "AC 220 V ±10%, 50 Hz",
        },
        {
          leftParameter: "Potencia nominal",
          leftValue: "2950 W (SH520) / 1400 W (SH508)",
          rightParameter: "Peso neto",
          rightValue: "21 kg (SH520) / 15 kg (SH508)",
        },
        {
          leftParameter: "Dimensiones",
          leftValue: "305 × 590 × 151 mm (SH520)",
          rightParameter: "Dimensiones",
          rightValue: "328 × 440 × 151 mm (SH508)",
        },
      ],
      detailBlocks: [
        {
          title: "Automatización y Control Integrado",
          tone: "yellow",
          items: [
            "Sistema Android con pantalla táctil e interfaz gráfica interactiva.",
            "Lifting automático del rack de tubos al finalizar la digestión para enfriamiento rápido.",
            "Soporte de enfriamiento independiente flexible y compacto.",
            "Control del colector WD03 y del depurador de gases S403 opcional desde el digestor.",
          ],
        },
        {
          title: "Accesorios de Neutralización y Seguridad",
          tone: "blue",
          items: [
            "Colector de gases WD03 con cubierta de sellado de PFA de larga vida útil y diseño a presión.",
            "Dispositivo de vacío por chorro de agua en el WD03 que no requiere alimentación eléctrica adicional.",
            "Bandeja de goteo profesional integrada contra corrosión por líquidos ácidos residuales.",
            "Tuberías de PTFE de alta durabilidad química en el depurador S403 para prolongar la vida útil del sistema.",
          ],
        },
        {
          title: "Trazabilidad y Resguardo de Datos",
          tone: "red",
          items: [
            "Integridad y seguridad de registros digitales, con trazabilidad completa.",
            "Pistas de auditoría (audit trail) integradas para seguimiento completo de usuarios y métodos.",
            "Transmisión inalámbrica de datos vía WiFi o puerto físico USB para respaldos externos.",
            "Revisión histórica de curvas térmicas directamente desde la pantalla táctil.",
          ],
        },
        {
          title: "Aplicaciones del SH520/SH508",
          tone: "green",
          items: [
            "Digestión automática basada en el método Kjeldahl.",
            "Configuración de 20 posiciones en SH520 u 8 posiciones en SH508 según la cantidad de muestras.",
            "Elevación automática del soporte de tubos para enfriamiento tras la digestión.",
            "Control del depurador S403 opcional desde el digestor.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Trazabilidad documentada",
          text: "La ficha técnica describe registro de auditoría para trazabilidad completa de las operaciones; no aporta certificados adicionales.",
        },
      ],
    },
  },
  {
    id: "hanon-s402",
    slug: "hanon-s402",
    name: "Sistema de agotamiento de gases S402",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Automatización"],
    description:
      "Sistema de agotamiento y neutralización de gases de escape con bomba de vacío anticorrosión, filtración ternaria y tuberías de PTFE.",
    features: [
      "Sistema de filtración ternaria",
      "Bomba de vacío anticorrosión silenciosa de alta succión",
      "Diseño modular compacto con área de absorción translúcida",
    ],
    imageUrl: "/productos/hanon-s402/imagen-1.png",
    detail: {
      brand: "Hanon",
      model: "S402",
      fullTitle:
        "Hanon S402 Sistema de Agotamiento y Neutralización de Gases Ácidos",
      subtitle:
        "Sistema modular de absorción y neutralización de gases de escape para configuraciones de digestión Kjeldahl.",
      highlights: [
        "Sistema de filtración ternaria",
        "Vacío regulable por presión negativa",
        "Diseño resistente a la corrosión con tuberías de PTFE",
      ],
      advantages: [
        "Diseño modular y compacto para integrarse a la configuración de digestión Kjeldahl.",
        "Área del dispositivo de absorción translúcida para facilitar la inspección y el cambio de filtros.",
        "Presión de succión ajustable ante vacío negativo, evitando la fuga o derrame accidental de gases ácidos nocivos.",
        "Bomba de vacío anticorrosión de alta durabilidad con funcionamiento silencioso (bajo nivel de ruido) y alta capacidad de succión.",
        "Sistema de filtración ternaria compuesto por condensación de agua, neutralización alcalina y adsorción por carbón activo.",
        "Tuberías de PTFE resistentes a la corrosión para el manejo de gases de escape.",
      ],
      technicalParameters: [
        {
          leftParameter: "Método de filtración",
          leftValue: "Ternario (Condensación, álcalis, carbón activo)",
          rightParameter: "Tipo de bomba",
          rightValue: "Bomba de vacío anticorrosión integrada",
        },
        {
          leftParameter: "Presión de succión",
          leftValue: "Ajustable en vacío negativo",
          rightParameter: "Área de absorción",
          rightValue: "Diseño translúcido para inspección",
        },
        {
          leftParameter: "Tuberías del sistema",
          leftValue: "PTFE resistente a la corrosión",
          rightParameter: "Compatibilidad documentada",
          rightValue: "Digestores Kjeldahl SH420F y SH220F",
        },
      ],
      detailBlocks: [
        {
          title: "Filtración Ternaria Eficiente",
          tone: "yellow",
          items: [
            "Primera etapa: Condensación de agua para recuperar y enfriar vapores calientes.",
            "Segunda etapa: Neutralización química con soluciones alcalinas para gases ácidos.",
            "Tercera etapa: Adsorción final por carbón activo para remover olores y trazas gaseosas.",
            "Configuración orientada a la absorción y neutralización de gases de escape.",
          ],
        },
        {
          title: "Diseño Inteligente y Compacto",
          tone: "blue",
          items: [
            "Estructura modular optimizada para operar en combinación directa con el digestor.",
            "Área de absorción translúcida para inspeccionar el sistema.",
            "Diseño que facilita el cambio de filtros.",
            "Bomba de vacío anticorrosión, de bajo ruido y alta succión.",
          ],
        },
        {
          title: "Seguridad y Control de Vacío",
          tone: "red",
          items: [
            "Presión de succión ajustable al trabajar en vacío negativo.",
            "Ajuste de vacío para evitar el derrame o escape de gases ácidos.",
            "Bomba anticorrosión de bajo ruido y alta capacidad de succión.",
            "Tuberías de PTFE resistentes a la corrosión.",
          ],
        },
        {
          title: "Aplicaciones del S402",
          tone: "green",
          items: [
            "Neutralización y agotamiento de gases ácidos generados en digestiones Kjeldahl.",
            "Configuración junto a los digestores SH420F y SH220F documentados en la ficha.",
            "Absorción de gases de escape mediante condensación, neutralización alcalina y carbón activo.",
            "Laboratorios que requieren el manejo controlado de gases de digestión.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-sox406",
    slug: "hanon-sox406",
    name: "Analizador de grasa SOX406",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras"],
    description:
      "Analizador de grasa semi automático de 6 posiciones basado en el principio de extracción Soxhlet. Cuenta con calefacción metálica integral, temporizador aislado y recuperación de solventes.",
    features: [
      "Calefacción metálica integral de alta uniformidad térmica",
      "Control por microcomputador con pantalla LCD de 4.3 pulgadas",
      "Recuperación de solventes ≥80%",
    ],
    imageUrl: "/productos/hanon-sox406/frontal.png",
    tags: [
      "Soxhlet",
      "grasa",
      "extraccion",
      "solvente",
      "lipidos",
      "alimentos",
      "semi-automatico",
      "hanon",
      "quimica",
    ],
    relatedProducts: ["hanon-sox606", "hanon-k1160", "hanon-sh520"],
    detail: {
      brand: "Hanon",
      model: "SOX406",
      fullTitle: "Hanon SOX406 Analizador Semi Automático de Grasa Soxhlet",
      subtitle:
        "Extracción por solvente segura, rápida y con excelente repetibilidad. Aísla completamente el circuito eléctrico del espacio de extracción de vapores.",
      highlights: [
        "Calefacción metálica integral hasta 280°C con precisión de ±1°C",
        "Circuito eléctrico totalmente aislado del espacio de vapores",
        "Triple alarma: sonora, luminosa y avisos en pantalla LCD",
      ],
      advantages: [
        "Calentamiento metálico integral con amplio rango de temperatura (ambiente +5°C a 280°C).",
        "Aislamiento térmico exclusivo de aire que mantiene la carcasa exterior a temperatura ambiente.",
        "Seguridad garantizada: circuito eléctrico totalmente separado del área de extracción de solvente.",
        "Monitoreo integral: pantalla digital que muestra temperaturas teóricas y reales, y tiempos de ensayo.",
        "Operación de elevación cómoda y suave gracias a la tecnología de conducción por rodamientos lineales.",
        "Temporizador y circuito de control aislados térmicamente para extender la vida útil del sistema.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "0% – 100%",
          rightParameter: "Rango de temperatura",
          rightValue: "Temp. ambiente +5°C a 280°C",
        },
        {
          leftParameter: "Precisión de temperatura",
          leftValue: "±1°C",
          rightParameter: "Repetibilidad analítica",
          rightValue: "Error relativo ≤ 1%",
        },
        {
          leftParameter: "Capacidad por lote",
          leftValue: "6 muestras simultáneas",
          rightParameter: "Peso de muestra",
          rightValue: "0.5 g – 15 g (generalmente 2 g – 5 g)",
        },
        {
          leftParameter: "Volumen de copa",
          leftValue: "80 mL",
          rightParameter: "Recuperación de solvente",
          rightValue: "≥ 80%",
        },
        {
          leftParameter: "Tiempo de extracción acortado",
          leftValue: "20% – 80%",
          rightParameter: "Alimentación eléctrica",
          rightValue: "220 VAC ±10%, 50/60 Hz",
        },
        {
          leftParameter: "Potencia nominal",
          leftValue: "1000 W",
          rightParameter: "Dimensiones y Peso",
          rightValue: "650 × 320 × 715 mm / 35 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Seguridad Operativa Avanzada",
          tone: "red",
          items: [
            "El cableado y la circuitería eléctrica están físicamente sellados y aislados de las copas de solvente.",
            "Tecnología exclusiva de aislamiento de flujo de aire para mantener el chasis a temperatura ambiente.",
            "Triple alarma ante cualquier desviación térmica: advertencia sonora, alertas luminosas y mensajes en el LCD.",
            "Sensores integrados contra sobrecalentamiento que cortan el suministro eléctrico de forma autónoma.",
          ],
        },
        {
          title: "Diseño Ergonómico y Duradero",
          tone: "blue",
          items: [
            "Sistema de conducción de cojinetes lineales de precisión para una elevación de muestras sumamente suave.",
            "Copas de vidrio de borosilicato de alta resistencia química a solventes orgánicos y ácidos.",
            "Panel de control por microcomputador con pantalla LCD de 4.3 pulgadas clara y fácil de operar.",
            "Bloque calefactor metálico integral que garantiza una transferencia de calor homogénea a todas las copas.",
          ],
        },
        {
          title: "Eficiencia Analítica en Extracción",
          tone: "green",
          items: [
            "Recuperación superior al 80% de reactivos orgánicos y solventes en cada destilación, reduciendo costos operacionales.",
            "Extracción Soxhlet multimatriz que acorta de un 20% a un 80% los tiempos en comparación con métodos manuales.",
            "Procesamiento simultáneo de hasta 6 muestras por lote bajo la misma rampa térmica.",
            "Determinación precisa y reproducible de grasas y lípidos totales en matrices sólidas o semisólidas.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Matrices sólidas y semisólidas",
          text: "La documentación indica separación y determinación de compuestos orgánicos solubles en alimentos, piensos, medicamentos, suelos, lodos, polímeros, productos de fibra, productos petroquímicos, detergentes, caucho y plásticos.",
        },
      ],
    },
  },
  {
    id: "hanon-f800",
    slug: "hanon-f800",
    name: "Analizador de fibra F800",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización"],
    description:
      "Analizador de fibra automático de 6 posiciones basado en los métodos Weende y Van Soest. Cuenta con calentamiento por infrarrojos, pantalla táctil de 7 pulgadas y protección contra desbordamientos durante la dosificación.",
    features: [
      "Sistema de calentamiento por infrarrojos uniforme y rápido",
      "Control preciso con pantalla táctil a color de 7 pulgadas",
      "Procesamiento simultáneo de 6 muestras por lote",
    ],
    imageUrl: "/productos/hanon-f800/frontal.png",
    tags: [
      "fibra",
      "Weende",
      "Van Soest",
      "detergente",
      "crisol",
      "infrarrojo",
      "automatizacion",
      "hanon",
      "quimica",
    ],
    relatedProducts: ["hanon-k1160", "hanon-sox606", "hanon-sh520"],
    detail: {
      brand: "Hanon",
      model: "F800",
      fullTitle: "Hanon F800 Analizador Automático de Fibra",
      subtitle:
        "Análisis seguro de fibra cruda, NDF, ADF y ADL. Integra precalentamiento y dosificación segura sin contacto de bomba con fluidos corrosivos.",
      highlights: [
        "Tecnología integrada de calentamiento por infrarrojos uniformizados",
        "Estructura de dosificación segura contra desbordamientos accidentales",
        "Función de retroceso del crisol (recoil) para evitar apelmazamiento",
      ],
      advantages: [
        "Estructura oculta de extracción del barril de solución para facilitar la dosificación segura.",
        "El líquido corrosivo no entra en contacto con la bomba, eliminando el riesgo de corrosión interna.",
        "Función de retroceso (recoil) en los crisoles para evitar obstrucciones y apelmazamientos durante la filtración.",
        "Ajuste en tiempo real de la potencia de calentamiento del crisol para controlar la rampa térmica y ahorrar energía.",
        "Precalentamiento rápido integrado que reduce notablemente el tiempo total del ensayo.",
        "Cinco especificaciones de crisoles intercambiables para procesar diversos tipos de muestras.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "0.1% – 100%",
          rightParameter: "Método de calentamiento",
          rightValue: "Calentamiento infrarrojo rápido",
        },
        {
          leftParameter: "Capacidad por lote",
          leftValue: "6 crisoles simultáneos",
          rightParameter: "Peso de muestra",
          rightValue: "0.5 g – 3 g",
        },
        {
          leftParameter: "Error de repetibilidad",
          leftValue: "≤ 0.4% (fibra < 10%), ≤ 1% (fibra > 10%)",
          rightParameter: "Tiempo de precalentamiento",
          rightValue: "10 – 12 min",
        },
        {
          leftParameter: "Tiempo hasta ebullición",
          leftValue: "13 – 15 min",
          rightParameter: "Pantalla de control",
          rightValue: "Táctil a color de 7 pulgadas",
        },
        {
          leftParameter: "Potencia nominal",
          leftValue: "2200 W",
          rightParameter: "Alimentación eléctrica",
          rightValue: "220 VAC ±10%, 50/60 Hz",
        },
        {
          leftParameter: "Dimensiones",
          leftValue: "776 × 476 × 644 mm",
          rightParameter: "Parámetros analizados",
          rightValue: "Fibra cruda, NDF, ADF, ADL, hemicelulosa",
        },
      ],
      detailBlocks: [
        {
          title: "Calentamiento Infrarrojo de Precisión",
          tone: "yellow",
          items: [
            "Sistema integrado de infrarrojos que asegura una transferencia térmica uniforme y veloz a cada crisol.",
            "Ajuste de potencia calefactora en tiempo real que reduce el gasto energético innecesario.",
            "Precalentamiento integrado que optimiza el flujo de trabajo analítico.",
            "Extracción consistente que minimiza variaciones térmicas entre crisoles y aumenta la reproducibilidad.",
          ],
        },
        {
          title: "Seguridad y Prevención de Corrosión",
          tone: "blue",
          items: [
            "Diseño exclusivo donde los fluidos altamente ácidos o alcalinos no tocan los mecanismos de la bomba.",
            "Protección activa contra desbordamientos que resguarda la integridad física del analista de laboratorio.",
            "Estructura oculta del barril de solución para manipulación limpia y dosificación sin salpicaduras.",
          ],
        },
        {
          title: "Filtración Eficiente sin Apelmazamiento",
          tone: "red",
          items: [
            "Función especial de retroceso del crisol (crucible recoil) que evita que las muestras se obstruyan.",
            "Cinco tipos de crisoles incluidos de manera estándar para adecuar la filtración a la muestra.",
            "Excelente compatibilidad con el método Weende (fibra bruta) y método Van Soest.",
          ],
        },
        {
          title: "Extractor en Frío Periférico F800-B",
          tone: "green",
          items: [
            "Accesorio opcional de soporte que realiza el desengrasado previo a temperatura ambiente.",
            "Utiliza el mismo sistema de crisoles del F800, permitiendo pesajes intermedios directos sin trasvasar.",
            "Equipado con bomba de alta presión para prevenir taponamientos y asegurar la deshidratación rápida.",
            "Protección contra salpicaduras integrada para una manipulación segura de acetona y reactivos desengrasantes.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Determinaciones de fibra",
          text: "Análisis de fibra cruda, fibra detergente neutra (NDF), fibra detergente ácida (ADF), hemicelulosa y lignina detergente ácida (ADL).",
        },
        {
          label: "Muestras indicadas",
          text: "La ficha técnica indica uso en plantas, piensos, alimentos y otros productos agrícolas.",
        },
      ],
    },
  },
  {
    id: "hanon-d50-d200",
    slug: "hanon-d50-d200",
    name: "Analizador Dumas D50/D200",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Automatización"],
    description:
      "Analizador automático de nitrógeno y proteínas basado en el principio de combustión de Dumas, que ofrece resultados en 4 minutos sin reactivos tóxicos ni pretratamiento de muestras.",
    features: [
      "Tiempo de análisis rápido en 4 minutos",
      "Muestreador de 120 posiciones (D200)",
      "Proceso sin reactivos tóxicos",
    ],
    imageUrl: "/productos/hanon-d50-d200/frontal.png",
    tags: [
      "dumas",
      "nitrogeno",
      "proteinas",
      "combustion",
      "hanon",
      "analisis",
    ],
    relatedProducts: ["hanon-k1160", "hanon-k9860"],
    detail: {
      brand: "Hanon",
      model: "D50/D200",
      fullTitle: "Hanon D50/D200 Analizador de Nitrógeno y Proteínas Dumas",
      subtitle:
        "Determina el contenido de nitrógeno/proteínas mediante combustión, purificación, reducción y detección por conductividad térmica.",
      highlights: [
        "Combustión y oxidación en dos etapas para una digestión completa",
        "Deshidratación en tres etapas con condensador metálico eficiente",
        "Detección TCD de alta sensibilidad",
      ],
      advantages: [
        "Un condensador metálico eficiente y desecantes de dos etapas pueden eliminar completamente el agua.",
        "Los componentes neumáticos SMC® pueden inyectar muestras hasta 100,000 veces con bajos costos de mantenimiento.",
        "Detección in situ sin contacto para evitar funcionamientos incorrectos si el disco de muestreo está ocupado (D200).",
        "Los usuarios pueden agregar muestras libremente durante la preparación sin detener el análisis automático.",
        "Comunicación inalámbrica de datos de balanza con alcance máximo de 100m.",
      ],
      technicalParameters: [
        {
          leftParameter: "Tiempo de análisis",
          leftValue: "3-4 min/muestra",
          rightParameter: "Precisión de pesaje",
          rightValue: "≤0.1mg",
        },
        {
          leftParameter: "Rango de detección",
          leftValue: "0.1-500mg N",
          rightParameter: "Tasa de recuperación",
          rightValue: "≥99.5%",
        },
        {
          leftParameter: "RSD (Desviación estándar relativa)",
          leftValue: "≤0.5%",
          rightParameter: "Límite de detección (LOD)",
          rightValue: "0.01mg de nitrógeno",
        },
        {
          leftParameter: "Capacidad de muestra",
          leftValue: "Sólido ≤1g, Líquido ≤1mL",
          rightParameter: "Muestreador (D200 / D50)",
          rightValue: "120/40 posiciones (D200) / 60 posiciones (D50)",
        },
        {
          leftParameter: "Detector",
          leftValue: "TCD",
          rightParameter: "Precisión TCD",
          rightValue: "≤0.01℃",
        },
        {
          leftParameter: "Gas portador",
          leftValue: "CO2 (Pureza 99.999%)",
          rightParameter: "Oxígeno",
          rightValue: "Pureza 99.999%",
        },
        {
          leftParameter: "Temperatura del horno",
          leftValue: "Máx. 1200℃",
          rightParameter: "Potencia nominal",
          rightValue: "2000W",
        },
      ],
      detailBlocks: [
        {
          title: "Combustión y Oxidación Eficientes",
          tone: "yellow",
          items: [
            "Combustión con oxígeno puro en tubo primario para oxidación y digestión preliminar.",
            "Digestión completa en tubo secundario catalizado por Pt y óxido de cobre.",
            "Deshidratación en tres etapas con condensador electrónico y tubos de secado.",
            "Agente reductor de alta eficiencia para convertir óxidos de nitrógeno a gas nitrógeno.",
          ],
        },
        {
          title: "Sistema Neumático de Precisión",
          tone: "blue",
          items: [
            "Regulador de dos etapas para eliminar impactos de fluctuaciones de presión.",
            "Acoplamientos de PTFE y acopladores rápidos SMC® para mantenimiento sin herramientas.",
            "Componentes neumáticos SMC® con vida útil de hasta 100,000 inyecciones.",
            "Inspección automática de fugas en la ruta del gas.",
          ],
        },
        {
          title: "Muestreador Automático y Detección",
          tone: "red",
          items: [
            "Muestreador automático de hasta 120 posiciones (D200) para gran volumen de muestras.",
            "Adición libre de muestras durante la preparación sin detener el análisis automático.",
            "Detección in situ sin contacto mediante módulos infrarrojos (D200).",
            "Detector de conductividad térmica (TCD) de alta sensibilidad y precisión.",
          ],
        },
        {
          title: "Funciones de Software Avanzadas",
          tone: "green",
          items: [
            "Comunicación inalámbrica de datos de balanza con alcance de hasta 100m.",
            "Recordatorios periódicos de mantenimiento basados en características de la muestra.",
            "Autodiagnóstico con 23 métodos de diagnóstico de fallas.",
            "Rastreo de auditoría para trazabilidad completa de operaciones (D200).",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Alimentos y materias primas",
          text: "La ficha técnica indica determinación de nitrógeno total en cereales, semillas, carne, productos cárnicos, alimentos para animales, productos lácteos y vino tinto.",
        },
        {
          label: "Ambiental y agrícola",
          text: "También se documentan aplicaciones en líquido de escape diésel, fertilizantes, suelos, caucho natural en bruto y látex natural.",
        },
      ],
    },
  },
  {
    id: "hanon-e500",
    slug: "hanon-e500",
    name: "Analizador elemental orgánico E500",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Automatización",
      "Área farmacéutica",
      "Minería",
    ],
    description:
      "Analizador elemental orgánico automático para la determinación cuantitativa de carbono, hidrógeno, nitrógeno, azufre y oxígeno en muestras sólidas y líquidas.",
    features: [
      "Análisis cuantitativo de C, H, N, S y O",
      "Muestreador automático de 120 posiciones",
      "Detectores TCD y NDIR dedicados",
    ],
    imageUrl: "/productos/hanon-e500/imagen-1.png",
    tags: [
      "hanon",
      "e500",
      "analizador elemental",
      "chons",
      "carbono",
      "hidrogeno",
      "nitrogeno",
      "azufre",
      "oxigeno",
      "tcd",
      "ndir",
      "combustion",
      "pirolisis",
    ],
    relatedProducts: ["hanon-d50-d200", "hanon-k1160", "hanon-k9860"],
    detail: {
      brand: "Hanon",
      model: "E500",
      fullTitle: "Hanon E500 Analizador Elemental Orgánico C/H/N/S/O",
      subtitle:
        "Sistema de alta precisión para análisis rápido de carbono, hidrógeno, nitrógeno, azufre y oxígeno mediante combustión o pirólisis a alta temperatura.",
      highlights: [
        "Combustión y pirólisis de alta temperatura hasta 1400 °C",
        "Separación específica por adsorción-desorción",
        "Muestreo automático continuo de 120 posiciones",
      ],
      advantages: [
        "Analiza C, H, N, S y O en muestras sólidas y líquidas dentro de una única plataforma.",
        "La sustitución de cenizas in situ elimina la limpieza manual frecuente del tubo y permite lotes continuos.",
        "El horno de fibra de aluminosilicato ofrece una zona térmica estable superior a 200 mm con desviación menor a 10 °C.",
        "Tres columnas de adsorción física separan H₂O, SO₂ y CO₂ sin el efecto de cola propio de la separación cromatográfica.",
        "El detector TCD de alto flujo incorpora control digital, filamento resistente a la oxidación y controladores MFC.",
        "El modo de oxígeno utiliza detector NDIR selectivo para CO a 4,67 μm y 4,72 μm, con baja interferencia.",
        "El software admite calibraciones lineales o no lineales, registro de auditoría y transmisión inalámbrica del peso desde la balanza.",
        "Las funciones de espera, activación programada y enfriamiento retardado reducen el consumo de gas y energía.",
      ],
      technicalParameters: [
        {
          leftParameter: "Elementos determinados",
          leftValue: "C, H, N, S y O",
          rightParameter: "Muestreador automático",
          rightValue:
            "Bandeja giratoria de 120 posiciones con crisoles cerámicos reutilizables",
        },
        {
          leftParameter: "Separación de gases",
          leftValue: "Adsorción-desorción específica",
          rightParameter: "Temperatura máxima",
          rightValue: "1400 °C",
        },
        {
          leftParameter: "Tiempo de análisis",
          leftValue: "Aprox. 3-4 min por elemento, según configuración",
          rightParameter: "Tamaño de muestra",
          rightValue: "Sólido ≤ 1,5 g · Líquido ≤ 1 mL",
        },
        {
          leftParameter: "Rango dinámico C/H/N",
          leftValue: "C 0-30 mg · H 0-4 mg · N 0-10 mg (0-100%)",
          rightParameter: "Rango dinámico S/O",
          rightValue: "S 0-5 mg · O 0-3 mg (0-100%)",
        },
        {
          leftParameter: "Repetibilidad",
          leftValue: "Desviación estándar < 0,1% con 10 mg de sulfadiazina",
          rightParameter: "Límites de detección",
          rightValue: "C/H/N/S < 30 ppm · O < 20 ppm",
        },
        {
          leftParameter: "Detectores",
          leftValue: "TCD para C/H/N/S · NDIR para O",
          rightParameter: "Gases de trabajo",
          rightValue: "Helio 99,999% · Oxígeno 99,999%",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "220 VCA ±10%, 50 Hz",
          rightParameter: "Computador e interfaces",
          rightValue: "Windows 7 o posterior · USB o RS232",
        },
        {
          leftParameter: "Ambiente de operación",
          leftValue: "15-30 °C · Humedad ≤ 85% HR",
          rightParameter: "Dimensiones y peso",
          rightValue: "735 × 560 × 1160 mm · 100 kg, incluido muestreador",
        },
      ],
      detailBlocks: [
        {
          title: "Procedimiento C/H/N/S",
          tone: "yellow",
          items: [
            "La muestra en cápsula o papel de estaño se pesa y dispone en un crisol cerámico del muestreador automático.",
            "La sonda introduce la muestra bajo purga de gas portador para impedir el ingreso de aire ambiente.",
            "La combustión a 1150 °C y la reducción catalítica convierten los NOx en N₂.",
            "H₂O, SO₂ y CO₂ se separan en tres columnas; N₂ y luego cada gas desorbido ingresan secuencialmente al TCD.",
          ],
        },
        {
          title: "Procedimiento de oxígeno",
          tone: "blue",
          items: [
            "La muestra se envuelve en cápsula de plata y se introduce en el tubo de pirólisis.",
            "A 1150 °C y en atmósfera inerte, el oxígeno reacciona con negro de humo de alta pureza para formar CO.",
            "El detector NDIR mide la absorción característica del CO y calcula el contenido original de oxígeno.",
            "La selectividad a 4,67 μm y 4,72 μm aporta bajo límite de detección y resistencia a interferencias.",
          ],
        },
        {
          title: "Instrumentación y separación",
          tone: "red",
          items: [
            "Sustitución de cenizas in situ con crisoles reutilizables para operación continua.",
            "Horno de fibra de aluminosilicato con control acoplado de temperatura y flujo de gas.",
            "Adsorción física selectiva con desorción por calentamiento programado y larga vida útil de columna.",
            "TCD de alto flujo con calibración digital, balance de filamento y aislamiento de señal.",
          ],
        },
        {
          title: "Estación de trabajo",
          tone: "green",
          items: [
            "Interfaz plana con estado del instrumento y parámetros de trabajo en tiempo real.",
            "Curvas de calibración lineales o no lineales con grado configurable.",
            "Tres niveles de permisos, usuarios ilimitados y trazabilidad completa de operaciones.",
            "Transmisión inalámbrica del peso, espera programable y enfriamiento automático seguro.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Trazabilidad documentada",
          text: "La documentación describe tres niveles de permisos y trazabilidad completa de operaciones; no aporta un certificado adjunto.",
        },
      ],
      applicationNotes: [
        {
          label: "Sectores documentados",
          text: "Industria química y farmacéutica, monitoreo ambiental, agricultura y medio ambiente, y geología, minería y petroquímica.",
        },
      ],
    },
  },
  {
    id: "milestone-ethos-up",
    slug: "milestone-ethos-up",
    name: "Sistema de digestión por microondas ETHOS UP",
    category: "Preparación de muestras",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Preparación de muestras",
      "Automatización",
      "Área farmacéutica",
      "Minería",
    ],
    description:
      "Estación de laboratorio por microondas para digestión en recipientes cerrados, extracción, evaporación, concentración y procesos de alta temperatura, con control easyTEMP y rotores de alto rendimiento.",
    features: [
      "Control directo de temperatura easyTEMP",
      "Rotores de 15, 24 o 44 posiciones",
      "Seguridad SafeVIEW y ventilación con resellado",
    ],
    imageUrl: "/productos/milestone-ethos-up/ethos-up-principal.jpg",
    tags: [
      "milestone",
      "ethos",
      "ethos up",
      "digestión por microondas",
      "preparación de muestras",
      "easytemp",
      "safeview",
      "maxi-24 hp",
      "sk-15",
      "maxi-44",
      "trazabilidad de datos",
      "icp-ms",
      "icp-oes",
      "absorción atómica",
    ],
    relatedProducts: ["hanon-e500", "hanon-d50-d200", "hanon-k1160"],
    detail: {
      brand: "Milestone",
      model: "ETHOS UP",
      fullTitle:
        "Milestone ETHOS UP Sistema Avanzado de Digestión por Microondas",
      subtitle:
        "Plataforma de preparación de muestras basada en rotores para laboratorios que requieren digestiones seguras, reproducibles y trazables antes del análisis elemental.",
      highlights: [
        "Construcción de acero inoxidable y puerta sensible a la presión",
        "Control continuo easyTEMP en todos los recipientes",
        "Plataforma adaptable a múltiples procesos de preparación",
      ],
      advantages: [
        "Integra digestión, extracción con solventes, evaporación, concentración y procesos de alta temperatura en una misma estación de laboratorio.",
        "La cámara SafeVIEW permite supervisar la cavidad en tiempo real y el bloqueo automático evita la apertura hasta alcanzar una temperatura segura.",
        "easyTEMP combina medición directa sin contacto de la muestra con monitoreo infrarrojo de todos los recipientes para mantener condiciones uniformes.",
        "Los recipientes de PTFE de alta pureza y los escudos reforzados de PEEK ofrecen compatibilidad química, bajos blancos y resistencia mecánica.",
        "La tecnología de ventilación y resellado libera de forma controlada una sobrepresión excepcional y vuelve a cerrar el recipiente para evitar pérdida de volátiles.",
        "El rotor MAXI-24 HP procesa 24 muestras y combina alto rendimiento con capacidad para matrices y volúmenes diversos.",
        "El rotor SK-15 admite 15 recipientes de PTFE-TFM de 100 mL para muestras difíciles, reactivas o de gran masa.",
        "El rotor MAXI-44 admite 44 recipientes de PTFE-TFM de 100 mL para grandes lotes de suelos, sedimentos y matrices acuosas.",
        "easyCONTROL 3 regula la potencia para seguir el perfil térmico programado y conserva la documentación completa de cada ejecución.",
        "Las terminales Easy, Up y Plus permiten ajustar pantalla, conectividad, SafeVIEW, balanza, cumplimiento y asistencia MAIA al flujo del laboratorio.",
      ],
      technicalParameters: [
        {
          leftParameter: "Tecnología principal",
          leftValue:
            "Digestión por microondas en recipientes cerrados y plataforma multipropósito",
          rightParameter: "Control térmico",
          rightValue:
            "easyTEMP directo sin contacto + monitoreo infrarrojo de todos los recipientes",
        },
        {
          leftParameter: "Construcción y seguridad",
          leftValue:
            "Cavidad de acero inoxidable, puerta sensible a la presión y escape de vapores ácidos",
          rightParameter: "Supervisión de cavidad",
          rightValue: "SafeVIEW en configuraciones Up y Plus",
        },
        {
          leftParameter: "MAXI-24 HP",
          leftValue:
            "24 posiciones · rotor de alto rendimiento y mayor capacidad",
          rightParameter: "SK-15",
          rightValue:
            "15 recipientes de PTFE-TFM de 100 mL · alta presión y temperatura",
        },
        {
          leftParameter: "MAXI-44",
          leftValue:
            "44 recipientes de PTFE-TFM de 100 mL · grandes lotes de muestras",
          rightParameter: "Tecnología de recipientes",
          rightValue:
            "PTFE de alta pureza, escudos PEEK y ventilación con resellado",
        },
        {
          leftParameter: "Software",
          leftValue:
            "easyCONTROL 3 con biblioteca de métodos, control en tiempo real y trazabilidad",
          rightParameter: "Configuraciones",
          rightValue: 'Terminal Easy 5" · Up 6,5" · Plus 10,1"',
        },
        {
          leftParameter: "Integridad de datos",
          leftValue:
            "Trazabilidad completa de datos en las tres terminales",
          rightParameter: "Conectividad",
          rightValue:
            "USB y Milestone Connect; conexión a balanza en Up y Plus",
        },
        {
          leftParameter: "Cualificación disponible",
          leftValue: "Paquete Milestone de calificación de equipo",
          rightParameter: "Asistencia inteligente",
          rightValue: "MAIA en terminal Plus y mediante Milestone Connect",
        },
      ],
      detailBlocks: [
        {
          title: "Seguridad diseñada en cada detalle",
          tone: "red",
          items: [
            "Puerta de acero inoxidable montada sobre resortes para contener una liberación excepcional de presión.",
            "Bloqueo automático hasta alcanzar la temperatura segura definida por el usuario.",
            "SafeVIEW para observación continua de la cavidad durante el proceso.",
            "Sistema de escape que conduce los vapores ácidos hacia la ventilación del laboratorio.",
          ],
        },
        {
          title: "Control easyTEMP",
          tone: "blue",
          items: [
            "Medición directa sin contacto de la temperatura real de la muestra o solución.",
            "Monitoreo infrarrojo simultáneo de todos los recipientes.",
            "Seguimiento continuo del perfil térmico para digestiones uniformes.",
            "Menor necesidad de reprocesamiento gracias a resultados reproducibles.",
          ],
        },
        {
          title: "Rotores de digestión",
          tone: "yellow",
          items: [
            "MAXI-24 HP para rendimiento rutinario con matrices y volúmenes diversos.",
            "SK-15 para aplicaciones de alta presión, alta temperatura y muestras resistentes.",
            "MAXI-44 para máxima productividad en grandes lotes.",
            "Recipientes de montaje y manipulación orientados a reducir el tiempo del operador.",
          ],
        },
        {
          title: "Control, datos y conectividad",
          tone: "green",
          items: [
            "easyCONTROL 3 ajusta continuamente la potencia al perfil de temperatura programado.",
            "Visualización en tiempo real de tiempo, potencia y temperatura.",
            "Registro completo de cada ejecución para documentación y trazabilidad.",
            "Milestone Connect reúne monitoreo remoto, documentación, tutoriales y soporte de aplicaciones.",
          ],
        },
      ],
    },
  },
  {
    id: "restek-columnas-capilares-silice-fundida",
    // Slug con "/" a propósito: la ficha vive en la ruta estática anidada
    // /productos/restek/columnas-capilares-silice-fundida (página de familia,
    // no plantilla de detalle), por lo que se excluye de generateStaticParams
    // de /productos/[slug].
    slug: "restek/columnas-capilares-silice-fundida",
    name: "Columnas capilares de sílice fundida Restek",
    category: "Cromatografía",
    filters: ["Marcas", "Cromatografía"],
    description:
      "Familias de columnas capilares para cromatografía de gases: línea Rtx de rendimiento general, línea Rxi de extrema inercia para GC-MS y fases especializadas para plaguicidas, dioxinas y aminas. Cotización asesorada por fase, diámetro y longitud.",
    features: [
      "Línea Rtx de rendimiento general y línea Rxi de extrema inercia",
      "Fases especializadas para plaguicidas, dioxinas y aminas",
      "Asesoría técnica para definir fase y dimensión exacta del método",
    ],
    imageUrl: "/productos/restek/columna-capilar-silice-fundida.webp",
    detail: {
      brand: "Restek",
      model: "Columnas capilares GC",
      fullTitle:
        "Columnas capilares de sílice fundida Restek para cromatografía de gases",
      subtitle:
        "Familias Rtx, Rxi y fases de aplicación especializada con flujo de cotización asesorada",
      highlights: [],
      advantages: [],
      technicalParameters: [],
      detailBlocks: [],
    },
    tags: [
      "Restek",
      "GC",
      "columnas capilares",
      "cromatografía de gases",
      "sílice fundida",
    ],
  },
  {
    id: "restek-analytical-lc-columns",
    // Página de familia estática anidada; se excluye de /productos/[slug].
    slug: "restek/analytical-lc-columns",
    name: "Analytical LC Columns Restek",
    category: "Cromatografía",
    filters: ["Marcas", "Cromatografía"],
    description:
      "Columnas analíticas Restek para HPLC y UHPLC en familias Raptor, Force, Roc, Ultra, Pinnacle DB y otras fases especializadas. Cotización asesorada por fase, diámetro interno, longitud y tamaño de partícula.",
    features: [
      "Fases C18, Biphenyl, C8, PFP Propyl, FluoroPhenyl, HILIC y otras selectividades",
      "Configuraciones para HPLC, UHPLC y métodos LC-MS/MS",
      "Asesoría técnica para definir familia, dimensiones y tamaño de partícula",
    ],
    imageUrl: "/productos/restek/analytical-lc-columns.png",
    detail: {
      brand: "Restek",
      model: "Analytical LC Columns",
      fullTitle: "Analytical LC Columns Restek para HPLC y UHPLC",
      subtitle:
        "Familias y fases analíticas con flujo de cotización por configuración o asesoría de selección",
      highlights: [],
      advantages: [],
      technicalParameters: [],
      detailBlocks: [],
    },
    tags: [
      "Restek",
      "LC",
      "HPLC",
      "UHPLC",
      "columnas analíticas",
      "cromatografía líquida",
    ],
  },
  {
    id: "restek-viales-con-filtro",
    // Página de familia estática anidada; se excluye de /productos/[slug].
    slug: "restek/viales-con-filtro",
    name: "Viales con filtro Restek",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Cromatografía"],
    description:
      "Viales con filtro Thomson SINGLE StEP para integrar filtración y vial de autosampler en una sola preparación. Cotización asesorada por formato, membrana, porosidad y tipo de tapa.",
    features: [
      "Formatos Standard, nano, eXtreme y baja evaporación",
      "Membranas de PTFE, PVDF, PES y nylon",
      "Porosidades de 0,2 µm y 0,45 µm con asesoría de compatibilidad",
    ],
    imageUrl: "/productos/restek/viales-con-filtro.png",
    detail: {
      brand: "Restek",
      model: "Viales con filtro",
      fullTitle: "Viales con filtro Restek para preparación de muestras LC",
      subtitle:
        "Familias Thomson SINGLE StEP con cotización por configuración o asesoría de selección",
      highlights: [],
      advantages: [],
      technicalParameters: [],
      detailBlocks: [],
    },
    tags: [
      "Restek",
      "viales con filtro",
      "filtración",
      "HPLC",
      "UHPLC",
      "preparación de muestras",
    ],
  },
  {
    id: "restek-columnas-proteccion",
    // Página de familia estática anidada; se excluye de /productos/[slug].
    slug: "restek/columnas-proteccion",
    name: "Columnas de protección HPLC Restek",
    category: "Cromatografía",
    filters: ["Marcas", "Cromatografía"],
    description:
      "Cartuchos y portacartuchos de protección Restek para HPLC y UHPLC. Sistemas EXP, Roc y Trident compatibles con columnas Raptor, Force, Roc, Ultra, Pinnacle y Allure. Cotización asesorada por columna analítica o compatibilidad de sistema.",
    features: [
      "Sistemas EXP, Roc y Trident compatibles con familias Raptor, Force, Roc, Ultra, Pinnacle y Allure",
      "Protege la columna analítica de impurezas fuertemente retenidas y particulado",
      "Asesoría técnica para confirmar compatibilidad y recubrimiento inerte",
    ],
    imageUrl: "/productos/restek/columnas-proteccion-v2.png",
    detail: {
      brand: "Restek",
      model: "Columnas de protección HPLC",
      fullTitle: "Columnas de protección HPLC Restek para HPLC y UHPLC",
      subtitle:
        "Sistemas EXP, Roc y Trident con flujo de cotización por configuración o asesoría de compatibilidad",
      highlights: [],
      advantages: [],
      technicalParameters: [],
      detailBlocks: [],
    },
    tags: [
      "Restek",
      "LC",
      "HPLC",
      "UHPLC",
      "columnas de protección",
      "cartuchos de guarda",
      "cromatografía líquida",
    ],
  },
  {
    id: "infitek-cod-analyzer",
    slug: "infitek-cod-analyzer",
    name: "Analizador de DQO COD-100B",
    category: "Análisis de agua",
    filters: ["Marcas", "Análisis de agua"],
    description:
      "Analizador de DQO COD-100B para cuantificar la demanda química de oxígeno, un índice de contaminación del agua asociado al consumo de oxidante químico por sustancias reductoras.",
    features: [
      "Análisis de DQO mediante método fotométrico de referencia",
      "Pantalla LCD para fácil visualización",
      "2 fuentes de luz LED para diferentes rangos de pruebas de DQO",
      "Calibración de 2 puntos",
      "Capacidad de datos de hasta 200 conjuntos con trazabilidad completa",
      "Los datos almacenados se pueden transferir a la computadora mediante USB",
    ],
    imageUrl: "/productos/infitek/cod-analyzer/imagen-1.png",
    detail: {
      brand: "Infitek",
      model: "COD-100B",
      fullTitle: "Infitek COD-100B Analizador de Demanda Química de Oxígeno (DQO)",
      subtitle:
        "Sistema de sobremesa para evaluación integral del grado de contaminación del agua",
      highlights: [
        "Análisis de DQO mediante método fotométrico de referencia, según la ficha técnica.",
        "Dos fuentes LED para los rangos de 0 a 150 mg/L y de 0 a 1500 mg/L.",
        "Pantalla LCD, calibración de dos puntos y transferencia de datos por USB.",
      ],
      advantages: [
        "Almacena hasta 200 conjuntos de datos con trazabilidad completa.",
        "Incluye cuatro cubetas 721 y cable USB de comunicación, según la ficha técnica.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición",
          leftValue: "(0~150)mg/L, (0~1500)mg/L",
          rightParameter: "Exactitud",
          rightValue: "±8%",
        },
        {
          leftParameter: "Repetibilidad",
          leftValue: "3%",
          rightParameter: "Fluctuación",
          rightValue: "6 mg/L (20 min)",
        },
        {
          leftParameter: "Comunicación",
          leftValue: "USB",
          rightParameter: "Alimentación",
          rightValue: "Adaptador AC, entrada 200–240 V",
        },
        {
          leftParameter: "Dimensiones (An. × Pr. × Al.)",
          leftValue: "315 × 225 × 100 mm",
          rightParameter: "Peso",
          rightValue: "2 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Especificaciones principales",
          tone: "blue",
          items: [
            "La DQO expresa el oxígeno consumido cuando oxidantes químicos, como el dicromato de potasio, oxidan sustancias reductoras presentes en el agua.",
            "Rangos de medición: 0–150 mg/L y 0–1500 mg/L; exactitud ±8 % y repetibilidad 3 %.",
            "Dos fuentes LED y calibración de dos puntos.",
            "Almacena hasta 200 conjuntos de datos con trazabilidad completa y los transfiere por USB.",
          ],
        },
        {
          title: "Cumplimiento normativo",
          tone: "green",
          items: [
            "Consulte con nuestro equipo técnico sobre el cumplimiento normativo aplicable a su proceso.",
            "El almacenamiento de hasta 200 conjuntos conserva trazabilidad completa; no se adjunta una certificación adicional.",
          ],
        },
        {
          title: "Soporte y Aplicaciones",
          tone: "yellow",
          items: [
            "Evaluación del grado de contaminación del agua mediante demanda química de oxígeno.",
            "Nuestro equipo técnico especializado ofrece instalación y capacitación operativa.",
            "Mantención preventiva y correctiva para asegurar la disponibilidad del equipo Infitek.",
          ],
        },
      ],
    },
    tags: [
      "Infitek",
      "DQO",
      "COD",
      "Análisis de agua",
      "Calidad de agua",
      "Fotometría",
    ],
  },
  {
    id: "infitek-bep-m300f",
    slug: "infitek-bep-m300f",
    name: "Multiparamétrico BEP-M300F",
    category: "Análisis de agua",
    filters: ["Marcas", "Análisis de agua"],
    description:
      "Analizador multiparamétrico de sobremesa para pH, Conductividad, ISE y Oxígeno Disuelto, con pantalla LCD de alta resolución e IP54.",
    features: [
      "Pantalla LCD de alta resolución, 5,7 pulgadas.",
      "Almacenamiento de datos de 500 conjuntos con trazabilidad completa.",
      "Soporte para comunicación USB y RS-232.",
      "Clasificación IP54 resistente al agua.",
      "Múltiples parámetros: pH, CE, ISE, OD, Temp.",
    ],
    imageUrl: "/productos/infitek/bep-m300f/imagen-1.png",
    detail: {
      brand: "Infitek",
      model: "BEP-M300F",
      fullTitle: "Infitek BEP-M300F Analizador Multiparamétrico de Sobremesa",
      subtitle:
        "Medición integral y precisa de calidad del agua para laboratorios de investigación y control ambiental.",
      highlights: [
        "Soporte para múltiples modos de lectura (automática, cronometrada, continua).",
        "Calibración avanzada de 1 a 5 puntos (pH, ISE).",
        "Reconocimiento estándar de tampones NIST, DIN, GB.",
      ],
      advantages: [
        "Mide pH, mV/ORP, pX, ISE, conductividad, resistividad, TDS, salinidad, oxígeno disuelto, saturación de OD y temperatura.",
        "La ficha documenta IP54, retención automática de punto final y almacenamiento de 500 resultados por parámetro.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango pH",
          leftValue: "-2,00 a 20,00 pH",
          rightParameter: "Rango Conductividad",
          rightValue: "0,000 μS/cm a 1000 mS/cm",
        },
        {
          leftParameter: "Rango Oxígeno Disuelto",
          leftValue: "0,00 a 20,00 ppm",
          rightParameter: "Almacenamiento de datos",
          rightValue: "500 resultados",
        },
        {
          leftParameter: "Conectividad",
          leftValue: "USB / RS-232",
          rightParameter: "Clasificación IP",
          rightValue: "IP54",
        },
        {
          leftParameter: "Rango ISE",
          leftValue: "1E-9 a 9,999E9",
          rightParameter: "Rango de resistividad",
          rightValue: "5,00 Ω·cm a 20,00 MΩ·cm",
        },
        {
          leftParameter: "Dimensiones (An. × Pr. × Al.)",
          leftValue: "242 × 195 × 68 mm",
          rightParameter: "Peso",
          rightValue: "900 g",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "Adaptador AC 100–240 V; salida DC 9 V",
          rightParameter: "Electrodos incluidos",
          rightValue: "pH 3 en 1, conductividad y OD polarográfico",
        },
      ],
      detailBlocks: [
        {
          title: "Parámetros y Calibración",
          tone: "blue",
          items: [
            "pH: Rango -2.00 a 20.00 pH. Calibración de 1 a 5 puntos con reconocimiento NIST, DIN y GB.",
            "Ion (ISE): Modos de lectura directa y adición estándar. Soporta F-, Cl-, NO3-, NH4+, Ca2+, etc.",
            "Conductividad: Compensación lineal y agua pura con calibración de 1 a 3 puntos.",
            "Oxígeno Disuelto (DO): Calibración con agua saturada de aire o cero oxígeno con compensación barométrica.",
          ],
        },
        {
          title: "Hardware y Almacenamiento",
          tone: "yellow",
          items: [
            "Pantalla LCD de alta resolución de 5,7 pulgadas.",
            "Función de lectura múltiple y retención automática que bloquea el punto final.",
            "Almacenamiento de 500 conjuntos de datos con reportes trazables.",
            "Clasificación IP54 a prueba de agua y polvo, ideal para mesón.",
          ],
        },
        {
          title: "Soporte e Instalación",
          tone: "green",
          items: [
            "Aplicaciones documentadas: control de enfermedades de la salud, protección ambiental, agricultura biológica y silvicultura, calidad de agua, investigación y educación superior.",
            "Soporte de Del Carpio en la puesta en marcha, capacitación y mantenimiento.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Calidad de agua y medición electroquímica",
          text: "El fabricante documenta su uso en análisis de calidad de agua y en mediciones de pH, conductividad, ISE, oxígeno disuelto y temperatura.",
        },
        {
          label: "Investigación y control",
          text: "La documentación incluye control de enfermedades de la salud, protección ambiental, agricultura biológica y silvicultura, investigación científica e instituciones de educación superior.",
        },
      ],
    },
    tags: [
      "Infitek",
      "Multiparamétrico",
      "pH",
      "Conductividad",
      "ISE",
      "Oxígeno Disuelto",
      "Análisis de agua",
    ],
  },
  {
    id: "infitek-mca-series",
    slug: "infitek-mca-series",
    name: "Humedad MCA110",
    description:
      "Analizador de humedad con lámpara halógena y sensor HBM. Permite ajustes precisos de temperatura y tiempo, determinando eficientemente el contenido de humedad y residuo seco de las muestras.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/mca-series/imagen-1.png",
    features: [
      "Calentamiento uniforme halógeno",
      "Sensor de pesaje HBM integrado",
      "Resultados en tiempo real",
    ],
    detail: {
      brand: "Infitek",
      model: "Serie MCA110",
      fullTitle: "Infitek MCA110 Analizador de Humedad Halógeno",
      subtitle:
        "Secado rápido y exactitud de pesaje superior con lámpara halógena y sensor HBM.",
      highlights: [
        "Lámpara halógena para calentamiento uniforme y rápido.",
        "Múltiples opciones de legibilidad: 0.001 g hasta 0.01 g según el modelo.",
        "Pantalla LCD retroiluminada de alta definición.",
        "Capacidad de almacenamiento histórico de 15 resultados.",
      ],
      advantages: [
        "Ajuste preciso de temperatura (40°C a 199°C) y tiempo de desecación.",
        "Carcasa de aluminio robusta y cámara de secado en acero inoxidable.",
        "Lectura directa del porcentaje de contenido de humedad o residuo seco.",
      ],
      technicalParameters: [
        {
          leftParameter: "Capacidad",
          leftValue: "110 g",
          rightParameter: "Legibilidad",
          rightValue: "0,01 g a 0,001 g (según modelo)",
        },
        {
          leftParameter: "Fuente de calor",
          leftValue: "Lámpara halógena",
          rightParameter: "Rango de temperatura",
          rightValue: "40°C - 199°C",
        },
        {
          leftParameter: "Rango de humedad",
          leftValue: "0.00% - 100.00%",
          rightParameter: "Legibilidad de humedad",
          rightValue: "0,20% a 0,01% (según modelo)",
        },
        {
          leftParameter: "Pantalla",
          leftValue: "LCD retroiluminada",
          rightParameter: "Calibración",
          rightValue: "Externa",
        },
        {
          leftParameter: "Interfaz",
          leftValue: "RS232 (Estándar) / USB (Opcional)",
          rightParameter: "Tamaño del plato",
          rightValue: "Ø90mm",
        },
        {
          leftParameter: "Tiempo de secado",
          leftValue: "1–99 min, en pasos de 10 s",
          rightParameter: "Almacenamiento histórico",
          rightValue: "15 conjuntos",
        },
        {
          leftParameter: "Dimensiones (An. × Pr. × Al.)",
          leftValue: "280 × 250 × 180 mm",
          rightParameter: "Peso neto",
          rightValue: "5,8 kg",
        },
        {
          leftParameter: "Alimentación del calentador",
          leftValue: "220 V ±15 % 50 Hz / 110 V ±15 % 60 Hz, 400 W",
          rightParameter: "Temperatura de operación",
          rightValue: "5–35 °C",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Variantes MCA110",
          items: [
            "MCA110-10: legibilidad de masa 0,01 g y de humedad o residuo seco 0,20 %.",
            "MCA110-5: legibilidad de masa 0,005 g y de humedad o residuo seco 0,10 %.",
            "MCA110-2: legibilidad de masa 0,002 g y de humedad o residuo seco 0,04 %.",
            "MCA110-1A: legibilidad de masa 0,001 g y de humedad o residuo seco 0,01 %.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Humedad y residuo seco",
          text: "La documentación describe lectura del porcentaje de contenido de humedad o de residuo seco tras calentamiento halógeno de la muestra.",
        },
      ],
    },
    tags: ["Infitek", "Humedad", "Halógeno", "Equipamiento", "Secado"],
  },
  {
    id: "infitek-ph-b100bd",
    slug: "infitek-ph-b100bd",
    name: "Medidor pH PH-B100BD",
    description:
      "Medidor de pH de mesa con reconocimiento automático de soluciones tampón estándar y pantalla LCD de 6.0 pulgadas. Incluye electrodo compuesto E-201.",
    category: "Análisis de agua",
    imageUrl: "/productos/infitek/ph-b100bd/imagen-1.png",
    features: [
      "Reconocimiento NIST",
      "Diseño IP54 robusto",
      "Pantalla LCD 6.0 pulgadas",
    ],
    detail: {
      brand: "Infitek",
      model: "PH-B100BD",
      fullTitle: "Medidor de pH de Mesa PH-B100BD (Paquetes 1 y 2)",
      subtitle:
        "Medición rápida y confiable de pH y milivoltios (mV) con calibración automática.",
      highlights: [
        "Pantalla LCD clara de 6.0 pulgadas.",
        "Calibración de 1 a 2 puntos (automática o manual).",
        "Reconocimiento automático de tampones NIST (pH 4.01, 7.00, 10.01).",
        "Compensación de temperatura manual (MTC) para resultados precisos.",
      ],
      advantages: [
        "Función de reinicio rápido a la configuración predeterminada de fábrica.",
        "Modo de lectura continuo con opciones de apagado automático programable.",
        "Diseño robusto IP54, incluye soporte y electrodo E-201.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango pH",
          leftValue: "0,00 ~ 14,00 pH",
          rightParameter: "Resolución pH",
          rightValue: "0,01 pH",
        },
        {
          leftParameter: "Precisión pH",
          leftValue: "±0,05 pH",
          rightParameter: "Puntos de calibración",
          rightValue: "Hasta 2",
        },
        {
          leftParameter: "Rango mV",
          leftValue: "-1400 a 1400 mV",
          rightParameter: "Precisión mV",
          rightValue: "±0,1 % FS",
        },
        {
          leftParameter: "Pantalla",
          leftValue: "LCD (6.0 pulgadas)",
          rightParameter: "Entrada electrodo",
          rightValue: "BNC (Q9)",
        },
      ],
      detailBlocks: [],
    },
    tags: ["Infitek", "pH", "Medidor de mesa", "Análisis de agua", "Electrodo"],
  },
  {
    id: "infitek-usc-m-series",
    slug: "infitek-usc-m-series",
    name: "Ultrasónico USC-M",
    description:
      "Baño ultrasónico de bajo ruido con potencia ajustable, función de desgasificación y barrido de frecuencia. Tanque de acero inoxidable.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/usc-m-series/imagen-1.png",
    features: [
      "Potencia ajustable 10-100%",
      "Calefacción hasta 60°C",
      "Bajo ruido",
    ],
    detail: {
      brand: "Infitek",
      model: "Serie USC-M",
      fullTitle: "Limpiador Ultrasónico de Precisión Serie USC-M",
      subtitle:
        "Limpieza profunda con desgasificación y barrido de frecuencia en tanques de hasta 45 litros.",
      highlights: [
        "Potencia ultrasónica ajustable entre 10% y 100%.",
        "Función de desgasificación (degas) y barrido de frecuencia (sweep).",
        "Control de temperatura de hasta 60°C (opcional 80°C).",
        "Modo de ahorro de energía (sleeping mode).",
      ],
      advantages: [
        "Aislamiento acústico integrado para una operación ultra silenciosa.",
        "Pantalla LCD para control de tiempo, temperatura y potencia.",
        "Canastillo, cuerpo, tanque y tapa en acero inoxidable; los modelos USC0340M a USC4540M incorporan asa y válvula de drenaje.",
      ],
      technicalParameters: [
        {
          leftParameter: "Frecuencia Ultrasónica",
          leftValue: "40 KHz",
          rightParameter: "Tiempo ajustable",
          rightValue: "1-99 minutos",
        },
        {
          leftParameter: "Potencia Ultrasónica",
          leftValue: "70W a 720W (según modelo)",
          rightParameter: "Potencia Calefacción",
          rightValue: "100W a 1000W",
        },
        {
          leftParameter: "Temperatura máxima",
          leftValue: "60°C (Opcional 80°C)",
          rightParameter: "Válvula de drenaje",
          rightValue: "Modelos ≥ 10L",
        },
        {
          leftParameter: "Capacidades disponibles",
          leftValue: "1.3L hasta 45L",
          rightParameter: "Material del tanque",
          rightValue: "Acero inoxidable",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Modelos y capacidad",
          items: [
            "USC0140M y USC0240M: 1,3 L y 2 L; 70 W ultrasónicos, 100 W de calentamiento y un transductor.",
            "USC0340M, USC0540M, USC0440M y USC0640M: 3,2 L, 4,8 L, 4,5 L y 6,5 L; 120–180 W ultrasónicos y 2–3 transductores.",
            "USC1040M, USC1540M, USC2040M y USC2240M: 10 L, 15 L, 20 L y 22 L; 240–480 W ultrasónicos y 4–8 transductores.",
            "USC3040M y USC4540M: 30 L y 45 L; 600 W y 720 W ultrasónicos, respectivamente.",
          ],
        },
      ],
    },
    tags: ["Infitek", "Ultrasónico", "Limpiador", "Equipamiento menor", "Baño"],
  },
  {
    id: "infitek-don-h-series",
    slug: "infitek-don-h-series",
    name: "Horno DON-H",
    description:
      "Horno de secado de convección natural horizontal con controlador PID, sensor PT100 y protección contra sobretemperatura.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/don-h-series/imagen-1.png",
    features: [
      "Convección natural horizontal",
      "Controlador PID de precisión",
      "Rango RT+10 a 250°C",
    ],
    detail: {
      brand: "Infitek",
      model: "Serie DON-H",
      fullTitle: "Horno de Secado de Convección Natural Serie DON-H/DON-HE",
      subtitle:
        "Secado homogéneo y seguro con controlador PID, alta utilización de espacio e interior de acero.",
      highlights: [
        "Rango de temperatura desde ambiente +10°C hasta 250°C.",
        "Controlador PID preciso y sensor de temperatura PT100.",
        "Diseño de convección natural tipo horizontal.",
        "Alarmas audibles y visuales de sobretemperatura.",
      ],
      advantages: [
        "Manilla antiquemaduras para máxima seguridad operacional.",
        "Alta uniformidad de temperatura (±3.5%).",
        "Modelos estándar en acero inoxidable y modelos E en chapa galvanizada.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de Temperatura",
          leftValue: "RT+10 ~ 250°C",
          rightParameter: "Modo de Circulación",
          rightValue: "Convección natural",
        },
        {
          leftParameter: "Fluctuación",
          leftValue: "±1°C",
          rightParameter: "Uniformidad",
          rightValue: "±3.5%",
        },
        {
          leftParameter: "Controlador y Sensor",
          leftValue: "PID con PT100",
          rightParameter: "Temporizador",
          rightValue: "0~9999 min",
        },
        {
          leftParameter: "Capacidades",
          leftValue: "43 L, 71 L, 136 L, 225 L",
          rightParameter: "Material Interno",
          rightValue: "Acero Inoxidable / Galvanizado",
        },
        {
          leftParameter: "Estantes estándar / máximos",
          leftValue: "2 / 9, 13, 17 o 25 según modelo",
          rightParameter: "Orificio de prueba",
          rightValue: "Superior Ø35 mm, estándar",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "AC 220/110 V, 50/60 Hz",
          rightParameter: "Consumo",
          rightValue: "1200–3000 W según modelo",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Variantes DON-H/DON-HE",
          items: [
            "DON-H45E / DON-H45: 43 L; cámara 350 × 350 × 350 mm; exterior 652 × 472 × 587 mm; 1200 W.",
            "DON-H70E / DON-H70: 71 L; cámara 450 × 350 × 450 mm; exterior 752 × 472 × 687 mm; 1600 W.",
            "DON-H140E / DON-H140: 136 L; cámara 550 × 450 × 550 mm; exterior 852 × 572 × 786 mm; 2300 W.",
            "DON-H230E / DON-H230: 225 L; cámara 600 × 500 × 750 mm; exterior 902 × 622 × 986 mm; 3000 W.",
            "Sin sufijo E: cámara de acero inoxidable. Con sufijo E: cámara de plancha galvanizada de alta resistencia.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Secado y tratamiento térmico",
          text: "La ficha técnica indica secado, horneado, encerado y esterilización en empresas industriales y mineras, laboratorios e instituciones de investigación científica.",
        },
      ],
    },
    tags: [
      "Infitek",
      "Horno",
      "Secado",
      "Estufa",
      "Convección natural",
      "Equipamiento menor",
    ],
  },
  {
    id: "infitek-lyo60b-series",
    slug: "infitek-lyo60b-series",
    name: "Liofilizador LYO60B",
    description:
      "Liofilizador que emplea temperaturas extremadamente frías (-60°C) y vacío para eliminar la humedad, ideal para vacunas, bacterias, medicamentos y alimentos.",
    category: "Preparación de muestras",
    imageUrl: "/productos/infitek/lyo60b-series/imagen-1.png",
    features: [
      'Pantalla táctil a color 7"',
      "Condensador sin bobinas -60°C",
      "Alta eficiencia de enfriamiento",
    ],
    detail: {
      brand: "Infitek",
      model: "Serie LYO60B",
      fullTitle: "Liofilizador de Laboratorio de -60°C Serie LYO60B",
      subtitle:
        "Sistema de liofilización en cascada con condensador de acero inoxidable, bomba de vacío y control inteligente.",
      highlights: [
        "Panel táctil a color de 7 pulgadas con visualización de temperatura y vacío en tiempo real.",
        "Condensador de gran volumen en acero inoxidable sin bobinas, permitiendo pre-congelación independiente de muestras.",
        "Compresor de alto rendimiento y sistema en cascada para enfriamiento rápido.",
      ],
      advantages: [
        "Cámara de secado transparente de diseño visual y altamente seguro.",
        "Diseño compacto de mesa, ahorrando valioso espacio de laboratorio.",
        "Interfaz USB incorporada para exportar y gestionar datos de análisis.",
      ],
      technicalParameters: [
        {
          leftParameter: "Área de Liofilización",
          leftValue: "0.12 m² / 0.09 m²",
          rightParameter: "Temperatura del Condensador",
          rightValue: "-60 °C",
        },
        {
          leftParameter: "Capacidad del Condensador",
          leftValue: "6.5 L",
          rightParameter: "Capacidad de Condensación de Hielo",
          rightValue: "3 kg / 24h",
        },
        {
          leftParameter: "Grado de Vacío",
          leftValue: "≤5 Pa (sin carga)",
          rightParameter: "Capacidad de Carga de Muestra",
          rightValue: "300 mL por estante",
        },
        {
          leftParameter: "Consumo Eléctrico",
          leftValue: "0.85 kW (AC220V, 50Hz)",
          rightParameter: "Refrigerante",
          rightValue: "Libre de CFC",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Configuraciones de cámara",
          items: [
            "LYO60B-1S: cámara estándar, 0,12 m², 4 bandejas (6 opcionales) y 1200 mL de carga total por bandejas.",
            "LYO60B-1P: cámara estándar con colectores de 8 puertos, 0,12 m², 4 bandejas (6 opcionales) y 1200 mL de carga total.",
            "LYO60B-1T: cámara de taponado, 0,09 m², 3 bandejas y 900 mL de carga total.",
            "LYO60B-1PT: cámara de taponado con colectores de 8 puertos, 0,09 m², 3 bandejas y 900 mL de carga total.",
            "Accesorios estándar: bomba de vacío de 2 L/s y 8 m³/h, bandejas, soportes, cubierta PC, válvula de llenado de nitrógeno y filtro de niebla de aceite.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Muestras sensibles al calor",
          text: "La documentación señala pruebas de liofilización de muestras biomédicas de laboratorio y aplicaciones en fármacos, productos biológicos, química y alimentos; menciona antibióticos, vacunas, productos sanguíneos, hormonas y enzimas de tejido biológico.",
        },
      ],
      descriptionImage: {
        src: "/productos/infitek/lyo60b-series/infografia.png",
        alt: "Configuraciones de cámara y colectores del liofilizador Infitek LYO60B",
        caption: "Configuraciones de cámara, colectores de ocho puertos, válvula de aislamiento y botella de liofilización proporcionadas para la serie LYO60B.",
      },
    },
    tags: [
      "Infitek",
      "Liofilizador",
      "Secado por congelación",
      "Vacío",
      "Preparación de muestras",
      "Laboratorio",
    ],
  },
  {
    id: "infitek-fmh-series",
    slug: "infitek-fmh-series",
    name: "Campana sin ductos FMH",
    description:
      "Campana extractora sin ductos FMH para contener vapores químicos mediante filtración configurada según la química de trabajo, con detección de VOC y control táctil.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/fmh-series/imagen-1.png",
    features: [
      "No requiere ductos externos",
      "Filtros configurables según la química de trabajo",
      "Detector VOC con alarma",
    ],
    detail: {
      brand: "Infitek",
      model: "Serie FMH",
      fullTitle: "Infitek FMH Campana Extractora sin Ductos",
      subtitle:
        "Extracción y purificación eficiente de vapores químicos en laboratorios, sin infraestructura de ventilación compleja.",
      highlights: [
        "El ventilador de turbina dirige los vapores químicos al sistema de filtración; la ficha indica operación silenciosa, sin estática ni chispas.",
        "Puerto de detector de VOC con alarma, además de alarmas de temperatura y humedad.",
        "Pantalla táctil LCD de 7 pulgadas para ajustar ventilación e iluminación.",
      ],
      advantages: [
        "Superficie de trabajo de resina epoxi con resistencia química, al impacto y a altas temperaturas.",
        "Estructura de acero galvanizado de al menos 1,2 mm con recubrimiento químicamente resistente y libre de plomo.",
        "Filtros seleccionables: orgánico (OG), inorgánico (AG), formaldehído (FO), amoníaco (AM) o HEPA (H14).",
      ],
      technicalParameters: [
        {
          leftParameter: "Velocidad de Flujo (Face velocity)",
          leftValue: "0.4 - 0.6 m/s",
          rightParameter: "Volumen de Nivel de Ruido",
          rightValue: "40 - 52 dBA",
        },
        {
          leftParameter: "Pantalla y Control",
          leftValue: "Pantalla táctil LCD de 7 pulgadas",
          rightParameter: "Sistema de filtración",
          rightValue: "2 filtros configurables + 1 prefiltro",
        },
        {
          leftParameter: "Ventilación (Ventanas)",
          leftValue: "Cristal acrílico anticorrosivo (>5mm)",
          rightParameter: "Sistema de Iluminación",
          rightValue: "Lámpara LED segura (sin emisión térmica)",
        },
        {
          leftParameter: "Sistemas de Alarma",
          leftValue: "VOC, temperatura y humedad",
          rightParameter: "Capacidad de Aire (m³/h)",
          rightValue: "Desde 230 hasta 690 según modelo",
        },
        {
          leftParameter: "Modelos",
          leftValue: "FMH-800, 1000, 1300, 1600 y 1600A",
          rightParameter: "Potencia",
          rightValue: "42 W (800/1000) o 126 W (1300/1600/1600A)",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "110–240 V, 50–60 Hz",
          rightParameter: "Superficie de trabajo",
          rightValue: "Resina epoxi",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Configuraciones FMH",
          items: [
            "FMH-800: exterior 800 × 620 × 1245 mm; interior 781 × 574 × 934 mm; capacidad de aire 230 m³/h.",
            "FMH-1000: exterior 1000 × 620 × 1245 mm; interior 981 × 574 × 934 mm; capacidad de aire 230 m³/h.",
            "FMH-1300: exterior 1275 × 620 × 1245 mm; interior 1256 × 574 × 934 mm; capacidad de aire 690 m³/h y tres ventiladores.",
            "FMH-1600: exterior 1600 × 620 × 1245 mm; interior 1581 × 574 × 934 mm; capacidad de aire 690 m³/h y tres ventiladores.",
            "FMH-1600A: exterior 1600 × 790 × 1245 mm; interior 1581 × 744 × 934 mm; capacidad de aire 690 m³/h y tres ventiladores.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Vapores químicos",
          text: "El principio documentado es conducir el aire con vapores peligrosos mediante una turbina hacia un filtro molecular seleccionado de acuerdo con los químicos utilizados.",
        },
      ],
      descriptionImage: {
        src: "/productos/infitek/fmh-series/infografia.jpg",
        alt: "Recorrido de aire y filtro en la campana sin ductos Infitek FMH",
        caption: "Esquema proporcionado del flujo de aire desde la zona de trabajo, a través de la filtración, hacia la salida de la campana FMH.",
      },
    },
    tags: [
      "Infitek",
      "Campana extractora",
      "Sin ductos",
      "Fume Hood",
      "Extracción de gases",
      "Equipamiento menor",
    ],
  },
  {
    id: "infitek-fmh-pa-series",
    slug: "infitek-fmh-pa-series",
    name: "Campana de PP FMH-P",
    description:
      "Campana de extracción de polipropileno para experimentos de alta intensidad con ácidos y álcalis, y para salas limpias con requisitos ambientales elevados.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/fmh-pa-series/imagen-1.png",
    features: [
      "100% Polipropileno (PP) anticorrosión",
      "Iluminación LED estanca y resistente",
      "Ventana de vidrio balanceada",
    ],
    detail: {
      brand: "Infitek",
      model: "FMH-P1200A / FMH-P1500A / FMH-P1800A",
      fullTitle: "Infitek FMH-P Campana Extractora de Polipropileno",
      subtitle:
        "Campana de PP con extracción superior para experimentos de alta intensidad ácido-base y salas limpias.",
      highlights: [
        "Gabinetes superior e inferior de placa PP grado A de 8 mm, resistente a ácidos, álcalis, químicos e impactos.",
        "Diseño interno de extracción en tres etapas para evacuar gases generados en los experimentos.",
        "Panel externo táctil para iluminación, ventilador y válvula de aire.",
      ],
      advantages: [
        "Campana superior PP con bandeja colectora para condensado y ventilador axial de 250 mm incluido.",
        "Estructura de base con diseño de tubo cuadrado y tipo T para soporte de carga.",
        "Ventana de vidrio templado con elevación contrapesada y poleas silenciosas de PP.",
      ],
      technicalParameters: [
        {
          leftParameter: "Velocidad de Flujo",
          leftValue: "0.3 ~ 0.5 m/s",
          rightParameter: "Nivel de Emisión Sonora",
          rightValue: "< 65 dB",
        },
        {
          leftParameter: "Diámetro de Escape",
          leftValue: "φ 250 mm estándar; φ 315 mm opcional",
          rightParameter: "Volumen de Extracción (m³/h)",
          rightValue: "1300 / 1500 / 1800",
        },
        {
          leftParameter: "Material de Construcción",
          leftValue: "Tablero PP Grado A de 8 mm",
          rightParameter: "Superficie de Trabajo",
          rightValue: "Resina PP de 8 mm anticorrosiva",
        },
        {
          leftParameter: "Ventilador (estándar)",
          leftValue: "Flujo axial en plástico PP/metal",
          rightParameter: "Sistema Eléctrico",
          rightValue: "Toma segura a prueba de polvo (10A, 2200W)",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Modelos FMH-P",
          items: [
            "FMH-P1200A: exterior 1200 × 850 × 2350 mm; interior 990 × 600 × 1100 mm; extracción 1300 m³/h; peso aproximado 250 kg.",
            "FMH-P1500A: exterior 1500 × 850 × 2350 mm; interior 1290 × 600 × 1100 mm; extracción 1500 m³/h; peso aproximado 300 kg.",
            "FMH-P1800A: exterior 1800 × 850 × 2350 mm; interior 1590 × 600 × 1100 mm; extracción 1800 m³/h; peso aproximado 350 kg.",
            "Los tres modelos tienen apertura de ventana de 700 mm, velocidad frontal de 0,3–0,5 m/s, lámpara LED de 30 W, emisión inferior a 65 dB y alimentación AC 220 V, 50/60 Hz.",
          ],
        },
        {
          title: "Elementos suministrados y opcionales",
          items: [
            "Estándar: gabinete principal y base, campana colectora, ventilador axial φ250, cubierta PP, lámpara LED, toma, manguera de 3 m y seis abrazaderas.",
            "Opcionales documentados: accesorios de agua, válvula y boquilla de gas o agua, superficies de trabajo alternativas, revestimientos, ventilador axial φ315 y tubería.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Ácidos, álcalis y salas limpias",
          text: "El fabricante indica su uso en experimentos de alta intensidad ácido-base, salas limpias y entornos con requisitos ambientales elevados.",
        },
      ],
    },
    tags: [
      "Infitek",
      "Campana extractora",
      "Polipropileno",
      "Ácidos",
      "Fume Hood",
      "Equipamiento menor",
    ],
  },
  {
    id: "infitek-wb-series",
    slug: "infitek-wb-series",
    name: "Baño de agua WB-1R2H-7",
    description:
      "Baño termostático de 6,1 L y dos orificios para transferencia de calor por convección natural. Integra control PID, temporizador y protección por sobretemperatura y falta de agua.",
    category: "Equipamiento menor",
    filters: ["Marcas", "Equipamiento menor"],
    imageUrl: "/productos/infitek/wb-series/imagen-1.png",
    features: [
      "Controlador inteligente PID",
      "Cámara interior de acero inoxidable",
      "Drenaje eléctrico con operación de un botón",
    ],
    detail: {
      brand: "Infitek",
      model: "WB-1R2H-7",
      fullTitle: "Baño de Agua de Acero Inoxidable WB-1R2H-7",
      subtitle:
        "Control térmico por convección natural para mantener muestras a temperatura fija, programar procesos y detenerlos automáticamente.",
      highlights: [
        "Controlador de temperatura inteligente con programa PID, pantalla digital, función de temporización y protección contra sobretemperatura.",
        "Cámara interior y cubierta superior fabricadas en acero inoxidable; carcasa exterior de acero laminado en frío con acabado electrostático.",
        "Interruptor de drenaje eléctrico de un botón y apagado de seguridad cuando el nivel de agua es insuficiente.",
      ],
      advantages: [
        "Operación a temperatura fija, temporización de 0 a 9999 minutos y parada automática al completar el ciclo.",
        "Rango desde temperatura ambiente +5 °C hasta 100 °C, con resolución de 0,1 °C y uniformidad de ±1,0 °C.",
        "Corrección de desviación, bloqueo de menú, respaldo ante fallo eléctrico y memoria de apagado.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "WB-1R2H-7",
          rightParameter: "Clasificación",
          rightValue: "1 fila y 2 orificios",
        },
        {
          leftParameter: "Modo de calentamiento",
          leftValue: "Convección natural del agua",
          rightParameter: "Rango de temperatura",
          rightValue: "Temperatura ambiente +5 a 100 °C",
        },
        {
          leftParameter: "Resolución de temperatura",
          leftValue: "0,1 °C",
          rightParameter: "Fluctuación de temperatura",
          rightValue: "±0,5 °C",
        },
        {
          leftParameter: "Uniformidad de temperatura",
          leftValue: "±1,0 °C",
          rightParameter: "Sensor",
          rightValue: "NTC",
        },
        {
          leftParameter: "Cámara interior",
          leftValue: "Acero inoxidable",
          rightParameter: "Carcasa exterior",
          rightValue: "Acero laminado en frío con pulverización electrostática",
        },
        {
          leftParameter: "Calentador",
          leftValue: "Tubo calefactor de acero inoxidable",
          rightParameter: "Potencia nominal",
          rightValue: "0,5 kW",
        },
        {
          leftParameter: "Control de temperatura",
          leftValue: "PID",
          rightParameter: "Ajuste",
          rightValue: "Botones táctiles",
        },
        {
          leftParameter: "Visualización",
          leftValue: "LED dual de 3 dígitos: temperatura medida y programada",
          rightParameter: "Temporizador",
          rightValue: "0 a 9999 min, con función de espera",
        },
        {
          leftParameter: "Operación",
          leftValue: "Temperatura fija, temporización y parada automática",
          rightParameter: "Funciones adicionales",
          rightValue:
            "Corrección de desviación, bloqueo de menú, respaldo eléctrico y memoria",
        },
        {
          leftParameter: "Seguridad",
          leftValue: "Alarma de sobretemperatura y apagado por falta de agua",
          rightParameter: "Volumen",
          rightValue: "6,1 L",
        },
        {
          leftParameter: "Cámara interior (An. × L. × Al.)",
          leftValue: "300 × 135 × 150 mm",
          rightParameter: "Exterior (An. × L. × Al.)",
          rightValue: "318 × 168 × 210 mm",
        },
        {
          leftParameter: "Embalaje (An. × L. × Al.)",
          leftValue: "410 × 260 × 300 mm",
          rightParameter: "Carga por bandeja",
          rightValue: "5 kg",
        },
        {
          leftParameter: "Número de bandejas",
          leftValue: "1",
          rightParameter: "Alimentación",
          rightValue: "AC 220 V · 2,3 A · 50/60 Hz",
        },
        {
          leftParameter: "Peso neto",
          leftValue: "4,5 kg",
          rightParameter: "Peso bruto",
          rightValue: "5 kg",
        },
      ],
      detailBlocks: [],
      descriptionImages: [
        {
          src: "/productos/infitek/wb-series/infografia-1.jpg",
          alt: "Panel PID del baño de agua Infitek WB-1R2H-7",
          caption: "Panel de control de temperatura proporcionado para el baño de agua WB-1R2H-7.",
        },
        {
          src: "/productos/infitek/wb-series/infografia-2.png",
          alt: "Cámara de acero inoxidable del baño de agua Infitek WB-1R2H-7",
          caption: "Cámara interior de acero inoxidable mostrada para el baño de agua WB-1R2H-7.",
        },
      ],
    },
    tags: [
      "Infitek",
      "Baño María",
      "Water Bath",
      "Calefacción",
      "Equipamiento menor",
    ],
  },
  {
    id: "infitek-pr5-series",
    slug: "infitek-pr5-series",
    name: "Refrigerador PR5-1500",
    description:
      "Refrigerador médico de tres puertas y 1500 L para almacenar vacunas, medicamentos, reactivos y muestras entre 2 y 8 °C mediante refrigeración por aire forzado.",
    category: "Equipamiento menor",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento menor"],
    imageUrl: "/productos/infitek/pr5-series/imagen-1.png",
    features: [
      "Capacidad masiva de 1500 L",
      "Enfriamiento de aire forzado",
      "Control microprocesado 2°C - 8°C",
    ],
    detail: {
      brand: "Infitek",
      model: "PR5-1500",
      fullTitle: "Refrigerador de Farmacia de Tres Puertas PR5-1500",
      subtitle:
        "Almacenamiento confiable de alto volumen para vacunas, fármacos y reactivos con sistema de enfriamiento de aire forzado libre de escarcha.",
      highlights: [
        "Compresor de alta eficiencia con fiabilidad demostrada y ventilador de refrigeración permanentemente lubricado.",
        "Sistema avanzado de aire forzado diseñado con una distribución optimizada para garantizar uniformidad y rápida recuperación térmica.",
        "Equipado con un sistema completo de alarma que incluye zumbador sonoro y luz intermitente visual para múltiples anomalías.",
      ],
      advantages: [
        "Variación de temperatura dentro de ±3 °C y ajuste en incrementos de 0,1 °C mediante control microprocesado.",
        "Diseño ergonómico con iluminación LED interior, estantes ajustables para distintos tipos de envases y cerradura de seguridad.",
        "Interior y exterior fabricados en Acero Inoxidable grado 304, ofreciendo máxima higiene y resistencia en el laboratorio.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "PR5-1500",
          rightParameter: "Capacidad",
          rightValue: "1500 L",
        },
        {
          leftParameter: "Rango de temperatura",
          leftValue: "2 a 8 °C",
          rightParameter: "Rangos opcionales",
          rightValue: "2 a 10 °C o 2 a 14 °C",
        },
        {
          leftParameter: "Temperatura ambiente de operación",
          leftValue: "10 a 32 °C",
          rightParameter: "Variación de temperatura",
          rightValue: "±3 °C",
        },
        {
          leftParameter: "Controlador",
          leftValue: "Microprocesador",
          rightParameter: "Sensor",
          rightValue: "NTC",
        },
        {
          leftParameter: "Visualización",
          leftValue: "Pantalla digital",
          rightParameter: "Ajuste de temperatura",
          rightValue: "Incrementos de 0,1 °C",
        },
        {
          leftParameter: "Sistema de refrigeración",
          leftValue: "Aire forzado",
          rightParameter: "Descongelamiento",
          rightValue: "Automático, sin escarcha",
        },
        {
          leftParameter: "Refrigerante",
          leftValue: "R134a, libre de CFC",
          rightParameter: "Compresor",
          rightValue: "SECOP · 1 unidad",
        },
        {
          leftParameter: "Alarmas",
          leftValue:
            "Alta/baja temperatura, error de sensor, puerta abierta y fallo eléctrico",
          rightParameter: "Respaldo de alarma",
          rightValue: "8 h ante fallo de energía",
        },
        {
          leftParameter: "Interior",
          leftValue: "Acero inoxidable grado 304",
          rightParameter: "Exterior",
          rightValue: "Acero inoxidable grado 304",
        },
        {
          leftParameter: "Puerto de alarma remota",
          leftValue: "Estándar",
          rightParameter: "Puerto USB / orificio de prueba",
          rightValue: "Opcionales",
        },
        {
          leftParameter: "Estantes",
          leftValue: "12",
          rightParameter: "Emisión sonora",
          rightValue: "55 dB",
        },
        {
          leftParameter: "Dimensiones internas (An. × Pr. × Al.)",
          leftValue: "1680 × 595 × 1312 mm",
          rightParameter: "Dimensiones exteriores (An. × Pr. × Al.)",
          rightValue: "1800 × 775 × 1965 mm",
        },
        {
          leftParameter: "Dimensiones de envío (An. × Pr. × Al.)",
          leftValue: "1890 × 820 × 2170 mm",
          rightParameter: "Peso neto / bruto",
          rightValue: "245 / 280 kg",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "AC 110/220 V ±10 % · 50/60 Hz",
          rightParameter: "Consumo",
          rightValue: "1065 W",
        },
      ],
      detailBlocks: [],
      applicationNotes: [
        {
          label: "Conservación farmacéutica y de laboratorio",
          text: "La ficha técnica lo describe para almacenar vacunas, medicamentos, reactivos y especímenes entre 2 y 8 °C, con opciones de 2–10 °C o 2–14 °C.",
        },
      ],
    },
    tags: [
      "Infitek",
      "Refrigerador",
      "Farmacia",
      "Conservación",
      "Vacunas",
      "Equipamiento menor",
    ],
  },
  {
    id: "infitek-titr-50vc",
    slug: "infitek-titr-50vc",
    name: "Titulador Karl Fischer TITR-50VC",
    description:
      "Titulador Karl Fischer que combina valoración volumétrica y coulométrica para determinar humedad constante y trazas en muestras sólidas, líquidas y gaseosas.",
    category: "Equipamiento analítico",
    filters: ["Marcas", "Equipamiento analítico", "Área farmacéutica"],
    imageUrl: "/productos/infitek/titr-50vc/imagen-1.png",
    features: [
      "Valoración Volumétrica y Coulométrica",
      "Pantalla táctil de 7 pulgadas",
      "Gestión de datos con trazabilidad completa",
    ],
    detail: {
      brand: "Infitek",
      model: "TITR-50VC",
      fullTitle: "Titulador Karl Fischer Volumétrico y Coulométrico TITR-50VC",
      subtitle:
        "Determinación precisa de humedad constante y trazas en muestras sólidas, líquidas y gaseosas.",
      highlights: [
        "Sistema operativo con gestión de usuarios en tres niveles, métodos, sensores, titulantes y datos; algunas funciones avanzadas de gestión de calidad requieren el software adicional indicado por el fabricante.",
        "Admite múltiples métodos: Valoración automática, determinación de título KF, valoración en horno y corrección de coeficientes.",
        "Gestor de disolventes con diseño antiderrames: admite llenado, drenaje y limpieza de buretas sin contacto con químicos peligrosos.",
      ],
      advantages: [
        "Ajuste de deriva manual/automático y almacenamiento de hasta 2000 conjuntos de datos de valoración con trazabilidad completa.",
        "Pantalla LCD táctil de 7 pulgadas con interfaz a color para visualizar unidades como µg, mg, %, ppm, mg/L y µg/mL.",
        "Compatibilidad con exportación de datos mediante USB (CSV/PDF) y conexión directa a impresoras, lectores de códigos de barras y balanzas.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "TITR-50VC",
          rightParameter: "Pantalla",
          rightValue: "LCD táctil a color de 7 pulgadas",
        },
        {
          leftParameter: "Modos Karl Fischer",
          leftValue: "Volumétrico y coulométrico",
          rightParameter: "Muestreo por horno",
          rightValue: "Compatible con gases, sólidos y líquidos",
        },
        {
          leftParameter: "Métodos volumétricos",
          leftValue:
            "Valoración automática, título KF, horno y blanco de horno",
          rightParameter: "Métodos coulométricos",
          rightValue:
            "Valoración automática, horno, blanco de horno y corrección de coeficiente",
        },
        {
          leftParameter: "Rango de agua volumétrico",
          leftValue: "100 µg a 250,0 mg",
          rightParameter: "Resolución volumétrica",
          rightValue: "1 µg",
        },
        {
          leftParameter: "Repetibilidad volumétrica",
          leftValue: "≤0,3 %",
          rightParameter: "Unidades volumétricas",
          rightValue: "µg, mg, %, ppm, µg/mL y mg/L",
        },
        {
          leftParameter: "Rango mV volumétrico",
          leftValue: "0 a 2000 mV",
          rightParameter: "Resolución mV volumétrica",
          rightValue: "0,1 mV",
        },
        {
          leftParameter: "Corriente de polarización volumétrica",
          leftValue: "1 a 200 µA",
          rightParameter: "Exactitud / fluctuación",
          rightValue: "±3 % / ±2,5 % cada 30 min",
        },
        {
          leftParameter: "Rango de agua coulométrico",
          leftValue: "3,0 µg a 200 mg",
          rightParameter: "Resolución coulométrica",
          rightValue: "0,1 µg",
        },
        {
          leftParameter: "Repetibilidad coulométrica",
          leftValue: "≤0,3 %",
          rightParameter: "Unidades coulométricas",
          rightValue: "µg, mg, %, ppm, µg/mL y mg/L",
        },
        {
          leftParameter: "Rango mV coulométrico",
          leftValue: "0 a 2000 mV",
          rightParameter: "Resolución mV coulométrica",
          rightValue: "0,1 mV",
        },
        {
          leftParameter: "Corriente de polarización coulométrica",
          leftValue: "1 a 200 µA",
          rightParameter: "Exactitud / fluctuación",
          rightValue: "±3 % / ±2,5 % cada 30 min",
        },
        {
          leftParameter: "Corriente de trabajo",
          leftValue: "Exactitud ±0,5 %",
          rightParameter: "Fluctuación de corriente de trabajo",
          rightValue: "±0,2 % cada 10 min",
        },
        {
          leftParameter: "Gestión de datos",
          leftValue: "Hasta 2000 resultados, con trazabilidad completa",
          rightParameter: "Exportación",
          rightValue: "USB a CSV/PDF y RS-232 para impresión",
        },
        {
          leftParameter: "Periféricos compatibles",
          leftValue:
            "Impresora, lector de código, horno y balanza según modelo",
          rightParameter: "Gestión avanzada de calidad",
          rightValue: "Requiere software adicional del fabricante",
        },
        {
          leftParameter: "Elementos incluidos",
          leftValue:
            "Gestor de solventes, bureta de 10 mL y recipiente volumétrico con electrodo",
          rightParameter: "Elementos coulométricos incluidos",
          rightValue: "Recipiente, electrodo de medición y electrodo generador",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "AC 100 a 240 V · 47 a 63 Hz",
          rightParameter: "Dimensiones",
          rightValue: "240 × 370 × 270 mm",
        },
        {
          leftParameter: "Peso neto",
          leftValue: "Aproximadamente 4 kg",
          rightParameter: "Ajuste de deriva",
          rightValue: "Automático o manual",
        },
      ],
      detailBlocks: [],
    },
    tags: [
      "Infitek",
      "Karl Fischer",
      "Titulador",
      "Volumétrico",
      "Coulométrico",
      "Humedad",
      "Equipamiento analítico",
    ],
  },
  {
    id: "te-instruments-xplorer-aox-tox",
    slug: "te-instruments-xplorer-aox-tox",
    name: "Halógenos XplorerPlus AOX/TOX",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Análisis de agua",
      "Automatización",
      "Trace Elemental",
    ],
    description:
      "Analizador de parámetros de suma (AOX/TOX, EOX, POX) en aguas, lodos, suelos y matrices orgánicas con tubo de combustión X-ProPlus y titulación microcoulombimétrica con Auto-Gain.",
    features: [
      "Determinación de parámetros de suma AOX, TOX, EOX y POX",
      "Tubo de combustión X-ProPlus sin consumibles",
      "Célula de titulación microcoulombimétrica con Auto-Gain",
      "Metodología alineada con estándares internacionales de referencia",
    ],
    imageUrl: "/productos/te-instruments/xplorer-aox-tox/imagen-1.png",
    detail: {
      brand: "Trace Elemental",
      model: "XplorerPlus AOX/TOX",
      fullTitle:
        "Trace Elemental XplorerPlus AOX/TOX Analizador de Halógenos Orgánicos Totales",
      subtitle:
        "Analizador automático compacto de parámetros de suma (AOX/TOX, EOX, POX) para laboratorios ambientales e industriales que requieren alta precisión, automatización y cumplimiento regulatorio en agua, suelos y efluentes.",
      highlights: [
        "Máxima densidad funcional en el menor espacio de mesada (benchtop)",
        "Tubo de combustión X-ProPlus con tecnología de doble colisión TSHR NEX-Z",
        "Detección microcoulombimétrica con función Auto-Gain",
      ],
      advantages: [
        "Analizador de parámetros de suma de nueva generación: sucesor del modelo Xplorer, diseñado para determinación rápida y precisa de AOX/TOX, EOX y POX.",
        "Módulos fácilmente intercambiables para soportar operación continua las 24 horas del día en diversas matrices líquidas y sólidas.",
        "Principio de deslizamiento por gravedad (Newton) para una introducción limpia de copas o fritas al horno horizontal sin acumulación de residuos.",
        "Tubo de combustión X-ProPlus (tecnología TSHR NEX-Z) con ruta de flujo extendida y doble colisión, que no requiere consumibles y soporta casi cualquier matriz.",
        "Célula de titulación microcoulombimétrica con Auto-Gain: método de referencia para AOX, TOX, POX y EOX con respuesta rápida y de bajo costo por muestra.",
        "Sistema de autolimpiado automático en línea (inline auto-clean) para el inyector que extiende el tiempo de actividad y reduce el mantenimiento.",
        "Controladores de flujo másico (MFC) estándar para gas portador y oxígeno que garantizan máxima repetibilidad analítica.",
        "Sensores de detección temprana de fugas y acceso directo a componentes clave sin necesidad de apagar el analizador.",
        "Plataforma ambiental completa para agua potable, efluentes, suelos y lodos, alineada con estándares internacionales de referencia.",
      ],
      technicalParameters: [
        {
          leftParameter: "Parámetros analizados",
          leftValue: "AOX/TOX, EOX, POX y TX/TOX",
          rightParameter: "Tubo de combustión",
          rightValue: "X-ProPlus de cuarzo avanzado (NEX-Z)",
        },
        {
          leftParameter: "Método de detección",
          leftValue: "Titulación microcoulombimétrica con Auto-Gain",
          rightParameter: "Introducción de muestra",
          rightValue: "Módulo deslizante por gravedad de Newton",
        },
        {
          leftParameter: "Matrices compatibles",
          leftValue: "Agua potable, efluentes, lodos, suelos, aceites",
          rightParameter: "Control de flujo de gases",
          rightValue: "Controladores de flujo másico (MFC) para Ar/He y O₂",
        },
        {
          leftParameter: "Módulos intercambiables",
          leftValue: "AOX, EOX y POX fácilmente configurables",
          rightParameter: "Limpieza del sistema",
          rightValue: "Sistema de autolimpiado automático en línea",
        },
        {
          leftParameter: "Sensores de seguridad",
          leftValue: "Detección temprana de fugas integrada",
          rightParameter: "Conformidad normativa",
          rightValue: "Consulte con nuestro equipo técnico",
        },
        {
          leftParameter: "Modo de operación",
          leftValue: "Continuo 24/7 de alta productividad",
          rightParameter: "Formato de instalación",
          rightValue: "Benchtop compacto de alta densidad",
        },
      ],
      detailBlocks: [
        {
          title: "Diseño y tecnología de combustión avanzada",
          tone: "yellow",
          items: [
            "Tubo de combustión X-ProPlus basado en la tecnología TSHR NEX-Z con técnica de doble colisión.",
            "Ruta de flujo extendida que optimiza la combustión y elimina la necesidad de consumibles dedicados.",
            "Principio de deslizamiento mecánico por gravedad que introduce y recoge copas/fritas usadas sin residuos en el tubo del horno.",
            "Formato de mesada extremadamente compacto con acceso sin herramientas a componentes principales.",
          ],
        },
        {
          title: "Detección microcoulombimétrica y control de flujo",
          tone: "blue",
          items: [
            "Célula de titulación de microcoulombimetría con Auto-Gain para ajuste dinámico de sensibilidad.",
            "Controladores de flujo másico (MFC) para gas portador y oxígeno que aseguran condiciones de combustión estables.",
            "Autoclean en línea para el sistema de inyección que previene obstrucciones y acumulación de muestras.",
            "Sensores integrados para monitoreo de estanqueidad y seguridad de operación en laboratorio.",
          ],
        },
        {
          title: "Aplicaciones ambientales e industriales",
          tone: "green",
          items: [
            "Monitoreo de aguas potables, subterráneas, de proceso, refrigeración y efluentes industriales.",
            "Control de contaminantes halogenados en la industria de celulosa, papel, química, textil y petroquímica.",
            "Cribado de halógenos orgánicos en muestras sólidas (suelos, sedimentos, lodos y aceites usados).",
            "Cumplimiento directo con normativas ambientales internacionales de límites máximos permisibles.",
          ],
        },
        {
          title: "Por qué se mide este parámetro",
          tone: "red",
          items: [
            "La mayoría de los halógenos orgánicos presentes en el ambiente son tóxicos, cancerígenos, persistentes y bioacumulativos.",
            "Las autoridades reguladoras han definido límites máximos permisibles de estos compuestos en suelo y agua.",
            "Ese marco regulatorio exige métodos de cribado rápidos y fiables para el control rutinario, que es el rol que cumple el XplorerPlus.",
          ],
        },
      ],
    },
    tags: [
      "TE Instruments",
      "XplorerPlus",
      "AOX",
      "TOX",
      "EOX",
      "POX",
      "Análisis elemental",
      "Análisis de agua",
      "Halógenos",
    ],
  },
  {
    id: "te-instruments-xplorer-tn",
    slug: "te-instruments-xplorer-tn",
    name: "Nitrógeno XplorerPlus TN",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Análisis de agua",
      "Automatización",
      "Trace Elemental",
    ],
    description:
      "Analizador automático de combustión de trazas para Nitrógeno Total (TN), Azufre Total (TS) y Cloro (TX) en combustibles, biocombustibles, productos químicos, polímeros y gases, con tubo XproPlus y tecnología de corrección NO-CT™.",
    features: [
      "Determinación ultrarremota de Nitrógeno Total (TN), Azufre Total (TS) y Cloro (TX)",
      "Tubo de combustión XproPlus con doble colisión NEX-Z sin consumibles",
      "Límite de detección de 10 ppb para Azufre Total y Nitrógeno sin aditivos",
      "Tecnología NO-CT™ para eliminar interferencia de nitrógeno en la determinación de azufre",
      "Módulo Liquids ModulePlus con control acelerado de temperatura hasta 600 °C",
    ],
    imageUrl: "/productos/te-instruments/xplorer-tn/imagen-1.png",
    detail: {
      brand: "Trace Elemental",
      model: "XplorerPlus TN",
      fullTitle:
        "Trace Elemental XplorerPlus TN Analizador de Nitrógeno Total, Azufre y Cloro",
      subtitle:
        "Plataforma avanzada de análisis elemental por combustión para determinación de trazas de Nitrógeno, Azufre y Cloro en hidrocarburos, combustibles automotrices, biocombustibles, productos químicos, plásticos y gases.",
      highlights: [
        "Evolución tecnológica de la plataforma Xplorer (líder de la industria desde 2009)",
        "Tubo de combustión XproPlus basado en la tecnología de doble colisión TSHR NEX-Z",
        "Límite de detección ultraballero de 10 ppb para Azufre Total y Nitrógeno",
        "Tecnología NO-CT™ (Corrección de Óxido de Nitrógeno) integrada para la determinación de azufre total",
      ],
      advantages: [
        "Formato de mesada (benchtop) con ruta de flujo interna completamente rediseñada para lograr máxima precisión, resistencia y durabilidad en análisis de trazas.",
        "Tubo de combustión XproPlus (tecnología TSHR NEX-Z) de doble colisión con ruta de flujo extendida que soporta cualquier matriz de muestra con mínimo arrastre y sin consumibles.",
        "Detector TS-UV-F de diseño propio con alineación robusta de lámpara flasher que extiende su vida útil y asegura estabilidad a largo plazo en azufre total.",
        "Módulo Liquids ModulePlus con control térmico acelerado hasta 600 °C, expandiendo la compatibilidad con muestras difíciles y aumentando la productividad.",
        "Detección microcoulombimétrica sin costuras para cloro y azufre con función Auto-Gain y preparación simplificada de la célula.",
        "Módulos de jeringa y barca totalmente rediseñados que mejoran la versatilidad de introducción, reduciendo los tiempos de ciclo analítico.",
        "Enfriamiento de barca opcional Boat CoolingPlus por tecnología Peltier que acelera el enfriamiento de copas y reduce el tiempo de análisis a menos de 5 minutos.",
        "Tecnología NO-CT™ (Nitrogen Oxide Correction Technology) que elimina la interferencia de nitrógeno en la determinación de azufre total.",
        "Plataforma de software TraceLINK con interfaz intuitiva, asistente de corrección NO-CT™ automático y exportación directa a sistemas LIMS o formatos comunes.",
      ],
      technicalParameters: [
        {
          leftParameter: "Parámetros analizados",
          leftValue: "Nitrógeno Total (TN), Azufre Total (TS) y Cloro (TX)",
          rightParameter: "Tubo de combustión",
          rightValue: "XproPlus de cuarzo avanzado (tecnología NEX-Z)",
        },
        {
          leftParameter: "Límite de detección TN / TS",
          leftValue: "10 ppb (sin módulos adicionales o concentradores)",
          rightParameter: "Detector de Azufre Total",
          rightValue: "TS-UV-F con lámpara flasher de larga vida",
        },
        {
          leftParameter: "Medición de Cloro y Azufre",
          leftValue: "Microcoulombimetría con función Auto-Gain",
          rightParameter: "Control térmico de líquidos",
          rightValue: "Liquids ModulePlus (hasta 600 °C)",
        },
        {
          leftParameter: "Corrección de interferencias",
          leftValue: "Tecnología NO-CT™ automática",
          rightParameter: "Enfriamiento de barca",
          rightValue: "Boat CoolingPlus opcional (Peltier, < 5 min/análisis)",
        },
        {
          leftParameter: "Plataforma de software",
          leftValue: "TraceLINK con asistente NO-CT™ y LIMS ready",
          rightParameter: "Módulos de introducción",
          rightValue: "Módulos optimizados para jeringas, barcas, gases y GLP",
        },
        {
          leftParameter: "Formato físico",
          leftValue: "Benchtop compacto para mesada de laboratorio",
          rightParameter: "Campos de aplicación",
          rightValue: "Refinería, renovables, químicos, polímeros y gases",
        },
      ],
      detailBlocks: [
        {
          title: "Características y tecnología de combustión XproPlus",
          tone: "yellow",
          items: [
            "Tubo de combustión XproPlus con diseño de doble colisión TSHR NEX-Z y flujo extendido para óptima combustión de cualquier matriz.",
            "Operación libre de consumibles adicionales en el tubo del horno, reduciendo significativamente los costos operativos por muestra.",
            "Módulo Liquids ModulePlus con control acelerado de temperatura de hasta 600 °C para muestras pesadas o volátiles.",
            "Detector TS-UV-F desarrollado in-house con óptico mejorado y lámpara flasher de alta estabilidad operacional.",
          ],
        },
        {
          title: "Innovación analítica NO-CT™ y plataforma TraceLINK",
          tone: "blue",
          items: [
            "Tecnología NO-CT™ (Nitrogen Oxide Correction Technology) que elimina la interferencia de nitrógeno durante la medición de Azufre Total.",
            "Célula microcoulombimétrica con Auto-Gain automático para análisis continuos de cloro con máxima sensibilidad.",
            "Software TraceLINK de diseño intuitivo que permite modificar listas de trabajo, evaluar datos y exportar a LIMS en pocos clics.",
            "Módulo Boat CoolingPlus opcional con tecnología Peltier que acorta los ciclos de análisis de barca a menos de 5 minutos.",
          ],
        },
        {
          title: "Aplicaciones por sector industrial e hidrocarburos",
          tone: "green",
          items: [
            "Productos de Refinería: Diésel, gasolina, naftas, destilados, petróleo crudo, aceites minerales y aceites de pirólisis.",
            "Combustibles Renovables: UCO, FAME, SAF, HVO, VGO, HAFAS, B100 y mezclas de Biodiésel.",
            "Química General y Polímeros: Químicos orgánicos, hidrocarburos livianos, lubricantes, caucho sintético y plásticos.",
            "Gases y GLP: Gas licuado de petróleo (GLP), gases industriales y corrientes gaseosas biogénicas.",
          ],
        },
      ],
    },
    tags: [
      "Trace Elemental",
      "XplorerPlus",
      "TN",
      "TS",
      "TX",
      "Nitrógeno",
      "Azufre",
      "Cloro",
      "Análisis elemental",
      "Combustión",
    ],
  },
  {
    id: "te-instruments-vectra",
    slug: "te-instruments-vectra",
    name: "Autosampler VECTRA",
    category: "Automatización",
    filters: [
      "Marcas",
      "Automatización",
      "Equipamiento analítico",
      "Trace Elemental",
    ],
    description:
      "Muestreador automático robótico de líquidos con movimiento XYZ y rotación angular, cámara HD integrada, autocondicionamiento térmico y capacidad de hasta 350 posiciones para analizadores Xplorer Series y Xprep C-IC.",
    features: [
      "Sistema de movimiento XYZ con rotación angular de última generación",
      "Cámara HD integrada para reconocimiento y calibración automática de posición",
      "Capacidad masiva de muestras con hasta 350 posiciones de viales",
      "Bandejas acondicionadas de alto rendimiento con enfriamiento (12.5 °C bajo ambiente) y calefacción (65 °C)",
      "Intercambio automático de jeringas sin intervención del operador (3 posiciones de estacionamiento)",
    ],
    imageUrl: "/productos/te-instruments/vectra/imagen-1.png",
    detail: {
      brand: "Trace Elemental",
      model: "VECTRA",
      fullTitle:
        "Trace Elemental VECTRA Muestreador Automático de Líquidos de Alta Capacidad",
      subtitle:
        "Autosampler avanzado de líquidos para automatización de alto rendimiento en laboratorios petroquímicos, ambientales y de investigación, compatible con la serie Xplorer y sistemas Xprep C-IC.",
      highlights: [
        "Capacidad excepcional de hasta 350 viales estándar de 2 mL",
        "Cámara HD integrada con reconocimiento de posición y autocalibración",
        "Diseño XYZ con movimiento de rotación angular para menor desgaste y ocupación de espacio",
        "Intercambio automático de jeringas de 10 a 250 µL con 3 estaciones de estacionamiento",
      ],
      advantages: [
        "Revolucionario principio de movimiento XYZ combinado con rotación angular que optimiza el área de trabajo y reduce el espacio ocupado en la mesada a la huella del analizador.",
        "Cámara HD integrada que realiza reconocimiento inteligente de posición y calibración automática sin ajuste manual.",
        "Retroalimentación de posición y recuperación automática ante colisiones, incrementando la seguridad operativa y confiabilidad desatendida.",
        "Capacidad de muestra superior con hasta 350 posiciones de viales de 2 mL para maximizar la productividad del laboratorio.",
        "Bandejas acondicionadas opcionales con enfriamiento Peltier (12.5 °C bajo temperatura ambiente) y calefacción hasta 65 °C para mantener la integridad de muestras volátiles o de alta viscosidad.",
        "Compatibilidad con jeringas de 10 µL a 250 µL con cambio automático entre 3 estaciones de estacionamiento sin pausa en la secuencia de análisis.",
        "Integración nativa y control total desde el software TEIS para la creación de métodos analíticos personalizados.",
        "Precisión de inyección ultrabaja (< 0.2% RSD) y arrastre imperceptible (< 0.01% carry-over) para análisis de trazas de alta exactitud.",
      ],
      technicalParameters: [
        {
          leftParameter: "Tipo de sistema",
          leftValue: "Autosampler robótico XYZ con rotación angular",
          rightParameter: "Compatibilidad de analizadores",
          rightValue: "Serie Xplorer / Xprep C-IC",
        },
        {
          leftParameter: "Capacidad de muestras",
          leftValue: "Hasta 350 posiciones (viales de 2 mL)",
          rightParameter: "Cámara integrada",
          rightValue: "Cámara HD con autocalibración de posición",
        },
        {
          leftParameter: "Volumen de jeringas",
          leftValue: "Flexibilidad de 10 µL a 250 µL (Estándar 100 µL)",
          rightParameter: "Intercambio de jeringas",
          rightValue: "Automático (3 estaciones de estacionamiento)",
        },
        {
          leftParameter: "Control de temperatura de muestra",
          leftValue:
            "Enfriamiento: 12.5 °C bajo ambiente · Calefacción: hasta 65 °C",
          rightParameter: "Velocidad de manejo de líquidos",
          rightValue: "Ajustable de 0.1 a 30 µL/s",
        },
        {
          leftParameter: "Volumen de manejo de líquido",
          leftValue: "1 a 250 µL",
          rightParameter: "Vial estándar",
          rightValue: "2 mL",
        },
        {
          leftParameter: "Precisión de inyección",
          leftValue: "< 0.2% RSD",
          rightParameter: "Arrastre de muestra (Carry-over)",
          rightValue: "< 0.01%",
        },
        {
          leftParameter: "Viscosidad máxima de muestra",
          leftValue: "40 cSt a 20 °C (68 °F)",
          rightParameter: "Dimensiones y Peso",
          rightValue: "Dentro de la huella del analizador · 6.3 kg (13.9 lb)",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "100-240V, 50-60Hz, 1.5A, 70W max (20W normal)",
          rightParameter: "Protocolo de control",
          rightValue: "USB controlado vía software TEIS",
        },
      ],
      detailBlocks: [
        {
          title: "Innovación en flexibilidad y movimiento XYZ con rotación",
          tone: "yellow",
          items: [
            "Supera los límites de los muestreadores cartesianos convencionales gracias al movimiento XYZ acoplado con rotación angular.",
            "Mayor área de trabajo flexible con menor desgaste mecánico en componentes internos y menor ocupación de mesada.",
            "Cámara HD integrada que realiza reconocimiento de posición, alineación automática y verificación óptica de viales.",
            "Recuperación automática de posición que garantiza operación desatendida 24/7 sin pérdida de muestras.",
          ],
        },
        {
          title: "Control térmico de muestras y versatilidad de jeringas",
          tone: "blue",
          items: [
            "Bandejas acondicionadas opcionales para bastidores de 1 x 50 o 2 x 50 viales con control térmico preciso.",
            "Enfriamiento de hasta 12.5 °C por debajo del ambiente para prevenir evaporación de fracciones livianas.",
            "Calefacción de hasta 65 °C para reducir la viscosidad de crudos o muestras pesadas de hasta 40 cSt.",
            "Sistema de estacionamiento de 3 jeringas con intercambio totalmente automático durante secuencias largas.",
          ],
        },
        {
          title: "Cumplimiento normativo y soporte técnico Del Carpio",
          tone: "red",
          items: [
            "Garantiza cumplimiento total con métodos de prueba internacionales al combinarse con soluciones de combustión TE Instruments.",
            "Control nativo desde software TEIS con programación completa de secuencias y protocolos de enjuague.",
            "Instalación, integración con analizadores existentes, capacitación y soporte técnico local por Del Carpio en Chile.",
          ],
        },
      ],
    },
    tags: [
      "Trace Elemental",
      "VECTRA",
      "Autosampler",
      "Muestreador automático",
      "Líquidos",
      "Automatización",
      "Xplorer",
      "TEIS",
    ],
  },
  {
    id: "te-instruments-newton",
    slug: "te-instruments-newton",
    name: "Autosampler NEWTON",
    category: "Automatización",
    filters: [
      "Marcas",
      "Automatización",
      "Equipamiento analítico",
      "Trace Elemental",
    ],
    description:
      "Muestreador automático de sólidos y líquidos de alta viscosidad con carruseles apilables de hasta 60 posiciones, flujo de purga de preservación, tapa protectora y sensores de control continuo para analizadores XPLORER y XPREP.",
    features: [
      "Manejo preciso de muestras sólidas y líquidos de alta viscosidad",
      "Capacidad expandible mediante carruseles apilables hasta 60 posiciones (20 posiciones base)",
      "Flujo de purga inerte y tapa protectora para preservación óptima de la muestra",
      "Verificación por sensores en la manipulación, introducción y recuperación de copas",
      "Introducción de muestra mediante barca de cuarzo y copas reutilizables",
      "Integración y control total vía software TEIS / TraceLINK",
    ],
    imageUrl: "/productos/te-instruments/newton/imagen-1.png",
    detail: {
      brand: "Trace Elemental",
      model: "NEWTON",
      fullTitle:
        "Trace Elemental NEWTON Muestreador Automático de Sólidos y Muestras Viscosas",
      subtitle:
        "Autosampler robótico para la manipulación automatizada y eficiente de muestras sólidas y líquidos pesados, diseñado para operar las 24 horas del día en combinación con la serie XPLORER y XPREP.",
      highlights: [
        "Manejo eficiente de muestras sólidas y líquidos de alta viscosidad",
        "Capacidad de hasta 60 posiciones mediante bandejas apilables (20 posiciones estándar)",
        "Sistema de purga inerte y tapa de protección contra contaminación y degradación",
        "Chequeo automático mediante sensores en cada etapa de introducción y retiro",
      ],
      advantages: [
        "Diseño especializado para la automatización precisa de muestras sólidas, polímeros, lodos, suelos y líquidos de alta viscosidad.",
        "Carruseles apilables de 20 posiciones que amplían la capacidad total hasta 60 muestras por lote sin necesidad de equipos adicionales.",
        "Preservación óptima de muestras gracias al flujo de purga de gas inerte y la tapa de protección integrada que previene evaporación y contaminación.",
        "Sensores ópticos de control que verifican en tiempo real la sujeción, posicionamiento, introducción al horno y recuperación de la copa.",
        "Introducción suave y limpia hacia el tubo del horno mediante barca de cuarzo de alta resistencia térmica.",
        "Reutilización eficiente de copas de muestra tras la combustión, reduciendo los costos operativos de insumos.",
        "Operación continua 24/7 de alta productividad, ideal para laboratorios de rutina comercial, refinerías y centros de investigación.",
        "Control total e intuitivo mediante el software TEIS / TraceLINK, facilitando el monitoreo desatendido y la integración LIMS.",
      ],
      technicalParameters: [
        {
          leftParameter: "Tipo de sistema",
          leftValue: "Autosampler de sólidos y líquidos viscosos",
          rightParameter: "Compatibilidad de analizadores",
          rightValue: "Serie XPLORER / XPREP",
        },
        {
          leftParameter: "Capacidad base de muestra",
          leftValue: "20 posiciones de bandeja",
          rightParameter: "Capacidad máxima expandida",
          rightValue: "Hasta 60 posiciones (3 carruseles apilables)",
        },
        {
          leftParameter: "Preservación de muestras",
          leftValue: "Flujo de purga inerte y tapa protectora",
          rightParameter: "Método de introducción",
          rightValue: "Barca de cuarzo con copas reutilizables",
        },
        {
          leftParameter: "Verificación de proceso",
          leftValue: "Chequeo por sensores en sujeción, inyección y retiro",
          rightParameter: "Modo de operación",
          rightValue: "Continuo desatendido 24/7",
        },
        {
          leftParameter: "Software de control",
          leftValue: "Integración nativa con software TEIS",
          rightParameter: "Aplicaciones",
          rightValue: "Sólidos, polímeros, lodos, lubricantes y viscosos",
        },
      ],
      detailBlocks: [
        {
          title: "Innovación en preservación y carruseles apilables",
          tone: "yellow",
          items: [
            "Carruseles apilables de 20 posiciones que permiten aumentar la capacidad hasta 60 muestras por lote.",
            "Sistema de flujo de purga inerte que mantiene la integridad química de la muestra antes de la combustión.",
            "Tapa protectora integrada que aísla los viales de contaminantes ambientales y humedad del laboratorio.",
            "Bandeja de transporte ergonómica que simplifica la carga previa de muestras fuera del equipo.",
          ],
        },
        {
          title: "Sensórica avanzada y reutilización de copas",
          tone: "blue",
          items: [
            "Sensores dedicados que supervisan la toma de muestra, introducción a la zona de combustión y retiro posterior.",
            "Introducción precisa al horno de combustión mediante barca de cuarzo resistente a choques térmicos.",
            "Recuperación automática de copas de muestra terminadas para su posterior limpieza y reutilización.",
            "Control desatendido 24/7 que maximiza la eficiencia analítica y reduce tiempos muertos en el laboratorio.",
          ],
        },
        {
          title: "Integración de software y soporte técnico Del Carpio",
          tone: "red",
          items: [
            "Control nativo y completo desde el software TEIS.",
            "Compatibilidad directa con analizadores elementales XPLORER y sistemas XPREP.",
            "Instalación, calibración de sensórica y capacitación técnica brindada por Del Carpio en Chile.",
          ],
        },
      ],
    },
    tags: [
      "Trace Elemental",
      "NEWTON",
      "Autosampler",
      "Muestreador automático",
      "Sólidos",
      "Viscosos",
      "Automatización",
      "Xplorer",
      "TEIS",
    ],
  },
  {
    id: "decent-cargador-electrico-crisoles",
    slug: "decent-cargador-electrico-crisoles",
    name: "Cargador de crisoles DEPL25 / DEPL50",
    category: "Fire Assay",
    filters: [
      "Marcas",
      "Fire Assay",
      "Preparación de muestras",
      "Automatización",
      "Minería",
    ],
    description:
      "Cargador eléctrico de crisoles diseñado para facilitar el manejo de cargas pesadas en laboratorios de ensayo por fuego. Compatible con sistemas multipuerto y de entrada única, ofrece capacidades de carga de 20 a 84 crisoles.",
    features: [
      "Capacidad de carga de 20, 25, 42, 50 y 84 crisoles",
      "Batería libre de mantenimiento de 12V 60Ah con garantía de 5 años y cargador integrado",
      "Elevación hidráulica de 400 kg a 1500 mm con motor bomba DC de 700W",
    ],
    imageUrl:
      "/productos/decent/cargador-electrico-crisoles/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "DEPL25 / DEPL50",
      fullTitle:
        "Decent DEPL25 / DEPL50 Cargador Eléctrico de Crisoles para Ensayo por Fuego",
      subtitle:
        "Carretilla elevadora eléctrica de ollas de crisol con capacidad de carga de 400 kg y elevación de 1500 mm, adecuada para sistemas multipuerto y multivapor en laboratorios mineros y de ensayo por fuego.",
      highlights: [
        "Capacidad versátil (20 a 84 crisoles) para sistemas multipuerto y entrada única",
        "Batería libre de mantenimiento con garantía de 5 años y cargador integrado de carga rápida",
        "Capacidad máxima de elevación hidráulica de 400 kg a 1500 mm con motor bomba DC 700W",
      ],
      advantages: [
        "Reducción drástica del riesgo de lesiones por manejo manual pesado en áreas de hornos de ensayo por fuego.",
        "Batería sin mantenimiento DC 12V 60Ah con cargador integrado para carga rápida y operación continua sin cables a la red durante la maniobra.",
        "Dos opciones de horquilla: DEPL25 (900×650×60 mm) para espacios reducidos y DEPL50 (900×1200×60 mm) para mayor superficie de carga.",
        "Compatibilidad estándar con crisoles de 50g y 65g, con posibilidad de personalización de capacidad según requerimiento del cliente.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos disponibles",
          leftValue: "DEPL25 y DEPL50",
          rightParameter: "Capacidad máxima de carga",
          rightValue: "400 kg (Ambos modelos)",
        },
        {
          leftParameter: "Altura máxima de elevación",
          leftValue: "1500 mm",
          rightParameter: "Compatibilidad de crisoles",
          rightValue: "Crisol 50g / 65g (Personalizable)",
        },
        {
          leftParameter: "Capacidades de crisoles",
          leftValue: "20 / 25 / 42 / 50 / 84 unidades",
          rightParameter: "Compatibilidad de horno",
          rightValue: "Multipuerto y entrada única",
        },
        {
          leftParameter: "Sistema eléctrico",
          leftValue: "DC 12V",
          rightParameter: "Batería de almacenamiento",
          rightValue: "DC 12V, 60Ah libre de mantenimiento",
        },
        {
          leftParameter: "Motor bomba hidráulica",
          leftValue: "DC 12V, 700W",
          rightParameter: "Garantía de batería",
          rightValue: "5 años",
        },
        {
          leftParameter: "Tamaño horquilla DEPL25",
          leftValue: "900 × 650 × 60 mm",
          rightParameter: "Tamaño horquilla DEPL50",
          rightValue: "900 × 1200 × 60 mm",
        },
        {
          leftParameter: "Sistema de carga",
          leftValue: "Cargador integrado para carga rápida",
          rightParameter: "Panel de control",
          rightValue: "Operación simple de carga y descarga",
        },
      ],
      detailBlocks: [
        {
          title: "Ventajas Clave",
          tone: "blue",
          items: [
            "Capacidad Versátil: 20/25/42/50/84 capacidades de carga de crisoles, compatible con sistemas multipuerto y de una sola entrada.",
            "Batería de Larga Duración: Batería libre de mantenimiento con garantía de 5 años, con cargador integrado para carga rápida y conveniente.",
            "Operación Simple: Operación simple y fácil mantenimiento para uso diario en laboratorio.",
            "Capacidad de Carga Personalizada: La capacidad de carga personalizada satisface las diversas necesidades de los clientes.",
          ],
        },
        {
          title: "Diferencias entre Modelos",
          tone: "yellow",
          items: [
            "DEPL25: Horquilla más compacta (900×650×60mm) – Ideal para espacios reducidos.",
            "DEPL50: Horquilla más amplia (900×1200×60mm) – Mayor capacidad de carga simultánea.",
            "Ambos modelos: Misma capacidad de peso (400kg) y altura de elevación (1500mm).",
            "Compatibilidad: Ambos trabajan con crisoles de 50g y 65g.",
            "Sistema eléctrico: Idéntico en ambos modelos (12V, 60Ah, 700W).",
          ],
        },
        {
          title: "Aplicaciones y Beneficios",
          tone: "green",
          items: [
            "Manejo seguro: Reduce el riesgo de lesiones por manejo manual.",
            "Eficiencia operativa: Carga múltiples crisoles simultáneamente.",
            "Versatilidad: Compatible con diferentes configuraciones de hornos.",
            "Movilidad: Diseño con ruedas para fácil transporte.",
            "Ergonomía: Reduce la fatiga del operador.",
            "Productividad: Acelera los procesos de carga y descarga.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DEPL25",
      "DEPL50",
      "Fire Assay",
      "Crisoles",
      "Ensayo al fuego",
      "Minería",
      "Cargador Eléctrico",
    ],
    relatedProducts: [
      "decent-cargador-manual-crisoles",
      "milestone-ethos-up",
      "hanon-sh220f",
    ],
  },
  {
    id: "decent-cargador-manual-crisoles",
    slug: "decent-cargador-manual-crisoles",
    name: "Cargador de crisoles DMPL25 / DMPL50",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Cargador manual de crisoles diseñado para el manejo eficiente y seguro de cargas en laboratorios de ensayo por fuego. Opera 100% manual sin necesidad de energía eléctrica ni mantenimiento de baterías.",
    features: [
      "Operación 100% manual sin consumo ni requerimiento eléctrico",
      "Capacidad de carga máxima de 400 kg a 1500 mm de elevación",
      "Modelos DMPL25 y DMPL50 para crisoles de 50g, 65g o medidas personalizadas",
    ],
    imageUrl: "/productos/decent/cargador-manual-crisoles/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "DMPL25 / DMPL50",
      fullTitle:
        "Decent DMPL25 / DMPL50 Cargador Manual de Crisoles para Ensayo por Fuego",
      subtitle:
        "Cargador manual de crisoles con capacidad de elevación de 400 kg a 1500 mm, ideal para laboratorios de ensayo por fuego que buscan máxima confiabilidad sin dependencia eléctrica.",
      highlights: [
        "Operación 100% manual: siempre disponible, sin recargas ni consumo eléctrico",
        "Elevación hidráulica manual de 400 kg hasta 1500 mm",
        "Capacidades de carga de 20, 25, 42, 50 y 84 crisoles para hornos multipuerto",
      ],
      advantages: [
        "Sin dependencia eléctrica: operación completamente manual, sin baterías ni tiempos de recarga.",
        "Menor costo operativo: cero consumo eléctrico y mínimo requerimiento de mantenimiento periódico.",
        "Dos opciones de horquilla: DMPL25 (900×650×60 mm) para espacios reducidos y DMPL50 (900×1200×60 mm) para mayor superficie de carga.",
        "Construcción mecánica robusta con ruedas de alta resistencia para movimiento fluido en el laboratorio.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos disponibles",
          leftValue: "DMPL25 y DMPL50",
          rightParameter: "Capacidad máxima de carga",
          rightValue: "400 kg (Ambos modelos)",
        },
        {
          leftParameter: "Altura máxima de elevación",
          leftValue: "1500 mm",
          rightParameter: "Tipo de operación",
          rightValue: "Manual (Sin energía eléctrica)",
        },
        {
          leftParameter: "Compatibilidad de crisoles",
          leftValue: "Crisol 50g / 65g o tamaño personalizado",
          rightParameter: "Capacidades de crisoles",
          rightValue: "20 / 25 / 42 / 50 / 84 unidades",
        },
        {
          leftParameter: "Tamaño horquilla DMPL25",
          leftValue: "900 × 650 × 60 mm",
          rightParameter: "Tamaño horquilla DMPL50",
          rightValue: "900 × 1200 × 60 mm",
        },
        {
          leftParameter: "Compatibilidad de horno",
          leftValue: "Multipuerto y entrada única",
          rightParameter: "Mantenimiento requerido",
          rightValue: "Mínimo mecánico",
        },
        {
          leftParameter: "Estructura",
          leftValue: "Acero de alta resistencia",
          rightParameter: "Flexibilidad",
          rightValue: "Personalizable según requerimiento del cliente",
        },
      ],
      detailBlocks: [
        {
          title: "Ventajas del Sistema Manual",
          tone: "blue",
          items: [
            "Sin dependencia eléctrica: Operación completamente manual, no requiere energía.",
            "Menor costo operativo: Sin consumo eléctrico ni mantenimiento de baterías.",
            "Simplicidad: Menos componentes móviles, menor probabilidad de fallas.",
            "Portabilidad: Fácil de mover sin cables o conexiones eléctricas.",
            "Ergonomía: Reduce la carga física del operador comparado con manejo manual.",
            "Confiabilidad: Siempre disponible, no depende de carga de batería.",
            "Durabilidad: Construcción robusta con menos componentes complejos.",
          ],
        },
        {
          title: "Diferencias entre Modelos",
          tone: "yellow",
          items: [
            "DMPL25: Horquilla compacta (900×650×60mm) – Ideal para espacios reducidos y cargas menores.",
            "DMPL50: Horquilla amplia (900×1200×60mm) – Mayor superficie para carga simultánea de más crisoles.",
            "Capacidad de peso: Ambos modelos soportan hasta 400kg.",
            "Altura de trabajo: Misma altura máxima de elevación (1500mm).",
            "Flexibilidad: Ambos permiten personalización según necesidades del cliente.",
          ],
        },
        {
          title: "Aplicaciones Ideales",
          tone: "green",
          items: [
            "Laboratorios con uso ocasional: Donde no se justifica la inversión en equipos eléctricos.",
            "Áreas sin acceso eléctrico: Espacios donde no hay tomas de corriente disponibles.",
            "Backup de equipos eléctricos: Como respaldo cuando el equipo eléctrico está en mantenimiento.",
            "Operaciones de campo: Ensayos realizados fuera del laboratorio principal.",
            "Presupuestos limitados: Solución económica para laboratorios en desarrollo.",
            "Ambientes húmedos: Donde los equipos eléctricos pueden ser problemáticos.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DMPL25",
      "DMPL50",
      "Fire Assay",
      "Crisoles",
      "Ensayo al fuego",
      "Minería",
      "Cargador Manual",
    ],
    relatedProducts: [
      "decent-cargador-electrico-crisoles",
      "decent-copelas-magnesio",
      "decent-dosificador-automatico-litargirio",
    ],
  },
  {
    id: "decent-copelas-magnesio",
    slug: "decent-copelas-magnesio",
    name: "Copelas de magnesia Serie 2X–14",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Copelas de magnesia y bloques de lingotes para copelación en ensayo por fuego. Están fabricadas con una mezcla de óxido de magnesio e ingredientes especiales de flux; la ficha indica una absorción aproximada de hasta el 70% de su peso en litargirio.",
    features: [
      "Absorción rápida de litargirio de aproximadamente 70% de su peso",
      "Mezcla única de óxido de magnesio con ingredientes especiales de flux",
      "Gama completa de tamaños desde 2X hasta 14 para todo tipo de matrices y lingotes",
    ],
    imageUrl: "/productos/decent/copelas-magnesio/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "Serie Magnesia 2X – 14",
      fullTitle:
        "Decent Copelas de Magnesia y Bloques de Lingotes para Ensayo por Fuego",
      subtitle:
        "Copelas y bloques de lingotes de alta pureza fabricados con óxido de magnesio y flux especial. Diseñadas para una absorción rápida y uniforme de litargirio sin agrietamiento por plomo ni pérdidas de metales preciosos.",
      highlights: [
        "Absorción de carga aproximada al 70% de su propio peso con rápida absorción de litargirio",
        "Libres de agrietamiento por plomo, picaduras y tendencia reducida a congelarse",
        "Amplio rango de tamaños (2X, 3, 4A, 4, 5, 6A, 7A, 7AS, 8, 8A, 8S, 9, 9A, 10, 11, 14)",
      ],
      advantages: [
        "Resistencia mecánica robusta: no se ven afectadas por variaciones térmicas o cambios atmosféricos durante el almacenamiento.",
        "Absorción superior: absorben aproximadamente el 70% de su propio peso con excelente velocidad de absorción de litargirio líquido.",
        "Remoción limpia de perlas: las perlas o prills de metales preciosos (oro/plata) se desprenden con máxima facilidad sin adherencias.",
        "Uniformidad de lote garantizada: control de calidad continuo y pruebas periódicas en laboratorio de ensayo acreditado.",
      ],
      technicalParameters: [
        {
          leftParameter: "Material base",
          leftValue:
            "Óxido de Magnesio (MgO) con ingredientes especiales de flux",
          rightParameter: "Capacidad de absorción",
          rightValue: "Aprox. 70% de su peso en litargirio",
        },
        {
          leftParameter: "Rango de tamaños",
          leftValue: "Desde 2X hasta 14 (19 modelos estándar y especiales)",
          rightParameter: "Comportamiento térmico",
          rightValue: "Alta resistencia a choque térmico en mufla",
        },
        {
          leftParameter: "Resistencia al plomo",
          leftValue: "Sin agrietamiento ni picaduras, según la ficha",
          rightParameter: "Desprendimiento de perla",
          rightValue: "Extracción de perlas con pérdidas reducidas",
        },
        {
          leftParameter: "Tamaños pequeños (2X – 4A)",
          leftValue: "Muestras de rutina (Altura 17–22 mm, Copa 18–24 mm)",
          rightParameter: "Tamaños medianos (5 – 7AS)",
          rightValue: "Ensayos estándar con mayor volumen (Altura 26–35 mm)",
        },
        {
          leftParameter: "Tamaños grandes (8 – 11)",
          leftValue: "Alturas de 27,1 a 44 mm, según modelo",
          rightParameter: "Tamaños extra grandes (14)",
          rightValue:
            "Bloques de lingotes (Altura 70 mm, Base 88 mm)",
        },
        {
          leftParameter: "Empaque por cartón",
          leftValue: "12 a 1008 piezas según tamaño",
          rightParameter: "Distribución por pallet",
          rightValue: "48 a 75 cartones por pallet",
        },
      ],
      detailBlocks: [
        {
          title: "Dimensiones y Especificaciones por Modelo",
          tone: "blue",
          items: [
            "Modelo 2X: Altura 17mm | Diám. Ext. 24mm | Diám. Base 19mm | Diám. Copa 18mm | Prof. 8mm | Empaque 1008 pcs/ctn.",
            "Modelos 3 y 4A: Altura 20-22mm | Diám. Ext. 26-27mm | Diám. Copa 23-24mm | Prof. 5.5-6mm | Empaque 500 pcs/ctn.",
            "Modelos 4 y 5: Altura 22-26mm | Diám. Ext. 29-35mm | Diám. Copa 24-27mm | Prof. 6-8mm | Empaque 324-486 pcs/ctn.",
            "Serie 6A (26/29) y 7A/7AS: Altura 26-35mm | Diám. Ext. 40mm | Diám. Copa 31.2-32mm | Prof. 11.8-15mm | Empaque 200-300 pcs/ctn.",
            "Serie 8, 8A, 8AM, 8S: Altura 27.1-40mm | Diám. Ext. 44-45mm | Diám. Copa 33-38mm | Prof. 8.5-14mm | Empaque 200-240 pcs/ctn.",
            "Serie 9, 9A, 10, 11: Altura 30-44mm | Diám. Ext. 51-60mm | Diám. Copa 40-52.6mm | Prof. 11-15mm | Empaque 75-120 pcs/ctn.",
            "Modelo 14 (Extra Grande): Altura 70mm | Diám. Ext. 110mm | Diám. Base 88mm | Diám. Copa 80mm | Prof. 24mm | Empaque 12 pcs/ctn.",
          ],
        },
        {
          title: "Guía de Selección de Tamaños",
          tone: "yellow",
          items: [
            "Tamaños pequeños (2X-4A): alturas de 17 a 22 mm y diámetros exteriores de 24 a 29 mm.",
            "Tamaños medianos (5-7AS): alturas de 26 a 35 mm y diámetros exteriores de 35 a 40 mm.",
            "Tamaños grandes (8-11): alturas de 27,1 a 44 mm y diámetros exteriores de 44,3 a 60 mm.",
            "Tamaño 14: altura de 70 mm, diámetro exterior de 110 mm y diámetro de base de 88 mm.",
            "La variante 7AS-15 se especifica con 32 mm de altura, 32 mm de diámetro de copa y 15 mm de profundidad.",
          ],
        },
        {
          title: "Ventajas Operativas en Laboratorio",
          tone: "green",
          items: [
            "Resistencia mecánica robusta y comportamiento no afectado por cambios atmosféricos, según la ficha.",
            "La ficha indica tendencia reducida a la congelación del botón metálico en el fondo de la copa.",
            "La composición se describe como una mezcla de óxido de magnesio e ingredientes especiales de flux.",
            "El fabricante declara pruebas regulares de sus productos en su propio laboratorio de ensayo.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "Copelas",
      "Magnesia",
      "Fire Assay",
      "Ensayo al fuego",
      "Lingotes",
      "Minería",
      "Litargirio",
    ],
    relatedProducts: [
      "decent-dosificador-automatico-litargirio",
      "decent-cargador-electrico-crisoles",
      "decent-cargador-manual-crisoles",
    ],
  },
  {
    id: "decent-dosificador-automatico-litargirio",
    slug: "decent-dosificador-automatico-litargirio",
    name: "Dosificador de flux DAFS84",
    category: "Fire Assay",
    filters: [
      "Marcas",
      "Fire Assay",
      "Preparación de muestras",
      "Automatización",
      "Minería",
    ],
    description:
      "Sistema dispensador automático de flux para 84 crisoles simultáneos. Cuenta con un espacio de trabajo cerrado que ayuda a contener derrames de polvo y dos niveles de dosificación configurables.",
    features: [
      "Dispensado automatizado y simultáneo en 84 crisoles en una sola operación",
      "Gabinete de trabajo cerrado anti-polvo para máxima seguridad del operador",
      "Alimentación 230V monofásica, presión 0.5 MPa y volumen 145/175 mL por crisol",
    ],
    imageUrl:
      "/productos/decent/dosificador-automatico-litargirio/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "DAFS84",
      fullTitle:
        "Decent DAFS84 Sistema Dispensador Automático de Flux",
      subtitle:
        "Sistema de dosificación automatizada de flux para 84 crisoles simultáneos. Está indicado para la preparación de muestras de ensayo por fuego, con operación automatizada y espacio de trabajo cerrado.",
      highlights: [
        "Dispensado eficiente y simultáneo de flux en 84 crisoles en un solo ciclo",
        "Gabinete cerrado hermético que previene la exposición a polvos y derrames de reactivos",
        "Alimentación eléctrica 230V 50Hz, presión de trabajo 0.5 MPa y volumen 145/175 mL",
      ],
      advantages: [
        "Alta productividad: dispensa flux en 84 crisoles a la vez, multiplicando el rendimiento en lotes masivos de ensayo.",
        "El espacio de trabajo cerrado ayuda a prevenir derrames de polvo de flux en el laboratorio.",
        "Repetibilidad y trazabilidad: elimina las variaciones del dosificado manual, asegurando pesos y volúmenes consistentes de flux.",
        "Niveles de dosificación ajustables: dos niveles de dispensado (145 mL y 175 mL) con opción de calibración personalizada.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "DAFS84",
          rightParameter: "Capacidad total",
          rightValue: "84 crisoles simultáneamente",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "230V Monofásico, 50Hz",
          rightParameter: "Compatibilidad de crisol",
          rightValue: "Crisoles de 55g (Adaptable)",
        },
        {
          leftParameter: "Presión de trabajo externa",
          leftValue: "0.5 MPa",
          rightParameter: "Capacidad de dispensado",
          rightValue: "145 / 175 mL por crisol individual",
        },
        {
          leftParameter: "Tipo de operación",
          leftValue: "Automática con controlador simplificado",
          rightParameter: "Ambiente de trabajo",
          rightValue: "Espacio de trabajo cerrado para contener derrames de polvo",
        },
        {
          leftParameter: "Niveles de dispensado",
          leftValue: "2 niveles configurables y personalizables",
          rightParameter: "Construcción",
          rightValue: "Componentes de alta durabilidad para trabajo pesado",
        },
        {
          leftParameter: "Aplicación analítica",
          leftValue: "Preparación de flux en ensayo por fuego",
          rightParameter: "Mantenimiento",
          rightValue: "Mínimo con fácil acceso para limpieza",
        },
      ],
      detailBlocks: [
        {
          title: "Ventajas y Eficiencia Operativa",
          tone: "blue",
          items: [
            "Dispensado Eficiente: Dispensa fácilmente flux en 84 crisoles en una sola operación, aumentando sustancialmente la eficiencia del procesamiento de muestras.",
            "Operación Automatizada: Permite repetibilidad y trazabilidad rigurosa durante la preparación de muestras, mejorando la calidad y precisión del análisis.",
            "Control Simplificado: Controlador diseñado para simplicidad de manejo y fácil parametrización por parte del operador.",
            "Prevención de derrames: El espacio cerrado ayuda a contener el polvo durante el dispensado.",
            "Niveles Personalizables: Proporciona dos niveles de dispensado de flux (145/175 mL), adaptables según las necesidades de cada método analítico.",
          ],
        },
        {
          title: "Beneficios para el Laboratorio Minero",
          tone: "green",
          items: [
            "Reducción de errores: Minimiza drásticamente la intervención manual y la variabilidad humana.",
            "Consistencia de masa: Garantiza dispensado uniforme y homogéneo en los 84 crisoles de la bandeja.",
            "Durabilidad garantizada: Construido con materiales resistentes a la corrosión y desgaste mecánico.",
            "Espacio de trabajo cerrado: ayuda a contener el polvo de flux durante la operación.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DAFS84",
      "Flux",
      "Dispensador",
      "Fire Assay",
      "Automatización",
      "Minería",
    ],
    relatedProducts: [
      "decent-copelas-magnesio",
      "decent-cargador-electrico-crisoles",
      "decent-cargador-manual-crisoles",
      "decent-hornos-cupelacion",
      "decent-horno-copelacion-alta-temperatura",
    ],
  },
  {
    id: "decent-hornos-cupelacion",
    slug: "decent-hornos-cupelacion",
    name: "Horno de cupelación DE-50CF / DE-100CF / DE-168CF",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Hornos de copelación y mufla para ensayo por fuego con capacidad para 50, 100 y 168 copelas simultáneas. Equipados con elementos calefactores de carburo de silicio, control PID hasta 1200°C y puerta neumática con pedal.",
    features: [
      "Capacidad para 50, 100 y 168 copelas estándar (6A, 7A, 7AS)",
      "Temperatura máxima de 1200°C con elementos calefactores de carburo de silicio (SiC)",
      "Puerta neumática de elevación vertical con pedal y controlador PID Omron con termopar tipo K",
    ],
    imageUrl: "/productos/decent/hornos-cupelacion/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "DE-50CF / DE-100CF / DE-168CF",
      fullTitle:
        "Decent Hornos de Cupelación DE-50CF / DE-100CF / DE-168CF para Ensayo por Fuego",
      subtitle:
        "Hornos de mufla industriales diseñados para procesos continuos de copelación y ensayo por fuego de oro, plata y metales preciosos. Estructura robusta de acero al carbono de 2 mm, aislamiento térmico multicapa y puerta neumática ergonómica.",
      highlights: [
        "Capacidad estándar para 50, 100 y 168 copelas por lote de ensayo",
        "Controlador de temperatura PID Omron de alta precisión hasta 1200°C con termopar tipo K",
        "Puerta neumática de elevación vertical mediante pedal para acceso ergonómico sin esfuerzo",
      ],
      advantages: [
        "Calentamiento rápido y uniforme: elementos de carburo de silicio (SiC) de larga vida útil con distribución térmica homogénea en toda la cámara.",
        "Construcción robusta y segura: cuerpo en plancha de acero al carbono de 2 mm cortada por láser con pintura electrostática y protecciones electrónicas contra fugas.",
        "Aislamiento térmico de alta densidad: panel con algodón refractario de silicato de aluminio y ladrillos refractarios aislantes de alta pureza.",
        "Mantenimiento y recambio ágil: mufla y placas independientes para reemplazo rápido de consumibles refractarios sin desmontar la estructura.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos disponibles",
          leftValue: "DE-50CF, DE-100CF y DE-168CF",
          rightParameter: "Temperatura máxima nominal",
          rightValue: "1200 °C",
        },
        {
          leftParameter: "Capacidad de copelas",
          leftValue: "50 / 100 / 168 copelas (6A / 7A / 7AS)",
          rightParameter: "Elemento calefactor",
          rightValue: "Elementos de carburo de silicio (SiC)",
        },
        {
          leftParameter: "Cámara DE-50CF",
          leftValue: "250 × 450 × 145 mm (Mufla No. 4)",
          rightParameter: "Cámara DE-100CF",
          rightValue: "470 × 560 × 215 mm (Mufla No. 5)",
        },
        {
          leftParameter: "Cámara DE-168CF",
          leftValue: "670 × 650 × 255 mm (Mufla No. 8)",
          rightParameter: "Control de temperatura",
          rightValue: "PID automático Omron con termopar tipo K",
        },
        {
          leftParameter: "Transformador DE-50CF / DE-100CF",
          leftValue: "3 fases, 25 kVA / 40 kVA",
          rightParameter: "Transformador DE-168CF",
          rightValue: "Pendiente de confirmación técnica",
        },
        {
          leftParameter: "Presión neumática de puerta",
          leftValue: "0,4 – 0,5 MPa (compresor de aire)",
          rightParameter: "Potencia eléctrica",
          rightValue: "15–20 kW (DE-50CF) / 30–38 kW (DE-100CF)",
        },
        {
          leftParameter: "Dimensiones DE-50CF",
          leftValue: "1020 × 1170 × 1700 mm",
          rightParameter: "Dimensiones DE-100CF",
          rightValue: "1340 × 1340 × 1700 mm",
        },
      ],
      detailBlocks: [
        {
          title: "Especificaciones y Capacidades por Modelo",
          tone: "blue",
          items: [
            "DE-50CF: Mufla No. 4 (250×450×145 mm) | Capacidad: 50 copelas (6A/7A/7AS) | Transformador: 3 fases, 25 kVA | Potencia: 15-20 kW | Dimensiones: 1020×1170×1700 mm.",
            "DE-100CF: Mufla No. 5 (470×560×215 mm) | Capacidad: 100 copelas (6A/7A/7AS) | Transformador: 3 fases, 40 kVA | Potencia: 30-38 kW | Dimensiones: 1340×1340×1700 mm.",
            "DE-168CF: Mufla No. 8 (670×650×255 mm) | Capacidad: 168 copelas (6A/7A/7AS). La ficha técnica no especifica su potencia, transformador ni dimensiones exteriores.",
            "Accionamiento de puerta: Sistema neumático vertical operado por pedal con presión recomendada de 0.4 a 0.5 MPa.",
          ],
        },
        {
          title: "Control Térmico y Seguridad Operacional",
          tone: "yellow",
          items: [
            "Termopar tipo K de alta sensibilidad con control automático electrónico y salida de alarma de sobretemperatura.",
            "Controlador Omron de alta confiabilidad con display digital de temperatura de proceso y setpoint.",
            "Protección contra fugas eléctricas en todos los componentes y cuadros de potencia.",
            "Aislamiento multicapa con ladrillos refractarios y fibra de silicato de aluminio que minimiza la pérdida de calor y reduce la temperatura superficial.",
          ],
        },
        {
          title: "Configuración y requerimientos de operación",
          tone: "green",
          items: [
            "La apertura de puerta se describe como neumática; requiere aire comprimido recomendado entre 0,4 y 0,5 MPa.",
            "La ficha identifica una mufla independiente con revestimiento y elementos de calentamiento de carburo de silicio.",
            "La selección de modelo debe considerar capacidad de copelas, dimensiones de cámara, potencia y condiciones de instalación disponibles.",
            "Para el DE-168CF, el fabricante debe confirmar potencia, transformador y dimensiones exteriores antes de cotizar o instalar.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DE50CF",
      "DE100CF",
      "DE168CF",
      "Hornos",
      "Cupelación",
      "Mufla",
      "Fire Assay",
      "Ensayo al fuego",
      "Minería",
    ],
    relatedProducts: [
      "decent-horno-copelacion-alta-temperatura",
      "decent-copelas-magnesio",
      "decent-dosificador-automatico-litargirio",
      "decent-cargador-electrico-crisoles",
    ],
  },
  {
    id: "decent-horno-copelacion-alta-temperatura",
    slug: "decent-horno-copelacion-alta-temperatura",
    name: "Horno de cupelación DE-100CF-1500",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Horno de mufla de alta temperatura para copelación continua hasta 1500°C con capacidad para 100 copelas simultáneas. Elementos de silicio-molibdeno, ventana de observación refractaria anti-radiación y consola de control separada.",
    features: [
      "Capacidad para 100 copelas simultáneas (6A, 7A, 7AS)",
      "Temperatura máxima de 1500°C con elementos calefactores de silicio-molibdeno (MoSi2)",
      "Ventana de observación con vidrio resistente al fuego y consola de control táctil aislada",
    ],
    imageUrl:
      "/productos/decent/horno-copelacion-alta-temperatura/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DE-100CF-1500",
      fullTitle:
        "Decent Horno de Copelación de Alta Temperatura 1500°C para 100 Copelas",
      subtitle:
        "Horno de mufla de alta temperatura y gran capacidad con ventana de visualización protegida contra radiación y elementos calefactores de silicio-molibdeno. Alcanza 1500°C con panel de control táctil separado para máxima seguridad del operador.",
      highlights: [
        "Temperatura máxima regulable hasta 1500°C con calentamiento ultra-rápido por silicio-molibdeno",
        "Ventana de observación con vidrio ignífugo para inspección directa del proceso de copelación",
        "Panel de control táctil con instrumentos separados (voltímetro, amperímetro, temporizador, parada de emergencia)",
      ],
      advantages: [
        "Temperatura extrema hasta 1500°C: elementos calefactores de silicio-molibdeno de calidad superior para fundición y copelación de muestras refractarias y metales de alto punto de fusión.",
        "Ventana de observación segura: vidrio resistente al fuego que protege al personal de la radiación infrarroja mientras permite vigilar el brillo y copelación del botón de plomo.",
        "Consola de control independiente: el panel de control se sitúa alejado de la boca del horno para proteger al operador de las quemaduras térmicas y asegurar un monitoreo ergonómico.",
        "Sensor termopar tipo S: platino-rodio de máxima exactitud con alarma de alta temperatura y control de sobretemperatura integrado.",
      ],
      technicalParameters: [
        {
          leftParameter: "Temperatura máxima nominal",
          leftValue: "1500 °C",
          rightParameter: "Capacidad de copelas",
          rightValue: "100 × 6A / 7A / 7AS",
        },
        {
          leftParameter: "Elemento calefactor",
          leftValue: "Varillas de Silicio-Molibdeno (MoSi2)",
          rightParameter: "Sensor de temperatura",
          rightValue: "Termopar de Platino-Rodio Tipo S",
        },
        {
          leftParameter: "Dimensiones de mufla (WxDxH)",
          leftValue: "485 × 575 × 295 mm",
          rightParameter: "Dimensiones del horno (WxDxH)",
          rightValue: "1440 × 1635 × 2000 mm",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "600V Trifásico, 60Hz",
          rightParameter: "Potencia de entrada / Calefacción",
          rightValue: "25 kW / 19 kW nominal",
        },
        {
          leftParameter: "Corriente de entrada / Calefacción",
          leftValue: "31.4 A / 245 A nominal",
          rightParameter: "Dimensiones del transformador",
          rightValue: "1200 × 600 × 1300 mm",
        },
        {
          leftParameter: "Apertura de puerta",
          leftValue: "Neumática vertical con pedal (0.4–0.5 MPa)",
          rightParameter: "Ventana de inspección",
          rightValue: "Vidrio refractario anti-radiación térmica",
        },
        {
          leftParameter: "Consola de control",
          leftValue: "Pantalla táctil + Voltímetro, Amperímetro, Temporizador",
          rightParameter: "Construcción de chasis",
          rightValue: "Acero 2 mm cortado con láser y esmalte azul",
        },
      ],
      detailBlocks: [
        {
          title: "Componentes y Consola de Control",
          tone: "blue",
          items: [
            "① Voltímetro de red | ② Amperímetro de calefacción | ③ Temporizador digital de ciclo.",
            "④ Medidor y controlador de temperatura PID | ⑤ Interruptor general de alimentación.",
            "⑥ Interruptor de calefacción | ⑦ Luz indicadora de poder | ⑧ Luz indicadora de calefacción.",
            "⑨ Botón de parada de emergencia | ⑩ Pantalla táctil HMI para parametrización digital.",
            "Consola separada térmicamente del cuerpo del horno para evitar exposición a altas temperaturas.",
          ],
        },
        {
          title: "Ventajas y Eficiencia a 1500°C",
          tone: "yellow",
          items: [
            "Calentamiento de alta velocidad mediante elementos de silicio-molibdeno de larga vida útil.",
            "Ventana de visualización con vidrio resistente al fuego para monitoreo visual en tiempo real.",
            "Estructura en placa de acero de 2 mm con recubrimiento de esmalte azul horneado de alta durabilidad.",
            "Cámara revestida con ladrillos refractarios de alta pureza y aislamiento de fibra de silicato de aluminio.",
          ],
        },
        {
          title: "Opciones de Automatización y Seguridad",
          tone: "green",
          items: [
            "Integración con cargadores eléctricos y manuales Decent (DEPL/DMPL) para 84/100 posiciones.",
            "Conexión con depurador de gases ácidos y sistemas de neutralización de vapores de plomo.",
            "Enlace con horno de fusión de crisoles de 50 lugares para laboratorio integral de ensayo por fuego.",
            "Uso mandatorio de EPP: Gafas de seguridad, guantes y vestimenta aluminizada termoaislante.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DE-100CF-1500",
      "Alta Temperatura",
      "1500C",
      "Silicio Molibdeno",
      "MoSi2",
      "Cupelación",
      "Fire Assay",
      "Minería",
    ],
    relatedProducts: [
      "decent-hornos-cupelacion",
      "decent-hornos-fusion-ensayo-fuego",
      "decent-mezclador-crisoles",
      "decent-copelas-magnesio",
    ],
  },
  {
    id: "decent-hornos-fusion-ensayo-fuego",
    slug: "decent-hornos-fusion-ensayo-fuego",
    name: "Horno de fusión DE-20FF / DE-25FF",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Hornos de fusión de tamaño industrial para ensayo al fuego con capacidad para 20 a 42 crisoles por lote. Calentamiento por elementos de carburo de silicio hasta 1200°C, control de temperatura automático electrónico y puerta neumática de elevación vertical con pedal.",
    features: [
      "Capacidad para 20 a 42 crisoles simultáneos (30g, 40g, 50g, 55g, 65g)",
      "Temperatura de proceso hasta 1200°C con 12 elementos de carburo de silicio (SiC)",
      "Puerta neumática de elevación vertical con pedal y estructura en acero galvanizado de 2 mm",
    ],
    imageUrl: "/productos/decent/hornos-fusion-ensayo-fuego/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DE-20FF / DE-25FF",
      fullTitle:
        "Decent Hornos de Fusión para Ensayo de Fuego DE-20FF / DE-25FF",
      subtitle:
        "Hornos de fusión de grado industrial diseñados para fundir muestras de minerales triturados y pulverizados con flux en crisoles. Gran capacidad, control térmico estable hasta 1200°C y compatibilidad total con sistemas multipour y multiload.",
      highlights: [
        "Capacidad de 20 a 42 crisoles por lote de fusión (50/65g y 30/40/55g)",
        "Control automático electrónico con termopar tipo K de alta precisión hasta 1200°C",
        "Puerta neumática vertical mediante pedal (0.4–0.5 MPa) para máxima ergonomía y seguridad",
      ],
      advantages: [
        "Calentamiento rápido y homogéneo: 12 barras calefactoras de carburo de silicio (SiC) de alta durabilidad con distribución uniforme de calor en toda la cámara.",
        "Estructura reforzada y duradera: marco de acero galvanizado de 2 mm con acabado de pintura electrostática resistente a ambientes corrosivos de laboratorio.",
        "Aislamiento térmico de silicato de aluminio y alúmina: puerta y paredes con material refractario de alta densidad que reducen la pérdida de calor y la temperatura superficial.",
        "Mantenimiento y recambio modular: placa y mufla de horno independientes para reemplazo rápido de consumibles refractarios sin desmontar el chasis.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos disponibles",
          leftValue: "DE-20FF (Mufla No. 6) y DE-25FF (Mufla No. 7)",
          rightParameter: "Temperatura máxima nominal",
          rightValue: "1200 °C",
        },
        {
          leftParameter: "Capacidad DE-20FF",
          leftValue: "20× 50/65g o 30× 30/40/55g crisoles",
          rightParameter: "Capacidad DE-25FF",
          rightValue: "25× 50/65g o 42× 30/40/55g crisoles",
        },
        {
          leftParameter: "Área de trabajo DE-20FF",
          leftValue: "560 × 480 × 190 mm",
          rightParameter: "Área de trabajo DE-25FF",
          rightValue: "560 × 590 × 195 mm",
        },
        {
          leftParameter: "Elemento calefactor",
          leftValue: "12 piezas de Carburo de Silicio (SiC)",
          rightParameter: "Transformador eléctrico",
          rightValue: "3 fases, 20 kVA (DE-20FF) / 30 kVA (DE-25FF)",
        },
        {
          leftParameter: "Presión neumática recomendada",
          leftValue: "0.4 – 0.5 MPa (Compresor de aire)",
          rightParameter: "Potencia eléctrica",
          rightValue: "11–20 kW (DE-20FF) / 16–25 kW (DE-25FF)",
        },
        {
          leftParameter: "Sensor de temperatura",
          leftValue: "Termopar Tipo K con control automático",
          rightParameter: "Construcción exterior",
          rightValue: "Acero galvanizado 2 mm con pintura electrostática",
        },
        {
          leftParameter: "Dimensiones DE-20FF (WxDxH)",
          leftValue: "1210 × 975 × 1660 mm (Cerrado)",
          rightParameter: "Dimensiones DE-25FF (WxDxH)",
          rightValue: "1260 × 1000 × 1686 mm (Cerrado)",
        },
      ],
      detailBlocks: [
        {
          title: "Especificaciones y Capacidades por Modelo",
          tone: "blue",
          items: [
            "DE-20FF: Mufla No. 6 (560×480×190 mm) | Capacidad: 20 crisoles (50/65g) o 30 crisoles (30/40/55g) | Transformador: 3ph 20kVA | Potencia: 11-20 kW | Dimensiones: 1210×975×1660 mm.",
            "DE-25FF: Mufla No. 7 (560×590×195 mm) | Capacidad: 25 crisoles (50/65g) o 42 crisoles (30/40/55g) | Transformador: 3ph 30kVA | Potencia: 16-25 kW | Dimensiones: 1260×1000×1686 mm.",
            "Puerta neumática de elevación vertical: Accionamiento por pedal que requiere compresor de aire a 0.4-0.5 MPa.",
            "Dimensiones con puerta abierta: 1210×1100×1900 mm (DE-20FF) y 1260×1125×1925 mm (DE-25FF).",
          ],
        },
        {
          title: "Control Térmico y Aislamiento Refractario",
          tone: "yellow",
          items: [
            "Termopar tipo K de alta exactitud con microprocesador PID para control de temperatura automático hasta 1200°C.",
            "Aislamiento térmico superior: Paneles con algodón refractario de silicato de aluminio y ladrillos aislantes de alúmina de alta pureza.",
            "Protección contra fugas electrónicas integrada en todos los componentes de control y cuadro eléctrico.",
            "Placa y mufla independientes para facilitar el reemplazo rápido de consumibles refractarios.",
          ],
        },
        {
          title: "Integración y Equipamiento Opcional",
          tone: "green",
          items: [
            "Compatibilidad con sistemas de mezcla y carga múltiple (multipour y multiload).",
            "Conexión directa entre horno de fusión de crisoles de 25 posiciones y horno de copelación de 50 posiciones.",
            "Opciones complementarias: Sistema de eliminación de polvo de laboratorio y depurador de gases ácidos.",
            "Seguridad obligatoria: Uso mandatorio de gafas, ropa de aislamiento térmico aluminizada y guantes protectores.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DE20FF",
      "DE25FF",
      "Hornos de Fusión",
      "Crisoles",
      "Fusión",
      "Fire Assay",
      "Ensayo al fuego",
      "Minería",
    ],
    relatedProducts: [
      "decent-hornos-cupelacion",
      "decent-mezclador-crisoles",
      "decent-cargador-electrico-crisoles",
      "decent-copelas-magnesio",
    ],
  },
  {
    id: "decent-mezclador-crisoles",
    slug: "decent-mezclador-crisoles",
    name: "Mezclador DPT25 / DPT50 / DPT84",
    category: "Fire Assay",
    filters: [
      "Marcas",
      "Fire Assay",
      "Preparación de muestras",
      "Automatización",
      "Minería",
    ],
    description:
      "Mezclador rotativo de crisoles y flux (Crucible Tumbler) para 25, 50 y 84 crisoles simultáneos. Movimiento bidireccional de volteo, velocidad y tiempo ajustables por PLC hasta 60 rpm y campana de protección con sellado hermético anti-polvo.",
    features: [
      "Capacidad para 25, 50 y 84 crisoles simultáneos de 40g, 50g y 55g",
      "Rotación bidireccional hacia adelante y hacia atrás con velocidad regulable hasta 60 rpm",
      "Control PLC con tiempo programable hasta 60 min y compuerta neumática hermética (0.4–0.5 MPa)",
    ],
    imageUrl: "/productos/decent/mezclador-crisoles/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "DPT25 / DPT50 / DPT84",
      fullTitle: "Decent Mezclador de Crisoles y Flux DPT25 / DPT50 / DPT84",
      subtitle:
        "Sistema de homogeneización rotativa bidireccional para crisoles de ensayo al fuego. Garantiza una mezcla perfecta y uniforme de mineral triturado con flux, eliminando el error humano y acelerando los tiempos de preparación en lotes de hasta 84 crisoles.",
      highlights: [
        "Rotación bidireccional hacia adelante y atrás para homogeneización completa y sin grumos",
        "Velocidad ajustable hasta 60 rpm y tiempo programable hasta 60 minutos con control PLC",
        "Campana de protección con sellado hermético y accionamiento neumático de compuerta (0.4–0.5 MPa)",
      ],
      advantages: [
        "Homogeneización de lote garantizada: el volteo continuo y la inversión de marcha aseguran que todas las muestras del lote alcancen idéntica uniformidad.",
        "Ahorro sustancial de tiempo y mano de obra: automatiza el mezclado de hasta 84 crisoles en un solo ciclo, liberando a los ensayistas para otras labores analíticas.",
        "Controlador PLC intuitivo: pantalla y lógica programable para ajustar con exactitud la velocidad, sentido de giro y duración del ciclo según el tipo de matriz mineral.",
        "Ambiente de trabajo seguro y limpio: cámara cerrada con campana y sellado que confina el polvo de litargirio y reactivos químicos.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos disponibles",
          leftValue: "DPT25 (25 pcs), DPT50 (50 pcs) y DPT84 (84 pcs)",
          rightParameter: "Crisoles compatibles",
          rightValue: "40g, 50g y 55g (todos los modelos)",
        },
        {
          leftParameter: "Tiempo de configuración",
          leftValue: "Programable hasta 60 minutos (Control PLC)",
          rightParameter: "Velocidad de rotación",
          rightValue: "Ajustable hasta 60 rpm (Inversión bidireccional)",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "380V Trifásico, 50 Hz",
          rightParameter: "Potencia nominal",
          rightValue: "2.5 kW (DPT25 / DPT50) / 3.0 kW (DPT84)",
        },
        {
          leftParameter: "Presión neumática requerida",
          leftValue: "0.4 – 0.5 MPa (Compuerta neumática)",
          rightParameter: "Tipo de control",
          rightValue: "Sistema PLC para operación automática",
        },
        {
          leftParameter: "Dimensiones DPT25 (LxHxD)",
          leftValue: "1650 × 1230 × 1105 mm (Laboratorios compactos)",
          rightParameter: "Dimensiones DPT50 (LxHxD)",
          rightValue: "1695 × 1130 × 1235 mm (Capacidad media)",
        },
        {
          leftParameter: "Dimensiones DPT84 (LxHxD)",
          leftValue: "2600 × 1270 × 1250 mm (Alto volumen)",
          rightParameter: "Compatibilidad",
          rightValue: "Sistemas multipuerto, multiload y hornos de fusión",
        },
      ],
      detailBlocks: [
        {
          title: "Comparación de Modelos y Capacidades",
          tone: "blue",
          items: [
            "DPT25: Capacidad de 25 crisoles (40g/50g/55g) | Potencia: 2.5 kW | Dimensiones: 1650×1230×1105 mm | Ideal para laboratorios con espacio optimizado.",
            "DPT50: Capacidad de 50 crisoles (40g/50g/55g) | Potencia: 2.5 kW | Dimensiones: 1695×1130×1235 mm | Equilibrio óptimo entre capacidad y huella en planta.",
            "DPT84: Capacidad de 84 crisoles (40g/50g/55g) | Potencia: 3.0 kW | Dimensiones: 2600×1270×1250 mm | Máxima productividad para operaciones mineras a gran escala.",
            "Alimentación: 380V trifásico, 50 Hz con motorreductor de servicio continuo y alta eficiencia energética.",
          ],
        },
        {
          title: "Protocolo de Mezclado en 5 Pasos",
          tone: "yellow",
          items: [
            "Paso 1: Dosificar las muestras de mineral y reactivos de flux en los crisoles.",
            "Paso 2: Colocar la bandeja con los crisoles en el bastidor del mezclador.",
            "Paso 3: Cerrar la tapa de sellado hermético y la campana de protección neumática.",
            "Paso 4: Configurar tiempo (hasta 60 min) y velocidad (hasta 60 rpm) en el panel PLC.",
            "Paso 5: Iniciar el ciclo de rotación bidireccional para obtener una mezcla homogénea libre de segregación.",
          ],
        },
        {
          title: "Beneficios para el Laboratorio Metalúrgico",
          tone: "green",
          items: [
            "Consistencia total: Garantiza homogeneización uniforme en todos los lotes de ensayo.",
            "Ergonomía y seguridad: Elimina el esfuerzo repetitivo y minimiza la exposición al polvo químico.",
            "Precisión analítica: Suprime las variaciones asociadas al mezclado manual de crisol por crisol.",
            "Compatibilidad total con sistemas multiload y hornos de fusión DE20FF / DE25FF.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DPT25",
      "DPT50",
      "DPT84",
      "Crucible Tumbler",
      "Mezclador",
      "Flux",
      "Fire Assay",
      "Minería",
    ],
    relatedProducts: [
      "decent-molino-pulverizador-dp1000",
      "decent-hornos-fusion-ensayo-fuego",
      "decent-hornos-cupelacion",
      "decent-dosificador-automatico-litargirio",
    ],
  },
  {
    id: "decent-molino-pulverizador-dp1000",
    slug: "decent-molino-pulverizador-dp1000",
    name: "Molino DP1000",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Molino pulverizador de laboratorio para preparar muestras de minerales, ferroaleaciones, cerámicas, suelos, agregados y productos químicos. Procesa alimentación de hasta 20 mm y alcanza 95% de material bajo 75 µm en 3 minutos.",
    features: [
      "Molienda fina de alta velocidad: 95% < 75 µm en solo 3 minutos",
      "Capacidad por lote de 40 g a 1600 g y tazones documentados entre 50 cc y 5000 cc, según configuración",
      "Bloqueo de seguridad de tapa con retardo, parada de emergencia y sujeción manual rápida",
    ],
    imageUrl: "/productos/decent/molino-pulverizador-dp1000/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DP1000",
      fullTitle:
        "Decent Molino Pulverizador de Laboratorio DP1000 para Muestras Minerales",
      subtitle:
        "Molino pulverizador de alta potencia con accionamiento por masas excéntricas para reducción ultrafina y homogénea de muestras minerales, ferroaleaciones, cerámicas, suelos y agregados geológicos.",
      highlights: [
        "Finura de molienda del 95% pasando malla de 75 micrones (< 75 µm) en 3 minutos",
        "Rango de carga de 40 g a 1600 g con tazones en acero estándar, acero cromado y carburo de tungsteno",
        "Gabinete insonorizado libre de polvo con interruptor de seguridad de tapa y parada de emergencia",
      ],
      advantages: [
        "Molienda mediante masas excéntricas: el movimiento circular horizontal reduce el material a polvo fino y uniforme. La ficha técnica indica operación libre de polvo y cero pérdida de muestra.",
        "Seguridad operacional total: interruptor de enclavamiento que impide el arranque con tapa abierta y retardo temporal que bloquea la apertura hasta la detención total del motor.",
        "Sujeción mediante abrazadera manual o neumática, según configuración del equipo.",
        "Versatilidad de recipientes: la ficha técnica documenta tazones de 50 cc a 5000 cc. Los materiales informados incluyen acero estándar, acero cromado y carburo de tungsteno.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "DP1000",
          rightParameter: "Capacidad de molienda por lote",
          rightValue:
            "40 g a 1600 g; la tabla resumen también registra 40 g a 800 g",
        },
        {
          leftParameter: "Tamaño de alimentación",
          leftValue: "≤ 20 mm máximo",
          rightParameter: "Finura de salida",
          rightValue: "95% < 75 µm en 3 minutos",
        },
        {
          leftParameter: "Tazones compatibles",
          leftValue:
            "50cc, 100cc, 125cc, 300cc, 400cc, 800cc, 1000cc, 2000cc y 5000cc",
          rightParameter: "Materiales de tazón",
          rightValue: "Acero estándar, acero cromado y carburo de tungsteno",
        },
        {
          leftParameter: "Potencia del motor",
          leftValue: "2.2 kW de alto torque",
          rightParameter: "Alimentación eléctrica",
          rightValue: "380–415V Trifásico, 50 Hz",
        },
        {
          leftParameter: "Temporizador digital",
          leftValue: "Ajustable de 1 segundo a 99 horas",
          rightParameter: "Requisitos de aire comprimido",
          rightValue: "500 a 600 kPa (Flujo máx. 1 L/min)",
        },
        {
          leftParameter: "Sistemas de seguridad",
          leftValue: "Bloqueo de tapa con retardo y parada de emergencia",
          rightParameter: "Gabinete exterior",
          rightValue: "Insonorizado con junta de goma anti-polvo",
        },
        {
          leftParameter: "Dimensiones del equipo (L×H×W)",
          leftValue: "1050 × 1250 × 725 mm",
          rightParameter: "Peso neto",
          rightValue: "360 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Capacidades y Gama de Tazones de Molienda",
          tone: "blue",
          items: [
            "La ficha técnica documenta opciones de 50 cc, 100 cc, 125 cc, 300 cc, 400 cc, 800 cc, 1000 cc, 2000 cc y 5000 cc.",
            "La descripción técnica también enumera configuraciones de 125 cc a 1000 cc y de 300 cc a 2000 cc; confirme la combinación disponible al cotizar.",
            "Materiales de tazón informados: acero estándar, acero cromado y carburo de tungsteno.",
            "La capacidad de molienda indicada varía entre 40 g y 1600 g según la configuración de tazón.",
          ],
        },
        {
          title: "Seguridad, Control y Ergonomía",
          tone: "yellow",
          items: [
            "Interruptor de seguridad de bloqueo de tapa que impide el encendido si la máquina no está totalmente cerrada.",
            "Retardo de tiempo de seguridad que bloquea la apertura de la cámara hasta que el cabezal se haya detenido al 100%.",
            "Pulsador de parada de emergencia frontal para detención instantánea ante cualquier anomalía.",
            "Sistema de abrazadera disponible en modalidad manual o neumática, según configuración.",
            "Panel frontal desmontable y junta de goma en el gabinete para operación libre de polvo.",
            "La ficha técnica menciona un Bowl Jack neumático como opción de elevación para tazones.",
          ],
        },
        {
          title: "Campos de Aplicación y Compatibilidad",
          tone: "green",
          items: [
            "Menas, minerales y ferroaleaciones.",
            "Cerámicas, suelos y agregados.",
            "Productos químicos y otras partículas similares descritas por el fabricante.",
            "Preparación de muestras para laboratorios que requieren molienda fina antes de análisis posteriores.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DP1000",
      "Molino Pulverizador",
      "Molienda",
      "Tazón",
      "Carburo de Tungsteno",
      "Preparación de muestras",
      "Fire Assay",
      "Minería",
    ],
    relatedProducts: [
      "decent-mezclador-crisoles",
      "decent-hornos-fusion-ensayo-fuego",
      "decent-hornos-cupelacion",
      "decent-copelas-magnesio",
    ],
  },
  {
    id: "decent-drsd05",
    slug: "decent-drsd05",
    name: "Divisor giratorio DRSD05",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Divisor rotatorio de sobremesa para obtener diez submuestras representativas a partir de una alimentación continua. Integra tolva de acero inoxidable, alimentador vibratorio y baldes extraíbles para laboratorios de investigación, muestreo minero, puertos y operaciones industriales.",
    features: [
      "Divide una muestra de prueba en 10 partes representativas con relación 1/10",
      "Tolva de 5 L y diez baldes extraíbles de 6 L para procesar hasta 60 L por ciclo",
      "Alimentador vibratorio y velocidad de rotación ajustable de 6 a 60 rpm",
    ],
    imageUrl: "/productos/decent/drsd05/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DRSD05",
      fullTitle: "Decent DRSD05 Divisor de Muestras Giratorio de Sobremesa",
      subtitle:
        "Equipo de división rotatoria para preparar submuestras uniformes en laboratorios de investigación, muestreo de minas, puertos y otras operaciones industriales que requieren una muestra representativa.",
      highlights: [
        "División de una alimentación continua en diez partes iguales con relación 1/10",
        "Tolva de 5 L, baldes de 6 L y capacidad de hasta 60 L por ciclo",
        "Construcción orientada a una operación simple, limpieza rápida y prevención de contaminación de muestra",
      ],
      advantages: [
        "La tolva de acero inoxidable, el alimentador vibratorio y los baldes trabajan como un sistema de división simple para laboratorio.",
        "La rotación constante de los recipientes mejora la uniformidad de la reducción de la muestra.",
        "Los diez baldes se retiran individualmente para facilitar la manipulación y la limpieza.",
        "La operación está pensada para lotes continuos y grandes volúmenes de muestra.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "DRSD05",
          rightParameter: "Relación de división",
          rightValue: "1/10",
        },
        {
          leftParameter: "Cantidad de baldes",
          leftValue: "10 unidades",
          rightParameter: "Capacidad por balde",
          rightValue: "6 L por unidad",
        },
        {
          leftParameter: "Capacidad de la tolva",
          leftValue: "5 L",
          rightParameter: "Capacidad total por ciclo",
          rightValue: "Hasta 60 L",
        },
        {
          leftParameter: "Granularidad de división",
          leftValue: "3 a 13 mm",
          rightParameter: "Velocidad de rotación",
          rightValue: "6 a 60 rpm",
        },
        {
          leftParameter: "Potencia",
          leftValue:
            "Pendiente de confirmación técnica: 1,1 kW en Descripcion.txt; 1,2 kW en Ficha Tecnica.jpg",
          rightParameter: "Alimentación eléctrica",
          rightValue: "220 V / 50 Hz / monofásico",
        },
        {
          leftParameter: "Dimensiones globales",
          leftValue: "700 × 410 × 740 mm",
          rightParameter: "Elementos principales",
          rightValue:
            "Tolva de acero inoxidable, alimentador vibratorio y baldes",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Operación y diseño de la división",
          items: [
            "La alimentación se realiza mediante una tolva de acero inoxidable y un alimentador vibratorio; el sistema divide la muestra en diez partes iguales.",
            "Las velocidades de rotación constantes de los recipientes contribuyen a obtener resultados uniformes en la reducción de muestras.",
            "El equipo está concebido para una operación simple, limpieza fácil y prevención de contaminación de la muestra.",
            "La documentación presenta dos potencias para el DRSD05: 1,1 kW en Descripcion.txt y 1,2 kW en Ficha Tecnica.jpg. La potencia final debe confirmarse con el fabricante antes de cotizar o instalar.",
          ],
        },
        {
          title: "Ámbitos de uso indicados",
          items: [
            "Laboratorios de investigación, laboratorios de muestreo de minas, puertos y otros entornos industriales que requieren submuestreo representativo.",
            "Procesamiento continuo de grandes volúmenes de muestra con baldes extraíbles de 6 L.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DRSD05",
      "Divisor de muestras",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-drsd40",
      "decent-trituradora-martillo",
      "decent-molino-pulverizador-dp1000",
    ],
  },
  {
    id: "decent-drsd40",
    slug: "decent-drsd40",
    name: "Divisor rotativo DRSD40",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Divisor rotatorio de piso para dividir muestras a granel en submuestras representativas. El modelo DRSD40 incorpora cubetas segmentales, control de velocidad por frecuencia variable, componentes de contacto en acero inoxidable SUS304 y conexión para extracción de polvo.",
    features: [
      "División de muestras a granel con representatividad declarada superior al 99%",
      "Configuración de 6, 8 o 10 cubetas de 40 L y tolva de entrada de 20 L",
      "Sistema sellado con puerto de extracción de polvo e interruptor de seguridad de tapa",
    ],
    imageUrl: "/productos/decent/drsd40/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DRSD40",
      fullTitle: "Decent DRSD40 Divisor Rotativo de Muestras Tipo Piso",
      subtitle:
        "Sistema de división para muestras de laboratorio a granel, con alimentación continua, cubetas segmentales rotatorias y configuración de frecuencia variable para obtener partes representativas en operaciones de minería, control de calidad e investigación.",
      highlights: [
        "División rotatoria de alimentación continua en segmentos iguales con representatividad declarada superior al 99%",
        "Configuración de 6, 8 o 10 cubetas de 40 L; tolva de entrada de 20 L",
        "Contacto con muestra en acero inoxidable SUS304, sistema sellado y puerto para extracción de polvo",
      ],
      advantages: [
        "La muestra fluye a velocidad controlada y se divide por la acción de cubetas segmentales que rotan bajo la alimentación.",
        "El panel permite ajustar frecuencia y velocidad de rotación; el accionamiento utiliza motorreductor y control de frecuencia variable.",
        "La tapa incorpora un interruptor de seguridad que evita la operación cuando está abierta.",
        "Las cubetas tienen manijas para retiro y la mesa giratoria puede llevar cada cubeta al frente de la unidad.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "DRSD40",
          rightParameter: "Configuración de cubetas",
          rightValue: "6, 8 o 10 cubetas",
        },
        {
          leftParameter: "Volumen por cubeta",
          leftValue: "40 L",
          rightParameter: "Capacidad de tolva de entrada",
          rightValue: "20 L",
        },
        {
          leftParameter: "Potencia",
          leftValue: "1,5 kW",
          rightParameter: "Dimensiones",
          rightValue: "1155 × 555 × 1125 mm",
        },
        {
          leftParameter: "Partes en contacto con muestra",
          leftValue: "Acero inoxidable SUS304",
          rightParameter: "Control",
          rightValue: "Panel digital, frecuencia y velocidad variables",
        },
        {
          leftParameter: "Seguridad",
          leftValue: "Interruptor de tapa y operación con unidad cerrada",
          rightParameter: "Control de polvo",
          rightValue: "Unidad sellada con puerto de extracción",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue:
            "Requiere confirmación: 380 V / 50 Hz / trifásico en Ficha Técnica.xlsx; 220 V / 50 Hz en Descripción.txt",
          rightParameter: "Representatividad declarada",
          rightValue: "Superior al 99%",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Configuración y operación",
          items: [
            "El sistema admite alimentación continua, ajuste de frecuencia rotatoria y velocidad de cubetas. La vibración de alimentación también se describe como ajustable.",
            "La secuencia descrita contempla cargar la tolva, configurar los parámetros, verificar que la tapa esté cerrada, iniciar el control de frecuencia variable y retirar las submuestras desde las cubetas individuales.",
            "La ficha adjunta menciona una ventana de inspección, tolva desmontable y bloqueos de seguridad.",
          ],
        },
        {
          title: "Nota técnica para cotización",
          items: [
            "La documentación disponible presenta dos valores de alimentación para el DRSD40: 380 V / 50 Hz / trifásico en la matriz Ficha Tecnica.xlsx y 220 V / 50 Hz en Descripción.txt. Del Carpio debe confirmar la configuración final con el fabricante antes de cotizar o instalar.",
          ],
        },
        {
          title: "Aplicaciones indicadas",
          items: [
            "Muestreo minero, control de calidad e investigación, según los ámbitos señalados en la descripción proporcionada.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DRSD40",
      "Divisor rotativo",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-drsd05",
      "decent-trituradora-martillo",
      "decent-molino-pulverizador-dp1000",
    ],
  },
  {
    id: "decent-trituradora-martillo",
    slug: "decent-trituradora-martillo",
    name: "Trituradora de martillo de laboratorio",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Trituradora de martillos de laboratorio para reducción de muestras de mineral. La cabeza de martillo de ancho completo impacta, corta y rasga el material hasta que atraviesa la placa de tamiz enchufable, dentro de un gabinete sellado para operación libre de polvo.",
    features: [
      "Cabeza de martillo de ancho completo para impactar, cortar y rasgar la muestra mineral",
      "Placa de tamiz enchufable para definir la salida y facilitar limpieza y mantenimiento",
      "Cavidad de trituración soldada y gabinete sellado para operación segura y libre de polvo",
    ],
    imageUrl: "/productos/decent/trituradora-martillo/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "Trituradora de martillo",
      fullTitle: "Decent Trituradora de Martillo de Laboratorio",
      subtitle:
        "Equipo de trituración sellado para muestras de mineral. Su rotor accionado por motor y cabezas de martillo de ancho completo reducen el material hasta el tamaño definido por la placa de tamiz enchufable.",
      highlights: [
        "Trituración por impacto, corte y desgarro mediante cabeza de martillo de ancho completo",
        "Placa de tamiz enchufable para controlar la salida y simplificar la limpieza",
        "Gabinete completamente sellado para una operación segura y libre de polvo",
      ],
      advantages: [
        "La cavidad de trituración de acero soldado se describe como una solución para evitar grietas y retención de material.",
        "Las cabezas de martillo de ancho completo reducen riesgos de bloqueo de la cavidad de trabajo y retención de muestra.",
        "El diseño indicado permite triturar muestras de alta humedad sin pérdida de humedad, con rendimiento uniforme.",
        "El equipo incorpora ruedas para traslado y placas de tamiz enchufables para facilitar la limpieza y el mantenimiento.",
      ],
      technicalParameters: [
        {
          leftParameter: "Principio de trituración",
          leftValue:
            "Impacto, corte y desgarro mediante rotor y cabezas de martillo de ancho completo",
          rightParameter: "Clasificación de salida",
          rightValue: "Placa de tamiz enchufable",
        },
        {
          leftParameter: "Cavidad de trituración",
          leftValue: "Acero soldado",
          rightParameter: "Gabinete",
          rightValue: "Completamente sellado",
        },
        {
          leftParameter: "Operación",
          leftValue: "Segura y libre de polvo, según descripción adjunta",
          rightParameter: "Muestras con humedad",
          rightValue: "Trituración indicada sin pérdida de humedad",
        },
        {
          leftParameter: "Mantenimiento",
          leftValue:
            "Placas de tamiz enchufables para limpieza y mantenimiento",
          rightParameter: "Movilidad",
          rightValue: "Ruedas para traslado",
        },
        {
          leftParameter: "Opción indicada",
          leftValue: "Divisor de muestras incorporado opcional",
          rightParameter: "Nivel de ruido",
          rightValue: "Bajo, según descripción adjunta",
        },
        {
          leftParameter: "Datos dimensionales y eléctricos",
          leftValue: "No incluidos en los archivos disponibles",
          rightParameter: "Ficha técnica",
          rightValue: "En preparación",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Proceso de trituración descrito",
          items: [
            "El motor impulsa el rotor a alta velocidad; la cabeza de martillo impacta, corta y rasga la muestra de mineral que entra a la cavidad.",
            "El material mayor que el tamaño de malla queda retenido en la placa de tamiz y continúa siendo impactado hasta pasar por ella.",
            "La descripción suministrada indica desempeño uniforme, alta eficiencia y bajo ruido.",
          ],
        },
        {
          title: "Diseño y mantenimiento",
          items: [
            "La cavidad soldada está indicada para evitar grietas y problemas de retención de material.",
            "El gabinete sellado y las placas de tamiz enchufables facilitan una operación segura, la limpieza y el mantenimiento.",
            "La fuente menciona un divisor de muestras incorporado como opción; la configuración debe confirmarse al cotizar.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/decent/trituradora-martillo/Imagen para la Descripcion.png",
        alt: "Imagen complementaria proporcionada para la descripción de la trituradora de martillo Decent",
        caption:
          "La imagen complementa el proceso descrito: la muestra continúa reduciéndose hasta pasar por la placa de tamiz enchufable.",
      },
    },
    tags: [
      "Decent",
      "Trituradora de martillo",
      "Trituración",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-drsd05",
      "decent-drsd40",
      "decent-molino-pulverizador-dp1000",
    ],
  },
  {
    id: "decent-rodillo-botella",
    slug: "decent-rodillo-botella",
    name: "Rodillo DHT / DBR",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Rodillo de botellas de servicio continuo para mezcla rotativa de muestras líquidas o materiales fluidos. La serie utiliza un controlador de velocidad variable y rodillos de goma para mezclar el contenido de botellas plásticas o de acero inoxidable en condiciones de trabajo continuas.",
    features: [
      "Control de velocidad variable con motor WEG y variador para operación, detención y giro inverso",
      "Rodillos con superficie de goma para reducir el ruido durante la mezcla continua",
      "Configuraciones de 3 o 5 rodillos para botellas de 300, 500, 1000 o 1500 mm",
    ],
    imageUrl: "/productos/decent/rodillo-botella/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "Serie DHT / DBR",
      fullTitle: "Decent Rodillo de Botellas de Operación Continua",
      subtitle:
        "Equipo para mezclar continuamente muestras líquidas o materiales fluidos mediante el giro controlado de botellas. La documentación disponible lo indica para lixiviación por lotes y molienda o mezcla húmeda o seca de minerales y partículas.",
      highlights: [
        "Rodillos de goma para mezcla rotativa continua con menor ruido de operación",
        "Variador con funciones RUN, STOP y REV para ajustar velocidad e invertir el giro",
        "Opciones de 3 o 5 rodillos para botellas de 300 a 1500 mm",
      ],
      advantages: [
        "El sistema sitúa la botella de muestra entre el rodillo motriz y el rodillo conducido para mantener una mezcla rotativa continua.",
        "La superficie de goma de los rodillos está indicada para disminuir el ruido durante el funcionamiento.",
        "El variador permite iniciar, detener, ajustar la velocidad e invertir el sentido de giro según la operación descrita.",
        "La documentación lo presenta como una solución económica y flexible, con tamaños de equipo ajustables.",
      ],
      technicalParameters: [
        {
          leftParameter: "Serie indicada",
          leftValue: "DHT / DBR (confirmar nomenclatura al cotizar)",
          rightParameter: "Cantidad de rodillos",
          rightValue: "3 o 5",
        },
        {
          leftParameter: "Longitud de botella",
          leftValue: "300, 500, 1000 o 1500 mm según modelo",
          rightParameter: "Control",
          rightValue: "Velocidad variable; RUN, STOP y REV",
        },
        {
          leftParameter: "Accionamiento",
          leftValue: "Motor WEG y variador de velocidad",
          rightParameter: "Superficie de rodillos",
          rightValue: "Goma, para reducción de ruido",
        },
        {
          leftParameter: "Alimentación declarada",
          leftValue: "380 V / 50 Hz / trifásica",
          rightParameter: "Uso indicado",
          rightValue:
            "Mezcla rotativa continua de muestras o materiales fluidos",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Configuraciones disponibles según la documentación",
          items: [
            "DHT / DBR-3A-300: 500 W, 3 rodillos, botella de 300 mm, velocidad variable.",
            "DHT / DBR-5A-300: 1000 W, 5 rodillos, botella de 300 mm, velocidad variable.",
            "DHT / DBR-3A-500: 750 W, 3 rodillos, botella de 500 mm, velocidad variable.",
            "DHT / DBR-5A-500: 1500 W, 5 rodillos, botella de 500 mm, velocidad variable.",
            "DHT / DBR-3A-1000: 2200 W, 3 rodillos, botella de 1000 mm, velocidad variable.",
            "DHT / DBR-5A-1000: 3000 W, 5 rodillos, botella de 1000 mm, velocidad variable.",
            "DHT / DBR-3A-1500: 3000 W, 3 rodillos, botella de 1500 mm, velocidad variable.",
            "DHT / DBR-5A-1500: 3000 W, 5 rodillos, botella de 1500 mm, velocidad variable.",
          ],
        },
        {
          title: "Operación y verificación previa",
          items: [
            "Antes de la primera operación, la descripción indica verificar que el reductor tenga el aceite correcto.",
            "Para mezcla normal, la botella se coloca entre el rodillo motriz y el conducido; RUN inicia el variador, el mando ajusta la velocidad y STOP detiene la operación.",
            "Para invertir el giro, la secuencia documentada utiliza REV y luego RUN antes de ajustar la velocidad.",
          ],
        },
        {
          title: "Nota de nomenclatura para cotización",
          items: [
            "Descripción.txt identifica los modelos con la serie DHT, mientras que Ficha Tecnica.jpg utiliza la sigla DBR para la misma matriz de configuraciones. Del Carpio debe confirmar la nomenclatura comercial final antes de cotizar.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "Rodillo de botella",
      "DHT",
      "DBR",
      "Mezcla rotativa",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-drsd05",
      "decent-drsd40",
      "decent-trituradora-martillo",
    ],
  },
  {
    id: "decent-dsw350",
    slug: "decent-dsw350",
    name: "Estación DSW350",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Estación de trabajo autónoma para laboratorios de muestreo minero. Su sistema integrado de ventilación colecta partículas de polvo generadas en la mesa de trabajo, filtra el aire y dispone de cajones de almacenamiento y recolección de polvo.",
    features: [
      "Colector autónomo integrado para polvo, humo y vapores generados en la estación",
      "Mesa de acero inoxidable extraíble y tres cajones de almacenamiento",
      "Limpieza por pulso de microondas indicada para el filtro cuando se encuentra cargado",
    ],
    imageUrl: "/productos/decent/dsw350/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DSW350",
      fullTitle: "Decent Estación de Trabajo Autónoma DSW350",
      subtitle:
        "Estación de trabajo con extracción integrada para laboratorios de muestreo minero. Recoge partículas de polvo en el área de operación para ayudar a proteger el ambiente de laboratorio y al personal.",
      highlights: [
        "Caudal de aire declarado de 3500 a 4600 m³/h y presión de viento de 1300 a 1470 Pa",
        "Mesa de acero inoxidable extraíble, cajones de almacenamiento y cajón de recolección de polvo",
        "Sistema autónomo de ventilación y limpieza por pulso para la red de recolección de polvo",
      ],
      advantages: [
        "El sistema incorpora ventilación y filtración para capturar polvo, humo y vapores en la estación y devolver aire filtrado al área de trabajo.",
        "La mesa de acero inoxidable removible se describe como resistente al desgaste y la corrosión, y de limpieza o reemplazo sencillo.",
        "La unidad cuenta con tres cajones de almacenamiento y un cajón destinado a la recolección de polvo.",
        "La ficha técnica indica un diseño listo para conectar y operar, con velocidad de aire declarada de hasta 1,5 m/s.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo",
          leftValue: "DSW350",
          rightParameter: "Potencia",
          rightValue: "2200 W",
        },
        {
          leftParameter: "Alimentación declarada",
          leftValue: "380 V / 50 Hz; ajustable según requerimiento del cliente",
          rightParameter: "Caudal de aire",
          rightValue: "3500 a 4600 m³/h",
        },
        {
          leftParameter: "Presión de viento",
          leftValue: "1300 a 1470 Pa",
          rightParameter: "Velocidad de aire indicada",
          rightValue: "Hasta 1,5 m/s",
        },
        {
          leftParameter: "Dimensiones de mesa",
          leftValue: "1800 × 600 mm",
          rightParameter: "Dimensiones del equipo",
          rightValue: "1800 × 760 × 1650 mm",
        },
        {
          leftParameter: "Superficie de trabajo",
          leftValue: "Lámina de acero inoxidable extraíble",
          rightParameter: "Almacenamiento",
          rightValue: "3 cajones",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Elementos identificados en la imagen descriptiva",
          items: [
            "Deflector de polvo, puerto de recolección de polvo, panel de control y cartucho de filtro.",
            "Hoja de mesa de acero inoxidable extraíble, cajones de almacenamiento y cajón de recolección de polvo.",
          ],
        },
        {
          title: "Operación y mantenimiento descritos",
          items: [
            "El colector integra una función de limpieza por pulso para retirar el polvo de la red de recolección hacia el cajón cuando el filtro se carga.",
            "La cubierta de acero inoxidable de la mesa se especifica como desmontable para facilitar la limpieza o el reemplazo.",
            "La documentación identifica la estación como apta para capturar y filtrar polvo, humo y vapores de la superficie de trabajo.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/decent/dsw350/Imagen para la Descripcion.webp",
        alt: "Componentes identificados de la estación de trabajo autónoma Decent DSW350",
        caption:
          "La imagen proporcionada identifica los componentes descritos: deflector, superficie removible, filtración, cajones y sistema de recolección de polvo.",
      },
    },
    tags: [
      "Decent",
      "DSW350",
      "Estación de trabajo",
      "Extracción de polvo",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-drsd40",
      "decent-trituradora-martillo",
      "decent-rodillo-botella",
    ],
  },
  {
    id: "decent-mezclador-tipo-v",
    slug: "decent-mezclador-tipo-v",
    name: "Mezclador tipo V DVM",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras"],
    description:
      "Mezclador tipo V para polvos secos y materiales granulares. Está indicado en minería, farmacia, industria química y alimentos; el barril en V mezcla los materiales mediante movimiento rotativo en distintas direcciones.",
    features: [
      "Barril tipo V para mezcla de polvos secos y materiales granulares",
      "Construcción en acero inoxidable 304-2B y válvula de descarga con sello de caucho de silicona",
      "Modelos de 50 a 300 L, con capacidades de trabajo de 20 a 150 L",
    ],
    imageUrl: "/productos/decent/mezclador-tipo-v/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "Serie DVM",
      fullTitle: "Decent Mezclador Tipo V para Polvos y Granulados",
      subtitle:
        "Equipo de mezcla para polvos secos y materiales granulares. Su barril tipo V impulsa el flujo del material en distintas direcciones para obtener una mezcla uniforme en aplicaciones de minería, farmacia, química y alimentos.",
      highlights: [
        "Configuraciones DVM de 50 a 300 L con volumen de trabajo de 20 a 150 L",
        "Cuerpo de 2,5 mm y exterior de 1,2 mm en acero inoxidable 304-2B",
        "Válvula de descarga de acero inoxidable con sello de caucho de silicona moldeado",
      ],
      advantages: [
        "El diseño de barril tipo V se describe como simple de operar, de alta eficiencia y sin acumulación de material.",
        "Las superficies exteriores y de contacto están fabricadas en acero inoxidable de alta calidad para facilitar la limpieza.",
        "La documentación distingue una versión de alta eficiencia para polvos más finos o componentes minoritarios y una versión normal para mezcla general o mayor producción.",
        "Las placas de guía de acero inoxidable y las uniones soldadas pulidas se indican sin esquinas muertas.",
      ],
      technicalParameters: [
        {
          leftParameter: "Serie",
          leftValue: "DVM",
          rightParameter: "Material de cuerpo",
          rightValue: "Acero inoxidable 304-2B, 2,5 mm",
        },
        {
          leftParameter: "Material exterior",
          leftValue: "Acero inoxidable 304-2B, 1,2 mm",
          rightParameter: "Estructura de soporte",
          rightValue: "Canal de acero N.º 5",
        },
        {
          leftParameter: "Válvula de descarga",
          leftValue:
            "Acero inoxidable con sello de caucho de silicona moldeado",
          rightParameter: "Alimentación opcional",
          rightValue: "Apertura rápida",
        },
        {
          leftParameter: "Rango de volumen de recipiente",
          leftValue: "50 a 300 L",
          rightParameter: "Rango de volumen de trabajo",
          rightValue: "20 a 150 L",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Configuraciones de la serie DVM",
          items: [
            "DVM50: recipiente 50 L, volumen de trabajo 20 L, 0,55 kW, 1420 × 600 × 1160 mm, tiempo de mezcla de 8 a 20 min.",
            "DVM100: recipiente 100 L, volumen de trabajo 40 L, 0,75 kW, 1500 × 600 × 1200 mm, tiempo de mezcla de 8 a 20 min.",
            "DVM150: recipiente 150 L, volumen de trabajo 70 L, 1,1 kW, 1800 × 700 × 1600 mm, tiempo de mezcla de 10 a 20 min.",
            "DVM200: recipiente 200 L, volumen de trabajo 100 L, 1,5 kW, 2100 × 700 × 1600 mm, tiempo de mezcla de 15 a 20 min.",
            "DVM300: recipiente 300 L, volumen de trabajo 150 L, 2,2 kW, 2600 × 800 × 2000 mm, tiempo de mezcla de 15 a 20 min.",
          ],
        },
        {
          title: "Configuración de mezcla indicada",
          items: [
            "El motor, reductor y transmisión por correa mueven el barril en V para que el material circule en diferentes direcciones dentro del recipiente.",
            "La fuente menciona dos tipos: alta eficiencia para polvos finos o proporciones pequeñas de ingrediente principal, y normal para mezcla general o producción mayor.",
            "La configuración final de tipo de mezcla, volumen y apertura rápida debe confirmarse según la aplicación del cliente.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DVM",
      "Mezclador tipo V",
      "Polvos",
      "Granulados",
      "Preparación de muestras",
    ],
    relatedProducts: [
      "decent-rodillo-botella",
      "decent-drsd05",
      "decent-drsd40",
    ],
  },
  {
    id: "decent-trituradora-doble-rodillo",
    slug: "decent-trituradora-doble-rodillo",
    name: "Trituradora DRC200 / DRC250",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Trituradora de doble rodillo para trituración fina de minerales, rocas y materiales refractarios. Dos juegos de rodillos accionados de forma independiente reducen el material por compresión y cizallamiento hasta la apertura seleccionada.",
    features: [
      "Trituración por compresión y cizallamiento con dos juegos de rodillos de accionamiento independiente",
      "Ajuste preciso de la separación entre rodillos mediante volante graduado",
      "Gabinete sellado para una operación segura y sin polvo, según la documentación proporcionada",
    ],
    imageUrl: "/productos/decent/trituradora-doble-rodillo/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DRC20075 / DRC200125 / DRC200150 / DRC250150",
      fullTitle:
        "Decent Trituradora de Doble Rodillo para Preparación de Muestras",
      subtitle:
        "Equipo de trituración fina para minerales, rocas y materiales refractarios. Los rodillos ejercen compresión y cizallamiento sobre la alimentación para obtener una salida definida por la separación entre rodillos.",
      highlights: [
        "Cuatro configuraciones DRC con rodillos de 200 o 250 mm de diámetro",
        "Ajuste de apertura con volante graduado para definir la separación entre rodillos",
        "Gabinete sellado, baja emisión de polvo y operación de bajo ruido indicados en la ficha técnica",
      ],
      advantages: [
        "La alimentación es arrastrada entre los rodillos por la fuerza de mordida y se reduce por compresión y cizallamiento.",
        "La superficie de los rodillos recibe un tratamiento especial que la documentación indica como antiadherente para carbón.",
        "El ajuste de apertura mediante volante graduado está indicado para controlar de forma precisa la distancia entre rodillos.",
        "La ficha señala salida uniforme, alta eficiencia, funcionamiento sellado y mantenimiento sencillo.",
        "Como opción, se mencionan rodillos de aleación con capa de carburo de tungsteno para minerales de alta dureza, como ferromolibdeno o ferrovanadio.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos disponibles",
          leftValue: "DRC20075, DRC200125, DRC200150 y DRC250150",
          rightParameter: "Principio de trituración",
          rightValue: "Compresión y cizallamiento entre rodillos",
        },
        {
          leftParameter: "Tamaño de rodillos",
          leftValue: "Ø200 × 75, Ø200 × 125, Ø200 × 150 y Ø250 × 150 mm",
          rightParameter: "Ajuste de separación",
          rightValue: "Volante graduado",
        },
        {
          leftParameter: "Tamaño de alimentación",
          leftValue: "≤13 mm en DRC200; ≤20 mm en DRC250150",
          rightParameter: "Tamaño de salida",
          rightValue: "<3 a 0,5 mm en DRC200; <3 a 1 mm en DRC250150",
        },
        {
          leftParameter: "Productividad indicada",
          leftValue: "300–200, 350–250, 400–300 y 450–300 kg/h, según modelo",
          rightParameter: "Potencia",
          rightValue: "1,5 kW en DRC20075; 3 kW en los demás modelos",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "Trifásica, 380 V, 50 Hz",
          rightParameter: "Peso",
          rightValue: "220, 240, 260 o 280 kg según modelo",
        },
        {
          leftParameter: "Dimensiones generales",
          leftValue: "820 × 490 × 960 a 840 × 560 × 960 mm, según modelo",
          rightParameter: "Rodillos opcionales",
          rightValue: "Aleación con capa de carburo de tungsteno",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Matriz técnica por modelo",
          items: [
            "DRC20075: rodillos Ø200 × 75 mm; alimentación ≤13 mm; salida <3 a 0,5 mm; productividad indicada 300–200 kg/h; 1,5 kW; 220 kg; 820 × 490 × 960 mm.",
            "DRC200125: rodillos Ø200 × 125 mm; alimentación ≤13 mm; salida <3 a 0,5 mm; productividad indicada 350–250 kg/h; 3 kW; 240 kg; 820 × 540 × 960 mm.",
            "DRC200150: rodillos Ø200 × 150 mm; alimentación ≤13 mm; salida <3 a 0,5 mm; productividad indicada 400–300 kg/h; 3 kW; 260 kg; 840 × 550 × 960 mm.",
            "DRC250150: rodillos Ø250 × 150 mm; alimentación ≤20 mm; salida <3 a 1 mm; productividad indicada 450–300 kg/h; 3 kW; 280 kg; 840 × 560 × 960 mm.",
          ],
        },
        {
          title: "Proceso y configuración",
          items: [
            "El material de alimentación se fuerza entre los rodillos mediante la fuerza de mordida y se reduce por su movimiento relativo de rotación.",
            "Las partículas que cumplen el tamaño requerido pasan por el espacio entre rodillos y se descargan bajo la máquina; las partículas mayores continúan la trituración.",
            "La configuración de rodillos de aleación para minerales de alta dureza se menciona como opción y debe confirmarse al cotizar.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DRC",
      "Trituradora de doble rodillo",
      "Trituración",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-trituradora-martillo",
      "decent-molino-pulverizador-dp1000",
      "decent-drsd40",
    ],
  },
  {
    id: "decent-agitador-tamiz-estandar",
    slug: "decent-agitador-tamiz-estandar",
    name: "Agitador de tamiz DSS200",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Minería"],
    description:
      "Agitador de tamiz estándar automático para análisis de tamaño de partícula en polvos, materiales sueltos y sólidos suspendidos. Permite instalar de una a ocho capas de tamices y ajustar frecuencia, modo de vibración y amplitud.",
    features: [
      "Análisis de tamaño de partícula para materiales finos, ultrafinos y granulares",
      "Configuración de una a ocho capas de tamices de Ø200 mm",
      "Frecuencia, modo de vibración y amplitud ajustables para diferentes ensayos",
    ],
    imageUrl: "/productos/decent/agitador-tamiz-estandar/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DSS200 / DSS200S",
      fullTitle: "Decent Agitador de Tamiz Estándar Automático",
      subtitle:
        "Instrumento automatizado de laboratorio para selección y análisis de tamaño de partícula. Está indicado para polvos, materiales sueltos y sólidos suspendidos, incluyendo materiales finos y ultrafinos de difícil manejo.",
      highlights: [
        "Modelos DSS200 y DSS200S para tamices estándar de Ø200 mm",
        "Hasta ocho capas de tamices con frecuencia, modo y amplitud de vibración ajustables",
        "Sistema de limpieza de tamiz de alta eficiencia y gabinete de eliminación de polvo sellado, según la descripción disponible",
      ],
      advantages: [
        "Reemplaza el tamizado manual para selección de muestras y se describe como una mejora de eficiencia experimental.",
        "El control de inicio y temporizador se indica como una operación sencilla desde el panel.",
        "La documentación menciona dos principios: mecánico bidimensional para muestras de partículas grandes y electromagnético tridimensional para polvo ultrafino.",
        "El sistema de limpieza de alta eficiencia está indicado para evitar la obstrucción de la malla y mejorar la capacidad de tamizado.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos",
          leftValue: "DSS200 y DSS200S",
          rightParameter: "Diámetro de tamiz",
          rightValue: "Ø200 mm",
        },
        {
          leftParameter: "Frecuencia de agitación",
          leftValue: "221 veces/min",
          rightParameter: "Frecuencia de vibración",
          rightValue: "149 veces/min",
        },
        {
          leftParameter: "Radio de giro",
          leftValue: "12,5 mm",
          rightParameter: "Amplitud",
          rightValue: "5 mm",
        },
        {
          leftParameter: "Motor",
          leftValue: "Trifásico, 380 V, 0,37 kW",
          rightParameter: "Capas de tamiz",
          rightValue: "1 a 8",
        },
        {
          leftParameter: "Peso",
          leftValue: "110 kg (DSS200) o 160 kg (DSS200S)",
          rightParameter: "Dimensiones",
          rightValue:
            "580 × 370 × 840 mm (DSS200); 660 × 450 × 1060 mm (DSS200S)",
        },
        {
          leftParameter: "Principio de operación",
          leftValue: "Mecánico 2D o electromagnético 3D, según muestra",
          rightParameter: "Control",
          rightValue:
            "Inicio, temporizador, frecuencia, modo y amplitud ajustables",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Operación y principio de selección",
          items: [
            "El agitador selecciona materiales dispersos según el tamaño de muestra y permite analizar polvos, materiales sueltos y sólidos suspendidos.",
            "El principio mecánico bidimensional utiliza motor y bloque excéntrico para generar movimientos horizontales, lineales, circulares, verticales u otros modos de vibración.",
            "El principio electromagnético tridimensional emplea una bobina bajo el tamiz para generar un movimiento de proyección más amplio, indicado para polvo ultrafino.",
          ],
        },
        {
          title: "Eficiencia y configuración",
          items: [
            "La documentación indica una a ocho capas de tamices y ajuste de frecuencia, modo de vibración y amplitud para distintos fines de ensayo.",
            "Se describe un dispositivo de limpieza de tamiz de alta eficiencia para prevenir la obstrucción de la malla y un sistema sellado de eliminación de polvo para operación segura.",
            "Los tamices estándar y el conjunto de tapa y chasis aparecen en la ficha técnica como elementos complementarios, sin detalle de compatibilidad comercial por modelo.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "DSS200",
      "DSS200S",
      "Agitador de tamiz",
      "Tamizado",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-drsd05",
      "decent-drsd40",
      "decent-molino-pulverizador-dp1000",
    ],
  },
  {
    id: "decent-hornos-secado",
    slug: "decent-hornos-secado",
    name: "Horno de secado DDO",
    category: "Preparación de muestras",
    filters: [
      "Marcas",
      "Preparación de muestras",
      "Minería",
      "Equipamiento menor",
    ],
    description:
      "Familia de hornos de secado Decent para preparación de muestras, con configuraciones de convección natural, convección forzada, formato horizontal y equipos industriales de gran capacidad. La selección incluye versiones eléctricas y a gas según el modelo.",
    features: [
      "Familias documentadas desde 30 L hasta 10.000 L",
      "Convección natural, forzada, horizontal y soluciones industriales por carro",
      "Control PID, sensor Pt100 y funciones de temporización según la familia",
    ],
    imageUrl: "/productos/decent/hornos-secado/imagen-portada.png",
    detail: {
      brand: "Decent",
      model: "DDO / DDOG / DDOH(L) / DDO101-202",
      fullTitle: "Decent Hornos de Secado para Preparación de Muestras",
      subtitle:
        "Una sola familia de equipos para secado de muestras en laboratorio y operación industrial: desde hornos compactos de convección natural o forzada hasta cámaras de gran capacidad con carros y versiones eléctricas o a gas.",
      highlights: [
        "Capacidades documentadas de 30, 45, 65, 85, 125, 136, 225, 230, 625, 640, 1.000, 1.300, 1.350, 1.870, 2.500, 3.070, 5.000 y 10.000 L, según familia.",
        "Convección natural en la familia DDOH(L), convección forzada vertical en DDOG y convección forzada u horizontal en las familias DDO101/202.",
        "Versiones con cámaras de acero inoxidable, control PID, sensor Pt100, temporizador y protección por sobretemperatura según la configuración.",
      ],
      advantages: [
        "Permite seleccionar el formato de circulación de aire y la capacidad de cámara de acuerdo con el volumen y el tipo de muestra.",
        "Las familias DDOG y DDOH(L) incluyen variantes B y BE con diferentes niveles de visualización, control y opciones de comunicación descritas en las fichas.",
        "Los hornos industriales de gran capacidad incorporan carros y estantes para trabajar con lotes de muestras de minerales, incluido el secado de muestras de hierro y carbón descrito por el fabricante.",
        "La configuración final debe definirse con el vendedor porque las dimensiones, alimentación, potencia, circulación y cantidad de carros cambian entre modelos.",
      ],
      technicalParameters: [
        {
          leftParameter: "Familias y modelos",
          leftValue:
            "Industriales: DDO-1-1-1350N/E, DDO-2-2-2500N/E, DDO-2-4-5000N/E y DDO-4-8-10000E. Grandes eléctricos: DDO4A/AB a DDO8A/AB. Convección forzada: DDOG-30/45/65/85/125/230/625 B/BE. Convección natural: DDOH-30/45/65/85/125 B y DDOHL-30/45/65/85/125 BE. Horizontales: DDO101 y DDO202, tamaños 0 a 3 A/AB.",
          rightParameter: "Capacidad documentada",
          rightValue:
            "Desde 30 L en los equipos compactos hasta 10.000 L en la configuración industrial de mayor capacidad; los modelos intermedios incluyen 45, 65, 85, 125, 136, 225, 230, 625, 640, 1.000, 1.300, 1.350, 1.870, 2.500, 3.070 y 5.000 L.",
        },
        {
          leftParameter: "Rango de temperatura",
          leftValue:
            "RT+10 a 150 °C en los hornos industriales DDO de gran capacidad; RT+10 a 250 °C en DDO101/202 y en DDO4A/AB a DDO6A/AB; RT+10 a 300 °C en DDO7A/AB, DDO8A/AB, DDOG y DDOH(L), según la familia.",
          rightParameter: "Precisión y uniformidad",
          rightValue:
            "Resolución de 0,1 °C en las familias eléctricas compactas y grandes; fluctuación indicada de ±1 °C. La uniformidad documentada es ±2,5 % en DDOG y DDO101, ±3 % en DDO4-8 y DDOH(L), y ±3,5 % en DDO202.",
        },
        {
          leftParameter: "Circulación y energía",
          leftValue:
            "Convección natural en DDOH(L); convección forzada vertical en DDOG; circulación forzada en DDO4-8; convección forzada horizontal en DDO101 y natural horizontal en DDO202. Hay versiones eléctricas y a gas en los modelos industriales 1350, 2500 y 5000 L.",
          rightParameter: "Control y sensor",
          rightValue:
            "Control digital PID, sensor de resistencia Pt100, temporizador de 0 a 9.999 minutos en las familias eléctricas documentadas, parada fija/temporizada/automática y funciones de corrección, memoria o bloqueo según el modelo.",
        },
        {
          leftParameter: "Construcción",
          leftValue:
            "Cámara interior de acero inoxidable en las familias compactas y configuraciones seleccionadas; exterior de acero laminado en frío con pintura electrostática o acero inoxidable según la variante. Aislación con lana de roca certificada, según indican las fichas.",
          rightParameter: "Carga y estantes",
          rightValue:
            "Equipos compactos con estantes de 15 kg y separación de 40 mm, o 25 mm en DDO101/202. DDO4-8 indica estantes de 30 kg y separación de 70 mm. Los hornos industriales usan 26 estantes por carro, con 10 kg por estante, y de 1 a 8 carros según capacidad.",
        },
        {
          leftParameter: "Alimentación",
          leftValue:
            "Equipos compactos principalmente a 220 V; el modelo DDOG-625 se documenta a 380 V. Los equipos industriales se especifican con alimentación trifásica y potencias distintas para cada modelo, por lo que deben confirmarse antes de cotizar.",
          rightParameter: "Seguridad y opciones",
          rightValue:
            "Alarma y protección por sobretemperatura, apagado de protección y funciones de operación temporizada según familia. Se documentan como opciones estantes, RS485, impresora, controlador programable, control remoto, USB, SMS y pantalla táctil en configuraciones específicas.",
        },
      ],
      detailBlocks: [],
      specificationNotes: [
        {
          title: "Hornos industriales de 1.350 a 10.000 L",
          items: [
            "DDO-1-1-1350N/E: rango RT+10 a 150 °C, cámara interior de 800 × 1.000 × 1.695 mm, volumen 1.350 L, un carro con 26 estantes de 10 kg, potencia total indicada de 1,85 kW en N y 8,85 kW en E, y dimensiones exteriores diferentes para cada alimentación.",
            "DDO-2-2-2500N/E: cámara interior de 1.515 × 1.000 × 1.695 mm, volumen 2.500 L, dos carros con 26 estantes cada uno, potencia total indicada de 2,37 kW en N y 20 kW en E, con circulación de 1,5 kW y deshumidificación de 0,37 kW.",
            "DDO-2-4-5000N/E: cámara interior de 1.515 × 1.950 × 1.695 mm, volumen 5.000 L, cuatro carros, potencia total indicada de 3,87 kW en N y 33,5 kW en E, con circulación de 3 kW y deshumidificación de 0,37 kW.",
            "DDO-4-8-10000E: cámara interior de 3.030 × 1.950 × 1.695 mm, volumen 10.000 L, ocho carros, potencia total indicada de 67 kW, circulación de 2 × 3 kW y deshumidificación de 2 × 0,37 kW.",
            "En las versiones industriales se indican 10 kg por estante, carro de aproximadamente 705 × 950 × 1.596 mm, estante de 640 × 460 × 45 mm y gabinete eléctrico de 650 × 300 × 1.660 mm. Las dimensiones exteriores y los quemadores o resistencias cambian según el modelo.",
          ],
        },
        {
          title: "Grandes hornos eléctricos de convección forzada DDO4 a DDO8",
          items: [
            "DDO4A/AB: 640 L, 6 kW, cámara 800 × 800 × 1.000 mm, 11 estantes y dimensiones exteriores de 940 × 1.000 × 1.400 mm.",
            "DDO5A/AB: 1.000 L, 6,6 kW, cámara de 1.000 × 1.000 × 1.000 mm, 11 estantes y dimensiones exteriores de 1.040 × 1.200 × 1.400 mm.",
            "DDO6A/AB: 1.300 L, 9 kW, cámara de 1.000 × 1.000 × 1.300 mm, 15 estantes y dimensiones exteriores de 1.230 × 1.200 × 1.670 mm.",
            "DDO7A/AB: 1.870 L, 12 kW, cámara de 1.200 × 1.200 × 1.300 mm, 15 estantes y dimensiones exteriores de 1.330 × 1.400 × 1.670 mm.",
            "DDO8A/AB: 3.070 L, 15 kW, cámara de 1.600 × 1.200 × 1.600 mm, 18 estantes y dimensiones exteriores de 1.750 × 1.400 × 1.990 mm. Las fichas indican 380 V, estantes de 30 kg y separación de 70 mm.",
            "La variante A utiliza revestimiento interior de hierro; la variante AB utiliza revestimiento interior de acero inoxidable. Se documentan PID, pantalla LCD, espera de 0 a 9.999 minutos, parada fija/temporizada/automática, corrección, memoria, bloqueo de menú y protección por sobretemperatura.",
          ],
        },
        {
          title: "Convección forzada vertical DDOG-30 a DDOG-625",
          items: [
            "Las capacidades son 30, 45, 65, 85, 125, 230 y 625 L, con potencias de 0,8; 1,2; 1,6; 2; 2,3; 3 y 5 kW respectivamente. Las cámaras van desde 310 × 310 × 310 mm hasta 760 × 600 × 1.250 mm.",
            "Las versiones B utilizan display de cuatro dígitos; las BE incorporan pantalla LCD y opciones ampliadas. La documentación menciona autocorrección, autoajuste, bloqueo de parámetros, memoria de apagado, limitador independiente de precisión y opciones de comunicación o programación según la variante.",
            "Los equipos incluyen de 5 a 17 estantes según capacidad, con 15 kg de carga por estante y separación de 40 mm; el DDOG-625 indica 11 estantes, separación de 100 mm y alimentación de 380 V.",
          ],
        },
        {
          title: "Temperatura constante DDOH y DDOHL",
          items: [
            "Las capacidades documentadas son 30, 45, 65, 85 y 125 L. El rango es RT+10 a 300 °C, con resolución de 0,1 °C, fluctuación de ±1 °C y uniformidad de ±3,5 °C según la ficha.",
            "DDOH corresponde a la variante B y DDOHL a la variante BE. Las cámaras son de acero inoxidable, el exterior es de acero laminado en frío con pintura electrostática y se indican lana de roca CE, tubos de calentamiento de nicromo, PID de doble zona, teclado, temporizador y sensor Pt100.",
            "Los modelos de 30, 45, 65, 85 y 125 L utilizan respectivamente 0,8; 1,2; 1,6; 2 y 2,5 kW, con 5; 6; 8; 8 y 11 estantes de 15 kg y separación de 40 mm. La alimentación documentada es 220 V.",
          ],
        },
        {
          title: "Hornos horizontales DDO101 y DDO202",
          items: [
            "Los tamaños 0, 1, 2 y 3 corresponden a 43, 71, 136 y 225 L, con potencias de 1,2; 1,6; 2,3 y 3 kW. Las cámaras son de 350 × 350 × 350, 450 × 350 × 450, 550 × 450 × 550 y 600 × 500 × 750 mm, respectivamente.",
            "DDO101 utiliza convección forzada horizontal y DDO202 convección natural horizontal. El rango documentado es RT+10 a 250 °C; la uniformidad indicada es ±2,5 % para DDO101 y ±3,5 % para DDO202.",
            "Los equipos tienen entre 9 y 25 estantes según tamaño, carga de 15 kg, separación de 25 mm, alimentación 220 V y control PID de doble zona con temporizador de 0 a 9.999 minutos, parada fija/temporizada/automática y alarma audible/visual.",
          ],
        },
      ],
    },
    tags: [
      "Decent",
      "Hornos de secado",
      "DDO",
      "DDOG",
      "DDOH",
      "Preparación de muestras",
      "Minería",
    ],
    relatedProducts: [
      "decent-dsw350",
      "decent-molino-pulverizador-dp1000",
      "decent-trituradora-doble-rodillo",
    ],
  },
  {
    id: "hyperpurex-serie-eue",
    slug: "hyperpurex-serie-eue",
    name: "Hyperpurex EUE",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Sistema inteligente de agua ultrapura para laboratorio que combina tratamiento desde agua de red, EDI y pulido final en la configuración EUE seleccionada.",
    features: [
      "Modelos EUE-10 y EUE-20 con producción de 10 o 20 L/h",
      "Agua ultrapura de 18,2 MΩ·cm a 25 °C y dispensación de hasta 2 L/min",
      "Pantalla táctil IPS de 5 pulgadas, gestión de consumibles y registros de operación",
    ],
    imageUrl: "/productos/hyperpurex-serie-eue/equipo-vista-general.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie EUE (E-Series)",
      fullTitle:
        "Hyperpurex Serie EUE — Sistema inteligente de agua pura y ultrapura",
      subtitle:
        "Plataforma de agua ultrapura desde agua de red que integra pretratamiento, ósmosis inversa, EDI, almacenamiento, pulido final y dispensación según el modelo EUE seleccionado.",
      highlights: [
        "Agua ultrapura de 18,2 MΩ·cm a 25 °C",
        "Producción de 10 o 20 L/h según modelo",
        "Pantalla IPS de 5 pulgadas y dispensación de hasta 2 L/min",
      ],
      advantages: [
        "La ruta EUE documentada parte desde agua de red e incorpora pretratamiento, ósmosis inversa, EDI, almacenamiento, cartuchos de ultrapureza y filtración terminal conforme a la configuración elegida.",
        "La pantalla táctil IPS de 5 pulgadas presenta la operación, el estado de consumibles y los parámetros de agua disponibles para el modelo; el módulo TOC es opcional según la ficha.",
        "La familia EUE comprende EUE-10 y EUE-20, con variantes estándar, UV, UF y UVF; los sufijos determinan las etapas de bajo TOC y ultrafiltración documentadas.",
        "La ficha describe permisos para administrador y usuario ordinario, almacenamiento de registros de hasta tres años y exportación de datos por USB o plataforma cloud.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos documentados",
          leftValue: "EUE-10 y EUE-20; variantes UV, UF y UVF",
          rightParameter: "Producción",
          rightValue: "10 o 20 L/h según modelo",
        },
        {
          leftParameter: "Dispensación UP",
          leftValue: "Hasta 2 L/min",
          rightParameter: "Resistividad del agua UP",
          rightValue: "18,2 MΩ·cm a 25 °C",
        },
        {
          leftParameter: "Conductividad UP",
          leftValue: "0,055 µS/cm a 25 °C",
          rightParameter: "TOC UP",
          rightValue: "5 ppb; 2 ppb en la variante UV",
        },
        {
          leftParameter: "Partículas / bacterias UP",
          leftValue: "< 1/mL (> 0,2 µm) / < 0,01 UFC/mL",
          rightParameter: "Agua EDI",
          rightValue: "> 10 MΩ·cm; < 0,1 µS/cm",
        },
        {
          leftParameter: "Endotoxinas con UF",
          leftValue: "< 0,001 EU/mL (UF / UVF)",
          rightParameter: "RNasa / DNasa con UF",
          rightValue: "1 pg/mL / 5 pg/mL",
        },
        {
          leftParameter: "Agua de entrada",
          leftValue: "Red municipal; conductividad < 2.000 µS/cm",
          rightParameter: "Presión / temperatura",
          rightValue: "1–6 bar / 5–40 °C",
        },
        {
          leftParameter: "Dureza / TOC de entrada",
          leftValue: "< 300 ppm CaCO₃ / < 2.000 ppb",
          rightParameter: "Cloro libre / pH",
          rightValue: "< 3 ppm / 4–10",
        },
        {
          leftParameter: "Dimensiones",
          leftValue: "Unidad: 370 × 623 × 600 mm; tanque: 392 × 518 × 772 mm",
          rightParameter: "Peso",
          rightValue: "Unidad: aprox. 29 kg; tanque: aprox. 16 kg",
        },
        {
          leftParameter: "Alimentación / potencia",
          leftValue: "100–240 V, 50/60 Hz",
          rightParameter: "Potencia total",
          rightValue: "120 W",
        },
      ],
      detailBlocks: [
        {
          title: "Tecnología de purificación",
          tone: "blue",
          items: [
            "La ruta EUE documentada combina pretratamiento, RO, EDI, tanque, cartuchos UP y filtración terminal. Las etapas UV y UF corresponden a las variantes configuradas.",
            "Las configuraciones EUE-10 / EUE-20, EUE-10 / EUE-20UV, EUE-10 / EUE-20UF y EUE-10 / EUE-20UVF se diferencian por la función de bajo TOC, ultrafiltración o su combinación.",
          ],
        },
        {
          title: "Interfaz y operación",
          tone: "green",
          items: [
            "La pantalla IPS de 5 pulgadas muestra el estado de funcionamiento y los consumibles; la ficha describe registros de operación, dispensación, alarmas y dos niveles de permisos.",
            "El PDF describe alarmas de agua de alimentación, presión, nivel de tanque, calidad de agua y final de vida de cartuchos; algunas funciones dependen del modelo o de los accesorios opcionales.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo purifica el agua",
          items: [
            "El flujo EUE parte desde agua de red y pasa por pretratamiento, ósmosis inversa, EDI, almacenamiento y pulido de ultrapureza antes de la dispensación.",
            "Las variantes UV incorporan bajo TOC; las variantes UF y UVF añaden ultrafiltración. La ficha especifica para estas últimas endotoxinas, RNasas, DNasas y proteasas bajo sus condiciones de ensayo.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua de red con presión de 1 a 6 bar, temperatura entre 5 y 40 °C, conductividad inferior a 2.000 µS/cm, dureza inferior a 300 ppm como CaCO₃, TOC inferior a 2.000 ppb, cloro libre inferior a 3 ppm y pH entre 4 y 10.",
            "Alimentación de 100 a 240 V, 50/60 Hz y potencia total de 120 W. La ficha incluye una unidad principal y un tanque de 60 L en la configuración estándar.",
          ],
        },
        {
          title: "Mantenimiento documentado",
          items: [
            "La pantalla documenta el seguimiento de vida útil de los consumibles PP, PC, RO, DI, EDI, UP, UV, UF y filtro terminal cuando corresponde a la configuración.",
            "El reemplazo de cartuchos y los accesorios opcionales se debe definir contra el modelo EUE y las condiciones de uso indicadas por el fabricante.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Referencias de calidad de agua documentadas",
          text: "La ficha de la Serie E documenta la calidad de agua producida según especificaciones de referencia reconocidas internacionalmente, incluidas las farmacopeas vigentes. El archivo no incorpora certificados individuales para descarga.",
        },
        {
          title: "Gestión de calidad declarada por el fabricante",
          text: "El fabricante declara diseñar, desarrollar y fabricar bajo sistemas de gestión de calidad certificados internacionalmente. Esta declaración no reemplaza los certificados correspondientes.",
        },
        {
          title: "Trazabilidad documentada",
          text: "La ficha describe dos niveles de usuario, almacenamiento de registros de operación de hasta tres años y exportación por USB o plataforma cloud. No documenta una interfaz RS232 para esta serie.",
        },
      ],
      applicationNotes: [
        {
          label: "Análisis instrumental",
          text: "HPLC, UPLC, LC-MS, ICP-MS, ICP-AES, AAS, GC-MS, MALDI-TOF-MS, cromatografía iónica y análisis de TOC.",
        },
        {
          label: "Ciencias de la vida",
          text: "Preparación de medios y reactivos microbiológicos, cultivo celular, PCR, IVF, purificación de proteínas, electroforesis, bioquímica, proteómica, genómica e inmunoensayo.",
        },
        {
          label: "Alimentación de equipos de laboratorio",
          text: "Suministro de agua para autoclaves, lavadoras de cristalería, cámaras de ensayo ambiental y baños de agua.",
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-eue/diagrama-de-purificacion.jpeg",
        alt: "Diagrama de flujo proporcionado para la purificación de agua de la Serie EUE",
        title: "Ruta de purificación",
        caption:
          "El flujo parte desde agua de red y pasa por filtración PP y carbón activado, con antincrustante opcional, ósmosis inversa, estanque y recirculación. El pulido con UV, columnas UP, UF y filtro terminal depende de la configuración.",
      },
      descriptionImages: [
        {
          src: "/productos/hyperpurex-serie-eue/pantalla-monitoreo.png",
          alt: "Pantalla de monitoreo en tiempo real de la Serie EUE",
          title: "Monitoreo operativo",
          caption:
            "La interfaz muestra en simultáneo conductividad RO, resistividad UP, temperatura, TOC y nivel del tanque para seguir la calidad de agua y el estado de operación.",
        },
        {
          src: "/productos/hyperpurex-serie-eue/pantalla-vida-util.png",
          alt: "Pantalla de gestión de vida útil de consumibles de la Serie EUE",
          title: "Vida útil de consumibles",
          caption:
            "El control independiente cubre los consumibles PP, AC, RO, columnas UP, lámpara UV y módulo UF, para identificar su estado y programar el recambio según la configuración instalada.",
        },
        {
          src: "/productos/hyperpurex-serie-eue/pantalla-desinfeccion.png",
          alt: "Pantalla del programa de desinfección de la Serie EUE",
          title: "Programa de desinfección",
          caption:
            "Material visual proporcionado para el programa de desinfección disponible en la interfaz del equipo.",
        },
        {
          src: "/productos/hyperpurex-serie-eue/pantalla-alarmas.png",
          alt: "Registro instantáneo de alarmas de la Serie EUE",
          title: "Registro de alarmas",
          caption:
            "El sistema registra alertas de presión de entrada, nivel de tanque, calidad de agua, vida útil de consumibles y estado de la lámpara UV; las funciones disponibles dependen de la configuración.",
        },
        {
          src: "/productos/hyperpurex-serie-eue/pantalla-registros.png",
          alt: "Consulta de registros de dispensación de agua de la Serie EUE",
          title: "Historial de dispensación",
          caption:
            "La consulta reúne registros de calidad de agua, volumen dispensado, calibraciones y eventos de alarma; la ficha documenta su exportación por USB o plataforma cloud.",
        },
      ],
    },
    tags: [
      "Hyperpurex",
      "Serie EUE",
      "Purificadores de agua",
      "Agua ultrapura",
      "Ósmosis inversa",
      "Laboratorio",
    ],
    relatedProducts: ["hyperpurex-serie-su-smart"],
  },
  {
    id: "hyperpurex-serie-su-smart",
    slug: "hyperpurex-serie-su-smart",
    name: "Hyperpurex SU Smart",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Sistema integrado de agua ultrapura para laboratorio desde agua de red, con pantalla LCD, tratamiento por ósmosis inversa y pulido final según el modelo SU seleccionado.",
    features: [
      "Modelos SU-20, SU-40 y SU-60 con producción de 20, 40 o 60 L/h",
      "Agua ultrapura de 18,2 MΩ·cm a 25 °C y dispensación de hasta 2 L/min",
      "Pantalla LCD de 68 × 87 mm con monitoreo y gestión de consumibles",
    ],
    imageUrl: "/productos/hyperpurex-serie-su-smart/portada.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie SU Smart",
      fullTitle:
        "Hyperpurex Serie SU Smart — Sistema integrado de agua pura y ultrapura",
      subtitle:
        "Purificación de agua para laboratorio desde red municipal: pretratamiento, ósmosis inversa, almacenamiento y pulido de ultrapureza en una sola plataforma.",
      highlights: [
        "Agua ultrapura de 18,2 MΩ·cm a 25 °C",
        "Producción de 20, 40 o 60 L/h según modelo",
        "Pantalla LCD y dispensación de hasta 2 L/min",
      ],
      advantages: [
        "La Serie SU combina pretratamiento, ósmosis inversa, cartuchos de ultrapureza y filtración terminal para tratar agua de red según la configuración del modelo.",
        "La pantalla LCD de 68 × 87 mm muestra el estado de operación, los sensores de calidad disponibles y la vida útil de los consumibles.",
        "Las configuraciones SU-20, SU-40 y SU-60 se diferencian por su producción de 20, 40 y 60 L/h.",
        "Las variantes UV, UF y UVF incorporan las etapas documentadas para bajo TOC, ultrafiltración o ambas, según el modelo.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos",
          leftValue: "SU-20, SU-40 y SU-60; variantes UV, UF y UVF",
          rightParameter: "Producción",
          rightValue: "20, 40 o 60 L/h según modelo",
        },
        {
          leftParameter: "Dispensación UP",
          leftValue: "Hasta 2 L/min",
          rightParameter: "Resistividad del agua UP",
          rightValue: "18,2 MΩ·cm a 25 °C",
        },
        {
          leftParameter: "Conductividad UP",
          leftValue: "0,055 µS/cm a 25 °C",
          rightParameter: "TOC UP",
          rightValue: "5 ppb; 2 ppb en la variante UV",
        },
        {
          leftParameter: "Partículas / bacterias UP",
          leftValue: "< 1/mL (> 0,2 µm) / < 0,01 UFC/mL",
          rightParameter: "RO de primera etapa",
          rightValue: "Rechazo iónico de 98–99 % con membrana nueva",
        },
        {
          leftParameter: "Endotoxinas con UF",
          leftValue: "< 0,001 EU/mL (UF / UVF)",
          rightParameter: "RNasa / DNasa con UF",
          rightValue: "1 pg/mL / 5 pg/mL",
        },
        {
          leftParameter: "Agua de entrada",
          leftValue: "Red municipal; conductividad < 2.000 µS/cm",
          rightParameter: "Presión / temperatura de entrada",
          rightValue: "1–6 bar / 5–40 °C",
        },
        {
          leftParameter: "Dureza / TOC de entrada",
          leftValue: "< 300 ppm CaCO₃ / < 2.000 ppb",
          rightParameter: "Cloro libre / pH",
          rightValue: "< 3 ppm / 4–10",
        },
        {
          leftParameter: "Unidad principal",
          leftValue: "273 × 555 × 568 mm; aprox. 21 kg",
          rightParameter: "Tanque integrado",
          rightValue: "Tanque presurizado de 1,8 L",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "100–240 V, 50/60 Hz",
          rightParameter: "Potencia",
          rightValue: "48 W (SU-20), 72 W (SU-40) o 120 W (SU-60)",
        },
      ],
      detailBlocks: [
        {
          title: "Calidad de agua y monitoreo",
          tone: "blue",
          items: [
            "El agua ultrapura se especifica en 18,2 MΩ·cm y 0,055 µS/cm a 25 °C. Las variantes UV reducen el TOC indicado a 2 ppb.",
            "El LCD de 68 × 87 mm muestra el estado de operación y la gestión de consumibles; la ficha describe sensores para las salidas disponibles según el modelo.",
          ],
        },
        {
          title: "Configuraciones disponibles",
          tone: "green",
          items: [
            "SU-20, SU-40 y SU-60 son las capacidades documentadas para la serie. Cada una se ofrece en configuración estándar, UV, UF o UVF.",
            "UV corresponde a bajo TOC; UF incorpora ultrafiltración; UVF combina ambas etapas según la tabla de especificaciones.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo purifica el agua",
          items: [
            "La Serie SU parte desde agua de red, incorpora pretratamiento y ósmosis inversa, y realiza el pulido de ultrapureza antes de la dispensación.",
            "Las variantes UV, UF y UVF añaden las etapas de bajo TOC y ultrafiltración documentadas para el modelo seleccionado.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua de red con presión de 1 a 6 bar, temperatura entre 5 y 40 °C, conductividad inferior a 2.000 µS/cm, dureza inferior a 300 ppm como CaCO₃, TOC inferior a 2.000 ppb, cloro libre inferior a 3 ppm y pH entre 4 y 10.",
            "Alimentación de 100 a 240 V, 50/60 Hz; la potencia depende del modelo: 48 W para SU-20, 72 W para SU-40 y 120 W para SU-60.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Referencias de calidad de agua documentadas",
          text: "La ficha de la Serie S documenta la calidad de agua producida según especificaciones de referencia reconocidas internacionalmente, incluidas las farmacopeas vigentes. El archivo no incorpora certificados individuales para descarga.",
        },
        {
          title: "Gestión de calidad declarada por el fabricante",
          text: "El fabricante declara diseñar, desarrollar y fabricar bajo sistemas de gestión de calidad certificados internacionalmente. Esta declaración no reemplaza los certificados correspondientes.",
        },
      ],
      applicationNotes: [
        {
          label: "Análisis instrumental",
          text: "HPLC, UPLC, LC-MS, ICP-MS, ICP-AES, AAS, GC-MS, MALDI-TOF-MS, cromatografía iónica y análisis de TOC.",
        },
        {
          label: "Ciencias de la vida",
          text: "Preparación de medios y reactivos microbiológicos, cultivo celular, PCR, IVF, purificación de proteínas, electroforesis, bioquímica, proteómica, genómica e inmunoensayo.",
        },
        {
          label: "Alimentación de equipos de laboratorio",
          text: "Suministro de agua para autoclaves, lavadoras de cristalería, cámaras de ensayo ambiental y baños de agua.",
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-su-smart/diagrama-de-purificacion.jpeg",
        alt: "Diagrama proporcionado del proceso de purificación de agua de la Serie SU Smart",
        caption:
          "Diagrama de flujo proporcionado para la Serie SU: desde el agua de alimentación hasta la dispensación de agua ultrapura, con etapas de pretratamiento, RO, UV, UP, UF y filtración terminal según configuración.",
      },
      descriptionImages: [
        {
          src: "/productos/hyperpurex-serie-su-smart/brazo-dispensador.png",
          alt: "Pantalla LCD y brazo dispensador del sistema Hyperpurex Serie SU Smart",
          caption:
            "El material proporcionado muestra la lectura de resistividad, TOC, temperatura, flujo y volumen junto al brazo dispensador del sistema.",
        },
        {
          src: "/productos/hyperpurex-serie-su-smart/cartuchos-del-sistema.png",
          alt: "Cartuchos de pretratamiento, ósmosis inversa y ultrapurificación de Hyperpurex",
          caption:
            "Conjunto de cartuchos identificado en el material fuente para las etapas PC, RO, DI y UP del sistema.",
        },
      ],
    },
    tags: [
      "Hyperpurex",
      "Serie SU Smart",
      "Purificadores de agua",
      "Agua ultrapura",
      "Ósmosis inversa",
      "Laboratorio",
    ],
  },
  {
    id: "hyperpurex-serie-lu-discovery",
    slug: "hyperpurex-serie-lu-discovery",
    name: "Hyperpurex LU Discovery",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Sistema integrado de agua pura y ultrapura para laboratorio, alimentado desde agua de red y configurado con ósmosis inversa, almacenamiento y pulido final según el modelo LU Discovery.",
    features: [
      "Producción de agua pura de 20, 40 o 60 L/h según el modelo LU",
      "Agua ultrapura de 18,2 MΩ·cm y dispensación de hasta 2 L/min",
      "Pantalla táctil de 5 pulgadas, trazabilidad y conectividad Ethernet/Wi-Fi documentadas",
    ],
    imageUrl: "/productos/hyperpurex-serie-lu-discovery/portada.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie LU Discovery",
      fullTitle:
        "Hyperpurex Serie LU Discovery — Sistema integrado de agua pura y ultrapura",
      subtitle:
        "Plataforma de laboratorio desde agua de red: pretratamiento, ósmosis inversa, almacenamiento, ultrapurificación y dispensación desde la unidad principal o un brazo HiDis opcional.",
      highlights: [
        "Agua ultrapura de 18,2 MΩ·cm",
        "Producción de agua pura de 20 a 60 L/h según el modelo",
        "Dispensación de agua ultrapura de hasta 2 L/min",
      ],
      advantages: [
        "La configuración LU documentada combina filtro PP de 5 µm, cartucho de carbón activado, ósmosis inversa, tanque PE, cartuchos DI y UP, con filtración terminal según la configuración seleccionada.",
        "La pantalla táctil capacitiva de 5 pulgadas centraliza la operación, los estados de los consumibles, los datos de calidad de agua y los registros históricos descritos por el fabricante.",
        "Los modelos LU-20, LU-40 y LU-60 se diferencian por su producción de agua pura; las configuraciones UV, UF y UVF añaden las etapas de reducción de TOC, ultrafiltración o ambas.",
        "El sistema documenta conexión Ethernet y Wi-Fi, exportación de registros y compatibilidad de integración con LIMS/BMS a través de las interfaces indicadas en la ficha.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos LU",
          leftValue: "LU-20, LU-40 y LU-60",
          rightParameter: "Producción de agua pura",
          rightValue: "20, 40 o 60 L/h según modelo",
        },
        {
          leftParameter: "Configuraciones",
          leftValue: "Estándar, UV, UF y UVF",
          rightParameter: "Dispensación UP",
          rightValue: "Hasta 2 L/min",
        },
        {
          leftParameter: "Resistividad UP",
          leftValue: "18,2 MΩ·cm a 25 °C",
          rightParameter: "Conductividad UP",
          rightValue: "0,055 µS/cm a 25 °C",
        },
        {
          leftParameter: "TOC",
          leftValue: "≤ 5 ppb; ≤ 2 ppb con UV",
          rightParameter: "Partículas / bacterias",
          rightValue: "< 1/mL (> 0,2 µm) / < 0,01 UFC/mL",
        },
        {
          leftParameter: "UF (modelos UF y UVF)",
          leftValue: "Endotoxinas < 0,001 EU/mL",
          rightParameter: "Corte UF",
          rightValue: "5.000 Da",
        },
        {
          leftParameter: "Agua de entrada",
          leftValue: "Red municipal; 1–6 bar; 5–40 °C",
          rightParameter: "Calidad de entrada",
          rightValue: "Conductividad < 2.000 µS/cm; dureza < 300 ppm CaCO₃",
        },
        {
          leftParameter: "Dimensiones de la unidad",
          leftValue: "370 × 623 × 600 mm",
          rightParameter: "Tanque estándar",
          rightValue: "PE de 60 L",
        },
        {
          leftParameter: "Peso de la unidad",
          leftValue: "29 kg",
          rightParameter: "Potencia",
          rightValue: "120 W (LU-20) o 240 W (LU-40 / LU-60)",
        },
      ],
      detailBlocks: [
        {
          title: "Ruta de purificación documentada",
          tone: "blue",
          items: [
            "El agua de red pasa por filtración PP de 5 µm, carbón activado y ósmosis inversa antes de su almacenamiento en el tanque PE; el tren final incorpora cartuchos DI y UP para agua ultrapura.",
            "Las variantes UV integran luz UV de 185/254 nm; las variantes UF incorporan ultrafiltración de 5.000 Da; las UVF combinan ambas etapas.",
          ],
        },
        {
          title: "Operación y trazabilidad",
          tone: "green",
          items: [
            "La interfaz documentada incluye monitoreo de calidad de agua, gestión de consumibles, autodiagnóstico, registros de operación y salida de reportes en PDF.",
            "La ficha indica interfaces USB, RJ45 y Wi-Fi, además de la posibilidad de conectar hasta cinco brazos de dispensación HiDis opcionales.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo purifica el agua",
          items: [
            "La ruta base documentada considera filtración PP, carbón activado, ósmosis inversa, tanque PE, cartuchos DI y UP, seguido de filtración terminal en el punto de dispensación.",
            "Las opciones UV, UF y UVF se seleccionan según las necesidades de bajo TOC, reducción de endotoxinas, nucleasas y otras macromoléculas descritas en la ficha.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua de red con presión de 1 a 6 bar, temperatura entre 5 y 40 °C, conductividad inferior a 2.000 µS/cm y dureza inferior a 300 ppm como CaCO₃.",
            "La ficha indica agua de entrada con TOC inferior a 2.000 ppb, cloro libre inferior a 3 ppm, pH entre 4 y 10 y CO₂ disuelto inferior a 30 ppm.",
            "Alimentación eléctrica y potencia según el modelo LU seleccionado: 120 W para LU-20 y 240 W para LU-40 o LU-60.",
          ],
        },
        {
          title: "Variantes LU documentadas",
          items: [
            "LU-20, LU-40 y LU-60: configuración estándar; LU-20UV, LU-40UV y LU-60UV: versión de bajo TOC; LU-20UF, LU-40UF y LU-60UF: eliminación de endotoxinas.",
            "LU-20UVF, LU-40UVF y LU-60UVF: configuración combinada de bajo TOC y eliminación de endotoxinas.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-lu-discovery/descripcion-diagrama-purificacion.jpeg",
        alt: "Diagrama proporcionado del flujo de purificación de la Serie LU Discovery",
        caption:
          "Diagrama proporcionado para la Serie LU Discovery: pretratamiento, ósmosis inversa, almacenamiento y etapas configurables de ultrapurificación antes de la dispensación.",
      },
      descriptionImages: [
        {
          src: "/productos/hyperpurex-serie-lu-discovery/descripcion-gestion-usuarios.png",
          alt: "Pantalla de gestión de usuarios de la Serie LU Discovery",
          caption:
            "Material visual proporcionado para la administración de usuarios en la interfaz de la Serie LU Discovery.",
        },
        {
          src: "/productos/hyperpurex-serie-lu-discovery/descripcion-calidad-agua.png",
          alt: "Pantalla de calidad de agua de la Serie LU Discovery",
          caption:
            "La interfaz proporcionada presenta el seguimiento de parámetros de calidad de agua.",
        },
        {
          src: "/productos/hyperpurex-serie-lu-discovery/descripcion-consumibles.png",
          alt: "Pantalla de estado de consumibles de la Serie LU Discovery",
          caption:
            "Material visual proporcionado para el estado y la gestión de los consumibles del sistema.",
        },
        {
          src: "/productos/hyperpurex-serie-lu-discovery/descripcion-tanque.png",
          alt: "Pantalla de estado del tanque de la Serie LU Discovery",
          caption:
            "La interfaz proporcionada muestra el estado del tanque de almacenamiento.",
        },
        {
          src: "/productos/hyperpurex-serie-lu-discovery/descripcion-proceso.png",
          alt: "Pantalla del proceso de purificación de la Serie LU Discovery",
          caption:
            "Material visual proporcionado para el seguimiento de la ruta de purificación.",
        },
        {
          src: "/productos/hyperpurex-serie-lu-discovery/descripcion-historial.png",
          alt: "Pantalla de registros de la Serie LU Discovery",
          caption:
            "La interfaz proporcionada incluye registros históricos de operación.",
        },
        {
          src: "/productos/hyperpurex-serie-lu-discovery/descripcion-registros.png",
          alt: "Pantalla de registros de datos de la Serie LU Discovery",
          caption:
            "Material visual proporcionado para la consulta de registros del sistema.",
        },
      ],
    },
    tags: [
      "Hyperpurex",
      "Serie LU Discovery",
      "Purificadores de agua",
      "Agua ultrapura",
      "Ósmosis inversa",
      "Laboratorio",
    ],
    relatedProducts: ["hyperpurex-serie-eue", "hyperpurex-serie-su-smart"],
  },
  {
    id: "hyperpurex-serie-x-flagship",
    slug: "hyperpurex-serie-x-flagship",
    name: "Hyperpurex X Flagship",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Sistema integrado de agua para laboratorio desde agua de red. La Serie X Flagship agrupa configuraciones XU, XUS y XUE con pretratamiento, ósmosis inversa, almacenamiento, pulido por resinas y dispensación según el modelo.",
    features: [
      "Familias XU, XUS y XUE con producción de 10 a 60 L/h según el modelo",
      "Agua ultrapura de 18,2 MΩ·cm y dispensación de hasta 2 L/min",
      "Pantalla táctil capacitiva de 7 pulgadas con registro, gestión de consumibles y conectividad documentada",
    ],
    imageUrl: "/productos/hyperpurex-serie-x-flagship/portada.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie X Flagship",
      fullTitle:
        "Hyperpurex Serie X Flagship — Sistema integrado de agua para laboratorio",
      subtitle:
        "Familia de sistemas desde agua de red que combina pretratamiento, ósmosis inversa, almacenamiento, pulido por resinas y dispensación. Las configuraciones XU, XUS y XUE entregan agua pura, alta pureza o ultrapura según el modelo seleccionado.",
      highlights: [
        "Agua ultrapura de 18,2 MΩ·cm a 25 °C",
        "Producción de 10 a 60 L/h según la familia y el modelo",
        "Dispensación de hasta 2 L/min",
      ],
      advantages: [
        "La documentación describe tres familias: XU con RO de una etapa, XUS con RO de doble etapa y XUE con RO de doble etapa más EDI; todas pueden configurarse con opciones UV, UF o UVF según el modelo.",
        "La pantalla táctil capacitiva de 7 pulgadas, basada en Linux, concentra parámetros de calidad, estado del tanque, consumibles, alarmas y registros de operación descritos por el fabricante.",
        "La Serie X incorpora cartuchos de pretratamiento PP y PC, módulos RO, cartuchos DI y UP, y opciones de UV, UF y filtración terminal en función de la configuración seleccionada.",
        "El sistema documenta interfaces USB, Ethernet/Wi-Fi y posibilidad de integración con LIMS o BMS; la configuración disponible debe confirmarse para cada modelo.",
      ],
      technicalParameters: [
        {
          leftParameter: "Familias Serie X",
          leftValue: "XU, XUS y XUE",
          rightParameter: "Producción",
          rightValue: "10 a 60 L/h según familia y modelo",
        },
        {
          leftParameter: "Configuraciones",
          leftValue: "Estándar, UV, UF y UVF",
          rightParameter: "Dispensación UP",
          rightValue: "Hasta 2 L/min",
        },
        {
          leftParameter: "Resistividad UP",
          leftValue: "18,2 MΩ·cm a 25 °C",
          rightParameter: "Conductividad UP",
          rightValue: "0,055 µS/cm a 25 °C",
        },
        {
          leftParameter: "Alta pureza / EDI",
          leftValue: "> 17,5 MΩ·cm (XU/XUS) o > 15 MΩ·cm (XUE)",
          rightParameter: "RO",
          rightValue: "RO simple (XU) o doble RO (XUS/XUE)",
        },
        {
          leftParameter: "TOC UP",
          leftValue: "5 ppb; 2 ppb en modelos UV/UVF",
          rightParameter: "UF en modelos UF/UVF",
          rightValue: "Endotoxinas < 0,001 EU/mL",
        },
        {
          leftParameter: "Agua de entrada",
          leftValue: "Red municipal; 1–6 bar; 5–40 °C",
          rightParameter: "Calidad de entrada",
          rightValue: "Conductividad < 2.000 µS/cm; dureza < 300 ppm CaCO₃",
        },
        {
          leftParameter: "Dimensiones de la unidad",
          leftValue: "370 × 623 × 600 mm",
          rightParameter: "Tanque estándar",
          rightValue: "PE de 60 L",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "200–240 V, 50/60 Hz",
          rightParameter: "Potencia total",
          rightValue: "240 W",
        },
      ],
      detailBlocks: [
        {
          title: "Ruta de purificación documentada",
          tone: "blue",
          items: [
            "La ruta base utiliza agua de red, cartuchos PP y PC de pretratamiento, ósmosis inversa, almacenamiento y cartuchos DI/UP. La familia XU usa RO de una etapa; XUS y XUE incorporan RO de doble etapa; XUE además incorpora EDI.",
            "Las variantes UV, UF y UVF añaden las etapas de doble longitud de onda UV, ultrafiltración o ambas, según el modelo. El material también identifica filtración terminal en el punto de dispensación.",
          ],
        },
        {
          title: "Operación, monitoreo y dispensación",
          tone: "green",
          items: [
            "La ficha documenta monitoreo de calidad para agua de alimentación, RO, DI y UP, gestión de consumibles, registro de datos de hasta cinco años y exportación por USB o plataforma cloud.",
            "La unidad principal admite dispensación general o cuantitativa; el brazo HiDis documentado ofrece modos general, cuantitativo e instantáneo. Las funciones disponibles dependen del modelo seleccionado.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo funciona",
          items: [
            "La Serie X trata agua de red mediante pretratamiento, RO y almacenamiento, y luego entrega agua de alta pureza o ultrapura después de las etapas DI y UP. Las configuraciones XUS y XUE incorporan doble RO; XUE añade EDI.",
            "Las opciones UV y UF son configuraciones de modelo: UV está asociada a bajo TOC y UF a la reducción de endotoxinas, nucleasas y proteasas bajo las condiciones indicadas en la ficha.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua de red con presión de 1 a 6 bar, temperatura de 5 a 40 °C, conductividad inferior a 2.000 µS/cm y dureza total inferior a 300 ppm como CaCO₃.",
            "La ficha también indica TOC de entrada inferior a 2.000 ppb, cloro libre inferior a 3 ppm, pH entre 4 y 10 y CO₂ disuelto inferior a 30 ppm.",
            "Alimentación eléctrica de 200–240 V a 50/60 Hz. Las dimensiones, los accesorios y la configuración final deben confirmarse para el modelo elegido.",
          ],
        },
        {
          title: "Variantes documentadas",
          items: [
            "XU-20, XU-40 y XU-60: agua ultrapura, alta pureza y RO de una etapa; XUS-13 y XUS-25: agua ultrapura, alta pureza y RO de doble etapa; XUE-10 y XUE-20: agua ultrapura, EDI y RO de doble etapa.",
            "Cada familia incluye variantes estándar, UV (bajo TOC), UF (eliminación de endotoxinas) y UVF (configuración combinada).",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-x-flagship/descripcion-diagrama-purificacion.jpeg",
        alt: "Diagrama proporcionado del flujo de purificación de la Serie X Flagship",
        caption:
          "Diagrama proporcionado para la Serie X Flagship con las rutas XU, XUS y XUE, desde la alimentación hasta la dispensación.",
      },
      descriptionImages: [
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-gestion-usuarios.png",
          alt: "Pantalla de gestión de usuarios de la Serie X Flagship",
          caption:
            "Material visual proporcionado para la administración de usuarios en la interfaz del equipo.",
        },
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-calidad-agua.png",
          alt: "Pantalla de calidad de agua de la Serie X Flagship",
          caption:
            "La interfaz proporcionada muestra valores de calidad para las salidas UP, DI, RO y el agua de alimentación.",
        },
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-consumibles.png",
          alt: "Pantalla de estado de consumibles de la Serie X Flagship",
          caption:
            "Material visual proporcionado para el seguimiento del estado de PP, PC, RO, EDI, UP, UV, UF y filtración terminal.",
        },
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-nube.png",
          alt: "Plataforma de monitoreo remoto de la Serie X Flagship",
          caption:
            "Material visual proporcionado para la plataforma de monitoreo y gestión remota documentada por el fabricante.",
        },
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-tanque.png",
          alt: "Pantalla de estado del tanque de la Serie X Flagship",
          caption:
            "La interfaz proporcionada muestra el nivel de almacenamiento del tanque.",
        },
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-proceso.png",
          alt: "Pantalla del flujo de purificación de la Serie X Flagship",
          caption:
            "Material visual proporcionado para el seguimiento del proceso de purificación y sus consumibles.",
        },
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-historial.png",
          alt: "Pantalla de historial de la Serie X Flagship",
          caption:
            "La interfaz proporcionada muestra registros de estado, alarmas y eventos de operación.",
        },
        {
          src: "/productos/hyperpurex-serie-x-flagship/descripcion-registros.png",
          alt: "Pantalla de registros de dispensación de la Serie X Flagship",
          caption:
            "Material visual proporcionado para la consulta de registros de dispensación y calidad de agua.",
        },
      ],
    },
    tags: [
      "Hyperpurex",
      "Serie X Flagship",
      "Purificadores de agua",
      "Agua ultrapura",
      "Ósmosis inversa",
      "Laboratorio",
    ],
    relatedProducts: [
      "hyperpurex-serie-eue",
      "hyperpurex-serie-lu-discovery",
      "hyperpurex-serie-su-smart",
    ],
  },
  {
    id: "hyperpurex-serie-p-pursuit",
    slug: "hyperpurex-serie-p-pursuit",
    name: "Hyperpurex P Pursuit",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Sistema de agua ultrapura para laboratorio que realiza el pulido final desde agua pretratada por RO, DI, EDI o destilación, con dispensación desde la unidad o brazo HiDis según configuración.",
    features: [
      "Agua ultrapura de 18,2 MΩ·cm a 25 °C y hasta 2,0 L/min de dispensación",
      "Configuraciones PU, PU-UV, PU-UF y PU-UVF para adaptar el tratamiento final",
      "Pantalla táctil de 7 pulgadas con registros, monitoreo y gestión de consumibles documentados",
    ],
    imageUrl: "/productos/hyperpurex-serie-p-pursuit/portada.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie P Pursuit",
      fullTitle:
        "Hyperpurex Serie P Pursuit — Sistema de agua ultrapura para laboratorio",
      subtitle:
        "Plataforma de pulido final que recibe agua pretratada por ósmosis inversa, DI, EDI o destilación y la transforma en agua ultrapura para aplicaciones analíticas y de ciencias de la vida, según la configuración seleccionada.",
      highlights: [
        "Agua ultrapura de 18,2 MΩ·cm a 25 °C",
        "Dispensación de hasta 2,0 L/min",
        "Versiones estándar, UV, UF y UVF documentadas",
      ],
      advantages: [
        "La Serie P recibe agua pretratada y la pule mediante cartucho de ultrapureza, filtración terminal y, según el modelo, UV de 185/254 nm, ultrafiltración o ambas etapas.",
        "Las configuraciones PU, PU-UV, PU-UF y PU-UVF se diferencian por las etapas de reducción de TOC y ultrafiltración documentadas en la ficha del fabricante.",
        "La pantalla táctil capacitiva de 7 pulgadas documenta calidad de agua, estado de consumibles, dispensación, alarmas y registros históricos; el equipo ofrece USB, Ethernet y Wi-Fi según la ficha.",
        "La unidad admite dispensación desde el equipo o desde un brazo HiDis; la ficha documenta conexión de hasta cinco brazos HiDis, cuya configuración debe definirse al cotizar.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos documentados",
          leftValue: "PU, PU-UV, PU-UF y PU-UVF",
          rightParameter: "Dispensación",
          rightValue: "Hasta 2,0 L/min",
        },
        {
          leftParameter: "Resistividad UP",
          leftValue: "18,2 MΩ·cm a 25 °C",
          rightParameter: "Conductividad UP",
          rightValue: "0,055 µS/cm a 25 °C",
        },
        {
          leftParameter: "TOC",
          leftValue: "≤ 5 ppb; ≤ 2 ppb con UV",
          rightParameter: "Partículas / bacterias",
          rightValue: "< 1/mL (> 0,2 µm) / < 0,01 UFC/mL",
        },
        {
          leftParameter: "UF (PU-UF / PU-UVF)",
          leftValue: "Endotoxinas < 0,001 EU/mL",
          rightParameter: "Corte UF",
          rightValue: "5.000 Da",
        },
        {
          leftParameter: "Agua de entrada",
          leftValue: "Pretratada por RO, DI, EDI o destilación",
          rightParameter: "Presión / temperatura",
          rightValue: "0–6 bar / 5–40 °C",
        },
        {
          leftParameter: "Calidad de entrada",
          leftValue: "Conductividad < 100 µS/cm; TOC < 50 ppb",
          rightParameter: "Alimentación / potencia",
          rightValue: "100–240 V, 50/60 Hz / 72 W",
        },
        {
          leftParameter: "Unidad principal",
          leftValue: "276 × 319 × 570 mm; aprox. 15 kg",
          rightParameter: "Brazo HiDis",
          rightValue: "181 × 626 × 795 mm; aprox. 4 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Ruta de pulido final documentada",
          tone: "blue",
          items: [
            "El sistema utiliza agua de alimentación ya tratada por RO, DI, EDI o destilación. La ficha sitúa el cartucho de ultrapureza y la filtración terminal en la ruta de dispensación.",
            "PU-UV incorpora UV de 185/254 nm para bajo TOC; PU-UF incorpora ultrafiltración de 5.000 Da; PU-UVF combina ambas etapas. La configuración debe seleccionarse de acuerdo con el uso requerido.",
          ],
        },
        {
          title: "Operación y trazabilidad",
          tone: "green",
          items: [
            "La interfaz Linux de 7 pulgadas está documentada con visualización de calidad de agua, estado de consumibles, usuarios, registros y alarmas; la ficha indica almacenamiento de datos de hasta cinco años.",
            "La documentación indica interfaces USB, Ethernet y Wi-Fi, exportación de datos y posibilidades de integración LIMS/BMS. La disponibilidad final depende de la configuración contratada.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo funciona",
          items: [
            "La Serie P no reemplaza el pretratamiento: recibe agua proveniente de RO, DI, EDI o destilación y realiza el pulido de ultrapureza antes de la dispensación.",
            "El cartucho UP entrega el pulido final; las variantes UV, UF y UVF agregan las etapas documentadas para bajo TOC, reducción de endotoxinas y reducción de macromoléculas, según el modelo.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua pretratada con presión de 0 a 6 bar, temperatura de 5 a 40 °C, conductividad inferior a 100 µS/cm y TOC inferior a 50 ppb.",
            "Alimentación eléctrica de 100 a 240 V, 50/60 Hz. La ficha indica una potencia de 72 W.",
            "La selección del cartucho, filtro terminal, brazo HiDis y configuración UV/UF debe corresponder al modelo y aplicación requeridos.",
          ],
        },
        {
          title: "Variantes documentadas",
          items: [
            "PU: configuración estándar. PU-UV: configuración de bajo TOC con UV. PU-UF: configuración con ultrafiltración. PU-UVF: combinación de UV y UF.",
            "En modelos UF y UVF, la ficha indica endotoxinas < 0,001 EU/mL, RNasa < 1 pg/mL, DNasa < 5 pg/mL y proteasa < 0,15 µg/mL bajo las condiciones de ensayo documentadas.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-p-pursuit/descripcion-proceso.png",
        alt: "Diagrama proporcionado del proceso de dispensación y pulido de la Serie P Pursuit",
        caption:
          "Material visual proporcionado para la ruta de pulido y dispensación de la Serie P Pursuit.",
      },
      descriptionImages: [
        {
          src: "/productos/hyperpurex-serie-p-pursuit/descripcion-registros.png",
          alt: "Pantalla de registros de dispensación de la Serie P Pursuit",
          caption: "Material visual proporcionado para la consulta de registros del sistema.",
        },
        {
          src: "/productos/hyperpurex-serie-p-pursuit/descripcion-usuarios.png",
          alt: "Pantalla de gestión de usuarios de la Serie P Pursuit",
          caption: "Material visual proporcionado para la administración de usuarios.",
        },
        {
          src: "/productos/hyperpurex-serie-p-pursuit/descripcion-calidad-agua.png",
          alt: "Pantalla de calidad de agua de la Serie P Pursuit",
          caption: "La interfaz suministrada presenta valores de calidad del agua.",
        },
        {
          src: "/productos/hyperpurex-serie-p-pursuit/descripcion-consumibles.png",
          alt: "Pantalla de estado de consumibles de la Serie P Pursuit",
          caption: "Material visual proporcionado para el seguimiento de consumibles.",
        },
        {
          src: "/productos/hyperpurex-serie-p-pursuit/descripcion-dispensacion.png",
          alt: "Pantalla de dispensación de la Serie P Pursuit",
          caption: "Material visual proporcionado para los modos de dispensación del sistema.",
        },
        {
          src: "/productos/hyperpurex-serie-p-pursuit/descripcion-alarmas.png",
          alt: "Pantalla de alarmas de la Serie P Pursuit",
          caption: "Material visual proporcionado para el registro de alarmas.",
        },
        {
          src: "/productos/hyperpurex-serie-p-pursuit/descripcion-conexiones.png",
          alt: "Panel de conexiones de la Serie P Pursuit",
          caption: "Material visual proporcionado para las conexiones posteriores del equipo.",
        },
      ],
    },
    tags: [
      "Hyperpurex",
      "Serie P Pursuit",
      "Purificadores de agua",
      "Agua ultrapura",
      "Laboratorio",
    ],
    relatedProducts: [
      "hyperpurex-serie-lu-discovery",
      "hyperpurex-serie-x-flagship",
      "hyperpurex-serie-eue",
    ],
  },
  {
    id: "hyperpurex-serie-fx-flagship",
    slug: "hyperpurex-serie-fx-flagship",
    name: "Hyperpurex FX Flagship",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Estación de agua para laboratorio desde agua de red. La Serie FX Flagship agrupa las familias FXU, FXUS, FXUE y FXDE con pretratamiento, ósmosis inversa, almacenamiento, DI o EDI y ultrapureza según el modelo.",
    features: [
      "Familias FXU, FXUS, FXUE y FXDE con 50 a 250 L/h según el modelo",
      "Agua ultrapura de 18,2 MΩ·cm en las configuraciones FXU, FXUS y FXUE",
      "Tanque PE integrado de 200 L y pantalla táctil de 7 pulgadas documentados",
    ],
    imageUrl: "/productos/hyperpurex-serie-fx-flagship/portada.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie FX Flagship",
      fullTitle:
        "Hyperpurex Serie FX Flagship — Estación de agua para laboratorio",
      subtitle:
        "Sistema de piso desde agua de red que integra pretratamiento, ósmosis inversa, almacenamiento de 200 L y etapas DI, EDI o de ultrapureza según la familia FXU, FXUS, FXUE o FXDE seleccionada.",
      highlights: [
        "Producción de 50 a 250 L/h según la familia FX",
        "Agua ultrapura de 18,2 MΩ·cm en FXU, FXUS y FXUE",
        "Tanque PE integrado de 200 L",
      ],
      advantages: [
        "La plataforma FX combina tratamiento desde agua de red, almacenamiento y suministro para laboratorios de tamaño medio; las familias se diferencian por la cantidad de etapas RO y por las etapas DI, EDI o UP disponibles.",
        "FXU utiliza RO de una etapa y DI/UP; FXUS agrega RO de doble etapa y DI/UP; FXUE combina RO de doble etapa, EDI y UP; FXDE entrega agua EDI después de RO de doble etapa, sin etapa UP documentada.",
        "La ficha documenta tanque PE integrado de 200 L, pantalla táctil capacitiva de 7 pulgadas, monitoreo de agua, gestión de consumibles y registros de operación.",
        "La plataforma puede complementarse con brazo HiDis, pretratamiento, suavizador y módulos de almacenamiento/suministro PWS identificados en la documentación del fabricante.",
      ],
      technicalParameters: [
        {
          leftParameter: "Familias Serie FX",
          leftValue: "FXU, FXUS, FXUE y FXDE",
          rightParameter: "Producción",
          rightValue: "50 a 250 L/h según familia y modelo",
        },
        {
          leftParameter: "FXU",
          leftValue: "60, 120, 180 o 250 L/h",
          rightParameter: "FXUS / FXUE / FXDE",
          rightValue: "50, 100 o 150 L/h",
        },
        {
          leftParameter: "Resistividad UP",
          leftValue: "18,2 MΩ·cm a 25 °C (FXU, FXUS y FXUE)",
          rightParameter: "EDI",
          rightValue: "> 15 MΩ·cm; < 0,067 µS/cm (FXUE / FXDE)",
        },
        {
          leftParameter: "Dispensación UP",
          leftValue: "4,2 L/min (FXU) o 2,5 L/min (FXUS / FXUE)",
          rightParameter: "TOC con UV",
          rightValue: "≤ 3 ppb",
        },
        {
          leftParameter: "Tanque integrado",
          leftValue: "PE de 200 L",
          rightParameter: "Dimensiones",
          rightValue: "607 × 722 × 1.705 mm",
        },
        {
          leftParameter: "Peso",
          leftValue: "118 kg (FXU), 137 kg (FXUS), 140 kg (FXUE) o 131 kg (FXDE)",
          rightParameter: "Alimentación",
          rightValue: "220 V, 50/60 Hz",
        },
        {
          leftParameter: "Agua de entrada",
          leftValue: "Red municipal; 1–6 bar; 5–40 °C",
          rightParameter: "Calidad de entrada",
          rightValue: "Conductividad < 2.000 µS/cm; dureza < 300 ppm CaCO₃",
        },
      ],
      detailBlocks: [
        {
          title: "Arquitectura de purificación documentada",
          tone: "blue",
          items: [
            "La Serie FX parte de agua de red y usa pretratamiento, ósmosis inversa y tanque PE de 200 L. La selección de RO simple o doble, DI, EDI y UP depende de la familia configurada.",
            "Las variantes UV, UF y UVF agregan las etapas que el fabricante documenta para bajo TOC, ultrafiltración o combinación de ambas; no todas están presentes en cada configuración.",
          ],
        },
        {
          title: "Control y distribución",
          tone: "green",
          items: [
            "La ficha documenta pantalla Linux de 7 pulgadas, monitoreo de calidad, flujo y consumibles, gestión de usuarios, registros históricos y exportación de datos por USB.",
            "El fabricante identifica módulos PWS de almacenamiento y suministro opcionales. El alcance, caudal y distribución final deben confirmarse según la instalación requerida.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo funciona",
          items: [
            "FXU entrega agua de alta pureza y ultrapura con RO de una etapa, DI y UP. FXUS agrega RO de doble etapa; FXUE agrega RO de doble etapa, EDI y UP; FXDE se documenta con RO de doble etapa y EDI, sin UP.",
            "Las configuraciones UV se asocian a bajo TOC y las UF/UVF a ultrafiltración. La familia y variante deben definirse con la calidad de agua y aplicación objetivo.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua de red con presión de 1 a 6 bar, temperatura entre 5 y 40 °C, conductividad inferior a 2.000 µS/cm y dureza inferior a 300 ppm como CaCO₃.",
            "La ficha indica TOC de entrada inferior a 2.000 ppb, cloro libre inferior a 3 ppm, pH entre 4 y 10 y CO₂ disuelto inferior a 40 ppm.",
            "Alimentación eléctrica de 220 V, 50/60 Hz. El espacio, los accesorios, el módulo PWS y la familia FX deben validarse antes de la instalación.",
          ],
        },
        {
          title: "Variantes documentadas",
          items: [
            "FXU-60, FXU-120, FXU-180 y FXU-250: RO de una etapa, DI y UP. FXUS-50, -100 y -150: RO de doble etapa, DI y UP.",
            "FXUE-50, -100 y -150: RO de doble etapa, EDI y UP. FXDE-50, -100 y -150: RO de doble etapa y EDI. Las versiones UV, UF y UVF se documentan como configuraciones de las familias con ultrapureza.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-fx-flagship/descripcion-diagrama-purificacion.jpeg",
        alt: "Diagrama proporcionado del flujo de purificación de la Serie FX Flagship",
        caption:
          "Diagrama de proceso proporcionado para las rutas de purificación de la Serie FX Flagship.",
      },
      descriptionImages: [
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-registros.png",
          alt: "Pantalla de registros de dispensación de la Serie FX Flagship",
          caption: "Material visual proporcionado para los registros del sistema.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-usuarios.png",
          alt: "Pantalla de gestión de usuarios de la Serie FX Flagship",
          caption: "Material visual proporcionado para la administración de usuarios.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-calidad-agua.png",
          alt: "Pantalla de calidad de agua de la Serie FX Flagship",
          caption: "La interfaz proporcionada presenta valores de calidad de agua.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-consumibles.png",
          alt: "Pantalla de consumibles de la Serie FX Flagship",
          caption: "Material visual proporcionado para el estado de consumibles.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-equipo.png",
          alt: "Vista del equipo Serie FX Flagship",
          caption: "Material visual proporcionado de la unidad de la Serie FX Flagship.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-tanque.png",
          alt: "Pantalla de tanque de la Serie FX Flagship",
          caption: "Material visual proporcionado para el estado del tanque integrado.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-proceso.png",
          alt: "Pantalla del proceso de la Serie FX Flagship",
          caption: "Material visual proporcionado para el seguimiento del proceso de purificación.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-alarmas.png",
          alt: "Pantalla de alarmas de la Serie FX Flagship",
          caption: "Material visual proporcionado para los registros de alarmas.",
        },
        {
          src: "/productos/hyperpurex-serie-fx-flagship/descripcion-conexiones.png",
          alt: "Panel de conexiones de la Serie FX Flagship",
          caption: "Material visual proporcionado para las conexiones posteriores del equipo.",
        },
      ],
    },
    tags: [
      "Hyperpurex",
      "Serie FX Flagship",
      "Purificadores de agua",
      "Agua ultrapura",
      "Ósmosis inversa",
      "Laboratorio",
    ],
    relatedProducts: [
      "hyperpurex-serie-x-flagship",
      "hyperpurex-serie-lu-discovery",
      "hyperpurex-serie-p-pursuit",
    ],
  },
  {
    id: "hyperpurex-serie-fe-eminente",
    slug: "hyperpurex-serie-fe-eminente",
    name: "Hyperpurex FE Eminent",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Sistema de pie para laboratorio desde agua de red. La Serie FE Eminent agrupa configuraciones de agua RO, alta pureza, EDI y ultrapura con producción de 50 a 250 L/h según la familia y el modelo.",
    features: [
      "Familias FEU, FED, FEUS, FEDS, FEUE, FEDE y FERS documentadas",
      "Agua ultrapura de 18,2 MΩ·cm a 25 °C en las configuraciones FEU, FEUS y FEUE",
      "Pantalla táctil IPS de 5 pulgadas, gestión de consumibles y registros de operación",
    ],
    imageUrl: "/productos/hyperpurex-serie-fe-eminente/portada.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie FE Eminent",
      fullTitle:
        "Hyperpurex Serie FE Eminent — Sistema de agua para laboratorio",
      subtitle:
        "Plataforma de pie desde agua de red que combina pretratamiento, RO simple o doble, DI, EDI y ultrapureza según la familia FE seleccionada.",
      highlights: [
        "Producción de 50 a 250 L/h según familia y modelo",
        "Agua ultrapura de 18,2 MΩ·cm a 25 °C en las familias FEU, FEUS y FEUE",
        "Pantalla táctil IPS de 5 pulgadas y tanque presurizado integrado de 7,5 L",
      ],
      advantages: [
        "La Serie FE permite seleccionar una ruta de agua RO, alta pureza, EDI o ultrapura sin cambiar la plataforma de pie; la configuración depende de la familia y variante elegida.",
        "Las familias FEU, FEUS y FEUE combinan etapas de DI y UP para agua ultrapura. FED, FEDS, FEDE y FERS cubren configuraciones de alta pureza, EDI o RO según el modelo.",
        "La documentación del fabricante incluye control táctil, monitoreo de calidad de agua, gestión de consumibles, registros históricos y opciones de comunicación según la configuración.",
      ],
      technicalParameters: [
        {
          leftParameter: "Familias Serie FE",
          leftValue: "FEU, FED, FEUS, FEDS, FEUE, FEDE y FERS",
          rightParameter: "Producción",
          rightValue: "50 a 250 L/h según familia y modelo",
        },
        {
          leftParameter: "Modelos FEU / FED",
          leftValue: "60, 120, 180 o 250 L/h",
          rightParameter: "Modelos FEUS / FEDS / FEUE / FEDE / FERS",
          rightValue: "50, 100 o 150 L/h",
        },
        {
          leftParameter: "Agua ultrapura",
          leftValue: "18,2 MΩ·cm y 0,055 µS/cm a 25 °C (FEU, FEUS y FEUE)",
          rightParameter: "Agua DI / EDI",
          rightValue: ">17,5 MΩ·cm (DI) o >10 MΩ·cm (EDI), según familia",
        },
        {
          leftParameter: "Dispensación",
          leftValue: "Hasta 4,2 L/min (FEU/FED) o 2,5 L/min (familias de 50–150 L/h)",
          rightParameter: "TOC con UV",
          rightValue: "3 ppb en las variantes UV documentadas",
        },
        {
          leftParameter: "Entrada de agua",
          leftValue: "Red municipal; 1–6 bar; 5–40 °C",
          rightParameter: "Calidad de entrada",
          rightValue: "Conductividad <2.000 µS/cm; dureza <300 ppm como CaCO₃",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "220 V, 50/60 Hz",
          rightParameter: "Dimensiones del equipo",
          rightValue: "450 × 521 × 1.016 mm; varía con tanque en modelos EDI",
        },
      ],
      detailBlocks: [
        {
          title: "Ruta de purificación según familia",
          tone: "blue",
          items: [
            "FEU utiliza RO de una etapa, DI y UP; FEUS utiliza RO de doble etapa, DI y UP. FEUE incorpora RO de doble etapa, EDI y UP.",
            "FED entrega agua de alta pureza y RO de una etapa; FEDS usa RO de doble etapa; FEDE combina RO de doble etapa y EDI; FERS entrega agua RO simple y doble RO.",
          ],
        },
        {
          title: "Control, registros y seguridad",
          tone: "green",
          items: [
            "La documentación describe una pantalla táctil IPS capacitiva de 5 pulgadas, monitoreo de agua, vida útil de consumibles, gestión de usuarios y exportación de datos por USB; las interfaces de red dependen de la configuración.",
            "El fabricante documenta alarmas por falta o baja presión de entrada, presión alta, tanque lleno, calidad de agua fuera de límite y fin de vida de cartuchos.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Variantes y capacidades",
          items: [
            "FEU y FED: 60, 120, 180 o 250 L/h. FEUS, FEDS, FEUE, FEDE y FERS: 50, 100 o 150 L/h.",
            "Las variantes UV, UF y UVF se documentan para las familias de ultrapureza; UV se asocia a bajo TOC y UF a remoción de endotoxinas, RNasas, DNasas y proteasas según la tabla técnica del fabricante.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua de red con presión entre 1 y 6 bar, temperatura de 5 a 40 °C, conductividad inferior a 2.000 µS/cm, dureza inferior a 300 ppm como CaCO₃, TOC inferior a 2.000 ppb, cloro libre inferior a 3 ppm, pH 4–10 y CO₂ disuelto inferior a 40 ppm.",
            "Alimentación eléctrica de 220 V, 50/60 Hz. La familia, caudal, tanque y accesorios deben definirse de acuerdo con la calidad de entrada y el volumen de consumo requerido.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-fe-eminente/descripcion-diagrama-purificacion.jpeg",
        alt: "Diagrama de purificación proporcionado para la Serie FE Eminent",
        caption: "Diagrama de proceso proporcionado para las etapas de purificación de la Serie FE Eminent.",
      },
      descriptionImages: [
        {
          src: "/productos/hyperpurex-serie-fe-eminente/descripcion-registros.png",
          alt: "Pantalla de consulta de registros de dispensación de la Serie FE Eminent",
          caption: "Interfaz suministrada para la consulta de registros de dispensación.",
        },
        {
          src: "/productos/hyperpurex-serie-fe-eminente/descripcion-estado-operacion.png",
          alt: "Pantalla de estado de operación de la Serie FE Eminent",
          caption: "Interfaz suministrada para el seguimiento de parámetros de operación.",
        },
        {
          src: "/productos/hyperpurex-serie-fe-eminente/descripcion-consumibles.png",
          alt: "Pantalla de gestión de consumibles de la Serie FE Eminent",
          caption: "Interfaz suministrada para la gestión de vida útil de consumibles.",
        },
        {
          src: "/productos/hyperpurex-serie-fe-eminente/descripcion-equipo-dispensador.png",
          alt: "Panel y brazo dispensador de la Serie FE Eminent",
          caption: "Material visual suministrado del equipo y brazo dispensador.",
        },
        {
          src: "/productos/hyperpurex-serie-fe-eminente/descripcion-estado-operacion-2.png",
          alt: "Vista adicional del estado de operación de la Serie FE Eminent",
          caption: "Vista adicional suministrada para el estado de operación.",
        },
        {
          src: "/productos/hyperpurex-serie-fe-eminente/descripcion-desinfeccion.png",
          alt: "Pantalla de desinfección de la Serie FE Eminent",
          caption: "Interfaz suministrada para el programa de desinfección.",
        },
        {
          src: "/productos/hyperpurex-serie-fe-eminente/descripcion-conexiones.png",
          alt: "Panel de conexiones de la Serie FE Eminent",
          caption: "Material visual suministrado del panel de conexiones.",
        },
      ],
    },
    tags: [
      "Hyperpurex",
      "Serie FE Eminent",
      "Purificadores de agua",
      "Agua ultrapura",
      "Ósmosis inversa",
      "Laboratorio",
    ],
    relatedProducts: [
      "hyperpurex-serie-fx-flagship",
      "hyperpurex-serie-x-flagship",
      "hyperpurex-serie-p-pursuit",
    ],
  },
  {
    id: "hyperpurex-serie-fs-smart",
    slug: "hyperpurex-serie-fs-smart",
    name: "Hyperpurex FS Smart",
    category: "Purificadores de agua",
    filters: [
      "Marcas",
      "Purificadores de agua",
      "Análisis de agua",
      "Equipamiento analítico",
    ],
    description:
      "Sistema de pie para laboratorio desde agua de red. La Serie FS Smart agrupa las variantes FSU y FSD con ósmosis inversa, almacenamiento y etapas de ultrapurificación según la configuración.",
    features: [
      "Modelos FSU/FSD de 10, 20, 30 o 40 L/h",
      "Agua ultrapura de 18,2 MΩ·cm a 25 °C documentada para la serie",
      "Pantalla LCD, autolavado RO y tanque PE de 30, 60 o 100 L",
    ],
    imageUrl: "/productos/hyperpurex-serie-fs-smart/portada.png",
    detail: {
      brand: "Hyperpurex",
      model: "Serie FS Smart",
      fullTitle: "Hyperpurex Serie FS Smart — Sistema de agua para laboratorio",
      subtitle:
        "Sistema de pie desde agua de red para producir agua RO y ultrapura, con control LCD, doble etapa RO, tanque PE y etapas de pulido según el modelo FSU o FSD.",
      highlights: [
        "Modelos FSU/FSD de 10, 20, 30 o 40 L/h",
        "Agua ultrapura de 18,2 MΩ·cm a 25 °C",
        "Tanque PE estéril integrado de 30, 60 o 100 L",
      ],
      advantages: [
        "La Serie FS integra prefiltración, doble ósmosis inversa, almacenamiento y pulido para laboratorios generales; las configuraciones FSU y FSD se agrupan en una misma plataforma de pie.",
        "La documentación describe una pantalla LCD para resistividad, conductividad y temperatura, además de autolavado programado de las membranas RO y control por sensor de nivel.",
        "Las opciones de UV, ultrafiltración y filtro terminal se documentan como etapas de la configuración de purificación; deben seleccionarse de acuerdo con la aplicación requerida.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelos",
          leftValue: "FSU-10/20/30/40 y FSD-10/20/30/40",
          rightParameter: "Producción RO",
          rightValue: "10, 20, 30 o 40 L/h",
        },
        {
          leftParameter: "Agua ultrapura",
          leftValue: "18,2 MΩ·cm a 25 °C; 0,055 µS/cm",
          rightParameter: "Agua RO",
          rightValue: "Conductividad <5 µS/cm; desalinización >98 %",
        },
        {
          leftParameter: "Dispensación UP",
          leftValue: "1,5–2,0 L/min",
          rightParameter: "TOC con UV",
          rightValue: "<5–10 ppb",
        },
        {
          leftParameter: "Tanque PE",
          leftValue: "30, 60 o 100 L",
          rightParameter: "Dimensiones",
          rightValue: "Aprox. 450 × 480 × 1.100 mm",
        },
        {
          leftParameter: "Entrada de agua",
          leftValue: "Red municipal; 0,1–0,4 MPa; 5–45 °C",
          rightParameter: "Alimentación",
          rightValue: "220 V CA, 50 Hz; 60–150 W",
        },
      ],
      detailBlocks: [
        {
          title: "Ruta de purificación documentada",
          tone: "blue",
          items: [
            "El flujo descrito parte con pretratamiento PP y carbón activado, seguido por doble RO, tanque PE, UV, columnas UP, ultrafiltración y filtro terminal según la configuración instalada.",
            "El autolavado programado de RO y el control de nivel del tanque se documentan como funciones del sistema para el funcionamiento desde agua de red.",
          ],
        },
        {
          title: "Control y protección",
          tone: "green",
          items: [
            "La pantalla LCD informa resistividad, conductividad y temperatura. La ficha también describe apagado de protección de la bomba ante caída o falta de presión de entrada.",
            "La documentación indica alarma visual y sonora por desviación de calidad del agua y detención de producción cuando el tanque alcanza su capacidad máxima.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Variantes documentadas",
          items: [
            "FSU-10, FSU-20, FSU-30 y FSU-40; FSD-10, FSD-20, FSD-30 y FSD-40. Las variantes se distinguen por su tasa de producción de agua RO de 10 a 40 L/h.",
            "Las etapas UV, UF y filtro terminal están descritas en la documentación; su incorporación depende de la configuración seleccionada.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          items: [
            "Agua potable de red municipal con TDS inferior a 200 ppm, presión entre 0,1 y 0,4 MPa y temperatura entre 5 y 45 °C.",
            "Alimentación de 220 V CA, 50 Hz. La selección de tanque y etapas de purificación se debe confirmar con el volumen y uso de agua requeridos.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Ficha técnica oficial pendiente",
          text: "La carpeta fuente de la Serie FS Smart no contiene un PDF técnico oficial del fabricante. Por ello, no se verificaron normas, certificaciones ni declaraciones de cumplimiento para esta ficha.",
        },
        {
          title: "Parámetros pendientes de confirmación técnica",
          text: "Los parámetros y configuraciones visibles proceden del material descriptivo disponible en la carpeta; deben contrastarse con la ficha oficial del fabricante antes de una cotización o especificación de instalación.",
        },
      ],
      applicationNotes: [
        {
          label: "Pendiente de confirmación técnica",
          text: "No se validaron aplicaciones, prestaciones ni configuraciones adicionales contra un PDF técnico oficial de la Serie FS Smart.",
        },
      ],
      descriptionImage: {
        src: "/productos/hyperpurex-serie-fs-smart/descripcion-diagrama-purificacion.jpeg",
        alt: "Diagrama de purificación proporcionado para la Serie FS Smart",
        caption: "Diagrama de proceso suministrado para las etapas de purificación de la Serie FS Smart.",
      },
    },
    tags: [
      "Hyperpurex",
      "Serie FS Smart",
      "Purificadores de agua",
      "Agua ultrapura",
      "Ósmosis inversa",
      "Laboratorio",
    ],
    relatedProducts: [
      "hyperpurex-serie-fe-eminente",
      "hyperpurex-serie-eue",
      "hyperpurex-serie-su-smart",
    ],
  },
  {
    id: "hanon-f2000",
    slug: "hanon-f2000",
    name: "Analizador de fibras F2000",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización"],
    description:
      "Analizador automático de fibras que integra digestión, filtración, limpieza y descarga de residuos para la determinación de fibra en alimentos, piensos y otras muestras vegetales.",
    features: [
      "Procesa 24 muestras por lote",
      "Programas CF, NDF y ADF editables",
      "Flujo automatizado con pantalla táctil de 7 pulgadas",
    ],
    imageUrl: "/productos/hanon-f2000/portada.webp",
    tags: [
      "hanon",
      "f2000",
      "fibra",
      "fibra cruda",
      "fibra detergente",
      "celulosa",
      "hemicelulosa",
      "lignina detergente ácida",
      "alimentos",
      "piensos",
    ],
    relatedProducts: ["hanon-f800", "hanon-sox606", "hanon-k1160"],
    detail: {
      brand: "Hanon",
      model: "F2000",
      fullTitle: "Hanon F2000 Analizador automático de fibras",
      subtitle:
        "Sistema de un solo toque para análisis de fibra que utiliza bolsas filtrantes y automatiza la adición de líquido, digestión, agitación, limpieza y descarga de residuos. Opera con muestras de 0,5 a 1,0 g y alimentación de CA 220 V.",
      highlights: [
        "24 muestras por lote y capacidad diaria de al menos 4 lotes",
        "Biblioteca de métodos CF, NDF y ADF con más de 1.000 programas configurables",
        "Bolsas filtrantes para reducir la compactación de muestras y la obstrucción del crisol",
      ],
      advantages: [
        "Integra digestión, filtración, limpieza y descarga de residuos en un solo equipo.",
        "Automatiza la adición de líquido, ebullición, agitación, limpieza y eliminación de residuos.",
        "El tanque de digestión metálico de una sola pieza está tratado para resistencia a temperatura, presión y corrosión química.",
        "Incluye alarma por falta de líquido, detección dual de temperatura y presión, válvula mecánica de seguridad y bloqueo electromagnético de puerta.",
      ],
      technicalParameters: [
        {
          leftParameter: "Métodos de fibra",
          leftValue: "CF, NDF, ADF y otros programas de la biblioteca",
          rightParameter: "Programas configurables",
          rightValue: "Más de 1.000",
        },
        {
          leftParameter: "Tamaño de muestra",
          leftValue: "0,5 – 1,0 g",
          rightParameter: "Rango de medición de fibra",
          rightValue: "0 – 100 %",
        },
        {
          leftParameter: "Precisión de temperatura",
          leftValue: "±0,1 °C",
          rightParameter: "Repetibilidad",
          rightValue: "≤0,5 %",
        },
        {
          leftParameter: "Capacidad por lote",
          leftValue: "24 muestras",
          rightParameter: "Capacidad diaria",
          rightValue: "≥4 lotes (96 unidades)",
        },
        {
          leftParameter: "Pantalla y sistema",
          leftValue: "Táctil de 7 pulgadas con Android integrado",
          rightParameter: "Alimentación",
          rightValue: "CA 220 ±10 % V, 50 Hz",
        },
        {
          leftParameter: "Dimensiones",
          leftValue: "520 × 450 × 510 mm",
          rightParameter: "Peso neto",
          rightValue: "52 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Flujo automatizado de análisis",
          tone: "blue",
          items: [
            "El proceso de adición de líquido, digestión, agitación, limpieza y descarga de residuos se completa desde la pantalla táctil.",
            "La función de precalentamiento calienta el agua antes del lavado de muestra durante el ensayo.",
            "El proceso se realiza en estado cerrado, sin condensación de agua según la ficha técnica.",
          ],
        },
        {
          title: "Métodos y filtración documentados",
          tone: "yellow",
          items: [
            "Se basa en los métodos de Wendt y Paradigm indicados en la documentación del fabricante.",
            "Las bolsas filtrantes reemplazan los crisoles durante la filtración y ayudan a reducir el endurecimiento de la muestra y las obstrucciones.",
            "La biblioteca integrada incluye programas CF, NDF, ADF y otros que pueden editarse según muestra y elemento de prueba.",
          ],
        },
        {
          title: "Seguridad de operación",
          tone: "red",
          items: [
            "La alarma por falta de líquido detiene el funcionamiento cuando el disolvente es insuficiente.",
            "La detección dual de temperatura y presión detiene el calentamiento ante sobrecalentamiento; la válvula mecánica libera presión si se supera su límite.",
            "El cierre electromagnético bloquea la tapa de la olla de ebullición durante el experimento.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Tipos de fibra",
          text: "La documentación indica determinación de fibra cruda, fibra detergente, celulosa, hemicelulosa y lignina detergente ácida.",
        },
        {
          label: "Muestras indicadas",
          text: "Alimentos, piensos y otras muestras vegetales.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/hanon-f2000/descripcion-panel.webp",
          alt: "Pantalla principal del analizador de fibras Hanon F2000",
          caption: "Interfaz de la pantalla táctil incluida en la documentación del F2000.",
        },
        {
          src: "/productos/hanon-f2000/descripcion-ejecucion.webp",
          alt: "Pantalla de ejecución de un método de fibra del Hanon F2000",
          caption: "Vista de ejecución de programas de análisis de fibra.",
        },
        {
          src: "/productos/hanon-f2000/descripcion-tanque.webp",
          alt: "Tanque de digestión del analizador Hanon F2000",
          caption: "Tanque de digestión metálico integrado del equipo.",
        },
        {
          src: "/productos/hanon-f2000/descripcion-bolsa-filtrante.webp",
          alt: "Bolsa filtrante utilizada por el analizador Hanon F2000",
          caption: "Bolsa filtrante mostrada en el material técnico del F2000.",
        },
      ],
    },
  },
  {
    id: "hanon-df06",
    slug: "hanon-df06",
    name: "Analizador de fibra dietética DF06",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización"],
    description:
      "Analizador automático para determinación de fibra dietética total, soluble e insoluble en alimentos, con hidrólisis enzimática, sedimentación, lavado y filtración integrados.",
    features: [
      "Seis canales controlados de forma independiente",
      "Hidrólisis enzimática, sedimentación y lavado con un botón",
      "Filtración por presión negativa sin soplado inverso",
    ],
    imageUrl: "/productos/hanon-df06/portada.webp",
    tags: [
      "hanon",
      "df06",
      "fibra dietética",
      "tdf",
      "sdf",
      "idf",
      "alimentos",
      "filtración",
      "hidrólisis enzimática",
    ],
    relatedProducts: ["hanon-f800", "hanon-f2000", "hanon-sox606"],
    detail: {
      brand: "Hanon",
      model: "DF06",
      fullTitle: "Hanon DF06 Analizador de fibra dietética",
      subtitle:
        "Equipo de seis canales para determinar fibra dietética total, soluble e insoluble en alimentos. Integra la adición de líquidos, calentamiento, agitación, sedimentación y filtración; utiliza muestras de 0,2 a 1 g y alimentación de CA 220 V.",
      highlights: [
        "Seis canales independientes para fibra dietética total, soluble e insoluble",
        "Hidrólisis enzimática, sedimentación y lavado automatizados",
        "Trazabilidad de operación con inicio de sesión de tres niveles",
      ],
      advantages: [
        "Controla automáticamente el sellado y la apertura de la bolsa de reacción durante la hidrólisis enzimática.",
        "Transfiere la muestra a filtración mediante una bolsa de reacción flexible de paso directo tras la sedimentación.",
        "Incluye limpieza automática de tuberías y monitorización de temperatura por canal.",
        "Usa filtración por presión negativa sin soplado inverso ni fuentes de gas externas.",
      ],
      technicalParameters: [
        {
          leftParameter: "Determinaciones",
          leftValue: "Fibra dietética total (TDF), soluble (SDF) e insoluble (IDF)",
          rightParameter: "Peso de muestra",
          rightValue: "0,2 – 1 g",
        },
        {
          leftParameter: "Rango de medición",
          leftValue: "0 – 100 %",
          rightParameter: "Desviación estándar",
          rightValue: "≤1 %",
        },
        {
          leftParameter: "Control de temperatura",
          leftValue: "±1 °C",
          rightParameter: "Capacidad por lote",
          rightValue: "6 canales",
        },
        {
          leftParameter: "Tiempo de prueba TDF",
          leftValue: "3,5 h",
          rightParameter: "Tiempo de prueba IDF/SDF",
          rightValue: "1 – 3 h, según tipo de muestra",
        },
        {
          leftParameter: "Método de filtración",
          leftValue: "Presión negativa, sin soplado inverso",
          rightParameter: "Potencia nominal",
          rightValue: "1300 W",
        },
        {
          leftParameter: "Alimentación",
          leftValue: "CA 220 ±10 V, (50 ±1) Hz",
          rightParameter: "Dimensiones",
          rightValue: "800 × 350 × 650 mm",
        },
        {
          leftParameter: "Peso neto",
          leftValue: "60 kg",
          rightParameter: "Biblioteca de métodos",
          rightValue: "Protocolos preestablecidos recuperables con un botón",
        },
      ],
      detailBlocks: [
        {
          title: "Automatización de la preparación",
          tone: "blue",
          items: [
            "Integra adición automática de líquidos, calentamiento, agitación, sedimentación y filtración.",
            "Controla el sellado y la apertura de la bolsa de reacción durante la hidrólisis enzimática para evitar la evaporación de reactivos a alta temperatura.",
            "Los seis canales pueden controlarse de forma independiente según la cantidad de muestras.",
          ],
        },
        {
          title: "Transferencia y filtración",
          tone: "yellow",
          items: [
            "La bolsa de reacción flexible de paso directo transfiere la muestra automáticamente a filtración tras la sedimentación.",
            "La agitación sin contacto favorece la mezcla de muestra y solución enzimática sin contacto directo con la muestra.",
            "Las membranas filtrantes pueden digerirse e incinerarse directamente con la muestra, según la ficha técnica.",
          ],
        },
        {
          title: "Control y trazabilidad",
          tone: "red",
          items: [
            "La limpieza automática de tuberías ayuda a evitar obstrucciones asociadas al deterioro de las soluciones enzimáticas.",
            "La temperatura de cada canal se controla y monitoriza durante el experimento.",
            "El equipo dispone de biblioteca de métodos y de inicio de sesión de tres niveles con nombre de usuario y contraseña.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Trazabilidad de operaciones",
          text: "La ficha técnica describe inicio de sesión de tres niveles con nombre de usuario y contraseña, con trazabilidad completa de operaciones.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/hanon-df06/descripcion-adicion-enzima.webp",
          alt: "Pantalla de adición enzimática del analizador Hanon DF06",
          caption: "Etapa de adición enzimática mostrada en la interfaz del DF06.",
        },
        {
          src: "/productos/hanon-df06/descripcion-sedimentacion.webp",
          alt: "Pantalla de sedimentación del analizador Hanon DF06",
          caption: "Etapa de sedimentación documentada para el DF06.",
        },
        {
          src: "/productos/hanon-df06/descripcion-lavado.webp",
          alt: "Pantalla de lavado del analizador Hanon DF06",
          caption: "Etapa de lavado mostrada en la documentación del equipo.",
        },
      ],
    },
  },
  {
    id: "distek-ezfill-plus",
    slug: "distek-ezfill-plus",
    name: "Distek ezfill+",
    category: "Área farmacéutica",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento analítico"],
    description:
      "Sistema de desaireación y dispensación automatizada de medios para ensayos de disolución, con control por método, calentamiento en línea y reportes de preparación.",
    features: [
      "Volúmenes configurables de 250 a 1.000 mL",
      "Temperaturas desde ambiente hasta 45 °C",
      "Desaireación por alto vacío y dispensación precisa",
    ],
    imageUrl: "/productos/distek-ezfill-plus/portada.png",
    tags: [
      "Distek",
      "ezfill+",
      "ensayos de disolución",
      "desaireación de medios",
      "dispensación de medios",
    ],
    relatedProducts: ["distek-olera"],
    detail: {
      brand: "Distek",
      model: "ezfill+",
      fullTitle: "Distek ezfill+ — Preparación de medios para disolución",
      subtitle:
        "Sistema de desaireación y dispensación automatizada, controlado por métodos, para simplificar la preparación de medios en ensayos de disolución.",
      highlights: [
        "Desaireación por alto vacío y dispensación de volumen preciso",
        "Volúmenes de 250 a 1.000 mL y temperaturas desde ambiente hasta 45 °C",
        "Controlador integrado con pantalla táctil, métodos almacenados y reportes",
      ],
      advantages: [
        "Automatiza la desaireación y la dispensación de medios según el método seleccionado.",
        "El calentamiento en línea evita calentar tanques de medio a granel.",
        "Los reportes incluyen parámetros de dispensación e información de usuario para el seguimiento de la preparación.",
        "Puede trasladarse entre baños con carro móvil opcional y dispensar directamente en los vasos mediante una boquilla remota disponible.",
      ],
      technicalParameters: [
        {
          leftParameter: "Volumen de dispensación",
          leftValue: "250 a 1.000 mL, seleccionable por usuario o método",
          rightParameter: "Temperatura",
          rightValue: "Desde ambiente hasta 45 °C",
        },
        {
          leftParameter: "Desaireación",
          leftValue: "Alto vacío",
          rightParameter: "Calentamiento",
          rightValue: "En línea",
        },
        {
          leftParameter: "Tiempo de dispensación",
          leftValue: "Aproximadamente 90 segundos; depende de volumen y temperatura",
          rightParameter: "Surfactantes",
          rightValue: "Compatible con hasta 2 %",
        },
        {
          leftParameter: "Control",
          leftValue: "Controlador integrado con pantalla táctil, métodos y reportes",
          rightParameter: "Dispensación remota",
          rightValue: "Boquilla disponible para llenar vasos en su posición",
        },
        {
          leftParameter: "Exactitud de dispensación",
          leftValue: "El mayor valor entre 1 % del volumen establecido o ±5 mL",
          rightParameter: "Filtro de entrada",
          rightValue: "Portafiltro en línea de 25 mm",
        },
        {
          leftParameter: "Métodos y usuarios",
          leftValue: "Manual o automático; hasta 100 métodos y 50 usuarios",
          rightParameter: "Interfaz de PC",
          rightValue: "USB y Ethernet",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "115 V ±15 V, 50/60 Hz, 15 A; o 230 V ±15 V, 50/60 Hz, 8 A, preconfigurado de fábrica",
          rightParameter: "Dimensiones y peso",
          rightValue: "31 × 70 × 26 cm; 19 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Preparación controlada por método",
          tone: "blue",
          items: [
            "El controlador integrado permite ejecutar métodos almacenados y generar reportes con parámetros de dispensación e información de usuario.",
            "La desaireación por alto vacío y la entrega precisa de volumen se combinan con calentamiento en línea para preparar el medio.",
          ],
        },
        {
          title: "Configuración de uso",
          tone: "green",
          items: [
            "El sistema puede trasladarse entre baños con un carro móvil opcional.",
            "La boquilla de dispensación remota disponible permite llenar directamente los vasos en su posición y el material indica compatibilidad con la mayoría de los baños de disolución del mercado.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo prepara el medio",
          items: [
            "La preparación integra calentamiento en línea, desaireación por alto vacío y dispensación de volumen preciso bajo control de método.",
            "El ciclo de dispensación se informa como aproximadamente 90 segundos; el fabricante indica que depende del volumen y de la temperatura seleccionados.",
          ],
        },
        {
          title: "Configuración documentada",
          items: [
            "Admite medios con hasta 2 % de surfactantes. El carro móvil y la boquilla remota son opciones disponibles según la configuración.",
            "El PDF documenta un aumento de calefacción de hasta 20 °C desde el punto de partida; la alimentación debe seleccionarse en fábrica para 115 V o 230 V.",
            "La redacción de la especificación de desaireación combina un máximo de 3,0 ppm y un punto final no menor de 5,0 ppm bajo ensayo con agua a 41 °C. Requiere confirmación técnica del fabricante antes de usarla como criterio de aceptación.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Normas y certificaciones no identificadas",
          text: "Los archivos proporcionados para ezfill+ no incluyen normas, certificados ni declaraciones regulatorias específicas.",
        },
        {
          title: "Trazabilidad de la preparación documentada",
          text: "El material describe reportes con parámetros de dispensación e información de usuario para el seguimiento de la preparación de medios; esta información no constituye una certificación.",
        },
      ],
      applicationNotes: [
        {
          label: "Ensayos de disolución",
          text: "Preparación de medios mediante desaireación y dispensación automatizadas para ensayos de disolución.",
        },
        {
          label: "Preparación de medios",
          text: "Dispensación de medios de 250 a 1.000 mL a temperaturas desde ambiente hasta 45 °C, con selección por usuario o método.",
        },
      ],
      relatedVideo: {
        label: "ezfill+",
        src: "/productos/distek-ezfill-plus/video-relacionado.mp4",
        poster: "/productos/distek-ezfill-plus/portada.png",
      },
      descriptionImages: [
        {
          src: "/productos/distek-ezfill-plus/descripcion-controlador.jpg",
          alt: "Controlador integrado del sistema Distek ezfill+",
          caption: "Controlador integrado con pantalla táctil para métodos y reportes.",
        },
        {
          src: "/productos/distek-ezfill-plus/descripcion-dispensacion.jpg",
          alt: "Dispensación de medios con Distek ezfill+",
          caption: "Material proporcionado para la dispensación de medios del sistema ezfill+.",
        },
        {
          src: "/productos/distek-ezfill-plus/descripcion-configuracion.jpg",
          alt: "Configuración del Distek ezfill+ para medios de disolución",
          caption: "Material proporcionado para la configuración de preparación de medios ezfill+.",
        },
      ],
    },
  },
  {
    id: "distek-olera",
    slug: "distek-olera",
    name: "Distek OLERA",
    category: "Área farmacéutica",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento analítico"],
    description:
      "Sistema para ensayos de disolución con calefacción y circulación integradas, pantalla táctil de 10 pulgadas y alineación automatizada de vasos.",
    features: [
      "Calefacción y circulación integradas en el baño",
      "Pantalla táctil de alta resolución de 10 pulgadas",
      "Alineación automatizada de vasos acculign+",
    ],
    imageUrl: "/productos/distek-olera/portada.png",
    tags: [
      "Distek",
      "OLERA",
      "ensayos de disolución",
      "calefacción integrada",
      "alineación de vasos",
    ],
    relatedProducts: ["distek-ezfill-plus"],
    detail: {
      brand: "Distek",
      model: "OLERA",
      fullTitle: "Distek OLERA — Sistema para ensayos de disolución",
      subtitle:
        "Equipo de ensayos de disolución con calentamiento y circulación integrados en el baño, control térmico, pantalla táctil y alineación automatizada de vasos.",
      highlights: [
        "Pantalla táctil de alta resolución de 10 pulgadas (25 cm)",
        "Calefacción y circulación integradas en el baño",
        "Alineación automatizada de vasos acculign+",
      ],
      advantages: [
        "Integra calefacción y circulación en el baño, sin requerir un calentador o circulador externo.",
        "La pantalla táctil de 10 pulgadas simplifica los flujos de operación.",
        "El indicador visual HALO permite confirmar el estado del sistema de un vistazo.",
        "Pulse permite monitoreo remoto opcional desde un navegador, con alertas por correo electrónico y mensajes de texto.",
      ],
      technicalParameters: [
        {
          leftParameter: "Pantalla",
          leftValue: "Táctil de alta resolución de 10 pulgadas (25 cm)",
          rightParameter: "Calefacción y circulación",
          rightValue: "Integradas en el baño",
        },
        {
          leftParameter: "Indicador de estado",
          leftValue: "HALO visual",
          rightParameter: "Alineación de vasos",
          rightValue: "Automatizada con acculign+",
        },
        {
          leftParameter: "Monitoreo remoto",
          leftValue: "Pulse opcional desde cualquier navegador, sin software adicional",
          rightParameter: "Alertas Pulse",
          rightValue: "Correo electrónico y mensajes de texto",
        },
        {
          leftParameter: "Operación a baja temperatura",
          leftValue: "Opcional, desde ambiente hasta 5 °C",
          rightParameter: "Requisito de baja temperatura",
          rightValue: "Requiere chiller externo no suministrado por Distek",
        },
        {
          leftParameter: "Número de vasos",
          leftValue: "6 u 8 posiciones",
          rightParameter: "Volumen de medio",
          rightValue: "300 a 1.000 mL; 25 a 250 mL con kit opcional de bajo volumen",
        },
        {
          leftParameter: "Rango y exactitud de temperatura",
          leftValue: "Ambiente a 55 °C; 5 a 55 °C con OLERA Flex; ±0,25 °C",
          rightParameter: "Medición de temperatura",
          rightValue: "Continua mediante sensor calibrado ubicado en el baño",
        },
        {
          leftParameter: "Rango y exactitud de rpm",
          leftValue: "25 a 350 rpm; ±1 rpm hasta 100 rpm y ±1 % sobre 100 rpm",
          rightParameter: "Métodos y usuarios",
          rightValue: "Manual o hasta 500 métodos preprogramados; hasta 250 usuarios",
        },
        {
          leftParameter: "Puertos y control remoto",
          leftValue: "Ethernet (1), USB-C (2); Distek Cipher, Eclipse 5300 u Opt-Diss 410",
          rightParameter: "Condiciones de laboratorio",
          rightValue: "20 a 25 °C; humedad relativa de 20 a 80 %",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "115 V ±15 V, 50/60 Hz, 15 A; o 230 V ±15 V, 50/60 Hz, 8 A, preconfigurado de fábrica",
          rightParameter: "Dimensiones y peso",
          rightValue: "61 × 94 × 51 cm; 36 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Control integrado del ensayo",
          tone: "blue",
          items: [
            "La calefacción y circulación integradas eliminan la necesidad de un calentador o circulador externo.",
            "La pantalla táctil de 10 pulgadas y el control térmico apoyan una operación consistente.",
          ],
        },
        {
          title: "Monitoreo y configuración opcional",
          tone: "green",
          items: [
            "Pulse permite acceso opcional al estado de disolución desde un navegador, sin software adicional, e incluye alertas por correo electrónico y mensajes de texto.",
            "Flex Low Temperature es una opción para pruebas desde ambiente hasta 5 °C y requiere un chiller externo no suministrado por Distek.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo opera",
          items: [
            "El equipo integra calefacción y circulación en el baño y utiliza la pantalla táctil de 10 pulgadas para simplificar los flujos de trabajo.",
            "acculign+ centra y alinea los vasos de manera automatizada para una posición repetible.",
          ],
        },
        {
          title: "Lo que necesita para baja temperatura",
          items: [
            "La operación Flex Low Temperature es opcional, trabaja desde ambiente hasta 5 °C y requiere un chiller externo que no es suministrado por Distek.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Normas y certificaciones no identificadas",
          text: "Los archivos proporcionados para OLERA no incluyen normas, certificados ni declaraciones regulatorias específicas del equipo.",
        },
      ],
      applicationNotes: [
        {
          label: "Ensayos de disolución",
          text: "Sistema destinado a ensayos de disolución con control térmico, calefacción y circulación integradas.",
        },
        {
          label: "Integridad de datos",
          text: "La carpeta describe requisitos de integridad de datos y trazabilidad para ensayos de disolución.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/distek-olera/descripcion-interfaz.jpg",
          alt: "Interfaz de pantalla táctil del sistema Distek OLERA",
          caption: "Pantalla táctil de alta resolución de 10 pulgadas documentada para OLERA.",
        },
        {
          src: "/productos/distek-olera/descripcion-sistema.jpg",
          alt: "Sistema de ensayos de disolución Distek OLERA",
          caption: "Material proporcionado para la configuración del sistema OLERA.",
        },
      ],
    },
  },
  {
    id: "distek-olera-plus",
    slug: "distek-olera-plus",
    name: "Distek OLERA Plus",
    category: "Área farmacéutica",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento analítico"],
    description:
      "Sistema para ensayos de disolución con monitoreo continuo de temperatura dentro de cada vaso, calefacción y circulación integradas.",
    features: [
      "Monitoreo de temperatura dentro de cada vaso",
      "Pantalla táctil de alta resolución de 10 pulgadas",
      "Calefacción y circulación integradas en el baño",
    ],
    imageUrl: "/productos/distek-olera-plus/portada.png",
    tags: [
      "Distek",
      "OLERA Plus",
      "ensayos de disolución",
      "monitoreo de temperatura",
      "calefacción integrada",
    ],
    relatedProducts: [
      "distek-olera",
      "distek-olera-select",
      "distek-ezfill-plus",
    ],
    detail: {
      brand: "Distek",
      model: "OLERA Plus",
      fullTitle: "Distek OLERA Plus — Sistema para ensayos de disolución",
      subtitle:
        "Equipo para ensayos de disolución que mide y registra continuamente la temperatura dentro de cada vaso, con calefacción y circulación integradas.",
      highlights: [
        "Monitoreo patentado de temperatura dentro de cada vaso",
        "Pantalla táctil de alta resolución de 10 pulgadas (25 cm)",
        "Calefacción y circulación integradas en el baño",
      ],
      advantages: [
        "Los sensores incorporados en el eje miden, muestran y registran la temperatura durante el ensayo sin impacto hidrodinámico, según el material fuente.",
        "La calefacción y circulación integradas eliminan la necesidad de un calentador o circulador externo.",
        "El indicador visual HALO permite confirmar el estado del sistema de un vistazo.",
        "Pulse permite monitoreo remoto opcional desde un navegador, con alertas por correo electrónico y mensajes de texto.",
      ],
      technicalParameters: [
        {
          leftParameter: "Pantalla",
          leftValue: "Táctil de alta resolución de 10 pulgadas (25 cm)",
          rightParameter: "Temperatura en vaso",
          rightValue: "Monitoreo, visualización y registro continuos mediante sensores en el eje",
        },
        {
          leftParameter: "Calefacción y circulación",
          leftValue: "Integradas en el baño",
          rightParameter: "Indicador de estado",
          rightValue: "HALO visual",
        },
        {
          leftParameter: "Alineación de vasos",
          leftValue: "Automatizada con acculign+",
          rightParameter: "Monitoreo remoto",
          rightValue: "Pulse opcional desde cualquier navegador, sin software adicional",
        },
        {
          leftParameter: "Operación a baja temperatura",
          leftValue: "Opcional, desde ambiente hasta 5 °C",
          rightParameter: "Requisito de baja temperatura",
          rightValue: "Requiere chiller externo no suministrado por Distek",
        },
        {
          leftParameter: "Número de vasos",
          leftValue: "6 u 8 posiciones",
          rightParameter: "Volumen de medio",
          rightValue: "300 a 1.000 mL; 25 a 250 mL con kit opcional de bajo volumen",
        },
        {
          leftParameter: "Rango y exactitud de temperatura",
          leftValue: "Ambiente a 55 °C; 5 a 55 °C con OLERA Flex; ±0,25 °C",
          rightParameter: "Medición de temperatura",
          rightValue: "Continua desde cada vaso mediante sensor instalado en el eje",
        },
        {
          leftParameter: "Rango y exactitud de rpm",
          leftValue: "25 a 350 rpm; ±1 rpm hasta 100 rpm y ±1 % sobre 100 rpm",
          rightParameter: "Métodos y usuarios",
          rightValue: "Manual o hasta 500 métodos preprogramados; hasta 250 usuarios",
        },
        {
          leftParameter: "Puertos y control remoto",
          leftValue: "Ethernet (1), USB-C (2); Distek Cipher, Eclipse 5300 u Opt-Diss 410",
          rightParameter: "Condiciones de laboratorio",
          rightValue: "20 a 25 °C; humedad relativa de 20 a 80 %",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "115 V ±15 V, 50/60 Hz, 15 A; o 230 V ±15 V, 50/60 Hz, 8 A, preconfigurado de fábrica",
          rightParameter: "Dimensiones y peso",
          rightValue: "61 × 94 × 51 cm; 36 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Monitoreo térmico durante el ensayo",
          tone: "blue",
          items: [
            "Los sensores patentados en el eje miden, muestran y registran automáticamente la temperatura dentro de cada vaso durante el ensayo.",
            "El material indica que este monitoreo no tiene impacto hidrodinámico.",
          ],
        },
        {
          title: "Configuración y monitoreo opcionales",
          tone: "green",
          items: [
            "Pulse ofrece acceso opcional al estado de disolución desde un navegador, sin software adicional, y alertas por correo electrónico y mensajes de texto.",
            "Flex Low Temperature es una opción para pruebas desde ambiente hasta 5 °C y requiere un chiller externo no suministrado por Distek.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo mide la temperatura",
          items: [
            "El monitoreo continuo se realiza dentro de cada vaso mediante sensores patentados en el eje; el sistema mide, muestra y registra los datos durante el ensayo.",
            "La fuente declara que el monitoreo no tiene impacto hidrodinámico.",
          ],
        },
        {
          title: "Lo que necesita para baja temperatura",
          items: [
            "La operación Flex Low Temperature es opcional, trabaja desde ambiente hasta 5 °C y requiere un chiller externo que no es suministrado por Distek.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Normas y certificaciones no identificadas",
          text: "Los archivos proporcionados para OLERA Plus no incluyen normas, certificados ni declaraciones regulatorias específicas del equipo.",
        },
        {
          title: "Monitoreo patentado documentado",
          text: "El material fuente describe sensores patentados en el eje para monitoreo de temperatura dentro de cada vaso; no identifica un número de patente ni constituye una certificación.",
        },
      ],
      applicationNotes: [
        {
          label: "Ensayos de disolución",
          text: "Sistema destinado a ensayos de disolución con medición y registro continuo de temperatura dentro de cada vaso.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/distek-olera-plus/descripcion-vasos.jpg",
          alt: "Vaso del sistema Distek OLERA Plus",
          caption: "Detalle del conjunto de vasos del sistema OLERA Plus.",
        },
        {
          src: "/productos/distek-olera-plus/descripcion-componente.jpg",
          alt: "Componente del sistema Distek OLERA Plus junto a un vaso",
          caption: "Detalle de un componente integrado junto a un vaso del sistema OLERA Plus.",
        },
      ],
    },
  },
  {
    id: "distek-olera-select",
    slug: "distek-olera-select",
    name: "Distek OLERA Select",
    category: "Área farmacéutica",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento analítico"],
    description:
      "Sistema para ensayos de disolución con tecnología de calentamiento sin baño, monitoreo de temperatura dentro de cada vaso y operación hasta 99 °C.",
    features: [
      "Calentamiento sin baño ni termocirculador",
      "Calienta el medio a 37 °C en menos de 15 minutos",
      "Operación desde ambiente hasta 99 °C",
    ],
    imageUrl: "/productos/distek-olera-select/portada.png",
    tags: [
      "Distek",
      "OLERA Select",
      "ensayos de disolución",
      "calentamiento sin baño",
      "monitoreo de temperatura",
    ],
    relatedProducts: [
      "distek-olera",
      "distek-olera-plus",
      "distek-ezfill-plus",
    ],
    detail: {
      brand: "Distek",
      model: "OLERA Select",
      fullTitle: "Distek OLERA Select — Sistema para ensayos de disolución",
      subtitle:
        "Equipo para ensayos de disolución con tecnología de calentamiento sin baño, medición continua de temperatura dentro de cada vaso y operación hasta 99 °C.",
      highlights: [
        "Calentamiento sin baño ni termocirculador",
        "Medio a 37 °C en menos de 15 minutos",
        "Operación desde ambiente hasta 99 °C",
      ],
      advantages: [
        "La tecnología Bathless Heating elimina el baño de agua y el termocirculador, y la fuente indica una reducción de uso de energía de hasta 40 %.",
        "Calienta el medio desde ambiente hasta 37 °C en menos de 15 minutos.",
        "Los sensores patentados en el eje miden, muestran y registran la temperatura dentro de cada vaso durante el ensayo.",
        "Pulse permite monitoreo remoto opcional desde un navegador, con alertas por correo electrónico y mensajes de texto.",
      ],
      technicalParameters: [
        {
          leftParameter: "Pantalla",
          leftValue: "Táctil de alta resolución de 10 pulgadas (25 cm)",
          rightParameter: "Calentamiento",
          rightValue: "Bathless Heating, sin baño de agua ni termocirculador",
        },
        {
          leftParameter: "Temperatura de operación",
          leftValue: "Desde ambiente hasta 99 °C",
          rightParameter: "Calentamiento a 37 °C",
          rightValue: "Menos de 15 minutos desde ambiente",
        },
        {
          leftParameter: "Temperatura en vaso",
          leftValue: "Monitoreo, visualización y registro continuos mediante sensores en el eje",
          rightParameter: "Indicador de estado",
          rightValue: "HALO visual",
        },
        {
          leftParameter: "Monitoreo remoto",
          leftValue: "Pulse opcional desde cualquier navegador, sin software adicional",
          rightParameter: "Alertas Pulse",
          rightValue: "Correo electrónico y mensajes de texto",
        },
        {
          leftParameter: "Número de vasos",
          leftValue: "6 u 8 posiciones",
          rightParameter: "Volumen de medio",
          rightValue: "300 a 1.000 mL; 25 a 100 mL con kit opcional de bajo volumen",
        },
        {
          leftParameter: "Exactitud de temperatura",
          leftValue: "±0,25 °C hasta 45 °C; ±0,50 °C entre 46 y 99 °C",
          rightParameter: "Medición de temperatura",
          rightValue: "Continua desde cada vaso mediante sensor instalado en el eje",
        },
        {
          leftParameter: "Rango y exactitud de rpm",
          leftValue: "25 a 350 rpm; ±1 rpm hasta 100 rpm y ±1 % sobre 100 rpm",
          rightParameter: "Métodos y usuarios",
          rightValue: "Manual con activación individual de vasos o hasta 500 métodos; hasta 250 usuarios",
        },
        {
          leftParameter: "Puertos y control remoto",
          leftValue: "Ethernet (1), USB-C (2); Distek Cipher, Eclipse 5300 u Opt-Diss 410",
          rightParameter: "Condiciones de laboratorio",
          rightValue: "20 a 25 °C; humedad relativa de 20 a 80 %",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "115 V ±15 V, 50/60 Hz, 15 A; o 230 V ±15 V, 50/60 Hz, 8 A, preconfigurado de fábrica",
          rightParameter: "Dimensiones y peso",
          rightValue: "61 × 94 × 51 cm; 36 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Calentamiento sin baño",
          tone: "blue",
          items: [
            "La tecnología Bathless Heating elimina el baño de agua y el termocirculador.",
            "El material indica una reducción de uso de energía de hasta 40 %, calentamiento a 37 °C en menos de 15 minutos y operación hasta 99 °C.",
          ],
        },
        {
          title: "Monitoreo y operación",
          tone: "green",
          items: [
            "Los sensores patentados en el eje miden, muestran y registran automáticamente la temperatura dentro de cada vaso durante el ensayo, sin impacto hidrodinámico según la fuente.",
            "Pulse ofrece acceso opcional al estado de disolución desde un navegador, sin software adicional, y alertas por correo electrónico y mensajes de texto.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo calienta el medio",
          items: [
            "Bathless Heating elimina el baño de agua y el termocirculador; el material declara que lleva el medio desde ambiente a 37 °C en menos de 15 minutos.",
            "La operación se especifica desde ambiente hasta 99 °C para aplicaciones especializadas.",
          ],
        },
        {
          title: "Cómo mide la temperatura",
          items: [
            "Los sensores patentados en el eje miden, muestran y registran automáticamente la temperatura dentro de cada vaso durante el ensayo.",
            "La fuente declara que el monitoreo no tiene impacto hidrodinámico.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Normas y certificaciones no identificadas",
          text: "Los archivos proporcionados para OLERA Select no incluyen normas, certificados ni declaraciones regulatorias específicas del equipo.",
        },
        {
          title: "Monitoreo patentado documentado",
          text: "El material fuente describe sensores patentados en el eje para monitoreo de temperatura dentro de cada vaso; no identifica un número de patente ni constituye una certificación.",
        },
      ],
      applicationNotes: [
        {
          label: "Ensayos de disolución",
          text: "Sistema destinado a ensayos de disolución con calentamiento sin baño y operación desde ambiente hasta 99 °C.",
        },
        {
          label: "Aplicaciones especializadas",
          text: "El rango hasta 99 °C se documenta para aplicaciones especializadas.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/distek-olera-select/descripcion-vasos.jpg",
          alt: "Vasos del sistema Distek OLERA Select",
          caption: "Detalle del conjunto de vasos del sistema OLERA Select.",
        },
      ],
    },
  },
  {
    id: "distek-opt-diss-410",
    slug: "distek-opt-diss-410",
    name: "Distek Opt-Diss 410",
    category: "Área farmacéutica",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento analítico"],
    description:
      "Sistema UV de fibra óptica in situ para ensayos de disolución. Mide directamente dentro del vaso, sin muestreo manual o automatizado, y adquiere puntos de datos desde cada cinco segundos.",
    features: [
      "Medición UV in situ entre 200 y 405 nm",
      "Hasta 12 canales y adquisición desde cada 5 segundos",
      "Sondas ARCH, Variprobe y de inmersión para distintas longitudes de paso",
    ],
    imageUrl: "/productos/distek-opt-diss-410/portada.png",
    tags: [
      "Distek",
      "Opt-Diss 410",
      "UV de fibra óptica",
      "ensayos de disolución",
      "medición in situ",
      "ARCH",
      "Variprobe",
    ],
    relatedProducts: [
      "distek-eclipse-5300",
      "distek-olera",
      "distek-ezfill-plus",
    ],
    detail: {
      brand: "Distek",
      model: "Opt-Diss 410",
      fullTitle: "Distek Opt-Diss 410 — UV de fibra óptica para disolución",
      subtitle:
        "Sistema de medición UV por fibra óptica que realiza el análisis de disolución directamente en el vaso. La adquisición y el análisis se realizan sin retirar muestras del medio.",
      highlights: [
        "Rango UV de 200 a 405 nm con detector CCD optimizado para UV",
        "Hasta 12 canales y recolección de espectros desde cada 5 segundos",
        "Sondas ARCH y Variprobe con longitudes de paso documentadas",
      ],
      advantages: [
        "Mide dentro del vaso y evita el muestreo manual o automatizado, junto con filtros, tubing y jeringas asociados.",
        "Las sondas ARCH patentadas se describen con impacto hidrodinámico despreciable para ensayos de disolución.",
        "Variprobe permite seleccionar longitudes de paso de 2, 5, 10 o 20 mm para ajustar la medición a distintas concentraciones.",
        "La ficha documenta análisis simultáneo de dos componentes sin LC cuando existen dos API o variaciones espectrales por excipientes, recubrimientos o cápsulas.",
      ],
      technicalParameters: [
        {
          leftParameter: "Rango UV y exactitud de longitud de onda",
          leftValue: "200 a 405 nm ±5 nm; ±2 nm o mejor",
          rightParameter: "Fuente y detector",
          rightValue: "Lámpara de deuterio y detector CCD de grado científico optimizado para UV",
        },
        {
          leftParameter: "Capacidad de canales",
          leftValue: "Hasta 12 canales",
          rightParameter: "Sondas compatibles",
          rightValue: "ARCH, Variprobe y sondas de inmersión",
        },
        {
          leftParameter: "Longitud de paso ARCH",
          leftValue: "0,25; 0,5; 1; 2; 5 y 10 mm",
          rightParameter: "Longitud de paso Variprobe / inmersión",
          rightValue: "2; 5; 10 y 20 mm",
        },
        {
          leftParameter: "Adquisición y absorbancia",
          leftValue: "Espectros desde cada 5 segundos; 0 a 2,0 AU",
          rightParameter: "Ruido óptico",
          rightValue: "±0,002 AU a 250 nm por 100 s; ±0,005 AU a 250 nm por 1 h",
        },
        {
          leftParameter: "Control de instrumentos de disolución",
          leftValue: "Distek 2500 / 2500 RTD / 2500 Select, Evolution 6100 / 6300 y symphony 7100 con software Rev. 2.00 o posterior",
          rightParameter: "Cumplimiento documentado",
          rightValue: "Consulte con nuestro equipo técnico sobre cumplimiento normativo",
        },
        {
          leftParameter: "Condiciones de laboratorio",
          leftValue: "20 a 25 °C; humedad relativa de 20 a 80 %",
          rightParameter: "Alimentación eléctrica",
          rightValue: "115 a 230 V ±15 V, 50/60 Hz, 10 A, preconfigurado de fábrica",
        },
        {
          leftParameter: "Dimensiones y peso",
          leftValue: "33 × 57 × 56 cm; 25 kg",
          rightParameter: "Luz parásita",
          rightValue: "Menor de 1 %",
        },
      ],
      detailBlocks: [
        {
          title: "Medición dentro del vaso",
          tone: "blue",
          items: [
            "El sistema desplaza luz en vez de líquido y mide directamente en el vaso, por lo que no requiere retirar muestras para análisis fuera de línea.",
            "La adquisición automatizada puede generar perfiles de disolución con puntos de tiempo desde cada cinco segundos sin interacción del operador, según el fabricante.",
            "El paquete de software único controla la solución completa de disolución UV por fibra óptica.",
          ],
        },
        {
          title: "Sondas y análisis multicomponente",
          tone: "green",
          items: [
            "Las sondas ARCH están diseñadas para ensayos de disolución; Variprobe ajusta la longitud de paso entre 2, 5, 10 y 20 mm para acomodar diferentes concentraciones.",
            "La ficha documenta cuantificación de dos componentes en un mismo ensayo sin LC, incluso cuando excipientes, recubrimientos o cápsulas modifican los espectros UV.",
            "Las imágenes fuente también muestran adaptadores de 750 mL (P/N 3250-0238), 900 mL (P/N 3250-0237) y 1.000 mL (P/N 3250-0236).",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Configuración y requisitos",
          items: [
            "El equipo requiere seleccionar en fábrica una de las opciones de alimentación de 115 a 230 V; opera en ambiente de 20 a 25 °C y humedad relativa de 20 a 80 %.",
            "Para controlar los instrumentos de disolución enumerados, la ficha requiere software Rev. 2.00 o posterior.",
          ],
        },
      ],
      applicationNotes: [
        {
          label: "Ensayos de disolución UV in situ",
          text: "Medición de disolución directamente dentro del vaso para eliminar muestreo, filtración y análisis UV fuera de línea asociados.",
        },
        {
          label: "Análisis multicomponente",
          text: "Cuantificación de dos componentes en el mismo ensayo sin LC cuando se analizan dos API o cambios espectrales por excipientes, recubrimientos o cápsulas.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/distek-opt-diss-410/descripcion-puntas.jpg",
          alt: "Puntas mostradas para Distek Opt-Diss 410",
          caption: "Puntas visibles de 2, 5, 10 y 20 mm.",
        },
        {
          src: "/productos/distek-opt-diss-410/descripcion-adaptadores.jpg",
          alt: "Adaptadores mostrados para Distek Opt-Diss 410",
          caption: "Adaptadores visibles de 750, 900 y 1.000 mL con sus números de parte.",
        },
        {
          src: "/productos/distek-opt-diss-410/descripcion-soporte.jpg",
          alt: "Detalle de soporte mostrado para Distek Opt-Diss 410",
          caption: "Detalle de un componente mostrado en el material visual del Opt-Diss 410.",
        },
      ],
    },
  },
  {
    id: "distek-eclipse-5300",
    slug: "distek-eclipse-5300",
    name: "Distek Eclipse 5300",
    category: "Área farmacéutica",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento analítico"],
    description:
      "Muestreador automático para ensayos de disolución con bombas de jeringa de precisión, trayecto de muestra de 4,5 mL y opción de cambiador de filtros integrado.",
    features: [
      "Bombas de jeringa de precisión para muestreo",
      "Volumen interno mínimo de 4,5 mL",
      "Cambiador de filtros integrado opcional",
    ],
    imageUrl: "/productos/distek-eclipse-5300/portada.png",
    tags: [
      "Distek",
      "Eclipse 5300",
      "muestreo de disolución",
      "bombas de jeringa",
      "cambiador de filtros",
    ],
    relatedProducts: [
      "distek-opt-diss-410",
      "distek-olera",
      "distek-ezfill-plus",
    ],
    detail: {
      brand: "Distek",
      model: "Eclipse 5300",
      fullTitle: "Distek Eclipse 5300 — Muestreador automático de disolución",
      subtitle:
        "Muestreador automático de disolución con bombas de jeringa de precisión, trayecto optimizado de volumen interno mínimo y opciones de filtración y gestión de medios.",
      highlights: [
        "Bombas de jeringa de precisión para muestreo rápido",
        "Trayecto de muestra con volumen interno mínimo de 4,5 mL",
        "Cambiador de filtros integrado opcional",
      ],
      advantages: [
        "Las bombas de jeringa de precisión y el trayecto de muestra reducido permiten recolección rápida y precisa de puntos de tiempo.",
        "El equipo elimina válvulas y bombas rotatorias; el fabricante indica que esto reduce fuentes habituales de arrastre de muestra.",
        "El cambiador de filtros integrado opcional utiliza filtros de jeringa certificados por Distek de 25 mm, con membrana y tamaño de poro equivalentes a los filtros de laboratorio.",
        "La solución opcional de dos baños permite ejecutar dos métodos de disolución diferentes e independientes.",
      ],
      technicalParameters: [
        {
          leftParameter: "Muestreo",
          leftValue: "Bombas de jeringa de precisión",
          rightParameter: "Volumen interno del trayecto",
          rightValue: "Mínimo de 4,5 mL",
        },
        {
          leftParameter: "Válvulas y bombas rotatorias",
          leftValue: "No utiliza válvulas ni bombas rotatorias",
          rightParameter: "Interfaz",
          rightValue: "Pantalla táctil a color con interfaz por iconos",
        },
        {
          leftParameter: "Cambiador de filtros",
          leftValue: "Integrado opcional; filtros de jeringa Distek de 25 mm",
          rightParameter: "Configuración de dos baños",
          rightValue: "Opcional; dos métodos de disolución independientes",
        },
        {
          leftParameter: "Gestión de medios",
          leftValue: "Reciclaje y reemplazo de medios",
          rightParameter: "Muestra recolectada",
          rightValue: "Reemplazo del volumen para cálculos de disolución",
        },
        {
          leftParameter: "Capacidad de tubos y viales",
          leftValue: "Tubos de vidrio de 15 mL; viales de 2 mL",
          rightParameter: "Conjuntos y puntos de muestra",
          rightValue: "Hasta 192 muestras (8 × 12) y 24 puntos de tiempo; más de 12 requiere cambio de gradilla",
        },
        {
          leftParameter: "Volumen y caudal de muestra",
          leftValue: "0,5 a 15 mL; 8 a 50 mL/min",
          rightParameter: "Precisión volumétrica",
          rightValue: "±0,15 mL",
        },
        {
          leftParameter: "Métodos y usuarios",
          leftValue: "100 métodos internos; hasta 50 usuarios con niveles de acceso",
          rightParameter: "Trazabilidad",
          rightValue: "Audit trail para registrar y reportar cambios de métodos",
        },
        {
          leftParameter: "Puertos de interfaz",
          leftValue: "USB (dos, uno frontal), Ethernet y tres RS-232",
          rightParameter: "Dimensiones y peso estándar",
          rightValue: "41 × 57 × 60 cm; 31 kg",
        },
        {
          leftParameter: "Con cambiador de filtros",
          leftValue: "57 × 67 × 60 cm; 36,6 kg",
          rightParameter: "Alimentación eléctrica",
          rightValue: "100 a 120 V, 50/60 Hz, 2 A; o 200 a 240 V, 50/60 Hz, 1 A, preconfigurado de fábrica",
        },
      ],
      detailBlocks: [
        {
          title: "Trayecto de muestra optimizado",
          tone: "blue",
          items: [
            "Las bombas de jeringa de precisión y un trayecto de muestra de volumen interno mínimo de 4,5 mL se destinan a la recolección rápida y precisa de puntos de tiempo.",
            "El fabricante indica que la eliminación de válvulas y bombas rotatorias mejora la confiabilidad y reduce fuentes de arrastre de muestra.",
          ],
        },
        {
          title: "Filtración y configuración opcionales",
          tone: "green",
          items: [
            "El cambiador de filtros integrado es opcional y utiliza filtros de jeringa certificados por Distek de 25 mm; no usa placas de filtro personalizadas.",
            "La configuración opcional de dos baños permite ejecutar dos métodos de disolución diferentes e independientes en cualquier momento.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Cómo toma la muestra",
          items: [
            "Las bombas de jeringa de precisión y el trayecto de muestra reducido permiten una recolección de puntos de tiempo de alta precisión.",
            "El fabricante indica que la manipulación de fluidos imita estrechamente el muestreo manual.",
          ],
        },
        {
          title: "Medios y filtración",
          items: [
            "Media Recycling and Replacement devuelve el medio no utilizado y repone el volumen de muestra recolectado para facilitar los cálculos de disolución.",
            "El cambiador de filtros integrado es una opción; no se incluye material de consumibles asociado en la carpeta fuente.",
          ],
        },
        {
          title: "Capacidad y conectividad",
          items: [
            "Admite hasta 192 muestras en dos gradillas de tubos de 16 × 100 mm; la ficha indica que más de 12 puntos de tiempo requiere un cambio de gradilla.",
            "La interfaz incluye dos puertos USB, Ethernet y tres puertos RS-232; el equipo almacena hasta 100 métodos internos y admite hasta 50 usuarios con niveles de acceso.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Normas y certificaciones no identificadas",
          text: "Los archivos proporcionados para Eclipse 5300 no incluyen normas, certificados ni declaraciones regulatorias específicas del equipo.",
        },
        {
          title: "Trazabilidad de métodos documentada",
          text: "La ficha técnica describe un audit trail que registra y reporta cambios en los métodos. Esta función no equivale por sí sola a una certificación regulatoria.",
        },
      ],
      applicationNotes: [
        {
          label: "Muestreo para ensayos de disolución",
          text: "Muestreo rápido y preciso de puntos de tiempo mediante bombas de jeringa y trayecto de muestra de volumen interno mínimo.",
        },
        {
          label: "Dos baños de disolución",
          text: "La configuración opcional de dos baños permite ejecutar dos métodos de disolución diferentes e independientes.",
        },
        {
          label: "Cálculos de disolución",
          text: "El reciclaje y reemplazo de medios devuelve el medio no utilizado y repone el volumen recolectado para facilitar los cálculos de disolución.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/distek-eclipse-5300/descripcion-muestras.jpg",
          alt: "Detalle de las posiciones de muestra del Distek Eclipse 5300",
          caption: "Detalle del sistema de posiciones de muestra mostrado para Eclipse 5300.",
        },
      ],
    },
  },
  {
    id: "distek-bione-bioreactor",
    slug: "distek-bione-bioreactor",
    name: "Distek BIOne Bioreactor",
    category: "Bioprocesos",
    filters: ["Marcas", "Bioprocesos"],
    description:
      "Biorreactor autoclavable de banco para cultivo celular, con agitación magnética, transferencia de oxígeno y volúmenes de trabajo de 0,95 a 10 L.",
    features: [
      "Modelos autoclavables de 2, 5 y 10 L",
      "17 o más puertos en la placa superior según modelo",
      "Agitación magnética con impulsor de palas inclinadas",
    ],
    imageUrl: "/productos/distek-bione-bioreactor/portada.png",
    tags: [
      "Distek",
      "BIOne",
      "biorreactor",
      "cultivo celular",
      "bioproceso upstream",
    ],
    relatedProducts: ["distek-bione-fermentor"],
    detail: {
      brand: "Distek",
      model: "BIOne Bioreactor",
      fullTitle: "Distek BIOne Bioreactor — Cultivo celular autoclavable",
      subtitle:
        "Biorreactor autoclavable de banco para aplicaciones upstream de cultivo celular. Combina transferencia de oxígeno, agitación magnética y recipientes de 2, 5 o 10 L para adaptar el volumen de trabajo al bioproceso.",
      highlights: [
        "Volúmenes de trabajo desde 0,95 hasta 10 L según modelo",
        "17 o más puertos en la placa superior para versatilidad de proceso",
        "Agitación magnética con impulsor de palas inclinadas de bajo esfuerzo de cizalla",
      ],
      advantages: [
        "Los componentes están diseñados para minimizar las fuerzas de cizalla hidrodinámica y mantener la transferencia de oxígeno dentro del sistema.",
        "La agitación magnética elimina los sellos mecánicos para reducir fricción y el riesgo de contaminación.",
        "El diseño modular permite integrar el sistema de biorreactor BIOne de un solo uso de Distek.",
        "La línea incluye configuraciones autoclavables de 2, 5 y 10 L para necesidades de bioproceso distintas.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo autoclavable de 2 L",
          leftValue: "Volumen total: 3 L; volumen de trabajo: 0,95 a 2 L",
          rightParameter: "Modelo autoclavable de 5 L",
          rightValue: "Volumen total: 7 L; volumen de trabajo: 1,7 a 5 L",
        },
        {
          leftParameter: "Modelo autoclavable de 10 L",
          leftValue: "Volumen total: 13 L; volumen de trabajo: 3 a 10 L",
          rightParameter: "Puertos en placa superior",
          rightValue: "17 o más; la distribución depende del volumen del recipiente",
        },
        {
          leftParameter: "Puertos de 2 L",
          leftValue: "5 × M18, 2 × M12, 7 × M10 y 3 × M6",
          rightParameter: "Puertos de 5 L",
          rightValue: "6 × M18, 2 × M12 y 12 × M10",
        },
        {
          leftParameter: "Puertos de 10 L",
          leftValue: "6 × M18, 5 × M12 y 10 × M10",
          rightParameter: "Tipo de impulsor",
          rightValue: "Palas inclinadas de bajo esfuerzo de cizalla",
        },
        {
          leftParameter: "Diámetro de impulsor de 2 L",
          leftValue: "45 mm",
          rightParameter: "Diámetro de impulsor de 5 L",
          rightValue: "60 mm",
        },
        {
          leftParameter: "Diámetro de impulsor de 10 L",
          leftValue: "79 mm",
          rightParameter: "Agitación",
          rightValue: "Accionamiento magnético",
        },
        {
          leftParameter: "Diámetro y altura interna del recipiente",
          leftValue: "2 L: 130 × 250 mm; 5 L: 160 × 357 mm; 10 L: 190 × 470 mm",
          rightParameter: "Altura máxima ensamblada",
          rightValue: "2 L: 478 mm; 5 L: 580 mm; 10 L: 752 mm",
        },
        {
          leftParameter: "Sparger estándar incluido",
          leftValue: "2 y 5 L: 7 × 0,86 mm; 10 L: 7 × 1,5 mm",
          rightParameter: "Spargers opcionales",
          rightValue: "Micro de 15 μm o anillo de 11 × 1,5 mm",
        },
      ],
      detailBlocks: [
        {
          title: "Transferencia y agitación",
          tone: "blue",
          items: [
            "El diseño de palas inclinadas reduce las fuerzas hidrodinámicas de cizalla mientras mantiene la transferencia de oxígeno descrita para el sistema.",
            "El accionamiento magnético elimina los sellos mecánicos y reduce fricción y riesgo de contaminación.",
          ],
        },
        {
          title: "Configuración de proceso",
          tone: "green",
          items: [
            "La placa superior ofrece 17 o más aperturas de puertos; las roscas M18, M12, M10 y M6 dependen del modelo seleccionado.",
            "La conversión a la configuración BIOne de un solo uso admite sonda de pH opcional, puertos no invasivos de oxígeno disuelto y pH, y liner de bajo contenido de antioxidantes.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Capacidad por modelo",
          items: [
            "El equipo se ofrece en recipientes autoclavables de 2, 5 y 10 L, con volúmenes de trabajo de 0,95 a 2 L; 1,7 a 5 L; y 3 a 10 L, respectivamente.",
            "La selección de recipiente determina la distribución de puertos y el diámetro del impulsor de palas inclinadas.",
          ],
        },
        {
          title: "Integración de un solo uso",
          items: [
            "El diseño modular admite la integración del sistema BIOne Single-Use Bioreactor de Distek para volúmenes de trabajo de 2, 5 y 10 L.",
            "El material fuente enumera una sonda de pH de un solo uso opcional, puertos no invasivos para oxígeno disuelto y pH, y liner de bajo contenido de antioxidantes.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Materiales biocompatibles documentados",
          text: "La información fuente enumera materiales biocompatibles de grado farmacéutico en la configuración de un solo uso. No incluye un certificado ni una declaración regulatoria adicional para el equipo.",
        },
      ],
      applicationNotes: [
        {
          label: "Cultivo celular upstream",
          text: "La línea BIOne Autoclavable Cell Culture está destinada a aplicaciones upstream de cultivo celular en laboratorio.",
        },
        {
          label: "Bioprocesos de banco",
          text: "Los recipientes de 2, 5 y 10 L permiten seleccionar el volumen de trabajo según las necesidades del bioproceso del laboratorio.",
        },
      ],
      relatedVideo: {
        label: "BIOne Bioreactor",
        src: "/productos/distek-bione-bioreactor/video-relacionado.mp4",
        poster: "/productos/distek-bione-bioreactor/portada.png",
      },
      descriptionImages: [
        {
          src: "/productos/distek-bione-bioreactor/descripcion-tapa.jpg",
          alt: "Placa superior con aperturas de puertos del biorreactor Distek BIOne",
          caption: "Placa superior con aperturas de puertos, presentada para la versatilidad de proceso del sistema.",
        },
        {
          src: "/productos/distek-bione-bioreactor/descripcion-impulsor.jpg",
          alt: "Impulsor de palas inclinadas del biorreactor Distek BIOne",
          caption: "Detalle del impulsor de palas inclinadas de bajo esfuerzo de cizalla.",
        },
        {
          src: "/productos/distek-bione-bioreactor/descripcion-conversion.jpg",
          alt: "Conversión de biorreactor BIOne a configuración de un solo uso",
          caption: "Comparación visual entre la configuración de un solo uso, con liner, y el recipiente de vidrio.",
        },
      ],
    },
  },
  {
    id: "distek-bione-fermentor",
    slug: "distek-bione-fermentor",
    name: "Distek BIOne Fermentor",
    category: "Bioprocesos",
    filters: ["Marcas", "Bioprocesos"],
    description:
      "Fermentador autoclavable de banco para bioprocesos microbianos, con agitación magnética, transferencia de masa y térmica, y volúmenes de trabajo de 0,75 a 10 L.",
    features: [
      "Modelos autoclavables de 2, 5 y 10 L",
      "17 o más puertos en la placa superior según modelo",
      "Impulsor Rushton, bafles integrados y elementos de enfriamiento",
    ],
    imageUrl: "/productos/distek-bione-fermentor/portada.png",
    tags: [
      "Distek",
      "BIOne",
      "fermentador",
      "bioproceso microbiano",
      "bioproceso upstream",
    ],
    relatedProducts: ["distek-bione-bioreactor"],
    detail: {
      brand: "Distek",
      model: "BIOne Fermentor",
      fullTitle: "Distek BIOne Fermentor — Fermentación autoclavable",
      subtitle:
        "Fermentador autoclavable de banco para bioprocesos microbianos upstream. El diseño integra agitación magnética, impulsores Rushton, bafles y elementos de enfriamiento para apoyar la transferencia de masa y térmica.",
      highlights: [
        "Volúmenes de trabajo desde 0,75 hasta 10 L según modelo",
        "17 o más puertos en la placa superior para versatilidad de proceso",
        "Impulsor Rushton, bafles integrados y elementos de enfriamiento",
      ],
      advantages: [
        "Los componentes del sistema se diseñaron para apoyar la transferencia de masa y térmica requerida en bioprocesos microbianos.",
        "El impulsor Rushton y los bafles integrados se describen para mejorar la transferencia de masa y térmica.",
        "La agitación magnética elimina los sellos mecánicos para reducir fricción y el riesgo de contaminación.",
        "Los elementos de enfriamiento integrados apoyan el control preciso de la temperatura.",
      ],
      technicalParameters: [
        {
          leftParameter: "Modelo autoclavable de 2 L",
          leftValue: "Volumen total: 3 L; volumen de trabajo: 0,75 a 2 L",
          rightParameter: "Modelo autoclavable de 5 L",
          rightValue: "Volumen total: 7 L; volumen de trabajo: 1,5 a 5 L",
        },
        {
          leftParameter: "Modelo autoclavable de 10 L",
          leftValue: "Volumen total: 13 L; volumen de trabajo: 2,3 a 10 L",
          rightParameter: "Puertos en placa superior",
          rightValue: "17 o más; la distribución depende del volumen del recipiente",
        },
        {
          leftParameter: "Puertos de 2 L",
          leftValue: "5 × M18, 2 × M12, 7 × M10 y 3 × M6",
          rightParameter: "Puertos de 5 L",
          rightValue: "6 × M18, 2 × M12 y 12 × M10",
        },
        {
          leftParameter: "Puertos de 10 L",
          leftValue: "6 × M18, 5 × M12 y 10 × M10",
          rightParameter: "Tipo de impulsor",
          rightValue: "Rushton con bafles integrados",
        },
        {
          leftParameter: "Diámetro de impulsor de 2 L",
          leftValue: "58 mm",
          rightParameter: "Diámetro de impulsor de 5 L",
          rightValue: "76 mm",
        },
        {
          leftParameter: "Diámetro de impulsor de 10 L",
          leftValue: "81 mm",
          rightParameter: "Control térmico",
          rightValue: "Elementos de enfriamiento integrados",
        },
        {
          leftParameter: "Diámetro y altura interna del recipiente",
          leftValue: "2 L: 130 × 250 mm; 5 L: 160 × 357 mm; 10 L: 190 × 470 mm",
          rightParameter: "Altura máxima ensamblada",
          rightValue: "2 L: 478 mm; 5 L: 580 mm; 10 L: 752 mm",
        },
        {
          leftParameter: "Sparger estándar incluido",
          leftValue: "2 y 5 L: 7 × 0,86 mm; 10 L: 7 × 1,5 mm",
          rightParameter: "Spargers opcionales",
          rightValue: "Micro de 15 μm o anillo de 11 × 1,5 mm",
        },
      ],
      detailBlocks: [
        {
          title: "Transferencia para fermentación",
          tone: "blue",
          items: [
            "El impulsor Rushton y los bafles integrados se describen para apoyar una transferencia de masa y térmica superior en procesos microbianos.",
            "Los elementos de enfriamiento integrados apoyan el control preciso de temperatura.",
          ],
        },
        {
          title: "Configuración de proceso",
          tone: "green",
          items: [
            "La placa superior ofrece 17 o más aperturas de puertos; las roscas M18, M12, M10 y M6 dependen del modelo seleccionado.",
            "La agitación con accionamiento magnético elimina los sellos mecánicos para reducir fricción y el riesgo de contaminación.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Capacidad por modelo",
          items: [
            "El equipo se ofrece en recipientes autoclavables de 2, 5 y 10 L, con volúmenes de trabajo de 0,75 a 2 L; 1,5 a 5 L; y 2,3 a 10 L, respectivamente.",
            "La selección de recipiente determina la distribución de puertos y el diámetro del impulsor Rushton.",
          ],
        },
        {
          title: "Agitación y temperatura",
          items: [
            "Los diámetros documentados del impulsor Rushton son 58 mm para 2 L, 76 mm para 5 L y 81 mm para 10 L.",
            "Los elementos de enfriamiento integrados se describen para apoyar el control preciso de temperatura.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Normas y certificaciones no identificadas",
          text: "Los archivos proporcionados para BIOne Autoclavable Fermentor no incluyen normas, certificados ni declaraciones regulatorias específicas del equipo.",
        },
      ],
      applicationNotes: [
        {
          label: "Bioprocesos microbianos",
          text: "La línea BIOne Autoclavable Fermentation está diseñada para las necesidades de bioprocesos microbianos.",
        },
        {
          label: "Procesos upstream",
          text: "Los recipientes autoclavables de 2, 5 y 10 L se presentan para necesidades de bioproceso upstream en laboratorio.",
        },
      ],
      relatedVideo: {
        label: "BIOne Fermentor",
        src: "/productos/distek-bione-fermentor/video-relacionado.mp4",
        poster: "/productos/distek-bione-fermentor/portada.png",
      },
      descriptionImages: [
        {
          src: "/productos/distek-bione-fermentor/descripcion-impulsor.jpg",
          alt: "Impulsor Rushton y bafles del fermentador Distek BIOne",
          caption: "Detalle del impulsor Rushton y los bafles integrados para transferencia de masa y térmica.",
        },
        {
          src: "/productos/distek-bione-fermentor/descripcion-enfriamiento.jpg",
          alt: "Elemento de enfriamiento integrado del fermentador Distek BIOne",
          caption: "Detalle del elemento de enfriamiento integrado mostrado para apoyar el control de temperatura.",
        },
        {
          src: "/productos/distek-bione-fermentor/descripcion-bafles.jpg",
          alt: "Bafles integrados del fermentador Distek BIOne",
          caption: "Detalle de los bafles integrados del fermentador BIOne.",
        },
      ],
    },
  },
  {
    id: "distek-bione-1250",
    slug: "distek-bione-1250",
    name: "Controlador de bioprocesos BIOne 1250",
    category: "Bioprocesos",
    filters: ["Marcas", "Bioprocesos"],
    description:
      "Controlador de bioprocesos configurable para cultivo celular, procesos libres de células y fermentación microbiana, con control de agitación, temperatura, pH y oxígeno disuelto.",
    features: [
      "Configuraciones simple y dual",
      "Pantalla táctil capacitiva de 12,1 pulgadas",
      "Hasta cinco controladores de flujo másico o rotámetros por lado",
    ],
    imageUrl: "/productos/distek-bione-1250/portada.png",
    tags: [
      "Distek",
      "BIOne 1250",
      "controlador de bioprocesos",
      "cultivo celular",
      "fermentación microbiana",
    ],
    relatedProducts: [
      "distek-bione-bioreactor",
      "distek-bione-fermentor",
      "distek-bione-mixing-system",
    ],
    detail: {
      brand: "Distek",
      model: "BIOne 1250",
      fullTitle: "Distek BIOne 1250 - Controlador de bioprocesos",
      subtitle:
        "Controlador modular disponible en configuraciones simple y dual para biorreactores de banco agitados. Controla agitación, temperatura, pH y oxígeno disuelto, y se configura con recipientes autoclavables o de un solo uso según el proceso.",
      highlights: [
        "Control para procesos batch, fed-batch y perfusión",
        "Pantalla táctil capacitiva de 12,1 pulgadas (30 cm)",
        "Más de 30 días de almacenamiento local y tendencias de datos",
      ],
      advantages: [
        "Combina funcionalidad de control con una interfaz táctil para aplicaciones de cultivo celular, procesos libres de células y fermentación microbiana.",
        "Admite biorreactores de banco de tanque agitado autoclavables y de un solo uso en volúmenes de trabajo documentados hasta 10 L.",
        "El software BIOne se entrega precargado e incluye control, tendencias de datos, recetas configurables y automatización.",
        "La opción OPC permite visualización y control remoto mediante navegador web, scripts de Python o SCADA.",
      ],
      technicalParameters: [
        {
          leftParameter: "Interfaz de biorreactor",
          leftValue: "Pantalla táctil capacitiva de 12,1 pulgadas (30 cm)",
          rightParameter: "Acceso remoto",
          rightValue: "Visualización y control remotos con licencia OPC opcional",
        },
        {
          leftParameter: "Almacenamiento de datos",
          leftValue: "Más de 30 días de almacenamiento local y tendencias",
          rightParameter: "Volumen de trabajo, vidrio autoclavable",
          rightValue: "0,75 a 10 L",
        },
        {
          leftParameter: "Volumen de trabajo, un solo uso",
          leftValue: "0,9 a 10 L",
          rightParameter: "Tipo de agitación",
          rightValue: "Accionamiento magnético",
        },
        {
          leftParameter: "Rango de agitación",
          leftValue: "Vidrio autoclavable/SUF: 15 a 1250 rpm hasta 5 L, 15 a 900 rpm en 10 L; un solo uso: 15 a 450 rpm",
          rightParameter: "Control de gas",
          rightValue: "Hasta 5 MFC configurables o rotámetros por lado",
        },
        {
          leftParameter: "Control de temperatura",
          leftValue: "Vidrio autoclavable: 4 °C con enfriador a 80 °C; un solo uso: 4 °C con enfriador a 60 °C",
          rightParameter: "Resolución de temperatura",
          rightValue: "0,1 °C",
        },
        {
          leftParameter: "Oxígeno disuelto",
          leftValue: "Medición analógica u óptica; control de 0 a 200 %",
          rightParameter: "pH",
          rightValue: "Medición analógica u óptica; control de pH 2 a 12",
        },
        {
          leftParameter: "Redox",
          leftValue: "Medición analógica; control de -2000 a +2000 mV",
          rightParameter: "Bombas",
          rightValue: "4 bombas de velocidad variable por lado; tubing de 0,8 a 6,4 mm de diámetro interno",
        },
      ],
      detailBlocks: [
        {
          title: "Control y automatización",
          tone: "blue",
          items: [
            "Compatible con procesos batch, fed-batch y perfusión mediante biorreactores autoclavables o de un solo uso.",
            "Ofrece control de agitación, temperatura, pH y oxígeno disuelto; la interfaz incorpora recetas configurables, tendencias de datos y automatización.",
            "La plataforma permite comparar dos ejecuciones y seguir tendencias de hasta ocho parámetros a la vez.",
          ],
        },
        {
          title: "Configuración para el laboratorio",
          tone: "green",
          items: [
            "Admite configuraciones con rotámetros o control automático de flujo, hasta cinco módulos de control de gas y montaje a izquierda o derecha.",
            "Incorpora cuatro bombas peristálticas bidireccionales y de velocidad variable por lado para estrategias de adición de proceso.",
            "La E/S adicional documentada incluye 4 entradas analógicas, 4 salidas analógicas, 2 entradas digitales y 2 salidas digitales.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Recipientes y configuración",
          items: [
            "La estación BIOne 1250 puede utilizar biorreactores autoclavables y de un solo uso de 2, 5 y 10 L, además de sistemas de terceros según la ficha técnica.",
            "Los kits de conversión documentados permiten integrar el controlador a distintos sistemas de laboratorio.",
          ],
        },
        {
          title: "Software y datos",
          items: [
            "El software BIOne precargado incluye control, tendencias de datos, recetas configurables y automatización, sin suscripción indicada en la documentación fuente.",
            "La licencia OPC es opcional para control remoto a través de navegador web, scripts de Python o SCADA.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Materiales documentados para la configuración de un solo uso",
          text: "El material fuente indica materiales biocompatibles de grado farmacéutico y libres de derivados animales para el biorreactor BIOne de un solo uso. No se aporta una certificación regulatoria adicional para el controlador BIOne 1250.",
        },
      ],
      applicationNotes: [
        {
          label: "Cultivo celular y procesos libres de células",
          text: "La ficha técnica lo presenta para aplicaciones de cultivo celular y procesos libres de células con control de agitación, temperatura, pH y oxígeno disuelto.",
        },
        {
          label: "Fermentación microbiana",
          text: "La documentación indica su uso en aplicaciones de fermentación microbiana y en procesos batch, fed-batch y de perfusión.",
        },
      ],
      relatedVideo: {
        label: "Controlador de bioprocesos BIOne 1250",
        src: "/productos/distek-bione-1250/video-relacionado.mp4",
        poster: "/productos/distek-bione-1250/portada.png",
      },
      descriptionImages: [
        {
          src: "/productos/distek-bione-1250/descripcion-controlador.jpg",
          alt: "Controlador de bioprocesos Distek BIOne 1250 con recipiente de proceso",
          caption: "Vista del controlador BIOne 1250 junto a un recipiente de proceso con accionamiento magnético.",
        },
        {
          src: "/productos/distek-bione-1250/descripcion-interfaz.jpg",
          alt: "Interfaz táctil y tendencias de datos del controlador Distek BIOne 1250",
          caption: "La interfaz BIOne muestra control de proceso y tendencias de datos documentadas para el sistema.",
        },
        {
          src: "/productos/distek-bione-1250/descripcion-recipientes.jpg",
          alt: "Recipientes de tanque agitado compatibles con el sistema Distek BIOne 1250",
          caption: "Configuraciones de recipiente mostradas para integrar el controlador a procesos de bioreactor de banco.",
        },
        {
          src: "/productos/distek-bione-1250/descripcion-io.jpg",
          alt: "Conexiones de entrada y salida adicionales del controlador Distek BIOne 1250",
          caption: "Vista de la E/S adicional documentada para integrar tecnologías analíticas de proceso.",
        },
      ],
    },
  },
  {
    id: "eurovector-ea3100",
    slug: "eurovector-ea3100",
    name: "Analizador elemental EA3100",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental"],
    description:
      "Analizador elemental para determinación simultánea de carbono, hidrógeno, nitrógeno y azufre, con modo de pirólisis para oxígeno.",
    features: [
      "Determinación simultánea de CHNS y O",
      "Tecnología TurboFlash™ de combustión",
      "Software WEAVER™ con adquisición multiinstrumento",
    ],
    imageUrl: "/productos/eurovector-ea3100/portada.png",
    tags: ["EuroVector", "EA3100", "análisis elemental", "CHNS", "oxígeno", "TCD", "Weaver"],
    detail: {
      brand: "EuroVector",
      model: "EA3100",
      fullTitle: "EuroVector EA3100 Analizador elemental CHNS-O",
      subtitle:
        "Analizador elemental para determinar carbono, hidrógeno, nitrógeno y azufre mediante combustión, separación de gases y detección TCD; el mismo instrumento determina oxígeno en modo pirólisis tras un cambio de configuración.",
      highlights: [
        "Determinación simultánea de CHNS y O en un mismo instrumento",
        "Tamaño mínimo y rango analítico extendido, según el fabricante",
        "Tecnología TurboFlash™ para controlar la combustión y la inyección de oxígeno",
        "Software WEAVER™ con adquisición de varios instrumentos desde una estación de PC",
      ],
      advantages: [
        "La secuencia documentada combina combustión de muestra a alta temperatura, separación de las especies gaseosas resultantes y detección TCD.",
        "El fabricante señala tamaño mínimo y rango analítico extendido como parte de lo que redefine al EA3100 dentro de su categoría.",
        "La configuración rápida permite cambiar entre determinación de CHNS, CHN o CN y determinación de oxígeno en pasos simples.",
        "El modo de pirólisis permite determinar oxígeno con un cambio rápido de configuración.",
        "La tecnología TurboFlash™ sincroniza la admisión de muestra con la inyección de oxígeno a presión, de forma independiente del caudal de helio.",
        "El software WEAVER™ adquiere y procesa datos por USB y entrega el contenido de elementos como porcentaje en masa.",
        "La cromatografía de alta velocidad descrita separa los picos de gas a la línea base en cinco minutos para CHNS.",
      ],
      technicalParameters: [
        { leftParameter: "Elementos determinados", leftValue: "Carbono, hidrógeno, nitrógeno, azufre y oxígeno (CHNS-O)", rightParameter: "Modo para oxígeno", rightValue: "Pirólisis con cambio de configuración" },
        { leftParameter: "Secuencia analítica", leftValue: "Combustión, separación de gases y detección", rightParameter: "Detector", rightValue: "TCD" },
        { leftParameter: "Tiempo CHNS documentado", leftValue: "5 min", rightParameter: "Rango documentado", rightValue: "Desde ppm bajas hasta 100 %" },
        { leftParameter: "Software", leftValue: "WEAVER™", rightParameter: "Conexión de datos", rightValue: "USB" },
        { leftParameter: "Configuraciones de medición", leftValue: "CHNS, CHN, CN u oxígeno (pirólisis)", rightParameter: "Cambio de configuración", rightValue: "Simple y rápido, según el fabricante" },
      ],
      detailBlocks: [
        {
          title: "Cómo realiza el análisis",
          tone: "blue",
          items: [
            "La muestra se somete a combustión a alta temperatura; las especies gaseosas resultantes se separan y se detectan por TCD.",
            "La configuración rápida permite pasar de determinación CHNS, CHN o CN a determinación de oxígeno en pasos simples.",
            "Para oxígeno, el equipo opera en modo pirólisis después de un cambio rápido de configuración.",
            "La cromatografía de alta velocidad documentada separa los picos de gas a la línea base en cinco minutos para CHNS.",
          ],
        },
        {
          title: "Combustión y adquisición",
          tone: "yellow",
          items: [
            "TurboFlash™ controla la combustión y sincroniza la admisión de muestra con la inyección de oxígeno a presión.",
            "WEAVER™ adquiere y procesa los datos del analizador por USB y permite el modo de adquisición multiinstrumento desde una estación de PC.",
            "El fabricante describe mediciones desde ppm bajas hasta 100 % con linealidad y estabilidad mediante la tecnología TCD supersensible.",
          ],
        },
        {
          title: "Lo que necesita para funcionar",
          tone: "green",
          items: [
            "El proceso descrito utiliza helio como gas portador e inyección de oxígeno a presión durante la combustión.",
            "La adquisición de datos se realiza por USB mediante el software WEAVER™ desde una estación de PC.",
            "La fuente no documenta requisitos eléctricos, dimensiones, caudales ni condiciones de instalación; deben confirmarse para la configuración seleccionada.",
          ],
        },
      ],
      complianceNotes: [
        { title: "Información de cumplimiento disponible", text: "La carpeta fuente no documenta normas, certificaciones ni declaraciones de cumplimiento específicas para el EA3100." },
      ],
      applicationNotes: [
        { label: "Agricultura", text: "Suelos, sedimentos, rocas y vegetales; la fuente destaca el control de relación C/N, concentración de azufre y relación TIC/TOC." },
        { label: "Ambiente", text: "Plantas, ramas, hojas y raíces para apoyar decisiones de manejo de nutrientes y preservación de ecosistemas." },
        { label: "Nutrición", text: "Alimentos, piensos y cereales, incluidos análisis de nitrógeno y proteína." },
        { label: "Química", text: "Orgánicos, compuestos sintéticos, polímeros y productos farmacéuticos." },
        { label: "Energía y renovables", text: "Carbón, petróleo y lubricantes, biocombustibles, biomasa y residuos." },
      ],
      descriptionImages: [
        { src: "/productos/eurovector-ea3100/descripcion-diagrama.png", alt: "Diagrama proporcionado del recorrido de análisis del EuroVector EA3100", caption: "Esquema de análisis proporcionado para el EA3100." },
        { src: "/productos/eurovector-ea3100/descripcion-conexiones.png", alt: "Detalle de conexiones del EuroVector EA3100", caption: "Detalle visible de las conexiones y el módulo superior del equipo." },
        { src: "/productos/eurovector-ea3100/descripcion-usb.png", alt: "Puerto USB del EuroVector EA3100", caption: "Conexión USB mostrada en el equipo para adquisición de datos con WEAVER™." },
        { src: "/productos/eurovector-ea3100/descripcion-interior-inferior.png", alt: "Detalle interior inferior del EuroVector EA3100", caption: "Detalle de un compartimento inferior del equipo proporcionado por el fabricante." },
        { src: "/productos/eurovector-ea3100/descripcion-modulo-interno.png", alt: "Módulo interno del EuroVector EA3100", caption: "Detalle interno visible del EA3100." },
        { src: "/productos/eurovector-ea3100/descripcion-ventilacion-gases.png", alt: "Conexiones de gases y ventilación del EuroVector EA3100", caption: "Detalle visible de la ventilación y las conexiones rotuladas para oxígeno, helio, venteo y aire." },
      ],
    },
  },
  {
    id: "distek-bione-mixing-system",
    slug: "distek-bione-mixing-system",
    name: "Sistema de mezcla BIOne",
    category: "Bioprocesos",
    filters: ["Marcas", "Bioprocesos"],
    description:
      "Plataforma de mezcla de pequeño volumen para aplicaciones libres de células, con agitación magnética, control directo de temperatura y registro de datos de proceso.",
    features: [
      "Mezcla para aplicaciones libres de células y pequeño volumen",
      "Agitación magnética y control directo de temperatura",
      "Registro de datos cada 30 segundos y exportación a CSV",
    ],
    imageUrl: "/productos/distek-bione-mixing-system/portada.png",
    tags: [
      "Distek",
      "BIOne",
      "sistema de mezcla",
      "preparación de buffers",
      "bioprocesos",
    ],
    relatedProducts: [
      "distek-bione-1250",
      "distek-bione-bioreactor",
      "distek-bione-fermentor",
    ],
    detail: {
      brand: "Distek",
      model: "BIOne Mixing System",
      fullTitle: "Distek BIOne Mixing System - Sistema de mezcla",
      subtitle:
        "Sistema de mezcla de pequeño volumen para aplicaciones libres de células. Se basa en la plataforma BIOne 1250 y utiliza recipientes autoclavables o de un solo uso para controlar agitación, pH y temperatura.",
      highlights: [
        "Agitación magnética y control directo de temperatura",
        "Registro de datos cada 30 segundos con exportación a CSV",
        "Recipientes de un solo uso irradiados gamma de 2 y 5 L",
      ],
      advantages: [
        "Ofrece una plataforma de mezcla para aplicaciones libres de células y de pequeño volumen con control de agitación y temperatura.",
        "Permite registrar y guardar recetas de proceso para estandarizar mezclas y purificación de pequeño volumen.",
        "Integra tecnologías analíticas de proceso mediante E/S adicional para el monitoreo y la optimización.",
        "El sistema de un solo uso documentado emplea recipientes irradiados gamma ensamblados en una sala limpia certificada por Distek.",
      ],
      technicalParameters: [
        {
          leftParameter: "Interfaz de biorreactor",
          leftValue: "Pantalla táctil capacitiva de 12,1 pulgadas (30 cm)",
          rightParameter: "Acceso remoto",
          rightValue: "Visualización y control remotos con licencia OPC opcional",
        },
        {
          leftParameter: "Almacenamiento de datos",
          leftValue: "Más de 30 días de almacenamiento local y tendencias",
          rightParameter: "Volumen de trabajo, vidrio autoclavable",
          rightValue: "0,75 a 10 L",
        },
        {
          leftParameter: "Volumen de trabajo, un solo uso",
          leftValue: "0,9 a 10 L",
          rightParameter: "Tipo de agitación",
          rightValue: "Accionamiento magnético",
        },
        {
          leftParameter: "Rango de agitación",
          leftValue: "Vidrio autoclavable/SUF: 15 a 1250 rpm hasta 5 L, 15 a 900 rpm en 10 L; un solo uso: 15 a 450 rpm",
          rightParameter: "Control de gas",
          rightValue: "No disponible",
        },
        {
          leftParameter: "Control de temperatura",
          leftValue: "Vidrio autoclavable: 4 °C con enfriador a 80 °C; un solo uso: 4 °C con enfriador a 60 °C",
          rightParameter: "Resolución de temperatura",
          rightValue: "0,1 °C",
        },
        {
          leftParameter: "Oxígeno disuelto",
          leftValue: "Medición analógica u óptica; control de 0 a 200 % solo para medición",
          rightParameter: "pH",
          rightValue: "Medición analógica u óptica; control de pH 2 a 12",
        },
        {
          leftParameter: "Redox",
          leftValue: "Medición analógica; control de -2000 a +2000 mV",
          rightParameter: "Bomba",
          rightValue: "1 bomba de velocidad variable; tubing de 0,8 a 6,4 mm de diámetro interno",
        },
      ],
      detailBlocks: [
        {
          title: "Mezcla automatizada",
          tone: "blue",
          items: [
            "Controla automáticamente la velocidad de mezcla, el pH y la temperatura con recetas programables y almacenamiento sin límite indicado para recetas.",
            "La interfaz permite almacenar recetas finalizadas, registrar eventos de proceso y comparar datos en línea con ejecuciones anteriores.",
            "El sistema registra datos hasta por 30 días con puntos de tiempo cada 30 segundos y exporta archivos CSV para cargarlos en ELN.",
          ],
        },
        {
          title: "Recipiente y transferencia de líquido",
          tone: "green",
          items: [
            "Los recipientes BIOne de un solo uso documentados están disponibles en volúmenes de trabajo de 2 y 5 L.",
            "La agitación de accionamiento magnético se describe como escalable a partir de la potencia por unidad de volumen.",
            "Incluye una bomba peristáltica bidireccional de velocidad variable para adiciones de líquido; el tubing C-Flex tamaño 16 soldable facilita transferencias asépticas hacia y desde el recipiente.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Monitoreo e integración",
          items: [
            "La opción de E/S adicional permite integrar tecnologías analíticas de proceso, incluidos sensores de conductividad, turbidez y presión, según la ficha técnica.",
            "La E/S documentada incorpora 4 entradas analógicas, 4 salidas analógicas, 2 entradas digitales y 2 salidas digitales.",
          ],
        },
        {
          title: "Aplicaciones de mezcla",
          items: [
            "Se presenta para preparación de buffers, reacciones enzimáticas y de ARNm, preparación de medios, colección de filtrado y llenado final.",
            "La documentación también identifica validación de retención de material y ajuste de pool de producto como aplicaciones upstream y downstream.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Recipientes de un solo uso documentados",
          text: "La ficha técnica documenta recipientes BIOne de un solo uso irradiados gamma, fabricados con materiales biocompatibles de grado farmacéutico y ensamblados en sala limpia certificada por Distek. No se incluye una certificación regulatoria adicional para el sistema de mezcla.",
        },
      ],
      applicationNotes: [
        {
          label: "Mezcla de pequeño volumen",
          text: "Se describe para aplicaciones de mezcla libres de células y de pequeño volumen, incluidas reacciones enzimáticas, de ARNm, buffers y medios.",
        },
        {
          label: "Procesos upstream y downstream",
          text: "El material fuente incluye preparación de buffers, colección de filtrado, llenado final, validación de retención de material y ajuste de pool de producto.",
        },
      ],
      descriptionImages: [
        {
          src: "/productos/distek-bione-mixing-system/descripcion-sistema.jpg",
          alt: "Sistema de mezcla Distek BIOne con recipiente de proceso",
          caption: "Vista general de la plataforma de mezcla BIOne y su recipiente de proceso.",
        },
        {
          src: "/productos/distek-bione-mixing-system/descripcion-recipient.jpg",
          alt: "Recipiente de proceso de un solo uso del sistema de mezcla Distek BIOne",
          caption: "Detalle del recipiente de proceso mostrado para la configuración de mezcla BIOne.",
        },
        {
          src: "/productos/distek-bione-mixing-system/descripcion-interfaz.jpg",
          alt: "Interfaz y conexiones del sistema de mezcla Distek BIOne",
          caption: "Vista de la interfaz de control y las conexiones del sistema de mezcla BIOne.",
        },
        {
          src: "/productos/distek-bione-mixing-system/descripcion-io.jpg",
          alt: "Configuración visual del recipiente de mezcla Distek BIOne",
          caption: "Detalle visual de la configuración del recipiente usada por el sistema de mezcla BIOne.",
        },
      ],
    },
  },
  {
    id: "coldblock-pro-series-cbl",
    slug: "coldblock-pro-series-cbl",
    name: "Digestor ColdBlock Pro Series CBL",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización"],
    description:
      "Digestor de muestras de gran tamaño con 12 posiciones para procesar hasta 30 g por muestra. La plataforma CBL se puede escalar a 24, 36 o 48 muestras y se controla desde iPad, tablet o computador portátil.",
    features: [
      "12 muestras simultáneas de hasta 30 g",
      "Configuración escalable hasta 48 muestras",
      "Programación desde iPad, tablet o computador portátil",
    ],
    imageUrl: "/productos/coldblock-pro-series-cbl/portada.webp",
    tags: [
      "ColdBlock",
      "CBL",
      "digestor",
      "preparación de muestras",
      "digestión",
    ],
    relatedProducts: [
      "coldblock-pro-series-cbm",
      "coldblock-pro-series-cbs",
    ],
    detail: {
      brand: "ColdBlock",
      model: "Pro Series CBL",
      fullTitle: "ColdBlock Pro Series CBL — Digestor de muestras de gran tamaño",
      subtitle:
        "Digestor de 12 posiciones para muestras de hasta 30 g. Se controla mediante el software ColdBlock en iPad, tablet o computador portátil; el paquete individual incluye digestor, controlador, tubos, soportes, bandejas de transferencia y lámpara de recambio.",
      highlights: [
        "12 muestras simultáneas de hasta 30 g",
        "Escalabilidad de 24, 36 o 48 muestras",
        "Programas de digestión de una o múltiples etapas reutilizables",
      ],
      advantages: [
        "Procesa hasta 12 muestras de gran tamaño en un solo digestor CBL.",
        "Permite crear, guardar y reutilizar programas de digestión de una o múltiples etapas desde el software ColdBlock.",
        "No contiene piezas móviles; la fuente indica mantenimiento mínimo y aptitud para uso diario riguroso.",
        "El paquete individual documentado incluye 24 tubos de borosilicato, dos soportes, dos bandejas de transferencia y una lámpara de recambio de 4.000 h.",
      ],
      technicalParameters: [
        {
          leftParameter: "Capacidad por digestor",
          leftValue: "12 muestras simultáneas",
          rightParameter: "Tamaño máximo de muestra",
          rightValue: "Hasta 30 g",
        },
        {
          leftParameter: "Escalabilidad del sistema",
          leftValue: "24 / 36 / 48 muestras",
          rightParameter: "Tubo de ensayo",
          rightValue: "Borosilicato, 200 mL, Ø 52 mm",
        },
        {
          leftParameter: "Tubos disponibles",
          leftValue: "Cuarzo disponible",
          rightParameter: "Contenido del paquete",
          rightValue: "Digestor, controlador, 24 tubos, 2 soportes, 2 bandejas y lámpara de recambio",
        },
        {
          leftParameter: "Control",
          leftValue: "Software ColdBlock en iPad, tablet o computador portátil",
          rightParameter: "Programación",
          rightValue: "Programas de una o múltiples etapas, guardables y reutilizables",
        },
        {
          leftParameter: "Partes móviles",
          leftValue: "No contiene",
          rightParameter: "Mantenimiento",
          rightValue: "Mínimo, según la descripción del fabricante",
        },
      ],
      detailBlocks: [
        {
          title: "Capacidad y escalabilidad",
          tone: "yellow",
          items: [
            "Un digestor CBL procesa 12 muestras simultáneamente, con un tamaño de muestra de hasta 30 g.",
            "La arquitectura se puede combinar en configuraciones de 24, 36 o 48 muestras.",
            "Los tubos CBL son de borosilicato de 200 mL y 52 mm de diámetro; también hay disponibilidad de tubos de cuarzo.",
          ],
        },
        {
          title: "Control y configuración base",
          tone: "green",
          items: [
            "El software ColdBlock se opera desde iPad, tablet o computador portátil para crear, guardar y reutilizar programas de digestión de una o múltiples etapas.",
            "La configuración individual documentada incluye digestor, controlador, 24 tubos de borosilicato, dos soportes, dos bandejas de transferencia y una lámpara de recambio de 4.000 h.",
            "La fuente especifica que el equipo no incorpora piezas móviles y requiere mantenimiento mínimo.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Pendiente de confirmación técnica",
          items: [
            "La fuente no informa alimentación eléctrica, dimensiones, requisitos de agua ni condiciones de ventilación específicas para el modelo CBL.",
            "El esquema suministrado representa una configuración con campana de extracción, soporte de tubos, digestor, interfaz tablet, controlador y chiller; confirme la instalación final al cotizar.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/coldblock-pro-series-cbl/configuracion-pro-series.webp",
        alt: "Esquema de configuración ColdBlock Pro Series con digestor, interfaz tablet, controlador y chiller",
        caption:
          "Esquema de configuración Pro Series proporcionado por el fabricante.",
      },
    },
  },
  {
    id: "coldblock-pro-series-cbm",
    slug: "coldblock-pro-series-cbm",
    name: "Digestor ColdBlock Pro Series CBM",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización"],
    description:
      "Digestor de muestras de tamaño mediano con 16 posiciones para procesar hasta 5 g por muestra. La plataforma CBM se puede escalar a 32, 48 o 60 muestras y se controla desde iPad, tablet o computador portátil.",
    features: [
      "16 muestras simultáneas de hasta 5 g",
      "Configuración escalable hasta 60 muestras",
      "Tubos de borosilicato y liners compatibles con HF disponibles",
    ],
    imageUrl: "/productos/coldblock-pro-series-cbm/portada.webp",
    tags: [
      "ColdBlock",
      "CBM",
      "digestor",
      "preparación de muestras",
      "digestión",
    ],
    relatedProducts: [
      "coldblock-pro-series-cbl",
      "coldblock-pro-series-cbs",
    ],
    detail: {
      brand: "ColdBlock",
      model: "Pro Series CBM",
      fullTitle: "ColdBlock Pro Series CBM — Digestor de muestras de tamaño mediano",
      subtitle:
        "Digestor de 16 posiciones para muestras de hasta 5 g. Se controla mediante el software ColdBlock en iPad, tablet o computador portátil; el paquete individual incluye digestor, controlador, tubos, soportes, bandejas de transferencia y lámpara de recambio.",
      highlights: [
        "16 muestras simultáneas de hasta 5 g",
        "Escalabilidad de 32, 48 o 60 muestras",
        "Tubos de cuarzo y liners compatibles con HF disponibles",
      ],
      advantages: [
        "Procesa hasta 16 muestras de tamaño mediano en un solo digestor CBM.",
        "Permite crear, guardar y reutilizar programas de digestión de una o múltiples etapas desde el software ColdBlock.",
        "No contiene piezas móviles; la fuente indica mantenimiento mínimo y aptitud para uso diario riguroso.",
        "El paquete individual documentado incluye 32 tubos de borosilicato, dos soportes, dos bandejas de transferencia y una lámpara de recambio de 4.000 h.",
      ],
      technicalParameters: [
        {
          leftParameter: "Capacidad por digestor",
          leftValue: "16 muestras simultáneas",
          rightParameter: "Tamaño máximo de muestra",
          rightValue: "Hasta 5 g",
        },
        {
          leftParameter: "Escalabilidad del sistema",
          leftValue: "32 / 48 / 60 muestras",
          rightParameter: "Tubo de ensayo",
          rightValue: "Borosilicato, 100 mL, Ø 36 mm",
        },
        {
          leftParameter: "Tubos y liners disponibles",
          leftValue: "Cuarzo y liners compatibles con HF",
          rightParameter: "Contenido del paquete",
          rightValue: "Digestor, controlador, 32 tubos, 2 soportes, 2 bandejas y lámpara de recambio",
        },
        {
          leftParameter: "Control",
          leftValue: "Software ColdBlock en iPad, tablet o computador portátil",
          rightParameter: "Programación",
          rightValue: "Programas de una o múltiples etapas, guardables y reutilizables",
        },
        {
          leftParameter: "Partes móviles",
          leftValue: "No contiene",
          rightParameter: "Mantenimiento",
          rightValue: "Mínimo, según la descripción del fabricante",
        },
      ],
      detailBlocks: [
        {
          title: "Capacidad y escalabilidad",
          tone: "yellow",
          items: [
            "Un digestor CBM procesa 16 muestras simultáneamente, con un tamaño de muestra de hasta 5 g.",
            "La arquitectura se puede combinar en configuraciones de 32, 48 o 60 muestras.",
            "Los tubos CBM son de borosilicato de 100 mL y 36 mm de diámetro; hay tubos de cuarzo y liners compatibles con HF disponibles.",
          ],
        },
        {
          title: "Control y configuración base",
          tone: "green",
          items: [
            "El software ColdBlock se opera desde iPad, tablet o computador portátil para crear, guardar y reutilizar programas de digestión de una o múltiples etapas.",
            "La configuración individual documentada incluye digestor, controlador, 32 tubos de borosilicato, dos soportes, dos bandejas de transferencia y una lámpara de recambio de 4.000 h.",
            "La fuente especifica que el equipo no incorpora piezas móviles y requiere mantenimiento mínimo.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Pendiente de confirmación técnica",
          items: [
            "La fuente no informa alimentación eléctrica, dimensiones, requisitos de agua ni condiciones de ventilación específicas para el modelo CBM.",
            "El esquema suministrado representa una configuración con campana de extracción, soporte de tubos, digestor, interfaz tablet, controlador y chiller; confirme la instalación final al cotizar.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/coldblock-pro-series-cbm/configuracion-pro-series.webp",
        alt: "Esquema de configuración ColdBlock Pro Series con digestor, interfaz tablet, controlador y chiller",
        caption:
          "Esquema de configuración Pro Series proporcionado por el fabricante.",
      },
    },
  },
  {
    id: "coldblock-pro-series-cbs",
    slug: "coldblock-pro-series-cbs",
    name: "Digestor ColdBlock Pro Series CBS",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización"],
    description:
      "Digestor de muestras de tamaño pequeño con 20 posiciones para procesar hasta 1 g por muestra. La plataforma CBS se puede escalar a 40, 60 u 80 muestras y se controla desde iPad, tablet o computador portátil.",
    features: [
      "20 muestras simultáneas de hasta 1 g",
      "Configuración escalable hasta 80 muestras",
      "Programación desde iPad, tablet o computador portátil",
    ],
    imageUrl: "/productos/coldblock-pro-series-cbs/portada.webp",
    tags: [
      "ColdBlock",
      "CBS",
      "digestor",
      "preparación de muestras",
      "digestión",
    ],
    relatedProducts: [
      "coldblock-pro-series-cbl",
      "coldblock-pro-series-cbm",
    ],
    detail: {
      brand: "ColdBlock",
      model: "Pro Series CBS",
      fullTitle: "ColdBlock Pro Series CBS — Digestor de muestras de tamaño pequeño",
      subtitle:
        "Digestor de 20 posiciones para muestras de hasta 1 g. Se controla mediante el software ColdBlock en iPad, tablet o computador portátil; el paquete individual incluye digestor, controlador, tubos, soportes, bandejas de transferencia y lámpara de recambio.",
      highlights: [
        "20 muestras simultáneas de hasta 1 g",
        "Escalabilidad de 40, 60 u 80 muestras",
        "Programas de digestión de una o múltiples etapas reutilizables",
      ],
      advantages: [
        "Procesa hasta 20 muestras de tamaño pequeño en un solo digestor CBS.",
        "Permite crear, guardar y reutilizar programas de digestión de una o múltiples etapas desde el software ColdBlock.",
        "No contiene piezas móviles; la fuente indica mantenimiento mínimo y aptitud para uso diario riguroso.",
        "El paquete individual documentado incluye 40 tubos de borosilicato, dos soportes, dos bandejas de transferencia y una lámpara de recambio de 4.000 h.",
      ],
      technicalParameters: [
        {
          leftParameter: "Capacidad por digestor",
          leftValue: "20 muestras simultáneas",
          rightParameter: "Tamaño máximo de muestra",
          rightValue: "Hasta 1 g",
        },
        {
          leftParameter: "Escalabilidad del sistema",
          leftValue: "40 / 60 / 80 muestras",
          rightParameter: "Tubo de ensayo",
          rightValue: "Borosilicato, 50 mL, Ø 28 mm",
        },
        {
          leftParameter: "Tubos disponibles",
          leftValue: "Cuarzo disponible",
          rightParameter: "Contenido del paquete",
          rightValue: "Digestor, controlador, 40 tubos, 2 soportes, 2 bandejas y lámpara de recambio",
        },
        {
          leftParameter: "Control",
          leftValue: "Software ColdBlock en iPad, tablet o computador portátil",
          rightParameter: "Programación",
          rightValue: "Programas de una o múltiples etapas, guardables y reutilizables",
        },
        {
          leftParameter: "Partes móviles",
          leftValue: "No contiene",
          rightParameter: "Mantenimiento",
          rightValue: "Mínimo, según la descripción del fabricante",
        },
      ],
      detailBlocks: [
        {
          title: "Capacidad y escalabilidad",
          tone: "yellow",
          items: [
            "Un digestor CBS procesa 20 muestras simultáneamente, con un tamaño de muestra de hasta 1 g.",
            "La arquitectura se puede combinar en configuraciones de 40, 60 u 80 muestras.",
            "Los tubos CBS son de borosilicato de 50 mL y 28 mm de diámetro; también hay disponibilidad de tubos de cuarzo.",
          ],
        },
        {
          title: "Control y configuración base",
          tone: "green",
          items: [
            "El software ColdBlock se opera desde iPad, tablet o computador portátil para crear, guardar y reutilizar programas de digestión de una o múltiples etapas.",
            "La configuración individual documentada incluye digestor, controlador, 40 tubos de borosilicato, dos soportes, dos bandejas de transferencia y una lámpara de recambio de 4.000 h.",
            "La fuente especifica que el equipo no incorpora piezas móviles y requiere mantenimiento mínimo.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Pendiente de confirmación técnica",
          items: [
            "La fuente no informa alimentación eléctrica, dimensiones, requisitos de agua ni condiciones de ventilación específicas para el modelo CBS.",
            "El esquema suministrado representa una configuración con campana de extracción, soporte de tubos, digestor, interfaz tablet, controlador y chiller; confirme la instalación final al cotizar.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/coldblock-pro-series-cbs/configuracion-pro-series.webp",
        alt: "Esquema de configuración ColdBlock Pro Series con digestor, interfaz tablet, controlador y chiller",
        caption:
          "Esquema de configuración Pro Series proporcionado por el fabricante.",
      },
    },
  },
  {
    id: "skalar-serie-san-plus-plus",
    slug: "skalar-serie-san-plus-plus",
    name: "Analizador de flujo continuo Skalar SAN++®",
    category: "Automatización",
    filters: ["Marcas", "Automatización"],
    description:
      "Sistema modular de química húmeda por flujo continuo segmentado (CFA) para automatizar determinaciones colorimétricas y pretratamientos en línea. Admite de 1 a 16 canales según la configuración y aplicación del laboratorio.",
    features: [
      "De 1 a 16 canales analíticos simultáneos",
      "Hasta 16 mediciones analíticas en una muestra",
      "Rendimiento de 30 a 120 análisis por hora según aplicación",
    ],
    imageUrl: "/productos/skalar-serie-san-plus-plus/portada.webp",
    tags: [
      "Skalar",
      "SAN++®",
      "química húmeda",
      "flujo continuo",
      "CFA",
      "automatización",
    ],
    detail: {
      brand: "Skalar",
      model: "Serie SAN++®",
      fullTitle: "Skalar SAN++® — Analizador modular de química húmeda por flujo continuo",
      subtitle:
        "Serie modular CFA para analizar parámetros colorimétricos con muestreo automático, módulos de química, detectores y FlowAccess. La configuración combina muestreadores, agujas, química y pretratamientos según la aplicación.",
      highlights: [
        "Hasta 16 mediciones analíticas simultáneas por muestra",
        "De 1 a 16 canales, con múltiples muestreadores y agujas",
        "Pretratamientos en línea: destilación, digestión y diálisis",
      ],
      advantages: [
        "Los muestreadores admiten preparación automática de estándares, pre y posdilución, operación multirango, bomba de enjuague y múltiples agujas.",
        "Automatiza el arranque, apagado, diluciones, repeticiones, limpieza y almacenamiento de datos sin procesar documentados para la gama SAN++®.",
        "La sección de química admite hasta seis módulos, con bomba dosificadora, inyección de aire, detectores fotométricos y hasta seis recipientes de residuos separados.",
        "FlowAccess controla el hardware, las pre y posdiluciones, la adquisición, el cálculo de resultados, los criterios de calidad y los reportes configurables.",
      ],
      technicalParameters: [
        {
          leftParameter: "Canales analíticos",
          leftValue: "De 1 a 16 canales simultáneos",
          rightParameter: "Mediciones por muestra",
          rightValue: "Hasta 16 mediciones analíticas simultáneas",
        },
        {
          leftParameter: "Rendimiento",
          leftValue: "De 30 a 120 análisis por hora, según aplicación",
          rightParameter: "Módulos químicos",
          rightValue: "Hasta 6 módulos por sección de química",
        },
        {
          leftParameter: "Bomba dosificadora",
          leftValue: "Plataforma de doble radio; hasta 42 posiciones de tubo",
          rightParameter: "Recipientes de residuos",
          rightValue: "Hasta 6 recipientes separados",
        },
        {
          leftParameter: "Detección disponible",
          leftValue:
            "Colorimetría digital, corrección de matriz, UV, fluorimetría, ISE, fotometría de llama y pH",
          rightParameter: "Pretratamientos en línea",
          rightValue: "Destilación, digestión UV, extracción y diálisis",
        },
        {
          leftParameter: "Software",
          leftValue: "FlowAccess para Windows®",
          rightParameter: "Resultados y reportes",
          rightValue: "Cálculo, estadísticas, impresión y exportación a ASCII, Excel o imagen",
        },
        {
          leftParameter: "Control de calidad",
          leftValue: "Criterios de control de calidad configurables por parámetro",
          rightParameter: "Listas de carga",
          rightValue:
            "Campos configurables para deriva, lavado, estándares e intervalos de control",
        },
      ],
      detailBlocks: [
        {
          title: "Automatización de muestras y flujo",
          tone: "yellow",
          items: [
            "La gama de muestreadores automáticos incluye preparación de estándares, pre y posdilución, acceso aleatorio XYZ/XY, operación de múltiples rangos, bomba de enjuague, contenedores y bastidores personalizados, y múltiples agujas de muestra.",
            "El sistema permite gestionar de 1 a 16 canales con múltiples muestreadores y agujas de manera simultánea.",
            "La fuente documenta arranque y apagado automáticos para cargas de trabajo elevadas fuera del horario laboral.",
          ],
        },
        {
          title: "Configuraciones de la gama SAN++®",
          tone: "green",
          items: [
            "SAN++® Compact: configuración de menor tamaño para laboratorios que requieren automatización de 2 a 3 parámetros, manteniendo el nivel de automatización indicado para la serie.",
            "SAN++® Avanzado: configuración de mayor capacidad, ampliable y preparada para alojar más análisis complejos en un único analizador, con hasta seis módulos analíticos.",
            "SAN++® Clásico: configuración para análisis simultáneo de múltiples parámetros, con capacidad documentada de hasta cinco parámetros.",
          ],
        },
        {
          title: "Gama de muestreadores automáticos",
          tone: "yellow",
          items: [
            "SA1100 y SA1150: hasta 2 × 50 posiciones de muestra con bomba de enjuague incorporada; se documentan 10 posiciones opcionales para estándares de trabajo y una segunda aguja opcional.",
            "1074: hasta 300 muestras, posiciones separadas para estándares y control de calidad, estación diluyente opcional y ampliación de 2 a 4 agujas; el material también indica agitador y lector de código de barras opcionales.",
            "1075: 576 posiciones de muestra y dos posiciones adicionales para estándares de trabajo, control de calidad o control de deriva; admite de 2 a 4 agujas y estación diluyente opcional con preparación automática de estándares.",
          ],
        },
        {
          title: "Sección de química, detección y control",
          tone: "green",
          items: [
            "La plataforma incorpora una bomba de doble radio, inyección y suministro de aire con compresor separado, y detección automática de fugas de hasta cuatro zonas; los módulos se conectan mediante trayectos de bajo arrastre entre dializadores, reactores, bobinas y celdas de flujo.",
            "La gama de detectores incluye colorimetría digital de doble canal, corrección automática de matriz y blanco, UV, fluorimetría, ISE, fotometría de llama y medidor de pH; la fuente también documenta puerta de burbujas y celdas de flujo de acceso sencillo sin alineación.",
            "FlowAccess permite configurar las listas de carga para deriva, lavado, estándares de calibración e intervalos de control; durante la corrida presenta picos, identificadores de muestra y resultados en tiempo real, con diagnósticos de picos.",
            "El documento indica curvas de calibración de primer y segundo orden, o logaritmo inverso de tercer orden para electrodos selectivos de iones, y acciones automáticas cuando se exceden los límites de control definidos por parámetro.",
          ],
        },
        {
          title: "Parámetros documentados",
          tone: "yellow",
          items: [
            "Alfa-amilasa, amoníaco, tensioactivos aniónicos, betaglucano, amargura, cloruro, cloro, cianuro, poder diastásico y aminonitrógeno libre.",
            "Hierro, nitrato, nitrito, fosfato, potasio, silicato, sulfato, sulfito y dióxido de azufre total o libre.",
            "Cianuro total, nitrógeno total, fenol total, fosfato total, fosfuro total, azúcares reductores totales y urea.",
          ],
        },
      ],
      descriptionImages: [
        {
          src: "/productos/skalar-serie-san-plus-plus/configuraciones-san-plus-plus.webp",
          alt: "Configuraciones Skalar SAN++ Compact, Avanzado y Clásico",
          caption:
            "Configuraciones SAN++® Compact, Avanzado y Clásico incluidas en el material suministrado por Skalar.",
        },
      ],
      specificationNotes: [
        {
          title: "Pendiente de confirmación técnica",
          items: [
            "La carpeta no especifica dimensiones, alimentación eléctrica, requisitos de agua, gases ni condiciones de ventilación para una configuración SAN++® concreta.",
            "La selección final depende de la aplicación: confirme con Del Carpio el número de canales, muestreadores, agujas, módulos químicos y pretratamientos requeridos.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Métodos de análisis documentados",
          text: "La descripción del fabricante indica que sus métodos de química húmeda siguen metodologías de referencia reconocidas internacionalmente. Consulte con nuestro equipo técnico sobre el cumplimiento normativo aplicable a su proceso.",
        },
        {
          title: "Calibración y control de calidad",
          text: "FlowAccess utiliza curvas de calibración de primer y segundo orden, o logaritmo inverso de tercer orden para electrodos selectivos de iones. La fuente también describe criterios de control de calidad configurables por parámetro.",
        },
      ],
      applicationNotes: [
        {
          label: "Laboratorios ambientales e industriales",
          text: "La serie se describe para automatización colorimétrica de parámetros en aplicaciones ambientales e industriales.",
        },
        {
          label: "Laboratorios de rutina",
          text: "La configuración modular está orientada a laboratorios que procesan desde pocas muestras hasta cargas de trabajo elevadas.",
        },
        {
          label: "Pretratamiento de muestras",
          text: "La documentación incluye posibilidades de destilación, digestión y diálisis en línea; también menciona digestión UV y extracción en los módulos de química.",
        },
      ],
      relatedVideo: {
        label: "Serie SAN++® — configuración Compact",
        src: "/productos/skalar-serie-san-plus-plus/video-relacionado.mp4",
        poster: "/productos/skalar-serie-san-plus-plus/portada.webp",
      },
    },
  },
  {
    id: "skalar-bluvision",
    slug: "skalar-bluvision",
    name: "Analizador discreto de agua Skalar BLUVISION®",
    category: "Análisis de agua",
    filters: ["Marcas", "Análisis de agua", "Automatización"],
    description:
      "Analizador discreto automatizado para determinaciones colorimétricas de nutrientes y otros parámetros de calidad de agua en agua potable, aguas residuales y monitoreo ambiental.",
    features: [
      "100 posiciones de muestra en 5 bastidores de 20",
      "160 cubetas y hasta 640 pruebas consecutivas",
      "Detección fotométrica con rueda de 8 filtros",
    ],
    imageUrl: "/productos/skalar-bluvision/portada.webp",
    tags: [
      "Skalar",
      "BLUVISION®",
      "análisis discreto",
      "colorimetría",
      "calidad de agua",
      "agua potable",
      "aguas residuales",
    ],
    detail: {
      brand: "Skalar",
      model: "BLUVISION®",
      fullTitle: "Skalar BLUVISION® — Analizador discreto automatizado de agua",
      subtitle:
        "Analizador discreto para determinaciones colorimétricas automatizadas de nutrientes y otros parámetros de calidad de agua. Pipetea muestras y reactivos en cubetas desechables, controla la reacción y cuantifica por fotometría.",
      highlights: [
        "100 posiciones de muestra en cinco bastidores de 20",
        "Bandeja de 160 cubetas y hasta 640 pruebas consecutivas",
        "Opera con cubetas desechables, reactivos, soluciones madre y controles de calidad",
      ],
      advantages: [
        "Automatiza el pipeteo de muestras y reactivos, la mezcla, el calentamiento controlado, la corrección en blanco y la detección fotométrica.",
        "Reanaliza automáticamente muestras fuera del rango de detección sin intervención manual, según la descripción suministrada.",
        "Los bloques de cubetas desechables evitan la transferencia entre pruebas y se almacenan automáticamente tras el análisis.",
        "El contenedor independiente para residuos de reactivos tóxicos se selecciona según el método documentado.",
      ],
      technicalParameters: [
        {
          leftParameter: "Posiciones de muestra",
          leftValue: "100 en 5 bastidores de 20 muestras",
          rightParameter: "Volumen de muestra",
          rightValue: "De 3,5 a 10 mL",
        },
        {
          leftParameter: "Posiciones de reactivos",
          leftValue: "24 × 50 mL y 8 × 10 mL",
          rightParameter: "Bandeja de cubetas",
          rightValue: "160 posiciones con temperatura controlada",
        },
        {
          leftParameter: "Pruebas consecutivas",
          leftValue: "Hasta 640 con carga automática de bloques de cubetas",
          rightParameter: "Operación desatendida",
          rightValue: "Hasta 7 horas, según la descripción suministrada",
        },
        {
          leftParameter: "Detección",
          leftValue: "Fuente halógena y rueda con 8 filtros intercambiables",
          rightParameter: "Trayectoria óptica",
          rightValue: "15 mm; detección documentada en rango bajo de ppb",
        },
        {
          leftParameter: "Modos de análisis",
          leftValue: "Acceso aleatorio o por lotes",
          rightParameter: "Software",
          rightValue: "DiscreteAccess con exportación a TXT, Excel o LIMS",
        },
      ],
      detailBlocks: [
        {
          title: "Proceso analítico automatizado",
          tone: "yellow",
          items: [
            "Pipetea automáticamente muestras y reactivos en cubetas, con mezcla precisa, calentamiento controlado, corrección en blanco y detección fotométrica de alta resolución.",
            "Una misma aguja dispensa muestras y reactivos y puede precalentarlos antes de la dispensación; una bomba de alta precisión realiza el pipeteo.",
            "La función de reanálisis automático procesa de nuevo las muestras que quedan por debajo o por encima del rango de detección indicado.",
          ],
        },
        {
          title: "Muestras, cubetas y residuos",
          tone: "green",
          items: [
            "Los bastidores de muestras y reactivos pueden enfriarse activamente durante el análisis; se pueden añadir nuevas muestras durante una corrida mediante carga continua.",
            "Las cubetas desechables evitan la transferencia entre pruebas. Los bloques usados se trasladan automáticamente a un contenedor de desechos tras el análisis.",
            "El equipo cuenta con un contenedor de residuos independiente para reactivos tóxicos, seleccionable de acuerdo con el método.",
          ],
        },
        {
          title: "Control y software DiscreteAccess",
          tone: "yellow",
          items: [
            "La pantalla táctil integrada informa el estado del analizador, los niveles de reactivo, la capacidad de pruebas restante y las temperaturas de cubetas y portadores de muestras.",
            "Desde la pantalla se documenta la carga de bloques de cubetas, el cambio de filtros y la incorporación de reactivos y muestras.",
            "DiscreteAccess permite ingresar muestras o cargarlas desde LIMS, usar archivos de aplicación predefinidos o definidos por el usuario, preparar estándares de calibración, optimizar la secuencia y aplicar pre y posdiluciones automáticas.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Pendiente de confirmación técnica",
          items: [
            "La carpeta no documenta dimensiones, peso, alimentación eléctrica, requisitos de agua, gases, ventilación ni conectividad física del equipo.",
            "Confirme con Del Carpio los métodos, filtros, reactivos, bloques de cubetas y condiciones de instalación requeridos para su matriz de agua.",
          ],
        },
      ],
      complianceNotes: [
        {
          title: "Métodos documentados",
          text: "La descripción del fabricante indica que los métodos de Skalar siguen metodologías de referencia reconocidas internacionalmente. Esta declaración se refiere a los métodos de análisis, no a una certificación independiente del equipo. Consulte con nuestro equipo técnico sobre el cumplimiento normativo aplicable a su proceso.",
        },
      ],
      applicationNotes: [
        {
          label: "Agua potable",
          text: "La fuente lo describe para el análisis colorimétrico automatizado de nutrientes y otros parámetros de calidad de agua potable.",
        },
        {
          label: "Aguas residuales y monitoreo ambiental",
          text: "La descripción lo orienta a laboratorios ambientales que procesan muestras y matrices complejas de aguas residuales y vigilancia ambiental.",
        },
        {
          label: "Parámetros mencionados",
          text: "Amoníaco, nitrato, nitrito, ortofosfato, sulfato y cloruro, entre otros parámetros de calidad de agua descritos por el fabricante.",
        },
      ],
      relatedVideo: {
        label: "BLUVISION® — analizador discreto de agua",
        src: "/productos/skalar-bluvision/video-relacionado.mp4",
        poster: "/productos/skalar-bluvision/portada.webp",
      },
    },
  },
  {
    id: "skalar-sp2000-series",
    slug: "skalar-sp2000-series",
    name: "Analizador robótico Skalar SP2000",
    category: "Automatización",
    filters: ["Marcas", "Automatización", "Análisis de agua", "Equipamiento analítico"],
    description:
      "Plataforma robótica modular para automatizar ensayos rutinarios de agua, suelo y pesaje de laboratorio. Configura el pipeteo, mezcla, medición y cálculo según el método aplicado.",
    features: [
      "Configuración modular para BOD, COD, pH, conductividad y otras aplicaciones",
      "Capacidad de BOD de 18 a 144 botellas, según configuración",
      "Control mediante software RoboticAccess con exportación a LIMS o Excel",
    ],
    imageUrl: "/productos/skalar-sp2000-series/portada.webp",
    tags: [
      "Skalar",
      "SP2000",
      "automatización robótica",
      "BOD",
      "COD",
      "análisis de agua",
      "análisis de suelos",
    ],
    detail: {
      brand: "Skalar",
      model: "Serie SP2000",
      fullTitle: "Skalar SP2000 — Plataforma robótica modular para análisis rutinario",
      subtitle:
        "Plataforma robótica configurable que automatiza el manejo de muestras y etapas analíticas para BOD, COD, kits de análisis, pH, conductividad, titulaciones, turbidez, color, ISE, suelos y pesaje. El método seleccionado define los bastidores, recipientes, módulos y reactivos requeridos.",
      highlights: [
        "Automatiza pipeteo, mezcla, medición, lavado y cálculo de acuerdo con la aplicación",
        "Configuraciones documentadas para 18 a 144 botellas BOD y 48 a 288 tubos de kit por lote",
        "RoboticAccess integra archivos de aplicación, programación de análisis, QC y exportación a LIMS o Excel",
      ],
      advantages: [
        "La plataforma recibe una configuración definida por el método: bastidores, frascos o tubos de muestra, medidores y sondas, titulador, filtros o fotómetros cuando corresponda.",
        "Para control de agua puede cargar botellas de muestreo originales, leer su código de barras y ejecutar los parámetros indicados en la tabla de muestras.",
        "RoboticAccess admite archivos de aplicación predefinidos, tablas de muestras y opciones de impresión o exportación definidas por el usuario.",
        "Las cubiertas frontal y laterales protegen la plataforma; la fuente indica que están diseñadas conforme a los requisitos de seguridad aplicables.",
      ],
      technicalParameters: [
        {
          leftParameter: "Capacidad BOD",
          leftValue: "De 18 a 144 botellas, según configuración",
          rightParameter: "Kits de análisis",
          rightValue: "De 48 a 288 tubos por lote",
        },
        {
          leftParameter: "Bastidores para COD por titulación",
          leftValue: "De 1 a 6 bastidores intercambiables de 20 posiciones",
          rightParameter: "pH de suelo",
          rightValue: "Hasta 576 recipientes de 50 mL",
        },
        {
          leftParameter: "Electrodos para pH de suelo",
          leftValue: "Hasta 6 electrodos, según configuración",
          rightParameter: "Distribución de tamaño de partícula",
          rightValue: "De 14 a 105 cilindros de sedimentación o recipientes",
        },
        {
          leftParameter: "Pretratamiento de suelo",
          leftValue: "Hasta 70 tubos de centrífuga de 250 mL o 24 vasos de 800 mL",
          rightParameter: "Pérdida por ignición (LOI)",
          rightValue: "Seguimiento de peso antes y después de calentamiento de hasta 550 °C",
        },
        {
          leftParameter: "Control de software",
          leftValue: "RoboticAccess: planificación, QC, LIMS y Excel",
          rightParameter: "Modos de trabajo",
          rightValue: "Aplicaciones combinadas o individuales según configuración",
        },
      ],
      detailBlocks: [
        {
          title: "BOD y demanda bioquímica de oxígeno",
          tone: "green",
          items: [
            "La configuración BOD puede automatizar el pipeteo de muestra, la medición o ajuste de pH, la adición de inhibidor de nitrificación (ATU) o semilla, agua de dilución, mezcla y las mediciones de oxígeno disuelto inicial y final.",
            "También documenta enjuague de sonda y agitador entre mediciones, tapado y destapado de botellas y cálculo de BOD conforme al método requerido.",
            "La fuente especifica una configuración de 18 a 144 botellas BOD, según el rendimiento y nivel de automatización solicitados.",
          ],
        },
        {
          title: "COD y aplicaciones con kits",
          tone: "yellow",
          items: [
            "Para COD por titulación, la plataforma se configura con 1 a 6 bastidores de 20 posiciones; las muestras pueden permanecer en el mismo vial desde la digestión a la titulación. La fuente describe titulador, punta de bureta, sonda y agitador, con opción de dos tituladores.",
            "En aplicaciones de kits, automatiza pipeteo, tapado y destapado de tubos, mezcla, calentamiento o enfriamiento, adición de reactivos y detección fotométrica. La fuente indica compatibilidad con tubos COD comerciales o preparados por el laboratorio y diversos fotómetros.",
            "La conductividad puede medirse antes del análisis con kits para seleccionar automáticamente el rango óptimo y diluir la muestra si corresponde.",
          ],
        },
        {
          title: "Control de calidad de agua",
          tone: "blue",
          items: [
            "Para pH, conductividad, alcalinidad y otras titulaciones, turbidez, color verdadero, aparente y UV, e ISE, puede trabajar directamente con botellas originales de muestreo y leer el código de barras de la muestra.",
            "La automatización documentada incluye tapado y destapado, filtración en línea o con filtro de banda, agitación, titulación, enjuague de sonda, agitador, aguja de drenaje, filtros y celdas de flujo, medición, calibración y cálculo de resultados.",
            "Según la aplicación, los estándares y controles de calidad pueden incorporarse entre muestras y las sondas pueden recalibrarse automáticamente. Se puede integrar un titulador dual y filtro de banda para aguas con partículas.",
          ],
        },
        {
          title: "Suelos, partículas y pesaje",
          tone: "green",
          items: [
            "En pH de suelo, añade el extractante, mezcla, espera el tiempo definido y mide pH; la fuente documenta calibración y enjuague de sonda, además de extensión opcional para conductividad eléctrica.",
            "Para distribución de tamaño de partícula, dos plataformas SP2000 automatizan el pretratamiento y la determinación de la fracción de arcilla. El proceso documenta adición de pirofosfato de sodio, agua, peróxido de hidrógeno y ácido clorhídrico, calentamiento, enfriamiento, enjuague y transferencia a recipientes de evaporación.",
            "La plataforma también automatiza pesaje de crisoles o papeles de filtro para LOI y sólidos suspendidos totales (TSS). En LOI, la fuente señala seguimiento del peso antes y después del calentamiento de alta temperatura.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Alcance por configuración",
          items: [
            "La Serie SP2000 es modular: capacidades, bastidores, sondas, tituladores, filtros, fotómetros, reactivos y métodos dependen de la aplicación seleccionada.",
            "La carpeta no documenta dimensiones, peso, alimentación eléctrica, requisitos de agua, gases, ventilación ni conectividad física. Confirme esos requisitos y la configuración aplicable antes de cotizar.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/skalar-sp2000-series/configuraciones-sp2000.webp",
        alt: "Tres configuraciones de la plataforma robótica Skalar SP2000",
        caption:
          "Configuraciones de la Serie SP2000 mostradas en el material fuente de Skalar. Los módulos, recipientes y capacidades se definen según el método automatizado.",
      },
      descriptionVideos: [
        {
          src: "/productos/skalar-sp2000-series/video-operacion-roboticaccess.mp4",
          poster:
            "/productos/skalar-sp2000-series/video-operacion-roboticaccess-poster.webp",
          alt: "Operación de la plataforma robótica Skalar SP2000 desde una estación de trabajo",
          title: "Operación con RoboticAccess",
          caption:
            "El material audiovisual muestra la operación de la plataforma desde una estación de trabajo. La fuente describe RoboticAccess con archivos de aplicación, programación de análisis, tabla de muestras, opciones de impresión o exportación a LIMS o Excel y funciones de control de calidad.",
        },
        {
          src: "/productos/skalar-sp2000-series/video-ejecucion-automatizada.mp4",
          poster:
            "/productos/skalar-sp2000-series/video-ejecucion-automatizada-poster.webp",
          alt: "Módulo robótico Skalar SP2000 durante una secuencia automatizada con recipientes de muestra",
          title: "Ejecución de una secuencia automatizada",
          caption:
            "La demostración muestra el módulo robótico trabajando con recipientes de muestra. Según la configuración, la plataforma automatiza tareas como pipeteo, mezcla, medición, enjuague y cálculo de acuerdo con el método aplicado.",
        },
      ],
      complianceNotes: [
        {
          title: "Declaración general del fabricante",
          text: "La descripción de Skalar indica que los métodos aplicados siguen metodologías de referencia reconocidas internacionalmente. Esta declaración corresponde a los métodos configurados, no a una certificación independiente de toda plataforma SP2000. Consulte con nuestro equipo técnico sobre el cumplimiento normativo aplicable a su proceso.",
        },
        {
          title: "Cubiertas protectoras",
          text: "El fabricante describe cubiertas protectoras frontales y laterales conforme a los requisitos de seguridad aplicables. No se publica una declaración o certificado independiente en la carpeta fuente.",
        },
      ],
      applicationNotes: [
        {
          label: "Laboratorios de agua",
          text: "BOD, COD, pH, conductividad, alcalinidad y otras titulaciones, turbidez, color verdadero, aparente y UV, ISE, índice de permanganato y aplicaciones con kits de análisis de agua o aguas residuales.",
        },
        {
          label: "BOD y COD",
          text: "Automatiza etapas de BOD, COD por titulación y COD con kits de reacción; la selección de recipientes, bastidores, módulos y rangos depende de la configuración del método.",
        },
        {
          label: "Suelos y control ambiental",
          text: "pH de suelo, conductividad eléctrica simultánea, pretratamiento y distribución de tamaño de partícula, incluida la determinación de fracción de arcilla documentada en la fuente.",
        },
        {
          label: "Pesaje de laboratorio",
          text: "Pesaje automatizado para pérdida por ignición (LOI) y sólidos suspendidos totales (TSS) en suelo, lodos, residuos, agua residual y productos industriales citados por el fabricante.",
        },
      ],
      relatedVideo: {
        label: "Serie SP2000 — demostración de análisis BOD",
        src: "/productos/skalar-sp2000-series/video-bod.mp4",
        poster: "/productos/skalar-sp2000-series/portada.webp",
      },
    },
  },
  {
    id: "skalar-formacs-series",
    slug: "skalar-formacs-series",
    name: "Analizadores TOC/TN FORMACS™",
    category: "Análisis de agua",
    filters: [
      "Marcas",
      "Análisis de agua",
      "Automatización",
      "Equipamiento analítico",
    ],
    description:
      "Serie de analizadores para determinar carbono orgánico total y nitrógeno en aguas naturales, domésticas e industriales mediante combustión catalítica a alta temperatura.",
    features: [
      "Configuraciones HT, HT-i y TN para carbono y nitrógeno en agua",
      "FORMACS™ HT con automuestreador de hasta 150 posiciones, según configuración",
      "Módulo PRIMACS™ MCS para muestras sólidas de suelo, sedimento y lodo",
    ],
    imageUrl: "/productos/skalar-formacs-series/portada.avif",
    tags: [
      "Skalar",
      "FORMACS",
      "TOC",
      "TN",
      "carbono orgánico total",
      "nitrógeno total",
      "análisis de agua",
      "combustión catalítica",
    ],
    detail: {
      brand: "Skalar",
      model: "Serie FORMACS™",
      fullTitle: "Skalar FORMACS™ — Analizadores TOC/TN para agua",
      subtitle:
        "Familia de analizadores para la determinación rápida y confiable de especies de carbono y nitrógeno en aguas ambientales, de proceso y de laboratorio. La configuración se selecciona según la matriz, el nivel de partículas y los parámetros requeridos.",
      highlights: [
        "Determinación de carbono y nitrógeno por combustión catalítica a alta temperatura",
        "FORMACS™ HT para TC, TIC, TOC, DOC, NPOC y POC en muestras de agua más limpias",
        "FORMACS™ HT-i para aguas con partículas y suspensiones mediante inyección directa",
      ],
      advantages: [
        "FORMACS™ HT puede trabajar como equipo independiente o con automuestreador de hasta 150 posiciones para lotes de muestras de agua más limpias.",
        "El puerto de inyección rotatorio sin septum del HT permite introducir muestras y estándares directamente para la determinación de TC y TIC.",
        "FORMACS™ HT-i emplea un mecanismo de inyección directa y una aguja de toma e inyección de gran calibre para matrices con partículas y suspensiones.",
        "La Serie FORMACS™ puede ampliarse con determinación de TN/TKN y con el módulo semiautomático PRIMACS™ MCS para TC/IC en sólidos, según la configuración.",
      ],
      technicalParameters: [
        {
          leftParameter: "FORMACS™ HT",
          leftValue: "TC, TIC, TOC, DOC, NPOC y POC en tipos de agua más limpios",
          rightParameter: "Automuestreador HT",
          rightValue: "Hasta 150 posiciones, según configuración",
        },
        {
          leftParameter: "FORMACS™ HT-i",
          leftValue: "Inyección directa para aguas con partículas y suspensiones",
          rightParameter: "FORMACS™ TN",
          rightValue: "Detector ND25 y detección por quimioluminiscencia",
        },
        {
          leftParameter: "Rango TN documentado",
          leftValue: "Desde ppb bajos hasta ppm altos",
          rightParameter: "Análisis TKN",
          rightValue: "Con reactor NN integrado para nitrato y nitrito",
        },
        {
          leftParameter: "PRIMACS™ MCS",
          leftValue: "TC e IC en muestras sólidas",
          rightParameter: "Carbono absoluto",
          rightValue: "De 500 µg a 40 mg; hasta 3 g de muestra",
        },
        {
          leftParameter: "Software",
          leftValue: "HTAccess para adquisición, control y resultados",
          rightParameter: "Exportación",
          rightValue: "Impresión y exportación a LIMS descritas por el fabricante",
        },
      ],
      detailBlocks: [
        {
          title: "Carbono orgánico en aguas limpias y con partículas",
          tone: "green",
          items: [
            "FORMACS™ HT está destinado a medir TC, TIC, TOC, DOC, NPOC y POC en tipos de agua más limpios. El tratamiento NPOC está controlado por software y utiliza una aguja doble para acidificar y purgar la siguiente muestra mientras se analiza la actual.",
            "FORMACS™ HT-i está diseñado para análisis rápido de TOC/TN en muestras líquidas con partículas y suspensiones. La inyección directa y la aguja de gran calibre facilitan el trabajo con matrices más exigentes.",
            "Las configuraciones se basan en combustión catalítica a alta temperatura para la determinación de especies de carbono y nitrógeno descritas en el material de Skalar.",
          ],
        },
        {
          title: "Nitrógeno y sólidos mediante módulos de la serie",
          tone: "yellow",
          items: [
            "FORMACS™ TN incorpora el detector ND25 y detección por quimioluminiscencia para concentraciones desde ppb bajos hasta ppm altos. El material describe un reactor NN integrado para considerar nitrato y nitrito en determinaciones de TKN.",
            "PRIMACS™ MCS amplía el análisis de carbono a sólidos como suelo, sedimento y lodo. Sus dos hornos separan la determinación de TC e IC; el software calcula TOC como la diferencia entre ambos valores.",
            "El módulo para sólidos documenta un intervalo de carbono absoluto de 500 µg a 40 mg y una carga de muestra de hasta 3 g.",
          ],
        },
        {
          title: "Control de secuencias y resultados",
          tone: "blue",
          items: [
            "HTAccess permite crear plantillas de rutina, calibraciones multipunto, excluir o recalcular resultados estadísticos y definir métodos individuales o por lote.",
            "El material fuente describe niveles de acceso, contraseñas y registros de auditoría, además de gráficos de integración en tiempo real, edición de picos y muestras de control de calidad.",
            "Las listas de trabajo pueden incluir deriva, lavado, estándares y muestras de control; los resultados pueden imprimirse o exportarse a LIMS durante el análisis.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Configuración y requisitos por confirmar",
          items: [
            "La Serie FORMACS™ se configura de acuerdo con los parámetros, la matriz y el nivel de partículas de las muestras. Confirme con nuestro equipo la combinación de módulos, automuestreador y pretratamiento requerida.",
            "La carpeta fuente no incluye ficha técnica con dimensiones, peso, alimentación eléctrica, gases, ventilación o consumos. Solicite esos requisitos para la configuración cotizada.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/skalar-formacs-series/configuraciones-formacs.png",
        alt: "Configuraciones Skalar FORMACS HT y FORMACS HT-i para análisis de carbono y nitrógeno en agua",
        title: "Configuraciones FORMACS™ HT y HT-i",
        caption:
          "La lámina del fabricante muestra configuraciones de la Serie FORMACS™ para análisis de carbono y nitrógeno en agua. HT se orienta a muestras de agua más limpias y HT-i incorpora inyección directa para matrices con partículas y suspensiones.",
      },
      descriptionImages: [
        {
          src: "/productos/skalar-formacs-series/formacs-tn.avif",
          alt: "Analizador Skalar FORMACS TN con detector ND25",
          title: "FORMACS™ TN",
          caption:
            "La configuración FORMACS™ TN usa el detector ND25 y detección por quimioluminiscencia para nitrógeno desde ppb bajos hasta ppm altos. El material describe un reactor NN integrado para nitrato y nitrito en el análisis de TKN.",
        },
        {
          src: "/productos/skalar-formacs-series/primacs-mcs.avif",
          alt: "Módulo Skalar PRIMACS MCS para determinación de carbono en sólidos",
          title: "PRIMACS™ MCS para muestras sólidas",
          caption:
            "PRIMACS™ MCS se integra a FORMACS™ para determinar TC e IC en suelo, sedimento y lodo. Sus hornos separados miden ambas fracciones y el software calcula TOC como TC menos IC.",
        },
        {
          src: "/productos/skalar-formacs-series/formacs-ht-i.avif",
          alt: "Analizador Skalar FORMACS HT-i para muestras de agua con partículas",
          title: "FORMACS™ HT-i con inyección directa",
          caption:
            "FORMACS™ HT-i está planteado para aguas con partículas y suspensiones. La toma e inyección de gran calibre acompañan su mecanismo de inyección directa para trabajar con esas matrices.",
        },
      ],
      complianceNotes: [
        {
          title: "Trazabilidad documentada",
          text: "El material de HTAccess describe niveles de acceso, contraseñas, registros de auditoría, muestras de control de calidad y gráficos de resultados. La carpeta no incluye certificados ni una declaración de cumplimiento independiente para publicar.",
        },
      ],
      applicationNotes: [
        {
          label: "Aguas ambientales y de proceso",
          text: "Aguas de enfriamiento, agua potable, agua subterránea, agua de proceso, agua de mar, agua superficial, aguas residuales y control industrial citados por el fabricante.",
        },
        {
          label: "Laboratorio farmacéutico",
          text: "El material fuente incluye agua para aplicaciones farmacéuticas entre las matrices de agua más limpias que puede abordar FORMACS™ HT.",
        },
        {
          label: "Sólidos ambientales",
          text: "Con PRIMACS™ MCS, la plataforma documenta análisis de TC, IC y TOC en suelo, sedimento y lodo.",
        },
      ],
      relatedVideo: {
        label: "Serie FORMACS™",
        src: "/productos/skalar-formacs-series/video-relacionado.mp4",
        poster: "/productos/skalar-formacs-series/video-relacionado-poster.webp",
      },
    },
  },
  {
    id: "skalar-primacs-series",
    slug: "skalar-primacs-series",
    name: "Analizadores de sólidos PRIMACS™",
    category: "Análisis elemental",
    filters: [
      "Marcas",
      "Análisis elemental",
      "Automatización",
      "Equipamiento analítico",
    ],
    description:
      "Serie de analizadores para determinar carbono y nitrógeno en muestras sólidas mediante combustión a alta temperatura y detección específica de carbono y nitrógeno.",
    features: [
      "PRIMACS™ SNC-100 para nitrógeno/proteína, TC, TEC, TIC y TOC",
      "Automuestreador integrado de 100 posiciones y crisoles de cuarzo reutilizables",
      "Módulo PRIMACS™ MCS para TOC en sólidos, en combinación con FORMACS™",
    ],
    imageUrl: "/productos/skalar-primacs-series/portada.avif",
    tags: [
      "Skalar",
      "PRIMACS",
      "carbono total",
      "carbono orgánico total",
      "nitrógeno total",
      "proteína",
      "análisis de sólidos",
      "combustión",
    ],
    detail: {
      brand: "Skalar",
      model: "Serie PRIMACS™",
      fullTitle: "Skalar PRIMACS™ — Análisis de carbono y nitrógeno en sólidos",
      subtitle:
        "Familia de analizadores para medir especies de carbono y nitrógeno en muestras sólidas. La configuración SNC-100 integra el automuestreo y el análisis por combustión; el módulo MCS se utiliza junto con un analizador FORMACS™ para TOC en sólidos.",
      highlights: [
        "PRIMACS™ SNC-100 para N/proteína, TC, TEC, TIC y TOC",
        "Automuestreador integrado de 100 posiciones para crisoles de cuarzo",
        "MCS para sólidos ambientales, operado en combinación con FORMACS™",
      ],
      advantages: [
        "El PRIMACS™ SNC-100 introduce la muestra de forma vertical en el reactor; las cenizas permanecen en el crisol y se retiran después del análisis.",
        "La combustión a alta temperatura con temperaturas variables se combina con detección NDIR para las especies de carbono documentadas.",
        "Para nitrógeno y proteína, el material describe el método Dumas con detector de conductividad térmica (TCD).",
        "PRIMACS™ MCS solo funciona en combinación con un analizador TOC de la Serie FORMACS™.",
      ],
      technicalParameters: [
        {
          leftParameter: "PRIMACS™ SNC-100",
          leftValue: "N/proteína, TC, TEC, TIC y TOC",
          rightParameter: "Automuestreador",
          rightValue: "100 posiciones integradas",
        },
        {
          leftParameter: "Recipiente de muestra",
          leftValue: "Crisoles de cuarzo reutilizables",
          rightParameter: "Masa de muestra",
          rightValue: "Hasta 3 g",
        },
        {
          leftParameter: "Carbono",
          leftValue: "Combustión a alta temperatura y detección NDIR",
          rightParameter: "N/proteína",
          rightValue: "Método Dumas con detector TCD",
        },
        {
          leftParameter: "TIC",
          leftValue: "Acidificación y purga automáticas",
          rightParameter: "PRIMACS™ MCS",
          rightValue: "Requiere un analizador TOC FORMACS™",
        },
      ],
      detailBlocks: [
        {
          title: "Muestras sólidas y manejo de crisoles",
          tone: "green",
          items: [
            "El PRIMACS™ SNC-100 incorpora un automuestreador de 100 posiciones con tapa transparente y un portacrisoles extraíble. El material indica el uso de crisoles de cuarzo reutilizables para muestras de hasta 3 g.",
            "La introducción vertical de la muestra permite que las cenizas permanezcan en el crisol. Tras el análisis, el crisol se retira del reactor, lo que evita la acumulación de cenizas dentro del equipo y reduce la necesidad de mantenimiento asociada.",
          ],
        },
        {
          title: "Determinación de carbono, nitrógeno y proteína",
          tone: "yellow",
          items: [
            "Para TOC, TEC y TIC, la serie utiliza combustión a alta temperatura y detección NDIR. El fabricante describe temperaturas variables para adecuar la combustión y la determinación de TEC a distintas matrices.",
            "El análisis de nitrógeno y proteína se realiza con el método Dumas y un detector TCD. Para TIC, el material describe acidificación y purga automáticas.",
          ],
        },
        {
          title: "Módulo MCS junto con FORMACS™",
          tone: "blue",
          items: [
            "PRIMACS™ MCS está destinado a la determinación de TOC en muestras sólidas de suelo, sedimento y lodo. No opera de manera independiente: se combina con un analizador TOC de la Serie FORMACS™ para muestras líquidas.",
            "Esta combinación está dirigida a laboratorios ambientales que analizan tanto muestras acuosas como sólidos y lodos.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Configuración y requisitos por confirmar",
          items: [
            "La selección de la configuración debe considerar los parámetros requeridos, la matriz de muestra y el software de trabajo. Confirme con nuestro equipo la configuración aplicable a su método.",
            "La carpeta fuente no incluye una ficha técnica con dimensiones, peso, alimentación eléctrica, gases, ventilación o consumos. Solicite esos requisitos antes de definir la instalación.",
          ],
        },
      ],
      descriptionImage: {
        src: "/productos/skalar-primacs-series/configuraciones-primacs.png",
        alt: "Configuraciones Skalar PRIMACS SNC-100 y PRIMACS MCS para análisis de carbono y nitrógeno en sólidos",
        title: "Configuraciones PRIMACS™ SNC-100 y MCS",
        caption:
          "La lámina del fabricante presenta el SNC-100 para análisis de carbono y nitrógeno en sólidos, y el módulo MCS para TOC en sólidos junto con un analizador FORMACS™ de muestras líquidas.",
      },
      descriptionVideos: [
        {
          src: "/productos/skalar-primacs-series/video-posicionamiento-muestra.mp4",
          poster: "/productos/skalar-primacs-series/video-posicionamiento-muestra-poster.webp",
          alt: "Posicionamiento de una muestra en el reactor de un analizador PRIMACS SNC-100",
          title: "Posicionamiento de la muestra en el reactor",
          caption:
            "El video muestra el posicionamiento de la muestra en el reactor. La documentación describe introducción vertical y temperaturas variables para adecuar la combustión a diferentes matrices.",
        },
        {
          src: "/productos/skalar-primacs-series/video-acidificacion-purga.mp4",
          poster: "/productos/skalar-primacs-series/video-acidificacion-purga-poster.webp",
          alt: "Proceso de acidificación y purga para análisis de TIC en PRIMACS",
          title: "Acidificación y purga para TIC",
          caption:
            "Para carbono inorgánico total (TIC), el material de la serie PRIMACS™ documenta un proceso automático de acidificación y purga.",
        },
        {
          src: "/productos/skalar-primacs-series/video-combustion-ndir.mp4",
          poster: "/productos/skalar-primacs-series/video-combustion-ndir-poster.webp",
          alt: "Recorrido de la muestra durante la combustión y detección NDIR en un analizador PRIMACS",
          title: "Combustión y detección NDIR",
          caption:
            "La animación ilustra el recorrido del análisis de carbono. Para TOC, TEC y TIC, Skalar documenta combustión a alta temperatura y detección NDIR.",
        },
        {
          src: "/productos/skalar-primacs-series/video-medicion-carbono.mp4",
          poster: "/productos/skalar-primacs-series/video-medicion-carbono-poster.webp",
          alt: "Medición de carbono en un analizador PRIMACS",
          title: "Medición de carbono",
          caption:
            "El video muestra la etapa de medición de carbono. La Serie PRIMACS™ utiliza detección NDIR para las especies de carbono indicadas por el fabricante.",
        },
      ],
      complianceNotes: [
        {
          title: "Documentación disponible",
          text: "La carpeta fuente no incluye certificados, normas ni declaraciones de cumplimiento independientes para publicar.",
        },
      ],
      applicationNotes: [
        {
          label: "Suelo y material vegetal",
          text: "El fabricante cita suelo y plantas entre las aplicaciones de la Serie PRIMACS™.",
        },
        {
          label: "Lodos y sedimentos",
          text: "La serie se documenta para lodos y sedimentos; con MCS, el análisis de TOC en sólidos se realiza junto con FORMACS™.",
        },
        {
          label: "Alimentos y agricultura",
          text: "Alimento animal, grano, alimentos, malta y fertilizante se incluyen en la biblioteca de aplicaciones indicada por el fabricante.",
        },
      ],
    },
  },
  {
    id: "thermo-gallery-discrete-analyzer",
    slug: "thermo-gallery-discrete-analyzer",
    name: "Gallery / Gallery Plus Discrete Analyzer",
    category: "Automatización",
    filters: ["Marcas", "Automatización"],
    description:
      "Familia de analizadores fotométricos automatizados para mediciones colorimétricas, enzimáticas y electroquímicas, disponible en dos capacidades según el volumen de análisis del laboratorio.",
    features: [
      "Gallery: hasta 200; Gallery Plus: hasta 350 análisis por hora",
      "Gallery Plus: hasta 180 muestras y 42 posiciones de reactivo a bordo",
      "Cubetas discretas desechables y módulo ECM opcional",
    ],
    imageUrl: "/productos/thermo-gallery-discrete-analyzer/portada.png",
    tags: [
      "Thermo Scientific",
      "Gallery",
      "analizador discreto",
      "fotometría",
      "colorimetría",
      "enzimático",
      "automatización",
    ],
    detail: {
      brand: "Thermo Scientific",
      model: "Gallery / Gallery Plus · 98610001 / 98620001",
      fullTitle:
        "Thermo Scientific Gallery / Gallery Plus — Análisis fotométrico automatizado",
      subtitle:
        "Familia de analizadores discretos de sobremesa que combina muestras y reactivos en cubetas desechables para realizar ensayos colorimétricos y enzimáticos por fotometría. Gallery responde al volumen estándar; Gallery Plus aumenta muestras, reactivos y rendimiento. Ambos pueden incorporar ECM para pH y conductividad y requieren muestras, reactivos, cubetas desechables, agua desionizada y alimentación eléctrica. Las configuraciones están disponibles a través de Del Carpio.",
      highlights: [
        "Gallery: hasta 200; Gallery Plus: hasta 350 análisis por hora",
        "Gallery Plus: hasta 180 muestras y 42 reactivos a bordo",
        "Longitud de onda de 340 a 880 nm; módulo ECM opcional",
      ],
      advantages: [
        "La tecnología de celda discreta procesa simultáneamente múltiples analitos y permite añadir muestras, reactivos o cubetas sin interrumpir la corrida.",
        "Automatiza las diluciones, las repeticiones fuera de rango, la lectura de códigos de barras y los ciclos de encendido y apagado.",
        "Ambos tiers usan cubetas desechables; la ficha de Gallery indica 360 celdas de medición a bordo.",
        "La documentación indica alimentación de 100 a 240 V, 50/60 Hz. El consumo de agua desionizada de 1,5 L/h está documentado para Gallery; no se publica una cifra equivalente para Gallery Plus.",
      ],
      technicalParameters: [
        {
          leftParameter: "Configuración Gallery",
          leftValue: "98610001; bastidores de muestra de 9 o 18 posiciones y hasta 6 bastidores de reactivos de 6 posiciones",
          rightParameter: "Configuración Gallery Plus",
          rightValue: "98620001; hasta 180 posiciones de muestra y 42 posiciones de reactivo a bordo",
        },
        {
          leftParameter: "Rendimiento",
          leftValue: "Gallery: hasta 200 análisis por hora",
          rightParameter: "Rendimiento Gallery Plus",
          rightValue: "Hasta 350 análisis por hora",
        },
        {
          leftParameter: "Dimensiones y peso Gallery",
          leftValue: "75 cm de ancho × 70 cm de profundidad × 62 cm de alto cerrada (130 cm abierta); 85 kg",
          rightParameter: "Dimensiones y peso Gallery Plus",
          rightValue: "94 cm de ancho × 70 cm de profundidad × 62 cm de alto cerrada (130 cm abierta); 110 kg",
        },
        {
          leftParameter: "Métodos de medición",
          leftValue: "Colorimétricos, enzimáticos y electroquímicos",
          rightParameter: "Principio de medida",
          rightValue: "Fotométrico; módulo ECM opcional para pH y conductividad",
        },
        {
          leftParameter: "Longitud de onda",
          leftValue: "De 340 a 880 nm; niveles bajos de ppb documentados",
          rightParameter: "Operación autónoma",
          rightValue: "Hasta dos horas por ciclo documentadas",
        },
        {
          leftParameter: "Capacidad de muestras",
          leftValue: "Hasta 90 muestras en el disco combinado",
          rightParameter: "Capacidad de reactivos",
          rightValue: "Hasta 30 reactivos; hasta 6 bastidores de reactivos a bordo",
        },
        {
          leftParameter: "Portamuestras",
          leftValue: "Bastidores de 9 o 18 posiciones",
          rightParameter: "Cubetas de medición",
          rightValue: "360 cubetas discretas desechables a bordo",
        },
        {
          leftParameter: "Calibración",
          leftValue: "Factor, sesgo, lineal, logit-log, spline, polinómica y punto a punto",
          rightParameter: "Control de calidad",
          rightValue: "Multirregla en tiempo real, frecuencia definida por el usuario y marcado fuera de especificación",
        },
        {
          leftParameter: "Dilución de muestra",
          leftValue: "Predilución automática, dilución automática para reanálisis fuera de rango y predilución manual",
          rightParameter: "Acceso durante la corrida",
          rightValue: "Muestras, reactivos y cubetas con acceso continuo",
        },
        {
          leftParameter: "Agua desionizada",
          leftValue: "1,5 L/h",
          rightParameter: "Alimentación eléctrica",
          rightValue: "100 a 240 V ±10 %; 50/60 Hz ±5 %",
        },
        {
          leftParameter: "Dimensiones",
          leftValue: "75 cm de ancho × 70 cm de profundidad × 62 cm de alto con tapa cerrada (130 cm abierta)",
          rightParameter: "Peso",
          rightValue: "85 kg",
        },
      ],
      detailBlocks: [
        {
          title: "Proceso discreto automatizado",
          tone: "yellow",
          items: [
            "El Gallery combina muestras y reactivos en cubetas desechables para efectuar mediciones fotométricas de métodos colorimétricos y enzimáticos.",
            "La tecnología de celda discreta permite analizar simultáneamente varios analitos, reducir el tiempo total de análisis y mantener hasta dos horas de operación desatendida documentada.",
            "Las cubetas desechables se utilizan como celdas de medición y evitan la contaminación cruzada entre determinaciones.",
          ],
        },
        {
          title: "Dos capacidades de trabajo",
          tone: "green",
          items: [
            "Gallery usa bastidores de muestra de 9 o 18 posiciones y hasta seis bastidores de reactivos de seis posiciones; Gallery Plus alcanza 180 posiciones de muestra y 42 de reactivo a bordo.",
            "El Gallery llega a 200 análisis por hora y Gallery Plus a 350 análisis por hora. Ambos mantienen acceso continuo a muestras, reactivos y cubetas.",
            "Los dos equipos ejecutan diluciones y repeticiones automáticas cuando un resultado queda fuera de rango, y admiten trazabilidad mediante lector de código de barras.",
          ],
        },
        {
          title: "Módulo ECM opcional",
          tone: "blue",
          items: [
            "El módulo de química electroquímica (ECM) se ofrece como opción para medir pH y conductividad en paralelo con los análisis fotométricos.",
            "La fuente indica un rango aproximado de pH de 2 a 12 y de conductividad de 20 μS/cm a 112 mS/cm. El ECM alcanza hasta 54 mediciones por hora en Gallery y hasta 67 en Gallery Plus.",
          ],
        },
        {
          title: "Requisitos de operación documentados",
          tone: "yellow",
          items: [
            "Para operar, ambos requieren muestras, reactivos y cubetas desechables. El consumo de agua desionizada de 1,5 L/h está publicado solo para Gallery.",
            "La alimentación especificada es de 100 a 240 V ±10 % y 50/60 Hz ±5 %. Antes de la instalación, valide 75 cm de ancho para Gallery o 94 cm para Gallery Plus, 70 cm de profundidad y hasta 130 cm de alto con la tapa abierta.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Configuraciones ECM opcionales",
          items: [
            "El ECM corresponde a los catálogos 98611001 para Gallery y 98621001 para Gallery Plus; no forma parte de las configuraciones base 98610001 ni 98620001.",
            "El módulo permite incorporar pH y conductividad a las mediciones fotométricas. Confirme su necesidad al cotizar la configuración.",
          ],
        },
      ],
      descriptionImages: [
        {
          src: "/productos/thermo-gallery-discrete-analyzer/gallery-plus-portada.png",
          alt: "Analizador Thermo Scientific Gallery Plus",
          title: "Gallery Plus para mayor capacidad",
          caption:
            "Gallery Plus corresponde al tier de mayor capacidad de la familia: incorpora hasta 180 posiciones de muestra, 42 posiciones de reactivo y rendimiento de hasta 350 análisis por hora.",
        },
        {
          src: "/productos/thermo-gallery-discrete-analyzer/equipo-con-estacion.png",
          alt: "Analizador Thermo Scientific Gallery con estación de control",
          title: "Configuración de sobremesa",
          caption:
            "La imagen suministrada muestra el Gallery Discrete Analyzer con una estación de control. La documentación describe un equipo compacto de sobremesa con lectura de códigos de barras y protocolos automáticos de encendido y apagado.",
        },
        {
          src: "/productos/thermo-gallery-discrete-analyzer/disco-muestras-reactivos.webp",
          alt: "Disco combinado de muestras y reactivos del Thermo Scientific Gallery",
          title: "Disco combinado de muestras y reactivos",
          caption:
            "El Gallery carga hasta 90 muestras y 30 reactivos en un disco combinado. La fuente documenta acceso continuo a muestras, reactivos y cubetas durante la corrida, sin interrumpir el análisis.",
        },
      ],
      applicationNotes: [
        {
          label: "Vino y jugo",
          text: "La fuente oficial documenta control de calidad en bodegas y vitivinícolas, desde jugo hasta embotellado, para parámetros como ácidos orgánicos, SO₂, pH, color, alcohol, azúcares y minerales.",
        },
        {
          label: "Alimentos y bebidas",
          text: "La documentación identifica el análisis de alimentos y bebidas entre las aplicaciones del equipo.",
        },
        {
          label: "Control ambiental",
          text: "El fabricante menciona el control ambiental como campo de aplicación para las determinaciones automatizadas.",
        },
        {
          label: "Control de calidad industrial",
          text: "El equipo se documenta para procesos de control de calidad industrial.",
        },
      ],
    },
  },
  {
    id: "thermo-gallery-aqua-master",
    slug: "thermo-gallery-aqua-master",
    name: "Gallery Aqua Master",
    category: "Análisis de agua",
    filters: ["Marcas", "Análisis de agua", "Automatización"],
    description:
      "Familia de analizadores fotométricos discretos para agua potable, residual, de suelo y agrícola, con software para métodos de agua y nutrientes orientados a flujos de trabajo EPA y NELAC.",
    features: [
      "Aqua Master: 45 a 90 muestras y hasta 200 análisis fotométricos/h",
      "Plus Aqua Master: hasta 108 muestras y 350 análisis fotométricos/h",
      "Hasta 20 parámetros simultáneos desde una sola muestra",
    ],
    imageUrl: "/productos/thermo-gallery-aqua-master/aqua-master-portada.png",
    tags: [
      "Thermo Scientific",
      "Gallery Aqua Master",
      "Gallery Plus Aqua Master",
      "análisis de agua",
      "análisis discreto",
      "fotometría",
      "nutrientes",
      "EPA",
      "NELAC",
    ],
    detail: {
      brand: "Thermo Scientific",
      model: "Gallery Aqua Master · 98610005 / 98620005",
      fullTitle:
        "Thermo Scientific Gallery Aqua Master — Análisis discreto para agua y nutrientes",
      subtitle:
        "Familia de analizadores fotométricos discretos para agua y nutrientes. Automatiza análisis simultáneos desde una muestra con paneles de método para agua, secuencias de calibración, control de calidad, spiking y diluciones. Funciona con muestras, reactivos y cubetas desechables de bajo volumen; la documentación no especifica los servicios de instalación.",
      highlights: [
        "Hasta 20 parámetros simultáneos desde una sola muestra",
        "Aqua Master: hasta 200; Plus Aqua Master: hasta 350 análisis fotométricos/h",
        "Métodos de agua y nutrientes con software orientado a EPA y NELAC",
      ],
      advantages: [
        "El análisis discreto combina hardware y software para automatizar calibraciones, control de calidad, spiking y diluciones inteligentes en flujos de trabajo de agua y nutrientes.",
        "Aqua Master admite de 45 a 90 muestras y hasta 30 reactivos; Plus Aqua Master llega a 108 posiciones de muestra y 42 posiciones de reactivo.",
        "Ambos tiers usan cubetas desechables de bajo volumen y una fuente de luz xenón con 12 posiciones de filtro para medición fotométrica.",
        "El módulo ECM opcional añade pH y conductividad en paralelo con los análisis fotométricos; no forma parte de la configuración base.",
      ],
      technicalParameters: [
        {
          leftParameter: "Configuración Aqua Master",
          leftValue: "Catálogo 98610005; 45 a 90 muestras y hasta 30 reactivos a bordo",
          rightParameter: "Configuración Plus Aqua Master",
          rightValue: "Catálogo 98620005; hasta 108 muestras y hasta 42 posiciones de reactivo",
        },
        {
          leftParameter: "Rendimiento Aqua Master",
          leftValue: "200 análisis fotométricos por hora; hasta 2 horas de operación autónoma",
          rightParameter: "Rendimiento Plus Aqua Master",
          rightValue: "Hasta 350 análisis fotométricos por hora; hasta 3 horas de operación autónoma",
        },
        {
          leftParameter: "Dimensiones Aqua Master",
          leftValue: "70 × 75 × 62 cm (prof. × ancho × alto); 130 cm de alto con tapa abierta",
          rightParameter: "Dimensiones Plus Aqua Master",
          rightValue: "70 × 94 × 62 cm (prof. × ancho × alto); 130 cm de alto con tapa abierta",
        },
        {
          leftParameter: "Peso Aqua Master",
          leftValue: "85 kg",
          rightParameter: "Peso Plus Aqua Master",
          rightValue: "110 kg",
        },
        {
          leftParameter: "Método analítico",
          leftValue: "Análisis discreto",
          rightParameter: "Medición fotométrica",
          rightValue: "340 a 880 nm; rango de pH documentado de 3 a 7,2",
        },
        {
          leftParameter: "Incubación",
          leftValue: "25 °C a 60 °C",
          rightParameter: "Óptica",
          rightValue: "Fuente de luz xenón de larga duración y 12 posiciones de filtro",
        },
        {
          leftParameter: "Parámetros simultáneos",
          leftValue: "Hasta 20 desde una sola muestra",
          rightParameter: "Cubetas",
          rightValue: "Desechables de bajo volumen",
        },
        {
          leftParameter: "ECM opcional",
          leftValue: "Aqua Master + ECM: 98611005; Plus Aqua Master + ECM: 98621005",
          rightParameter: "Mediciones ECM",
          rightValue: "pH y conductividad en paralelo con la fotometría",
        },
      ],
      detailBlocks: [
        {
          title: "Dos tiers para la carga de trabajo",
          tone: "yellow",
          items: [
            "Gallery Aqua Master está documentado para 45 a 90 muestras a bordo, hasta 30 reactivos, 200 análisis fotométricos por hora y hasta dos horas de operación autónoma.",
            "Gallery Plus Aqua Master aumenta la capacidad a 108 posiciones de muestra y 42 posiciones de reactivo, con hasta 350 análisis fotométricos por hora y hasta tres horas de operación autónoma.",
            "El Plus tiene 94 cm de ancho y 110 kg; Aqua Master tiene 75 cm de ancho y 85 kg. Ambos comparten 70 cm de profundidad, 62 cm de alto con tapa cerrada y 130 cm con tapa abierta.",
          ],
        },
        {
          title: "Flujo analítico para agua y nutrientes",
          tone: "green",
          items: [
            "La plataforma realiza análisis discretos fotométricos de 340 a 880 nm, con incubación de 25 °C a 60 °C, fuente xenón de larga duración y 12 posiciones de filtro.",
            "El software incorpora paneles de método para control de calidad ambiental y de agua, y automatiza secuencias de calibración, control de calidad, spiking y diluciones inteligentes documentadas para métodos regulados.",
            "Desde una sola muestra puede ejecutar hasta 20 parámetros simultáneos. La lista de parámetros documentados incluye amonio, nitrato+nitrito (TON), nitrito, ortofosfato, sílice, cloruro, sulfato, TP, TKN, cromo hexavalente, cianuro, dureza total y metales por colorimetría.",
          ],
        },
        {
          title: "Consumibles y mantenimiento documentados",
          tone: "yellow",
          items: [
            "La operación utiliza muestras, reactivos y cubetas desechables de bajo volumen. La fuente atribuye a estas cubetas hasta 20 veces menor costo operativo por menor consumo y desperdicio de reactivo frente a alternativas de mayor volumen.",
            "El material fuente indica menos de una visita de servicio técnico requerida al año, en promedio.",
          ],
        },
        {
          title: "Módulo ECM opcional",
          tone: "blue",
          items: [
            "Aqua Master + ECM (98611005) y Plus Aqua Master + ECM (98621005) añaden mediciones de pH y conductividad en paralelo con el análisis fotométrico estándar.",
            "El ECM es opcional: confirme al cotizar si se requieren estas mediciones en la configuración final.",
          ],
        },
      ],
      specificationNotes: [
        {
          title: "Requisitos de instalación pendientes de confirmación técnica",
          items: [
            "La carpeta fuente no especifica alimentación eléctrica, consumo de agua, gases, ventilación, conectividad ni requisitos de desagüe para ninguno de los dos tiers.",
            "Antes de instalar, confirme con Del Carpio esos servicios y seleccione el tier según capacidad de muestras, reactivos, rendimiento y espacio disponible.",
          ],
        },
      ],
      descriptionImages: [
        {
          src: "/productos/thermo-gallery-aqua-master/aqua-master-estacion.png",
          alt: "Thermo Scientific Gallery Aqua Master con estación de control",
          title: "Gallery Aqua Master",
          caption:
            "La configuración Aqua Master suministrada muestra el analizador con estación de control. Este tier está documentado para 45 a 90 muestras, hasta 30 reactivos y 200 análisis fotométricos por hora.",
        },
        {
          src: "/productos/thermo-gallery-aqua-master/plus-aqua-master.png",
          alt: "Thermo Scientific Gallery Plus Aqua Master con estación de control",
          title: "Gallery Plus Aqua Master",
          caption:
            "La imagen de Plus Aqua Master corresponde al tier de mayor capacidad: hasta 108 posiciones de muestra, 42 posiciones de reactivo y hasta 350 análisis fotométricos por hora.",
        },
      ],
      complianceNotes: [
        {
          title: "Métodos de agua y nutrientes",
          text: "La documentación indica que el software automatiza métodos que cumplen con EPA, NELAC y otros estándares internacionales para el flujo de trabajo de agua y nutrientes.",
        },
        {
          title: "Nitrato y nitrito total (TON)",
          text: "Para TON, la fuente documenta métodos de reducción enzimática aprobados por EPA como alternativa a las columnas de reducción con cadmio.",
        },
      ],
      applicationNotes: [
        {
          label: "Agua potable y residual",
          text: "La familia se documenta para análisis de agua potable y agua residual.",
        },
        {
          label: "Control ambiental e industrial",
          text: "El fabricante identifica control ambiental y agua industrial entre las aplicaciones del sistema.",
        },
        {
          label: "Suelo y análisis agrícola",
          text: "La documentación también cita análisis de suelo y aplicaciones agrícolas.",
        },
      ],
    },
  },
];

export function getProductBySlug(slug: string) {
  return mockProducts.find((product) => (product.slug ?? product.id) === slug);
}

export function getRelatedProducts(currentProduct: Product): Product[] {
  const currentId = currentProduct.slug ?? currentProduct.id;

  const getBrand = (p: Product): string => {
    if (p.detail?.brand) return p.detail.brand.toLowerCase();
    const id = (p.slug ?? p.id).toLowerCase();
    if (id.startsWith("decent")) return "decent";
    if (id.startsWith("hanon")) return "hanon";
    if (id.startsWith("infitek")) return "infitek";
    if (id.startsWith("milestone")) return "milestone";
    if (id.startsWith("te-instruments") || id.startsWith("xplorer"))
      return "te instruments";
    if (id.startsWith("restek")) return "restek";
    return "";
  };

  const currentBrand = getBrand(currentProduct);
  const explicitRelated = currentProduct.relatedProducts ?? [];

  // Pool de candidatos excluyendo el producto actual
  const pool = mockProducts.filter(
    (item) => (item.slug ?? item.id) !== currentId,
  );

  const matched: Product[] = [];
  const addedIds = new Set<string>();

  const add = (p: Product) => {
    const key = p.slug ?? p.id;
    if (!addedIds.has(key)) {
      addedIds.add(key);
      matched.push(p);
    }
  };

  // 1. Productos explícitamente relacionados (equipos compatibles, accesorios, analizadores complementarios)
  pool.forEach((item) => {
    const itemKey = item.slug ?? item.id;
    if (
      explicitRelated.includes(item.id) ||
      explicitRelated.includes(itemKey)
    ) {
      add(item);
    }
  });

  // 2. Productos de la MISMA MARCA de la misma categoría o línea técnica
  pool.forEach((item) => {
    const itemBrand = getBrand(item);
    if (
      currentBrand &&
      itemBrand === currentBrand &&
      item.category === currentProduct.category
    ) {
      add(item);
    }
  });

  // 3. Todos los productos de la MISMA MARCA
  pool.forEach((item) => {
    const itemBrand = getBrand(item);
    if (currentBrand && itemBrand === currentBrand) {
      add(item);
    }
  });

  // 4. Productos de la misma categoría (fallback)
  pool.forEach((item) => {
    if (item.category === currentProduct.category) {
      add(item);
    }
  });

  return matched;
}
