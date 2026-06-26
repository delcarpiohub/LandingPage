# Spacing — Del Carpio 2.0
## Sistema de espaciado y ritmo vertical

---

## La filosofía del espaciado en Del Carpio

Un sitio de instrumentación analítica tiene mucha información técnica.
El peligro es la saturación. El error opuesto es el vacío decorativo.
El objetivo: densidad selectiva — cada elemento tiene el espacio que necesita, ni más ni menos.

El espacio no es "relleno entre elementos". Es el separador entre IDEAS.
Si dos elementos están muy juntos, el usuario los lee como una unidad.
Si están separados con precisión, el usuario entiende que son ideas distintas.

---

## La escala base

Múltiplos de 4px. Tailwind por defecto — no reinventar.

| Valor | px | Tailwind | Uso semántico |
|---|---|---|---|
| 0.5 | 2px | `p-0.5` | Microalineación |
| 1 | 4px | `p-1` | Separación mínima entre texto y icono |
| 2 | 8px | `p-2` | Gap entre items muy relacionados |
| 3 | 12px | `p-3` | Padding interior de tags |
| 4 | 16px | `p-4` | Gap estándar entre campos de formulario |
| 5 | 20px | `p-5` | Padding horizontal de página (px estándar) |
| 6 | 24px | `p-6` | Padding interior de cards |
| 7 | 28px | `p-7` | Padding interior de cards grandes |
| 8 | 32px | `p-8` | Gap entre sección y elemento principal |
| 10 | 40px | `p-10` | Separación entre bloques |
| 12 | 48px | `p-12` | — |
| 14 | 56px | `p-14` | — |
| 16 | 64px | `p-16` | Sección compacta (py vertical mínimo) |
| 20 | 80px | `p-20` | Sección estándar en mobile |
| 24 | 96px | `p-24` | Sección estándar en desktop |
| 28 | 112px | `p-28` | — |
| 32 | 128px | `p-32` | Sección generosa |

---

## Espaciado vertical de secciones (py)

Este es el ritmo más importante del sitio. Cada sección tiene un py que define su "peso" en la página.

| Tipo de sección | Mobile py | Desktop py | Ejemplo |
|---|---|---|---|
| **Compacta** | `py-16` (64px) | `py-16` (64px) | Footer, nav |
| **Estándar** | `py-16` (64px) | `py-24` (96px) | Todas las secciones de contenido actuales |
| **Generosa** | `py-20` (80px) | `py-32` (128px) | Primera sección tras el hero |
| **Hero** | `pb-12 pt-28` | `pb-16 pt-32` | El hero tiene pt para compensar el nav sticky |

**Regla del ritmo:** No usar `py-24` en todas las secciones. Es el default, pero al menos 2 secciones deben variar para crear ritmo:
- TrustMetrics puede ser más compacta si va inmediatamente después del hero: `py-16`
- La primera sección principal (ServiceMatrix) puede ser más generosa: `py-28` o `py-32`

---

## Espaciado interno de secciones

Distancias entre elementos dentro de una sección.

| Elemento | Valor | Descripción |
|---|---|---|
| Eyebrow → h2 | `mt-4` (16px) | El eyebrow está cerca del h2, son una unidad |
| h2 → subtexto | `mt-6` (24px) | El subtexto es apoyo del h2 |
| Header → cuerpo | `mt-14` (56px) | El header de sección se separa del contenido |
| Entre cards en grid | `gap-4` (16px) | Cards relacionadas |
| Entre items de lista | Divide-y con py | No usar margin-bottom, usar dividers |
| Foto + caption | `border-t py-5` | El caption es parte de la figura |
| Bloque de texto → CTA | `mt-10` (40px) | El CTA tiene espacio generoso |
| CTA primary → CTA secondary | `gap-4` (16px) en flex | Los CTAs son una unidad |

---

## Espaciado horizontal

| Elemento | Valor |
|---|---|
| Contenedor de página | `max-w-7xl mx-auto px-5` |
| Padding lateral en mobile | `px-5` (20px) |
| Padding lateral en tablet | Hereda del contenedor |
| Padding lateral en desktop | Hereda del contenedor |
| Cards: padding interno | `px-6 py-7` (24px / 28px) |
| Cards grandes: padding | `px-7 py-8` |
| Filas de lista: padding | `px-6 py-6` |

---

## Proporciones de columnas

Del Carpio usa grids asimétricos — ninguna sección tiene columnas iguales.

| Layout | Proporción | Uso |
|---|---|---|
| Claim + Datos | `[0.44fr_0.56fr]` | TrustMetrics |
| Foto + Lista | `[0.95fr_1.35fr]` | ServiceMatrix |
| Nav + Index | `[2.5rem_0.26fr_0.6fr_0.22fr]` | IndustryTabs |
| Statement + Cards | `[0.82fr_1.18fr]` | ComplianceBand |
| Sticky + Fotos | `[0.68fr_1.32fr]` | LabPhotos |
| Texto + Formulario | `[0.9fr_1.1fr]` | ContactForm |
| Brand + Links | `[2fr_1fr_1fr]` | Footer (spec) |

**Regla:** Si un grid tiene exactamente `1fr 1fr`, se rechaza. Todo grid 2-col debe tener proporción editorial.

---

## Espaciado responsivo

| Breakpoint | Comportamiento |
|---|---|
| `sm` (640px) | Los CTAs pasan de stacked a flex-row |
| `md` (768px) | Los h2 aumentan a la escala siguiente del clamp |
| `lg` (1024px) | Los grids de 2 columnas se activan |
| `xl` (1280px) | El `max-w-7xl` empieza a centrar el contenido |
| `2xl` y más | Aumentar `py` en algunas secciones si el diseño lo permite |

---

## Anti-patterns de espaciado

| Error | Corrección |
|---|---|
| Todas las secciones con `py-24` | Variar: algunas py-16, alguna py-32 |
| Cards con padding inconsistente | Siempre `px-6 py-7` o `px-7 py-8` — no mezclar |
| `mb-*` en el último elemento de una sección | Usar `py` en el contenedor, no margins finales |
| `gap-6` entre columnas asimétrico | Usar `gap-4` (pequeño) o `gap-12` (grande) — no valores medios |
| h2 pegado al inicio de la sección | Siempre el `pt` del contenedor crea el espacio |
