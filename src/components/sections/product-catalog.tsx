"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CaretLeft,
  CaretRight,
  CaretDown,
  FunnelSimple,
  MagnifyingGlass,
  SquaresFour,
  ListDashes,
  ArrowRight,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  ProductCategory,
  mockProducts,
  productFilters,
} from "@/lib/mock-products";
import { cn } from "@/lib/utils";
import { normalizeSearchText } from "@/content/search-index";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ProductComparisonToggle } from "@/components/products/product-comparison-toggle";
import { getProductSlug, isProductComparable } from "@/lib/product-comparison";

const ALL_FILTERS = "Todos";
const BRAND_FILTERS = [
  "Hanon",
  "Milestone",
  "Restek",
  "Infitek",
  "Hyperpurex",
  "Distek",
  "EuroVector",
  "ColdBlock",
  "Skalar",
  "Trace Elemental",
  "Decent",
  "Thermo Scientific",
] as const;
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

function matchesSearchText(
  product: (typeof mockProducts)[number],
  normalizedSearch: string,
) {
  if (normalizedSearch.length === 0) return true;
  const searchableText = normalizeSearchText(
    [
      product.name,
      product.category,
      product.description,
      product.detail?.brand ?? "",
      product.detail?.model ?? "",
      ...(product.features ?? []),
      ...(product.tags ?? []),
      ...((product.filters as string[] | undefined) ?? []),
    ].join(" "),
  );
  return searchableText.includes(normalizedSearch);
}

function matchesSelectedFilter(
  product: (typeof mockProducts)[number],
  filter: SelectedFilter,
) {
  if (filter === ALL_FILTERS) return true;
  if (isBrandFilter(filter)) {
    return (
      product.detail?.brand === filter ||
      (product.filters as string[] | undefined)?.includes(filter) ||
      (product.detail?.brand ?? "").toLowerCase().includes(filter.toLowerCase())
    );
  }
  return (
    product.category === filter || product.filters?.includes(filter)
  );
}

// Header fijo del sitio (ver navigation.tsx): al aplicar un filtro en el
// panel móvil, el scroll-into-view debe dejar este espacio libre arriba o
// el inicio de los resultados queda tapado por el header.
const MOBILE_HEADER_OFFSET_PX = 72;

