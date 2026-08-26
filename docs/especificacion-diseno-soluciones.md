# Especificación de diseño — Páginas de Soluciones por Industria

Definida por Claude (asesor/director creativo del proyecto). Codex implementa esto
literalmente — no rediseña ni decide dirección visual, según el protocolo del repo.

FAQ compartida confirmada: la pregunta "¿Los métodos que desarrollan cumplen
NCh-ISO 17025?" se reemplaza en las 6 páginas por "¿Cómo eligen el equipo correcto
para mi problema?"

## Fundamento

Sujeto: instrumentación analítica de precisión (HPLC, GC, análisis elemental) para
compradores técnicos — jefes de laboratorio, calidad, gerentes de planta. El trabajo
de la página es convencer a alguien técnico de que Del Carpio entiende su problema
específico, sin apoyarse en el nombre de una norma para sonar creíble. El lenguaje
visual sale de ahí: precisión de medición, lectura de datos, trazabilidad — no
íconos de "ciencia" genérica (matraces de stock, moléculas, ADN).

## Sistema de tokens

Color y tipografía base ya están fijos (ver decisiones firmes del proyecto). Esto
define CÓMO se usan, no qué son.

- **Terracota `#D6532B`**: reservado para UN SOLO CTA por página, el más
  importante. No decorativo en ningún otro lugar de la página.
- **Verde `#53843A`**: exclusivo para la columna/tarjeta "qué gana su empresa" en
  la sección "qué resolvemos". No aparece en ningún otro contexto — así se asocia
  limpiamente a resultado positivo.
- **Amarillo `#FBE369`**: exclusivo del elemento de firma (línea de calibración,
  ver abajo). No se usa en ningún otro elemento.
- **Montserrat 700-800** en el headline del hero, con tracking más cerrado y
  escala mayor que el resto del sitio — busca sensación de "lectura de instrumento
  calibrado", no titular de blog genérico.
- **Open Sans** en la tabla "qué resolvemos", pero los labels ("Técnica",
  "Problema del cliente", "Qué gana su empresa") en versalitas (small caps) con
  letter-spacing amplio — imita cómo se rotulan los datos en un equipo de
  laboratorio real.

## Concepto de layout

La sección "qué resolvemos" deja de ser una tabla HTML plana. Se convierte en un
flujo horizontal de 3-4 tarjetas conectadas por una línea, replicando el proceso
real del cliente (muestra → técnica → resultado). Este es uno de los pocos casos
donde un dispositivo de secuencia SÍ tiene sentido, porque el contenido es
literalmente un proceso, no una lista arbitraria.

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  TÉCNICA    │ ───▶ │  PROBLEMA   │ ───▶ │  RESULTADO  │
│  (label     │      │  DEL CLIENTE│      │  (fondo o   │
│   versalita)│      │             │      │   borde     │
│             │      │             │      │   verde)    │
└─────────────┘      └─────────────┘      └─────────────┘
      ╰──────────────── línea de calibración ──────────────╯
```

En mobile, las tarjetas se apilan verticalmente y la línea de calibración pasa a
ser vertical, conectando de arriba hacia abajo en el mismo orden.

## Elemento de firma

Una **"línea de calibración"**: una regla horizontal delgada con marcas de tick
irregulares-pero-rítmicas (como la escala de un instrumento de medición), en
amarillo `#FBE369`. Se usa SOLO como separador entre secciones principales y debajo
del hero — no se repite dentro de cada tarjeta individual ni se usa como decoración
de fondo. Es el único elemento "de firma" de la página; todo lo demás alrededor se
mantiene sobrio.

## Motion

Respeta la decisión firme de motion mínimo ya existente en el proyecto:
- Solo fade + leve elevación al hacer scroll sobre cada tarjeta de "qué
  resolvemos", en secuencia (como si los datos se leyeran uno a uno).
- Nada de animación continua, nada de hover llamativo más allá de los estados de
  link estándar del sitio.

## Qué NO cambia

Paleta base completa, tipografías base, zoom global 80% en desktop, sin
glassmorphism, sin gradientes decorativos, sin hexágonos flotantes, grid estático
de navegación entre sectores. Esta especificación define usos dentro de esas
reglas, no las reemplaza.

## Nota para Codex

Esto reemplaza por completo la sección "DIRECCIÓN DE DISEÑO" del prompt anterior.
Implementa esta especificación literalmente para el template compartido de
`/soluciones/[sector]`. El contenido por sector sigue saliendo de
`docs/rediseno-soluciones-industria.md`, sin cambios ahí.
