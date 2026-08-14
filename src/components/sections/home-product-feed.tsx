"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { ProductSkeleton } from "@/components/ui/product-skeleton";
import { mockProducts } from "@/lib/mock-products";
import type { Product } from "@/lib/mock-products";

const ITEMS_PER_PAGE = 6;

export function HomeProductFeed() {
  const [items, setItems] = useState<Product[]>(mockProducts.slice(0, ITEMS_PER_PAGE));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // We limit the infinite scroll to all available products in our mock
  const hasMore = items.length < mockProducts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate network delay for smooth skeleton demonstration
    setTimeout(() => {
      const nextPage = page + 1;
      const newItems = mockProducts.slice(0, nextPage * ITEMS_PER_PAGE);
      setItems(newItems);
      setPage(nextPage);
      setIsLoading(false);
    }, 1200); // 1.2s artificial delay
  }, [isLoading, hasMore, page]);

  const { observerRef } = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMore,
    rootMargin: "200px", // Pre-fetch before user hits the bottom
  });

  const skeletons = useMemo(
    () => Array.from({ length: Math.min(ITEMS_PER_PAGE, mockProducts.length - items.length) }),
    [items.length]
  );

  return (
    <section className="relative w-full bg-slate-50 py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          <AnimatePresence>
            {items.map((product) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                key={product.id}
                className="overflow-hidden"
              >
                <Link
                  href={`/productos/${product.slug ?? product.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-white transition-colors duration-300 hover:border-[#D6532B]"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-white sm:h-60 md:h-52 lg:h-56">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-[17px] font-extrabold leading-tight text-[#4A5560] transition-colors duration-200 group-hover:text-[#D6532B] sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-[#4A5560]/80">
                      {product.description}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>

          {/* Skeletons para estado de carga */}
          {isLoading &&
            skeletons.map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProductSkeleton />
              </motion.div>
            ))}
        </motion.div>

        {/* Observador invisible para disparar el evento */}
        <div ref={observerRef} className="h-10 w-full" aria-hidden="true" />

        {/* Indicador sutil de fin de lista */}
        {!hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-[14px] text-[#4A5560]/50 font-medium">
              Has visualizado todo el catálogo destacado.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
