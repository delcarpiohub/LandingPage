# Prompt para Claude Code: Dirección Creativa Del Carpio 2.0 (Ajuste Final de Navegación, Tour 360 Depurado y Contacto)

Este documento contiene la especificación y el prompt para que Claude Code retome el proyecto, valide el diseño simplificado del Tour Virtual de Laboratorio y coordine los siguientes pasos.

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
Se ha simplificado la estructura del Tour Virtual de Laboratorio (/contacto/tour-laboratorio) removiendo las fotos fijas y depurando controles innecesarios o marcas externas del visor 360° Pannellum.

Antigravity implementó y validó los cambios:
1. Simplificación del Layout en /src/components/tour/tour-laboratorio-client.tsx:
   - Se removió por completo la sección superior de Hero (imagen de puerta) y la sección inferior de Galería de 2 imágenes fijas.
   - La página ahora solo renderiza el Visor 360° directo en su única sección (data-section="1"), el CTA de contacto final y el footer.
2. Depuración de Controles en /src/components/tour/panorama-viewer.tsx:
   - Se eliminó el subtítulo "AA · ICP-OES · ICP-MS" bajo el título del encabezado.
   - En la esquina superior derecha del visor, se removieron los botones de Configuración (engranaje) y Ayuda (pregunta), dejando únicamente el botón de Cierre (X).
   - Se removió por completo el botón flotante central de cruz (+).
   - En la barra de navegación inferior del visor, se eliminaron los accesos "Vista 3D", "Plano", "Capas" y "Medición", manteniendo únicamente el botón activo de "Recorrido".
3. Transiciones y Carga:
   - Se mantiene el loader con fondo Ink (#101820), spinner terracota (#D5542B) y la instrucción "Arrastra para explorar" animada.

Archivos modificados y validados con build de Next.js OK:
- src/components/tour/panorama-viewer.tsx (Visor depurado de botones y subtítulo)
- src/components/tour/tour-laboratorio-client.tsx (Layout simplificado de visor 360 únicamente)
- src/app/contacto/tour-laboratorio/page.tsx (Página Server de Tour Virtual)
- src/components/sections/navigation.tsx (Menú actualizado e integración de Tour Virtual)

Tu tarea como Claude (Director Creativo):
1. Revisa visualmente el visor 360° en /contacto/tour-laboratorio y confirma que se muestre directamente el título de análisis, el visor limpio de controles secundarios y el CTA inferior.
2. Asegura que Codex continúe con la Fase 5 para alinear las páginas de servicios utilizando esta misma pauta de consistencia corporativa y elegancia.
```
