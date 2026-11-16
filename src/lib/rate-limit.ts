import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiting compartido por los dos endpoints de contacto
// (src/app/api/contacto/route.ts y src/app/api/whatsapp-fallback/route.ts):
// 5 solicitudes cada 10 minutos por IP.
//
// Usa Upstash Redis (vía Vercel Marketplace) cuando hay URL y token
// configurados (UPSTASH_REDIS_REST_* o, en su defecto, KV_REST_API_*) —
// coordina el límite entre todas las instancias serverless. Mientras no se aprovisione, cae de vuelta
// al Map en memoria original (best-effort, por instancia, se reinicia con
// cada cold start y no coordina entre instancias — la limitación ya conocida
// y documentada en la auditoría de seguridad 2026-08-24).
//
// Para activar Upstash: `vercel integration add` (o el dashboard de Vercel)
// → Marketplace → Upstash → Redis, crear una base y copiar las dos env vars
// a .env.local / Vercel. No requiere cambiar código, solo configurarlas.
const MAX_REQUESTS = 5;
const WINDOW = "10 m";
const MEMORY_WINDOW_MS = 10 * 60 * 1000;

// Dos juegos de nombres, en orden de prioridad: los propios de Upstash y los
// KV_REST_API_* que inyecta la integración de Vercel Marketplace. Se usa `||`
// (no `??`) para que una variable definida pero vacía no tape a la siguiente.
// KV_REST_API_READ_ONLY_TOKEN queda fuera a propósito: es de solo lectura y
// el contador necesita escribir.
const upstashUrl =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const upstashToken =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const ratelimit =
  upstashUrl && upstashToken
    ? new Ratelimit({
        redis: new Redis({ url: upstashUrl, token: upstashToken }),
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW),
        analytics: false,
        prefix: "delcarpio-contacto",
      })
    : null;

if (!ratelimit) {
  console.warn(
    "Upstash sin URL o token (UPSTASH_REDIS_REST_* / KV_REST_API_*): " +
      "rate limiting en memoria por instancia (ver src/lib/rate-limit.ts).",
  );
}

const memoryLog = new Map<string, number[]>();

function isMemoryRateLimited(identifier: string): boolean {
  const now = Date.now();
  const recent = (memoryLog.get(identifier) ?? []).filter(
    (t) => now - t < MEMORY_WINDOW_MS,
  );
  if (memoryLog.size > 1000) memoryLog.clear();
  memoryLog.set(identifier, [...recent, now]);
  return recent.length >= MAX_REQUESTS;
}

// true = la solicitud debe rechazarse (excede el límite).
export async function isRateLimited(identifier: string): Promise<boolean> {
  if (ratelimit) {
    const { success } = await ratelimit.limit(identifier);
    return !success;
  }
  return isMemoryRateLimited(identifier);
}
