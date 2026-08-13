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
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#FBE369]">
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

        <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.05}>
                <Link
                  href={`/soluciones/${industry.slug}`}
                  className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-[1.25rem] border border-[var(--border)]"
                >
                  <Image
                    src={industryPhotos[industry.slug]}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative z-10 p-6">
                    <h2 className="text-xl font-semibold text-white">{industry.name}</h2>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 group-hover:text-[#FBE369]">
                      Ver soluciones
                      <ArrowRight size={13} weight="bold" />
                    </span>
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
