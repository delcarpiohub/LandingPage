# Prompt para Claude Code: Dirección Creativa Del Carpio 2.0 (Página de Contacto y Banner Corporativo)

Este documento contiene la especificación y el prompt para que Claude Code retome el proyecto, valide la nueva página de contacto corporativa y el banner de invitación y coordine los siguientes pasos.

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
Christofer ha solicitado implementar una nueva estructura de banner de invitación a contacto (ContactCTA) al pie de la Home Page, con fondo azul verdoso corporativo (#07465A), un botón de contorno blanco e ilustración vectorial en SVG (una persona ayudando a otra a subir sobre un bloque blanco).

Antigravity implementó el nuevo banner de invitación en /src/components/sections/contact-cta.tsx:
1. Banner Corporativo ContactCTA:
   - Fondo de color verde azulado sólido (#07465A).
   - Headline con tipografía semibold de 32px y botón outline blanco ("CONTACTE CON NOSOTROS") que transiciona a fondo blanco y texto verde azulado en hover, redirigiendo a /contacto.
   - Ilustración Vectorial en SVG: Representa a una persona en la cima de un bloque blanco 3D ayudando a otra a subir.
   - Animación en Hover: El anillo segmentado exterior rota 360°, el tirador realiza movimientos de tracción en el eje Y, y el escalador asciende con rebote.
   - Responsivo: Adapta las paddings en desktop (80px 120px), tablet (64px 48px) y mobile (56px 24px en dirección columna con textos centrados).
2. Página Principal /contacto/page.tsx:
   - Grilla de 2 columnas: izquierda con información de la oficina (Av. Sucre 2596, Ñuñoa, correo, teléfono, iconos sociales) y derecha con el listado de 4 casillas interactivas que linkean a las rutas específicas (/contacto/ventas, /contacto/tour-laboratorio, /contacto/proyectos, /contacto/otras-consultas).
3. Sección de Mapa (420px): Google Maps iframe full-width integrado al pie de la página, apuntando a la dirección física.
4. Formularios Dinámicos Específicos (/contacto/[tipo]/page.tsx & contact-client-page.tsx):
   - Fichas dinámicas disponibles, incorporando la consola de señal cromatográfica animada en la columna izquierda y el intake log en la columna derecha.

Archivos modificados y validados con build de Next.js OK:
- src/app/page.tsx (Reemplazo de componente)
- src/components/sections/contact-cta.tsx (Nuevo banner corporativo con ilustración interactiva)
- src/app/contacto/page.tsx (Página de contacto corporativa con casillas de consulta)
- src/app/contacto/[tipo]/page.tsx & contact-client-page.tsx (Fichas dinámicas específicas)

Tu tarea como Claude (Director Creativo):
1. Revisa visualmente el nuevo banner ContactCTA en la Home y las animaciones de la ilustración SVG en hover.
2. Asegura que Codex continúe con la Fase 5 para alinear las páginas de servicios utilizando esta misma pauta de consistencia corporativa y elegancia.
```
