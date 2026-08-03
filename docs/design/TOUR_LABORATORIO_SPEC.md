# Tour Virtual del Laboratorio — rediseño estética industrial oscura

Fecha: 2026-08-03
Autor: Claude Code (Director Creativo / UX Architect)
Estado: listo para que Codex implemente. Implementación bloqueada hasta que
esta especificación exista — igual que el resto de specs de página del
proyecto.

## 0. Origen y nota de rechazo explícito

El usuario pidió aplicar un Design JSON de una marca llamada "TecnoMaq"
(mantención de máquinas CNC, copy en portugués de Brasil, paleta
`#E65C19` / `#0A0A0A`, tipografía "industrial condensada") de forma "muy
idéntica visualmente" a `/contacto/tour-laboratorio`.

**Ese JSON se rechazó sin excepción**, por la misma regla que ya existe en
`AGENTS.md` desde el caso SkilAB (30-06-2026): *"No usar Design JSON ni
imágenes de referencia de fuentes externas no auditadas por Christofer o
Claude."* El JSON pertenece a otra marca, otro rubro, otro idioma y usa
colores fuera del sistema de Del Carpio (`#E65C19`, `#0A0A0A` no existen en
`tailwind.config.ts`).

Lo que **sí** se aprueba y se especifica abajo es el *concepto* detrás del
pedido — una estética industrial, oscura, técnica, con tipografía fuerte en
mayúsculas y una cinta de texto en movimiento — construido **desde cero**
con la paleta real de Del Carpio, tipografía Montserrat, español, y
contenido 100% verídico (nada de estadísticas o servicios inventados). No
es una copia de TecnoMaq; es una dirección visual nueva, propia de esta
página, coherente con el resto del sitio.

**Restricción de color:** el tono oscuro más profundo que existe en el
sistema de Del Carpio es `ink.dark` `#4A5560` (`tailwind.config.ts`, no hay
ningún negro puro ni gris carbón definido). Esta spec usa `#4A5560` como
único fondo oscuro — no se introduce ningún tono nuevo fuera de la paleta
aprobada (`#D6532B` terracota, `#53843A` verde, `#FBE369` amarillo,
`#4A5560` ink, `#707E83` secondary).

---

## 1. Alcance

Esta especificación cubre exclusivamente `/contacto/tour-laboratorio`
(`src/app/contacto/tour-laboratorio/page.tsx` →
`src/components/tour/tour-laboratorio-client.tsx`). El visor 360°
(`src/components/tour/panorama-viewer.tsx`) **no se rediseña** — ya usa
`#4A5560` + acentos terracota y funciona correctamente; solo se integra
dentro del nuevo shell de página oscuro en vez de convivir con un fondo
blanco alrededor. No se toca `Navigation` ni `Footer` (ya son componentes
globales usados en todo el sitio).

---

## 2. Narrativa y jerarquía de la página

```
1. Navigation (global, sin cambios)
2. NUEVO — Hero de tour (oscuro, texto + 2 CTA)
3. NUEVO — Cinta de texto en movimiento (ticker, terracota sólido)
4. NUEVO — Grilla "Qué vas a recorrer" (4 tarjetas, imágenes reales de las escenas)
5. Visor 360° (existente, sin cambios visuales — se ancla en #recorrido-360)
6. CTA final "Solicitar visita técnica" (existente, restyled a fondo oscuro)
7. Footer (global, sin cambios)
```

Toda la página pasa de fondo blanco a fondo `#4A5560` — deja de ser "una
sección oscura sobre una página clara" y pasa a ser una página oscura
consistente de punta a punta, que es lo que pedía la referencia. El Footer
ya es oscuro (`slate-800`/`slate-900` en `footer.tsx`), así que la
transición al cierre de página es natural sin ajustes ahí.

---

## 3. Copy final por sección

### 3.1 Hero

```
Label (uppercase, terracota, mono):  + TOUR VIRTUAL 360°
H1 (uppercase, bold, blanco):        RECORRE EL LABORATORIO DEL CARPIO EN 360°
Body (blanco/70%):                   Explora en línea las estaciones reales del área
                                      analítica —desde la entrada hasta el área
                                      ICP-OES/ICP-MS— antes de coordinar tu visita
                                      técnica presencial.
CTA primario (terracota sólido):     Solicitar visita técnica  →  /contacto
CTA secundario (outline blanco):     Ver recorrido 360°  →  ancla #recorrido-360
```

