import { Metadata } from "next";
import { ProductCatalog } from "@/components/sections/product-catalog";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Productos | Del Carpio",
  description:
    "Explora nuestro catálogo completo de instrumentación analítica: HPLC, GC, espectrofotometría y equipamiento de laboratorio.",
};

export default function ProductosPage() {
  return (
    <div className="min-h-dvh bg-[#F4F4F4] flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-grow">
        <section className="relative h-[clamp(9rem,18vw,16rem)] w-full overflow-hidden border-y border-[#D4DFDC] bg-white shadow-[0_12px_26px_rgba(0,0,0,0.16)]">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/productos/hero-productos-v2.jpg')",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_18px_30px_-18px_rgba(0,0,0,0.48),inset_0_-18px_30px_-18px_rgba(0,0,0,0.48)]"
            aria-hidden="true"
          />
          <h1 className="sr-only">Instrumentación analítica de precisión</h1>
        </section>

        <ProductCatalog />
      </main>

      <Footer />
    </div>
  );
}
