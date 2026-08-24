"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaperPlaneTilt,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { Reveal } from "@/components/motion/reveal";
import { PrivacyConsentField } from "@/components/forms/privacy-consent-field";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { company } from "@/content/site";
import { cn } from "@/lib/utils";

// Formulario rápido de contacto para /servicios, con el mismo layout de
// 2 columnas (form + info) del modelo de referencia aprobado por el usuario.
// Reutiliza contactSchema/api/contacto ya existentes; tipoConsulta queda fijo
// en "soporte-tecnico" porque este banner es general, no ligado a una
// tarjeta de servicio específica (a diferencia de los forms de /contacto/[tipo]).
export function ServiceInquiryCta() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      tipoConsulta: "soporte-tecnico",
      formularioOrigen: "servicios-rapido",
      consentimientoPrivacidad: false,
    },
  });

  async function onSubmit(data: ContactFormData) {
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
  }

  return (
    <section className="relative overflow-hidden bg-[#4A5560] py-16 md:py-20">
      <Image
        src="/fotos/servicios-cta-laboratorio.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Sombra pronunciada: asegura contraste AA para el texto blanco sobre la foto */}
      <div className="pointer-events-none absolute inset-0 bg-[#4A5560]/90" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-10">
        {/* Columna izquierda: formulario */}
        <Reveal>
          {isSuccess ? (
            <div className="flex flex-col items-start gap-3 rounded-[8px] bg-white/95 p-8">
              <CheckCircle size={40} weight="fill" className="text-[#53843A]" />
              <p className="font-display text-xl font-extrabold text-[#4A5560]">
                Consulta enviada.
              </p>
              <p className="text-sm text-[#4A5560]/70">
                Recibirá respuesta en máximo 1 día hábil.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-6"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  id="servicios-cta-nombre"
                  placeholder="Nombre completo*"
                  autoComplete="name"
                  registration={register("nombre")}
                  error={errors.nombre?.message}
                />
                <FormField
                  id="servicios-cta-empresa"
                  placeholder="Empresa*"
                  autoComplete="organization"
                  registration={register("empresa")}
                  error={errors.empresa?.message}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  id="servicios-cta-correo"
                  type="email"
                  placeholder="Correo electrónico*"
                  autoComplete="email"
                  registration={register("correo")}
                  error={errors.correo?.message}
                />
                <FormField
                  id="servicios-cta-telefono"
                  type="tel"
                  placeholder="Teléfono*"
                  autoComplete="tel"
                  registration={register("telefono")}
                  error={errors.telefono?.message}
                />
              </div>

              <FormField
                id="servicios-cta-mensaje"
                as="textarea"
                placeholder="Mensaje"
                registration={register("mensaje")}
                error={errors.mensaje?.message}
              />

              <PrivacyConsentField
                id="servicios-cta-privacidad"
                registration={register("consentimientoPrivacidad")}
                error={errors.consentimientoPrivacidad?.message}
                tone="dark"
              />

              {isError && (
                <p className="text-sm font-semibold text-red-300">
                  Hubo un error al enviar. Intenta de nuevo o escríbenos a{" "}
                  <a href={`mailto:${company.email}`} className="underline">
                    {company.email}
                  </a>
                  .
                </p>
              )}

              <div className="mt-2 border-t border-white/15 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#4A5560] transition-colors duration-200 hover:bg-white/90 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                  {!isLoading && <PaperPlaneTilt size={16} weight="bold" />}
                </button>
              </div>
            </form>
          )}
        </Reveal>

        {/* Columna derecha: información de contacto */}
        <Reveal delay={0.08} className="flex flex-col justify-start text-white">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FBE369]">
            Atención prioritaria en Chile
          </p>
          <h2 className="mt-3 font-display text-xl font-extrabold leading-snug sm:text-2xl lg:text-3xl">
            ¿Tiene un problema o requerimiento técnico en su laboratorio?
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

function FormField({
  id,
  placeholder,
  registration,
  error,
  type = "text",
  as = "input",
  autoComplete,
}: {
  id: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  const sharedClassName =
    "w-full border-0 border-b border-white/30 bg-transparent pb-3 text-white placeholder:text-white/50 focus:border-[#D6532B] focus:outline-none transition-colors";

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="sr-only">
        {placeholder.replace("*", "")}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(sharedClassName, "resize-none")}
          {...registration}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={sharedClassName}
          {...registration}
        />
      )}
      {error ? (
        <span
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-semibold text-red-300"
        >
          <WarningCircle size={13} weight="bold" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
