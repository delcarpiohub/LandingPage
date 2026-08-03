# UX — Del Carpio 2.0
## Arquitectura de experiencia de usuario

---

## El usuario objetivo

**Perfil primario:** Director o jefe de laboratorio de una empresa industrial chilena.

| Atributo | Detalle |
|---|---|
| Rol | Director de laboratorio, Jefe de control de calidad, Gerente de operaciones con responsabilidad analítica |
| Sector | Alimentos, minería, farmacéutica, aguas, ambiental |
| Educación | Químico, Bioquímico, Ingeniero en alimentos, Geólogo analítico |
| Experiencia con HPLC/GC | Media-alta — sabe lo que necesita, no sabe exactamente cómo conseguirlo |
| Motivación principal | Necesita implementar o mejorar un método analítico, pasar una auditoría, acreditar el laboratorio |
| Pain principal | No saber si el equipo que está considerando es el correcto para SU matriz de muestra específica |
| Tiempo de atención en el sitio | 45-90 segundos en la primera visita |
| Dispositivo | Desktop (60%), Mobile (40%) |

**Perfil secundario:** Gerente de compras técnicas.
Sabe que el laboratorio necesita algo pero no entiende el detalle técnico. Necesita elementos de confianza más que profundidad técnica.

---

## El journey de conversión

Del Carpio tiene UNA familia de conversión: solicitar evaluación técnica o
cotización por formulario. Existen dos caminos hacia ese mismo destino: la
solicitud de un producto/servicio puntual (`/contacto/cotizar`) y, para
compras B2B de varios equipos a la vez, la lista de equipos con solicitud
única (ver `docs/design/QUOTE_LIST_SPEC.md`). Ambos terminan en el mismo
tipo de correo a ventas — ninguno es una conversión "secundaria" de menor
jerarquía.

No hay e-commerce. No hay demo en vivo. No hay registro.
El objetivo es: **evaluación técnica inicial** — que el usuario agende o contacte a Del Carpio para una primera reunión técnica.

### El embudo

```
1. DESCUBRIMIENTO
   Búsqueda Google: "implementar HPLC chile", "validación método cromatográfico", "laboratorio analítico santiago"
   Referido por colega de la industria
   LinkedIn o evento técnico

2. PRIMERA IMPRESIÓN (0-8 segundos)
   Hero: ¿Es esto lo que busco?
   Pregunta que responde el hero: "¿Trabajan con HPLC y GC para industria chilena?"
   Respuesta del hero actual: SÍ → continuar

3. CREDIBILIDAD (8-45 segundos)
   TrustMetrics: ¿Son técnicamente competentes?
   ServiceMatrix: ¿Hacen exactamente lo que necesito?
   IndustryTabs: ¿Conocen MI sector?
   Pregunta que responde: "¿Puedo confiarles mi problema analítico?"

4. DIFERENCIACIÓN (45-90 segundos)
   ComplianceBand: ¿Cómo piensan? ¿Es este su enfoque o están vendiendo catálogo?
   LabPhotos: ¿Esto es real?
   Pregunta que responde: "¿Son mejores que los otros que he visto?"

5. CONVERSIÓN (90+ segundos)
   ContactForm: ¿Cómo empiezo?
   CTA principal: "Solicitar evaluación técnica"
```

---

## Arquitectura de información del sitio completo

### Home (página actual)
Función: Captura, credibilidad, conversión inicial.
Estructura ya implementada — no requiere cambio de IA.

### /servicios
Función: Detalle de cada servicio con proceso, evidencia y CTA.
Estado: Pendiente de diseño. 4 páginas de servicio + índice.

**Estructura de página de servicio individual:**
```
1. Hero de servicio: Foto tipo B (mano técnica) + nombre del servicio + sector(es) donde aplica
2. Qué es: Descripción en prosa técnica (no bullets)
3. Proceso: Paso a paso visual (podría ser el ProcessTimeline que existe en process-timeline.tsx)
4. Para qué sirve: Casos de uso con sectores específicos
5. Evidencia: Proyecto real o caso documentado de ese servicio
6. CTA: "Solicitar este servicio" → formulario con sector y tipo pre-seleccionados
```

