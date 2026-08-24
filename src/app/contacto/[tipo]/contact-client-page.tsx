"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Briefcase,
  CaretDown,
  CheckCircle,
  EnvelopeSimple,
  FirstAid,
  Microscope,
  ShieldCheck,
  Student,
  WarningCircle,
  Wrench,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { PrivacyConsentField } from "@/components/forms/privacy-consent-field";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  sectorFields,
  serviceFields,
  type ContactFormData,
  SECTORES,
  SERVICE_TIPOS,
  TIPOS_PROYECTO,
  type RestekUnknownField,
} from "@/lib/contact-schema";
import { company } from "@/content/site";
import { RestekQuoteFields } from "./restek-quote-fields";

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
  { code: "+56", country: "Chile" },
  { code: "+54", country: "Argentina" },
  { code: "+51", country: "Perú" },
  { code: "+57", country: "Colombia" },
  { code: "+591", country: "Bolivia" },
  { code: "+593", country: "Ecuador" },
  { code: "+595", country: "Paraguay" },
  { code: "+598", country: "Uruguay" },
  { code: "+58", country: "Venezuela" },
  { code: "+52", country: "México" },
  { code: "+34", country: "España" },
  { code: "+1", country: "Estados Unidos" },
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
  cotizar: {
    title: "Solicitar Cotización y Asesoría",
    intro:
      "Complete el siguiente formulario y un especialista técnico de Del Carpio le contactará a la brevedad con una propuesta formal.",
    label: "Cotización y Asesoría",
    icon: Briefcase,
    sector: "academia",
    tipoConsulta: "cotizacion-equipo",
    bullets: [
      "Especificaciones técnicas",
      "Cotización formal",
      "Asesoría de instalación",
    ],
    placeholder: "",
  },
  mantencion: {
    title: "Solicitar mantención",
    intro:
      "Cuéntenos qué equipo necesita mantención y un especialista Del Carpio le contactará para coordinar el servicio.",
    label: "Mantención",
    icon: ShieldCheck,
    sector: "academia",
    tipoConsulta: "soporte-tecnico",
    bullets: [
      "Mantenimiento preventivo periódico",
      "Reemplazo de piezas de desgaste",
      "Informe técnico de estado operacional",
    ],
    placeholder:
      "Ej. Necesitamos coordinar mantención preventiva anual para dos equipos HPLC en nuestro laboratorio de control de calidad.",
  },
  correctivo: {
    title: "Solicitar servicio correctivo",
    intro:
      "Describa la falla de su equipo y le daremos atención prioritaria. Mientras más detalle entregue, más rápida será la primera respuesta técnica.",
    label: "Correctivo",
    icon: FirstAid,
    sector: "academia",
    tipoConsulta: "soporte-tecnico",
    bullets: [
      "Atención prioritaria ante fallas críticas",
      "Diagnóstico electrónico, mecánico y óptico",
      "Repuestos originales garantizados",
    ],
    placeholder:
      "Ej. Agregue cualquier antecedente adicional: mensajes de error, cuándo comenzó la falla, si es intermitente, etc.",
  },
  diagnostico: {
    title: "Solicitar diagnóstico",
    intro:
      "Indíquenos qué equipo o sistema necesita evaluar y le propondremos un alcance de auditoría técnica.",
    label: "Diagnóstico",
    icon: Microscope,
    sector: "academia",
    tipoConsulta: "soporte-tecnico",
    bullets: [
      "Auditoría técnica de parque de instrumentos",
      "Evaluación de desempeño y trazabilidad",
      "Dictamen de viabilidad técnica",
    ],
    placeholder:
      "Ej. Agregue cualquier antecedente adicional sobre el equipo, método o problema que motiva el diagnóstico.",
  },
  capacitacion: {
    title: "Solicitar capacitación",
    intro:
      "Cuéntenos qué necesita aprender su equipo y diseñaremos un programa de formación a medida.",
    label: "Capacitación",
    icon: Student,
    sector: "academia",
    tipoConsulta: "soporte-tecnico",
    bullets: [
      "Formación teórica y práctica en sitio",
      "Buenas prácticas cromatográficas",
      "Certificado técnico por participante",
    ],
    placeholder:
      "Ej. Agregue cualquier antecedente adicional: equipos disponibles, fecha deseada, nivel de experiencia del equipo, etc.",
  },
};

