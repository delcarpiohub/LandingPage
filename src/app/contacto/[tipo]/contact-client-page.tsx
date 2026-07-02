"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  EnvelopeSimple,
  Microscope,
  PaperPlaneTilt,
  WarningCircle,
  Wrench,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  sectorFields,
  type ContactFormData,
  SECTORES,
  TIPOS_CONSULTA,
} from "@/lib/contact-schema";
import { company } from "@/content/site";

type ContactTypeConfig = {
  title: string;
  intro: string;
  label: string;
  icon: Icon;
  sector: ContactFormData["sector"];
  tipoConsulta: ContactFormData["tipoConsulta"];
  bullets: string[];
  placeholder: string;
};

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

const contactTypes: Record<string, ContactTypeConfig> = {
  "tour-laboratorio": {
    title: "Reserve una visita tecnica",
    intro:
      "Indicanos que capacidades quieres revisar y coordinaremos una visita con el equipo adecuado.",
    label: "Visita tecnica",
    icon: Microscope,
    sector: "academia",
    tipoConsulta: "otro",
    bullets: [
      "Infraestructura de laboratorio",
      "Capacidades HPLC y GC",
      "Reunion con especialistas",
    ],
    placeholder:
      "Ej. Queremos conocer capacidades HPLC para control de calidad y revisar opciones para implementar un metodo interno.",
  },
  ventas: {
    title: "Contactar con ventas",
    intro:
      "Cuentanos que equipo, consumible o servicio necesitas cotizar para derivarlo al area comercial correcta.",
    label: "Ventas",
    icon: Briefcase,
    sector: "academia",
    tipoConsulta: "cotizacion-equipo",
    bullets: [
      "Equipamiento analitico",
      "Consumibles y repuestos",
      "Marcas representadas",
    ],
    placeholder:
      "Ej. Necesito cotizar columnas, consumibles o soporte para un sistema cromatografico existente.",
  },
  proyectos: {
    title: "Soporte tecnico",
    intro:
      "Describe el sistema, metodo o problema tecnico para iniciar una evaluacion con trazabilidad.",
    label: "Soporte tecnico",
    icon: Wrench,
    sector: "academia",
    tipoConsulta: "soporte-tecnico",
    bullets: [
      "Mantencion e IQ/OQ/PQ",
      "Validacion de metodos",
      "Asistencia tecnica en sitio",
    ],
    placeholder:
      "Ej. Requerimos diagnostico para un HPLC con desviaciones de presion y revision de plan de mantencion.",
  },
  "otras-consultas": {
    title: "Otras consultas",
    intro:
      "Usa este canal para asuntos administrativos, facturacion, alianzas o derivaciones generales.",
    label: "Consulta general",
    icon: EnvelopeSimple,
    sector: "academia",
    tipoConsulta: "otro",
    bullets: ["Facturacion", "Alianzas", "Derivacion interna"],
    placeholder:
      "Ej. Necesito contactar al area administrativa por una orden de compra o una solicitud general.",
  },
};

export function ContactClientPage({ tipo }: { tipo: string }) {
  const config = contactTypes[tipo] ?? contactTypes["otras-consultas"];
  const Icon = config.icon;
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
      sector: config.sector,
      tipoConsulta: config.tipoConsulta,
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

    const payload = {
      ...data,
      mensaje: `[${config.label.toUpperCase()}]\n${data.mensaje}`,
    };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <div className="flex min-h-dvh flex-col bg-[#f7f7f5]">
      <Navigation />

      <main id="main-content" className="flex-1 px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#4A5560]/65 transition hover:text-[#4A5560] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
          >
            <ArrowLeft size={16} weight="bold" />
            Volver a opciones
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="bg-[#4A5560] p-8 text-white">
              <div className="grid size-16 place-items-center border border-white/15 text-[var(--primary)]">
                <Icon size={34} weight="light" />
              </div>
              <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                {config.label}
              </p>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
                {config.title}
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/70">
                {config.intro}
              </p>
              <ul className="mt-10 grid gap-4 border-t border-white/12 pt-6">
                {config.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-white/76">
                    <span className="mt-2 size-1.5 shrink-0 bg-[var(--primary)]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </aside>

            <section className="border border-[#4A5560]/12 bg-white p-6 shadow-[0_18px_50px_rgba(16,24,32,0.08)] md:p-8">
              {isSuccess ? (
                <div className="grid min-h-[480px] place-items-center text-center">
                  <div>
                    <CheckCircle
                      size={54}
                      weight="fill"
                      className="mx-auto text-[#53843A]"
                    />
                    <h2 className="mt-5 font-display text-2xl font-extrabold text-[#4A5560]">
                      Consulta enviada
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#4A5560]/68">
                      Recibimos tu solicitud. El equipo Del Carpio respondera en
                      un plazo maximo de 1 dia habil.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
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
                        placeholder="Empresa o institucion"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Correo" error={errors.correo?.message} required>
                      <input
                        {...register("correo")}
                        className="field"
                        type="email"
                        placeholder="nombre@empresa.cl"
                      />
                    </Field>
                    <Field label="Telefono" error={errors.telefono?.message} required>
                      <input
                        {...register("telefono")}
                        className="field"
                        type="tel"
                        placeholder="+56 9 0000 0000"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Sector" error={errors.sector?.message} required>
                      <select {...register("sector")} className="field cursor-pointer">
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
                        {TIPOS_CONSULTA.map((consulta) => (
                          <option key={consulta} value={consulta}>
                            {tipoConsultaLabels[consulta]}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {extraFields.length > 0 && (
                    <div className="grid gap-5 border border-[#4A5560]/10 bg-[#f7f7f5] p-5">
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
                    </div>
                  )}

                  <Field label="Mensaje" error={errors.mensaje?.message} required>
                    <textarea
                      {...register("mensaje")}
                      className="field min-h-36 resize-none py-3"
                      placeholder={config.placeholder}
                    />
                  </Field>

                  {isError && (
                    <p className="border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                      Hubo un error al enviar. Intenta nuevamente o escribe a{" "}
                      <a href={`mailto:${company.email}`} className="underline">
                        {company.email}
                      </a>
                      .
                    </p>
                  )}

                  <Button type="submit" disabled={isLoading} className="mt-2 w-full">
                    {isLoading ? "Enviando..." : "Enviar consulta"}
                    {!isLoading && <PaperPlaneTilt size={17} weight="bold" />}
                  </Button>
                </form>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
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
      <span className="flex items-center gap-2 text-sm font-bold text-[#4A5560]">
        {label}
        {required && (
          <span className="rounded-[2px] bg-[#4A5560]/6 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">
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
