"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Define Tab Type for Hanon K1160
type HanonTabId = "especificaciones" | "cumplimiento" | "aplicaciones" | "soporte";
// Define Default Tab Type
type DefaultTabId = "detalle" | "parametros" | "descargas";

export function ProductDetailTabs({
  slug,
  summaryItems,
}: {
  slug: string;
  summaryItems: string[];
}) {
  const isK1160 = slug === "hanon-k1160";

  // State hooks for both tab sets
  const [activeHanonTab, setActiveHanonTab] = useState<HanonTabId>("especificaciones");
  const [activeDefaultTab, setActiveDefaultTab] = useState<DefaultTabId>("detalle");

  if (isK1160) {
    const hanonTabs: { id: HanonTabId; label: string }[] = [
      { id: "especificaciones", label: "Especificaciones" },
      { id: "cumplimiento", label: "Cumplimiento" },
      { id: "aplicaciones", label: "Aplicaciones" },
      { id: "soporte", label: "Soporte Del Carpio" },
    ];

    return (
      <section className="pb-14 md:pb-20">
        <div className="border border-[#D4DFDC] bg-white rounded-[4px] overflow-hidden">
          {/* Tablist */}
          <div
            role="tablist"
            aria-label="Información del producto Hanon K1160"
            className="grid border-b border-[#D4DFDC] bg-[#F4F4F4] grid-cols-2 md:grid-cols-4"
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
                    "border-b border-[#D4DFDC] px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition-colors md:border-b-0 md:border-r md:last:border-r-0",
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
                    Especificaciones Técnicas K1160
                  </h3>
                  <div className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
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
                  </div>
                </div>

                {/* Subtabla Autosampler */}
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

                {/* Características destacadas */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#4A5560] mb-4">
                    Características Destacadas
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <BulletItem text="Titulación de velocidad variable en paralelo con destilación (reduce el tiempo total hasta un 30%)." />
                    <BulletItem text="Condensador metálico de alta eficiencia que reduce hasta un 50% el consumo de agua." />
                    <BulletItem text="Pantalla táctil HD de 10 pulgadas con sistema operativo Android." />
                    <BulletItem text="Monitoreo de temperatura de condensado en tiempo real para máxima seguridad." />
                    <BulletItem text="Posición de lavado separada que elimina cualquier riesgo de contaminación cruzada." />
                    <BulletItem text="Estanque interno de reactivos dimensionado para 500 análisis continuos." />
                    <BulletItem text="Entrada directa de peso experimental por conexión directa con balanzas analíticas." />
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
                    <h4 className="font-bold text-[#101820] text-[15px] mb-2">Sensor Colorimétrico RGB de Alta Resolución</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Detección y calibración óptica en tiempo real que cumple estrictamente con los estándares internacionales definidos por la AOAC, ISO, EPA y la Farmacopea Americana (USP).
                    </p>
                  </div>
                  <div className="border border-[#D4DFDC] p-5 bg-[#F4F4F4]/50 rounded-[4px]">
                    <h4 className="font-bold text-[#101820] text-[15px] mb-2">Generación y Salida de Reportes</h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Formatos de reporte en PDF altamente personalizables y exportables. Conexión directa a sistemas de impresión externos para el registro físico inalterable de los procesos.
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
                    <strong>Análisis Nutricional e Industrial:</strong> Determinación exacta del contenido proteico en productos lácteos, carnes, granos y subproductos para el correcto etiquetado nutricional bajo estrictas regulaciones de inocuidad.
                  </p>
                  <p>
                    <strong>Nutrición Animal y Agricultura:</strong> Análisis cuantitativo de nitrógeno total en alimentos balanceados, forrajes, fertilizantes químicos u orgánicos y muestras de suelos para la dosificación precisa de nutrientes.
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
