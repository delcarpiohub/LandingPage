# Fichas en borrador — estado 2026-11-02 (actualizado 2026-11-03)

Todas las fichas con `status: "borrador"` en `src/lib/mock-products.ts` hoy
(rama `exp/import-productos`). Están fuera de `publishedProducts` — no
aparecen en catálogo, sitemap ni buscador; solo son accesibles por URL
directa. 37 fichas en total: 8 Decent, 12 Milestone, 6 Trace Elemental,
4 Distek, 7 Sievers.

"Specs" = `comparisonSpecs.length` + specs de todos los `comparisonTiers`
(tipo B) sumados. "Imágenes" = portada (`imageUrl`) + `descriptionImages`.
Ninguna de las 37 tiene PDF/ficha técnica adjunta (`documents` vacío) — por
eso "sin PDF" se repite en todas; la columna "pendiente" agrega lo
específico de cada una además de eso.

## Decent (8)

| Slug | Nombre | URL local | Specs | Imágenes | Pendiente |
|---|---|---|---|---|---|
| `decent-horno-secado-electrico` | Hornos de secado eléctricos DDO | http://localhost:3000/productos/decent-horno-secado-electrico | 40 | 4 | sin PDF |
| `decent-horno-secado-gas` | Hornos de secado a gas DDO | http://localhost:3000/productos/decent-horno-secado-gas | 33 | 4 | sin PDF |
| `decent-djrc80-trituradora-divisor` | DJRC80 Trituradora de mandíbulas con divisor rotatorio | http://localhost:3000/productos/decent-djrc80-trituradora-divisor | 7 | 2 | sin PDF |
| `decent-molino-pulverizador-dp2000` | Molino pulverizador DP2000 | http://localhost:3000/productos/decent-molino-pulverizador-dp2000 | 11 | 2 | sin PDF |
| `decent-molino-pulverizador-dpm1000` | Molino pulverizador DPM1000 | http://localhost:3000/productos/decent-molino-pulverizador-dpm1000 | 10 | 4 | sin PDF |
| `decent-recipientes-pulverizacion` | Recipientes de pulverización (ollas) DB | http://localhost:3000/productos/decent-recipientes-pulverizacion | 45 | 2 | sin PDF |
| `decent-laboratorio-movil-ensayo-fuego` | Laboratorio móvil contenedorizado para ensayo por fuego | http://localhost:3000/productos/decent-laboratorio-movil-ensayo-fuego | 4 | 4 | sin PDF; specs escasas |
| `decent-laboratorio-movil-preparacion-muestras` | Laboratorio móvil contenedorizado de preparación de muestras | http://localhost:3000/productos/decent-laboratorio-movil-preparacion-muestras | 4 | 5 | sin PDF; specs escasas |

## Milestone (12)

Notas tomadas de `data/import/milestone-lote-01-notas.csv` (revisión humana
ya hecha al importar este lote), condensadas.

