# Auditoría integral del proyecto — 2026-07-10

> Auditoría de seguridad, código, performance, SEO, accesibilidad y diseño
> realizada por Claude Code con autorización directa del usuario para
> implementar correcciones. Cada hallazgo indica si fue **corregido en esta
> sesión** o si queda **pendiente** con su prioridad.

## Resumen ejecutivo

- El proyecto compila limpio, genera 27 páginas estáticas y tiene una base
  sólida (App Router, RSC por defecto, zod compartido entre form y API,
  sitemap/robots/metadata/JSON-LD presentes, `.env` nunca commiteado).
- Se corrigieron en esta sesión: inyección de HTML en el correo de contacto,
  ausencia de rate limiting y de límites de longitud, ausencia de security
  headers, 51 usos del terracota antiguo `#D5542B`, ~120 líneas de código
  muerto, 28 MB de assets sin uso, y todos los errores/warnings de ESLint.
- Quedan pendientes decisiones que requieren al usuario: el video de 106 MB,
  la unificación de las dos fuentes de datos de productos, y el drift de
  colores hex arbitrarios en ~14 archivos.

---

## 🔴 Crítico

### 1. Video de 106 MB en `public/` — PENDIENTE (requiere decisión)
`public/productos/hanon-sox606/video-relacionado.mp4` pesa **106,6 MB**.
- **Riesgo:** supera el límite práctico de archivo por deployment en Vercel y
  de caché de su edge network; el deploy puede fallar o el video servirse sin
  caché. Para el visitante son >100 MB de descarga en una pestaña de producto.
- **Solución propuesta:** recomprimir a H.264/AV1 1080p (~8–15 MB) con
  `ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac out.mp4`,
  o subirlo a Vercel Blob / YouTube unlisted y embeberlo. No se tocó el
  archivo porque re-encodearlo altera material provisto por el usuario.

### 2. Inyección de HTML en el correo de contacto — CORREGIDO
`src/app/api/contacto/route.ts` interpolaba `nombre`, `empresa`, `mensaje`,
etc. directamente en el HTML del email sin escapar.
- **Riesgo:** un atacante podía inyectar markup arbitrario (phishing con
  apariencia legítima, links falsos) en el buzón de ventas, el punto de
  conversión principal del negocio.
- **Fix aplicado:** helper `escapeHtml()` aplicado a todo valor de usuario
  antes de interpolarse.

## 🟠 Alto

### 3. Endpoint de contacto sin rate limiting ni límites de tamaño — CORREGIDO
- **Riesgo:** abuso del endpoint → agotamiento de la cuota de Resend, spam
  masivo al buzón de ventas, payloads de MBs en `mensaje`.
- **Fix aplicado:** rate limit best-effort en memoria (5 solicitudes / 10 min
  por IP, responde 429), límites `.max()` en todos los campos del schema zod
  compartido (form + API), manejo de JSON malformado (400 en vez de excepción
  no controlada) y verificación temprana de `RESEND_API_KEY`.
- **Nota:** para protección robusta en producción usar el WAF de Vercel
  (regla de rate limit sobre `/api/contacto`) — el mapa en memoria se pierde
  entre instancias frías.

### 4. Sin security headers HTTP — CORREGIDO
- **Fix aplicado:** `next.config.ts` ahora envía `X-Content-Type-Options`,
  `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy` y
  `Strict-Transport-Security` en todas las rutas.
- **Pendiente consciente:** no se definió **CSP** porque la navegación carga
  el widget de Google Translate (script externo + iframes). Si ese widget se
  reemplaza por i18n propio, agregar CSP estricta (está anotado en el config).

### 5. Violación de regla de marca: terracota antiguo `#D5542B` — CORREGIDO
51 ocurrencias en 9 archivos (footer, navegación, métricas, formularios…)
usaban el terracota pre-2026-07-02. AGENTS.md exige `#D6532B` sin excepción.
- **Fix aplicado:** reemplazo global `#D5542B` → `#D6532B` (visualmente
  imperceptible, aprobado por Marketing según AGENTS.md).

