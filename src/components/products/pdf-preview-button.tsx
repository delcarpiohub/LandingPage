import { type ReactNode } from "react";

interface PdfPreviewButtonProps {
  href: string;
  download: string;
  documentTitle: string;
  className: string;
  children?: ReactNode;
}

/** Abre el visor de pantalla completa en una pestaña independiente. */
export function PdfPreviewButton({
  href,
  download,
  documentTitle,
  className,
  children,
}: PdfPreviewButtonProps) {
  const previewUrl = new URLSearchParams({
    url: href,
    title: documentTitle,
    download,
  });

  return (
    <a
      href={`/documentos/vista-previa?${previewUrl.toString()}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Abrir vista previa en una nueva ventana: ${documentTitle}`}
    >
      {children}
    </a>
  );
}
