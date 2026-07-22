"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TechnicalParameterRow } from "@/lib/mock-products";
import { BrandCatalogNotice } from "@/components/products/brand-catalog-notice";

// Define Tab Type for Hanon Special Products
type HanonTabId = "especificaciones" | "cumplimiento" | "aplicaciones" | "soporte" | "accesorios" | "consumibles" | "video";
// Define Default Tab Type
type DefaultTabId = "detalle" | "parametros" | "descargas";

const CONSUMIBLES_BY_SLUG: Record<string, { name: string; description: string; image?: string }[]> = {
  "milestone-ethos-up": [
    {
      name: "Rotor MAXI-24 HP",
      description: "Rotor de 24 posiciones para trabajo rutinario de alto rendimiento con matrices y volúmenes diversos.",
      image: "/productos/milestone-ethos-up/rotor-maxi-24-hp.jpg",
    },
    {
      name: "Rotor SK-15",
      description: "Quince recipientes PTFE-TFM de 100 mL para muestras difíciles, reactivas o de gran masa a alta presión y temperatura.",
      image: "/productos/milestone-ethos-up/rotor-sk-15.jpg",
    },
    {
      name: "Rotor MAXI-44",
      description: "Cuarenta y cuatro recipientes PTFE-TFM de 100 mL para grandes lotes de suelos, sedimentos y matrices acuosas.",
      image: "/productos/milestone-ethos-up/rotor-maxi-44.jpg",
    },
    {
      name: "FastEX-24",
      description: "Configuración para extracción rápida con solventes en hasta 24 recipientes.",
      image: "/productos/milestone-ethos-up/fastex-24.png",
    },
    {
      name: "XTR-44",
      description: "Accesorio de extracción de alto rendimiento para procesar hasta 44 muestras por lote.",
      image: "/productos/milestone-ethos-up/xtr-44.png",
    },
    {
      name: "SR-15",
      description: "Rotor de 15 posiciones para procesos que requieren recipientes cerrados y control térmico reproducible.",
      image: "/productos/milestone-ethos-up/sr-15.png",
    },
    {
      name: "UltraFAST",
      description: "Accesorio para procesos rápidos de preparación y calentamiento por microondas.",
      image: "/productos/milestone-ethos-up/ultrafast.png",
    },
    {
      name: "MMR-15",
      description: "Rotor multipropósito de 15 posiciones para ampliar las aplicaciones de la plataforma ETHOS.",
      image: "/productos/milestone-ethos-up/mmr-15.png",
    },
    {
      name: "RAR-15",
      description: "Configuración rotatoria de 15 posiciones para aplicaciones específicas de preparación de muestras.",
      image: "/productos/milestone-ethos-up/rar-15.png",
    },
  ],
  "hanon-k9860": [
    {
      name: "Depósito de ácido estándar",
      description: "Compatible con K1100F y K9860, K1160. Diseñado específicamente para el almacenamiento seguro y la dosificación precisa de la solución ácida de valoración estándar.",
      image: "/productos/hanon-k9860/consumible-1.webp"
    },
    {
      name: "Tubo de digestión",
      description: "Compatible con los equipos Kjeldahl K9860, K9840 y K1100F, K1160. Utilizado para los procesos de digestión húmeda y destilación de muestras con sello hermético.",
      image: "/productos/hanon-k9860/consumible-2.webp"
    },
    {
      name: "Cabezal de destilación",
      description: "Compatible con K1100F, K9860 y K9840, K1160. Altamente resistente a ácidos, álcalis fuertes y altas temperaturas. Conecta y sella la unión con el tubo de digestión.",
      image: "/productos/hanon-k9860/consumible-3.webp"
    }
  ],
  "hanon-k9840": [
    {
      name: "Depósito de solución",
      description: "Compatible con el modelo K9840; utilizado para almacenar ácido bórico, solución alcalina y agua destilada. (Incluye tapa, tubo de conexión, base de apoyo, depósito de 3L y etiqueta).",
      image: "/productos/hanon-k9840/consumible-1.webp"
    },
    {
      name: "Sellado anticorrosión del depósito de solución",
      description: "Compatible con el modelo K9840; se utiliza para el sellado del depósito de solución.",
      image: "/productos/hanon-k9840/consumible-2.webp"
    },
    {
      name: "Tanque de 3 Litros",
      description: "Compatible con K9840; depósito resistente a la corrosión y a la presión, apto para uso universal con agua, ácido bórico y soluciones alcalinas.",
      image: "/productos/hanon-k9840/consumible-3.webp"
    },
    {
      name: "Cabezal de destilación",
      description: "Compatible con K1100F/K9860/K9840; resistente a ácidos y álcalis fuertes y a altas temperaturas; conecta y sella el sistema con el tubo de digestión.",
      image: "/productos/hanon-k9840/consumible-4.webp"
    }
  ],
  "hanon-sox606": [
    {
      name: "Vaso de extracción de vidrio (Borosilicato)",
      description: "Vaso de borosilicato de alta resistencia térmica y química, ideal para los ciclos estándar de extracción Soxhlet.",
      image: "/productos/hanon-sox606/consumible-2.png"
    },
    {
      name: "Vaso de extracción de aluminio (Metálico)",
      description: "Vaso metálico de alta conductividad para acelerar los ciclos de extracción en caliente y evaporación de solventes.",
      image: "/productos/hanon-sox606/consumible-1.jpg"
    }
  ],
  "hanon-sh220f": [
    {
      name: "Tubo de sellado",
      description: "Compatible con la campana de recolección de gases residuales WD03.",
      image: "/productos/hanon-sh220f/consumible-1.webp"
    }
  ],
  "hanon-sh420f": [
    {
      name: "Tubo de digestión de borosilicato",
      description: "Compatible con los equipos Kjeldahl K9860, K9840 y K1160, SH220F, SH420F. Utilizado para la digestión y destilación de muestras con alta resistencia térmica.",
      image: "/productos/hanon-sh420f/consumible-1.webp"
    },
    {
      name: "Tubo de sellado",
      description: "Tubo de sellado especial compatible con la campana de recolección de gases residuales WD03 y colectores de vapores ácidos.",
      image: "/productos/hanon-sh420f/consumible-2.webp"
    }
  ],
  "hanon-k1100f": [
    {
      name: "Tubo de digestión de borosilicato",
      description: "Compatible con los equipos Kjeldahl K9860, K9840 y K1100F, así como con sus tubos de digestión; se utiliza para la digestión y destilación de muestras.",
      image: "/productos/hanon-k1100f/consumible-2.webp"
    },
    {
      name: "Cabezal de destilación",
      description: "Compatible con K1100F, K9860 y K9840; resistente a ácidos y álcalis fuertes y a altas temperaturas; se utiliza para conectar y sellar la unión entre el sistema de destilación y el tubo de digestión.",
      image: "/productos/hanon-k1100f/consumible-3.webp"
    },
    {
      name: "Depósito de ácido estándar",
      description: "Compatible con K1100F/K9860; para el almacenamiento de la solución ácida de valoración.",
      image: "/productos/hanon-k1100f/consumible-1.webp"
    }
  ],
  "hanon-sh520": [
    {
      name: "Tubo de digestión de borosilicato",
      description: "Compatible con los digestores de la serie SH de Hanon (SH220F, SH420F, SH508 y SH520). Fabricado con borosilicato de alta resistencia térmica para digestiones seguras.",
      image: "/productos/hanon-sh420f/consumible-1.webp"
    },
    {
      name: "Tubo de sellado",
      description: "Tubo de sellado especial compatible con la campana de recolección de gases residuales WD03 y neutralizadores de vapores ácidos.",
      image: "/productos/hanon-sh420f/consumible-2.webp"
    }
  ],
  "hanon-d50-d200": [
    {
      name: "Tubo de combustión y reducción",
      description: "Tubos reutilizables hasta 1,000 veces. Los consumibles reducen los óxidos de nitrógeno y absorben el exceso de oxígeno.",
      image: "/productos/hanon-d50-d200/consumible.png"
    }
  ],
  "hanon-e500": [
    { name: "Crisol de cerámica", description: "Porcelana al 95% · LBJ-E500-005" },
    { name: "Lanza de oxígeno", description: "Tubo de corindón · LBJ-E500-373" },
    { name: "Tubo de combustión", description: "Cuarzo · LBJ-E500-003" },
    { name: "Tubo reductor", description: "Cuarzo · LBJ-E500-092" },
    { name: "Tubo de soporte", description: "Cuarzo · LBJ-E500-375" },
    { name: "Varilla de soporte", description: "Cuarzo · LBJ-E500-374" },
    { name: "Conjunto de tubo de secado", description: "Referencia ZPT-E500-032" },
    { name: "Bolas de alúmina de alta pureza", description: "50 g por botella" },
    { name: "Alambre de cobre", description: "100 g por botella" },
    { name: "Lana de cuarzo de alta pureza", description: "100 g por caja" },
    { name: "Trióxido de tungsteno (WO₃)", description: "60 g por botella" },
    { name: "Ácido benzoico", description: "5 g por frasco" },
    { name: "Alambre de plata", description: "50 g por paquete" },
    { name: "Desecante", description: "454 g por botella" },
    { name: "Fieltro de grafito", description: "Ø25 × 10 mm · 10 unidades por paquete" },
    { name: "Negro de humo", description: "80 g por botella" },
    { name: "Sulfanilamida", description: "10 g por botella" },
    { name: "Papel de aluminio", description: "400 unidades por caja · 35 × 35 mm" },
    { name: "Barcos de hojalata", description: "500 unidades por paquete · 6 × 6 × 12 mm" },
    { name: "Barcos de plata", description: "114 unidades por caja · 6 × 6 × 12 mm" },
    { name: "Caja de muestra", description: "24 pocillos · PS · D100" }
  ]
};

const ACCESSORIES_BY_SLUG: Record<string, { name: string; description: string; image: string }[]> = {
  "infitek-wb-series": [
    {
      name: "Bandeja perforada con asas",
      description: "Accesorio metálico perforado incluido en el material proporcionado para el modelo WB-1R2H-7.",
      image: "/productos/infitek/wb-series/accesorio-1.png",
    },
    {
      name: "Cable de alimentación",
      description: "Cable de alimentación mostrado en la documentación visual suministrada con el producto.",
      image: "/productos/infitek/wb-series/accesorio-2.png",
    },
    {
      name: "Juego de aros reductores",
      description: "Conjunto de aros de distintos diámetros para la cubierta superior del baño de agua.",
      image: "/productos/infitek/wb-series/accesorio-3.png",
    },
  ],
};

