# Restek GC - preparacion tecnica para especificacion creativa

Fecha: 2026-07-15  
Responsable de esta auditoria: Codex  
Estado: listo para que Claude produzca la especificacion de diseno; implementacion visual bloqueada hasta entonces.

## 1. Objetivo aprobado por el usuario

Reemplazar el enfoque de catalogo exhaustivo para columnas capilares de silice fundida Restek por una pagina hibrida B2B que:

- comunique que Del Carpio comercializa todas las familias de silice fundida Restek;
- permita cotizar cuando el cliente conoce las medidas;
- permita pedir asesoria cuando el cliente no conoce la configuracion exacta;
- muestre una matriz tecnica compacta por familia, sin reproducir cientos de SKU;
- priorice contacto directo con ventas por formulario, correo, telefono o WhatsApp;
- no publique precios, cantidades minimas ni plazos fijos.

## 2. Hechos comerciales confirmados

- Del Carpio comercializa todas las familias de columnas capilares de silice fundida Restek.
- La venta es mediante cotizacion B2B.
- Aproximadamente el 90% de los productos se solicita a pedido.
- La disponibilidad y el plazo varian segun la configuracion y deben confirmarse durante la cotizacion.
- No existen cantidades minimas declaradas.
- No se publican precios.
- Las imagenes entregadas y el logotipo Restek estan autorizados para uso en el sitio.
- El destinatario temporal de las solicitudes es `cvillagran@delcarpio.cl`.
- El destinatario futuro sera `ventas@delcarpio.cl` cuando el dominio y el flujo comercial esten preparados.
- No esta aprobado afirmar `Distribuidor oficial Restek en Chile`.
- Redaccion segura mientras gerencia no apruebe otra: `Columnas capilares Restek disponibles a traves de Del Carpio`.

## 3. Estado tecnico existente

Ruta ya integrada:

`/productos/restek/columnas-capilares-silice-fundida`

Archivos actuales:

- `src/app/productos/restek/columnas-capilares-silice-fundida/page.tsx`
- `src/app/productos/restek/columnas-capilares-silice-fundida/columnas-capilares-restek.tsx`
- `src/app/productos/restek/columnas-capilares-silice-fundida/restek-familias.json`
- `public/productos/restek/columna-capilar-silice-fundida.webp`
- tarjeta y filtro de marca Restek en `src/lib/mock-products.ts` y `src/components/sections/product-catalog.tsx`

El prototipo actual contiene 10 entradas agrupadas:

- Rtx-5 / Rtx-5MS
- Rtx-1
- Rtx-624
- Stabilwax / Stabilwax-DB
- Rxi-5Sil MS
- Rxi-1ms
- Rxi-XLB
- Rtx-CLPesticides / Rtx-OPPesticides
- Rtx-Dioxin2
- Rtx-Volatile Amine / Rtx-5 Amine / Rtx-35 Amine

Esto no equivale a todas las familias de silice fundida. La interfaz no debe presentarlo como cobertura exhaustiva. Claude debe especificar si la matriz muestra una seleccion representativa con acceso a asesoria o si incorpora una lista expandible obtenida de la tabla oficial de fases.

## 4. Contrato funcional del formulario

### Camino A: el cliente conoce las medidas

Datos de contacto obligatorios, reutilizando el schema existente:

- nombre;
- empresa;
- correo;
- telefono.

Datos tecnicos opcionales:

- fase estacionaria;
- diametro interno (`ID`) en mm;
- longitud en m;
- espesor de pelicula (`df`) en micrometros;
- codigo Restek;
- cantidad;
- equipo o modelo de GC;
- detector;
- metodo o norma;
- columna utilizada actualmente;
- observaciones libres.

### Camino B: el cliente necesita asesoria

Datos de contacto obligatorios:

- nombre;
- empresa;
- correo;
- telefono.

Contexto tecnico opcional:

