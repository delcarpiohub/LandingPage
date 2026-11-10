# Ocultar el Tour Virtual del Laboratorio detrás de un interruptor

Fecha: 2026-11-10
Autor: Claude Code (Director Creativo)
Estado: listo para que Codex implemente.
Rama: `exp/import-productos` (no crear rama nueva). Commit(s) local(es) al
terminar — **NO push, NO merge** (pedido explícito del usuario para esta
tarea).

## 0. Objetivo y alcance

Sacar el Tour Virtual 360° de la navegación pública del sitio **sin borrar
código, componentes, imágenes ni la librería de panorama**. Nota: el pedido
original decía "no borres react-pannellum", pero esa librería no existe en
este proyecto — la que realmente se usa es `marzipano`
(`src/components/tour/panorama-viewer.tsx:7`, dependencia en
`package.json`). Es `marzipano` la que no se debe tocar ni desinstalar.

Un solo interruptor controla todo: variable de entorno
`NEXT_PUBLIC_SHOW_TOUR`. Ausente o distinta de `"true"` → **apagado**
(comportamiento por defecto). Con el interruptor apagado:

- `/contacto/tour-laboratorio` responde `notFound()` (404 real, el mismo
  `src/app/not-found.tsx` del resto del sitio).
- No existe ningún link visible al tour en ninguna parte del sitio
  (navegación desktop/mobile, tarjeta de `/contacto`).
- La ruta no aparece en `sitemap.xml`.
- El buscador global no la devuelve como resultado.

Con `NEXT_PUBLIC_SHOW_TOUR=true`, el sitio vuelve exactamente al
comportamiento actual, sin ningún cambio visual ni funcional.

## 1. Interruptor centralizado

Nuevo archivo `src/lib/feature-flags.ts`:

```ts
export const SHOW_TOUR = process.env.NEXT_PUBLIC_SHOW_TOUR === "true";
```

Una sola fuente de verdad: todo el código de las secciones 2.x importa
`SHOW_TOUR` desde aquí. No leer `process.env.NEXT_PUBLIC_SHOW_TOUR`
directamente en ningún otro archivo — si el día de mañana cambia el nombre
de la env var, solo este archivo debe tocarse.

Agregar a `.env.example` (mismo estilo de comentario que las secciones
existentes — Resend, Turnstile, Upstash):

```
# --- Tour virtual 360° del laboratorio ---
# "true" publica /contacto/tour-laboratorio y sus enlaces de nuevo.
# Ausente o cualquier otro valor lo mantiene oculto (404) — ver
# src/lib/feature-flags.ts.
NEXT_PUBLIC_SHOW_TOUR=
```

## 2. Cambios archivo por archivo

### 2.1 `src/app/contacto/tour-laboratorio/page.tsx`

Cambiar el `export const metadata` estático por `generateMetadata()` y
gatear el render:

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TourLaboratorioClient } from "@/components/tour/tour-laboratorio-client";
import { SHOW_TOUR } from "@/lib/feature-flags";

export function generateMetadata(): Metadata {
  if (!SHOW_TOUR) {
    return {
      title: "Página no encontrada | Del Carpio Análisis y Asesorías",
      robots: { index: false },
    };
  }
  return {
    title: "Tour Virtual Laboratorio de Analisis | Del Carpio",
    description:
      "Recorrido virtual 360 del Laboratorio de Analisis Del Carpio, con escenas reales del area analitica e instrumentacion.",
    alternates: { canonical: "/contacto/tour-laboratorio" },
  };
}

