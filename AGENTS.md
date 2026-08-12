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

## Sync check en Windows
En Windows, si `bash` no está disponible en `PATH`, correr el sync check con
Git Bash en modo login para que cargue utilidades como `tail`:

```powershell
& "C:\Program Files\Git\bin\bash.exe" -lc "cd /c/Users/cvillagran/Documents/Codex/2026-06-25/developer-message-rol-y-objetivo-act/sitio-industrial-quimico && ./sync-check.sh codex"
```

Cambiar `codex` por `claude` según corresponda. El formato simple
`"C:\Program Files\Git\bin\bash.exe" sync-check.sh codex` puede arrancar, pero
falla porque no encuentra utilidades Unix como `tail`.

## Qué es este proyecto
Rediseño web de Del Carpio Análisis y Asesorías Ltda., empresa chilena de
instrumentación analítica (HPLC, GC) para los sectores de alimentos,
minería, farmacéutica, aguas, ambiental y academia/investigación. Stack: Next.js (App Router) + TypeScript + Tailwind +
Framer Motion. Detalle completo de arquitectura de información, sitemap y
decisiones de marca en `docs/hoja-de-ruta.md` (exportado desde el documento
Word de planificación).

## Reglas de marca y diseño (no improvisar fuera de esto)
- **Paleta de marca Del Carpio** (3 colores de marca + ink + secondary — regla sin excepción, para toda página y toda sección):
  - `#D6532B` terracota — color de acción: botones, CTAs, links activos. Siempre el mismo, sin excepciones. NO sustituir por ningún otro color en elementos interactivos. (Actualizado 2026-07-02, antes `#D5542B` — cambio aprobado por Marketing, diferencia imperceptible.)
  - `#53843A` verde oliva — color secundario de marca.
  - `#FBE369` amarillo — color terciario de marca.
  - `#4A5560` ink — navegación, fondos oscuros, texto principal oscuro. (Actualizado 2026-07-02, antes `#101820` — cambio aprobado por Marketing; pasa WCAG AA con texto blanco, ratio ~7.6:1.)
  - `#707E83` secondary — acento gris nuevo para badges, borders y elementos decorativos. Úsalo SOLO donde el texto encima sea oscuro (`#4A5560` o similar); NUNCA como fondo con texto blanco. Agregado 2026-07-02.
  - **Colores prohibidos sin excepción:** teal `#18b993` (error Codex jun-25, descartado), cian `#10B6CF` / `#079FB7` / `#52D3E6`, rojo-naranja `#F04A2A` / `#D93E22`, franja `#AFC5C7` — todos provenientes de la plantilla comercial "SkilAB", rechazados el 30-06-2026. Ver `docs/fase2-v2-revision-color.md`.
- **No usar Design JSON ni imágenes de referencia de fuentes externas no auditadas por Christofer o Claude** — ver caso SkilAB, 30-06-2026, como precedente de qué evitar.
- Tokens de color y tipografía: `tailwind.config.ts` — paletas `primary` / `ink` /
  `sector` / `secondary`. NO agregar colores fuera de estas paletas.
- Tipografía vigente desde el 2026-08-12: Manrope para títulos (h1-h4, peso
  700) + Inter para todo lo demás (párrafos, navegación, botones,
  formularios, etiquetas técnicas y datos tabulares, pesos 400-600). Dos
  familias máximo, roles estrictamente separados — no agregar una tercera.
  (Antes, 2026-07-03 a 2026-08-12: Montserrat como familia única en toda la
  interfaz; cambio revertido por Claude Code como Director Creativo, a
  partir de una referencia visual del cliente — bloque editorial estilo
  Abbott, sans-serif neo-grotesca/humanista — y confirmación explícita del
  cliente. Detalle completo en `DESIGN.md` sección 3.) Se mantienen
  descartadas Geologica, Geist y Azeret Mono.
- Navegación prioriza Servicios y Proyectos de laboratorio completo por
  sobre catálogo de productos. Conversión principal: formulario →
  `ventas@delcarpio.cl` (vía Resend, ver `src/app/api/contacto/route.ts`).
- Evitar patrones de "sitio genérico de IA": sin gradiente azul-morado, sin
  motion decorativo sin propósito. Detalle completo en `docs/hoja-de-ruta.md`.

## Modelo operativo obligatorio: Claude dirige, Codex implementa
Desde el 2026-06-26, este proyecto trabaja con separación estricta de roles.
No improvisar fuera de esta división.

- **Claude Code es el Director Creativo.** Define dirección visual, branding,
  layout, UX, narrativa, motion, contenido y arquitectura de experiencia.
  Claude produce especificaciones. Si Claude modifica una decisión de diseño,
  primero debe actualizar la documentación correspondiente (`AGENTS.md`,
  `DESIGN.md`, `PRODUCT.md` o una especificación nueva) antes de que Codex
  continúe.
