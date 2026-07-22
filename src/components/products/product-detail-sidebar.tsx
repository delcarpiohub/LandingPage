import {
  CaretDoubleUp,
  CaretDown,
  EnvelopeSimple,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { company } from "@/content/site";
import type { ProductCategory } from "@/lib/mock-products";

export function ProductDetailSidebar({
  categories,
}: {
  categories: ProductCategory[];
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