### 6. Vulnerabilidad transitiva (npm audit) — PENDIENTE (upstream)
`next@16.2.9` embebe `postcss < 8.5.10` (GHSA-qx2v-qp2m-jg93, moderada, XSS
en output de stringify). No existe versión estable de Next que la resuelva
aún (`npm audit fix --force` propone un downgrade absurdo a next@9).
- **Acción:** monitorear y subir a la primera 16.2.x/16.3.x que lo parche.
  El vector real es bajo (el CSS del proyecto no proviene de input de usuario).

## 🟡 Medio

### 7. Dos fuentes de datos de producto paralelas — PENDIENTE (refactor)
`src/lib/mock-products.ts` (`Product`, 30 KB) y `src/content/productos.ts`
(`Producto`, 5,6 KB) duplican nombre, resumen y fotos de los mismos equipos.
El log de sesiones muestra que cada alta de producto obliga a tocar ambos y
ya produjo desincronizaciones (caso K9860 con copy del K1160).
- **Solución propuesta:** una sola fuente en `src/content/productos.ts` con
  el tipo completo, y derivar de ahí catálogo, fichas, sitemap y metadata.
  Es un refactor de ~5 archivos; debe hacerse como fase dedicada con review.

### 8. Datos de UI incrustados en componentes gigantes — PENDIENTE
`product-detail-tabs.tsx` (655 líneas, client component) contiene specs
técnicas, consumibles y textos de 5 productos hardcodeados. Todo ese
contenido viaja en el bundle JS del cliente.
- **Solución propuesta:** mover specs/consumibles a la fuente de datos del
  punto 7 y dejar el componente cliente solo con la lógica de tabs.

### 9. Drift de paleta: hex arbitrarios fuera de tokens — PENDIENTE
~14 archivos usan hex literales (`#101820`, `#1c2a38`, `#252525`, `#D4DFDC`,
`#f5f5f5`…) en vez de los tokens de `tailwind.config.ts`. El footer sigue
sobre `#101820` (el ink antiguo, reemplazado por `#4A5560` el 2026-07-02).
- **Nota:** ya estaba señalado en el log (2026-07-08). No se cambió porque
  altera visualmente secciones que el usuario ya validó en pantalla; requiere
  decisión de dirección de arte + pasada dedicada.

### 10. Warning `MODULE_TYPELESS_PACKAGE_JSON` en cada build — PENDIENTE
`package.json` no declara `"type": "module"` y `tailwind.config.ts` se
reparsea como ESM en cada build (overhead menor).
- **Solución propuesta:** agregar `"type": "module"` y verificar que
  `postcss.config.mjs` / scripts sigan funcionando. Cambio pequeño pero puede
  romper tooling — hacerlo aislado con build de verificación.

### 11. Google Translate widget en la navegación — OBSERVACIÓN
Carga un script de terceros en todas las páginas, impide CSP estricta, y la
traducción automática de contenido técnico (IQ/OQ/PQ, Kjeldahl) puede dañar
la credibilidad ante evaluadores técnicos. Considerar i18n estático propio
(next-intl) para en/pt si los mercados lo justifican.

## 🟢 Bajo

- **Código muerto eliminado en esta sesión:** `PRODUCT_CONSUMIBLES` + variable
  `consumables` (~120 líneas duplicadas de datos ya renderizados por los tabs),
  función `ValuePropItem` sin uso, 7 imports sin uso, CSS muerto
  (`.animate-infinite-scroll`, `.animate-float`), `remotePatterns` de Unsplash
  sin consumidores, y los 2 `any` explícitos tipados con `Icon` de Phosphor.
- **Assets eliminados (28,1 MB):** 12 imágenes `image_5_*` de rediseños
  revertidos de `/nosotros`, 4 panorámicas obsoletas de `tour/seccion1/`
  (el tour usa `tour/recorrido/`), 5 SVGs del template de Next, 2 fotos de
  laboratorio sin referencia y 3 imágenes de producto huérfanas.
- **`nano banana pro` (span sr-only) eliminado** de `/nosotros`: era una
  "clave de validación" de una plantilla externa que los lectores de pantalla
  anunciaban; ninguna directiva real del proyecto la exige.
- **Clase inválida corregida:** `text-ink-secondary` → `text-ink-muted` en
  `/nosotros` (el token no existía; el párrafo quedaba sin color).
