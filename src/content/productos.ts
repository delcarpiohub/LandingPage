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
        src: "/productos/hanon-k1160/frontal.png",
        alt: "Fotografía frontal del analizador Kjeldahl automático Hanon K1160 sobre fondo blanco",
      },
      autosampler: {
        src: "/productos/hanon-k1160/autosampler.webp",
        alt: "Fotografía del autosampler K1124 de 24 posiciones acoplado al analizador Kjeldahl",
      },
      sistema: {
        src: "/productos/hanon-k1160/sistema.webp",
        alt: "Vista en detalle del sistema de condensación y titulación colorimétrica del analizador",
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
        src: "/productos/hanon-k9860/frontal.png",
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
];
