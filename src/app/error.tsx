"use client";

import { useEffect } from "react";
import Link from "next/link";

// Error boundary de segmento: captura fallas de render en cualquier página y
// evita que un error menor deje el sitio en blanco. Deliberadamente liviano
// (sin Navigation/Footer) para no depender de componentes que podrían ser la
// causa de la falla.
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center bg-[#f5f5f5]/85 px-5 py-16 text-[#4A5560] sm:px-8">
      <div className="mx-auto w-full max-w-[720px]">
        <div className="border-l-2 border-[#D6532B] pl-4 md:pl-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#707E83]">
            Error inesperado
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#4A5560] md:text-5xl">
            Algo salió mal al cargar esta página
          </h1>
        </div>

        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-slate-500">
          Ocurrió un problema temporal. Puedes reintentar la carga; si el
          problema persiste, escríbenos a ventas@delcarpio.cl.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-[8px] bg-[#D6532B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b9451f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[8px] border border-[#707E83]/40 px-6 py-3 text-sm font-semibold text-[#4A5560] transition hover:border-[#4A5560] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6532B]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
