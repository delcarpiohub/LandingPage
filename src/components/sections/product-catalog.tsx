"use client";

import { useMemo, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretLeft,
  CaretRight,
  CaretDown,
  FunnelSimple,
  MagnifyingGlass,
  SquaresFour,
  ListDashes,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  ProductCategory,
  mockProducts,
  productFilters,
} from "@/lib/mock-products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const ALL_FILTERS = "Todos";
const BRAND_FILTERS = ["Hanon", "Milestone", "Restek", "Infitek"] as const;
type BrandFilter = (typeof BRAND_FILTERS)[number];
type SelectedFilter = ProductCategory | typeof ALL_FILTERS | BrandFilter;

function isBrandFilter(filter: SelectedFilter): filter is BrandFilter {
  return BRAND_FILTERS.includes(filter as BrandFilter);
}

function isValidFilter(value: string): value is SelectedFilter {
  return (
    value === ALL_FILTERS ||
    BRAND_FILTERS.includes(value as BrandFilter) ||
    productFilters.includes(value as ProductCategory)
  );
}

// Valores que no se escriben en la URL por ser el estado por defecto (URLs limpias).
const PARAM_DEFAULTS: Record<string, string> = {
  q: "",
  filtro: ALL_FILTERS,
  page: "1",
  vista: "grid",
  orden: "featured",
  por_pagina: "9",
};

// Store externo minimalista sobre `window.location.search`, leído vía
// `useSyncExternalStore` (en vez de `useEffect` + `setState`) para poder
// restaurar filtro/página/búsqueda desde la URL sin: (a) desincronizar el
// HTML estático prerenderizado — `getServerSnapshot` devuelve "" — ni
// (b) disparar el error de lint `react-hooks/set-state-in-effect`.
const locationListeners = new Set<() => void>();

function subscribeToLocation(callback: () => void) {
  locationListeners.add(callback);
  window.addEventListener("popstate", callback);
  return () => {
    locationListeners.delete(callback);
    window.removeEventListener("popstate", callback);
  };
}

function getLocationSnapshot() {
  return window.location.search;
}

function getServerLocationSnapshot() {
  return "";
}

function notifyLocationChange() {
  for (const listener of locationListeners) listener();
}

