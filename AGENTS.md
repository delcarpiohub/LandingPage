<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Del Carpio — Estado del proyecto (fuente única de verdad)

> Este archivo lo lee tanto Codex como Claude Code al iniciar sesión en este
> repo. Si estás leyendo esto como agente de IA: antes de escribir o modificar
> código, lee también `.agent-log/sessions.md` (las últimas 3 entradas) y
> corre `git log --oneline -10` para ver qué cambió desde la última vez que
> trabajaste aquí. Si el último cambio NO lo hiciste tú, haz code review
> explícito de ese cambio antes de seguir construyendo sobre él — ver sección
> "Protocolo de code review cruzado" más abajo.

## Qué es este proyecto
Rediseño web de Del Carpio Análisis y Asesorías Ltda., empresa chilena de
instrumentación analítica (HPLC, GC) para los sectores de alimentos,
minería, farmacéutica, aguas, ambiental y academia/investigación. Stack: Next.js (App Router) + TypeScript + Tailwind +
Framer Motion. Detalle completo de arquitectura de información, sitemap y
decisiones de marca en `docs/hoja-de-ruta.md` (exportado desde el documento
Word de planificación).

## Reglas de marca y diseño (no improvisar fuera de esto)
- **Colores reales del logo Del Carpio** (3 colores de marca + neutros):
  - `#D5542B` terracota — color de acción: botones, CTAs, links. Siempre el mismo,
    sin excepciones. NO sustituir por ningún otro color en elementos interactivos.
  - `#53843A` verde oliva — color secundario de marca.
  - `#FBE369` amarillo — color terciario de marca.
  - NO usar verde teal (#18b993) ni ningún color fuera de esta paleta. El teal fue
    un error de la iteración inicial de Codex — está descartado.
- Tokens de color y tipografía: `tailwind.config.ts` — paletas `primary` / `ink` /
  `sector`. NO agregar colores fuera de estas paletas.
- Tipografía: Space Grotesk (display, h1-h4), Inter (body/párrafos). Inter está
  permitido solo en body — nunca en títulos.
- Navegación prioriza Servicios y Proyectos de laboratorio completo por
  sobre catálogo de productos. Conversión principal: formulario →
  `ventas@delcarpio.cl` (vía Resend, ver `src/app/api/contacto/route.ts`).
- Evitar patrones de "sitio genérico de IA": sin gradiente azul-morado, sin
  motion decorativo sin propósito. Detalle completo en `docs/hoja-de-ruta.md`.

## División de responsabilidad sugerida (ajustar según uso real)
- **Claude Code**: componentes UI, sistema de diseño, copy, revisión de
  consistencia visual contra Figma.
- **Codex**: lógica de backend (API routes), validación, testing, scripts
  de build/deploy, refactors estructurales.
- Esta división es una sugerencia de partida, no es una regla
