# Prompt para Claude Code: Dirección Creativa Del Carpio 2.0 (Ajuste Final de Navegación, Tour y Contacto)

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
Se ha creado la página del Tour Virtual de Laboratorio (/contacto/tour-laboratorio) con su primera sección maquetada de manera responsiva y alineada con la marca Del Carpio.

Antigravity implementó y validó los cambios:
1. Página de Tour Virtual (/src/app/contacto/tour-laboratorio/page.tsx):
   - Contiene la Sección 1 con el comentario: // SECCIÓN 1 — Entrada e Identidad del Laboratorio. Más secciones se agregan aquí a medida que lleguen las fotos.
   - Hero de Sección 1: Utiliza la foto principal de la puerta de ICP-OES (/tour/seccion1/puerta-icp-oes.jpg) con un overlay Ink de 40% de opacidad para mantener la visibilidad del equipamiento real interior.
   - Textos: Título "Laboratorio de Análisis" en Montserrat y subtítulo "AA · ICP-OES · ICP-MS" en Open Sans.
   - Galería de 2 columnas: muestra el pasillo principal (/tour/seccion1/corredor-principal.jpg) y el letrero (/tour/seccion1/letrero-analisis.jpg) con leyendas descriptivas detalladas.
   - CTA Inferior: Botón sólido terracota (#D5542B) "Solicitar visita técnica" enlazado a /contacto, sin usar legacyBehavior.
2. Copia de Recursos:
   - Se copiaron y renombraron los recursos en /public/tour/seccion1/: puerta-icp-oes.jpg, corredor-principal.jpg y letrero-analisis.jpg.
3. Reestructuración de links en /src/components/sections/navigation.tsx:
   - Las pestañas ahora son: Inicio, Productos, Proyectos, Nosotros y Contacto.
   - Integración del botón "Tour Virtual" en el extremo derecho de la barra en desktop, y en el dropdown móvil, apuntando a /contacto/tour-laboratorio de forma funcional.

Archivos modificados y validados con build de Next.js OK:
- src/app/contacto/tour-laboratorio/page.tsx (Nueva página del Tour Virtual Sección 1)
- src/components/sections/navigation.tsx (Menú actualizado e integración de Tour Virtual)
- src/components/sections/trust-metrics.tsx (Anclaje id="nosotros")
- src/components/sections/hero.tsx (Ajustes de textos, zoom y modal en Hero)
- src/components/sections/contact-cta.tsx (Banner Ink de marca con spotlight e ilustración SVG)
- src/app/contacto/page.tsx (Página de contacto corporativa con casillas de consulta)

Tu tarea como Claude (Director Creativo):
1. Revisa visualmente la nueva página /contacto/tour-laboratorio, la nitidez del Hero al 40% de opacidad y los enlaces de navegación.
2. Asegura que Codex continúe con la Fase 5 para alinear las páginas de servicios utilizando esta misma pauta de consistencia corporativa y elegancia.
```
