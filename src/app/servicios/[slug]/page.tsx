import {
  ArrowLeft,
  ArrowRight,
  BowlSteam,
  Flask,
  Leaf,
  Microscope,
  Mountains,
  Pill,
  Waves,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { industries, services } from "@/content/site";

const industryIcons: Record<string, Icon> = {
  Alimentos: BowlSteam,
  Minería: Mountains,
  Farmacéutica: Pill,
  Aguas: Waves,
  Ambiental: Leaf,
  "Academia / I+D": Microscope,
};

const sectorColors: Record<string, string> = {
  Alimentos: "#FBE369",
  Minería: "#D6532B",
  Farmacéutica: "#4A5560",
  Aguas: "#53843A",
  Ambiental: "#53843A",
  "Academia / I+D": "#4A5560",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Del Carpio Análisis y Asesorías`,
    description: service.description,
    alternates: {
      canonical: `/servicios/${service.slug}`,
    },
  };
}

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Fallback: muestra todos los sectores hasta que lleguen los datos reales (ClickUp)
  const applicableSectors = service.sectors
    ? industries.filter((i) => service.sectors!.includes(i.name))
    : industries;

  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <Navigation />
      <main id="main-content">
        {/* Breadcrumb */}
        <div className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex min-w-0 flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                <li>
                  <Link href="/servicios" className="flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]">
                    <ArrowLeft size={12} />
                    Servicios
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="min-w-0 break-words text-[var(--foreground)]">{service.title}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-14 md:py-[4.5rem] lg:py-20">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                Servicio
              </p>
              <h1 className="mt-4 max-w-3xl text-[2.35rem] font-semibold leading-[1] tracking-normal text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] md:mt-7 md:text-lg md:leading-8">
                {service.description}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Sectores de aplicación */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:py-20 lg:py-24">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                Sectores de aplicación
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl md:text-5xl">
                Industrias donde aplicamos este servicio.
              </h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {applicableSectors.map((industry, index) => {
              const IndustryIcon = industryIcons[industry.name] ?? Flask;
              const accentColor = sectorColors[industry.name] ?? "#D6532B";
              const iconTextColor = accentColor === "#FBE369" ? "#4A5560" : "#ffffff";
              return (
                <Reveal key={industry.name} delay={index * 0.05}>
                  <article className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6 md:p-7">
                    <div
                      className="grid size-11 place-items-center rounded-full"
                      style={{ backgroundColor: accentColor, color: iconTextColor }}
                    >
                      <IndustryIcon size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">
                      {industry.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {industry.detail}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-16 text-center md:py-20 lg:py-24">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                Próximo paso
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl md:text-5xl">
                ¿Qué necesita tu operación?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
                Cuéntanos tu desafío analítico y definimos el método, el equipo y el soporte adecuado.
              </p>
              <Button asChild className="mt-8">
                <Link href="/#contacto">
                  Solicitar evaluación técnica
                  <ArrowRight size={17} weight="bold" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
