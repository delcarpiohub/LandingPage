import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { HorizonHeroSection } from "@/components/ui/horizon-hero-section";
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
    <div className="min-h-dvh bg-white">
      <Navigation />
      <main id="main-content">
        <HorizonHeroSection />

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
