# Archivo — páginas `/soluciones/[industria]` (eliminadas 2026-10-02)

> Respaldo del contenido completo de las 6 páginas largas por industria antes
> de su eliminación, por decisión de jefatura: las tarjetas de `/soluciones`
> pasan a linkear directo al catálogo filtrado (`/productos?filtro=...`) en
> vez de a una página informativa. Ver la decisión fechada en `AGENTS.md`.
> Snapshot tomado sobre el commit `ed6a903` (2026-09-29), última versión
> publicada de estas páginas.
>
> Fuentes originales (también permanecen en el historial de git): `src/content/site.ts`
> (`industries[].detail` y, en ese momento, `productCategories`),
> `src/content/solution-pages.ts` (`SolutionPageConfig`, incluida
> `compatibleEquipmentSlugs`) y `src/content/solution-content.ts`
> (`solutionContent`, `sharedFaqs`). Componentes: `solution-editorial-page.tsx`,
> `solution-immersive-hero.tsx`, `solution-industry-overview.tsx`,
> `solution-equipment-explorer.tsx`, `solution-reveal.tsx` (todos eliminados
> en este cambio).

## Corrección importante sobre el encargo de esta tarea

El prompt que originó esta tarea afirmaba que las 6 páginas tenían "normas
reales documentadas (NCh 409, ISO 17025, EPA 410.4, ISO 15705, ICH Q2/Q3,
etc.)". Se verificó el contenido real antes de archivar y **esos códigos de
norma no aparecen en ninguna parte de `solution-content.ts`,
`solution-pages.ts` ni los componentes de las páginas de industria.** Las
únicas referencias normativas reales en todo el sitio relacionadas a estas
industrias están en `site.ts` → `labProjects` (no en las páginas de
industria): "validación bajo protocolos OIV" y "Reglamento UE 396/2005",
ambas ligadas a los proyectos de ejemplo del home, no a `/soluciones`. Este
archivo preserva el contenido *real* publicado, no el que describía el
prompt.

## Hero y descripción por industria (`industries[]` en `site.ts`)

### Alimentos
- Detail: "Detectamos residuos de pesticidas, aditivos y contaminantes en su
  línea de producción, y le entregamos el perfil nutricional y la
  trazabilidad que sus clientes de exportación le exigen."
- Hero: inmersivo, alineado a la izquierda, foto
  `/fotos/industrias/alimentos-hero-inmersivo.jpg` (selección de frutas,
  huevos y preparaciones de desayuno — imagen editorial de referencia, no es
  una instalación real de Del Carpio).
- `productCategories` (antes de esta tarea): Cromatografía, Análisis
  elemental, Preparación de muestras, Espectrometría de masa.

### Minería
- Detail: "Controlamos cianuro libre y WAD, metales pesados y reactivos de
  flotación en su proceso de lixiviación, para que su planta opere sin
  sorpresas en el balance metalúrgico."
- Hero: inmersivo, alineado a la izquierda, foto
  `/fotos/industrias/mineria-hero-inmersivo.jpg` (maquinaria de excavación —
  imagen editorial de referencia).
- `productCategories`: Minería, Fire Assay, Trace Elemental, Análisis
  elemental.

### Farmacéutica
- Detail: "Cuantificamos principios activos, impurezas y productos de
  degradación con métodos validados, para que su expediente de registro
  sanitario avance sin observaciones y su estudio de estabilidad tenga
  resultados defendibles."
- Hero: inmersivo, alineado a la izquierda, foto
  `/fotos/industrias/farmaceutica-hero-inmersivo.jpg` (manos con guantes de
  laboratorio sosteniendo una gradilla — imagen editorial de referencia).
- `productCategories`: Área farmacéutica, Cromatografía, Espectrometría de
  masa.

### Aguas
- Detail: "Medimos plaguicidas, trihalometanos, COVs y nitratos en su agua
  potable o de proceso, y le entregamos el respaldo técnico que necesita
  frente a la autoridad sanitaria."
- Hero: inmersivo, alineado a la izquierda, foto
  `/fotos/laboratorio-frascos-procesos.jpg` en la grilla de `/soluciones`,
  `/fotos/industrias/agua-hero-inmersivo-fotografia.jpg` en el hero de la
  página propia (gotas y ondas sobre agua — imagen editorial de referencia).
- `productCategories`: Análisis de agua, Purificadores de agua, Trace
  Elemental.

### Ambiental
- Detail: "Caracterizamos suelos, sedimentos y emisiones de su proyecto —
  COVs, HAPs y metales — para que su informe de línea de base o su monitoreo
  continuo estén listos a tiempo."
- Hero: inmersivo, alineado a la izquierda, foto
  `/fotos/industrias/ambiente-hero-inmersivo.jpg` (manos sosteniendo tierra
  con un brote verde — imagen editorial de referencia).
- `productCategories`: Análisis de agua, Análisis elemental, Cromatografía,
  Trace Elemental.

### Academia / I+D
- Detail: "Desarrollamos y validamos el método analítico que necesita su
  tesis o publicación, y transferimos la técnica a su equipo para que su
  grupo de investigación gane autonomía."
