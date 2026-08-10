"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Briefcase, EnvelopeSimple, Gear, Microscope } from "@phosphor-icons/react/dist/ssr";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { ContactMapBanner } from "@/components/sections/contact-map-banner";

const inquiryOptions = [
  {
    id: "tour",
    title: "Agendar Tour de Laboratorio",
    icon: Microscope,
    path: "/contacto/tour-laboratorio",
    items: [
      "Conocer nuestras instalaciones y capacidades técnicas",
      "Revisar equipamiento analítico real",
      "Coordinar una visita con especialistas",
    ],
  },
  {
    id: "ventas",
    title: "Contactar con Ventas",
    icon: Briefcase,
    path: "/contacto/ventas",
    items: [
      "Solicitar cotización de equipos o consumibles",
      "Consultar marcas representadas",
      "Recibir orientación comercial especializada",
    ],
  },
  {
    id: "proyectos",
    title: "Proyectos",
    icon: Gear,
    path: "/contacto/proyectos",
    items: [
      "Evaluar implementaciones de laboratorio",
      "Validación, automatización e instrumentación",
      "Definir alcance técnico con trazabilidad",
    ],
  },
  {
    id: "otras",
    title: "Otras Consultas",
    icon: EnvelopeSimple,
    path: "/contacto/otras-consultas",
    items: [
      "Información general o administrativa",
      "Alianzas y requerimientos no comerciales",
      "Derivar su solicitud al área correcta",
    ],
  },
];

export function ContactCorporateClient() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f5f5]">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Section - Sin fondo, tipografía destacada */}
        <section 
          className="relative w-full pt-28 sm:pt-36 md:pt-40 pb-6 md:pb-8 flex items-center justify-center relative z-10"
        >
          <div className="mx-auto max-w-[800px] px-5 w-full relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-[54px] font-black uppercase tracking-wider text-[#101820] leading-tight">
                Hacer una consulta
              </h1>
              <p className="mt-5 text-sm md:text-base leading-relaxed text-[#4A5560] font-medium max-w-[620px] mx-auto">
                Nuestro equipo técnico analizará su requerimiento para entregar
                una respuesta clara, especializada y alineada con las
                necesidades de su laboratorio o proceso industrial.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. Channels Grid - Original card dimensions */}
        <section id="canales" className="px-4 pb-20 sm:pb-28 md:pb-36 pt-4 relative z-20 flex items-center justify-center">
          <div className="mx-auto grid w-full max-w-[1240px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-5 relative z-30">
            {inquiryOptions.map((option) => {
              const Icon = option.icon;

              return (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="h-full"
                >
                  <Link
                    href={option.path}
                    className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-[#d9e0e5] bg-white shadow-[0_2px_6px_rgba(74,85,96,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[var(--primary)] hover:shadow-[0_12px_28px_rgba(74,85,96,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] sm:min-h-[300px] lg:min-h-[340px]"
                  >
                    {/* Gray header block with centered terracota icon */}
                    <span className="grid h-[88px] place-items-center bg-[#4A5560] md:h-[110px] lg:h-[120px]">
                      <Icon
                        size={44}
                        weight="light"
                        aria-hidden="true"
                        className="text-[#D6532B] transition-transform duration-300 group-hover:scale-105"
                      />
                    </span>
                    <span className="flex flex-1 flex-col px-5 pb-6 pt-5">
                      <h2 className="font-sans text-[18px] font-normal leading-[1.3] text-[#4A5560] md:text-[19px]">
                        {option.title}
                      </h2>
                      <span className="mt-4 grid gap-[10px]">
                        {option.items.map((item) => (
                          <span
                            key={item}
                            className="block text-[12px] font-normal leading-[1.5] text-[#4A5560]/84 md:text-[12.5px]"
                          >
                            {item}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <ContactMapBanner />
      </main>

      <Footer />
    </div>
  );
}
