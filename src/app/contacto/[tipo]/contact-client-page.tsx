"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Briefcase,
  CaretDown,
  CheckCircle,
  EnvelopeSimple,
  Microscope,
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
  mineria: "Minería",
  farmaceutica: "Farmacéutica",
  aguas: "Aguas",
  ambiental: "Ambiental",
  academia: "Academia / I+D",
};

const countryCodes = [
  { code: "+56", flag: "🇨🇱", country: "Chile" },
  { code: "+54", flag: "🇦🇷", country: "Argentina" },
  { code: "+51", flag: "🇵🇪", country: "Perú" },
  { code: "+57", flag: "🇨🇴", country: "Colombia" },
  { code: "+591", flag: "🇧🇴", country: "Bolivia" },
  { code: "+593", flag: "🇪🇨", country: "Ecuador" },
  { code: "+595", flag: "🇵🇾", country: "Paraguay" },
  { code: "+598", flag: "🇺🇾", country: "Uruguay" },
  { code: "+58", flag: "🇻🇪", country: "Venezuela" },
  { code: "+52", flag: "🇲🇽", country: "México" },
  { code: "+34", flag: "🇪🇸", country: "España" },
  { code: "+1", flag: "🇺🇸", country: "Estados Unidos" },
] as const;
const contactTypes: Record<string, ContactTypeConfig> = {
  "tour-laboratorio": {
    title: "Agendar tour de laboratorio",
    intro:
      "Indique qué capacidades desea revisar y coordinaremos una visita con el equipo técnico adecuado.",
    label: "Tour de laboratorio",
    icon: Microscope,
    sector: "academia",
    tipoConsulta: "otro",
    bullets: [
      "Infraestructura de laboratorio",
      "Capacidades HPLC y GC",
      "Reunión con especialistas",
    ],
    placeholder:
      "Ej. Queremos conocer capacidades HPLC para control de calidad y revisar opciones para implementar un método interno.",
  },
  ventas: {
    title: "Contactar con ventas",
    intro:
      "Cuéntenos qué equipo, marca o solución necesita y nuestro equipo comercial le orientará.",
    label: "Ventas",
    icon: Briefcase,
    sector: "academia",
    tipoConsulta: "cotizacion-equipo",
    bullets: [
      "Equipamiento analítico",
      "Consumibles y repuestos",
      "Marcas representadas",
    ],
    placeholder:
      "Ej. Necesito cotizar columnas, consumibles o soporte para un sistema cromatográfico existente.",
  },
  proyectos: {
    title: "Evaluar un proyecto técnico",
    intro:
      "Describa el proceso, equipo o desafío técnico que necesita resolver.",
    label: "Proyectos",
    icon: Wrench,
    sector: "academia",
    tipoConsulta: "proyecto-laboratorio",
    bullets: [
      "Implementaciones analíticas",
      "Validación de métodos",
      "Automatización e instrumentación",
    ],
    placeholder:
      "Ej. Necesitamos evaluar la implementación de un método analítico, automatizar un proceso o validar un sistema existente.",
  },
  "otras-consultas": {
    title: "Otras consultas",
    intro:
      "Use este canal para asuntos administrativos, alianzas o requerimientos no comerciales.",
    label: "Consulta general",
    icon: EnvelopeSimple,
    sector: "academia",
    tipoConsulta: "otro",
    bullets: ["Facturación", "Alianzas", "Derivación interna"],
    placeholder:
      "Ej. Necesito contactar al área administrativa por una orden de compra o una solicitud general.",
  },
};

