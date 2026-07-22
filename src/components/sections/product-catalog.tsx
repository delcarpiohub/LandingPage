"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretLeft,
  CaretRight,
  FunnelSimple,
  GridFour,
  ListBullets,
  MagnifyingGlass,
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
const PRODUCT_BRANDS = ["Hanon", "Milestone", "Restek", "Infitek"] as const;
const PAGE_SIZE_OPTIONS = [9, 18, 36] as const;

type ProductBrand = (typeof PRODUCT_BRANDS)[number];
type SortOption = "featured" | "name_asc" | "name_desc";
type ViewMode = "grid" | "list";

function productMatchesBrand(
  productBrand: string | undefined,
  brand: ProductBrand,
) {
  return (
    productBrand?.localeCompare(brand, "es", { sensitivity: "base" }) === 0
  );
}

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<ProductBrand | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [pageSize, setPageSize] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryOptions = useMemo(
    () => productFilters.filter((filter) => filter !== "Marcas"),
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLocaleLowerCase("es");
    const products = mockProducts.filter((product) => {
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
        .toLocaleLowerCase("es");

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);
      const matchesBrand =
        selectedBrand === null ||
        productMatchesBrand(product.detail?.brand, selectedBrand);
      const matchesCategory =
        selectedCategory === null ||
        product.category === selectedCategory ||
        product.filters?.includes(selectedCategory);

      return matchesSearch && matchesBrand && matchesCategory;
    });

    if (sortOption === "name_asc") {
      return [...products].sort((a, b) => a.name.localeCompare(b.name, "es"));
    }

    if (sortOption === "name_desc") {
      return [...products].sort((a, b) => b.name.localeCompare(a.name, "es"));
    }

    return products;
  }, [searchQuery, selectedBrand, selectedCategory, sortOption]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const pageStart = (activePage - 1) * pageSize;
  const visibleProducts = filteredProducts.slice(
    pageStart,
    pageStart + pageSize,
  );
  const firstVisibleResult = filteredProducts.length === 0 ? 0 : pageStart + 1;
  const lastVisibleResult = Math.min(
    pageStart + pageSize,
    filteredProducts.length,
  );
  const hasActiveFilter =
    selectedBrand !== null ||
    selectedCategory !== null ||
    searchQuery.trim().length > 0;

  const catalogReturnPath = useMemo(() => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.set("buscar", searchQuery.trim());
    if (selectedBrand) params.set("marca", selectedBrand);
    if (selectedCategory) params.set("categoria", selectedCategory);
    if (sortOption !== "featured") params.set("orden", sortOption);
    if (viewMode !== "grid") params.set("vista", viewMode);
    if (pageSize !== 9) params.set("mostrar", String(pageSize));
    if (activePage !== 1) params.set("pagina", String(activePage));

    const query = params.toString();
    return query ? `/productos?${query}` : "/productos";
  }, [
    activePage,
    pageSize,
    searchQuery,
    selectedBrand,
    selectedCategory,
    sortOption,
    viewMode,
  ]);

  const resetToFirstPage = () => setCurrentPage(1);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand(null);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <section className="relative w-full bg-[#F8FAFC] py-12 md:py-16 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-full bg-gradient-to-b from-[#EBEBEB] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="mb-8 max-w-2xl md:mb-10 lg:mb-12">
            <h2 className="mb-3 font-display text-[28px] font-extrabold leading-tight tracking-tight text-[#4A5560] sm:text-3xl md:text-4xl">
              Explora nuestras soluciones analíticas
            </h2>
            <p className="max-w-[680px] text-[14px] leading-relaxed text-[#4A5560]/80 sm:text-[15px]">
              Filtra por familia técnica para encontrar equipos, sistemas y
              soluciones asociados a laboratorio, industria y control analítico.
            </p>
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
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrand(null);
                    setSelectedCategory(null);
                    resetToFirstPage();
                  }}
                  aria-pressed={
                    selectedBrand === null && selectedCategory === null
                  }
                  className={cn(
                    "group flex shrink-0 items-center justify-between gap-3 px-5 py-4 text-left text-[14px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                    selectedBrand === null && selectedCategory === null
                      ? "bg-[#4A5560] text-[#F5F5F5]"
                      : "bg-white text-[#4A5560] hover:bg-[#F7F9F8] hover:text-[#D6532B]",
                  )}
                >
                  <span>{ALL_FILTERS}</span>
                  <CaretRight
                    size={15}
                    weight="bold"
                    className="text-[#D6532B]"
                  />
                </button>

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
                      className="text-[#707E83] transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <div className="flex flex-col pb-3 pl-4 pr-2">
                    {PRODUCT_BRANDS.map((brand) => {
                      const isActive = selectedBrand === brand;

                      return (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => {
                            setSelectedBrand(isActive ? null : brand);
                            setSelectedCategory(null);
                            resetToFirstPage();
                          }}
                          aria-pressed={isActive}
                          className={cn(
                            "group/btn flex items-center justify-between gap-3 rounded-[4px] px-4 py-2.5 text-left text-[13.5px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                            isActive
                              ? "bg-[#EBEBEB] text-[#D6532B]"
                              : "text-[#4A5560] hover:bg-[#F7F9F8] hover:text-[#D6532B]",
                          )}
                        >
                          <span>{brand}</span>
                        </button>
                      );
                    })}
                  </div>
                </details>

                <details
                  name="filters-accordion"
                  className="group flex flex-col border-t border-[#D4DFDC] lg:border-t-0"
                >
                  <summary className="flex w-full cursor-pointer list-none items-center justify-between bg-white px-5 py-4 text-left text-[14px] font-bold text-[#101820] hover:bg-[#F7F9F8] [&::-webkit-details-marker]:hidden">
                    <span>Categorías</span>
                    <CaretRight
                      size={15}
                      weight="bold"
                      className="text-[#707E83] transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <div className="flex flex-col pb-3 pl-4 pr-2">
                    {categoryOptions.map((category) => {
                      const isActive = selectedCategory === category;

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(isActive ? null : category);
                            setSelectedBrand(null);
                            resetToFirstPage();
                          }}
                          aria-pressed={isActive}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-[4px] px-4 py-2.5 text-left text-[13.5px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                            isActive
                              ? "bg-[#EBEBEB] text-[#D6532B]"
                              : "text-[#4A5560] hover:bg-[#F7F9F8] hover:text-[#D6532B]",
                          )}
                        >
                          <span>{category}</span>
                        </button>
                      );
                    })}
                  </div>
                </details>
              </div>
            </aside>
          </Reveal>

          <motion.div layout className="min-h-[420px] lg:min-h-[500px]">
            <div className="mb-6 flex flex-col gap-4 text-[13px] font-bold text-[#101820]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:w-auto">
                  <label htmlFor="product-search" className="shrink-0">
                    Buscar en resultados :
                  </label>
                  <div className="relative w-full lg:w-72">
                    <input
                      id="product-search"
                      type="search"
                      placeholder="Buscar por equipo o modelo..."
                      value={searchQuery}
                      onChange={(event) => {
                        setSearchQuery(event.target.value);
                        resetToFirstPage();
                      }}
                      className="h-10 w-full rounded-[2px] border border-[#D4DFDC] bg-white pl-3 pr-8 text-[13px] font-normal text-[#4A5560] transition-all duration-200 placeholder:text-[#707E83] focus:border-[#0070c0] focus:outline-none focus:ring-1 focus:ring-[#0070c0]"
                    />
                    <MagnifyingGlass
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#707E83]"
                    />
                  </div>
                </div>

                <div className="flex w-full flex-wrap items-center gap-4 lg:w-auto lg:gap-6">
                  <label className="flex items-center gap-2">
                    <span>Ordenar por :</span>
                    <select
                      value={sortOption}
                      onChange={(event) => {
                        setSortOption(event.target.value as SortOption);
                        resetToFirstPage();
                      }}
                      className="h-10 w-36 cursor-pointer rounded-[2px] border border-[#D4DFDC] bg-white px-3 py-1 text-[13px] font-normal text-[#4A5560] focus:border-[#0070c0] focus:outline-none"
                    >
                      <option value="featured">Destacados</option>
                      <option value="name_asc">Nombre (A-Z)</option>
                      <option value="name_desc">Nombre (Z-A)</option>
                    </select>
                  </label>

                  <div
                    className="flex items-center overflow-hidden rounded-[2px] border border-[#D4DFDC] bg-white"
                    aria-label="Modo de visualización"
                  >
                    <button
                      type="button"
                      title="Vista Cuadrícula"
                      aria-label="Vista Cuadrícula"
                      aria-pressed={viewMode === "grid"}
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                        viewMode === "grid"
                          ? "bg-[#0070c0] text-white"
                          : "text-[#707E83] hover:bg-gray-50",
                      )}
                    >
                      <GridFour size={22} weight="bold" />
                    </button>
                    <button
                      type="button"
                      title="Vista Lista"
                      aria-label="Vista Lista"
                      aria-pressed={viewMode === "list"}
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                        viewMode === "list"
                          ? "bg-[#0070c0] text-white"
                          : "text-[#707E83] hover:bg-gray-50",
                      )}
                    >
                      <ListBullets size={22} weight="bold" />
                    </button>
                  </div>

                  <label className="flex items-center gap-2">
                    <span>Mostrar :</span>
                    <select
                      value={pageSize}
                      onChange={(event) => {
                        setPageSize(Number(event.target.value));
                        resetToFirstPage();
                      }}
                      className="h-10 w-20 cursor-pointer rounded-[2px] border border-[#D4DFDC] bg-white px-3 py-1 text-[13px] font-normal text-[#4A5560] focus:border-[#0070c0] focus:outline-none"
                    >
                      {PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="mt-2 text-[14px] font-bold text-[#101820]">
                Mostrando {firstVisibleResult} - {lastVisibleResult} de{" "}
                {filteredProducts.length} resultados
              </div>
            </div>

            {visibleProducts.length > 0 ? (
              <>
                <motion.div
                  layout
                  className={cn(
                    "grid gap-5 xl:gap-6",
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1",
                  )}
                >
                  <AnimatePresence mode="popLayout">
                    {visibleProducts.map((product) => (
                      <motion.article
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.16 } }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        key={product.id}
                        className="overflow-hidden"
                      >
                        <Link
                          href={{
                            pathname: `/productos/${product.slug ?? product.id}`,
                            query: { from: catalogReturnPath },
                          }}
                          className={cn(
                            "group flex overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-white transition-colors duration-300 hover:border-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
                            viewMode === "grid"
                              ? "h-full flex-col"
                              : "h-[240px] flex-row items-center",
                          )}
                        >
                          <div
                            className={cn(
                              "relative shrink-0 overflow-hidden bg-white",
                              viewMode === "grid"
                                ? "h-56 w-full sm:h-60 md:h-52 lg:h-56"
                                : "h-full w-[42%] border-r border-[#D4DFDC] sm:w-[260px]",
                            )}
                          >
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              sizes={
                                viewMode === "grid"
                                  ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                  : "(max-width: 640px) 42vw, 260px"
                              }
                              className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>

                          <div
                            className={cn(
                              "flex min-w-0 flex-1 flex-col",
                              viewMode === "grid"
                                ? "p-5 sm:p-6"
                                : "p-5 sm:p-6 md:p-8",
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
                                "text-[#4A5560]/80",
                                viewMode === "grid"
                                  ? "mb-4 line-clamp-3 text-[13px] leading-relaxed"
                                  : "mb-6 line-clamp-4 text-[14px] leading-relaxed",
                              )}
                            >
                              {product.description}
                            </p>
                            {viewMode === "list" && (
                              <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-bold text-[#D6532B]">
                                Ver detalles del producto
                                <CaretRight size={14} weight="bold" />
                              </span>
                            )}
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {totalPages > 1 && (
                  <nav
                    className="mt-8 flex items-center justify-center gap-2 border-t border-[#D4DFDC] pt-6"
                    aria-label="Paginación de productos"
                  >
                    <button
                      type="button"
                      aria-label="Página anterior"
                      disabled={activePage === 1}
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4DFDC] bg-white text-[#4A5560] transition-colors hover:border-[#D6532B] hover:text-[#D6532B] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <CaretLeft size={16} weight="bold" />
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        aria-label={`Ir a la página ${page}`}
                        aria-current={activePage === page ? "page" : undefined}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[13px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]",
                          activePage === page
                            ? "border-[#4A5560] bg-[#4A5560] text-white"
                            : "border-white bg-white text-[#4A5560] hover:border-[#D6532B] hover:text-[#D6532B]",
                        )}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      aria-label="Página siguiente"
                      disabled={activePage === totalPages}
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4DFDC] bg-white text-[#4A5560] transition-colors hover:border-[#D6532B] hover:text-[#D6532B] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <CaretRight size={16} weight="bold" />
                    </button>
                  </nav>
                )}
              </>
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
                  No hay resultados para la búsqueda actual o los filtros
                  seleccionados. Ajusta la búsqueda o vuelve a todos los
                  productos.
                </p>
                {hasActiveFilter && (
                  <Button
                    variant="secondary"
                    className="mt-6"
                    onClick={clearFilters}
                  >
                    Limpiar filtros
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
