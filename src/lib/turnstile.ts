// Verificación server-side de Cloudflare Turnstile para los endpoints de
// contacto (src/app/api/contacto/route.ts y
// src/app/api/whatsapp-fallback/route.ts). El widget cliente vive en
// src/components/security/turnstile-widget.tsx.
//
// Variables de entorno requeridas (ver .env.example):
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY — pública, se envía al navegador.
//   TURNSTILE_SECRET_KEY           — server-only, nunca debe llevar
//                                    NEXT_PUBLIC_.
// Se obtienen creando un sitio en el dashboard de Cloudflare Turnstile
// (gratis) para el dominio delcarpio.cl.
//
// Mientras no exista una cuenta real de Cloudflare, usar las site/secret
// keys de prueba publicadas por Cloudflare para desarrollo local (siempre
// aprueban, no requieren cuenta):
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
//   TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
//
// Fail-closed a propósito: si TURNSTILE_SECRET_KEY no está configurada en un
// ambiente que sí debería tenerla (producción), se rechaza la solicitud en
// vez de dejarla pasar sin verificar — omitir esto en silencio anularía el
// propósito de la protección anti-bots.
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";
// Tiempo máximo de espera de siteverify: sin tope, una respuesta lenta de
// Cloudflare dejaría la función serverless ocupada hasta el límite de la
// plataforma. Al vencer se trata como verificación fallida (fail-closed).
const TURNSTILE_VERIFY_TIMEOUT_MS = 5000;
// Hostnames donde el widget puede haberse resuelto en producción. Cloudflare
// devuelve en `hostname` el sitio donde se generó el token: si no es el
// nuestro, el token se obtuvo en otra página y no debe aceptarse.
const TURNSTILE_ALLOWED_HOSTNAMES = new Set(["delcarpio.cl", "www.delcarpio.cl"]);

export class TurnstileConfigurationError extends Error {
  constructor() {
    super("TURNSTILE_SECRET_KEY no está configurada en producción");
    this.name = "TurnstileConfigurationError";
  }
}

interface TurnstileVerifyResponse {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string,
): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ??
    (process.env.NODE_ENV !== "production"
      ? TURNSTILE_TEST_SECRET_KEY
      : undefined);
  // Las secret keys de prueba de Cloudflare (1x/2x/3x + ceros) aprueban o
  // rechazan sin verificar nada. En el despliegue productivo real de Vercel
  // equivalen a no tener protección: se trata como configuración faltante
  // (fail-closed). Previews y local siguen pudiendo usarlas.
  const isTestSecret = secret !== undefined && /^[123]x0{10,}/.test(secret);
  if (!secret || (isTestSecret && process.env.VERCEL_ENV === "production")) {
    console.error(
      "TURNSTILE_SECRET_KEY falta o es una key de prueba en producción; se rechaza la solicitud.",
    );
    throw new TurnstileConfigurationError();
  }
  if (typeof token !== "string" || token.length === 0) {
    return false;
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteIp !== "unknown" ? { remoteip: remoteIp } : {}),
      }),
      signal: AbortSignal.timeout(TURNSTILE_VERIFY_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("Turnstile siteverify respondió", response.status);
      return false;
    }

    const result = (await response.json()) as TurnstileVerifyResponse;
    if (!result.success) {
      console.warn("Turnstile rechazó el token:", result["error-codes"]);
      return false;
    }

    // Las secret keys de prueba devuelven un hostname de ejemplo y los
    // previews de Vercel viven en otros dominios: la validación aplica solo al
    // build de producción con una key real.
    const enforceHostname =
      !isTestSecret &&
      process.env.NODE_ENV === "production" &&
      process.env.VERCEL_ENV !== "preview";
    if (enforceHostname && !TURNSTILE_ALLOWED_HOSTNAMES.has(result.hostname ?? "")) {
      console.warn("Turnstile: hostname del token no permitido:", result.hostname);
      return false;
    }
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      console.error(
        `Turnstile siteverify no respondió en ${TURNSTILE_VERIFY_TIMEOUT_MS} ms; se rechaza la solicitud.`,
      );
    } else {
      console.error("Error verificando Turnstile:", error);
    }
    return false;
  }
}
