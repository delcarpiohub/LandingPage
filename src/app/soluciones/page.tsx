import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { industries } from "@/content/site";

const industryPhotos: Record<string, string> = {
  alimentos: "/fotos/industrias/alimentos.jpg",
  mineria: "/fotos/industrias/mineria.jpg",
  farmaceutica: "/fotos/industrias/farmaceutica.jpg",
  aguas: "/fotos/laboratorio-frascos-procesos.jpg",
  ambiental: "/fotos/industrias/ambiente.jpg",
  "academia-id": "/fotos/industrias/academia-id.jpg",
};

export const metadata: Metadata = {
  title: "Soluciones por Industria | Del Carpio Análisis y Asesorías",
  description:
    "Instrumentación analítica y servicios técnicos organizados por industria: alimentos, minería, farmacéutica, aguas, ambiental y academia/I+D.",
  alternates: {
    canonical: "/soluciones",
  },
};

export default function SolucionesPage() {
  return (
    <div className="min-h-dvh bg-white/70">
      <Navigation />
      <main id="main-content">
        <section className="relative w-full overflow-hidden bg-[#131C24] pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 min-h-[320px] flex items-center justify-center">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-10">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#D6532B] font-bold">
                Soluciones
              </p>
              <h1 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-wider uppercase">
                Soluciones por Industria
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                Seleccione su sector para ver los servicios técnicos y equipos
                aplicables a su necesidad analítica.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-12 md:py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.05}>
                <Link
                  href={`/soluciones/${industry.slug}`}
                  className="group relative flex min-h-[280px] sm:min-h-[300px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#D4DFDC]/60 bg-[#101820] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Background Photo with smooth gradient overlay */}
                  <div className="absolute inset-0 z-0 select-none">
                    <Image
                      src={industryPhotos[industry.slug]}
                      alt={industry.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-[#101820]/60 to-[#101820]/30 transition-opacity duration-300 group-hover:from-[#101820]/90" />
                  </div>

                  {/* Top Bar: Eyebrow + Circular Arrow Button */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D6532B]">
                      0{index + 1} · Solución
                    </span>
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#D6532B] group-hover:bg-[#D6532B]"
                      aria-hidden="true"
                    >
                      <ArrowRight
                        size={15}
                        weight="bold"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>

                  {/* Bottom Area: Title + Description */}
                  <div className="relative z-10 mt-auto pt-8">
                    <h2 className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-white transition-colors duration-200">
                      {industry.name}
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#F4F4F2]/80 line-clamp-2">
                      {industry.detail}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
