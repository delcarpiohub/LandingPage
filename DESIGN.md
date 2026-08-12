---
name: Del Carpio — Sistema de Diseño
description: Sitio de marketing B2B para laboratorio de cromatografía analítica HPLC/GC en Chile
colors:
  accent: "#D5542B"
  accent-strong: "#B8431E"
  verde: "#53843A"
  amarillo: "#FBE369"
  ink: "#101820"
  ink-muted: "#5b6870"
  background: "#f7f9f8"
  surface: "#edf3f1"
  panel: "#e6eeeb"
  border: "#d4dfdc"
  border-strong: "#9fb1ac"
typography:
  display:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.16em"
rounded:
  field: "1rem"
  card: "1rem"
  container: "1.25rem"
  hero: "2rem"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.7)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "48px"
  input-field-focus:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "48px"
---

# Design System: Del Carpio Análisis y Asesorías

## 1. Overview

**Creative North Star: "El Informe Técnico Chileno"**

Este sistema de diseño se comporta como un informe de auditoría técnica bien ejecutado: sobrio, denso en información útil, sin ilustraciones decorativas. Cada elemento visual cumple una función — comunicar credibilidad, orientar la atención o facilitar el contacto. Lo que no aporta información, se elimina.

La paleta de tres colores del logo Del Carpio (terracota, verde oliva, amarillo) opera con economía radical: el terracota es la única voz de acción, el verde y el amarillo sirven para diferenciación de sectores, los neutros de tinta dominan la tipografía y los fondos. El fondo general tiene un levísimo tinte verde-gris (`#f7f9f8`) — no blanco puro — que evoca el papel técnico sin ser costoso visualmente.

La tipografía usa dos familias: Manrope para titulares y Inter para texto corrido, navegación, botones, formularios y etiquetas técnicas. La diferenciación ocurre por familia, peso, tamaño, interlineado y tracking: titulares compactos en Manrope, cuerpo legible en Inter con pesos regulares, y etiquetas técnicas en Inter uppercase con tracking amplio. La densidad es media-alta: no hay bloques de aire decorativo entre secciones — el espacio sirve para respirar entre bloques de contenido, no para parecer "premium".

**Key Characteristics:**
- Fotografía documental de laboratorio real como prueba, no como decoración
- Terracota `#D5542B` como único color de acción — su rareza es el punto
- Tipografía Manrope (display) + Inter (texto y UI): dos familias con roles claros, sin fragmentar el sistema
- Fondos neutros fríos-verdes, no blancos puros ni negros puros
- Componentes precisos con radio ajustado — sensación de instrumento técnico, no app de consumo
- Cero sombras en reposo — elevación por contraste de color y borde, no por efectos

## 2. Colors: La Paleta Documental

Tres colores de marca operan con máxima economía sobre una base de neutros fríos-verdes. El sistema rechaza explícitamente cualquier color fuera de esta paleta en elementos funcionales.

### Primary
- **Terracota Acción** (`#D5542B`): El único color permitido en elementos interactivos — botones CTA, links, borders en hover/focus, checkmarks, acentos de etiqueta. Nunca decorativo. Su frecuencia de aparición en pantalla es baja por diseño; cuando aparece, el ojo lo sigue.
- **Terracota Profundo** (`#B8431E`): Estado hover y active del terracota. No se usa en superficies en reposo.

### Secondary
- **Verde Oliva** (`#53843A`): Color secundario de marca. Usado en sectores de industria (Aguas, Ambiental). En el sitio aparece principalmente en el grid de sectores y como acento de clasificación.

### Tertiary
- **Amarillo Técnico** (`#FBE369`): Color terciario del logo. Usado exclusivamente para el sector Alimentos en el grid de sectores. Alta luminosidad — nunca usar sobre fondo claro sin contraste adecuado.

