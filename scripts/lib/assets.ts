import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/** Lee data/import/allowlist-dominios.txt: un dominio por línea (sin
 * protocolo, ej. "assets.thermofisher.com"). Si el archivo no existe o está
 * vacío, la allowlist es vacía a propósito — nada se descarga hasta que el
 * usuario la apruebe explícitamente, como pide la tarea. */
export function loadAllowlist(path: string): Set<string> {
  if (!existsSync(path)) return new Set();
  return new Set(
    readFileSync(path, "utf-8")
      .split("\n")
      .map((l) => l.trim().toLowerCase())
      .filter((l) => l && !l.startsWith("#")),
  );
}

export function isUrlAllowed(url: string, allowlist: Set<string>): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return allowlist.has(host);
  } catch {
    return false;
  }
}

export interface DownloadResult {
  ok: boolean;
  reason?: string;
  savedTo?: string;
}

/** Descarga `url` a `destAbsPath` solo si su dominio está en `allowlist`.
 * No lanza: siempre devuelve un resultado para que el caller pueda reportar
 * y seguir (requisito: "si falla (503), lo reporta y sigue"). */
export async function downloadIfAllowed(
  url: string,
  destAbsPath: string,
  allowlist: Set<string>,
  dryRun: boolean,
): Promise<DownloadResult> {
  if (url.startsWith("/")) {
    // Ruta local ya existente bajo /public — no es una descarga externa.
    return { ok: true, savedTo: url };
  }
  if (!isUrlAllowed(url, allowlist)) {
    return { ok: false, reason: `dominio no está en la allowlist aprobada: ${url}` };
  }
  if (dryRun) {
    return { ok: true, reason: "dry-run: no se descargó, solo se validó la allowlist", savedTo: destAbsPath };
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { ok: false, reason: `HTTP ${res.status} al descargar ${url}` };
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(destAbsPath), { recursive: true });
    writeFileSync(destAbsPath, buffer);
    return { ok: true, savedTo: destAbsPath };
  } catch (err) {
    return { ok: false, reason: `error de red descargando ${url}: ${(err as Error).message}` };
  }
}

export function publicPathFor(slug: string, filename: string): { relative: string; absolute: string } {
  const relative = `/productos/${slug}/${filename}`;
  const absolute = resolve(process.cwd(), "public", "productos", slug, filename);
  return { relative, absolute };
}
