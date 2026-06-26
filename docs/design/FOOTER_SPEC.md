# Footer — Especificación v2

**Situación actual:** El footer tiene 2 líneas de texto: nombre de la empresa y contacto. Es la última pantalla que ve un potencial cliente antes de cerrar el tab. Si llega hasta aquí y no encontró lo que buscaba, el footer es la última oportunidad para orientarlo. Actualmente esa oportunidad no existe.

**Objetivo:** Convertir el footer en un anchor de marca. El usuario que llega al final del scroll debe recibir: qué hace la empresa en una frase, cómo contactarla, acceso rápido a los servicios, y la sensación de que alguien pensó en este espacio.

---

## Layout

Fondo: `bg-[var(--background)]` — claro, para contrastar con el `ContactForm` oscuro que queda inmediatamente encima.

```
<footer bg-[var(--background)] border-t border-[var(--border)]>
  <div max-w-7xl px-5 pt-16 pb-10>

    [Sección principal: 3 columnas en lg]
    <div grid lg:grid-cols-[2fr_1fr_1fr] gap-12>

      [Columna 1 — Identidad]
        Logo mark (círculo DC negro)
        Nombre completo: "Del Carpio Análisis y Asesorías Ltda." (text-sm text-muted)
        Enunciado de marca: "Implementación, validación y soporte de sistemas HPLC y GC para laboratorios industriales en Chile." (text-sm font-semibold text-foreground max-w-xs mt-3)
        
        [Bloque de contacto, mt-8]
          location (text-sm text-muted)
          email como <a> clickeable (text-sm text-muted hover:text-foreground)
          phone (text-sm text-muted)

      [Columna 2 — Servicios]
        Heading: "Servicios" (font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-5)
        Lista de 4 servicios desde services[] en site.ts
        Cada ítem: <Link href="/servicios/{slug}"> (text-sm text-muted hover:text-foreground transition-colors)

      [Columna 3 — Sectores]
        Heading: "Sectores" (font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-5)
        Lista de 6 industrias desde industries[] en site.ts
        Cada ítem: <a href="/#industrias"> (text-sm text-muted hover:text-foreground transition-colors)
        Nota: los sectores no tienen páginas propias todavía — anclar todos a /#industrias
    
    [Barra inferior: mt-14 border-t border-[var(--border)] pt-6]
      <div flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between>
        <p text-xs text-muted>© {año actual} Del Carpio Análisis y Asesorías Ltda.</p>
        <p text-xs text-muted>Santiago, Chile</p>
```

---

## Logo mark

Usar el mismo que en la navegación: círculo negro con las iniciales "DC" en blanco, fuente mono, tamaño 40x40px.

No crear un nuevo elemento — importar el mismo bloque del nav o replicarlo idéntico.

---

## Año dinámico

El copyright debe mostrar el año actual, no hardcodeado:

```
© {new Date().getFullYear()} Del Carpio Análisis y Asesorías Ltda.
```

---

## Fuente de datos

El footer debe importar `company`, `services` e `industries` desde `@/content/site` — no hardcodear ningún texto que ya exista en esos arrays.

El "Enunciado de marca" en la columna 1 SÍ va hardcodeado en el componente porque es copy específico del footer que no existe en site.ts:

> "Implementación, validación y soporte de sistemas HPLC y GC para laboratorios industriales en Chile."

---

## Restricciones

- NO usar `<motion>` en el footer — es un elemento de cierre, no de entrada.
- NO agregar iconos de redes sociales (no hay cuentas verificadas todavía).
- NO agregar newsletter, blog links ni elementos no existentes en el sitio.
- El fondo DEBE ser `var(--background)` (claro) — NO usar `var(--foreground)` oscuro. La razón: el `ContactForm` ya termina en oscuro y el footer necesita crear un respiro visual antes de que el browser chrome aparezca.
- Los links del footer en mobile deben tener un `py-1` o `min-h-[32px]` para que el tap target sea suficiente.

---

## Verificación

- [ ] El logo mark es idéntico al del nav
- [ ] Los 4 servicios están listados y linkean a sus páginas correctas
- [ ] Los 6 sectores están listados y anclan a /#industrias
- [ ] Email es clickeable (href="mailto:...")
- [ ] El año es dinámico (no "2024" hardcodeado)
- [ ] En mobile: las 3 columnas se apilan verticalmente (gap-10 entre secciones)
- [ ] El footer contrasta correctamente con el ContactForm oscuro de arriba