### Neutral
- **Tinta** (`#101820`): Foreground principal, fondos de sección oscura (ProcessTimeline, hero overlay). Casi negro con ligero tinte azul-marino frío.
- **Pizarra** (`#5b6870`): Texto secundario, labels, captions, placeholders. Nunca para texto corrido importante.
- **Blanco Técnico** (`#f7f9f8`): Fondo de página. Levísimo tinte verde-gris — no blanco puro. Evita la fatiga visual del blanco absoluto en contexto técnico.
- **Superficie** (`#edf3f1`): Fondo de badges, etiquetas, pills de sector. Segundo nivel de superficie.
- **Panel** (`#e6eeeb`): Tercer nivel. Fondos de tarjetas internas cuando se usan sobre superficie.
- **Borde** (`#d4dfdc`): Borde estándar de cards, inputs, divisores.
- **Borde Fuerte** (`#9fb1ac`): Borde de énfasis, separadores en contextos de menor contraste.

### Named Rules
**La Regla de la Voz Única.** El terracota `#D5542B` aparece en ≤15% de cualquier pantalla. Cada uso adicional diluye su capacidad de dirigir la atención. Si estás usando terracota decorativamente, lo estás usando mal.

**La Regla del Verde Prohibido.** El teal `#18b993` y cualquier verde diferente a `#53843A` están explícitamente prohibidos. Fue un error de una iteración anterior — cualquier aparición de teal es un bug, no una variante válida.

**La Regla de Fuera de Paleta.** Gradientes azul-morado, glassmorphism, neon, cualquier color no perteneciente a la paleta del logo + neutros: prohibidos. Si el nuevo color no tiene nombre en `tailwind.config.ts`, no existe en este sistema.

## 3. Typography: Jerarquía de Instrumento

**Display Font:** Manrope (pesos 650–700 para h1/h2, 600–650 para h3/h4)
**Body Font:** Inter (pesos 400–500)
**Label/Technical Font:** Inter (pesos 600–700, uppercase con tracking amplio)

**Character:** Manrope aporta una voz de titular geométrica-humanista, sobria y corporativa sin ser genérica; Inter es el estándar de legibilidad para texto de interfaz y datos técnicos. Dos familias con roles estrictamente separados — nunca tres o más. Se exige contraste real entre usos: display compacto para autoridad, body regular con buena línea para lectura, y etiquetas técnicas en uppercase con tracking para conservar el tono documental.

**Cambio de tipografía (2026-08-12):** Se reemplazó Montserrat (familia única) por Manrope (display/h1–h4) + Inter (body, UI, formularios, datos técnicos), por dirección de Claude Code como Director Creativo a partir de una referencia visual (bloque editorial Abbott: sans-serif neo-grotesca/humanista, alta x-height, contraste por peso y escala, sin adornos) y confirmación explícita del cliente para revertir la regla de familia única del 2026-07-03. La implementación usa `next/font/google` con ambas fuentes autohospedadas (variable, `display: swap`) y tokens `font-display` → Manrope, `font-sans`/`font-mono` → Inter. `font-mono` se mantiene como alias semántico para datos técnicos (con `font-variant-numeric: tabular-nums`), no carga una fuente monoespaciada real.

### Hierarchy
- **Display** (Manrope 650–700, clamp 2.75–6rem, line-height 0.98–1.06, tracking -0.035em): Títulos de hero y secciones de portada. El line-height cercano a 1 es intencional — compacidad de titular de informe, no de póster.
- **Headline** (Manrope 650–700, clamp 2–4.25rem, line-height 1.02–1.1, tracking -0.025em): Títulos de sección (h2). Escala fluid entre móvil y desktop.
- **Title** (Manrope 600–650, clamp 1.35–2rem, line-height 1.15, tracking -0.015em): Subtítulos de card, nombres de servicio, etiquetas de paso de proceso (h3).
- **Body** (Inter 400, 1rem–1.25rem/16–20px, line-height 1.55–1.65 en párrafo destacado, 1.6 en párrafo normal): Texto corrido de descripción. Máximo 58–65ch de ancho para legibilidad.
- **Nav/Botones** (Inter 500–600, 0.875rem–1rem, line-height 1): Sin mayúsculas completas salvo etiquetas cortas.
- **Label** (Inter 600, 0.72rem–0.8rem, uppercase, letter-spacing 0.08em–0.12em): Etiquetas de categoría, indicadores técnicos y datos breves.

