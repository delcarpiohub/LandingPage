import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { PanoramaViewer } from "@/components/tour/panorama-viewer";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Tour Virtual Laboratorio de An\u00e1lisis | Del Carpio",
  description:
    "Primera seccion del tour virtual del Laboratorio de An\u00e1lisis Del Carpio, con areas AA, ICP-OES e ICP-MS.",
};

export default function TourLaboratorioPage() {
  return (
    <div className="min-h-dvh bg-white text-[#101820]">
      <Navigation />

      <main id="main-content">
        {/* SECCIÓN 1 — Entrada e Identidad del Laboratorio. Más secciones se agregan aquí a medida que lleguen las fotos. */}
        <section className="border-b border-[#101820]/10 bg-white">
          <div className="mx-auto max-w-[1320px] px-5 py-10 md:py-14">
            <div className="relative min-h-[560px] overflow-hidden bg-[#101820] md:min-h-[680px]">
              <Image
                src="/tour/seccion1/puerta-icp-oes.jpg"
                alt="Puerta del laboratorio Del Carpio con letrero AA, ICP-OES e ICP-MS y sala visible"
                fill
                priority
                sizes="(min-width: 1320px) 1280px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,32,0.86)_0%,rgba(16,24,32,0.56)_42%,rgba(16,24,32,0.14)_100%)]" />

              <div className="relative z-10 flex min-h-[560px] items-end p-6 md:min-h-[680px] md:p-12 lg:p-16">
                <div className="max-w-2xl">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#D5542B]">
                    Tour virtual Del Carpio
                  </p>
                  <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
                    Laboratorio de An&aacute;lisis
                  </h1>
                  <p className="mt-5 font-sans text-lg font-semibold leading-8 text-white/86 md:text-2xl">
                    AA {"\u00b7"} ICP-OES {"\u00b7"} ICP-MS
                  </p>
                </div>
              </div>
            </div>

            <PanoramaViewer imageSource="/tour/seccion1/panorama-laboratorio.jpg" />

            <div className="mt-10 flex justify-start">
              <Button asChild>
                <Link href="/contacto">Solicitar visita t&eacute;cnica</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
