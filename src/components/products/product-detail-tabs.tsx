"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { Copy, Check, Play } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type {
  ProductDescriptionVideo,
  ProductDetail,
  TechnicalParameterRow,
} from "@/lib/mock-products";
import {
  BrandCatalogNotice,
  FULL_CATALOG_BRANDS,
} from "@/components/products/brand-catalog-notice";

// Define Tab Type for Hanon Special Products
type HanonTabId =
  | "especificaciones"
  | "cumplimiento"
  | "aplicaciones"
  | "soporte"
  | "accesorios"
  | "consumibles"
  | "video";
// Define Default Tab Type
type DefaultTabId = "detalle" | "parametros" | "descargas";

const CONSUMIBLES_BY_SLUG: Record<
  string,
  { name: string; description: string; image?: string }[]
> = {
  "hyperpurex-serie-su-smart": [
    {
      name: "Cartucho de pretratamiento PC",
      description:
        "El material del fabricante lo identifica como PC / Pre‑Treatment. La ficha documenta una etapa de pretratamiento antes de la ósmosis inversa.",
      image:
        "/productos/hyperpurex-serie-su-smart/consumible-pretratamiento-pc.png",
    },
    {
      name: "Cartuchos RO de primera y segunda etapa",
      description:
        "El material visual identifica los cartuchos 1st RO y 2nd RO. La ficha describe la membrana de ósmosis inversa de alta eficiencia como la etapa de reducción de sales disueltas.",
      image:
        "/productos/hyperpurex-serie-su-smart/consumible-membrana-ro-primera-etapa.png",
    },
    {
      name: "Cartuchos DI y UP",
      description:
        "El material visual identifica los cartuchos DI / Pri‑Purification y UP / Hyp‑Purification para las etapas de prepurificación y ultrapurificación.",
      image:
        "/productos/hyperpurex-serie-su-smart/consumible-membrana-ro-segunda-etapa.png",
    },
    {
      name: "Módulo UV",
      description:
        "Módulo de ultravioleta. La ficha describe luz UV de doble longitud de onda, 185 y 254 nm, para reducción de orgánicos y acción germicida.",
      image:
        "/productos/hyperpurex-serie-su-smart/consumible-prepurificacion-di.png",
    },
    {
      name: "Módulo de ultrafiltración UF",
      description:
        "Módulo UF identificado en el material fuente. La ficha describe un corte de peso molecular de 5.000 Dalton para remoción de macromoléculas, endotoxinas, nucleasas y enzimas.",
      image:
        "/productos/hyperpurex-serie-su-smart/consumible-ultrapurificacion-up.png",
    },
    {
      name: "Filtro terminal",
      description:
        "Filtro terminal de microfiltración. La ficha documenta configuraciones de 0,22 µm o 0,1 µm para el punto de dispensación.",
      image: "/productos/hyperpurex-serie-su-smart/consumible-modulo-uv.png",
    },
    {
      name: "Filtro terminal UF",
      description:
        "Imagen complementaria de un filtro terminal para la configuración UF. La ficha indica filtro terminal de 0,22 µm o 0,1 µm y módulo UF opcional.",
      image: "/productos/hyperpurex-serie-su-smart/consumible-modulo-uf.png",
    },
    {
      name: "Consumible de recambio",
      description:
        "Archivo visual identificado como Consumible 7 en la carpeta fuente; su etiqueta no permite determinar una referencia adicional con certeza.",
      image:
        "/productos/hyperpurex-serie-su-smart/consumible-filtro-terminal.png",
    },
  ],
  "hyperpurex-serie-eue": [
    {
      name: "Prefiltros PP y PC",
      description:
        "La imagen fuente identifica cartuchos PP y PC. La ficha documenta prefiltración sedimentaria PP de 5 µm antes de la ósmosis inversa.",
      image: "/productos/hyperpurex-serie-eue/consumible-prefiltros-pp-pc.png",
    },
    {
      name: "Membranas RO de primera y segunda etapa",
      description:
        "El material visual identifica dos cartuchos RO. La ficha describe la ósmosis inversa como la etapa de alta desalinización, con rechazo de sales superior al 98 %.",
      image: "/productos/hyperpurex-serie-eue/consumible-membranas-ro.png",
    },
    {
      name: "Columnas DI y UP",
      description:
        "La imagen identifica las columnas DI / prepurificación y UP / ultrapurificación. La ficha describe doble columna de resina UP en serie para el pulido final.",
      image: "/productos/hyperpurex-serie-eue/consumible-columnas-di-up.png",
    },
    {
      name: "Módulo anti-incrustante",
      description:
        "El diagrama documenta un módulo anti-incrustante o softener opcional para agua de alta dureza, antes de la ósmosis inversa.",
      image: "/productos/hyperpurex-serie-eue/consumible-softener.png",
    },
    {
      name: "Cartucho de carbón activado",
      description:
        "La ficha identifica un cartucho AC de carbón activado para adsorción de cloro libre, desinfectantes, materia orgánica volátil, olores y sabores.",
      image: "/productos/hyperpurex-serie-eue/consumible-cartucho-ac.png",
    },
    {
      name: "Módulo UV de doble longitud de onda",
      description:
        "El módulo visual identificado como UV corresponde a la lámpara de 185 y 254 nm documentada para oxidación fotoquímica y acción germicida.",
      image: "/productos/hyperpurex-serie-eue/consumible-modulo-uv.png",
    },
    {
      name: "Módulo de ultrafiltración UF",
      description:
        "El módulo visual identificado como UF coincide con el módulo de 5.000 Da documentado para remoción de macromoléculas, endotoxinas y nucleasas.",
      image: "/productos/hyperpurex-serie-eue/consumible-modulo-uf.png",
    },
    {
      name: "Filtro terminal micro-poroso",
      description:
        "La imagen identifica un filtro terminal. La ficha documenta configuraciones estériles de 0,22 µm o 0,1 µm en el punto de dispensación.",
      image: "/productos/hyperpurex-serie-eue/consumible-filtro-terminal.png",
    },
    {
      name: "Consumible de recambio",
      description:
        "El noveno archivo visual de consumibles no identifica una referencia adicional legible; se conserva como material de recambio relacionado, sin atribuirle una función no documentada.",
      image: "/productos/hyperpurex-serie-eue/consumible-recambio.png",
    },
  ],
  "hyperpurex-serie-lu-discovery": [
    {
      name: "Prefiltros PP y PC",
      description:
        "La imagen fuente identifica cartuchos PP y PC. La ficha documenta filtración PP de 5 µm y carbón activado antes de la ósmosis inversa.",
      image:
        "/productos/hyperpurex-serie-lu-discovery/consumible-prefiltros-pp-pc.png",
    },
    {
      name: "Módulos de ósmosis inversa",
      description:
        "El material visual identifica módulos RO. La ficha sitúa la ósmosis inversa después del pretratamiento para producir agua pura desde agua de red.",
      image:
        "/productos/hyperpurex-serie-lu-discovery/consumible-modulos-ro.png",
    },
    {
      name: "Cartuchos DI y UP",
      description:
        "La imagen identifica cartuchos DI y UP. La ficha los documenta como etapas de prepurificación y ultrapurificación del sistema LU.",
      image:
        "/productos/hyperpurex-serie-lu-discovery/consumible-cartuchos-di-up.png",
    },
    {
      name: "Módulo UV de doble longitud de onda",
      description:
        "La ficha documenta una lámpara UV de 185/254 nm para las configuraciones UV y UVF.",
      image:
        "/productos/hyperpurex-serie-lu-discovery/consumible-lampara-uv.png",
    },
    {
      name: "Módulo de ultrafiltración UF",
      description:
        "El material visual identifica el módulo UF. La ficha documenta ultrafiltración de 5.000 Da para las configuraciones UF y UVF.",
      image:
        "/productos/hyperpurex-serie-lu-discovery/consumible-modulo-uf.png",
    },
    {
      name: "Filtro terminal",
      description:
        "La ficha documenta filtración terminal de 0,22 µm o 0,1 µm en el punto de dispensación, según la configuración.",
      image:
        "/productos/hyperpurex-serie-lu-discovery/consumible-filtro-terminal-1.png",
    },
    {
      name: "Filtro terminal de microfiltración",
      description:
        "Imagen adicional de filtro terminal proporcionada con la Serie LU Discovery; no se atribuye una referencia distinta sin una identificación legible en la fuente.",
      image:
        "/productos/hyperpurex-serie-lu-discovery/consumible-filtro-terminal-2.png",
    },
    {
      name: "Consumible de recambio",
      description:
        "Archivo visual de recambio relacionado. Su etiqueta no permite identificar una función adicional con certeza.",
      image: "/productos/hyperpurex-serie-lu-discovery/consumible-recambio.png",
    },
  ],
  "hyperpurex-serie-x-flagship": [
    {
      name: "Cartuchos de pretratamiento PP y PC",
      description:
        "El material visual identifica cartuchos PP y PC. La ficha documenta PP de 5 µm y un cartucho PC de pretratamiento antes de la ósmosis inversa.",
      image:
        "/productos/hyperpurex-serie-x-flagship/consumible-prefiltros-pp-pc.png",
    },
    {
      name: "Cartuchos DI y UP",
      description:
        "La imagen identifica cartuchos DI y UP. La ficha los documenta como etapas de alta pureza y ultrapurificación en la Serie X.",
      image:
        "/productos/hyperpurex-serie-x-flagship/consumible-cartuchos-di-up.png",
    },
    {
      name: "Módulo EDI",
      description:
        "El material visual suministrado muestra el módulo EDI; la ficha lo identifica para las configuraciones XUE.",
      image: "/productos/hyperpurex-serie-x-flagship/consumible-modulo-edi.png",
    },
    {
      name: "Lámpara UV de doble longitud de onda",
      description:
        "La ficha documenta una lámpara UV de 185/254 nm para las configuraciones UV y UVF.",
      image: "/productos/hyperpurex-serie-x-flagship/consumible-lampara-uv.png",
    },
    {
      name: "Módulo de ultrafiltración UF",
      description:
        "El material visual identifica el módulo UF; la ficha lo documenta para las configuraciones UF y UVF.",
      image: "/productos/hyperpurex-serie-x-flagship/consumible-modulo-uf.png",
    },
    {
      name: "Filtro terminal",
      description:
        "Imagen de filtro terminal suministrada con la Serie X. La ficha incluye filtro terminal de microfiltración o ultrafiltración según la configuración.",
      image:
        "/productos/hyperpurex-serie-x-flagship/consumible-filtro-terminal-1.png",
    },
    {
      name: "Filtro terminal de recambio",
      description:
        "Imagen adicional de filtro terminal proporcionada para la Serie X; la referencia específica debe confirmarse con la configuración seleccionada.",
      image:
        "/productos/hyperpurex-serie-x-flagship/consumible-filtro-terminal-2.png",
    },
    {
      name: "Consumible de recambio",
      description:
        "Archivo visual de recambio relacionado. Su etiqueta no permite atribuir una función adicional con certeza.",
      image: "/productos/hyperpurex-serie-x-flagship/consumible-recambio.png",
    },
  ],
  "hyperpurex-serie-p-pursuit": [
    {
      name: "Cartucho de ultrapureza HPC601",
      description:
        "El material visual identifica el cartucho UP Hyp-Purification. La ficha lo denomina HPC601 para la configuración estándar.",
      image: "/productos/hyperpurex-serie-p-pursuit/consumible-cartucho-up.png",
    },
    {
      name: "Módulo UV HPC703",
      description:
        "Módulo UV de 185/254 nm identificado en la ficha para las configuraciones PU-UV y PU-UVF.",
      image: "/productos/hyperpurex-serie-p-pursuit/consumible-modulo-uv.png",
    },
    {
      name: "Módulo de ultrafiltración HPC709",
      description:
        "Módulo UF identificado en la ficha para las configuraciones PU-UF y PU-UVF; la documentación indica un corte de 5.000 Da.",
      image: "/productos/hyperpurex-serie-p-pursuit/consumible-modulo-uf.png",
    },
    {
      name: "Filtro terminal HPC801",
      description:
        "Filtro terminal de microfiltración identificado en la documentación del fabricante para el punto de dispensación.",
      image: "/productos/hyperpurex-serie-p-pursuit/consumible-filtro-terminal.png",
    },
    {
      name: "Filtro terminal UF HPC810",
      description:
        "Filtro terminal de ultrafiltración identificado como HPC810 en la documentación de la Serie P.",
      image: "/productos/hyperpurex-serie-p-pursuit/consumible-filtro-terminal-uf.png",
    },
  ],
  "hyperpurex-serie-fx-flagship": [
    {
      name: "Pretratamiento y cartuchos RO",
      description:
        "El material visual corresponde a consumibles de pretratamiento y ósmosis inversa. La ficha documenta las referencias HPC104, HPCS360/312/318/325, HPC350/310/315 y HPC450/410/415 según familia y caudal.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-pretratamiento.png",
    },
    {
      name: "Módulo de ósmosis inversa",
      description:
        "Imagen de módulo de recambio suministrada para la Serie FX. La ficha distingue RO de una etapa en FXU y doble RO en FXUS, FXUE y FXDE.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-modulo-ro.webp",
    },
    {
      name: "Cartucho UP estándar HPC603",
      description:
        "Cartucho de ultrapureza estándar identificado como HPC603 en el listado de consumibles del fabricante.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-cartucho-up-estandar.webp",
    },
    {
      name: "Cartucho UP de bajo TOC",
      description:
        "Cartucho visual adicional de ultrapureza suministrado para la Serie FX. La ficha identifica referencias HPC604 y HPC606 para configuraciones de bajo TOC.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-cartucho-up-low-toc.webp",
    },
    {
      name: "Filtro terminal de microfiltración",
      description:
        "Filtro terminal visual suministrado con la Serie FX. La ficha lista referencias HPC801, HPC802, HPC803 y HPC804 según la configuración.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-filtro-terminal.webp",
    },
    {
      name: "Filtro terminal de ultrafiltración HPC810",
      description:
        "Filtro terminal UF identificado como HPC810 en el listado de consumibles de la ficha.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-filtro-terminal-uf.webp",
    },
    {
      name: "Módulo UV",
      description:
        "Módulo UV visual suministrado para las configuraciones de bajo TOC. La ficha identifica las referencias HPC703 y HPC704 para las lámparas UV.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-modulo-uv.webp",
    },
    {
      name: "Módulo de ultrafiltración HPC709",
      description:
        "Módulo UF identificado como HPC709 en el listado de consumibles del fabricante para las configuraciones UF y UVF.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-modulo-uf.webp",
    },
    {
      name: "Filtro de aire del tanque HPC710",
      description:
        "Elemento visual de recambio asociado al tanque. La ficha identifica HPC710 como filtro de aire del tanque.",
      image: "/productos/hyperpurex-serie-fx-flagship/consumible-tanque-aire.png",
    },
  ],
  "hyperpurex-serie-fe-eminente": [
    {
      name: "Cartucho de pretratamiento PC",
      description:
        "El material visual identifica un cartucho PC de pretratamiento. La ficha documenta pretratamiento antes de las etapas RO de la Serie FE.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-pretratamiento-pc.png",
    },
    {
      name: "Módulos RO de primera y segunda etapa",
      description:
        "La imagen identifica módulos RO de primera y segunda etapa. La ficha documenta RO simple o doble según la familia FE seleccionada.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-modulos-ro.png",
    },
    {
      name: "Módulo EDI",
      description:
        "La ficha identifica el módulo EDI para las familias FEUE y FEDE; no está presente en todas las configuraciones FE.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-modulo-edi.png",
    },
    {
      name: "Cartucho UP",
      description:
        "Cartucho de ultrapureza mostrado en el material visual. La ficha lo relaciona con las configuraciones que producen agua ultrapura.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-cartucho-up.png",
    },
    {
      name: "Consumible de recambio",
      description:
        "Archivo visual identificado como consumible en la carpeta fuente; no permite atribuir una referencia adicional con certeza.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-recambio.png",
    },
    {
      name: "Módulo UV",
      description:
        "La ficha identifica lámparas UV de 185/254 nm para las configuraciones UV y UVF.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-modulo-uv.png",
    },
    {
      name: "Módulo de ultrafiltración UF",
      description:
        "La ficha documenta el módulo UF para configuraciones de eliminación de endotoxinas; su inclusión depende de la variante elegida.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-modulo-uf.png",
    },
    {
      name: "Filtro terminal de microfiltración",
      description:
        "La ficha lista filtros terminales de microfiltración HPC801, HPC802, HPC803 y HPC804 según la configuración.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-filtro-terminal.png",
    },
    {
      name: "Filtro terminal de ultrafiltración HPC810",
      description:
        "Filtro terminal UF mostrado en el material visual e identificado como HPC810 en el listado de consumibles de la ficha.",
      image:
        "/productos/hyperpurex-serie-fe-eminente/consumible-filtro-terminal-uf.png",
    },
  ],
  "hyperpurex-serie-fs-smart": [
    {
      name: "Cartucho de pretratamiento PC",
      description:
        "El material visual identifica un cartucho PC de pretratamiento. La descripción de la serie lo sitúa antes de la ósmosis inversa.",
      image:
        "/productos/hyperpurex-serie-fs-smart/consumible-pretratamiento-pc.png",
    },
    {
      name: "Módulos RO de primera y segunda etapa",
      description:
        "El material visual identifica los módulos RO. La descripción documenta una doble etapa de ósmosis inversa con desalinización superior al 98 %.",
      image:
        "/productos/hyperpurex-serie-fs-smart/consumible-modulos-ro.png",
    },
    {
      name: "Cartucho UP",
      description:
        "El material visual identifica el cartucho UP. La descripción documenta doble columna de ultrapurificación para el pulido de microtrazas iónicas.",
      image:
        "/productos/hyperpurex-serie-fs-smart/consumible-cartucho-up.png",
    },
    {
      name: "Módulo UV",
      description:
        "La descripción documenta una lámpara UV de doble longitud de onda, 185/254 nm, para las configuraciones que la incluyen.",
      image:
        "/productos/hyperpurex-serie-fs-smart/consumible-modulo-uv.png",
    },
    {
      name: "Módulo de ultrafiltración UF",
      description:
        "La descripción documenta ultrafiltración de 5.000 Da para las configuraciones que requieren remoción de pirógenos y nucleasas.",
      image:
        "/productos/hyperpurex-serie-fs-smart/consumible-modulo-uf.png",
    },
  ],
  "milestone-ethos-up": [
    {
      name: "Rotor MAXI-24 HP",
      description:
        "Rotor de 24 posiciones para trabajo rutinario de alto rendimiento con matrices y volúmenes diversos.",
      image: "/productos/milestone-ethos-up/rotor-maxi-24-hp.jpg",
    },
    {
      name: "Rotor SK-15",
      description:
        "Quince recipientes PTFE-TFM de 100 mL para muestras difíciles, reactivas o de gran masa a alta presión y temperatura.",
      image: "/productos/milestone-ethos-up/rotor-sk-15.jpg",
    },
    {
      name: "Rotor MAXI-44",
      description:
        "Cuarenta y cuatro recipientes PTFE-TFM de 100 mL para grandes lotes de suelos, sedimentos y matrices acuosas.",
      image: "/productos/milestone-ethos-up/rotor-maxi-44.jpg",
    },
    {
      name: "FastEX-24",
      description: "Rotor de extracción para aplicaciones ambientales.",
      image: "/productos/milestone-ethos-up/fastex-24.png",
    },
    {
      name: "XTR-44",
      description:
        "Rotor de extracción con viales desechables de polipropileno.",
      image: "/productos/milestone-ethos-up/xtr-44.png",
    },
    {
      name: "SR-15",
      description:
        "Rotor para determinación de grasa total en alimentos y alimentación animal.",
      image: "/productos/milestone-ethos-up/sr-15.png",
    },
    {
      name: "UltraFAST",
      description: "Mufla de alta temperatura.",
      image: "/productos/milestone-ethos-up/ultrafast.png",
    },
    {
      name: "MMR-15",
      description: "Rotor de evaporación y concentración.",
      image: "/productos/milestone-ethos-up/mmr-15.png",
    },
    {
      name: "RAR-15",
      description: "Rotor de evaporación con vasos desechables.",
      image: "/productos/milestone-ethos-up/rar-15.png",
    },
  ],
  "hanon-k9860": [
    {
      name: "Depósito de ácido estándar",
      description:
        "Compatible con K1100F y K9860, K1160. Diseñado específicamente para el almacenamiento seguro y la dosificación precisa de la solución ácida de valoración estándar.",
      image: "/productos/hanon-k9860/consumible-1.webp",
    },
    {
      name: "Tubo de digestión",
      description:
        "Compatible con los equipos Kjeldahl K9860, K9840 y K1100F, K1160. Utilizado para los procesos de digestión húmeda y destilación de muestras con sello hermético.",
      image: "/productos/hanon-k9860/consumible-2.webp",
    },
    {
      name: "Cabezal de destilación",
      description:
        "Compatible con K1100F, K9860 y K9840, K1160. Altamente resistente a ácidos, álcalis fuertes y altas temperaturas. Conecta y sella la unión con el tubo de digestión.",
      image: "/productos/hanon-k9860/consumible-3.webp",
    },
  ],
  "hanon-k9840": [
    {
      name: "Depósito de solución",
      description:
        "Compatible con el modelo K9840; utilizado para almacenar ácido bórico, solución alcalina y agua destilada. (Incluye tapa, tubo de conexión, base de apoyo, depósito de 3L y etiqueta).",
      image: "/productos/hanon-k9840/consumible-1.webp",
    },
    {
      name: "Sellado anticorrosión del depósito de solución",
      description:
        "Compatible con el modelo K9840; se utiliza para el sellado del depósito de solución.",
      image: "/productos/hanon-k9840/consumible-2.webp",
    },
    {
      name: "Tanque de 3 Litros",
      description:
        "Compatible con K9840; depósito resistente a la corrosión y a la presión, apto para uso universal con agua, ácido bórico y soluciones alcalinas.",
      image: "/productos/hanon-k9840/consumible-3.webp",
    },
    {
      name: "Cabezal de destilación",
      description:
        "Compatible con K1100F/K9860/K9840; resistente a ácidos y álcalis fuertes y a altas temperaturas; conecta y sella el sistema con el tubo de digestión.",
      image: "/productos/hanon-k9840/consumible-4.webp",
    },
  ],
  "hanon-sox606": [
    {
      name: "Vaso de extracción de vidrio (Borosilicato)",
      description:
        "Vaso de borosilicato de alta resistencia térmica y química, ideal para los ciclos estándar de extracción Soxhlet.",
      image: "/productos/hanon-sox606/consumible-2.png",
    },
    {
      name: "Vaso de extracción de aluminio (Metálico)",
      description:
        "Vaso metálico de alta conductividad para acelerar los ciclos de extracción en caliente y evaporación de solventes.",
      image: "/productos/hanon-sox606/consumible-1.jpg",
    },
  ],
  "hanon-sh220f": [
    {
      name: "Tubo de sellado",
      description:
        "Compatible con la campana de recolección de gases residuales WD03.",
      image: "/productos/hanon-sh220f/consumible-1.webp",
    },
  ],
  "hanon-sh420f": [
    {
      name: "Tubo de digestión de borosilicato",
      description:
        "Compatible con los equipos Kjeldahl K9860, K9840 y K1160, SH220F, SH420F. Utilizado para la digestión y destilación de muestras con alta resistencia térmica.",
      image: "/productos/hanon-sh420f/consumible-1.webp",
    },
    {
      name: "Tubo de sellado",
      description:
        "Tubo de sellado especial compatible con la campana de recolección de gases residuales WD03 y colectores de vapores ácidos.",
      image: "/productos/hanon-sh420f/consumible-2.webp",
    },
  ],
  "hanon-k1100f": [
    {
      name: "Tubo de digestión de borosilicato",
      description:
        "Compatible con los equipos Kjeldahl K9860, K9840 y K1100F, así como con sus tubos de digestión; se utiliza para la digestión y destilación de muestras.",
      image: "/productos/hanon-k1100f/consumible-2.webp",
    },
    {
      name: "Cabezal de destilación",
      description:
        "Compatible con K1100F, K9860 y K9840; resistente a ácidos y álcalis fuertes y a altas temperaturas; se utiliza para conectar y sellar la unión entre el sistema de destilación y el tubo de digestión.",
      image: "/productos/hanon-k1100f/consumible-3.webp",
    },
    {
      name: "Depósito de ácido estándar",
      description:
        "Compatible con K1100F/K9860; para el almacenamiento de la solución ácida de valoración.",
      image: "/productos/hanon-k1100f/consumible-1.webp",
    },
  ],
  "hanon-sh520": [
    {
      name: "Tubo de digestión de borosilicato",
      description:
        "Compatible con los digestores de la serie SH de Hanon (SH220F, SH420F, SH508 y SH520). Fabricado con borosilicato de alta resistencia térmica para digestiones seguras.",
      image: "/productos/hanon-sh420f/consumible-1.webp",
    },
    {
      name: "Tubo de sellado",
      description:
        "Tubo de sellado especial compatible con la campana de recolección de gases residuales WD03 y neutralizadores de vapores ácidos.",
      image: "/productos/hanon-sh420f/consumible-2.webp",
    },
  ],
  "hanon-d50-d200": [
    {
      name: "Tubo de combustión y reducción",
      description:
        "Tubos reutilizables hasta 1,000 veces. Los consumibles reducen los óxidos de nitrógeno y absorben el exceso de oxígeno.",
      image: "/productos/hanon-d50-d200/consumible.png",
    },
  ],
  "hanon-e500": [
    {
      name: "Crisol de cerámica",
      description: "Porcelana al 95% · LBJ-E500-005",
    },
    {
      name: "Lanza de oxígeno",
      description: "Tubo de corindón · LBJ-E500-373",
    },
    { name: "Tubo de combustión", description: "Cuarzo · LBJ-E500-003" },
    { name: "Tubo reductor", description: "Cuarzo · LBJ-E500-092" },
    { name: "Tubo de soporte", description: "Cuarzo · LBJ-E500-375" },
    { name: "Varilla de soporte", description: "Cuarzo · LBJ-E500-374" },
    {
      name: "Conjunto de tubo de secado",
      description: "Referencia ZPT-E500-032",
    },
    {
      name: "Bolas de alúmina de alta pureza",
      description: "50 g por botella",
    },
    { name: "Alambre de cobre", description: "100 g por botella" },
    { name: "Lana de cuarzo de alta pureza", description: "100 g por caja" },
    { name: "Trióxido de tungsteno (WO₃)", description: "60 g por botella" },
    { name: "Ácido benzoico", description: "5 g por frasco" },
    { name: "Alambre de plata", description: "50 g por paquete" },
    { name: "Desecante", description: "454 g por botella" },
    {
      name: "Fieltro de grafito",
      description: "Ø25 × 10 mm · 10 unidades por paquete",
    },
    { name: "Negro de humo", description: "80 g por botella" },
    { name: "Sulfanilamida", description: "10 g por botella" },
    {
      name: "Papel de aluminio",
      description: "400 unidades por caja · 35 × 35 mm",
    },
    {
      name: "Barcos de hojalata",
      description: "500 unidades por paquete · 6 × 6 × 12 mm",
    },
    {
      name: "Barcos de plata",
      description: "114 unidades por caja · 6 × 6 × 12 mm",
    },
    { name: "Caja de muestra", description: "24 pocillos · PS · D100" },
  ],
};