### Named Rules
**La Regla de Dos Familias.** Toda la interfaz usa exactamente dos familias: Manrope para display/h1–h4, Inter para todo lo demás (body, UI, formularios, tablas, footer). `font-mono` queda como alias semántico apuntando a Inter con `tabular-nums`, no carga una fuente monoespaciada separada.

**La Regla de Jerarquía por Variante.** h1, h2, h3 y h4 usan Manrope peso 700 (regla global compartida en `globals.css`, no varía por nivel); body y UI usan Inter 400/500; etiquetas usan Inter 600/700 uppercase con tracking. No mezclar una tercera familia tipográfica.

## 4. Elevation: Plano por Defecto

Este sistema es completamente plano en reposo. No hay `box-shadow` en ningún componente en estado estático. La profundidad se comunica exclusivamente por:

1. **Contraste de fondo**: carta blanca sobre `--background` verdoso; sección oscura `--foreground` sobre fondo claro.
2. **Borde**: `1px solid var(--border)` en cards y campos. El borde define el contorno sin crear ilusión de elevación.
3. **Fotografía**: las imágenes de laboratorio crean profundidad real — el único lugar donde hay "volumen" en la página.

Los hover states en botones usan `active:scale-[0.97]` (ligera compresión táctil) y color shift — nunca sombra emergente.

### Named Rules
**La Regla Plana.** Si consideras agregar `box-shadow` a un componente en reposo, la respuesta es no. La elevación solo se justifica en overlays modales y tooltips (elementos flotantes sobre el documento). Una card con sombra en este sistema parece un error de importación de otro sistema de diseño.

## 5. Components

### Buttons

Píldoras perfectas (radio full). Acción primaria densa, sin padding excesivo.

- **Shape:** Pill completo (`border-radius: 9999px`), altura fija 48px
- **Primary:** Fondo terracota `#D5542B`, texto blanco, padding `0 20px`. La única superficie de color de acción permitida.
- **Hover:** Terracota profundo `#B8431E`. Transition `background-color 200ms ease-out`.
- **Active:** `scale(0.97)` — feedback táctil inmediato.
- **Focus-visible:** Outline `2px offset-2px` en terracota — accesibilidad WCAG 2.1 AA.
- **Secondary:** Fondo `rgba(255,255,255,0.7)`, borde `1px solid var(--border)`. Hover: borde tinta. Para acciones secundarias sobre fondos claros.
- **Ghost:** Sin fondo, sin borde. Hover: `background var(--surface-muted)`. Para links de texto que necesitan área clicable.

### Cards / Contenedores

- **Corner Style:** Variable por contexto — cards de servicio y sector: `1rem` (16px). Cards de fotos: `1.25rem` (20px). Contenedor hero de imagen: `2rem` (32px).
- **Background:** Blanco (`#ffffff`) sobre fondo de página para contraste. O `var(--foreground)` para cards oscuras.
- **Shadow Strategy:** Ninguna en reposo. Solo borde `1px solid var(--border)`.
- **Border Hover:** `border-color: var(--accent)` — las cards de servicio revelan el terracota en hover como único indicador de interactividad.
- **Internal Padding:** `px-6 py-5` (24px/20px) para cards de contenido. `px-5 py-4` (20px/16px) para cards de foto.

### Inputs / Campos

- **Style:** Borde `1px solid var(--border)`, fondo `var(--background)`, `border-radius: 1rem` (16px), altura mínima 48px, `padding: 0 16px`.
- **Focus:** `border-color: var(--accent)` + `box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)`. El glow en terracota semitransparente comunica focus sin ser agresivo.
- **Placeholder:** Color `var(--muted)` — `#5b6870`.
- **Error:** No definido todavía en el sistema. Cuando se implemente: border-red + mensaje inline, nunca solo por color.

### Navigation

