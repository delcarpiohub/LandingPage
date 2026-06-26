# Photography — Del Carpio 2.0
## Dirección de fotografía y tratamiento de imagen

---

## El principio fotográfico

Las fotografías de Del Carpio son evidencia, no decoración.

En el mundo analítico, "evidencia" tiene un significado muy específico: algo que puedes defender en una auditoría. Las fotos deben tener el mismo estándar: reales, identificables, trazables a un trabajo concreto.

**Esto elimina:**
- Banco de imágenes de laboratorios genéricos
- Fotos con guantes blancos sin equipo identificable
- Composiciones artificialmente perfectas
- Visualizaciones de datos sin datos reales

---

## Análisis de la referencia (Indorama Corporation)

La referencia enviada usa una foto de laboratorio con una persona pipeteando activamente.
Lo que funciona: hay acción humana, hay contexto técnico, la profundidad de campo cierra sobre el trabajo.
Lo que no copiamos: es una foto de banco de imágenes, no identificable como de esa empresa.

**Para Del Carpio:** La fotografía debe ser exclusivamente de equipos y espacios reales de Del Carpio.
Esto no es una limitación — es el diferencial. Shimadzu y Agilent no pueden mostrar un laboratorio de implementación real de Chile. Del Carpio sí puede.

---

## Las 4 tipologías de foto

### Tipo A — El instrumento como protagonista
**Qué muestra:** Un sistema HPLC o GC completo, encendido, en un laboratorio real.
**Composición:** El equipo ocupa 60-75% del frame. Fondo neutro o contexto de laboratorio.
**Luz:** Cenital blanca o luz de ventana lateral. Sin flash directo.
**Profundidad de campo:** Amplia — todo el instrumento debe estar en foco.
**Uso en el sitio:** Hero (foto de fondo), ServiceMatrix (foto de la columna izquierda).

### Tipo B — La mano técnica
**Qué muestra:** Manos de un técnico trabajando: ajustando una columna cromatográfica, conectando una línea de fluido, cargando una jeringa de muestra.
**Composición:** Close-up en el gesto técnico. La cara no es necesaria. La mano y el instrumento son los protagonistas.
**Luz:** Natural con relleno. Sombras suaves.
**Profundidad de campo:** Cerrada — la mano en foco, el instrumento ligeramente difuso o viceversa.
**Uso en el sitio:** Secciones de proceso, ComplianceBand, páginas de servicios individuales.

### Tipo C — El dato en pantalla
**Qué muestra:** La pantalla de un software de cromatografía mostrando un cromatograma real — con picos, baselines, integración, números.
**Composición:** La pantalla en ángulo de 3/4, con el instrumento visible en el fondo o a un lado.
**Luz:** La pantalla ilumina el ambiente — luz artificial fría de pantalla más luz ambiente.
**Profundidad de campo:** La pantalla perfectamente nítida, el fondo con bokeh suave.
**Uso en el sitio:** Sección de validación, páginas de servicio de Validación y Trazabilidad.

### Tipo D — El espacio completo
**Qué muestra:** Una sala de laboratorio entera, con múltiples instrumentos, estaciones de trabajo, iluminación profesional.
**Composición:** Angular que muestra profundidad. No necesariamente simétrica.
**Luz:** Iluminación de laboratorio real (fluorescente o LED blanco), no retocada.
**Profundidad de campo:** Amplia — que se vea el espacio completo.
**Uso en el sitio:** LabPhotos, páginas de proyectos de laboratorio.

---

## Directrices para la sesión fotográfica

### Qué DEBE existir en el banco de fotos de Del Carpio
- [ ] 2-3 fotos tipo A de cada instrumento principal (HPLC-DAD, HPLC-MS/MS, GC-FID, GC-MS)
- [ ] 4-6 fotos tipo B de trabajo técnico con los instrumentos
- [ ] 2-3 fotos tipo C de pantallas de software (Chemstation, Empower, OpenLAB)
- [ ] 1-2 fotos tipo D del laboratorio completo
- [ ] Fotos verticales de los instrumentos para uso en mobile (aspect 4:5)

### Estilo de la fotografía
- **Temperatura de color:** 5500K-6000K (luz de día). No cálida. No naranja.
- **Saturación:** Natural, ligeramente reducida en post (no saturar los colores de los equipos)
- **Contraste:** Medio-alto. Los instrumentos tienen buena forma en blanco/gris/negro — el contraste los hace destacar.
- **Retoque:** Mínimo. Corrección de luz y color solamente. No liquify, no sky replacement, no elementos agregados.
- **Formato entregado:** RAW + JPG/WEBP exportado a 2400px de ancho mínimo.

### Qué NO debe aparecer en las fotos
- Logos de otras marcas de instrumentos con demasiada prominencia (tener cuidado con Agilent, Waters, Shimadzu)
- Papel con información confidencial de clientes
- Caras de personas sin consentimiento firmado
- Desorden, suciedad o condiciones que sugieran mal mantenimiento
- Fondos de pantalla o salvapantallas en los equipos

---

## Tratamiento de imagen en el sitio

### Hero
```
Object-fit:     cover
Object-position: center
Opacity:        0.65 (la foto es el fondo, el texto está encima)
Overlay:        gradiente horizontal oscuro (left-dominant)
Scale inicial:  1.08 → 1.0 en scroll (parallax — ver HERO_SPEC_V2.md)
```

### Cards de foto (ServiceMatrix izquierda)
```
Min-height:     520px (desktop), auto (mobile)
Object-fit:     cover
Overlay:        gradiente vertical oscuro desde el fondo (para el caption)
Hover:          scale 1.0 → 1.025 en 500ms
Border-radius:  1.25rem
```

### LabPhotos galería
```
Foto grande:    min-h-[520px], aspect libre, left column
Foto pequeña:   h-80 desktop, h-[380px] lg, right column
Object-fit:     cover en ambas
Hover:          scale 1.025 en 500ms
No overlays en las fotos de LabPhotos (se muestran completas)
```

### Figcaptions
Siempre incluir:
1. Una descripción funcional de lo que muestra la foto (NO "Foto de nuestro laboratorio")
2. Un metadato técnico en Azeret Mono (técnica usada, equipo, proceso)

Ejemplo correcto:
```
Descripción: "Sistema cromatográfico instalado para análisis de pesticidas en frutas"
Meta:        "HPLC-MS/MS / trazabilidad"
```

Ejemplo incorrecto:
```
Descripción: "Nuestro moderno laboratorio" ← genérico, sin información
```

---

## Aspect ratios autorizados

| Uso | Ratio | Justificación |
|---|---|---|
| Hero full-bleed | Libre (fill) | La sección define la altura |
| Card principal en 2-col | 3:4 o libre (min-height) | Foto vertical da mejor presencia |
| Card secundaria | 4:3 | Formato horizontal estándar |
| Foto en galería grande | Libre (fill) | El frame define la forma |
| Foto mobile | 1:1 o 4:5 | Mejor rendimiento en pantalla vertical |

---

## Cuando no hay foto disponible

Si una sección necesita fotografía y no existe, las alternativas (en orden de preferencia) son:

1. **Esperar a la sesión fotográfica.** No publicar sin foto real.
2. **Diagrama técnico real** de un método cromatográfico (no ilustración abstracta)
3. **Chromatogram screenshot** de un análisis real (con datos reales o de metodología pública)
4. **Foto de un componente** (columna, jeringa, vial) en primer plano

**Nunca:** Banco de imágenes de ciencia genérica, ilustraciones vectoriales de moléculas, gradientes de color como "foto".