| Slug | Nombre | URL local | Specs | Imágenes | Pendiente |
|---|---|---|---|---|---|
| `milestone-ethos-easy` | Sistema de digestión por microondas ETHOS EASY | http://localhost:3000/productos/milestone-ethos-easy | 4 | 1 | sin PDF/brochure; sin potencia, rotores ni dimensiones (ni en WP ni verificado en el sitio del fabricante) |
| `milestone-ethos-lean` | Sistema de digestión por microondas compacto ETHOS LEAN | http://localhost:3000/productos/milestone-ethos-lean | 5 | 1 | sin PDF; sin potencia, rotores ni dimensiones (sitio del fabricante bloquea lectura automática, pendiente revisión a mano) |
| `milestone-ethos-x` | Sistema de extracción por microondas ETHOS X | http://localhost:3000/productos/milestone-ethos-x | 6 | 1 | sin PDF; sin potencia ni dimensiones |
| `milestone-ethos-x-2-0` | Sistema de extracción por microondas ETHOS X 2.0 | http://localhost:3000/productos/milestone-ethos-x-2-0 | 4 | 1 | sin PDF; sin potencia de microondas ni dimensiones |
| `milestone-ethos-xl` | Sistema de extracción por microondas ETHOS XL | http://localhost:3000/productos/milestone-ethos-xl | 3 | 1 | sin PDF; specs escasas (solo 3), sin capacidad de tambor, potencia ni dimensiones |
| `milestone-dma-80-evo-tricell` | Analizador directo de mercurio DMA-80 evo Tricell | http://localhost:3000/productos/milestone-dma-80-evo-tricell | 4 | 1 | sin PDF; conflicto de dato entre fuentes (tiempo de análisis: WP dice 6 min, sitio oficial dice 5 min — no se publicó ninguno), sin límite de detección ni rango de trabajo |
| `milestone-insertos-ultra-trazas` | Insertos para análisis de ultra trazas con bajos niveles de blanco | http://localhost:3000/productos/milestone-insertos-ultra-trazas | 3 | 1 | sin PDF; specs escasas, accesorio sin códigos de modelo ni medidas por tamaño (evaluar tipo B si hay varios tamaños reales) |
| `milestone-duopur-subpur` | Sistema de destilación por sub-ebullición duoPUR y subPUR | http://localhost:3000/productos/milestone-duopur-subpur | 6 | 1 | sin PDF; sin datos separados para subPUR (solo hay specs de duoPUR) |
| `milestone-easyfill` | Estación de dosificación automatizada easyFILL | http://localhost:3000/productos/milestone-easyfill | 1 | 1 | sin PDF; specs escasas — WP solo trae 643 caracteres, falta prácticamente todo dato numérico |
| `milestone-ultraclave` | Sistema de digestión por microondas ultraCLAVE | http://localhost:3000/productos/milestone-ultraclave | 6 | 1 | sin PDF; sin potencia, dimensiones ni alimentación |
| `milestone-ultrawave` | Sistema de digestión por microondas ultraWAVE | http://localhost:3000/productos/milestone-ultrawave | 3 | 1 | sin PDF; specs escasas, sin temperatura ni presión máximas |
| `milestone-ultrawave-3` | Sistema de digestión por microondas ultraWAVE 3 | http://localhost:3000/productos/milestone-ultrawave-3 | 7 | 1 | sin PDF; sitio oficial no da temperatura ni presión máximas ni potencia |

## Trace Elemental (6)

Importadas 2026-11-02 desde `trace-elemental-lote-01-manual.csv` (commit
`7719c98`).

| Slug | Nombre | URL local | Specs | Imágenes | Pendiente |
|---|---|---|---|---|---|
| `te-instruments-tuscan` | Muestreador automático de columnas TUSCAN AOX/TOX | http://localhost:3000/productos/te-instruments-tuscan | 6 | 1 | sin PDF |
| `te-instruments-xpert-toc-tnb` | Analizador TOC/TNb Xpert | http://localhost:3000/productos/te-instruments-xpert-toc-tnb | 5 | 1 | sin PDF |
| `te-instruments-xplorer-s` | Analizador de azufre total Xplorer-S | http://localhost:3000/productos/te-instruments-xplorer-s | 5 | 1 | sin PDF |
| `te-instruments-xplorer-tx-ts` | Analizador de cloruro y azufre total Xplorer TX/TS | http://localhost:3000/productos/te-instruments-xplorer-tx-ts | 5 | 1 | sin PDF |
| `te-instruments-xplorer-ns` | Analizador de nitrógeno y azufre total Xplorer-NS | http://localhost:3000/productos/te-instruments-xplorer-ns | 7 | 1 | sin PDF |
| `te-instruments-xplorer-v-ns` | Analizador vertical de nitrógeno y azufre Xplorer-V NS | http://localhost:3000/productos/te-instruments-xplorer-v-ns | 8 | 1 | sin PDF |

## Distek (4)

Importadas 2026-11-02 desde `distek-lote-01-manual.csv` (commit `37669c0`).

