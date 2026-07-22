import type { ReactNode } from "react";

import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";

export function RestekProductPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#F7F9F8] text-[#4A5560]">
      <Navigation />
      <main id="main-content" className="flex-grow">
        <section
          aria-label="Productos Del Carpio"
          className="relative h-[clamp(20rem,18vw,35rem)] w-full overflow-hidden border-y border-[#D4DFDC] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.16)]"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/productos/hero-productos-dark.jpg')" }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_16px_24px_-16px_rgba(0,0,0,0.48),inset_0_-16px_24px_-16px_rgba(0,0,0,0.48)]"
            aria-hidden="true"
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02] mix-blend-overlay"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <filter id="noiseFilterProductosRestek">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterProductosRestek)" />
          </svg>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}
