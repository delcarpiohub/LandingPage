export interface Metrica {
  valor: string;
  label: string;
}

export interface FotoDetalle {
  src: string;
  alt: string;
}

export interface Producto {
  slug: string;
  marca: string;
  nombre: string;
  resumen: string;
  metricas: Metrica[];
  fotos: {
    frontal: FotoDetalle;
    autosampler: FotoDetalle;
    sistema: FotoDetalle;
  };
}

export const productosData: Producto[] = [
  {
    slug: "hanon-k1160",
    marca: "Hanon",
    nombre: "Analizador Kjeldahl automático K1160",
    resumen: "Nitrógeno y proteína sin intervención manual: destila, titula, calcula, imprime y limpia en un solo ciclo. Operación desatendida con autosampler de 24 posiciones.",
    metricas: [
      { valor: "≥99.5%", label: "Recuperación" },
      { valor: "≤0.5%", label: "RSD · repetibilidad" },
      { valor: "3–8 min", label: "Por muestra" },
      { valor: "0.1–240", label: "mg N · rango" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-k1160/sistema.png",
        alt: "Vista en detalle del sistema de condensación y titulación colorimétrica del analizador",
      },
      autosampler: {
        src: "/productos/hanon-k1160/autosampler.webp",
        alt: "Fotografía del autosampler K1124 de 24 posiciones acoplado al analizador Kjeldahl",
      },
      sistema: {
        src: "/productos/hanon-k1160/frontal.png",
        alt: "Fotografía frontal del analizador Kjeldahl automático Hanon K1160 sobre fondo blanco",
      },
    },
  },
  {
    slug: "hanon-k9860",
    marca: "Hanon",
    nombre: "Analizador Kjeldahl automático K9860",
    resumen: "Determinación automática de nitrógeno y proteína con destilación y titulación integradas en un ciclo continuo. Alta precisión, seguridad operativa y limpieza automática.",
    metricas: [
      { valor: "≥99.5%", label: "Recuperación" },
      { valor: "≤0.5%", label: "RSD" },
      { valor: "5–10 min", label: "Por muestra" },
      { valor: "0.1–240", label: "mg N · rango" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-k9860/frontal-v3.png",
        alt: "Fotografía frontal del analizador Kjeldahl automático Hanon K9860",
      },
      autosampler: {
        src: "/productos/hanon-k9860/imagen-2.webp",
        alt: "Detalle del sistema de destilación del analizador Kjeldahl K9860",
      },
      sistema: {
        src: "/productos/hanon-k9860/imagen-3.webp",
        alt: "Detalle del sistema de titulación y dosificación del analizador Kjeldahl K9860",
      },
    },
  },
  {
    slug: "hanon-k9840",
    marca: "Hanon",
    nombre: "Analizador Kjeldahl K9840",
    resumen: "Unidad de destilación automática Kjeldahl de alta precisión para determinación rápida de nitrógeno. Dosificación precisa de reactivos y rutinas automáticas de limpieza.",
    metricas: [
      { valor: "≥99.5%", label: "Recuperación" },
      { valor: "3–6 min", label: "Por muestra" },
      { valor: "1.5 L/m", label: "Consumo de agua" },
      { valor: "0.1–240", label: "mg N · rango" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-k9840/frontal.png",
        alt: "Fotografía frontal del analizador Kjeldahl automático Hanon K9840",
      },
      autosampler: {
        src: "/productos/hanon-k9840/imagen-2.png",
        alt: "Detalle del funcionamiento del analizador Kjeldahl K9840",
      },
      sistema: {
        src: "/productos/hanon-k9840/imagen-3.webp",
        alt: "Detalle de los tanques y dosificación del analizador Kjeldahl K9840",
      },
    },
  },
  {
    slug: "hanon-sox606",
    marca: "Hanon",
    nombre: "Extractor Soxhlet automático SOX606",
    resumen: "Extractor de grasa automático Soxhlet de 6 posiciones. Rango de 0.1% a 100% con recuperación de solventes superior al 85% y calefacción de metal rápida y uniforme.",
    metricas: [
      { valor: "≥85%", label: "Recup. solvente" },
      { valor: "6", label: "Muestras por lote" },
      { valor: "≤1%", label: "Error relativo" },
      { valor: "150 mL", label: "Volumen de copa" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-sox606/imagen-7.png",
        alt: "Fotografía frontal del extractor automático Soxhlet Hanon SOX606",
      },
      autosampler: {
        src: "/productos/hanon-sox606/imagen-2.webp",
        alt: "Detalle de los vasos de extracción de solvente de la unidad Soxhlet SOX606",
      },
      sistema: {
        src: "/productos/hanon-sox606/imagen-3.webp",
        alt: "Detalle del sistema de destilación y condensación de solventes del SOX606",
      },
    },
  },
  {
    slug: "hanon-sh220f",
    marca: "Hanon",
    nombre: "Digestor Kjeldahl bloque de grafito SH220F",
    resumen: "Digestor Kjeldahl de bloque de grafito de 20 posiciones con control PID avanzado. Rango de temperatura hasta 450°C con calentamiento por rampa o curvas.",
    metricas: [
      { valor: "20", label: "Tubos por lote" },
      { valor: "450°C", label: "Temperatura máx." },
      { valor: "300 mL", label: "Capacidad de tubo" },
      { valor: "PID", label: "Control de rampa" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-sh220f/imagen-1.png",
        alt: "Fotografía frontal del digestor Kjeldahl de bloque de grafito Hanon SH220F",
      },
      autosampler: {
        src: "/productos/hanon-sh220f/imagen-3.png",
        alt: "Detalle de los tubos de digestión de borosilicato graduados del digestor SH220F",
      },
      sistema: {
        src: "/productos/hanon-sh220f/imagen-4.png",
        alt: "Vista en detalle del bloque de grafito calefactor del digestor SH220F",
      },
    },
  },
  {
    slug: "hanon-sh420f",
    marca: "Hanon",
    nombre: "Digestor Kjeldahl bloque de grafito SH420F",
    resumen: "Digestor Kjeldahl de bloque de grafito de 20 posiciones con calentamiento infrarrojo rápido y control PID. Temperatura de ambiente +5°C a 450°C para digestiones eficientes y uniformes.",
    metricas: [
      { valor: "20", label: "Tubos por lote" },
      { valor: "450°C", label: "Temperatura máx." },
      { valor: "300 mL", label: "Capacidad de tubo" },
      { valor: "3600 W", label: "Consumo de potencia" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-sh420f/imagen-1.png",
        alt: "Fotografía frontal del digestor Kjeldahl de bloque de grafito Hanon SH420F con campana recolectora",
      },
      autosampler: {
        src: "/productos/hanon-sh420f/imagen-3.webp",
        alt: "Detalle del sistema de campana recolectora de gases WD03 en el digestor SH420F",
      },
      sistema: {
        src: "/productos/hanon-sh420f/imagen-4.webp",
        alt: "Detalle del bloque de grafito y panel de control táctil LCD del digestor SH420F",
      },
    },
  },
  {
    slug: "hanon-k1100f",
    marca: "Hanon",
    nombre: "Analizador Kjeldahl automático K1100F",
    resumen: "Analizador Kjeldahl automático de nitrógeno y proteína que integra destilación, titulación colorimétrica, cálculo e impresión. Equipado con pantalla táctil de 5.6” y doble destilación programable.",
    metricas: [
      { valor: "≥99.5%", label: "Recuperación" },
      { valor: "≤0.5%", label: "RSD · repetibilidad" },
      { valor: "3–8 min", label: "Por muestra" },
      { valor: "0.1–240", label: "mg N · rango" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-k1100f/imagen-1.png",
        alt: "Vista frontal del analizador Kjeldahl automático Hanon K1100F",
      },
      autosampler: {
        src: "/productos/hanon-k1100f/imagen-2.webp",
        alt: "Detalle de las válvulas de paso y dosificación de reactivos del K1100F",
      },
      sistema: {
        src: "/productos/hanon-k1100f/imagen-3.webp",
        alt: "Detalle del cabezal de destilación y sistema de condensación del K1100F",
      },
    },
  },
  {
    slug: "hanon-sh520",
    marca: "Hanon",
    nombre: "Digestor automático Kjeldahl SH520/SH508",
    resumen: "Digestor Kjeldahl completamente automático con sistema Android y soporte de elevación integrado. Disponible en 8 o 20 posiciones con neutralización y enfriamiento automáticos.",
    metricas: [
      { valor: "+5–450°C", label: "Rango temp." },
      { valor: "±1°C", label: "Precisión" },
      { valor: "8 o 20", label: "Posiciones / tubos" },
      { valor: "2950 W", label: "Potencia máx." },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-sh520/imagen-1.png",
        alt: "Vista frontal del digestor automático Kjeldahl Hanon SH520/SH508",
      },
      autosampler: {
        src: "/productos/hanon-sh420f/imagen-3.webp",
        alt: "Detalle del sistema de campana recolectora de gases WD03 compatible con digestores SH",
      },
      sistema: {
        src: "/productos/hanon-sh420f/imagen-4.webp",
        alt: "Detalle del bloque de calentamiento de aluminio de orificios profundos",
      },
    },
  },
  {
    slug: "hanon-s402",
    marca: "Hanon",
    nombre: "Sistema de agotamiento de gases S402",
    resumen: "Sistema de agotamiento y neutralización de gases de escape de grado industrial. Cuenta con bomba de vacío anticorrosión, filtración ternaria avanzada y tuberías de PTFE de larga vida útil.",
    metricas: [
      { valor: "Ternaria", label: "Filtración" },
      { valor: "PTFE", label: "Tuberías" },
      { valor: "Ajustable", label: "Presión vacío" },
      { valor: "25 kg", label: "Peso neto" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-s402/imagen-1.png",
        alt: "Vista frontal del sistema de agotamiento de gases Hanon S402",
      },
      autosampler: {
        src: "/productos/hanon-s402/imagen-2.png",
        alt: "Detalle de los tanques de condensación y filtración del S402",
      },
      sistema: {
        src: "/productos/hanon-s402/imagen-3.png",
        alt: "Detalle del sistema de control y medidores de presión del S402",
      },
    },
  },
  {
    slug: "hanon-sox406",
    marca: "Hanon",
    nombre: "Analizador de grasa SOX406",
    resumen: "Analizador de grasa automático de 6 posiciones basado en el principio de extracción Soxhlet. Cuenta con calefacción metálica integral, temporizador aislado y recuperación automática de solventes.",
    metricas: [
      { valor: "≥80%", label: "Recup. solvente" },
      { valor: "6", label: "Muestras por lote" },
      { valor: "±1°C", label: "Precisión temp." },
      { valor: "80 mL", label: "Volumen de copa" },
    ],
    fotos: {
      frontal: {
        src: "/productos/hanon-sox406/frontal.png",
        alt: "Fotografía frontal del analizador automático de grasa Soxhlet Hanon SOX406",
      },
      autosampler: {
        src: "/productos/hanon-sox406/imagen-detail.png",
        alt: "Detalle del sistema de cojinetes lineales y copas de extracción del SOX406",
      },
      sistema: {
        src: "/productos/hanon-sox406/consumible-1.webp",
        alt: "Detalle de las copas de vidrio de borosilicato de alta resistencia química",
      },
    },
  },
];
