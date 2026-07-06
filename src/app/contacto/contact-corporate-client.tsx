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
    description: "Conozca nuestras instalaciones analíticas avanzadas y califique nuestras capacidades técnicas en persona.",
  },
  {
    id: "ventas",
    title: "Contactar con Ventas",
    icon: Briefcase,
    path: "/contacto/ventas",
    description: "Solicite cotizaciones de equipamiento científico, insumos, columnas o reciba orientación comercial dedicada.",
  },
  {
    id: "proyectos",
    title: "Proyectos",
    icon: Gear,
    path: "/contacto/proyectos",
    description: "Evalúe y diseñe implementaciones complejas, automatización e instrumentación analítica a la medida.",
  },
  {
    id: "otras",
    title: "Otras Consultas",
    icon: EnvelopeSimple,
    path: "/contacto/otras-consultas",
    description: "Para consultas generales, de administración, alianzas académicas u otros requerimientos comerciales.",
  },
];

const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.130985223326!2d-70.60334812347715!3d-33.47190397337923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf83f4f46401%3A0xe54e38c92a95c935!2sAv.%20Sucre%202596%2C%20%C3%91u%C3%B1oa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1719777900000!5m2!1ses-419!2scl";

export function ContactCorporateClient() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f5f5]">
      <Navigation />

      <main id="main-content" className="flex-1">
        <section className="relative w-full h-[320px] md:h-[380px] overflow-hidden flex flex-col justify-start pt-16 md:pt-20 lg:pt-24 bg-[#101820]">
          {/* Background Team Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/fotos/MG_1527.jpg"
              alt="Instalaciones analíticas y científicas de Del Carpio."
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter sepia-[5%] brightness-[0.8]"
            />
            {/* Dark overlay to provide text readability and depth */}
            <div className="absolute inset-0 bg-[#101820]/75" />
          </div>

          {/* Centered Content Container at top part of Hero */}
          <div className="mx-auto max-w-[1240px] px-5 w-full relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
            >
              Hacer una consulta
            </motion.h1>
          </div>
        </section>

        {/* OVERLAPPING CAPSULE CARDS SECTION */}
        <section id="canales" className="bg-[#F8F8F8] px-5 pt-0 pb-20 md:pb-28 lg:pb-36 relative z-20">
          <div className="mx-auto flex flex-wrap md:flex-nowrap justify-center gap-7 lg:gap-8 max-w-[1240px] -mt-[120px] md:-mt-[150px] relative z-30">
            {inquiryOptions.map((option) => {
              const Icon = option.icon;

              return (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative flex flex-col items-center justify-between w-full sm:w-[260px] h-[370px] md:h-[400px] bg-white border border-black/[0.03] shadow-[0_18px_40px_rgba(0,0,0,0.06)] p-6 pt-12 pb-8 text-center transition-all duration-300"
                  style={{ borderRadius: "120px 120px 12px 12px" }}
                >
                  {/* Floating Circle Icon */}
                  <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 w-14 h-14 bg-[#D5542B] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(213,84,43,0.25)] transition-all duration-300 group-hover:scale-105">
                    <Icon size={24} weight="light" />
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-[16px] md:text-[18px] font-bold text-[#101820] mt-6 tracking-tight">
                    {option.title}
                  </h2>

                  {/* Short Description */}
                  <p className="text-[#4A5560]/85 text-[12.5px] leading-relaxed max-w-[200px] mt-3 flex-1 flex items-center justify-center">
                    {option.description}
                  </p>

                  {/* Small CTA Button */}
                  <Link
                    href={option.path}
                    className="inline-flex items-center justify-center bg-[#101820] hover:bg-[#D5542B] text-white text-[10px] font-bold uppercase tracking-widest py-2.5 px-6 rounded-[2px] mt-auto transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5542B]"
                  >
                    Saber más
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
