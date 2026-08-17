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
- **Dropdowns "Productos" y "Servicios" (unificados 2026-08-12, `MotionNavigationMenu`/`highlight.tsx` retirados del header):** ambos usan el mismo componente `src/components/sections/nav-dropdown.tsx` (`NavDropdown`), controlado por un único estado central `activeDropdown: "productos" | "servicios" | null` en `navigation.tsx` — nunca hay dos paneles abiertos a la vez, y al cambiar de uno a otro primero se cierra el activo (`setActiveDropdown(null)`) y solo tras `DROPDOWN_TRANSITION_MS` (150ms, igual a la duración de la transición CSS) se abre el nuevo, evitando animaciones simultáneas entre paneles. La etiqueta principal ("Productos"/"Servicios") es siempre `<a href>` real y navegable; la flecha (`<button aria-expanded aria-controls>`, 44×44px) es el ÚNICO disparador del panel — **sin lógica de hover** (corregido 2026-08-12: se eliminó `onPointerEnter`/`onPointerLeave`, que cerraba el panel al mover el cursor desde el trigger hacia abajo por el hueco `mt-2`, ya que el contenedor no cubre esa zona al ser el panel `position:absolute`). Abre/cierra solo por click/tap, igual en desktop y móvil; una vez abierto permanece visible sin importar dónde esté el cursor. Escape cierra y devuelve foco, click fuera del conjunto trigger+panel cierra, navegar por un link del panel cierra antes de la navegación. Panel siempre presente en el DOM (toggle vía `visibility`/`opacity`, nunca `display:none`) para que los links sean crawleables sin JS. Variante `mobile` se integra como accordion inline en el drawer existente (sin fondo propio, hereda el fondo oscuro del drawer). Espaciado de la fila de items en escritorio (Productos/Servicios/Proyectos/Nosotros/Contacto, corregido 2026-08-12 con medición real vía Playwright): **`gap-10` (2.5rem/40px), no `gap-9`**. El proyecto aplica `html { zoom: 0.9 }` en `min-width: 1024px` (ver `globals.css`), que reduce visualmente el `gap` especificado en un 10% — un `gap-9` (36px) real solo se ve como ~33px en pantalla. Se verificó con Playwright (`getBoundingClientRect`) en 1024/1280/1440px que `gap-10` (40px especificado) renderiza como **exactamente 36px en pantalla** en los tres anchos, igual en las 4 separaciones — el valor que el cliente pidió explícitamente, ahora con evidencia real en vez de estimación. Separación interna texto↔flecha del trigger (`nav-dropdown.tsx`, solo variante desktop): `gap-[0.5rem]` (mismo motivo — 0.45rem especificado se veía como ~6.5px; 0.5rem renderiza como 0.45rem reales). El contenedor de la fila usa `flex-1` (no `w-[54%]` fijo) desde la corrección anterior; logo y CTA no se tocaron. Padding lateral (`lg:px-10` = 40px) ya cumplía el mínimo de 32px, sin cambios.
  - **Overlap del CTA en 1024px — corregido 2026-08-12 (confirmado a pedido del cliente):** a 1024px, el bloque CTA (texto + flecha + separador + 3 íconos sociales, con `shrink-0` + `whitespace-nowrap`) no cabía en su `w-[28%]` asignado y se desbordaba tapando "Nosotros"/"Contacto" — el déficit venía del CTA, no de los links; ningún `gap` en la fila de navegación podía resolverlo (persistía incluso con gap en cero). Solución: por debajo de `xl` (1280px) se oculta el texto del botón, el separador y los íconos sociales, dejando solo el botón circular de flecha (44×44px, `aria-label` ya presente) como CTA en el rango 1024–1279px; desde 1280px se muestra el CTA completo. Verificado con Playwright (`getBoundingClientRect`) en 1024/1279/1280/1440px: `overlapPx = 0` en los cuatro anchos.
  - **Estilo del panel (blanco sólido, 2026-08-12):** fondo `#FFFFFF` sólido (sin transparencia ni backdrop-blur), texto principal `#1F2933`, texto secundario `#667085`, borde `#E5E7EB`, sombra `0 12px 30px rgba(15,23,42,0.10)`. Reemplaza el panel oscuro/grafito con blur usado antes. Sin CTA al final del panel ("Ver catálogo completo"/"Ver todos los servicios" fueron eliminados por pedido explícito — no se reemplazaron por ningún otro elemento).
  - **Animación:** opacidad + traslado vertical máx. 4px, 150ms ease-out (dentro del rango 120–160ms pedido), sin spring/bounce/escala/blur/rotación de panel, `motion-reduce:transition-none`. El pequeño ícono de flecha SÍ rota como indicador de estado (no es "la animación del dropdown", es una micro-affordance de accesibilidad estándar).
  - **Contenido:** Productos usa un mega menú editorial de escritorio en cuatro grupos, construido solo con filtros reales de `mock-products.ts` y enlaces profundos a `/productos?filtro=<categoría>`. Los grupos son: Separación y análisis; Preparación y proceso; Laboratorio y agua; Aplicaciones especializadas. Se conserva el acordeón móvil de seis categorías curadas para no convertir el drawer en un listado excesivo. Servicios usa los 4 servicios reales confirmados — ver más abajo — en lista de 1 columna con descripción, enlazando a anclas `/servicios#{id}`.
  - **Componentes retirados del header (no eliminados del repo):** `src/components/ui/motion-navigation-menu.tsx` y `src/components/ui/highlight.tsx` quedan sin uso en `navigation.tsx` — su física de resorte y slide horizontal entre items no podía cumplir el requisito de animación estrictamente simple (opacidad + 4px, sin bounce/escala) pedido para ambos dropdowns. Se mantienen en el repo por si se quieren reutilizar en otro contexto; no se borraron por no ser necesario para esta corrección.
  - **Tercer sistema de mega-menú disponible pero sin usar (agregado 2026-08-12):** `src/components/ui/navigation-menu.tsx` (primitivos Radix, adaptados a las CSS vars del proyecto) + `src/components/ui/navigation-menu-06.tsx` (`RichNavigationMenu`, ejemplo compuesto con contenido de referencia genérico tipo documentación de librería de componentes — Accordion/Button/Card/etc., NO contenido real de Del Carpio). Se integró vía el proceso shadcn estándar (nueva dependencia real `@radix-ui/react-navigation-menu`; se evitó instalar `@radix-ui/react-icons` reemplazando su único uso, `ChevronDownIcon`, por el `ChevronDown` de `lucide-react` ya instalado). **Deliberadamente NO está montado en ninguna página ni reemplaza a `NavDropdown`** — el usuario confirmó explícitamente mantenerlo solo como pieza reusable en `/components/ui`, dado que usa un paradigma de menú distinto (Radix, hover/focus-driven) al `NavDropdown` bespoke ya afinado en 4 sesiones para el header real (click-only, sin hover, exclusividad centralizada). Si se decide usarlo alguna vez, requiere contenido real de Del Carpio antes de publicarse — el contenido actual es solo de referencia.
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

