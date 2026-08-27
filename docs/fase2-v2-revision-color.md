# DEL CARPIO 2.0 — FASE 2 (REVISADA): SISTEMA VISUAL v2

> **Nota de vigencia (2026-08-27):** La sección 1.2 de tipografía quedó
> superada por el cambio aprobado el 2026-08-12 a Manrope para títulos e Inter
> para cuerpo e interfaz. `AGENTS.md` es la fuente vigente para tipografía y
> tokens de color; este documento se conserva como antecedente de la revisión
> de paleta y estructura.

**Decisión: estructura aprobada, paleta de color RECHAZADA y corregida**

> Documento de dirección creativa. Especificación exacta para que Codex corrija, sin implementación de Claude.

## 0. Resumen ejecutivo

Codex implementó un nuevo sistema visual basándose en un Design JSON llamado "SkilAB Scientific Corporate Landing Page" y una imagen de referencia (Laboratorio_1.jpeg) que NO pertenecen a Del Carpio. El propio archivo JSON se autodescribe como mood "modern but dated-template style", incluye texto Lorem Ipsum, logos de partners ficticios (GABRO, INDUSTRIX, RAPID, Skilum, FOOWER) y un footer con copyright "SkilLab © 2014" y dirección falsa en Los Ángeles. Es una plantilla comercial de stock — el tercer caso de este tipo en el proyecto (después de Chemlabs y Laboix).

**Decisión de Christofer:** NO se revierte la estructura/layout (aprobada), pero la paleta cian #10B6CF / rojo-naranja #F04A2A SE RECHAZA por no tener relación con la marca real — se reemplaza por la paleta del logo (terracota/verde/amarillo), validada desde el 25-06-2026. La tipografía Montserrat + Open Sans SÍ se aprueba, reemplazando Nunito Sans.

## 1. Qué se aprueba

### 1.1 Estructura y layout — APROBADO
- Navegación compacta superior con item activo destacado.
- Hero fotográfico centrado con CTA — usando fotografía REAL de Del Carpio (carpeta FOTOGRAFÍA/Laboratorio e Instalaciones), no la imagen de referencia externa.
- Bloque de bienvenida en 3 columnas.
- Banda de servicios con íconos circulares en grid de 4.
- Bloque de dos columnas: tecnología/capacidades + timeline.
- Franja tipo logo strip — adaptar a certificaciones reales (NCh, ISO, IQ/OQ/PQ), no logos ficticios.
- Footer de contacto en 3 columnas.

### 1.2 Tipografía — APROBADO
- Encabezados: Montserrat, peso 700-800.
- Cuerpo: Open Sans, peso 400.

## 2. Qué se rechaza

### 2.1 Paleta de color — RECHAZADO POR COMPLETO
El cian #10B6CF y rojo-naranja #F04A2A provienen literalmente de la plantilla "SkilAB", no de Del Carpio. Repite el error ya corregido el 25-06 (verde teal genérico). Se rechaza sin excepción.

### 2.2 Imagen de referencia y contenido de relleno — RECHAZADO
- Cualquier imagen de Laboratorio_1.jpeg o referencias externas — reemplazar por fotografía real de Del Carpio.
- Logos de partners ficticios — usar certificaciones reales o dejar vacío.
- Texto Lorem Ipsum residual — todo el copy debe ser contenido real de site.ts.

## 3. Color System corregido

| Token | Hex | Uso |
|---|---|---|
| primary (acción) | #D5542B | Reemplaza #F04A2A en TODOS los CTAs, nav activo, acentos |
| nav / banda servicios | #101820 | Reemplaza #10B6CF — ink, nunca cian |
| sector alimentos | #FBE369 | Badge sector Alimentos |
| sector minería | #D5542B | Badge sector Minería |
| sector aguas/ambiental | #53843A | Badge sectores Aguas y Ambiental |

**Regla sin excepción:** ningún elemento debe usar #10B6CF, #079FB7, #52D3E6, #F04A2A, #D93E22, #AFC5C7.

## 4. Especificación para Codex — corrección, no reconstrucción

### 4.1 Archivos a revisar
tailwind.config.ts, src/app/globals.css, src/app/layout.tsx, src/components/ui/button.tsx, src/components/sections/navigation.tsx, hero.tsx, service-matrix.tsx, industry-tabs.tsx, compliance-band.tsx, lab-photos.tsx, contact-form.tsx, footer.tsx — conservar estructura, corregir color a la paleta real.

### 4.2 Verificación antes de completar
1. Grep de 10B6CF, 079FB7, 52D3E6, F04A2A, D93E22, AFC5C7 — confirmar cero referencias.
2. Confirmar que ninguna imagen provenga de fuente externa no autorizada.
3. Confirmar que el logo strip no tenga empresas ficticias.
4. Re-ejecutar lint, build, verificación visual desktop/mobile.
5. Renombrar/corregir docs/design/VISUAL_SYSTEM_SCIENTIFIC_CYAN.md.

### 4.3 AGENTS.md
Corregir la sección de reglas de marca a terracota #D5542B / verde #53843A / amarillo #FBE369 / ink #101820, agregando: "No usar Design JSON ni imágenes de referencia de fuentes externas no auditadas por Christofer o Claude — ver caso SkilAB, 30-06-2026, como precedente de qué evitar."

---
*Fase 2 (revisada) aprobada con las correcciones de esta sección. Autorización de implementación acotada exclusivamente a corrección de paleta y referencias de contenido — no a rediseñar la estructura.*
