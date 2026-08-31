"use client";

import Script from "next/script";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface TurnstileRenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: TurnstileRenderOptions,
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export interface TurnstileWidgetHandle {
  reset: () => void;
}

// Widget de Cloudflare Turnstile para los formularios de contacto — ver
// src/lib/turnstile.ts para la verificación server-side y las variables de
// entorno requeridas. Sin NEXT_PUBLIC_TURNSTILE_SITE_KEY configurada no
// renderiza nada (el formulario sigue existiendo, pero el submit fallará en
// el servidor por diseño — ver route.ts, verificación fail-closed).
export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  {
    onVerify: (token: string) => void;
    onExpire?: () => void;
    className?: string;
    theme?: "light" | "dark" | "auto";
  }
>(function TurnstileWidget({ onVerify, onExpire, className, theme = "auto" }, ref) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  // Refs para no forzar a cada formulario a memoizar sus callbacks: el
  // widget se monta una sola vez (scriptReady no cambia después de true) y
  // siempre invoca la versión más reciente de onVerify/onExpire.
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current) {
        window.turnstile?.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current) return;
    if (!window.turnstile || widgetIdRef.current) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      callback: (token) => onVerifyRef.current(token),
      "expired-callback": () => onExpireRef.current?.(),
      "error-callback": () => onExpireRef.current?.(),
    });
    widgetIdRef.current = widgetId;

    return () => {
      window.turnstile?.remove(widgetId);
      widgetIdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- theme se fija al montar; cambiarla en caliente no está soportado por Turnstile sin recrear el widget.
  }, [scriptReady, siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className={className} />
    </>
  );
});
