import type { Metadata } from "next";

import { ColumnasCapilaresRestek } from "./columnas-capilares-restek";
import { RestekProductPageShell } from "../restek-product-page-shell";

export const metadata: Metadata = {
  title: "Columnas capilares de sílice fundida Restek | Del Carpio",
  description:
    "Familias de columnas capilares Restek para cromatografía de gases: líneas Rtx y Rxi, fases especializadas y asesoría técnica para definir la fase y dimensión exacta de su método.",
  alternates: {
    canonical: "/productos/restek/columnas-capilares-silice-fundida",
  },
};

export default function Page() {
  return (
    <RestekProductPageShell>
      <ColumnasCapilaresRestek />
    </RestekProductPageShell>
  );
}
