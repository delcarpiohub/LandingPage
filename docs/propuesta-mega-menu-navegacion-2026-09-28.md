# Propuesta de mapeo para el mega-menú de navegación

**Estado:** Fase 1 aprobada por Christofer el 28-09-2026; Fase 2 autorizada. Este documento registra el mapeo aprobado y los conteos que debe respetar la implementación.

## Hallazgo que condiciona el diseño

El catálogo contiene **112 fichas** en `mockProducts`. Las seis páginas de industria tienen **61 asociaciones** en `compatibleEquipmentSlugs`, pero corresponden a solo **35 productos distintos**: **77 fichas no están asociadas a ninguna industria**. Por ello, seis pestañas sectoriales no permiten navegar el catálogo completo. Las categorías temáticas de `industries[].productCategories` tampoco son un inventario de productos compatibles; la asociación producto-industria auditada está en `solutionPages`.

Además, la barra que se reemplazaría está en `src/components/sections/navigation.tsx`, debajo de la navegación principal y visible en escritorio antes de desplazarse. `/soluciones` muestra seis tarjetas de industria, no esa barra plana. El encabezado «Productos» ya tiene un desplegable por categorías que enlaza al catálogo, aunque no enumera sus 112 fichas. La Fase 2 debe resolver esta convivencia sin retirar los accesos existentes.

## Inventario real (corte del 28-09-2026)

**Industrias:** Alimentos (`/soluciones/alimentos`), Minería (`/soluciones/mineria`), Farmacéutica (`/soluciones/farmaceutica`), Aguas (`/soluciones/aguas`), Ambiental (`/soluciones/ambiental`) y Academia / I+D (`/soluciones/academia-id`).

Las siguientes son las **12 categorías primarias** (`product.category`), mutuamente excluyentes en este inventario. La columna de marcas enumera las que tienen fichas en cada categoría; el número entre paréntesis es el número de fichas.

| Categoría primaria | Fichas | Marcas con fichas |
| --- | ---: | --- |
| Preparación de muestras | 25 | Decent (10), Hanon (6), Thermo Scientific (3), ColdBlock (3), Milestone (1), Restek (1), Infitek (1) |
| Análisis elemental | 19 | Hanon (9), Thermo Scientific (6), Trace Elemental (2), EuroVector (1), Skalar (1) |
| Espectrometría de masa | 13 | Thermo Scientific (13) |
| Cromatografía | 9 | Thermo Scientific (6), Restek (3) |
| Fire Assay | 8 | Decent (8) |
| Purificadores de agua | 8 | Hyperpurex (8) |
| Área farmacéutica | 7 | Distek (6), Thermo Scientific (1) |
| Equipamiento menor | 7 | Infitek (7) |
| Análisis de agua | 6 | Infitek (3), Skalar (2), Thermo Scientific (1) |
| Automatización | 5 | Trace Elemental (2), Skalar (2), Thermo Scientific (1) |
| Bioprocesos | 4 | Distek (4) |
| Equipamiento analítico | 1 | Infitek (1) |

**Marcas representadas (12):** Thermo Scientific (31), Decent (18), Hanon (15), Infitek (12), Distek (10), Hyperpurex (8), Skalar (5), Restek (4), Trace Elemental (4), ColdBlock (3), Milestone (1) y EuroVector (1). Todas las fichas tienen `detail.brand`.

`productFilters` contiene además los filtros **Minería** y **Trace Elemental**, con 19 y 4 coincidencias respectivamente, pero ninguno es categoría primaria de una ficha. Otros filtros también se superponen; por ejemplo, Automatización devuelve 32 fichas aunque solo 5 tienen esa categoría primaria. Usarlos como sub-pestañas junto a las categorías primarias repetiría productos y distorsionaría los recuentos. «Marcas» es un filtro de navegación, no una categoría técnica.

## Mapeo propuesto de los tres niveles

1. **Nivel 1 — ámbito:** siete pestañas: **Catálogo completo** (`/productos`) y las seis industrias reales. «Catálogo completo» es una entrada de navegación hacia una página existente, no una categoría inventada. Su panel cubre las 112 fichas; los paneles sectoriales muestran solo las asociaciones auditadas. Las pestañas sectoriales conservan enlaces directos a sus páginas `/soluciones/[industria]`.
2. **Nivel 2 — categoría técnica:** `product.category` de las fichas del ámbito activo. El catálogo completo tiene las 12 categorías de la tabla anterior; cada sector muestra solo las categorías con productos asociados, nunca las categorías temáticas vacías de `industries[].productCategories`. La fila de 12 categorías del catálogo completo necesita un tratamiento adaptable (desplazamiento horizontal accesible o varias líneas), sin crear familias nuevas solo para llenar la interfaz.
3. **Nivel 3 — panel de dos columnas:** izquierda, marcas `detail.brand` presentes en la combinación ámbito + categoría; derecha, nombres y enlaces de las fichas de esa marca. Los nombres son `product.name`. Para una sola marca, la columna izquierda quedaría con una única opción; recomiendo compactarla visualmente y dar el espacio a la lista de productos, manteniendo la misma lógica de selección. No se crean subcategorías que hoy no existen en los datos.

