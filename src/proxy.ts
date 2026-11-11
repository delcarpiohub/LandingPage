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
  // Usado solo por los dos checks nuevos de abajo (ase-celdas y la
  // normalización global de slash final) — la lógica legacy sigue
  // haciendo su propia normalización internamente, sin tocar.
  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  // Antes esta lookup usaba `pathname` crudo: "/soluciones/alimentos/" (con
  // barra) no matcheaba ninguna de las 6 keys (sin barra) y caía al
  // fallback de abajo, redirigiendo por error a
  // /productos/thermo-dionex-ase-350 en vez de a /productos?filtro=...
  // Verificado en vivo antes de este fix (curl -I devolvía
  // location: /productos/thermo-dionex-ase-350 para la variante con barra).
  const category = solutionRouteRedirects[normalizedPathname];
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

  if (normalizedPathname === "/productos/thermo-dionex-ase-celdas") {
    return NextResponse.redirect(
      new URL("/productos/thermo-dionex-ase-350", request.url),
      301,
    );
  }

  // Normalización global de slash final (encargo 2026-11-11): con
  // skipTrailingSlashRedirect:true en next.config.ts, "/x" y "/x/" responden
  // 200 por separado para cualquier ruta real del sitio nuevo — contenido
  // duplicado sin un único salto que lo resuelva. Esto cubre TODA ruta no
  // legacy pedida con barra final (el matcher de abajo ahora es amplio, no
  // solo los prefijos legacy): un solo 308 a la forma sin barra. Las rutas
  // legacy ya resuelven en un solo salto arriba (matchLegacyWordpressPath
  // normaliza y redirige directo al destino final), así que nunca llegan
  // hasta acá con la barra puesta.
  if (pathname !== normalizedPathname) {
    return NextResponse.redirect(new URL(normalizedPathname, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  // Antes solo matcheaba los prefijos/paths legacy puntuales de arriba. Se
  // amplía (encargo 2026-11-11) para que la normalización global de slash
  // final corra sobre cualquier ruta real del sitio: todo excepto /api,
  // los internos de Next (_next/static, _next/image), favicon/sitemap/robots,
  // y cualquier archivo estático servido por extensión (el ".*\\..*" final:
  // fotos, videos, PDFs de ficha, etc. — no necesitan pasar por proxy).
  // Los prefijos/paths legacy individuales de abajo quedan solo como
  // documentación de qué cubre matchLegacyWordpressPath; ya están incluidos
  // en el patrón amplio, no hace falta listarlos aparte.
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)"],
};
