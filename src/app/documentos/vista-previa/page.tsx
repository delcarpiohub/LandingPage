import { PdfPreviewPage } from "@/components/products/pdf-preview-page";

interface PdfPreviewRouteProps {
  searchParams: Promise<{
    url?: string;
    title?: string;
    download?: string;
  }>;
}

function isPublishedProductPdf(value: string) {
  return (
    value.startsWith("/productos/") &&
    !value.includes("..") &&
    !value.includes("\\") &&
    value.toLowerCase().endsWith(".pdf")
  );
}

export default async function PdfPreviewRoute({
  searchParams,
}: PdfPreviewRouteProps) {
  const params = await searchParams;
  const href = params.url ?? "";
  const documentTitle = params.title?.slice(0, 240) || "Documento técnico";
  const download = params.download?.slice(0, 240) || "documento-tecnico.pdf";

  if (!isPublishedProductPdf(href)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101820] px-6 text-center text-white">
        <p className="max-w-md text-lg font-semibold">
          Este documento no está disponible para vista previa.
        </p>
      </main>
    );
  }

  return (
    <PdfPreviewPage
      href={href}
      download={download}
      documentTitle={documentTitle}
    />
  );
}
