# Typography — Del Carpio 2.0
## Sistema tipográfico completo

---

## Las 3 fuentes del sistema

### Geologica — Display / Headings

**Por qué:** Geologica es una variable font con un rango de pesos de 100 a 900. Su ancho es ligeramente condensado, sus terminaciones tienen personalidad sin ser ornamentales, y sus figuras numéricas tienen un carácter técnico que encaja con el rubro de instrumentación. No es una fuente de startup (no es Satoshi, Plus Jakarta, DM Sans) y no es una fuente editorial genérica (no es Playfair, Lora, Merriweather). Es lo suficientemente rara para ser memorable, lo suficientemente profesional para no perder autoridad.

**Usos exclusivos:**
- h1, h2, h3, h4 en todas las páginas
- Nombres de servicios en cards de alta jerarquía
- Números grandes en métricas de confianza
- Elementos de display decorativo (cuando existan)

**Peso principal:** SemiBold (600) para títulos. Regular (400) para subtítulos largos que necesitan menos peso.

**No usar Geologica para:**
- Texto de cuerpo (párrafos de más de 2 líneas)
- Labels técnicos
- Texto de UI (botones, formularios, nav links)

---

### Geist — Body / Sans

**Por qué:** Diseñada por Vercel para interfaces de alta densidad técnica. Tiene el mismo DNA que las mejores fuentes de UI (Inter, SF Pro) pero con menos genericidad. Su monolinearity funciona perfectamente para texto técnico sin crear la frialdad de una fuente monoespaciada. Es la fuente de trabajo: párrafos, descripciones, formularios, navegación.

**Usos:**
- Todo el texto de cuerpo (párrafos, descripciones)
- Texto de UI (botones, inputs, navegación, menús)
- Captions de fotografía
- Links de texto
- Texto de error, confirmación, estados

**Peso principal:** Regular (400) para cuerpo. Medium (500) para UI. SemiBold (600) para labels de formulario y texto de botón.

---

### Azeret Mono — Labels técnicos / Eyebrows

**Por qué:** Las fuentes mono son el lenguaje del laboratorio: cronómetros de equipo, pantallas de instrumentos, terminales de control. Azeret Mono tiene más carácter que Courier o SpaceMono, con terminaciones que no son ni demasiado técnicas ni demasiado "código". Es la voz técnica del sistema.

**Usos exclusivos:**
- Eyebrows de sección (texto pequeño uppercase tracking-wide antes de los h2)
- Tags de sector y categoría
- Etiquetas técnicas inline (HPLC-MS/MS, NCh 17025, IQ/OQ/PQ)
- Números de índice en listas (01, 02, 03)
- Metadatos de fotografías en figcaption
- Fechas y referencias técnicas

**Tamaño:** Siempre entre 9px y 12px. Nunca más grande (el mono a tamaños grandes se siente como código, no como label).

---

## Escala tipográfica

| Nombre | Fuente | Size (clamp) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| **display-xl** | Geologica | `clamp(3rem, 7vw, 5.5rem)` | 600 | 1.04 | -0.02em |
| **display-lg** | Geologica | `clamp(2.5rem, 5.5vw, 4.5rem)` | 600 | 1.06 | -0.01em |
| **display-md** | Geologica | `clamp(2rem, 4vw, 3.5rem)` | 600 | 1.08 | -0.01em |
| **display-sm** | Geologica | `clamp(1.5rem, 2.5vw, 2.25rem)` | 600 | 1.12 | 0 |
| **h4** | Geologica | `1.25rem` (20px) | 600 | 1.3 | 0 |
| **body-xl** | Geist | `1.25rem` (20px) | 400 | 1.7 | 0 |
| **body-lg** | Geist | `1.125rem` (18px) | 400 | 1.75 | 0 |
| **body** | Geist | `1rem` (16px) | 400 | 1.7 | 0 |
| **body-sm** | Geist | `0.875rem` (14px) | 400 | 1.65 | 0 |
| **caption** | Geist | `0.8125rem` (13px) | 400 | 1.55 | 0 |
| **label** | Azeret Mono | `0.75rem` (12px) | 400 | 1.4 | 0.12em |
| **eyebrow** | Azeret Mono | `0.625rem-0.6875rem` (10-11px) | 400 | 1.4 | 0.16-0.2em |

