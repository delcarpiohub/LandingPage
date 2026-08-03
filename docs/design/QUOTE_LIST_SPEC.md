# Lista de equipos y buscador global — especificación

Fecha: 2026-08-03
Autor: Claude Code (Director Creativo / UX Architect)
Estado: lista para que Codex implemente por partes. Ver sección 7 para qué
puede construirse ya y qué queda bloqueado.

Esta especificación reemplaza la prohibición obsoleta de `docs/design/UX.md`
("catálogo de productos / listado de equipos con specs") y define, sin
ambigüedad, cómo conviven el buscador global y la lista de equipos con el
resto del sistema de diseño de Del Carpio. Codex no debe improvisar ningún
detalle visual, de copy o de comportamiento que no esté aquí — si falta
algo, se detiene y se pide la actualización correspondiente.

---

## 0. Objetivo de negocio

Del Carpio vende equipamiento analítico B2B mediante cotización, no
mediante venta directa. Hoy el sitio ya permite cotizar **un** producto a
la vez desde su ficha (`/productos/[slug]` → botón "Cotizar y Asesorar" →
`/contacto/cotizar?producto=slug`). Ese camino se mantiene sin cambios.

Lo que falta es que un jefe de laboratorio o encargado de compras que
necesita, por ejemplo, un HPLC + un set de columnas + un baño maría, pueda
reunir los tres en una sola lista y enviar **una sola solicitud** a ventas,
en vez de llenar el formulario tres veces o escribir un correo suelto.

Reglas explícitas, sin excepción:
- No hay precios en ningún punto del flujo.
- No hay pago, checkout, ni pasarela de ningún tipo.
- No hay gestión de stock ni disponibilidad prometida.
- No hay cuenta de usuario ni login. La lista vive en el navegador del
  cliente (`localStorage`), no en un backend.
- El resultado final siempre es un correo a ventas, igual que el resto del
  sitio — no una orden de compra.

---

## 1. Terminología aprobada (obligatoria, sin variaciones)

| Usar siempre | Nunca usar |
|---|---|
| Agregar a cotización | Agregar al carrito |
| Lista de equipos | Carrito, cesta, bolsa |
| Mi solicitud | Mi carrito, mi pedido |
| Enviar solicitud | Comprar, pagar, finalizar compra, checkout |
| Cotización / cotizar | Compra, pedido, orden |

Esto aplica a copy visible, `aria-label`, `title`, nombres de componentes
nuevos (`quote-list`, no `cart`), variables de estado, claves de
`localStorage` y nombres de rutas. Un componente llamado `cart.tsx` o una
ruta `/carrito` es una desviación de esta especificación, no un detalle
menor.

---

## 2. Buscador global

### 2.1 Qué se puede buscar (y qué no)

El buscador indexa únicamente datos que ya existen y son confiables en
`src/lib/mock-products.ts` (`Product`):

| Campo buscable | Origen | Condición |
|---|---|---|
| Nombre comercial | `product.name` | Siempre |
| Marca | `product.detail.brand` | Solo si `detail` existe |
| Modelo o código | `product.detail.model` | Solo si `detail` existe |
| Familia/categoría | `product.category` | Siempre |
| Aplicación/industria | — | **No disponible hoy** — ver 2.1.1 |

No indexar `description` completa como campo de coincidencia primaria (es
prosa larga, genera falsos positivos); puede usarse como señal secundaria
de baja prioridad si ayuda a no dejar el buscador vacío, pero el ranking
de resultados prioriza nombre → marca/modelo → categoría.

**2.1.1 — Aplicación/industria: bloqueado, no inventar.** El modelo de
datos actual (`Product`) no tiene un campo estructurado de industria o
aplicación (alimentos, minería, farmacéutica, etc.). `tags` es texto libre
no normalizado y no puede asumirse que documenta industria de forma
consistente. **Codex no debe inferir ni inventar esta relación producto ↔
industria.** Esta faceta de búsqueda queda fuera de la v1 hasta que exista
un campo explícito (ej. `product.industries: SectorSlug[]`) poblado con
datos reales de ventas. Cuando ese campo exista, se agrega como filtro
adicional sin rediseñar el buscador.

### 2.2 Ubicación

