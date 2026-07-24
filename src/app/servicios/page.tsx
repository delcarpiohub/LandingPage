import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Student,
  ShieldCheck,
  FirstAid,
  Microscope,
  Phone,
  EnvelopeSimple,
  MapPin,
  ArrowRight,
  CheckCircle,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Servicios Técnicos y Analíticos | Del Carpio Análisis y Asesorías",
  description:
    "Servicios especializados de laboratorio: Instalación, Puesta en marcha, Capacitación, Mantención preventiva, Correctivo y Diagnóstico para HPLC, GC e instrumentación analítica en Chile.",
  alternates: {
    canonical: "/servicios",
  },
};

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
    badgeColor: "#D6532B",
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
    image: "/fotos/laboratorio-metodologia-mg-0795.jpg",
    icon: Microscope,
    badgeColor: "#4A5560",
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
    image: "/proyectos/feature-5-estaciones-trabajo.jpg",
    icon: FirstAid,
    badgeColor: "#53843A",
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
    image: "/fotos/equipo-del-carpio.jpg",
    icon: Student,
    badgeColor: "#4A5560",
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
      {/* 1. TOP BAR */}
      <div className="hidden border-b border-[#E5E5E5] bg-white py-2.5 text-xs text-[#4A5560] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2 transition-colors hover:text-[#D6532B]"
            >
              <EnvelopeSimple size={15} className="text-[#D6532B]" />
              <span>{company.email}</span>
            </a>
            <a
              href={`tel:${company.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-[#D6532B]"
            >
              <Phone size={15} className="text-[#D6532B]" />
              <span>{company.phone}</span>
            </a>
            <span className="flex items-center gap-2 text-[#707E83]">
              <MapPin size={15} className="text-[#D6532B]" />
              <span>{company.location}</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#707E83]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#D6532B]">
              Cobertura en todo Chile
            </span>
            <div className="h-3 w-px bg-[#E5E5E5]" />
            <div className="flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Del Carpio"
                className="transition-colors hover:text-[#D6532B]"
              >
                <LinkedinLogo size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Del Carpio"
                className="transition-colors hover:text-[#D6532B]"
              >
                <FacebookLogo size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Del Carpio"
                className="transition-colors hover:text-[#D6532B]"
              >
                <InstagramLogo size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <Navigation />

      <main id="main-content">
        {/* 3. SERVICES SECTION HEADER */}
        <section className="bg-[#F8F9FA] py-16 md:py-20 border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#D6532B]">
              </p>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-[#101820] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Nuestros Servicios
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#737373] md:text-lg">
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4. SERVICES GRID (2x2 grid for 4 services) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
              {servicesData.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Reveal key={service.id} delay={index * 0.06}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#D6532B]/40 hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]">
                      {/* Top Contextual Image */}
                      <div className="relative h-52 w-full overflow-hidden bg-[#F4F4F4]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Middle Circular Badge overlapping bottom edge of image */}
                      <div className="relative z-10 -mt-7 mx-auto flex size-14 items-center justify-center rounded-full border-2 border-[#D6532B] bg-white text-[#D6532B] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D6532B] group-hover:text-white">
                        <IconComponent size={26} weight="bold" />
                      </div>

                      {/* Bottom Service Content */}
                      <div className="flex flex-1 flex-col p-6 pt-4 text-center sm:p-8 sm:pt-4">
                        <h2 className="font-display text-2xl font-extrabold text-[#101820] group-hover:text-[#D6532B] transition-colors">
                          {service.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                          {service.description}
                        </p>

                        {/* Bullet feature list */}
                        <div className="my-6 border-t border-[#E5E5E5]/80 pt-4 text-left">
                          <ul className="flex flex-col gap-2.5">
                            {service.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5 text-xs font-semibold text-[#4A5560]">
                                <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-[#D6532B]" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Link / Button */}
                        <div className="mt-auto pt-2">
                          <Button asChild variant="secondary" className="w-full justify-center border border-[#D6532B] text-[#D6532B] hover:bg-[#D6532B] hover:text-white transition-colors">
                            <Link href="/contacto/proyectos" className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                              <span>Solicitar servicio</span>
                              <ArrowRight size={15} weight="bold" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. CTA BANNER SECTION */}
        <section className="relative overflow-hidden bg-[#4A5560] text-white py-16 md:py-20">
          {/* Subtle line-art technical grid pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left Pane: Specialist Photo Cutout */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[360px] lg:max-w-[420px] aspect-[4/3] rounded-[12px] overflow-hidden border-4 border-white/20 shadow-2xl">
                  <Image
                    src="/contacto-ayuda-1.png"
                    alt="Especialista técnico Del Carpio"
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Right Pane: Heading, Description & Contact Group */}
              <div className="lg:col-span-7 text-left flex flex-col justify-center">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FBE369]">
                  ATENCIÓN PRIORITARIA EN CHILE
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  ¿Tiene un problema o requerimiento técnico en su laboratorio?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
                  Nuestros ingenieros especialistas en HPLC, GC e instrumentación analítica de precisión están listos para atenderle con diagnóstico en terreno, repuestos originales y soporte calificado.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-6 rounded-[8px] bg-white/10 p-6 backdrop-blur-md border border-white/15">
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 place-items-center rounded-full bg-[#D6532B] text-white shrink-0 shadow-lg">
                      <Phone size={24} weight="bold" />
                    </div>
                    <div>
                      <span className="block font-mono text-xs uppercase tracking-wider text-white/70">
                        Atención directa
                      </span>
                      <a
                        href={`tel:${company.phone.replace(/\s+/g, "")}`}
                        className="text-xl font-extrabold text-white hover:text-[#FBE369] transition-colors"
                      >
                        {company.phone}
                      </a>
                    </div>
                  </div>

                  <div className="hidden sm:block h-10 w-px bg-white/20" />

                  <Button asChild className="bg-[#D6532B] text-white hover:bg-white hover:text-[#4A5560] font-bold tracking-wider uppercase transition-colors shrink-0 py-3 px-6 text-sm">
                    <Link href="/contacto/proyectos">
                      Cotizar servicio
                      <ArrowRight size={18} weight="bold" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}

