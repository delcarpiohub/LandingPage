"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MagnifyingGlass, Funnel, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { Product, mockProducts, ProductCategory } from "@/lib/mock-products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const ALL_CATEGORIES = "Todas";

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);

  // Extract unique categories from mock data
  const categories = useMemo(() => {
    const cats = new Set(mockProducts.map((p) => p.category));
    return [ALL_CATEGORIES, ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="relative w-full bg-[#F4F4F4] py-20 lg:py-28">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#EBEBEB] to-transparent pointer-events-none" />

      <div className="mx-auto max-w-wide px-6 lg:px-10 relative z-10">
        
        {/* Header & Controls */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#101820] mb-4 tracking-tight">
                Explora nuestras Soluciones Analíticas
              </h2>
              <p className="text-[#4A5560] text-[15px] leading-relaxed">
                Instrumentación de alta precisión diseñada para maximizar la confiabilidad y eficiencia de tu laboratorio. Utiliza los filtros para encontrar el equipo ideal para tus metodologías.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlass size={20} className="text-[#8A8A8A]" />
              </div>
              <input
                type="text"
                placeholder="Buscar por equipo o modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-white border border-[#E8E8E8] rounded-[2px] text-[14px] text-[#101820] shadow-soft focus:outline-none focus:border-[#D6532B] focus:ring-1 focus:ring-[#D6532B] transition-all duration-200"
              />
            </div>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E8E8E8]">
            <Funnel size={18} className="text-[#8A8A8A] mr-2" />
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#101820] text-white shadow-md scale-105"
                      : "bg-white text-[#666666] border border-[#E8E8E8] hover:border-[#D6532B] hover:text-[#D6532B]"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Product Grid */}
        <motion.div layout className="min-h-[500px]">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    key={product.id}
                    className="group flex flex-col bg-white rounded-[4px] border border-[#E8E8E8] overflow-hidden hover:shadow-card hover:border-[#D0C8C0] transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 w-full bg-[#EBEBEB] overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Placeholder Tag (since these are mock images) */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-[2px] text-[10px] text-white uppercase font-bold tracking-wider">
                        Referencia Visual
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-[2px] text-[11px] font-bold text-[#D6532B] uppercase tracking-wider shadow-sm">
                        {product.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-6">
                      <h3 className="text-lg font-bold text-[#101820] mb-2 leading-tight group-hover:text-[#D6532B] transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-[#666666] text-[13px] leading-relaxed mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      
                      {/* Features List */}
                      <ul className="mt-auto flex flex-col gap-1.5 mb-6">
                        {product.features.slice(0, 2).map((feat, i) => (
                          <li key={i} className="flex items-start text-[12px] text-[#4A5560]">
                            <span className="text-[#D6532B] mr-2">•</span>
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-[#E8E8E8] mt-auto">
                        <Button 
                          variant="ghost" 
                          className="w-full flex justify-between items-center group/btn hover:bg-[#F4F4F4] text-[#101820] hover:text-[#D6532B]"
                        >
                          Ver Detalles Técnicos
                          <ArrowRight 
                            size={16} 
                            className="transition-transform duration-200 group-hover/btn:translate-x-1" 
                          />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-[#EBEBEB] rounded-full flex items-center justify-center mb-4">
                <MagnifyingGlass size={32} className="text-[#8A8A8A]" />
              </div>
              <h3 className="text-xl font-bold text-[#101820] mb-2">No se encontraron productos</h3>
              <p className="text-[#666666] max-w-md">
                No hay resultados para la búsqueda actual o categoría seleccionada. Intenta ajustar los filtros.
              </p>
              <Button 
                variant="secondary" 
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(ALL_CATEGORIES);
                }}
              >
                Limpiar Filtros
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
