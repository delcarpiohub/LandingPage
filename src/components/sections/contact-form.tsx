"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaperPlaneTilt,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PrivacyConsentField } from "@/components/forms/privacy-consent-field";
import {
  contactSchema,
  sectorFields,
  type ContactFormData,
  SECTORES,
  TIPOS_CONSULTA,
} from "@/lib/contact-schema";
import { company } from "@/content/site";

const sectorLabels: Record<(typeof SECTORES)[number], string> = {
  alimentos: "Alimentos",
  mineria: "Mineria",
  farmaceutica: "Farmaceutica",
  aguas: "Aguas",
  ambiental: "Ambiental",
  academia: "Academia / I+D",
};

const tipoConsultaLabels: Record<(typeof TIPOS_CONSULTA)[number], string> = {
  "cotizacion-equipo": "Cotizacion de equipo",
  "proyecto-laboratorio": "Proyecto de laboratorio completo",
  "soporte-tecnico": "Soporte tecnico / mantencion",
  otro: "Otra consulta",
};

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      formularioOrigen: "contacto-general",
      consentimientoPrivacidad: false,
    },
  });

  const sectorValue = useWatch({ control, name: "sector" });
  const extraFields = useMemo(
    () => sectorFields[sectorValue as keyof typeof sectorFields] ?? [],
    [sectorValue],
  );

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
    <section id="contacto" className="bg-white px-5 py-20">
      <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="bg-[#4A5560] p-8 text-white">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
            Contacto tecnico
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight">
            Agenda una evaluacion tecnica inicial.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Cuentanos el proceso, la criticidad o la necesidad de analisis. La
            primera respuesta debe estructurar el problema tecnico antes de
            cotizar.
          </p>
        </div>

        {isSuccess ? (
          <div className="grid place-items-center border border-[var(--border)] bg-[#f7f7f5] p-8 text-center">
            <CheckCircle size={48} weight="fill" className="text-[#53843A]" />
            <p className="mt-4 font-display text-2xl font-extrabold text-[#4A5560]">
              Consulta enviada.
            </p>
            <p className="mt-3 text-[#4A5560]/65">
              Recibiras respuesta en maximo 1 dia habil.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-5 border border-[var(--border)] bg-white p-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="contacto-general-nombre"
                label="Nombre"
                error={errors.nombre?.message}
                required
              >
                <input
                  id="contacto-general-nombre"
                  {...register("nombre")}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.nombre)}
                  aria-describedby={
                    errors.nombre ? "contacto-general-nombre-error" : undefined
                  }
                  className="field"
                />
              </Field>
              <Field
                id="contacto-general-empresa"
                label="Empresa"
                error={errors.empresa?.message}
                required
              >
                <input
                  id="contacto-general-empresa"
                  {...register("empresa")}
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.empresa)}
                  aria-describedby={
                    errors.empresa
                      ? "contacto-general-empresa-error"
                      : undefined
                  }
                  className="field"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="contacto-general-correo"
                label="Correo"
                error={errors.correo?.message}
                required
              >
                <input
                  id="contacto-general-correo"
                  {...register("correo")}
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.correo)}
                  aria-describedby={
                    errors.correo ? "contacto-general-correo-error" : undefined
                  }
                  className="field"
                />
              </Field>
              <Field
                id="contacto-general-telefono"
                label="Telefono"
                error={errors.telefono?.message}
                required
              >
                <input
                  id="contacto-general-telefono"
                  {...register("telefono")}
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.telefono)}
                  aria-describedby={
                    errors.telefono
                      ? "contacto-general-telefono-error"
                      : undefined
                  }
                  className="field"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="contacto-general-sector"
                label="Sector"
                error={errors.sector?.message}
                required
              >
                <select
                  id="contacto-general-sector"
                  {...register("sector")}
                  aria-invalid={Boolean(errors.sector)}
                  aria-describedby={
                    errors.sector ? "contacto-general-sector-error" : undefined
                  }
                  className="field cursor-pointer"
                >
                  <option value="">Seleccionar...</option>
                  {SECTORES.map((sector) => (
                    <option key={sector} value={sector}>
                      {sectorLabels[sector]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                id="contacto-general-tipo-consulta"
                label="Tipo de consulta"
                error={errors.tipoConsulta?.message}
                required
              >
                <select
                  id="contacto-general-tipo-consulta"
                  {...register("tipoConsulta")}
                  aria-invalid={Boolean(errors.tipoConsulta)}
                  aria-describedby={
                    errors.tipoConsulta
                      ? "contacto-general-tipo-consulta-error"
                      : undefined
                  }
                  className="field cursor-pointer"
                >
                  <option value="">Seleccionar...</option>
                  {TIPOS_CONSULTA.map((consulta) => (
                    <option key={consulta} value={consulta}>
                      {tipoConsultaLabels[consulta]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {extraFields.map((field) => (
              <Field
                key={field.name}
                id={`contacto-general-${field.name}`}
                label={field.label}
                error={
                  errors[field.name as keyof typeof errors]?.message as
                    | string
                    | undefined
                }
                required={field.required}
              >
                {field.type === "textarea" ? (
                  <textarea
                    id={`contacto-general-${field.name}`}
                    {...register(field.name as keyof ContactFormData)}
                    aria-invalid={Boolean(
                      errors[field.name as keyof typeof errors],
                    )}
                    aria-describedby={
                      errors[field.name as keyof typeof errors]
                        ? `contacto-general-${field.name}-error`
                        : undefined
                    }
                    className="field min-h-24 resize-none py-3"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    id={`contacto-general-${field.name}`}
                    {...register(field.name as keyof ContactFormData)}
                    aria-invalid={Boolean(
                      errors[field.name as keyof typeof errors],
                    )}
                    aria-describedby={
                      errors[field.name as keyof typeof errors]
                        ? `contacto-general-${field.name}-error`
                        : undefined
                    }
                    className="field"
                    placeholder={field.placeholder}
                  />
                )}
              </Field>
            ))}

            <Field
              id="contacto-general-mensaje"
              label="Mensaje"
              error={errors.mensaje?.message}
              required
            >
              <textarea
                id="contacto-general-mensaje"
                {...register("mensaje")}
                aria-invalid={Boolean(errors.mensaje)}
                aria-describedby={
                  errors.mensaje ? "contacto-general-mensaje-error" : undefined
                }
                className="field min-h-32 resize-none py-3"
                placeholder="Describe el proceso, problema o servicio requerido"
              />
            </Field>

            {isError && (
              <p className="border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                Hubo un error al enviar. Intenta de nuevo o escribenos a{" "}
                <a href={`mailto:${company.email}`} className="underline">
                  {company.email}
                </a>
                .
              </p>
            )}

            <PrivacyConsentField
              id="contacto-general-privacidad"
              registration={register("consentimientoPrivacidad")}
              error={errors.consentimientoPrivacidad?.message}
            />

            <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar consulta"}
              {!isLoading && <PaperPlaneTilt size={17} weight="bold" />}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  required = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-bold text-[#4A5560]"
      >
        {label}
        {required && (
          <span className="rounded-[2px] bg-[#4A5560]/6 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">
            Requerido
          </span>
        )}
      </label>
      {children}
      {error ? (
        <span
          id={errorId}
          role="alert"
          className="flex items-center gap-1 text-sm font-semibold text-red-700"
        >
          <WarningCircle size={14} weight="bold" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
