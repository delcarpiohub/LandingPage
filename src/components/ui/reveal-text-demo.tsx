"use client";

// Demo de referencia para RevealText — no está enrutado a ninguna página
// real del sitio. Usa los valores por defecto del componente (fotos de
// stock de Unsplash, texto en inglés, colores fuera de la paleta Del
// Carpio), que no cumplen las reglas de marca/contenido de este proyecto.
// No importar este archivo desde src/app/**.
import { RevealText } from "@/components/ui/reveal-text";

export default function RevealTextDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <RevealText
        text="STUNNING"
        textColor="text-white"
        overlayColor="text-red-500"
        fontSize="text-[125px]"
        letterDelay={0.08}
        overlayDelay={0.05}
        overlayDuration={0.4}
        springDuration={600}
      />
      <p className="mt-8">Hover over the text</p>
    </div>
  );
}
