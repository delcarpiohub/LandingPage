# Especificación visual: Nosotros

Fecha: 2026-07-10  
Estado: aprobada por autorización directa del usuario  
Ruta: `/nosotros`

## Dirección

Página corporativa B2B para responsables de laboratorio. La dirección combina el carácter documental de Del Carpio con una composición editorial limpia: fotografía real, tipografía Montserrat, superficies planas, un solo color de acción y movimiento discreto.

La referencia comercial se usa únicamente para reconocer su estructura narrativa. No se replican su hero centrado, sus tarjetas superpuestas, su franja de métricas, sus pestañas visuales ni sus testimonios ficticios.

## Diales

- `DESIGN_VARIANCE: 4`: composición institucional con asimetría contenida.
- `MOTION_INTENSITY: 3`: entradas por opacidad y desplazamiento corto; sin parallax ni loops.
- `VISUAL_DENSITY: 4`: lectura empresarial compacta, sin convertir cada bloque en una tarjeta.

## Identidad bloqueada

- Tipografía única: Montserrat.
- Acción: `#D6532B`.
- Secundario: `#53843A`.
- Terciario: `#FBE369`.
- Tinta: `#4A5560`.
- Gris secundario: `#707E83`.
- Tema único claro, con hero y cierre en tinta para contraste estructural.
- Fotografías reales existentes en `public/fotos/`; no usar imágenes sintéticas en producción.

## Estructura

1. Hero institucional compacto con fotografía a sangre y titular lateral.
2. Historia en split layout con galería documental superpuesta y dato de 31 años.
3. Franja de tres hechos verificables: experiencia, cobertura y alcance.
4. Misión y visión en tabs accesibles, con fotografía documental lateral.
5. Propuesta de valor y alcance de principio a fin con jerarquía contenida.
6. Cierre corporativo con una sola acción hacia `/contacto`.

## Responsive

- Desktop: grillas asimétricas de 12 columnas.
- Tablet: grillas de dos columnas cuando el contenido conserva lectura.
- Mobile: orden narrativo en una columna, texto antes que soporte visual excepto en misión/visión.
- Titulares fluidos con `clamp`; imágenes con alturas acotadas para evitar saltos de layout.

## Movimiento y accesibilidad

- Usar únicamente el componente `Reveal` existente.
- Animar solo `opacity` y `transform`.
- Respetar `prefers-reduced-motion`.
- Tabs con `role=tablist`, `role=tab`, `aria-selected` y panel asociado.
- Foco visible, contraste WCAG AA y targets táctiles mínimos de 44 px.