- Hero: inmersivo, alineado a la izquierda, foto
  `/fotos/industrias/academia-id-hero-inmersivo.jpg` (personas con delantal
  de laboratorio frente a una pizarra con fórmulas — imagen editorial de
  referencia).
- `productCategories`: Equipamiento analítico, Equipamiento menor,
  Cromatografía, Análisis elemental.

## Equipos compatibles por industria (`compatibleEquipmentSlugs`, auditado
producto por producto el 2026-08-17 — ver `.agent-log/sessions.md`)

- **Alimentos (11):** hanon-k1160, hanon-k9860, hanon-k9840, hanon-k1100f,
  hanon-sh420f, hanon-sh520, hanon-sox606, hanon-sox406, hanon-sh220f,
  infitek-lyo60b-series, decent-mezclador-tipo-v.
- **Minería (17):** decent-cargador-electrico-crisoles,
  decent-cargador-manual-crisoles, decent-copelas-magnesio,
  decent-dosificador-automatico-litargirio, decent-hornos-cupelacion,
  decent-horno-copelacion-alta-temperatura, decent-hornos-fusion-ensayo-fuego,
  decent-mezclador-crisoles, decent-molino-pulverizador-dp1000,
  decent-drsd05, decent-drsd40, decent-trituradora-martillo,
  decent-rodillo-botella, decent-dsw350, decent-trituradora-doble-rodillo,
  decent-hornos-secado, decent-mezclador-tipo-v.
- **Farmacéutica (7):** hanon-k1160, hanon-k9840, hanon-sh220f, hanon-sh420f,
  hanon-sh520, infitek-pr5-series, decent-mezclador-tipo-v.
- **Aguas (5):** infitek-cod-analyzer, infitek-bep-m300f,
  te-instruments-xplorer-aox-tox, milestone-ethos-up, hanon-k9840.
- **Ambiental (14):** hanon-k1160, hanon-k9860, hanon-k9840, hanon-sox606,
  hanon-sh220f, hanon-sh420f, hanon-k1100f, hanon-sh520, hanon-s402,
  milestone-ethos-up, te-instruments-xplorer-aox-tox, te-instruments-vectra,
  infitek-cod-analyzer, infitek-bep-m300f.
- **Academia / I+D (7):** hanon-k1160, te-instruments-vectra,
  te-instruments-newton, infitek-cod-analyzer, infitek-bep-m300f,
  decent-drsd05, decent-drsd40.

Esta lista sigue viva en `src/content/solution-pages.ts`
(`compatibleEquipmentByIndustry`, renombrado en este mismo cambio) porque la
usa el mega-menú de navegación — no se perdió información, solo el contenido
editorial largo que rodeaba a estos equipos en la página propia de cada
industria.

## Contenido editorial largo (`solution-content.ts`, eliminado)

Nota general del archivo original: "Todo derivado 1:1 de contenido ya real y
aprobado del sitio (`industry.detail`, `process`, `coreServices`/`metrics`
en `site.ts`, y las descripciones reales auditadas de
`compatibleEquipmentSlugs` en `solution-pages.ts`) — nunca cifras de LOD/LOQ,
plazos de entrega ni resultados de cliente que no estén ya verificados en el
sitio."

### FAQ compartida (las 6 industrias)
1. "¿La compra del equipo incluye instalación y calificación?" — "Sí. El
   proceso incluye instalación, configuración y calificación del equipo
   antes de la entrega operativa."
2. "¿Dan soporte técnico después de la venta?" — "Sí, con diagnóstico y
   soporte en sitio, además de mantención preventiva y servicio correctivo
   ante fallas."
3. "¿Ofrecen capacitación para el equipo técnico?" — "Sí, capacitación
   técnica teórica y práctica para el personal que va a operar el
   instrumento."
4. "¿Cómo eligen el equipo correcto para mi problema?" — "Revisamos la
   matriz, el análisis requerido y el flujo de trabajo antes de proponer el
   equipamiento adecuado."

### Alimentos
- **Métodos:** HPLC-MS/MS y GC-MS (residuos de pesticidas antes del envío);
  Kjeldahl automatizada (proteína/nitrógeno para etiquetado nutricional);
  extracción Soxhlet (grasa total); trazabilidad en cadena productiva
  (documentación de aditivos/contaminantes por lote para auditorías).
- **Casos de aplicación:** "Residuos de pesticidas para exportación" (sistema
  HPLC-MS/MS); "Laboratorio de control de calidad vitivinícola" (HPLC-DAD
  para polifenoles/azúcares, GC-FID para compuestos aromáticos).
- **FAQ propia:** "¿Pueden apoyar análisis para exportación?" — "Sí.
  Revisamos residuos de pesticidas, aditivos, contaminantes, perfil
  nutricional y trazabilidad según la necesidad de su línea de producción."
- **Intro guía de selección:** "Si su matriz es un alimento o pienso y
  necesita perfil nutricional, mineralización o preparación de muestra,
  estos son los equipos con aplicación verificada para su industria."

