"use client";

import { useEffect } from "react";
import {
  CONSENT_CHANGE_EVENT,
  hasAcceptedCookies,
  type ConsentChoice,
} from "@/lib/cookie-consent";

// Google Tag Manager (contenedor definido en NEXT_PUBLIC_GTM_ID). Mismo
// patrón que Google Translate y el mapa de Contacto: no se inyecta ningún
// script ni se hace ninguna solicitud a Google hasta que el visitante acepta
// las cookies no esenciales (src/lib/cookie-consent.ts).
//
// Equivale al snippet oficial de GTM (`<script>` de <head>): inicializa
// dataLayer con `gtm.start` y `event: "gtm.js"` y carga gtm.js?id=<ID>. No se
// incluye el `<noscript><iframe>` del <body>: solo actúa con JavaScript
// desactivado, y sin JavaScript no hay forma de pedir consentimiento, así
// que hacerlo habría significado contactar a Google sin autorización.
//
// Sin NEXT_PUBLIC_GTM_ID (o con un valor que no sea un ID GTM-XXXX) el
// componente no hace nada: ni listeners ni solicitudes, y el build no falla.

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const GTM_ID_PATTERN = /^GTM-[A-Z0-9]{4,}$/;
const GTM_SCRIPT_ID = "google-tag-manager-script";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function loadGoogleTagManager(id: string) {
  if (document.getElementById(GTM_SCRIPT_ID)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

export function GoogleTagManager() {
  useEffect(() => {
    if (!GTM_ID_PATTERN.test(GTM_ID)) return;

    if (hasAcceptedCookies()) loadGoogleTagManager(GTM_ID);

    function handleConsentChange(event: Event) {
      const { detail } = event as CustomEvent<ConsentChoice>;
      if (detail === "accepted") {
        loadGoogleTagManager(GTM_ID);
      } else if (document.getElementById(GTM_SCRIPT_ID)) {
        // Un script de terceros ya cargado no se puede descargar de memoria:
        // si el consentimiento se revoca con GTM activo, se recarga la página
        // (el banner ya borró las cookies de analítica) para que quede sin él.
        window.location.reload();
      }
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  return null;
}
