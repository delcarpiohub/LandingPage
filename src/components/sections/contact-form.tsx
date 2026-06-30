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

const sectorLabels: Record<(typeof SECTORES)[number], string> = {
  alimentos: "Alimentos",
  mineria: "Minería",
  farmaceutica: "Farmacéutica",
  aguas: "Aguas",
  ambiental: "Ambiental",
  academia: "Academia / I+D",
};

const tipoConsultaLabels: Record<(typeof TIPOS_CONSULTA)[number], string> = {
  "cotizacion-equipo": "Cotización de equipo",
  "proyecto-laboratorio": "Proyecto de laboratorio completo",
  "soporte-tecnico": "Soporte técnico / mantención",
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
    <section id="contacto" className="bg-white">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-[75px] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="bg-[#101820] p-8 text-white rounded-[4px] border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
              {"// SISTEMA_CONTACTO_B2B"}
            </p>
            <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] md:text-4xl text-white">
              Agenda una evaluación técnica inicial.
            </h2>
            <p className="mt-6 max-w-xl text-xs leading-7 text-white/70 font-sans">
              Cuéntanos el proceso, la criticidad o la necesidad de análisis. La primera respuesta de nuestro equipo debe estructurar el problema técnico, no emitir una cotización ciega sin entender la matriz.
            </p>
          </div>
          <div className="mt-10 border-t border-white/15 pt-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
              Criterios de diagnóstico inicial
            </p>
            <p className="mt-3 text-xs leading-6 text-white/60 font-mono">
              &gt; Caracterización de matriz analítica<br />
              &gt; Rango de concentración esperado<br />
              &gt; Requerimientos de validación (NCh / ISO)
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="grid place-items-center border border-[var(--border)] bg-[var(--background)] p-8 text-center text-[var(--foreground)]">
            <p className="font-display text-2xl font-extrabold">Consulta enviada.</p>
            <p className="mt-3 text-[var(--muted)]">
              Recibirás respuesta en máximo 1 día hábil.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 border border-[var(--border)] bg-[var(--background)] p-5 text-[var(--foreground)]"
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
                    <option key={s} value={s}>
                      {sectorLabels[s]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tipo de consulta" error={errors.tipoConsulta?.message} required>
                <select {...register("tipoConsulta")} className="field cursor-pointer">
                  <option value="">Seleccionar...</option>
                  {TIPOS_CONSULTA.map((t) => (
                    <option key={t} value={t}>
                      {tipoConsultaLabels[t]}
                    </option>
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
                        className="field min-h-20 resize-none pb-3 pt-7"
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
                className="field min-h-32 resize-none pb-3 pt-5"
                placeholder="Describe el proceso, problema, urgencia o servicio requerido"
              />
            </Field>

            {isError && (
              <p className="bg-red-50 p-4 text-sm font-semibold text-red-700">
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
      <span className="flex items-start gap-2 text-sm font-bold">
        {label}
        {required && (
          <span className="mt-0.5 inline-flex items-center rounded-[2px] bg-white px-2 py-0.5 text-[10px] font-bold uppercase leading-none tracking-[0.04em] text-[var(--primary)]">
            Requerido
          </span>
        )}
      </span>
      {children}
      {error ? <span className="text-sm font-semibold text-red-700">{error}</span> : null}
    </label>
  );
}
