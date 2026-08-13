import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Student,
  ShieldCheck,
  FirstAid,
  Microscope,
  ArrowRight,
  CheckCircle,
  EnvelopeSimple,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { SolutionReveal } from "@/components/solutions/solution-reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { ServiceInquiryCta } from "@/components/sections/service-inquiry-cta";
import { company, industries } from "@/content/site";
import { PipeCornerAccent } from "@/components/ui/pipe-corner-accent";

const PAGE_DESCRIPTION =
  "Servicios especializados de laboratorio: Instalación, Puesta en marcha, Capacitación, Mantención preventiva, Correctivo y Diagnóstico para HPLC, GC e instrumentación analítica en Chile.";

export const metadata: Metadata = {
  title: "Servicios Técnicos y Analíticos | Del Carpio Análisis y Asesorías",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/servicios",
  },
};

// Contenido de los 4 servicios sin cambios respecto a la versión anterior de
// esta página: mismos ids, slugs, títulos, descripciones y features reales.
// Solo cambia cómo se presentan visualmente.
const servicesData = [
  {
    id: "mantencion",
    slug: "mantencion-soporte",
    title: "Mantención",
    subtitle: "Programas preventivos de conservación",
    description:
      "Mantenimiento preventivo periódico diseñado para prolongar la vida útil de sus instrumentos, prevenir paradas no programadas y asegurar la reproducibilidad de sus mediciones analíticas.",
    image: "/fotos/mantencion-laboratorio-tecnica.jpg",
    icon: ShieldCheck,
    features: [
      "Reemplazo preventivo de sellos, pistones y lámparas",
      "Limpieza técnica y desinfección de sistemas fluídicos",
      "Revisión y calibración de detectores e inyectores",
      "Informe técnico detallado de estado operacional",
    ],
  },
  {
    id: "diagnostico",
    slug: "validacion-trazabilidad",
    title: "Diagnóstico",
    subtitle: "Evaluación integral de parque analítico",
    description:
      "Auditoría técnica detallada para evaluar el desempeño, trazabilidad y estado de conservación de sus equipos de laboratorio, así como la optimización de métodos analíticos existentes bajo NCh-ISO 17025.",
    image: "/fotos/diagnostico-laboratorio-tecnica.jpg",
    icon: Microscope,
    features: [
      "Auditoría técnica de parque de instrumentos",
      "Evaluación de deriva, ruido y pérdida de sensibilidad",
      "Revisión de métodos e idoneidad de sistema",
      "Dictamen de viabilidad técnica y recomendación de upgrade",
    ],
  },
  {
    id: "correctivo",
    slug: "mantencion-soporte",
    title: "Correctivo",
    subtitle: "Reparación de urgencia y repuestos originales",
    description:
      "Servicio reactivo de alta respuesta ante fallas críticas o averías. Diagnóstico especializado en terreno o laboratorio central, sustitución de componentes dañados con repuestos genuinos y puesta a punto.",
    image: "/fotos/correctivo-laboratorio-tecnico.jpg",
    icon: FirstAid,
    features: [
      "Atención prioritaria previa evaluación técnica",
      "Diagnóstico electrónico, mecánico y óptico",
      "Repuestos originales garantizados",
      "Pruebas de verificación de desempeño posreparación",
    ],
  },
  {
    id: "capacitacion",
    slug: "validacion-trazabilidad",
    title: "Capacitación",
    subtitle: "Formación técnica a analistas y profesionales",
    description:
      "Programas de formación teórica y práctica en sitio para analistas y jefes de laboratorio. Transferencia de conocimiento en manejo de software, mantenimiento de rutina y optimización de métodos.",
    image: "/fotos/capacitacion-laboratorio-tecnica.jpg",
    icon: Student,
    features: [
      "Entrenamiento práctico en hardware y software",
      "Buenas prácticas cromatográficas y analíticas",
      "Resolución de problemas frecuentes (Troubleshooting)",
      "Certificado técnico por participante",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <div className="min-h-dvh bg-white">
      {/* 1. MAIN NAVIGATION */}
      <Navigation />

      <main id="main-content">
        {/* 2. HERO — editorial, contenido alineado a la izquierda */}
        <section className="relative w-full overflow-hidden bg-[#4A5560] pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-28 min-h-[440px] md:min-h-[560px] flex items-center">
          <Image
            src="/servicios/header-servicios-laboratorio.png"
            alt="Servicio técnico en laboratorio analítico Del Carpio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay de marca (ink) para legibilidad, más marcado a la izquierda donde va el texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A5560]/92 via-[#4A5560]/60 to-[#4A5560]/20" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
            <SolutionReveal>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#FBE369]">
                Servicios Técnicos y Analíticos
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl">
                Nuestros Servicios
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                {PAGE_DESCRIPTION}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild variant="primary">
                  <a href="#consulta">
                    {company.primaryCta}
                    <ArrowRight size={16} weight="bold" />
                  </a>
                </Button>
                <Button asChild variant="ghost-white">
                  <a href="#lista-servicios">{company.secondaryCta}</a>
                </Button>
              </div>
            </SolutionReveal>
          </div>
        </section>

        {/* 3. LISTA EDITORIAL DE SERVICIOS — filas alternadas, no grilla de tarjetas iguales */}
        <section id="lista-servicios" className="relative overflow-hidden bg-white py-16 md:py-24">
          <PipeCornerAccent corner="top-right" size="sm" />

          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <SolutionReveal>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#D6532B]">
                Qué hacemos
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold text-[#4A5560] sm:text-4xl">
                Cuatro servicios, un mismo estándar técnico.
              </h2>
            </SolutionReveal>

            <div className="mt-12 md:mt-16">
              {servicesData.map((service, index) => {
                const IconComponent = service.icon;
                const imageFirst = index % 2 === 0;
                return (
                  <SolutionReveal key={service.id} delay={index * 0.05}>
                    <article
                      id={service.id}
                      className="scroll-mt-32 border-t border-[#E5E5E5] py-10 first:border-t-0 md:py-14 lg:scroll-mt-40"
                    >
                      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-14">
                        <div className={imageFirst ? "md:order-1" : "md:order-2"}>
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F4F4] md:aspect-[16/11]">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                          <div className="flex items-center gap-3">
                            <IconComponent size={22} weight="regular" className="text-[#D6532B]" />
                            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#707E83]">
                              {service.subtitle}
                            </p>
                          </div>
                          <h3 className="mt-4 font-display text-2xl font-extrabold text-[#4A5560] sm:text-3xl">
                            {service.title}
                          </h3>
                          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#666666] md:text-base">
                            {service.description}
                          </p>

                          <ul className="mt-6 flex flex-col gap-2.5">
                            {service.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5 text-sm text-[#4A5560]">
                                <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-[#D6532B]" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={`/contacto/${service.id}`}
                            className="group mt-7 inline-flex items-center gap-2 border-b border-[#D6532B] pb-1 text-sm font-bold uppercase tracking-wider text-[#D6532B] transition-colors hover:border-[#B54725] hover:text-[#B54725]"
                          >
                            Solicitar servicio
                            <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </SolutionReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. BLOQUE DESTACADO — split imagen real + panel ink, sin cifras inventadas */}
        <section className="relative overflow-hidden bg-white">
          <div className="grid md:grid-cols-2">
            <div className="relative h-72 md:h-auto">
              <Image
                src="/fotos/especialista-soporte-terreno.jpg"
                alt="Especialista Del Carpio en soporte técnico en terreno"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex items-center bg-[#4A5560] px-6 py-16 md:px-14 md:py-0 lg:px-20">
              <SolutionReveal className="max-w-md">
                <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#FBE369]">
                  Atención prioritaria en Chile
                </p>
                <h2 className="mt-4 font-display text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                  ¿Tiene un problema o requerimiento técnico en su laboratorio?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                  Escríbanos directamente o complete el formulario técnico más abajo.
                </p>

                <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6">
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, "")}`}
                    className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white transition-colors hover:text-[#FBE369]"
                  >
                    <Phone size={17} weight="bold" />
                    {company.phone}
                    <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white transition-colors hover:text-[#FBE369]"
                  >
                    <EnvelopeSimple size={17} weight="bold" />
                    {company.email}
                    <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </SolutionReveal>
            </div>
          </div>
        </section>

        {/* 5. SECTORES — lista editorial con separadores, no tarjetas repetidas */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-10">
          <SolutionReveal>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#D6532B]">
              Dónde aplicamos
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold text-[#4A5560] sm:text-4xl">
              Sectores donde entregamos estos servicios.
            </h2>
          </SolutionReveal>

          <div className="mt-10 md:mt-14">
            {industries.map((industry, index) => (
              <SolutionReveal key={industry.slug} delay={index * 0.04}>
                <Link
                  href={`/soluciones/${industry.slug}`}
                  className="group grid grid-cols-1 items-center gap-2 border-t border-[#E5E5E5] py-6 last:border-b md:grid-cols-[minmax(0,220px)_1fr_auto] md:gap-8"
                >
                  <h3 className="font-display text-lg font-bold text-[#4A5560] transition-colors group-hover:text-[#D6532B] sm:text-xl">
                    {industry.name}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-[#666666]">
                    {industry.detail}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#707E83] transition-colors group-hover:text-[#D6532B]">
                    Ver soluciones
                    <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </SolutionReveal>
            ))}
          </div>
        </section>

        {/* 6. CONTACTO TÉCNICO — mismo formulario/lógica, sin cambios de contenido */}
        <div id="consulta" className="scroll-mt-24">
          <ServiceInquiryCta />
        </div>
      </main>

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
}
