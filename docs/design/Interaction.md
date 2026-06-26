# Interaction — Del Carpio 2.0
## Estados interactivos y microinteracciones

---

## Filosofía de interacción

En un sitio de laboratorio, cada interacción debe sentirse como leer un instrumento:
la respuesta es inmediata, precisa y sin ruido visual.

No hay sorpresas. No hay transiciones complicadas que el usuario deba "esperar".
La interacción confirma, no distrae.

---

## Mapa de estados interactivos

### Botón Primary

| Estado | Visual |
|---|---|
| Default | Fondo `--accent`, texto blanco, pill |
| Hover | Fondo `--accent-hover`, sin scale, 150ms ease-out |
| Focus-visible | Ring: `0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)` |
| Active (click) | `scale(0.97)` 120ms ease-in |
| Disabled | `opacity-50 cursor-not-allowed pointer-events-none` |
| Loading | Texto "Enviando..." sin icono, cursor-default |

### Link de navegación

| Estado | Visual |
|---|---|
| Default (sobre claro) | `text-muted` |
| Default (sobre oscuro) | `text-white/55` |
| Hover (sobre claro) | `text-foreground` 200ms |
| Hover (sobre oscuro) | `text-white` 200ms |
| Current page | `text-foreground` / `text-white` permanente |
| Focus-visible | Outline `--accent` 2px offset 2px |

### Fila de lista (ServiceMatrix, IndustryTabs)

| Estado | Visual |
|---|---|
| Default | `bg-white` / `bg-transparent` |
| Hover | `bg-[var(--surface-muted)]` 200ms |
| Focus (fila como link) | Outline visible en teclado |

### Foto / Card con imagen

| Estado | Visual |
|---|---|
| Default | `scale(1.0)` |
| Hover | `scale(1.025)` 500ms `--ease-out` — recortado por `overflow-hidden` |

### Campo de formulario

| Estado | Visual |
|---|---|
| Default | Border `--border` |
| Hover | Border `--border-strong` 150ms |
| Focus | Border `--accent` + ring 4px 18% alpha 180ms |
| Error | Border `red-500` + mensaje de error debajo |
| Filled valid | Igual a default (no verde — no sobre-comunicar) |
| Disabled | Fondo `--surface-muted`, cursor not-allowed |

---

## Microinteracciones existentes

### ArrowUpRight en ServiceMatrix
```
Default: posición neutral
Hover del row padre: translate(-1px, 1px) — diagonal hacia arriba-derecha
Duration: 200ms --ease-out
```

### ::selection
```
Background: var(--accent) terracota
Color: var(--accent-foreground) blanco
```
Ya implementado en globals.css.

### Scroll behavior
```
html { scroll-behavior: smooth }
Excepto si prefers-reduced-motion, donde es auto
```
Ya implementado.

---

## Microinteracciones a agregar

Estas son las que Codex debe implementar. Ordenadas por impacto visual.

### 1. Indicador de progreso de lectura (ALTA prioridad)

Una línea de 2px de alto en el borde SUPERIOR del viewport que crece de 0 a 100% con el scroll.

```
Posición: fixed, top: 0, left: 0, z-index: 50
Ancho: dynamic — controlado por JS o scroll-driven animation CSS
Color: var(--accent) — terracota
Height: 2px
Background: var(--accent)
Transform origin: left
Animación: scroll-driven o useScroll de motion/react
```

**Por qué:** Los competidores de Del Carpio no tienen esto. En un sitio de lectura técnica densa, el indicador de progreso comunica "hay más contenido valioso — vale la pena scrollear". También es un elemento técnico que refuerza la identidad de precisión.

**Implementación con motion/react:**
```
useScroll() → scrollYProgress (0 a 1)
scaleX: scrollYProgress → [0, 1]
transformOrigin: "left"
Aplicado a un div fixed top-0 left-0 w-full h-[2px] bg-[var(--accent)]
```

**Reduced motion:** Si `prefers-reduced-motion` activo, ocultar completamente.

---

### 2. Nav: cambio de modo al hacer scroll (ALTA prioridad)

Ver NAVIGATION_SPEC.md. Resumen:
- 0-80px scroll: nav oscuro (integrado con el hero)
- 80px+: nav claro con blur

---

### 3. Hover state de sector con reveal de tag (MEDIA prioridad)

En IndustryTabs, cuando el usuario hace hover sobre una fila, el tag técnico (que actualmente es siempre visible en desktop) podría tener un emphasis adicional: el tag cambia de `text-white/36` a `text-accent` con transición.

```
Default: font-mono text-accent opacity-100 (ya es visible)
No hay cambio adicional necesario — el hover del row ya hace bg-surface-muted
```
Actualmente implementado correctamente — no modificar.

---

### 4. Focus management en formulario (MEDIA prioridad)

Cuando el usuario envía el formulario y hay errores, el foco debe moverse automáticamente al primer campo con error.

```
Después de handleSubmit con errores:
  const firstError = Object.keys(errors)[0]
  document.querySelector(`[name="${firstError}"]`)?.focus()
```

Esto es accesibilidad, no solo interacción. Es obligatorio para WCAG 2.1.

---

### 5. Tooltip técnico en tags de método (BAJA prioridad — futuro)

En el IndustryTabs, los tags `HPLC-MS/MS · GC-MS` al hover muestran un tooltip que explica brevemente qué es el método.

Ejemplo:
```
"HPLC-MS/MS" → tooltip: "Cromatografía líquida con detección por espectrometría de masas en tándem"
"GC-MS" → tooltip: "Cromatografía de gases con espectrometría de masas"
```

Implementación con motion/react + Radix UI Tooltip o CSS `[data-tooltip]::after`.
No implementar hasta que haya contenido real para los tooltips de los 12+ métodos listados.

---

## Lo que NO se implementa

- **Cursor personalizado:** Descartado. El cursor custom en B2B genera confusión y reduce accesibilidad. La ilusión de sofisticación no vale el costo de UX.
- **Animaciones de "partículas" o "moléculas flotando":** Prohibido. Ver Visual Principles.md.
- **Hover 3D/perspective tilt en cards:** Descartado para la primera versión. Puede evaluarse en páginas de proyectos.
- **Loading skeleton screens:** Sin lazy loading de contenido dinámico todavía. No necesario.
- **Scroll snapping:** Descartado. El scroll libre permite al usuario controlar su ritmo de lectura.

---

## Interacción en mobile

Mobile tiene sus propias consideraciones:

| Comportamiento desktop | Equivalente mobile |
|---|---|
| Hover states | No existen. El tap es el único estado. |
| Hover en foto (scale) | El tap activa el scale brevemente antes de navegar |
| Scroll parallax del hero | Reducido al 50% (scale 1.04 → 1.0 en lugar de 1.08 → 1.0) |
| Stagger del hero | Delays reducidos a la mitad (más rápido, menos espera) |
| Nav con scroll | Igual al desktop — responde a scrollY >= 80px |

Los tap targets deben ser mínimo 44×44px. Verificar en todos los links, botones y rows interactivos.
