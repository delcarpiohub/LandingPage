# Plantilla editorial para Soluciones por Industria

Fecha: 2026-08-12

## Alcance aprobado

Esta plantilla se aplica a las rutas existentes:

- `/soluciones/alimentos`
- `/soluciones/mineria`
- `/soluciones/farmaceutica`
- `/soluciones/aguas`
- `/soluciones/ambiental`
- `/soluciones/academia-id`

La ruta existente usa `academia-id`; no se crea una variante adicional de URL.

## Fuente de contenido

`src/content/site.ts` es la fuente de verdad para el nombre, la descripción y
las categorías de producto asociadas a cada industria. El mapeo de categorías
fue aprobado editorialmente el 2026-08-12 y no afirma compatibilidad individual
producto-industria.

Las fotografías permitidas están en `public/fotos/industrias/`. Hay fotografías
sectoriales para Alimentos, Minería, Farmacéutica, Ambiental y Academia / I+D.
No existe una fotografía específica aprobada para Aguas: esa ruta muestra un
panel de áreas técnicas en vez de reutilizar una imagen de otro sector.

## Servicios por industria

`coreServices` contiene servicios reales del sitio, pero no hay una asignación
confirmada entre cada servicio y una industria. Por integridad de contenido,
la plantilla soporta una lista de servicios por industria y no la publica hasta
recibir esa asignación validada. Al completar el dato se configura en
`src/content/solution-pages.ts`.

## Sistema de secciones

1. Breadcrumb de contexto.
2. Hero editorial dividido: cinco columnas de contenido y siete de medio en
   escritorio; texto antes del medio en móvil.
3. Contexto técnico en dos columnas, con categorías reales como metadatos.
4. Lista editorial numerada de servicios, solo cuando existan datos confirmados.
5. Curaduría asimétrica de equipamiento sin duplicar imágenes.
6. Franja de consulta técnica alineada a la izquierda.
7. Footer actual sin cambios de contenido.

## Motion y accesibilidad

Los reveals usan opacidad y un desplazamiento máximo de 12 px durante 240 ms.
Se eliminan por completo cuando `prefers-reduced-motion` está activo. Los
enlaces conservan foco visible y los CTAs mantienen áreas táctiles de al menos
44 px.
