"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  EnvelopeSimple,
  Phone,
  PaperPlaneTilt,
  WarningCircle,
  CheckCircle,
  FacebookLogo,
  LinkedinLogo,
  Envelope,
  Globe,
} from "@phosphor-icons/react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { company } from "@/content/site";

export default function ContactCorporatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      nombre: "",
      empresa: "",
      correo: "",
      telefono: "",
      sector: "academia",
      tipoConsulta: "otro",
      mensaje: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setIsSuccess(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

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
              // CANALES DIRECTOS
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
              ¿Tienes consultas sobre equipamiento cromatográfico, soporte técnico o validación de métodos? Nuestro equipo de ingenieros está a tu disposición para asesorarte de manera personalizada.
            </p>
          </div>
        </section>

        {/* 3. CONTACT GRID (2 Columns layout: Our Office vs Feedback Form) */}
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

            {/* Right Column: Feedback Form */}
            <div className="lg:col-span-7 bg-stone-50/50 border border-[var(--border)] p-6 md:p-8 rounded-[4px]">
              <h3 className="font-display text-lg font-extrabold uppercase text-[#101820] tracking-tight border-b border-[var(--border)] pb-3 mb-6">
                Formulario de Contacto
              </h3>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="grid size-16 place-items-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mb-6">
                    <CheckCircle size={32} weight="fill" />
                  </div>
                  <h4 className="font-display text-xl font-extrabold uppercase text-[#101820] tracking-tight">
                    Mensaje Enviado
                  </h4>
                  <p className="mt-3 text-xs text-[var(--muted)] max-w-sm mx-auto leading-6 font-sans">
                    Agradecemos tu mensaje. Un representante técnico de Del Carpio responderá tu consulta en un plazo máximo de 1 día hábil.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="Nombre y apellido" error={errors.nombre?.message} required>
                      <input
                        {...register("nombre")}
                        className="field bg-white"
                        placeholder="Tu Nombre"
                      />
                    </InputField>

                    <InputField label="Empresa o institución" error={errors.empresa?.message} required>
                      <input
                        {...register("empresa")}
                        className="field bg-white"
                        placeholder="Tu Empresa"
                      />
                    </InputField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="Correo electrónico" error={errors.correo?.message} required>
                      <input
                        {...register("correo")}
                        type="email"
                        className="field bg-white"
                        placeholder="Tu Correo"
                      />
                    </InputField>

                    <InputField label="Teléfono móvil" error={errors.telefono?.message} required>
                      <input
                        {...register("telefono")}
                        type="tel"
                        className="field bg-white"
                        placeholder="Tu Teléfono"
                      />
                    </InputField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="Sector Industrial" error={errors.sector?.message} required>
                      <select {...register("sector")} className="field bg-white cursor-pointer">
                        <option value="academia">Academia / I+D</option>
                        <option value="alimentos">Alimentos</option>
                        <option value="mineria">Minería</option>
                        <option value="farmaceutica">Farmacéutica</option>
                        <option value="aguas">Aguas</option>
                        <option value="ambiental">Ambiental</option>
                      </select>
                    </InputField>

                    <InputField label="Tipo de Consulta" error={errors.tipoConsulta?.message} required>
                      <select {...register("tipoConsulta")} className="field bg-white cursor-pointer">
                        <option value="otro">Asunto General</option>
                        <option value="cotizacion-equipo">Cotización de Equipos</option>
                        <option value="proyecto-laboratorio">Proyectos Especiales</option>
                        <option value="soporte-tecnico">Soporte Técnico / HPLC / GC</option>
                      </select>
                    </InputField>
                  </div>

                  <InputField label="Mensaje" error={errors.mensaje?.message} required>
                    <textarea
                      {...register("mensaje")}
                      className="field bg-white min-h-28 resize-none pb-2 pt-2"
                      placeholder="Tu Mensaje"
                    />
                  </InputField>

                  <div className="pt-2 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="relative cursor-pointer transition-all duration-300 w-full sm:w-auto px-8 py-3 rounded-[2px]"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Enviando...
                          </>
                        ) : isError ? (
                          <>
                            <WarningCircle size={17} weight="bold" />
                            Reintentar
                          </>
                        ) : (
                          <>
                            Enviar Mensaje
                            <PaperPlaneTilt size={16} weight="bold" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>

                  {isError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 p-4 rounded-[2px] text-xs text-red-700 flex items-start gap-3 mt-4"
                    >
                      <WarningCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Error en la comunicación.</span>
                        <p className="mt-1 text-red-600/80 text-[11px]">
                          No pudimos procesar tu requerimiento. Por favor, reintenta o escríbenos directamente a{" "}
                          <a href={`mailto:${company.email}`} className="underline font-bold">
                            {company.email}
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}

                </form>
              )}
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

// Subcomponent: Scoped Form Field Wrapper
function InputField({
  label,
  error,
  required = false,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left font-sans">
      <span className="flex items-center gap-1.5 text-xs font-bold text-[#101820]">
        {label}
        {required && (
          <span className="inline-flex items-center rounded-[2px] bg-white px-2 py-0.5 text-[9px] font-bold uppercase leading-none tracking-[0.04em] text-[var(--primary)] border border-[var(--border)] font-mono">
            Requerido
          </span>
        )}
      </span>
      <div className="relative w-full">
        {children}
      </div>
      {error && (
        <span className="text-xs text-red-600 font-bold flex items-center gap-1 mt-1 font-mono">
          <WarningCircle size={13} weight="bold" />
          {error}
        </span>
      )}
    </div>
  );
}
