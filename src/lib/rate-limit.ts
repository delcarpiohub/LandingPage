import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiting compartido por los dos endpoints de contacto
// (src/app/api/contacto/route.ts y src/app/api/whatsapp-fallback/route.ts):
// 5 solicitudes cada 10 minutos por IP.
//
// Usa Upstash Redis (vía Vercel Marketplace) cuando UPSTASH_REDIS_REST_URL y
// UPSTASH_REDIS_REST_TOKEN están configuradas — coordina el límite entre
// todas las instancias serverless. Mientras no se aprovisione, cae de vuelta
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

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

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
    "UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN no configuradas: " +
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