- **Desktop (≥1024px):** un botón ícono (lupa, `MagnifyingGlass` de
  `@phosphor-icons/react`, tamaño 20px) en el header, inmediatamente a la
  izquierda del bloque de CTA "Tour virtual del laboratorio" (dentro del
  contenedor de la derecha del nav, ver `src/components/sections/navigation.tsx`
  líneas 412-475). No se agrega un input de texto permanente en el header —
  el header ya está denso (logo 18% / links 54% / CTA+social 28%); un
  input inline competiría por espacio y forzaría el layout a romperse en
  pantallas medianas.
- **Mobile / tablet (<1024px):** el mismo botón ícono de lupa, ubicado
  inmediatamente a la izquierda del botón hamburguesa (`List`/`X`), incluso
  espaciado (`gap-2` o similar), ambos con tap target mínimo 44×44px.
- El click/tap abre un **overlay de búsqueda a pantalla completa** (no un
  dropdown pequeño), fondo `ink.dark` (`#4A5560`) semitransparente con
  blur, panel de resultados en `ink.surface` blanco. Esto reutiliza el
  lenguaje visual ya establecido en el mobile drawer del nav
  (`bg-[#101820]/98 backdrop-blur-[18px]` — ese hex es el ink "antiguo" que
  aún aparece en `navigation.tsx`; el overlay de búsqueda debe usar los
  tokens vigentes: `ink.dark` `#4A5560` para textos oscuros, `primary`
  `#D6532B` para acentos, nunca azules o teals).
- Cierre: tecla `Escape`, click fuera del panel, click en un ícono `X`
  visible en la esquina superior del overlay, o al navegar a un resultado.

### 2.3 Comportamiento

- **Input:** autofocus al abrir el overlay. Placeholder: "Buscar por
  nombre, marca, modelo o categoría".
- **Debounce:** 200ms desde el último carácter antes de filtrar (la
  búsqueda es client-side sobre `mockProducts`, así que el filtrado en sí
  es instantáneo; el debounce evita re-renderizar en cada tecla en listas
  largas).
- **Autocompletado:** a partir del 2º carácter, mostrar hasta 6 resultados
  agrupados visualmente por coincidencia (no hace falta agrupar por
  categoría en UI, basta una lista simple ordenada por relevancia). Cada
  resultado muestra: imagen miniatura (`product.imageUrl`, `40×40px`,
  `object-contain`), nombre, y `marca · modelo` en texto secundario
  (`secondary` `#707E83`) cuando exista `detail`. Click navega a
  `/productos/[slug]`.
- **"Ver todos los resultados":** si hay más de 6 coincidencias, un link al
  final de la lista navega a `/productos?q=<término>` (el catálogo ya
  soporta el parámetro `q` — ver `product-catalog.tsx` línea 89).
- **Estado vacío (0 caracteres):** no mostrar "sin resultados". Mostrar en
  su lugar accesos directos a las categorías con más productos (usar
  `productFilters` existentes, máximo 6, como chips/links). Esto le da
  utilidad al overlay incluso antes de escribir, sin inventar contenido.
- **Estado sin resultados (con texto, 0 matches):** mensaje "No encontramos
  equipos para «{término}»" + botón secundario "Ir al catálogo completo"
  (`/productos`) + link "Enviar una consulta" (`/contacto/ventas`) para el
  caso en que el producto exista pero no esté en el catálogo público.
- **Estado de carga:** dado que el filtrado es síncrono sobre datos ya
  cargados en el cliente, no hay estado de carga real en la v1 (no
  inventar un spinner falso). Si en el futuro el buscador pasa a consultar
  un backend, ahí sí se agrega skeleton — no antes.
- **Teclado:** flechas arriba/abajo navegan los resultados, `Enter`
  navega al resultado resaltado, `Escape` cierra el overlay y devuelve el
  foco al botón de búsqueda que lo abrió.

---

## 3. Lista de equipos

### 3.1 Persistencia

- `localStorage`, clave `dc_lista_equipos_v1`.
- Estructura almacenada: `{ items: QuoteListItem[], updatedAt: number }`
  (timestamp epoch ms).
- **Expiración: 30 días desde `updatedAt`.** Al leer la lista en cualquier
  punto de la app, si `Date.now() - updatedAt > 30 * 24 * 60 * 60 * 1000`,
  se descarta el contenido y se trata como lista vacía (no se muestra
  ningún mensaje de "tu lista expiró" — simplemente empieza vacía, es un
  detalle de implementación, no un evento que el usuario necesite
  procesar).
