"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Define Tab Type for Hanon Special Products
type HanonTabId = "especificaciones" | "cumplimiento" | "aplicaciones" | "soporte" | "consumibles";
// Define Default Tab Type
type DefaultTabId = "detalle" | "parametros" | "descargas";

const CONSUMIBLES_BY_SLUG: Record<string, { name: string; description: string; image: string }[]> = {
  "hanon-k9860": [
    {
      name: "Tubo de digestión",
      description: "Compatible con los equipos Kjeldahl K9860, K9840 y K1100F. Utilizado para los procesos de digestión húmeda y destilación de muestras con sello hermético.",
      image: "/productos/hanon-k9860/consumible-1.webp"
    },
    {
      name: "Cabezal de destilación",
      description: "Compatible con K1100F, K9860 y K9840. Altamente resistente a ácidos, álcalis fuertes y altas temperaturas. Conecta y sella la unión con el tubo de digestión.",
      image: "/productos/hanon-k9860/consumible-2.webp"
    },
    {
      name: "Depósito de ácido estándar",
      description: "Compatible con K1100F y K9860. Diseñado específicamente para el almacenamiento seguro y la dosificación precisa de la solución ácida de valoración estándar.",
      image: "/productos/hanon-k9860/consumible-3.webp"
    }
  ],
  "hanon-k9840": [
    {
      name: "Sellado anticorrosión",
      description: "Compatible con el modelo K9840; se utiliza para el sellado hermético y seguro del depósito de solución.",
      image: "/productos/hanon-k9840/consumible-1.webp"
    },
    {
      name: "Tanque de 3 Litros",
      description: "Compatible con K9840; depósito resistente a la corrosión y a la presión, apto para uso universal con agua, ácido bórico y soluciones alcalinas.",
      image: "/productos/hanon-k9840/consumible-2.webp"
    },
    {
      name: "Cabezal de destilación",
      description: "Compatible con K1100F/K9860/K9840; resistente a ácidos y álcalis fuertes y a altas temperaturas; conecta y sella el sistema con el tubo de digestión.",
      image: "/productos/hanon-k9840/consumible-3.webp"
    },
    {
      name: "Tubo de destilación de repuesto",
      description: "Tubo de vidrio de borosilicato graduado de alta resistencia térmica para soporte general e intercambio rápido de muestras.",
      image: "/productos/hanon-k9840/consumible-4.webp"
    }
  ],
  "hanon-sox606": [
    {
      name: "Dedal de extracción de celulosa",
      description: "Cartuchos porosos de alta calidad para la contención segura de muestras sólidas de 0.5 a 15g durante los ciclos de extracción.",
      image: "/productos/hanon-sox606/imagen-2.webp"
    },
    {
      name: "Vaso extractor de solvente",
      description: "Copas de borosilicato de 150 mL de volumen, altamente resistentes a la temperatura y a la acción de solventes orgánicos.",
      image: "/productos/hanon-sox606/imagen-3.webp"
    },
    {
      name: "Sellos de PTFE de alta estanqueidad",
      description: "Juntas de teflón de alta calidad para asegurar el acople hermético de la cristalería y prevenir fugas de solventes volátiles.",
      image: "/productos/hanon-sox606/imagen-4.jpeg"
    }
  ],
  "hanon-sh220f": [
    {
      name: "Tubo de sellado",
      description: "Compatible con la campana de recolección de gases residuales WD03.",
      image: "/productos/hanon-sh220f/consumible-1.webp"
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
    const hasConsumibles = ["hanon-k9860", "hanon-k9840", "hanon-sox606", "hanon-sh220f"].includes(slug);
    const hanonTabs: { id: HanonTabId; label: string }[] = [
      { id: "especificaciones", label: "Especificaciones" },
      { id: "cumplimiento", label: "Cumplimiento" },
      { id: "aplicaciones", label: "Aplicaciones" },
      { id: "soporte", label: "Soporte Del Carpio" },
    ];
    if (hasConsumibles) {
      hanonTabs.push({ id: "consumibles", label: "Consumibles Relacionados" });
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
              hasConsumibles ? "grid-cols-2 md:grid-cols-5" : "grid-cols-2 md:grid-cols-4"
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
                    Ciclo de Vida Analítico Garantizado
                  </h3>
                </div>
                <div className="grid gap-6">
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">Instalación y Calificación IQ/OQ/PQ</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Procesos de calificación formal de la instrumentación analítica directamente en las instalaciones del laboratorio cliente, asegurando la óptima operación desde el primer día.
                    </p>
                  </div>
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">Servicio Técnico Local y Repuestos</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Soporte técnico directo presencial en todo Chile, stock permanente de consumibles originales y repuestos originales Hanon, respaldados por personal de ingeniería certificado.
                    </p>
                  </div>
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">Transferencia y Validación de Métodos</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Acompañamiento especializado para el desarrollo de metodologías y la validación de métodos conforme a la normativa local e internacional aplicable.
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
                    Consumibles Homologados Hanon
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
