import type { Metadata } from "next";
import { ContactCorporateClient } from "./contact-corporate-client";

export const metadata: Metadata = {
  title: "Contacto | Del Carpio Análisis y Asesorías",
  description:
    "Contacta a Del Carpio para ventas, tour de laboratorio, proyectos o consultas generales. Oficina en Av. Sucre 2596, Ñuñoa, Santiago, Chile.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactoPage() {
  return <ContactCorporateClient />;
}
