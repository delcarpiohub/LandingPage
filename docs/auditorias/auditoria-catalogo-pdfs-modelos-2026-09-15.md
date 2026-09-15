# Auditoría de PDFs y diferenciación de modelos del catálogo

Fecha: 15 de septiembre de 2026.

## Alcance y método

- Se recorrieron las 107 páginas publicadas bajo `/productos/[slug]` en el servidor local.
- Se extrajeron los enlaces `.pdf` renderizados por cada ficha y se comprobó su existencia en `public`.
- Resultado: 98 enlaces PDF verificados, 0 rotos y 0 errores de carga de página tras corregir Hanon D50/D200.
- La revisión de modelos se limitó al contenido publicado: `FALTA explicar diferencia` significa que la ficha indica varios modelos o capacidades pero no relaciona cada diferencia de manera explícita. No se modifica contenido de esos casos en esta auditoría.

## Resultado completo

| Ficha | Slug | PDFs | Diferenciación de modelos |
|---|---|---|---|
| iCAP TQs ICP-MS | `thermo-icap-tqs` | OK — 2 PDFs verificados | N/A — un solo modelo o código publicado. |
| iCAP TQe ICP-MS | `thermo-icap-tqe` | OK — 2 PDFs verificados | N/A — un solo modelo o código publicado. |
| iCAP PRO / iCAP PRO X ICP-OES Radial | `thermo-icap-pro-radial` | OK — 2 PDFs verificados | OK — dos variantes de flujo de gas en configuración de compra. |
| iCAP PRO XPS ICP-OES | `thermo-icap-pro-xps` | OK — 2 PDFs verificados | OK — Duo y Radial comparadas. |
| iCAP PRO XP ICP-OES | `thermo-icap-pro-xp` | OK — 3 PDFs verificados | OK — Duo y Radial comparadas. |
| Element Series HR-ICP-MS | `thermo-element-series` | OK — 2 PDFs verificados | OK — Element 2 y Element XR; rango dinámico explicado. |
| ISQ 7610 Single Quadrupole GC-MS | `thermo-isq7610` | OK — 2 PDFs verificados | OK — cinco configuraciones de compra identificadas. |
| Gallery Enzyme Master | `thermo-gallery-enzyme-master` | OK — 1 PDF verificado | OK — Gallery Enzyme Master y Plus comparados. |
| EXTREVA ASE Accelerated Solvent Extractor | `thermo-extreva-ase` | OK — 2 PDFs verificados | OK — dos configuraciones de compra identificadas. |
| Orbitrap IQ-X Tribrid Mass Spectrometer | `thermo-orbitrap-iqx` | OK — 1 PDF verificado | OK — tres configuraciones de compra identificadas. |
| Orbitrap Exploris GC Mass Spectrometer | `thermo-orbitrap-exploris-gc` | OK — 2 PDFs verificados | OK — cuatro configuraciones de compra identificadas. |
| Orbitrap Exploris Mass Spectrometer | `thermo-orbitrap-exploris` | OK — 6 PDFs verificados | OK — tiers 120 / 240 / 480 explicados. |
| Orbitrap Astral Mass Spectrometer | `thermo-orbitrap-astral` | OK — 4 PDFs verificados | OK — variantes de rango de masa explicadas. |
| Orbitrap Eclipse Tribrid Mass Spectrometer | `thermo-orbitrap-eclipse-tribrid` | OK — 2 PDFs verificados | OK — cuatro configuraciones de compra identificadas. |
| Q Exactive Plus Hybrid Quadrupole-Orbitrap Mass Spectrometer | `thermo-q-exactive-plus` | OK — 2 PDFs verificados | N/A — un solo modelo o código publicado. |
| TSQ Quantis Plus Triple Quadrupole Mass Spectrometer | `thermo-tsq-quantis-plus` | OK — 3 PDFs verificados | OK — variantes de bomba explicadas. |
| TSQ Altis Plus Triple Quadrupole Mass Spectrometer | `thermo-tsq-altis-plus` | OK — 2 PDFs verificados | OK — variantes de bomba explicadas. |
| TSQ Fortis Plus Triple Quadrupole Mass Spectrometer | `thermo-tsq-fortis-plus` | OK — 1 PDF verificado | OK — variantes de bomba explicadas. |
| DELTA Q Isotope Ratio Mass Spectrometer | `thermo-delta-q-irms` | OK — 3 PDFs verificados | N/A — un solo modelo o código publicado. |
| Analizador Kjeldahl automático K1160 | `hanon-k1160` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Analizador Kjeldahl automático K9860 | `hanon-k9860` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Analizador Kjeldahl K9840 | `hanon-k9840` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Extractor Soxhlet automático SOX606 | `hanon-sox606` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Digestor Kjeldahl bloque de grafito SH220F | `hanon-sh220f` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Digestor Kjeldahl bloque de grafito SH420F | `hanon-sh420f` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Analizador Kjeldahl automático K1100F | `hanon-k1100f` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Digestor automático Kjeldahl SH520/SH508 | `hanon-sh520` | OK — 1 PDF verificado | OK — SH520 / SH508 diferenciados por capacidad y especificaciones. |
| Sistema de agotamiento de gases S402 | `hanon-s402` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Analizador de grasa SOX406 | `hanon-sox406` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Analizador de fibra F800 | `hanon-f800` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Analizador Dumas D50/D200 | `hanon-d50-d200` | OK — 1 PDF verificado | OK — tabla nueva: disco D200 120/40 frente a disco D50 60. |
| Analizador elemental orgánico E500 | `hanon-e500` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Sistema de digestión por microondas ETHOS UP | `milestone-ethos-up` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Columnas capilares de sílice fundida Restek | `restek/columnas-capilares-silice-fundida` | OK — sin PDF enlazado | N/A — familia de consumibles; sin modelos/códigos individuales agrupados. |
| Analytical LC Columns Restek | `restek/analytical-lc-columns` | OK — sin PDF enlazado | N/A — familia de consumibles; sin modelos/códigos individuales agrupados. |
| Viales con filtro Restek | `restek/viales-con-filtro` | OK — sin PDF enlazado | N/A — familia de consumibles; sin modelos/códigos individuales agrupados. |
| Columnas de protección HPLC Restek | `restek/columnas-proteccion` | OK — sin PDF enlazado | N/A — familia de consumibles; sin modelos/códigos individuales agrupados. |
| Analizador de DQO COD-100B | `infitek-cod-analyzer` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Multiparamétrico BEP-M300F | `infitek-bep-m300f` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Humedad MCA110 | `infitek-mca-series` | OK — 1 PDF verificado | FALTA explicar diferencia |
| Medidor pH PH-B100BD | `infitek-ph-b100bd` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Ultrasónico USC-M | `infitek-usc-m-series` | OK — 1 PDF verificado | FALTA explicar diferencia |
| Horno DON-H | `infitek-don-h-series` | OK — 1 PDF verificado | FALTA explicar diferencia |
| Liofilizador LYO60B | `infitek-lyo60b-series` | OK — 1 PDF verificado | FALTA explicar diferencia |
| Campana sin ductos FMH | `infitek-fmh-series` | OK — 1 PDF verificado | OK — modelos, potencia y rango de capacidad documentados. |
| Campana de PP FMH-P | `infitek-fmh-pa-series` | OK — 1 PDF verificado | FALTA explicar diferencia |
| Baño de agua WB-1R2H-7 | `infitek-wb-series` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Refrigerador PR5-1500 | `infitek-pr5-series` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Titulador Karl Fischer TITR-50VC | `infitek-titr-50vc` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Halógenos XplorerPlus AOX/TOX | `te-instruments-xplorer-aox-tox` | OK — sin PDF enlazado | N/A — módulos analíticos configurables, no códigos de modelo separados. |
| Nitrógeno XplorerPlus TN | `te-instruments-xplorer-tn` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Autosampler VECTRA | `te-instruments-vectra` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Autosampler NEWTON | `te-instruments-newton` | OK — sin PDF enlazado | OK — capacidad base de 20 y expansión a 60 posiciones explicadas. |
| Cargador de crisoles DEPL25 / DEPL50 | `decent-cargador-electrico-crisoles` | OK — sin PDF enlazado | OK — DEPL25/DEPL50 diferenciados por horquilla. |
| Cargador de crisoles DMPL25 / DMPL50 | `decent-cargador-manual-crisoles` | OK — sin PDF enlazado | OK — DMPL25/DMPL50 diferenciados por horquilla. |
| Copelas de magnesia Serie 2X–14 | `decent-copelas-magnesio` | OK — sin PDF enlazado | OK — tamaños 2X–14 con dimensiones por grupos/modelos. |
| Dosificador de flux DAFS84 | `decent-dosificador-automatico-litargirio` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Horno de cupelación DE-50CF / DE-100CF / DE-168CF | `decent-hornos-cupelacion` | OK — sin PDF enlazado | OK — DE-50CF / 100CF / 168CF comparados. |
| Horno de cupelación DE-100CF-1500 | `decent-horno-copelacion-alta-temperatura` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Horno de fusión DE-20FF / DE-25FF | `decent-hornos-fusion-ensayo-fuego` | OK — sin PDF enlazado | OK — DE-20FF / DE-25FF comparados en la ficha. |
| Mezclador DPT25 / DPT50 / DPT84 | `decent-mezclador-crisoles` | OK — sin PDF enlazado | OK — DPT25 / DPT50 / DPT84 diferenciados en especificaciones. |
| Molino DP1000 | `decent-molino-pulverizador-dp1000` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Divisor giratorio DRSD05 | `decent-drsd05` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Divisor rotativo DRSD40 | `decent-drsd40` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Trituradora de martillo de laboratorio | `decent-trituradora-martillo` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Rodillo DHT / DBR | `decent-rodillo-botella` | OK — sin PDF enlazado | FALTA explicar diferencia |
| Estación DSW350 | `decent-dsw350` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Mezclador tipo V DVM | `decent-mezclador-tipo-v` | OK — sin PDF enlazado | FALTA explicar diferencia |
| Trituradora DRC200 / DRC250 | `decent-trituradora-doble-rodillo` | OK — sin PDF enlazado | OK — configuraciones DRC200/250 diferenciadas en especificaciones. |
| Agitador de tamiz DSS200 | `decent-agitador-tamiz-estandar` | OK — sin PDF enlazado | OK — DSS200 / DSS200S diferenciados en la ficha. |
| Horno de secado DDO | `decent-hornos-secado` | OK — sin PDF enlazado | FALTA explicar diferencia |
| Hyperpurex EUE | `hyperpurex-serie-eue` | OK — 1 PDF verificado | OK — variantes/configuraciones explicadas en la ficha. |
| Hyperpurex SU Smart | `hyperpurex-serie-su-smart` | OK — 1 PDF verificado | OK — variantes/configuraciones explicadas en la ficha. |
| Hyperpurex LU Discovery | `hyperpurex-serie-lu-discovery` | OK — 1 PDF verificado | OK — variantes/configuraciones explicadas en la ficha. |
| Hyperpurex X Flagship | `hyperpurex-serie-x-flagship` | OK — 1 PDF verificado | OK — variantes/configuraciones explicadas en la ficha. |
| Hyperpurex P Pursuit | `hyperpurex-serie-p-pursuit` | OK — 1 PDF verificado | OK — variantes/configuraciones explicadas en la ficha. |
| Hyperpurex FX Flagship | `hyperpurex-serie-fx-flagship` | OK — 1 PDF verificado | OK — variantes/configuraciones explicadas en la ficha. |
| Hyperpurex FE Eminent | `hyperpurex-serie-fe-eminente` | OK — 1 PDF verificado | OK — variantes/configuraciones explicadas en la ficha. |
| Hyperpurex FS Smart | `hyperpurex-serie-fs-smart` | OK — sin PDF enlazado | OK — variantes/configuraciones explicadas en la ficha. |
| Analizador de fibras F2000 | `hanon-f2000` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Analizador de fibra dietética DF06 | `hanon-df06` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek ezfill+ | `distek-ezfill-plus` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek OLERA | `distek-olera` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek OLERA Plus | `distek-olera-plus` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek OLERA Select | `distek-olera-select` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek Opt-Diss 410 | `distek-opt-diss-410` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek Eclipse 5300 | `distek-eclipse-5300` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek BIOne Bioreactor | `distek-bione-bioreactor` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Distek BIOne Fermentor | `distek-bione-fermentor` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Controlador de bioprocesos BIOne 1250 | `distek-bione-1250` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Analizador elemental EA3100 | `eurovector-ea3100` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Sistema de mezcla BIOne | `distek-bione-mixing-system` | OK — 1 PDF verificado | N/A — un solo modelo o código publicado. |
| Digestor ColdBlock Pro Series CBL | `coldblock-pro-series-cbl` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Digestor ColdBlock Pro Series CBM | `coldblock-pro-series-cbm` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Digestor ColdBlock Pro Series CBS | `coldblock-pro-series-cbs` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Analizador de flujo continuo Skalar SAN++® | `skalar-serie-san-plus-plus` | OK — sin PDF enlazado | OK — variantes/configuraciones explicadas en la ficha. |
| Analizador discreto de agua Skalar BLUVISION® | `skalar-bluvision` | OK — sin PDF enlazado | OK — configuraciones/aplicaciones de la serie explicadas. |
| Analizador robótico Skalar SP2000 | `skalar-sp2000-series` | OK — sin PDF enlazado | OK — variantes/configuraciones explicadas en la ficha. |
| Analizadores TOC/TN FORMACS™ | `skalar-formacs-series` | OK — sin PDF enlazado | OK — variantes/configuraciones explicadas en la ficha. |
| Analizadores de sólidos PRIMACS™ | `skalar-primacs-series` | OK — sin PDF enlazado | OK — variantes/configuraciones explicadas en la ficha. |
| Analizador discreto Gallery / Gallery Plus | `thermo-gallery-discrete-analyzer` | OK — 3 PDFs verificados | OK — Gallery / Gallery Plus comparados por capacidad y rendimiento. |
| Analizador discreto Gallery Aqua Master / Plus | `thermo-gallery-aqua-master` | OK — 1 PDF verificado | OK — Aqua Master / Plus diferenciados por capacidad y rendimiento. |
| Cromatógrafo de gases TRACE 1600 / 1610 | `thermo-trace-1600-series` | OK — 2 PDFs verificados | OK — TRACE 1600 / 1610 diferenciados por interfaz. |
| Espectrómetro de masa de cuadrupolo simple ISQ EC | `thermo-isq-ec` | OK — 2 PDFs verificados | OK — IC/LC se distinguen por el sistema de acoplamiento; sin diferencia de hardware documentada. |
| Espectrómetro de masa de cuadrupolo simple ISQ EM | `thermo-isq-em` | OK — 2 PDFs verificados | OK — ESI frente a fuente dual HESI/APCI explicada. |
| Detector electroquímico Dionex ICS-6000 ED | `thermo-ics6000-detector` | OK — sin PDF enlazado | N/A — un solo modelo o código publicado. |
| Celdas de extracción Dionex ASE 150/350 | `thermo-dionex-ase-celdas` | OK — sin PDF enlazado | N/A — consumibles por volumen/paquete para sistemas compatibles. |

