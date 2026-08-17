"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, PaperPlaneTilt, Phone, WarningCircle } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { company } from "@/content/site";
import { PrivacyConsentField } from "@/components/forms/privacy-consent-field";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { contactSchema, SECTORES, type ContactFormData } from "@/lib/contact-schema";

const sectorLabels: Record<(typeof SECTORES)[number], string> = {
  alimentos: "Alimentos",
  mineria: "Minería",
  farmaceutica: "Farmacéutica",
  aguas: "Aguas",
  ambiental: "Ambiental",
  academia: "Academia / I+D",
};

export function QuoteSection() {
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
      formularioOrigen: "contacto-general",
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
    <section aria-labelledby="quote-section-title" className="bg-[var(--background)] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-wide px-5 sm:px-8 lg:px-10">
        <div className="grid md:grid-cols-12 md:items-start">
          <Reveal className="relative md:col-span-5 md:row-start-1 md:self-start lg:z-10 lg:col-span-5 lg:-mr-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white lg:aspect-[3/4] lg:rounded-none lg:shadow-2xl">
              <Image
                alt="Especialista Del Carpio en terreno, listo para brindar soporte técnico"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                src="/fotos/especialista-soporte-terreno.jpg"
              />
            </div>

            <div className="absolute inset-x-5 bottom-5 z-10 bg-primary p-5 text-white shadow-xl sm:inset-x-8 sm:bottom-8 sm:p-6 lg:inset-x-auto lg:bottom-8 lg:left-8 lg:right-8">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Phone aria-hidden="true" size={18} weight="fill" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-6 text-white/95">
                    Te responderemos dentro de 24 horas hábiles, o llámanos en horario de oficina.
                  </p>
                  <a
                    className="mt-2 inline-block text-lg font-extrabold tracking-tight underline-offset-4 hover:underline"
                    href={`tel:${company.phone.replace(/\s+/g, "")}`}
                  >
                    {company.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="border border-ink-border bg-white md:col-span-7 md:row-start-1 md:mt-14" delay={0.08}>
            <div className="px-6 py-9 sm:px-10 sm:py-10 lg:px-11 lg:py-10">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">
                Solicita una cotización
              </p>
              <h2
                className="mt-5 max-w-md text-[clamp(2rem,3vw,2.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink"
                id="quote-section-title"
              >
                Cuéntanos tu proyecto y te contactamos.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-ink-dark/80">
                Control completo sobre nuestros equipos y servicios nos permite asegurar la mejor calidad,
                precio y tiempos de respuesta para cada cliente.
              </p>

              {isSuccess ? (
                <div className="mt-8 grid place-items-center border border-ink-border bg-[var(--background)] p-8 text-center">
                  <CheckCircle className="text-[#53843A]" size={44} weight="fill" />
                  <p className="mt-4 text-lg font-extrabold text-ink">Solicitud enviada.</p>
                  <p className="mt-2 text-sm text-ink-dark/70">Recibirás respuesta en máximo 1 día hábil.</p>
                </div>
              ) : (
                <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field error={errors.nombre?.message} label="Nombre" required>
                      <input {...register("nombre")} className="field" placeholder="Nombre" />
                    </Field>
                    <Field error={errors.empresa?.message} label="Empresa" required>
                      <input {...register("empresa")} className="field" placeholder="Empresa" />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field error={errors.correo?.message} label="Correo" required>
                      <input {...register("correo")} className="field" placeholder="Correo" type="email" />
                    </Field>
                    <Field error={errors.telefono?.message} label="Teléfono" required>
                      <input {...register("telefono")} className="field" placeholder="Teléfono" type="tel" />
                    </Field>
                  </div>

                  <Field error={errors.sector?.message} label="Sector / industria">
                    <select {...register("sector")} className="field cursor-pointer">
                      <option value="">Selecciona tu industria</option>
                      {SECTORES.map((sector) => (
                        <option key={sector} value={sector}>
                          {sectorLabels[sector]}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field error={errors.mensaje?.message} label="Detalles adicionales">
                    <textarea
                      {...register("mensaje")}
                      className="field min-h-28 resize-none py-3"
                      placeholder="Cuéntanos qué necesitas..."
                    />
                  </Field>

                  {isError && (
                    <p className="border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                      Hubo un error al enviar. Intenta de nuevo o escríbenos a{" "}
                      <a className="underline" href={`mailto:${company.email}`}>
                        {company.email}
                      </a>
                      .
                    </p>
                  )}

                  <PrivacyConsentField
                    error={errors.consentimientoPrivacidad?.message}
                    id="nosotros-cotizacion-privacidad"
                    registration={register("consentimientoPrivacidad")}
                  />

                  <Button className="mt-1" disabled={isLoading} type="submit">
                    {isLoading ? "Enviando..." : "Enviar solicitud"}
                    {!isLoading && <PaperPlaneTilt size={17} weight="bold" />}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
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
      <span className="flex items-center gap-2 text-sm font-bold text-ink">
        {label}
        {required && (
          <span className="rounded-[2px] bg-ink/6 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-primary">
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
