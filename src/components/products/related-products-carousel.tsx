"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Product } from "@/lib/mock-products";
import { Reveal } from "@/components/motion/reveal";

interface RelatedProductsCarouselProps {
  products: Product[];
}

export function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-[#F0F4F8] py-16 overflow-hidden">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="mx-auto max-w-[1600px] px-4 sm:px-12 lg:px-16">
        <Reveal>
          <div className="flex flex-col items-center">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#003865] mb-10 pb-2 border-b-[3px] border-[#53843A] px-4 text-center">
              Productos Relacionados
            </h2>
            
            <div className="relative w-full max-w-[1300px] mx-auto flex items-center">
              {/* Botón izquierdo */}
              <button
                onClick={scrollLeft}
                className="absolute -left-3 md:-left-12 z-10 flex h-8 w-8 items-center justify-center bg-[#D9E5EF] text-[#005a9c] hover:bg-[#b0cde0] transition-colors rounded-[2px] shadow-sm"
                aria-label="Anterior"
              >
                <CaretLeft size={16} weight="bold" />
              </button>

              {/* Carrusel (Scroll snap) */}
              <div
                ref={scrollRef}
                className="hide-scroll flex w-full gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-[240px] md:w-[250px] snap-start bg-white flex flex-col hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative h-48 w-full p-4 flex items-center justify-center bg-white">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        sizes="250px"
                      />
                    </div>
                    <div className="flex flex-col flex-1 px-5 pt-2 pb-0">
                      <h3 className="text-[13px] font-bold text-[#003865] leading-snug line-clamp-4">
                        {product.name}
                      </h3>
                      {product.detail?.model && (
                        <p className="text-[11px] text-[#707E83] mt-auto pt-6 uppercase tracking-wide">
                          Catalog No. {product.detail.model}
                        </p>
                      )}
                    </div>
                    <div className="px-5 pb-5 pt-3 mt-4 border-t border-[#F0F4F8]">
                      <Link
                        href={`/productos/${product.slug ?? product.id}`}
                        className="block w-full bg-[#53843A] text-white text-[13px] font-bold py-2.5 rounded-[2px] text-center transition-colors hover:bg-[#456F31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#53843A]"
                      >
                        Ver producto
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón derecho */}
              <button
                onClick={scrollRight}
                className="absolute -right-3 md:-right-12 z-10 flex h-8 w-8 items-center justify-center bg-[#D9E5EF] text-[#005a9c] hover:bg-[#b0cde0] transition-colors rounded-[2px] shadow-sm"
                aria-label="Siguiente"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
