import { TourLaboratorioClient } from "@/components/tour/tour-laboratorio-client";

export const metadata = {
  title: "Tour Virtual Laboratorio de Analisis | Del Carpio",
  description:
    "Recorrido virtual 360 del Laboratorio de Analisis Del Carpio, con escenas reales del area analitica e instrumentacion.",
  alternates: {
    canonical: "/contacto/tour-laboratorio",
  },
};

export default function TourLaboratorioPage() {
  return <TourLaboratorioClient />;
}