**Ejemplo completo y real:** Alimentos → Preparación de muestras (5 referencias) → marcas Hanon (3), Infitek (1) y Decent (1). Al seleccionar **Hanon**, la columna derecha muestra [Extractor Soxhlet automático SOX606](/productos/hanon-sox606), [Analizador de grasa SOX406](/productos/hanon-sox406) y [Digestor Kjeldahl bloque de grafito SH220F](/productos/hanon-sh220f). Con **Infitek** muestra [Liofilizador LYO60B](/productos/infitek-lyo60b-series); con **Decent**, [Mezclador tipo V DVM](/productos/decent-mezclador-tipo-v). La otra sub-pestaña de Alimentos es Análisis elemental (6 referencias Hanon).

## Densidad real de las ramas sectoriales

| Nivel 1 | Referencias | Nivel 2 disponible desde asociaciones auditadas | Ramas especialmente escasas |
| --- | ---: | --- | --- |
| Alimentos | 11 | Análisis elemental 6; Preparación de muestras 5 | Preparación → Infitek 1 y Decent 1; Análisis elemental solo Hanon |
| Minería | 17 | Fire Assay 8; Preparación de muestras 9 | Ambas categorías solo Decent |
| Farmacéutica | 7 | Análisis elemental 4; Preparación de muestras 2; Equipamiento menor 1 | Preparación → Hanon 1 y Decent 1; Equipamiento menor → Infitek 1 |
| Aguas | 5 | Análisis de agua 2; Análisis elemental 2; Preparación de muestras 1 | Análisis elemental → Trace Elemental 1 y Hanon 1; Preparación → Milestone 1 |
| Ambiental | 14 | Análisis elemental 8; Preparación de muestras 3; Automatización 1; Análisis de agua 2 | Automatización → Trace Elemental 1; Preparación → Milestone 1 |
| Academia / I+D | 7 | Análisis elemental 1; Automatización 2; Análisis de agua 2; Preparación de muestras 2 | Análisis elemental → Hanon 1; las demás categorías tienen una sola marca |

En la lista temática actual de `industries[].productCategories`, **15 de 22 combinaciones sector-categoría no contienen ninguna ficha de la asociación auditada**. Ejemplos: Farmacéutica tiene como temas Área farmacéutica, Cromatografía y Espectrometría de masa, pero sus siete productos asociados tienen categorías primarias Análisis elemental, Preparación de muestras y Equipamiento menor. Minería incluye el tema «Minería» pero ninguno de sus 17 productos tiene esa categoría primaria. Mostrar las pestañas temáticas sin revisar la relación con el producto produciría paneles vacíos; asignar fichas por coincidencia de filtro o por intuición requeriría otra auditoría de compatibilidad.

## Decisiones para la aprobación

- **Recomendación:** aprobar el ámbito «Catálogo completo + seis industrias» y usar categoría primaria → marca → ficha. Es la única opción basada en las asociaciones existentes que permite acceder a las 112 fichas sin atribuir artificialmente 77 productos a un sector.
- Confirmar si las categorías con una sola marca deben compactar la columna izquierda, como se recomienda arriba, o mantener dos columnas uniformes aunque una resulte casi vacía.
- El desplegable actual de «Productos» ya enlaza a categorías y seguirá funcionando en esta fase. Decidir en la implementación si se conserva como acceso rápido o se simplifica para evitar dos exploradores de catálogo en la misma cabecera.
- Para móvil se propone un acordeón progresivo ámbito → categoría → marca → enlaces, conservando acceso directo a `/productos` y `/soluciones/[industria]`. La interacción y el foco se concretarán en la Fase 2 tras aprobar este mapeo.

## Fuentes y límite de esta fase

Conteos extraídos del código actual, sin inferencias comerciales: `src/lib/mock-products.ts` (`mockProducts`, `productFilters`, `product.category`, `detail.brand`), `src/content/site.ts` (`industries`) y `src/content/solution-pages.ts` (`compatibleEquipmentSlugs`). Las rutas de ficha deben respetar las rutas existentes, incluidas las páginas dedicadas de Restek. La Fase 1 no incluyó cambios de código; la aprobación posterior de Christofer habilitó la Fase 2.