export default function TourLaboratorioPage() {
  if (!SHOW_TOUR) notFound();
  return <TourLaboratorioClient />;
}
```

El título/`robots` del caso apagado son **textualmente** los mismos que usa
`src/app/not-found.tsx` — no inventar copy nuevo para el 404.

**No tocar** `tour-laboratorio-client.tsx`, `panorama-viewer.tsx`,
`tour-scene-navigation.tsx`, `tour-scene-gallery.tsx`,
`src/content/tour-scenes.ts` ni ningún asset de imágenes del tour. El
interruptor vive solo en el `page.tsx` de la ruta.

### 2.2 `src/components/sections/navigation.tsx`

Dos bloques CTA "Tour virtual" hardcodeados a `/contacto/tour-laboratorio`:

- **Desktop** (~línea 797-814): el `<div className="notranslate flex items-center gap-3">`
  que envuelve los dos `<Link>` (botón de texto + botón flecha).
- **Mobile** (~línea 1083-1099): el `<div className="mt-4 flex gap-[6px] border-t border-white/10 pt-4">`
  que envuelve los dos `<Link>` del menú móvil.

Importar `SHOW_TOUR` y envolver **cada bloque completo** (el `<div>`
contenedor entero, no solo los `<Link>`) en `{SHOW_TOUR && ( ... )}`.

Decisión de layout, para no dejarla ambigua:

- Desktop: el contenedor padre ya usa `justify-end gap-4` — al desaparecer
  el bloque, el buscador y los iconos sociales se acomodan solos, sin hueco
  que rellenar. No agregar lógica de flex nueva.
- Mobile: al ocultar el `<div>` completo (incluyendo su `border-t`), no debe
  quedar un borde separador colgando sin contenido debajo. Confirmar
  visualmente con `SHOW_TOUR` apagado que el selector de idioma (elemento
  anterior) queda con su espaciado inferior normal del menú, sin ajuste
  adicional de CSS.

No tocar las constantes `ctaText` / `ctaAria` (líneas ~83-93): quedan sin
uso mientras `SHOW_TOUR` es `false`, pero no son dead code — se reactivan
solas cuando el flag vuelve a `true`.

### 2.3 `src/app/contacto/contact-corporate-client.tsx`

La tarjeta "Agendar Tour de Laboratorio" (`id: "tour"`, líneas 10-21 del
array `inquiryOptions`) debe excluirse cuando `SHOW_TOUR` es `false`:

```tsx
import { SHOW_TOUR } from "@/lib/feature-flags";
// ...
const inquiryOptions = [
  ...(SHOW_TOUR
    ? [
        {
          id: "tour",
          title: "Agendar Tour de Laboratorio",
          icon: Microscope,
          path: "/contacto/tour-laboratorio",
          items: [
            "Conocer nuestras instalaciones y capacidades técnicas",
            "Revisar equipamiento analítico real",
            "Coordinar una visita con especialistas",
          ],
        },
      ]
    : []),
  { id: "ventas", /* ...igual que hoy... */ },
  { id: "proyectos", /* ...igual que hoy... */ },
  { id: "otras", /* ...igual que hoy... */ },
];
```

Decisión de layout: el grid usa `sm:grid-cols-2 lg:grid-cols-4`. Con 3
tarjetas visibles en vez de 4 no debe quedar un hueco vacío ni una tarjeta
sola en una fila nueva — pasar a 3 columnas iguales cuando hay 3 ítems:

```tsx
className={cn(
  "mx-auto grid w-full max-w-[1240px] gap-4 lg:gap-6 lg:px-5 relative z-30",
  inquiryOptions.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4",
)}
```

(`cn` está en `@/lib/utils`, ya usado en otros componentes del proyecto —
importarlo si este archivo no lo tiene todavía).

### 2.4 `src/app/sitemap.ts`

La entrada de `/contacto/tour-laboratorio` (líneas 30-34 de
`staticRoutes`) se excluye cuando `SHOW_TOUR` es `false`:

```ts
import { SHOW_TOUR } from "@/lib/feature-flags";
// ...
const staticRoutes: MetadataRoute.Sitemap = [
  // ...resto igual...
  ...(SHOW_TOUR
    ? [
        {
          url: `${baseUrl}/contacto/tour-laboratorio`,
          changeFrequency: "yearly" as const,
          priority: 0.6,
        },
      ]
    : []),
];
```

### 2.5 `src/content/search-index.ts`

El array `resourceItems` (líneas 161-183) es contenido curado a mano —
páginas institucionales que no vienen de `mock-products.ts` ni de
`site.ts` (ver comentario en el propio archivo y la regla de mantenimiento
del buscador en `AGENTS.md`). La entrada `recurso-tour-virtual` (líneas
176-182) se excluye con el mismo patrón:

```ts
import { SHOW_TOUR } from "@/lib/feature-flags";
// ...
const resourceItems: SearchItem[] = [
  { id: "recurso-nosotros", /* ...igual... */ },
  { id: "recurso-proyectos", /* ...igual... */ },
  ...(SHOW_TOUR
    ? [
        {
          id: "recurso-tour-virtual",
          title: "Tour virtual de laboratorio",
          description: "Recorrido virtual por las instalaciones de Del Carpio.",
          type: "recurso" as const,
          href: "/contacto/tour-laboratorio",
        },
      ]
    : []),
];
```

### 2.6 `public/robots.txt` — sin cambios

Hoy solo tiene `Allow: /` global y no menciona el tour; es un archivo
estático, no un route handler. **No convertirlo a `src/app/robots.ts`**
para esta tarea — el 404 real (sección 2.1) ya evita que se indexe, y
migrar a un robots dinámico es un cambio de arquitectura fuera de alcance.
Si más adelante se quiere reforzar con un `Disallow` dinámico, debe ser un
pedido explícito aparte.

### 2.7 No tocar — ya es inalcanzable por routing, no por el flag

`src/app/contacto/[tipo]/contact-client-page.tsx` tiene una entrada
`contactTypes["tour-laboratorio"]` (línea 78), pero
`src/app/contacto/[tipo]/page.tsx` no incluye `tour-laboratorio` en
`generateStaticParams`, y la ruta estática `/contacto/tour-laboratorio`
siempre gana sobre la dinámica `/contacto/[tipo]` para ese mismo segmento.
Esa entrada ya es inalcanzable hoy, independiente del flag. No es parte de
esta tarea — no la borres ni la "arregles" sin que se pida explícitamente.

## 3. Menciones de copy — listadas, no reescribir

Búsqueda realizada sobre "tour virtual", "tour 360", "recorre el
laboratorio", "recorrido virtual", "recorrido 360" (case-insensitive) en
`src/`. Resultado completo:

| Archivo | Texto | Acción |
|---|---|---|
| `tour-laboratorio-client.tsx:71` | "A través de este tour virtual..." | Vive dentro de la página que pasa a 404 — no es enlace roto, no tocar. |
| `tour-scene-navigation.tsx:17` | `aria-label="Puntos del recorrido virtual"` | Idem, dentro de la página oculta. |
| `panorama-viewer.tsx:200` | "Cargando recorrido 360°" | Idem. |
| `navigation.tsx:84-92` (`ctaText`/`ctaAria`) | "Tour virtual" / "Ir al Tour Virtual" | Strings usados solo si `SHOW_TOUR` es `true` (sección 2.2) — no reescribir. |
| `search-index.ts:178-179` | título/descripción del recurso | Se oculta por completo (sección 2.5), no hace falta reescribir. |

Si al implementar aparece alguna mención adicional que **sí sea un enlace
roto** (un `href`/`Link` a `/contacto/tour-laboratorio` no cubierto arriba),
aplicar el mismo patrón `{SHOW_TOUR && ...}` sin pedir permiso. Si en
cambio es copy visible que no es un enlace, **detenerse y reportarlo** en
vez de reescribirlo — así lo pidió el usuario explícitamente.

## 4. Verificación obligatoria antes de comitear

Con `NEXT_PUBLIC_SHOW_TOUR` sin definir (o `"false"`):

- `npx tsc --noEmit` — sin nuevos errores respecto a la línea base.
- `npm run lint` — igual que línea base.
- `npm run build` — build completo exitoso. Revisar el output de `next
  build` para confirmar que `/contacto/tour-laboratorio` sigue
  generándose como ruta (ahora 404 en runtime, eso es lo esperado).
- Manual en `npm run dev`: home, nav desktop y mobile, `/contacto` y el
  buscador global no muestran ningún enlace ni resultado del tour.
  Visitar directamente `/contacto/tour-laboratorio` debe mostrar la
  página 404 del sitio.

Luego, temporalmente con `NEXT_PUBLIC_SHOW_TOUR=true` en `.env.local` (no
commitear ese valor):

- `npm run build` debe seguir pasando.
- El sitio debe verse exactamente igual al comportamiento actual (tour
  visible en todas partes, sin cambios).
- Quitar el valor de `.env.local` al terminar la prueba.

## 5. Commits

Un commit por archivo tocado (o uno solo si son inseparables, según la
"REGLA DE COMMITS OBLIGATORIOS" de `AGENTS.md`). Mensaje sugerido para el
commit principal: `feat: oculta tour virtual 360 detras de
NEXT_PUBLIC_SHOW_TOUR`. **NO hacer push. NO hacer merge.** Al terminar,
reportar al usuario el diff resumido (`git diff --stat` del rango
tocado) y el hash del último commit.
