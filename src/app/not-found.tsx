import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Página no encontrada | Del Carpio Análisis y Asesorías",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f5f5]/85 text-[#4A5560]">
      <Navigation />

      <main
        id="main-content"
        className="flex flex-1 items-center px-5 py-16 sm:px-8"
      >
        <div className="mx-auto w-full max-w-[720px]">
          <div className="border-l-2 border-[#D6532B] pl-4 md:pl-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#707E83]">
              Error 404
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#4A5560] md:text-5xl">
              Esta página no existe o fue movida
            </h1>
          </div>

          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-slate-500">
            La dirección que ingresaste no corresponde a ninguna sección del
            sitio. Puedes volver al inicio o revisar el catálogo de equipos y
            servicios.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-[8px] bg-[#D6532B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b9451f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
            >
              Volver al inicio
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center rounded-[8px] border border-[#707E83]/40 px-6 py-3 text-sm font-semibold text-[#4A5560] transition hover:border-[#4A5560] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
