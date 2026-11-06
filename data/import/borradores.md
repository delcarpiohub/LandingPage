# Fichas en borrador — estado 2026-11-02 (actualizado 2026-11-06)

Todas las fichas con `status: "borrador"` en `src/lib/mock-products.ts` hoy
(rama `exp/import-productos`). Están fuera de `publishedProducts` — no
aparecen en catálogo, sitemap ni buscador; solo son accesibles por URL
directa. 51 fichas en total: 8 Decent, 12 Milestone, 6 Trace Elemental,
4 Distek, 7 Sievers, 14 Thermo.

"Specs" = `comparisonSpecs.length` + specs de todos los `comparisonTiers`
(tipo B) sumados. "Imágenes" = portada (`imageUrl`) + `descriptionImages`.
Ninguna de las 51 tiene PDF/ficha técnica adjunta (`documents` vacío) — por
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

## Thermo (14)

Importadas 2026-11-06 desde `thermo-lote-01.csv` (vía `data/import/productos.csv`,
copia de staging), con `--as-borrador` explícito. Notas tomadas de
`data/import/thermo-lote-01-notas.csv` (revisión humana ya hecha al
importar este lote), condensadas.

| Slug | Nombre | URL local | Specs | Imágenes | Pendiente |
|---|---|---|---|---|---|
| `thermo-helix-mc-plus` | Espectrómetro de masas de gases nobles multicolector Helix MC Plus | http://localhost:3000/productos/thermo-helix-mc-plus | 14 | 1 | sin PDF; confirmar que la imagen avif de 650 px (`F182803p.eps-650.avif`) tiene calidad suficiente; resumen con traducción dudosa ("insuperables") sin poder contrastar contra la página oficial |
| `thermo-ultra-271` | Espectrómetro de masas de gases cuantitativo Ultra 271 | http://localhost:3000/productos/thermo-ultra-271 | 7 | 1 | sin PDF; todas las specs provienen solo del WP (sin fuente oficial accesible); la página de Thermo indica "no disponible para compra" — posible equipo descontinuado, decidir si se publica; dimensiones omitidas (ilegibles en el WP) |
| `thermo-ultra-hr-irms` | IRMS de ultra alta resolución Ultra HR-IRMS | http://localhost:3000/productos/thermo-ultra-hr-irms | 9 | 1 | sin PDF; verificar el nombre comercial correcto (WP dice "253 Ultra"/"Ultra 253 Plus"; el folleto oficial BR30293 usa "253 Ultra"/Ultra HR-IRMS — "253 Plus" es otro instrumento, queda en aliases pendiente de confirmar); rango dinámico del WP (">10 órdenes") no coincide con los "12 órdenes en Faraday" del folleto, se usó solo el dato del WP |
| `thermo-neoma-ms-ms` | Neoma MS/MS MC-ICP-MS | http://localhost:3000/productos/thermo-neoma-ms-ms | 8 | 3 | sin PDF; decidir si la categoría correcta es Análisis elemental (como quedó, igual que Element Series) o Espectrometría de masa/Alta resolución (como la tenía el WP); copas de Faraday (11), estabilidad térmica (0,01 °C/h) y las 4 aplicaciones vienen solo del WP |
| `thermo-stellar` | Espectrómetro de masas Stellar | http://localhost:3000/productos/thermo-stellar | 7 | 4 | sin PDF; confirmar que el importador aceptó correctamente la primera imagen avif de 650 px del WP; si no, reemplazar por la versión webp |
| `thermo-dionex-integrion` | Sistema Dionex Integrion HPIC | http://localhost:3000/productos/thermo-dionex-integrion | 12 | 3 | sin PDF; fotos del WP en miniatura de 150 px ("-150.webp"), conseguir fotos de mayor resolución; el mapa de redirects 301 tenía este WP marcado "revisar" hacia `thermo-dionex-ics-6000-hpic` — con ficha propia debe apuntar a `thermo-dionex-integrion` (confirmar en `thermo-redirects-actualizacion.csv`); horno de columna usa el dato de texto (desde 5 °C sobre ambiente) en vez de la tabla (30-80 °C), y la presión de bomba muestra ambos valores (6.000 psi bomba / 5.000 psi solo cartucho EGC 500) porque el WP y la hoja oficial no coinciden |
| `thermo-corona-veo` | Detectores de aerosoles cargados Corona Veo y Corona Veo RS | http://localhost:3000/productos/thermo-corona-veo | 16 | 1 | sin PDF; única imagen de 300×173 px (avif), baja resolución — conseguir foto de mayor calidad; ficha única para dos WP distintos (Veo y Veo RS), con specs etiquetadas por modelo en vez de tipo B (se evitó por el formato de comas decimales de las specs tipo B) |
| `thermo-iconnect-npd` | Detector de nitrógeno-fósforo (NPD) iConnect para GC TRACE series 1300 y 1600 | http://localhost:3000/productos/thermo-iconnect-npd | 10 | 1 | sin PDF; intervalo dinámico lineal interpretado como 10⁴ (la fuente mostraba "104" sin superíndice, confirmar contra ficha oficial) |
| `thermo-triplus-100-ls` | Muestreador automático para líquidos TriPlus 100 LS | http://localhost:3000/productos/thermo-triplus-100-ls | 8 | 1 | sin PDF (resto verificado contra hoja oficial PS-10362 y página 1R77010-0700B; capacidad de 180 viales de 10/20 mL según WP, la hoja agrega que son 240 con el portabandejas del TriPlus RSH) |
| `thermo-triplus-rsh-smart` | Muestreador automático TriPlus RSH SMART | http://localhost:3000/productos/thermo-triplus-rsh-smart | 10 | 1 | sin PDF; sin dimensiones, peso ni alimentación (no figuran en la hoja PS000158); decidir si la ficha representa toda la familia TriPlus RSH SMART (como quedó) o solo el código 1R77010-2001 que vendía el WP — Thermo tiene otras configuraciones (2002 a 2004) |
| `thermo-ai-as-1610` | Muestreadores automáticos para líquidos AI 1610 y AS 1610 | http://localhost:3000/productos/thermo-ai-as-1610 | 12 | 1 | sin PDF; el WP solo listaba el código MI-251000-0001, pero Thermo también tiene MI-251000-0004 y -0005 — confirmar cuáles cotiza Del Carpio |
| `thermo-tsq-9610` | GC-MS/MS de triple cuadrupolo TSQ 9610 | http://localhost:3000/productos/thermo-tsq-9610 | 12 | 3 | sin PDF; rango lineal "> 10⁷ (0-110 µA)" con el exponente posiblemente perdido en la extracción de la fuente — confirmar contra la hoja PS000203; el código "TSQ9610-XXXXX" del WP era un marcador de posición y no se usó |
| `thermo-icap-rqplus` | ICP-MS iCAP RQplus | http://localhost:3000/productos/thermo-icap-rqplus | 6 | 1 | sin PDF; specs escasas — la página oficial BRE731343A solo trae Tipo/Unidad y el folleto BR001635 no estuvo accesible, pedir hoja de datos; se eliminó de las características un bloque de números de parte (BRE731400-403) pegado por error en la descripción del WP; la etiqueta ACT es una afirmación del WP sin verificar |
| `thermo-vanquish-core` | Sistemas de HPLC Vanquish Core | http://localhost:3000/productos/thermo-vanquish-core | 11 | 1 | sin PDF; IMAGEN INCORRECTA — el WP usa la foto de Vanquish Flex para esta ficha, reemplazar antes de publicar (hay 4 imágenes oficiales de Core en thermofisher.com, dominio no está en la allowlist); verificar canales binarios (se usó la tabla oficial: 2 binario/4 cuaternario; el WP y el marketing dicen "binario 6 canales"); confirmar el redirect 301 del WP 105214 (URL /vanquish-flex/ con contenido de Core) hacia `thermo-vanquish-core`
