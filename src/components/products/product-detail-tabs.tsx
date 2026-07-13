"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Define Tab Type for Hanon Special Products
type HanonTabId = "especificaciones" | "cumplimiento" | "aplicaciones" | "soporte" | "consumibles" | "video";
// Define Default Tab Type
type DefaultTabId = "detalle" | "parametros" | "descargas";

const CONSUMIBLES_BY_SLUG: Record<string, { name: string; description: string; image: string }[]> = {
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
  ]
};

export function ProductDetailTabs({
  slug,
  summaryItems,
}: {
  slug: string;
  summaryItems: string[];
}) {
  const isK1160 = slug === "hanon-k1160";
  const isHanonSpecial = slug.startsWith("hanon-");

  // State hooks for both tab sets
  const [activeHanonTab, setActiveHanonTab] = useState<HanonTabId>("especificaciones");
  const [activeDefaultTab, setActiveDefaultTab] = useState<DefaultTabId>("detalle");

  if (isHanonSpecial) {
    const hasConsumibles = ["hanon-k9860", "hanon-k9840", "hanon-sox606", "hanon-sh220f", "hanon-sh420f", "hanon-k1100f", "hanon-sh520", "hanon-s402"].includes(slug);
    const hanonTabs: { id: HanonTabId; label: string }[] = [
      { id: "especificaciones", label: "Especificaciones" },
      { id: "cumplimiento", label: "Cumplimiento" },
      { id: "aplicaciones", label: "Aplicaciones" },
      { id: "soporte", label: "Soporte Del Carpio" },
    ];
    if (hasConsumibles) {
      hanonTabs.push({ id: "consumibles", label: "Consumibles Relacionados" });
    }
    if (slug === "hanon-sox606" || slug === "hanon-sh420f" || slug === "hanon-k1100f") {
      hanonTabs.push({ id: "video", label: "Video Relacionado" });
    }

    return (
      <section className="pb-14 md:pb-20">
        <div className="border border-[#D4DFDC] bg-white rounded-[4px] overflow-hidden">
          {/* Tablist */}
          <div
            role="tablist"
            aria-label="Información del producto Hanon"
            className={cn(
              "grid border-b border-[#D4DFDC] bg-[#F4F4F4]",
              slug === "hanon-sox606" || slug === "hanon-sh420f" || slug === "hanon-k1100f"
                ? "grid-cols-2 md:grid-cols-6"
                : hasConsumibles
                ? "grid-cols-2 md:grid-cols-5"
                : "grid-cols-2 md:grid-cols-4"
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
                    "border-b border-[#D4DFDC] px-4 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.12em] transition-colors md:border-b-0 md:border-r md:last:border-r-0",
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
                    Especificaciones Técnicas {slug.replace("hanon-", "").toUpperCase()}
                  </h3>
                  <div className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
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
                  <div className="border border-[#D4DFDC] p-5 bg-[#F4F4F4]/50 rounded-[4px]">
                    <h4 className="font-bold text-[#101820] text-[15px] mb-2">FDA 21 CFR Part 11 & GMP</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Gestión avanzada de seguridad analítica que incluye firma electrónica, administración de cuentas de usuario multi-nivel, asignación de privilegios de seguridad, registro de auditoría completo (audit trail), políticas de vencimiento de contraseñas y protección contra la edición de datos brutos.
                    </p>
                  </div>
                  <div className="border border-[#D4DFDC] p-5 bg-[#F4F4F4]/50 rounded-[4px]">
                    <h4 className="font-bold text-[#101820] text-[15px] mb-2">Sensor de Alta Precisión y Repetibilidad</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Detección y calibración en tiempo real que cumple estrictamente con los estándares internacionales definidos por la AOAC, ISO, EPA y la Farmacopea Americana (USP).
                    </p>
                  </div>
                  <div className="border border-[#D4DFDC] p-5 bg-[#F4F4F4]/50 rounded-[4px]">
                    <h4 className="font-bold text-[#101820] text-[15px] mb-2">Generación y Salida de Reportes</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Formatos de reporte altamente personalizables y exportables. Conexión directa a sistemas de impresión o LIMS externos para el registro físico inalterable de los procesos.
                    </p>
                  </div>
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
                  {["Alimentos y bebidas", "Alimentación animal", "Suelos y agro", "Ambiental", "Farmacéutica", "Academia / I+D"].map((sector) => (
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
                  <p>
                    <strong>Análisis Nutricional e Industrial:</strong> Determinación exacta del contenido de analitos (proteína, nitrógeno total o grasa libre) en productos lácteos, carnes, granos y subproductos para el correcto etiquetado nutricional bajo estrictas regulaciones de inocuidad.
                  </p>
                  <p>
                    <strong>Nutrición Animal y Agricultura:</strong> Análisis cuantitativo de nitrógeno o lípidos en alimentos balanceados, forrajes, fertilizantes químicos u orgánicos y muestras de suelos para la dosificación precisa de nutrientes.
                  </p>
                  <p>
                    <strong>Control Ambiental y Farmacia:</strong> Control de calidad (QC) y monitoreo ambiental continuo analizando muestras de aguas y lodos, además de validación de materias primas en el sector farmacéutico según normativas internacionales.
                  </p>
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

            {/* 5. Consumibles relacionados */}
            {activeHanonTab === "consumibles" && hasConsumibles && (
              <div role="tabpanel" id="panel-consumibles" aria-labelledby="tab-consumibles" className="space-y-8">
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Accesorios Originales
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-6">
                    Consumibles
                  </h3>
                  
                  <div className={cn("grid gap-6", (CONSUMIBLES_BY_SLUG[slug]?.length ?? 0) === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3")}>
                    {(CONSUMIBLES_BY_SLUG[slug] ?? []).map((item, index) => (
                      <div key={index} className="border border-[#D4DFDC] rounded-[4px] overflow-hidden bg-white shadow-sm flex flex-col">
                        <div className="relative h-[200px] w-full bg-[#fcfcfc] border-b border-[#D4DFDC]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-4"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h4 className="font-bold text-[#101820] text-[15px] mb-2">{item.name}</h4>
                          <p className="text-[12.5px] leading-relaxed text-[#4A5560] flex-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. Video Relacionado */}
            {activeHanonTab === "video" && (slug === "hanon-sox606" || slug === "hanon-sh420f" || slug === "hanon-k1100f") && (
              <div role="tabpanel" id="panel-video" aria-labelledby="tab-video" className="space-y-6">
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Demostración de Operación
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    Video Relacionado
                  </h3>
                  {slug === "hanon-sh420f" || slug === "hanon-k1100f" ? (
                    <div className="border border-[#D4DFDC] bg-[#F4F4F4]/40 rounded-[6px] p-8 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[220px]">
                      <svg className="w-12 h-12 text-[#4A5560]/50 mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <h4 className="font-bold text-[#101820] text-[16px] mb-2">Video de demostración próximamente</h4>
                      <p className="text-[13px] leading-relaxed text-[#4A5560]/80">
                        El equipo de Del Carpio está preparando el video explicativo y operativo para el equipo Hanon {slug === "hanon-k1100f" ? "K1100F" : "SH420F"}. Si necesita una asesoría por videoconferencia, no dude en contactarnos.
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
