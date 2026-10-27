import type { UsdClpReferencial } from "@/lib/bcch";

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

// Pieza C: dólar observado referencial. Componente puramente presentacional
// -- el fetch al Banco Central ocurre en el Server Component que llama a
// getUsdClpReferencial() (src/lib/bcch.ts) y pasa el resultado como prop.
// Sin dato (flag en false, sin credenciales, error o dato vencido) no
// renderiza nada.
export function UsdClpReference({ data }: { data: UsdClpReferencial | null }) {
  if (!data) {
    return null;
  }

  const valorFormateado = data.valor.toLocaleString("es-CL", {
    maximumFractionDigits: 2,
  });

  return (
    <div className="mt-4 rounded-[4px] border border-[#D2D6DC] bg-[#F4F6F9] px-4 py-3 font-mono text-[13px] tabular-nums text-[#4A5560]">
      <p>
        USD/CLP · dólar observado · {formatFecha(data.fecha)}: ${valorFormateado}
      </p>
      <p className="mt-1 font-sans text-xs italic text-[#707E83]">
        Valor referencial del Banco Central de Chile. No constituye precio de cotización.
      </p>
    </div>
  );
}
