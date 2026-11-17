// Fuente única de verdad para el consentimiento de cookies no esenciales
// (delcarpio_cookie_consent, escrito por cookie-consent-banner.tsx). Todo
// script de terceros que no sea estrictamente necesario para el
// funcionamiento del sitio debe:
//   1. Leer hasAcceptedCookies() antes de inyectarse.
//   2. Escuchar CONSENT_CHANGE_EVENT para reaccionar en caliente cuando el
//      usuario acepta/rechaza, sin depender de un reload.
// Patrón vigente hoy: Google Translate (navigation.tsx), el iframe de Google
// Maps (contact-map-banner.tsx) y Google Tag Manager / Google Analytics
// (analytics/google-tag-manager.tsx). Cuando se migre ConvertKit desde el
// sitio antiguo, su loader debe seguir el mismo patrón: gatear la carga con
// hasAcceptedCookies()/CONSENT_CHANGE_EVENT, y agregar aquí su propia función
// de limpieza (equivalente a clearGoogleTranslateState /
// clearGoogleAnalyticsState) para cuando el usuario rechace o revoque.

import {
  clearGoogleTranslateCookies,
  expireCookie,
} from "@/lib/google-translate-cookie";

export const CONSENT_STORAGE_KEY = "delcarpio_cookie_consent";
export const CONSENT_DATE_STORAGE_KEY = "delcarpio_cookie_consent_date";
export const CONSENT_CHANGE_EVENT = "delcarpio:cookie-consent-change";

export type ConsentChoice = "accepted" | "rejected";

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function hasAcceptedCookies(): boolean {
  return getStoredConsent() === "accepted";
}

export function notifyConsentChange(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }),
  );
}

// Revierte el estado que deja Google Analytics (cargado vía Google Tag Manager,
// src/components/analytics/google-tag-manager.tsx) cuando el usuario rechaza
// cookies: borra las cookies de medición `_ga`, `_gid`, `_gat*` y
// `_ga_<ID de la propiedad>` en todas las variantes de dominio.
export function clearGoogleAnalyticsState() {
  if (typeof window === "undefined") return;
  for (const entry of document.cookie.split("; ")) {
    const name = entry.split("=")[0];
    if (/^(_ga|_gid|_gat)(_.*)?$/.test(name)) expireCookie(name);
  }
}

// Revierte el estado que deja Google Translate cuando el usuario rechaza
// cookies (o revoca una aceptación previa): borra la cookie `googtrans` en
// las 3 variantes con que navigation.tsx la escribe, y el idioma persistido.
export function clearGoogleTranslateState() {
  if (typeof window === "undefined") return;
  clearGoogleTranslateCookies();
  window.localStorage.removeItem("site-language");
}
