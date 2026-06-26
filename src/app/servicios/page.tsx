import {
  ArrowRight,
  ArrowUpRight,
  BowlSteam,
  CheckCircle,
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

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { industries, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Servicios | Del Carpio Análisis y Asesorías",
  description:
    "Servicios analíticos HPLC y GC para alimentos, minería, farmacéutica, aguas, ambiental y academia. Validación de métodos, mantención y proyectos de laboratorio completo.",
};

const industryIcons: Record<string, Icon> = {
  Alimentos: BowlSteam,
  Minería: Mountains,
  Farmacéutica: Pill,
  Aguas: Waves,
  Ambiental: Leaf,
  "Academia / I+D": Microscope,
};

// sector.* tokens de tailwind.config.ts — hardcodeados aquí para inline styles
const sectorColors: Record<string, string> = {
  Alimentos: "#FBE369",
  Minería: "#D5542B",
  Farmacéutica: "#101820",
  Aguas: "#53843A",
  Ambiental: "#53843A",
  "Academia / I+D": "#101820",
};

const serviceTitles = services.map((s) => s.title);

export default function ServiciosPage() {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <Navigation />
      <main>
        {/* Encabezado de página */}
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                Servicios
              </p>
              <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-normal text-[var(--foreground)] md:text-7xl">
                Métodos analíticos para cada sector industrial.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Diagnóstico, implementación, validación y soporte técnico para HPLC y GC en seis sectores industriales.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4 servicios transversales */}
        <section className="mx-auto max-w-7xl px-5 py-24">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                Capacidades analíticas
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-5xl">
                Un sistema de trabajo completo, no una lista de productos.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.05}>
                <Link href={`/servicios/${service.slug}`} className="block">
                  <article className="group min-h-64 rounded-[1.5rem] border border-[var(--border)] bg-white p-7 transition-colors hover:border-[var(--accent)]">
                    <div className="flex items-start justify-between gap-6">
                      <CheckCircle size={28} weight="duotone" className="text-[var(--accent)]" />
                      <ArrowUpRight
                        size={22}
                        className="text-[var(--muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                    <h3 className="mt-12 text-2xl font-semibold text-[var(--foreground)]">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
                      {service.description}
                    </p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 6 sectores */}
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-24">
            <Reveal>
              <div className="max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Sectores atendidos
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--foreground)] md:text-5xl">
                  Aplicación analítica adaptada a cada industria.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => {
                const IndustryIcon = industryIcons[industry.name] ?? Flask;
                const accentColor = sectorColors[industry.name] ?? "#D5542B";
                const iconTextColor = accentColor === "#FBE369" ? "#101820" : "#ffffff";
                // Fallback a los 4 servicios generales hasta que lleguen los datos reales
                const sectorServices = industry.featuredServices ?? serviceTitles;
                return (
                  <Reveal key={industry.name} delay={index * 0.05}>
                    <article className="flex flex-col rounded-[1.5rem] border border-[var(--border)] bg-white p-7 transition-colors hover:border-[var(--accent)]">
                      <div
                        className="grid size-11 place-items-center rounded-full"
                        style={{ backgroundColor: accentColor, color: iconTextColor }}
                      >
                        <IndustryIcon size={22} />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-[var(--foreground)]">
                        {industry.name}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--muted)]">
                        {industry.detail}
                      </p>
                      <ul className="mt-6 flex flex-col gap-1.5">
                        {sectorServices.map((title) => (
                          <li
                            key={title}
                            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]"
                          >
                            <span className="size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                            {title}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-24 text-center">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                Próximo paso
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-[var(--foreground)] md:text-5xl">
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
