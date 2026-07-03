"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretRight,
  FunnelSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  ProductCategory,
  mockProducts,
  productFilters,
} from "@/lib/mock-products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const ALL_FILTERS = "Todos";
type SelectedFilter = ProductCategory | typeof ALL_FILTERS;

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<SelectedFilter>(ALL_FILTERS);

  const filterOptions = useMemo(
    () => [ALL_FILTERS, ...productFilters] satisfies SelectedFilter[],
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return mockProducts.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.description,
        ...product.features,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);
      const matchesFilter =
        selectedFilter === ALL_FILTERS ||
        product.category === selectedFilter ||
        product.filters?.includes(selectedFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <section className="relative w-full bg-[#F4F4F4] py-16 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-full bg-gradient-to-b from-[#EBEBEB] to-transparent" />

      <div className="relative z-10 mx-auto max-w-wide px-6 lg:px-10">
        <Reveal>
          <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-[#4A5560] md:text-4xl">
                Explora nuestras soluciones analíticas
              </h2>
              <p className="max-w-[680px] text-[15px] leading-relaxed text-[#4A5560]/82">
                Filtra por familia técnica para encontrar equipos, sistemas y
                soluciones asociados a laboratorio, industria y control
                analítico.
              </p>
            </div>

            <div className="relative w-full shrink-0 md:w-80">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MagnifyingGlass size={20} className="text-[#707E83]" />
              </div>
              <input
                type="search"
                placeholder="Buscar por equipo o modelo..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-12 w-full rounded-[2px] border border-[#D4DFDC] bg-white pl-11 pr-4 text-[14px] text-[#4A5560] transition-all duration-200 placeholder:text-[#707E83] focus:border-[#D6532B] focus:outline-none focus:ring-2 focus:ring-[#D6532B]/20"
              />
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <Reveal delay={0.08}>
            <aside
              className="border border-[#D4DFDC] bg-white lg:sticky lg:top-36"
              aria-label="Filtros de productos"
            >
              <div className="border-b border-[#D4DFDC] px-5 py-5">
                <div className="flex items-center gap-3 text-[#4A5560]">
                  <FunnelSimple size={20} weight="bold" />
                  <h3 className="text-[13px] font-extrabold uppercase tracking-[0.16em]">
                    Filtros
                  </h3>
                </div>
              </div>

              <div className="divide-y divide-[#D4DFDC]">
                {filterOptions.map((filter) => {
                  const isActive = selectedFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedFilter(filter)}
                      aria-pressed={isActive}
                      className={cn(
                        "group flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[14px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]",
                        isActive
                          ? "bg-[#4A5560] text-[#F5F5F5]"
                          : "bg-white text-[#4A5560] hover:bg-[#F7F9F8] hover:text-[#D6532B]"
                      )}
                    >
                      <span>{filter}</span>
                      <CaretRight
                        size={15}
                        weight="bold"
                        className={cn(
                          "shrink-0 transition-transform duration-200",
                          isActive
                            ? "text-[#D6532B]"
                            : "text-[#707E83] group-hover:translate-x-0.5 group-hover:text-[#D6532B]"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </aside>
          </Reveal>

          <motion.div layout className="min-h-[500px]">
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.article
                      layout
                      initial={{ opacity: 0, scale: 0.97, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.97,
                        transition: { duration: 0.18 },
                      }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                      key={product.id}
                      className="group flex flex-col overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-white transition-colors duration-300 hover:border-[#D6532B]"
                    >
                      <div className="relative h-56 w-full overflow-hidden bg-white">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3 bg-white/92 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#D6532B]">
                          {product.category}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-lg font-extrabold leading-tight text-[#4A5560] transition-colors duration-200 group-hover:text-[#D6532B]">
                          {product.name}
                        </h3>
                        <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-[#4A5560]/82">
                          {product.description}
                        </p>

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
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter(ALL_FILTERS);
                  }}
                >
                  Limpiar filtros
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