## 7. Soluciones por Industria (arquitectura de contenido, agregado 2026-08-12)

Nueva ruta `src/app/soluciones/[industria]/page.tsx` (+ índice `src/app/soluciones/page.tsx`): al seleccionar una industria (desde el carrusel del home `industry-tabs.tsx`, la barra "Soluciones por Industria" del header, o `/soluciones`), la persona llega a una página real por sector que agrega: descripción real de la industria (`src/content/site.ts`), los 4 servicios técnicos reales (`coreServices`, con CTA a `/contacto/{id}`), y una grilla de productos reales filtrados por categoría relevante, con link a `/productos?filtro={categoría}` para ver el catálogo completo de esa categoría.

- **Fuente de verdad única:** `Industry` en `site.ts` ganó los campos `slug` y `productCategories: ProductCategory[]`. `coreServices` (los mismos 4 servicios ya validados para el dropdown "Servicios" del header) se movió a `site.ts` como export compartido — antes vivía duplicado dentro de `navigation.tsx`.
- **Mapeo categoría→industria — decisión editorial, no dato verificado del cliente:** no existe en el proyecto ningún campo de industria en productos ni servicios (`Service.sectors` y el antiguo `Industry.featuredServices` — ahora eliminado — estaban declarados pero nunca poblados, marcados "pendiente ClickUp" desde sesiones anteriores). El mapeo usa las categorías reales de producto (`ProductCategory` en `mock-products.ts`) como puente, con juicio técnico razonable (ej. Minería → categorías "Minería"/"Fire Assay"/"Trace Elemental"; Farmacéutica → "Área farmacéutica"). **Confirmado explícitamente con el cliente antes de publicarse** (2026-08-12), pero sigue sin ser un dato verificado producto-por-producto — si Del Carpio entrega una asociación real por producto, este mapeo debe reemplazarse.
- **Cobertura verificada:** las 6 industrias devuelven productos reales (7–9 cada una, confirmado en runtime), ninguna cae en el estado vacío.
- **Gap de assets, no de código:** no existe foto ni video real para "Aguas" en `public/fotos/industrias/` ni `public/videos/industrias/`. El carrusel de video del home (`industry-tabs.tsx`) por eso solo muestra 5 de las 6 industrias — "Aguas" sí tiene página completa en `/soluciones/aguas` y entrada en el header, ambos sin depender de ese video, usando una foto de laboratorio real ya existente como header estático. Pendiente: fotografía/video real de Aguas cuando estén disponibles.
- **Se corrigieron enlaces rotos preexistentes:** tanto el carrusel del home como la barra del header apuntaban a `/servicios` genérico o a las páginas huérfanas `/servicios/[slug]` (ver Sección 5 → Navigation, taxonomía de servicios). El header además tenía una industria falsa ("LABORATORIOS", no existe en `industries`) y le faltaba "Aguas" por completo.

