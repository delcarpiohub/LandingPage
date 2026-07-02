import type { Metadata } from "next";
import { ContactCorporateClient } from "./contact-corporate-client";

export const metadata: Metadata = {
  title: "Contacto | Del Carpio Análisis y Asesorías",
  description:
    "Seleccione el tipo de atención que necesita y contacte a Del Carpio para ventas, proyectos, visitas técnicas o consultas generales.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactoPage() {
  return <ContactCorporateClient />;
}
