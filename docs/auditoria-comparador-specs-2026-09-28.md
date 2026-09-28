# Auditoría del comparador de especificaciones — 2026-09-28

## Esquema y causa

`/productos/comparar` obtiene las selecciones del proveedor local y llama a
`getComparableSpecifications` en `src/lib/product-comparison.ts`. La fuente
es `mockProducts` en `src/lib/mock-products.ts`, no un CMS. Cada producto
puede declarar `detail.comparisonSpecs?: { key: string; label: string;
value: string; group?: string }[]`; las familias con variantes pueden usar
`detail.comparisonTiers[].specs` con la misma forma. El adaptador convierte
`detail.technicalParameters` en ese esquema cuando no hay `comparisonSpecs`.

Antes del cambio, el adaptador solo funcionaba para una lista cerrada de
slugs. Horizon y Flex tenían respectivamente 8 y 4 filas técnicas publicadas,
pero no figuraban en esa lista ni tenían `comparisonSpecs`; por eso la
comparación mostraba cero filas. La nueva conversión se aplica a cualquier
ficha con parámetros técnicos, conserva cada `label` y `value` tal como
aparecen en la ficha y asigna claves únicas si se repite una etiqueta.

Hay **112 entradas** en `mockProducts`: 108 fichas de `/productos/[slug]` y
cuatro páginas de familia Restek en rutas anidadas. El campo explícito
`comparisonSpecs` estaba presente en 6 entradas y ausente en 106. Contando
también los tiers y el adaptador, **76 eran comparables y 36 no** antes del
fix. De esas 36, **32 tenían `technicalParameters` publicados** y quedaron
resueltas por mapeo; las cuatro restantes son familias Restek sin tabla
técnica en su entrada de catálogo. Después del fix, **108 son comparables y
4 quedan pendientes**. Ningún valor técnico se creó o reescribió.

## Conteo por categoría y marca

| Categoría | Marca | Fichas | Comparables antes | Vacías antes | Comparables ahora | Vacías ahora |
|---|---|---:|---:|---:|---:|---:|
| Análisis elemental | Thermo Scientific | 6 | 6 | 0 | 6 | 0 |
| Espectrometría de masa | Thermo Scientific | 13 | 12 | 1 | 13 | 0 |
| Área farmacéutica | Thermo Scientific | 1 | 1 | 0 | 1 | 0 |
| Preparación de muestras | Thermo Scientific | 3 | 3 | 0 | 3 | 0 |
| Automatización | Thermo Scientific | 1 | 1 | 0 | 1 | 0 |
| Análisis de agua | Thermo Scientific | 1 | 1 | 0 | 1 | 0 |
| Cromatografía | Thermo Scientific | 6 | 3 | 3 | 6 | 0 |
| Análisis elemental | Hanon | 9 | 0 | 9 | 9 | 0 |
| Preparación de muestras | Hanon | 6 | 2 | 4 | 6 | 0 |
| Preparación de muestras | Milestone | 1 | 0 | 1 | 1 | 0 |
| Cromatografía | Restek | 3 | 0 | 3 | 0 | 3 |
| Preparación de muestras | Restek | 1 | 0 | 1 | 0 | 1 |
| Análisis de agua | Infitek | 3 | 0 | 3 | 3 | 0 |
| Equipamiento menor | Infitek | 7 | 2 | 5 | 7 | 0 |
| Preparación de muestras | Infitek | 1 | 0 | 1 | 1 | 0 |
| Equipamiento analítico | Infitek | 1 | 1 | 0 | 1 | 0 |
| Análisis elemental | Trace Elemental | 2 | 2 | 0 | 2 | 0 |
| Automatización | Trace Elemental | 2 | 2 | 0 | 2 | 0 |
| Fire Assay | Decent | 8 | 7 | 1 | 8 | 0 |
| Preparación de muestras | Decent | 10 | 10 | 0 | 10 | 0 |
| Purificadores de agua | Hyperpurex | 8 | 8 | 0 | 8 | 0 |
| Área farmacéutica | Distek | 6 | 6 | 0 | 6 | 0 |
| Bioprocesos | Distek | 4 | 4 | 0 | 4 | 0 |
| Análisis elemental | EuroVector | 1 | 1 | 0 | 1 | 0 |
| Preparación de muestras | ColdBlock | 3 | 3 | 0 | 3 | 0 |
| Automatización | Skalar | 2 | 1 | 1 | 2 | 0 |
| Análisis de agua | Skalar | 2 | 0 | 2 | 2 | 0 |
| Análisis elemental | Skalar | 1 | 0 | 1 | 1 | 0 |
| **Total** | | **112** | **76** | **36** | **108** | **4** |