---

## Uso por contexto

### Hero h1
```
Geologica SemiBold 600
Size: clamp(2.6rem, 5.5vw, 5rem)
Line-height: 1.04-1.08
Letter-spacing: -0.01em
Max-width: 52rem
Color: white (sobre foto oscura)
```

### Section h2
```
Geologica SemiBold 600
Size: clamp(2.25rem, 4vw, 3.5rem) en secciones principales
     clamp(1.875rem, 3vw, 3rem) en secciones compactas
Line-height: 1.1
Letter-spacing: -0.01em
Max-width: varía por sección (2xl a 4xl)
```

### h3 en cards/listas
```
Geologica SemiBold 600
Size: 1.25-1.5rem
Line-height: 1.3
```

### Cuerpo de sección
```
Geist Regular 400
Size: 1rem-1.125rem
Line-height: 1.7-1.75
Color: --muted (sobre fondos claros) / rgba(255,255,255,0.68) (sobre fondos oscuros)
Max-width: 38-44rem para legibilidad óptima
```

### Eyebrow (etiqueta antes de h2)
```
Azeret Mono Regular 400
Size: 10px-11px
Uppercase: true
Letter-spacing: 0.16em-0.20em
Color: --accent (sobre fondos claros) / rgba(255,255,255,0.38) (sobre fondos oscuros)
Restricción: Máximo 1 eyebrow visible por 3 secciones consecutivas. No acumular.
```

---

## Reglas de composición tipográfica

### 1. Balance automático
Todos los h1, h2, h3, h4 tienen `text-wrap: balance` — ya implementado en globals.css.

### 2. Longitud de línea
Texto de cuerpo: máximo 65-72 caracteres por línea (`max-w-prose` o `max-w-xl`/`max-w-2xl` según el layout).
Títulos: permitir hasta 80 caracteres si el `text-wrap: balance` los corta bien.

### 3. Jerarquía en una sección
Una sección puede tener UN h2. Puede tener múltiples h3. No puede tener dos h2.
El eyebrow va encima del h2. El subtexto va debajo del h2.
La secuencia es: `eyebrow (opcional) → h2 → subtexto (opcional)`. No invertir.

### 4. Números como diseño
Los números grandes (HPLC/GC, 6 sectores, IQ/OQ/PQ) usan Azeret Mono SemiBold o Geologica SemiBold.
Son elementos de diseño, no solo datos. Deben tener espacio propio y peso visual.

### 5. Puntuación
Sin guiones em (—) en el copy visible del sitio. Usar: dos puntos (:), punto (.), coma (,).
Los puntos medios (·) están permitidos pero con límite de 1 por línea.
Las barras (/) para separar elementos técnicos (HPLC / GC, NCh / ISO).

---

## Lo que está prohibido

- Usar Geologica para texto de cuerpo de más de 3 líneas
- Usar Azeret Mono para titulares o texto de acción
- Usar fuentes no incluidas en el sistema (System fonts, Georgia, Times)
- Texto en mayúsculas en Geologica (las mayúsculas de Geologica no son para display)
- Combinar bold + italic para efectos decorativos
- Usar más de 3 tamaños tipográficos distintos en una misma sección visible

---

## Referencia: análisis tipográfico de la competencia

| Empresa | Fuente principal | Problema |
|---|---|---|
| Agilent | Arial/Helvetica | Sin personalidad, temperatura corporativa fría |
| Shimadzu | Roboto/sistema | Idéntica a miles de sitios |
| Waters | Source Sans | Funcional pero sin diferenciación |
| Thermo Fisher | Custom/proxima | Reconocible pero pesada para el rubro |
| **Del Carpio objetivo** | Geologica + Geist + Azeret Mono | Técnica, editorial, contemporánea, memorable |