export function ProductDetailTabs({
  slug,
  summaryItems,
  productName,
  technicalParameters,
}: {
  slug: string;
  summaryItems: string[];
  productName: string;
  technicalParameters: TechnicalParameterRow[];
}) {
  const isK1160 = slug === "hanon-k1160";
  const isMilestoneEthos = slug === "milestone-ethos-up";
  const isTechnicalProduct = slug.startsWith("hanon-") || isMilestoneEthos || slug.startsWith("infitek-");

  // State hooks for both tab sets
  const [activeHanonTab, setActiveHanonTab] = useState<HanonTabId>("especificaciones");
  const [activeDefaultTab, setActiveDefaultTab] = useState<DefaultTabId>("detalle");

  if (isTechnicalProduct) {
    const hasConsumibles = ["hanon-k9860", "hanon-k9840", "hanon-sox606", "hanon-sh220f", "hanon-sh420f", "hanon-k1100f", "hanon-sh520", "hanon-s402", "hanon-sox406", "hanon-f800", "hanon-d50-d200", "hanon-e500", "milestone-ethos-up"].includes(slug);
    const hasAccessories = Boolean(ACCESSORIES_BY_SLUG[slug]?.length);
    const usesStructuredParameters = ["infitek-wb-series", "infitek-pr5-series", "infitek-titr-50vc"].includes(slug);
    const hanonTabs: { id: HanonTabId; label: string }[] = [
      { id: "especificaciones", label: "Especificaciones" },
      { id: "cumplimiento", label: "Cumplimiento" },
      { id: "aplicaciones", label: "Aplicaciones" },
      { id: "soporte", label: "Soporte Del Carpio" },
    ];
    if (hasAccessories) {
      hanonTabs.push({ id: "accesorios", label: "Accesorios" });
    }
    if (hasConsumibles) {
      hanonTabs.push({ id: "consumibles", label: isMilestoneEthos ? "Rotores y accesorios" : "Consumibles Relacionados" });
    }
    if (slug === "hanon-sox606" || slug === "hanon-sh420f" || slug === "hanon-k1100f" || slug === "hanon-sox406" || slug === "hanon-f800") {
      hanonTabs.push({ id: "video", label: "Video Relacionado" });
    }
    const tabGridClass = hanonTabs.length >= 6
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      : hanonTabs.length === 5
        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        : "grid-cols-2 md:grid-cols-4";

    return (
      <section className="pb-14 md:pb-20">
        <div className="border border-[#D4DFDC] bg-white rounded-[4px] overflow-hidden">
          {/* Tablist */}
          <div
            role="tablist"
            aria-label={`Información del producto ${productName}`}
            className={cn(
              "grid border-b border-[#D4DFDC] bg-[#F4F4F4]",
              tabGridClass,
              "border-t-0"
            )}
          >
            {hanonTabs.map((tab) => {
              const isActive = activeHanonTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveHanonTab(tab.id)}
                  className={cn(
                    "border-b border-[#D4DFDC] px-4 py-4 text-left text-[12px] font-extrabold uppercase tracking-[0.12em] transition-colors md:border-b-0 md:border-r md:last:border-r-0",
                    isActive
                      ? "bg-white text-[#D6532B]"
                      : "text-[#4A5560] hover:bg-white/70 hover:text-[#101820]",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Panels */}
          <div className="p-5 sm:p-7 md:p-9 bg-white min-h-[360px]">
            {/* 1. Especificaciones */}
            {activeHanonTab === "especificaciones" && (
              <div role="tabpanel" id="panel-especificaciones" aria-labelledby="tab-especificaciones" className="space-y-8">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-[0.16em] text-[#D6532B] mb-4">
                    Especificaciones Técnicas {slug.replace(/^(hanon|milestone|infitek)-/, "").toUpperCase()}
                  </h3>
                  <div className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
                    {usesStructuredParameters && technicalParameters.map((row, index) => (
                      <div
                        key={`${row.leftParameter}-${row.rightParameter}`}
                        className={cn(
                          "grid grid-cols-1 md:grid-cols-2",
                          index < technicalParameters.length - 1 && "border-b border-[#D4DFDC]",
                        )}
                      >
                        <SpecCell label={row.leftParameter} value={row.leftValue} />
                        <SpecCell label={row.rightParameter} value={row.rightValue} />
                      </div>
                    ))}
                    {slug === "infitek-cod-analyzer" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="(0~150)mg/L, (0~1500)mg/L" />
                          <SpecCell label="Exactitud" value="±8%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Repetibilidad" value="3%" />
                          <SpecCell label="Almacenamiento" value="200 resultados (GLP)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Comunicación" value="USB" />
                          <SpecCell label="Pantalla" value="LCD" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-bep-m300f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Modelo y Parámetros" value="BEP-M300F · pH/CE/ISE/OD/Temp. (mV/ORP/pX/Resistividad/TDS/Salinidad)" />
                          <SpecCell label="pH" value="Rango: -2,00 a 20,00 pH · Resolución: 0,1, 0,01 pH · Exactitud: ±0,01 pH" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Calibración pH" value="Hasta 5 puntos · Búferes NIST, GB y DIN · Diagnóstico automático de electrodo" />
                          <SpecCell label="mV" value="Rango: -2000,0 a 2000,0 mV · Resolución: 0,1 mV · Exactitud: ±0,3 mV o ±0,1%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="ISE" value="1E-9 a 9.999E9 (mol/L, mg/L, ppm, etc) · Resolución hasta 4 dígitos · Exactitud: ±0,5%" />
                          <SpecCell label="Conductividad" value="0,000 μS/cm a 1000 mS/cm · Exactitud: ±1,0 % FS · Reconocimiento 84, 1413, 12.88 mS/cm" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Resistividad y TDS" value="5,00 Ω·cm ~ 20,00 MΩ·cm · TDS: 0,00 ppm ~ 300 ppt" />
                          <SpecCell label="Salinidad" value="0,0 ~ 80,0 ppt · Resolución: 0,1 ppt · Exactitud: ±2 ppt" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Oxígeno Disuelto (OD)" value="0,00 a 20,00 ppm · Resolución: 0,01 ppm · Exactitud: ±0,10 ppm" />
                          <SpecCell label="Saturación OD y Calibración" value="0,0 a 200,0% · Agua saturada de aire o punto cero · Compensación barométrica" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Temperatura" value="-5 a 110 ºC (23 a 230 ºF) · Exactitud: ±0,2 ºC" />
                          <SpecCell label="Gestión de datos y GLP" value="Almacenamiento de 500 resultados con registro compatible con GLP" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Lectura y Conectividad" value="Automática, temporizada, continua · Salidas: USB (Memoria/PC), RS-232 (Impresora)" />
                          <SpecCell label="Entradas de electrodos" value="pH: BNC(Q9) · OD: Aviación 4 pines · CE: Aviación 5 pines" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Alimentación y Protección" value="Adaptador de CA 100-240 V, 9V CC · Clasificación IP54" />
                          <SpecCell label="Dimensiones y Peso" value="242 × 195 × 68 mm · 900 g" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-usc-m-series" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Modelos y Capacidades" value="De 1.3 L a 45 L (12 modelos disponibles)" />
                          <SpecCell label="Potencia Ultrasónica" value="70 W a 720 W (Ajustable 10%-100%)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Frecuencia Ultrasónica" value="40 KHz (Con barrido de frecuencia)" />
                          <SpecCell label="Potencia de Calefacción" value="100 W a 1000 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Ajuste de Temperatura" value="Predeterminado 60℃, opcional 80℃" />
                          <SpecCell label="Ajuste de Tiempo" value="1 a 99 minutos" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Material del Tanque" value="Acero inoxidable de alta calidad" />
                          <SpecCell label="Válvula de Drenaje" value="Disponible en modelos de ≥ 10 Litros" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Transductores" value="1 a 12 (dependiendo del modelo)" />
                          <SpecCell label="Pantalla" value="LCD grande con retroiluminación" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Canasta de Limpieza" value="Incluida" />
                          <SpecCell label="Asa de Transporte" value="Disponible en modelos de ≥ 3.2 Litros" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-don-h-series" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Modelos Disponibles" value="43L, 71L, 136L, 225L (Estándar y serie E)" />
                          <SpecCell label="Modo de Circulación" value="Convección natural horizontal" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de Temperatura" value="RT+10℃ ~ 250℃" />
                          <SpecCell label="Fluctuación / Resolución" value="±1℃ / 0.1℃" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Uniformidad" value="±3.5%" />
                          <SpecCell label="Controlador y Sensor" value="PID / PT100" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Temporizador" value="0 ~ 9999 minutos" />
                          <SpecCell label="Pantalla" value="LED Digital" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Material Interno" value="Acero inoxidable / Chapa galvanizada (Serie E)" />
                          <SpecCell label="Estantes (Estándar / Máximo)" value="2 / Hasta 25 (según capacidad)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Agujero de Escape" value="Estándar Φ35mm superior (función de agujero de prueba)" />
                          <SpecCell label="Alimentación y Consumo" value="CA 220/110V · De 1200 W a 3000 W" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-mca-series" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Modelos Disponibles" value="MCA110-10, MCA110-5, MCA110-2, MCA110-1A" />
                          <SpecCell label="Capacidad Máxima" value="110 gramos" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Legibilidad (Peso)" value="0,01 g / 0,005 g / 0,002 g / 0,001 g" />
                          <SpecCell label="Legibilidad (Humedad)" value="0,20% / 0,10% / 0,04% / 0,01%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Fuente de calor" value="Lámpara halógena-1 / Lámpara halógena-2" />
                          <SpecCell label="Rango de Temperatura" value="40℃ - 199℃ (Ajuste en pasos de 1℃)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Ajuste de Tiempo" value="1 a 99 minutos (por 10 s)" />
                          <SpecCell label="Rango de Humedad / Seco" value="0.00% - 100.00% / 100.00% - 0.00%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Pantalla y Almacenamiento" value="LCD retroiluminada / 15 memorias históricas" />
                          <SpecCell label="Calibración e Interfaz" value="Calibración externa · RS232 (estándar), USB (opcional)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Plato y Cámara" value="Plato: Ø90mm · Altura cámara: 22 mm" />
                          <SpecCell label="Alimentación y Temperatura" value="220V±15% 50Hz (400W) · Operación: 5℃-35℃" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-ph-b100bd" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Modelo y Parámetros" value="PH-B100BD · pH / mV" />
                          <SpecCell label="Rango pH" value="0,00 ~ 14,00 pH" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Resolución y Precisión pH" value="0,01 pH · ±0,05 pH" />
                          <SpecCell label="Calibración pH" value="Hasta 2 puntos (Auto/Manual)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Reconocimiento Patrones" value="Tampones NIST (pH 4.01, 7.00, 10.01)" />
                          <SpecCell label="Rango y Precisión mV" value="-1400 a 1400 mV · Resolución: 1 mV · Precisión: ±0,1 % FS" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Pantalla y Modo de Lectura" value="LCD 6.0 pulgadas con retroiluminación · Continuo" />
                          <SpecCell label="Compensación de Temperatura" value="MTC (Manual)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Conectores y Protección" value="BNC (Q9) · IP54" />
                          <SpecCell label="Apagado Automático" value="Desactivado o seleccionable (300 s a 3600 s)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Alimentación" value="Adaptador CA 230V/50Hz; Salida CC 12V/1000mA" />
                          <SpecCell label="Dimensiones y Peso" value="200 × 160 × 63 mm · 600 g" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k1160" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="0.1 mg – 240 mg N" />
                          <SpecCell label="Tiempo de análisis" value="3–8 min por muestra" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="RSD" value="≤ 0.5%" />
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Precisión de bureta" value="0.2 / 0.4 / 1.0 μL por paso (opcional)" />
                          <SpecCell label="Capacidad de muestra" value="sólidos ≤ 5 g · líquidos ≤ 20 mL" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Consumo de agua" value="0.5 L/min en destilación" />
                          <SpecCell label="Almacenamiento" value="1 millón de registros (interno) · ilimitado (PC)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Interfaces" value="USB, LAN, RS232, CAN, WiFi" />
                          <SpecCell label="Alimentación" value="220 VAC ±10%, 50/60 Hz · 2000 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="38 kg" />
                          <SpecCell label="Dimensiones" value="460 × 360 × 725 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k9860" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="0.1 – 240 mg N" />
                          <SpecCell label="Tiempo de análisis" value="5 – 10 min por muestra" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="RSD" value="≤ 0.5%" />
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Precisión de bureta" value="2.0 μL/step" />
                          <SpecCell label="Capacidad de muestra" value="Sólidos ≤ 5 g · Líquidos ≤ 20 mL" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Consumo de agua" value="1.5 L/min en destilación" />
                          <SpecCell label="Almacenamiento" value="1000 registros locales" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50/60 Hz" />
                          <SpecCell label="Potencia" value="2000 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="38 kg" />
                          <SpecCell label="Dimensiones" value="455 × 391 × 730 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k9840" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="0.1 mg – 240 mg N" />
                          <SpecCell label="Tiempo de análisis" value="3 – 6 min por muestra" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                          <SpecCell label="Capacidad de muestra" value="Sólidos ≤ 6 g · Líquidos ≤ 16 mL" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Consumo de agua" value="1.5 L/min" />
                          <SpecCell label="Modo de operación" value="Manual / Automático" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Pantalla de interfaz" value="LCD de 4.3 pulgadas" />
                          <SpecCell label="Potencia nominal" value="1300 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50/60 Hz" />
                          <SpecCell label="Calibraciones" value="Agua / Álcali / Ácido bórico" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="30 kg" />
                          <SpecCell label="Dimensiones" value="400 × 385 × 735 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sox606" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="0.1% – 100%" />
                          <SpecCell label="Rango de temperatura" value="Temp. ambiente +5°C a 300°C" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Precisión de temperatura" value="±1°C" />
                          <SpecCell label="Repetibilidad analítica" value="Error relativo ≤ 1%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Capacidad por lote" value="6 muestras simultáneas" />
                          <SpecCell label="Peso de muestra" value="0.5 g – 15 g" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Volumen de copa" value="150 mL" />
                          <SpecCell label="Recuperación de solventes" value="≥ 85%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50 Hz" />
                          <SpecCell label="Potencia consumida" value="2600 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="50 kg" />
                          <SpecCell label="Dimensiones" value="650 × 380 × 720 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sox406" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="0% – 100%" />
                          <SpecCell label="Rango de temperatura" value="Temp. ambiente +5°C a 280°C" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Precisión de temperatura" value="±1°C" />
                          <SpecCell label="Repetibilidad analítica" value="Error relativo ≤ 1%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Capacidad por lote" value="6 muestras simultáneas" />
                          <SpecCell label="Peso de muestra" value="0.5 g – 15 g (generalmente 2 g – 5 g)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Volumen de copa" value="80 mL" />
                          <SpecCell label="Recuperación de solvente" value="≥ 80%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Tiempo de extracción acortado" value="20% – 80%" />
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50/60 Hz" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Potencia nominal" value="1000 W" />
                          <SpecCell label="Peso neto" value="35 kg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Dimensiones" value="650 × 320 × 715 mm" />
                          <SpecCell label="Elevación de muestras" value="Cojinetes lineales de precisión" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-f800" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="0.1% – 100%" />
                          <SpecCell label="Capacidad por lote" value="6 muestras simultáneas" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Peso de muestra" value="0.5 g – 3 g" />
                          <SpecCell label="Precisión de repetibilidad" value="≤0.4% (fibra <10%), ≤1% (fibra >10%)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Tiempo de precalentamiento" value="10 – 12 min" />
                          <SpecCell label="Tiempo hasta ebullición" value="13 – 15 min" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Pantalla de control" value="Táctil a color de 7 pulgadas" />
                          <SpecCell label="Potencia nominal" value="2200 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50/60 Hz" />
                          <SpecCell label="Parámetros analizados" value="Fibra bruta, NDF, ADF, ADL, hemicelulosa" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Dimensiones" value="776 × 476 × 644 mm" />
                          <SpecCell label="Métodos analíticos" value="Weende (fibra bruta) y Van Soest" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-d50-d200" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de detección" value="0.1 - 500mg N" />
                          <SpecCell label="Tiempo de análisis" value="3-4 min/muestra" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Recuperación" value="≥99.5%" />
                          <SpecCell label="RSD" value="≤0.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Muestreador D200" value="1 disco x 120 / 40 posiciones" />
                          <SpecCell label="Muestreador D50" value="1 disco x 60 posiciones" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Gas portador" value="CO2 (99.999%)" />
                          <SpecCell label="Pureza O2" value="99.999%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220V AC ±10% 50Hz" />
                          <SpecCell label="Potencia nominal" value="2000W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="80 kg" />
                          <SpecCell label="Dimensiones" value="735 × 560 × 560 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-e500" && (
                      <>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Elementos determinados" value="Carbono, hidrógeno, nitrógeno, azufre y oxígeno (C/H/N/S/O)" />
                          <SpecCell label="Muestreador automático" value="Bandeja giratoria de 120 posiciones, introducción por crisol y sustitución de cenizas in situ" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Separación de gases" value="Tecnología específica de adsorción-desorción" />
                          <SpecCell label="Combustión y reducción" value="Horno de fibra de aluminosilicato hasta 1400 °C; zona estable > 200 mm, desviación < 10 °C" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Tiempo de análisis" value="Aproximadamente 3-4 min por elemento, según muestra, modo y configuración" />
                          <SpecCell label="Tamaño de muestra" value="Máx. 1,5 g para sólidos o 1 mL para líquidos" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Rango dinámico C / H / N" value="C: 0-30 mg · H: 0-4 mg · N: 0-10 mg; cada elemento 0-100%" />
                          <SpecCell label="Rango dinámico S / O" value="S: 0-5 mg · O: 0-3 mg; cada elemento 0-100%" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Repetibilidad" value="Desviación estándar < 0,1% con estándar de sulfadiazina de 10 mg" />
                          <SpecCell label="Límite de detección" value="C/H/N/S < 30 ppm mediante TCD · O < 20 ppm mediante NDIR" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Detectores" value="TCD de alta sensibilidad para C/H/N/S · NDIR selectivo para oxígeno" />
                          <SpecCell label="Gases de trabajo" value="Helio portador 99,999% · Oxígeno de combustión 99,999%" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Alimentación" value="220 VCA ±10%, 50 Hz" />
                          <SpecCell label="Sistema e interfaces" value="Windows 7 o posterior · USB o RS232 · transmisión inalámbrica desde balanza" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Condiciones ambientales" value="15-30 °C · Humedad relativa ≤ 85%" />
                          <SpecCell label="Dimensiones y peso" value="735 × 560 × 1160 mm · 100 kg, incluido muestreador" />
                        </div>
                      </>
                    )}
                    {isMilestoneEthos && (
                      <>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Tecnología principal" value="Digestión por microondas en recipientes cerrados y plataforma multipropósito" />
                          <SpecCell label="Control térmico" value="easyTEMP directo sin contacto y monitoreo infrarrojo de todos los recipientes" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Construcción y seguridad" value="Cavidad de acero inoxidable, puerta sensible a la presión y escape de vapores ácidos" />
                          <SpecCell label="Supervisión de cavidad" value="SafeVIEW en las configuraciones Up y Plus" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Rotor MAXI-24 HP" value="24 posiciones para alto rendimiento y matrices o volúmenes diversos" />
                          <SpecCell label="Rotor SK-15" value="15 recipientes PTFE-TFM de 100 mL para alta presión y temperatura" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Rotor MAXI-44" value="44 recipientes PTFE-TFM de 100 mL para grandes lotes de muestras" />
                          <SpecCell label="Tecnología de recipientes" value="PTFE de alta pureza, escudos PEEK y ventilación con resellado" />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Software" value="easyCONTROL 3 con biblioteca de métodos, control en tiempo real y documentación de cada ejecución" />
                          <SpecCell label="Terminales" value={'Easy 5" · Up 6,5" · Plus 10,1"'} />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell label="Integridad de datos" value="Compatibilidad FDA 21 CFR Parte 11 en las tres configuraciones" />
                          <SpecCell label="Conectividad" value="USB y Milestone Connect; conexión a balanza en Up y Plus" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Cualificación disponible" value="Paquete de validación Milestone con DQ, IQ y OQ" />
                          <SpecCell label="Asistencia inteligente" value="MAIA en terminal Plus y mediante Milestone Connect" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sh220f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Capacidad de muestras" value="20 tubos en simultáneo" />
                          <SpecCell label="Capacidad de tubos" value="300 mL cada uno" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de temperatura" value="Temp. ambiente +5°C a 450°C" />
                          <SpecCell label="Precisión de control" value="±1°C" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Tecnología de control" value="PID con rampa programable" />
                          <SpecCell label="Programas integrados" value="10 curvas de digestión" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Etapas por curva" value="Hasta 5 etapas / rampas" />
                          <SpecCell label="Material del bloque" value="Grafito tratado antioxidación" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50 Hz" />
                          <SpecCell label="Potencia nominal" value="3600 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="25 kg" />
                          <SpecCell label="Dimensiones" value="515 × 421 × 211 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sh420f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Capacidad de muestras" value="20 tubos en simultáneo" />
                          <SpecCell label="Capacidad de tubos" value="300 mL cada uno" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de temperatura" value="Temp. ambiente +5°C a 450°C" />
                          <SpecCell label="Precisión de control" value="±1°C" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Método de calentamiento" value="Infrarrojo y conducción por grafito" />
                          <SpecCell label="Aislamiento térmico" value="Tecnología de ducto de aire única" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Programas de digestión" value="20 curvas guardadas" />
                          <SpecCell label="Etapas por curva" value="Hasta 5 etapas / rampas" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50/60 Hz" />
                          <SpecCell label="Potencia nominal" value="3600 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="40 kg" />
                          <SpecCell label="Dimensiones" value="515 × 458 × 730 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k1100f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de medición" value="0.1 mg – 240 mg N" />
                          <SpecCell label="Tiempo de análisis" value="3 – 8 min por muestra" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="RSD · repetibilidad" value="≤ 0.5%" />
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Precisión de bureta" value="1.0 μL por paso" />
                          <SpecCell label="Capacidad de muestra" value="Sólidos ≤ 5 g, Líquidos ≤ 20 mL" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Consumo de agua" value="1.5 L/min" />
                          <SpecCell label="Almacenamiento" value="1800 registros" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50/60 Hz" />
                          <SpecCell label="Potencia consumida" value="2000 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="38 kg" />
                          <SpecCell label="Dimensiones" value="455 × 391 × 730 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sh520" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Rango de temperatura" value="Temp. ambiente +5°C a 450°C" />
                          <SpecCell label="Precisión de temperatura" value="±1°C" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Método de calentamiento" value="Tubo de calefacción eléctrica" />
                          <SpecCell label="Capacidad de digestión" value="20 posiciones (SH520) / 8 posiciones (SH508)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Tubos de digestión" value="300 mL (SH520) / 300 mL o 380 mL (SH508)" />
                          <SpecCell label="Dispositivo de elevación" value="Automático integrado (Yes)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Interfaces de datos" value="WIFI / USB" />
                          <SpecCell label="Alimentación eléctrica" value="AC 220 VAC ±10%, 50/60 Hz" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Potencia nominal" value="2950 W (SH520) / 1400 W (SH508)" />
                          <SpecCell label="Peso neto" value="21 kg (SH520) / 15 kg (SH508)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Dimensiones SH520" value="305 × 590 × 151 mm" />
                          <SpecCell label="Dimensiones SH508" value="328 × 440 × 151 mm" />
                        </div>
                      </>
                    )}
                    {slug === "hanon-s402" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Método de filtración" value="Ternario (Condensación, álcalis, carbón activo)" />
                          <SpecCell label="Tipo de bomba de vacío" value="Bomba anticorrosión integrada" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Presión de succión" value="Ajustable en vacío negativo" />
                          <SpecCell label="Nivel de ruido" value="Bajo nivel de ruido operacional" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Material de tuberías" value="PTFE resistente a la corrosión" />
                          <SpecCell label="Área de absorción" value="Translúcida para fácil inspección" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Alimentación eléctrica" value="220 VAC ±10%, 50/60 Hz" />
                          <SpecCell label="Compatibilidad" value="Con digestores Kjeldahl (SH420F, SH220F, etc.)" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="25 kg" />
                          <SpecCell label="Dimensiones" value="515 × 421 × 211 mm" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {slug === "hanon-e500" && (
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#4A5560]">
                      Principio y secuencia analítica
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <InfoPanel
                        title="Combustión y medición C/H/N/S"
                        text="La muestra se encapsula, pesa e introduce bajo purga de helio. A 1150 °C se transforma en CO₂, H₂O, N₂ y SO₂; los NOx se reducen a N₂, tres columnas separan los gases por adsorción-desorción y cada componente se cuantifica secuencialmente mediante TCD."
                      />
                      <InfoPanel
                        title="Pirólisis y medición de oxígeno"
                        text="La muestra se prepara en cápsula de plata y se piroliza a 1150 °C en atmósfera inerte. El oxígeno reacciona con negro de humo para formar CO, que se cuantifica mediante NDIR para calcular el contenido de oxígeno original."
                      />
                      <InfoPanel
                        title="Tratamiento automático de muestras"
                        text="La bandeja de 120 posiciones trabaja con crisoles cerámicos reutilizables. La introducción bajo gas portador aísla el aire ambiente y la sustitución de cenizas in situ permite analizar lotes continuos sin desmontar el tubo de combustión."
                      />
                      <InfoPanel
                        title="Cálculo, calibración y operación"
                        text="La estación de trabajo combina señal del detector, peso y curva de calibración para calcular cada elemento. Admite curvas lineales o no lineales, estado instrumental en tiempo real, transferencia inalámbrica desde balanza y activación programada."
                      />
                      <InfoPanel
                        title="Respaldo del desarrollo"
                        text="Hanon lanzó su primer analizador Dumas en 2015. El E500 deriva de su proyecto de innovación científica y tecnológica de Shandong y superó la evaluación oficial indicada por el fabricante."
                      />
                    </div>
                  </div>
                )}

                {isMilestoneEthos && (
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#4A5560]">
                      Configuraciones de control
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <InfoPanel
                        title="Terminal Plus"
                        text={'Pantalla de 10,1", métodos incorporados, SafeVIEW, USB, conexión a balanza, FDA 21 CFR Parte 11, Milestone Connect y asistencia MAIA.'}
                      />
                      <InfoPanel
                        title="Terminal Up"
                        text={'Pantalla de 6,5", métodos incorporados, SafeVIEW, USB, conexión a balanza, FDA 21 CFR Parte 11 y Milestone Connect.'}
                      />
                      <InfoPanel
                        title="Terminal Easy"
                        text={'Pantalla de 5", métodos incorporados, USB, FDA 21 CFR Parte 11 y Milestone Connect, sin cámara SafeVIEW ni conexión directa a balanza.'}
                      />
                    </div>
                  </div>
                )}

                {isK1160 && (
                  <div>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-[0.16em] text-[#D6532B] mb-4">
                      Autosampler K1124 (Opcional)
                    </h3>
                    <div className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                        <SpecCell label="Capacidad" value="24 muestras por lote" />
                        <SpecCell label="Estanques" value="4 × 15 L" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <SpecCell label="Interfaz / Potencia" value="CAN · 24 V DC · 40 W" />
                        <SpecCell label="Dimensiones / Peso" value="920 × 625 × 908 mm · 80 kg" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Características destacadas */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#4A5560] mb-4">
                    Características Destacadas
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {slug === "infitek-mca-series" && (
                      <>
                        <BulletItem text="Lámpara halógena que permite un calentamiento sumamente uniforme y rápido de la muestra." />
                        <BulletItem text="Sensor HBM integrado para exactitud de pesaje y medición de secado altamente confiable." />
                        <BulletItem text="Ajustes totalmente personalizables de temperatura (40°C a 199°C) y tiempo de exposición." />
                        <BulletItem text="Lectura en tiempo real del porcentaje de humedad o porcentaje de residuo seco en la pantalla LCD." />
                        <BulletItem text="Almacena hasta 15 historiales de prueba para análisis retrospectivos o control de calidad continuo." />
                      </>
                    )}
                    {slug === "infitek-wb-series" && (
                      <>
                        <BulletItem text="Controlador de temperatura inteligente con programa PID y pantalla digital LED de dos filas." />
                        <BulletItem text="Cámara interior y cubierta superior de acero inoxidable; carcasa exterior de acero laminado en frío." />
                        <BulletItem text="Rango desde temperatura ambiente +5 °C hasta 100 °C con resolución de 0,1 °C." />
                        <BulletItem text="Interruptor de drenaje eléctrico de un botón, disponible en este modelo de dos orificios." />
                        <BulletItem text="Temporizador de hasta 9999 minutos, parada automática y apagado de seguridad ante falta de agua." />
                      </>
                    )}
                    {slug === "infitek-pr5-series" && (
                      <>
                        <BulletItem text="Capacidad de 1500 L para almacenar vacunas, medicamentos, reactivos y muestras." />
                        <BulletItem text="Sistema de aire forzado libre de escarcha con distribución optimizada." />
                        <BulletItem text="Control microprocesado de 2 a 8 °C, ajuste de 0,1 °C y variación dentro de ±3 °C." />
                        <BulletItem text="Alarmas de temperatura alta/baja, error de sensor, falla eléctrica y puerta abierta." />
                        <BulletItem text="Iluminación LED interior, cerradura de seguridad y 12 estantes ajustables." />
                      </>
                    )}
                    {slug === "infitek-titr-50vc" && (
                      <>
                        <BulletItem text="Combina la valoración Volumétrica y Coulométrica en un solo instrumento." />
                        <BulletItem text="Gestor de solventes con botella de residuos de diseño antifugas y antivuelco." />
                        <BulletItem text="Gestión de usuarios en tres niveles y almacenamiento de hasta 2000 resultados compatible con GLP." />
                        <BulletItem text="Ajuste automático o manual de deriva para mantener la exactitud de la determinación." />
                        <BulletItem text="Exportación mediante memoria USB en CSV o PDF y comunicación RS-232 para impresión." />
                      </>
                    )}
                    {slug === "infitek-ph-b100bd" && (
                      <>
                        <BulletItem text="Reconocimiento automático inteligente de soluciones tampón estándar de pH (NIST: 4.01, 7.00, 10.01)." />
                        <BulletItem text="Permite usar soluciones estándar personalizadas a través de su modo de calibración manual." />
                        <BulletItem text="Función de retención (auto-hold) que detecta y bloquea el punto final de la medición." />
                        <BulletItem text="Equipado de serie con electrodo compuesto de pH E-201 (y soporte articulado en el Paquete 2)." />
                        <BulletItem text="Estructura compacta certificada con grado de protección IP54, resistente al agua y al polvo en mesón." />
                      </>
                    )}
                    {slug === "infitek-cod-analyzer" && (
                      <>
                        <BulletItem text="El equipo analiza la DQO (demanda química de oxígeno), un índice que refleja el grado de contaminación del agua." />
                        <BulletItem text="Análisis de DQO conforme a EPA 410.4 e ISO 15705:2002." />
                        <BulletItem text="2 fuentes de luz LED para diferentes rangos de pruebas." />
                        <BulletItem text="Calibración de 2 puntos." />
                      </>
                    )}
                    {slug === "infitek-bep-m300f" && (
                      <>
                        <BulletItem text="pH: Rango -2.00 a 20.00 pH. Calibración de 1 a 5 puntos con reconocimiento NIST, DIN y GB." />
                        <BulletItem text="Ion (ISE): Modos de lectura directa y adición estándar. Soporta F-, Cl-, NO3-, NH4+, Ca2+, etc." />
                        <BulletItem text="Conductividad: Compensación lineal y agua pura con calibración de 1 a 3 puntos." />
                        <BulletItem text="Oxígeno Disuelto (DO): Calibración con agua saturada de aire o cero oxígeno con compensación barométrica." />
                      </>
                    )}
                    {slug === "hanon-k1160" && (
                      <>
                        <BulletItem text="Titulación de velocidad variable en paralelo con destilación (reduce el tiempo total hasta un 30%)." />
                        <BulletItem text="Condensador metálico de alta eficiencia que reduce hasta un 50% el consumo de agua." />
                        <BulletItem text="Pantalla táctil HD de 10 pulgadas con sistema operativo Android." />
                        <BulletItem text="Monitoreo de temperatura de condensado en tiempo real para máxima seguridad." />
                        <BulletItem text="Posición de lavado separada que elimina cualquier riesgo de contaminación cruzada." />
                        <BulletItem text="Estanque interno de reactivos dimensionado para 500 análisis continuos." />
                        <BulletItem text="Entrada directa de peso experimental por conexión directa con balanzas analíticas." />
                      </>
                    )}
                    {slug === "hanon-k9860" && (
                      <>
                        <BulletItem text="Equipo automático que integra destilación y titulación colorimétrica en un solo sistema continuo." />
                        <BulletItem text="Detección en tiempo real de la temperatura del condensado con detención automática preventiva." />
                        <BulletItem text="Copa de titulación externa para una supervisión visual clara y directa del ensayo." />
                        <BulletItem text="Bomba de carga y dosificación de alta exactitud para máxima precisión analítica." />
                        <BulletItem text="Rutinas automáticas de limpieza para tubos de digestión, copa de titulación y líneas de reactivos." />
                        <BulletItem text="Evacuación segura de residuos químicos calientes para proteger al operador." />
                        <BulletItem text="Menú digital intuitivo y pantalla integrada de control experimental en tiempo real." />
                      </>
                    )}
                    {slug === "hanon-k9840" && (
                      <>
                        <BulletItem text="Dosificación automática y exacta de solución alcalina y agua de dilución." />
                        <BulletItem text="Pantalla a color de 4.3 pulgadas para configurar y monitorear el ensayo en tiempo real." />
                        <BulletItem text="Flexibilidad total de control gracias a la selección libre entre modo manual y automático." />
                        <BulletItem text="Programación flexible del tiempo de destilación con alarma audible al finalizar el ciclo." />
                        <BulletItem text="Limpieza automatizada del destilador y tuberías que previene la contaminación cruzada." />
                        <BulletItem text="Diseño inteligente de seguridad con sensores en tiempo real de puerta, tubo de digestión y flujo de agua." />
                        <BulletItem text="Operación de parada de emergencia para respuesta inmediata ante incidencias críticas." />
                      </>
                    )}
                    {slug === "hanon-sox606" && (
                      <>
                        <BulletItem text="Cinco métodos de extracción de un solo toque para máxima compatibilidad analítica." />
                        <BulletItem text="Calentamiento uniforme por bloque metálico que disminuye gradientes térmicos." />
                        <BulletItem text="Excelente tasa de recuperación de solventes ≥85% que reduce el costo operacional." />
                        <BulletItem text="Capacidad de proceso de 6 muestras en paralelo para un rendimiento optimizado." />
                        <BulletItem text="Diseño robusto con juntas de PTFE y cristalería de borosilicato resistente." />
                        <BulletItem text="Detección integrada de fugas de éter para resguardar la seguridad del analista." />
                      </>
                    )}
                    {slug === "hanon-sox406" && (
                      <>
                        <BulletItem text="Calentamiento metálico integral de alta uniformidad y control preciso de la temperatura." />
                        <BulletItem text="Circuito eléctrico aislado del espacio de extracción de vapores, maximizando la seguridad operativa." />
                        <BulletItem text="Temporizador de rampa inteligente aislado y alarmas por sobretemperatura sonora y luminosa." />
                        <BulletItem text="Pantalla LCD de 4.3 pulgadas y panel de control por microcomputador intuitivo." />
                        <BulletItem text="Sistema de conducción por cojinetes lineales para una elevación de muestras suave y cómoda." />
                        <BulletItem text="Tecnología exclusiva de aislamiento de aire que mantiene la carcasa exterior a temperatura ambiente." />
                      </>
                    )}
                    {slug === "hanon-f800" && (
                      <>
                        <BulletItem text="Estructura oculta del barril de solución para facilitar una dosificación sumamente segura." />
                        <BulletItem text="Diseño especial donde los líquidos corrosivos no tienen contacto directo con la bomba." />
                        <BulletItem text="Función de retroceso (recoil) que previene el apelmazamiento y las obstrucciones en el crisol." />
                        <BulletItem text="Protección inteligente contra desbordamiento de reactivos para resguardar al analista." />
                        <BulletItem text="Tecnología integrada de calentamiento por infrarrojos para ebullición uniforme y rápida." />
                        <BulletItem text="Ajuste térmico del crisol en tiempo real y función de precalentamiento que reduce la duración total." />
                      </>
                    )}
                    {slug === "hanon-e500" && (
                      <>
                        <BulletItem text="Determinación cuantitativa de C, H, N, S y O en muestras sólidas y líquidas dentro de una sola plataforma." />
                        <BulletItem text="Sustitución de cenizas in situ a alta temperatura que evita limpiezas manuales frecuentes y contaminación entre muestras." />
                        <BulletItem text="Muestreador automático de 120 posiciones con crisoles cerámicos reutilizables para lotes continuos." />
                        <BulletItem text="Tres columnas de adsorción física para H₂O, SO₂ y CO₂ con desorción programada y sin efecto de cola cromatográfico." />
                        <BulletItem text="TCD de alto flujo con filamento de potencia constante, calibración digital y controladores electrónicos MFC." />
                        <BulletItem text="Modo de oxígeno por pirólisis con detector NDIR selectivo para CO a 4,67 μm y 4,72 μm." />
                        <BulletItem text="Curvas de calibración lineales o no lineales, orden configurable y estado instrumental en tiempo real." />
                        <BulletItem text="Espera y activación programables, ahorro de gas portador y enfriamiento por aire retardado para proteger el horno." />
                      </>
                    )}
                    {slug === "hanon-sh220f" && (
                      <>
                        <BulletItem text="Bloque de grafito de alta pureza con tratamiento antioxidante." />
                        <BulletItem text="Controlador PID con rampa y almacenamiento de 10 programas." />
                        <BulletItem text="Aislamiento térmico exclusivo para chasis frío al tacto." />
                        <BulletItem text="Tecnología avanzada que alcanza 400°C en solo 20 minutos con precisión de ±1°C." />
                        <BulletItem text="Campana de recolección de gases WD03 compatible para captar vapores ácidos nocivos." />
                        <BulletItem text="Amplia capacidad de pre-tratamiento con soporte para 20 tubos de 300 mL." />
                      </>
                    )}
                    {slug === "hanon-sh420f" && (
                      <>
                        <BulletItem text="Calentamiento infrarrojo rápido que alcanza 400°C en tan solo 25 minutos." />
                        <BulletItem text="Bloque de grafito de alta densidad con tratamiento antioxidación de larga vida útil." />
                        <BulletItem text="Hasta 20 programas de digestión con curvas, rampas y gradientes de temperatura." />
                        <BulletItem text="Pantalla LCD a color de 5.7 pulgadas para monitoreo digital en tiempo real." />
                        <BulletItem text="Chasis con diseño anticorrosivo sellado para trabajo intensivo con ácidos." />
                        <BulletItem text="Compatible con el sistema de neutralización triple S402 y campana WD03." />
                        <BulletItem text="Múltiples protecciones: sobrecorriente, sobrecalentamiento y alertas integradas." />
                      </>
                    )}
                    {slug === "hanon-k1100f" && (
                      <>
                        <BulletItem text="Destilación, titulación, cálculo y auto-limpieza en un solo ciclo automático." />
                        <BulletItem text="Pantalla LCD táctil de 5.6 pulgadas para monitoreo del ensayo en tiempo real." />
                        <BulletItem text="Titulación simultánea colorimétrica en tiempo real mientras destila." />
                        <BulletItem text="Sistema de vapor controlado con flujo ajustable según requerimiento de muestra." />
                        <BulletItem text="Doble destilación programable que optimiza la reacción de neutralización." />
                        <BulletItem text="Alertas inteligentes ante ausencia de reactivos químicos o anomalía térmica." />
                        <BulletItem text="Drenaje automático rápido de los tubos para evitar manipulación caliente." />
                      </>
                    )}
                    {slug === "hanon-sh520" && (
                      <>
                        <BulletItem text="Operación completamente automática con sistema operativo Android integrado." />
                        <BulletItem text="Soporte de elevación automática para enfriamiento rápido del rack de tubos." />
                        <BulletItem text="Control paralelo del digestor, el elevador y el depurador S403." />
                        <BulletItem text="Módulo de calentamiento de aluminio con orificios profundos de gran eficiencia." />
                        <BulletItem text="Almacenamiento de 8 GB integrado para registrar información experimental ilimitada." />
                        <BulletItem text="Preinstalación de más de 20 métodos oficiales y 500 personalizados." />
                        <BulletItem text="Carcasa resistente con revestimiento anticorrosión de teflón de alto grado." />
                      </>
                    )}
                    {slug === "hanon-s402" && (
                      <>
                        <BulletItem text="Sistema de filtración de gases ternario: condensación, neutralización y carbón activo." />
                        <BulletItem text="Bomba de vacío anticorrosión de gran durabilidad y funcionamiento silencioso." />
                        <BulletItem text="Área de absorción translúcida para control visual del estado de filtros." />
                        <BulletItem text="Presión de succión ajustable ante vacío negativo para evitar fugas ácidas." />
                        <BulletItem text="Estructura compacta de diseño modular para optimizar espacio de mesada." />
                        <BulletItem text="Conexión de tuberías de PTFE de alta inercia frente a ataques corrosivos." />
                        <BulletItem text="Protección ambiental activa y resguardo total de la salud del operador." />
                      </>
                    )}
                    {slug === "infitek-usc-m-series" && (
                      <>
                        <BulletItem text="Amplia pantalla LCD que muestra con precisión el tiempo, la temperatura y el nivel de potencia." />
                        <BulletItem text="Función de memoria que guarda automáticamente los parámetros de la última configuración." />
                        <BulletItem text="Equipado con pasta de aislamiento acústico integrada que mantiene un nivel de ruido ultrabajo." />
                        <BulletItem text="Funciones avanzadas de desgasificación (degas) y barrido de frecuencia ultrasónica (sweep)." />
                        <BulletItem text="Modo de suspensión (sleeping mode) inteligente para maximizar el ahorro de energía eléctrica." />
                      </>
                    )}
                    {slug === "infitek-don-h-series" && (
                      <>
                        <BulletItem text="Diseño de convección natural de aire horizontal que garantiza una excelente uniformidad térmica." />
                        <BulletItem text="Alta optimización del espacio interno de la cámara de secado." />
                        <BulletItem text="Manilla de apertura antiquemaduras para la protección del operador durante el uso continuo." />
                        <BulletItem text="Equipado con controlador microprocesador PID para máxima precisión y rapidez térmica." />
                        <BulletItem text="Alarma sonora y visual de sobretemperatura incorporada como dispositivo de seguridad estándar." />
                      </>
                    )}
                    {slug === "infitek-lyo60b-series" && (
                      <>
                        <BulletItem text="Panel táctil a color de 7 pulgadas con interfaz intuitiva y ergonómica." />
                        <BulletItem text="Diseño compacto de mesa que ahorra espacio en laboratorios con huella reducida." />
                        <BulletItem text="Condensador de gran volumen en acero inoxidable sin bobinas integradas." />
                        <BulletItem text="Cámara de secado transparente que permite visualizar el proceso en tiempo real." />
                        <BulletItem text="Puerto USB para extracción directa de datos y gestión de análisis." />
                        <div className="mt-6 w-full max-w-xl border border-[#D4DFDC] rounded-[4px] p-2 bg-white shadow-sm mx-auto">
                          <Image src="/productos/infitek/lyo60b-series/infografia.png" alt="Información complementaria LYO60B" width={800} height={500} className="w-full h-auto object-contain" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-wb-series" && (
                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <figure className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
                          <div className="p-2">
                            <Image src="/productos/infitek/wb-series/infografia-1.jpg" alt="Panel de control del baño de agua Infitek WB-1R2H-7" width={800} height={500} className="w-full h-auto object-contain" />
                          </div>
                          <figcaption className="border-t border-[#D4DFDC] px-4 py-3 text-[12.5px] leading-relaxed text-[#4A5560]">
                            Panel digital del controlador PID con lectura de temperatura medida y temperatura programada.
                          </figcaption>
                        </figure>
                        <figure className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
                          <div className="p-2">
                            <Image src="/productos/infitek/wb-series/infografia-2.png" alt="Cámara interior de acero inoxidable del baño de agua Infitek WB-1R2H-7" width={800} height={500} className="w-full h-auto object-contain" />
                          </div>
                          <figcaption className="border-t border-[#D4DFDC] px-4 py-3 text-[12.5px] leading-relaxed text-[#4A5560]">
                            Cámara interior y cubierta superior de acero inoxidable correspondientes al modelo de dos orificios.
                          </figcaption>
                        </figure>
                      </div>
                    )}
                    {slug === "infitek-fmh-series" && (
                      <>
                        <BulletItem text="Puerto avanzado detector de compuestos orgánicos volátiles (VOC) con sistema de alarma dedicada." />
                        <BulletItem text="Sistema de control táctil LED exclusivo para gestionar ventilación e iluminación centralmente." />
                        <BulletItem text="Ventilador de turbina silencioso sin chispas ni estática para un flujo constante." />
                        <BulletItem text="Cristal acrílico anticorrosivo de más de 5mm con diseño de ventana abatible inverso." />
                        <BulletItem text="Mesa de trabajo sólida en resina epoxi con resistencia térmica y a impactos químicos." />
                        <div className="mt-6 w-full max-w-xl border border-[#D4DFDC] rounded-[4px] p-2 bg-white shadow-sm mx-auto">
                          <Image src="/productos/infitek/fmh-series/infografia.jpg" alt="Esquema de funcionamiento FMH Series" width={800} height={500} className="w-full h-auto object-contain" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-fmh-pa-series" && (
                      <>
                        <BulletItem text="Construcción superior e inferior totalmente en material PP Grado A de 8 mm soldado homogéneamente." />
                        <BulletItem text="Sistema interno de escape aerodinámico en tres etapas sin puntos ciegos de flujo de aire." />
                        <BulletItem text="Campana de colección superior de tipo flujo axial con canal de recogida para condensados." />
                        <BulletItem text="Ventana de vidrio templado de elevación asimétrica por poleas silenciosas balanceadas." />
                        <BulletItem text="Panel de control táctil inteligente reubicado al exterior para aislar circuitos del flujo químico." />
                      </>
                    )}
                    {isMilestoneEthos && (
                      <>
                        <BulletItem text="Plataforma multipropósito para digestión, extracción, evaporación, concentración y procesos de alta temperatura." />
                        <BulletItem text="easyTEMP mide directamente la muestra sin contacto y supervisa por infrarrojo todos los recipientes." />
                        <BulletItem text="SafeVIEW y el bloqueo térmico permiten observar la cavidad y evitan una apertura prematura." />
                        <BulletItem text="Recipientes de PTFE de alta pureza con escudos PEEK y tecnología de ventilación con resellado." />
                        <BulletItem text="Rotores de 15, 24 o 44 posiciones para adaptar presión, volumen y rendimiento al método." />
                        <BulletItem text="easyCONTROL 3 conserva parámetros y documentación de cada ejecución para asegurar trazabilidad." />
                        <BulletItem text="Milestone Connect reúne monitoreo remoto, documentos, tutoriales y soporte de aplicaciones." />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Cumplimiento */}
            {activeHanonTab === "cumplimiento" && (
              <div role="tabpanel" id="panel-cumplimiento" aria-labelledby="tab-cumplimiento" className="space-y-6 max-w-3xl">
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Garantía Normativa
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    Trazabilidad e Integridad de Datos
                  </h3>
                </div>
                <div className="grid gap-6">
                  {isMilestoneEthos ? (
                    <>
                      <InfoPanel title="FDA 21 CFR Parte 11" text="Las terminales Easy, Up y Plus admiten flujos de integridad de datos conforme a FDA 21 CFR Parte 11 mediante easyCONTROL 3." />
                      <InfoPanel title="Paquete de validación Milestone" text="La documentación de cualificación disponible contempla Design Qualification, Installation Qualification y Operational Qualification (DQ, IQ y OQ)." />
                      <InfoPanel title="Seguridad de proceso" text="SafeVIEW, la puerta sensible a la presión y el bloqueo automático hasta una temperatura segura reducen la exposición del operador durante cada ejecución." />
                    </>
                  ) : slug === "hanon-e500" ? (
                    <>
                      <InfoPanel title="FDA 21 CFR Parte 11" text="La estación de trabajo registra todas las operaciones y cambios de configuración. Su diseño contempla trazabilidad de datos y registro de auditoría conforme a los requisitos documentados por el fabricante." />
                      <InfoPanel title="Administración de usuarios" text="Permite crear usuarios sin límite y asignar tres niveles de permisos para separar operación, configuración y administración del sistema." />
                      <InfoPanel title="Integridad del proceso analítico" text="El software vincula peso de muestra, calibración, señales de detección y estado del instrumento. La repetibilidad declarada es < 0,1% con estándar de sulfadiazina de 10 mg." />
                    </>
                  ) : slug === "infitek-usc-m-series" ? (
                    <>
                      <InfoPanel title="Ahorro Energético y Seguridad" text="Cuenta con modo de suspensión automático que reduce el consumo de energía y prolonga la vida útil del equipo cuando no está en operación activa." />
                      <InfoPanel title="Control de Calidad en Limpieza" text="Su barrido de frecuencia asegura una cavitación uniforme que evita puntos ciegos, cumpliendo con exigentes normativas de limpieza de instrumental." />
                      <InfoPanel title="Durabilidad Certificada" text="El uso de acero inoxidable de primera calidad tanto en el cuerpo como en el tanque asegura gran resistencia a agentes corrosivos de limpieza." />
                    </>
                  ) : slug === "infitek-don-h-series" ? (
                    <>
                      <InfoPanel title="Seguridad Operacional Continua" text="Incluye una manilla con diseño antiquemaduras y una alarma tanto visual como sonora en caso de exceso de temperatura para proteger la muestra y al usuario." />
                      <InfoPanel title="Control Térmico PID" text="Sistema avanzado de ajuste PID que asegura que las fluctuaciones de temperatura no superen ±1°C, resguardando la integridad de las muestras térmicas." />
                      <InfoPanel title="Diseño Sostenible" text="Exterior de pulverización electrostática de acero laminado en frío, garantizando que el equipo mantenga su resistencia química e integridad estructural por años." />
                    </>
                  ) : slug === "infitek-mca-series" ? (
                    <>
                      <InfoPanel title="Control de Calidad Analítico" text="Ofrece 15 memorias históricas integradas para registrar el secado, favoreciendo auditorías y revisiones en los procesos de calidad." />
                      <InfoPanel title="Sensor Homologado HBM" text="Incorpora sensores de pesaje HBM que garantizan precisión gravimétrica absoluta durante todo el proceso de desecación." />
                      <InfoPanel title="Interfase RS232/USB" text="Exportación directa de los resultados hacia impresoras térmicas o PC, lo que permite trazar la información conforme a protocolos de análisis de laboratorio." />
                    </>
                  ) : slug === "infitek-wb-series" ? (
                    <>
                      <InfoPanel title="Control y temporización" text="El control PID, la temporización de 0 a 9999 minutos y la parada automática permiten documentar condiciones de operación repetibles." />
                      <InfoPanel title="Protección térmica" text="La documentación suministrada especifica alarma de sobretemperatura y apagado del producto cuando existe escasez de agua." />
                      <InfoPanel title="Continuidad de configuración" text="Incluye corrección de desviación, bloqueo de la tecla de menú, respaldo ante fallo de alimentación y memoria de apagado." />
                    </>
                  ) : slug === "infitek-pr5-series" ? (
                    <>
                      <InfoPanel title="Alarmas audibles y visibles" text="Notifica temperatura alta o baja, error de sensor, puerta abierta y fallo de alimentación mediante zumbador y señal luminosa." />
                      <InfoPanel title="Respaldo de alarma" text="El sistema de alarma mantiene su aviso hasta 8 horas cuando ocurre una interrupción del suministro eléctrico." />
                      <InfoPanel title="Control de acceso" text="La cerradura de seguridad integrada ayuda a restringir el acceso no autorizado al contenido almacenado." />
                    </>
                  ) : slug === "infitek-titr-50vc" ? (
                    <>
                      <InfoPanel title="Datos compatibles con GLP" text="Almacena hasta 2000 resultados de valoración volumétrica y coulométrica y permite exportarlos mediante USB o imprimirlos por RS-232." />
                      <InfoPanel title="Gestión GMP condicionada" text="Admite usuarios en tres niveles, contraseñas y registros GMP; el fabricante indica que estas funciones requieren el software GMP correspondiente." />
                      <InfoPanel title="Gestión segura de solventes" text="El gestor incorpora botella de residuos con diseño antifugas y antivuelco para reducir el contacto durante llenado, drenaje y limpieza." />
                    </>
                  ) : slug === "infitek-ph-b100bd" ? (
                    <>
                      <InfoPanel title="Certificación IP54" text="Cumple con la norma de grado de protección IP54, certificando su seguridad contra entrada de polvo y salpicaduras de líquidos en el laboratorio." />
                      <InfoPanel title="Reconocimiento Automático NIST" text="Garantiza precisión y trazabilidad del análisis a través del reconocimiento automatizado de soluciones patrón avaladas internacionalmente (NIST)." />
                      <InfoPanel title="Control de Resultados" text="Pantalla de lectura continua con retención automática (auto-hold) para documentar objetivamente y sin errores el valor de pH una vez estabilizado." />
                    </>
                  ) : slug === "infitek-cod-analyzer" ? (
                    <>
                      <InfoPanel title="EPA 410.4" text="Cumple rigurosamente con la norma de protección ambiental EPA 410.4." />
                      <InfoPanel title="ISO 15705:2002" text="Cumple con la norma internacional ISO 15705:2002 para calidad del agua." />
                      <InfoPanel title="Trazabilidad GLP" text="Gestión de datos con trazabilidad de Buenas Prácticas de Laboratorio (GLP)." />
                    </>
                  ) : slug === "infitek-bep-m300f" ? (
                    <>
                      <InfoPanel title="IP54" text="Clasificación de protección de ingreso IP54 (protección contra polvo y salpicaduras de agua)." />
                      <InfoPanel title="Tampón Estándar" text="Reconocimiento de soluciones tampón estándar bajo las normativas NIST, DIN y GB." />
                      <InfoPanel title="Trazabilidad GLP" text="Funciones de registro e informes compatibles con Buenas Prácticas de Laboratorio (GLP)." />
                    </>
                  ) : slug === "infitek-lyo60b-series" ? (
                    <>
                      <InfoPanel title="Alta Confiabilidad Térmica" text="Compresor de altísimo rendimiento con sistema en cascada que otorga eficiencia de enfriamiento superior y velocidad rápida." />
                      <InfoPanel title="Acero Inoxidable Médico" text="Tanto el condensador como el panel de operación están fabricados íntegramente en acero inoxidable resistente a la corrosión biológica." />
                      <InfoPanel title="Seguridad Visual" text="Cámara de secado acrílica de transparencia total que facilita el control visual sin apertura ni comprometer el vacío." />
                    </>
                  ) : slug === "infitek-fmh-series" ? (
                    <>
                      <InfoPanel title="Filtración Extrema 99.99%" text="Uso de filtros HEPA de altísima eficiencia que absorben vapores químicos peligrosos y los transforman en aire purificado." />
                      <InfoPanel title="Sensores de Seguridad" text="Sistema integral de protección mediante alarmas de temperatura, humedad y concentración excesiva de químicos VOC." />
                      <InfoPanel title="Recubrimiento Ecológico" text="Placas de acero recubiertas electrostáticamente con resina epóxica y capa duradera libre de plomo." />
                    </>
                  ) : slug === "infitek-fmh-pa-series" ? (
                    <>
                      <InfoPanel title="Construcción Integral PP" text="Estructuras principales inmunes a la corrosión de ácidos y álcalis, preparadas para ambientes clean-room sin esquinas metálicas." />
                      <InfoPanel title="Poleas y Bisagras Anticorrosivas" text="Componentes de rotación fabricados en polipropileno inyectado en lugar de metales oxidables." />
                      <InfoPanel title="Protección Eléctrica" text="Incluye luces protegidas con cobertores libres de contacto con el gas experimental y enchufes protegidos contra derrames." />
                    </>
                  ) : (
                    <>
                      <InfoPanel title="FDA 21 CFR Part 11 & GMP" text="Gestión avanzada de seguridad analítica que incluye firma electrónica, administración de cuentas de usuario multi-nivel, asignación de privilegios de seguridad, registro de auditoría completo, políticas de vencimiento de contraseñas y protección contra la edición de datos brutos." />
                      <InfoPanel title="Sensor de Alta Precisión y Repetibilidad" text="Detección y calibración en tiempo real que cumple con los estándares internacionales definidos por la AOAC, ISO, EPA y la Farmacopea Americana (USP)." />
                      <InfoPanel title="Generación y Salida de Reportes" text="Formatos de reporte personalizables y exportables. Conexión directa a sistemas de impresión o LIMS externos para el registro de los procesos." />
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 3. Aplicaciones */}
            {activeHanonTab === "aplicaciones" && (
              <div role="tabpanel" id="panel-aplicaciones" aria-labelledby="tab-aplicaciones" className="space-y-6 max-w-3xl">
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Campos de Uso Analítico
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    Flexibilidad Multimatriz de Alta Demanda
                  </h3>
                </div>

                {/* Chips de sectores */}
                <div className="flex flex-wrap gap-2">
                  {(isMilestoneEthos
                    ? ["Ambiental", "Alimentos y piensos", "Farmacéutica", "Geología y materiales", "Química sintética", "Academia / I+D"]
                    : slug === "hanon-e500"
                    ? ["Química", "Farmacéutica", "Monitoreo ambiental", "Agricultura", "Geología", "Minería", "Petroquímica", "Academia / I+D"]
                    : slug.startsWith("infitek-")
                    ? ["Salud Pública", "Medio Ambiente", "Calidad de Agua", "Control de Enfermedades", "Investigación Científica", "Educación Superior"]
                    : ["Alimentos y bebidas", "Alimentación animal", "Suelos y agro", "Ambiental", "Farmacéutica", "Academia / I+D"]
                  ).map((sector) => (
                    <span
                      key={sector}
                      className="px-4 py-2 border border-[#D4DFDC] bg-[#F4F4F4] text-[#4A5560] font-mono text-[10px] font-bold uppercase tracking-wider rounded-full"
                    >
                      {sector}
                    </span>
                  ))}
                </div>

                {/* Párrafos explicativos */}
                <div className="space-y-4 text-[13px] leading-relaxed text-[#4A5560] pt-2">
                  {isMilestoneEthos ? (
                    <>
                      <p><strong>Análisis ambiental:</strong> digestión de suelos, sedimentos, aguas, microplásticos y matrices asociadas a contaminantes antes de ICP-OES, ICP-MS o absorción atómica.</p>
                      <p><strong>Alimentos y piensos:</strong> preparación para análisis elemental y aplicaciones relacionadas con grasas, FAME, aminoácidos, MOAH y MOSH.</p>
                      <p><strong>Farmacéutica y materiales:</strong> procesamiento reproducible de materias primas, formulaciones, geología, materiales y muestras de química sintética.</p>
                    </>
                  ) : slug === "hanon-e500" ? (
                    <>
                      <p><strong>Química y farmacéutica:</strong> caracterización de productos químicos finos, desarrollo de materiales, investigación de nuevos fármacos y determinación de composición elemental.</p>
                      <p><strong>Monitoreo ambiental:</strong> cuantificación de C/H/N/S/O en aguas residuales, residuos sólidos, lodos y sedimentos.</p>
                      <p><strong>Agricultura y alimentos:</strong> análisis de plantas, alimentos, suelos, fertilizantes mixtos y madera.</p>
                      <p><strong>Geología, minería y petroquímica:</strong> estudio de rocas, minerales, carbón, coque, combustibles fósiles y productos petroquímicos.</p>
                    </>
                  ) : slug === "infitek-mca-series" ? (
                    <>
                      <p><strong>Laboratorios de Control de Calidad:</strong> determinación exacta de humedad en materias primas y productos terminados en la industria de alimentos y farmacéutica.</p>
                      <p><strong>Análisis de Materiales:</strong> evaluación de secado y contenido residual en químicos finos, materiales de construcción y polímeros.</p>
                      <p><strong>Educación superior e Investigación:</strong> uso generalizado para docencia e investigación científica por su fiabilidad térmica y gravimétrica.</p>
                    </>
                  ) : slug === "infitek-ph-b100bd" ? (
                    <>
                      <p><strong>Análisis biológico:</strong> medición multiparamétrica altamente versátil para silvicultura, control agrícola y análisis biológico avanzado.</p>
                      <p><strong>Control ambiental:</strong> análisis de precisión del pH en calidad de agua por organismos de protección ambiental y control de enfermedades.</p>
                      <p><strong>Educación superior:</strong> ideal para centros de investigación científica e instituciones de educación por su facilidad de uso.</p>
                    </>
                  ) : slug === "infitek-cod-analyzer" ? (
                    <>
                      <p><strong>Salud pública y control:</strong> monitoreo de enfermedades y análisis biológico.</p>
                      <p><strong>Protección del medio ambiente:</strong> evaluación precisa del grado de contaminación del agua por sustancias reductoras.</p>
                      <p><strong>Calidad de agua e investigación:</strong> análisis indispensable para laboratorios de calidad de agua e instituciones de investigación científica.</p>
                    </>
                  ) : slug === "infitek-bep-m300f" ? (
                    <>
                      <p><strong>Análisis biológico:</strong> medición multiparamétrica altamente versátil para silvicultura y análisis biológico avanzado.</p>
                      <p><strong>Control ambiental:</strong> análisis de precisión de la calidad del agua por organismos de protección ambiental y control de enfermedades.</p>
                      <p><strong>Educación superior:</strong> ideal para centros de investigación científica e instituciones de educación superior por su adaptabilidad.</p>
                    </>
                  ) : slug === "infitek-usc-m-series" ? (
                    <>
                      <p><strong>Clínica e Investigación:</strong> desgasificación y limpieza profunda de material de vidrio, instrumental médico y componentes metálicos de alta complejidad geométrica.</p>
                      <p><strong>Farmacéutica:</strong> mezcla, disolución y emulsificación de reactivos químicos y preparación de muestras mediante agitación ultrasónica.</p>
                      <p><strong>Sectores industriales:</strong> limpieza de tarjetas de circuitos, piezas de relojería, joyería, boquillas y componentes electrónicos sin fricción mecánica.</p>
                    </>
                  ) : slug === "infitek-don-h-series" ? (
                    <>
                      <p><strong>Laboratorios Químicos y Farmacéuticos:</strong> secado, esterilización por calor seco, curado y tratamiento térmico de productos e instrumentos.</p>
                      <p><strong>Industria y Minería:</strong> pruebas de envejecimiento de materiales, secado de minerales y ensayo de componentes electrónicos con altas temperaturas.</p>
                      <p><strong>Agricultura y Ciencias de la Vida:</strong> deshidratación de tejidos, secado de plantas y esterilización de utensilios en un ambiente libre de contaminación por convección forzada.</p>
                    </>
                  ) : slug === "infitek-lyo60b-series" ? (
                    <>
                      <p><strong>Clínica e Investigación:</strong> deshidratación y conservación de vacunas, anticuerpos y hemoderivados sin comprometer su integridad química y biológica.</p>
                      <p><strong>Industria Alimentaria:</strong> secado por congelación de alimentos y extractos botánicos que conservan características organolépticas originales.</p>
                      <p><strong>Enzimas y Sustancias Termolábiles:</strong> preparación delicada de compuestos sensibles al calor como hormonas, bacterias y antibióticos.</p>
                    </>
                  ) : slug === "infitek-fmh-series" ? (
                    <>
                      <p><strong>Laboratorios Universitarios y Centros de I+D:</strong> contención confiable de vapores nocivos que surgen durante docencia y experimentación con disolventes.</p>
                      <p><strong>Inspecciones Clínicas:</strong> protección para los técnicos durante la mezcla reactiva de ácidos débiles o ensayos biológicos sin requerir ductos complejos de escape.</p>
                    </>
                  ) : slug === "infitek-fmh-pa-series" ? (
                    <>
                      <p><strong>Laboratorios Químicos de Alta Severidad:</strong> digestión de metales con uso intensivo de ácidos calientes (Nítrico, Sulfúrico, Clorhídrico) que destruyen rápidamente los metales.</p>
                      <p><strong>Industria de Semiconductores:</strong> grabado químico profundo (etching) dentro de salas blancas, garantizando que ninguna partícula metálica contamine el medio.</p>
                    </>
                  ) : slug === "infitek-wb-series" ? (
                    <>
                      <p><strong>Procesos a temperatura constante:</strong> calentamiento uniforme de recipientes mediante convección natural del agua.</p>
                      <p><strong>Ciclos temporizados:</strong> operación a temperatura fija con detención automática una vez cumplido el tiempo programado.</p>
                    </>
                  ) : slug === "infitek-pr5-series" ? (
                    <>
                      <p><strong>Farmacias y centros médicos:</strong> almacenamiento refrigerado de vacunas y medicamentos entre 2 y 8 °C.</p>
                      <p><strong>Laboratorios:</strong> conservación de reactivos y muestras con circulación de aire forzado, alarma y control de acceso.</p>
                    </>
                  ) : slug === "infitek-titr-50vc" ? (
                    <>
                      <p><strong>Humedad constante o en trazas:</strong> determinación de agua mediante valoración Karl Fischer volumétrica o coulométrica.</p>
                      <p><strong>Muestras sólidas, líquidas y gaseosas:</strong> análisis directo o mediante muestreo por horno, según el método configurado.</p>
                      <p><strong>Operación documentada:</strong> gestión de métodos, sensores, titulantes, usuarios y resultados para rutinas que requieren trazabilidad.</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Análisis Nutricional e Industrial:</strong> determinación exacta del contenido de analitos en productos lácteos, carnes, granos y subproductos.</p>
                      <p><strong>Nutrición Animal y Agricultura:</strong> análisis cuantitativo en alimentos balanceados, forrajes, fertilizantes y muestras de suelos.</p>
                      <p><strong>Control Ambiental y Farmacia:</strong> control de calidad y monitoreo de matrices ambientales y materias primas farmacéuticas.</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 4. Soporte Del Carpio */}
            {activeHanonTab === "soporte" && (
              <div role="tabpanel" id="panel-soporte" aria-labelledby="tab-soporte" className="space-y-6 max-w-3xl">
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Servicios Especializados
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    Soporte técnico especializado desde el primer día.
                  </h3>
                </div>
                <div className="grid gap-6">
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">Instalación e Integración Operativa</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Ejecutamos el montaje físico y la puesta en marcha de sus nuevos equipos, verificando los parámetros críticos para asegurar un inicio de operación óptimo
                    </p>
                  </div>
                  {isMilestoneEthos && (
                    <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                      <h4 className="font-bold text-[#101820] text-[15px]">Plataforma Milestone Connect</h4>
                      <p className="text-[13px] leading-relaxed text-[#4A5560]">
                        El fabricante aporta monitoreo remoto, documentación, tutoriales y asistencia de aplicaciones; Del Carpio complementa esa plataforma con instalación, capacitación y soporte técnico local.
                      </p>
                    </div>
                  )}
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">Capacitación Técnica de Usuarios</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Instruimos en sitio a los operadores y al personal técnico a cargo del sistema, cubriendo desde los fundamentos de uso diario hasta los protocolos de seguridad indispensables.
                    </p>
                  </div>
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">Diagnóstico y Mantención Preventiva</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Evaluamos la integridad de los componentes mediante diagnósticos especializados y rutinas de mantención planificadas para prevenir desviaciones analíticas y fallas críticas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Accesorios documentados */}
            {activeHanonTab === "accesorios" && hasAccessories && (
              <div role="tabpanel" id="panel-accesorios" aria-labelledby="tab-accesorios" className="space-y-8">
                <div>
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#D6532B]">
                    Material suministrado
                  </p>
                  <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-[#101820]">
                    Accesorios documentados
                  </h3>
                  <p className="mb-6 max-w-3xl text-[13px] leading-relaxed text-[#4A5560]">
                    Estos elementos aparecen identificados visualmente en los archivos proporcionados para el WB-1R2H-7. La configuración final debe confirmarse al cotizar.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(ACCESSORIES_BY_SLUG[slug] ?? []).map((item) => (
                      <figure key={item.name} className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
                        <div className="relative h-[220px] w-full bg-[#fcfcfc] border-b border-[#D4DFDC]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                            className="object-contain p-5"
                          />
                        </div>
                        <figcaption className="p-5">
                          <h4 className="mb-2 text-[15px] font-bold text-[#101820]">{item.name}</h4>
                          <p className="text-[12.5px] leading-relaxed text-[#4A5560]">{item.description}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Consumibles relacionados */}
            {activeHanonTab === "consumibles" && hasConsumibles && (
              <div role="tabpanel" id="panel-consumibles" aria-labelledby="tab-consumibles" className="space-y-8">
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    {isMilestoneEthos ? "Plataforma configurable" : "Accesorios Originales"}
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-6">
                    {isMilestoneEthos ? "Rotores y accesorios" : "Consumibles"}
                  </h3>
                  
                  {!CONSUMIBLES_BY_SLUG[slug] || CONSUMIBLES_BY_SLUG[slug].length === 0 ? (
                    <div className="border border-[#D4DFDC] bg-[#F4F4F4]/40 rounded-[6px] p-8 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[220px]">
                      <svg className="w-12 h-12 text-[#4A5560]/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <h4 className="font-bold text-[#101820] text-[16px] mb-2">Sin consumibles críticos requeridos</h4>
                      <p className="text-[13px] leading-relaxed text-[#4A5560]/80">
                        {slug === "hanon-sox406" ? (
                          "El Analizador semi automático SOX406 no requiere de consumibles de reemplazo frecuente para su operación básica. Todos los componentes de vidrio y accesorios de soporte se incluyen en la entrega inicial del equipo. Si requiere repuestos o accesorios adicionales, por favor contáctenos."
                        ) : slug === "hanon-f800" ? (
                          "El Analizador de fibra F800 no requiere de consumibles de reemplazo frecuente para su operación básica. Todos los crisoles de filtración y accesorios de soporte se incluyen en la entrega inicial del equipo. Si requiere repuestos o accesorios adicionales, por favor contáctenos."
                        ) : (
                          "Este equipo no requiere de consumibles de reemplazo frecuente para su operación básica. Todos los componentes básicos y accesorios de soporte se incluyen en la entrega inicial del equipo. Si requiere repuestos o accesorios adicionales, por favor contáctenos."
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className={cn("grid gap-4", slug === "hanon-e500" || isMilestoneEthos ? "sm:grid-cols-2 xl:grid-cols-3" : (CONSUMIBLES_BY_SLUG[slug]?.length ?? 0) === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3")}>
                      {(CONSUMIBLES_BY_SLUG[slug] ?? []).map((item, index) => (
                        <div key={index} className="border border-[#D4DFDC] rounded-[4px] overflow-hidden bg-white flex flex-col">
                          {item.image ? (
                            <div className="relative h-[200px] w-full bg-[#fcfcfc] border-b border-[#D4DFDC]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
                                className="object-contain p-4"
                              />
                            </div>
                          ) : null}
                          <div className="p-5 flex-1 flex flex-col">
                            <h4 className="font-bold text-[#101820] text-[15px] mb-2">{item.name}</h4>
                            <p className="text-[12.5px] leading-relaxed text-[#4A5560] flex-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 6. Video Relacionado */}
            {activeHanonTab === "video" && (slug === "hanon-sox606" || slug === "hanon-sh420f" || slug === "hanon-k1100f" || slug === "hanon-sox406" || slug === "hanon-f800") && (
              <div role="tabpanel" id="panel-video" aria-labelledby="tab-video" className="space-y-6">
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Demostración de Operación
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    Video Relacionado
                  </h3>
                  {slug === "hanon-sh420f" || slug === "hanon-k1100f" || slug === "hanon-sox406" || slug === "hanon-f800" ? (
                    <div className="border border-[#D4DFDC] bg-[#F4F4F4]/40 rounded-[6px] p-8 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[220px]">
                      <svg className="w-12 h-12 text-[#4A5560]/50 mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <h4 className="font-bold text-[#101820] text-[16px] mb-2">Video de demostración próximamente</h4>
                      <p className="text-[13px] leading-relaxed text-[#4A5560]/80">
                        El equipo de Del Carpio está preparando el video explicativo y operativo para el equipo Hanon {slug === "hanon-k1100f" ? "K1100F" : slug === "hanon-sox406" ? "SOX406" : slug === "hanon-f800" ? "F800" : "SH420F"}. no dude en contactarnos.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-[14px] leading-relaxed text-[#4A5560] mb-8 max-w-2xl">
                        Vea a continuación la demostración de la operación, mantenimiento y ciclo completo del extractor automático Soxhlet Hanon SOX606 en nuestro laboratorio.
                      </p>
                      <div className="mx-auto max-w-4xl overflow-hidden rounded-[8px] border border-[#D4DFDC] bg-white shadow-lg">
                        <video
                          src="/productos/hanon-sox606/video-relacionado.mp4"
                          controls
                          playsInline
                          className="w-full aspect-video object-contain bg-white"
                          poster="/productos/hanon-sox606/imagen-7.png"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {slug.startsWith("infitek-") && (
            <BrandCatalogNotice
              brand="Infitek"
              currentProduct={productName}
            />
          )}
        </div>
      </section>
    );
  }

  // Fallback / default tabs rendering for other products
  const defaultTabs: { id: DefaultTabId; label: string }[] = [
    { id: "detalle", label: "Detalle" },
    { id: "parametros", label: "Parámetros" },
    { id: "descargas", label: "Descargas" },
  ];

  return (
    <section className="pb-14 md:pb-20">
      <div className="border border-[#D4DFDC] bg-white rounded-[4px] overflow-hidden">
        <div
          role="tablist"
          aria-label="Información del producto"
          className="grid border-b border-[#D4DFDC] bg-[#F4F4F4] sm:grid-cols-3"
        >
          {defaultTabs.map((tab) => {
            const isActive = activeDefaultTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveDefaultTab(tab.id)}
                className={cn(
                  "border-b border-[#D4DFDC] px-5 py-4 text-left text-[12px] font-extrabold uppercase tracking-[0.16em] transition-colors last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                  isActive
                    ? "bg-white text-[#D6532B]"
                    : "text-[#4A5560] hover:bg-white/70 hover:text-[#101820]",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="min-h-[340px] p-5 sm:p-7 md:p-9">
          {activeDefaultTab === "detalle" ? (
            <div
              role="tabpanel"
              id="panel-detalle"
              aria-labelledby="tab-detalle"
              className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]"
            >
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Producto
                </p>
                <h2 className="mt-4 max-w-[440px] text-3xl font-extrabold leading-tight tracking-tight text-[#101820] md:text-5xl">
                  Lo esencial para decidir.
                </h2>
              </div>

              <div className="grid gap-px overflow-hidden border border-[#D4DFDC] bg-[#D4DFDC]">
                {summaryItems.slice(0, 4).map((item) => (
                  <article key={item} className="bg-white p-5">
                    <p className="text-[14px] leading-7 text-[#4A5560]">
                      {item}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {activeDefaultTab === "parametros" ? (
            <div
              role="tabpanel"
              id="panel-parametros"
              aria-labelledby="tab-parametros"
            >
              <div className="mb-6 max-w-xl">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Datos técnicos
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101820]">
                  Parámetros clave
                </h2>
              </div>
              <p className="text-[14px] leading-relaxed text-[#4A5560]">
                Información técnica estándar de catálogo. Solicite el datasheet específico para más detalles.
              </p>
            </div>
          ) : null}

          {activeDefaultTab === "descargas" ? (
            <div
              role="tabpanel"
              id="panel-descargas"
              aria-labelledby="tab-descargas"
              className="flex min-h-[260px] flex-col justify-center"
            >
              <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                Documentación
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#101820] md:text-5xl">
                Solicitar ficha técnica completa.
              </h2>
              <p className="mt-5 max-w-[620px] text-[14px] leading-7 text-[#4A5560]">
                Para validar matriz, método, accesorios o cumplimiento normativo,
                el equipo técnico revisa el caso antes de recomendar.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// Subcomponents helper
function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[0.86fr_1.14fr] border-b border-[#D4DFDC] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="bg-[#F4F4F4] p-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#101820]">
        {label}
      </div>
      <div className="p-4 text-[13px] leading-6 text-[#4A5560]">{value}</div>
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex items-start p-3 border border-[#D4DFDC] bg-white rounded-[4px]">
      <p className="text-[13px] leading-relaxed text-[#4A5560]">{text}</p>
    </div>
  );
}

function InfoPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[4px] border border-[#D4DFDC] bg-[#F4F4F4]/50 p-5">
      <h4 className="mb-2 text-[15px] font-bold text-[#101820]">{title}</h4>
      <p className="text-[13px] leading-relaxed text-[#4A5560]">{text}</p>
    </div>
  );
}
