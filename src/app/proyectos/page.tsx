import type { Metadata } from "next";

import { ProyectosPageClient } from "./proyectos-page-client";

export const metadata: Metadata = {
  title: "Proyectos de laboratorio completo | Del Carpio Análisis y Asesorías",
  description:
    "Proyectos ejecutados por Del Carpio: mobiliario técnico, líneas de gases con alarma, sistemas de extracción y puertas y ventanas para laboratorios de salud pública e industria minera en Chile.",
  alternates: {
    canonical: "/proyectos",
  },
};

export default function ProyectosPage() {
  return <ProyectosPageClient />;
}
