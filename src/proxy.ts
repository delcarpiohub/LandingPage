import { NextRequest, NextResponse } from "next/server";

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
  const category = solutionRouteRedirects[request.nextUrl.pathname];
  if (category) {
    const url = new URL("/productos", request.url);
    url.searchParams.set("filtro", category);
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
  ],
};
