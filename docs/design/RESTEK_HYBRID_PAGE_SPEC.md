RESTEK_HYBRID_PAGE_SPEC.md

Rol: Director Creativo (especificación, no implementación).
Origen: Construida sobre el historial completo de la conversación con Christofer,
las reglas y hechos comerciales entregados por Codex, y verificación pública
independiente de datos técnicos Restek. No se leyó el repositorio directamente — ver
"Supuestos a verificar" al final antes de implementar.


1. Objetivo de negocio

Esta página no vende por catálogo. Genera cotizaciones B2B calificadas. El éxito no es
que el visitante "navegue el catálogo completo Restek" — es que salga de la página con
uno de dos resultados: (a) una solicitud de cotización con sus medidas exactas, o (b)
una solicitud de asesoría con su método/matriz descritos, incluso si no sabe la fase
o dimensión correcta. La página no necesita proyectar "somos el distribuidor oficial"
(no está aprobado afirmarlo) — necesita proyectar "sabemos de columnas capilares lo suficiente para
ayudarte a no comprar la incorrecta".

2. Narrativa completa

El visitante llega sabiendo, en el mejor caso, algunas medidas de su columna actual o
del método que usa; en el peor caso, solo sabe que necesita "una columna Restek para
GC". La página reconoce esa asimetría de entrada en la primera pantalla — no asume
que todos llegan sabiendo qué buscan — y ofrece dos caminos igual de válidos, sin
jerarquía visual entre "el que sabe" y "el que no sabe". Después del selector, la
matriz técnica cumple una función de contexto y confianza (mostrar que hay variedad
real de fases y aplicaciones), no de catálogo exhaustivo — por eso lleva un aviso de
cobertura visible antes de la grilla, no escondido al final. Cualquiera de los dos
caminos termina en el mismo destino funcional: una cotización con contexto suficiente
para que ventas no tenga que pedir información básica de vuelta.

3. Orden exacto de las secciones


Encabezado — eyebrow + H1 + copy corto + fotografía autorizada.
Selector de recorrido — "Conozco mis medidas" / "Necesito asesoría", inmediatamente
después del encabezado, antes de cualquier contenido técnico.
Aviso de cobertura — banner de una línea, siempre visible, no colapsable.
Matriz técnica compacta — grid de familias con filtro por aplicación (ya
implementado; ver §12).
CTA de cierre — refuerza el camino ya elegido si el usuario vino de (2), o
presenta ambos caminos de nuevo si llegó directo a la matriz por scroll.
Nota de contacto directo — para quien ya conoce su código Restek exacto.


No incluir sección de "por qué elegirnos" ni testimonios — no están aprobados ni
son relevantes para una decisión de compra B2B técnica.

4. Copy final, sin placeholders

Eyebrow:
Columnas capilares Restek disponibles a través de Del Carpio

H1:
Columnas capilares de sílice fundida

Copy de encabezado (un párrafo, no dos):
Restek fabrica cientos de combinaciones de fase, diámetro y longitud. Si ya conoce sus medidas, cotícelas directamente. Si no está seguro de la fase o configuración correcta para su método, nuestro equipo técnico le ayuda a definirla.

Selector de recorrido — tarjeta A:


Título: Conozco mis medidas
Descripción: Tengo el código Restek, o sé la fase, diámetro y longitud que necesito.
Botón: Cotizar mis medidas


Selector de recorrido — tarjeta B:


Título: Necesito asesoría
Descripción: Sé qué necesito analizar, pero no la configuración exacta de columna.
Botón: Solicitar asesoría técnica


Banner de cobertura (persistente, no un estado vacío):
Esta es una selección de familias representativas, no el catálogo completo Restek. Trabajamos con el catálogo completo bajo cotización — si no encuentra su familia aquí, use cualquiera de los dos caminos de cotización de arriba.

Filtro de aplicación (ya existente):
¿Qué necesita analizar?

CTA de cierre:
¿No encontró lo que busca? Cuéntenos su método y se lo resolvemos directamente.
→ botón: Hablar con soporte técnico

Nota de contacto directo (pie de página):
¿Ya conoce el código Restek exacto? Indíquelo en el formulario y se lo cotizamos sin pasos adicionales.

No usar la palabra "distribuidor" en ninguna variante, ni "oficial", ni "exclusivo",
en ningún punto de esta página.

5. Wireframe textual

[Eyebrow]
[H1]
[Copy de encabezado]                          [Foto columna capilar]

[Tarjeta A: Conozco mis medidas]  [Tarjeta B: Necesito asesoría]

[Banner de cobertura — ancho completo, una línea]

[¿Qué necesita analizar? — chips de aplicación]
[Grid de familias: 3 col desktop / 2 col tablet / 1 col mobile]

