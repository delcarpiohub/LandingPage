# Colors — Del Carpio 2.0
## Sistema de color completo

---

## Filosofía del color

Del Carpio opera con tres colores de marca extraídos directamente del logo.
Son inusuales para el sector (los competidores usan azul corporativo + blanco).
Esa rareza es la ventaja — no hay otro company en instrumentación analítica latinoamericana con terracota como color de acción.

La paleta no se amplía por tendencia. Se expande únicamente cuando hay una necesidad semántica que no puede resolverse con los colores existentes.

---

## Los 4 colores base

| Nombre | Hex | Uso principal |
|---|---|---|
| **Terracota** | `#D5542B` | Color de acción único. Botones, CTAs, links, iconos activos. Sin excepción. |
| **Verde oliva** | `#53843A` | Color secundario de marca. Tags de sector, acentos de sección, etiquetas. |
| **Amarillo** | `#FBE369` | Color terciario. Únicamente sector Alimentos y acentos muy específicos. |
| **Ink** | `#101820` | Color de texto principal, fondos oscuros, encabezados. |

---

## Escala tonal — Terracota

Para superficies, hover states y variaciones de la acción principal.

| Token | Hex | Uso |
|---|---|---|
| `terracota-50` | `#FEF4F0` | Superficie muy suave, fondo de alertas de info |
| `terracota-100` | `#FDDDD3` | Hover de superficie, tag background |
| `terracota-200` | `#FAB9A7` | Border de elementos de acento |
| `terracota-300` | `#F5907A` | — |
| `terracota-400` | `#EB6845` | — |
| `terracota-500` | `#D5542B` | **Primary — uso estándar** |
| `terracota-600` | `#B8431E` | Hover de botón, active state — ya existe como `--accent-strong` |
| `terracota-700` | `#9A3419` | Estado presionado, sombra de botón |
| `terracota-800` | `#7D2B13` | Texto de error en fondo claro |
| `terracota-900` | `#62210F` | — |

---

## Escala tonal — Verde

Para tags de sector, indicadores de estado positivo y acentos editoriales.

| Token | Hex | Uso |
|---|---|---|
| `verde-50` | `#F0F5EC` | Superficie positiva muy suave |
| `verde-100` | `#DDEBD3` | Background de tag de éxito |
| `verde-200` | `#B8D4A7` | Border de tag verde |
| `verde-300` | `#8FBA7A` | — |
| `verde-400` | `#6BA152` | — |
| `verde-500` | `#53843A` | **Secondary — uso estándar** |
| `verde-600` | `#43702E` | Hover sobre texto verde |
| `verde-700` | `#345C23` | — |
| `verde-800` | `#29491B` | Texto sobre fondo verde |
| `verde-900` | `#1F3813` | — |

---

## Escala tonal — Ink (Neutros)

El sistema neutro tiene un matiz cálido con leve influencia del verde oliva de marca.
No es un gris puro. No es un azul-gris. Es un neutro templado.

| Token | Hex | Uso |
|---|---|---|
| `ink-50` | `#F5F7F6` | Fondo de secciones suaves |
| `ink-100` | `#E8EDED` | Superficie de cards en modo claro |
| `ink-200` | `#D0D9D6` | Bordes estándar |
| `ink-300` | `#ACB8B4` | Bordes fuertes |
| `ink-400` | `#7A8D88` | Texto muted (lectura secundaria) |
| `ink-500` | `#5B6870` | Texto de cuerpo de menor jerarquía — ya existe como `--muted` |
| `ink-600` | `#44535A` | — |
| `ink-700` | `#2F3D45` | — |
| `ink-800` | `#1C2830` | — |
| `ink-900` | `#101820` | **Foreground — texto principal y fondos oscuros** |
| `ink-950` | `#080D12` | Fondos muy oscuros (no usar en texto) |

---

## Tokens semánticos (CSS custom properties)

Estos son los tokens que el código debe usar. NUNCA usar los hexadecimales directos en componentes — siempre pasar por el token semántico.

```css
/* Superficies */
--background: #f7f9f8;       /* ink-50 cálido — fondo base de la página */
--foreground: #101820;        /* ink-900 — texto principal y secciones oscuras */
--surface-muted: #edf3f1;    /* ligeramente más cálido que ink-50 */
--panel: #e6eeeb;            /* para paneles y cards en zonas claras */

/* Texto */
--text-primary: #101820;     /* = foreground */
--text-secondary: #5b6870;   /* = muted */
--text-disabled: #acb8b4;    /* ink-300 */

/* Bordes */
--border: #d4dfdc;           /* ink-200 cálido */
--border-strong: #9fb1ac;    /* ink-300 */

/* Acción */
--accent: #D5542B;           /* terracota-500 */
--accent-hover: #B8431E;     /* terracota-600 = accent-strong */
--accent-foreground: #ffffff;

/* Easing (ya en globals.css) */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

---

## Reglas de uso

### Terracota — solo para acción
El terracota es el único color de acción. Si algo necesita llamar la atención del usuario para que haga clic, es terracota. Si es decorativo o informativo, no es terracota.

### Verde — solo para confirmación y sectores
Verde comunica: "esto está correcto", "este es el sector", "este dato es positivo".
No usar verde en botones de acción. No mezclar verde con terracota en el mismo componente.

### Amarillo — muy restringido
El amarillo solo aparece en:
1. El tag del sector Alimentos
2. Elementos gráficos decorativos muy específicos cuando se requiere el tercer color de marca

No usar amarillo en texto a menos que tenga fondo muy oscuro (contraste mínimo 4.5:1 WCAG AA).

### Ink oscuro como background
Cuando una sección usa `--foreground` como fondo (modo oscuro), el texto principal es `rgba(255,255,255,0.90)` o `text-white`. Los textos secundarios son `rgba(255,255,255,0.52)` a `rgba(255,255,255,0.68)`. Los bordes son `rgba(255,255,255,0.08)` a `rgba(255,255,255,0.14)`.

---

## Lo que nunca existe en este sistema

- Azul corporativo: NO
- Violeta/morado: NO (a menos que se apruebe para sector Farmacéutica)
- Gradientes de marca: NO (los gradientes son solo para overlays de fotografía)
- Sombras de color (drop shadows con color de marca): NO
- Neones, saturaciones extremas: NO
- Blanco puro `#FFFFFF` como fondo de página: usar `--background` (`#f7f9f8`) en su lugar

---

## Verificación de contraste WCAG 2.1 AA

| Combinación | Ratio | Estado |
|---|---|---|
| `#101820` sobre `#f7f9f8` | ~16:1 | AAA |
| `#5b6870` sobre `#f7f9f8` | ~5.5:1 | AA |
| `#ffffff` sobre `#D5542B` | ~3.8:1 | AA (solo texto grande ≥18pt) |
| `#ffffff` sobre `#101820` | ~16:1 | AAA |
| `#D5542B` sobre `#ffffff` | ~3.8:1 | Verificar en uso |

**Nota:** El terracota sobre blanco está en el límite WCAG AA para texto grande. Para texto pequeño sobre fondo claro, usar `--accent-strong` (`#B8431E`) en su lugar.
