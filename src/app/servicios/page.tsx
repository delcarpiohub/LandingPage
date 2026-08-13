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
import { ServiceInquiryCta } from "@/components/sections/service-inquiry-cta";
import { company } from "@/content/site";
import { PipeCornerAccent } from "@/components/ui/pipe-corner-accent";

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
    image: "/fotos/diagnostico-laboratorio-tecnica.jpg",
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
    image: "/fotos/correctivo-laboratorio-tecnico.jpg",
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
    image: "/fotos/capacitacion-laboratorio-tecnica.jpg",
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
      {/* 1. MAIN NAVIGATION */}
      <Navigation />

      <main id="main-content">
        {/* 2. SERVICES SECTION HEADER */}
        <section className="relative w-full overflow-hidden bg-[#131C24] pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-20 md:pb-28 min-h-[360px] md:min-h-[440px] flex items-center justify-center">
          <Image
            src="/servicios/header-servicios-laboratorio.png"
            alt="Fondo Servicios Del Carpio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-10">
            <Reveal>
              <h1 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase drop-shadow-md">
                Nuestros Servicios
              </h1>
            </Reveal>
          </div>
        </section>

        {/* 4. SERVICES GRID (2x2 grid for 4 services) */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-white">
          <PipeCornerAccent corner="top-right" size="sm" />

          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
              {servicesData.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Reveal key={service.id} delay={index * 0.06}>
                    <article
                      id={service.id}
                      className="group relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#D6532B]/40 hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] lg:scroll-mt-40">
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

                      {/* Bottom Service Content */}
                      <div className="flex flex-1 flex-col p-6 sm:p-8 text-center">
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
                            <Link href={`/contacto/${service.id}`} className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
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
        <ServiceInquiryCta />
      </main>

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}