**Hero WebGL de /soluciones — revertido (2026-08-12):** se probó un hero WebGL (Three.js/GSAP, paleta de marca) como excepción documentada a las reglas de motion, con visto bueno del cliente. El cliente pidió revertirlo tras verlo — no le gustó el resultado. Se restauró el header de texto plano original (mismo patrón que el resto del sitio) y se removieron `three`/`gsap`/`@types/three`. No reintentar este patrón sin que el cliente lo pida explícitamente de nuevo.

**Secciones nuevas en /soluciones/alimentos — fila de diferenciadores + grilla de equipos compatibles (2026-08-17):** el cliente pidió adaptar un JSON de referencia de otra empresa ("Koira Industrial Landing Page" — hero con cita/firma, fila de 5 íconos, cards_section de 3 servicios). Se rechazó usar el JSON tal cual: traía contenido real de otra compañía (cita/firma de un tercero, servicios de Petróleo/Construcción/Automotriz que Del Carpio no ofrece) y un color fuera de paleta (`#FF5722`). Se adaptó solo la **estructura** con contenido 100% real de Del Carpio, confirmado con el cliente antes de implementar:
- **Fila de diferenciadores** (`solution-differentiators.tsx`, campo opt-in `SolutionPageConfig.showDifferentiators`): 5 ítems tomados 1:1 de `coreServices`/`metrics` en `site.ts` (Cromatografía HPLC y GC, Validación NCh-ISO 17025, Calificación IQ/OQ/PQ, Diagnóstico y soporte en sitio, Capacitación técnica) — nunca frases de marketing inventadas tipo "garantía 100%" o "precios transparentes" (ver Sección 6, Don't).
- **Grilla de equipos compatibles** (`solution-compatible-equipment.tsx`, campo opt-in `SolutionPageConfig.compatibleEquipmentSlugs`): reemplaza el layout curado de 4 productos de "Equipamiento y consumibles" solo cuando el config trae la lista. Para alimentos se auditó a mano cada producto de `mock-products.ts` cuya categoría coincide con `industry.productCategories`, incluyendo solo los que mencionan textualmente "alimentos"/"piensos"/similar en su `description`/`subtitle`/`advantages`/`tags` — no por coincidencia de categoría sola. Resultado: 11 equipos verificados (Kjeldahl K1160/K9860/K9840/K1100F, digestores SH420F/SH520/SH220F, extractores Soxhlet SOX606/SOX406, liofilizador LYO60B, mezclador tipo V). Quedaron fuera productos de la misma categoría sin mención explícita (ej. equipos de Fire Assay/minería cuyo único match era la palabra "alimentación" referida a suministro eléctrico, no a la industria).
- **Alcance deliberadamente acotado a alimentos** — ambos campos son opt-in en `solution-pages.ts`; el resto de industrias no cambia hasta que se audite su propio contenido/equipamiento de la misma forma.

## 8. Página /marcas — grilla de marcas representadas, gateada desde el home (2026-08-17)

Página nueva, deliberadamente fuera de la navegación principal: solo se llega haciendo clic en un logo de la franja de marcas del home (sección `id="marcas"` en `lab-photos.tsx`, la misma cinta/carrusel que ya existía — antes puramente decorativa, ahora clickeable). Origen: el cliente pidió adaptar el componente shadcn `logo-cloud-2` (grilla con bordes + acentos "+" en las intersecciones internas). A diferencia del componente de referencia, que traía 8 logos de otras marcas de software (Nvidia, Supabase, GitHub, etc.) con clases de dark mode y tokens `bg-background`/`bg-secondary` de shadcn, esto **sí** era un patrón estructural genérico reutilizable (no contenido de negocio de otra empresa como el caso Koira) — se adaptó con los 7 logos reales de `public/marcas/` y los tokens de color de Del Carpio; se quitó `lucide-react` en favor de `@phosphor-icons/react` (ya es la librería de íconos del proyecto) y todas las clases `dark:` (el sitio no tiene modo oscuro).

- **Fuente única de logos:** `src/content/brands.ts` — antes vivían hardcodeados dentro de `lab-photos.tsx`; ahora los usan tanto la cinta del home como la grilla de `/marcas`. Agregar/quitar/reemplazar una marca es editar un solo archivo (pedido explícito del cliente: "constantemente vamos cambiando las marcas").
- **Gate de UX, no de seguridad** (`src/lib/brands-gate.ts`): al hacer clic en un logo de la cinta se marca `sessionStorage`; `/marcas` redirige en silencio al home si ese flag no está presente. Es trivial de saltar desde devtools a propósito — el objetivo es el efecto de descubrimiento, no restringir contenido sensible. Confirmado con el cliente (vía AskUserQuestion): redirección silenciosa (no mensaje de error) + Navigation/Footer completos del sitio en `/marcas` (no una página aislada sin chrome). `robots: noindex` porque es una página intencionalmente no listada.
- **Accesibilidad de la cinta:** el carrusel triplica los 7 logos para el loop infinito; solo el primer set queda en el árbol de accesibilidad (`aria-hidden`/`tabIndex=-1` en los dos sets duplicados) para no repetir 7 links de teclado/lector de pantalla 3 veces — los duplicados visuales siguen siendo clickeables con mouse/touch.
- **Grilla adaptable, no basada en dark mode:** fondo alterno por índice se descartó porque `--panel` en este proyecto es literalmente blanco (`#FFFFFF`, igual a `bg-white`) — no genera contraste visible; se dejó fondo blanco uniforme + borde, consistente con el sistema de cards ya documentado (Sección 5). Los acentos "+" se calculan por índice/columna (no a mano por logo como el original) y se renderizan en un overlay separado superpuesto sobre toda la grilla — necesario porque, al ser todas las celdas `position: relative`, la celda de la fila siguiente pinta encima de cualquier "+" posicionado dentro de la celda de la fila anterior. Los acentos solo se calculan para el layout de 4 columnas de escritorio y se ocultan en mobile (2 columnas) — decisión de simplicidad, no limitación técnica.
- **Reparación incidental:** el footer ya tenía un link a `/#marcas` que apuntaba a una sección inexistente (nunca se había construido `id="marcas"`). Quedó resuelto como efecto de este trabajo.

## 9. Secciones técnicas nuevas en /soluciones/[industria]: métodos, aplicaciones, FAQ, testimonio, siguiente paso (2026-08-17)

Origen: el usuario pidió recomendaciones de contenido en química analítica para que las páginas de industria no se sintieran vacías ni genéricas, y luego pidió aplicarlas en las 6 páginas, "que pase por alguna skill" y con "algún complemento para no repetir patrones repetitivos". Se corrió `/impeccable shape` (register `brand`); dado que el sistema de diseño ya está muy comprometido (ver Secciones 1–6), se confirmó con el usuario (vía AskUserQuestion) que la diferenciación entre las 6 industrias vendría del **contenido real**, no de color o layout decorativo nuevo — consistente con "Evidencia sobre declaración" y "Sobriedad como credibilidad".

- **Bug encontrado y corregido antes de agregar nada:** la sección "Contexto Industrial" de `solution-editorial-page.tsx` tenía el eyebrow, el titular y la foto **hardcodeados para alimentos** ("...la inocuidad alimentaria", foto de análisis microbiológico) sin condicional por industria — se mostraba igual, y textualmente incorrecto, en las otras 5 páginas (confirmado con `curl` contra `/soluciones/mineria` antes de tocar código). Se reemplazó por un mapa `industryContext` (eyebrow + titular + foto) por `industry.slug`, con titulares derivados 1:1 de `industry.detail` (sin frases nuevas) y fotos reales ya existentes en `public/fotos/industrias/` (mismo mapeo que ya usan `soluciones/page.tsx` e `industry-tabs.tsx`, sin fuente única todavía — pendiente si se quiere centralizar en site.ts).
- **`src/content/solution-content.ts` (nuevo):** por industria — tabla de métodos (técnica/aplicación/norma), 2 casos de aplicación, FAQ (4 preguntas compartidas + 1 específica) y una intro de guía de selección. Todo derivado de `industry.detail`, `process`/`coreServices` en site.ts y las descripciones reales ya auditadas de `compatibleEquipmentSlugs` (ver Sección 7) — nunca cifras de LOD/LOQ, plazos de entrega ni resultados de cliente no verificados (confirmado con el usuario antes de redactar). Dos casos de aplicación (minería, alimentos) reutilizan `labProjects` de site.ts, contenido real ya escrito que no se usaba en ninguna página.
- **`solution-methods.tsx`:** tabla HTML real (no cards) — refuerza el north star "Informe Técnico Chileno" y es el formato más rápido de escanear para confirmar técnica/matriz/norma.
- **`solution-application-cases.tsx`:** 2 bloques editoriales con un divisor (`border-l`), no cards con borde propio — evita el patrón de grilla de cards idénticas.
- **`solution-faq.tsx` + `src/components/ui/accordion.tsx` (nuevo primitivo):** Accordion sobre `@radix-ui/react-accordion` (dependencia ya instalada, sin uso hasta ahora). Estilo plano con la misma lista numerada ya usada en "Servicios aplicables" en vez de un componente "acordeón con card" genérico. Keyframes `accordion-down`/`accordion-up` agregados a `tailwind.config.ts`; el `prefers-reduced-motion` global de `globals.css` ya cubre esta animación sin trabajo adicional.
- **`solution-testimonial.tsx`:** cita a página completa, sin marquee ni card — tercer tratamiento visual distinto de testimonios en el sitio (marquee 1 fila en home, marquee 2 filas en /nosotros, cita editorial aquí), que es el "complemento" pedido para no repetir el mismo patrón en más de un lugar. Filtra `testimonials` (`content/testimonials.ts`) por el nuevo campo `industrySlugs` — un testimonio puede listar más de una industria solo cuando su propio texto lo respalda (el testimonio de "Sector Ambiental" menciona literalmente "monitoreo de aguas", así que aplica también a `aguas`, la única industria sin testimonio dedicado). Si una industria no tiene match, la sección no se renderiza — hueco honesto en vez de forzar una cita que no aplica.
- **Router "¿Qué necesita hoy?" (3 pasos, inline en `solution-editorial-page.tsx`):** enlaza a las rutas reales `/contacto/cotizar`, `/contacto/proyectos`, `/contacto/diagnostico` (no al enum `tipoConsulta` del schema, que usa slugs distintos — ver `contact-schema.ts` vs `contacto/[tipo]/page.tsx`). Reutiliza la misma lista numerada de "Servicios aplicables" a propósito, en vez de 3 botones con el mismo peso visual, para no violar el principio de PRODUCT.md "una acción por sección, no diluir CTAs" — sigue habiendo un único CTA primario (la banda final), y este router es una ayuda de pre-clasificación, no una segunda acción compitiendo.
- **Orden final de la página:** Hero → Diferenciadores → Contexto Industrial (corregido) → Métodos y normativa + Aplicaciones típicas (nuevo) → Servicios aplicables → Equipamiento y consumibles (+ intro de guía de selección) → Testimonio filtrado (nuevo) → FAQ (nuevo) → Siguiente paso (nuevo) → Banda CTA final.

## 10. Ritmo de fondos + sección ancla oscura en /soluciones/[industria] — feedback directo del cliente sobre la Sección 9 (2026-08-17)

El cliente vio la Sección 9 recién construida y dio feedback directo: "lo veo todo muy blanco, muy sólido y sin diferenciar una sección con la otra", pidiendo más diferenciación visual real entre las 6 industrias — lo contrario de lo que se había confirmado horas antes en la Sección 9 (diferenciar solo por contenido). Se corrió `/impeccable bolder` sobre `src/components/solutions/`.

- **Causa técnica del problema, no solo percepción:** `--panel` en `globals.css` es literalmente `#ffffff` (idéntico a blanco puro) y `--background` es `#f4f4f4` (4% más oscuro, imperceptible) — ya se había documentado esta misma limitación en la Sección 8 (`/marcas`) y se había evitado ahí. El template compartido tenía 6-7 secciones consecutivas todas en `bg-white/70` o equivalente, con solo un borde de 1px entre ellas.
- **Design-System Lock (regla de la skill `bolder`):** antes de tocar color, se verificó que el sistema solo tiene 3 colores de marca reales (terracota/verde/amarillo) y que el terracota es exclusivamente color de acción por regla ya documentada — no hay margen para dar 6 colores de sector distintos sin salir de paleta. Se confirmó con el cliente (vía AskUserQuestion): **no** agregar tintes nuevos derivados de los 3 colores de marca; usar solo lo que ya existe (amarillo=alimentos, verde=aguas/ambiental, y el gris `secondary` — ya en el sistema, sin uso real hasta ahora — para minería/farmacéutica/academia-id, que nunca tuvieron color de sector). Cero colores nuevos en `tailwind.config.ts`.
- **Ritmo de fondos (sin tokens nuevos):** se alternan `bg-white`, `bg-[var(--secondary)]/5` (lavado gris-azulado sutil, la única superficie clara con contraste real distinto de blanco) y `bg-[var(--nav-bg)]` (el tono oscuro ya usado en el hero dark y la banda CTA final). Orden resultante: lavado (Contexto Industrial) → **oscuro** (Métodos, nuevo ancla) → blanco (Aplicaciones típicas, separada de Métodos en su propia sección — antes vivían juntas bajo el mismo eyebrow) → lavado (Servicios) → blanco (Equipamiento) → lavado (Testimonio, antes usaba `var(--panel)` = blanco, sin contraste real) → blanco (FAQ) → lavado (Siguiente paso) → **oscuro** (CTA final). Dos anclas oscuras a modo de paréntesis alrededor del contenido central.
- **"Métodos y normativa" como ancla:** única sección con fondo `--nav-bg` fuera del hero/CTA — funciona como ficha técnica de alto contraste, el momento memorable de la página (criterio de `bolder.md`: "pick one thing the viewer should remember"). Se corrigió un fallo de contraste real detectado al construirla: las etiquetas de columna en `text-white/55` (~2.5:1) y el cuerpo en `text-white/70` (~3.9:1) no llegaban al mínimo 4.5:1 exigido por el propio DESIGN.md — se subieron a `text-white/90` y `text-white/80` respectivamente (verificado con cálculo de contraste WCAG, ~6.5:1 y ~5.6:1).
- **Acento decorativo por industria** (`industryAccent` en `solution-editorial-page.tsx`): en esta iteración vivía como un punto de color repetido junto a cada técnica de la tabla y cada caso de aplicación — **revisado en la Sección 11** tras feedback del cliente, ver abajo. Nunca como color de texto corrido ni como color de acción — sigue habiendo un solo terracota interactivo en toda la página, sin excepción, por la "Regla de la Voz Única" ya documentada.
- **Eyebrows recortados:** se quitó el eyebrow repetido de "Métodos y normativa" (ya tiene el filete de color + fondo oscuro como marca suficiente) y de "Siguiente paso" — reduce la cadencia de "eyebrow terracota + h2" idéntica en 5+ secciones seguidas, que la skill `impeccable` marca como scaffold de IA cuando se repite en cada sección.

## 11. Reemplazo de íconos de librería y puntos decorativos genéricos (2026-08-17)

El cliente dio feedback directo (actuando como "experto en diseño web"): pidió reemplazar "símbolos o cosas genéricas... círculos o iconos genéricos de plantillas" por diseño con identidad propia, explícitamente pidiendo usar `impeccable` "y otras taste skills". Se corrió `/impeccable delight` sobre `src/components/solutions/`.

- **`solution-differentiators.tsx` — 5 íconos Phosphor (Flask, SealCheck, Gauge, MagnifyingGlass, GraduationCap) sobre cada etiqueta:** coincidía literalmente con el ban de la skill ("large rounded-corner icons above every heading, screams template"). Se reemplazó por el array `metrics` de `site.ts` — contenido real ya redactado y aprobado (HPLC · GC / NCh · ISO / 6 sectores / IQ/OQ/PQ con su label descriptivo) que **no se usaba en ninguna página** — en un tratamiento tipográfico "valor grande + etiqueta" (sin ícono), igual de riguroso con la voz "Informe Técnico Chileno" y cero dependencia de librería de íconos para este componente.
- **Puntos de color repetidos por fila** en `solution-methods.tsx` y `solution-application-cases.tsx` (agregados en la Sección 10, hace unas horas): se quitaron por completo. Motivo real, no solo estético: dentro de una misma industria el color es idéntico en las 17 filas de la tabla (o en las 2 tarjetas de aplicación) — repetir el mismo punto de color muchas veces no comunicaba información nueva fila a fila, solo decoraba, que es exactamente el patrón de "colored status dot" que se ve en cualquier dashboard genérico.
- **Barra redondeada decorativa** junto al heading de "Métodos y normativa": reemplazada por una marca única por página — un rombo (`rotate-45`, no círculo) del color de acento con anillo blanco propio (visible tanto sobre el amarillo claro como sobre el verde/gris más oscuros, verificado con cálculo de contraste — ninguno de los 3 acentos por sí solo tenía suficiente contraste contra `--nav-bg` para funcionar como mancha de color sin el anillo) junto al **nombre real de la industria** en mono uppercase — funciona como una marca de clasificación de informe técnico (la ficha dice a qué industria pertenece), no como decoración pura. Es la única aparición del acento por industria en toda la página: una marca segura y con significado en vez de muchas repetidas sin él.
- **Qué NO se tocó a propósito:** flechas (`ArrowRight`/`ArrowLeft`) y el `CaretDown` del accordion — son afordancias funcionales (navegación, expandir/colapsar), no decoración de plantilla, y ya son el lenguaje de interacción establecido en todo el sitio (no solo en `/soluciones`). El componente `metrics-section.tsx` del home (íconos Phosphor en círculos con blur, mismo patrón "ícono sobre métrica") queda fuera de alcance — el cliente pidió explícitamente las páginas de industria, tocar el home es un cambio de blast radius mayor y no se pidió.

## 12. Traza de cromatograma SVG animada — firma visual propia de /soluciones/[industria] (2026-08-17)

El cliente pidió "algo innovador o diferente al resto", pensando como "desarrollador web senior marcando tendencia en 2026". Antes de proponer nada se confirmó con AskUserQuestion: (1) seguir acotado a `/soluciones/[industria]` (no otra página), (2) innovador **dentro** de la identidad sobria ya establecida, no una ruptura de marca. Se descartaron a propósito los efectos de moda genéricos (bento grids, glassmorphism, cursor mágico) por estar saturados y por no tener relación real con el negocio — se optó por algo que ningún competidor local de instrumentación analítica tiene: una visualización real de cromatograma/espectro.

- **`solution-chromatogram.tsx` (nuevo):** SVG generado por código (sin librería de gráficos), con picos asimétricos (subida rápida, "tailing" en la bajada) igual que un cromatograma real de HPLC/GC — no es una forma decorativa abstracta, reproduce la forma real de lo que producen los instrumentos que vende Del Carpio. Refuerza el principio de PRODUCT.md "Evidencia sobre declaración" en vez de contradecirlo.
- **Nada es aleatorio sin razón:** el número de picos se deriva del número real de equipos compatibles auditados por industria (Sección 7) — `Math.round(compatibleEquipment.length / 1.5)`, acotado entre 4 y 10 — resultado: minería 10 picos, ambiental 9, alimentos 7, farmacéutica/academia-id 5, aguas 4 (piso del clamp). La posición y altura de cada pico es pseudo-aleatoria pero **determinística** (semillada con `industry.slug` vía un hash + generador mulberry32) — estable entre servidor y cliente (sin mismatch de hidratación) y no cambia en cada render.
- **Animación "draw-on-scroll":** el trazo se dibuja solo al entrar en viewport, vía `pathLength` de `motion/react` (mismo patrón `whileInView` que ya usa `SolutionReveal` en todo el sitio, sin librería nueva). Con `prefers-reduced-motion` se omite `initial`/`whileInView` y el trazo aparece completo de inmediato — sin alternativa, no opcional, por regla del sistema.
- **Legibilidad del amarillo de marca:** el trazo se dibuja dos veces superpuesto — un halo sólido en `--nav-bg` (grosor 5) debajo, y el color de acento encima (grosor 2) — porque el amarillo (`#FBE369`) es casi ilegible solo sobre blanco (contraste ~1.3:1, verificado por cálculo). Mismo principio de "anillo/halo de contraste" ya usado en la marca de rombo (Sección 11) y en el punto de la tabla de métodos (Sección 10), no una técnica nueva.
- **Ubicación:** franja delgada entre Diferenciadores (Sección 11) y Contexto Industrial — fondo blanco, sin sección oscura nueva (ya hay dos anclas oscuras en la página, agregar una tercera tan pronto habría sido excesivo).