- tipo de muestra o matriz;
- analitos;
- detector;
- metodo o norma;
- columna actual;
- problema que necesita resolver;
- observaciones libres.

Todos los datos tecnicos deben permitir una respuesta equivalente a `No lo se, necesito asesoria`.

### Integracion existente

- La ruta valida es `/contacto/cotizar`.
- El query param `producto` ya se antepone al mensaje enviado a `/api/contacto`.
- El formulario `cotizar` actualmente oculta sector y mensaje; no posee los campos tecnicos Restek.
- El schema compartido vive en `src/lib/contact-schema.ts`.
- La API vive en `src/app/api/contacto/route.ts` y actualmente envia a `cvillagran@delcarpio.cl`.

Claude debe especificar si el formulario Restek se muestra dentro de la pagina o si ambos caminos navegan a `/contacto/cotizar` con un modo y datos precargados. Codex no decidira esta UX.

## 5. Fuentes oficiales permitidas

- Guia de seleccion de columnas GC: `https://discover.restek.com/wp-content/uploads/GNAR1724.pdf`
- Tabla de fases y equivalencias: `https://discover.restek.com/articles/gnot3472/gc-column-cross-reference-chart/`
- Guia general de instalacion: `https://discover.restek.com/instruction-sheet/gnot5427/restek-capillary-column-installation-guide`
- Catalogo web de columnas GC: `https://www.restek.com/global/en/c/1109/`
- Familias Rxi: `https://www.restek.com/c/1441`

Reglas de contenido:

- No inventar rangos, equivalencias, aplicaciones ni compatibilidades.
- Mantener los datos a nivel de familia; no copiar cientos de SKU.
- Separar columnas de silice fundida de columnas metalicas MXT y de columnas PLOT cuando corresponda.
- Las temperaturas pueden variar segun numero de catalogo; no publicar un unico limite si Restek lo condiciona a la configuracion.
- Enlazar la guia general de instalacion como recurso secundario; no almacenar decenas de instrucciones individuales.

## 6. Recurso visual confirmado

Archivo original autorizado:

`C:\Users\cvillagran\Documents\Catalogos -  Productos\Restek\restek_columnas_gc.jpg`

El recurso actualmente publicado es una conversion WebP del mismo producto:

`public/productos/restek/columna-capilar-silice-fundida.webp`

No hay por ahora una fotografia oficial adicional de mayor resolucion. La especificacion debe funcionar correctamente con una sola imagen de producto y no depender de una galeria ficticia.

## 7. Restricciones de marca y experiencia

- Montserrat como unica familia tipografica.
- Terracota `#D6532B` como color de accion.
- Tinta `#4A5560`, secundario `#707E83` y fondo `#f7f9f8`.
- Sin colores fuera del sistema Del Carpio.
- Sin sombras en reposo.
- Sin motion decorativo; solo Reveal y transiciones funcionales con `prefers-reduced-motion`.
- No usar la afirmacion `Distribuidor oficial`.
- No usar precios, stock garantizado, plazos fijos ni claims contractuales.
- La pagina debe ser usable con teclado y cumplir WCAG 2.1 AA.

## 8. Entregable requerido a Claude

Claude debe crear una especificacion nueva en:

`docs/design/RESTEK_HYBRID_PAGE_SPEC.md`

La especificacion debe definir, sin implementar:

1. narrativa y jerarquia exacta de la pagina;
2. copy final de cada seccion;
3. layout desktop, tablet y mobile;
4. tratamiento de la unica imagen disponible;
5. comportamiento de los dos caminos de cotizacion;
6. estructura y alcance visible de la matriz tecnica;
7. estados vacios, errores, carga y exito;
8. comportamiento por teclado y foco;
9. motion permitido y reduced motion;
10. contrato de datos que Codex debe implementar;
11. criterios de aceptacion visuales y funcionales.

Codex implementara unicamente despues de que esta especificacion exista y sea coherente con `AGENTS.md`, `DESIGN.md` y `PRODUCT.md`.
