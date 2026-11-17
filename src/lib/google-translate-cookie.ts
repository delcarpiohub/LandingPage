// Manejo de la cookie `googtrans` de Google Translate.
//
// Por qué existe: el script de Google escribe su propia copia host-only de la
// cookie al traducir. Si además escribimos variantes con `domain=`, conviven
// 2-3 cookies `googtrans` con el mismo nombre y path pero distinto alcance, y
// al cambiar de idioma solo se sobrescribía la del mismo alcance: Google leía
// una cookie vieja para el cuerpo y otra nueva para el título. Regla: antes de
// escribir un idioma se borran TODAS las variantes y se escribe una sola.

const COOKIE_NAME = "googtrans";
const EXPIRED = "expires=Thu, 01 Jan 1970 00:00:00 UTC";

export type SiteLanguage = "es" | "en" | "pt";

// Dominios con los que pudo escribirse la cookie: host-only (sin domain),
// el host, `.host` y los dominios padre (www.delcarpio.cl → delcarpio.cl).
function cookieDomains(hostname: string): (string | null)[] {
  const domains: (string | null)[] = [null];
  if (hostname === "localhost" || /^[\d.]+$/.test(hostname)) {
    return hostname === "localhost" ? [null, hostname] : [null];
  }
  const parts = hostname.split(".");
  for (let i = 0; i <= parts.length - 2; i += 1) {
    const candidate = parts.slice(i).join(".");
    domains.push(candidate, `.${candidate}`);
  }
  return domains;
}

export function clearGoogleTranslateCookies() {
  if (typeof window === "undefined") return;
  for (const domain of cookieDomains(window.location.hostname)) {
    const domainPart = domain ? `; domain=${domain}` : "";
    document.cookie = `${COOKIE_NAME}=; path=/${domainPart}; ${EXPIRED}`;
  }
}

// Todas las cookies `googtrans` visibles (puede haber varias); la primera es
// la que el navegador envía antes y la que Google lee.
export function readGoogleTranslateLanguage(): SiteLanguage {
  if (typeof document === "undefined") return "es";
  const match = document.cookie
    .split("; ")
    .filter((entry) => entry.startsWith(`${COOKIE_NAME}=`))
    .map((entry) => entry.slice(COOKIE_NAME.length + 1))
    .find((value) => value.endsWith("/en") || value.endsWith("/pt"));
  if (match?.endsWith("/en")) return "en";
  if (match?.endsWith("/pt")) return "pt";
  return "es";
}

// Español = sin cookie (el contenido original); en/pt = una única cookie.
export function writeGoogleTranslateLanguage(lang: SiteLanguage) {
  if (typeof window === "undefined") return;
  clearGoogleTranslateCookies();
  if (lang === "es") return;
  const { protocol, hostname } = window.location;
  // `Secure` solo se acepta en https o localhost; en http plano el
  // navegador descartaría la cookie completa.
  const secure =
    protocol === "https:" || hostname === "localhost" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=/es/${lang}; path=/; SameSite=Lax${secure}`;
}