- **Codex es el Principal Frontend Engineer.** Implementa exactamente las
  especificaciones documentadas por Claude. Codex no decide branding, layouts,
  UX, dirección visual ni arquitectura de experiencia. Si Codex detecta un
  problema de UX, branding, identidad, escalabilidad o arquitectura, debe
  detener la implementación y reportarlo para que Claude actualice la
  especificación antes de continuar.
- **La documentación gana.** Antes de escribir código, Codex debe leer toda la
  documentación vigente del proyecto: `AGENTS.md`, `DESIGN.md`, `PRODUCT.md`,
  `CLAUDE.md`, `.agent-log/sessions.md` y cualquier especificación nueva
  mencionada en la sesión. Si el chat contradice la documentación, se debe pedir
  actualización documental antes de implementar.
- **Claude nunca implementa. Codex nunca diseña.** Los cambios de código sin
  especificación previa se consideran bloqueo, no oportunidad para improvisar.

### Estándar de implementación para Codex
Cada componente, página o ajuste implementado por Codex debe ser:

- 100% responsive: desktop, laptop, tablet, mobile y ultrawide.
- Accesible: navegación por teclado, foco visible, semántica correcta y
  contraste WCAG 2.1 AA.
- SEO friendly: metadata, Open Graph, structured data cuando aplique y jerarquía
  semántica correcta.
- Optimizado: `next/image`, lazy loading, code splitting, tree shaking, Server
  Components por defecto y Client Components solo cuando sean necesarios.
- Modular y reutilizable: sin componentes enormes, sin duplicación, sin props
  innecesarias, sin `useEffect` o state innecesarios, sin magic numbers y sin
  Tailwind repetido de forma injustificada.

### Animación
Codex no inventa animaciones. Implementa exactamente lo especificado por Claude
usando la herramienta indicada o la más directa dentro del stack del proyecto:
Motion / Framer Motion, GSAP, ScrollTrigger, View Transitions, CSS variables,
`transform`, `opacity`, `blur`, `mask`, `clip-path` o `mix-blend-mode`.
Toda animación debe tener propósito UX documentado y respetar
`prefers-reduced-motion`.

### Checklist obligatorio antes de aprobar una sección
Claude y Codex deben verificar, cada uno desde su rol:

- ¿Se siente única?
- ¿Podría pertenecer a cualquier empresa? Si sí, no se aprueba.
- ¿Representa la identidad de Del Carpio?
- ¿Es memorable?
- ¿Es técnicamente sólida?
- ¿Es escalable?
- ¿Mantiene consistencia con el sistema de diseño?
- ¿Responde a un objetivo de negocio, experiencia de usuario o identidad visual?
- ¿Evita patrones genéricos y apariencia de sitio generado por IA?

Objetivo final: una experiencia digital capaz de competir con sitios de primer
nivel en instrumentación analítica e industria, con identidad propia, fotografía
real, motion sutil, excelente rendimiento y calidad visual de estudio premium,
sin copiar referencias específicas.

## REGLA DE COMMITS OBLIGATORIOS

1. **Después de CADA archivo modificado o creado** — no al final de la tarea, no cuando "termines todo" — correr:
   ```bash
   git add [archivo]
   git commit -m "descripción breve y específica del cambio"
   ```
   Preferir muchos commits pequeños a uno grande que agrupe todo. Si se tocan 3 archivos para una misma feature, son 3 commits (o 1 si son inseparables), nunca 10 cambios sin guardar.

2. **Antes de reportar "terminé" o finalizar la sesión**, correr SIEMPRE:
   ```bash
   git status
   ```
   Si aparece algo sin commitear, commitéalo antes de reportar que terminaste. Si la tarea quedó a medias, commitea igual con prefijo `wip: [qué falta]` — nunca dejes trabajo solo en el working directory.

3. **Al iniciar cualquier sesión nueva**, antes de tocar código, correr:
   ```bash
   git log --oneline -5
   ```
   y reportar qué fue lo último commiteado, para confirmar desde dónde se retoma.

4. **Si git falla por cualquier razón** (conflicto, permisos, etc.) — PARAR y avisar de inmediato. No seguir trabajando encima de cambios que no se pudieron guardar.

5. **Aislamiento y Rollback por Tarea (Paso a Paso)**:
   - Cada paso indicado por el usuario debe quedar completamente aislado en su propio commit de Git.
   - Si el usuario pide revertir ("volver atrás"), se deshará **únicamente la última tarea** (`git reset --hard HEAD~1` o `git revert HEAD --no-edit`), sin alterar cambios o sesiones anteriores.
   - Si existe ambigüedad sobre qué cambios pertenecen al último paso, **no adivinar**: pedir aclaración antes de revertir.
   - Antes de confirmar un paso como listo, verificar que sea reversible de forma independiente y que no afecte tareas previas.

