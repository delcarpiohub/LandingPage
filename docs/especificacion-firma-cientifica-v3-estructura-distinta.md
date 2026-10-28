# Especificación — "firma científica" v3: estructura distinta (no reskin)

> Escrita por Claude Code (Director Creativo) el 2026-10-28, rama
> `exp/firma-cientifica`. Codex implementa exactamente esto — no decide
> layout, UX ni dirección visual. Si detecta un problema de arquitectura o
> ambigüedad, debe detener y pedir que se actualice esta especificación
> antes de seguir (regla de `AGENTS.md`, sección "Modelo operativo
> obligatorio").

## Por qué existe este documento

Las dos versiones anteriores de este experimento (ver `.agent-log/sessions.md`,
entradas 2026-10-27 y 2026-10-28) fueron rechazadas por Christofer dos
veces con el mismo diagnóstico de fondo: **"se ve genérico IA, no tiene
identidad propia"** — a pesar de que la segunda vuelta ya tenía tratamiento
editorial (línea de base, ticks, pie de figura tipo publicación científica)
y una excepción de marca para gradiente/glass.

El error no era de pulido. Una línea SVG decorativa como separador de
sección y una tabla/lista de datos son, estructuralmente, patrones que
"cualquier sitio podría tener" — no importa cuánta tipografía o color de
marca se les agregue encima. Esta versión **cambia la estructura
completa** de ambas piezas, no su styling.

**Regla para esta vuelta: no reutilizar la curva de cromatograma (SVG de
gaussianas) en ninguna forma, ni la tabla de agenda como grilla de filas.
Si el resultado se parece visualmente a cualquiera de los dos, está mal
hecho — volver a esta especificación, no al código viejo.**

## Pieza A — reemplaza el divisor de cromatograma

**Elimina por completo:**
- `src/components/motion/chromatogram-line.tsx`
- `src/content/chromatogram-presets.ts`
- Toda referencia a `ChromatogramLine`, `ChromatogramPeak`, picos/gaussianas.

**Mantiene (no tocar):**
- `src/components/sections/chromatogram-divider.tsx` sigue existiendo como
  el Server Component que chequea `features.firmaCromatograma` y retorna
  `null` si está en `false` (mismo patrón de "cero rastro" que ya existe,
  solo cambia qué renderiza adentro). Puede renombrarse el archivo a
  `src/components/sections/section-index-band.tsx` si Codex lo prefiere,
  pero el patrón de flag-check en el límite Server/Client debe conservarse
  tal cual está (es lo que garantiza que el JS del cliente no se cargue
  con el flag en `false` — no es solo estético, es arquitectura real).

**Construye en su lugar: "Section Index" — banda de orientación real, 100%
tipográfica, sin SVG, sin curva, sin ticks de regla.**

Qué muestra (3 instancias en el home, mismas ubicaciones que hoy: entre
Hero→Explorar, entre Proyectos→Métricas, entre Laboratorio→Testimonios):

```
01 ─╮  CATÁLOGO
    ╰── (regla terracota de 24px bajo el número, nada más)
```

- Número de índice grande: `01` / `02` / `03` — Manrope 800, ~32-40px
  desktop / ~24px mobile, color ink, `tabular-nums`.
- Nombre de la sección que viene: Inter, uppercase, tracking amplio,
  tamaño pequeño (11-12px), color ink al 60%, alineado verticalmente al
  número.
- Una sola regla de acento terracota de 2px × ~24px bajo el número — el
  único toque de color, nada más en la banda lleva color.
- Fondo: blanco o un tinte de ink casi imperceptible (2-4% opacidad) — NO
  gradiente, NO vidrio. La excepción de gradiente/glass de `AGENTS.md`
  (2026-10-28) queda disponible para otras piezas si se necesita, pero
  esta banda específica debe quedarse sobria — es wayfinding, no un
  momento de impacto visual.
- Banda full-bleed, altura fija (~56px desktop, ~40px mobile) para cero
  CLS, igual que el componente anterior.
- Sin motion de scroll-draw. Puede tener un fade/slide-in sutil una sola
  vez al entrar en viewport reutilizando el componente `Reveal` que ya
  existe en el proyecto (`src/components/motion/reveal.tsx`) — no
  reinventar una animación nueva.
- Datos: reemplazar `chromatogram-presets.ts` por algo mínimo como
  `{ index: "01", label: "Catálogo" }` por instancia — sin peaks, sin
  geometría.
- Accesibilidad: `aria-hidden="true"` SOLO si el nombre de sección es
  puramente decorativo respecto al contenido real que sigue; si se
  considera navegación útil, debe ser accesible (decidir según cómo quede
  semánticamente — si hay duda, preguntar, no asumir).

**Qué evitar explícitamente:** cualquier curva, path SVG, línea ondulada,
gráfico de "señal", icono de laboratorio genérico, o imagen de stock.

## Pieza B — reemplaza la tabla de agenda de laboratorio

**Archivo:** `src/components/sections/lab-agenda.tsx` (mismo archivo, se
reescribe el render interno; `src/data/eventos.ts` y el flag
`agendaEventos` en `src/config/features.ts` no cambian de forma —
siguen siendo la fuente de datos real, editable a mano, eventos
verificados, nunca inventados).

**Elimina:** la tabla `<table>` desktop y las filas apiladas mobile tipo
lista. Elimina también la fila de cifras grandes (stat tiles con
gradiente) de la versión anterior — era redundante con lo que el nuevo
layout ya comunica visualmente (ver abajo), y menos elementos que ya no
aportan información nueva deben eliminarse.

**Construye en su lugar: un eje de tiempo real (timeline), proporcional a
las fechas reales — no una lista, no una grilla.**

Concepto: un eje horizontal (vertical en mobile) que representa el tiempo
real transcurrido entre hoy y el último evento cargado. Los eventos se
ubican en su posición real sobre el eje — si hay 5 meses entre dos
eventos, ese espacio en el eje debe ser visualmente mayor que uno de 2
semanas. Esto es información real (distancia temporal real), no
decoración — es la misma idea de "precisión de instrumento" que
motivó el cromatograma original, pero aplicada a un dato que sí es real.

**Desktop:**
- Línea base horizontal (ink, 1-1.5px), full width del contenedor.
- Un marcador "HOY" fijo en el extremo izquierdo del eje (o en la posición
  real de hoy si se decide mostrar algo de contexto antes del primer
  evento) — esto es lo que reemplaza la cifra "días para el próximo
  evento": la distancia visual entre "HOY" y el primer punto ya comunica
  la urgencia, sin necesitar una tarjeta aparte.
- Marcas de mes en la línea base (ene, feb, mar... ) en las posiciones
  reales correspondientes, con el mes/año como etiqueta pequeña debajo del
  tick — reales, calculadas desde las fechas de `eventos.ts`, nunca
  hardcodeadas.
- Un punto/marcador por evento en su posición real sobre el eje. Color del
  punto según `tipo` (mismo criterio de color que la versión anterior:
  terracota=Feria, oliva=Seminario, amarillo con texto oscuro=Webinar).
- Desde cada punto, una línea conectora corta (vertical) hacia una
  tarjeta/etiqueta con: fecha formateada, título del evento (con link si
  `evento.enlace` existe), lugar, y el tag de tipo (`TipoTag`, puede
  reusarse el patrón de pill de color de la versión anterior — eso sí
  funcionaba bien).
- Si dos eventos quedan demasiado cerca en el eje y sus etiquetas se
  superpondrían, alternar la etiqueta arriba/abajo del eje (técnica
  estándar de timeline) — esto es lógica real de layout, no decoración.
- El evento más próximo puede llevar un leve énfasis (anillo o borde en el
  punto, ligeramente más grande) — sutil, no repetir la jerarquía de
  tamaño gigante de la versión anterior.

**Mobile:** rotar el eje a vertical (de arriba hacia abajo), misma lógica
de espaciado proporcional por fecha real, marcador "HOY" arriba, puntos y
tarjetas en secuencia. Sin scroll horizontal en ningún viewport.

**Qué evitar explícitamente:** cualquier `<table>`, cualquier lista de
filas con el mismo ancho de columna repetido, cualquier grilla de
tarjetas idénticas.

**Edge cases a manejar (consultar antes de asumir si no están claros):**
- Un solo evento futuro: el eje igual debe tener sentido visual (no puede
  depender de al menos 2 puntos para funcionar).
- Eventos que ya pasaron NO se muestran (mismo comportamiento actual:
  `getEventosFuturos()` ya filtra esto, no tocar esa función).
- Si no hay eventos futuros, la sección entera retorna `null` (sin
  cambios respecto al comportamiento actual).

## Verificación obligatoria antes de dar por terminado

- `npx tsc --noEmit`, `npm run build`, `npm run lint` limpios.
- Playwright contra `npm run dev` local en 1280px, 768px y 390px, con los
  2 flags en `true` temporalmente (sin commitear la activación): el eje de
  tiempo no debe tener overlap de etiquetas, scroll horizontal, ni
  elementos cortados.
- Con los 2 flags en `false`: cero rastro en el HTML servido (mismo
  criterio que las versiones anteriores).
- `prefers-reduced-motion`: el fade/slide-in de `Reveal` en la banda de
  índice ya respeta esto por ser un componente compartido — confirmar que
  sigue siendo así, no asumir.
- Capturar pantallas de ambas piezas y mostrarlas en el reporte final
  antes de pedir aprobación para commitear — no commitear sin que
  Christofer vea el resultado real primero (mismo protocolo que las
  vueltas anteriores).

## Lo que NO cambia

- `src/data/eventos.ts`: misma fuente de datos, mismos 5 eventos reales ya
  verificados (Gecamin ×3, IIMCH, Expomin) o los que estén vigentes al
  momento de implementar — verificar fechas, pueden haber cambiado.
- `src/config/features.ts`: mismos flags (`firmaCromatograma`,
  `agendaEventos`), mismo comportamiento de "false = cero rastro".
- La excepción de gradiente/glassmorphism de `AGENTS.md` (2026-10-28)
  sigue vigente como técnica disponible, pero no es obligatoria usarla en
  esta estructura nueva — úsala solo donde realmente aporte, no por
  inercia de la vuelta anterior.
