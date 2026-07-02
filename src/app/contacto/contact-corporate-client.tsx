"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CaretRight,
  EnvelopeSimple,
  MapPin,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";

const indicators = [
  "+30 años de experiencia",
  "15+ marcas representadas",
  "Soporte técnico especializado",
];

const inquiryOptions = [
  {
    num: "01",
    title: "Agendar Tour de Laboratorio",
    desc: "Conozca nuestras instalaciones, capacidades técnicas y equipamiento analítico.",
    path: "/contacto/tour-laboratorio",
  },
  {
    num: "02",
    title: "Contactar con Ventas",
    desc: "Cotizaciones, equipos, consumibles y marcas representadas.",
    path: "/contacto/ventas",
  },
  {
    num: "03",
    title: "Proyectos",
    desc: "Implementaciones, validaciones, automatización, instrumentación y consultoría técnica.",
    path: "/contacto/proyectos",
  },
  {
    num: "04",
    title: "Otras Consultas",
    desc: "Información general, administración, alianzas o requerimientos no comerciales.",
    path: "/contacto/otras-consultas",
  },
];

export function ContactCorporateClient() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f5f5]">
      <Navigation />

      <main id="main-content" className="flex-1 pt-16">
        <section className="grid bg-[#f5f5f5] md:min-h-[560px] md:grid-cols-[50%_50%] lg:min-h-[640px] lg:grid-cols-[42%_58%]">
          <div className="flex items-center px-6 py-14 sm:px-10 md:px-12 lg:px-20 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-[520px]"
            >
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                {"// "}Contacto
              </p>
              <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#4A5560]">
                Hacer una consulta
              </h1>
              <p className="mt-8 max-w-[460px] text-base leading-8 text-[#4A5560]/78 md:text-lg">
                Nuestro equipo técnico analizará su requerimiento para entregar
                una respuesta clara, especializada y alineada con las
                necesidades de su laboratorio o proceso industrial.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-[52px] px-7 text-xs uppercase tracking-wider">
                  <Link href="#canales">
                    Iniciar consulta
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="h-[52px] border-[#4A5560] px-7 text-xs uppercase tracking-wider"
                >
                  <a href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}>
                    Hablar con un especialista
                  </a>
                </Button>
              </div>

              <dl className="mt-12 grid gap-3 border-l border-[#4A5560]/16 pl-5">
                {indicators.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <dt className="size-1.5 bg-[var(--primary)]" />
                    <dd className="text-sm font-semibold text-[#4A5560]">{item}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          <div className="relative order-first min-h-[320px] overflow-hidden md:order-none md:min-h-full">
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

        <section id="canales" className="bg-white px-5 py-20 md:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                Canal de consulta
              </p>
              <h2 className="mt-5 max-w-sm font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#4A5560] md:text-5xl">
                Seleccione el tipo de atención que necesita.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#4A5560]/68">
                Esto nos permite derivar su consulta al especialista correcto y
                responder con orientación técnica, no con una cotización genérica.
              </p>
            </div>

            <div className="border-y border-[#4A5560]/14">
              {inquiryOptions.map((option) => (
                <motion.div
                  key={option.num}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={option.path}
                    className="group grid gap-5 border-b border-[#4A5560]/14 py-7 transition-colors last:border-b-0 hover:bg-[#f5f5f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] sm:grid-cols-[72px_1fr_44px] sm:items-center sm:px-5"
                  >
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-[var(--primary)]">
                      {option.num}
                    </span>
                    <span>
                      <span className="block font-display text-2xl font-extrabold leading-tight text-[#4A5560]">
                        {option.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-sm leading-6 text-[#4A5560]/70">
                        {option.desc}
                      </span>
                    </span>
                    <span className="grid size-11 place-items-center border border-[#4A5560]/18 text-[#4A5560] transition-colors group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white">
                      <CaretRight size={16} weight="bold" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
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
            <Button asChild className="h-[52px] px-7 text-xs uppercase tracking-wider">
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer">
                Abrir en Google Maps
                <ArrowRight size={16} weight="bold" />
              </a>
            </Button>
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
