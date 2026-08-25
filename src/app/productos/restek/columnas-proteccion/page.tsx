import type { Metadata } from "next";

import { RestekColumnsFamily } from "../restek-columns-family";
import { RestekProductPageShell } from "../restek-product-page-shell";

export const metadata: Metadata = {
  title: "Columnas de protección HPLC Restek | Del Carpio",
  description:
    "Cartuchos y portacartuchos de protección Restek para HPLC y UHPLC. Sistemas EXP, Roc y Trident compatibles con columnas Raptor, Force, Roc, Ultra, Pinnacle y Allure.",
  alternates: {
    canonical: "/productos/restek/columnas-proteccion",
  },
};

export default function Page() {
  return (
    <RestekProductPageShell>
      <RestekColumnsFamily
        breadcrumbLabel="Columnas de protección"
        title="Columnas de protección HPLC"
        description="Los cartuchos de protección Restek evitan que impurezas fuertemente retenidas y particulado alcancen la columna analítica, extendiendo su vida útil. Cada sistema —EXP, Roc o Trident— es compatible con una familia de columnas específica. Si sabe qué columna analítica utiliza, puede solicitar la guarda directamente. Si necesita confirmar la compatibilidad, Del Carpio revisa su configuración antes de cotizar."
        image={{
          src: "/productos/restek/columnas-proteccion-v2.png",
          alt: "Cartucho y portacartucho de protección LC Restek",
          width: 474,
          height: 474,
        }}
        productLine="lc"
        productName="Columnas de protección HPLC"
        knownPath={{
          title: "Conozco mi columna analítica",
          description:
            "Sé qué columna utilizo (Raptor, Force, Roc, Ultra, Pinnacle o Allure), su fase, tamaño de partícula y diámetro interno.",
          action: "Cotizar mi guarda",
        }}
        advisoryPath={{
          title: "Necesito confirmar compatibilidad",
          description:
            "Necesito verificar qué sistema de protección corresponde a mi columna y si requiero recubrimiento inerte para compuestos sensibles a metales.",
          action: "Solicitar asesoría técnica",
        }}
      />
    </RestekProductPageShell>
  );
}