- **Borde lateral terracota del brochure (side-tab):** flag de patrón "AI-like"
  del hook de diseño, pero fue pedido explícito del usuario (log 2026-07-08).
  Se mantiene como decisión confirmada.
- **Fotos pesadas restantes:** `hero-laboratorio.jpg` (10,3 MB),
  `instalacion-hplc-operador.jpg` (8,6 MB), `hero-bg.mp4` (8,4 MB) sí se usan;
  `next/image` genera derivados optimizados, pero conviene recomprimir los
  originales a ≤2 MB para acelerar builds y el LCP del hero.

---

## Checklist de seguridad (estado)

| Ítem | Estado |
|---|---|
| Secrets en el repo / historial git | ✅ Limpio (`.env*` ignorado, nunca commiteado, sin patrones de API key en tracked files) |
| Validación y sanitización de inputs | ✅ zod + escape HTML + límites de longitud (esta sesión) |
| XSS | ✅ React escapa por defecto; JSON-LD escapa `<`; email escapado (esta sesión) |
| CSRF | ✅ Riesgo bajo: endpoint sin sesión/cookies, solo envía correo; rate-limited |
| SQL Injection | N/A — sin base de datos |
| Headers HTTP | ✅ Agregados (esta sesión); CSP pendiente por Google Translate |
| Rate limiting | ⚠️ Best-effort en memoria; usar WAF de Vercel en producción |
| Cookies | N/A — el sitio no setea cookies propias (revisar cuando exista consent banner real, hay página de política de cookies) |
| Dependencias vulnerables | ⚠️ 2 moderadas transitivas vía next (upstream, sin fix estable) |
| npm scripts peligrosos | ✅ Solo dev/build/start/lint/analyze |
| Uploads | N/A — no hay uploads |
| SSH/firewall/root/certificados | N/A hoy (sin servidor propio); cubierto por checklist de infraestructura abajo |

## Checklist de infraestructura para producción (Vercel recomendado)

1. **Hosting:** Vercel (el stack es Next 16 + API route; Fluid Compute cubre
   el endpoint de contacto sin config extra). Docker/PM2/Nginx solo si se
   exige on-premise — en ese caso: Node 24 LTS, `next start` tras Nginx con
   TLS (Let's Encrypt + renovación automática certbot), PM2 en cluster mode.
2. **DNS:** apuntar `delcarpio.cl` y `www` a Vercel; redirección apex→www
   (o inversa) en la config del proyecto. HTTPS y certificados los gestiona
   Vercel automáticamente.
3. **Resend:** verificar dominio `delcarpio.cl` (SPF + DKIM + DMARC) y cambiar
   `from`/`to` en `route.ts` (hoy usa `onboarding@resend.dev` →
   `cvillagran@delcarpio.cl`, marcado como temporal). `RESEND_API_KEY` va en
   Vercel env vars (Production), nunca en el repo.
4. **WAF/Firewall:** activar reglas de rate limit sobre `/api/contacto` y
   bot protection (Vercel BotID) si llega spam.
5. **CI/CD:** hoy no existe. Mínimo: GitHub Actions con `npm ci && npm run
   lint && npm run build` en cada PR; deploy automático por Vercel Git.
6. **Monitoring/logs:** Vercel Analytics + Speed Insights (Core Web Vitals
   reales), alertas de error en el endpoint de contacto (Vercel logs).
7. **Backups:** el sitio es estático + repo git; el único estado externo es
   Resend. Asegurar que el repo tenga remote (GitHub) actualizado — hoy el
   trabajo vive solo en la máquina local.
8. **Health check:** `/` ya sirve como health; si se usa infra propia,
   agregar `/api/health` trivial.

## Verificación de esta sesión

- `npm run build` ✅ (27/27 páginas, compilación limpia)
- `npx eslint src` ✅ (0 errores, 0 warnings — antes: 2 errores, 12 warnings)
- TypeScript ✅ (fase de tipos del build sin errores)
- Assets eliminados verificados sin referencias vivas en `src/`, `docs/` y
  markdown (las únicas menciones estaban en el log histórico append-only).
