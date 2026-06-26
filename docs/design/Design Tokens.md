# Design Tokens — Del Carpio 2.0
## La fuente única de verdad para valores de diseño

Todos los componentes, páginas y estilos deben usar estos tokens.
Nunca usar valores hardcodeados en Tailwind cuando existe un token equivalente.

---

## Tokens de color (CSS custom properties)

```css
/* ─── Superficies ─────────────────────────────────── */
--background:      #f7f9f8;   /* Fondo base de página */
--foreground:      #101820;   /* Texto principal + fondos oscuros */
--surface-muted:   #edf3f1;   /* Cards, hover states en secciones claras */
--panel:           #e6eeeb;   /* Paneles secundarios */

/* ─── Texto ──────────────────────────────────────── */
--text-primary:    #101820;   /* = foreground */
--text-secondary:  #5b6870;   /* = muted — para cuerpo de menor jerarquía */
--text-disabled:   #acb8b4;   /* Para placeholders, estados deshabilitados */

/* ─── Bordes ─────────────────────────────────────── */
--border:          #d4dfdc;   /* Bordes estándar */
--border-strong:   #9fb1ac;   /* Bordes con más peso (separadores importantes) */

/* ─── Acción (terracota) ─────────────────────────── */
--accent:          #D5542B;   /* Color de acción — ÚNICO color para botones, CTAs */
--accent-hover:    #B8431E;   /* = accent-strong — hover y active */
--accent-foreground: #ffffff; /* Texto sobre el color de acción */

/* ─── Alias de legibilidad ───────────────────────── */
--muted:           #5b6870;   /* = text-secondary */
```

---

## Tokens de tipografía

```css
/* Familias */
--font-display: var(--font-geologica);   /* Geologica — headings */
--font-sans:    var(--font-geist);       /* Geist — body, UI */
--font-mono:    var(--font-geist-mono);  /* Azeret Mono — labels, eyebrows */

/* Pesos */
--weight-regular:   400;
--weight-medium:    500;
--weight-semibold:  600;
--weight-bold:      700;

/* Escalas de tamaño (para referencia — usar directamente en Tailwind) */
--text-eyebrow:  0.625rem;   /* 10px — Azeret Mono uppercase */
--text-label:    0.75rem;    /* 12px — Azeret Mono */
--text-caption:  0.8125rem;  /* 13px */
--text-sm:       0.875rem;   /* 14px */
--text-base:     1rem;       /* 16px */
--text-lg:       1.125rem;   /* 18px */
--text-xl:       1.25rem;    /* 20px */
--text-2xl:      1.5rem;     /* 24px */
--text-3xl:      1.875rem;   /* 30px */
--text-4xl:      2.25rem;    /* 36px */
--text-5xl:      3rem;       /* 48px */
--text-6xl:      3.75rem;    /* 60px */
```

---

## Tokens de espaciado

Basado en una escala de 4px. El espaciado sigue el sistema de Tailwind, pero estos tokens definen los usos semánticos clave.

```css
/* ─── Espaciado de sección ───────────────────────── */
--section-py-compact:   4rem;    /* 64px  — Secciones de menor jerarquía */
--section-py-standard:  6rem;    /* 96px  — Secciones principales (py-24 en Tailwind) */
--section-py-generous:  8rem;    /* 128px — Secciones de entrada (hero bottom, primera sección) */
--section-py-hero:      3.5rem;  /* 56px  — Padding bottom del hero (pb-14) */

/* ─── Espaciado de contenido ─────────────────────── */
--content-gap-tight:    1rem;    /* 16px  — Entre elementos muy relacionados */
--content-gap:          1.5rem;  /* 24px  — Gap estándar entre elementos */
--content-gap-loose:    3rem;    /* 48px  — Entre bloques de contenido */

/* ─── Padding de componente ─────────────────────── */
--card-px:       1.5rem;    /* 24px */
--card-py:       1.75rem;   /* 28px */
--card-radius:   1.25rem;   /* 20px — border-radius de cards principales */
--card-radius-sm: 0.75rem;  /* 12px — border-radius de elements pequeños */
--card-radius-lg: 1.5rem;   /* 24px — cards de formulario, modales */
```

