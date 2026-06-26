# Motion — Del Carpio 2.0
## Sistema de movimiento completo

---

## Filosofía

El movimiento en un sitio de laboratorio tiene un contrato con el usuario:
cada animación debe ayudar a entender o confirmar algo, no decorar.

Un cromatograma que aparece gradualmente mientras el usuario lee la sección de validación tiene propósito. Una partícula flotante de fondo no lo tiene.

**La prueba de motion:** Si quitas la animación y el contenido comunica lo mismo, la animación es decorativa y debe eliminarse.

---

## Los 3 niveles de motion

### Nivel 1 — Reveal (siempre activo)
Todos los bloques de contenido fuera del viewport inicial entran con fade + translate.
Este es el `<Reveal>` component actual — se mantiene exactamente como está.

```
opacity: 0 → 1
y: 18px → 0
duration: 550ms
easing: cubic-bezier(0.23, 1, 0.32, 1)
once: true
viewport margin: -80px
```

### Nivel 2 — Stagger (para el hero y listas)
Elementos dentro de un mismo contenedor que entran en secuencia.
El hero es el único lugar en la home que usa stagger en page load.
Las listas de items usan stagger con delay incremental (0.05s–0.07s por item).

### Nivel 3 — Scroll-driven (selectivo)
Animaciones que responden al scroll del usuario en tiempo real.
Actualmente: parallax de foto en el hero.
Futuro: potencial uso en secciones de proceso o datos.

---

## Curvas de easing

De los tokens de Emil Kowalski ya implementados:

| Variable | Curve | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | **Principal.** Todo lo que entra al viewport, todo lo que aparece |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Transiciones deliberadas: cambios de estado complejos, modales |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Paneles, drawers, expansiones verticales |

---

## Escala de duraciones

| Token | ms | Uso |
|---|---|---|
| instant | 0ms | Sin transición — cambios instantáneos (nunca en interacción del usuario) |
| micro | 120ms | Color de fondo en hover, opacidad de borde |
| quick | 200ms | Transformaciones de hover (translate, scale pequeño) |
| normal | 280-300ms | Transiciones de nav, cambios de estado de componente |
| slow | 500-550ms | Reveals de contenido (el Reveal actual) |
| deliberate | 650-700ms | Hero h1 y entrada de elementos de alta jerarquía |

---

## Especificaciones por tipo de interacción

### Hover de botón (primary)
```
background-color: --accent → --accent-hover
duration: 150ms
easing: ease-out
NO scale. NO translate. Solo color.
```

### Hover de link de navegación
```
color: --muted → --foreground (o white)
duration: 200ms
easing: ease-out
```

### Hover de fila de lista (ServiceMatrix, IndustryTabs)
```
background-color: transparent → --surface-muted
duration: 200ms
easing: ease-out
Adicionalmente: ArrowUpRight icon → translate-x(2px) translate-y(-2px)
```

### Hover de foto (LabPhotos, ServiceMatrix)
```
Image scale: 1.0 → 1.025
duration: 500ms
easing: --ease-out
Importante: aplicar overflow-hidden al contenedor para recortar el zoom
```

### Focus ring (accesibilidad)
```
box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)
duration: 150ms
easing: ease-out
Visible en TAB navigation y :focus-visible
```

### Active / pressed (botones)
```
scale: 0.97
duration: 120ms
easing: ease-in
```

---

## Hero — Stagger entrance

(Detallado en HERO_SPEC_V2.md — resumen aquí)

| Elemento | Delay | Duration | Y |
|---|---|---|---|
| Eyebrow | 0.15s | 0.50s | 10px |
| h1 | 0.28s | 0.65s | 16px |
| Subtext | 0.42s | 0.60s | 12px |
| CTAs | 0.55s | 0.50s | 10px |

Tipo: `initial/animate` (NO whileInView — el hero es visible en page load).

---

## Hero — Parallax de foto

```
useScroll({ target: heroRef, offset: ["start start", "end start"] })
scale: scrollYProgress → [0, 1] mapped to [1.08, 1.0]
Overflow: hidden en el section
Reduced motion: skip (scale fijo en 1.0)
```

---

## Navigation — Scroll transition

(Detallado en NAVIGATION_SPEC.md — resumen aquí)

```
isScrolled = window.scrollY >= 80
transition: background-color, border-color, color — 280ms --ease-out
NO height change. NO scale. Solo color.
```

---

## Microinteracciones a implementar (futuro)

Estas no están implementadas todavía. Son aspiraciones para una segunda pasada:

### 1. Contador de métricas animado
En TrustMetrics, cuando la sección entra al viewport, los valores numéricos (si son números) cuentan desde 0 hasta el valor final.
Duración: 800ms. Easing: ease-out. Solo si `useReducedMotion` es false.

### 2. Línea de progreso de página
Un elemento de 1-2px de altura en el borde superior del viewport (no el nav — encima de él) que crece de 0% a 100% con el scroll. Color: `--accent` (terracota).
CSS únicamente: `--scroll-pct` custom property actualizada por JS, `width: calc(var(--scroll-pct) * 100%)`.

### 3. Hover de tag técnico
Los tags `HPLC-MS/MS · GC-MS` en IndustryTabs al hover muestran un tooltip con el nombre completo del método.
Usando `motion/react` Tooltip o CSS `::after` bien diseñado.

### 4. Photo reveal con clip-path
En lugar del simple fade+translate del Reveal, las fotos de laboratorio podrían revelarse con un `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`. Duración: 800ms. Solo si `useReducedMotion` es false.

---

## Reglas absolutas de motion

1. **Nunca `transition: all`** — especificar exactamente qué propiedad transiciona
2. **Nunca animar `height` numérico** — usar `max-height` o `clip-path` para expansiones
3. **Siempre respetar `prefers-reduced-motion`** — el Reveal component ya lo hace; todos los nuevos elementos deben hacerlo
4. **GPU-composited first** — animar solo `transform` y `opacity` cuando sea posible. NO animar `top`, `left`, `width`, `height`, `margin`.
5. **No loop infinito sin propósito** — ninguna animación de loop infinito a menos que sea un indicador de estado activo
6. **Mobile: reducir** — en mobile, los delays del stagger se reducen a la mitad. La experiencia debe ser igualmente fluida, no más lenta.
