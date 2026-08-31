import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/mock-products";

import { SolutionReveal } from "./solution-reveal";

function productHref(product: Product) {
  return `/productos/${product.slug ?? product.id}`;
}

type SolutionCompatibleEquipmentProps = {
  industryName: string;
  products: Product[];
};

// Grilla completa de equipos con compatibilidad TEXTUAL EXPLÍCITA verificada
// contra mock-products.ts (no solo coincidencia de categoría) — ver
// SolutionPageConfig.compatibleEquipmentSlugs. Reemplaza el layout curado de
// 4 productos cuando el industry config trae esta lista.
export function SolutionCompatibleEquipment({
  industryName,
  products,
}: SolutionCompatibleEquipmentProps) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-[var(--border)] pt-10 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <SolutionReveal key={product.id} delay={(index % 3) * 0.04}>
          <Link
            href={productHref(product)}
            className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE369] focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--border)] bg-[var(--panel)]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-contain p-6 transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
              {product.category}
            </p>
            <h3 className="mt-2 font-display text-lg leading-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)]">
              {product.name}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
              {product.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
              Ver producto
              <ArrowRight size={15} weight="bold" />
            </span>
          </Link>
        </SolutionReveal>
      ))}
      {products.length === 0 && (
        <p className="text-sm leading-6 text-[var(--muted)]">
          Consulte al equipo técnico por el equipamiento aplicable a{" "}
          {industryName.toLowerCase()}.
        </p>
      )}
    </div>
  );
}
