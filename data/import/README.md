# Importador de catálogo — `data/import/`

Herramientas en `scripts/export-catalog.ts`, `scripts/diff-catalog.ts`,
`scripts/import-products.ts`. Corren con Node 24 directo (soporte nativo de
TypeScript, sin dependencias nuevas): `node scripts/<archivo>.ts`.

## Flujo

1. `node scripts/export-catalog.ts` → genera `catalogo-actual.csv` desde
   `src/lib/mock-products.ts` (fuente de verdad, nunca al revés).
2. Coloca tu export de WordPress en `menu-wordpress.csv` (columnas: `nombre,
   marca, categoria, url_wp`).
3. `node scripts/diff-catalog.ts` → genera `pendientes.csv` (no están en el
   sitio nuevo), `ya-existen.csv` (match exacto) y `dudosos.md` (match
   parcial, revisar a mano — nunca se auto-descarta por similitud de nombre).
4. Arma `productos.csv` a partir de `pendientes.csv` (ver columnas abajo).
5. `node scripts/import-products.ts` (dry-run, no toca nada) → revisa
   `reporte.md`.
6. Cuando el reporte se vea bien: `node scripts/import-products.ts --write`.
   Para actualizar una ficha existente en vez de omitirla por duplicado:
   `node scripts/import-products.ts --write --update <slug>`.

**Los archivos `menu-wordpress.csv`, `productos.csv` y los reportes
generados en este commit son datos de PRUEBA** (3 filas: una completa, una
que queda como borrador por incompleta, y un duplicado a propósito) — para
una corrida real, reemplaza `menu-wordpress.csv` y `productos.csv` por tus
datos y vuelve a correr los scripts.

## Columnas de `productos.csv`

| Columna | Requerido | Formato |
|---|---|---|
| `slug` | no (se deriva de marca+modelo si está vacío) | texto |
| `marca` | sí | texto libre |
| `categoria` | sí | debe ser una de `ProductCategory` en `mock-products.ts` |
| `nombre` | sí | texto |
| `modelo` | sí | texto |
| `resumen` | sí | texto (se usa como `description` y `subtitle`) |
| `features` | no | lista separada por `;` |
| `specs` | sí, salvo Restek | `Label=Valor;Label2=Valor2` (tipo_ficha=A) |
| `tipo_ficha` | no (default A) | `A` o `B` |
| `modelos_comparados` | solo si tipo_ficha=B | `id\|Etiqueta\|Label=Valor,Label2=Valor2; id2\|Etiqueta2\|...` (citar la celda si usa comas) |
| `imagen_url` | sí, ≥1 | lista separada por `,`; primera = imagen principal. Ruta `/productos/...` = ya existe en `public/`; URL externa = se intenta descargar solo si su dominio está en `allowlist-dominios.txt` |
| `cumplimiento` | no | `Titulo\|Texto;Titulo2\|Texto2` |
| `fuente_cumplimiento` | requerido si hay `cumplimiento` | texto (se agrega al final del texto de cada nota) |
| `aplicaciones` | no | `Titulo\|Texto;...` |
| `pdf_url`, `pdf_label`, `pdf_idioma` | no (pero si hay `cumplimiento` y no es Restek, se pide) | — |
| `tags` | no | lista separada por `;` |
| `aliases` | no | lista separada por `;`, para dedupe futuro |
| `familia` | no | informativo, no se guarda en el modelo de datos (no existe ese campo hoy) |

Celda vacía = campo ausente. El importador nunca inventa texto para
rellenar un campo vacío.

## `allowlist-dominios.txt`

Un dominio por línea (sin `https://`, ej. `assets.thermofisher.com`).
Vacío por defecto a propósito: nada se descarga hasta que el dueño del
catálogo apruebe los dominios fuente.

## Completitud y `status: "borrador"`

Si a una fila le faltan campos requeridos, se importa igual pero con
`status: "borrador"`: queda fuera de `/productos`, el buscador y el
sitemap (ver `publishedProducts` en `mock-products.ts`), pero sigue siendo
visible por URL directa (sin indexar, `robots: noindex`) para que alguien
la revise y complete antes de publicarla.

## Limitación conocida

Los PDFs de fichas YA EXISTENTES (anteriores a este importador) están
hardcodeados por slug en `src/app/productos/[slug]/page.tsx`, no en el
modelo de datos — una ficha nueva importada por este flujo usa en cambio el
campo genérico `detail.documents`, que si existe se agrega automáticamente
a los enlaces de descarga de la ficha. No fue necesario tocar el bloque
hardcodeado existente.