No inventar cifras ("+X años", "+X clientes") que no estén ya validadas en
`src/content/site.ts`. Si en el futuro se quiere agregar una cifra de
respaldo, debe salir de `metrics` (ya existente y aprobado), no crearse
nueva para esta página.

### 3.2 Cinta de texto (ticker)

Contenido — reutiliza literalmente los 4 valores ya aprobados en
`src/content/site.ts` (`metrics`), no texto nuevo inventado:

```
RECORRIDO VIRTUAL 360° · HPLC · GC · VALIDACIÓN NCh · ISO 17025 · CALIFICACIÓN IQ/OQ/PQ · AGENDA TU VISITA TÉCNICA · 6 SECTORES INDUSTRIALES ·
```

Este texto se repite en loop continuo (ver comportamiento y reduced motion en 6.1).

### 3.3 Grilla "Qué vas a recorrer"

```
Label (uppercase, terracota, mono):  + 4 ESTACIONES DEL RECORRIDO
Título (uppercase, bold, blanco):    QUÉ VAS A RECORRER
```

Las 4 tarjetas usan **exactamente** los mismos títulos/descripciones/
imágenes ya definidos en `tourScenes` dentro de
`src/components/tour/panorama-viewer.tsx` (Entrada del Laboratorio, Zona
de Análisis, Mesón Central, Área ICP-OES / ICP-MS) — no se redacta copy
nuevo ni se inventa una 5ª o 6ª estación que no existe. Ver sección 7 para
el contrato de datos que evita duplicar este arreglo en dos archivos.

### 3.4 CTA final

Reutiliza el texto ya existente: "Solicitar visita técnica" →
`/contacto`. Solo cambia el tratamiento visual (sección 5), no el texto ni
el destino.

---

## 4. Layout

### 4.1 Desktop (≥1024px)

- **Hero:** `min-h-[420px]`, contenido centrado en columna única,
  `max-w-3xl`, padding vertical generoso (`py-24`). Fondo `#4A5560` con la
  textura de ruido SVG ya usada en el resto del sitio (mismo patrón
  `feTurbulence` que `productos/[slug]/page.tsx` — `baseFrequency 0.85`,
  `opacity-[0.03]`, `mix-blend-overlay`; no inventar una textura nueva).
  Los dos CTA en fila horizontal, `gap-4`.
- **Ticker:** banda de `h-11` (44px) a lo ancho completo, fondo terracota
  sólido `#D6532B`, texto blanco en una sola línea que se desplaza
  horizontalmente sin cortes (ver 6.1). Sin padding lateral — el texto
  entra y sale de los bordes del viewport.
- **Grilla de escenas:** `grid-cols-4`, `gap-5`, `max-w-[1180px]` (mismo
  ancho máximo que ya usa el visor 360° en `panorama-viewer.tsx`), cada
  tarjeta con `aspect-[4/5]`.
- **Visor 360°:** sin cambios de layout — sigue igual que hoy.
- **CTA final:** banda completa `#4A5560`, contenido centrado, mismo botón
  que ya existe (`bg-[#D6532B]`), solo se ajusta el `border-t` de arriba a
  `border-white/10` en vez de `border-[#4A5560]/10` (el actual asume fondo
  blanco alrededor).

### 4.2 Tablet (768–1023px)

- Hero: mismo layout, `max-w-xl`, CTAs pueden quedar en fila si caben o
  apilarse si el texto del botón principal se corta.
- Ticker: igual, altura y comportamiento sin cambios (el ticker no
  depende del ancho de columna, es una franja completa).
- Grilla de escenas: `grid-cols-2`, 2 filas de 2 tarjetas.

### 4.3 Mobile (<768px)

- Hero: `py-16`, CTAs apilados en columna, ambos `w-full`.
- Ticker: igual altura (44px), velocidad de scroll un poco más lenta
  relativa (ver 6.1) para que el texto siga siendo legible en pantallas
  angostas.
- Grilla de escenas: `grid-cols-1`, tarjetas `aspect-[16/10]` en vez de
  `4/5` (más ancha que alta en mobile, para no apilar 4 tarjetas muy
  altas una sobre otra).
- Visor 360°: sin cambios — ya es responsive.

---

## 5. Tratamiento visual detallado