function scrollToCatalogResults() {
  const el = document.getElementById("product-catalog");
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - MOBILE_HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
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

// `popstate` solo dispara con los botones Atrás/Adelante del navegador. La
// navegación de next/link y router.push (el dropdown del buscador global,
// por ejemplo) actualiza la URL con `history.pushState`/`replaceState` sin
// emitir `popstate` ni pasar por `notifyLocationChange()` — por eso, al
// cambiar `?filtro=`/`?q=` estando ya montado en /productos, esta store
// nunca se enteraba y el catálogo quedaba mostrando el filtro anterior hasta
// recargar. Se parchea `history.pushState`/`replaceState` una sola vez (a
// nivel de `window`, no de módulo, para sobrevivir Fast Refresh) y así se
// notifica también cuando la navegación la dispara el router de Next.
function ensureHistoryNotifiesLocationChange() {
  const win = window as Window & { __dcHistoryNotifyPatched?: boolean };
  if (win.__dcHistoryNotifyPatched) return;
  win.__dcHistoryNotifyPatched = true;

  const originalPushState = window.history.pushState.bind(window.history);
  const originalReplaceState = window.history.replaceState.bind(window.history);

  window.history.pushState = function patchedPushState(
    ...args: Parameters<History["pushState"]>
  ) {
    originalPushState(...args);
    notifyLocationChange();
  };
  window.history.replaceState = function patchedReplaceState(
    ...args: Parameters<History["replaceState"]>
  ) {
    originalReplaceState(...args);
    notifyLocationChange();
  };
}

function subscribeToLocation(callback: () => void) {
  ensureHistoryNotifiesLocationChange();
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
    getServerLocationSnapshot,
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
  const viewMode: "grid" | "list" =
    params.get("vista") === "list" ? "list" : "grid";
  const sortBy = useMemo(() => {
    const fromUrl = params.get("orden");
    return fromUrl === "name_asc" || fromUrl === "name_desc"
      ? fromUrl
      : "featured";
  }, [params]);
  const productsPerPage = useMemo(() => {
    const fromUrl = Number(params.get("por_pagina"));
    return [9, 18, 36].includes(fromUrl) ? fromUrl : 9;
  }, [params]);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {
      Marcas: false,
    },
  );

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
        (p) =>
          p.category === filter ||
          (p.filters as string[] | undefined)?.includes(filter),
      );
    }
    return map;
  }, []);

  const brandProductsMap = useMemo(() => {
    const map: Record<BrandFilter, typeof mockProducts> = {} as Record<
      BrandFilter,
      typeof mockProducts
    >;
    for (const brand of BRAND_FILTERS) {
      map[brand] = mockProducts.filter(
        (p) =>
          p.detail?.brand === brand ||
          (p.filters as string[] | undefined)?.includes(brand),
      );
    }
    return map;
  }, []);

  // Panel de filtros para <1024px (celular y tablet, incluyendo iPad Air en
  // 820px): el <aside> de escritorio queda oculto en ese rango porque 280px
  // fijos son una porción demasiado grande de un viewport de 768-820px y la
  // interacción es táctil, no de mouse — un bottom sheet de ancho completo
  // funciona mejor ahí que forzar el sidebar o el <select> nativo anterior.
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [draftFilter, setDraftFilter] = useState<SelectedFilter>(selectedFilter);
  const [isPortalMounted, setIsPortalMounted] = useState(false);
  const mobileFilterTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileFilterCloseRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsPortalMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const openMobileFilter = () => {
    setDraftFilter(selectedFilter);
    setIsMobileFilterOpen(true);
  };

  const closeMobileFilter = () => setIsMobileFilterOpen(false);

  const applyMobileFilter = () => {
    applyParams({ filtro: draftFilter, page: "1" });
    setIsMobileFilterOpen(false);
    scrollToCatalogResults();
  };

  const clearMobileFilter = () => {
    setDraftFilter(ALL_FILTERS);
    applyParams({ filtro: ALL_FILTERS, page: "1" });
    setIsMobileFilterOpen(false);
    scrollToCatalogResults();
  };

  const removeActiveFilterChip = () => {
    applyParams({ filtro: ALL_FILTERS, page: "1" });
  };

  // Escape para cerrar, bloqueo de scroll del fondo y devolución de foco al
  // botón que abrió el panel — mismo patrón que el visor de imágenes en
  // product-gallery.tsx.
  useEffect(() => {
    if (!isMobileFilterOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileFilter();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const frame = window.requestAnimationFrame(() =>
      mobileFilterCloseRef.current?.focus(),
    );
    const trigger = mobileFilterTriggerRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(frame);
      trigger?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileFilterOpen]);

  // Marca si el próximo cambio de `search` lo disparó este propio componente
  // (vía applyParams) para no re-disparar el scroll que esas mismas llamadas
  // ya hacen explícitamente (mobile filter) o que no necesitan (sidebar de
  // escritorio, chip activo).
  const selfInitiatedRef = useRef(false);
  const previousSearchRef = useRef(search);
  // No scrollear durante el montaje/hidratación inicial: getServerSnapshot
  // devuelve "" y, si la URL real YA es "" (ej. visitar /productos sin
  // filtro), no hay transición que detectar y no hay nada que "consumir"
  // antes del primer cambio real — por eso el asentamiento se marca con un
  // macrotask aparte en vez de con el valor inicial de `selfInitiatedRef`.
  const hasSettledRef = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      hasSettledRef.current = true;
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (previousSearchRef.current === search) return;
    previousSearchRef.current = search;
    const wasSelfInitiated = selfInitiatedRef.current;
    selfInitiatedRef.current = false;
    if (hasSettledRef.current && !wasSelfInitiated) {
      scrollToCatalogResults();
    }
  }, [search]);

  const activeFilterLabel = useMemo(() => {
    if (selectedFilter === ALL_FILTERS) return null;
    return isBrandFilter(selectedFilter)
      ? `Marca · ${selectedFilter}`
      : selectedFilter;
  }, [selectedFilter]);

  const draftFilteredCount = useMemo(() => {
    const normalizedSearch = normalizeSearchText(searchQuery);
    return mockProducts.filter(
      (product) =>
        matchesSearchText(product, normalizedSearch) &&
        matchesSelectedFilter(product, draftFilter),
    ).length;
  }, [searchQuery, draftFilter]);

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
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;
    selfInitiatedRef.current = true;
    window.history.replaceState(null, "", newUrl);
    notifyLocationChange();
  };

  const catalogHref = search ? `/productos${search}` : "/productos";

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeSearchText(searchQuery);
    return mockProducts.filter(
      (product) =>
        matchesSearchText(product, normalizedSearch) &&
        matchesSelectedFilter(product, selectedFilter),
    );
  }, [searchQuery, selectedFilter]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    if (sortBy === "name_asc") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      products.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      products.sort(
        (a, b) => (b.catalogPriority ?? 0) - (a.catalogPriority ?? 0),
      );
    }
    return products;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / productsPerPage),
  );
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );
  const paginationItems = useMemo(() => {
    const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1)
      .filter(
        (page) =>
          totalPages <= 7 ||
          page === 1 ||
          page === totalPages ||
          Math.abs(page - currentPage) <= 1,
      );

    return visiblePages.flatMap((page, index) => {
      const previousPage = visiblePages[index - 1];
      return index > 0 && page - previousPage > 1
        ? [`ellipsis-${previousPage}`, page]
        : [page];
    });
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    applyParams({ page: String(page) });
    document.getElementById("product-catalog")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="product-catalog"
      className="relative w-full bg-[#F8FAFC] py-8 sm:py-10 md:py-16 lg:py-24"
    >
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

        <div className="mb-6 border-y border-[#D4DFDC] bg-white lg:hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              ref={mobileFilterTriggerRef}
              type="button"
              onClick={openMobileFilter}
              aria-haspopup="dialog"
              aria-expanded={isMobileFilterOpen}
              className="flex min-h-11 flex-1 items-center gap-2 bg-white text-[15px] font-bold text-[#101820] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6532B]"
            >
              <FunnelSimple size={16} weight="bold" aria-hidden="true" />
              Filtros
              {activeFilterLabel && (
                <span
                  aria-hidden="true"
                  className="grid size-5 shrink-0 place-items-center rounded-full bg-[#D6532B] text-[11px] font-bold text-white"
                >
                  1
                </span>
              )}
              <CaretDown size={14} weight="bold" className="text-[#4A5560]" />
            </button>
            <span className="shrink-0 border-l border-[#D4DFDC] pl-3 text-xs font-semibold text-[#4A5560]">
              {filteredProducts.length} resultados
            </span>
          </div>

          {activeFilterLabel && (
            <div className="flex items-center gap-3 border-t border-[#D4DFDC] px-4 py-2.5">
              <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#D6532B] bg-[#FBEAE3] px-3 text-[12px] font-bold text-[#D6532B]">
                {activeFilterLabel}
                <button
                  type="button"
                  onClick={removeActiveFilterChip}
                  aria-label={`Quitar filtro ${activeFilterLabel}`}
                  className="grid size-5 shrink-0 place-items-center rounded-full text-[#D6532B] hover:bg-[#D6532B]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                >
                  <X size={12} weight="bold" />
                </button>
              </span>
              <button
                type="button"
                onClick={removeActiveFilterChip}
                className="text-[12px] font-bold text-[#4A5560] underline-offset-2 hover:text-[#101820] hover:underline"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>

        {isPortalMounted &&
          createPortal(
            <AnimatePresence>
              {isMobileFilterOpen && (
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Filtrar catálogo"
                  className="fixed inset-0 z-[1100] flex flex-col justify-end"
                >
                  <motion.button
                    type="button"
                    aria-label="Cerrar filtros"
                    onClick={closeMobileFilter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-[#101820]/50"
                  />
                  <motion.div
                    initial={
                      reduceMotion ? { opacity: 0 } : { y: "100%" }
                    }
                    animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
                    transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                    className="relative z-10 flex max-h-[85dvh] flex-col rounded-t-[12px] bg-white"
                  >
                    <div className="flex shrink-0 items-center justify-between border-b border-[#D4DFDC] px-5 py-4">
                      <h2 className="font-display text-[17px] font-extrabold text-[#101820]">
                        Filtros
                      </h2>
                      <button
                        ref={mobileFilterCloseRef}
                        type="button"
                        onClick={closeMobileFilter}
                        aria-label="Cerrar filtros"
                        className="grid size-11 shrink-0 place-items-center rounded-[2px] text-[#4A5560] hover:bg-[#F8F9FA] hover:text-[#101820] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D6532B]"
                      >
                        <X size={20} weight="bold" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setDraftFilter(ALL_FILTERS)}
                        className={cn(
                          "mb-4 flex min-h-11 w-full items-center justify-between rounded-[4px] border px-4 text-left text-[14px] font-bold transition-colors",
                          draftFilter === ALL_FILTERS
                            ? "border-[#D6532B] bg-[#FBEAE3] text-[#D6532B]"
                            : "border-[#D4DFDC] text-[#4A5560] hover:border-[#101820] hover:text-[#101820]",
                        )}
                      >
                        <span>Todos los productos</span>
                        <span className="text-[12px] font-normal opacity-80">
                          ({mockProducts.length})
                        </span>
                      </button>

                      <h3 className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#707E83]">
                        Categorías
                      </h3>
                      <div className="mb-5 flex flex-col gap-2">
                        {productFilters
                          .filter((filter) => filter !== "Marcas")
                          .map((category) => {
                            const count =
                              categoryProductsMap[category]?.length ?? 0;
                            const isActive = draftFilter === category;
                            return (
                              <button
                                key={category}
                                type="button"
                                onClick={() => setDraftFilter(category)}
                                className={cn(
                                  "flex min-h-11 w-full items-center justify-between rounded-[4px] border px-4 text-left text-[14px] font-semibold transition-colors",
                                  isActive
                                    ? "border-[#D6532B] bg-[#FBEAE3] text-[#D6532B]"
                                    : "border-[#D4DFDC] text-[#4A5560] hover:border-[#101820] hover:text-[#101820]",
                                )}
                              >
                                <span>{category}</span>
                                <span className="text-[12px] font-normal opacity-70">
                                  ({count})
                                </span>
                              </button>
                            );
                          })}
                      </div>

                      <h3 className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#707E83]">
                        Marcas
                      </h3>
                      <div className="mb-2 flex flex-col gap-2">
                        {BRAND_FILTERS.map((brand) => {
                          const count = brandProductsMap[brand]?.length ?? 0;
                          const isActive = draftFilter === brand;
                          return (
                            <button
                              key={brand}
                              type="button"
                              onClick={() => setDraftFilter(brand)}
                              className={cn(
                                "flex min-h-11 w-full items-center justify-between rounded-[4px] border px-4 text-left text-[14px] font-semibold transition-colors",
                                isActive
                                  ? "border-[#D6532B] bg-[#FBEAE3] text-[#D6532B]"
                                  : "border-[#D4DFDC] text-[#4A5560] hover:border-[#101820] hover:text-[#101820]",
                              )}
                            >
                              <span>{brand}</span>
                              <span className="text-[12px] font-normal opacity-70">
                                ({count})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-3 border-t border-[#D4DFDC] px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={clearMobileFilter}
                        className="h-12 flex-1 text-[14px]"
                      >
                        Limpiar
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={applyMobileFilter}
                        className="h-12 flex-[2] text-[14px]"
                      >
                        Ver {draftFilteredCount} resultados
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-8">
          <div className="hidden lg:block">
            <Reveal delay={0.08}>
              <aside
                className="overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-white lg:sticky lg:top-36"
                aria-label="Categorías de producto"
              >
                <div className="border-b border-[#D4DFDC] bg-white px-5 py-4 flex items-center justify-between gap-4">
                  <h3 className="font-display text-[15px] font-extrabold text-[#101820] shrink-0">
                    Categorías de producto
                  </h3>
                  {selectedFilter !== ALL_FILTERS && (
                    <button
                      type="button"
                      onClick={() =>
                        applyParams({ filtro: ALL_FILTERS, page: "1", q: "" })
                      }
                      className="text-[11px] font-bold text-[#4A5560] hover:text-[#101820] hover:underline uppercase tracking-wider ml-auto shrink-0"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                <div className="flex flex-col divide-y divide-[#D4DFDC]">
                  {/* Botón Todos */}
                  <button
                    type="button"
                    onClick={() =>
                      applyParams({ filtro: ALL_FILTERS, page: "1" })
                    }
                    className={cn(
                      "flex w-full items-center justify-between px-5 py-3.5 text-left text-[13.5px] font-bold transition-colors",
                      selectedFilter === ALL_FILTERS
                        ? "bg-[#4A5560] text-white"
                        : "bg-white text-[#4A5560] hover:bg-[#F8F9FA] hover:text-[#101820]",
                    )}
                  >
                    <span>Todos los productos</span>
                    <span className="text-[11px] font-normal opacity-80">
                      ({mockProducts.length})
                    </span>
                  </button>

                  {/* Acordeones por Categoría / Marca */}
                  {productFilters.map((category) => {
                    const isOpen = Boolean(openCategories[category]);
                    const isMarcas = category === "Marcas";
                    const isCategoryActive =
                      selectedFilter === category ||
                      (isMarcas && isBrandFilter(selectedFilter));
                    const categoryProducts = isMarcas
                      ? []
                      : (categoryProductsMap[category] ?? []);

                    return (
                      <div key={category} className="flex flex-col bg-white">
                        <button
                          type="button"
                          onClick={() => {
                            toggleCategory(category);
                            if (!isMarcas) {
                              applyParams({ filtro: category, page: "1" });
                            }
                          }}
                          className={cn(
                            "flex w-full items-center justify-between px-5 py-3.5 text-left text-[13.5px] font-bold transition-colors",
                            isCategoryActive
                              ? "bg-[#F8F9FA] text-[#101820] font-extrabold"
                              : "text-[#101820] hover:bg-[#F8F9FA]",
                          )}
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
                              isOpen && "rotate-180 text-[#101820]",
                            )}
                          />
                        </button>

                        {/* Desplegable de sub-items */}
                        {isOpen && (
                          <div className="bg-[#F8F9FA] border-t border-[#D4DFDC] px-4 py-3 flex flex-col gap-1 text-[13px]">
                            {isMarcas ? (
                              BRAND_FILTERS.map((brand) => {
                                const isBrandActive = selectedFilter === brand;
                                const brandCount = mockProducts.filter(
                                  (p) =>
                                    p.detail?.brand === brand ||
                                    (
                                      p.filters as string[] | undefined
                                    )?.includes(brand),
                                ).length;
                                return (
                                  <button
                                    key={brand}
                                    type="button"
                                    onClick={() =>
                                      applyParams({ filtro: brand, page: "1" })
                                    }
                                    className={cn(
                                      "flex items-center justify-between rounded-[4px] px-3 py-2 text-left font-medium transition-colors",
                                      isBrandActive
                                        ? "bg-white text-[#101820] font-extrabold shadow-xs"
                                        : "text-[#4A5560] hover:bg-white hover:text-[#101820]",
                                    )}
                                  >
                                    <span>{brand}</span>
                                    <span className="text-[11px] text-[#707E83]">
                                      ({brandCount})
                                    </span>
                                  </button>
                                );
                              })
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    applyParams({ filtro: category, page: "1" })
                                  }
                                  className="flex items-center justify-between rounded-[4px] px-3 py-2 text-left font-bold text-[12px] uppercase tracking-wider text-[#101820] bg-white border border-[#D4DFDC] hover:bg-[#F8F9FA] transition-colors mb-1"
                                >
                                  <span>Ver todo {category}</span>
                                  <CaretRight size={14} weight="bold" />
                                </button>

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
            </Reveal>
          </div>

          <motion.div className="min-h-[420px] lg:min-h-[500px]">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4 text-[13px] font-bold text-[#101820]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Search within */}
                <div className="flex w-full flex-col gap-1.5 lg:w-auto lg:flex-row lg:items-center lg:gap-3">
                  <label htmlFor="catalog-search" className="shrink-0">
                    Buscar en resultados :
                  </label>
                  <div className="relative w-full lg:w-72">
                    <input
                      id="catalog-search"
                      type="search"
                      aria-describedby="catalog-results-status"
                      placeholder="Buscar por equipo o modelo..."
                      value={searchQuery}
                      onChange={(event) => {
                        applyParams({ q: event.target.value, page: "1" });
                      }}
                      className="h-11 w-full rounded-[2px] border border-[#D4DFDC] bg-white pl-3 pr-8 text-base font-normal text-[#4A5560] transition-colors duration-200 placeholder:text-[#707E83] focus:border-[#D6532B] focus:outline-none focus:ring-1 focus:ring-[#D6532B] md:text-[13px]"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <MagnifyingGlass
                        size={16}
                        className="text-[#4A5560]"
                        weight="bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  {/* Sort By */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="catalog-sort" className="shrink-0">
                      Ordenar por :
                    </label>
                    <select
                      id="catalog-sort"
                      value={sortBy}
                      onChange={(e) => {
                        applyParams({ orden: e.target.value, page: "1" });
                      }}
                      className="h-11 w-36 cursor-pointer rounded-[2px] border border-[#D4DFDC] bg-white px-3 py-1 text-base font-normal text-[#4A5560] focus:border-[#D6532B] focus:outline-none focus:ring-1 focus:ring-[#D6532B] md:text-[13px]"
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
                      aria-label="Vista en cuadrícula"
                      aria-pressed={viewMode === "grid"}
                      className={cn(
                        "grid size-11 shrink-0 place-items-center transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                        viewMode === "grid"
                          ? "bg-[#D6532B] text-white"
                          : "text-[#707E83] hover:bg-gray-50",
                      )}
                    >
                      <SquaresFour
                        size={20}
                        weight={viewMode === "grid" ? "fill" : "bold"}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyParams({ vista: "list" })}
                      aria-label="Vista en lista"
                      aria-pressed={viewMode === "list"}
                      className={cn(
                        "grid size-11 shrink-0 place-items-center transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                        viewMode === "list"
                          ? "bg-[#D6532B] text-white"
                          : "text-[#707E83] hover:bg-gray-50",
                      )}
                    >
                      <ListDashes
                        size={20}
                        weight={viewMode === "list" ? "fill" : "bold"}
                      />
                    </button>
                  </div>

                  {/* Show */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="catalog-page-size" className="shrink-0">
                      Mostrar :
                    </label>
                    <select
                      id="catalog-page-size"
                      value={productsPerPage}
                      onChange={(e) => {
                        applyParams({ por_pagina: e.target.value, page: "1" });
                      }}
                      className="h-11 w-20 cursor-pointer rounded-[2px] border border-[#D4DFDC] bg-white px-3 py-1 text-base font-normal text-[#4A5560] focus:border-[#D6532B] focus:outline-none focus:ring-1 focus:ring-[#D6532B] md:text-[13px]"
                    >
                      <option value={9}>9</option>
                      <option value={18}>18</option>
                      <option value={36}>36</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                id="catalog-results-status"
                aria-live="polite"
                className="mt-2 text-[14px] font-bold text-[#101820]"
              >
                Mostrando{" "}
                {sortedProducts.length > 0
                  ? (currentPage - 1) * productsPerPage + 1
                  : 0}{" "}
                -{" "}
                {Math.min(currentPage * productsPerPage, sortedProducts.length)}{" "}
                de {sortedProducts.length} resultados
              </div>
            </div>

            {sortedProducts.length > 0 ? (
              <motion.div
                className={cn(
                  "grid gap-5 xl:gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1",
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
                      className={cn(
                        "relative flex rounded-[4px] border border-[#D4DFDC] bg-white transition-colors duration-300 hover:border-[#D6532B]",
                        viewMode === "grid" ? "h-full flex-col" : "flex-col",
                      )}
                    >
                      <Link
                        href={`/productos/${product.slug ?? product.id}?from=${encodeURIComponent(catalogHref)}`}
                        className={cn(
                          "group flex min-h-0 flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
                          viewMode === "grid"
                            ? "flex-col"
                            : "min-h-[240px] flex-row items-center",
                        )}
                      >
                        <div
                          className={cn(
                            "relative overflow-hidden bg-white shrink-0",
                            viewMode === "grid"
                              ? "h-64 w-full sm:h-72 md:h-60 lg:h-64"
                              : "h-full w-[260px] border-r border-[#D4DFDC]",
                          )}
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className={cn(
                              "object-contain transition-transform duration-700 group-hover:scale-105",
                              product.slug === "hyperpurex-serie-x-flagship"
                                ? "p-3"
                                : "p-4",
                            )}
                          />
                        </div>

                        <div
                          className={cn(
                            "flex flex-1 flex-col",
                            viewMode === "grid" ? "p-6" : "p-6 md:p-8",
                          )}
                        >
                          <h3
                            className={cn(
                              "mb-2 font-extrabold leading-tight text-[#4A5560] transition-colors duration-200 group-hover:text-[#D6532B]",
                              viewMode === "grid"
                                ? "text-[17px] sm:text-lg"
                                : "text-xl sm:text-2xl",
                            )}
                          >
                            {product.name}
                          </h3>
                          <p
                            className={cn(
                              "leading-relaxed text-[#4A5560]/80",
                              viewMode === "grid"
                                ? "mb-4 line-clamp-3 text-[13px]"
                                : "mb-6 line-clamp-4 text-[14px]",
                            )}
                          >
                            {product.description}
                          </p>
                          {viewMode === "list" && (
                            <span className="mt-auto inline-flex items-center text-[13px] font-bold text-[#D6532B]">
                              Ver detalles del producto{" "}
                              <CaretRight
                                size={14}
                                weight="bold"
                                className="ml-1"
                              />
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="flex justify-end px-5 pb-5 pt-1">
                        <ProductComparisonToggle
                          product={{
                            id: product.id,
                            slug: getProductSlug(product),
                            name: product.name,
                            imageUrl: product.imageUrl,
                            isComparable: isProductComparable(product),
                          }}
                        />
                      </div>
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
                  onClick={() =>
                    applyParams({ q: "", filtro: ALL_FILTERS, page: "1" })
                  }
                >
                  Limpiar filtros
                </Button>
              </motion.div>
            )}

            {sortedProducts.length > productsPerPage ? (
              <nav
                className="mx-auto mt-8 flex w-fit items-center justify-center gap-1.5 border-t border-[#D4DFDC] pt-5"
                aria-label="Paginación de productos"
              >
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                  className="grid size-11 shrink-0 place-items-center text-[#101820] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <CaretLeft size={18} weight="bold" />
                </button>

                {paginationItems.map((item) =>
                  typeof item === "number" ? (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePageChange(item)}
                      aria-current={currentPage === item ? "page" : undefined}
                      aria-label={`Ir a la página ${item}`}
                      className={cn(
                        "grid min-h-11 min-w-11 place-items-center px-2 text-[15px] transition-colors font-display focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
                        currentPage === item
                          ? "text-[#101820] font-black underline underline-offset-6 decoration-2 decoration-[#101820]"
                          : "text-[#707E83] font-medium hover:text-[#101820]",
                      )}
                    >
                      {item}
                    </button>
                  ) : (
                    <span
                      key={item}
                      aria-hidden="true"
                      className="w-4 text-center text-[#707E83]"
                    >
                      …
                    </span>
                  ),
                )}

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                  className="grid size-11 shrink-0 place-items-center text-[#101820] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B] disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <CaretRight size={18} weight="bold" />
                </button>
              </nav>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

