"use client";

// Error boundary raíz: solo se activa si falla el layout completo, por lo que
// debe renderizar su propio <html>/<body> y no depender de CSS del proyecto.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          color: "#4A5560",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#707E83",
            }}
          >
            Error inesperado
          </p>
          <h1 style={{ margin: "12px 0 0", fontSize: 32, lineHeight: 1.1 }}>
            El sitio no pudo cargarse
          </h1>
          <p style={{ marginTop: 16, lineHeight: 1.6, color: "#5c6770" }}>
            Ocurrió un problema temporal. Reintenta la carga; si persiste,
            escríbenos a ventas@delcarpio.cl.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              border: 0,
              borderRadius: 8,
              background: "#D6532B",
              color: "#ffffff",
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
