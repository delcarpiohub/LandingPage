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

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  filters?: ProductCategory[];
  description: string;
  features: string[];
  imageUrl: string;
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
    id: "gc-001",
    name: "Cromatógrafo de Gases GC-Ultra con FID/TCD",
    category: "Cromatografía",
    filters: ["Marcas", "Cromatografía", "Minería"],
    description:
      "Sistema robusto de cromatografía de gases con detectores intercambiables. Adecuado para análisis medioambiental, control petroquímico y gases industriales.",
    features: [
      "Horno de calentamiento rápido",
      "Detectores FID y TCD incluidos",
      "Control de flujo electrónico EPC",
    ],
    imageUrl: "/productos-rotacion/equipo-1.png",
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
