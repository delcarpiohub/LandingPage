"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { ContactMapBanner } from "@/components/sections/contact-map-banner";
import { company } from "@/content/site";

const inquiryOptions = [
  {
    id: "tour",
    title: "Agendar Tour de Laboratorio",
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
    path: "/contacto/otras-consultas",
    items: [
      "Información general o administrativa",
      "Alianzas y requerimientos no comerciales",
      "Derivar su solicitud al área correcta",
    ],
  },
];

const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.130985223326!2d-70.60334812347715!3d-33.47190397337923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf83f4f46401%3A0xe54e38c92a95c935!2sAv.%20Sucre%202596%2C%20%C3%91u%C3%B1oa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1719777900000!5m2!1ses-419!2scl";

export function ContactCorporateClient() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f5f5]">
      <Navigation />

      <main id="main-content" className="flex-1">
        <section 
          className="relative w-full min-h-[280px] md:min-h-[340px] py-16 md:py-20 lg:py-24 overflow-hidden flex items-center justify-center bg-[#101820]"
          style={{ 
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.06) 1.5px, transparent 1.5px)", 
            backgroundSize: "24px 24px" 
          }}
        >
          <div className="mx-auto max-w-[800px] px-5 w-full relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-tight">
                Hacer una consulta
              </h1>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-white/70 max-w-[620px] mx-auto">
                Nuestro equipo técnico analizará su requerimiento para entregar
                una respuesta clara, especializada y alineada con las
                necesidades de su laboratorio o proceso industrial.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="canales" className="bg-[#f7f7f7] px-4 pt-0 pb-12 md:pb-16 lg:px-0 lg:pb-[96px] relative z-20">
          <div className="mx-auto grid max-w-[1240px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-5 -mt-12 md:-mt-16 lg:-mt-20 relative z-30">
            {inquiryOptions.map((option) => {
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
                    <span className="block h-[88px] bg-[#4A5560] md:h-[110px] lg:h-[120px]" />
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
