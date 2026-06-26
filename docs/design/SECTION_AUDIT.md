# Auditoría de secciones — Estado al 2026-06-26

Estado de cada sección tras la renovación completa. Prioridades para Codex.

---

## Navigation
**Estado:** REQUIERE CAMBIO  
**Spec:** `NAVIGATION_SPEC.md`  
**Prioridad:** Alta  
El nav siempre aparece claro (glassmorphism) incluso sobre el hero oscuro. Conflicto visual visible en los primeros segundos.

---

## Hero
**Estado:** REQUIERE MEJORA  
**Spec:** `HERO_SPEC_V2.md`  
**Prioridad:** Alta  
Funcional pero sin profundidad. Todo el contenido entra como bloque único (Reveal) y la foto no responde al scroll. Implementar stagger entrance + parallax photo scale.

---

## TrustMetrics
**Estado:** Aprobado  
**Cambios pendientes:** Ninguno  
Copy corregido (tildes). Estructura 2-col claim + specs es sólida.

---

## ServiceMatrix
**Estado:** Aprobado con observación de copy  
**Cambios pendientes:** Actualizar subtext  

El subtext actual dice: "Primero evidencia visual, luego capacidades concretas. Sin catálogo inflado ni promesas genéricas."

La frase "Sin catálogo inflado ni promesas genéricas" es auto-referencial (habla de lo que el sitio NO hace, no de lo que el cliente gana). Codex debe reemplazarla con:

> "Cuatro capacidades con trazabilidad completa: del diagnóstico de matriz al soporte técnico continuo."

Archivo: `src/components/sections/service-matrix.tsx`, línea 15-17.

---

## IndustryTabs
**Estado:** Aprobado  
**Cambios pendientes:** Ninguno  
Copy corregido (tildes). Estructura de tabla editorial con filas hover es correcta.

---

## ComplianceBand
**Estado:** Aprobado — mejor sección del sitio  
**Cambios pendientes:** Ninguno  
La tarjeta terracota "Lo que se evita" es el momento de marca más distinto del sitio. No tocar.

---

## LabPhotos
**Estado:** Aprobado con observación de foto  
**Cambios pendientes:** Foto adicional cuando esté disponible  
Sticky 2-col con hover scale en fotos funciona bien. Las 2 fotos actuales crean una asimetría en el grid derecho. Cuando haya una tercera foto real, agregarla debajo de la foto más pequeña para completar la composición.

Copy de la sticky izquierda: observación menor — "equipo, espacio y condición real" en minúsculas después de la etiqueta "Evidencia" en mayúsculas se lee raro. Codex puede capitalizar: "Equipo, espacio y condición real."

---

## ContactForm
**Estado:** Aprobado  
**Cambios pendientes:** sectorFields para los 5 sectores faltantes (tarea separada, no bloqueante)  
Copy corregido. Estructura 2-col dark funciona.

---

## Footer
**Estado:** REQUIERE REDISEÑO COMPLETO  
**Spec:** `FOOTER_SPEC.md`  
**Prioridad:** Alta  
Actualmente 2 líneas de texto. Necesita estructura editorial completa.

---

## Resumen de prioridades

| Tarea | Archivo a modificar | Spec |
|---|---|---|
| 1. Nav scroll-aware | `navigation.tsx` | `NAVIGATION_SPEC.md` |
| 2. Hero stagger + parallax | `hero.tsx` | `HERO_SPEC_V2.md` |
| 3. Footer rediseño | `footer.tsx` | `FOOTER_SPEC.md` |
| 4. ServiceMatrix subtext | `service-matrix.tsx` | Este archivo, línea 15-17 |
| 5. LabPhotos caption | `lab-photos.tsx` | Capitalizar "equipo" → "Equipo" |

Las tareas 1-3 son las de mayor impacto visual. La 4 y 5 son correcciones menores de copy.
