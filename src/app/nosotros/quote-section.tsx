"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Phone, WarningCircle } from "@phosphor-icons/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { company } from "@/content/site";
import { PrivacyConsentField } from "@/components/forms/privacy-consent-field";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/components/security/turnstile-widget";
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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

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
    if (!turnstileToken) {
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (!res.ok) throw new Error();
      setIsSuccess(true);
    } catch {
      setIsError(true);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
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
                    Te responderemos dentro de 24 horas hábiles, o llámanos todos los días, de 09:00 a 18:00.
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
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">Contacto</p>
              <h2
                className="mt-5 max-w-md text-[clamp(2.1rem,3.2vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink"
                id="quote-section-title"
              >
                Solicita una cotización.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-ink-dark/80">
                El control completo sobre nuestros equipos y servicios nos permite asegurar a cada cliente la
                mejor calidad, el mejor precio y el mejor tiempo de respuesta.
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
                    <FormField error={errors.nombre?.message} id="nombre" label="Nombre">
                      <input
                        className="field"
                        id="nombre"
                        placeholder="Nombre"
                        {...register("nombre")}
                      />
                    </FormField>
                    <FormField error={errors.correo?.message} id="correo" label="Correo">
                      <input
                        className="field"
                        id="correo"
                        placeholder="Correo"
                        type="email"
                        {...register("correo")}
                      />
                    </FormField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField error={errors.telefono?.message} id="telefono" label="Teléfono">
                      <input
                        className="field"
                        id="telefono"
                        placeholder="Teléfono"
                        type="tel"
                        {...register("telefono")}
                      />
                    </FormField>
                    <FormField error={errors.empresa?.message} id="empresa" label="Empresa">
                      <input
                        className="field"
                        id="empresa"
                        placeholder="Empresa"
                        {...register("empresa")}
                      />
                    </FormField>
                  </div>

                  <FormField error={errors.sector?.message} id="sector" label="Selecciona tu industria">
                    <select className="field cursor-pointer" id="sector" {...register("sector")}>
                      <option value="">Selecciona tu industria</option>
                      {SECTORES.map((sector) => (
                        <option key={sector} value={sector}>
                          {sectorLabels[sector]}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField error={errors.mensaje?.message} id="mensaje" label="Detalles adicionales">
                    <textarea
                      className="field min-h-28 resize-none py-3"
                      id="mensaje"
                      placeholder="Detalles adicionales"
                      {...register("mensaje")}
                    />
                  </FormField>

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

                  <TurnstileWidget
                    ref={turnstileRef}
                    onVerify={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                  />

                  <Button
                    className="mt-1"
                    disabled={isLoading || !turnstileToken}
                    type="submit"
                    variant="dark"
                  >
                    {isLoading ? "Enviando..." : "Enviar solicitud"}
                    {!isLoading && <ArrowRight aria-hidden="true" size={17} strokeWidth={2.5} />}
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

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <span className="flex items-center gap-1 text-xs font-semibold text-red-700">
          <WarningCircle size={13} weight="bold" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
