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
  | "Minería"
  | "Purificadores de agua";

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
  "Minería",
  "Purificadores de agua",
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
    relatedProducts: ["hanon-k1160", "hanon-k9860", "hanon-k9840"],
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
];

export function getProductBySlug(slug: string) {
  return mockProducts.find((product) => (product.slug ?? product.id) === slug);
}