## Casos que requieren fuente antes de corregir

| Ficha | Motivo de la revisión pendiente |
|---|---|
| Humedad MCA110 | Indica valores “según modelo” sin identificar los modelos ni asignar las diferencias. |
| Ultrasónico USC-M | Indica capacidades y potencias “según modelo” sin una relación modelo-especificación. |
| Horno DON-H | Publica varias capacidades pero no asigna cada capacidad/estante/potencia a un código. |
| Liofilizador LYO60B | Publica dos áreas de liofilización sin asociarlas explícitamente a un modelo. |
| Campana de PP FMH-P | Enumera P1200A/P1500A/P1800A y tres caudales, pero no los empareja de forma explícita. |
| Rodillo DHT / DBR | Agrupa DHT/DBR sin exponer una comparación explícita por modelo. |
| Mezclador tipo V DVM | Presenta una serie DVM sin una diferenciación modelo a modelo visible. |
| Horno de secado DDO | Agrupa DDO/DDOG/DDOH(L)/DDO101-202 sin una comparación visible por modelo. |

## Corrección ya realizada

- **Hanon D50/D200:** se corrigió el enlace para usar `hanon-d50-d200-ficha-tecnica.pdf`, cuyo contenido coincide con el PDF fuente de Hanon (SHA-256 verificado).
- Se agregó una tabla comparativa: D200 usa disco automático de 120 posiciones (con variante de 40 solo para D200) y D50 usa disco automático de 60 posiciones. Las especificaciones comunes se muestran sin atribuir diferencias no documentadas.