export function ProductCatalog() {
  const search = useSyncExternalStore(
    subscribeToLocation,
    getLocationSnapshot,
    getServerLocationSnapshot
  );
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const searchQuery = params.get("q") ?? "";
  const selectedFilter: SelectedFilter = useMemo(() => {
    const fromUrl = params.get("filtro");
    return fromUrl && isValidFilter(fromUrl) ? fromUrl : ALL_FILTERS;
  }, [params]);
  const currentPage = useMemo(() => {
    const fromUrl = Number(params.get("page"));
    return Number.isFinite(fromUrl) && fromUrl > 0 ? fromUrl : 1;
  }, [params]);
  const viewMode: "grid" | "list" = params.get("vista") === "list" ? "list" : "grid";
  const sortBy = useMemo(() => {
    const fromUrl = params.get("orden");
    return fromUrl === "name_asc" || fromUrl === "name_desc" ? fromUrl : "featured";
  }, [params]);
  const productsPerPage = useMemo(() => {
    const fromUrl = Number(params.get("por_pagina"));
    return [9, 18, 36].includes(fromUrl) ? fromUrl : 9;
  }, [params]);

  // Refleja el estado de filtros/paginación en la URL para que "volver" desde
  // un producto restaure la misma vista (no solo el estado interno de React).
  const applyParams = (patch: Record<string, string>) => {
    const nextParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(patch)) {
      if (value === PARAM_DEFAULTS[key]) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    }
    const query = nextParams.toString();
    const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
    notifyLocationChange();
  };

  const catalogHref = search ? `/productos${search}` : "/productos";

  const filterOptions = useMemo(
    () => [
      { value: ALL_FILTERS, label: ALL_FILTERS },
      ...BRAND_FILTERS.map((brand) => ({
        value: brand,
        label: `Marcas · ${brand}`,
      })),
      ...productFilters
        .filter((filter) => filter !== "Marcas")
        .map((filter) => ({ value: filter, label: filter })),
    ] satisfies { value: SelectedFilter; label: string }[],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return mockProducts.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.description,
        product.detail?.brand ?? "",
        product.detail?.model ?? "",
        ...(product.features ?? []),
        ...(product.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);
      const matchesFilter =
        selectedFilter === ALL_FILTERS ||
        (isBrandFilter(selectedFilter)
          ? product.detail?.brand === selectedFilter
          : product.category === selectedFilter ||
            product.filters?.includes(selectedFilter));

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    if (sortBy === "name_asc") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      products.sort((a, b) => b.name.localeCompare(a.name));
    }
    return products;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / productsPerPage));
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    applyParams({ page: String(page) });
    document.getElementById("product-catalog")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="product-catalog" className="relative w-full bg-[#F8FAFC] py-12 md:py-16 lg:py-24">
      {/* Soft shadow transition from the dark banner */}
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-[#101820]/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between lg:mb-12">
            <div className="max-w-2xl">
              <h2 className="mb-3 font-display text-[28px] font-extrabold leading-tight tracking-tight text-[#4A5560] sm:text-3xl md:text-4xl">
                Explora nuestras soluciones analíticas
              </h2>
              <p className="max-w-[680px] text-[14px] leading-relaxed text-[#4A5560]/80 sm:text-[15px]">
                Filtra por familia técnica para encontrar equipos, sistemas y
                soluciones asociados a laboratorio, industria y control
                analítico.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-8">
          <Reveal delay={0.08}>
            <aside
              className="overflow-hidden border-y border-[#D4DFDC] bg-white lg:sticky lg:top-36 lg:border"
              aria-label="Filtros de productos"
            >
              <div className="hidden border-b border-[#D4DFDC] px-5 py-5 lg:block">
                <div className="flex items-center gap-3 text-[#4A5560]">
                  <FunnelSimple size={20} weight="bold" />
                  <h3 className="text-[13px] font-extrabold uppercase tracking-[0.16em]">
                    Filtros
                  </h3>
                </div>
              </div>

              <div className="flex flex-col lg:divide-y lg:divide-[#D4DFDC]">
                {/* Botón Todos */}
                <button
                  type="button"
                  onClick={() => applyParams({ filtro: ALL_FILTERS, page: "1" })}
                  className={cn(
                    "group flex shrink-0 items-center justify-between gap-3 px-5 py-4 text-left text-[14px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                    selectedFilter === ALL_FILTERS
                      ? "bg-[#4A5560] text-[#F5F5F5]"
                      : "bg-white text-[#4A5560] hover:bg-[#F7F9F8] hover:text-[#D6532B]"
                  )}
                >
                  <span>Todos</span>
                  <CaretRight
                    size={15}
                    weight="bold"
                    className={cn(
                      "shrink-0 transition-transform duration-200",
                      selectedFilter === ALL_FILTERS
                        ? "text-[#D6532B]"
                        : "text-[#707E83] group-hover:translate-x-0.5 group-hover:text-[#D6532B]"
                    )}
                  />
                </button>

                {/* Acordeón Marcas */}
                <details
                  name="filters-accordion"
                  open
                  className="group flex flex-col border-t border-[#D4DFDC] lg:border-t-0"
                >
                  <summary className="flex w-full cursor-pointer list-none items-center justify-between bg-white px-5 py-4 text-left text-[14px] font-bold text-[#101820] hover:bg-[#F7F9F8] [&::-webkit-details-marker]:hidden">
                    <span>Marcas</span>
                    <CaretRight
                      size={15}
                      weight="bold"
                      className="text-[#4A5560] transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <div className="flex flex-col pb-3 pl-4 pr-2">
                    {BRAND_FILTERS.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => applyParams({ filtro: brand, page: "1" })}
                        className={cn(
                          "group/btn flex items-center justify-between gap-3 rounded-[4px] px-4 py-2.5 text-left text-[13.5px] font-medium transition-colors duration-200",
                          selectedFilter === brand
                            ? "bg-[#4A5560]/10 font-bold text-[#D6532B]"
                            : "text-[#4A5560] hover:bg-[#F7F9F8] hover:text-[#D6532B]",
                        )}
                      >
                        <span>{brand}</span>
                      </button>
                    ))}
                  </div>
                </details>

                {/* Acordeón Categorías */}
                <details
                  name="filters-accordion"
                  className="group flex flex-col border-t border-[#D4DFDC]"
                >
                  <summary className="flex w-full cursor-pointer list-none items-center justify-between bg-white px-5 py-4 text-left text-[14px] font-bold text-[#101820] hover:bg-[#F7F9F8] [&::-webkit-details-marker]:hidden">
                    <span>Categorías</span>
                    <CaretRight
                      size={15}
                      weight="bold"
                      className="text-[#4A5560] transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <div className="flex flex-col gap-1 pb-3 pl-4 pr-2">
                    {productFilters
                      .filter((f) => f !== "Marcas")
                      .map((filter) => {
                        const isActive = selectedFilter === filter;
                        return (
                          <button
                            key={filter}
                            type="button"
                            onClick={() => applyParams({ filtro: filter, page: "1" })}
                            className={cn(
                              "group/btn flex items-center justify-between gap-3 rounded-[4px] px-4 py-2.5 text-left text-[13.5px] font-medium transition-colors duration-200",
                              isActive
                                ? "bg-[#4A5560]/10 text-[#D6532B] font-bold"
                                : "text-[#4A5560] hover:bg-[#F7F9F8] hover:text-[#D6532B]"
                            )}
                          >
                            <span>{filter}</span>
                          </button>
                        );
                      })}
                  </div>
                </details>
              </div>
            </aside>
          </Reveal>

          <motion.div className="min-h-[420px] lg:min-h-[500px]">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4 text-[13px] font-bold text-[#101820]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Search within */}
                <div className="flex w-full items-center gap-3 lg:w-auto">
                  <span className="shrink-0">Buscar en resultados :</span>
                  <div className="relative w-full lg:w-72">
                    <input
                      type="search"
                      placeholder="Buscar por equipo o modelo..."
                      value={searchQuery}
                      onChange={(event) => {
                        applyParams({ q: event.target.value, page: "1" });
                      }}
                      className="h-10 w-full rounded-[2px] border border-[#D4DFDC] bg-white pl-3 pr-8 text-[13px] font-normal text-[#4A5560] transition-all duration-200 placeholder:text-[#707E83] focus:border-[#0070c0] focus:outline-none focus:ring-1 focus:ring-[#0070c0]"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <MagnifyingGlass size={16} className="text-[#4A5560]" weight="bold" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  {/* Sort By */}
                  <div className="flex items-center gap-2">
                    <span className="shrink-0">Ordenar por :</span>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        applyParams({ orden: e.target.value, page: "1" });
                      }}
                      className="h-10 w-36 rounded-[2px] border border-[#D4DFDC] bg-white px-3 py-1 text-[13px] font-normal text-[#4A5560] focus:border-[#0070c0] focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Destacados</option>
                      <option value="name_asc">Nombre (A-Z)</option>
                      <option value="name_desc">Nombre (Z-A)</option>
                    </select>
                  </div>

                  {/* View mode toggle */}
                  <div className="flex items-center overflow-hidden rounded-[2px] border border-[#D4DFDC] bg-white">
                    <button
                      type="button"
                      onClick={() => applyParams({ vista: "grid" })}
                      className={cn("p-2 transition-colors", viewMode === "grid" ? "bg-[#0070c0] text-white" : "text-[#707E83] hover:bg-gray-50")}
                      title="Vista Cuadrícula"
                    >
                      <SquaresFour size={20} weight={viewMode === "grid" ? "fill" : "bold"} />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyParams({ vista: "list" })}
                      className={cn("p-2 transition-colors", viewMode === "list" ? "bg-[#0070c0] text-white" : "text-[#707E83] hover:bg-gray-50")}
                      title="Vista Lista"
                    >
                      <ListDashes size={20} weight={viewMode === "list" ? "fill" : "bold"} />
                    </button>
                  </div>

                  {/* Show */}
                  <div className="flex items-center gap-2">
                    <span className="shrink-0">Mostrar :</span>
                    <select
                      value={productsPerPage}
                      onChange={(e) => {
                        applyParams({ por_pagina: e.target.value, page: "1" });
                      }}
                      className="h-10 w-20 rounded-[2px] border border-[#D4DFDC] bg-white px-3 py-1 text-[13px] font-normal text-[#4A5560] focus:border-[#0070c0] focus:outline-none cursor-pointer"
                    >
                      <option value={9}>9</option>
                      <option value={18}>18</option>
                      <option value={36}>36</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[14px] font-bold text-[#101820]">
                Mostrando {sortedProducts.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0} - {Math.min(currentPage * productsPerPage, sortedProducts.length)} de {sortedProducts.length} resultados
              </div>
            </div>

            {sortedProducts.length > 0 ? (
              <motion.div
                className={cn(
                  "grid gap-5 xl:gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}
              >
                <AnimatePresence mode="wait">
                  {paginatedProducts.map((product) => (
                    <motion.article
                      initial={{ opacity: 0, scale: 0.97, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.97,
                        transition: { duration: 0.18 },
                      }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                      key={product.id}
                      className="overflow-hidden"
                    >
                      <Link
                        href={`/productos/${product.slug ?? product.id}?from=${encodeURIComponent(catalogHref)}`}
                        className={cn(
                          "group flex overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-white transition-colors duration-300 hover:border-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
                          viewMode === "grid" ? "h-full flex-col" : "flex-row items-center h-[240px]"
                        )}
                      >
                        <div className={cn(
                          "relative overflow-hidden bg-white shrink-0",
                          viewMode === "grid" ? "h-56 w-full sm:h-60 md:h-52 lg:h-56" : "h-full w-[260px] border-r border-[#D4DFDC]"
                        )}>
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className={cn(
                          "flex flex-1 flex-col",
                          viewMode === "grid" ? "p-5 sm:p-6" : "p-6 md:p-8"
                        )}>
                          <h3 className={cn(
                            "mb-2 font-extrabold leading-tight text-[#4A5560] transition-colors duration-200 group-hover:text-[#D6532B]",
                            viewMode === "grid" ? "text-[17px] sm:text-lg" : "text-xl sm:text-2xl"
                          )}>
                            {product.name}
                          </h3>
                          <p className={cn(
                            "leading-relaxed text-[#4A5560]/80",
                            viewMode === "grid" ? "mb-4 line-clamp-3 text-[13px]" : "mb-6 line-clamp-4 text-[14px]"
                          )}>
                            {product.description}
                          </p>
                          {viewMode === "list" && (
                            <span className="mt-auto inline-flex items-center text-[13px] font-bold text-[#D6532B]">
                              Ver detalles del producto <CaretRight size={14} weight="bold" className="ml-1" />
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[420px] flex-col items-center justify-center border border-[#D4DFDC] bg-white px-6 py-20 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBEBEB]">
                  <MagnifyingGlass size={32} className="text-[#707E83]" />
                </div>
                <h3 className="mb-2 text-xl font-extrabold text-[#4A5560]">
                  No se encontraron productos
                </h3>
                <p className="max-w-md text-[#4A5560]/80">
                  No hay resultados para la búsqueda actual o el filtro
                  seleccionado. Ajusta la búsqueda o vuelve a todos los
                  productos.
                </p>
                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => applyParams({ q: "", filtro: ALL_FILTERS, page: "1" })}
                >
                  Limpiar filtros
                </Button>
              </motion.div>
            )}

            {sortedProducts.length > productsPerPage ? (
              <nav
                className="mt-8 flex items-center justify-center gap-2 border-t border-[#D4DFDC] pt-6"
                aria-label="Paginación de productos"
              >
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4DFDC] bg-white text-[#4A5560] transition-colors hover:border-[#D6532B] hover:text-[#D6532B] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Ir a la página ${page}`}
                    className={cn(
                      "h-10 min-w-10 rounded-full border px-3 text-[13px] font-bold transition-colors",
                      currentPage === page
                        ? "border-[#4A5560] bg-[#4A5560] text-white"
                        : "border-[#D4DFDC] bg-white text-[#4A5560] hover:border-[#D6532B] hover:text-[#D6532B]"
                    )}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4DFDC] bg-white text-[#4A5560] transition-colors hover:border-[#D6532B] hover:text-[#D6532B] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </nav>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