---

## Tokens de motion

```css
/* ─── Curvas de easing (Emil Kowalski) ──────────── */
--ease-out:     cubic-bezier(0.23, 1, 0.32, 1);   /* Todo lo que sale/aparece */
--ease-in-out:  cubic-bezier(0.77, 0, 0.175, 1);  /* Transiciones deliberadas */
--ease-drawer:  cubic-bezier(0.32, 0.72, 0, 1);   /* Paneles, drawers, modales */

/* ─── Duraciones ────────────────────────────────── */
--duration-instant:    0ms;     /* Sin transición percibida */
--duration-micro:      120ms;   /* Hover de color, focus rings */
--duration-quick:      200ms;   /* Hover de transformación, activos */
--duration-normal:     300ms;   /* Transiciones de UI estándar */
--duration-slow:       500ms;   /* Reveals de contenido */
--duration-deliberate: 700ms;   /* Hero h1, transiciones de página */

/* ─── Desplazamiento en reveals ─────────────────── */
--reveal-y:      18px;   /* Y inicial para Reveal component */
--reveal-y-hero: 14px;   /* Y inicial para stagger del hero (más sutil) */
```

---

## Tokens de sombra

```css
/* Sombras — mínimas, solo cuando aportan jerarquía Z */
--shadow-sm:  0 1px 2px 0 rgba(16, 24, 32, 0.04);
--shadow:     0 2px 8px 0 rgba(16, 24, 32, 0.07), 0 1px 2px 0 rgba(16, 24, 32, 0.04);
--shadow-md:  0 4px 16px 0 rgba(16, 24, 32, 0.10), 0 2px 4px 0 rgba(16, 24, 32, 0.05);
--shadow-lg:  0 8px 32px 0 rgba(16, 24, 32, 0.12), 0 4px 8px 0 rgba(16, 24, 32, 0.06);

/* Focus ring — accesibilidad */
--ring-accent: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent);
```

---

## Tokens de overlay de fotografía

Para gradientes sobre imágenes. No inventar valores fuera de estos.

```css
/* Overlay oscuro para texto sobre foto en hero */
--overlay-hero-left:    linear-gradient(100deg, rgba(16,24,32,0.96) 0%, rgba(16,24,32,0.72) 48%, rgba(16,24,32,0.08) 100%);

/* Overlay oscuro para texto sobre foto en cards */
--overlay-card-bottom:  linear-gradient(0deg, rgba(16,24,32,0.88) 0%, rgba(16,24,32,0.08) 58%);

/* Overlay para fotos con texto encima en modo más suave */
--overlay-soft:         linear-gradient(0deg, rgba(16,24,32,0.72) 0%, rgba(16,24,32,0.0) 50%);
```

---

## Tokens de grid

```css
--max-width:      80rem;    /* 1280px — max-w-7xl */
--page-px:        1.25rem;  /* 20px — padding horizontal de página (px-5) */
--page-px-md:     2rem;     /* 32px — en tablet */
--page-px-lg:     2.5rem;   /* 40px — en desktop (ya incluido en max-w + mx-auto) */
```

---

## Cómo usar estos tokens en código

**Correcto:** `className="text-[var(--accent)]"` o `style={{ color: 'var(--accent)' }}`
**Correcto:** `className="border-[var(--border)]"` 
**Incorrecto:** `className="text-[#D5542B]"` — hardcodear el hex en el componente
**Incorrecto:** `className="text-orange-600"` — usar paletas de Tailwind ajenas al sistema

Los únicos valores que pueden ir hardcodeados son:
- `opacity` values como `rgba(255,255,255,0.52)` (sobre fondos oscuros)
- Valores que no tienen token equivalente semántico y son únicos a ese componente