- **Style:** `border-bottom: 1px solid var(--border)`, fondo con `backdrop-blur-md` y `bg-[var(--background)]/95`. Posición fixed, z-index alto.
- **Typography:** `text-sm font-medium` para links. Inter 500/600.
- **Active/Current:** Link de página activa con color terracota `var(--accent)`.
- **CTA en nav:** Botón primary completo (mismo sistema que el botón estándar).
- **Móvil:** No documentado todavía — pendiente diseño de menú hamburguesa.
- **Dropdowns "Productos" y "Servicios" (unificados 2026-08-12, `MotionNavigationMenu`/`highlight.tsx` retirados del header):** ambos usan el mismo componente `src/components/sections/nav-dropdown.tsx` (`NavDropdown`), controlado por un único estado central `activeDropdown: "productos" | "servicios" | null` en `navigation.tsx` — nunca hay dos paneles abiertos a la vez, y al cambiar de uno a otro primero se cierra el activo (`setActiveDropdown(null)`) y solo tras `DROPDOWN_TRANSITION_MS` (150ms, igual a la duración de la transición CSS) se abre el nuevo, evitando animaciones simultáneas entre paneles. La etiqueta principal ("Productos"/"Servicios") es siempre `<a href>` real y navegable; la flecha (`<button aria-expanded aria-controls>`, 44×44px) es el ÚNICO disparador del panel — **sin lógica de hover** (corregido 2026-08-12: se eliminó `onPointerEnter`/`onPointerLeave`, que cerraba el panel al mover el cursor desde el trigger hacia abajo por el hueco `mt-2`, ya que el contenedor no cubre esa zona al ser el panel `position:absolute`). Abre/cierra solo por click/tap, igual en desktop y móvil; una vez abierto permanece visible sin importar dónde esté el cursor. Escape cierra y devuelve foco, click fuera del conjunto trigger+panel cierra, navegar por un link del panel cierra antes de la navegación. Panel siempre presente en el DOM (toggle vía `visibility`/`opacity`, nunca `display:none`) para que los links sean crawleables sin JS. Variante `mobile` se integra como accordion inline en el drawer existente (sin fondo propio, hereda el fondo oscuro del drawer). Espaciado de la fila de items (Productos/Servicios/Proyectos/Nosotros/Contacto): `gap-[16px]` (antes `gap-[8px]`, se sentía apretado).
  - **Estilo del panel (blanco sólido, 2026-08-12):** fondo `#FFFFFF` sólido (sin transparencia ni backdrop-blur), texto principal `#1F2933`, texto secundario `#667085`, borde `#E5E7EB`, sombra `0 12px 30px rgba(15,23,42,0.10)`. Reemplaza el panel oscuro/grafito con blur usado antes. Sin CTA al final del panel ("Ver catálogo completo"/"Ver todos los servicios" fueron eliminados por pedido explícito — no se reemplazaron por ningún otro elemento).
  - **Animación:** opacidad + traslado vertical máx. 4px, 150ms ease-out (dentro del rango 120–160ms pedido), sin spring/bounce/escala/blur/rotación de panel, `motion-reduce:transition-none`. El pequeño ícono de flecha SÍ rota como indicador de estado (no es "la animación del dropdown", es una micro-affordance de accesibilidad estándar).
  - **Contenido:** Productos usa 6 categorías reales curadas de `mock-products.ts` en grid de 2 columnas, todas hacia `/productos` (no existe deep-link por categoría). Servicios usa los 4 servicios reales confirmados — ver más abajo — en lista de 1 columna con descripción, enlazando a anclas `/servicios#{id}`.
  - **Componentes retirados del header (no eliminados del repo):** `src/components/ui/motion-navigation-menu.tsx` y `src/components/ui/highlight.tsx` quedan sin uso en `navigation.tsx` — su física de resorte y slide horizontal entre items no podía cumplir el requisito de animación estrictamente simple (opacidad + 4px, sin bounce/escala) pedido para ambos dropdowns. Se mantienen en el repo por si se quieren reutilizar en otro contexto; no se borraron por no ser necesario para esta corrección.
  - **Taxonomía de servicios — inconsistencia detectada, no resuelta todavía:** `src/content/site.ts` (`services`) tiene 4 servicios distintos ("Implementación HPLC", "Métodos analíticos por GC", "Validación y trazabilidad", "Mantención y soporte técnico") que alimentan las páginas huérfanas `/servicios/[slug]` — huérfanas porque ningún link del sitio apunta a ellas. La página real `/servicios` (cards visibles) y el flujo completo `/contacto/[tipo]` (con `generateStaticParams`) coinciden en una taxonomía DISTINTA y consistente entre sí: **Mantención, Correctivo, Diagnóstico, Capacitación**. El dropdown de Servicios usa esta segunda taxonomía (la real/visible), no `site.ts`. Pendiente: decidir si `site.ts` y `/servicios/[slug]` se actualizan para coincidir, o se eliminan.

