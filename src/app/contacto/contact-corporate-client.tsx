"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  MapPin,
  EnvelopeSimple,
  Phone,
  FacebookLogo,
  LinkedinLogo,
  Envelope,
  Globe,
  Microscope,
  Briefcase,
  ShieldCheck,
  FileText,
  CaretRight,
} from "@phosphor-icons/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { company } from "@/content/site";

export function ContactCorporateClient() {
  const inquiryOptions = [
    {
      id: "ventas",
      num: "01",
      title: "Contactar con Ventas",
      desc: "Cotizaciones de equipamiento cromatográfico, consumibles y representaciones oficiales.",
      icon: Briefcase,
      path: "/contacto/ventas",
      borderColor: "hover:border-orange-300",
      iconColor: "text-[var(--primary)] bg-orange-50",
    },
    {
      id: "tour-laboratorio",
      num: "02",
      title: "Agendar Tour de Laboratorio",
      desc: "Coordina una visita técnica para conocer nuestras instalaciones y capacidades analíticas.",
      icon: Microscope,
      path: "/contacto/tour-laboratorio",
      borderColor: "hover:border-[#53843A]/40",
      iconColor: "text-[#53843A] bg-[#53843A]/8",
    },
    {
      id: "proyectos",
      num: "03",
      title: "Proyectos y Consultoría",
      desc: "Validaciones de métodos analíticos, automatización e ingeniería de laboratorio.",
      icon: ShieldCheck,
      path: "/contacto/proyectos",
      borderColor: "hover:border-emerald-300",
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "otras-consultas",
      num: "04",
      title: "Otras Consultas",
      desc: "Soporte administrativo general, facturación, cobranza o alianzas comerciales.",
      icon: FileText,
      path: "/contacto/otras-consultas",
      borderColor: "hover:border-slate-400",
      iconColor: "text-slate-600 bg-slate-100",
    },
  ];

  return (
    <div className="min-h-dvh bg-white flex flex-col justify-between select-none">
      <Navigation />

      <main className="flex-grow pt-16">

        {/* 1. HERO SECTION (320px height, overlay over operator image) */}
        <section
          className="relative h-[320px] bg-cover bg-center flex items-center justify-center text-center px-5"
          style={{ backgroundImage: "url('/fotos/instalacion-hplc-operador.jpg')" }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/45 z-0" />

          <div className="relative z-10 text-white max-w-xl">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--primary)] opacity-90 block mb-3">
              {"// "}CANALES DIRECTOS
            </span>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
              CONTACTO
            </h1>
            <p className="mt-3 text-sm tracking-wide text-white/80 font-medium">
              Envíanos un mensaje directo o visítanos en nuestras oficinas
            </p>
          </div>
        </section>

        {/* 2. CONTACT INTRO */}
        <section className="bg-white py-16 text-center px-5">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-[#101820] sm:text-3xl">
              Ponte en contacto con nosotros
            </h2>
            <div className="mt-3 w-12 h-1 bg-[var(--primary)] mx-auto" />
            <p className="mt-6 text-sm leading-7 text-[#101820]/70">
              ¿Tienes consultas sobre equipamiento cromatográfico, soporte técnico o validación de métodos? Selecciona el canal correspondiente para canalizar tu requerimiento.
            </p>
          </div>
        </section>

        {/* 3. CONTACT GRID (2 Columns layout: Our Office vs Stacked Inquiry Links) */}
        <section className="bg-white pb-24 px-5">
          <div className="mx-auto max-w-site grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Our Office */}
            <div className="lg:col-span-5 space-y-8 lg:pr-6">
              <div>
                <h3 className="font-display text-lg font-extrabold uppercase text-[#101820] tracking-tight border-b border-[var(--border)] pb-3 mb-6">
                  Nuestra Oficina
                </h3>
                <p className="text-xs leading-6 text-[#101820]/70 font-sans">
                  Del Carpio Análisis y Asesorías Ltda. es una empresa líder especializada en soporte de HPLC, GC, proyectos de infraestructura analítica y capacitación técnica.
                </p>
              </div>

              {/* Office Details Items */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 border border-[var(--border)] rounded-[4px] bg-stone-50 text-[var(--primary)] shrink-0 mt-0.5">
                    <MapPin size={18} weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#101820]">Dirección</h4>
                    <p className="mt-1 text-xs text-[#101820]/75 leading-5 font-sans">
                      Av. Sucre 2596, 7750000 Ñuñoa,<br />
                      Región Metropolitana, Chile
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 border border-[var(--border)] rounded-[4px] bg-stone-50 text-[var(--primary)] shrink-0 mt-0.5">
                    <EnvelopeSimple size={18} weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#101820]">Correo electrónico</h4>
                    <a href={`mailto:${company.email}`} className="mt-1 text-xs text-[var(--primary)] font-bold hover:underline block font-sans">
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 border border-[var(--border)] rounded-[4px] bg-stone-50 text-[var(--primary)] shrink-0 mt-0.5">
                    <Phone size={18} weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#101820]">Teléfono de contacto</h4>
                    <a href={`tel:${company.phone}`} className="mt-1 text-xs text-[#101820]/75 leading-5 block font-sans hover:underline">
                      {company.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div className="pt-4">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#101820]/50 mb-3">
                  SÍGUENOS EN REDES
                </h4>
                <div className="flex items-center gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded-[4px] text-stone-500 hover:text-[var(--primary)] hover:bg-stone-50 transition-colors">
                    <LinkedinLogo size={18} weight="fill" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded-[4px] text-stone-500 hover:text-[var(--primary)] hover:bg-stone-50 transition-colors">
                    <FacebookLogo size={18} weight="fill" />
                  </a>
                  <a href={`mailto:${company.email}`} className="p-2 border border-[var(--border)] rounded-[4px] text-stone-500 hover:text-[var(--primary)] hover:bg-stone-50 transition-colors">
                    <Envelope size={18} weight="bold" />
                  </a>
                  <a href="https://delcarpio.cl" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded-[4px] text-stone-500 hover:text-[var(--primary)] hover:bg-stone-50 transition-colors">
                    <Globe size={18} weight="bold" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Stacked Inquiry Options (Casillas para consultas) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-display text-lg font-extrabold uppercase text-[#101820] tracking-tight border-b border-[var(--border)] pb-3 mb-6">
                Selecciona tu Canal de Consulta
              </h3>

              <div className="grid gap-4">
                {inquiryOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <motion.div
                      key={opt.id}
                      whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
                      className="w-full"
                    >
                      <Link
                        href={opt.path}
                        className={`flex items-start justify-between p-5 border border-[var(--border)] rounded-[4px] bg-stone-50/30 hover:bg-white transition-all duration-300 group cursor-pointer ${opt.borderColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)]`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-2 border border-[var(--border)] rounded-[4px] shrink-0 mt-0.5 ${opt.iconColor}`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] font-bold text-[var(--muted-soft)]">
                                [{opt.num}]
                              </span>
                              <h4 className="font-display text-sm font-extrabold uppercase text-[#101820] tracking-tight">
                                {opt.title}
                              </h4>
                            </div>
                            <p className="mt-1.5 text-xs leading-5 text-[var(--muted)] max-w-md font-sans">
                              {opt.desc}
                            </p>
                          </div>
                        </div>

                        <div className="self-center p-2 rounded-full border border-[var(--border)] text-[var(--muted-soft)] group-hover:text-[#101820] group-hover:border-[#101820] group-hover:bg-stone-50 transition-all">
                          <CaretRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* 4. MAP SECTION (420px height, full-width, Google Maps embed) */}
        <section className="w-full h-[420px] bg-stone-100 border-t border-[var(--border)] overflow-hidden relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.130985223326!2d-70.60334812347715!3d-33.47190397337923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf83f4f46401%3A0xe54e38c92a95c935!2sAv.%20Sucre%202596%2C%20%C3%91u%C3%B1oa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1719777900000!5m2!1ses-419!2scl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location Del Carpio"
            className="w-full h-full"
          />
        </section>

      </main>

      <Footer />
    </div>
  );
}