### 5.1 Hero
```
Wrapper:        bg-[#4A5560] text-white, position relative, overflow-hidden
Textura ruido:  SVG feTurbulence, igual patrón que productos/[slug]
Label:          font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D6532B]
H1:             font-display text-[32px] md:text-[44px] lg:text-[52px]
                font-extrabold uppercase leading-[1.05] tracking-tight text-white
Body:           text-[15px] leading-relaxed text-white/75 max-w-2xl mt-5
CTA primario:   bg-[#D6532B] hover:bg-[#b54725] text-white rounded-[2px]
                px-8 py-4 uppercase text-[12px] font-bold tracking-widest
CTA secundario: border border-white/30 text-white hover:bg-white
                hover:text-[#4A5560] rounded-[2px] px-8 py-4 uppercase
                text-[12px] font-bold tracking-widest transition-colors
```
Ningún botón usa `rounded-full` — el catálogo y las fichas de producto ya
establecieron `rounded-[2px]` como el tratamiento de botón para contenido
"técnico/industrial" (ver `product-catalog.tsx`, CTAs de
`productos/[slug]/page.tsx`), a diferencia de los CTA "pill" de la home.
Esta página se alinea a esa familia visual, no a la de la home.

### 5.2 Ticker
```
Wrapper:        bg-[#D6532B] h-11 overflow-hidden flex items-center
Texto:          font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-white whitespace-nowrap
```
Sin ícono, sin gradiente, sin sombra — una franja plana de color sólido,
consistente con el resto del sitio (ver "Lo que NO se implementa" en
`Interaction.md`: nada de motion decorativo sin propósito). El propósito
UX de este movimiento es reforzar términos técnicos ya validados
(HPLC, GC, NCh, ISO, IQ/OQ/PQ) de forma ambiental mientras el usuario
decide si hace scroll — no es información nueva ni exclusiva (ya está en
`TrustMetrics` en home), así que es aceptable que sea puramente decorativo
siempre que respete `prefers-reduced-motion` (ver 6.1).

### 5.3 Grilla de escenas
```
Card wrapper:   relative overflow-hidden rounded-[4px] border border-white/10
Imagen:         Next/Image fill, object-cover, mismo archivo que ya usa el
                visor (/tour/recorrido/escena-0X.jpg) — sin generar ni pedir
                imágenes nuevas
Overlay:        gradiente inferior bg-gradient-to-t from-[#4A5560]/95 via-[#4A5560]/20 to-transparent
Título:         absolute bottom-0 left-0 p-4, font-display text-[15px]
                font-extrabold uppercase text-white
Hover (desktop):scale(1.03) 500ms ease-out en la imagen, recortado por overflow-hidden
                (mismo timing que "Card de Foto" ya documentado en Components.md)
Focus/click:    toda la tarjeta es un <a href="#recorrido-360"> — lleva al
                visor 360°. No se sincroniza la escena inicial del visor con
                la tarjeta clickeada (mantenerlo simple; las 4 tarjetas
                llevan al mismo punto de anclaje, el usuario navega las
                escenas desde los controles que ya existen en el visor).
```

### 5.4 CTA final
Reutiliza exactamente el bloque ya implementado en
`tour-laboratorio-client.tsx` (botón terracota + `ArrowRight`), solo
cambia el `border-t` como se indicó en 4.1 para que combine con fondo
oscuro en vez de blanco.

---

## 6. Motion y accesibilidad

### 6.1 Ticker — comportamiento y reduced motion
- Animación: `translateX` en loop continuo, contenido duplicado una vez
  (dos copias del mismo texto en el DOM) para que el loop sea perceptualmente
  sin corte. Duración sugerida ~28s desktop / ~22s mobile (más lento en
  desktop porque hay más ancho de viewport que recorrer, no al revés — el
  objetivo es una velocidad de lectura similar en ambos).
- El contenido está **duplicado solo para el efecto visual** — la segunda
  copia debe llevar `aria-hidden="true"` para que un lector de pantalla no
  lea el texto dos veces.
- **`prefers-reduced-motion: reduce`:** la animación se detiene por
  completo (texto estático, sin `translateX`). Como el texto no cabe
  completo en una sola línea sin scroll, en este caso el contenedor pasa a
  `overflow-x: auto` (scroll manual, no automático) en vez de cortar el
  texto — el usuario con motion reducido no pierde información, solo
  pierde el movimiento automático.

### 6.2 Teclado y foco
- Los dos CTA del hero y las 4 tarjetas de la grilla son elementos `<a>`
  reales (no `<div onClick>`), alcanzables por `Tab` en orden de lectura.
- Focus visible: `outline` `2px` `#FBE369` (amarillo) con `offset-4` en
  todo lo que esté sobre fondo oscuro — es el mismo tratamiento que ya usa
  `panorama-viewer.tsx` en sus hotspots (`.tour-marzipano-hotspot:focus-visible`),
  se reutiliza el mismo color de foco para que toda la página sea
  consistente entre sí.