### Minería
- **Métodos:** destilación + electrodo ion-selectivo/titulación (cianuro
  libre/WAD); ensayo por fuego (ley de metales preciosos); HPLC (consumo de
  reactivos); IC (efluentes de proceso).
- **Casos de aplicación:** "Unidad analítica para planta minera" (IC +
  ICP-OES + LIMS); "Laboratorio de ensayo por fuego" (fundición, copelación,
  cuarteo, molienda).
- **FAQ propia:** "¿Trabajan con muestreo y preparación de muestra en
  faena?" — "Sí, contamos con equipos de muestreo, trituración y preparación
  de muestra pensados para operación minera, además del análisis de cianuro
  y metales en laboratorio."
- **Intro guía de selección:** "Si trabaja con cianuro, ensayo por fuego o
  preparación de muestra de mineral, estos son los equipos con aplicación
  verificada para minería."

### Farmacéutica
- **Métodos:** HPLC/GC con validación de método (principios activos e
  impurezas de síntesis); estudios de estabilidad (productos de
  degradación); digestión ácida/Kjeldahl (verificación de materias primas).
- **Casos de aplicación:** "Validación de método para registro sanitario"
  (HPLC con linealidad, precisión, exactitud, LOD/LOQ); "Estudio de
  estabilidad" (HPLC bajo temperatura/humedad/luz).
- **FAQ propia:** "¿Sus métodos cumplen los lineamientos exigidos para la
  industria farmacéutica?" — "Sí, la validación de métodos que desarrollamos
  sigue los requisitos exigidos para registro sanitario y estudios de
  estabilidad en su industria."
- **Intro guía de selección:** "Si necesita cuantificar principios activos,
  impurezas o productos de degradación con validación de métodos analíticos
  según los requisitos de su industria, estos son los equipos con aplicación
  verificada para farmacéutica."

### Aguas
- **Métodos:** GC-MS (trihalometanos/COVs en agua potable); HPLC
  (plaguicidas en matrices acuosas); análisis de nitratos; DQO (calidad de
  efluentes).
- **Casos de aplicación:** "Análisis de agua potable según la normativa
  sanitaria vigente" (GC-MS + HPLC); "Control de aguas de proceso y
  efluentes" (DQO + plaguicidas).
- **FAQ propia:** "¿Cubren los parámetros exigidos por la normativa
  sanitaria de agua potable?" — "Sí, trabajamos los parámetros exigidos por
  la normativa sanitaria de agua potable, además de normativa ambiental para
  efluentes y aguas de proceso."
- **Intro guía de selección:** "Si necesita cumplir con la normativa
  sanitaria de agua potable o monitorear calidad de agua de proceso, estos
  son los equipos con aplicación verificada para aguas."

### Ambiental
- **Métodos:** GC-MS (COVs y HAPs); digestión ácida por microondas (metales
  en suelos/sedimentos); muestreo y análisis de emisiones atmosféricas
  (fuentes fijas/línea de base).
- **Casos de aplicación:** "Línea de base ambiental" (metales + COVs/HAPs);
  "Monitoreo continuo de emisiones" (fuentes fijas).
- **FAQ propia:** "¿Apoyan la elaboración de informes de línea de base?" —
  "Sí, apoyamos la caracterización de suelos, sedimentos y emisiones
  necesaria para informes de línea de base y monitoreo continuo."
- **Intro guía de selección:** "Si necesita caracterizar suelos, sedimentos
  o emisiones para línea de base o monitoreo continuo, estos son los
  equipos con aplicación verificada para ambiental."

### Academia / I+D
- **Métodos:** desarrollo y validación de método (matriz del proyecto de
  investigación); transferencia de técnica cromatográfica HPLC/GC
  (migración entre equipos o laboratorios); capacitación en operación de
  equipos (formación de nuevos investigadores).
- **Casos de aplicación:** "Desarrollo de método para tesis o publicación"
  (HPLC o GC); "Transferencia de técnica entre laboratorios" (método
  validado + capacitación).
- **FAQ propia:** "¿Trabajan con proyectos de investigación de bajo volumen
  de muestras?" — "Sí, apoyamos el desarrollo y transferencia de métodos
  para proyectos de investigación, tesis y publicaciones, sin importar el
  volumen de muestras."
- **Intro guía de selección:** "Si necesita desarrollar, validar o
  transferir un método analítico para investigación, estos son los equipos
  con aplicación verificada para academia/I+D."

## Estructura de página (para referencia, por si se retoma el formato)

Breadcrumb "Soluciones / [industria]" → hero inmersivo (foto a sección
completa, CTA primaria "Solicitar evaluación técnica" a `/contacto/ventas`,
CTA secundaria "Ver catálogo completo" a
`/productos?filtro=<primera categoría>`) → sección única de síntesis
sectorial (`SolutionIndustryOverview`: tarjetas de métodos, aplicaciones
breves y explorador de equipos por categoría/marca con vista previa) →
banda de cierre "¿Qué necesita hoy?" con tres rutas (cotizar, proyecto de
laboratorio completo, diagnóstico técnico).
