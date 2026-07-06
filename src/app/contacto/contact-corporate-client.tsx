"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Briefcase, EnvelopeSimple, Gear, Microscope } from "@phosphor-icons/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { ContactMapBanner } from "@/components/sections/contact-map-banner";
import { company } from "@/content/site";

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

const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.130985223326!2d-70.60334812347715!3d-33.47190397337923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf83f4f46401%3A0xe54e38c92a95c935!2sAv.%20Sucre%202596%2C%20%C3%91u%C3%B1oa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1719777900000!5m2!1ses-419!2scl";

export function ContactCorporateClient() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f5f5]">
      <Navigation />

      <main id="main-content" className="flex-1">
        <section className="grid bg-[#f5f5f5] md:min-h-[440px] md:grid-cols-[50%_50%] lg:min-h-[500px] lg:grid-cols-[42%_58%]">
          <div className="flex items-center px-5 py-10 sm:px-8 md:px-10 lg:px-20 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-[520px]"
            >
              <h1 className="font-display text-[clamp(2.15rem,10vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#4A5560]">
                Hacer una consulta
              </h1>
              <p className="mt-6 max-w-[460px] text-base leading-7 text-[#4A5560]/78 md:mt-8 md:text-lg md:leading-8">
                Nuestro equipo técnico analizará su requerimiento para entregar
                una respuesta clara, especializada y alineada con las
                necesidades de su laboratorio o proceso industrial.
              </p>
            </motion.div>
          </div>

          <div className="relative order-first min-h-[240px] overflow-hidden sm:min-h-[300px] md:order-none md:min-h-full">
            {/* Capas de gradientes para aportar calidez e integrar la imagen a la identidad corporativa */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/40 via-transparent to-[#D5542B]/6 mix-blend-multiply z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[#D5542B]/4 mix-blend-color z-10 pointer-events-none" />

            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <Image
                src="/fotos/MG_1527.jpg"
                alt="Instalaciones analíticas y científicas de Del Carpio."
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover object-center filter sepia-[10%] saturate-[110%] brightness-[1.01]"
              />
            </motion.div>
          </div>
        </section>

        <section id="canales" className="bg-[#f7f7f7] px-4 py-12 md:px-8 md:py-16 lg:px-0 lg:py-[96px]">
          <div className="mx-auto grid max-w-[1240px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-5">
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
                    className="group flex h-full min-h-[250px] flex-col overflow-hidden rounded-[4px] border border-[#d9e0e5] bg-white shadow-[0_2px_6px_rgba(74,85,96,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[var(--primary)] hover:shadow-[0_12px_28px_rgba(74,85,96,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] sm:min-h-[300px] lg:min-h-[340px]"
                  >
                    <span className="grid h-[88px] place-items-center bg-[#4A5560] md:h-[110px] lg:h-[120px]">
                      <Icon
                        size={44}
                        weight="light"
                        aria-hidden="true"
                        className="text-[var(--primary)] transition-[color,transform] duration-300 group-hover:scale-105 group-hover:text-white"
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
