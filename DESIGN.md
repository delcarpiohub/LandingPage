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
    fontFamily: "Geologica, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Geologica, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Geologica, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Azeret Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
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

La tipografía sigue la misma lógica de economía: Geologica para títulos y estructura jerárquica, Geist para texto corrido (neutro, legible, sin personalidad excesiva), Azeret Mono para etiquetas técnicas y datos. La densidad es media-alta: no hay bloques de aire decorativo entre secciones — el espacio sirve para respirar entre bloques de contenido, no para parecer "premium".

**Key Characteristics:**
- Fotografía documental de laboratorio real como prueba, no como decoración
- Terracota `#D5542B` como único color de acción — su rareza es el punto
- Tipografía Geologica con peso semibold en títulos: autoridad técnica sin gritar
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

**Display Font:** Geologica (sans técnica variable, pesos 400–700)
**Body Font:** Geist (sans-serif neutro, optimizado para pantalla)
**Label/Mono Font:** Azeret Mono (monoespaciado, lectura de datos técnicos)

**Character:** Geologica aporta una voz técnica, compacta y precisa sin caer en el tono editorial saturado de Fraunces ni en el aspecto SaaS genérico de Sora/Inter. Geist garantiza legibilidad en densidad alta. Azeret Mono en etiquetas da el tono documental que el North Star requiere: datos, no marketing.

**Cambio de tipografía (2026-06-26):** Se reemplazó Sora/Fraunces por Geologica. Los nombres sugeridos por el usuario (`neural`, `vision ethics`, `deep`, `bias`, `cognitive`, `edge`, `mobile`) no están disponibles como fuentes reales en `next/font/google`; Geologica se eligió por su carácter técnico y menos saturado. Azeret Mono reemplaza Geist Mono en etiquetas para reforzar la lectura instrumental.

### Hierarchy
- **Display** (semibold/600, clamp 2.5–4.5rem, line-height 0.98–1.04): Títulos de hero y secciones de portada. El line-height cercano a 1 es intencional — compacidad de titular de informe, no de póster.
- **Headline** (semibold/600, clamp 1.75–3.75rem, line-height 1.1): Títulos de sección (h2). Escala fluid entre móvil y desktop.
- **Title** (semibold/600, 1.25rem/20px, line-height 1.4): Subtítulos de card, nombres de servicio, etiquetas de paso de proceso.
- **Body** (regular/400, 1rem–1.125rem/16–18px, line-height 1.75): Texto corrido de descripción. Máximo 65–70ch de ancho para legibilidad. Nunca Geologica en body.
- **Label** (regular/400, 0.75rem/12px, uppercase, letter-spacing 0.16em, Azeret Mono): Etiquetas de categoría, indicadores técnicos y datos breves. El uppercase con tracking amplio crea la sensación documental del North Star.

### Named Rules
**La Regla del Mono.** Azeret Mono solo para etiquetas funcionales (categorías, numeración, indicadores técnicos). Nunca para párrafos, nunca para CTAs. Una sola línea de mono en una sección de cuerpo de texto es suficiente para establecer el tono técnico.

**La Regla del Título Solo Geologica.** h1, h2, h3, h4 van exclusivamente con Geologica. Geist (sin mono) solo para body y UI. Mezclar Geist con Geologica en un mismo título está prohibido.

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
- **Typography:** `text-sm font-medium` para links. Geist, no Geologica.
- **Active/Current:** Link de página activa con color terracota `var(--accent)`.
- **CTA en nav:** Botón primary completo (mismo sistema que el botón estándar).
- **Móvil:** No documentado todavía — pendiente diseño de menú hamburguesa.

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
- **Do** escribir etiquetas de categoría en Azeret Mono, uppercase, `letter-spacing: 0.16em`. Es la firma tipográfica documental del sistema.
- **Do** mantener fondos en `var(--background)` (`#f7f9f8`) — no blanco puro `#ffffff` para superficies de página.
- **Do** usar terminología técnica real de HPLC/GC en el copy (columna, detector, cromatograma, IQ/OQ/PQ, validación de método). El visitante experto detecta el vocabulario genérico.
- **Do** respetar `prefers-reduced-motion`: todas las animaciones de entrada y hover deben desactivarse cuando el usuario lo solicita.
- **Do** mantener contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande — WCAG 2.1 AA.

### Don't:
- **Don't** usar gradientes azul-morado, glassmorphism, neon, ni cualquier color fuera de la paleta del logo + neutros. Si el color no existe en `tailwind.config.ts`, no existe en este sistema.
- **Don't** usar teal `#18b993` bajo ninguna circunstancia. Fue un error de iteración anterior y está explícitamente prohibido en `AGENTS.md`.
- **Don't** usar Geologica en body/párrafos. Geologica es exclusivo para h1–h4 y display. El body va siempre en Geist.
- **Don't** agregar `box-shadow` a componentes en reposo. Este sistema es plano por defecto — una sombra en una card es un error de sistema, no una variante válida.
- **Don't** inventar frases como "soluciones integrales", "calidad garantizada" o "líderes del mercado" en el copy. La confianza se construye con terminología técnica precisa y evidencia fotográfica real.
- **Don't** usar las fotos de `Visual Visita` — son de una óptica, no de Del Carpio. Solo usar `Laboratorio/Hanon/` e `Instalaciones/AGQLabs/Definitivas/`.
- **Don't** usar motion decorativo sin propósito. Las animaciones `Reveal` (fade-in on scroll) son el único patrón de entrada permitido. Sin parallax, sin efectos de tipo máquina de escribir, sin loops.
- **Don't** agregar colores fuera de las paletas `primary` / `ink` / `sector` de `tailwind.config.ts` sin consenso entre Claude Code y Codex.
