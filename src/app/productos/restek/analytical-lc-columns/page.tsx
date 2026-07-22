import type { Metadata } from "next";

import { RestekColumnsFamily } from "../restek-columns-family";
import { RestekProductPageShell } from "../restek-product-page-shell";

export const metadata: Metadata = {
  title: "Columnas de LC analíticas Restek | Del Carpio",
  description:
    "Columnas analíticas Restek para HPLC y UHPLC, con asesoría para definir fase estacionaria, diámetro interno, longitud y tamaño de partícula según el método.",
  alternates: {
    canonical: "/productos/restek/analytical-lc-columns",
  },
};

export default function Page() {
  return (
    <RestekProductPageShell>
      <RestekColumnsFamily
        breadcrumbLabel="Columnas de LC analíticas"
        title="Columnas de LC analíticas"
        description="Restek ofrece columnas analíticas para HPLC y UHPLC en múltiples familias, fases y dimensiones. Si conoce la configuración, puede solicitarla directamente. Si necesita definir la selectividad adecuada para su método, Del Carpio revisa su aplicación antes de cotizar."
        image={{
          src: "/productos/restek/analytical-lc-columns.png",
          alt: "Columnas analíticas LC Restek con conexiones azules",
          width: 474,
          height: 474,
        }}
        productLine="lc"
        productName="Columnas de LC analíticas"
        knownPath={{
          title: "Conozco la configuración",
          description:
            "Tengo el número de parte o conozco la fase, diámetro interno, longitud y tamaño de partícula.",
          action: "Cotizar mi columna",
        }}
        advisoryPath={{
          title: "Necesito asesoría",
          description:
            "Conozco la muestra y los analitos, pero necesito definir la familia y dimensiones apropiadas para el método.",
          action: "Solicitar asesoría técnica",
        }}
      />
    </RestekProductPageShell>
  );
}
