# Especificación: Página `/proyectos`

> Autor: Claude Code (Director Creativo). Excepción al modelo operativo: Claude
> implementa directamente en esta sesión por instrucción explícita del usuario
> (mismo precedente que la página híbrida Restek, 2026-07-15).

## 1. Origen y resolución de conflicto documental

El usuario entregó un "Design JSON" externo (tema "Validus", categoría
"Industrial Business & Handyman Services") como referencia de estructura,
pidiendo explícitamente que se **adapte a los colores y tipografía de Del
Carpio**. Esto es compatible con `AGENTS.md` — la regla que prohíbe "Design
JSON no auditados" (caso SkilAB) existe para evitar que se filtren paletas o
componentes literales de una plantilla comercial genérica al sitio. Aquí se
usa el JSON **solo como esqueleto de composición** (qué tipo de secciones y en
qué orden), no como fuente de color, tipografía ni iconografía. Ningún token
del JSON (`#FF6600`, `#1C1C1C`, etc.) se usa en el código. Todo color proviene
de `tailwind.config.ts` / `globals.css` (paleta ya auditada Del Carpio).

Dos elementos del JSON se descartan explícitamente por ser "patrón genérico de
plantilla industrial" (violación de la regla "¿Podría pertenecer a cualquier
empresa? Si sí, no se aprueba" y del anti-referente "Templates comerciales
genéricos de empresa industrial" en `PRODUCT.md`):

- **"Orange world map"** → Del Carpio no opera globalmente. Se reemplaza por
  un mapa esquemático de **Chile** con marcadores en las regiones donde existe
  evidencia real de proyecto ejecutado (Tarapacá, Atacama, Región
  Metropolitana), en línea con "Evidencia sobre declaración" de `PRODUCT.md`.
- **"Solid Orange" background en Feature Split`** → violaría "La Regla de la
  Voz Única" de `DESIGN.md` (terracota ≤15% de pantalla, nunca superficie
  decorativa grande). Se reemplaza por **tinta oscura `#4A5560`** como fondo
  sólido de esa sección, color ya usado en el sistema para bloques de
  contraste (header, footer).

## 2. Contenido: fuentes reales, sin invención

Toda la evidencia (fotos, video, hechos) proviene de dos casos reales
entregados por Christofer en
`C:\Users\cvillagran\Documents\Proyectos\` (no confundir con
`public/proyectos/`, que es el destino ya optimizado dentro del repo):

1. **SEREMI de Salud Región de Tarapacá** — "Servicio de Provisión e
   Instalación de Mobiliario para el Laboratorio de Salud Pública Ambiental y
   Laboral", Licitación pública **ID 757-167-LQ24** (Mercado Público — dato
   público, cita permitida). Fuente: `Proyectos 1/Christofer, muy buenas
   tardes.  Adj.txt` + 24 fotos WhatsApp.
2. **Compañía Minera del Pacífico (CMP)** — 13 órdenes de compra 2025-2026 en
   4 faenas (Planta Magnetita, Cerro Negro Norte, Los Colorados, El Romeral):
   mobiliario de laboratorio, líneas de gases con alarma, sistemas de
   extracción EAA, puertas y ventanas técnicas, mantención de líneas de gases.
   Fuente: `Proyecto 2/Proyectos.txt` + 7 fotos + 3 videos WhatsApp.

**No se publican** números de orden de compra ni fechas de vencimiento
individuales (información comercial interna, no apta para página pública). Se
agregan en lenguaje descriptivo ("múltiples faenas de Compañía Minera del
Pacífico entre 2025 y 2026"). El ID de licitación pública sí se cita porque es
un registro público de Mercado Público, no información confidencial.

Assets seleccionados y copiados sin recompresión agresiva a
`public/proyectos/` (ver tabla). El único video (16s, 480×864, instalación en
faena) se re-codificó únicamamente con `+faststart` para streaming progresivo
(sin cambios de contenido ni recorte), reduciendo de 3.1 MB a 1.83 MB; se
generó un poster JPG para evitar descarga automática del video.

| Archivo | Origen | Uso |
|---|---|---|
| `hero-equipo-tecnico-faena.jpg` | CMP, foto 1 | Fondo Hero |
| `about-tecnico-sala-balanzas.jpg` | CMP, foto 4 | About Split, panel derecho |
| `feature-1-analizador-leco.jpg` | CMP, foto 2 | Feature Split, slider |
| `feature-2-sala-limpia.jpg` | CMP, foto 3 | Feature Split, slider |
| `feature-3-lavamanos.jpg` | CMP, foto 5 | Feature Split, slider |
| `feature-4-mesones-tarapaca.jpg` | SEREMI, foto 2 | Feature Split, slider |
| `feature-5-estaciones-trabajo.jpg` | SEREMI, foto 22 | Feature Split, slider |
| `feature-6-sala-reuniones.jpg` | SEREMI, foto 1 | Feature Split, slider |
| `video-instalacion-faena.mp4` + poster | CMP, video 1 | About Split, botón de reproducción |

## 3. Mapeo de secciones (JSON → Del Carpio)

| Sección JSON | Implementación Del Carpio |
|---|---|
| Header | Reutiliza `Navigation` global existente. No se duplica. |
| Hero | Fondo: foto real de equipo técnico en faena (overlay ya estandarizado `rgba(16,24,32,0.94→0.16)`). Titular blanco + subtexto. Botón primario terracota → `/contacto/proyectos`. Botón secundario outline blanco → ancla a casos. Overlay: 2 tarjetas con cifras reales (proyectos SEREMI + CMP). Slider: crossfade funcional entre 2 fotos reales con flechas accesibles (no decorativo — respeta `prefers-reduced-motion` congelando en la primera foto). |
| About Split | Ver sección 1 para sustituciones. Lista de 6 ítems con checks terracota = alcance real (mobiliario, gases+alarma, extracción EAA, puertas/ventanas, instalación en faena, mantención). CTA negro (tinta) → `/contacto/proyectos`. |
| Feature Split | Panel izquierdo: slider de 6 fotos reales con flechas. Panel derecho: fondo sólido tinta `#4A5560` (sustituye "Solid Orange", ver sección 1), texto blanco, botón primario blanco + botón outline blanco, watermark SVG de líneas técnicas al 6% opacidad (mismo patrón de "textura sutil" ya usado en `Navigation`/`Footer`). |
| Services Intro | Subtítulo + heading a la izquierda; descripción + botón negro + link de texto a la derecha. Introduce el grid. |
| Services Grid | 4 columnas, iconos Phosphor en terracota (línea, no relleno): `Table` (mobiliario), `Siren` (líneas de gases con alarma), `Wind` (extracción EAA), `DoorOpen` (puertas y ventanas técnicas) — mapeo 1:1 con las categorías reales de las órdenes CMP. |

