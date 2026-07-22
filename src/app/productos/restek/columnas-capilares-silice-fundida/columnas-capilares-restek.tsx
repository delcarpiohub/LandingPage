import { RestekColumnsFamily } from "../restek-columns-family";

export function ColumnasCapilaresRestek() {
  return (
    <RestekColumnsFamily
      breadcrumbLabel="Columnas capilares Restek"
      title="Columnas capilares de sílice fundida"
      description="Restek fabrica cientos de combinaciones de fase, diámetro y longitud. Si ya conoce sus medidas, cotícelas directamente. Si no está seguro de la fase o configuración correcta para su método, nuestro equipo técnico le ayuda a definirla."
      image={{
        src: "/productos/restek/columna-restek-grande.png",
        alt: "Columna capilar de sílice fundida Restek",
        width: 600,
        height: 600,
      }}
      productLine="gc"
      productName="Columnas capilares de sílice fundida"
      knownPath={{
        title: "Conozco mis medidas",
        description: "Tengo el código Restek, o sé la fase, diámetro y longitud que necesito.",
        action: "Cotizar mis medidas",
      }}
      advisoryPath={{
        title: "Necesito asesoría",
        description: "Sé qué necesito analizar, pero no la configuración exacta de columna.",
        action: "Solicitar asesoría técnica",
      }}
    />
  );
}