export function ContactClientPage({ tipo }: { tipo: string }) {
  const config = contactTypes[tipo] ?? contactTypes["otras-consultas"];
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countryCode, setCountryCode] = useState("+56");

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
      telefono: `${countryCode} ${data.telefono}`,
      mensaje: `[${config.label.toUpperCase()}]\n${data.mensaje || ""}`,
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
    <div className="flex min-h-dvh flex-col bg-white">
      <Navigation />

      <main id="main-content" className="flex-1 px-5 py-12 md:py-20">
        <div className="mx-auto max-w-[800px]">
          {/* Volver a opciones */}
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
          >
            <ArrowLeft size={16} weight="bold" />
            Volver a opciones
          </Link>

          <h1 className="mt-4 font-display text-3xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
            {config.title}
          </h1>
          <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-2xl">
            {config.intro}
          </p>

          <div className="mt-8">
            {isSuccess ? (
              <div className="grid min-h-[380px] place-items-center text-center">
                <div>
                  <CheckCircle
                    size={54}
                    weight="fill"
                    className="mx-auto text-[#53843A]"
                  />
                  <h2 className="mt-5 font-display text-2xl font-extrabold text-slate-800">
                    Consulta enviada
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
                    Recibimos su solicitud. El equipo Del Carpio responderá
                    con orientación técnica durante el próximo día hábil.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Nombre" error={errors.nombre?.message} required>
                    <input
                      {...register("nombre")}
                      className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                      placeholder="Nombre y apellido"
                    />
                  </Field>
                  <Field label="Empresa" error={errors.empresa?.message} required>
                    <input
                      {...register("empresa")}
                      className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                      placeholder="Empresa o institución"
                    />
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Correo" error={errors.correo?.message} required>
                    <input
                      {...register("correo")}
                      className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                      type="email"
                      placeholder="nombre@empresa.cl"
                    />
                  </Field>
                  <Field label="Teléfono" error={errors.telefono?.message} required>
                    <div className="flex gap-2">
                      <div className="relative w-28 shrink-0">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full h-11 pl-3 pr-8 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 cursor-pointer outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 appearance-none"
                        >
                          {countryCodes.map(({ code, flag, country }) => (
                            <option key={code} value={code}>
                              {flag} {code} {country}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                          <CaretDown size={14} />
                        </div>
                      </div>
                      <input
                        {...register("telefono")}
                        className="flex-1 h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                        type="tel"
                        placeholder="9 9158 3010"
                      />
                    </div>
                  </Field>
                </div>

                <div>
                  <Field label="Sector" error={errors.sector?.message}>
                    <div className="relative">
                      <select
                        {...register("sector")}
                        className="w-full h-11 pl-4 pr-10 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 cursor-pointer outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 appearance-none"
                      >
                        {SECTORES.map((sector) => (
                          <option key={sector} value={sector}>
                            {sectorLabels[sector]}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                        <CaretDown size={16} />
                      </div>
                    </div>
                  </Field>
                </div>

                {extraFields.length > 0 && (
                  <div className="grid gap-6 p-6 border border-slate-100 bg-slate-50/50 rounded-lg">
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
                            className="w-full min-h-[100px] py-3 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 resize-none"
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            {...register(field.name as keyof ContactFormData)}
                            className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                            placeholder={field.placeholder}
                          />
                        )}
                      </Field>
                    ))}
                  </div>
                )}

                <Field label="Mensaje" error={errors.mensaje?.message}>
                  <textarea
                    {...register("mensaje")}
                    className="w-full min-h-[140px] py-3 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 resize-none"
                    placeholder={config.placeholder}
                  />
                </Field>

                {isError && (
                  <p className="border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 rounded-[4px]">
                    Hubo un error al enviar. Intenta nuevamente o escribe a{" "}
                    <a href={`mailto:${company.email}`} className="underline">
                      {company.email}
                    </a>
                    .
                  </p>
                )}

                <p className="text-xs text-slate-500 leading-relaxed mt-2">
                  Al enviar este formulario, usted autoriza a Delcarpio Ltda. a ponerse en contacto con usted para atender su solicitud. Sus datos personales serán tratados de acuerdo con nuestra{" "}
                  <Link href="/contacto/politica-privacidad" className="text-[#D5542B] hover:underline font-semibold">
                    Política de privacidad
                  </Link>
                  .
                </p>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full h-12 bg-[#D5542B] hover:bg-[#b54725] text-white font-bold uppercase tracking-wider text-xs rounded-[4px] shadow-sm hover:shadow transition-all duration-180 flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  {isLoading ? "Enviando..." : "Enviar consulta"}
                </Button>
              </form>
            )}
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
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1 font-bold">*</span>}
      </span>
      {children}
      {error ? (
        <span className="flex items-center gap-1 text-sm font-semibold text-red-600">
          <WarningCircle size={14} weight="bold" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
