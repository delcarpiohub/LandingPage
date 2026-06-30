"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt, WarningCircle, CheckCircle } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
        <div className="bg-[#101820] p-8 text-white">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
            Contacto tecnico
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight">
            Agenda una evaluacion tecnica inicial.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Cuentanos el proceso, la criticidad o la necesidad de analisis.
            La primera respuesta debe estructurar el problema tecnico antes de
            cotizar.
          </p>
        </div>

        {isSuccess ? (
          <div className="grid place-items-center border border-[var(--border)] bg-[#f7f7f5] p-8 text-center">
            <CheckCircle size={48} weight="fill" className="text-[#53843A]" />
            <p className="mt-4 font-display text-2xl font-extrabold text-[#101820]">
              Consulta enviada.
            </p>
            <p className="mt-3 text-[#101820]/65">
              Recibiras respuesta en maximo 1 dia habil.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 border border-[var(--border)] bg-white p-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" error={errors.nombre?.message} required>
                <input {...register("nombre")} className="field" />
              </Field>
              <Field label="Empresa" error={errors.empresa?.message} required>
                <input {...register("empresa")} className="field" />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Correo" error={errors.correo?.message} required>
                <input {...register("correo")} type="email" className="field" />
              </Field>
              <Field label="Telefono" error={errors.telefono?.message} required>
                <input {...register("telefono")} type="tel" className="field" />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Sector" error={errors.sector?.message} required>
                <select {...register("sector")} className="field cursor-pointer">
                  <option value="">Seleccionar...</option>
                  {SECTORES.map((sector) => (
                    <option key={sector} value={sector}>
                      {sectorLabels[sector]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Tipo de consulta"
                error={errors.tipoConsulta?.message}
                required
              >
                <select
                  {...register("tipoConsulta")}
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
                    {...register(field.name as keyof ContactFormData)}
                    className="field min-h-24 resize-none py-3"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    {...register(field.name as keyof ContactFormData)}
                    className="field"
                    placeholder={field.placeholder}
                  />
                )}
              </Field>
            ))}

            <Field label="Mensaje" error={errors.mensaje?.message} required>
              <textarea
                {...register("mensaje")}
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
    <label className="grid gap-2">
      <span className="flex items-center gap-2 text-sm font-bold text-[#101820]">
        {label}
        {required && (
          <span className="rounded-[2px] bg-[#101820]/6 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">
            Requerido
          </span>
        )}
      </span>
      {children}
      {error ? (
        <span className="flex items-center gap-1 text-sm font-semibold text-red-700">
          <WarningCircle size={14} weight="bold" />
          {error}
        </span>
      ) : null}
    </label>
  );
}