| Slug | Nombre | URL local | Specs | Imágenes | Pendiente |
|---|---|---|---|---|---|
| `distek-sensir-3200` | Probador de desintegración sin baño sensIR 3200 | http://localhost:3000/productos/distek-sensir-3200 | 5 | 3 | sin PDF |
| `distek-small-volume` | Kit de conversión de volumen pequeño Small Volume | http://localhost:3000/productos/distek-small-volume | 3 | 6 | sin PDF; specs escasas |
| `distek-2500-rtd` | Sistema de disolución en baño de agua 2500 RTD | http://localhost:3000/productos/distek-2500-rtd | 5 | 6 | sin PDF |
| `distek-2500` | Sistema de disolución en baño de agua 2500 | http://localhost:3000/productos/distek-2500 | 4 | 5 | sin PDF; specs escasas |

## Sievers (7)

Importadas 2026-11-03 desde `sievers-lote-01-v2.csv` (versión corregida de
`sievers-lote-01.csv`, revisión humana en `sievers-lote-01-v2-cambios.csv`;
commit `19e3cbe`). Forzadas a borrador con `--as-borrador` aunque el
checklist de completitud pasó para las 7 (specs e imagen de portada
completas) — el borrador es por los pendientes de verificación de datos
listados abajo, no por falta de campos. Marca "Sievers" y categoría
"Análisis de agua" ya existían en el catálogo (3 fichas Sievers M5310 C
publicadas); no se creó marca ni categoría nueva.

| Slug | Nombre | URL local | Specs | Imágenes | Pendiente |
|---|---|---|---|---|---|
| `sievers-toc-r3` | Analizador de carbono orgánico total en línea Sievers TOC-R3 | http://localhost:3000/productos/sievers-toc-r3 | 29 | 1 | sin PDF; spec espuria eliminada ("diámetro interior (ID) más pequeño = 2 mm..." — fragmento cortado de otra fila del WP, verificar en ficha del fabricante y re-agregar con etiqueta correcta); "OPC DOS" probable error de traducción de "OPC DA"/"OPC UA" (Salidas dice OPC UA), dejado igual hasta verificar |
| `sievers-innovox` | Analizador de TOC en línea Sievers InnovOx | http://localhost:3000/productos/sievers-innovox | 22 | 1 | sin PDF; "Linealidad R2 ≥0,995" y "LOD <50 ppb" vienen del WP y no están en la ficha oficial, conservados pendientes de verificar; feature "Ejecute hasta cinco secuencias de muestra" viene del WP y no figura en la ficha técnica, verificar |
| `sievers-innovox-es` | Analizador de carbono orgánico total de laboratorio Sievers InnovOx ES | http://localhost:3000/productos/sievers-innovox-es | 25 | 1 | sin PDF |
| `sievers-checkpoint` | CheckPoint Sensor de TOC portátil / en línea Sievers | http://localhost:3000/productos/sievers-checkpoint | 26 | 1 | sin PDF |
| `sievers-m500e` | Analizador de TOC en línea Sievers M500e | http://localhost:3000/productos/sievers-m500e | 33 | 1 | sin PDF; specs idénticas a las del M500 y misma imagen (`Sievers-M500.webp`, confirmado byte a byte) en el WP — verificar diferencias reales y conseguir imagen propia |
| `sievers-m500` | Analizador de carbono orgánico total en línea Sievers M500 | http://localhost:3000/productos/sievers-m500 | 33 | 1 | sin PDF |
| `sievers-m9` | Analizador de TOC de laboratorio Sievers M9 | http://localhost:3000/productos/sievers-m9 | 23 | 1 | sin PDF; decidir si el M9 Turbo va como ficha propia (variantes Laboratorio/En línea/Portátil con medidas y pesos distintos) o comparado tipo B — datos Turbo ya verificados (rango 0,20 ppb-10 ppm; precisión 2% RSD; exactitud ±10% o ±10 ppb; análisis 4 s; respuesta 3,25 min; 1,1 mL/min; 5-95 °C; ambiente 10-40 °C); la 1.ª tabla (M9 estándar) viene del WP sin verificar contra ficha oficial, confirmar al menos rango, tiempo de análisis y dimensiones
