# Sistema visual Scientific Cyan

Fecha: 2026-06-30  
Estado: implementado en home como nueva dirección visual solicitada por Christofer.

## Origen de la dirección

La versión visual anterior no fue aprobada. El nuevo sistema toma como guía tres insumos entregados por el usuario:

- Prompt de dirección: sitio corporativo científico, limpio, profesional, técnico, de confianza.
- Design JSON: estructura tipo SkilAB con navegación cian, hero fotográfico, bloque de bienvenida, banda cian de servicios, bloque de tecnología/conocimiento, franja de capacidades y footer cian.
- Imagen de referencia: landing científica con fotografía de laboratorio, grandes bloques cian, CTA rojo-naranja y mucho espacio blanco.

No se copió contenido de la referencia. Se adaptó la estructura a Del Carpio, en español y usando fotografías reales ya presentes en `public/fotos/`.

## Lectura de diseño

Sitio corporativo científico para compradores técnicos de laboratorio e industria. Debe sentirse más claro, clínico y directo que la versión anterior, con menos densidad editorial y más estructura visual clásica de laboratorio.

## Tokens principales

| Token | Valor | Uso |
| --- | --- | --- |
| `--science-cyan` | `#10B6CF` | Navegación, bandas principales, footer |
| `--science-cyan-dark` | `#079FB7` | Estados, texto destacado, contraste |
| `--science-cyan-light` | `#52D3E6` | Círculos de íconos y apoyos visuales |
| `--science-strip` | `#AFC5C7` | Franja de capacidades |
| `--accent` | `#F04A2A` | CTA, navegación activa, controles |
| `--accent-strong` | `#D93E22` | Hover CTA |
| `--background` | `#F4F4F4` | Fondo general |
| `--foreground` | `#333333` | Texto principal |

## Tipografía

- Display: `Montserrat`, para hero, navegación, títulos, botones y labels de alto impacto.
- Body: `Open Sans`, para párrafos, formularios y texto técnico.
- Mono: `Azeret Mono`, se mantiene para usos técnicos puntuales si hace falta.

La escala sigue la referencia: titulares grandes pero no cinematográficos. El hero usa una escala cercana a 44px en desktop, no 80px.

## Estructura implementada en home

1. Navegación cian compacta, 58px alto, menú desktop en uppercase y menú móvil con botón.
2. Hero fotográfico con contenido centrado, claim en español y CTA rojo-naranja.
3. Bloque de bienvenida en tres columnas: foto real, headline rojo/cian y explicación técnica.
4. Banda cian de servicios con cuatro íconos circulares y links a servicios.
5. Bloque tecnología/sectores en dos columnas.
6. Bloque de capacidades técnicas con tarjetas limpias.
7. Franja de capacidades tipo logo strip: HPLC, GC, ICP-OES, IQ/OQ/PQ, ISO 17025, Soporte.
8. Formulario adaptado al sistema sin cambiar schema ni campos.
9. Footer cian de contacto en tres columnas.

## Reglas de implementación

- Mantener español en toda la UI.
- Mantener fotografías reales de Del Carpio.
- No usar imágenes de stock ni personas generadas.
- No usar gradientes morados, glassmorphism, sombras pesadas o cards con estética SaaS.
- Radio bajo: `2px` en controles, `4px` en tarjetas.
- CTA principal siempre rojo-naranja.
- Grandes bloques cian son permitidos y forman parte de la nueva dirección aprobada.
- No modificar campos del formulario sin aprobación porque impacta operación y Resend.

## Pendiente para Claude

Claude debe revisar si esta dirección pasa a ser sistema completo para todas las páginas o si queda como exploración de home. Si se aprueba, debe actualizar Fase 2 y Fase 5 con specs para `/servicios` y detalles.
