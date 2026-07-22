import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type BrandCatalogNoticeProps = {
  brand: string;
  currentProduct: string;
};

export function BrandCatalogNotice({
  brand,
  currentProduct,
}: BrandCatalogNoticeProps) {
  const quoteParams = new URLSearchParams({
    marca: brand,
    producto: `Producto ${brand} no publicado`,
    origen: `Ficha de ${currentProduct}`,
  });

  return (
    <aside
      aria-label={`Disponibilidad del catalogo ${brand}`}
      className="border-t border-[#D4DFDC] bg-[#F7F9F8] px-5 py-4 sm:px-7 md:px-9"
    >
      <p className="max-w-[92ch] text-base leading-5 text-[#647176]">
        <span className="mr-1 font-extrabold text-[#D6532B]" aria-hidden="true">*</span>
        Del Carpio comercializa el catálogo completo de {brand} por cotización. Para solicitar otro modelo, accesorio o referencia,
        {" "}
        <Link
          href={`/contacto/cotizar?${quoteParams.toString()}`}
          className="inline-flex items-center gap-1 font-bold text-[#4A5560] underline decoration-[#D6532B]/45 underline-offset-4 transition-colors hover:text-[#B8431E] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D6532B]"
        >
          contacte a nuestro equipo
          <ArrowRight size={13} weight="bold" aria-hidden="true" />
        </Link>
        .
      </p>
    </aside>
  );
}
