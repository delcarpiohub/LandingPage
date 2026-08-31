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

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY no está configurada");
    return false;
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
    });

    if (!response.ok) {
      console.error("Turnstile siteverify respondió", response.status);
      return false;
    }

    const result = (await response.json()) as TurnstileVerifyResponse;
    if (!result.success) {
      console.warn("Turnstile rechazó el token:", result["error-codes"]);
    }
    return result.success === true;
  } catch (error) {
    console.error("Error verificando Turnstile:", error);
    return false;
  }
}
