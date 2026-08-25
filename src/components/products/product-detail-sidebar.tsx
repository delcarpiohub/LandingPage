"use client";

import { useState, useMemo } from "react";
import {
  CaretDoubleUp,
  CaretDown,
  CaretRight,
  ArrowRight,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import Link from "next/link";

import { company } from "@/content/site";
import {
  mockProducts,
  productFilters,
  type ProductCategory,
} from "@/lib/mock-products";
import { cn } from "@/lib/utils";

const BRAND_FILTERS = ["Hanon", "Milestone", "Restek", "Infitek", "Distek", "Trace Elemental", "Decent"] as const;

export function ProductDetailSidebar({
  categories: _categories,
  currentCategory,
}: {
  categories?: ProductCategory[];
  currentCategory?: string;
}) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Marcas: false,
    ...(currentCategory ? { [currentCategory]: true } : {}),
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const categoryProductsMap = useMemo(() => {
    const map: Record<string, typeof mockProducts> = {};
    for (const filter of productFilters) {
      if (filter === "Marcas") continue;
      map[filter] = mockProducts.filter(
        (p) => p.category === filter || (p.filters as string[] | undefined)?.includes(filter)
      );
    }
    return map;
  }, []);

  return (
    <aside
      className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px] shadow-sm lg:sticky lg:top-32"
      aria-label="Navegación de categorías de productos"
    >
      <div className="border-b border-[#D4DFDC] bg-white px-5 py-4 flex items-center justify-between">
        <h2 className="font-display text-[15px] font-extrabold text-[#101820]">
          Categorías de producto
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-[#D4DFDC]">
        {/* Ir al catálogo completo */}
        <Link
          href="/productos"
          className="flex w-full items-center justify-between px-5 py-3.5 text-left text-[13.5px] font-bold text-[#4A5560] bg-white hover:bg-[#F8F9FA] hover:text-[#101820] transition-colors"
        >
          <span>Ver catálogo completo</span>
          <span className="text-[11px] font-normal text-[#707E83]">({mockProducts.length})</span>
        </Link>

        {/* Categorías desplegables */}
        {productFilters.map((category) => {
          const isOpen = Boolean(openCategories[category]);
          const isMarcas = category === "Marcas";
          const categoryProducts = isMarcas ? [] : categoryProductsMap[category] ?? [];

          return (
            <div key={category} className="flex flex-col bg-white">
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left text-[13.5px] font-bold text-[#101820] hover:bg-[#F8F9FA] transition-colors"
              >
                <span className="flex items-center gap-2">
                  {category}
                  {!isMarcas && categoryProducts.length > 0 && (
                    <span className="text-[11px] font-normal text-[#707E83]">
                      ({categoryProducts.length})
                    </span>
                  )}
                </span>
                <CaretDown
                  size={15}
                  weight="bold"
                  className={cn(
                    "text-[#4A5560] transition-transform duration-200 shrink-0",
                    isOpen && "rotate-180 text-[#101820]"
                  )}
                />
              </button>

              {/* Sub-items desplegables */}
              {isOpen && (
                <div className="bg-[#F8F9FA] border-t border-[#D4DFDC] px-4 py-3 flex flex-col gap-1 text-[13px]">
                  {isMarcas ? (
                    BRAND_FILTERS.map((brand) => {
                      const brandCount = mockProducts.filter(
                        (p) =>
                          p.detail?.brand === brand ||
                          (p.filters as string[] | undefined)?.includes(brand)
                      ).length;
                      return (
                        <Link
                          key={brand}
                          href={`/productos?filtro=${encodeURIComponent(brand)}`}
                          className="flex items-center justify-between rounded-[4px] px-3 py-2 text-left font-medium text-[#4A5560] transition-colors hover:bg-white hover:text-[#101820]"
                        >
                          <span>{brand}</span>
                          <span className="text-[11px] text-[#707E83]">({brandCount})</span>
                        </Link>
                      );
                    })
                  ) : (
                    <>
                      <Link
                        href={`/productos?filtro=${encodeURIComponent(category)}`}
                        className="flex items-center justify-between rounded-[4px] px-3 py-2 text-left font-bold text-[12px] uppercase tracking-wider text-[#101820] bg-white border border-[#D4DFDC] hover:bg-[#F8F9FA] transition-colors mb-1"
                      >
                        <span>Ver todo {category}</span>
                        <CaretRight size={14} weight="bold" />
                      </Link>

                      {categoryProducts.length > 0 ? (
                        categoryProducts.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/productos/${prod.slug ?? prod.id}`}
                            className="group flex items-center justify-between gap-2 rounded-[4px] px-3 py-2 text-left text-[12.5px] font-medium text-[#4A5560] transition-colors hover:bg-white hover:text-[#101820]"
                          >
                            <span className="line-clamp-1 group-hover:font-semibold">
                              {prod.detail?.model
                                ? `${prod.detail.brand} ${prod.detail.model}`
                                : prod.name}
                            </span>
                            <ArrowRight
                              size={13}
                              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#101820]"
                            />
                          </Link>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-[12px] italic text-[#707E83]">
                          Equipos bajo consulta directa
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export function ProductQuickRail() {
  return (
    <div
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col bg-[#D6532B] xl:flex"
      aria-label="Accesos rápidos"
    >
      <a
        href={`mailto:${company.email}`}
        aria-label="Enviar correo"
        className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        <EnvelopeSimple size={18} weight="bold" />
      </a>
      <a
        href="#main-content"
        aria-label="Volver al inicio de la ficha"
        className="flex h-11 w-11 items-center justify-center border-t border-white/20 text-white transition-colors hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        <CaretDoubleUp size={18} weight="bold" />
      </a>
    </div>
  );
}
