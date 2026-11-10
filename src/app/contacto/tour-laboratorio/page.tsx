import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourLaboratorioClient } from "@/components/tour/tour-laboratorio-client";
import { SHOW_TOUR } from "@/lib/feature-flags";

export function generateMetadata(): Metadata {
  if (!SHOW_TOUR) {
    return {
      title: "Página no encontrada | Del Carpio Análisis y Asesorías",
      robots: { index: false },
    };
  }

  return {
    title: "Tour Virtual Laboratorio de Analisis | Del Carpio",
    description:
      "Recorrido virtual 360 del Laboratorio de Analisis Del Carpio, con escenas reales del area analitica e instrumentacion.",
    alternates: {
      canonical: "/contacto/tour-laboratorio",
    },
  };
}

export default function TourLaboratorioPage() {
  if (!SHOW_TOUR) notFound();

  return <TourLaboratorioClient />;
}