Cierre de página: banda CTA final consistente con el resto del sitio
(`servicios`, `nosotros`) — no forma parte del JSON pero es obligatoria por
"Una acción por sección" de `PRODUCT.md`.

## 4. Arquitectura técnica

- `src/app/proyectos/page.tsx` — Server Component con `metadata` (title,
  description, canonical) siguiendo el patrón de `src/app/servicios/page.tsx`.
- `src/app/proyectos/proyectos-page-client.tsx` — Client Component con
  `Reveal`, estado del slider de Hero, estado del slider de Feature Split y
  estado de reproducción de video (toggle imagen↔`<video controls>`).
- Contenedor `max-w-7xl` (igual que `/servicios`), no `max-w-site` (980px —
  reservado para páginas de formato editorial angosto).
- Iconografía: `@phosphor-icons/react/dist/ssr` para el grid de servicios
  (Server Component compatible); estado interactivo del slider vive solo en
  el client component.

## 5. Cambios de navegación (consecuencia directa)

El ítem de menú "Proyectos" apuntaba directamente a `/contacto/proyectos`
(formulario). Pasa a apuntar a `/proyectos` (esta página), que a su vez
enlaza al formulario como CTA. Esto es consistente con la prioridad de IA ya
declarada en `AGENTS.md`: *"Navegación prioriza Servicios y Proyectos de
laboratorio completo por sobre catálogo de productos"* — antes no existía
una página de aterrizaje real para ese concepto, solo un formulario. Se
actualiza en los 3 idiomas del sitio (`es`/`en`/`pt`) y en `sitemap.ts`.

## 6. Accesibilidad y motion

- Sliders con controles de flecha con `aria-label`, navegables por teclado,
  y `aria-live="polite"` en el contador de posición.
- Video: controles nativos, `poster`, sin autoplay forzado (se activa solo al
  click del usuario en el botón de reproducción).
- Todo `motion`/`AnimatePresence` respeta `useReducedMotion` (mismo patrón que
  `Reveal`).
- Contraste verificado: texto blanco sobre overlay Hero ≥ 4.5:1; texto blanco
  sobre `#4A5560` (Feature Split) ≥ 4.5:1 (ratio real ~7.6:1 según nota de
  `AGENTS.md` sobre el cambio de ink 2026-07-02).
