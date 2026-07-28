import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Product } from "@/lib/mock-products";
import { Reveal } from "@/components/motion/reveal";

interface CompatibleAnalyzersSectionProps {
  products: Product[];
}

export function CompatibleAnalyzersSection({
  products,
}: CompatibleAnalyzersSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="border-t border-[#E8E8E8] bg-[#F4F4F4] py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mb-8 flex flex-col items-center text-center">
            <h2 className="font-display text-[26px] font-black uppercase tracking-tight text-[#4A5560] md:text-[32px]">
              Analizadores compatibles
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.slug ?? product.id}`}
                className="group relative flex flex-col overflow-hidden rounded-[4px] border border-[#E8E8E8] bg-white transition-all hover:border-[#D6532B]/50 hover:shadow-[0_12px_30px_rgba(74,85,96,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
              >
                <div className="relative h-44 w-full border-b border-[#E8E8E8] bg-[#F4F4F4] p-6">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>

                <div className="flex flex-1 flex-col px-5 py-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D6532B]">
                    {product.detail?.model ?? "Trace Elemental"}
                  </p>
                  <h3 className="mt-1 text-[15px] font-bold leading-snug text-[#4A5560]">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-5 pb-5 pt-1 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#D6532B]">
                  Ver analizador
                  <ArrowRight size={13} weight="bold" />
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
