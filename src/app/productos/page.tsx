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
        {/* Hero Header Minimalista con Ajuste de Relación de Aspecto y Sombra */}
        <section className="relative w-full h-36 md:h-auto md:aspect-[1024/193] mt-[72px] lg:mt-[132px] bg-white border-b border-[#D4DFDC] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {/* Background Image Banner */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
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

          {/* Centered H1 responsive */}
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4 text-center">
            <h1 className="max-w-5xl text-balance font-display text-[1.8rem] sm:text-[2.2rem] md:text-[3vw] lg:text-[2.6rem] xl:text-[3rem] font-extrabold leading-[1.05] tracking-tight text-[#101820]">
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
