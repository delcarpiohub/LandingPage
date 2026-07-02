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
      "Cuéntenos qué equipo, marca o solución necesita y el equipo comercial de Del Carpio le orientará.",
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
