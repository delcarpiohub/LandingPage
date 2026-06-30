import { ContactClientPage } from "./contact-client-page";

export function generateStaticParams() {
  return [
    { tipo: "tour-laboratorio" },
    { tipo: "ventas" },
    { tipo: "proyectos" },
    { tipo: "otras-consultas" },
  ];
}

interface PageProps {
  params: Promise<{ tipo: string }>;
}

export default async function Page({ params }: PageProps) {
  const { tipo } = await params;
  return <ContactClientPage tipo={tipo} />;
}