- Lectura/escritura mediante un store externo minimalista sobre
  `localStorage`, siguiendo el mismo patrón ya usado en
  `product-catalog.tsx` (`useSyncExternalStore` con `subscribe` /
  `getSnapshot` / `getServerSnapshot` devolviendo el estado vacío en SSR).
  No usar Redux, Zustand ni ninguna librería nueva — el patrón ya existe en
  el repo y es suficiente.

### 3.2 Campos por producto (`QuoteListItem`)

```ts
type QuoteListItem = {
  productId: string;      // product.id
  slug: string;            // product.slug ?? product.id
  nombre: string;           // product.name (copiado al agregar, no se relee en vivo)
  marca?: string;           // product.detail?.brand
  modelo?: string;          // product.detail?.model
  cantidad: number;         // default 1, entero positivo, tope 999
  observacion?: string;     // texto libre, máx 500 caracteres
  configuracion?: string;   // ver nota abajo — bloqueado para la mayoría de productos
};
```

**Nota sobre `configuracion` (variante/configuración opcional):** el modelo
de datos `Product` actual no tiene un campo de variantes o configuraciones
(no hay tallas, diámetros, opciones seleccionables por SKU en el catálogo
general). La única familia que sí maneja variantes técnicas explícitas es
Restek (ver `RESTEK_QUOTE_MODES` y los campos `diametroInterno`,
`longitudColumna`, etc. en `src/lib/contact-schema.ts`), y esa familia ya
tiene su propio flujo (`docs/design/RESTEK_HYBRID_PAGE_SPEC.md`) fuera de
esta lista genérica. **Para la v1 de la lista de equipos, el campo
`configuracion` se implementa como un textarea libre opcional ("Detalle de
configuración, si aplica") disponible para todos los productos, sin
validación estructurada.** No se construye un selector de variantes por
producto — eso requeriría que cada ficha declare qué variantes tiene, dato
que no existe hoy. Si ventas necesita variantes estructuradas por
producto, es una tarea de datos previa, no de UI.

### 3.3 Acciones permitidas

- **Agregar:** botón "Agregar a cotización" en la tarjeta de catálogo
  (grid y list view) y en la ficha de producto. Si el producto ya está en
  la lista, el mismo botón cambia su estado visual (ver 3.5) y su acción
  pasa a ser "abrir la lista" en vez de "agregar de nuevo" — no se permite
  duplicar la misma `slug` como dos ítems separados; agregar un producto ya
  presente incrementa su `cantidad` en 1 en vez de crear una fila nueva.
- **Modificar cantidad:** stepper +/- o input numérico dentro del panel,
  mínimo 1, máximo 999. Al llegar a 0 con el botón "-", se pregunta antes
  de eliminar (mismo patrón que "eliminar", no una eliminación silenciosa).
- **Editar observación:** textarea inline dentro de la fila del panel, sin
  modal separado.
- **Eliminar:** ícono de papelera por fila, sin confirmación (acción de
  bajo costo, fácilmente reversible con "Agregar a cotización" de nuevo) —
  pero SÍ debe anunciarse por lector de pantalla (ver sección 6).
- **Vaciar lista:** botón al pie del panel, con confirmación obligatoria
  (modal o `window.confirm`-equivalente accesible, no un `confirm()`
  nativo del navegador — usar el mismo patrón de diálogo que ya use el
  resto del sitio si existe uno, o un diálogo simple con dos botones
  "Cancelar" / "Vaciar lista"). Esta es la única acción destructiva total,
  por eso lleva confirmación explícita a diferencia de eliminar un ítem.
- **Tope de lista:** máximo 30 productos distintos. Al llegar al tope, el
  botón "Agregar a cotización" se deshabilita en productos no presentes en
  la lista y muestra un tooltip/mensaje: "Tu lista alcanzó el máximo de 30
  equipos. Envía esta solicitud o elimina alguno para agregar más." Esto
  evita correos de ventas imposibles de procesar, no es un límite
  arbitrario de UX.

### 3.4 Panel visual

- **Trigger en el header:** ícono `ClipboardText` (Phosphor) — deliberadamente
  no un ícono de carrito de compras — con un badge circular numérico en
  `primary` (`#D6532B`) mostrando la cantidad de productos distintos
  (no la suma de cantidades) cuando `items.length > 0`. `aria-label`:
  `"Mi solicitud, {N} equipos"` o `"Mi solicitud, vacía"`.
  Ubicación: junto al ícono de búsqueda (sección 2.2), mismo tratamiento
  en desktop y mobile.
- **Panel:** drawer lateral desde la derecha, ancho `420px` en desktop
  (`≥1024px`), `100vw` en tablet/mobile con un margen de scroll seguro.
  Fondo `ink.surface` blanco, borde izquierdo `1px solid ink.border`
  (`#E8E8E8`), sombra `shadow-nav` (ya definida en `tailwind.config.ts`).
  No es un modal centrado — un drawer lateral comunica "panel de trabajo
  persistente mientras sigues navegando", no "interrupción tipo compra".
- **Header del panel:** título "Lista de equipos", contador "{N} equipos",
  botón cerrar (`X`) arriba a la derecha.
- **Cuerpo:** lista de filas, cada una: nombre + marca/modelo en línea
  secundaria, stepper de cantidad, textarea colapsado de observación
  (expandible con un link "Agregar observación" si está vacío, para no
  saturar visualmente filas sin nota), ícono eliminar.
- **Pie del panel:** botón primario "Enviar solicitud" (terracota, mismo
  tratamiento que el Button Primary del sitio) que navega a la página de
  solicitud única (sección 4), y botón secundario de texto "Vaciar lista".
- **Estado vacío del panel:** ícono `ClipboardText` en gris, texto "Tu
  lista de equipos está vacía. Agrega productos desde el catálogo para
  reunirlos en una sola solicitud." + botón "Ir al catálogo" (`/productos`).
- **Tablet:** mismo drawer, ancho `100vw` con `max-width: 480px` si la
  pantalla lo permite (≥768px), igual que mobile por debajo de eso.
- Estética: sobria, bordes rectos o `rounded-[4px]` (consistente con
  `product-catalog.tsx`, que ya usa `rounded-[4px]` en vez de pills
  redondeadas para elementos de catálogo/lista). Nada de sombras
  decorativas, nada de badges de colores fuera de la paleta, nada de
  iconografía de bolsa de compras, carrito o etiquetas de precio tachado.

### 3.5 Estado del botón "Agregar a cotización" en catálogo/ficha

| Estado | Visual | Texto |
|---|---|---|
| No está en la lista | `secondary` outline o texto, ícono `ClipboardText` | "Agregar a cotización" |
| Está en la lista | `primary` terracota sutil o check visible, ícono `CheckCircle` | "En tu lista de equipos" (click abre el panel, no vuelve a agregar) |
| Lista llena (30/30) y este producto no está | disabled, opacity reducida | "Lista de equipos completa" |

Este botón es **secundario** frente al CTA existente "Cotizar y Asesorar"
de la ficha de producto — ese botón individual no se toca ni se reemplaza.
Ambos coexisten: uno es la conversión rápida de un solo producto (sin
pasar por la lista), el otro es para quien está comparando/reuniendo
varios equipos antes de escribir a ventas.

---

## 4. Solicitud única

### 4.1 Ruta

`/contacto/lista-cotizacion` — ruta nueva, independiente de
`/contacto/cotizar` (que sigue existiendo para el flujo de un solo
producto y tiene una forma de datos distinta: `producto` singular vs.
`equipos` como arreglo). No reutilizar `/contacto/cotizar` con parámetros
extra; mezclar ambas formas de datos en el mismo componente generaría
condicionales frágiles para Codex y para mantenimiento futuro.

### 4.2 Datos de contacto (una sola vez)

Reutilizar exactamente los campos base ya definidos en
`src/lib/contact-schema.ts`: `nombre`, `empresa`, `correo`, `telefono`.
No se piden por ítem — se piden una única vez para toda la solicitud,
igual que en el resto del sitio. Se agrega un campo opcional adicional
`mensaje` (ya existe en el schema) para contexto general de la solicitud
completa (ej. "Necesitamos todo esto para fines de mes").

Extensión de schema necesaria (Codex la implementa junto con la UI, no por
separado):

```ts
const quoteListItemSchema = z.object({
  productId: z.string().max(120),
  slug: z.string().max(160),
  nombre: z.string().max(200),
  marca: z.string().max(80).optional(),
  modelo: z.string().max(120).optional(),
  cantidad: z.number().int().min(1).max(999),
  observacion: z.string().max(500).optional(),
  configuracion: z.string().max(500).optional(),
});

// Se agrega a contactSchema (o se crea un schema hermano
// quoteListRequestSchema que reutiliza los mismos campos base de
// contacto) un campo:
equipos: z.array(quoteListItemSchema).min(1).max(30).optional(),
```

La API (`src/app/api/contacto/route.ts`) ya tiene el patrón de armar tablas
HTML por sección — agregar una tabla adicional "Equipos solicitados" que
itere `equipos` cuando el payload la incluya, siguiendo exactamente el
mismo patrón de `escapeHtml` ya usado ahí (no hay campo de este flujo que
deba saltarse ese escape).

### 4.3 Estructura del correo a ventas

Reutiliza el mismo remitente/formato ya implementado en
`src/app/api/contacto/route.ts`. Destinatario: el mismo que hoy usa el
resto del sitio — actualmente `cvillagran@delcarpio.cl` de forma temporal
mientras Resend está en modo de prueba; pasará a `ventas@delcarpio.cl`
cuando el dominio esté verificado (esto no es una decisión nueva de esta
spec, es el mismo pendiente que ya existe para todo el sitio — no crear un
destinatario distinto solo para este flujo).

Asunto sugerido: `Nueva solicitud de cotización múltiple — {N} equipos`.

Cuerpo: tabla de datos de contacto (igual formato que hoy) + tabla nueva
"Equipos solicitados" con columnas: Nombre, Marca, Modelo/código,
Cantidad, Observación, Configuración (solo si el ítem la tiene) — cada
fila también un link a `https://www.delcarpio.cl/productos/{slug}` para
que ventas pueda abrir la ficha directamente.

### 4.4 Adjuntos — **BLOQUEADO, no implementar**

No está decidido si la solicitud de lista permite adjuntar archivos
(ej. una especificación técnica en PDF, un Excel de requerimientos). Esto
requiere una decisión de gerencia/Marketing sobre:
- Formatos permitidos.
- Peso máximo por archivo y total.
- Dónde se almacenan (Vercel Blob u otro) y por cuánto tiempo.
- Seguridad: validación de tipo real de archivo (no solo extensión),
  escaneo si corresponde, y si los adjuntos se envían por correo o se
  entregan como link temporal.

**Codex no debe implementar ningún input de tipo archivo en este flujo**
hasta que exista una decisión documentada aquí o en una spec nueva. Si el
formulario necesita "algo" en el lugar de adjuntos por ahora, la solución
es un campo de texto libre "¿Necesitas adjuntar algo? Indícalo aquí y
ventas te contactará para coordinarlo" — no un `<input type="file">` a
medio implementar.

---

## 5. Accesibilidad y rendimiento

- **Teclado:** todo el flujo (abrir buscador, abrir lista, agregar,
  modificar cantidad, eliminar, vaciar, enviar) debe ser operable sin
  mouse. El drawer de la lista y el overlay de búsqueda atrapan el foco
  mientras están abiertos (focus trap) y devuelven el foco al botón que
  los abrió al cerrarse.
- **Focus visible:** mismo tratamiento que el resto del sitio — ring de
  `primary` en `:focus-visible`, nunca se remueve el outline por defecto
  sin reemplazo.
- **Anuncios (aria-live):** una región `aria-live="polite"` (visualmente
  oculta, `sr-only`) anuncia: "«{nombre}» agregado a tu lista de equipos,
  {N} en total" al agregar, y "«{nombre}» eliminado de tu lista de
  equipos" al eliminar. Esto es obligatorio, no opcional — es la única
  forma en que un usuario de lector de pantalla se entera de que la acción
  ocurrió, ya que el badge del header no está enfocado en ese momento.
- **Sin animaciones decorativas:** el drawer y el overlay usan transición
  funcional (slide/fade, 200-280ms `ease-out`, consistente con los tokens
  ya usados en `Interaction.md` y `Navigation.md` — no una duración nueva
  inventada) y respetan `prefers-reduced-motion` (transición instantánea
  si está activo, ya que `Reveal` y el resto del sitio siguen ese patrón).
- **Carga diferida / client components:** el store de la lista, el botón
  "Agregar a cotización", el drawer y el overlay de búsqueda son Client
  Components (`"use client"`) por necesidad real (estado, `localStorage`,
  interactividad). El resto de cada página (catálogo, ficha de producto)
  se mantiene Server Component como ya está. No convertir páginas enteras
  a cliente por agregar estos componentes — se insertan como islas,
  siguiendo el mismo patrón que ya usa `ProductGallery` o
  `BackToCatalogLink`.
- **Estados de carga y vacíos:** ya definidos en 2.3 (buscador) y 3.4
  (lista vacía). La página `/contacto/lista-cotizacion` con lista vacía
  (ej. usuario llega por link directo sin haber agregado nada) debe
  mostrar un estado vacío claro con CTA a `/productos`, no un formulario
  en blanco confuso.

---

## 6. Checklist de aceptación para Codex

**Buscador global**
- [ ] Ícono de búsqueda visible en header desktop y mobile, tap target ≥44px.
- [ ] Overlay a pantalla completa, cierra con `Escape`, click fuera, o botón `X`.
- [ ] Busca solo por nombre, marca, modelo, categoría — nada de campos inventados.
- [ ] Estado vacío muestra categorías, no "sin resultados".
- [ ] Estado sin coincidencias ofrece "ir al catálogo" y "enviar consulta".
- [ ] Navegación completa por teclado (flechas, Enter, Escape).
- [ ] `/productos?q=` sigue funcionando para "ver todos los resultados".

**Lista de equipos**
- [ ] Persistencia en `localStorage` bajo `dc_lista_equipos_v1`, expira a 30 días.
- [ ] Agregar un producto ya presente incrementa cantidad, no duplica fila.
- [ ] Cantidad: mínimo 1, máximo 999, sin permitir 0 sin confirmar eliminación.
- [ ] Observación por ítem, máximo 500 caracteres, opcional.
- [ ] Campo `configuracion` implementado como textarea libre opcional (no selector estructurado).
- [ ] Vaciar lista requiere confirmación explícita (no `confirm()` nativo).
- [ ] Tope de 30 productos distintos, con mensaje claro al llegar al límite.
- [ ] Trigger en header con badge numérico, ícono `ClipboardText` (nunca ícono de carrito).
- [ ] Botón "Agregar a cotización" coexiste con "Cotizar y Asesorar" existente, no lo reemplaza.
- [ ] Terminología aprobada (sección 1) usada en el 100% del copy visible y `aria-label`.
- [ ] Ningún precio, ningún indicador de stock, ningún elemento de pago en ningún estado.

**Solicitud única**
- [ ] Ruta nueva `/contacto/lista-cotizacion`, no reutiliza `/contacto/cotizar`.
- [ ] Datos de contacto pedidos una sola vez (nombre, empresa, correo, teléfono).
- [ ] Schema `equipos` agregado a `contact-schema.ts`, `min(1).max(30)`.
- [ ] Email a ventas incluye tabla de equipos con link a cada ficha de producto.
- [ ] Sin ningún input de tipo archivo / adjunto (bloqueado, ver 4.4).
- [ ] Mismo destinatario temporal que el resto del sitio (no uno nuevo hardcodeado).

**Accesibilidad y rendimiento**
- [ ] Focus trap en drawer y overlay; foco vuelve al trigger al cerrar.
- [ ] `aria-live="polite"` anuncia agregar/eliminar.
- [ ] `prefers-reduced-motion` respetado en todas las transiciones nuevas.
- [ ] Componentes nuevos son Client Components solo donde es indispensable.

### Límites explícitos de alcance (fuera de esta spec, no implementar)

- Facet de búsqueda por aplicación/industria — bloqueado por falta de dato estructurado (2.1.1).
- Selector de variantes/configuración por producto — bloqueado por falta de modelo de datos (3.2).
- Adjuntos en la solicitud — bloqueado, pendiente decisión de gerencia (4.4).
- Cambio del destinatario de correo (`ventas@delcarpio.cl`) — depende de la verificación de dominio en Resend, ya documentada como pendiente general del sitio, no exclusiva de esta feature.
- Sincronización de la lista entre dispositivos o backend — explícitamente fuera de alcance; es `localStorage` únicamente en esta versión.

### Qué se puede implementar ahora

Todo lo marcado con checklist arriba excepto los cinco puntos bloqueados
recién listados. Codex puede implementar buscador global, lista de
equipos completa (con `configuracion` como texto libre) y la página de
solicitud única con los datos de contacto base, sin esperar ninguna
decisión adicional.
