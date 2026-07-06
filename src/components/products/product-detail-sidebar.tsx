import {
  CaretDoubleUp,
  CaretDown,
  EnvelopeSimple,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/site";
import type { Product, ProductCategory } from "@/lib/mock-products";

export function ProductDetailSidebar({
  categories,
  recommendedProducts,
}: {
  categories: ProductCategory[];
  recommendedProducts: Product[];
}) {
  return (
    <aside
      className="border border-[#D4DFDC] bg-white lg:sticky lg:top-32"
      aria-label="Navegación secundaria de producto"
    >
      <div className="border-b border-[#D4DFDC] p-5">
        <h2 className="text-[15px] font-semibold text-[#101820]">
          Categorías de producto
        </h2>
      </div>

      <nav aria-label="Categorías de productos">
        <ul className="divide-y divide-[#D4DFDC]">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href="/productos"
                className="group flex min-h-11 items-center justify-between gap-4 px-5 py-3 text-[12px] font-medium text-[#101820] transition-colors hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D6532B]"
              >
                <span>{category}</span>
                <CaretDown
                  size={13}
                  weight="bold"
                  className="shrink-0 text-[#4A5560]/70 transition-colors group-hover:text-[#D6532B]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-[#D4DFDC] p-5">
        <h2 className="text-[15px] font-semibold text-[#101820]">
          Productos recomendados
        </h2>

        <div className="mt-5 divide-y divide-[#D4DFDC]">
          {recommendedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/productos/${product.slug ?? product.id}`}
              className="group grid grid-cols-[88px_1fr] gap-4 py-5 first:pt-0 last:pb-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
            >
              <div className="relative h-20 overflow-hidden bg-[#F4F4F4]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="88px"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0">
                <h3 className="line-clamp-2 text-[12px] font-extrabold leading-snug text-[#101820] transition-colors group-hover:text-[#D6532B]">
                  {product.name}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4A5560]/70">
                  {product.category}
                </p>
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#4A5560]/75">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function ProductQuickRail() {
  const whatsappUrl = `https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <div
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col bg-[#D6532B] xl:flex"
      aria-label="Accesos rápidos"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        <WhatsappLogo size={18} weight="bold" />
      </a>
      <a
        href={`mailto:${company.email}`}
        aria-label="Enviar correo"
        className="flex h-11 w-11 items-center justify-center border-t border-white/20 text-white transition-colors hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
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