const formularioOrigenByType = {
  ventas: "contacto-ventas",
  cotizar: "contacto-cotizar",
  proyectos: "contacto-proyectos",
  "otras-consultas": "contacto-otras-consultas",
  mantencion: "servicio-mantencion",
  correctivo: "servicio-correctivo",
  diagnostico: "servicio-diagnostico",
  capacitacion: "servicio-capacitacion",
} as const;

export function ContactClientPage({ tipo }: { tipo: string }) {
  const config = contactTypes[tipo] ?? contactTypes["otras-consultas"];
  const formularioOrigen =
    formularioOrigenByType[tipo as keyof typeof formularioOrigenByType] ??
    "contacto-otras-consultas";
  const isProjectForm = tipo === "proyectos";
  const isOtherInquiryForm = tipo === "otras-consultas";
  const isCotizarForm = tipo === "cotizar";
  const isServiceForm = (SERVICE_TIPOS as readonly string[]).includes(tipo);
  const hidesSector =
    isProjectForm || isOtherInquiryForm || isCotizarForm || isServiceForm;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [countryCode, setCountryCode] = useState("+56");

  const [unknownRestekFields, setUnknownRestekFields] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const producto = searchParams ? searchParams.get("producto") || "" : "";
  const marca = searchParams ? searchParams.get("marca") || "" : "";
  const modoParam = searchParams ? searchParams.get("modo") : null;
  const lineaParam = searchParams ? searchParams.get("linea") : null;
  const origenParam = searchParams ? searchParams.get("origen") || "" : "";
  const fromParam = searchParams ? searchParams.get("from") : null;
  const accionParam = searchParams ? searchParams.get("accion") : null;
  const isAsesoria = accionParam === "asesoria" || tipo === "proyectos";
  const displayTitle = isAsesoria ? "Solicitar Asesoría Técnica" : config.title;
  const displayIntro = isAsesoria
    ? "Complete el siguiente formulario y un especialista técnico de Del Carpio le contactará para asesorarle a la medida."
    : config.intro;
  const safeReturnHref =
    fromParam && fromParam.startsWith("/productos") ? fromParam : null;
  const isRestekQuote =
    tipo === "cotizar" &&
    marca.toLowerCase() === "restek" &&
    (modoParam === "medidas" || modoParam === "asesoria");
  const restekProductLine =
    lineaParam === "lc" ? "lc" : lineaParam === "vials" ? "vials" : "gc";
  const restekProductName =
    producto ||
    (restekProductLine === "lc"
      ? "Analytical LC Columns"
      : restekProductLine === "vials"
        ? "Viales con filtro Restek"
        : "Columnas capilares de sílice fundida");
  const restekReturnHref =
    restekProductLine === "lc"
      ? "/productos/restek/analytical-lc-columns"
      : restekProductLine === "vials"
        ? "/productos/restek/viales-con-filtro"
        : "/productos/restek/columnas-capilares-silice-fundida";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      sector: hidesSector ? undefined : config.sector,
      servicioTipo: isServiceForm
        ? (tipo as (typeof SERVICE_TIPOS)[number])
        : undefined,
      tipoConsulta: config.tipoConsulta,
      formularioOrigen,
      consentimientoPrivacidad: false,
    },
  });

  const sectorValue = useWatch({ control, name: "sector" });
  const extraFields = useMemo(() => {
    if (isServiceForm)
      return serviceFields[tipo as (typeof SERVICE_TIPOS)[number]];
    if (hidesSector) return [];
    return sectorFields[sectorValue as keyof typeof sectorFields] ?? [];
  }, [hidesSector, isServiceForm, sectorValue, tipo]);

  function handleToggleUnknownField(field: RestekUnknownField) {
    setUnknownRestekFields((prev) => {
      const next = prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field];
      setValue("camposRestekDesconocidos", next as RestekUnknownField[], {
        shouldDirty: true,
      });
      return next;
    });
  }

  async function onSubmit(data: ContactFormData) {
    setIsLoading(true);
    setIsError(false);

    const payload = {
      ...data,
      telefono: `${countryCode} ${data.telefono}`,
      marca: marca || data.marca,
      modoCotizacion: isRestekQuote ? modoParam : data.modoCotizacion,
      accion: isAsesoria ? "asesoria" : "cotizar",
      origen: origenParam || (isRestekQuote ? restekProductName : data.origen),
      mensaje: `[SOLICITUD DE ${isAsesoria ? "ASESORÍA TÉCNICA" : "COTIZACIÓN"}]${restekProductName && isRestekQuote ? ` - Producto solicitado: ${restekProductName}` : producto ? ` - Producto solicitado: ${producto}` : ""}\n${data.mensaje || ""}`,
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
    <div className="flex min-h-dvh flex-col bg-white/70">
      <Navigation />

      <main
        id="main-content"
        className="flex-1 px-4 py-10 sm:px-5 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[800px]">
          {/* Volver a opciones */}
          <Link
            href={
              safeReturnHref ??
              (isRestekQuote
                ? restekReturnHref
                : isServiceForm
                  ? "/servicios"
                  : "/contacto")
            }
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5542B]"
          >
            <ArrowLeft size={16} weight="bold" />
            {isServiceForm ? "Volver a servicios" : "Volver a opciones"}
          </Link>

          <h1 className="mt-4 font-display text-[2rem] font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
            {displayTitle}
          </h1>
          <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-2xl">
            {displayIntro}
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
                    Recibimos su solicitud. El equipo Del Carpio responderá con
                    orientación técnica durante el próximo día hábil.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-6"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
                  <Field
                    id="contacto-nombre"
                    label="Nombre"
                    error={errors.nombre?.message}
                    required
                  >
                    <input
                      id="contacto-nombre"
                      {...register("nombre")}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.nombre)}
                      aria-describedby={
                        errors.nombre ? "contacto-nombre-error" : undefined
                      }
                      className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                      placeholder="Nombre y apellido"
                    />
                  </Field>
                  <Field
                    id="contacto-empresa"
                    label="Empresa"
                    error={errors.empresa?.message}
                    required
                  >
                    <input
                      id="contacto-empresa"
                      {...register("empresa")}
                      autoComplete="organization"
                      aria-invalid={Boolean(errors.empresa)}
                      aria-describedby={
                        errors.empresa ? "contacto-empresa-error" : undefined
                      }
                      className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                      placeholder="Empresa o institución"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
                  <Field
                    id="contacto-correo"
                    label="Correo"
                    error={errors.correo?.message}
                    required
                  >
                    <input
                      id="contacto-correo"
                      {...register("correo")}
                      className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.correo)}
                      aria-describedby={
                        errors.correo ? "contacto-correo-error" : undefined
                      }
                      placeholder="nombre@empresa.cl"
                    />
                  </Field>
                  <Field
                    id="contacto-telefono"
                    label="Teléfono"
                    error={errors.telefono?.message}
                    required
                  >
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="relative w-full shrink-0 sm:w-40">
                        <select
                          id="contacto-codigo-pais"
                          aria-label="Código de país"
                          autoComplete="tel-country-code"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full h-11 pl-3 pr-8 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 cursor-pointer outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 appearance-none"
                        >
                          {countryCodes.map(({ code, country }) => (
                            <option key={code} value={code}>
                              {code} - {country}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                          <CaretDown size={14} />
                        </div>
                      </div>
                      <input
                        id="contacto-telefono"
                        {...register("telefono")}
                        className="h-11 w-full px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 sm:flex-1"
                        type="tel"
                        autoComplete="tel-national"
                        aria-invalid={Boolean(errors.telefono)}
                        aria-describedby={
                          errors.telefono
                            ? "contacto-telefono-error"
                            : undefined
                        }
                        placeholder="Numero de Telefono"
                      />
                    </div>
                  </Field>
                </div>

                <div>
                  {isProjectForm ? (
                    <Field
                      label="Tipo de Proyecto"
                      error={errors.tipoProyecto?.message as string | undefined}
                    >
                      <div className="grid gap-3 rounded-[4px] border border-[#D2D6DC] bg-[#F4F6F9] p-4 md:grid-cols-2">
                        {TIPOS_PROYECTO.map((projectType) => (
                          <label
                            key={projectType}
                            className="flex cursor-pointer items-start gap-3 text-sm font-medium text-slate-700"
                          >
                            <input
                              {...register("tipoProyecto")}
                              type="checkbox"
                              value={projectType}
                              className="mt-0.5 h-4 w-4 rounded border-[#D2D6DC] text-[#D5542B] accent-[#D5542B] focus:ring-[#D5542B]"
                            />
                            <span>{projectType}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                  ) : isOtherInquiryForm ||
                    isCotizarForm ||
                    isServiceForm ? null : (
                    <Field
                      id="contacto-sector"
                      label="Sector"
                      error={errors.sector?.message}
                    >
                      <div className="relative">
                        <select
                          id="contacto-sector"
                          {...register("sector")}
                          aria-invalid={Boolean(errors.sector)}
                          aria-describedby={
                            errors.sector ? "contacto-sector-error" : undefined
                          }
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
                  )}
                </div>

                {isRestekQuote ? (
                  <RestekQuoteFields
                    mode={modoParam as "medidas" | "asesoria"}
                    productLine={restekProductLine}
                    register={register}
                    errors={errors}
                    unknownFields={unknownRestekFields}
                    onToggleUnknown={handleToggleUnknownField}
                  />
                ) : isCotizarForm ? (
                  <Field
                    id="contacto-area"
                    label="Área / Facultad / Rubro"
                    error={errors.areaFacultadRubro?.message}
                  >
                    <input
                      id="contacto-area"
                      {...register("areaFacultadRubro")}
                      aria-invalid={Boolean(errors.areaFacultadRubro)}
                      aria-describedby={
                        errors.areaFacultadRubro
                          ? "contacto-area-error"
                          : undefined
                      }
                      className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                      placeholder="ej. Control de Calidad / Facultad de Química"
                    />
                  </Field>
                ) : null}

                {extraFields.length > 0 && (
                  <div className="grid gap-6 p-6 border border-slate-100 bg-slate-50/50 rounded-lg">
                    {extraFields.map((field) => (
                      <Field
                        key={field.name}
                        id={`contacto-${field.name}`}
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
                            id={`contacto-${field.name}`}
                            {...register(field.name as keyof ContactFormData)}
                            aria-invalid={Boolean(
                              errors[field.name as keyof typeof errors],
                            )}
                            aria-describedby={
                              errors[field.name as keyof typeof errors]
                                ? `contacto-${field.name}-error`
                                : undefined
                            }
                            className="w-full min-h-[100px] py-3 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 resize-none"
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            id={`contacto-${field.name}`}
                            {...register(field.name as keyof ContactFormData)}
                            aria-invalid={Boolean(
                              errors[field.name as keyof typeof errors],
                            )}
                            aria-describedby={
                              errors[field.name as keyof typeof errors]
                                ? `contacto-${field.name}-error`
                                : undefined
                            }
                            className="w-full h-11 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10"
                            placeholder={field.placeholder}
                          />
                        )}
                      </Field>
                    ))}
                  </div>
                )}

                {!isCotizarForm && (
                  <Field
                    id="contacto-mensaje"
                    label="Mensaje"
                    error={errors.mensaje?.message}
                    required={isProjectForm || isOtherInquiryForm}
                  >
                    <textarea
                      id="contacto-mensaje"
                      {...register("mensaje")}
                      aria-invalid={Boolean(errors.mensaje)}
                      aria-describedby={
                        errors.mensaje ? "contacto-mensaje-error" : undefined
                      }
                      className="w-full min-h-[140px] py-3 px-4 text-[15px] bg-[#F4F6F9] hover:bg-[#EBEEF3] focus:bg-white border border-[#D2D6DC] focus:border-[#D5542B] rounded-[4px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D5542B]/10 resize-none"
                      placeholder={config.placeholder}
                    />
                  </Field>
                )}

                {isError && (
                  <p className="border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 rounded-[4px]">
                    Hubo un error al enviar. Intenta nuevamente o escribe a{" "}
                    <a href={`mailto:${company.email}`} className="underline">
                      {company.email}
                    </a>
                    .
                  </p>
                )}

                <PrivacyConsentField
                  id="contacto-privacidad"
                  registration={register("consentimientoPrivacidad")}
                  error={errors.consentimientoPrivacidad?.message}
                />

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
  id,
  label,
  error,
  required = false,
  children,
}: {
  id?: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const safeId =
    id ?? `contacto-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const errorId = `${safeId}-error`;

  return (
    <div
      className="flex flex-col gap-2"
      role={id ? undefined : "group"}
      aria-labelledby={id ? undefined : `${safeId}-label`}
    >
      {id ? (
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1 font-bold">*</span>}
        </label>
      ) : (
        <span
          id={`${safeId}-label`}
          className="text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1 font-bold">*</span>}
        </span>
      )}
      {children}
      {error ? (
        <span
          id={errorId}
          role="alert"
          className="flex items-center gap-1 text-sm font-semibold text-red-600"
        >
          <WarningCircle size={14} weight="bold" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