### Foto de Laboratorio (componente de firma)

El patrón de fotografía real es un componente distintivo del sistema.

- **Contenedor:** `overflow: hidden`, `border-radius: 1.25rem` (cards de sección) o `2rem` (hero).
- **Imagen:** `object-fit: cover`, `object-position: center`. Nunca `contain` — las fotos deben llenar el contenedor.
- **Hero overlay:** Gradiente horizontal `rgba(16,24,32,0.94) → rgba(16,24,32,0.16)` + gradiente vertical inferior para transición suave al fondo.
- **Hover en cards:** `scale(1.03)` sobre la imagen, `transition 500ms`. El contenedor mantiene su tamaño — solo la imagen escala.
- **Alt text:** Siempre descriptivo del equipo y contexto real (`"Técnica operando estación de análisis HPLC"`). Nunca genérico.

## 6. Do's and Don'ts

### Do:
- **Do** usar `#D5542B` exclusivamente para elementos interactivos (botones, links, hover borders, focus rings, checkmarks). Su aparición baja en pantalla es la fuente de su fuerza.
- **Do** usar fotografía real del laboratorio de Del Carpio para cualquier sección que necesite credibilidad visual. Las fotos están en `public/fotos/`.
- **Do** escribir etiquetas de categoría en Inter uppercase, `letter-spacing: 0.08em–0.12em`, peso 600/700. Es la firma tipográfica documental del sistema.
- **Do** mantener fondos en `var(--background)` (`#f7f9f8`) — no blanco puro `#ffffff` para superficies de página.
- **Do** usar terminología técnica real de HPLC/GC en el copy (columna, detector, cromatograma, IQ/OQ/PQ, validación de método). El visitante experto detecta el vocabulario genérico.
- **Do** respetar `prefers-reduced-motion`: todas las animaciones de entrada y hover deben desactivarse cuando el usuario lo solicita.
- **Do** mantener contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande — WCAG 2.1 AA.

### Don't:
- **Don't** usar gradientes azul-morado, glassmorphism, neon, ni cualquier color fuera de la paleta del logo + neutros. Si el color no existe en `tailwind.config.ts`, no existe en este sistema.
- **Don't** usar teal `#18b993` bajo ninguna circunstancia. Fue un error de iteración anterior y está explícitamente prohibido en `AGENTS.md`.
- **Don't** introducir Montserrat, Geologica, Geist, Azeret Mono, Open Sans ni ninguna tercera familia. La interfaz va en Manrope (display) + Inter (body/UI) exclusivamente.
- **Don't** agregar `box-shadow` a componentes en reposo. Este sistema es plano por defecto — una sombra en una card es un error de sistema, no una variante válida.
- **Don't** inventar frases como "soluciones integrales", "calidad garantizada" o "líderes del mercado" en el copy. La confianza se construye con terminología técnica precisa y evidencia fotográfica real.
- **Don't** usar las fotos de `Visual Visita` — son de una óptica, no de Del Carpio. Solo usar `Laboratorio/Hanon/` e `Instalaciones/AGQLabs/Definitivas/`.
- **Don't** usar motion decorativo sin propósito. Las animaciones `Reveal` (fade-in on scroll) son el único patrón de entrada permitido. Sin parallax, sin efectos de tipo máquina de escribir, sin loops.
- **Don't** agregar colores fuera de las paletas `primary` / `ink` / `sector` de `tailwind.config.ts` sin consenso entre Claude Code y Codex.
