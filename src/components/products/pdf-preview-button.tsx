"use client";

import { DownloadSimple, FilePdf, X } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PdfPreviewButtonProps {
  href: string;
  download: string;
  documentTitle: string;
  className: string;
  children?: ReactNode;
}

type PreviewStatus = "idle" | "loading" | "ready" | "error";

/**
 * Abre documentación publicada sin abandonar la ficha. La comprobación HTTP
 * previa es necesaria porque los errores 404 dentro de un iframe no disparan
 * un evento de error consistente entre navegadores.
 */
export function PdfPreviewButton({
  href,
  download,
  documentTitle,
  className,
  children,
}: PdfPreviewButtonProps) {
  const [open, setOpen] = useState(false);
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>("idle");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!open) {
      setPreviewStatus("idle");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    let active = true;

    async function verifyPdf() {
      setPreviewStatus("loading");

      try {
        let response = await fetch(href, {
          method: "HEAD",
          cache: "no-store",
          signal: controller.signal,
        });

        // Algunos servidores no aceptan HEAD. El rango evita descargar el
        // documento completo en ese caso, cuando el servidor lo soporta.
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
  }, [href, open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        aria-label={`Vista previa: ${documentTitle}`}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-[#101820]/70 p-3 sm:p-8"
              onMouseDown={(event) => {
                if (event.currentTarget === event.target) setOpen(false);
              }}
            >
              <div className="flex h-[min(760px,calc(100vh-1.5rem))] w-full max-w-[1120px] flex-col border border-[#D4DFDC] bg-white shadow-2xl">
                <header className="flex items-start justify-between gap-4 border-b border-[#D4DFDC] px-5 py-4 sm:px-6">
                  <div className="min-w-0">
                    <h2
                      id={dialogTitleId}
                      className="flex items-center gap-2 text-base font-bold text-[#101820]"
                    >
                      <FilePdf
                        size={21}
                        weight="fill"
                        aria-hidden="true"
                        className="shrink-0 text-[#D6532B]"
                      />
                      <span className="truncate">
                        Vista previa del documento
                      </span>
                    </h2>
                    <p className="mt-1 truncate text-sm text-[#4A5560]">
                      {documentTitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar vista previa"
                    className="flex size-10 shrink-0 items-center justify-center border border-[#D4DFDC] text-[#4A5560] transition-colors hover:border-[#D6532B] hover:text-[#D6532B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                  >
                    <X size={20} weight="bold" aria-hidden="true" />
                  </button>
                </header>

                <div className="relative min-h-0 flex-1 bg-[#F8FAFB]">
                  {previewStatus === "loading" || previewStatus === "idle" ? (
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
                        size={38}
                        weight="light"
                        aria-hidden="true"
                        className="text-[#D6532B]"
                      />
                      <p className="mt-4 text-base font-bold text-[#101820]">
                        No se pudo cargar la vista previa de este documento.
                      </p>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#4A5560]">
                        El archivo puede no estar disponible o la conexión no
                        respondió. Intente descargarlo nuevamente más tarde.
                      </p>
                    </div>
                  ) : null}
                </div>

                <footer className="flex justify-end border-t border-[#D4DFDC] px-5 py-4 sm:px-6">
                  <a
                    href={href}
                    download={download}
                    className="inline-flex h-10 items-center justify-center gap-2 bg-[#D6532B] px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#B8431E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
                  >
                    <DownloadSimple
                      size={17}
                      weight="bold"
                      aria-hidden="true"
                    />
                    Descargar
                  </a>
                </footer>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
