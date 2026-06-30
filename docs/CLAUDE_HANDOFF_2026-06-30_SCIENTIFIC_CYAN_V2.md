# Prompt para Claude Code: Dirección Creativa Del Carpio 2.0 (Ajuste Final de Navegación, Tour 360 y Contacto)

Este documento contiene la especificación y el prompt para que Claude Code retome el proyecto, valide el diseño del Tour Virtual de Laboratorio y coordine los siguientes pasos.

```md
Retoma el proyecto Del Carpio 2.0 en:

C:\Users\cvillagran\Documents\Codex\2026-06-25\developer-message-rol-y-objetivo-act\sitio-industrial-quimico

Antes de trabajar corre:

& "C:\Program Files\Git\bin\bash.exe" -lc "cd /c/Users/cvillagran/Documents/Codex/2026-06-25/developer-message-rol-y-objetivo-act/sitio-industrial-quimico && ./sync-check.sh claude"

Luego lee:
- AGENTS.md
- .agent-log/sessions.md
- docs/fase2-v2-revision-color.md

Contexto de la última intervención (Antigravity - 30-06-2026):
Se ha elevado la experiencia visual del Tour Virtual de Laboratorio (/contacto/tour-laboratorio) con transiciones dinámicas de Framer Motion, spinner de carga terracota, guía de interacción de arrastre y un sidebar indicador de secciones mediante Intersection Observer.

Antigravity implementó y validó los cambios:
1. Arquitectura de Tour Virtual:
   - page.tsx actua como Server Component para SEO y metadata estática.
   - tour-laboratorio-client.tsx implementa las transiciones dinámicas del lado del cliente.
2. Efectos de UX Agregados:
   - Entrada de Página: El hero entra con fade-in y y: 20 -> 0 en 0.6s. El título tiene un delay de 0.2s.
   - Placeholder de Carga: Muestra un spinner terracota (#D5542B) sobre fondo Ink (#101820) con el texto "Cargando tour virtual..." en Open Sans mientras se lee la opacidad o estado del load-box de Pannellum.
   - Píldora Guía: Muestra "Arrastra para explorar" con icono HandPointing. Desaparece a los 4s o al primer mouseMove/touchStart sobre el contenedor.
   - Contador de Secciones: Sidebar lateral con tipografía mono que lee dinámicamente data-section en los wrappers, permitiendo un conteo automático (Sección 01/02, 02/02).
   - CTA Final: Envuelta en el componente <Reveal> para animación al scroll.
3. Copia de Recursos:
   - Se copiaron y renombraron los recursos en /public/tour/seccion1/: puerta-icp-oes.jpg, corredor-principal.jpg y letrero-analisis.jpg.
4. Reestructuración de links en /src/components/sections/navigation.tsx:
   - Las pestañas ahora son: Inicio, Productos, Proyectos, Nosotros y Contacto.
   - Integración del botón "Tour Virtual" en el extremo derecho de la barra en desktop, y en el dropdown móvil, apuntando a /contacto/tour-laboratorio de forma funcional.

Archivos modificados y validados con build de Next.js OK:
- src/app/contacto/tour-laboratorio/page.tsx (Página Server de Tour Virtual)
- src/components/tour/tour-laboratorio-client.tsx (Página Client con efectos avanzados)
- src/components/sections/navigation.tsx (Menú actualizado e integración de Tour Virtual)
- src/components/sections/trust-metrics.tsx (Anclaje id="nosotros")
- src/components/sections/hero.tsx (Ajustes de textos, zoom y modal en Hero)
- src/components/sections/contact-cta.tsx (Banner Ink de marca con spotlight e ilustración SVG)
- src/app/contacto/page.tsx (Página de contacto corporativa con casillas de consulta)

Tu tarea como Claude (Director Creativo):
1. Revisa visualmente la nueva página /contacto/tour-laboratorio, la nitidez del Hero al 40% de opacidad, las transiciones de entrada, el loader de Pannellum, la guía flotante y el contador.
2. Asegura que Codex continúe con la Fase 5 para alinear las páginas de servicios utilizando esta misma pauta de consistencia corporativa y elegancia.
```
