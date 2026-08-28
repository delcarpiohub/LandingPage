import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactClientPage } from "./contact-client-page";

export function generateStaticParams() {
  return [
    { tipo: "ventas" },
    { tipo: "proyectos" },
    { tipo: "otras-consultas" },
    { tipo: "cotizar" },
    { tipo: "mantencion" },
    { tipo: "correctivo" },
    { tipo: "diagnostico" },
    { tipo: "capacitacion" },
  ];
}

interface PageProps {
  params: Promise<{ tipo: string }>;
}

const tipoMetadata: Record<string, { title: string; description: string }> = {
  ventas: {
    title: "Contacto Ventas | Del Carpio Análisis y Asesorías",
    description:
      "Cuéntenos qué equipo, marca o solución necesita y el equipo comercial de Del Carpio le orientará.",
  },
  cotizar: {
    title: "Cotizar y Asesorar | Del Carpio Análisis y Asesorías",
    description:
      "Solicite una cotización técnica detallada y asesoría experta para equipamiento científico de laboratorio.",
  },
  proyectos: {
    title: "Proyectos Técnicos | Del Carpio Análisis y Asesorías",
    description:
      "Describa el proceso, equipo o desafío técnico que necesita resolver con Del Carpio.",
  },
  "otras-consultas": {
    title: "Otras Consultas | Del Carpio Análisis y Asesorías",
    description:
      "Canal para facturación, alianzas comerciales o derivaciones administrativas generales con Del Carpio Análisis y Asesorías.",
  },
  mantencion: {
    title: "Solicitar Mantención | Del Carpio Análisis y Asesorías",
    description:
      "Solicite mantención preventiva para su equipo de laboratorio HPLC o GC. Programas de conservación diseñados por especialistas Del Carpio.",
  },
  correctivo: {
    title: "Solicitar Servicio Correctivo | Del Carpio Análisis y Asesorías",
    description:
      "Reporte una falla o avería en su instrumento analítico y reciba atención técnica prioritaria de Del Carpio.",
  },
  diagnostico: {
    title: "Solicitar Diagnóstico | Del Carpio Análisis y Asesorías",
    description:
      "Solicite una auditoría técnica de su parque analítico o de un método existente.",
  },
  capacitacion: {
    title: "Solicitar Capacitación | Del Carpio Análisis y Asesorías",
    description:
      "Solicite formación técnica en sitio o remota para analistas y jefes de laboratorio en manejo de equipos HPLC/GC.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tipo } = await params;
  const meta = tipoMetadata[tipo] ?? tipoMetadata["otras-consultas"];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/contacto/${tipo}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { tipo } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactClientPage tipo={tipo} />
    </Suspense>
  );
}
