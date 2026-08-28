// Fuente única de verdad para el consentimiento de cookies no esenciales
// (delcarpio_cookie_consent, escrito por cookie-consent-banner.tsx). Todo
// script de terceros que no sea estrictamente necesario para el
// funcionamiento del sitio debe:
//   1. Leer hasAcceptedCookies() antes de inyectarse.
//   2. Escuchar CONSENT_CHANGE_EVENT para reaccionar en caliente cuando el
//      usuario acepta/rechaza, sin depender de un reload.
// Patrón vigente hoy: Google Translate (navigation.tsx) y el iframe de
// Google Maps (contact-map-banner.tsx). Cuando se migren Google Analytics y
// ConvertKit desde el sitio antiguo, su loader debe seguir el mismo patrón:
// gatear la carga con hasAcceptedCookies()/CONSENT_CHANGE_EVENT, y agregar
// aquí su propia función de limpieza (equivalente a
// clearGoogleTranslateState) para cuando el usuario rechace o revoque.

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

// Revierte el estado que deja Google Translate cuando el usuario rechaza
// cookies (o revoca una aceptación previa): borra la cookie `googtrans` en
// las 3 variantes con que navigation.tsx la escribe, y el idioma persistido.
export function clearGoogleTranslateState() {
  if (typeof window === "undefined") return;
  const host = window.location.hostname;
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = `googtrans=; path=/; ${expired}`;
  document.cookie = `googtrans=; path=/; domain=${host}; ${expired}`;
  if (host !== "localhost") {
    document.cookie = `googtrans=; path=/; domain=.${host}; ${expired}`;
  }
  window.localStorage.removeItem("site-language");
}