[CTA de cierre — ancho completo, fondo #4A5560]

[Nota de contacto directo — texto pequeño, pie]

6. Layout desktop / tablet / mobile

Desktop (≥1024px):
Encabezado en dos columnas (texto 60% / foto 40%). Selector de recorrido en dos
columnas iguales. Grid de familias en 3 columnas. Ancho máximo de contenido 1152px
(max-w-6xl), centrado.

Tablet (768–1023px):
Encabezado en una columna, foto debajo del texto, tamaño reducido (no oculta — ya
se corrigió que estaba oculta solo en mobile; debe verse en tablet también, más
pequeña). Selector de recorrido en dos columnas (se mantiene, cabe bien en 768px).
Grid de familias en 2 columnas.

Mobile (<768px):
Todo en una columna. Foto del encabezado: versión recortada más pequeña o se omite
completamente — la decisión es omitirla en mobile (no aporta información, compite
por espacio con el selector de recorrido que es la acción principal). Selector de
recorrido apilado verticalmente, tarjetas de ancho completo. Grid de familias en 1
columna. Filtro de aplicación: chips en fila horizontal con scroll táctil, no wrap
(evita que la página crezca demasiado en alto antes de llegar a la matriz).

7. Dimensiones y espaciados

Escala de espaciado en unidades Tailwind por defecto (asumiendo config estándar —
verificar contra tailwind.config):


Separación entre secciones mayores: py-16 desktop, py-10 mobile.
Separación entre encabezado y selector de recorrido: mt-10.
Gap entre tarjetas de recorrido: gap-6.
Padding interno de tarjeta de recorrido: p-8 desktop, p-6 mobile.
Gap del grid de familias: gap-6 (ya implementado).
Banner de cobertura: py-3 px-4, texto text-sm.
Radio de esquina consistente con las tarjetas de familia ya construidas: rounded-2xl
para tarjetas grandes (recorrido), rounded-lg para botones.


8. Jerarquía tipográfica Montserrat

Confirmado por Claude Code: el proyecto usa solo Montserrat (Open Sans no está
cargada). Toda la jerarquía usa la clase font-display ya existente en el proyecto,
no declaraciones de fontFamily inline (corregir esto en el componente actual, que
todavía tiene style={{ fontFamily: "Montserrat..." }} disperso).


H1: text-3xl md:text-4xl, peso 800.
Títulos de tarjeta de recorrido: text-xl, peso 800.
Nombre de familia (ya implementado): text-lg, peso 800.
Copy de encabezado y descripciones: text-base, peso 400 — importante: si
Montserrat es la única fuente cargada, el peso 400 de Montserrat es el que hace de
"cuerpo de texto"; no hay una fuente secundaria más liviana disponible. No forzar
un peso más delgado que no esté cargado en el proyecto.
Banner de cobertura y nota de pie: text-sm, peso 500 (no 400, para que no se lea
como texto legal ignorable — es información funcional, no letra chica).


9. Uso preciso de la paleta Del Carpio


Terracota #D6532B: solo en acciones — los dos botones del selector de
recorrido, el botón del CTA de cierre, estados activos de los chips de filtro.
No usar en fondos decorativos, bordes, ni texto informativo.
Tinta #4A5560: texto principal (H1, títulos, nombres de familia), y fondo
sólido del CTA de cierre.
Secundario #707E83: texto de apoyo (copy, descripciones, specs), bordes
sutiles (#707E83 a 15-20% opacidad).
Fondo #F7F9F8: fondo de página completo. Las tarjetas de familia y de
recorrido van en blanco puro sobre este fondo, sin necesitar sombra para
distinguirse (ver §17, sin sombras en reposo — el contraste de color ya las separa).


10. Tratamiento de la única fotografía disponible

Es la única imagen autorizada — no tratarla como decoración de fondo ni recortarla
de forma que pierda reconocibilidad (es literalmente el producto). Mostrarla completa,
sin overlay de color, sin efectos. Object-fit contain, no cover. Tamaño: 200×200px en
desktop, no se muestra en mobile (ver §6). No duplicarla en otras secciones de la
página para simular variedad — una sola aparición, en el encabezado.

11. Diseño de los dos recorridos

Visualmente simétricos — mismo tamaño, mismo peso tipográfico, mismo tratamiento de
borde. Ninguno lleva badge de "recomendado" (repetir el mismo error que ya corregimos
con "familia más solicitada" sería incoherente: aquí tampoco hay un camino
objetivamente mejor, depende de cuánto sabe el cliente, no de qué preferimos nosotros).
Única diferencia visual permitida: el ícono o glifo de cada tarjeta puede ser distinto
para dar identidad (ej. una medida/regla para "conozco mis medidas", un signo de
pregunta o brújula para "necesito asesoría") — sin usar iconografía "científica"
genérica tipo matraces o moléculas (prohibido explícitamente por Codex).

Comportamiento: cada tarjeta es un link completo. La etiqueta visual de acción dentro
de la tarjeta no debe ser un botón o link anidado, para mantener HTML válido. Navega
a /contacto/cotizar con los query params definidos en §18. Foco visible en
toda la tarjeta al navegar por teclado, no solo en el botón.

12. Matriz técnica y alcance de familias

El dataset actual (restek-familias.json, 10 familias en 3 grupos) se mantiene como
está — no se amplía como parte de este spec, no es tarea de diseño. Lo que cambia es
que ya no se presenta implícitamente como "el catálogo" sino con el banner de §4
siempre visible antes de la grilla. El filtro por aplicación ya construido cumple la
función de "matriz técnica compacta" que pide Codex — no se necesita una tabla
adicional en formato spreadsheet; el grid de tarjetas ya muestra fase, polaridad,
aplicaciones, rango térmico y dimensiones típicas por familia, que es la información
que pide el punto 12 del brief de Codex.

13. Comportamiento del formulario

Decisión (Opción B del brief de Codex): los CTA navegan a /contacto/cotizar,
no se embebe el formulario en la página Restek.

Justificación:


El formulario ya construido por Claude Code (react-hook-form + zod, conectado a
/api/contacto vía Resend) existe una sola vez y se reutiliza — duplicarlo dentro
de la página Restek significa mantener dos formularios con las mismas reglas de
validación en dos lugares, que es exactamente el tipo de deuda técnica que ya
identificamos como riesgo en este proyecto.
La página Restek tiene que seguir siendo liviana en mobile — es donde vive el
selector de familias y el filtro, no donde debería cargarse un formulario de hasta
16 campos (4 obligatorios + 12 opcionales entre ambos recorridos).
El costo (un clic adicional) se compensa precargando producto y modo en la URL,
así el usuario no repite información que ya dio con su elección.


La página de contacto (/contacto/cotizar) debe:


Leer modo (medidas | asesoria) y mostrar el set de campos correspondiente
(ya definidos por Codex en su brief — no se repiten aquí, están en el documento
original de Codex).
Cada campo técnico opcional debe tener, junto a él, un control "No lo sé, necesito
asesoría" — al activarlo, ese campo se deshabilita y se limpia. Si el usuario activa
esto en 2 o más campos técnicos mientras está en modo medidas, mostrar un aviso no
bloqueante sugiriendo cambiar a modo asesoria (no forzar el cambio automáticamente).


14. Estados de interacción


Tarjetas de recorrido: hover sube opacidad del borde a terracota, sin mover ni
escalar el elemento (evita jank en trackpads/mobile).
Chips de filtro y grupo: ya implementado (relleno sólido terracota cuando activo).
Botones: hover:opacity-90, sin cambio de tamaño. active:opacity-80.
Banner de cobertura: sin estado interactivo, es informativo puro.


15. Estados vacío, error, carga y éxito


Vacío (filtro sin resultados): ya implementado — mensaje + link a cotización.
Mantener.
Carga: esta página es estática/client-side simple, no depende de datos remotos
en el primer render — no requiere skeleton. Si en el futuro el dataset se sirve por
API en vez de import estático, agregar skeleton de 3 tarjetas grises con animate-pulse.
Error: si el filtro de aplicaciones queda en un estado inconsistente (ej. combinación
imposible), debe caer siempre en el mismo mensaje de vacío de §15 — no un mensaje de
error técnico distinto.
Éxito: no aplica en esta página — el estado de éxito del envío de formulario
vive en /contacto/cotizar, fuera de este alcance.


16. Navegación por teclado y foco


Orden de tabulación: eyebrow/H1 (no interactivo) → tarjeta A → tarjeta B → chips de
grupo (si se reintroducen) → chips de aplicación en orden → tarjetas de familia (cada
una es un solo foco, con el botón "Cotizar esta familia" alcanzable dentro) → CTA de
cierre → nota de contacto.
Foco visible: anillo de 2px en terracota sobre fondo blanco, 2px en blanco sobre
fondo #4A5560 (CTA de cierre) — nunca depender solo de cambio de color de fondo
para indicar foco (falla WCAG 2.1 AA de indicador no-color).
Chips de filtro: operables con Enter y Space, no solo click.


17. Motion permitido y reduced motion

Permitido únicamente:


Reveal de entrada de las tarjetas de familia al filtrar (ya implementado con
motion/AnimatePresence, layout + fade/slide corto, duration: 0.25).
Fade simple de entrada de las dos tarjetas de recorrido al cargar la página
(una vez, no en cada re-render).


No permitido: parallax, rotación de iconos, animaciones en loop, cualquier motion que
no comunique un cambio de estado real.

prefers-reduced-motion: si está activo, todas las transiciones de motion deben
usar duration: 0 o el componente debe leer la media query y desactivar initial/
animate (mostrar el estado final directamente, sin transición).

18. Contrato de datos para Codex

Query params que las dos tarjetas de recorrido y el CTA "Cotizar esta familia" deben
enviar hacia /contacto/cotizar:

?modo=medidas | asesoria
&producto=<nombre de familia | "restek-general" si viene del selector principal>
&marca=Restek


Tarjeta A ("Conozco mis medidas") → modo=medidas&marca=Restek (sin producto,
se completa en el formulario).
Tarjeta B ("Necesito asesoría") → modo=asesoria&marca=Restek.
Botón "Cotizar esta familia" dentro de cada tarjeta de familia → modo=medidas &producto=<nombre familia>&marca=Restek (mantiene el comportamiento ya implementado,
solo se agrega modo).
CTA de cierre → modo=asesoria&marca=Restek&origen=sin-resultado si viene del
estado vacío del filtro; sin origen si viene del CTA general de cierre.


La página de contacto ya lee producto y lo antepone al mensaje (confirmado por
Claude Code) — agregar lectura de modo para mostrar el set de campos correspondiente,
y de origen opcionalmente para priorizar internamente esos leads si se decide más
adelante.

19. Componentes que deben reutilizarse

No se conocen los nombres exactos de componentes compartidos del proyecto (Navigation,
Footer, Button base, etc.) porque no se leyó el repositorio — Codex/Claude Code deben
mapear estos requisitos a los componentes reales existentes, no crear nuevos si ya
hay equivalentes (mismo criterio que ya se aplicó al usar font-display en vez de
estilos inline). Específicamente reutilizar:


El componente de tarjeta de familia ya construido (FamilyCard / equivalente).
El sistema de chips (Pill / equivalente) para grupo y aplicación.
El formulario de contacto ya conectado a Resend — no crear un segundo formulario.


20. Criterios de aceptación visuales y funcionales


 No aparece la palabra "distribuidor" en ningún texto visible de la página.
 El banner de cobertura es visible sin necesidad de interactuar con el filtro.
 Las dos tarjetas de recorrido tienen exactamente el mismo tamaño y jerarquía
visual en las tres resoluciones.
 Ningún elemento usa sombra en estado de reposo (shadow-* fuera de hover).
 No hay gradientes ni glassmorphism en ningún elemento.
 Toda la tipografía usa font-display (Montserrat vía clase del sistema), cero
declaraciones fontFamily inline.
 La imagen aparece una sola vez, en el encabezado, oculta en mobile.
 Los tres query params (modo, producto, marca) llegan correctamente a
/contacto/cotizar desde los tres puntos de entrada definidos en §18.
 Navegación completa por teclado sin trampas de foco, verificada manualmente.
 prefers-reduced-motion desactiva las transiciones, verificado en DevTools.
 Contraste de texto sobre #F7F9F8 y sobre #4A5560 cumple WCAG 2.1 AA (4.5:1
texto normal, 3:1 texto grande) — verificar #707E83 sobre blanco especialmente,
es el más cercano al límite.



Supuestos verificados por Codex el 2026-07-15 antes de implementar

Resultado de la verificación contra el repositorio y la preparación técnica:


1. `docs/restek-hybrid-technical-readiness.md` confirma los dos recorridos, los 10
   registros representativos y el copy comercial seguro. Corrige dos supuestos del
   spec: no está aprobado afirmar que Del Carpio sea distribuidor oficial, y las
   tarjetas superiores son caminos hacia un formulario externo, no formularios.
2. Los componentes reales son `Navigation`, `Footer`, `Button`, `Pill` y
   `FamilyCard`; el formulario reutilizable vive en `ContactClientPage` y envía a
   `/api/contacto` mediante Resend.
3. `tailwind.config.ts` conserva breakpoints y espaciado estándar y extiende tokens
   de marca. Se mantienen las medidas del spec usando esos tokens y los colores
   documentados del sistema.
4. La estructura está confirmada: `page.tsx`,
   `columnas-capilares-restek.tsx` y `restek-familias.json`. No se requiere una
   reestructuración de ruta.
5. La auditoría de contraste detectó que `#707E83` sobre `#F7F9F8` alcanza solo
   `3.97:1`. Para texto normal se usa la derivación accesible `#647176` (`4.77:1`);
   `#707E83` se conserva en bordes y elementos no textuales.
