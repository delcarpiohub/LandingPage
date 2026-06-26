# Navigation — Del Carpio 2.0
## Sistema de navegación completo

(Extiende NAVIGATION_SPEC.md con el sistema completo del sitio)

---

## Estructura de navegación global

```
Logo (DC) → /
                  
Links principales (desktop):
  Servicios    → /servicios
  Capacidades  → /#capacidades
  Industrias   → /#industrias
  Contacto     → /#contacto

CTA principal (siempre visible desktop + mobile):
  "Solicitar evaluación técnica" → /#contacto
```

---

## Comportamiento del nav principal (header sticky)

### Estado inicial (al cargar la página — scrollY < 80px)
Diseñado para convivir con el hero oscuro.
```
Header background:   bg-[var(--foreground)]
Header border:       border-white/10
Logo mark:           bg-white text-[var(--foreground)]
Company name:        text-white/80
Nav links:           text-white/55 hover:text-white
CTA button:          ghost-white (ver Components.md)
Transition:          transition-colors 280ms --ease-out
```

### Estado scrolleado (scrollY ≥ 80px)
El nav pasa a su modo funcional sobre contenido claro.
```
Header background:   bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-xl
Header border:       border-[var(--border)]
Logo mark:           bg-[var(--foreground)] text-white
Company name:        text-[var(--foreground)]
Nav links:           text-[var(--muted)] hover:text-[var(--foreground)]
CTA button:          solid terracota (default)
```

### Altura
`h-20` (80px) — fija en ambos estados. Sin cambio de altura al scrollear.

### Posición
`sticky top-0 z-40` — permanece en la parte superior del viewport durante toda la sesión.

### En páginas internas (/servicios, páginas de servicio)
La página empieza con contenido claro (no hero oscuro) → el nav debe comenzar en modo "scrolleado" directamente.
El hook de scroll lo maneja: si el usuario llega a una página interna, `scrollY` es 0 pero la sección es clara, no oscura.

**Solución:** El modo "oscuro" del nav solo debe activarse si:
1. `scrollY < 80` AND
2. La ruta es `/` (home)

En cualquier otra ruta, el nav siempre usa el estado "scrolleado" (claro).

---

## Implementación requerida

### Detección de ruta
```
import { usePathname } from "next/navigation"
const pathname = usePathname()
const isHome = pathname === "/"
const showDarkNav = isHome && !isScrolled
```

### Hook de scroll
```
const [isScrolled, setIsScrolled] = useState(false)
useEffect(() => {
  const handler = () => setIsScrolled(window.scrollY >= 80)
  handler() // correr al montar para páginas internas
  window.addEventListener("scroll", handler, { passive: true })
  return () => window.removeEventListener("scroll", handler)
}, [])
```

---

## Mobile navigation

### Estado actual (implementado)
- Solo el logo y el CTA son visibles en mobile
- Los 4 links de navegación están ocultos

### Gap de UX
Un usuario en mobile que quiere ir directamente a "Servicios" no tiene acceso a ese link.
El CTA lo lleva al formulario, pero no puede explorar el sitio.

### Solución propuesta (especificación para implementación futura)
Un hamburger menu simple para mobile. No es para esta iteración — es el siguiente milestone.

**Cuando se implemente:**
```
Trigger: ícono hamburger (3 líneas) en el extremo derecho del nav en mobile (< 1024px)
Panel: Full-screen overlay, fondo var(--foreground), texto blanco
Animación: slide-in desde derecha, 280ms --ease-drawer
Links: Los mismos que el desktop
Cierre: click en X, click fuera del panel, o navegar
```

### Por ahora: asegurar que mobile tenga el CTA visible
El botón "Solicitar evaluación técnica" en mobile debe ser siempre visible.
Actualmente está implementado como `hidden md:inline-flex` — está oculto en mobile < 768px.

**Corrección inmediata:** Cambiar a `hidden sm:inline-flex` para que aparezca desde 640px.
En pantallas muy pequeñas (<640px), el CTA puede estar disponible en el hero directamente.

---

## Indicador de sección activa (futuro)

Cuando el usuario está en una sección específica de la home (gracias al scroll), el link correspondiente en el nav debería tener un estado "activo" visual.

**Implementación:** Intersection Observer en las secciones con ID (`#capacidades`, `#industrias`, `#contacto`). Cuando una sección está en el viewport, su link en el nav recibe `text-foreground/text-white` en lugar de muted.

No implementar hasta que el mobile nav esté completo — el indicador activo en desktop sin mobile nav es UX inconsistente.

---

## Footer nav (complementario)

Ver FOOTER_SPEC.md. El footer contiene una navegación secundaria:
- Lista de servicios con links a `/servicios/[slug]`
- Lista de sectores con anchors a `/#industrias`

El footer nav no necesita comportamiento especial — es estático y siempre visible.

---

## SEO y accesibilidad del nav

| Requisito | Implementación |
|---|---|
| `<header>` semántico | Ya implementado |
| `<nav>` con `aria-label="Navegación principal"` | Agregar `aria-label` al `<nav>` |
| Skip link | Agregar `<a href="#main-content" className="sr-only focus:not-sr-only">Saltar al contenido</a>` antes del header |
| Logo alt | El logo mark tiene `aria-label="Inicio"` en el `<Link>` — correcto |
| CTA accesible | El botón tiene texto legible — correcto |
| Active page | Agregar `aria-current="page"` al link activo |

---

## Benchmark de navegación

| Empresa | Fortaleza | Debilidad |
|---|---|---|
| Linear.app | Nav mínimo, desaparece en scroll para dar espacio al contenido | Sin referencia de contacto rápido |
| Stripe | Mega-menu con previews de productos | Demasiado complejo para Del Carpio |
| Agilent | Navegación profunda con categorías | Confusa, requiere mucho tiempo |
| **Del Carpio objetivo** | 4 links + CTA, scroll-aware, clara en cualquier fondo | Sin mobile menu (próximo milestone) |
