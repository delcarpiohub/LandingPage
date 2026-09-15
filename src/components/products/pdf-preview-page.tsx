"use client";

import { ArrowLeft, DownloadSimple, FilePdf, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PdfPreviewPageProps {
  href: string;
  download: string;
  documentTitle: string;
}

type PreviewStatus = "loading" | "ready" | "error";

export function PdfPreviewPage({
  href,
  download,
  documentTitle,
}: PdfPreviewPageProps) {
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>("loading");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    let active = true;

    async function verifyPdf() {
      try {
        let response = await fetch(href, {
          method: "HEAD",
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.status === 405 || response.status === 501) {
          response = await fetch(href, {
            method: "GET",
            cache: "no-store",
            headers: { Range: "bytes=0-0" },
            signal: controller.signal,
          });
        }

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        if (active) setPreviewStatus("ready");
      } catch {
        if (active) setPreviewStatus("error");
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void verifyPdf();

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [href]);

  return (
    <main className="flex min-h-screen flex-col bg-[#101820]">
      <header className="flex flex-col gap-4 border-b border-white/20 bg-[#101820] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FBE369]">
            Documentación técnica · Del Carpio
          </p>
          <h1 className="mt-1 flex items-center gap-2 truncate text-base font-bold text-white sm:text-lg">
            <FilePdf
              size={22}
              weight="fill"
              aria-hidden="true"
              className="shrink-0 text-[#D6532B]"
            />
            <span className="truncate">{documentTitle}</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/productos"
            className="inline-flex h-10 items-center justify-center gap-2 border border-white/40 px-4 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBE369]"
          >
            <ArrowLeft size={16} weight="bold" aria-hidden="true" />
            Catálogo
          </Link>
          <a
            href={href}
            download={download}
            className="inline-flex h-10 items-center justify-center gap-2 bg-[#D6532B] px-4 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBE369]"
          >
            <DownloadSimple size={17} weight="bold" aria-hidden="true" />
            Descargar
          </a>
          <button
            type="button"
            onClick={() => window.close()}
            aria-label="Cerrar vista previa"
            className="flex size-10 items-center justify-center border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBE369]"
          >
            <X size={19} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </header>

      <section className="min-h-0 flex-1 p-3 sm:p-5 lg:p-7">
        <div className="h-[calc(100vh-7rem)] min-h-[420px] border border-[#D4DFDC] bg-white shadow-2xl lg:h-[calc(100vh-8.5rem)]">
          {previewStatus === "loading" ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <span
                className="size-8 animate-spin rounded-full border-2 border-[#D4DFDC] border-t-[#D6532B]"
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-[#4A5560]">
                Cargando vista previa…
              </p>
            </div>
          ) : null}

          {previewStatus === "ready" ? (
            <iframe
              src={href}
              title={`Vista previa: ${documentTitle}`}
              className="h-full w-full border-0 bg-white"
              onError={() => setPreviewStatus("error")}
            />
          ) : null}

          {previewStatus === "error" ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <FilePdf
                size={42}
                weight="light"
                aria-hidden="true"
                className="text-[#D6532B]"
              />
              <p className="mt-4 text-lg font-bold text-[#101820]">
                No se pudo cargar la vista previa de este documento.
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#4A5560]">
                El archivo puede no estar disponible o la conexión no respondió.
                Intente descargarlo nuevamente más tarde.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
