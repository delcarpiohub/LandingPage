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
}

export const mockProducts: Product[] = [
  {
    id: "hplc-001",
    name: "Sistema HPLC Serie 1200 Elite",
    category: "Cromatografía",
    filters: ["Marcas", "Cromatografía", "Área farmacéutica"],
    description:
      "Cromatógrafo de líquidos de alta resolución con bomba cuaternaria, detector DAD de alta sensibilidad y automuestreador refrigerado. Ideal para análisis farmacéuticos y de alimentos complejos.",
    features: [
      "Bomba cuaternaria 600 bar",
      "Detector DAD 190-800 nm",
      "Inyección de alta precisión",
    ],
    imageUrl: "/fotos/vanquish-flex.png",
  },
  {
    id: "hplc-002",
    name: "UPLC Ultra-Fast Pro",
    category: "Cromatografía",
    filters: ["Marcas", "Cromatografía", "Automatización"],
    description:
      "Sistema UPLC diseñado para maximizar el rendimiento del laboratorio. Reduce tiempos de corrida manteniendo resolución y sensibilidad excepcionales.",
    features: [
      "Presión máxima 1200 bar",
      "Detector UV-Vis dual",
      "Software compatible con 21 CFR Part 11",
    ],
    imageUrl: "/fotos/instalacion-hplc-equipo.jpg",
  },
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
    imageUrl: "/productos/hanon-k1160/hanon-k1160-recorte.png",
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
    imageUrl: "/productos/hanon-k9860/frontal.png",
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
    id: "gc-002",
    name: "GC-MS Sistema Acoplado Avanzado",
    category: "Espectrometría de masa",
    filters: ["Marcas", "Cromatografía", "Espectrometría de masa", "Minería"],
    description:
      "Plataforma GC-MS para identificación precisa de compuestos volátiles y semivolátiles con biblioteca espectral y analizador cuadrupolar.",
    features: [
      "Analizador cuadrupolar",
      "Biblioteca espectral",
      "Autosampler de espacio en cabeza",
    ],
    imageUrl: "/productos-rotacion/equipo-2.png",
  },
  {
    id: "spec-001",
    name: "Espectrofotómetro UV-Vis Doble Haz",
    category: "Análisis elemental",
    filters: ["Marcas", "Análisis elemental", "Minería"],
    description:
      "Espectrofotómetro de grado analítico con sistema óptico de doble haz para estabilidad en mediciones de absorbancia y transmitancia.",
    features: [
      "Rango 190-1100 nm",
      "Ancho de banda variable",
      "Software de escaneo y cinética",
    ],
    imageUrl: "/productos-rotacion/equipo-3.png",
  },
  {
    id: "eq-001",
    name: "Balanza Analítica de Precisión",
    category: "Equipamiento menor",
    filters: ["Marcas", "Equipamiento menor", "Área farmacéutica"],
    description:
      "Balanza de laboratorio con calibración interna automática, pantalla táctil e interfaces de comunicación para trazabilidad documental.",
    features: [
      "Capacidad 220 g",
      "Resolución 0.1 mg",
      "Calibración interna motorizada",
    ],
    imageUrl: "/productos-rotacion/equipo-4.png",
  },
  {
    id: "eq-002",
    name: "Agitador Magnético con Calefacción Pro",
    category: "Preparación de muestras",
    filters: ["Marcas", "Preparación de muestras", "Equipamiento menor"],
    description:
      "Agitador magnético robusto con placa cerámica resistente a químicos, control digital de temperatura y sensor externo.",
    features: [
      "Temperatura máxima 380 °C",
      "Placa cerámica anti-corrosión",
      "Capacidad de agitación 20 L",
    ],
    imageUrl: "/fotos/laboratorio-frascos-procesos.jpg",
  },
];

export function getProductBySlug(slug: string) {
  return mockProducts.find((product) => (product.slug ?? product.id) === slug);
}
