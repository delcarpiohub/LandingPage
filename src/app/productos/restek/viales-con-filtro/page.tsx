import type { Metadata } from "next";

import { RestekColumnsFamily } from "../restek-columns-family";
import { RestekProductPageShell } from "../restek-product-page-shell";

export const metadata: Metadata = {
  title: "Viales con filtro Restek | Del Carpio",
  description:
    "Viales con filtro Restek para preparación de muestras LC, con asesoría para definir formato, membrana, porosidad y tipo de tapa según la aplicación.",
  alternates: {
    canonical: "/productos/restek/viales-con-filtro",
  },
};

export default function Page() {
  return (
    <RestekProductPageShell>
      <RestekColumnsFamily
        breadcrumbLabel="Viales con filtro"
        title="Viales con filtro"
        description="Los viales con filtro Thomson SINGLE StEP integran filtración y vial de autosampler en una sola preparación para análisis LC. Si conoce el formato, la membrana y la porosidad, puede solicitar la configuración directamente. Si necesita validar la compatibilidad con su muestra o fase móvil, Del Carpio revisa la aplicación antes de cotizar."
        image={{
          src: "/productos/restek/viales-con-filtro.png",
          alt: "Viales con filtro Restek con tapas de distintos colores",
          width: 192,
          height: 98,
          displayWidth: 384,
        }}
        productLine="vials"
        productName="Viales con filtro Restek"
        knownPath={{
          title: "Conozco la configuración",
          description:
            "Tengo el número de parte o conozco el formato, material de membrana, porosidad y tipo de tapa.",
          action: "Cotizar mis viales",
        }}
        advisoryPath={{
          title: "Necesito asesoría",
          description:
            "Conozco la muestra, el solvente y el volumen disponible, pero necesito definir el vial y la membrana compatibles.",
          action: "Solicitar asesoría técnica",
        }}
      />
    </RestekProductPageShell>
  );
}
