import { Metadata } from "next";
import { ProductCatalog } from "@/components/sections/product-catalog";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Productos | Del Carpio",
  description: "Explora nuestro catálogo completo de instrumentación analítica: HPLC, GC, Espectrofotometría y Equipamiento de Laboratorio.",
};

export default function ProductosPage() {
  return (
    <div className="min-h-dvh bg-[#F4F4F4] flex flex-col">
      <Navigation />
      
      <main id="main-content" className="flex-grow">
        {/* Hero Header Minimalista */}
        <section className="relative w-full bg-[#101820] pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
          {/* Texture overlay */}
          <svg
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <filter id="noiseFilterProductos">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterProductos)" />
          </svg>

          {/* Decorative Gradient */}
          <div className="absolute -top-[200px] right-0 w-[600px] h-[600px] bg-[#D6532B] opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

          <div className="mx-auto max-w-wide px-6 lg:px-10 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#F5F5F5] tracking-tight text-balance mx-auto">
              Instrumentación Analítica de Precisión
            </h1>
          </div>
        </section>

        {/* Catálogo Interactivo */}
        <ProductCatalog />
      </main>

      <Footer />
    </div>
  );
}
