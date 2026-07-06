"use client";

import { useState } from "react";
import { DownloadSimple } from "@phosphor-icons/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ProductDetail } from "@/lib/mock-products";
import { cn } from "@/lib/utils";

type TabId = "detalle" | "parametros" | "descargas";

const tabs: { id: TabId; label: string }[] = [
  { id: "detalle", label: "Detalle" },
  { id: "parametros", label: "Parámetros" },
  { id: "descargas", label: "Descargas" },
];

export function ProductDetailTabs({
  detail,
  summaryItems,
}: {
  detail?: ProductDetail;
  summaryItems: string[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>("detalle");

  return (
    <section className="mx-auto max-w-wide px-4 pb-14 sm:px-6 md:pb-20 lg:px-10">
      <div className="border border-[#D4DFDC] bg-white">
        <div
          role="tablist"
          aria-label="Información del producto"
          className="grid border-b border-[#D4DFDC] bg-[#F4F4F4] sm:grid-cols-3"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
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
          {activeTab === "detalle" ? (
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

          {activeTab === "parametros" && detail ? (
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

              <div className="overflow-hidden border border-[#D4DFDC]">
                {detail.technicalParameters.map((row) => (
                  <div
                    key={`${row.leftParameter}-${row.rightParameter}`}
                    className="grid border-b border-[#D4DFDC] last:border-b-0 md:grid-cols-2"
                  >
                    <SpecCell label={row.leftParameter} value={row.leftValue} />
                    <SpecCell label={row.rightParameter} value={row.rightValue} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "descargas" ? (
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

              <Button asChild className="mt-8 w-fit">
                <Link href="/contacto/ventas">
                  Solicitar ficha
                  <DownloadSimple size={17} weight="bold" />
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

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