const ACCESSORIES_BY_SLUG: Record<
  string,
  { name: string; description: string; image?: string }[]
> = {
  "infitek-wb-series": [
    {
      name: "Bandeja perforada con asas",
      description:
        "Accesorio metálico perforado incluido en el material proporcionado para el modelo WB-1R2H-7.",
      image: "/productos/infitek/wb-series/accesorio-1.png",
    },
    {
      name: "Cable de alimentación",
      description:
        "Cable de alimentación mostrado en la documentación visual suministrada con el producto.",
      image: "/productos/infitek/wb-series/accesorio-2.png",
    },
    {
      name: "Juego de aros reductores",
      description:
        "Conjunto de aros de distintos diámetros para la cubierta superior del baño de agua.",
      image: "/productos/infitek/wb-series/accesorio-3.png",
    },
  ],
  "hyperpurex-serie-lu-discovery": [
    {
      name: "Tanque PE de 60 L",
      description:
        "La ficha LU documenta un tanque PE de 60 L como configuración estándar.",
    },
    {
      name: "Brazo dispensador HiDis",
      description:
        "La ficha identifica un brazo dispensador HiDis opcional y documenta la posibilidad de conectar hasta cinco brazos.",
    },
    {
      name: "Interruptor de pie",
      description:
        "El listado de accesorios de la ficha incluye un interruptor de pie como accesorio opcional.",
    },
    {
      name: "Sensor externo de fugas",
      description:
        "El listado de accesorios de la ficha identifica un sensor externo de fugas opcional.",
    },
  ],
  "hyperpurex-serie-x-flagship": [
    {
      name: "Tanque PE de 60 o 120 L",
      description:
        "El listado de accesorios identifica tanques PE de 60 y 120 L con filtro de aire, módulo de control de nivel y pantalla LCD.",
    },
    {
      name: "Brazo dispensador HiDis",
      description:
        "La ficha identifica el brazo dispensador HiDis con kit de conexión de 2 m como accesorio de la Serie X.",
    },
    {
      name: "Filtro de pretratamiento",
      description:
        "El listado de accesorios incluye un filtro de pretratamiento para el agua de alimentación, además de cartuchos PP y RS de 10 pulgadas.",
    },
    {
      name: "Suavizador automático de agua",
      description:
        "El listado de accesorios identifica un suavizador automático; la ficha señala que requiere sal.",
    },
    {
      name: "Interruptor de pie y sensor externo de fugas",
      description:
        "La ficha enumera un interruptor de pie y un sensor externo de fugas como accesorios de la plataforma.",
    },
  ],
  "hyperpurex-serie-p-pursuit": [
    {
      name: "Tanque PE de 60 o 120 L",
      description:
        "La ficha identifica los tanques TANK1061 y TANK1121, con filtro de aire, control de nivel independiente y pantalla LCD.",
    },
    {
      name: "Brazo dispensador HiDis",
      description:
        "El listado de accesorios identifica el kit DISP2000 de brazo HiDis con conexión de 2 m.",
    },
    {
      name: "Interruptor de pie y sensor externo de fugas",
      description:
        "La ficha lista los accesorios PWA7501 y PWA7502 para accionamiento a pie y detección externa de fugas.",
    },
    {
      name: "Soporte de muro",
      description:
        "La ficha identifica el soporte de montaje en muro PWA1302 como accesorio para la Serie P.",
    },
  ],
  "hyperpurex-serie-fx-flagship": [
    {
      name: "Brazo dispensador HiDis",
      description:
        "La ficha identifica el brazo DISP2000 con kit de conexión de 2 m como accesorio de la plataforma FX.",
    },
    {
      name: "Pretratamiento y suavizador",
      description:
        "El listado de accesorios incluye suavizador PWA7201, filtro de pretratamiento PWA7020 y cartuchos PP y RS PWA7021/PWA7022 para el agua de alimentación.",
    },
    {
      name: "Interruptor de pie y sensor externo de fugas",
      description:
        "La ficha identifica PWA7501 y PWA7502 como accesorios de accionamiento y detección externa de fugas.",
    },
    {
      name: "Módulos PWS de almacenamiento y suministro",
      description:
        "El fabricante lista PWSL1000, PWSL2000 y los módulos PWSM0500, PWSM1000 y PWSM2000 para almacenamiento y suministro de agua; la configuración depende de la instalación.",
    },
  ],
  "hyperpurex-serie-fe-eminente": [
    {
      name: "Brazo dispensador HiDis",
      description:
        "La ficha identifica el brazo dispensador HiDis independiente con kit de conexión de 2 m como accesorio de la plataforma FE.",
    },
    {
      name: "Pretratamiento y suavizador",
      description:
        "El listado de accesorios incluye suavizador automático PWA7201, filtro de pretratamiento PWA7020 y cartuchos PP y RS PWA7021/PWA7022 para el agua de alimentación.",
    },
    {
      name: "Interruptor de pie y sensor externo de fugas",
      description:
        "La ficha lista PWA7501 y PWA7502 como accesorios de accionamiento y detección externa de fugas.",
    },
    {
      name: "Módulos de almacenamiento y suministro",
      description:
        "El fabricante identifica módulos PWSL1000, PWSL2000, PWSM0500, PWSM1000 y PWSM2000; la configuración depende de la instalación requerida.",
    },
  ],
};

const HYPERPUREX_RELATED_VIDEOS = {
  "hyperpurex-serie-su-smart": {
    label: "Serie SU Smart",
    src: "/productos/hyperpurex-serie-su-smart/video-relacionado.mp4",
    poster: "/productos/hyperpurex-serie-su-smart/portada.png",
  },
  "hyperpurex-serie-eue": {
    label: "Serie EUE",
    src: "/productos/hyperpurex-serie-eue/video-relacionado-actualizado.mp4",
    poster: "/productos/hyperpurex-serie-eue/equipo-vista-general.png",
  },
  "hyperpurex-serie-lu-discovery": {
    label: "Serie LU Discovery",
    src: "/productos/hyperpurex-serie-lu-discovery/video-relacionado.mp4",
    poster: "/productos/hyperpurex-serie-lu-discovery/portada.png",
  },
  "hyperpurex-serie-x-flagship": {
    label: "Serie X Flagship",
    src: "/productos/hyperpurex-serie-x-flagship/video-relacionado.mp4",
    poster: "/productos/hyperpurex-serie-x-flagship/portada.png",
  },
  "hyperpurex-serie-p-pursuit": {
    label: "Serie P Pursuit",
    src: "/productos/hyperpurex-serie-p-pursuit/video-relacionado.mp4",
    poster: "/productos/hyperpurex-serie-p-pursuit/portada.png",
  },
} as const;

type DescriptiveImage = NonNullable<ProductDetail["descriptionImage"]>;
type DescriptiveMedia = DescriptiveImage | ProductDescriptionVideo;

const SPECIAL_DESCRIPTIVE_IMAGES: Record<string, DescriptiveImage[]> = {
  "te-instruments-xplorer-tn": [
    {
      src: "/productos/te-instruments/xplorer-tn/descripcion.jpg",
      alt: "Diagrama analítico del detector y ruta de combustión XplorerPlus TN",
      title: "Flujo y componentes internos",
      caption:
        "Esquema del detector y sistema de combustión de alta eficiencia XproPlus, ruta de flujo interna de cuarzo y detectores de fluorescencia UV (TS-UV-F), quimiluminiscencia (TN) y titulación microcoulombimétrica (TX/TS) con tecnología de corrección automática de interferencias de nitrógeno NO-CT™.",
    },
  ],
  "decent-cargador-electrico-crisoles": [
    {
      src: "/productos/decent/cargador-electrico-crisoles/Imagen para la descripcion.webp",
      alt: "Panel de control y unidad motriz del cargador eléctrico de crisoles Decent DEPL25/DEPL50",
      title: "Control y alimentación",
      caption:
        "Panel de control intuitivo y compartimento de batería sin mantenimiento DC 12V 60Ah con cargador integrado para los cargadores eléctricos de crisoles DEPL25 y DEPL50.",
    },
  ],
  "decent-horno-copelacion-alta-temperatura": [
    {
      src: "/productos/decent/horno-copelacion-alta-temperatura/Imagen para la Descripcion.jpg",
      alt: "Consola de control y componentes del horno de copelación de alta temperatura Decent",
      title: "Consola de control",
      caption:
        "Consola de control y panel de instrumentación del horno a 1500°C: ① Voltímetro, ② Amperímetro, ③ Temporizador, ④ Medidor de temperatura PID, ⑤ Interruptor general, ⑥ Interruptor de calefacción, ⑦ Indicador de poder, ⑧ Indicador de calefacción, ⑨ Parada de emergencia, ⑩ Pantalla táctil HMI.",
    },
  ],
};

