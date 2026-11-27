import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type ProductContactCtaProps = {
  /** Define `producto` y `from` (`/productos/{slug}`) en /contacto/cotizar. */
  slug: string;
  /** Completa "¿Listo para evaluar el … en tu laboratorio?". */
  productName: string;
  /** Fichas sin compra web: cambia la bajada y los botones por el aviso. */
  availabilityNotice?: { title: string; text: string };
};

export function productContactHref(
  slug: string,
  accion: "cotizar" | "asesoria",
) {
  return `/contacto/cotizar?producto=${slug}&accion=${accion}&from=${encodeURIComponent(`/productos/${slug}`)}`;
}

/** Banda de cierre "Contacto técnico" de las fichas y páginas de familia. */
export function ProductContactCta({
  slug,
  productName,
  availabilityNotice,
}: ProductContactCtaProps) {
  return (
    <section className="relative overflow-hidden bg-[#4A5560] py-16 text-[#F5F5F5] border-t border-[#D4DFDC]">
      {/* Background Image with soft filter overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/productos/854856ec43t5.jpg"
          alt="Fondo de contacto técnico"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A5560]/80 via-[#4A5560]/70 to-[#4A5560]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#D6532B] mb-2">
            Contacto Técnico
          </p>
          <h3 className="text-2xl font-extrabold tracking-tight text-[#F5F5F5] sm:text-3xl leading-tight">
            ¿Listo para evaluar el {productName} en tu laboratorio?
          </h3>
          <p className="mt-2 text-[14px] text-[#F5F5F5]/70 leading-relaxed">
            {availabilityNotice
              ? availabilityNotice.text
              : "Nuestro equipo técnico te asesorará en la configuración de la metodología, calificación del equipo y cotización a medida."}
          </p>
        </div>
        {availabilityNotice ? (
          <aside
            aria-label={availabilityNotice.title}
            className="w-full border border-[#D6532B] bg-[#4A5560]/70 px-5 py-4 text-left md:w-auto md:max-w-sm"
          >
            <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#FBE369]">
              {availabilityNotice.title}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#F5F5F5]/80">
              Sin compra web directa: un ejecutivo define la configuración contigo.
            </p>
            <Button
              asChild
              variant="secondary"
              className="mt-4 min-h-11 border border-white/30 bg-white/10 hover:bg-white/20 text-[#F5F5F5] hover:text-white rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center"
            >
              <Link href={productContactHref(slug, "asesoria")}>
                Consultar con un ejecutivo
              </Link>
            </Button>
          </aside>
        ) : (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <Button
              asChild
              className="bg-[#D6532B] hover:bg-[#b8431e] text-white border-none rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center shadow-md"
            >
              <Link href={productContactHref(slug, "cotizar")}>Cotizar</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border border-white/30 bg-white/10 hover:bg-white/20 text-[#F5F5F5] hover:text-white rounded-[2px] py-4 px-8 text-[12px] font-extrabold uppercase tracking-[0.16em] text-center justify-center"
            >
              <Link href={productContactHref(slug, "asesoria")}>Asesoría</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