### /proyectos (futuro)
Función: Evidencia de trabajo real. El portfolio técnico.
Estructura futura: Grid de proyectos con filtro por sector. Cada proyecto: foto + descripción técnica + tags de método.

### /empresa (futuro)
Función: Confianza en las personas detrás del criterio técnico.
Estructura futura: Quiénes somos (no bio genérica), qué estamos construyendo, cómo trabajamos.

---

## Flujo de navegación

### Navegación principal
```
Logo → home
Servicios → /servicios (link de página)
Capacidades → /#capacidades (anchor al ComplianceBand)
Industrias → /#industrias (anchor al IndustryTabs)
Contacto → /#contacto (anchor al ContactForm)
CTA: "Solicitar evaluación técnica" → /#contacto
```

### Flujo esperado (home)
```
Entra en Hero → ve la foto + el h1 + los CTAs
↓ scroll
TrustMetrics → "ah, usan HPLC, GC, IQ/OQ/PQ — son técnicos"
↓ scroll
ServiceMatrix → "esto es exactamente lo que necesito — validación y mantención"
↓ scroll
IndustryTabs → "trabajan con minería — perfecto, soy de minería"
↓ scroll
ComplianceBand → "hacen criterio primero, no catálogo — confío"
↓ scroll
LabPhotos → "esta es su instalación real — existe"
↓ scroll
ContactForm → convierte
```

### Conversión alternativa
El CTA en el hero ("Solicitar evaluación técnica") lleva directamente al formulario sin scroll.
Esta es la conversión rápida para el usuario que ya sabe lo que quiere.

---

## Accesibilidad (obligatorio)

| Requisito | Implementación |
|---|---|
| Navegación por teclado | Todos los elementos interactivos alcanzables con Tab |
| Focus visible | Ring de acento visible en `:focus-visible` |
| Jerarquía semántica | h1 único en cada página, h2 para secciones, h3 para subsecciones |
| Alt text en imágenes | Descriptivo y específico — no "foto de laboratorio" |
| Contraste WCAG 2.1 AA | Verificado para todas las combinaciones de texto/fondo |
| Reduced motion | El `<Reveal>` ya lo respeta; todos los nuevos componentes también |
| ARIA | `aria-label` en links que solo tienen íconos, `role` donde sea necesario |
| Idioma | `lang="es"` en el `<html>` |

---

## Métricas de éxito

Las métricas que indican que el diseño está funcionando:

| Métrica | Target | Medición |
|---|---|---|
| Time on page (home) | > 75 segundos | Google Analytics |
| Scroll depth (home) | > 70% llegan al ContactForm | GA o hotjar |
| Conversión formulario | > 3% de visitas únicas | Conteo de formularios en Resend |
| Bounce rate | < 55% | GA |
| Mobile contact rate | Similar a desktop | GA segmentado |

Estas métricas NO existen todavía. Configurarlas en Google Analytics después del lanzamiento.

---

## Lo que el UX no hace

El sitio de Del Carpio NO intenta ser:
- Una tienda online (sin precios, sin pagos, sin checkout, sin gestión de stock)
- Un portal de clientes (sin login, sin documentos privados)
- Un blog de contenido (sin artículos ni posts)

Cualquier feature que apunte hacia uno de esos modelos debe discutirse antes de implementarse.
El sitio es: **tarjeta de presentación técnica de alta calidad + contacto directo**.

> **Actualización 2026-08-03 — corrección de contradicción interna.** Esta
> sección prohibía anteriormente "un catálogo de productos (sin listado de
> equipos con specs)". Esa prohibición quedó obsoleta: el catálogo de
> productos (`/productos`, `src/components/sections/product-catalog.tsx`) ya
> existe y está implementado. Lo que sigue sin existir — y que esta
> actualización habilita explícitamente bajo especificación — es una **lista
> de equipos para cotización múltiple B2B**: un cliente reúne varios
> productos y los envía en una sola solicitud a ventas. Esto NO es un
> carrito de e-commerce: no hay precios, no hay pago, no hay stock, no hay
> checkout. Es una extensión del mismo objetivo de conversión que ya tiene
> el sitio (`ContactForm` / `/contacto/cotizar`), aplicada a más de un
> producto a la vez. Especificación completa, terminología aprobada y
> límites de alcance en `docs/design/QUOTE_LIST_SPEC.md`.