## Fichas resueltas por mapeo de la tabla publicada

| Categoría / marca | Slugs |
|---|---|
| Espectrometría de masa / Thermo Scientific | `thermo-isq7610` |
| Cromatografía / Thermo Scientific | `thermo-trace-1600-series`, `thermo-vanquish-horizon`, `thermo-vanquish-flex` |
| Análisis elemental / Hanon | `hanon-k1160`, `hanon-k9860`, `hanon-k9840`, `hanon-sh420f`, `hanon-k1100f`, `hanon-sh520`, `hanon-s402`, `hanon-d50-d200`, `hanon-e500` |
| Preparación de muestras / Hanon | `hanon-sox606`, `hanon-sh220f`, `hanon-sox406`, `hanon-f800` |
| Preparación de muestras / Milestone | `milestone-ethos-up` |
| Análisis de agua / Infitek | `infitek-cod-analyzer`, `infitek-bep-m300f`, `infitek-ph-b100bd` |
| Equipamiento menor / Infitek | `infitek-mca-series`, `infitek-usc-m-series`, `infitek-don-h-series`, `infitek-fmh-series`, `infitek-fmh-pa-series` |
| Preparación de muestras / Infitek | `infitek-lyo60b-series` |
| Fire Assay / Decent | `decent-dosificador-automatico-litargirio` |
| Automatización / Skalar | `skalar-sp2000-series` |
| Análisis de agua / Skalar | `skalar-bluvision`, `skalar-formacs-series` |
| Análisis elemental / Skalar | `skalar-primacs-series` |

`thermo-dionex-autotrace-280` ya era comparable mediante el adaptador anterior;
su ficha tampoco tiene `comparisonSpecs` explícito. La nueva regla de
`AGENTS.md` exige ese campo desde el inicio para futuras fichas. En
`hanon-sh520`, la tabla publicada repite la etiqueta «Dimensiones» para SH520
y SH508; el adaptador asigna claves distintas para conservar ambos valores.

## Pendientes sin un valor único documentado en la entrada del catálogo

| Página de familia Restek | Motivo |
|---|---|
| `restek/columnas-capilares-silice-fundida` | La entrada local no contiene `technicalParameters`; varían las configuraciones de columna. |
| `restek/analytical-lc-columns` | La entrada local no contiene `technicalParameters`; fase y dimensiones dependen de la referencia. |
| `restek/viales-con-filtro` | La entrada local no contiene `technicalParameters` de una referencia única. |
| `restek/columnas-proteccion` | La entrada local no contiene `technicalParameters` de una referencia única. |

Estas páginas anidadas son familias para selección y cotización, no fichas de
un único modelo con una tabla técnica común. No se atribuyeron valores de
una variante a toda la familia. Hace falta seleccionar referencias concretas
y cotejar sus fuentes antes de poblar una comparación.

## Verificación

- La comparación Horizon/Flex muestra 2 equipos y 23 claves técnicas;
  Horizon aporta 16 valores y Flex 8. La fila «Presión máxima» presenta los
  valores publicados `1500 bar (22.000 psi) / 150 MPa` y `100 MPa`.
- La auditoría mecánica confirmó que cada `label` y `value` de las fichas
  mapeadas coincide exactamente con su `technicalParameters` y que sus
  claves son únicas por producto.
- `npx.cmd tsc --noEmit --incremental false` y `npm.cmd run build` completaron.
  El build local utilizó solo la clave pública de prueba de Turnstile en el
  proceso; no se cambiaron archivos de entorno.
