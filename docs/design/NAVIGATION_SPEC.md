# Navigation — Especificación v2

**Objetivo de negocio:** El nav es el primer elemento que el usuario ve. En su estado actual proyecta "sitio genérico construido en plantilla" porque aparece siempre como un panel claro sobre el hero oscuro — una disonancia que dura los primeros segundos decisivos.

**Objetivo de experiencia:** El nav debe nacer del mismo encuadre visual que el hero (oscuro) y evolucionar transparentemente hacia su versión funcional (clara, legible sobre contenido blanco) a medida que el usuario scrollea.

---

## Comportamiento esperado

### Estado 1 — En el top (scrollY < 80px)

El nav se integra con el hero oscuro.

| Elemento | Valor |
|---|---|
| Fondo header | `bg-[var(--foreground)]` sin blur |
| Borde inferior | `border-white/10` |
| Logo mark (círculo DC) | `bg-white text-[var(--foreground)]` |
| Nombre compañía | `text-white/80` |
| Links de navegación | `text-white/55 hover:text-white` |
| CTA Button | variante "ghost-white": borde `border-white/30`, texto `text-white`, hover `bg-white text-[var(--foreground)]` |

### Estado 2 — Scrolleado (scrollY ≥ 80px)

El nav pasa a su modo funcional sobre contenido claro.

| Elemento | Valor |
|---|---|
| Fondo header | `bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-xl` |
| Borde inferior | `border-[var(--border)]` |
| Logo mark | `bg-[var(--foreground)] text-white` (estado original) |
| Nombre compañía | `text-[var(--foreground)]` |
| Links de navegación | `text-[var(--muted)] hover:text-[var(--foreground)]` |
| CTA Button | variante solid terracota (estado original) |

### Transición entre estados

```
transition-colors duration-[280ms] ease-[var(--ease-out)]
```

Aplica sobre todos los elementos que cambian de color. NO usar `transition-all`.

---

## Implementación requerida

### 1. Convertir a Client Component

Agregar `"use client"` al inicio de `navigation.tsx`.

### 2. Hook de scroll

```
const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY >= 80)
  window.addEventListener("scroll", onScroll, { passive: true })
  return () => window.removeEventListener("scroll", onScroll)
}, [])
```

### 3. Clases condicionales

Aplicar en el `<header>` y en cada elemento interno usando `isScrolled` como condición. Usar `cn()` o template literals para las clases condicionales.

### 4. Variante ghost-white para el Button

El componente `Button` en `src/components/ui/button.tsx` necesita una variante `"ghost-white"` para el estado del nav cuando está sobre el hero. Si agregar una variante al Button implicaría cambios estructurales, usar clases inline en el nav directamente con `asChild`.

---

## Restricciones

- NO cambiar la altura del nav (siempre `h-20`). Cambios de altura en scroll generan jarring visual en B2B.
- NO agregar animación de entrada al nav — aparece instantáneo (es parte del layout, no del contenido).
- Respetar `prefers-reduced-motion`: si está activo, aplicar las clases finales directamente sin transición.
- El móvil NO tiene hamburger menu todavía — ese es un spec separado. El nav móvil actual (sin links, solo logo + CTA) sí debe cambiar de fondo/color según el scroll.

---

## Verificación

Antes de considerar completo, confirmar:
- [ ] En el top del home: nav es oscuro, texto legible en blanco
- [ ] Al scrollear 80px: nav transiciona suavemente a claro
- [ ] En páginas internas (ej. `/servicios`): nav parte scrolleado (ya está a 80px+ desde el inicio) — debería aparecer claro directamente
- [ ] CTA button es legible en ambos estados
- [ ] Sin flickering al cargar (SSR/hydration)