export function ProductDetailTabs({
  slug,
  summaryItems,
  productName,
  technicalParameters,
  detailBlocks,
  specificationNotes,
  descriptionImage,
  descriptionImages,
  descriptionVideos,
  complianceNotes,
  applicationNotes,
  relatedVideo,
  brand,
}: {
  slug: string;
  summaryItems: string[];
  productName: string;
  technicalParameters: TechnicalParameterRow[];
  detailBlocks?: ProductDetail["detailBlocks"];
  specificationNotes?: ProductDetail["specificationNotes"];
  descriptionImage?: ProductDetail["descriptionImage"];
  descriptionImages?: ProductDetail["descriptionImages"];
  descriptionVideos?: ProductDetail["descriptionVideos"];
  complianceNotes?: ProductDetail["complianceNotes"];
  applicationNotes?: ProductDetail["applicationNotes"];
  relatedVideo?: ProductDetail["relatedVideo"];
  brand?: string;
}) {
  const hasFullCatalogNotice = Boolean(
    brand && FULL_CATALOG_BRANDS.includes(brand),
  );
  const isK1160 = slug === "hanon-k1160";
  const isMilestoneEthos = slug === "milestone-ethos-up";
  const isHyperpurex = slug.startsWith("hyperpurex-");
  const isHyperpurexEue = slug === "hyperpurex-serie-eue";
  const isHyperpurexLuDiscovery = slug === "hyperpurex-serie-lu-discovery";
  const isHyperpurexXFlagship = slug === "hyperpurex-serie-x-flagship";
  const isHyperpurexPPursuit = slug === "hyperpurex-serie-p-pursuit";
  const isHyperpurexFxFlagship = slug === "hyperpurex-serie-fx-flagship";
  const isHyperpurexFeEminent = slug === "hyperpurex-serie-fe-eminente";
  const isHyperpurexFsSmart = slug === "hyperpurex-serie-fs-smart";
  const isHanonF2000 = slug === "hanon-f2000";
  const isHanonDf06 = slug === "hanon-df06";
  const isHanonFiberAnalyzer = isHanonF2000 || isHanonDf06;
  const isDistek = slug.startsWith("distek-");
  const isEuroVector = slug.startsWith("eurovector-");
  const isColdBlock = slug.startsWith("coldblock-");
  const isSkalar = slug.startsWith("skalar-");
  const hyperpurexRelatedVideo =
    HYPERPUREX_RELATED_VIDEOS[slug as keyof typeof HYPERPUREX_RELATED_VIDEOS];
  const isTechnicalProduct =
    slug.startsWith("hanon-") ||
    isMilestoneEthos ||
    isHyperpurex ||
    isDistek ||
    isEuroVector ||
    isColdBlock ||
    isSkalar ||
    slug.startsWith("infitek-") ||
    slug.startsWith("te-instruments-") ||
    slug.startsWith("decent-");
  const specialDescriptiveImages = SPECIAL_DESCRIPTIVE_IMAGES[slug] ?? [];
  const documentedDescriptionImages = [
    ...(descriptionImage ? [descriptionImage] : []),
    ...(descriptionImages ?? []),
  ];
  const descriptiveImages = [
    ...documentedDescriptionImages.map((image) => {
      const specialImage = specialDescriptiveImages.find(
        (special) => special.src === image.src,
      );

      return specialImage ? { ...image, ...specialImage } : image;
    }),
    ...specialDescriptiveImages.filter(
      (special) =>
        !documentedDescriptionImages.some(
          (documented) => documented.src === special.src,
        ),
    ),
  ];
  const descriptiveMedia = [...descriptiveImages, ...(descriptionVideos ?? [])];

  // State hooks for both tab sets
  const [activeHanonTab, setActiveHanonTab] =
    useState<HanonTabId>("especificaciones");
  const [activeDefaultTab, setActiveDefaultTab] =
    useState<DefaultTabId>("detalle");
  const [copiedSpecs, setCopiedSpecs] = useState(false);

  const handleCopySpecs = () => {
    if (!technicalParameters || technicalParameters.length === 0) return;
    const lines = [
      `Especificaciones Técnicas - ${productName}`,
      "----------------------------------------",
      ...technicalParameters.flatMap((row) => [
        `${row.leftParameter}: ${row.leftValue}`,
        `${row.rightParameter}: ${row.rightValue}`,
      ]),
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2000);
  };

  if (isTechnicalProduct) {
    const hasConsumibles = [
      "hyperpurex-serie-su-smart",
      "hyperpurex-serie-eue",
      "hyperpurex-serie-lu-discovery",
      "hyperpurex-serie-x-flagship",
      "hyperpurex-serie-p-pursuit",
      "hyperpurex-serie-fx-flagship",
      "hyperpurex-serie-fe-eminente",
      "hyperpurex-serie-fs-smart",
      "hanon-k9860",
      "hanon-k9840",
      "hanon-sox606",
      "hanon-sh220f",
      "hanon-sh420f",
      "hanon-k1100f",
      "hanon-sh520",
      "hanon-s402",
      "hanon-sox406",
      "hanon-f800",
      "hanon-d50-d200",
      "hanon-e500",
      "milestone-ethos-up",
    ].includes(slug);
    const hasAccessories = Boolean(ACCESSORIES_BY_SLUG[slug]?.length);
    const usesStructuredParameters = [
      "hyperpurex-serie-su-smart",
      "hyperpurex-serie-eue",
      "hyperpurex-serie-lu-discovery",
      "hyperpurex-serie-x-flagship",
      "hyperpurex-serie-p-pursuit",
      "hyperpurex-serie-fx-flagship",
      "hyperpurex-serie-fe-eminente",
      "hyperpurex-serie-fs-smart",
      "distek-ezfill-plus",
      "distek-olera",
      "distek-olera-plus",
      "distek-olera-select",
      "distek-opt-diss-410",
      "distek-eclipse-5300",
      "distek-bione-bioreactor",
      "distek-bione-fermentor",
      "distek-bione-1250",
      "distek-bione-mixing-system",
      "eurovector-ea3100",
      "coldblock-pro-series-cbl",
      "coldblock-pro-series-cbm",
      "coldblock-pro-series-cbs",
      "skalar-serie-san-plus-plus",
      "hanon-f2000",
      "hanon-df06",
      "infitek-wb-series",
      "infitek-pr5-series",
      "infitek-titr-50vc",
      "te-instruments-xplorer-aox-tox",
      "te-instruments-xplorer-tn",
      "te-instruments-vectra",
      "te-instruments-newton",
      "decent-cargador-electrico-crisoles",
      "decent-cargador-manual-crisoles",
      "decent-copelas-magnesio",
      "decent-dosificador-automatico-litargirio",
      "decent-hornos-cupelacion",
      "decent-horno-copelacion-alta-temperatura",
      "decent-hornos-fusion-ensayo-fuego",
      "decent-mezclador-crisoles",
      "decent-molino-pulverizador-dp1000",
      "decent-drsd05",
      "decent-drsd40",
      "decent-trituradora-martillo",
      "decent-rodillo-botella",
      "decent-dsw350",
      "decent-mezclador-tipo-v",
      "decent-trituradora-doble-rodillo",
      "decent-agitador-tamiz-estandar",
      "decent-hornos-secado",
    ].includes(slug);
    const hanonTabs: { id: HanonTabId; label: string }[] = [
      { id: "especificaciones", label: "Especificaciones" },
      ...(isColdBlock
        ? []
        : [
            { id: "cumplimiento" as const, label: "Cumplimiento" },
            { id: "aplicaciones" as const, label: "Aplicaciones" },
          ]),
      { id: "soporte", label: "Soporte Del Carpio" },
    ];
    if (hasAccessories) {
      hanonTabs.push({ id: "accesorios", label: "Accesorios" });
    }
    if (hasConsumibles) {
      hanonTabs.push({
        id: "consumibles",
        label: isMilestoneEthos
          ? "Rotores y accesorios"
          : "Consumibles Relacionados",
      });
    }
    if (
      relatedVideo ||
      hyperpurexRelatedVideo ||
      slug === "hanon-sox606" ||
      slug === "hanon-sh420f" ||
      slug === "hanon-k1100f" ||
      slug === "hanon-sox406" ||
      slug === "hanon-f800"
    ) {
      hanonTabs.push({ id: "video", label: "Video Relacionado" });
    }
    const tabGridClass =
      hanonTabs.length >= 6
        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        : hanonTabs.length === 5
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          : hanonTabs.length === 2
            ? "grid-cols-2"
          : "grid-cols-2 md:grid-cols-4";

    return (
      <section className="pb-14 md:pb-20">
        <div className="border border-[#D4DFDC] bg-white rounded-[4px] overflow-hidden">
          {/* Tablist */}
          <div
            role="tablist"
            aria-label={`Información del producto ${productName}`}
            className={cn(
              "grid border-b border-[#D4DFDC] bg-[#F4F4F4]",
              tabGridClass,
              "border-t-0",
            )}
          >
            {hanonTabs.map((tab) => {
              const isActive = activeHanonTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveHanonTab(tab.id)}
                  className={cn(
                    "border-b border-[#D4DFDC] px-4 py-4 text-left text-[12px] font-extrabold uppercase tracking-[0.12em] transition-colors duration-150 ease-out md:border-b-0 md:border-r md:last:border-r-0",
                    isActive
                      ? "bg-white text-[#D6532B]"
                      : "text-[#4A5560] hover:bg-white/70 hover:text-[#101820]",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Panels */}
          <div className="p-5 sm:p-7 md:p-9 bg-white min-h-[360px]">
            {/* 1. Especificaciones */}
            {activeHanonTab === "especificaciones" && (
              <div
                role="tabpanel"
                id="panel-especificaciones"
                aria-labelledby="tab-especificaciones"
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-[0.16em] text-[#D6532B]">
                      Especificaciones Técnicas{" "}
                      {slug
                        .replace(
                          /^(hanon|milestone|infitek|te-instruments|distek|eurovector|coldblock|skalar)-/,
                          "",
                        )
                        .toUpperCase()}
                    </h3>
                    <button
                      type="button"
                      onClick={handleCopySpecs}
                      className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#707E83] hover:text-[#101820] transition-colors"
                      title="Copiar especificaciones técnicas al portapapeles"
                    >
                      {copiedSpecs ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-600 font-bold">
                            ¡Copiado!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copiar datos</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
                    {usesStructuredParameters &&
                      technicalParameters.map((row, index) => (
                        <div
                          key={`${row.leftParameter}-${row.rightParameter}`}
                          className={cn(
                            "grid grid-cols-1 md:grid-cols-2",
                            index < technicalParameters.length - 1 &&
                              "border-b border-[#D4DFDC]",
                          )}
                        >
                          <SpecCell
                            label={row.leftParameter}
                            value={row.leftValue}
                          />
                          <SpecCell
                            label={row.rightParameter}
                            value={row.rightValue}
                          />
                        </div>
                      ))}
                    {slug === "infitek-cod-analyzer" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="(0~150)mg/L, (0~1500)mg/L"
                          />
                          <SpecCell label="Exactitud" value="±8%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Repetibilidad" value="3%" />
                          <SpecCell
                            label="Almacenamiento"
                            value="200 resultados trazables"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Comunicación" value="USB" />
                          <SpecCell label="Pantalla" value="LCD" />
                        </div>
                      </>
                    )}
                    {slug === "infitek-bep-m300f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Modelo y Parámetros"
                            value="BEP-M300F · pH/CE/ISE/OD/Temp. (mV/ORP/pX/Resistividad/TDS/Salinidad)"
                          />
                          <SpecCell
                            label="pH"
                            value="Rango: -2,00 a 20,00 pH · Resolución: 0,1, 0,01 pH · Exactitud: ±0,01 pH"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Calibración pH"
                            value="Hasta 5 puntos · Búferes NIST, GB y DIN · Diagnóstico automático de electrodo"
                          />
                          <SpecCell
                            label="mV"
                            value="Rango: -2000,0 a 2000,0 mV · Resolución: 0,1 mV · Exactitud: ±0,3 mV o ±0,1%"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="ISE"
                            value="1E-9 a 9.999E9 (mol/L, mg/L, ppm, etc) · Resolución hasta 4 dígitos · Exactitud: ±0,5%"
                          />
                          <SpecCell
                            label="Conductividad"
                            value="0,000 μS/cm a 1000 mS/cm · Exactitud: ±1,0 % FS · Reconocimiento 84, 1413, 12.88 mS/cm"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Resistividad y TDS"
                            value="5,00 Ω·cm ~ 20,00 MΩ·cm · TDS: 0,00 ppm ~ 300 ppt"
                          />
                          <SpecCell
                            label="Salinidad"
                            value="0,0 ~ 80,0 ppt · Resolución: 0,1 ppt · Exactitud: ±2 ppt"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Oxígeno Disuelto (OD)"
                            value="0,00 a 20,00 ppm · Resolución: 0,01 ppm · Exactitud: ±0,10 ppm"
                          />
                          <SpecCell
                            label="Saturación OD y Calibración"
                            value="0,0 a 200,0% · Agua saturada de aire o punto cero · Compensación barométrica"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Temperatura"
                            value="-5 a 110 ºC (23 a 230 ºF) · Exactitud: ±0,2 ºC"
                          />
                          <SpecCell
                            label="Gestión de datos"
                            value="Almacenamiento de 500 resultados con registro trazable"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Lectura y Conectividad"
                            value="Automática, temporizada, continua · Salidas: USB (Memoria/PC), RS-232 (Impresora)"
                          />
                          <SpecCell
                            label="Entradas de electrodos"
                            value="pH: BNC(Q9) · OD: Aviación 4 pines · CE: Aviación 5 pines"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Alimentación y Protección"
                            value="Adaptador de CA 100-240 V, 9V CC · Clasificación IP54"
                          />
                          <SpecCell
                            label="Dimensiones y Peso"
                            value="242 × 195 × 68 mm · 900 g"
                          />
                        </div>
                      </>
                    )}
                    {slug === "infitek-usc-m-series" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Modelos y Capacidades"
                            value="De 1.3 L a 45 L (12 modelos disponibles)"
                          />
                          <SpecCell
                            label="Potencia Ultrasónica"
                            value="70 W a 720 W (Ajustable 10%-100%)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Frecuencia Ultrasónica"
                            value="40 KHz (Con barrido de frecuencia)"
                          />
                          <SpecCell
                            label="Potencia de Calefacción"
                            value="100 W a 1000 W"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Ajuste de Temperatura"
                            value="Predeterminado 60℃, opcional 80℃"
                          />
                          <SpecCell
                            label="Ajuste de Tiempo"
                            value="1 a 99 minutos"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Material del Tanque"
                            value="Acero inoxidable de alta calidad"
                          />
                          <SpecCell
                            label="Válvula de Drenaje"
                            value="Disponible en modelos de ≥ 10 Litros"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Transductores"
                            value="1 a 12 (dependiendo del modelo)"
                          />
                          <SpecCell
                            label="Pantalla"
                            value="LCD grande con retroiluminación"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Canasta de Limpieza"
                            value="Incluida"
                          />
                          <SpecCell
                            label="Asa de Transporte"
                            value="Disponible en modelos de ≥ 3.2 Litros"
                          />
                        </div>
                      </>
                    )}
                    {slug === "infitek-don-h-series" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Modelos Disponibles"
                            value="43L, 71L, 136L, 225L (Estándar y serie E)"
                          />
                          <SpecCell
                            label="Modo de Circulación"
                            value="Convección natural horizontal"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de Temperatura"
                            value="RT+10℃ ~ 250℃"
                          />
                          <SpecCell
                            label="Fluctuación / Resolución"
                            value="±1℃ / 0.1℃"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Uniformidad" value="±3.5%" />
                          <SpecCell
                            label="Controlador y Sensor"
                            value="PID / PT100"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Temporizador"
                            value="0 ~ 9999 minutos"
                          />
                          <SpecCell label="Pantalla" value="LED Digital" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Material Interno"
                            value="Acero inoxidable / Chapa galvanizada (Serie E)"
                          />
                          <SpecCell
                            label="Estantes (Estándar / Máximo)"
                            value="2 / Hasta 25 (según capacidad)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Agujero de Escape"
                            value="Estándar Φ35mm superior (función de agujero de prueba)"
                          />
                          <SpecCell
                            label="Alimentación y Consumo"
                            value="CA 220/110V · De 1200 W a 3000 W"
                          />
                        </div>
                      </>
                    )}
                    {slug === "infitek-mca-series" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Modelos Disponibles"
                            value="MCA110-10, MCA110-5, MCA110-2, MCA110-1A"
                          />
                          <SpecCell
                            label="Capacidad Máxima"
                            value="110 gramos"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Legibilidad (Peso)"
                            value="0,01 g / 0,005 g / 0,002 g / 0,001 g"
                          />
                          <SpecCell
                            label="Legibilidad (Humedad)"
                            value="0,20% / 0,10% / 0,04% / 0,01%"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Fuente de calor"
                            value="Lámpara halógena-1 / Lámpara halógena-2"
                          />
                          <SpecCell
                            label="Rango de Temperatura"
                            value="40℃ - 199℃ (Ajuste en pasos de 1℃)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Ajuste de Tiempo"
                            value="1 a 99 minutos (por 10 s)"
                          />
                          <SpecCell
                            label="Rango de Humedad / Seco"
                            value="0.00% - 100.00% / 100.00% - 0.00%"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Pantalla y Almacenamiento"
                            value="LCD retroiluminada / 15 memorias históricas"
                          />
                          <SpecCell
                            label="Calibración e Interfaz"
                            value="Calibración externa · RS232 (estándar), USB (opcional)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Plato y Cámara"
                            value="Plato: Ø90mm · Altura cámara: 22 mm"
                          />
                          <SpecCell
                            label="Alimentación y Temperatura"
                            value="220V±15% 50Hz (400W) · Operación: 5℃-35℃"
                          />
                        </div>
                      </>
                    )}
                    {slug === "infitek-ph-b100bd" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Modelo y Parámetros"
                            value="PH-B100BD · pH / mV"
                          />
                          <SpecCell label="Rango pH" value="0,00 ~ 14,00 pH" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Resolución y Precisión pH"
                            value="0,01 pH · ±0,05 pH"
                          />
                          <SpecCell
                            label="Calibración pH"
                            value="Hasta 2 puntos (Auto/Manual)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Reconocimiento Patrones"
                            value="Tampones NIST (pH 4.01, 7.00, 10.01)"
                          />
                          <SpecCell
                            label="Rango y Precisión mV"
                            value="-1400 a 1400 mV · Resolución: 1 mV · Precisión: ±0,1 % FS"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Pantalla y Modo de Lectura"
                            value="LCD 6.0 pulgadas con retroiluminación · Continuo"
                          />
                          <SpecCell
                            label="Compensación de Temperatura"
                            value="MTC (Manual)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Conectores y Protección"
                            value="BNC (Q9) · IP54"
                          />
                          <SpecCell
                            label="Apagado Automático"
                            value="Desactivado o seleccionable (300 s a 3600 s)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Alimentación"
                            value="Adaptador CA 230V/50Hz; Salida CC 12V/1000mA"
                          />
                          <SpecCell
                            label="Dimensiones y Peso"
                            value="200 × 160 × 63 mm · 600 g"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k1160" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="0.1 mg – 240 mg N"
                          />
                          <SpecCell
                            label="Tiempo de análisis"
                            value="3–8 min por muestra"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="RSD" value="≤ 0.5%" />
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Precisión de bureta"
                            value="0.2 / 0.4 / 1.0 μL por paso (opcional)"
                          />
                          <SpecCell
                            label="Capacidad de muestra"
                            value="sólidos ≤ 5 g · líquidos ≤ 20 mL"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Consumo de agua"
                            value="0.5 L/min en destilación"
                          />
                          <SpecCell
                            label="Almacenamiento"
                            value="1 millón de registros (interno) · ilimitado (PC)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Interfaces"
                            value="USB, LAN, RS232, CAN, WiFi"
                          />
                          <SpecCell
                            label="Alimentación"
                            value="220 VAC ±10%, 50/60 Hz · 2000 W"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="38 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="460 × 360 × 725 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k9860" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="0.1 – 240 mg N"
                          />
                          <SpecCell
                            label="Tiempo de análisis"
                            value="5 – 10 min por muestra"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="RSD" value="≤ 0.5%" />
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Precisión de bureta"
                            value="2.0 μL/step"
                          />
                          <SpecCell
                            label="Capacidad de muestra"
                            value="Sólidos ≤ 5 g · Líquidos ≤ 20 mL"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Consumo de agua"
                            value="1.5 L/min en destilación"
                          />
                          <SpecCell
                            label="Almacenamiento"
                            value="1000 registros locales"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50/60 Hz"
                          />
                          <SpecCell label="Potencia" value="2000 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="38 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="455 × 391 × 730 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k9840" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="0.1 mg – 240 mg N"
                          />
                          <SpecCell
                            label="Tiempo de análisis"
                            value="3 – 6 min por muestra"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                          <SpecCell
                            label="Capacidad de muestra"
                            value="Sólidos ≤ 6 g · Líquidos ≤ 16 mL"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Consumo de agua" value="1.5 L/min" />
                          <SpecCell
                            label="Modo de operación"
                            value="Manual / Automático"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Pantalla de interfaz"
                            value="LCD de 4.3 pulgadas"
                          />
                          <SpecCell label="Potencia nominal" value="1300 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50/60 Hz"
                          />
                          <SpecCell
                            label="Calibraciones"
                            value="Agua / Álcali / Ácido bórico"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="30 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="400 × 385 × 735 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sox606" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="0.1% – 100%"
                          />
                          <SpecCell
                            label="Rango de temperatura"
                            value="Temp. ambiente +5°C a 300°C"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Precisión de temperatura"
                            value="±1°C"
                          />
                          <SpecCell
                            label="Repetibilidad analítica"
                            value="Error relativo ≤ 1%"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Capacidad por lote"
                            value="6 muestras simultáneas"
                          />
                          <SpecCell
                            label="Peso de muestra"
                            value="0.5 g – 15 g"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Volumen de copa" value="150 mL" />
                          <SpecCell
                            label="Recuperación de solventes"
                            value="≥ 85%"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50 Hz"
                          />
                          <SpecCell label="Potencia consumida" value="2600 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="50 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="650 × 380 × 720 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sox406" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="0% – 100%"
                          />
                          <SpecCell
                            label="Rango de temperatura"
                            value="Temp. ambiente +5°C a 280°C"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Precisión de temperatura"
                            value="±1°C"
                          />
                          <SpecCell
                            label="Repetibilidad analítica"
                            value="Error relativo ≤ 1%"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Capacidad por lote"
                            value="6 muestras simultáneas"
                          />
                          <SpecCell
                            label="Peso de muestra"
                            value="0.5 g – 15 g (generalmente 2 g – 5 g)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Volumen de copa" value="80 mL" />
                          <SpecCell
                            label="Recuperación de solvente"
                            value="≥ 80%"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Tiempo de extracción acortado"
                            value="20% – 80%"
                          />
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50/60 Hz"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Potencia nominal" value="1000 W" />
                          <SpecCell label="Peso neto" value="35 kg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Dimensiones"
                            value="650 × 320 × 715 mm"
                          />
                          <SpecCell
                            label="Elevación de muestras"
                            value="Cojinetes lineales de precisión"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-f800" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="0.1% – 100%"
                          />
                          <SpecCell
                            label="Capacidad por lote"
                            value="6 muestras simultáneas"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Peso de muestra"
                            value="0.5 g – 3 g"
                          />
                          <SpecCell
                            label="Precisión de repetibilidad"
                            value="≤0.4% (fibra <10%), ≤1% (fibra >10%)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Tiempo de precalentamiento"
                            value="10 – 12 min"
                          />
                          <SpecCell
                            label="Tiempo hasta ebullición"
                            value="13 – 15 min"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Pantalla de control"
                            value="Táctil a color de 7 pulgadas"
                          />
                          <SpecCell label="Potencia nominal" value="2200 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50/60 Hz"
                          />
                          <SpecCell
                            label="Parámetros analizados"
                            value="Fibra bruta, NDF, ADF, ADL, hemicelulosa"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Dimensiones"
                            value="776 × 476 × 644 mm"
                          />
                          <SpecCell
                            label="Métodos analíticos"
                            value="Weende (fibra bruta) y Van Soest"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-d50-d200" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de detección"
                            value="0.1 - 500mg N"
                          />
                          <SpecCell
                            label="Tiempo de análisis"
                            value="3-4 min/muestra"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Recuperación" value="≥99.5%" />
                          <SpecCell label="RSD" value="≤0.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Muestreador D200"
                            value="1 disco x 120 / 40 posiciones"
                          />
                          <SpecCell
                            label="Muestreador D50"
                            value="1 disco x 60 posiciones"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Gas portador"
                            value="CO2 (99.999%)"
                          />
                          <SpecCell label="Pureza O2" value="99.999%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220V AC ±10% 50Hz"
                          />
                          <SpecCell label="Potencia nominal" value="2000W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="80 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="735 × 560 × 560 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-e500" && (
                      <>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Elementos determinados"
                            value="Carbono, hidrógeno, nitrógeno, azufre y oxígeno (C/H/N/S/O)"
                          />
                          <SpecCell
                            label="Muestreador automático"
                            value="Bandeja giratoria de 120 posiciones, introducción por crisol y sustitución de cenizas in situ"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Separación de gases"
                            value="Tecnología específica de adsorción-desorción"
                          />
                          <SpecCell
                            label="Combustión y reducción"
                            value="Horno de fibra de aluminosilicato hasta 1400 °C; zona estable > 200 mm, desviación < 10 °C"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Tiempo de análisis"
                            value="Aproximadamente 3-4 min por elemento, según muestra, modo y configuración"
                          />
                          <SpecCell
                            label="Tamaño de muestra"
                            value="Máx. 1,5 g para sólidos o 1 mL para líquidos"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Rango dinámico C / H / N"
                            value="C: 0-30 mg · H: 0-4 mg · N: 0-10 mg; cada elemento 0-100%"
                          />
                          <SpecCell
                            label="Rango dinámico S / O"
                            value="S: 0-5 mg · O: 0-3 mg; cada elemento 0-100%"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Repetibilidad"
                            value="Desviación estándar < 0,1% con estándar de sulfadiazina de 10 mg"
                          />
                          <SpecCell
                            label="Límite de detección"
                            value="C/H/N/S < 30 ppm mediante TCD · O < 20 ppm mediante NDIR"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Detectores"
                            value="TCD de alta sensibilidad para C/H/N/S · NDIR selectivo para oxígeno"
                          />
                          <SpecCell
                            label="Gases de trabajo"
                            value="Helio portador 99,999% · Oxígeno de combustión 99,999%"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Alimentación"
                            value="220 VCA ±10%, 50 Hz"
                          />
                          <SpecCell
                            label="Sistema e interfaces"
                            value="Windows 7 o posterior · USB o RS232 · transmisión inalámbrica desde balanza"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Condiciones ambientales"
                            value="15-30 °C · Humedad relativa ≤ 85%"
                          />
                          <SpecCell
                            label="Dimensiones y peso"
                            value="735 × 560 × 1160 mm · 100 kg, incluido muestreador"
                          />
                        </div>
                      </>
                    )}
                    {isMilestoneEthos && (
                      <>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Tecnología principal"
                            value="Digestión por microondas en recipientes cerrados y plataforma multipropósito"
                          />
                          <SpecCell
                            label="Control térmico"
                            value="easyTEMP directo sin contacto y monitoreo infrarrojo de todos los recipientes"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Construcción y seguridad"
                            value="Cavidad de acero inoxidable, puerta sensible a la presión y escape de vapores ácidos"
                          />
                          <SpecCell
                            label="Supervisión de cavidad"
                            value="SafeVIEW en las configuraciones Up y Plus"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Rotor MAXI-24 HP"
                            value="24 posiciones para alto rendimiento y matrices o volúmenes diversos"
                          />
                          <SpecCell
                            label="Rotor SK-15"
                            value="15 recipientes PTFE-TFM de 100 mL para alta presión y temperatura"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Rotor MAXI-44"
                            value="44 recipientes PTFE-TFM de 100 mL para grandes lotes de muestras"
                          />
                          <SpecCell
                            label="Tecnología de recipientes"
                            value="PTFE de alta pureza, escudos PEEK y ventilación con resellado"
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Software"
                            value="easyCONTROL 3 con biblioteca de métodos, control en tiempo real y documentación de cada ejecución"
                          />
                          <SpecCell
                            label="Terminales"
                            value={'Easy 5" · Up 6,5" · Plus 10,1"'}
                          />
                        </div>
                        <div className="grid grid-cols-1 border-b border-[#D4DFDC] md:grid-cols-2">
                          <SpecCell
                            label="Integridad de datos"
                            value="Trazabilidad completa de datos en las tres configuraciones"
                          />
                          <SpecCell
                            label="Conectividad"
                            value="USB y Milestone Connect; conexión a balanza en Up y Plus"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Cualificación disponible"
                            value="Paquete de validación Milestone de calificación de equipo"
                          />
                          <SpecCell
                            label="Asistencia inteligente"
                            value="MAIA en terminal Plus y mediante Milestone Connect"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sh220f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Capacidad de muestras"
                            value="20 tubos en simultáneo"
                          />
                          <SpecCell
                            label="Capacidad de tubos"
                            value="300 mL cada uno"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de temperatura"
                            value="Temp. ambiente +5°C a 450°C"
                          />
                          <SpecCell label="Precisión de control" value="±1°C" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Tecnología de control"
                            value="PID con rampa programable"
                          />
                          <SpecCell
                            label="Programas integrados"
                            value="10 curvas de digestión"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Etapas por curva"
                            value="Hasta 5 etapas / rampas"
                          />
                          <SpecCell
                            label="Material del bloque"
                            value="Grafito tratado antioxidación"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50 Hz"
                          />
                          <SpecCell label="Potencia nominal" value="3600 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="25 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="515 × 421 × 211 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sh420f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Capacidad de muestras"
                            value="20 tubos en simultáneo"
                          />
                          <SpecCell
                            label="Capacidad de tubos"
                            value="300 mL cada uno"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de temperatura"
                            value="Temp. ambiente +5°C a 450°C"
                          />
                          <SpecCell label="Precisión de control" value="±1°C" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Método de calentamiento"
                            value="Infrarrojo y conducción por grafito"
                          />
                          <SpecCell
                            label="Aislamiento térmico"
                            value="Tecnología de ducto de aire única"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Programas de digestión"
                            value="20 curvas guardadas"
                          />
                          <SpecCell
                            label="Etapas por curva"
                            value="Hasta 5 etapas / rampas"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50/60 Hz"
                          />
                          <SpecCell label="Potencia nominal" value="3600 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="40 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="515 × 458 × 730 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-k1100f" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de medición"
                            value="0.1 mg – 240 mg N"
                          />
                          <SpecCell
                            label="Tiempo de análisis"
                            value="3 – 8 min por muestra"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="RSD · repetibilidad"
                            value="≤ 0.5%"
                          />
                          <SpecCell label="Recuperación" value="≥ 99.5%" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Precisión de bureta"
                            value="1.0 μL por paso"
                          />
                          <SpecCell
                            label="Capacidad de muestra"
                            value="Sólidos ≤ 5 g, Líquidos ≤ 20 mL"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell label="Consumo de agua" value="1.5 L/min" />
                          <SpecCell
                            label="Almacenamiento"
                            value="1800 registros"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50/60 Hz"
                          />
                          <SpecCell label="Potencia consumida" value="2000 W" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="38 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="455 × 391 × 730 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-sh520" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Rango de temperatura"
                            value="Temp. ambiente +5°C a 450°C"
                          />
                          <SpecCell
                            label="Precisión de temperatura"
                            value="±1°C"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Método de calentamiento"
                            value="Tubo de calefacción eléctrica"
                          />
                          <SpecCell
                            label="Capacidad de digestión"
                            value="20 posiciones (SH520) / 8 posiciones (SH508)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Tubos de digestión"
                            value="300 mL (SH520) / 300 mL o 380 mL (SH508)"
                          />
                          <SpecCell
                            label="Dispositivo de elevación"
                            value="Automático integrado (Yes)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Interfaces de datos"
                            value="WIFI / USB"
                          />
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="AC 220 VAC ±10%, 50/60 Hz"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Potencia nominal"
                            value="2950 W (SH520) / 1400 W (SH508)"
                          />
                          <SpecCell
                            label="Peso neto"
                            value="21 kg (SH520) / 15 kg (SH508)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell
                            label="Dimensiones SH520"
                            value="305 × 590 × 151 mm"
                          />
                          <SpecCell
                            label="Dimensiones SH508"
                            value="328 × 440 × 151 mm"
                          />
                        </div>
                      </>
                    )}
                    {slug === "hanon-s402" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Método de filtración"
                            value="Ternario (Condensación, álcalis, carbón activo)"
                          />
                          <SpecCell
                            label="Tipo de bomba de vacío"
                            value="Bomba anticorrosión integrada"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Presión de succión"
                            value="Ajustable en vacío negativo"
                          />
                          <SpecCell
                            label="Nivel de ruido"
                            value="Bajo nivel de ruido operacional"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Material de tuberías"
                            value="PTFE resistente a la corrosión"
                          />
                          <SpecCell
                            label="Área de absorción"
                            value="Translúcida para fácil inspección"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                          <SpecCell
                            label="Alimentación eléctrica"
                            value="220 VAC ±10%, 50/60 Hz"
                          />
                          <SpecCell
                            label="Compatibilidad"
                            value="Con digestores Kjeldahl (SH420F, SH220F, etc.)"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <SpecCell label="Peso neto" value="25 kg" />
                          <SpecCell
                            label="Dimensiones"
                            value="515 × 421 × 211 mm"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {detailBlocks?.length ? (
                    <div className="mt-8 space-y-5">
                      {detailBlocks.map((block) => (
                        <section
                          key={block.title}
                          className="border-t border-[#D4DFDC] pt-5"
                        >
                          <h4 className="mb-3 text-[14px] font-extrabold text-[#101820]">
                            {block.title}
                          </h4>
                          <ul className="space-y-2 text-[13px] leading-relaxed text-[#4A5560]">
                            {block.items.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span
                                  aria-hidden
                                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6532B]"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  ) : null}
                  {specificationNotes?.length ? (
                    <div className="mt-8 space-y-5">
                      {specificationNotes.map((note) => (
                        <section
                          key={note.title}
                          className="border-t border-[#D4DFDC] pt-5"
                        >
                          <h4 className="mb-3 text-[14px] font-extrabold text-[#101820]">
                            {note.title}
                          </h4>
                          <ul className="space-y-2 text-[13px] leading-relaxed text-[#4A5560]">
                            {note.items.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span
                                  aria-hidden
                                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6532B]"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  ) : null}
                  {descriptiveMedia.length > 0 && (
                    <div className="mt-12 space-y-12">
                      {descriptiveMedia.map((media, index) => (
                        <DescriptiveMediaBlock
                          key={media.src}
                          media={media}
                          index={index}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {slug === "hanon-e500" && (
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#4A5560]">
                      Principio y secuencia analítica
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <InfoPanel
                        title="Combustión y medición C/H/N/S"
                        text="La muestra se encapsula, pesa e introduce bajo purga de helio. A 1150 °C se transforma en CO₂, H₂O, N₂ y SO₂; los NOx se reducen a N₂, tres columnas separan los gases por adsorción-desorción y cada componente se cuantifica secuencialmente mediante TCD."
                      />
                      <InfoPanel
                        title="Pirólisis y medición de oxígeno"
                        text="La muestra se prepara en cápsula de plata y se piroliza a 1150 °C en atmósfera inerte. El oxígeno reacciona con negro de humo para formar CO, que se cuantifica mediante NDIR para calcular el contenido de oxígeno original."
                      />
                      <InfoPanel
                        title="Tratamiento automático de muestras"
                        text="La bandeja de 120 posiciones trabaja con crisoles cerámicos reutilizables. La introducción bajo gas portador aísla el aire ambiente y la sustitución de cenizas in situ permite analizar lotes continuos sin desmontar el tubo de combustión."
                      />
                      <InfoPanel
                        title="Cálculo, calibración y operación"
                        text="La estación de trabajo combina señal del detector, peso y curva de calibración para calcular cada elemento. Admite curvas lineales o no lineales, estado instrumental en tiempo real, transferencia inalámbrica desde balanza y activación programada."
                      />
                      <InfoPanel
                        title="Respaldo del desarrollo"
                        text="Hanon lanzó su primer analizador Dumas en 2015. El E500 deriva de su proyecto de innovación científica y tecnológica de Shandong y superó la evaluación oficial indicada por el fabricante."
                      />
                    </div>
                  </div>
                )}

                {isMilestoneEthos && (
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#4A5560]">
                      Configuraciones de control
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <InfoPanel
                        title="Terminal Plus"
                        text={
                          'Pantalla de 10,1", métodos incorporados, SafeVIEW, USB, conexión a balanza, trazabilidad completa de datos, Milestone Connect y asistencia MAIA.'
                        }
                      />
                      <InfoPanel
                        title="Terminal Up"
                        text={
                          'Pantalla de 6,5", métodos incorporados, SafeVIEW, USB, conexión a balanza, trazabilidad completa de datos y Milestone Connect.'
                        }
                      />
                      <InfoPanel
                        title="Terminal Easy"
                        text={
                          'Pantalla de 5", métodos incorporados, USB, trazabilidad completa de datos y Milestone Connect, sin cámara SafeVIEW ni conexión directa a balanza.'
                        }
                      />
                    </div>
                  </div>
                )}

                {isK1160 && (
                  <div>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-[0.16em] text-[#D6532B] mb-4">
                      Autosampler K1124 (Opcional)
                    </h3>
                    <div className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4DFDC]">
                        <SpecCell
                          label="Capacidad"
                          value="24 muestras por lote"
                        />
                        <SpecCell label="Estanques" value="4 × 15 L" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <SpecCell
                          label="Interfaz / Potencia"
                          value="CAN · 24 V DC · 40 W"
                        />
                        <SpecCell
                          label="Dimensiones / Peso"
                          value="920 × 625 × 908 mm · 80 kg"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Características destacadas */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#4A5560] mb-4">
                    Características Destacadas
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {slug === "infitek-mca-series" && (
                      <>
                        <BulletItem text="Lámpara halógena que permite un calentamiento sumamente uniforme y rápido de la muestra." />
                        <BulletItem text="Sensor HBM integrado para exactitud de pesaje y medición de secado altamente confiable." />
                        <BulletItem text="Ajustes totalmente personalizables de temperatura (40°C a 199°C) y tiempo de exposición." />
                        <BulletItem text="Lectura en tiempo real del porcentaje de humedad o porcentaje de residuo seco en la pantalla LCD." />
                        <BulletItem text="Almacena hasta 15 historiales de prueba para análisis retrospectivos o control de calidad continuo." />
                      </>
                    )}
                    {slug === "infitek-wb-series" && (
                      <>
                        <BulletItem text="Controlador de temperatura inteligente con programa PID y pantalla digital LED de dos filas." />
                        <BulletItem text="Cámara interior y cubierta superior de acero inoxidable; carcasa exterior de acero laminado en frío." />
                        <BulletItem text="Rango desde temperatura ambiente +5 °C hasta 100 °C con resolución de 0,1 °C." />
                        <BulletItem text="Interruptor de drenaje eléctrico de un botón, disponible en este modelo de dos orificios." />
                        <BulletItem text="Temporizador de hasta 9999 minutos, parada automática y apagado de seguridad ante falta de agua." />
                      </>
                    )}
                    {slug === "infitek-pr5-series" && (
                      <>
                        <BulletItem text="Capacidad de 1500 L para almacenar vacunas, medicamentos, reactivos y muestras." />
                        <BulletItem text="Sistema de aire forzado libre de escarcha con distribución optimizada." />
                        <BulletItem text="Control microprocesado de 2 a 8 °C, ajuste de 0,1 °C y variación dentro de ±3 °C." />
                        <BulletItem text="Alarmas de temperatura alta/baja, error de sensor, falla eléctrica y puerta abierta." />
                        <BulletItem text="Iluminación LED interior, cerradura de seguridad y 12 estantes ajustables." />
                      </>
                    )}
                    {slug === "infitek-titr-50vc" && (
                      <>
                        <BulletItem text="Combina la valoración Volumétrica y Coulométrica en un solo instrumento." />
                        <BulletItem text="Gestor de solventes con botella de residuos de diseño antifugas y antivuelco." />
                        <BulletItem text="Gestión de usuarios en tres niveles y almacenamiento de hasta 2000 resultados con trazabilidad completa." />
                        <BulletItem text="Ajuste automático o manual de deriva para mantener la exactitud de la determinación." />
                        <BulletItem text="Exportación mediante memoria USB en CSV o PDF y comunicación RS-232 para impresión." />
                      </>
                    )}
                    {slug === "infitek-ph-b100bd" && (
                      <>
                        <BulletItem text="Reconocimiento automático inteligente de soluciones tampón estándar de pH (NIST: 4.01, 7.00, 10.01)." />
                        <BulletItem text="Permite usar soluciones estándar personalizadas a través de su modo de calibración manual." />
                        <BulletItem text="Función de retención (auto-hold) que detecta y bloquea el punto final de la medición." />
                        <BulletItem text="Equipado de serie con electrodo compuesto de pH E-201 (y soporte articulado en el Paquete 2)." />
                        <BulletItem text="Estructura compacta certificada con grado de protección IP54, resistente al agua y al polvo en mesón." />
                      </>
                    )}
                    {slug === "infitek-cod-analyzer" && (
                      <>
                        <BulletItem text="El equipo analiza la DQO (demanda química de oxígeno), un índice que refleja el grado de contaminación del agua." />
                        <BulletItem text="Análisis de DQO mediante método fotométrico de referencia." />
                        <BulletItem text="2 fuentes de luz LED para diferentes rangos de pruebas." />
                        <BulletItem text="Calibración de 2 puntos." />
                      </>
                    )}
                    {slug === "infitek-bep-m300f" && (
                      <>
                        <BulletItem text="pH: Rango -2.00 a 20.00 pH. Calibración de 1 a 5 puntos con reconocimiento NIST, DIN y GB." />
                        <BulletItem text="Ion (ISE): Modos de lectura directa y adición estándar. Soporta F-, Cl-, NO3-, NH4+, Ca2+, etc." />
                        <BulletItem text="Conductividad: Compensación lineal y agua pura con calibración de 1 a 3 puntos." />
                        <BulletItem text="Oxígeno Disuelto (DO): Calibración con agua saturada de aire o cero oxígeno con compensación barométrica." />
                      </>
                    )}
                    {slug === "hanon-k1160" && (
                      <>
                        <BulletItem text="Titulación de velocidad variable en paralelo con destilación (reduce el tiempo total hasta un 30%)." />
                        <BulletItem text="Condensador metálico de alta eficiencia que reduce hasta un 50% el consumo de agua." />
                        <BulletItem text="Pantalla táctil HD de 10 pulgadas con sistema operativo Android." />
                        <BulletItem text="Monitoreo de temperatura de condensado en tiempo real para máxima seguridad." />
                        <BulletItem text="Posición de lavado separada que elimina cualquier riesgo de contaminación cruzada." />
                        <BulletItem text="Estanque interno de reactivos dimensionado para 500 análisis continuos." />
                        <BulletItem text="Entrada directa de peso experimental por conexión directa con balanzas analíticas." />
                      </>
                    )}
                    {slug === "hanon-k9860" && (
                      <>
                        <BulletItem text="Equipo automático que integra destilación y titulación colorimétrica en un solo sistema continuo." />
                        <BulletItem text="Detección en tiempo real de la temperatura del condensado con detención automática preventiva." />
                        <BulletItem text="Copa de titulación externa para una supervisión visual clara y directa del ensayo." />
                        <BulletItem text="Bomba de carga y dosificación de alta exactitud para máxima precisión analítica." />
                        <BulletItem text="Rutinas automáticas de limpieza para tubos de digestión, copa de titulación y líneas de reactivos." />
                        <BulletItem text="Evacuación segura de residuos químicos calientes para proteger al operador." />
                        <BulletItem text="Menú digital intuitivo y pantalla integrada de control experimental en tiempo real." />
                      </>
                    )}
                    {slug === "hanon-k9840" && (
                      <>
                        <BulletItem text="Dosificación automática y exacta de solución alcalina y agua de dilución." />
                        <BulletItem text="Pantalla a color de 4.3 pulgadas para configurar y monitorear el ensayo en tiempo real." />
                        <BulletItem text="Flexibilidad total de control gracias a la selección libre entre modo manual y automático." />
                        <BulletItem text="Programación flexible del tiempo de destilación con alarma audible al finalizar el ciclo." />
                        <BulletItem text="Limpieza automatizada del destilador y tuberías que previene la contaminación cruzada." />
                        <BulletItem text="Diseño inteligente de seguridad con sensores en tiempo real de puerta, tubo de digestión y flujo de agua." />
                        <BulletItem text="Operación de parada de emergencia para respuesta inmediata ante incidencias críticas." />
                      </>
                    )}
                    {slug === "hanon-sox606" && (
                      <>
                        <BulletItem text="Cinco métodos de extracción de un solo toque para máxima compatibilidad analítica." />
                        <BulletItem text="Calentamiento uniforme por bloque metálico que disminuye gradientes térmicos." />
                        <BulletItem text="Excelente tasa de recuperación de solventes ≥85% que reduce el costo operacional." />
                        <BulletItem text="Capacidad de proceso de 6 muestras en paralelo para un rendimiento optimizado." />
                        <BulletItem text="Diseño robusto con juntas de PTFE y cristalería de borosilicato resistente." />
                        <BulletItem text="Detección integrada de fugas de éter para resguardar la seguridad del analista." />
                      </>
                    )}
                    {slug === "hanon-sox406" && (
                      <>
                        <BulletItem text="Calentamiento metálico integral de alta uniformidad y control preciso de la temperatura." />
                        <BulletItem text="Circuito eléctrico aislado del espacio de extracción de vapores, maximizando la seguridad operativa." />
                        <BulletItem text="Temporizador de rampa inteligente aislado y alarmas por sobretemperatura sonora y luminosa." />
                        <BulletItem text="Pantalla LCD de 4.3 pulgadas y panel de control por microcomputador intuitivo." />
                        <BulletItem text="Sistema de conducción por cojinetes lineales para una elevación de muestras suave y cómoda." />
                        <BulletItem text="Tecnología exclusiva de aislamiento de aire que mantiene la carcasa exterior a temperatura ambiente." />
                      </>
                    )}
                    {slug === "hanon-f800" && (
                      <>
                        <BulletItem text="Estructura oculta del barril de solución para facilitar una dosificación sumamente segura." />
                        <BulletItem text="Diseño especial donde los líquidos corrosivos no tienen contacto directo con la bomba." />
                        <BulletItem text="Función de retroceso (recoil) que previene el apelmazamiento y las obstrucciones en el crisol." />
                        <BulletItem text="Protección inteligente contra desbordamiento de reactivos para resguardar al analista." />
                        <BulletItem text="Tecnología integrada de calentamiento por infrarrojos para ebullición uniforme y rápida." />
                        <BulletItem text="Ajuste térmico del crisol en tiempo real y función de precalentamiento que reduce la duración total." />
                      </>
                    )}
                    {slug === "hanon-e500" && (
                      <>
                        <BulletItem text="Determinación cuantitativa de C, H, N, S y O en muestras sólidas y líquidas dentro de una sola plataforma." />
                        <BulletItem text="Sustitución de cenizas in situ a alta temperatura que evita limpiezas manuales frecuentes y contaminación entre muestras." />
                        <BulletItem text="Muestreador automático de 120 posiciones con crisoles cerámicos reutilizables para lotes continuos." />
                        <BulletItem text="Tres columnas de adsorción física para H₂O, SO₂ y CO₂ con desorción programada y sin efecto de cola cromatográfico." />
                        <BulletItem text="TCD de alto flujo con filamento de potencia constante, calibración digital y controladores electrónicos MFC." />
                        <BulletItem text="Modo de oxígeno por pirólisis con detector NDIR selectivo para CO a 4,67 μm y 4,72 μm." />
                        <BulletItem text="Curvas de calibración lineales o no lineales, orden configurable y estado instrumental en tiempo real." />
                        <BulletItem text="Espera y activación programables, ahorro de gas portador y enfriamiento por aire retardado para proteger el horno." />
                      </>
                    )}
                    {slug === "hanon-sh220f" && (
                      <>
                        <BulletItem text="Bloque de grafito de alta pureza con tratamiento antioxidante." />
                        <BulletItem text="Controlador PID con rampa y almacenamiento de 10 programas." />
                        <BulletItem text="Aislamiento térmico exclusivo para chasis frío al tacto." />
                        <BulletItem text="Tecnología avanzada que alcanza 400°C en solo 20 minutos con precisión de ±1°C." />
                        <BulletItem text="Campana de recolección de gases WD03 compatible para captar vapores ácidos nocivos." />
                        <BulletItem text="Amplia capacidad de pre-tratamiento con soporte para 20 tubos de 300 mL." />
                      </>
                    )}
                    {slug === "hanon-sh420f" && (
                      <>
                        <BulletItem text="Calentamiento infrarrojo rápido que alcanza 400°C en tan solo 25 minutos." />
                        <BulletItem text="Bloque de grafito de alta densidad con tratamiento antioxidación de larga vida útil." />
                        <BulletItem text="Hasta 20 programas de digestión con curvas, rampas y gradientes de temperatura." />
                        <BulletItem text="Pantalla LCD a color de 5.7 pulgadas para monitoreo digital en tiempo real." />
                        <BulletItem text="Chasis con diseño anticorrosivo sellado para trabajo intensivo con ácidos." />
                        <BulletItem text="Compatible con el sistema de neutralización triple S402 y campana WD03." />
                        <BulletItem text="Múltiples protecciones: sobrecorriente, sobrecalentamiento y alertas integradas." />
                      </>
                    )}
                    {slug === "hanon-k1100f" && (
                      <>
                        <BulletItem text="Destilación, titulación, cálculo y auto-limpieza en un solo ciclo automático." />
                        <BulletItem text="Pantalla LCD táctil de 5.6 pulgadas para monitoreo del ensayo en tiempo real." />
                        <BulletItem text="Titulación simultánea colorimétrica en tiempo real mientras destila." />
                        <BulletItem text="Sistema de vapor controlado con flujo ajustable según requerimiento de muestra." />
                        <BulletItem text="Doble destilación programable que optimiza la reacción de neutralización." />
                        <BulletItem text="Alertas inteligentes ante ausencia de reactivos químicos o anomalía térmica." />
                        <BulletItem text="Drenaje automático rápido de los tubos para evitar manipulación caliente." />
                      </>
                    )}
                    {slug === "hanon-sh520" && (
                      <>
                        <BulletItem text="Operación completamente automática con sistema operativo Android integrado." />
                        <BulletItem text="Soporte de elevación automática para enfriamiento rápido del rack de tubos." />
                        <BulletItem text="Control paralelo del digestor, el elevador y el depurador S403." />
                        <BulletItem text="Módulo de calentamiento de aluminio con orificios profundos de gran eficiencia." />
                        <BulletItem text="Almacenamiento de 8 GB integrado para registrar información experimental ilimitada." />
                        <BulletItem text="Preinstalación de más de 20 métodos oficiales y 500 personalizados." />
                        <BulletItem text="Carcasa resistente con revestimiento anticorrosión de teflón de alto grado." />
                      </>
                    )}
                    {slug === "hanon-s402" && (
                      <>
                        <BulletItem text="Sistema de filtración de gases ternario: condensación, neutralización y carbón activo." />
                        <BulletItem text="Bomba de vacío anticorrosión de gran durabilidad y funcionamiento silencioso." />
                        <BulletItem text="Área de absorción translúcida para control visual del estado de filtros." />
                        <BulletItem text="Presión de succión ajustable ante vacío negativo para evitar fugas ácidas." />
                        <BulletItem text="Estructura compacta de diseño modular para optimizar espacio de mesada." />
                        <BulletItem text="Conexión de tuberías de PTFE de alta inercia frente a ataques corrosivos." />
                        <BulletItem text="Protección ambiental activa y resguardo total de la salud del operador." />
                      </>
                    )}
                    {slug === "infitek-usc-m-series" && (
                      <>
                        <BulletItem text="Amplia pantalla LCD que muestra con precisión el tiempo, la temperatura y el nivel de potencia." />
                        <BulletItem text="Función de memoria que guarda automáticamente los parámetros de la última configuración." />
                        <BulletItem text="Equipado con pasta de aislamiento acústico integrada que mantiene un nivel de ruido ultrabajo." />
                        <BulletItem text="Funciones avanzadas de desgasificación (degas) y barrido de frecuencia ultrasónica (sweep)." />
                        <BulletItem text="Modo de suspensión (sleeping mode) inteligente para maximizar el ahorro de energía eléctrica." />
                      </>
                    )}
                    {slug === "infitek-don-h-series" && (
                      <>
                        <BulletItem text="Diseño de convección natural de aire horizontal que garantiza una excelente uniformidad térmica." />
                        <BulletItem text="Alta optimización del espacio interno de la cámara de secado." />
                        <BulletItem text="Manilla de apertura antiquemaduras para la protección del operador durante el uso continuo." />
                        <BulletItem text="Equipado con controlador microprocesador PID para máxima precisión y rapidez térmica." />
                        <BulletItem text="Alarma sonora y visual de sobretemperatura incorporada como dispositivo de seguridad estándar." />
                      </>
                    )}
                    {slug === "infitek-lyo60b-series" && (
                      <>
                        <BulletItem text="Panel táctil a color de 7 pulgadas con interfaz intuitiva y ergonómica." />
                        <BulletItem text="Diseño compacto de mesa que ahorra espacio en laboratorios con huella reducida." />
                        <BulletItem text="Condensador de gran volumen en acero inoxidable sin bobinas integradas." />
                        <BulletItem text="Cámara de secado transparente que permite visualizar el proceso en tiempo real." />
                        <BulletItem text="Puerto USB para extracción directa de datos y gestión de análisis." />
                      </>
                    )}
                    {slug === "infitek-fmh-series" && (
                      <>
                        <BulletItem text="Puerto avanzado detector de compuestos orgánicos volátiles (VOC) con sistema de alarma dedicada." />
                        <BulletItem text="Sistema de control táctil LED exclusivo para gestionar ventilación e iluminación centralmente." />
                        <BulletItem text="Ventilador de turbina silencioso sin chispas ni estática para un flujo constante." />
                        <BulletItem text="Cristal acrílico anticorrosivo de más de 5mm con diseño de ventana abatible inverso." />
                        <BulletItem text="Mesa de trabajo sólida en resina epoxi con resistencia térmica y a impactos químicos." />
                      </>
                    )}
                    {slug === "infitek-fmh-pa-series" && (
                      <>
                        <BulletItem text="Construcción superior e inferior totalmente en material PP Grado A de 8 mm soldado homogéneamente." />
                        <BulletItem text="Sistema interno de escape aerodinámico en tres etapas sin puntos ciegos de flujo de aire." />
                        <BulletItem text="Campana de colección superior de tipo flujo axial con canal de recogida para condensados." />
                        <BulletItem text="Ventana de vidrio templado de elevación asimétrica por poleas silenciosas balanceadas." />
                        <BulletItem text="Panel de control táctil inteligente reubicado al exterior para aislar circuitos del flujo químico." />
                      </>
                    )}
                    {isMilestoneEthos && (
                      <>
                        <BulletItem text="Plataforma multipropósito para digestión, extracción, evaporación, concentración y procesos de alta temperatura." />
                        <BulletItem text="easyTEMP mide directamente la muestra sin contacto y supervisa por infrarrojo todos los recipientes." />
                        <BulletItem text="SafeVIEW y el bloqueo térmico permiten observar la cavidad y evitan una apertura prematura." />
                        <BulletItem text="Recipientes de PTFE de alta pureza con escudos PEEK y tecnología de ventilación con resellado." />
                        <BulletItem text="Rotores de 15, 24 o 44 posiciones para adaptar presión, volumen y rendimiento al método." />
                        <BulletItem text="easyCONTROL 3 conserva parámetros y documentación de cada ejecución para asegurar trazabilidad." />
                        <BulletItem text="Milestone Connect reúne monitoreo remoto, documentos, tutoriales y soporte de aplicaciones." />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Cumplimiento */}
            {activeHanonTab === "cumplimiento" && (
              <div
                role="tabpanel"
                id="panel-cumplimiento"
                aria-labelledby="tab-cumplimiento"
                className="space-y-6 max-w-3xl"
              >
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Garantía Normativa
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    {complianceNotes?.length || isHyperpurex || isHanonFiberAnalyzer || isSkalar
                      ? "Información de cumplimiento disponible"
                      : "Trazabilidad e Integridad de Datos"}
                  </h3>
                </div>
                <div className="grid gap-6">
                  {complianceNotes?.length ? (
                    complianceNotes.map((note) => (
                      <InfoPanel
                        key={note.title}
                        title={note.title}
                        text={note.text}
                      />
                    ))
                  ) : isHanonF2000 ? (
                    <>
                      <InfoPanel
                        title="Normas y certificaciones no identificadas"
                        text="Los archivos proporcionados para el F2000 no incluyen normas, certificados ni declaraciones regulatorias específicas."
                      />
                      <InfoPanel
                        title="Seguridad de proceso documentada"
                        text="La ficha describe alarma por falta de líquido, detección dual de temperatura y presión, válvula mecánica de seguridad, cierre electromagnético de puerta y gestión de permisos. Estas funciones no constituyen una certificación."
                      />
                    </>
                  ) : isHanonDf06 ? (
                    <>
                      <InfoPanel
                        title="Trazabilidad de operaciones"
                        text="La documentación del DF06 indica inicio de sesión de tres niveles con nombre de usuario y contraseña, con trazabilidad completa de las operaciones."
                      />
                    </>
                  ) : slug === "decent-hornos-secado" ? (
                    <>
                      <InfoPanel
                        title="Materiales y construcción documentados"
                        text="Las fichas describen cámaras interiores de acero inoxidable SUS304 en varias familias, gabinetes exteriores de acero laminado en frío con pintura electrostática y aislamiento de lana de roca certificado en los modelos eléctricos."
                      />
                      <InfoPanel
                        title="Control térmico y seguridad"
                        text="La documentación indica control digital PID, sensor Pt100, alarma o protección contra sobretemperatura y funciones de temporización. La configuración exacta depende de la familia y del modelo elegido."
                      />
                      <InfoPanel
                        title="Datos que deben confirmarse por modelo"
                        text="Antes de cotizar deben validarse tensión, potencia, dimensiones, capacidad, tipo de circulación, número de bandejas y configuración de puertas, porque cambian entre DDO, DDOG, DDOH(L), DDO101 y DDO202."
                      />
                    </>
                  ) : isHyperpurexXFlagship ? (
                    <>
                      <InfoPanel
                        title="Referencias normativas documentadas"
                        text="La ficha de la Serie X documenta la calidad de agua producida según especificaciones de referencia reconocidas internacionalmente, incluidas las farmacopeas vigentes. No se adjuntan certificados individuales para publicar."
                      />
                      <InfoPanel
                        title="Gestión de calidad del fabricante"
                        text="El fabricante declara diseñar, desarrollar y fabricar bajo sistemas de gestión de calidad certificados internacionalmente. La documentación disponible no contiene los certificados correspondientes."
                      />
                      <InfoPanel
                        title="Trazabilidad documentada"
                        text="La ficha describe registros de operación, dispensación, alarmas y cambios de consumibles de hasta cinco años, con exportación USB y plataforma cloud."
                      />
                    </>
                  ) : isHyperpurexPPursuit || isHyperpurexFxFlagship ? (
                    <>
                      <InfoPanel
                        title="Referencias normativas documentadas"
                        text="Las fichas de las Series P y FX documentan la calidad de agua producida según especificaciones de referencia reconocidas internacionalmente, incluidas las farmacopeas vigentes. La documentación disponible no incorpora certificados individuales para publicar."
                      />
                      <InfoPanel
                        title="Gestión de calidad del fabricante"
                        text="El fabricante declara diseñar y fabricar bajo sistemas de gestión de calidad certificados internacionalmente. Esta mención procede de la ficha; no se adjuntan certificados para su descarga."
                      />
                      <InfoPanel
                        title="Trazabilidad documentada"
                        text="La documentación describe gestión de usuarios, registros de operación, dispensación, alarmas y consumibles, con exportación por USB. La disponibilidad concreta depende de la configuración seleccionada."
                      />
                    </>
                  ) : isHyperpurexFeEminent ? (
                    <>
                      <InfoPanel
                        title="Referencias normativas documentadas"
                        text="La ficha de la Serie FE documenta la calidad de agua producida según especificaciones de referencia reconocidas internacionalmente, incluidas las farmacopeas vigentes. La documentación disponible no incorpora certificados individuales para publicar."
                      />
                      <InfoPanel
                        title="Gestión de calidad declarada por el fabricante"
                        text="La ficha declara diseño, desarrollo y fabricación bajo sistemas de gestión de calidad certificados internacionalmente. No se adjuntan certificados para descarga."
                      />
                      <InfoPanel
                        title="Trazabilidad documentada"
                        text="La ficha describe registros de operación, dispensación, alarmas y consumibles, con exportación USB y opciones de conectividad según la configuración."
                      />
                    </>
                  ) : isHyperpurexFsSmart ? (
                    <>
                      <InfoPanel
                        title="Normas y certificaciones no identificadas"
                        text="Los archivos proporcionados para la Serie FS Smart no incluyen normas, certificados ni declaraciones regulatorias específicas."
                      />
                      <InfoPanel
                        title="Parámetros documentados"
                        text="La documentación describe calidad de agua, condiciones de entrada, etapas de purificación y configuraciones de UV, UF y filtro terminal; esta información no constituye una certificación."
                      />
                    </>
                  ) : isHyperpurexLuDiscovery ? (
                    <>
                      <InfoPanel
                        title="Estándares de calidad de agua citados"
                        text="La ficha de la Serie L Discovery documenta la calidad de agua del sistema según especificaciones de referencia reconocidas internacionalmente, incluidas las farmacopeas vigentes. La documentación no aporta certificados individuales para publicar."
                      />
                      <InfoPanel
                        title="Trazabilidad documentada"
                        text="El fabricante documenta registros de operación, calidad de agua y consumibles, con exportación por USB o servicios en nube; el período de registro descrito es de hasta cinco años."
                      />
                    </>
                  ) : isHyperpurexEue ? (
                    <>
                      <InfoPanel
                        title="Trazabilidad y protección documentadas"
                        text="El material describe registros de calidad de agua, volumen dispensado, calibraciones y alarmas, con descarga por USB o conexión RS232."
                      />
                      <InfoPanel
                        title="Certificaciones no identificadas"
                        text="Los archivos disponibles no identifican certificaciones, normas ni declaraciones regulatorias específicas para la Serie EUE."
                      />
                    </>
                  ) : isHyperpurex ? (
                    <>
                      <InfoPanel
                        title="Documentación de cumplimiento"
                        text="El material proporcionado para la Serie SU Smart no identifica normas, certificaciones ni declaraciones regulatorias específicas."
                      />
                      <InfoPanel
                        title="Parámetros documentados"
                        text="La ficha detalla calidad de agua, condiciones de entrada, etapas de tratamiento y configuraciones UV, UF y UVF; estos datos no sustituyen una certificación."
                      />
                    </>
                  ) : slug.startsWith("decent-") ? (
                    <>
                      <InfoPanel
                        title="Documentación de cumplimiento"
                        text="Los archivos disponibles para este equipo no incluyen certificaciones, normas de cumplimiento ni declaraciones regulatorias específicas."
                      />
                      <InfoPanel
                        title="Configuración a confirmar"
                        text="Las condiciones eléctricas, de seguridad y de operación deben validarse con el fabricante antes de emitir una cotización o planificar la instalación."
                      />
                    </>
                  ) : isMilestoneEthos ? (
                    <>
                      <InfoPanel
                        title="Paquete de validación Milestone"
                        text="La documentación de cualificación disponible contempla el proceso completo de calificación del equipo: diseño, instalación y operación."
                      />
                      <InfoPanel
                        title="Seguridad de proceso"
                        text="SafeVIEW, la puerta sensible a la presión y el bloqueo automático hasta una temperatura segura reducen la exposición del operador durante cada ejecución."
                      />
                    </>
                  ) : slug === "hanon-e500" ? (
                    <>
                      <InfoPanel
                        title="Administración de usuarios"
                        text="Permite crear usuarios sin límite y asignar tres niveles de permisos para separar operación, configuración y administración del sistema."
                      />
                      <InfoPanel
                        title="Integridad del proceso analítico"
                        text="El software vincula peso de muestra, calibración, señales de detección y estado del instrumento. La repetibilidad declarada es < 0,1% con estándar de sulfadiazina de 10 mg."
                      />
                    </>
                  ) : slug === "infitek-usc-m-series" ? (
                    <>
                      <InfoPanel
                        title="Ahorro Energético y Seguridad"
                        text="Cuenta con modo de suspensión automático que reduce el consumo de energía y prolonga la vida útil del equipo cuando no está en operación activa."
                      />
                      <InfoPanel
                        title="Control de Calidad en Limpieza"
                        text="Su barrido de frecuencia asegura una cavitación uniforme que evita puntos ciegos, cumpliendo con exigentes normativas de limpieza de instrumental."
                      />
                      <InfoPanel
                        title="Durabilidad Certificada"
                        text="El uso de acero inoxidable de primera calidad tanto en el cuerpo como en el tanque asegura gran resistencia a agentes corrosivos de limpieza."
                      />
                    </>
                  ) : slug === "infitek-don-h-series" ? (
                    <>
                      <InfoPanel
                        title="Seguridad Operacional Continua"
                        text="Incluye una manilla con diseño antiquemaduras y una alarma tanto visual como sonora en caso de exceso de temperatura para proteger la muestra y al usuario."
                      />
                      <InfoPanel
                        title="Control Térmico PID"
                        text="Sistema avanzado de ajuste PID que asegura que las fluctuaciones de temperatura no superen ±1°C, resguardando la integridad de las muestras térmicas."
                      />
                      <InfoPanel
                        title="Diseño Sostenible"
                        text="Exterior de pulverización electrostática de acero laminado en frío, garantizando que el equipo mantenga su resistencia química e integridad estructural por años."
                      />
                    </>
                  ) : slug === "infitek-mca-series" ? (
                    <>
                      <InfoPanel
                        title="Control de Calidad Analítico"
                        text="Ofrece 15 memorias históricas integradas para registrar el secado, favoreciendo auditorías y revisiones en los procesos de calidad."
                      />
                      <InfoPanel
                        title="Sensor Homologado HBM"
                        text="Incorpora sensores de pesaje HBM que garantizan precisión gravimétrica absoluta durante todo el proceso de desecación."
                      />
                      <InfoPanel
                        title="Interfase RS232/USB"
                        text="Exportación directa de los resultados hacia impresoras térmicas o PC, lo que permite trazar la información conforme a protocolos de análisis de laboratorio."
                      />
                    </>
                  ) : slug === "infitek-wb-series" ? (
                    <>
                      <InfoPanel
                        title="Control y temporización"
                        text="El control PID, la temporización de 0 a 9999 minutos y la parada automática permiten documentar condiciones de operación repetibles."
                      />
                      <InfoPanel
                        title="Protección térmica"
                        text="La documentación suministrada especifica alarma de sobretemperatura y apagado del producto cuando existe escasez de agua."
                      />
                      <InfoPanel
                        title="Continuidad de configuración"
                        text="Incluye corrección de desviación, bloqueo de la tecla de menú, respaldo ante fallo de alimentación y memoria de apagado."
                      />
                    </>
                  ) : slug === "infitek-pr5-series" ? (
                    <>
                      <InfoPanel
                        title="Alarmas audibles y visibles"
                        text="Notifica temperatura alta o baja, error de sensor, puerta abierta y fallo de alimentación mediante zumbador y señal luminosa."
                      />
                      <InfoPanel
                        title="Respaldo de alarma"
                        text="El sistema de alarma mantiene su aviso hasta 8 horas cuando ocurre una interrupción del suministro eléctrico."
                      />
                      <InfoPanel
                        title="Control de acceso"
                        text="La cerradura de seguridad integrada ayuda a restringir el acceso no autorizado al contenido almacenado."
                      />
                    </>
                  ) : slug === "infitek-titr-50vc" ? (
                    <>
                      <InfoPanel
                        title="Gestión de datos de valoración"
                        text="Almacena hasta 2000 resultados de valoración volumétrica y coulométrica y permite exportarlos mediante USB o imprimirlos por RS-232."
                      />
                      <InfoPanel
                        title="Gestión de usuarios condicionada"
                        text="Admite usuarios en tres niveles, contraseñas y registros de auditoría; el fabricante indica que estas funciones requieren el software adicional correspondiente."
                      />
                      <InfoPanel
                        title="Gestión segura de solventes"
                        text="El gestor incorpora botella de residuos con diseño antifugas y antivuelco para reducir el contacto durante llenado, drenaje y limpieza."
                      />
                    </>
                  ) : slug === "infitek-ph-b100bd" ? (
                    <>
                      <InfoPanel
                        title="Certificación IP54"
                        text="Cumple con la norma de grado de protección IP54, certificando su seguridad contra entrada de polvo y salpicaduras de líquidos en el laboratorio."
                      />
                      <InfoPanel
                        title="Reconocimiento Automático NIST"
                        text="Garantiza precisión y trazabilidad del análisis a través del reconocimiento automatizado de soluciones patrón avaladas internacionalmente (NIST)."
                      />
                      <InfoPanel
                        title="Control de Resultados"
                        text="Pantalla de lectura continua con retención automática (auto-hold) para documentar objetivamente y sin errores el valor de pH una vez estabilizado."
                      />
                    </>
                  ) : slug === "infitek-cod-analyzer" ? (
                    <>
                      <InfoPanel
                        title="Gestión de datos"
                        text="Gestión de datos con trazabilidad completa."
                      />
                    </>
                  ) : slug === "infitek-bep-m300f" ? (
                    <>
                      <InfoPanel
                        title="IP54"
                        text="Clasificación de protección de ingreso IP54 (protección contra polvo y salpicaduras de agua)."
                      />
                      <InfoPanel
                        title="Tampón Estándar"
                        text="Reconocimiento de soluciones tampón estándar bajo las normativas NIST, DIN y GB."
                      />
                      <InfoPanel
                        title="Registro de datos"
                        text="Funciones de registro e informes con trazabilidad completa."
                      />
                    </>
                  ) : slug === "infitek-lyo60b-series" ? (
                    <>
                      <InfoPanel
                        title="Alta Confiabilidad Térmica"
                        text="Compresor de altísimo rendimiento con sistema en cascada que otorga eficiencia de enfriamiento superior y velocidad rápida."
                      />
                      <InfoPanel
                        title="Acero Inoxidable Médico"
                        text="Tanto el condensador como el panel de operación están fabricados íntegramente en acero inoxidable resistente a la corrosión biológica."
                      />
                      <InfoPanel
                        title="Seguridad Visual"
                        text="Cámara de secado acrílica de transparencia total que facilita el control visual sin apertura ni comprometer el vacío."
                      />
                    </>
                  ) : slug === "infitek-fmh-series" ? (
                    <>
                      <InfoPanel
                        title="Filtración Extrema 99.99%"
                        text="Uso de filtros HEPA de altísima eficiencia que absorben vapores químicos peligrosos y los transforman en aire purificado."
                      />
                      <InfoPanel
                        title="Sensores de Seguridad"
                        text="Sistema integral de protección mediante alarmas de temperatura, humedad y concentración excesiva de químicos VOC."
                      />
                      <InfoPanel
                        title="Recubrimiento Ecológico"
                        text="Placas de acero recubiertas electrostáticamente con resina epóxica y capa duradera libre de plomo."
                      />
                    </>
                  ) : slug === "infitek-fmh-pa-series" ? (
                    <>
                      <InfoPanel
                        title="Construcción Integral PP"
                        text="Estructuras principales inmunes a la corrosión de ácidos y álcalis, preparadas para ambientes clean-room sin esquinas metálicas."
                      />
                      <InfoPanel
                        title="Poleas y Bisagras Anticorrosivas"
                        text="Componentes de rotación fabricados en polipropileno inyectado en lugar de metales oxidables."
                      />
                      <InfoPanel
                        title="Protección Eléctrica"
                        text="Incluye luces protegidas con cobertores libres de contacto con el gas experimental y enchufes protegidos contra derrames."
                      />
                    </>
                  ) : (
                    <>
                      <InfoPanel
                        title="Sensor de Alta Precisión y Repetibilidad"
                        text="Detección y calibración en tiempo real alineada con estándares internacionales de referencia."
                      />
                      <InfoPanel
                        title="Generación y Salida de Reportes"
                        text="Formatos de reporte personalizables y exportables. Conexión directa a sistemas de impresión o LIMS externos para el registro de los procesos."
                      />
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 3. Aplicaciones */}
            {activeHanonTab === "aplicaciones" && (
              <div
                role="tabpanel"
                id="panel-aplicaciones"
                aria-labelledby="tab-aplicaciones"
                className="space-y-6 max-w-3xl"
              >
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Campos de Uso Analítico
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    {isHyperpurex || isHanonFiberAnalyzer || isSkalar
                      ? "Aplicaciones documentadas"
                      : "Flexibilidad Multimatriz de Alta Demanda"}
                  </h3>
                </div>

                {/* Chips de sectores */}
                <div className="flex flex-wrap gap-2">
                  {(applicationNotes?.map((note) => note.label) ??
                    (isHanonF2000
                    ? [
                        "Fibra cruda",
                        "Fibra detergente",
                        "Celulosa",
                        "Hemicelulosa",
                        "Lignina detergente ácida",
                        "Alimentos y piensos",
                      ]
                    : isHanonDf06
                      ? [
                          "Fibra dietética total",
                          "Fibra dietética soluble",
                          "Fibra dietética insoluble",
                          "Alimentos",
                        ]
                    : slug === "decent-hornos-secado"
                    ? [
                        "Preparación de muestras",
                        "Minería",
                        "Control de calidad",
                        "Tratamiento térmico",
                      ]
                    : slug.startsWith("decent-")
                      ? [
                          "Minería",
                          "Preparación de muestras",
                          "Control de calidad",
                          "Investigación",
                        ]
                      : isHyperpurexXFlagship
                        ? [
                            "HPLC, UPLC y LC-MS",
                            "ICP-MS, ICP-AES y AAS",
                            "GC-MS y análisis de TOC",
                            "PCR y secuenciación",
                            "Cultivo celular e IVF",
                            "Alimentación de equipos de laboratorio",
                          ]
                      : isHyperpurexPPursuit || isHyperpurexFxFlagship
                        ? [
                            "HPLC, UPLC y LC-MS",
                            "ICP-MS, ICP-AES y AAS",
                            "GC-MS, IC y análisis de TOC",
                            "PCR y secuenciación",
                            "Cultivo celular e IVF",
                            "Preparación de reactivos",
                          ]
                        : isHyperpurexFeEminent
                          ? [
                              "HPLC, UPLC y LC-MS",
                              "ICP-MS, ICP-AES y AAS",
                              "GC-MS, IC y análisis de TOC",
                              "PCR y cultivo celular",
                              "Preparación de reactivos",
                              "Alimentación de equipos de laboratorio",
                            ]
                          : isHyperpurexFsSmart
                            ? [
                                "UV-Vis y AAS",
                                "HPLC",
                                "Preparación de reactivos",
                                "PCR y electroforesis",
                                "Medios microbiológicos",
                              ]
                        : isHyperpurexLuDiscovery
                          ? [
                              "Preparación de reactivos",
                              "HPLC y UHPLC",
                              "LC-MS y GC-MS",
                              "ICP-MS",
                              "Biología molecular",
                              "Cultivo celular",
                            ]
                          : isHyperpurexEue
                            ? [
                                "Preparación de reactivos",
                                "HPLC y UHPLC",
                                "LC-MS y GC-MS",
                                "Biología molecular",
                                "Cultivo celular",
                                "Laboratorio",
                              ]
                            : isHyperpurex
                              ? [
                                  "Agua ultrapura",
                                  "HPLC y UHPLC",
                                  "Espectrometría de masas",
                                  "Biología molecular",
                                  "Cultivo celular",
                                  "Laboratorio",
                                ]
                              : isMilestoneEthos
                                ? [
                                    "Ambiental",
                                    "Alimentos y piensos",
                                    "Farmacéutica",
                                    "Geología y materiales",
                                    "Química sintética",
                                    "Academia / I+D",
                                  ]
                                : slug === "hanon-e500"
                                  ? [
                                      "Química",
                                      "Farmacéutica",
                                      "Monitoreo ambiental",
                                      "Agricultura",
                                      "Geología",
                                      "Minería",
                                      "Petroquímica",
                                      "Academia / I+D",
                                    ]
                                  : slug.startsWith("infitek-")
                                    ? [
                                        "Salud Pública",
                                        "Medio Ambiente",
                                        "Calidad de Agua",
                                        "Control de Enfermedades",
                                        "Investigación Científica",
                                        "Educación Superior",
                                      ]
                                    : [
                                        "Alimentos y bebidas",
                                        "Alimentación animal",
                                        "Suelos y agro",
                                        "Ambiental",
                                        "Farmacéutica",
                                        "Academia / I+D",
                                      ]
                    )).map((sector) => (
                    <span
                      key={sector}
                      className="px-4 py-2 border border-[#D4DFDC] bg-[#F4F4F4] text-[#4A5560] font-mono text-[11px] font-bold uppercase tracking-wider rounded-full"
                    >
                      {sector}
                    </span>
                  ))}
                </div>

                {/* Párrafos explicativos */}
                <div className="space-y-4 text-[13px] leading-relaxed text-[#4A5560] pt-2">
                  {applicationNotes?.length ? (
                    applicationNotes.map((note) => (
                      <p key={note.label}>
                        <strong>{note.label}:</strong> {note.text}
                      </p>
                    ))
                  ) : isHanonF2000 ? (
                    <>
                      <p>
                        <strong>Análisis de fibra:</strong> el F2000 está
                        documentado para la determinación de fibra cruda,
                        fibra detergente, celulosa, hemicelulosa y lignina
                        detergente ácida.
                      </p>
                      <p>
                        <strong>Muestras documentadas:</strong> alimentos,
                        piensos y otras muestras vegetales, con un tamaño de
                        muestra de 0,5 a 1,0 g.
                      </p>
                    </>
                  ) : isHanonDf06 ? (
                    <>
                      <p>
                        <strong>Fibra dietética en alimentos:</strong> el DF06
                        se utiliza para la determinación de fibra dietética
                        total, soluble e insoluble en alimentos.
                      </p>
                      <p>
                        <strong>Métodos de la ficha:</strong> la documentación
                        cita metodologías de referencia reconocidas
                        internacionalmente para estas determinaciones.
                      </p>
                    </>
                  ) : slug === "decent-hornos-secado" ? (
                    <>
                      <p>
                        <strong>Preparación de muestras:</strong> hornos para
                        secar muestras y acondicionar material antes de etapas
                        analíticas, con familias de alta capacidad, convección
                        forzada, convección natural y configuración horizontal.
                      </p>
                      <p>
                        <strong>Minería y control de calidad:</strong> la
                        documentación describe aplicaciones de secado por lotes
                        para muestras de mineral de hierro y carbón, incluyendo
                        configuraciones con 36 placas de muestra en las
                        versiones de gran capacidad.
                      </p>
                      <p>
                        <strong>
                          Procesos que requieren temperatura controlada:
                        </strong>{" "}
                        las familias documentadas trabajan desde RT + 10 °C
                        hasta 150 °C, 250 °C o 300 °C según el modelo; la
                        selección debe hacerse con base en capacidad,
                        circulación, uniformidad, alimentación eléctrica y
                        formato de carga.
                      </p>
                    </>
                  ) : isHyperpurexXFlagship ? (
                    <>
                      <p>
                        <strong>Análisis instrumental:</strong> la ficha
                        documenta aplicaciones para HPLC, UPLC, LC-MS, ICP-MS,
                        ICP-AES, AAS, GC-MS, MALDI-TOF-MS, cromatografía iónica
                        y análisis de TOC.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> las
                        configuraciones UF y UVF están relacionadas con medios
                        microbiológicos, cultivo celular, PCR, IVF, purificación
                        de proteínas, electroforesis, proteómica, genómica e
                        inmunoensayo.
                      </p>
                      <p>
                        <strong>Agua para laboratorio:</strong> la ficha también
                        indica preparación de reactivos y medios, y alimentación
                        de autoclaves, lavadoras de cristalería, cámaras de
                        ensayo ambiental y baños termostáticos.
                      </p>
                    </>
                  ) : isHyperpurexPPursuit ? (
                    <>
                      <p>
                        <strong>Análisis instrumental:</strong> la ficha
                        documenta agua ultrapura para HPLC, UPLC, LC-MS,
                        ICP-MS, ICP-AES, AAS, GC-MS, MALDI-TOF-MS,
                        cromatografía iónica y análisis de TOC.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> las
                        configuraciones UF y UVF se relacionan con medios
                        microbiológicos, cultivo celular, PCR, IVF,
                        purificación de proteínas, electroforesis, proteómica,
                        genómica e inmunoensayo.
                      </p>
                      <p>
                        <strong>Preparación analítica:</strong> la ficha
                        incluye preparación de reactivos y medios, y usos de
                        agua ultrapura según la configuración instalada.
                      </p>
                    </>
                  ) : isHyperpurexFxFlagship ? (
                    <>
                      <p>
                        <strong>Análisis instrumental:</strong> las familias
                        con agua ultrapura se documentan para HPLC, UPLC,
                        LC-MS, ICP-MS, ICP-AES, AAS, GC-MS, MALDI-TOF-MS,
                        cromatografía iónica y análisis de TOC.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> las variantes UF
                        y UVF se relacionan con medios microbiológicos,
                        cultivo celular, PCR, IVF, purificación de proteínas,
                        electroforesis, proteómica, genómica e inmunoensayo.
                      </p>
                      <p>
                        <strong>Agua pura y alta pureza:</strong> la ficha
                        indica preparación de reactivos y medios, y
                        alimentación de autoclaves, lavadoras de cristalería,
                        cámaras de ensayo ambiental y baños termostáticos.
                      </p>
                    </>
                  ) : isHyperpurexFeEminent ? (
                    <>
                      <p>
                        <strong>Análisis instrumental:</strong> la ficha
                        documenta aplicaciones para HPLC, UPLC, LC-MS, ICP-MS,
                        ICP-AES, AAS, GC-MS, MALDI-TOF-MS, cromatografía iónica
                        y análisis de TOC.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> las
                        configuraciones UF y UVF se relacionan con medios
                        microbiológicos, cultivo celular, PCR, IVF,
                        purificación de proteínas, electroforesis, proteómica,
                        genómica e inmunoensayo.
                      </p>
                      <p>
                        <strong>Agua pura y alta pureza:</strong> la ficha
                        indica preparación de reactivos y medios, además de la
                        alimentación de autoclaves, lavadoras de cristalería,
                        cámaras de ensayo ambiental y baños termostáticos.
                      </p>
                    </>
                  ) : isHyperpurexFsSmart ? (
                    <>
                      <p>
                        <strong>Análisis rutinario:</strong> la documentación
                        relaciona el agua producida con espectrofotometría
                        UV-Vis, absorción atómica, preparación de reactivos,
                        soluciones estándar y análisis por HPLC.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> las
                        configuraciones indicadas se relacionan con PCR,
                        electroforesis y preparación de medios microbiológicos.
                      </p>
                    </>
                  ) : isHyperpurexLuDiscovery ? (
                    <>
                      <p>
                        <strong>Química analítica:</strong> la ficha documenta
                        agua ultrapura para HPLC, UHPLC, LC-MS, GC-MS, ICP-MS,
                        espectrometría de masas de alta sensibilidad y análisis
                        de TOC, según la configuración seleccionada.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> las
                        configuraciones UF y UVF se indican para PCR, RT-PCR,
                        secuenciación de ADN/ARN, electroforesis, cultivo
                        celular y medios libres de pirógenos o nucleasas.
                      </p>
                      <p>
                        <strong>Agua pura:</strong> la ficha también enumera
                        preparación de reactivos y tampones, lavado de
                        cristalería, autoclaves, lavadoras de cristalería y
                        baños termostáticos.
                      </p>
                    </>
                  ) : isHyperpurexEue ? (
                    <>
                      <p>
                        <strong>Química analítica general:</strong> preparación
                        de reactivos, patrones y tampones; espectrofotometría
                        UV-Vis, absorción atómica y análisis de agua o suelos,
                        según la configuración estándar indicada.
                      </p>
                      <p>
                        <strong>Análisis de trazas:</strong> las configuraciones
                        con UV se documentan para HPLC, UHPLC, LC-MS, GC-MS,
                        ICP-MS y análisis de TOC.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> las
                        configuraciones con UF se indican para PCR, RT-PCR,
                        secuenciación de ADN/ARN, cultivos celulares y
                        electroforesis.
                      </p>
                      <p>
                        <strong>Investigación biomédica:</strong> la
                        configuración UVF está indicada para IVF, cultivos de
                        tejidos madre, medios libres de pirógenos o nucleasas y
                        espectrometría de masas de alta sensibilidad.
                      </p>
                    </>
                  ) : isHyperpurex ? (
                    <>
                      <p>
                        <strong>Preparación analítica:</strong> agua ultrapura
                        para HPLC, UHPLC, LC‑MS, GC‑MS, absorción atómica e
                        ICP‑MS, en los usos indicados por la ficha.
                      </p>
                      <p>
                        <strong>Ciencias de la vida:</strong> aplicaciones
                        documentadas en biología molecular, PCR, secuenciación
                        de ADN, cultivo de tejidos celulares, fecundación in
                        vitro y electroforesis.
                      </p>
                      <p>
                        <strong>Agua pura RO:</strong> limpieza y enjuague de
                        cristalería, alimentación de autoclaves, lavadoras de
                        cristalería, baños termostáticos y preparación de
                        reactivos o soluciones tampón.
                      </p>
                    </>
                  ) : slug === "decent-drsd05" ? (
                    <>
                      <p>
                        <strong>
                          Laboratorios de investigación y muestreo:
                        </strong>{" "}
                        submuestreo representativo en laboratorios, según la
                        descripción proporcionada.
                      </p>
                      <p>
                        <strong>Minería y puertos:</strong> preparación de
                        muestras en laboratorios de muestreo de minas, puertos y
                        otros entornos industriales.
                      </p>
                    </>
                  ) : slug === "decent-drsd40" ? (
                    <>
                      <p>
                        <strong>Muestreo minero:</strong> división precisa de
                        muestras de laboratorio a granel en partes
                        representativas.
                      </p>
                      <p>
                        <strong>Control de calidad e investigación:</strong>{" "}
                        preparación de submuestras para procesos que requieren
                        control de alimentación, frecuencia y velocidad.
                      </p>
                    </>
                  ) : slug === "decent-trituradora-martillo" ? (
                    <>
                      <p>
                        <strong>Preparación de muestras minerales:</strong>{" "}
                        reducción de material mediante impacto, corte y desgarro
                        antes de etapas analíticas posteriores.
                      </p>
                      <p>
                        <strong>Laboratorios de minerales:</strong> trituración
                        de muestras con control del tamaño de salida mediante
                        placa de tamiz enchufable.
                      </p>
                    </>
                  ) : slug === "decent-trituradora-doble-rodillo" ? (
                    <>
                      <p>
                        <strong>Preparación de muestras minerales:</strong>{" "}
                        trituración fina de minerales, rocas y materiales
                        refractarios de dureza media o alta antes de análisis
                        posteriores.
                      </p>
                      <p>
                        <strong>
                          Minería, cemento y materiales abrasivos:
                        </strong>{" "}
                        la documentación indica uso en procesamiento de
                        minerales, industria química, cemento, refractarios,
                        abrasivos y construcción.
                      </p>
                    </>
                  ) : slug === "decent-agitador-tamiz-estandar" ? (
                    <>
                      <p>
                        <strong>Análisis de tamaño de partícula:</strong>{" "}
                        selección de materiales dispersos y clasificación de
                        polvos, materiales sueltos y sólidos suspendidos en
                        laboratorio.
                      </p>
                      <p>
                        <strong>
                          Suelos, farmacia, metalurgia, alimentos, cosmética y
                          granos:
                        </strong>{" "}
                        ámbitos de aplicación indicados para muestras finas,
                        ultrafinas y granulares.
                      </p>
                    </>
                  ) : slug === "decent-rodillo-botella" ? (
                    <>
                      <p>
                        <strong>Lixiviación y mezcla por lotes:</strong> la
                        ficha técnica indica el rodillo para lixiviación húmeda
                        por lotes y para molienda o mezcla húmeda o seca de
                        minerales, menas y partículas.
                      </p>
                      <p>
                        <strong>Laboratorios analíticos de minerales:</strong>{" "}
                        mezcla rotativa de botellas que contienen suspensión de
                        muestra durante ensayos de lixiviación ácida o con
                        cianuro.
                      </p>
                    </>
                  ) : slug === "decent-dsw350" ? (
                    <>
                      <p>
                        <strong>Laboratorios de muestreo minero:</strong>{" "}
                        captura de partículas de polvo generadas en la mesa de
                        trabajo para ayudar a proteger el ambiente de
                        laboratorio y al personal.
                      </p>
                      <p>
                        <strong>Preparación de muestras:</strong> estación con
                        ventilación y filtración integradas para polvo, humo y
                        vapores sobre la superficie de trabajo.
                      </p>
                    </>
                  ) : slug === "decent-mezclador-tipo-v" ? (
                    <>
                      <p>
                        <strong>Mezcla de polvos y granulados:</strong>{" "}
                        preparación de materiales secos o granulares mediante
                        circulación en distintas direcciones dentro del barril
                        tipo V.
                      </p>
                      <p>
                        <strong>Minería, farmacia, química y alimentos:</strong>{" "}
                        ámbitos de aplicación indicados para las configuraciones
                        de mezclador tipo V disponibles.
                      </p>
                    </>
                  ) : slug === "decent-molino-pulverizador-dp1000" ? (
                    <>
                      <p>
                        <strong>Preparación de muestras:</strong> molienda de
                        materiales duros, quebradizos, densos y fibrosos hasta
                        una finura apta para análisis, según la ficha técnica.
                      </p>
                      <p>
                        <strong>Minerales y materiales industriales:</strong>{" "}
                        aplicación en menas, minerales, ferroaleaciones,
                        cerámicas, suelos, agregados y productos químicos
                        descritos por el fabricante.
                      </p>
                    </>
                  ) : isMilestoneEthos ? (
                    <>
                      <p>
                        <strong>Análisis ambiental:</strong> digestión de
                        suelos, sedimentos, aguas, microplásticos y matrices
                        asociadas a contaminantes antes de ICP-OES, ICP-MS o
                        absorción atómica.
                      </p>
                      <p>
                        <strong>Alimentos y piensos:</strong> preparación para
                        análisis elemental y aplicaciones relacionadas con
                        grasas, FAME, aminoácidos, MOAH y MOSH.
                      </p>
                      <p>
                        <strong>Farmacéutica y materiales:</strong>{" "}
                        procesamiento reproducible de materias primas,
                        formulaciones, geología, materiales y muestras de
                        química sintética.
                      </p>
                    </>
                  ) : slug === "hanon-e500" ? (
                    <>
                      <p>
                        <strong>Química y farmacéutica:</strong> caracterización
                        de productos químicos finos, desarrollo de materiales,
                        investigación de nuevos fármacos y determinación de
                        composición elemental.
                      </p>
                      <p>
                        <strong>Monitoreo ambiental:</strong> cuantificación de
                        C/H/N/S/O en aguas residuales, residuos sólidos, lodos y
                        sedimentos.
                      </p>
                      <p>
                        <strong>Agricultura y alimentos:</strong> análisis de
                        plantas, alimentos, suelos, fertilizantes mixtos y
                        madera.
                      </p>
                      <p>
                        <strong>Geología, minería y petroquímica:</strong>{" "}
                        estudio de rocas, minerales, carbón, coque, combustibles
                        fósiles y productos petroquímicos.
                      </p>
                    </>
                  ) : slug === "infitek-mca-series" ? (
                    <>
                      <p>
                        <strong>Laboratorios de Control de Calidad:</strong>{" "}
                        determinación exacta de humedad en materias primas y
                        productos terminados en la industria de alimentos y
                        farmacéutica.
                      </p>
                      <p>
                        <strong>Análisis de Materiales:</strong> evaluación de
                        secado y contenido residual en químicos finos,
                        materiales de construcción y polímeros.
                      </p>
                      <p>
                        <strong>Educación superior e Investigación:</strong> uso
                        generalizado para docencia e investigación científica
                        por su fiabilidad térmica y gravimétrica.
                      </p>
                    </>
                  ) : slug === "infitek-ph-b100bd" ? (
                    <>
                      <p>
                        <strong>Análisis biológico:</strong> medición
                        multiparamétrica altamente versátil para silvicultura,
                        control agrícola y análisis biológico avanzado.
                      </p>
                      <p>
                        <strong>Control ambiental:</strong> análisis de
                        precisión del pH en calidad de agua por organismos de
                        protección ambiental y control de enfermedades.
                      </p>
                      <p>
                        <strong>Educación superior:</strong> ideal para centros
                        de investigación científica e instituciones de educación
                        por su facilidad de uso.
                      </p>
                    </>
                  ) : slug === "infitek-cod-analyzer" ? (
                    <>
                      <p>
                        <strong>Salud pública y control:</strong> monitoreo de
                        enfermedades y análisis biológico.
                      </p>
                      <p>
                        <strong>Protección del medio ambiente:</strong>{" "}
                        evaluación precisa del grado de contaminación del agua
                        por sustancias reductoras.
                      </p>
                      <p>
                        <strong>Calidad de agua e investigación:</strong>{" "}
                        análisis indispensable para laboratorios de calidad de
                        agua e instituciones de investigación científica.
                      </p>
                    </>
                  ) : slug === "infitek-bep-m300f" ? (
                    <>
                      <p>
                        <strong>Análisis biológico:</strong> medición
                        multiparamétrica altamente versátil para silvicultura y
                        análisis biológico avanzado.
                      </p>
                      <p>
                        <strong>Control ambiental:</strong> análisis de
                        precisión de la calidad del agua por organismos de
                        protección ambiental y control de enfermedades.
                      </p>
                      <p>
                        <strong>Educación superior:</strong> ideal para centros
                        de investigación científica e instituciones de educación
                        superior por su adaptabilidad.
                      </p>
                    </>
                  ) : slug === "infitek-usc-m-series" ? (
                    <>
                      <p>
                        <strong>Clínica e Investigación:</strong>{" "}
                        desgasificación y limpieza profunda de material de
                        vidrio, instrumental médico y componentes metálicos de
                        alta complejidad geométrica.
                      </p>
                      <p>
                        <strong>Farmacéutica:</strong> mezcla, disolución y
                        emulsificación de reactivos químicos y preparación de
                        muestras mediante agitación ultrasónica.
                      </p>
                      <p>
                        <strong>Sectores industriales:</strong> limpieza de
                        tarjetas de circuitos, piezas de relojería, joyería,
                        boquillas y componentes electrónicos sin fricción
                        mecánica.
                      </p>
                    </>
                  ) : slug === "infitek-don-h-series" ? (
                    <>
                      <p>
                        <strong>Laboratorios Químicos y Farmacéuticos:</strong>{" "}
                        secado, esterilización por calor seco, curado y
                        tratamiento térmico de productos e instrumentos.
                      </p>
                      <p>
                        <strong>Industria y Minería:</strong> pruebas de
                        envejecimiento de materiales, secado de minerales y
                        ensayo de componentes electrónicos con altas
                        temperaturas.
                      </p>
                      <p>
                        <strong>Agricultura y Ciencias de la Vida:</strong>{" "}
                        deshidratación de tejidos, secado de plantas y
                        esterilización de utensilios en un ambiente libre de
                        contaminación por convección forzada.
                      </p>
                    </>
                  ) : slug === "infitek-lyo60b-series" ? (
                    <>
                      <p>
                        <strong>Clínica e Investigación:</strong> deshidratación
                        y conservación de vacunas, anticuerpos y hemoderivados
                        sin comprometer su integridad química y biológica.
                      </p>
                      <p>
                        <strong>Industria Alimentaria:</strong> secado por
                        congelación de alimentos y extractos botánicos que
                        conservan características organolépticas originales.
                      </p>
                      <p>
                        <strong>Enzimas y Sustancias Termolábiles:</strong>{" "}
                        preparación delicada de compuestos sensibles al calor
                        como hormonas, bacterias y antibióticos.
                      </p>
                    </>
                  ) : slug === "infitek-fmh-series" ? (
                    <>
                      <p>
                        <strong>
                          Laboratorios Universitarios y Centros de I+D:
                        </strong>{" "}
                        contención confiable de vapores nocivos que surgen
                        durante docencia y experimentación con disolventes.
                      </p>
                      <p>
                        <strong>Inspecciones Clínicas:</strong> protección para
                        los técnicos durante la mezcla reactiva de ácidos
                        débiles o ensayos biológicos sin requerir ductos
                        complejos de escape.
                      </p>
                    </>
                  ) : slug === "infitek-fmh-pa-series" ? (
                    <>
                      <p>
                        <strong>
                          Laboratorios Químicos de Alta Severidad:
                        </strong>{" "}
                        digestión de metales con uso intensivo de ácidos
                        calientes (Nítrico, Sulfúrico, Clorhídrico) que
                        destruyen rápidamente los metales.
                      </p>
                      <p>
                        <strong>Industria de Semiconductores:</strong> grabado
                        químico profundo (etching) dentro de salas blancas,
                        garantizando que ninguna partícula metálica contamine el
                        medio.
                      </p>
                    </>
                  ) : slug === "infitek-wb-series" ? (
                    <>
                      <p>
                        <strong>Procesos a temperatura constante:</strong>{" "}
                        calentamiento uniforme de recipientes mediante
                        convección natural del agua.
                      </p>
                      <p>
                        <strong>Ciclos temporizados:</strong> operación a
                        temperatura fija con detención automática una vez
                        cumplido el tiempo programado.
                      </p>
                    </>
                  ) : slug === "infitek-pr5-series" ? (
                    <>
                      <p>
                        <strong>Farmacias y centros médicos:</strong>{" "}
                        almacenamiento refrigerado de vacunas y medicamentos
                        entre 2 y 8 °C.
                      </p>
                      <p>
                        <strong>Laboratorios:</strong> conservación de reactivos
                        y muestras con circulación de aire forzado, alarma y
                        control de acceso.
                      </p>
                    </>
                  ) : slug === "infitek-titr-50vc" ? (
                    <>
                      <p>
                        <strong>Humedad constante o en trazas:</strong>{" "}
                        determinación de agua mediante valoración Karl Fischer
                        volumétrica o coulométrica.
                      </p>
                      <p>
                        <strong>Muestras sólidas, líquidas y gaseosas:</strong>{" "}
                        análisis directo o mediante muestreo por horno, según el
                        método configurado.
                      </p>
                      <p>
                        <strong>Operación documentada:</strong> gestión de
                        métodos, sensores, titulantes, usuarios y resultados
                        para rutinas que requieren trazabilidad.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Análisis Nutricional e Industrial:</strong>{" "}
                        determinación exacta del contenido de analitos en
                        productos lácteos, carnes, granos y subproductos.
                      </p>
                      <p>
                        <strong>Nutrición Animal y Agricultura:</strong>{" "}
                        análisis cuantitativo en alimentos balanceados,
                        forrajes, fertilizantes y muestras de suelos.
                      </p>
                      <p>
                        <strong>Control Ambiental y Farmacia:</strong> control
                        de calidad y monitoreo de matrices ambientales y
                        materias primas farmacéuticas.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 4. Soporte Del Carpio */}
            {activeHanonTab === "soporte" && (
              <div
                role="tabpanel"
                id="panel-soporte"
                aria-labelledby="tab-soporte"
                className="space-y-6 max-w-3xl"
              >
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    Servicios Especializados
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                    Soporte técnico especializado desde el primer día.
                  </h3>
                </div>
                <div className="grid gap-6">
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">
                      Instalación e Integración Operativa
                    </h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Ejecutamos el montaje físico y la puesta en marcha de sus
                      nuevos equipos, verificando los parámetros críticos para
                      asegurar un inicio de operación óptimo
                    </p>
                  </div>
                  {isMilestoneEthos && (
                    <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                      <h4 className="font-bold text-[#101820] text-[15px]">
                        Plataforma Milestone Connect
                      </h4>
                      <p className="text-[13px] leading-relaxed text-[#4A5560]">
                        El fabricante aporta monitoreo remoto, documentación,
                        tutoriales y asistencia de aplicaciones; Del Carpio
                        complementa esa plataforma con instalación, capacitación
                        y soporte técnico local.
                      </p>
                    </div>
                  )}
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">
                      Capacitación Técnica de Usuarios
                    </h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Instruimos en sitio a los operadores y al personal técnico
                      a cargo del sistema, cubriendo desde los fundamentos de
                      uso diario hasta los protocolos de seguridad
                      indispensables.
                    </p>
                  </div>
                  <div className="border border-[#D4DFDC] p-5 bg-white rounded-[4px] flex flex-col gap-1">
                    <h4 className="font-bold text-[#101820] text-[15px]">
                      Diagnóstico y Mantención Preventiva
                    </h4>
                    <p className="text-[13px] leading-relaxed text-[#4A5560]">
                      Evaluamos la integridad de los componentes mediante
                      diagnósticos especializados y rutinas de mantención
                      planificadas para prevenir desviaciones analíticas y
                      fallas críticas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Accesorios documentados */}
            {activeHanonTab === "accesorios" && hasAccessories && (
              <div
                role="tabpanel"
                id="panel-accesorios"
                aria-labelledby="tab-accesorios"
                className="space-y-8"
              >
                <div>
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#D6532B]">
                    Material suministrado
                  </p>
                  <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-[#101820]">
                    Accesorios documentados
                  </h3>
                  <p className="mb-6 max-w-3xl text-[13px] leading-relaxed text-[#4A5560]">
                    Estos elementos están identificados en la documentación
                    proporcionada para este equipo. La configuración final debe
                    confirmarse al cotizar.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(ACCESSORIES_BY_SLUG[slug] ?? []).map((item) => (
                      <figure
                        key={item.name}
                        className="overflow-hidden border border-[#D4DFDC] bg-white rounded-[4px]"
                      >
                        {item.image ? (
                          <div className="relative h-[220px] w-full border-b border-[#D4DFDC] bg-[#fcfcfc]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                              className="object-contain p-5"
                            />
                          </div>
                        ) : null}
                        <figcaption className="p-5">
                          <h4 className="mb-2 text-[15px] font-bold text-[#101820]">
                            {item.name}
                          </h4>
                          <p className="text-[12.5px] leading-relaxed text-[#4A5560]">
                            {item.description}
                          </p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Consumibles relacionados */}
            {activeHanonTab === "consumibles" && hasConsumibles && (
              <div
                role="tabpanel"
                id="panel-consumibles"
                aria-labelledby="tab-consumibles"
                className="space-y-8"
              >
                <div>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                    {isMilestoneEthos
                      ? "Plataforma configurable"
                      : "Accesorios Originales"}
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-6">
                    {isMilestoneEthos ? "Rotores y accesorios" : "Consumibles"}
                  </h3>

                  {!CONSUMIBLES_BY_SLUG[slug] ||
                  CONSUMIBLES_BY_SLUG[slug].length === 0 ? (
                    <div className="border border-[#D4DFDC] bg-[#F4F4F4]/40 rounded-[6px] p-8 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[220px]">
                      <svg
                        className="w-12 h-12 text-[#4A5560]/50 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <h4 className="font-bold text-[#101820] text-[16px] mb-2">
                        Sin consumibles críticos requeridos
                      </h4>
                      <p className="text-[13px] leading-relaxed text-[#4A5560]/80">
                        {slug === "hanon-sox406"
                          ? "El Analizador semi automático SOX406 no requiere de consumibles de reemplazo frecuente para su operación básica. Todos los componentes de vidrio y accesorios de soporte se incluyen en la entrega inicial del equipo. Si requiere repuestos o accesorios adicionales, por favor contáctenos."
                          : slug === "hanon-f800"
                            ? "El Analizador de fibra F800 no requiere de consumibles de reemplazo frecuente para su operación básica. Todos los crisoles de filtración y accesorios de soporte se incluyen en la entrega inicial del equipo. Si requiere repuestos o accesorios adicionales, por favor contáctenos."
                            : "Este equipo no requiere de consumibles de reemplazo frecuente para su operación básica. Todos los componentes básicos y accesorios de soporte se incluyen en la entrega inicial del equipo. Si requiere repuestos o accesorios adicionales, por favor contáctenos."}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "grid gap-4",
                        slug === "hanon-e500" || isMilestoneEthos
                          ? "sm:grid-cols-2 xl:grid-cols-3"
                          : (CONSUMIBLES_BY_SLUG[slug]?.length ?? 0) === 4
                            ? "sm:grid-cols-2 lg:grid-cols-4"
                            : "sm:grid-cols-3",
                      )}
                    >
                      {(CONSUMIBLES_BY_SLUG[slug] ?? []).map((item, index) => (
                        <div
                          key={index}
                          className="border border-[#D4DFDC] rounded-[4px] overflow-hidden bg-white flex flex-col"
                        >
                          {item.image ? (
                            <div className="relative h-[200px] w-full bg-[#fcfcfc] border-b border-[#D4DFDC]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
                                className="object-contain p-4"
                              />
                            </div>
                          ) : null}
                          <div className="p-5 flex-1 flex flex-col">
                            <h4 className="font-bold text-[#101820] text-[15px] mb-2">
                              {item.name}
                            </h4>
                            <p className="text-[12.5px] leading-relaxed text-[#4A5560] flex-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 6. Video Relacionado */}
            {activeHanonTab === "video" &&
              (relatedVideo ||
                hyperpurexRelatedVideo ||
                slug === "hanon-sox606" ||
                slug === "hanon-sh420f" ||
                slug === "hanon-k1100f" ||
                slug === "hanon-sox406" ||
                slug === "hanon-f800") && (
                <div
                  role="tabpanel"
                  id="panel-video"
                  aria-labelledby="tab-video"
                  className="space-y-6"
                >
                  <div>
                    <p className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] text-[#D6532B] mb-2">
                      Demostración de Operación
                    </p>
                    <h3 className="text-2xl font-extrabold text-[#101820] tracking-tight mb-4">
                      Video Relacionado
                    </h3>
                    {relatedVideo ? (
                      <>
                        <p className="text-[14px] leading-relaxed text-[#4A5560] mb-8 max-w-2xl">
                          Material audiovisual disponible para {relatedVideo.label}.
                        </p>
                        <div className="mx-auto max-w-4xl overflow-hidden rounded-[8px] border border-[#D4DFDC] bg-white shadow-lg">
                          <LazyVideoPlayer
                            src={relatedVideo.src}
                            poster={relatedVideo.poster}
                            alt={`Video relacionado: ${relatedVideo.label}`}
                            playLabel={`Reproducir video: ${relatedVideo.label}`}
                            imageSizes="(min-width: 1024px) 896px, 100vw"
                            aspectVideo
                          />
                        </div>
                      </>
                    ) : hyperpurexRelatedVideo ? (
                      <>
                        <p className="text-[14px] leading-relaxed text-[#4A5560] mb-8 max-w-2xl">
                          Material audiovisual disponible para la{" "}
                          {hyperpurexRelatedVideo.label}.
                        </p>
                        <div className="mx-auto max-w-4xl overflow-hidden rounded-[8px] border border-[#D4DFDC] bg-white shadow-lg">
                          <LazyVideoPlayer
                            src={hyperpurexRelatedVideo.src}
                            poster={hyperpurexRelatedVideo.poster}
                            alt={`Video relacionado: ${hyperpurexRelatedVideo.label}`}
                            playLabel={`Reproducir video: ${hyperpurexRelatedVideo.label}`}
                            imageSizes="(min-width: 1024px) 896px, 100vw"
                            aspectVideo
                          />
                        </div>
                      </>
                    ) : slug === "hanon-sh420f" ||
                      slug === "hanon-k1100f" ||
                      slug === "hanon-sox406" ||
                      slug === "hanon-f800" ? (
                      <div className="border border-[#D4DFDC] bg-[#F4F4F4]/40 rounded-[6px] p-8 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[220px]">
                        <svg
                          className="w-12 h-12 text-[#4A5560]/50 mb-4 animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        <h4 className="font-bold text-[#101820] text-[16px] mb-2">
                          Video de demostración próximamente
                        </h4>
                        <p className="text-[13px] leading-relaxed text-[#4A5560]/80">
                          El equipo de Del Carpio está preparando el video
                          explicativo y operativo para el equipo Hanon{" "}
                          {slug === "hanon-k1100f"
                            ? "K1100F"
                            : slug === "hanon-sox406"
                              ? "SOX406"
                              : slug === "hanon-f800"
                                ? "F800"
                                : "SH420F"}
                          . no dude en contactarnos.
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-[14px] leading-relaxed text-[#4A5560] mb-8 max-w-2xl">
                          Vea a continuación la demostración de la operación,
                          mantenimiento y ciclo completo del extractor
                          automático Soxhlet Hanon SOX606 en nuestro
                          laboratorio.
                        </p>
                        <div className="mx-auto max-w-4xl overflow-hidden rounded-[8px] border border-[#D4DFDC] bg-white shadow-lg">
                          <LazyVideoPlayer
                            src="/productos/hanon-sox606/video-relacionado.mp4"
                            poster="/productos/hanon-sox606/imagen-7.png"
                            alt="Video relacionado: extractor Soxhlet Hanon SOX606"
                            playLabel="Reproducir video: extractor Soxhlet Hanon SOX606"
                            imageSizes="(min-width: 1024px) 896px, 100vw"
                            aspectVideo
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
          </div>

          {hasFullCatalogNotice && (
            <BrandCatalogNotice brand={brand!} currentProduct={productName} />
          )}
        </div>
      </section>
    );
  }

  // Fallback / default tabs rendering for other products
  const defaultTabs: { id: DefaultTabId; label: string }[] = [
    { id: "detalle", label: "Detalle" },
    { id: "parametros", label: "Parámetros" },
    { id: "descargas", label: "Descargas" },
  ];

  return (
    <section className="pb-14 md:pb-20">
      <div className="border border-[#D4DFDC] bg-white rounded-[4px] overflow-hidden">
        <div
          role="tablist"
          aria-label="Información del producto"
          className="grid border-b border-[#D4DFDC] bg-[#F4F4F4] sm:grid-cols-3"
        >
          {defaultTabs.map((tab) => {
            const isActive = activeDefaultTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveDefaultTab(tab.id)}
                className={cn(
                  "border-b border-[#D4DFDC] px-5 py-4 text-left text-[12px] font-extrabold uppercase tracking-[0.16em] transition-colors last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                  isActive
                    ? "bg-white text-[#D6532B]"
                    : "text-[#4A5560] hover:bg-white/70 hover:text-[#101820]",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="min-h-[340px] p-5 sm:p-7 md:p-9">
          {activeDefaultTab === "detalle" ? (
            <div
              role="tabpanel"
              id="panel-detalle"
              aria-labelledby="tab-detalle"
              className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]"
            >
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Producto
                </p>
                <h2 className="mt-4 max-w-[440px] text-3xl font-extrabold leading-tight tracking-tight text-[#101820] md:text-5xl">
                  Lo esencial para decidir.
                </h2>
              </div>

              <div className="grid gap-px overflow-hidden border border-[#D4DFDC] bg-[#D4DFDC]">
                {summaryItems.slice(0, 4).map((item) => (
                  <article key={item} className="bg-white p-5">
                    <p className="text-[14px] leading-7 text-[#4A5560]">
                      {item}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {activeDefaultTab === "parametros" ? (
            <div
              role="tabpanel"
              id="panel-parametros"
              aria-labelledby="tab-parametros"
            >
              <div className="mb-6 max-w-xl">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                  Datos técnicos
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#101820]">
                  Parámetros clave
                </h2>
              </div>
              <p className="text-[14px] leading-relaxed text-[#4A5560]">
                Información técnica estándar de catálogo. Solicite el datasheet
                específico para más detalles.
              </p>
            </div>
          ) : null}

          {activeDefaultTab === "descargas" ? (
            <div
              role="tabpanel"
              id="panel-descargas"
              aria-labelledby="tab-descargas"
              className="flex min-h-[260px] flex-col justify-center"
            >
              <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#D6532B]">
                Documentación
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#101820] md:text-5xl">
                Solicitar ficha técnica completa.
              </h2>
              <p className="mt-5 max-w-[620px] text-[14px] leading-7 text-[#4A5560]">
                Para validar matriz, método, accesorios o cumplimiento
                normativo, el equipo técnico revisa el caso antes de recomendar.
              </p>
            </div>
          ) : null}
        </div>

        {hasFullCatalogNotice && (
          <BrandCatalogNotice brand={brand!} currentProduct={productName} />
        )}
      </div>
    </section>
  );
}

// Subcomponents helper
function SpecCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[0.86fr_1.14fr] border-b border-[#D4DFDC] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="bg-[#F4F4F4] p-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#101820]">
        {label}
      </div>
      <div className="p-4 text-[13px] leading-6 text-[#4A5560]">{value}</div>
    </div>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex items-start p-3 border border-[#D4DFDC] bg-white rounded-[4px]">
      <p className="text-[13px] leading-relaxed text-[#4A5560]">{text}</p>
    </div>
  );
}

function InfoPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[4px] border border-[#D4DFDC] bg-[#F4F4F4]/50 p-5">
      <h4 className="mb-2 text-[15px] font-bold text-[#101820]">{title}</h4>
      <p className="text-[13px] leading-relaxed text-[#4A5560]">{text}</p>
    </div>
  );
}

// Reproductor con carga bajo demanda: hasta que el usuario hace clic en el
// botón de play, en el DOM solo existe el poster (<Image>, montado únicamente
// cuando el bloque entra al viewport vía useInView — mismo patrón que
// IndustryGrid en industry-tabs.tsx). El <video> recién se monta al hacer
// clic, evitando que las fichas de producto disparen peticiones .mp4 solo
// por cargar la página (ver .agent-log/sessions.md, incidente de video 2026-08-24
// y auditoría de performance 2026-08-31).
function LazyVideoPlayer({
  src,
  poster,
  alt,
  playLabel,
  imageSizes,
  aspectVideo = false,
}: {
  src: string;
  poster: string;
  alt: string;
  playLabel: string;
  imageSizes: string;
  aspectVideo?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", aspectVideo ? "aspect-video bg-white" : "h-full")}
    >
      {isPlaying ? (
        <video
          aria-label={alt}
          className="h-full w-full object-contain bg-white"
          controls
          autoPlay
          playsInline
          poster={poster}
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          Tu navegador no admite la reproducción de video.
        </video>
      ) : (
        <>
          {inView ? (
            <Image
              src={poster}
              alt={alt}
              fill
              sizes={imageSizes}
              className="object-contain"
            />
          ) : null}
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={playLabel}
            className="group absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-150 hover:bg-black/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6532B]"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-[#D6532B] text-white shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Play size={26} weight="fill" className="translate-x-0.5" />
            </span>
          </button>
        </>
      )}
    </div>
  );
}

function DescriptiveMediaBlock({
  media,
  index = 0,
}: {
  media: DescriptiveMedia;
  index?: number;
}) {
  const isReversed = index % 2 === 1;
  const isVideo = "poster" in media;

  return (
    <figure className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-10">
      <div
        className={cn(
          "relative h-[min(280px,72vw)] overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-[var(--background)] md:h-[clamp(240px,26vw,360px)]",
          isReversed && "md:order-2",
        )}
      >
        {isVideo ? (
          <LazyVideoPlayer
            src={media.src}
            poster={media.poster}
            alt={media.alt}
            playLabel={`Reproducir video: ${media.title ?? media.alt}`}
            imageSizes="(min-width: 1280px) 380px, (min-width: 768px) 32vw, 100vw"
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(min-width: 1280px) 380px, (min-width: 768px) 32vw, 100vw"
            className="object-contain p-5 md:p-6"
          />
        )}
      </div>
      <figcaption
        className={cn(
          "max-w-[65ch] md:py-6",
          isReversed && "md:order-1",
        )}
      >
        <h4 className="font-display text-base font-bold leading-snug text-[#4A5560]">
          {media.title ?? media.alt}
        </h4>
        {media.caption ? (
          <p className="mt-3 font-sans text-sm leading-relaxed text-[#4A5560]">
            {media.caption}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
