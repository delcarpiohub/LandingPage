export type ProductCategory = "HPLC" | "GC" | "Espectrofotometría" | "Equipamiento General";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  features: string[];
  imageUrl: string;
}

export const mockProducts: Product[] = [
  {
    id: "hplc-001",
    name: "Sistema HPLC Serie 1200 Elite",
    category: "HPLC",
    description: "Cromatógrafo de líquidos de alta resolución con bomba cuaternaria, detector DAD de alta sensibilidad y automuestreador refrigerado. Ideal para análisis farmacéuticos y de alimentos complejos.",
    features: ["Bomba Cuaternaria 600 bar", "Detector DAD (190-800 nm)", "Inyección de alta precisión"],
    imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=600&auto=format&fit=crop", // placeholder lab equipment
  },
  {
    id: "hplc-002",
    name: "UPLC Ultra-Fast Pro",
    category: "HPLC",
    description: "Sistema UPLC diseñado para maximizar el rendimiento del laboratorio. Reduce tiempos de corrida hasta en un 80% manteniendo resolución y sensibilidad excepcionales.",
    features: ["Presión máxima 1200 bar", "Detector UV-Vis dual", "Software compatible con 21 CFR Part 11"],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop", // placeholder
  },
  {
    id: "gc-001",
    name: "Cromatógrafo de Gases GC-Ultra con FID/TCD",
    category: "GC",
    description: "Sistema robusto de cromatografía de gases con detectores intercambiables. Perfecto para análisis medioambiental, control de calidad petroquímico y gases industriales.",
    features: ["Horno de calentamiento ultrarrápido", "Detectores FID y TCD incluidos", "Control de flujo electrónico (EPC)"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", // placeholder
  },
  {
    id: "gc-002",
    name: "GC-MS Sistema Acoplado Avanzado",
    category: "GC",
    description: "Plataforma GC-MS para identificación precisa de compuestos volátiles y semivolátiles con biblioteca NIST integrada y analizador cuadrupolar de alta resolución.",
    features: ["Analizador cuadrupolar de alta resolución", "Biblioteca espectral NIST", "Autosampler de espacio en cabeza (Headspace)"],
    imageUrl: "https://images.unsplash.com/photo-1574689211272-bc15e640e58e?q=80&w=600&auto=format&fit=crop", // placeholder
  },
  {
    id: "spec-001",
    name: "Espectrofotómetro UV-Vis Doble Haz",
    category: "Espectrofotometría",
    description: "Espectrofotómetro de grado analítico con sistema óptico de doble haz real para la máxima estabilidad en mediciones de absorbancia y transmitancia.",
    features: ["Rango 190-1100 nm", "Ancho de banda variable (0.5 - 4 nm)", "Software de escaneo y cinética"],
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop", // placeholder
  },
  {
    id: "eq-001",
    name: "Balanza Analítica de Precisión",
    category: "Equipamiento General",
    description: "Balanza de laboratorio con calibración interna automática, pantalla táctil e interfaces de comunicación LIMS/ERP.",
    features: ["Capacidad 220g", "Resolución 0.1 mg", "Calibración interna motorizada"],
    imageUrl: "https://images.unsplash.com/photo-1580979927702-8610ebfa3456?q=80&w=600&auto=format&fit=crop", // placeholder
  },
  {
    id: "eq-002",
    name: "Agitador Magnético con Calefacción Pro",
    category: "Equipamiento General",
    description: "Agitador magnético robusto con placa cerámica resistente a químicos, control digital de temperatura y sensor PT1000 externo.",
    features: ["Temperatura máx 380°C", "Placa cerámica anti-corrosión", "Capacidad de agitación 20L"],
    imageUrl: "https://images.unsplash.com/photo-1614935151651-0bea6508abb0?q=80&w=600&auto=format&fit=crop", // placeholder
  }
];
