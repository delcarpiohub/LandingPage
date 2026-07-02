"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowSquareOut,
  Code,
  Desktop,
  EnvelopeSimple,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";

const inquiryOptions = [
  {
    id: "tour",
    title: "Agendar Tour de Laboratorio",
    icon: Desktop,
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
    icon: ArrowSquareOut,
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
    icon: Code,
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
        <section className="grid bg-[#f5f5f5] md:min-h-[460px] md:grid-cols-[50%_50%] lg:min-h-[500px] lg:grid-cols-[42%_58%]">
          <div className="flex items-center px-6 py-12 sm:px-10 md:px-12 lg:px-20 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-[520px]"
            >
              <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#4A5560]">
                Hacer una consulta
              </h1>
              <p className="mt-8 max-w-[460px] text-base leading-8 text-[#4A5560]/78 md:text-lg">
                Nuestro equipo técnico analizará su requerimiento para entregar
                una respuesta clara, especializada y alineada con las
                necesidades de su laboratorio o proceso industrial.
              </p>
            </motion.div>
          </div>

          <div className="relative order-first min-h-[280px] overflow-hidden md:order-none md:min-h-full">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <Image
                src="/fotos/instalacion-hplc-operador.jpg"
                alt="Especialista técnico de Del Carpio atendiendo procesos industriales."
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </section>

        <section id="canales" className="bg-[#f7f7f7] px-5 py-12 md:px-8 md:py-16 lg:px-0 lg:py-[84px]">
          <div className="mx-auto grid max-w-[1120px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    className="group flex h-full min-h-[380px] flex-col overflow-hidden rounded-[4px] border border-[#d9e0e5] bg-white shadow-[0_2px_6px_rgba(74,85,96,0.08)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[var(--primary)] hover:shadow-[0_12px_28px_rgba(74,85,96,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] sm:min-h-[360px] lg:min-h-[380px]"
                  >
                    <span className="grid h-[120px] place-items-center bg-[#4A5560] md:h-[150px]">
                      <Icon
                        size={56}
                        weight="light"
                        aria-hidden="true"
                        className="text-[var(--primary)] transition-[color,transform] duration-300 group-hover:scale-105 group-hover:text-white"
                      />
                    </span>
                    <span className="flex flex-1 flex-col px-6 pb-8 pt-6">
                      <h2 className="font-sans text-[22px] font-normal leading-[1.3] text-[#4A5560]">
                        {option.title}
                      </h2>
                      <span className="mt-6 grid gap-[14px]">
                        {option.items.map((item) => (
                          <span
                            key={item}
                            className="block text-[13px] font-normal leading-[1.55] text-[#4A5560]/84"
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

        <section className="bg-[#4A5560] px-5 py-16 text-white md:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                Datos directos
              </p>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-4xl">
                Oficina y contacto oficial
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
                Si necesita coordinar una visita o enviar antecedentes técnicos,
                use estos canales oficiales de Del Carpio.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ContactItem icon={MapPin} label="Dirección" value={company.location} />
              <ContactItem
                icon={WhatsappLogo}
                label="WhatsApp"
                value={company.whatsapp}
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
              />
              <ContactItem icon={Phone} label="Teléfono" value={company.phone} href={`tel:${company.phone}`} />
              <ContactItem icon={EnvelopeSimple} label="Correo" value={company.email} href={`mailto:${company.email}`} />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-[1180px] border-t border-white/12 pt-8">
            <div className="overflow-hidden rounded-[4px] border border-white/18 bg-white/[0.06] p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación de Del Carpio en Av. Sucre 2596"
                className="h-[160px] w-full rounded-[2px] bg-white md:h-[190px]"
              />
            </div>

            <div className="mt-6">
              <Button asChild className="h-[52px] px-7 text-xs uppercase tracking-wider">
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Abrir en Google Maps
                  <ArrowRight size={16} weight="bold" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

type ContactItemProps = {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
};

function ContactItem({ icon: Icon, label, value, href }: ContactItemProps) {
  const content = (
    <>
      <span className="grid size-10 place-items-center border border-white/16 text-[var(--primary)]">
        <Icon size={19} weight="bold" />
      </span>
      <span>
        <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/48">
          {label}
        </span>
        <span className="mt-2 block text-sm font-semibold leading-6 text-white/88">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="grid grid-cols-[40px_1fr] gap-4 border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/24 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="grid grid-cols-[40px_1fr] gap-4 border border-white/10 bg-white/[0.03] p-5">
      {content}
    </div>
  );
}
