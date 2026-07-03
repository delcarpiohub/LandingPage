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
        <section className="relative w-full overflow-hidden bg-[#101820] pt-20 pb-12 md:pt-24 md:pb-14 lg:pt-40 lg:pb-24">
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
          <div className="pointer-events-none absolute -top-[200px] right-0 h-[420px] w-[420px] rounded-full bg-[#D6532B] opacity-10 blur-[100px] mix-blend-screen lg:h-[600px] lg:w-[600px] lg:blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-wide px-4 text-center sm:px-6 lg:px-10">
            <h1 className="mx-auto max-w-5xl text-balance font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-[#F5F5F5] sm:text-5xl lg:text-6xl">
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
