import type { NextConfig } from "next";

// CSP en modo enforcing (promovida desde Report-Only el 2026-08-31, sin
// violaciones tras auditar cada origen externo real del sitio: Google
// Translate y el iframe de Maps, ambos gateados por el consentimiento de
// cookies — ver src/lib/cookie-consent.ts). Inventario de orígenes: el sitio
// es self-contained (next/font self-hosted, imágenes/videos propios, el
// visor 360° de Marzipano sirve sus panoramas desde /tour/, todo WebGL en
// hilo principal sin workers) salvo Google Translate y Google Maps. Antes de
// sumar cualquier script/iframe/fetch de terceros nuevo (bot-protection,
// analytics, etc.) hay que agregar su origen aquí primero o quedará
// bloqueado en producción, no solo reportado.
// `unsafe-inline` en script-src es requerido por los inline scripts de Next
// y el JSON-LD; eliminarlo exigiría infraestructura de nonces.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://www.gstatic.com https://translate.googleapis.com",
  "img-src 'self' data: https://www.gstatic.com https://fonts.gstatic.com https://www.google.com https://translate.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://translate.googleapis.com https://translate-pa.googleapis.com https://clients5.google.com",
  "media-src 'self'",
  // www.google.com: iframe del mapa de Google Maps en /contacto
  // (contact-map-banner.tsx); translate.google.com: widget de Google Translate.
  "frame-src https://translate.google.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
