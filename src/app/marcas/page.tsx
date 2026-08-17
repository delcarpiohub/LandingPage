import type { Metadata } from "next";

import { MarcasGate } from "./marcas-gate";

// Página deliberadamente no listada en la navegación ni en sitemap: solo se
// llega haciendo clic en un logo de la franja de marcas del home. noindex
// evita que aparezca como resultado de búsqueda independiente.
export const metadata: Metadata = {
  title: "Marcas representadas | Del Carpio Análisis y Asesorías",
  robots: { index: false, follow: false },
};

export default function MarcasPage() {
  return <MarcasGate />;
}
