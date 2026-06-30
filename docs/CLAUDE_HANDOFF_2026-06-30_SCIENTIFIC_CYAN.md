# Prompt para Claude Code

```md
Retoma el proyecto Del Carpio 2.0 en:

C:\Users\cvillagran\Documents\Codex\2026-06-25\developer-message-rol-y-objetivo-act\sitio-industrial-quimico

Antes de trabajar corre:

& "C:\Program Files\Git\bin\bash.exe" -lc "cd /c/Users/cvillagran/Documents/Codex/2026-06-25/developer-message-rol-y-objetivo-act/sitio-industrial-quimico && ./sync-check.sh claude"

Luego lee:

- AGENTS.md
- .agent-log/sessions.md
- docs/fase1-auditoria-competencia.md
- docs/design/VISUAL_SYSTEM_SCIENTIFIC_CYAN.md
- docs/design/*

Contexto:

Christofer indicó el 2026-06-30 que la versión visual anterior no fue aprobada y pidió a Codex generar un nuevo sistema visual usando:

- Prompt de dirección Senior Product Design Engineer / Frontend Architect.
- Design JSON “SkilAB Scientific Corporate Landing Page”.
- Imagen de referencia `Laboratorio 1.jpeg`.

Codex implementó una nueva dirección visual en home, tomando la estructura de la referencia pero en español y con contenido real de Del Carpio:

- Navegación cian compacta.
- Hero fotográfico centrado con CTA rojo-naranja.
- Bloque de bienvenida en 3 columnas.
- Banda cian de servicios con íconos circulares.
- Bloque de tecnología/sectores.
- Capacidades técnicas.
- Franja de capacidades tipo logo strip.
- Formulario adaptado visualmente sin cambiar schema.
- Footer cian de contacto.

Archivos principales tocados:

- tailwind.config.ts
- src/app/globals.css
- src/app/layout.tsx
- src/components/ui/button.tsx
- src/components/sections/navigation.tsx
- src/components/sections/hero.tsx
- src/components/sections/trust-metrics.tsx
- src/components/sections/service-matrix.tsx
- src/components/sections/industry-tabs.tsx
- src/components/sections/compliance-band.tsx
- src/components/sections/lab-photos.tsx
- src/components/sections/contact-form.tsx
- src/components/sections/footer.tsx
- docs/design/VISUAL_SYSTEM_SCIENTIFIC_CYAN.md
- AGENTS.md

Tu tarea como Claude:

1. Revisa visualmente esta nueva dirección.
2. Decide si debe quedar como Fase 2 oficial del sistema visual o si requiere ajustes.
3. Si la apruebas, actualiza la documentación de Fase 2 y prepara specs de Fase 5 para que Codex extienda el sistema a `/servicios` y `/servicios/[slug]`.
4. Si no la apruebas, documenta exactamente qué falla: color, jerarquía, estructura, fotografía, copy, responsive o identidad.
5. No implementes código. Deja especificaciones claras para Codex.

Notas:

- Esta dirección reemplaza para la home la regla anterior de usar únicamente los tres colores del logo.
- El nuevo sistema usa cian `#10B6CF`, CTA `#F04A2A`, tipografías Montserrat + Open Sans.
- Codex verificó lint, build, navegador desktop/mobile, sin overflow horizontal y sin errores de consola.
```
