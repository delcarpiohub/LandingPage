# Grid — Del Carpio 2.0
## Sistema de grillas y layout

---

## El principio base

Del Carpio NO usa una grilla de 12 columnas visibles.
Usa una grilla de contenedor + proporciones editoriales.

La grilla de 12 columnas es útil para calcular proporciones, pero el layout final usa `fr` units y proporciones irracionales — no múltiplos exactos de 1/12.

Por qué: una grilla de 12 columnas bien aplicada produce layouts simétricos y predecibles. Del Carpio necesita asimetría editorial.

---

## El contenedor

```
max-width: 80rem (1280px) = max-w-7xl
margin: 0 auto
padding-x: 1.25rem (20px) en mobile = px-5
padding-x: se mantiene en tablet y desktop (el max-w se encarga del margen)
```

Todo el contenido de la página va dentro de este contenedor.
Excepción: los fondos de sección (color, foto) pueden ser full-width `w-full`.
El contenedor siempre está dentro del fondo, nunca al revés.

---

## Sistema de grillas por sección

### Grid 2-col con offset editorial
```
lg:grid-cols-[0.44fr_0.56fr]   — TrustMetrics (claim corto + lista)
lg:grid-cols-[0.82fr_1.18fr]   — ComplianceBand (statement + cards)
lg:grid-cols-[0.9fr_1.1fr]     — ContactForm (título + formulario)
lg:grid-cols-[0.68fr_1.32fr]   — LabPhotos (sticky + galería)
lg:grid-cols-[0.95fr_1.35fr]   — ServiceMatrix (foto + lista)
lg:grid-cols-[2fr_1fr_1fr]     — Footer (brand + servicios + sectores)
```

### Grid 2-col dentro de una col
```
lg:grid-cols-[0.62fr_0.38fr]   — ComplianceBand interior (card larga + card terracota)
lg:grid-cols-[1.15fr_0.85fr]   — LabPhotos galería (foto grande + foto pequeña)
```

### Grid indexal (tabla editorial)
```
grid-cols-[2.5rem_1fr]                        — IndustryTabs mobile
md:grid-cols-[2.5rem_0.26fr_0.6fr_0.22fr]   — IndustryTabs desktop
```

---

## Reglas de layout

### 1. Nunca grid simétrico en secciones principales
Si dos columnas tienen el mismo ancho (`1fr 1fr`), la sección se rechaza.
La asimetría comunica jerarquía. Si el contenido de ambas columnas tiene el mismo peso visual, revisar si realmente necesitan estar side-by-side.

### 2. Mobile siempre stacked
Todos los grids de 2+ columnas pasan a stacked (col única) en mobile.
El orden visual en mobile debe tener lógica narrativa: el elemento más importante primero.

### 3. Gap en grids
Entre columnas principales: `gap-12` o `gap-16` (espaciado generoso).
Entre items de una lista dentro de una columna: `gap-4` o divide-y.
No usar el mismo gap para todo.

### 4. Alineación
Los grids 2-col usan `lg:items-start` o `lg:items-center` según el contenido.
`items-start`: cuando una columna es mucho más larga que la otra
`items-center`: cuando las columnas tienen altura similar

### 5. El sticky pattern
Para secciones donde una columna scrollea y la otra se queda fija:
```
Columna izquierda: lg:sticky lg:top-28
Columna derecha: scroll normal
```
Solo usar en LabPhotos y páginas de detalle con mucho contenido.

---

## Breakpoints

| Breakpoint | Valor | Activación de grid |
|---|---|---|
| default | <640px | Single column |
| sm | 640px | CTAs en row, grid de 2 en formulario |
| md | 768px | Columnas internas de tabla (IndustryTabs) |
| lg | 1024px | Todos los grids principales de 2 columnas |
| xl | 1280px | `max-w-7xl` empieza a tener márgenes |
| 2xl | 1536px | Sin cambios de layout — solo el contenedor limita |

---

## Anchos máximos de texto

El contenido de texto (no las grillas) tiene sus propios max-widths para legibilidad:

| Elemento | Max-width | Tailwind aproximado |
|---|---|---|
| h2 principal | 48rem | `max-w-3xl` |
| h2 compacto | 32rem | `max-w-xl` |
| Subtexto de sección | 36rem | `max-w-xl` o `max-w-2xl` |
| Cuerpo de párrafo | 42rem | entre `max-w-xl` y `max-w-2xl` |
| Eyebrow | Sin restricción | — |
| CTA block | Ancho del contenedor | Sin max-w |

---

## Densidad de información por sección

No todas las secciones tienen el mismo "peso" de información.
El ritmo de la página se consigue alternando densidad:

| Sección | Densidad | Por qué |
|---|---|---|
| Hero | Baja | Solo el claim principal y 2 CTAs |
| TrustMetrics | Media-alta | 4 métricas + claim editorial |
| ServiceMatrix | Media | 4 servicios + 1 foto |
| IndustryTabs | Alta | 6 filas con datos técnicos |
| ComplianceBand | Media | 3 items + 1 tarjeta de advertencia |
| LabPhotos | Baja-media | 2 fotos + texto ancla |
| ContactForm | Alta | Formulario de múltiples campos |
| Footer | Media | 3 columnas de links + datos |

La alternancia densidad baja → media-alta → media → alta → media → baja → alta → media
crea el ritmo que el usuario siente como "página bien diseñada" sin poder explicar por qué.
