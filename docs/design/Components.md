# Components — Del Carpio 2.0
## Biblioteca de componentes y estados

---

## Botones

### Button Primary (acción principal)
El único botón de conversión. Siempre terracota.

```
Background:       var(--accent) = #D5542B
Background hover: var(--accent-hover) = #B8431E
Text:             white
Border-radius:    9999px (pill)
Padding:          px-6 py-3 (24px / 12px)
Height mínimo:    2.75rem (44px)
Font:             Geist SemiBold 14px
Letter-spacing:   0
Gap con icono:    8px
Transition:       background-color 150ms ease-out
Active:           scale(0.97) 120ms ease-in
Focus-visible:    ring-accent
```

### Button Secondary
Para acciones que no son la conversión principal pero sí son acciones claras.

```
Background:       transparent
Border:           1px solid var(--border)
Text:             var(--foreground)
Border-radius:    9999px
Padding:          px-6 py-3
Height:           2.75rem
Hover:            border-[var(--border-strong)] bg-[var(--surface-muted)]
Transition:       border-color 180ms, background 180ms ease-out
```

### Button Ghost-White (nav en modo oscuro)
Solo para el nav cuando está sobre el hero oscuro.

```
Background:       transparent
Border:           1px solid rgba(255,255,255,0.28)
Text:             white
Border-radius:    9999px
Hover:            bg-white text-[var(--foreground)]
Transition:       background 180ms, color 180ms, border-color 180ms ease-out
```

### Link de texto (CTA terciario)
```
Color:            var(--muted) o text-white/60
Decoration:       underline, underline-offset-4
Underline color:  rgba(255,255,255,0.25) sobre oscuro / var(--border) sobre claro
Hover:            text-[var(--foreground)] / text-white
Transition:       color 200ms ease-out
Font:             Geist Medium 14px
```

---

## Cards

### Card de Servicio (lista — ServiceMatrix)
```
Wrapper:          overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-white
Row:              flex items-center gap-5 px-6 py-6
Row hover:        bg-[var(--surface-muted)] transition-colors 200ms
Row separador:    border-b border-[var(--border)] (excepto el último)
Número:           Azeret Mono 12px text-muted w-7 shrink-0
Título h3:        Geologica SemiBold 18px text-foreground leading-tight
Descripción:      Geist 14px leading-6 text-muted line-clamp-2
Icono flecha:     ArrowUpRight 18px text-accent
                  hover padre → translate(-1px, 1px) 200ms
```

### Card de Foto (ServiceMatrix izquierda, hero)
```
Wrapper:          relative overflow-hidden rounded-[1.25rem] bg-foreground
Image:            object-cover, hover: scale(1.025) 500ms --ease-out
Overlay:          gradient var(--overlay-card-bottom) — en la base para el caption
Caption wrapper:  absolute bottom-0 p-7 text-white
Caption label:    Azeret Mono 10px uppercase tracking text-white/52
Caption texto:    Geologica SemiBold 21px leading-snug max-w-sm
```

### Card de Proceso (ComplianceBand — items)
```
Wrapper:          overflow-hidden rounded-[1.25rem] border border-white/12 bg-white/[0.035]
Item:             grid grid-cols-[3rem_1fr] gap-5 px-6 py-7
Separador:        border-t border-white/8 (excepto el primero)
Icono círculo:    h-12 w-12 rounded-full border border-white/14 bg-white/[0.04]
                  Icono phosphor 20px weight="light" text-accent
Número:           Azeret Mono 10px uppercase tracking text-white/36
Título h3:        Geologica SemiBold 21px text-white mt-2
Descripción:      Geist 14px leading-7 text-white/52 mt-2.5
```

### Card de Advertencia — terracota (ComplianceBand sidebar)
```
Wrapper:          rounded-[1.25rem] border border-accent/45 bg-accent px-6 py-7 text-white
Icono:            WarningCircle 22px weight="light"
Label:            Azeret Mono 10px uppercase tracking text-white/70 mt-7
Texto:            Geologica SemiBold 24px leading-tight mt-3
```

### Card de Foto con Figcaption (LabPhotos)
```
Figure grande:    overflow-hidden rounded-[1.25rem] bg-foreground text-white
Photo div:        relative min-h-[520px] overflow-hidden
Image:            object-cover, hover: scale(1.025) 500ms --ease-out
Figcaption:       grid grid-cols-[1fr_auto] items-center gap-3 border-t border-white/12 px-6 py-5
Texto figcap:     Geist 14px text-white/70
Meta figcap:      Azeret Mono 10px uppercase tracking text-white/38

Figure pequeña:   overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-white
Photo div:        relative h-80 lg:h-[380px] overflow-hidden
Figcaption:       px-5 py-5
Título figcap:    Geist SemiBold 14px text-foreground
Subtexto figcap:  Geist 14px leading-6 text-muted mt-2
```

---

## Formulario

### Campo `.field`
```
Min-height:       3rem (48px)
Border-radius:    1rem (16px)
Border:           1px solid var(--border)
Background:       var(--background)
Padding:          0 1rem
Font:             Geist Regular 16px
Color:            var(--foreground)
Outline:          none
Transition:       border-color 180ms, box-shadow 180ms ease-out
Focus:            border-color var(--accent) + ring var(--ring-accent)
Error:            border-color red-500
```

### Textarea `.field`
Igual que campo pero con `min-height` variable, `resize-none`, y padding vertical ajustado.

### Label
```
Font:             Geist SemiBold 14px
Color:            var(--foreground)
Display:          grid gap-2 (label sobre el input)
```

### Tag "Requerido"
```
Inline con el label: bg-[var(--surface-muted)] px-2 py-0.5 rounded-full
Font:             Azeret Mono 10px uppercase tracking text-accent
```

---

## Fila editorial (IndustryTabs)
```
Article:          grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_0.26fr_0.6fr_0.22fr]
                  border-b border-[var(--border)] py-7 md:py-8
                  hover: bg-[var(--surface-muted)] transition-colors 200ms
Número:           Azeret Mono 12px text-muted pt-0.5
Nombre h3:        Geologica SemiBold 21px text-foreground
Descripción:      Geist 14px leading-7 text-muted
Tag:              Azeret Mono 9.5px uppercase tracking text-accent
```

---

## Callout editorial (ComplianceBand — "Decisión de compra")
```
Wrapper:          border-l border-white/14 pl-5 mt-10
Label:            Azeret Mono 10px uppercase tracking text-white/38
Texto:            Geologica SemiBold 19px leading-7 text-white max-w-sm mt-3
```

---

## Logo mark
```
Container:        grid size-10 place-items-center rounded-full
Background:       var(--foreground) / white (alternado según modo)
Font:             Azeret Mono SemiBold 14px
Color:            white / var(--foreground) (alternado)
Content:          "DC"
```

---

## Tag de método técnico (inline)
```
Font:             Azeret Mono Regular 9.5px uppercase tracking-[0.12em]
Color:            var(--accent)
Ningún background, ningún border, solo texto
Separador entre métodos: " · " (punto medio con espacios)
```

---

## Indicador de progreso (Interaction.md — futuro)
```
Position:         fixed top-0 left-0 z-50
Size:             w-full h-[2px]
Color:            var(--accent)
Transform:        scaleX(scrollProgress) transformOrigin-left
```
