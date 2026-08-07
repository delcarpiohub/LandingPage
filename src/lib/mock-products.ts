export type ProductCategory =
  | "Marcas"
  | "Análisis elemental"
  | "Cromatografía"
  | "Espectrometría de masa"
  | "Preparación de muestras"
  | "Destiladores de ácidos"
  | "Automatización"
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

export interface ProductDetail {
  brand: string;
  model: string;
  fullTitle: string;
  subtitle: string;
  highlights: string[];
  advantages: string[];
  technicalParameters: TechnicalParameterRow[];
  detailBlocks: DetailBlock[];
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
    filters: ["Marcas", "Análisis elemental", "Automatización", "Área farmacéutica"],
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
      fullTitle: "Hanon K1160 Analizador Automático Kjeldahl de Nitrógeno y Proteína",
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
        "Cumple con FDA 21 CFR Part 11 y GMP, con gestión de usuarios, privilegios, auditoría y protección de edición de datos.",
        "Informes personalizables en PDF o impresos, conexión directa con balanza y ajuste de sensor de color RGB conforme a AOAC, ISO, EPA, USP, etc.",
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
            "Cumplimiento FDA 21 CFR Part 11 y GMP con cuentas, privilegios, caducidad de contraseñas y trazabilidad.",
            "Generación de reportes personalizables en PDF o impresos.",
            "Importación directa del peso de muestra desde balanza compatible.",
            "Sensor de color RGB ajustable para métodos AOAC, ISO, EPA, USP y normativas relacionadas.",
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
    filters: ["Marcas", "Análisis elemental", "Automatización", "Área farmacéutica"],
    description:
      "Determinación automática de nitrógeno y proteína con destilación y titulación integradas en un ciclo continuo. Alta precisión, seguridad operativa y limpieza automática.",
    features: [
      "Destilación y titulación automatizadas integradas",
      "Alta precisión de bureta hasta 2.0 μL/step",
      "Pre-instalación de funciones de autolimpieza y seguridad",
    ],
    imageUrl: "/productos/hanon-k9860/frontal-v3.png",
    detail: {
      brand: "Hanon",
      model: "K9860",
      fullTitle: "Hanon K9860 Analizador Automático Kjeldahl de Nitrógeno y Proteína",
      subtitle:
        "Sistema automático que integra destilación y titulación en un solo ciclo para laboratorios que requieren control de calidad preciso, repetible y eficiente de nitrógeno y proteínas.",
      highlights: [
        "Destilación y titulación automatizadas integradas",
        "Alta resolución de bureta hasta 2.0 μL/step",
        "Seguridad avanzada y autolimpieza inteligente",
      ],
      advantages: [
        "Analizador Kjeldahl automático que integra destilación, titulación colorimétrica y cálculos automáticos en un solo ciclo continuo.",
        "Alta precisión analítica gracias a su bomba de carga de alta exactitud con resolución de bureta de 2.0 μL por paso.",
        "Copa de titulación externa que permite el monitoreo visual en tiempo real de todo el proceso de valoración y destilación.",
        "Monitoreo de temperatura del condensado en tiempo real con parada automática ante anomalías para garantizar resultados seguros.",
        "Funciones automáticas integradas de limpieza de tubos de digestión, copa de titulación y líneas de reactivos químicos.",
        "Seguridad para el operador: evacuación automática de residuos calientes sin contacto manual con reactivos químicos.",
        "Almacenamiento local de hasta 1000 registros experimentales con puerto USB para exportación de datos.",
        "Cumple rigurosamente con los métodos Kjeldahl estándar de la AOAC, ISO, EPA y la Farmacopea Americana (USP).",
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
            "Alimentos: análisis de proteína y nitrógeno en materias primas y productos procesados.",
            "Piensos: control de calidad e inocuidad en insumos pecuarios y forrajes.",
            "Tabaco: análisis químico y control de calidad de hojas y subproductos agrícolas.",
            "Medio ambiente: determinación de nitrógeno total en suelos, lodos, aguas de riego y matrices ambientales.",
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
    tags: ["Kjeldahl", "nitrogeno", "proteina", "alimentos", "automatizacion", "hanon", "destilador", "quimica", "destilacion"],
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
            "Alimentos y Piensos: determinación de proteína y nitrógeno total.",
            "Agricultura y Suelos: fertilidad de terrenos y análisis de fertilizantes.",
            "Monitoreo Ambiental: control de amonio en aguas y lodos residuales.",
            "Química y Farmacia: validación de materias primas y control de procesos.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-sox606",
    slug: "hanon-sox606",
    name: "Extractor Soxhlet automático SOX606",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Automatización", "Área farmacéutica"],
    description:
      "Extractor de grasa automático Soxhlet de 6 posiciones. Rango de 0.1% a 100% con recuperación de solventes superior al 85% y calefacción de metal rápida y uniforme.",
    features: [
      "Capacidad para 6 muestras simultáneas por lote",
      "5 métodos de extracción Soxhlet integrados",
      "Recuperación de solventes de alta eficiencia ≥85%",
    ],
    imageUrl: "/productos/hanon-sox606/imagen-7.png",
    tags: ["Soxhlet", "grasa", "extraccion", "solvente", "lipidos", "alimentos", "automatizacion", "hanon", "quimica"],
    relatedProducts: ["hanon-sox406", "hanon-f800", "hanon-sh220f", "hanon-k1160"],
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
    tags: ["Kjeldahl", "nitrogeno", "proteina", "digestor", "hanon", "preparacion", "grafito", "quimica", "digestión"],
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
        "Excelente aislamiento térmico mediante conductos de aire exclusivos que mantienen el exterior del chasis a baja temperatura.",
        "Tecnología avanzada de control de temperatura PID que alcanza 400°C en solo 20 minutos con precisión de ±1°C.",
        "Capacidad de digestión en rampa con almacenamiento de 10 recetas programables de hasta 5 etapas de temperatura y tiempo.",
        "Campana de recolección de gases WD03 compatible para captar de forma hermética vapores ácidos nocivos.",
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
            "Canales de ventilación exclusivos para mantener frío el gabinete externo.",
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
            "Cámara sellada que evita la corrosión ácida en los circuitos internos.",
            "Diseñado para acoplar colectores de gases ácidos herméticos de silicona y vidrio.",
            "Indicadores de calor residual en superficie.",
          ],
        },
        {
          title: "Aplicaciones Principales",
          tone: "green",
          items: [
            "Preparación de muestras para análisis Kjeldahl (nitrógeno y proteínas).",
            "Análisis de alimentos y forrajes agrícolas en laboratorios de control.",
            "Mineralización de suelos, lodos y abonos orgánicos o inorgánicos.",
            "Digestión ácida general de muestras ambientales y farmacéuticas.",
          ],
        },
      ],
    },
  },
  {
    id: "hanon-sh420f",
    slug: "hanon-sh420f",
    name: "Digestor Kjeldahl bloque de grafito SH420F",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Automatización", "Área farmacéutica"],
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
      fullTitle: "Hanon SH420F Digestor Kjeldahl de Bloque de Grafito de 20 Posiciones",
      subtitle:
        "Sistema de digestión Kjeldahl automatizado de alta capacidad para pretratamiento y mineralización de muestras en alimentos, agricultura, farmacéutica y análisis ambiental.",
      highlights: [
        "Calentamiento rápido infrarrojo",
        "Control PID digital de precisión",
        "20 posiciones simultáneas",
      ],
      advantages: [
        "Calentamiento infrarrojo de respuesta rápida: alcanza 400°C en tan solo 25 minutos.",
        "Programación avanzada: almacene hasta 20 programas de digestión con curvas, rampas y gradientes de temperatura multietapa de hasta 5 segmentos.",
        "Máxima uniformidad térmica: bloque de grafito de alta pureza con tratamiento especial antioxidación para asegurar calor uniforme en todos los tubos.",
        "Pantalla táctil LCD de 5.7 pulgadas con control intuitivo del proceso y monitoreo en tiempo real.",
        "Diseño anticorrosivo integral: chasis e interfaces selladas para resistir los vapores ácidos y uso rudo en el laboratorio.",
        "Módulo de neutralización modular S402 con triple sistema de filtración (carbón activo, neutralización alcalina y condensación).",
        "Campana de recolección de gases WD03 con sellado hermético PFA y sistema clip-on para intercambio seguro.",
        "Seguridad de nivel industrial: protección contra sobrecorriente, alertas de alta temperatura residual y protección ante sobrecargas."
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
            "Menor tiempo de precalentamiento (400°C en 25 minutos)."
          ],
        },
        {
          title: "Programación Inteligente PID",
          tone: "yellow",
          items: [
            "Controlador PID integrado para máxima estabilidad y protección contra sobretemperaturas.",
            "Modos de control por curva o lineales para adaptarse a diferentes tipos de matrices.",
            "Programas multietapa editables directamente desde el panel LCD frontal.",
            "Automatización completa del perfil térmico de la muestra."
          ],
        },
        {
          title: "Módulo Exhausting S402 y Recolección WD03",
          tone: "red",
          items: [
            "Campana WD03 con sellado anticorrosión PFA hermético.",
            "Bomba de vacío silenciosa integrada de alta succión.",
            "Triple neutralización de vapores ácidos con condensación alcalina y carbón activo.",
            "Tuberías y sellos de PTFE para una larga vida útil sin desgaste por ácido."
          ],
        },
        {
          title: "Aplicaciones del SH420F",
          tone: "green",
          items: [
            "Digestión ácida de proteínas y nitrógeno total en alimentos y forrajes.",
            "Mineralización de muestras orgánicas e inorgánicas en suelos y fertilizantes.",
            "Preparación de muestras para espectroscopía atómica y ensayos farmacéuticos.",
            "Tratamiento previo desatendido de matrices complejas en laboratorios analíticos."
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
    filters: ["Marcas", "Análisis elemental", "Automatización", "Área farmacéutica"],
    description:
      "Analizador Kjeldahl automático de nitrógeno y proteína que integra destilación, titulación colorimétrica, cálculo e impresión. Equipado con pantalla táctil de 5.6” y doble destilación programable.",
    features: [
      "Automatización de destilación y titulación",
      "Pantalla táctil LCD a color de 5.6”",
      "Titulación en tiempo real mientras destila",
    ],
    imageUrl: "/productos/hanon-k1100f/imagen-1.png",
    detail: {
      brand: "Hanon",
      model: "K1100F",
      fullTitle: "Hanon K1100F Analizador Automático Kjeldahl de Nitrógeno y Proteína",
      subtitle:
        "Sistema automático que destila, titula, calcula y limpia de forma continua. Ideal para laboratorios con demandas medias-altas de análisis proteico e integridad de datos.",
      highlights: [
        "Destilación y titulación automáticas",
        "Titulación simultánea en tiempo real",
        "Doble destilación para muestras difíciles",
      ],
      advantages: [
        "Automatización completa: realiza las etapas de destilación, titulación, cálculo de resultados, impresión, descarga rápida de residuos y auto-limpieza en un único ciclo.",
        "Pantalla táctil a color de 5.6 pulgadas: interfaz visual moderna con monitoreo en tiempo real del proceso y alarmas de seguridad.",
        "Ahorro de tiempo significativo: efectúa la titulación en paralelo con la destilación para completar el análisis entre 3 y 8 minutos por muestra.",
        "Precisión analítica excepcional: bomba de dosificación y sistema de titulación de alta exactitud con resolución de bureta de 1.0 μL por paso y RSD ≤ 0.5%.",
        "Control avanzado de vapor: flujo ajustable para adaptarse a distintas metodologías y tipos de muestras analíticas.",
        "Diseño robusto de seguridad: sensores de puerta, posicionamiento de tubos, flujo de agua de refrigeración y control térmico del destilador en tiempo real.",
        "Gestión segura de datos: capacidad para almacenar hasta 1800 registros analíticos con exportación directa para trazabilidad.",
        "Drenaje rápido y seguro: evacúa automáticamente los residuos ácidos calientes de los tubos al terminar, protegiendo al operador."
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
      ],
      detailBlocks: [
        {
          title: "Destilación y Titulación Integradas",
          tone: "blue",
          items: [
            "Titulación colorimétrica en tiempo real mientras se realiza la destilación de la muestra.",
            "Bomba dosificadora y sistema de titulación de alta exactitud para máxima reproducibilidad.",
            "Doble destilación programable que optimiza la reacción de neutralización ácido-base.",
            "Consumo eficiente de agua de refrigeración controlado por sensores."
          ],
        },
        {
          title: "Operación y Control Inteligente",
          tone: "yellow",
          items: [
            "Pantalla LCD táctil intuitiva de 5.6” para configurar parámetros y tiempos.",
            "Detección y alerta automática por falta de reactivos en los contenedores de llenado.",
            "Monitoreo en tiempo real de la temperatura del condensado y de la presión de vapor.",
            "Drenaje automático rápido de los tubos para evitar manipulación directa de reactivos calientes."
          ],
        },
        {
          title: "Seguridad y Diagnóstico Activo",
          tone: "red",
          items: [
            "Sensores magnéticos de seguridad en la puerta de protección y colocación de tubos.",
            "Autodiagnóstico digital que detecta anomalías térmicas y fallas en la dosificación.",
            "Parada de emergencia y válvulas de sobrepresión integradas.",
            "Protección eléctrica contra sobrecargas y cortocircuitos."
          ],
        },
        {
          title: "Aplicaciones del K1100F",
          tone: "green",
          items: [
            "Determinación cuantitativa de nitrógeno y proteínas en alimentos procesados y materias primas.",
            "Control de calidad de piensos y suplementos de nutrición animal.",
            "Análisis de compuestos nitrogenados en hojas y mezclas en la industria del tabaco.",
            "Digestión y destilación en matrices de suelos y aguas para laboratorios ambientales."
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
      "Digestión Kjeldahl completamente automática y desatendida. Equipado con soporte de elevación automático, neutralización de gases simultánea y sistema operativo Android con almacenamiento integrado.",
    features: [
      "Operación completamente automática con sistema Android",
      "Soporte de elevación automática para enfriamiento rápido",
      "Control integrado del digestor, elevación y depurador S403",
    ],
    imageUrl: "/productos/hanon-sh520/imagen-1.png",
    detail: {
      brand: "Hanon",
      model: "SH520 / SH508",
      fullTitle: "Hanon SH520 / SH508 Digestor Automático Kjeldahl de Alta Productividad",
      subtitle:
        "Sistema de digestión automatizado de alta gama y gran eficiencia, ideal para laboratorios con flujos de trabajo exigentes en alimentos, agricultura, industria química y medio ambiente.",
      highlights: [
        "Automatización integral del proceso de digestión",
        "Control PID difuso y velocidad de calentamiento programable",
        "Cumplimiento normativo estricto 21 CFR Part 11",
      ],
      advantages: [
        "Operación completamente automática a través del sistema operativo Android, controlando de manera simultánea el dispositivo de elevación y el neutralizador de gases.",
        "Equipado con un sistema de elevación automático que sube y baja el soporte de tubos reduciendo la mano de obra y acelerando el enfriamiento.",
        "Módulo de calentamiento de aluminio con orificios profundos que mejora la transferencia térmica homogénea y evita salpicaduras o golpes.",
        "Excelente conservación de calor mediante aislamiento térmico de cerámica y conductos de aire exclusivos, reduciendo el consumo de energía.",
        "Monitoreo de curvas térmicas en tiempo real con almacenamiento de 8 GB integrado para registrar información experimental de forma ilimitada.",
        "Preinstalación de más de 20 métodos oficiales y capacidad de almacenamiento de hasta 500 métodos personalizados.",
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
          rightValue: "Automático integrado (Yes)",
        },
        {
          leftParameter: "Interfaces",
          leftValue: "WiFi / USB",
          rightParameter: "Alimentación eléctrica",
          rightValue: "AC 220 VAC ±10%, 50/60 Hz",
        },
        {
          leftParameter: "Potencia nominal",
          leftValue: "2950 W (SH520) / 1400 W (SH508)",
          rightParameter: "Peso neto",
          rightValue: "21 kg (SH520) / 15 kg (SH508)",
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
            "Control en paralelo del colector WD03 y del depurador de gases S403 sin operaciones manuales."
          ],
        },
        {
          title: "Accesorios de Neutralización y Seguridad",
          tone: "blue",
          items: [
            "Colector de gases WD03 con cubierta de sellado de PFA de larga vida útil y diseño a presión.",
            "Dispositivo de vacío por chorro de agua en el WD03 que no requiere alimentación eléctrica adicional.",
            "Bandeja de goteo profesional integrada contra corrosión por líquidos ácidos residuales.",
            "Tuberías de PTFE de alta durabilidad química en el depurador S403 para prolongar la vida útil del sistema."
          ],
        },
        {
          title: "Trazabilidad y Resguardo de Datos",
          tone: "red",
          items: [
            "Cumplimiento con FDA 21 CFR Part 11 para la integridad y seguridad de registros digitales.",
            "Pistas de auditoría (audit trail) integradas para seguimiento completo de usuarios y métodos.",
            "Transmisión inalámbrica de datos vía WiFi o puerto físico USB para respaldos externos.",
            "Revisión histórica de curvas térmicas directamente desde la pantalla táctil."
          ],
        },
        {
          title: "Aplicaciones del SH520/SH508",
          tone: "green",
          items: [
            "Digestión ácida húmeda para la determinación de nitrógeno total en alimentos y piensos.",
            "Preparación de muestras agrícolas, suelo y fertilizantes bajo estándares internacionales.",
            "Tratamiento térmico de efluentes líquidos y residuos sólidos en laboratorios ambientales.",
            "Digestión de compuestos orgánicos e inorgánicos en la industria farmacéutica y química."
          ],
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
      "Sistema de agotamiento y neutralización de gases de escape de grado industrial. Cuenta con bomba de vacío anticorrosión, filtración ternaria avanzada y tuberías de PTFE de larga vida útil.",
    features: [
      "Sistema de filtración ternaria de gases nocivos",
      "Bomba de vacío anticorrosión silenciosa de alta succión",
      "Diseño modular compacto con área de absorción translúcida",
    ],
    imageUrl: "/productos/hanon-s402/imagen-1.png",
    detail: {
      brand: "Hanon",
      model: "S402",
      fullTitle: "Hanon S402 Sistema de Agotamiento y Neutralización de Gases Ácidos",
      subtitle:
        "Neutralización y absorción ecológica y eficiente para efluentes de digestión ácida. Protege al operador, el mobiliario y el medio ambiente.",
      highlights: [
        "Sistema de filtración ternaria de alta eficiencia",
        "Vacío regulable por presión negativa",
        "Diseño resistente a la corrosión con tuberías de PTFE",
      ],
      advantages: [
        "Diseño modular con apariencia compacta, ideal para optimizar el espacio de mesada en el laboratorio químico.",
        "Área del dispositivo de absorción con diseño translúcido que facilita enormemente la inspección visual y el cambio de filtros.",
        "Presión de succión ajustable ante vacío negativo, evitando la fuga o derrame accidental de gases ácidos nocivos.",
        "Bomba de vacío anticorrosión de alta durabilidad con funcionamiento silencioso (bajo nivel de ruido) y alta capacidad de succión.",
        "Sistema de filtración ternaria compuesto por condensación de agua, neutralización alcalina y adsorción por carbón activo.",
        "Perfecta performance de absorción y neutralización de vapores ácidos calientes de efluentes de digestión Kjeldahl.",
        "Tuberías y sellos de PTFE de alta inercia química que incrementan drásticamente la vida útil del equipo en operación continua.",
        "Protección ambiental y del operador garantizando emisiones inocuas y cumpliendo con estándares de seguridad industrial.",
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
          rightParameter: "Nivel de ruido",
          rightValue: "Bajo ruido operacional",
        },
        {
          leftParameter: "Tuberías del sistema",
          leftValue: "PTFE resistente a la corrosión",
          rightParameter: "Área de absorción",
          rightValue: "Diseño translúcido para fácil monitoreo",
        },
        {
          leftParameter: "Dimensiones del S402",
          leftValue: "515 × 421 × 211 mm",
          rightParameter: "Peso neto del S402",
          rightValue: "25 kg",
        },
        {
          leftParameter: "Alimentación eléctrica",
          leftValue: "220 VAC ±10%, 50/60 Hz",
          rightParameter: "Compatibilidad",
          rightValue: "Con digestores Kjeldahl (SH420F, SH220F, etc.)",
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
            "Neutralización completa que permite la descarga segura y ecológica de efluentes."
          ],
        },
        {
          title: "Diseño Inteligente y Compacto",
          tone: "blue",
          items: [
            "Estructura modular optimizada para operar en combinación directa con el digestor.",
            "Materiales translúcidos en las columnas de absorción para evaluar el consumo de reactivos.",
            "Fácil acceso para la sustitución de filtros y recarga de reactivos neutralizantes.",
            "Bomba integrada anticorrosión protegida físicamente contra derrames."
          ],
        },
        {
          title: "Seguridad y Control de Vacío",
          tone: "red",
          items: [
            "Manómetro de control de presión de vacío en el panel frontal.",
            "Perilla de regulación fina de vacío para evitar el derrame o ebullición forzada en los tubos.",
            "Aislamiento de ruidos y vibraciones para un ambiente de trabajo silencioso y confortable.",
            "PTFE y plásticos de grado industrial en todo el paso de fluidos ácidos."
          ],
        },
        {
          title: "Aplicaciones del S402",
          tone: "green",
          items: [
            "Neutralización y agotamiento de vapores de ácido sulfúrico en digestiones Kjeldahl.",
            "Agotamiento de vapores nocivos en tratamientos térmicos húmedos de muestras complejas.",
            "Uso en conjunto con sistemas de reacción por microondas para remoción de ácidos post-digestión.",
            "Aspiración segura en laboratorios de análisis bromatológico y ambiental."
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
    tags: ["Soxhlet", "grasa", "extraccion", "solvente", "lipidos", "alimentos", "semi-automatico", "hanon", "quimica"],
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
            "Sensores integrados contra sobrecalentamiento que cortan el suministro eléctrico de forma autónoma."
          ],
        },
        {
          title: "Diseño Ergonómico y Duradero",
          tone: "blue",
          items: [
            "Sistema de conducción de cojinetes lineales de precisión para una elevación de muestras sumamente suave.",
            "Copas de vidrio de borosilicato de alta resistencia química a solventes orgánicos y ácidos.",
            "Panel de control por microcomputador con pantalla LCD de 4.3 pulgadas clara y fácil de operar.",
            "Bloque calefactor metálico integral que garantiza una transferencia de calor homogénea a todas las copas."
          ],
        },
        {
          title: "Eficiencia Analítica en Extracción",
          tone: "green",
          items: [
            "Recuperación superior al 80% de reactivos orgánicos y solventes en cada destilación, reduciendo costos operacionales.",
            "Extracción Soxhlet multimatriz que acorta de un 20% a un 80% los tiempos en comparación con métodos manuales.",
            "Procesamiento simultáneo de hasta 6 muestras por lote bajo la misma rampa térmica.",
            "Determinación precisa y reproducible de grasas y lípidos totales en matrices sólidas o semisólidas."
          ],
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
      "Analizador de fibra automático de 6 posiciones basado en el método Weende y Van Soest. Cuenta con calentamiento por infrarrojos avanzado, pantalla táctil de 7 pulgadas y bomba de alta presión para evitar obstrucciones.",
    features: [
      "Sistema de calentamiento por infrarrojos uniforme y rápido",
      "Control preciso con pantalla táctil a color de 7 pulgadas",
      "Procesamiento simultáneo de 6 muestras por lote",
    ],
    imageUrl: "/productos/hanon-f800/frontal.png",
    tags: ["fibra", "Weende", "Van Soest", "detergente", "crisol", "infrarrojo", "automatizacion", "hanon", "quimica"],
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
          rightParameter: "Rango de temperatura",
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
            "Precalentamiento integrado de reactivos que optimiza el flujo de trabajo analítico.",
            "Extracción consistente que minimiza variaciones térmicas entre crisoles y aumenta la reproducibilidad."
          ],
        },
        {
          title: "Seguridad y Prevención de Corrosión",
          tone: "blue",
          items: [
            "Diseño exclusivo donde los fluidos altamente ácidos o alcalinos no tocan los mecanismos de la bomba.",
            "Protección activa contra desbordamientos que resguarda la integridad física del analista de laboratorio.",
            "Estructura oculta del barril de solución para manipulación limpia y dosificación sin salpicaduras.",
            "Válvulas y acoplamientos resistentes de grado industrial para soportar condiciones extremas."
          ],
        },
        {
          title: "Filtración Eficiente sin Apelmazamiento",
          tone: "red",
          items: [
            "Función especial de retroceso del crisol (crucible recoil) que evita que las muestras se obstruyan.",
            "Cinco tipos de crisoles incluidos de manera estándar para adecuar la filtración a la muestra.",
            "Bomba de alta presión de vaciado rápido que agiliza las etapas sucesivas de lavado analítico.",
            "Excelente compatibilidad con el método Weende (fibra bruta) y método Van Soest."
          ],
        },
        {
          title: "Extractor en Frío Periférico F800-B",
          tone: "green",
          items: [
            "Accesorio opcional de soporte que realiza el desengrasado previo a temperatura ambiente.",
            "Utiliza el mismo sistema de crisoles del F800, permitiendo pesajes intermedios directos sin trasvasar.",
            "Equipado con bomba de alta presión para prevenir taponamientos y asegurar la deshidratación rápida.",
            "Protección contra salpicaduras integrada para una manipulación segura de acetona y reactivos desengrasantes."
          ],
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
    description: "Analizador automático de nitrógeno y proteínas basado en el principio de combustión de Dumas, que ofrece resultados en 4 minutos sin reactivos tóxicos ni pretratamiento de muestras.",
    features: [
      "Tiempo de análisis rápido en 4 minutos",
      "Muestreador de 120 posiciones (D200)",
      "Proceso sin reactivos tóxicos"
    ],
    imageUrl: "/productos/hanon-d50-d200/frontal.png",
    tags: ["dumas", "nitrogeno", "proteinas", "combustion", "hanon", "analisis"],
    relatedProducts: ["hanon-k1160", "hanon-k9860"],
    detail: {
      brand: "Hanon",
      model: "D50/D200",
      fullTitle: "Hanon D50/D200 Analizador de Nitrógeno y Proteínas Dumas",
      subtitle: "Determina el contenido de nitrógeno/proteínas mediante combustión, purificación, reducción y detección por conductividad térmica.",
      highlights: [
        "Combustión y oxidación en dos etapas para una digestión completa",
        "Deshidratación en tres etapas con condensador metálico eficiente",
        "Detección TCD de alta sensibilidad"
      ],
      advantages: [
        "Un condensador metálico eficiente y desecantes de dos etapas pueden eliminar completamente el agua.",
        "Los componentes neumáticos SMC® pueden inyectar muestras hasta 100,000 veces con bajos costos de mantenimiento.",
        "Detección in situ sin contacto para evitar funcionamientos incorrectos si el disco de muestreo está ocupado (D200).",
        "Los usuarios pueden agregar muestras libremente durante la preparación sin detener el análisis automático.",
        "Comunicación inalámbrica de datos de balanza con alcance máximo de 100m."
      ],
      technicalParameters: [
        {
          leftParameter: "Tiempo de análisis",
          leftValue: "3-4 min/muestra",
          rightParameter: "Precisión de pesaje",
          rightValue: "≤0.1mg"
        },
        {
          leftParameter: "Rango de detección",
          leftValue: "0.1-500mg N",
          rightParameter: "Tasa de recuperación",
          rightValue: "≥99.5%"
        },
        {
          leftParameter: "RSD (Desviación estándar relativa)",
          leftValue: "≤0.5%",
          rightParameter: "Límite de detección (LOD)",
          rightValue: "0.01mg de nitrógeno"
        },
        {
          leftParameter: "Capacidad de muestra",
          leftValue: "Sólido ≤1g, Líquido ≤1mL",
          rightParameter: "Muestreador (D200 / D50)",
          rightValue: "120/40 posiciones (D200) / 60 posiciones (D50)"
        },
        {
          leftParameter: "Detector",
          leftValue: "TCD",
          rightParameter: "Precisión TCD",
          rightValue: "≤0.01℃"
        },
        {
          leftParameter: "Gas portador",
          leftValue: "CO2 (Pureza 99.999%)",
          rightParameter: "Oxígeno",
          rightValue: "Pureza 99.999%"
        },
        {
          leftParameter: "Temperatura del horno",
          leftValue: "Máx. 1200℃",
          rightParameter: "Potencia nominal",
          rightValue: "2000W"
        }
      ],
      detailBlocks: [
        {
          title: "Combustión y Oxidación Eficientes",
          tone: "yellow",
          items: [
            "Combustión con oxígeno puro en tubo primario para oxidación y digestión preliminar.",
            "Digestión completa en tubo secundario catalizado por Pt y óxido de cobre.",
            "Deshidratación en tres etapas con condensador electrónico y tubos de secado.",
            "Agente reductor de alta eficiencia para convertir óxidos de nitrógeno a gas nitrógeno."
          ]
        },
        {
          title: "Sistema Neumático de Precisión",
          tone: "blue",
          items: [
            "Regulador de dos etapas para eliminar impactos de fluctuaciones de presión.",
            "Acoplamientos de PTFE y acopladores rápidos SMC® para mantenimiento sin herramientas.",
            "Componentes neumáticos SMC® con vida útil de hasta 100,000 inyecciones.",
            "Inspección automática de fugas en la ruta del gas."
          ]
        },
        {
          title: "Muestreador Automático y Detección",
          tone: "red",
          items: [
            "Muestreador automático de hasta 120 posiciones (D200) para gran volumen de muestras.",
            "Adición libre de muestras durante la preparación sin detener el análisis automático.",
            "Detección in situ sin contacto mediante módulos infrarrojos (D200).",
            "Detector de conductividad térmica (TCD) de alta sensibilidad y precisión."
          ]
        },
        {
          title: "Funciones de Software Avanzadas",
          tone: "green",
          items: [
            "Comunicación inalámbrica de datos de balanza con alcance de hasta 100m.",
            "Recordatorios periódicos de mantenimiento basados en características de la muestra.",
            "Autodiagnóstico con 23 métodos de diagnóstico de fallas.",
            "Rastreo de auditoría para trazabilidad según FDA 21 CFR Parte 11 (D200)."
          ]
        }
      ]
    }
  },
  {
    id: "hanon-e500",
    slug: "hanon-e500",
    name: "Analizador elemental orgánico E500",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Automatización", "Área farmacéutica", "Minería"],
    description: "Analizador elemental orgánico automático para la determinación cuantitativa de carbono, hidrógeno, nitrógeno, azufre y oxígeno en muestras sólidas y líquidas.",
    features: [
      "Análisis cuantitativo de C, H, N, S y O",
      "Muestreador automático de 120 posiciones",
      "Detectores TCD y NDIR dedicados"
    ],
    imageUrl: "/productos/hanon-e500/imagen-1.png",
    tags: [
      "hanon", "e500", "analizador elemental", "chons", "carbono", "hidrogeno",
      "nitrogeno", "azufre", "oxigeno", "tcd", "ndir", "combustion", "pirolisis"
    ],
    relatedProducts: ["hanon-d50-d200", "hanon-k1160", "hanon-k9860"],
    detail: {
      brand: "Hanon",
      model: "E500",
      fullTitle: "Hanon E500 Analizador Elemental Orgánico C/H/N/S/O",
      subtitle: "Sistema de alta precisión para análisis rápido de carbono, hidrógeno, nitrógeno, azufre y oxígeno mediante combustión o pirólisis a alta temperatura.",
      highlights: [
        "Combustión y pirólisis de alta temperatura hasta 1400 °C",
        "Separación específica por adsorción-desorción",
        "Muestreo automático continuo de 120 posiciones"
      ],
      advantages: [
        "Analiza C, H, N, S y O en muestras sólidas y líquidas dentro de una única plataforma.",
        "La sustitución de cenizas in situ elimina la limpieza manual frecuente del tubo y permite lotes continuos.",
        "El horno de fibra de aluminosilicato ofrece una zona térmica estable superior a 200 mm con desviación menor a 10 °C.",
        "Tres columnas de adsorción física separan H₂O, SO₂ y CO₂ sin el efecto de cola propio de la separación cromatográfica.",
        "El detector TCD de alto flujo incorpora control digital, filamento resistente a la oxidación y controladores MFC.",
        "El modo de oxígeno utiliza detector NDIR selectivo para CO a 4,67 μm y 4,72 μm, con baja interferencia.",
        "El software admite calibraciones lineales o no lineales, registro de auditoría y transmisión inalámbrica del peso desde la balanza.",
        "Las funciones de espera, activación programada y enfriamiento retardado reducen el consumo de gas y energía."
      ],
      technicalParameters: [
        {
          leftParameter: "Elementos determinados",
          leftValue: "C, H, N, S y O",
          rightParameter: "Muestreador automático",
          rightValue: "Bandeja giratoria de 120 posiciones con crisoles cerámicos reutilizables"
        },
        {
          leftParameter: "Separación de gases",
          leftValue: "Adsorción-desorción específica",
          rightParameter: "Temperatura máxima",
          rightValue: "1400 °C"
        },
        {
          leftParameter: "Tiempo de análisis",
          leftValue: "Aprox. 3-4 min por elemento, según configuración",
          rightParameter: "Tamaño de muestra",
          rightValue: "Sólido ≤ 1,5 g · Líquido ≤ 1 mL"
        },
        {
          leftParameter: "Rango dinámico C/H/N",
          leftValue: "C 0-30 mg · H 0-4 mg · N 0-10 mg (0-100%)",
          rightParameter: "Rango dinámico S/O",
          rightValue: "S 0-5 mg · O 0-3 mg (0-100%)"
        },
        {
          leftParameter: "Repetibilidad",
          leftValue: "Desviación estándar < 0,1% con 10 mg de sulfadiazina",
          rightParameter: "Límites de detección",
          rightValue: "C/H/N/S < 30 ppm · O < 20 ppm"
        },
        {
          leftParameter: "Detectores",
          leftValue: "TCD para C/H/N/S · NDIR para O",
          rightParameter: "Gases de trabajo",
          rightValue: "Helio 99,999% · Oxígeno 99,999%"
        },
        {
          leftParameter: "Alimentación",
          leftValue: "220 VCA ±10%, 50 Hz",
          rightParameter: "Computador e interfaces",
          rightValue: "Windows 7 o posterior · USB o RS232"
        },
        {
          leftParameter: "Ambiente de operación",
          leftValue: "15-30 °C · Humedad ≤ 85% HR",
          rightParameter: "Dimensiones y peso",
          rightValue: "735 × 560 × 1160 mm · 100 kg, incluido muestreador"
        }
      ],
      detailBlocks: [
        {
          title: "Procedimiento C/H/N/S",
          tone: "yellow",
          items: [
            "La muestra en cápsula o papel de estaño se pesa y dispone en un crisol cerámico del muestreador automático.",
            "La sonda introduce la muestra bajo purga de gas portador para impedir el ingreso de aire ambiente.",
            "La combustión a 1150 °C y la reducción catalítica convierten los NOx en N₂.",
            "H₂O, SO₂ y CO₂ se separan en tres columnas; N₂ y luego cada gas desorbido ingresan secuencialmente al TCD."
          ]
        },
        {
          title: "Procedimiento de oxígeno",
          tone: "blue",
          items: [
            "La muestra se envuelve en cápsula de plata y se introduce en el tubo de pirólisis.",
            "A 1150 °C y en atmósfera inerte, el oxígeno reacciona con negro de humo de alta pureza para formar CO.",
            "El detector NDIR mide la absorción característica del CO y calcula el contenido original de oxígeno.",
            "La selectividad a 4,67 μm y 4,72 μm aporta bajo límite de detección y resistencia a interferencias."
          ]
        },
        {
          title: "Instrumentación y separación",
          tone: "red",
          items: [
            "Sustitución de cenizas in situ con crisoles reutilizables para operación continua.",
            "Horno de fibra de aluminosilicato con control acoplado de temperatura y flujo de gas.",
            "Adsorción física selectiva con desorción por calentamiento programado y larga vida útil de columna.",
            "TCD de alto flujo con calibración digital, balance de filamento y aislamiento de señal."
          ]
        },
        {
          title: "Estación de trabajo",
          tone: "green",
          items: [
            "Interfaz plana con estado del instrumento y parámetros de trabajo en tiempo real.",
            "Curvas de calibración lineales o no lineales con grado configurable.",
            "Tres niveles de permisos, usuarios ilimitados y trazabilidad de operaciones conforme a FDA 21 CFR Parte 11.",
            "Transmisión inalámbrica del peso, espera programable y enfriamiento automático seguro."
          ]
        }
      ]
    }
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
      "21 cfr parte 11",
      "icp-ms",
      "icp-oes",
      "absorción atómica",
    ],
    relatedProducts: ["hanon-e500", "hanon-d50-d200", "hanon-k1160"],
    detail: {
      brand: "Milestone",
      model: "ETHOS UP",
      fullTitle: "Milestone ETHOS UP Sistema Avanzado de Digestión por Microondas",
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
          leftValue: "Digestión por microondas en recipientes cerrados y plataforma multipropósito",
          rightParameter: "Control térmico",
          rightValue: "easyTEMP directo sin contacto + monitoreo infrarrojo de todos los recipientes",
        },
        {
          leftParameter: "Construcción y seguridad",
          leftValue: "Cavidad de acero inoxidable, puerta sensible a la presión y escape de vapores ácidos",
          rightParameter: "Supervisión de cavidad",
          rightValue: "SafeVIEW en configuraciones Up y Plus",
        },
        {
          leftParameter: "MAXI-24 HP",
          leftValue: "24 posiciones · rotor de alto rendimiento y mayor capacidad",
          rightParameter: "SK-15",
          rightValue: "15 recipientes de PTFE-TFM de 100 mL · alta presión y temperatura",
        },
        {
          leftParameter: "MAXI-44",
          leftValue: "44 recipientes de PTFE-TFM de 100 mL · grandes lotes de muestras",
          rightParameter: "Tecnología de recipientes",
          rightValue: "PTFE de alta pureza, escudos PEEK y ventilación con resellado",
        },
        {
          leftParameter: "Software",
          leftValue: "easyCONTROL 3 con biblioteca de métodos, control en tiempo real y trazabilidad",
          rightParameter: "Configuraciones",
          rightValue: "Terminal Easy 5\" · Up 6,5\" · Plus 10,1\"",
        },
        {
          leftParameter: "Integridad de datos",
          leftValue: "Compatibilidad FDA 21 CFR Parte 11 en las tres terminales",
          rightParameter: "Conectividad",
          rightValue: "USB y Milestone Connect; conexión a balanza en Up y Plus",
        },
        {
          leftParameter: "Cualificación disponible",
          leftValue: "Paquete Milestone con DQ, IQ y OQ",
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
      fullTitle: "Columnas capilares de sílice fundida Restek para cromatografía de gases",
      subtitle:
        "Familias Rtx, Rxi y fases de aplicación especializada con flujo de cotización asesorada",
      highlights: [],
      advantages: [],
      technicalParameters: [],
      detailBlocks: [],
    },
    tags: ["Restek", "GC", "columnas capilares", "cromatografía de gases", "sílice fundida"],
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
    tags: ["Restek", "LC", "HPLC", "UHPLC", "columnas analíticas", "cromatografía líquida"],
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
    tags: ["Restek", "viales con filtro", "filtración", "HPLC", "UHPLC", "preparación de muestras"],
  },
  {
    id: "infitek-cod-analyzer",
    slug: "infitek-cod-analyzer",
    name: "Analizador de DQO",
    category: "Análisis de agua",
    filters: ["Marcas", "Análisis de agua"],
    description: "Análisis de DQO de acuerdo a las normas EPA 410.4 e ISO 15705:2002. Sistema integral para evaluar el grado de contaminación del agua mediante demanda química de oxígeno.",
    features: [
      "Análisis de DQO de acuerdo a las normas EPA 410.4 e ISO 15705:2002",
      "Pantalla LCD para fácil visualización",
      "2 fuentes de luz LED para diferentes rangos de pruebas de DQO",
      "Calibración de 2 puntos",
      "Capacidad de datos de hasta 200 conjuntos compatibles con GLP",
      "Los datos almacenados se pueden transferir a la computadora mediante USB"
    ],
    imageUrl: "/productos/infitek/cod-analyzer/imagen-1.png",
    detail: {
      brand: "Infitek",
      model: "Analizador de DQO",
      fullTitle: "Analizador de Demanda Química de Oxígeno (DQO) Infitek",
      subtitle: "Sistema de sobremesa para evaluación integral del grado de contaminación del agua",
      highlights: [
        "Cumple con normas internacionales EPA 410.4 e ISO 15705:2002.",
        "Pantalla LCD con navegación gráfica GUI intuitiva.",
        "Alta capacidad de almacenamiento y soporte de comunicación USB."
      ],
      advantages: [
        "Ideal para laboratorios de análisis de calidad de agua e investigación.",
        "Facilidad de uso con curvas pre-calibradas."
      ],
      technicalParameters: [
        {
          leftParameter: "Rango de medición", leftValue: "(0~150)mg/L, (0~1500)mg/L",
          rightParameter: "Exactitud", rightValue: "±8%"
        },
        {
          leftParameter: "Repetibilidad", leftValue: "3%",
          rightParameter: "Almacenamiento", rightValue: "200 resultados (GLP)"
        },
        {
          leftParameter: "Comunicación", leftValue: "USB",
          rightParameter: "Pantalla", rightValue: "LCD"
        }
      ],
      detailBlocks: [
        {
          title: "Especificaciones principales",
          tone: "blue",
          items: [
            "El equipo analiza la DQO (demanda química de oxígeno), un índice que refleja el grado de contaminación del agua.",
            "Análisis de DQO conforme a EPA 410.4 e ISO 15705:2002.",
            "2 fuentes de luz LED para diferentes rangos de pruebas.",
            "Calibración de 2 puntos."
          ]
        },
        {
          title: "Cumplimiento normativo",
          tone: "green",
          items: [
            "Cumple con la norma EPA 410.4.",
            "Cumple con la norma internacional ISO 15705:2002.",
            "Gestión de datos con trazabilidad GLP (Buenas Prácticas de Laboratorio)."
          ]
        },
        {
          title: "Soporte y Aplicaciones",
          tone: "yellow",
          items: [
            "Adecuado para salud pública, protección del medio ambiente, análisis biológico y control de calidad del agua.",
            "Nuestro equipo técnico especializado ofrece instalación y capacitación operativa.",
            "Mantención preventiva y correctiva para asegurar la disponibilidad del equipo Infitek."
          ]
        }
      ]
    },
    tags: ["Infitek", "DQO", "COD", "Análisis de agua", "Calidad de agua", "EPA"]
  },
  {
    id: "infitek-bep-m300f",
    slug: "infitek-bep-m300f",
    name: "Analizador Multiparamétrico de Sobremesa BEP-M300F",
    category: "Análisis de agua",
    filters: ["Marcas", "Análisis de agua"],
    description: "Analizador multiparamétrico de sobremesa para pH, Conductividad, ISE y Oxígeno Disuelto, con pantalla LCD de alta resolución e IP54.",
    features: [
      "Pantalla LCD de alta resolución, 5,7 pulgadas.",
      "Almacenamiento de datos de 500 conjuntos compatibles con GLP.",
      "Soporte para comunicación USB y RS-232.",
      "Clasificación IP54 resistente al agua.",
      "Múltiples parámetros: pH, CE, ISE, OD, Temp."
    ],
    imageUrl: "/productos/infitek/bep-m300f/imagen-1.png",
    detail: {
      brand: "Infitek",
      model: "BEP-M300F",
      fullTitle: "Analizador Multiparamétrico de Sobremesa Infitek BEP-M300F",
      subtitle: "Medición integral y precisa de calidad del agua para laboratorios de investigación y control ambiental.",
      highlights: [
        "Soporte para múltiples modos de lectura (automática, cronometrada, continua).",
        "Calibración avanzada de 1 a 5 puntos (pH, ISE).",
        "Reconocimiento estándar de tampones NIST, DIN, GB."
      ],
      advantages: [
        "Equipo integral todo en uno para mediciones electroquímicas.",
        "Robusto (IP54) ideal para trabajo de mesón intensivo."
      ],
      technicalParameters: [
        {
          leftParameter: "Rango pH", leftValue: "-2,00 a 20,00 pH",
          rightParameter: "Rango Conductividad", rightValue: "0,000 μS/cm a 1000 mS/cm"
        },
        {
          leftParameter: "Rango Oxígeno Disuelto", leftValue: "0,00 a 20,00 ppm",
          rightParameter: "Almacenamiento de datos", rightValue: "500 resultados"
        },
        {
          leftParameter: "Conectividad", leftValue: "USB / RS-232",
          rightParameter: "Clasificación IP", rightValue: "IP54"
        }
      ],
      detailBlocks: [
        {
          title: "Parámetros y Calibración",
          tone: "blue",
          items: [
            "pH: Rango -2.00 a 20.00 pH. Calibración de 1 a 5 puntos con reconocimiento NIST, DIN y GB.",
            "Ion (ISE): Modos de lectura directa y adición estándar. Soporta F-, Cl-, NO3-, NH4+, Ca2+, etc.",
            "Conductividad: Compensación lineal y agua pura con calibración de 1 a 3 puntos.",
            "Oxígeno Disuelto (DO): Calibración con agua saturada de aire o cero oxígeno con compensación barométrica."
          ]
        },
        {
          title: "Hardware y Almacenamiento",
          tone: "yellow",
          items: [
            "Pantalla LCD de alta resolución de 5,7 pulgadas.",
            "Función de lectura múltiple y retención automática que bloquea el punto final.",
            "Almacenamiento de 500 conjuntos de datos compatibles con reportes GLP.",
            "Clasificación IP54 a prueba de agua y polvo, ideal para mesón."
          ]
        },
        {
          title: "Soporte e Instalación",
          tone: "green",
          items: [
            "Reconocimiento internacional y adopción de método multipropósito.",
            "Aplicaciones en biológica, control ambiental y educación superior.",
            "Soporte de Del Carpio en la puesta en marcha, capacitación y mantenimiento."
          ]
        }
      ]
    },
    tags: ["Infitek", "Multiparamétrico", "pH", "Conductividad", "ISE", "Oxígeno Disuelto", "Análisis de agua"]
  },
  {
    id: "infitek-mca-series",
    slug: "infitek-mca-series",
    name: "Analizador de Humedad Halógeno Serie MCA",
    description: "Analizador de humedad con lámpara halógena y sensor HBM. Permite ajustes precisos de temperatura y tiempo, determinando eficientemente el contenido de humedad y residuo seco de las muestras.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/mca-series/imagen-1.png",
    features: [
      "Calentamiento uniforme halógeno",
      "Sensor de pesaje HBM integrado",
      "Resultados en tiempo real"
    ],
    detail: {
      brand: "Infitek",
      model: "Serie MCA110",
      fullTitle: "Analizador de Humedad Halógeno Serie MCA110",
      subtitle: "Secado rápido y exactitud de pesaje superior con lámpara halógena y sensor HBM.",
      highlights: [
        "Lámpara halógena para calentamiento uniforme y rápido.",
        "Múltiples opciones de legibilidad: 0.001 g hasta 0.01 g según el modelo.",
        "Pantalla LCD retroiluminada de alta definición.",
        "Capacidad de almacenamiento histórico de 15 resultados."
      ],
      advantages: [
        "Ajuste preciso de temperatura (40°C a 199°C) y tiempo de desecación.",
        "Carcasa de aluminio robusta y cámara de secado en acero inoxidable.",
        "Lectura directa del porcentaje de contenido de humedad o residuo seco."
      ],
      technicalParameters: [
        { leftParameter: "Capacidad", leftValue: "110 g", rightParameter: "Legibilidad", rightValue: "0,01 g a 0,001 g (según modelo)" },
        { leftParameter: "Fuente de calor", leftValue: "Lámpara halógena", rightParameter: "Rango de temperatura", rightValue: "40°C - 199°C" },
        { leftParameter: "Rango de humedad", leftValue: "0.00% - 100.00%", rightParameter: "Legibilidad de humedad", rightValue: "0,20% a 0,01% (según modelo)" },
        { leftParameter: "Pantalla", leftValue: "LCD retroiluminada", rightParameter: "Calibración", rightValue: "Externa" },
        { leftParameter: "Interfaz", leftValue: "RS232 (Estándar) / USB (Opcional)", rightParameter: "Tamaño del plato", rightValue: "Ø90mm" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Humedad", "Halógeno", "Equipamiento", "Secado"]
  },
  {
    id: "infitek-ph-b100bd",
    slug: "infitek-ph-b100bd",
    name: "Medidor de pH de Mesa PH-B100BD",
    description: "Medidor de pH de mesa con reconocimiento automático de soluciones tampón estándar y pantalla LCD de 6.0 pulgadas. Incluye electrodo compuesto E-201.",
    category: "Análisis de agua",
    imageUrl: "/productos/infitek/ph-b100bd/imagen-1.png",
    features: [
      "Reconocimiento NIST",
      "Diseño IP54 robusto",
      "Pantalla LCD 6.0 pulgadas"
    ],
    detail: {
      brand: "Infitek",
      model: "PH-B100BD",
      fullTitle: "Medidor de pH de Mesa PH-B100BD (Paquetes 1 y 2)",
      subtitle: "Medición rápida y confiable de pH y milivoltios (mV) con calibración automática.",
      highlights: [
        "Pantalla LCD clara de 6.0 pulgadas.",
        "Calibración de 1 a 2 puntos (automática o manual).",
        "Reconocimiento automático de tampones NIST (pH 4.01, 7.00, 10.01).",
        "Compensación de temperatura manual (MTC) para resultados precisos."
      ],
      advantages: [
        "Función de reinicio rápido a la configuración predeterminada de fábrica.",
        "Modo de lectura continuo con opciones de apagado automático programable.",
        "Diseño robusto IP54, incluye soporte y electrodo E-201."
      ],
      technicalParameters: [
        { leftParameter: "Rango pH", leftValue: "0,00 ~ 14,00 pH", rightParameter: "Resolución pH", rightValue: "0,01 pH" },
        { leftParameter: "Precisión pH", leftValue: "±0,05 pH", rightParameter: "Puntos de calibración", rightValue: "Hasta 2" },
        { leftParameter: "Rango mV", leftValue: "-1400 a 1400 mV", rightParameter: "Precisión mV", rightValue: "±0,1 % FS" },
        { leftParameter: "Pantalla", leftValue: "LCD (6.0 pulgadas)", rightParameter: "Entrada electrodo", rightValue: "BNC (Q9)" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "pH", "Medidor de mesa", "Análisis de agua", "Electrodo"]
  },
  {
    id: "infitek-usc-m-series",
    slug: "infitek-usc-m-series",
    name: "Limpiador Ultrasónico Serie USC-M",
    description: "Baño ultrasónico de bajo ruido con potencia ajustable, función de desgasificación y barrido de frecuencia. Tanque de acero inoxidable.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/usc-m-series/imagen-1.png",
    features: [
      "Potencia ajustable 10-100%",
      "Calefacción hasta 60°C",
      "Bajo ruido"
    ],
    detail: {
      brand: "Infitek",
      model: "Serie USC-M",
      fullTitle: "Limpiador Ultrasónico de Precisión Serie USC-M",
      subtitle: "Limpieza profunda con desgasificación y barrido de frecuencia en tanques de hasta 45 litros.",
      highlights: [
        "Potencia ultrasónica ajustable entre 10% y 100%.",
        "Función de desgasificación (degas) y barrido de frecuencia (sweep).",
        "Control de temperatura de hasta 60°C (opcional 80°C).",
        "Modo de ahorro de energía (sleeping mode)."
      ],
      advantages: [
        "Aislamiento acústico integrado para una operación ultra silenciosa.",
        "Pantalla LCD para control de tiempo, temperatura y potencia.",
        "Fabricado en acero inoxidable de máxima calidad con válvula de drenaje."
      ],
      technicalParameters: [
        { leftParameter: "Frecuencia Ultrasónica", leftValue: "40 KHz", rightParameter: "Tiempo ajustable", rightValue: "1-99 minutos" },
        { leftParameter: "Potencia Ultrasónica", leftValue: "70W a 720W (según modelo)", rightParameter: "Potencia Calefacción", rightValue: "100W a 1000W" },
        { leftParameter: "Temperatura máxima", leftValue: "60°C (Opcional 80°C)", rightParameter: "Válvula de drenaje", rightValue: "Modelos ≥ 10L" },
        { leftParameter: "Capacidades disponibles", leftValue: "1.3L hasta 45L", rightParameter: "Material del tanque", rightValue: "Acero inoxidable" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Ultrasónico", "Limpiador", "Equipamiento menor", "Baño"]
  },
  {
    id: "infitek-don-h-series",
    slug: "infitek-don-h-series",
    name: "Horno de Secado de Convección Natural Serie DON-H",
    description: "Horno de secado de convección natural horizontal con controlador PID, sensor PT100 y protección contra sobretemperatura.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/don-h-series/imagen-1.png",
    features: [
      "Convección natural horizontal",
      "Controlador PID de precisión",
      "Rango RT+10 a 250°C"
    ],
    detail: {
      brand: "Infitek",
      model: "Serie DON-H",
      fullTitle: "Horno de Secado de Convección Natural Serie DON-H/DON-HE",
      subtitle: "Secado homogéneo y seguro con controlador PID, alta utilización de espacio e interior de acero.",
      highlights: [
        "Rango de temperatura desde ambiente +10°C hasta 250°C.",
        "Controlador PID preciso y sensor de temperatura PT100.",
        "Diseño de convección natural tipo horizontal.",
        "Alarmas audibles y visuales de sobretemperatura."
      ],
      advantages: [
        "Manilla antiquemaduras para máxima seguridad operacional.",
        "Alta uniformidad de temperatura (±3.5%).",
        "Modelos estándar en acero inoxidable y modelos E en chapa galvanizada."
      ],
      technicalParameters: [
        { leftParameter: "Rango de Temperatura", leftValue: "RT+10 ~ 250°C", rightParameter: "Modo de Circulación", rightValue: "Convección natural" },
        { leftParameter: "Fluctuación", leftValue: "±1°C", rightParameter: "Uniformidad", rightValue: "±3.5%" },
        { leftParameter: "Controlador y Sensor", leftValue: "PID con PT100", rightParameter: "Temporizador", rightValue: "0~9999 min" },
        { leftParameter: "Capacidades", leftValue: "43 L, 71 L, 136 L, 225 L", rightParameter: "Material Interno", rightValue: "Acero Inoxidable / Galvanizado" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Horno", "Secado", "Estufa", "Convección natural", "Equipamiento menor"]
  },
  {
    id: "infitek-lyo60b-series",
    slug: "infitek-lyo60b-series",
    name: "Liofilizador de Laboratorio Serie LYO60B",
    description: "Liofilizador que emplea temperaturas extremadamente frías (-60°C) y vacío para eliminar la humedad, ideal para vacunas, bacterias, medicamentos y alimentos.",
    category: "Preparación de muestras",
    imageUrl: "/productos/infitek/lyo60b-series/imagen-1.png",
    features: [
      "Pantalla táctil a color 7\"",
      "Condensador sin bobinas -60°C",
      "Alta eficiencia de enfriamiento"
    ],
    detail: {
      brand: "Infitek",
      model: "Serie LYO60B",
      fullTitle: "Liofilizador de Laboratorio de -60°C Serie LYO60B",
      subtitle: "Sistema de liofilización en cascada con condensador de acero inoxidable, bomba de vacío y control inteligente.",
      highlights: [
        "Panel táctil a color de 7 pulgadas con visualización de temperatura y vacío en tiempo real.",
        "Condensador de gran volumen en acero inoxidable sin bobinas, permitiendo pre-congelación independiente de muestras.",
        "Compresor de alto rendimiento y sistema en cascada para enfriamiento rápido."
      ],
      advantages: [
        "Cámara de secado transparente de diseño visual y altamente seguro.",
        "Diseño compacto de mesa, ahorrando valioso espacio de laboratorio.",
        "Interfaz USB incorporada para exportar y gestionar datos de análisis."
      ],
      technicalParameters: [
        { leftParameter: "Área de Liofilización", leftValue: "0.12 m² / 0.09 m²", rightParameter: "Temperatura del Condensador", rightValue: "-60 °C" },
        { leftParameter: "Capacidad del Condensador", leftValue: "6.5 L", rightParameter: "Capacidad de Condensación de Hielo", rightValue: "3 kg / 24h" },
        { leftParameter: "Grado de Vacío", leftValue: "≤5 Pa (sin carga)", rightParameter: "Capacidad de Carga de Muestra", rightValue: "300 mL por estante" },
        { leftParameter: "Consumo Eléctrico", leftValue: "0.85 kW (AC220V, 50Hz)", rightParameter: "Refrigerante", rightValue: "Libre de CFC" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Liofilizador", "Secado por congelación", "Vacío", "Preparación de muestras", "Laboratorio"]
  },
  {
    id: "infitek-fmh-series",
    slug: "infitek-fmh-series",
    name: "Campana Extractora sin Ductos Serie FMH",
    description: "Campana extractora sin ductos con filtración HEPA, detector de VOC integrado y sistema de control táctil centralizado.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/fmh-series/imagen-1.png",
    features: [
      "No requiere ductos externos",
      "Filtración HEPA de 99.99%",
      "Detector VOC con alarma"
    ],
    detail: {
      brand: "Infitek",
      model: "Serie FMH",
      fullTitle: "Campana Extractora sin Ductos Serie FMH",
      subtitle: "Extracción y purificación eficiente de vapores químicos en laboratorios, sin infraestructura de ventilación compleja.",
      highlights: [
        "Ventilador de turbina súper silencioso que elimina vapores peligrosos hacia un filtro de alta capacidad sin generar chispas ni estática.",
        "Detector de compuestos orgánicos volátiles (VOC) de vanguardia con sistema de alerta especial.",
        "Control por pantalla táctil LED para gestionar iluminación y velocidad de ventilación cómodamente."
      ],
      advantages: [
        "Mesa de trabajo de resina epoxi: estabilidad química, resistencia al impacto y alta temperatura sin delaminación ni agrietamiento.",
        "Estructura principal robusta en acero galvanizado de 1.2 mm con recubrimiento libre de plomo resistente a la corrosión química.",
        "Iluminación LED de ahorro energético y sin emisión térmica que no afecta el entorno experimental."
      ],
      technicalParameters: [
        { leftParameter: "Velocidad de Flujo (Face velocity)", leftValue: "0.4 - 0.6 m/s", rightParameter: "Volumen de Nivel de Ruido", rightValue: "40 - 52 dBA" },
        { leftParameter: "Pantalla y Control", leftValue: "Pantalla táctil LCD de 7 pulgadas", rightParameter: "Sistema de Filtración", rightValue: "HEPA + Múltiples filtros químicos opcionales" },
        { leftParameter: "Ventilación (Ventanas)", leftValue: "Cristal acrílico anticorrosivo (>5mm)", rightParameter: "Sistema de Iluminación", rightValue: "Lámpara LED segura (sin emisión térmica)" },
        { leftParameter: "Sistemas de Alarma", leftValue: "VOC, temperatura y humedad", rightParameter: "Capacidad de Aire (m³/h)", rightValue: "Desde 230 hasta 690 según modelo" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Campana extractora", "Sin ductos", "Fume Hood", "Extracción de gases", "Equipamiento menor"]
  },
  {
    id: "infitek-fmh-pa-series",
    slug: "infitek-fmh-pa-series",
    name: "Campana Extractora de Polipropileno Serie FMH-PA",
    description: "Campana de extracción íntegramente fabricada en polipropileno resistente a ácidos y álcalis fuertes, ideal para experimentos de alta intensidad química.",
    category: "Equipamiento menor",
    imageUrl: "/productos/infitek/fmh-pa-series/imagen-1.png",
    features: [
      "100% Polipropileno (PP) anticorrosión",
      "Iluminación LED estanca y resistente",
      "Ventana de vidrio balanceada"
    ],
    detail: {
      brand: "Infitek",
      model: "Serie FMH-PA",
      fullTitle: "Campana Extractora de Polipropileno Serie FMH-PA",
      subtitle: "Protección integral para salas blancas e industrias pesadas con excelente tolerancia contra sustancias corrosivas de alto grado.",
      highlights: [
        "Materiales 100% polipropileno de alta calidad soldables: inmune al óxido y excepcionalmente resistente a los químicos.",
        "Diseño interno aerodinámico de tres etapas de escape que recolecta uniformemente cualquier gas perjudicial.",
        "Panel de control táctil inteligente ubicado al exterior para la manipulación de iluminación, ventilación y válvulas de aire."
      ],
      advantages: [
        "Campana de recolección superior de flujo axial con abrevadero de confluencia para gestionar el agua condensada de la extracción.",
        "Estructura cuadrada tipo 'T' que confiere amplia capacidad de soporte mecánico.",
        "Ventana de cristal templado enmarcada con poleas silenciosas de PP para posicionamiento estable en cualquier altura."
      ],
      technicalParameters: [
        { leftParameter: "Velocidad de Flujo", leftValue: "0.3 ~ 0.5 m/s", rightParameter: "Nivel de Emisión Sonora", rightValue: "< 65 dB" },
        { leftParameter: "Diámetro de Escape", leftValue: "φ 250 mm / φ 315 mm", rightParameter: "Volumen de Extracción (m³/h)", rightValue: "1300 / 1500 / 1800" },
        { leftParameter: "Material de Construcción", leftValue: "Tablero PP Grado A de 8 mm", rightParameter: "Superficie de Trabajo", rightValue: "Resina PP de 8 mm anticorrosiva" },
        { leftParameter: "Ventilador (estándar)", leftValue: "Flujo axial en plástico PP/metal", rightParameter: "Sistema Eléctrico", rightValue: "Toma segura a prueba de polvo (10A, 2200W)" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Campana extractora", "Polipropileno", "Ácidos", "Fume Hood", "Equipamiento menor"]
  },
  {
    id: "infitek-wb-series",
    slug: "infitek-wb-series",
    name: "Baño de agua Infitek WB-1R2H-7",
    description: "Baño termostático de 6,1 L y dos orificios para transferencia de calor por convección natural. Integra control PID, temporizador y protección por sobretemperatura y falta de agua.",
    category: "Equipamiento menor",
    filters: ["Marcas", "Equipamiento menor"],
    imageUrl: "/productos/infitek/wb-series/imagen-1.png",
    features: [
      "Controlador inteligente PID",
      "Cámara interior de acero inoxidable",
      "Drenaje eléctrico con operación de un botón"
    ],
    detail: {
      brand: "Infitek",
      model: "WB-1R2H-7",
      fullTitle: "Baño de Agua de Acero Inoxidable WB-1R2H-7",
      subtitle: "Control térmico por convección natural para mantener muestras a temperatura fija, programar procesos y detenerlos automáticamente.",
      highlights: [
        "Controlador de temperatura inteligente con programa PID, pantalla digital, función de temporización y protección contra sobretemperatura.",
        "Cámara interior y cubierta superior fabricadas en acero inoxidable; carcasa exterior de acero laminado en frío con acabado electrostático.",
        "Interruptor de drenaje eléctrico de un botón y apagado de seguridad cuando el nivel de agua es insuficiente."
      ],
      advantages: [
        "Operación a temperatura fija, temporización de 0 a 9999 minutos y parada automática al completar el ciclo.",
        "Rango desde temperatura ambiente +5 °C hasta 100 °C, con resolución de 0,1 °C y uniformidad de ±1,0 °C.",
        "Corrección de desviación, bloqueo de menú, respaldo ante fallo eléctrico y memoria de apagado."
      ],
      technicalParameters: [
        { leftParameter: "Modelo", leftValue: "WB-1R2H-7", rightParameter: "Clasificación", rightValue: "1 fila y 2 orificios" },
        { leftParameter: "Modo de calentamiento", leftValue: "Convección natural del agua", rightParameter: "Rango de temperatura", rightValue: "Temperatura ambiente +5 a 100 °C" },
        { leftParameter: "Resolución de temperatura", leftValue: "0,1 °C", rightParameter: "Fluctuación de temperatura", rightValue: "±0,5 °C" },
        { leftParameter: "Uniformidad de temperatura", leftValue: "±1,0 °C", rightParameter: "Sensor", rightValue: "NTC" },
        { leftParameter: "Cámara interior", leftValue: "Acero inoxidable", rightParameter: "Carcasa exterior", rightValue: "Acero laminado en frío con pulverización electrostática" },
        { leftParameter: "Calentador", leftValue: "Tubo calefactor de acero inoxidable", rightParameter: "Potencia nominal", rightValue: "0,5 kW" },
        { leftParameter: "Control de temperatura", leftValue: "PID", rightParameter: "Ajuste", rightValue: "Botones táctiles" },
        { leftParameter: "Visualización", leftValue: "LED dual de 3 dígitos: temperatura medida y programada", rightParameter: "Temporizador", rightValue: "0 a 9999 min, con función de espera" },
        { leftParameter: "Operación", leftValue: "Temperatura fija, temporización y parada automática", rightParameter: "Funciones adicionales", rightValue: "Corrección de desviación, bloqueo de menú, respaldo eléctrico y memoria" },
        { leftParameter: "Seguridad", leftValue: "Alarma de sobretemperatura y apagado por falta de agua", rightParameter: "Volumen", rightValue: "6,1 L" },
        { leftParameter: "Cámara interior (An. × L. × Al.)", leftValue: "300 × 135 × 150 mm", rightParameter: "Exterior (An. × L. × Al.)", rightValue: "318 × 168 × 210 mm" },
        { leftParameter: "Embalaje (An. × L. × Al.)", leftValue: "410 × 260 × 300 mm", rightParameter: "Carga por bandeja", rightValue: "5 kg" },
        { leftParameter: "Número de bandejas", leftValue: "1", rightParameter: "Alimentación", rightValue: "AC 220 V · 2,3 A · 50/60 Hz" },
        { leftParameter: "Peso neto", leftValue: "4,5 kg", rightParameter: "Peso bruto", rightValue: "5 kg" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Baño María", "Water Bath", "Calefacción", "Equipamiento menor"]
  },
  {
    id: "infitek-pr5-series",
    slug: "infitek-pr5-series",
    name: "Refrigerador de farmacia Infitek PR5-1500",
    description: "Refrigerador médico de tres puertas y 1500 L para almacenar vacunas, medicamentos, reactivos y muestras entre 2 y 8 °C mediante refrigeración por aire forzado.",
    category: "Equipamiento menor",
    filters: ["Marcas", "Área farmacéutica", "Equipamiento menor"],
    imageUrl: "/productos/infitek/pr5-series/imagen-1.png",
    features: [
      "Capacidad masiva de 1500 L",
      "Enfriamiento de aire forzado",
      "Control microprocesado 2°C - 8°C"
    ],
    detail: {
      brand: "Infitek",
      model: "PR5-1500",
      fullTitle: "Refrigerador de Farmacia de Tres Puertas PR5-1500",
      subtitle: "Almacenamiento confiable de alto volumen para vacunas, fármacos y reactivos con sistema de enfriamiento de aire forzado libre de escarcha.",
      highlights: [
        "Compresor de alta eficiencia con fiabilidad demostrada y ventilador de refrigeración permanentemente lubricado.",
        "Sistema avanzado de aire forzado diseñado con una distribución optimizada para garantizar uniformidad y rápida recuperación térmica.",
        "Equipado con un sistema completo de alarma que incluye zumbador sonoro y luz intermitente visual para múltiples anomalías."
      ],
      advantages: [
        "Variación de temperatura dentro de ±3 °C y ajuste en incrementos de 0,1 °C mediante control microprocesado.",
        "Diseño ergonómico con iluminación LED interior, estantes ajustables para distintos tipos de envases y cerradura de seguridad.",
        "Interior y exterior fabricados en Acero Inoxidable grado 304, ofreciendo máxima higiene y resistencia en el laboratorio."
      ],
      technicalParameters: [
        { leftParameter: "Modelo", leftValue: "PR5-1500", rightParameter: "Capacidad", rightValue: "1500 L" },
        { leftParameter: "Rango de temperatura", leftValue: "2 a 8 °C", rightParameter: "Rangos opcionales", rightValue: "2 a 10 °C o 2 a 14 °C" },
        { leftParameter: "Temperatura ambiente de operación", leftValue: "10 a 32 °C", rightParameter: "Variación de temperatura", rightValue: "±3 °C" },
        { leftParameter: "Controlador", leftValue: "Microprocesador", rightParameter: "Sensor", rightValue: "NTC" },
        { leftParameter: "Visualización", leftValue: "Pantalla digital", rightParameter: "Ajuste de temperatura", rightValue: "Incrementos de 0,1 °C" },
        { leftParameter: "Sistema de refrigeración", leftValue: "Aire forzado", rightParameter: "Descongelamiento", rightValue: "Automático, sin escarcha" },
        { leftParameter: "Refrigerante", leftValue: "R134a, libre de CFC", rightParameter: "Compresor", rightValue: "SECOP · 1 unidad" },
        { leftParameter: "Alarmas", leftValue: "Alta/baja temperatura, error de sensor, puerta abierta y fallo eléctrico", rightParameter: "Respaldo de alarma", rightValue: "8 h ante fallo de energía" },
        { leftParameter: "Interior", leftValue: "Acero inoxidable grado 304", rightParameter: "Exterior", rightValue: "Acero inoxidable grado 304" },
        { leftParameter: "Puerto de alarma remota", leftValue: "Estándar", rightParameter: "Puerto USB / orificio de prueba", rightValue: "Opcionales" },
        { leftParameter: "Estantes", leftValue: "12", rightParameter: "Emisión sonora", rightValue: "55 dB" },
        { leftParameter: "Dimensiones internas (An. × Pr. × Al.)", leftValue: "1680 × 595 × 1312 mm", rightParameter: "Dimensiones exteriores (An. × Pr. × Al.)", rightValue: "1800 × 775 × 1965 mm" },
        { leftParameter: "Dimensiones de envío (An. × Pr. × Al.)", leftValue: "1890 × 820 × 2170 mm", rightParameter: "Peso neto / bruto", rightValue: "245 / 280 kg" },
        { leftParameter: "Alimentación", leftValue: "AC 110/220 V ±10 % · 50/60 Hz", rightParameter: "Consumo", rightValue: "1065 W" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Refrigerador", "Farmacia", "Conservación", "Vacunas", "Equipamiento menor"]
  },
  {
    id: "infitek-titr-50vc",
    slug: "infitek-titr-50vc",
    name: "Titulador Karl Fischer TITR-50VC",
    description: "Titulador Karl Fischer que combina valoración volumétrica y coulométrica para determinar humedad constante y trazas en muestras sólidas, líquidas y gaseosas.",
    category: "Equipamiento analítico",
    filters: ["Marcas", "Equipamiento analítico", "Área farmacéutica"],
    imageUrl: "/productos/infitek/titr-50vc/imagen-1.png",
    features: [
      "Valoración Volumétrica y Coulométrica",
      "Pantalla táctil de 7 pulgadas",
      "Gestión de datos compatible con GLP"
    ],
    detail: {
      brand: "Infitek",
      model: "TITR-50VC",
      fullTitle: "Titulador Karl Fischer Volumétrico y Coulométrico TITR-50VC",
      subtitle: "Determinación precisa de humedad constante y trazas en muestras sólidas, líquidas y gaseosas.",
      highlights: [
        "Sistema operativo con gestión de usuarios en tres niveles, métodos, sensores, titulantes y datos; las funciones GMP requieren el software GMP indicado por el fabricante.",
        "Admite múltiples métodos: Valoración automática, determinación de título KF, valoración en horno y corrección de coeficientes.",
        "Gestor de disolventes con diseño antiderrames: admite llenado, drenaje y limpieza de buretas sin contacto con químicos peligrosos."
      ],
      advantages: [
        "Ajuste de deriva manual/automático y almacenamiento de hasta 2000 conjuntos de datos de valoración en formato compatible con GLP.",
        "Pantalla LCD táctil de 7 pulgadas con interfaz a color para visualizar unidades como µg, mg, %, ppm, mg/L y µg/mL.",
        "Compatibilidad con exportación de datos mediante USB (CSV/PDF) y conexión directa a impresoras, lectores de códigos de barras y balanzas."
      ],
      technicalParameters: [
        { leftParameter: "Modelo", leftValue: "TITR-50VC", rightParameter: "Pantalla", rightValue: "LCD táctil a color de 7 pulgadas" },
        { leftParameter: "Modos Karl Fischer", leftValue: "Volumétrico y coulométrico", rightParameter: "Muestreo por horno", rightValue: "Compatible con gases, sólidos y líquidos" },
        { leftParameter: "Métodos volumétricos", leftValue: "Valoración automática, título KF, horno y blanco de horno", rightParameter: "Métodos coulométricos", rightValue: "Valoración automática, horno, blanco de horno y corrección de coeficiente" },
        { leftParameter: "Rango de agua volumétrico", leftValue: "100 µg a 250,0 mg", rightParameter: "Resolución volumétrica", rightValue: "1 µg" },
        { leftParameter: "Repetibilidad volumétrica", leftValue: "≤0,3 %", rightParameter: "Unidades volumétricas", rightValue: "µg, mg, %, ppm, µg/mL y mg/L" },
        { leftParameter: "Rango mV volumétrico", leftValue: "0 a 2000 mV", rightParameter: "Resolución mV volumétrica", rightValue: "0,1 mV" },
        { leftParameter: "Corriente de polarización volumétrica", leftValue: "1 a 200 µA", rightParameter: "Exactitud / fluctuación", rightValue: "±3 % / ±2,5 % cada 30 min" },
        { leftParameter: "Rango de agua coulométrico", leftValue: "3,0 µg a 200 mg", rightParameter: "Resolución coulométrica", rightValue: "0,1 µg" },
        { leftParameter: "Repetibilidad coulométrica", leftValue: "≤0,3 %", rightParameter: "Unidades coulométricas", rightValue: "µg, mg, %, ppm, µg/mL y mg/L" },
        { leftParameter: "Rango mV coulométrico", leftValue: "0 a 2000 mV", rightParameter: "Resolución mV coulométrica", rightValue: "0,1 mV" },
        { leftParameter: "Corriente de polarización coulométrica", leftValue: "1 a 200 µA", rightParameter: "Exactitud / fluctuación", rightValue: "±3 % / ±2,5 % cada 30 min" },
        { leftParameter: "Corriente de trabajo", leftValue: "Exactitud ±0,5 %", rightParameter: "Fluctuación de corriente de trabajo", rightValue: "±0,2 % cada 10 min" },
        { leftParameter: "Gestión de datos", leftValue: "Hasta 2000 resultados, compatible con GLP", rightParameter: "Exportación", rightValue: "USB a CSV/PDF y RS-232 para impresión" },
        { leftParameter: "Periféricos compatibles", leftValue: "Impresora, lector de código, horno y balanza según modelo", rightParameter: "Gestión GMP", rightValue: "Requiere software GMP" },
        { leftParameter: "Elementos incluidos", leftValue: "Gestor de solventes, bureta de 10 mL y recipiente volumétrico con electrodo", rightParameter: "Elementos coulométricos incluidos", rightValue: "Recipiente, electrodo de medición y electrodo generador" },
        { leftParameter: "Alimentación", leftValue: "AC 100 a 240 V · 47 a 63 Hz", rightParameter: "Dimensiones", rightValue: "240 × 370 × 270 mm" },
        { leftParameter: "Peso neto", leftValue: "Aproximadamente 4 kg", rightParameter: "Ajuste de deriva", rightValue: "Automático o manual" }
      ],
      detailBlocks: []
    },
    tags: ["Infitek", "Karl Fischer", "Titulador", "Volumétrico", "Coulométrico", "Humedad", "Equipamiento analítico"]
  },
  {
    id: "te-instruments-xplorer-aox-tox",
    slug: "te-instruments-xplorer-aox-tox",
    name: "Analizador de Halógenos Orgánicos Totales XplorerPlus AOX/TOX",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Análisis de agua", "Automatización", "Trace Elemental"],
    description:
      "Analizador de parámetros de suma (AOX/TOX, EOX, POX) en aguas, lodos, suelos y matrices orgánicas con tubo de combustión X-ProPlus y titulación microcoulombimétrica con Auto-Gain.",
    features: [
      "Determinación de parámetros de suma AOX, TOX, EOX y POX",
      "Tubo de combustión X-ProPlus sin consumibles",
      "Célula de titulación microcoulombimétrica con Auto-Gain",
      "Conforme a normas ISO, DIN, NEN, EPA y CEN",
    ],
    imageUrl: "/productos/te-instruments/xplorer-aox-tox/imagen-1.png",
    detail: {
      brand: "Trace Elemental",
      model: "XplorerPlus AOX/TOX",
      fullTitle: "Trace Elemental XplorerPlus AOX/TOX Analizador de Halógenos Orgánicos Totales",
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
        "Plataforma ambiental completa conforme a regulaciones ISO, DIN, NEN, EPA y CEN para agua potable, efluentes, suelos y lodos.",
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
          rightValue: "ISO, DIN, NEN, EPA, CEN",
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
      ],
    },
    tags: ["TE Instruments", "XplorerPlus", "AOX", "TOX", "EOX", "POX", "Análisis elemental", "Análisis de agua", "Halógenos"]
  },
  {
    id: "te-instruments-xplorer-tn",
    slug: "te-instruments-xplorer-tn",
    name: "Analizador de Nitrógeno Total, Azufre y Cloro XplorerPlus TN",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Análisis de agua", "Automatización", "Trace Elemental"],
    description:
      "Analizador automático de combustión de trazas para Nitrógeno Total (TN), Azufre Total (TS) y Cloro (TX) en combustibles, biocombustibles, productos químicos, polímeros y gases, con tubo XproPlus y tecnología de corrección NO-CT™.",
    features: [
      "Determinación ultrarremota de Nitrógeno Total (TN), Azufre Total (TS) y Cloro (TX)",
      "Tubo de combustión XproPlus con doble colisión NEX-Z sin consumibles",
      "Límite de detección de 10 ppb para Azufre Total y Nitrógeno sin aditivos",
      "Tecnología NO-CT™ para eliminar interferencia de nitrógeno en azufre (ASTM D5453)",
      "Módulo Liquids ModulePlus con control acelerado de temperatura hasta 600 °C",
    ],
    imageUrl: "/productos/te-instruments/xplorer-tn/imagen-1.png",
    detail: {
      brand: "Trace Elemental",
      model: "XplorerPlus TN",
      fullTitle: "Trace Elemental XplorerPlus TN Analizador de Nitrógeno Total, Azufre y Cloro",
      subtitle:
        "Plataforma avanzada de análisis elemental por combustión para determinación de trazas de Nitrógeno, Azufre y Cloro en hidrocarburos, combustibles automotrices, biocombustibles, productos químicos, plásticos y gases.",
      highlights: [
        "Evolución tecnológica de la plataforma Xplorer (líder de la industria desde 2009)",
        "Tubo de combustión XproPlus basado en la tecnología de doble colisión TSHR NEX-Z",
        "Límite de detección ultraballero de 10 ppb para Azufre Total y Nitrógeno",
        "Tecnología NO-CT™ (Corrección de Óxido de Nitrógeno) integrada para ASTM D5453",
      ],
      advantages: [
        "Formato de mesada (benchtop) con ruta de flujo interna completamente rediseñada para lograr máxima precisión, resistencia y durabilidad en análisis de trazas.",
        "Tubo de combustión XproPlus (tecnología TSHR NEX-Z) de doble colisión con ruta de flujo extendida que soporta cualquier matriz de muestra con mínimo arrastre y sin consumibles.",
        "Detector TS-UV-F de diseño propio con alineación robusta de lámpara flasher que extiende su vida útil y asegura estabilidad a largo plazo en azufre total.",
        "Módulo Liquids ModulePlus con control térmico acelerado hasta 600 °C, expandiendo la compatibilidad con muestras difíciles y aumentando la productividad.",
        "Detección microcoulombimétrica sin costuras para cloro y azufre con función Auto-Gain y preparación simplificada de la célula.",
        "Módulos de jeringa y barca totalmente rediseñados que mejoran la versatilidad de introducción, reduciendo los tiempos de ciclo analítico.",
        "Enfriamiento de barca opcional Boat CoolingPlus por tecnología Peltier que acelera el enfriamiento de copas y reduce el tiempo de análisis a menos de 5 minutos.",
        "Tecnología NO-CT™ (Nitrogen Oxide Correction Technology) que elimina la interferencia de nitrógeno en la determinación de azufre total según ASTM D5453.",
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
          leftValue: "Tecnología NO-CT™ automática (ASTM D5453)",
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
            "Tecnología NO-CT™ (Nitrogen Oxide Correction Technology) que elimina la interferencia de nitrógeno durante la medición de Azufre Total según ASTM D5453.",
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
        {
          title: "Cumplimiento normativo y estándares internacionales",
          tone: "red",
          items: [
            "ASTM D5453: Determinación de Azufre Total en hidrocarburos por fluorescencia UV con corrección NO-CT™.",
            "ASTM D4629 / ASTM D5762: Medición de Nitrógeno Total por quimiluminiscencia.",
            "ASTM D5808 / ASTM D7457: Titulación microcoulombimétrica de Cloro Total en combustibles e hidrocarburos.",
            "Soporte técnico integral, instalación y calificación analítica (IQ/OQ/PQ) por el equipo de Del Carpio en Chile.",
          ],
        },
      ],
    },
    tags: ["Trace Elemental", "XplorerPlus", "TN", "TS", "TX", "Nitrógeno", "Azufre", "Cloro", "Análisis elemental", "Combustión"],
  },
  {
    id: "te-instruments-vectra",
    slug: "te-instruments-vectra",
    name: "Autosampler y Muestreador Automático de Líquidos VECTRA",
    category: "Automatización",
    filters: ["Marcas", "Automatización", "Equipamiento analítico", "Trace Elemental"],
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
      fullTitle: "Trace Elemental VECTRA Muestreador Automático de Líquidos de Alta Capacidad",
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
        "Integración nativa y control total desde el software TEIS / TraceLINK para la creación de métodos analíticos personalizados.",
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
          leftValue: "Enfriamiento: 12.5 °C bajo ambiente · Calefacción: hasta 65 °C",
          rightParameter: "Velocidad de manejo de líquidos",
          rightValue: "Ajustable de 0.1 a 30 µL/s",
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
          leftValue: "100-240V, 50-60Hz, 70W max (20W normal)",
          rightParameter: "Protocolo de control",
          rightValue: "USB controlado vía software TEIS / TraceLINK",
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
            "Control nativo desde software TEIS / TraceLINK con programación completa de secuencias y protocolos de enjuague.",
            "Instalación, integración con analizadores existentes, capacitación y soporte técnico local por Del Carpio en Chile.",
          ],
        },
      ],
    },
    tags: ["Trace Elemental", "VECTRA", "Autosampler", "Muestreador automático", "Líquidos", "Automatización", "Xplorer", "TEIS"],
  },
  {
    id: "te-instruments-newton",
    slug: "te-instruments-newton",
    name: "Autosampler y Muestreador Automático de Sólidos NEWTON",
    category: "Automatización",
    filters: ["Marcas", "Automatización", "Equipamiento analítico", "Trace Elemental"],
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
      fullTitle: "Trace Elemental NEWTON Muestreador Automático de Sólidos y Muestras Viscosas",
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
          leftValue: "Integración nativa TEIS / TraceLINK",
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
            "Control nativo y completo desde la suite de software TEIS / TraceLINK.",
            "Compatibilidad directa con analizadores elementales XPLORER (TN/TS/TX/AOX) y sistemas XPREP.",
            "Instalación, calibración de sensórica y capacitación técnica brindada por Del Carpio en Chile.",
          ],
        },
      ],
    },
    tags: ["Trace Elemental", "NEWTON", "Autosampler", "Muestreador automático", "Sólidos", "Viscosos", "Automatización", "Xplorer", "TEIS"],
  },
  {
    id: "decent-cargador-electrico-crisoles",
    slug: "decent-cargador-electrico-crisoles",
    name: "Cargador Eléctrico de Crisoles DEPL25 / DEPL50",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Automatización", "Minería"],
    description:
      "Cargador eléctrico de crisoles diseñado para facilitar el manejo de cargas pesadas en laboratorios de ensayo por fuego. Compatible con sistemas multipuerto y de entrada única, ofrece capacidades de carga de 20 a 84 crisoles.",
    features: [
      "Capacidad de carga de 20, 25, 42, 50 y 84 crisoles",
      "Batería libre de mantenimiento de 12V 60Ah con garantía de 5 años y cargador integrado",
      "Elevación hidráulica de 400 kg a 1500 mm con motor bomba DC de 700W",
    ],
    imageUrl: "/productos/decent/cargador-electrico-crisoles/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "DEPL25 / DEPL50",
      fullTitle: "Decent DEPL25 / DEPL50 Cargador Eléctrico de Crisoles para Ensayo por Fuego",
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
        { leftParameter: "Modelos disponibles", leftValue: "DEPL25 y DEPL50", rightParameter: "Capacidad máxima de carga", rightValue: "400 kg (Ambos modelos)" },
        { leftParameter: "Altura máxima de elevación", leftValue: "1500 mm", rightParameter: "Compatibilidad de crisoles", rightValue: "Crisol 50g / 65g (Personalizable)" },
        { leftParameter: "Capacidades de crisoles", leftValue: "20 / 25 / 42 / 50 / 84 unidades", rightParameter: "Compatibilidad de horno", rightValue: "Multipuerto y entrada única" },
        { leftParameter: "Sistema eléctrico", leftValue: "DC 12V", rightParameter: "Batería de almacenamiento", rightValue: "DC 12V, 60Ah libre de mantenimiento" },
        { leftParameter: "Motor bomba hidráulica", leftValue: "DC 12V, 700W", rightParameter: "Garantía de batería", rightValue: "5 años" },
        { leftParameter: "Tamaño horquilla DEPL25", leftValue: "900 × 650 × 60 mm", rightParameter: "Tamaño horquilla DEPL50", rightValue: "900 × 1200 × 60 mm" },
        { leftParameter: "Sistema de carga", leftValue: "Cargador integrado para carga rápida", rightParameter: "Panel de control", rightValue: "Operación simple de carga y descarga" },
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
    tags: ["Decent", "DEPL25", "DEPL50", "Fire Assay", "Crisoles", "Ensayo al fuego", "Minería", "Cargador Eléctrico"],
    relatedProducts: ["decent-cargador-manual-crisoles", "milestone-ethos-up", "hanon-sh220f"],
  },
  {
    id: "decent-cargador-manual-crisoles",
    slug: "decent-cargador-manual-crisoles",
    name: "Cargador Manual de Crisoles DMPL25 / DMPL50",
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
      fullTitle: "Decent DMPL25 / DMPL50 Cargador Manual de Crisoles para Ensayo por Fuego",
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
        { leftParameter: "Modelos disponibles", leftValue: "DMPL25 y DMPL50", rightParameter: "Capacidad máxima de carga", rightValue: "400 kg (Ambos modelos)" },
        { leftParameter: "Altura máxima de elevación", leftValue: "1500 mm", rightParameter: "Tipo de operación", rightValue: "Manual (Sin energía eléctrica)" },
        { leftParameter: "Compatibilidad de crisoles", leftValue: "Crisol 50g / 65g o tamaño personalizado", rightParameter: "Capacidades de crisoles", rightValue: "20 / 25 / 42 / 50 / 84 unidades" },
        { leftParameter: "Tamaño horquilla DMPL25", leftValue: "900 × 650 × 60 mm", rightParameter: "Tamaño horquilla DMPL50", rightValue: "900 × 1200 × 60 mm" },
        { leftParameter: "Compatibilidad de horno", leftValue: "Multipuerto y entrada única", rightParameter: "Mantenimiento requerido", rightValue: "Mínimo mecánico" },
        { leftParameter: "Estructura", leftValue: "Acero de alta resistencia", rightParameter: "Flexibilidad", rightValue: "Personalizable según requerimiento del cliente" },
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
    tags: ["Decent", "DMPL25", "DMPL50", "Fire Assay", "Crisoles", "Ensayo al fuego", "Minería", "Cargador Manual"],
    relatedProducts: ["decent-cargador-electrico-crisoles", "decent-copelas-magnesio", "decent-dosificador-automatico-litargirio"],
  },
  {
    id: "decent-copelas-magnesio",
    slug: "decent-copelas-magnesio",
    name: "Copelas de Magnesia y Bloques de Lingotes",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Copelas de magnesia y bloques de lingotes para copelación en ensayo por fuego. Fabricadas con una mezcla patentada de óxido de magnesio e ingredientes especiales de flux con absorción de hasta el 70% de su peso en litargirio.",
    features: [
      "Absorción rápida de litargirio de aproximadamente 70% de su peso",
      "Mezcla única de óxido de magnesio con ingredientes especiales de flux",
      "Gama completa de tamaños desde 2X hasta 14 para todo tipo de matrices y lingotes",
    ],
    imageUrl: "/productos/decent/copelas-magnesio/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "Serie Magnesia 2X – 14",
      fullTitle: "Decent Copelas de Magnesia y Bloques de Lingotes para Ensayo por Fuego",
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
        { leftParameter: "Material base", leftValue: "Óxido de Magnesio (MgO) con ingredientes especiales de flux", rightParameter: "Capacidad de absorción", rightValue: "Aprox. 70% de su peso en litargirio" },
        { leftParameter: "Rango de tamaños", leftValue: "Desde 2X hasta 14 (19 modelos estándar y especiales)", rightParameter: "Comportamiento térmico", rightValue: "Alta resistencia a choque térmico en mufla" },
        { leftParameter: "Resistencia al plomo", leftValue: "Cero agrietamiento por plomo ni picaduras", rightParameter: "Desprendimiento de perla", rightValue: "Separación limpia y sin pérdidas de masa" },
        { leftParameter: "Tamaños pequeños (2X – 4A)", leftValue: "Muestras de rutina (Altura 17–22 mm, Copa 18–24 mm)", rightParameter: "Tamaños medianos (5 – 7AS)", rightValue: "Ensayos estándar con mayor volumen (Altura 26–35 mm)" },
        { leftParameter: "Tamaños grandes (8 – 11)", leftValue: "Muestras con alto contenido de plomo (Altura 27–44 mm)", rightParameter: "Tamaños extra grandes (14)", rightValue: "Lingotes y bloques especiales (Altura 70 mm, Base 85 mm)" },
        { leftParameter: "Empaque por cartón", leftValue: "12 a 1008 piezas según tamaño", rightParameter: "Distribución por pallet", rightValue: "48 a 75 cartones por pallet" },
      ],
      detailBlocks: [
        {
          title: "Dimensiones y Especificaciones por Modelo",
          tone: "blue",
          items: [
            "Modelo 2X: Altura 17mm | Diám. Ext. 24mm | Diám. Base 19mm | Diám. Copa 18mm | Prof. 8mm | Empaque 1008 pcs/ctn.",
            "Modelos 3 y 4A: Altura 20-22mm | Diám. Ext. 26-27mm | Diám. Copa 23-24mm | Prof. 5.5-6mm | Empaque 500 pcs/ctn.",
            "Modelos 4 y 5: Altura 25-26mm | Diám. Ext. 30-35mm | Diám. Copa 24-27mm | Prof. 8mm | Empaque 324-486 pcs/ctn.",
            "Serie 6A (26/29) y 7A/7AS: Altura 26-35mm | Diám. Ext. 40mm | Diám. Copa 31.2-32mm | Prof. 11.8-15mm | Empaque 200-300 pcs/ctn.",
            "Serie 8, 8A, 8AM, 8S: Altura 27.1-40mm | Diám. Ext. 44-45mm | Diám. Copa 33-38mm | Prof. 8.5-14mm | Empaque 200-240 pcs/ctn.",
            "Serie 9, 9A, 10, 11: Altura 30-44mm | Diám. Ext. 51-60mm | Diám. Copa 40-52.6mm | Prof. 11-15mm | Empaque 60-120 pcs/ctn.",
            "Modelo 14 (Extra Grande): Altura 70mm | Diám. Ext. 110mm | Diám. Base 85mm | Diám. Copa 80mm | Prof. 24mm | Empaque 12 pcs/ctn.",
          ],
        },
        {
          title: "Guía de Selección de Tamaños",
          tone: "yellow",
          items: [
            "Tamaños pequeños (2X-4A): Para muestras de ensayo de rutina de metales preciosos y microensayos.",
            "Tamaños medianos (5-7AS): Para ensayos estándar con mayor volumen de muestra y concentrados.",
            "Tamaños grandes (8-11): Para ensayos de muestras complejas con alto contenido de plomo.",
            "Tamaños extra grandes (14): Para lingotes de gran masa, bloques de fundición y procesos especiales.",
            "Variantes especiales: Modelo 7AS-15 disponible con profundidad y altura calibradas.",
          ],
        },
        {
          title: "Ventajas Operativas en Laboratorio",
          tone: "green",
          items: [
            "Resistencia mecánica robusta que previene roturas durante el transporte y manipulación en caliente.",
            "Inmunes a la absorción de humedad ambiental o degradación por cambios atmosféricos.",
            "Tendencia reducida a la congelación del botón metálico en el fondo de la copa.",
            "Composición química consistente garantizada por I+D continuo y loteo controlado.",
          ],
        },
      ],
    },
    tags: ["Decent", "Copelas", "Magnesia", "Fire Assay", "Ensayo al fuego", "Lingotes", "Minería", "Litargirio"],
    relatedProducts: ["decent-dosificador-automatico-litargirio", "decent-cargador-electrico-crisoles", "decent-cargador-manual-crisoles"],
  },
  {
    id: "decent-dosificador-automatico-litargirio",
    slug: "decent-dosificador-automatico-litargirio",
    name: "Dosificador Automático de Litargirio DAFS84",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Automatización", "Minería"],
    description:
      "Sistema dispensador automático de flux y litargirio con capacidad para 84 crisoles simultáneos. Cuenta con gabinete cerrado para prevención de contaminación y niveles de dosificación personalizables.",
    features: [
      "Dispensado automatizado y simultáneo en 84 crisoles en una sola operación",
      "Gabinete de trabajo cerrado anti-polvo para máxima seguridad del operador",
      "Alimentación 230V monofásica, presión 0.5 MPa y volumen 145/175 mL por crisol",
    ],
    imageUrl: "/productos/decent/dosificador-automatico-litargirio/Imagen Portada.webp",
    detail: {
      brand: "Decent",
      model: "DAFS84",
      fullTitle: "Decent DAFS84 Sistema Dispensador Automático de Flux y Litargirio",
      subtitle:
        "Sistema de dosificación automatizada de flux para 84 crisoles simultáneos. Optimiza los tiempos de preparación en laboratorios de ensayo por fuego, garantizando repetibilidad, trazabilidad y un entorno cerrado libre de polvo.",
      highlights: [
        "Dispensado eficiente y simultáneo de flux en 84 crisoles en un solo ciclo",
        "Gabinete cerrado hermético que previene la exposición a polvos y derrames de reactivos",
        "Alimentación eléctrica 230V 50Hz, presión de trabajo 0.5 MPa y volumen 145/175 mL",
      ],
      advantages: [
        "Alta productividad: dispensa flux en 84 crisoles a la vez, multiplicando el rendimiento en lotes masivos de ensayo.",
        "Seguridad ambiental y ocupacional: el espacio de trabajo cerrado previene la dispersión de polvo de litargirio en el laboratorio.",
        "Repetibilidad y trazabilidad: elimina las variaciones del dosificado manual, asegurando pesos y volúmenes consistentes de flux.",
        "Niveles de dosificación ajustables: dos niveles de dispensado (145 mL y 175 mL) con opción de calibración personalizada.",
      ],
      technicalParameters: [
        { leftParameter: "Modelo", leftValue: "DAFS84", rightParameter: "Capacidad total", rightValue: "84 crisoles simultáneamente" },
        { leftParameter: "Alimentación eléctrica", leftValue: "230V Monofásico, 50Hz", rightParameter: "Compatibilidad de crisol", rightValue: "Crisoles de 55g (Adaptable)" },
        { leftParameter: "Presión de trabajo externa", leftValue: "0.5 MPa", rightParameter: "Capacidad de dispensado", rightValue: "145 / 175 mL por crisol individual" },
        { leftParameter: "Tipo de operación", leftValue: "Automática con controlador simplificado", rightParameter: "Ambiente de trabajo", rightValue: "Cámara cerrada anti-polvo" },
        { leftParameter: "Niveles de dispensado", leftValue: "2 niveles configurables y personalizables", rightParameter: "Construcción", rightValue: "Componentes de alta durabilidad para trabajo pesado" },
        { leftParameter: "Aplicación analítica", leftValue: "Preparación de flux en ensayo por fuego", rightParameter: "Mantenimiento", rightValue: "Mínimo con fácil acceso para limpieza" },
      ],
      detailBlocks: [
        {
          title: "Ventajas y Eficiencia Operativa",
          tone: "blue",
          items: [
            "Dispensado Eficiente: Dispensa fácilmente flux en 84 crisoles en una sola operación, aumentando sustancialmente la eficiencia del procesamiento de muestras.",
            "Operación Automatizada: Permite repetibilidad y trazabilidad rigurosa durante la preparación de muestras, mejorando la calidad y precisión del análisis.",
            "Control Simplificado: Controlador diseñado para simplicidad de manejo y fácil parametrización por parte del operador.",
            "Prevención de Contaminación: El espacio cerrado previene el derrame y dispersión de polvo, asegurando la seguridad del ambiente experimental.",
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
            "Seguridad del operador: Mitiga el riesgo de inhalación de reactivos y polvo de litargirio.",
          ],
        },
      ],
    },
    tags: ["Decent", "DAFS84", "Flux", "Litargirio", "Dispensador", "Fire Assay", "Automatización", "Minería"],
    relatedProducts: ["decent-copelas-magnesio", "decent-cargador-electrico-crisoles", "decent-cargador-manual-crisoles", "decent-hornos-cupelacion", "decent-horno-copelacion-alta-temperatura"],
  },
  {
    id: "decent-hornos-cupelacion",
    slug: "decent-hornos-cupelacion",
    name: "Hornos de Cupelación DE50CF / DE100CF / DE168CF",
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
      fullTitle: "Decent Hornos de Cupelación DE-50CF / DE-100CF para Ensayo por Fuego",
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
        { leftParameter: "Modelos disponibles", leftValue: "DE-50CF, DE-100CF y DE-168CF", rightParameter: "Temperatura máxima nominal", rightValue: "1200 °C" },
        { leftParameter: "Capacidad de copelas", leftValue: "50 / 100 / 168 copelas (6A / 7A / 7AS)", rightParameter: "Elemento calefactor", rightValue: "12 barras de Carburo de Silicio (SiC)" },
        { leftParameter: "Cámara DE-50CF", leftValue: "300 × 480 × 246 mm (Mufla No. 4)", rightParameter: "Cámara DE-100CF", rightValue: "535 × 610 × 350 mm (Mufla No. 5)" },
        { leftParameter: "Control de temperatura", leftValue: "PID automático Omron con termopar tipo K", rightParameter: "Transformador eléctrico", rightValue: "3 fases, 20 kVA (50CF) / 30 kVA (100CF)" },
        { leftParameter: "Presión neumática de puerta", leftValue: "0.4 – 0.5 MPa (Compresor de aire)", rightParameter: "Potencia eléctrica", rightValue: "11–20 kW (DE-50CF) / 16–25 kW (DE-100CF)" },
        { leftParameter: "Estructura exterior", leftValue: "Acero al carbono 2 mm con pintura electrostática", rightParameter: "Aislamiento refractario", rightValue: "Silicato de aluminio y ladrillo aislante" },
        { leftParameter: "Dimensiones DE-50CF", leftValue: "937 × 1170 × 1675 mm (Cerrado)", rightParameter: "Dimensiones DE-100CF", rightValue: "1260 × 1370 × 1690 mm (Cerrado)" },
      ],
      detailBlocks: [
        {
          title: "Especificaciones y Capacidades por Modelo",
          tone: "blue",
          items: [
            "DE-50CF: Mufla No. 4 (300×480×246 mm) | Capacidad: 50 copelas (6A/7A/7AS) | Transformador: 3ph 20kVA | Potencia: 11-20 kW | Dimensiones: 937×1170×1675 mm.",
            "DE-100CF: Mufla No. 5 (535×610×350 mm) | Capacidad: 100 copelas (6A/7A/7AS) | Transformador: 3ph 30kVA | Potencia: 16-25 kW | Dimensiones: 1260×1370×1690 mm.",
            "DE-168CF: Mufla No. 8 (670×650×255 mm) | Capacidad: 168 copelas (6A/7A/7AS) | Transformador: 3ph 40kVA | Diseñado para macro-ensayos mineros.",
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
          title: "Integración en el Circuito de Ensayo por Fuego",
          tone: "green",
          items: [
            "Integración completa con cargadores de crisoles manuales y eléctricos Decent (DEPL/DMPL).",
            "Compatibilidad con sistemas de vertido múltiple y mesas de enfriamiento de copelas.",
            "Opcional: Conexión con depurador de gases ácidos y sistema de extracción y eliminación de polvo de plomo.",
            "Protocolo de seguridad: Uso obligatorio de gafas, guantes y trajes protectores aluminizados térmicos.",
          ],
        },
      ],
    },
    tags: ["Decent", "DE50CF", "DE100CF", "DE168CF", "Hornos", "Cupelación", "Mufla", "Fire Assay", "Ensayo al fuego", "Minería"],
    relatedProducts: ["decent-horno-copelacion-alta-temperatura", "decent-copelas-magnesio", "decent-dosificador-automatico-litargirio", "decent-cargador-electrico-crisoles"],
  },
  {
    id: "decent-horno-copelacion-alta-temperatura",
    slug: "decent-horno-copelacion-alta-temperatura",
    name: "Horno de Copelación de Alta Temperatura 1500°C",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Horno de mufla de alta temperatura para copelación continua hasta 1500°C con capacidad para 100 copelas simultáneas. Elementos de silicio-molibdeno, ventana de observación refractaria anti-radiación y consola de control separada.",
    features: [
      "Capacidad para 100 copelas simultáneas (6A, 7A, 7AS)",
      "Temperatura máxima de 1500°C con elementos calefactores de silicio-molibdeno (MoSi2)",
      "Ventana de observación con vidrio resistente al fuego y consola de control táctil aislada",
    ],
    imageUrl: "/productos/decent/horno-copelacion-alta-temperatura/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DE-100CF-1500",
      fullTitle: "Decent Horno de Copelación de Alta Temperatura 1500°C para 100 Copelas",
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
        { leftParameter: "Temperatura máxima nominal", leftValue: "1500 °C", rightParameter: "Capacidad de copelas", rightValue: "100 × 6A / 7A / 7AS" },
        { leftParameter: "Elemento calefactor", leftValue: "Varillas de Silicio-Molibdeno (MoSi2)", rightParameter: "Sensor de temperatura", rightValue: "Termopar de Platino-Rodio Tipo S" },
        { leftParameter: "Dimensiones de mufla (WxDxH)", leftValue: "485 × 575 × 295 mm", rightParameter: "Dimensiones del horno (WxDxH)", rightValue: "1440 × 1635 × 2000 mm" },
        { leftParameter: "Alimentación eléctrica", leftValue: "600V Trifásico, 60Hz", rightParameter: "Potencia de entrada / Calefacción", rightValue: "25 kW / 19 kW nominal" },
        { leftParameter: "Corriente de entrada / Calefacción", leftValue: "31.4 A / 245 A nominal", rightParameter: "Dimensiones del transformador", rightValue: "1200 × 600 × 1300 mm" },
        { leftParameter: "Apertura de puerta", leftValue: "Neumática vertical con pedal (0.4–0.5 MPa)", rightParameter: "Ventana de inspección", rightValue: "Vidrio refractario anti-radiación térmica" },
        { leftParameter: "Consola de control", leftValue: "Pantalla táctil + Voltímetro, Amperímetro, Temporizador", rightParameter: "Construcción de chasis", rightValue: "Acero 2 mm cortado con láser y esmalte azul" },
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
    tags: ["Decent", "DE-100CF-1500", "Alta Temperatura", "1500C", "Silicio Molibdeno", "MoSi2", "Cupelación", "Fire Assay", "Minería"],
    relatedProducts: ["decent-hornos-cupelacion", "decent-hornos-fusion-ensayo-fuego", "decent-mezclador-crisoles", "decent-copelas-magnesio"],
  },
  {
    id: "decent-hornos-fusion-ensayo-fuego",
    slug: "decent-hornos-fusion-ensayo-fuego",
    name: "Hornos de Fusión para Ensayo de Fuego DE20FF / DE25FF",
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
      fullTitle: "Decent Hornos de Fusión para Ensayo de Fuego DE-20FF / DE-25FF",
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
        { leftParameter: "Modelos disponibles", leftValue: "DE-20FF (Mufla No. 6) y DE-25FF (Mufla No. 7)", rightParameter: "Temperatura máxima nominal", rightValue: "1200 °C" },
        { leftParameter: "Capacidad DE-20FF", leftValue: "20× 50/65g o 30× 30/40/55g crisoles", rightParameter: "Capacidad DE-25FF", rightValue: "25× 50/65g o 42× 30/40/55g crisoles" },
        { leftParameter: "Área de trabajo DE-20FF", leftValue: "560 × 480 × 190 mm", rightParameter: "Área de trabajo DE-25FF", rightValue: "560 × 590 × 195 mm" },
        { leftParameter: "Elemento calefactor", leftValue: "12 piezas de Carburo de Silicio (SiC)", rightParameter: "Transformador eléctrico", rightValue: "3 fases, 20 kVA (DE-20FF) / 30 kVA (DE-25FF)" },
        { leftParameter: "Presión neumática recomendada", leftValue: "0.4 – 0.5 MPa (Compresor de aire)", rightParameter: "Potencia eléctrica", rightValue: "11–20 kW (DE-20FF) / 16–25 kW (DE-25FF)" },
        { leftParameter: "Sensor de temperatura", leftValue: "Termopar Tipo K con control automático", rightParameter: "Construcción exterior", rightValue: "Acero galvanizado 2 mm con pintura electrostática" },
        { leftParameter: "Dimensiones DE-20FF (WxDxH)", leftValue: "1210 × 975 × 1660 mm (Cerrado)", rightParameter: "Dimensiones DE-25FF (WxDxH)", rightValue: "1260 × 1000 × 1686 mm (Cerrado)" },
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
    tags: ["Decent", "DE20FF", "DE25FF", "Hornos de Fusión", "Crisoles", "Fusión", "Fire Assay", "Ensayo al fuego", "Minería"],
    relatedProducts: ["decent-hornos-cupelacion", "decent-mezclador-crisoles", "decent-cargador-electrico-crisoles", "decent-copelas-magnesio"],
  },
  {
    id: "decent-mezclador-crisoles",
    slug: "decent-mezclador-crisoles",
    name: "Mezclador de Crisoles y Flux DPT25 / DPT50 / DPT84",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Automatización", "Minería"],
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
        { leftParameter: "Modelos disponibles", leftValue: "DPT25 (25 pcs), DPT50 (50 pcs) y DPT84 (84 pcs)", rightParameter: "Crisoles compatibles", rightValue: "40g, 50g y 55g (todos los modelos)" },
        { leftParameter: "Tiempo de configuración", leftValue: "Programable hasta 60 minutos (Control PLC)", rightParameter: "Velocidad de rotación", rightValue: "Ajustable hasta 60 rpm (Inversión bidireccional)" },
        { leftParameter: "Alimentación eléctrica", leftValue: "380V Trifásico, 50 Hz", rightParameter: "Potencia nominal", rightValue: "2.5 kW (DPT25 / DPT50) / 3.0 kW (DPT84)" },
        { leftParameter: "Presión neumática requerida", leftValue: "0.4 – 0.5 MPa (Compuerta neumática)", rightParameter: "Tipo de control", rightValue: "Sistema PLC para operación automática" },
        { leftParameter: "Dimensiones DPT25 (LxHxD)", leftValue: "1650 × 1230 × 1105 mm (Laboratorios compactos)", rightParameter: "Dimensiones DPT50 (LxHxD)", rightValue: "1695 × 1130 × 1235 mm (Capacidad media)" },
        { leftParameter: "Dimensiones DPT84 (LxHxD)", leftValue: "2600 × 1270 × 1250 mm (Alto volumen)", rightParameter: "Compatibilidad", rightValue: "Sistemas multipuerto, multiload y hornos de fusión" },
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
    tags: ["Decent", "DPT25", "DPT50", "DPT84", "Crucible Tumbler", "Mezclador", "Flux", "Fire Assay", "Minería"],
    relatedProducts: ["decent-molino-pulverizador-dp1000", "decent-hornos-fusion-ensayo-fuego", "decent-hornos-cupelacion", "decent-dosificador-automatico-litargirio"],
  },
  {
    id: "decent-molino-pulverizador-dp1000",
    slug: "decent-molino-pulverizador-dp1000",
    name: "Molino Pulverizador de Laboratorio DP1000",
    category: "Fire Assay",
    filters: ["Marcas", "Fire Assay", "Preparación de muestras", "Minería"],
    description:
      "Molino pulverizador de laboratorio de alto rendimiento para preparación de muestras minerales y metalúrgicas. Reduce tamaños de alimentación de hasta 20 mm a una finura del 95% < 75 µm en 3 minutos, con capacidad de 40g a 1600g y tazones de 50cc a 2000cc.",
    features: [
      "Molienda fina de alta velocidad: 95% < 75 µm en solo 3 minutos",
      "Capacidad por lote de 40g a 1600g y tazones de 125cc, 300cc, 400cc, 800cc, 1000cc y 2000cc",
      "Bloqueo de seguridad de tapa con retardo, parada de emergencia y sujeción manual rápida",
    ],
    imageUrl: "/productos/decent/molino-pulverizador-dp1000/Imagen Portada.png",
    detail: {
      brand: "Decent",
      model: "DP1000",
      fullTitle: "Decent Molino Pulverizador de Laboratorio DP1000 para Muestras Minerales",
      subtitle:
        "Molino pulverizador de alta potencia con accionamiento por masas excéntricas para reducción ultrafina y homogénea de muestras minerales, ferroaleaciones, cerámicas, suelos y agregados geológicos.",
      highlights: [
        "Finura de molienda del 95% pasando malla de 75 micrones (< 75 µm) en 3 minutos",
        "Rango de carga de 40 g a 1600 g con tazones en acero estándar, acero cromado y carburo de tungsteno",
        "Gabinete insonorizado libre de polvo con interruptor de seguridad de tapa y parada de emergencia",
      ],
      advantages: [
        "Molienda ultra-rápida y representativa: movimiento circular horizontal por masas excéntricas que asegura una pulverización homogénea sin pérdida de volátiles ni contaminación cruzada.",
        "Seguridad operacional total: interruptor de enclavamiento que impide el arranque con tapa abierta y retardo temporal que bloquea la apertura hasta la detención total del motor.",
        "Sujeción manual ergonómica y rápida: abrazadera de presión que fija el recipiente con firmeza y evita cualquier aflojamiento durante la marcha vibratoria.",
        "Versatilidad de recipientes: compatible con tazones de 125cc, 300cc, 400cc, 800cc, 1000cc y 2000cc en tres calidades de material refractario y metalúrgico.",
      ],
      technicalParameters: [
        { leftParameter: "Modelo", leftValue: "DP1000", rightParameter: "Capacidad de molienda por lote", rightValue: "40 g a 1600 g (óptimo 40g–800g)" },
        { leftParameter: "Tamaño de alimentación", leftValue: "≤ 20 mm máximo", rightParameter: "Finura de salida", rightValue: "95% < 75 µm en 3 minutos" },
        { leftParameter: "Tazones compatibles", leftValue: "125cc, 300cc, 400cc, 800cc, 1000cc y 2000cc", rightParameter: "Materiales de tazón", rightValue: "Acero estándar, Acero cromado, Carburo de tungsteno" },
        { leftParameter: "Potencia del motor", leftValue: "2.2 kW de alto torque", rightParameter: "Alimentación eléctrica", rightValue: "380–415V Trifásico, 50 Hz" },
        { leftParameter: "Temporizador digital", leftValue: "Ajustable de 1 segundo a 99 horas", rightParameter: "Requisitos de aire comprimido", rightValue: "500 a 600 kPa (Flujo máx. 1 L/min)" },
        { leftParameter: "Sistemas de seguridad", leftValue: "Bloqueo de tapa con retardo y parada de emergencia", rightParameter: "Gabinete exterior", rightValue: "Insonorizado con junta de goma anti-polvo" },
        { leftParameter: "Dimensiones del equipo (LxHxW)", leftValue: "1050 × 1250 × 725 mm", rightParameter: "Peso neto", rightValue: "360 kg (Construcción robusta anti-vibración)" },
      ],
      detailBlocks: [
        {
          title: "Capacidades y Gama de Tazones de Molienda",
          tone: "blue",
          items: [
            "Tazón 125 cc: Para micro-muestras y ensayos preliminares de laboratorio geológico.",
            "Tazones 300 cc y 400 cc: Capacidad media estándar para ensayos de rutina de minerales y concentrados.",
            "Tazón 800 cc: Para lotes ampliados de minerales y testigos de perforación.",
            "Tazones 1000 cc y 2000 cc: Máxima capacidad de molienda de hasta 1600 g para preparación masiva.",
            "Opciones de aleación: Acero al carbono estándar, acero cromado de alta resistencia y carburo de tungsteno para evitar contaminación por hierro.",
          ],
        },
        {
          title: "Seguridad, Control y Ergonomía",
          tone: "yellow",
          items: [
            "Interruptor de seguridad de bloqueo de tapa que impide el encendido si la máquina no está totalmente cerrada.",
            "Retardo de tiempo de seguridad que bloquea la apertura de la cámara hasta que el cabezal se haya detenido al 100%.",
            "Pulsador de parada de emergencia frontal para detención instantánea ante cualquier anomalía.",
            "Abrazadera de presión manual rápida: diseño que no se afloja por vibraciones y asegura cambio ágil de tazón.",
            "Panel frontal desmontable para mantenimiento preventivo y limpieza rápida sin herramientas especiales.",
          ],
        },
        {
          title: "Campos de Aplicación y Compatibilidad",
          tone: "green",
          items: [
            "Menas y minerales: Molienda previa a ensayo al fuego, copelación, fluorescencia de rayos X (XRF) y absorción atómica (AAS).",
            "Ferroaleaciones y muestras metalúrgicas: Reducción de escorias, concentrados y productos de fundición.",
            "Cerámicas, suelos y agregados: Análisis granulométrico y geoquímico.",
            "Productos químicos y compuestos industriales de alta dureza.",
            "Opcional: Dispositivo de elevación neumático Bowl Jack para manipulación ergonómica de tazones pesados.",
          ],
        },
      ],
    },
    tags: ["Decent", "DP1000", "Molino Pulverizador", "Molienda", "Tazón", "Carburo de Tungsteno", "Preparación de muestras", "Fire Assay", "Minería"],
    relatedProducts: ["decent-mezclador-crisoles", "decent-hornos-fusion-ensayo-fuego", "decent-hornos-cupelacion", "decent-copelas-magnesio"],
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
    if (id.startsWith("te-instruments") || id.startsWith("xplorer")) return "te instruments";
    if (id.startsWith("restek")) return "restek";
    return "";
  };

  const currentBrand = getBrand(currentProduct);
  const explicitRelated = currentProduct.relatedProducts ?? [];

  // Pool de candidatos excluyendo el producto actual
  const pool = mockProducts.filter(
    (item) => (item.slug ?? item.id) !== currentId
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
    if (explicitRelated.includes(item.id) || explicitRelated.includes(itemKey)) {
      add(item);
    }
  });

  // 2. Productos de la MISMA MARCA de la misma categoría o línea técnica
  pool.forEach((item) => {
    const itemBrand = getBrand(item);
    if (currentBrand && itemBrand === currentBrand && item.category === currentProduct.category) {
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