- El ticker no es interactivo (no tiene links ni botones dentro) — no
  entra en el orden de tabulación.

### 6.3 Jerarquía semántica
- El hero es el único `<h1>` de la página: "Recorre el laboratorio Del
  Carpio en 360°".
- El `<h2 id="tour-360-title">` que ya existe en `panorama-viewer.tsx`
  ("Laboratorio de Análisis") se mantiene como está — no se duplica ni se
  quita.
- El título de la grilla de escenas ("Qué vas a recorrer") es un `<h2>`
  también, en el mismo nivel.

---

## 7. Contrato de datos para Codex

Las 4 escenas (id, título, descripción, imagen) están hoy definidas
**solo** dentro de `tourScenes` en `panorama-viewer.tsx` (líneas 23-68).
La grilla nueva de la sección 3.3/5.3 necesita ese mismo título/imagen.

**No duplicar el arreglo.** Exportar `tourScenes` (o un subconjunto de
solo lectura con `id`, `title`, `description`, `imageSource`) desde
`panorama-viewer.tsx` e importarlo en el nuevo componente de grilla, para
que si mañana cambia una escena (nueva foto, texto corregido) solo se edite
en un lugar. Si se prefiere desacoplar, mover `tourScenes` a un archivo
compartido (ej. `src/content/tour-scenes.ts`) importado por ambos
componentes — cualquiera de las dos rutas es válida, lo que no es válido es
tener el mismo título/imagen escrito dos veces en el código.

Componente nuevo sugerido: `src/components/tour/tour-scene-grid.tsx`
(Client o Server Component da igual aquí — no depende de estado, solo
mapea datos a JSX; puede ser Server Component ya que no usa hooks,
manteniendo el default del proyecto).

Componente nuevo sugerido: `src/components/tour/tour-hero.tsx` y
`src/components/tour/tour-ticker.tsx` — el ticker sí necesita ser Client
Component solo si la animación se implementa con JS (`motion/react`); si se
implementa con `@keyframes` CSS puro (recomendado, más liviano, no
requiere JS para algo puramente decorativo), puede quedar en un Server
Component con una etiqueta `<style>` o clase de Tailwind + `globals.css`.
Preferir la ruta CSS-only.

---

## 8. Criterios de aceptación

- [ ] Toda la página (`tour-laboratorio-client.tsx`) usa fondo `#4A5560` de
      forma continua — ya no hay una sección oscura flotando sobre un
      fondo blanco.
- [ ] Ningún color fuera de `tailwind.config.ts` (`primary`, `ink`,
      `secondary`, `sector`) aparece en el código nuevo. Grep de `#E65C19`,
      `#0A0A0A` y de cualquier hex no listado en `tailwind.config.ts` debe
      devolver cero resultados.
- [ ] Copy en español, sin ninguna palabra o cifra en portugués o inglés
      residual del JSON original.
- [ ] Ninguna cifra nueva inventada ("+X años", "+X clientes"); toda
      estadística visible proviene de `src/content/site.ts` (`metrics`).
- [ ] Las 4 tarjetas de la grilla reutilizan `tourScenes` (o su
      equivalente compartido) sin duplicar título/imagen en un segundo
      archivo.
- [ ] El ticker respeta `prefers-reduced-motion` (animación detenida,
      contenido íntegro accesible vía scroll manual).
- [ ] El ticker no duplica contenido para lectores de pantalla
      (`aria-hidden` en la copia visual duplicada).
- [ ] Un único `<h1>` en la página (el del hero nuevo); el `<h2>` del
      visor 360° existente no se toca.
- [ ] Foco visible con outline amarillo `#FBE369` en todos los elementos
      interactivos nuevos, igual que en los hotspots del visor.
- [ ] El botón "Solicitar visita técnica" final mantiene exactamente su
      texto y destino (`/contacto`) actuales.
- [ ] `next/image` para las 4 imágenes de escena (no `<img>` plano).
- [ ] Verificación visual desktop, tablet y mobile antes de dar por
      cerrada la tarea.

### Fuera de alcance de esta spec
- No se rediseña el visor 360° en sí (`panorama-viewer.tsx`) — ya cumple
  con la estética objetivo.
- No se agrega una 5ª o 6ª escena — el tour real tiene 4.
- No se agregan badges de "años de experiencia" ni logos de partners —
  no hay ese dato/activo confirmado para esta página.
