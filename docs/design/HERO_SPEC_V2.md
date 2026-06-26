# Hero — Especificación v2

**Objetivo:** El hero es el único encuadre que el usuario ve antes de decidir si queda o se va. Actualmente todo el contenido (eyebrow, h1, subtext, CTAs) entra como un bloque único gracias a un `<Reveal>` wrapper. Esto funciona, pero no hay storytelling. La experiencia premium entra por secuencia: el usuario lee el label primero, luego el claim, luego el detalle, luego la acción.

**Adicionalmente:** La foto de fondo no responde al scroll. En un hero de pantalla completa con foto real, el parallax sutil (zoom out al scrollear) es lo que distingue una foto editorial de un fondo estático.

---

## Cambio 1: Stagger entrance (obligatorio)

### Descripción

Reemplazar el `<Reveal>` único por animaciones individuales `initial/animate` en cada elemento. Usar `initial/animate` (NO `whileInView`) porque el hero es visible en el page load — `whileInView` es para elementos fuera del viewport.

### Secuencia

| Elemento | Delay | Duración | Y inicial | Easing |
|---|---|---|---|---|
| Eyebrow (p mono) | 0.15s | 0.50s | 10px | `[0.23, 1, 0.32, 1]` |
| h1 | 0.28s | 0.65s | 16px | `[0.23, 1, 0.32, 1]` |
| Subtext (p body) | 0.42s | 0.60s | 12px | `[0.23, 1, 0.32, 1]` |
| CTAs (div wrapper) | 0.55s | 0.50s | 10px | `[0.23, 1, 0.32, 1]` |

Todos comienzan con `opacity: 0` y terminan en `opacity: 1`.

### Reduced motion

Si `useReducedMotion()` retorna `true`, todos los elementos parten con `opacity: 1, y: 0` directamente — sin transición, sin delay.

### Estructura esperada

El `<Reveal>` actual que envuelve todo el bloque desaparece. Cada elemento hijo tiene su propio `motion.div` (o `motion.p`, `motion.h1`) con las props `initial`, `animate` y `transition` correspondientes.

El `div.max-w-[52rem]` contenedor puede mantenerse como `<div>` estático — solo los elementos hijos que el usuario ve necesitan animarse.

---

## Cambio 2: Parallax en foto de fondo (obligatorio)

### Descripción

La foto actual usa `<Image fill>` directamente en el `<section>`. Para el parallax necesitamos que la foto escale con el scroll:

- Al cargar: foto en `scale(1.08)` — ligeramente más grande que el viewport
- Al llegar al fondo del hero (justo antes de scrollear fuera): `scale(1.0)` — tamaño natural
- El efecto es un zoom-out suave que crea profundidad sin mover la imagen fuera del frame

### Implementación

**Paso 1:** Agregar `useRef` al `<section>` del hero.

**Paso 2:** Usar `useScroll` de `motion/react` con:
```
target: heroRef
offset: ["start start", "end start"]
```

**Paso 3:** Usar `useTransform` para mapear `scrollYProgress [0, 1]` a `scale [1.08, 1.0]`.

**Paso 4:** Envolver el `<Image>` en un `motion.div` con `className="absolute inset-0"` y `style={{ scale: photoScale }}`.

La estructura final del bloque de foto:
```
<section ref={heroRef} className="relative ... overflow-hidden">
  <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
    <Image src="..." fill className="object-cover object-center opacity-[0.65]" ... />
  </motion.div>
  {/* gradientes y contenido sin cambios */}
</section>
```

El `overflow-hidden` en el `<section>` es esencial — recorta el zoom inicial sin que se vea.

### Reduced motion

Si `useReducedMotion()` es `true`, NO aplicar el parallax. La foto permanece estática con `scale(1)`.

---

## Restricciones

- NO cambiar el copy, colores ni estructura del contenido del hero.
- La foto debe mantener `priority` y `sizes="100vw"` para performance.
- El `<section>` debe mantener `overflow-hidden` — sin este atributo, el zoom inicial (1.08) desborda el viewport.
- Las transiciones de `useTransform` son física CSS pura (GPU-composited) — NO usar `transform` en JS loop.
- El componente necesita `"use client"` para usar los hooks de motion.

---

## Verificación

- [ ] En desktop: el eyebrow aparece primero, luego h1, luego subtext, luego CTAs
- [ ] En mobile: la secuencia se mantiene (mismo stagger, mismos delays)
- [ ] Al scrollear: la foto hace zoom-out suave mientras el contenido sube
- [ ] Con `prefers-reduced-motion` activo: todo aparece instantáneo, foto estática
- [ ] Performance: no hay jank al cargar — el parallax corre en el compositor (transform, no top/left)
