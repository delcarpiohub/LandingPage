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
        <section className="relative h-[clamp(20rem,18vw,35rem)] w-full overflow-hidden border-y border-[#D4DFDC] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.16)]">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/productos/hero-productos-dark.jpg')",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_16px_24px_-16px_rgba(0,0,0,0.48),inset_0_-16px_24px_-16px_rgba(0,0,0,0.48)]"
            aria-hidden="true"
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02] mix-blend-overlay"
            aria-hidden="true"
          >
            <filter id="productos-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#productos-noise)" />
          </svg>
          <h1 className="sr-only">Productos</h1>
        </section>

        <ProductCatalog />
      </main>

      <Footer />
    </div>
  );
}
