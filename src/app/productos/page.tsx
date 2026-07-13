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
        <section className="relative w-full overflow-hidden bg-white mt-[72px] lg:mt-[132px] pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20 border-b border-[#D4DFDC]">
          {/* Background Image Banner */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url('/productos/hero-bg.png')" }}
          />

          {/* Texture overlay */}
          <svg
            className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay w-full h-full"
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

          <div className="relative z-10 mx-auto max-w-wide px-4 text-center sm:px-6 lg:px-10">
            <h1 className="mx-auto max-w-5xl text-balance font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-[#101820] sm:text-5xl lg:text-6xl">
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
