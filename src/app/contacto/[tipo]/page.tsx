import type { Metadata } from "next";
import { ContactClientPage } from "./contact-client-page";

export function generateStaticParams() {
  return [
    { tipo: "ventas" },
    { tipo: "proyectos" },
    { tipo: "otras-consultas" },
  ];
}

interface PageProps {
  params: Promise<{ tipo: string }>;
}

const tipoMetadata: Record<string, { title: string; description: string }> = {
  ventas: {
    title: "Contacto Ventas | Del Carpio Análisis y Asesorías",
    description:
      "Cotiza equipamiento cromatográfico HPLC y GC, consumibles y representaciones oficiales con el equipo de ventas de Del Carpio.",
  },
  proyectos: {
    title: "Soporte Técnico y Proyectos | Del Carpio Análisis y Asesorías",
    description:
      "Solicita diagnóstico, mantención IQ/OQ/PQ, validación de métodos o asistencia técnica en sitio para sistemas HPLC y GC.",
  },
  "otras-consultas": {
    title: "Otras Consultas | Del Carpio Análisis y Asesorías",
    description:
      "Canal para facturación, alianzas comerciales o derivaciones administrativas generales con Del Carpio Análisis y Asesorías.",
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
  return <ContactClientPage tipo={tipo} />;
}
