"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  sectorFields,
  type ContactFormData,
  SECTORES,
  TIPOS_CONSULTA,
} from "@/lib/contact-schema";

const sectorLabels: Record<typeof SECTORES[number], string> = {
  alimentos:    "Alimentos",
  mineria:      "Minería",
  farmaceutica: "Farmacéutica",
  aguas:        "Aguas",
  ambiental:    "Ambiental",
  academia:     "Academia / I+D",
};

const tipoConsultaLabels: Record<typeof TIPOS_CONSULTA[number], string> = {
  "cotizacion-equipo":    "Cotización de equipo",
  "proyecto-laboratorio": "Proyecto de laboratorio completo",
  "soporte-tecnico":      "Soporte técnico / mantención",
  "otro":                 "Otra consulta",
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
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const sectorValue = useWatch({ control, name: "sector" });
  const extraFields = sectorFields[sectorValue as keyof typeof sectorFields] ?? [];

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
    <section id="contacto" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid gap-10 rounded-[2rem] bg-[var(--foreground)] p-6 text-white md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">Contacto</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-6xl">
            Agenda una evaluación técnica inicial.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Cuéntanos el proceso, criticidad o necesidad. La primera respuesta
            debe ordenar el problema, no vender por vender.
          </p>
        </div>

        {isSuccess ? (
          <div className="grid place-items-center rounded-[1.5rem] bg-white p-8 text-center text-[var(--foreground)]">
            <p className="text-2xl font-semibold">Consulta enviada.</p>
            <p className="mt-3 text-[var(--muted)]">
              Recibirás respuesta en máximo 1 día hábil.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 rounded-[1.5rem] bg-white p-5 text-[var(--foreground)]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre" error={errors.nombre?.message} required>
                <input
                  {...register("nombre")}
                  className="field"
                  placeholder="Nombre y apellido"
                />
              </Field>
              <Field label="Empresa" error={errors.empresa?.message} required>
                <input
                  {...register("empresa")}
                  className="field"
                  placeholder="Empresa o institución"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Correo" error={errors.correo?.message} required>
                <input
                  {...register("correo")}
                  type="email"
                  className="field"
                  placeholder="nombre@empresa.cl"
                />
              </Field>
              <Field label="Teléfono" error={errors.telefono?.message} required>
                <input
                  {...register("telefono")}
                  type="tel"
                  className="field"
                  placeholder="+56 9 0000 0000"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Sector" error={errors.sector?.message} required>
                <select {...register("sector")} className="field cursor-pointer">
                  <option value="">Seleccionar...</option>
                  {SECTORES.map((s) => (
                    <option key={s} value={s}>{sectorLabels[s]}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tipo de consulta" error={errors.tipoConsulta?.message} required>
                <select {...register("tipoConsulta")} className="field cursor-pointer">
                  <option value="">Seleccionar...</option>
                  {TIPOS_CONSULTA.map((t) => (
                    <option key={t} value={t}>{tipoConsultaLabels[t]}</option>
                  ))}
                </select>
              </Field>
            </div>

            {extraFields.length > 0 && (
              <div className="grid gap-4">
                {extraFields.map((field) => (
                  <Field
                    key={field.name}
                    label={field.label}
                    error={errors[field.name as keyof typeof errors]?.message as string | undefined}
                    required={field.required}
                  >
                    {field.type === "textarea" ? (
                      <textarea
                        {...register(field.name as keyof ContactFormData)}
                        className="field min-h-20 resize-none pt-7 pb-3"
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
              </div>
            )}

            <Field label="Mensaje" error={errors.mensaje?.message} required>
              <textarea
                {...register("mensaje")}
                className="field min-h-32 resize-none pt-5 pb-3"
                placeholder="Describe el proceso, problema, urgencia o servicio requerido"
              />
            </Field>

            {isError && (
              <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
                Hubo un error al enviar. Intenta de nuevo o escríbenos a{" "}
                <a href="mailto:ventas@delcarpio.cl" className="underline">
                  ventas@delcarpio.cl
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
      <span style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", fontWeight: 600 }}>
        {label}
        {required && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              lineHeight: "1",
              marginTop: "2px",
              background: "#FBE9E3",
              color: "#D5542B",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              padding: "2px 7px",
              borderRadius: "4px",
            }}
          >
            Requerido
          </span>
        )}
      </span>
      {children}
      {error ? (
        <span className="text-sm font-medium text-red-700">{error}</span>
      ) : null}
    </label>
  );
}
