import { NextRequest, NextResponse } from "next/server";

import { wordpressLegacyRedirects } from "@/content/wordpress-legacy-redirects";

// Redirects 301 desde las 586 URLs del WordPress viejo (encargo
// 2026-11-11, ver data/import/urls-wordpress-viejas.txt y
// data/import/redirects-wordpress-mapa.csv). El mapa exacto vive en
// src/content/wordpress-legacy-redirects.ts; acá solo se hace el lookup y se
// construye la URL de destino con la misma técnica de solutionRouteRedirects
// (URL/URLSearchParams) para que el UTF-8 de "?filtro=" quede bien
// codificado. Lo que NO está en ese mapa (21 entradas de blog, /blog/,
// /category/noticias/) queda deliberadamente sin redirect — son decisiones
// pendientes, no un olvido.
function matchLegacyWordpressPath(pathname: string): string | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return wordpressLegacyRedirects[normalized];
}

// Las 6 páginas /soluciones/[industria] se eliminaron el 2026-10-02 por
// decisión de jefatura: las tarjetas de sector ahora llevan directo al
// catálogo filtrado (ver AGENTS.md y
// docs/archivo-soluciones-por-industria-2026-10.md). Estos redirects cubren
// cualquier link externo o indexado que aún apunte a las rutas viejas.
//
// Van en `proxy.ts` (no en `next.config.ts` → `redirects()`) porque esa API
// corrompe caracteres no-ASCII en `destination`: decodifica el valor ya
// codificado con `encodeURIComponent` y lo vuelve a escribir en el header
// `Location` como bytes crudos mal interpretados (ej. "Minería" terminaba
// como "Miner%EDa", "Academia / I+D" perdía el "+" literal). Construir la URL
// con el API `URL`/`URLSearchParams` aquí sí codifica UTF-8 correctamente.
const solutionRouteRedirects: Record<string, string> = {
  "/soluciones/alimentos": "Alimentos",
  "/soluciones/mineria": "Minería",
  "/soluciones/farmaceutica": "Área farmacéutica",
  "/soluciones/aguas": "Análisis de agua",
  "/soluciones/ambiental": "Ambiental",
  "/soluciones/academia-id": "Academia / I+D",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const category = solutionRouteRedirects[pathname];
  if (category) {
    const url = new URL("/productos", request.url);
    url.searchParams.set("filtro", category);
    return NextResponse.redirect(url, 301);
  }

  const legacyDestination = matchLegacyWordpressPath(pathname);
  if (legacyDestination) {
    const [destPath, destQuery] = legacyDestination.split("?");
    const url = new URL(destPath, request.url);
    if (destQuery) {
      const [key, value] = destQuery.split("=");
      url.searchParams.set(key, value);
    }
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.redirect(
    new URL("/productos/thermo-dionex-ase-350", request.url),
    301,
  );
}

export const config = {
  matcher: [
    "/productos/thermo-dionex-ase-celdas",
    "/soluciones/alimentos",
    "/soluciones/mineria",
    "/soluciones/farmaceutica",
    "/soluciones/aguas",
    "/soluciones/ambiental",
    "/soluciones/academia-id",

    // Redirects del WordPress viejo (ver src/content/wordpress-legacy-redirects.ts).
    // Prefijos con muchas sub-rutas:
    "/producto/:path*",
    "/product-category/:path*",
    "/product-tag/:path*",
    "/marca/:path*",
    "/tecnica-analitica/:path*",
    "/author/:path*",
    "/em-form-template/:path*",
    // Páginas sueltas del WordPress viejo sin prefijo común:
    "/alta-resolucion",
    "/analisis-elemental",
    "/analisis-elemental-organico",
    "/analizadores-discretos",
    "/bmg-labtech",
    "/consumibles",
    "/decent",
    "/dionex",
    "/distek",
    "/electroquimica",
    "/equipamientomenor",
    "/formulario-de-contacto-delcarpio",
    "/gc-gsms",
    "/generadores-y-bombas",
    "/gylson",
    "/hamilton",
    "/ic",
    "/labtech",
    "/lc-lcms",
    "/liquid-handling",
    "/milestone",
    "/newsletter",
    "/peak-scientific",
    "/politica-de-cookies",
    "/politica-de-privacidad",
    "/psa",
    "/purificadores-de-agua",
    "/quote-request",
    "/representaciones",
    "/restek",
    "/sample-prep",
    "/servicio-tecnico",
    "/sievers-2",
    "/solicitar-presupuesto",
    "/terminos-y-condiciones",
    "/thermcraft",
    "/thermo-fisher",
    "/witeg",
  ],
};
