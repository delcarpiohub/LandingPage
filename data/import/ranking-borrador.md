# Ranking de marcas y orden "Destacados" — borrador (2026-11-11)

Documento informativo, generado a partir de `mockProducts` y `sortFeatured`
(`src/lib/catalog-sort.ts`) con los datos reales del catálogo en esta rama.
**No se importa en código** — es insumo para que jefatura decida si vale la
pena ampliar `catalogBrandOrder` / `catalogProductPriority` /
`catalogCategoryOrder` (`src/content/catalog-order.ts`) a más filtros.

Todo lo que aparece abajo es orden **de hoy**: solo "Área farmacéutica"
usa la lista explícita nueva; el resto de categorías y marcas siguen
cayendo a prioridad editorial (solo 6 fichas Thermo la tienen) y, a falta
de prioridad, al orden de inserción en `mock-products.ts` — no es un orden
curado, es el que el sitio muestra hoy.

## 1. Marcas (fichas publicadas por marca)

| Marca | Fichas publicadas |
|---|---|
| Hanon | 15 |
| Milestone | 13 |
| Restek | 5 |
| Infitek | 12 |
| Hyperpurex | 8 |
| Distek | 11 |
| EuroVector | 1 |
| ColdBlock | 3 |
| Skalar | 5 |
| Trace Elemental | 10 |
| Decent | 24 |
| Thermo Scientific | 34 |
| Sievers | 6 |
| (sin `detail.brand`) | 0 |

## 2. Primeros 12 por categoría/filtro (orden actual)

### Análisis elemental (27 publicados)

1. iCAP TQs ICP-MS — `thermo-icap-tqs` — Thermo Scientific
2. iCAP TQe ICP-MS — `thermo-icap-tqe` — Thermo Scientific
3. iCAP PRO / iCAP PRO X ICP-OES Radial — `thermo-icap-pro-radial` — Thermo Scientific
4. iCAP PRO XPS ICP-OES — `thermo-icap-pro-xps` — Thermo Scientific
5. iCAP PRO XP ICP-OES — `thermo-icap-pro-xp` — Thermo Scientific
6. Element Series HR-ICP-MS — `thermo-element-series` — Thermo Scientific
7. Analizador Kjeldahl automático K1160 — `hanon-k1160` — Hanon
8. Analizador Kjeldahl automático K9860 — `hanon-k9860` — Hanon
9. Analizador Kjeldahl K9840 — `hanon-k9840` — Hanon
10. Digestor Kjeldahl bloque de grafito SH420F — `hanon-sh420f` — Hanon
11. Analizador Kjeldahl automático K1100F — `hanon-k1100f` — Hanon
12. Digestor automático Kjeldahl SH520/SH508 — `hanon-sh520` — Hanon

### Cromatografía (12 publicados)

1. Columnas capilares de sílice fundida Restek — `restek/columnas-capilares-silice-fundida` — Restek
2. Analytical LC Columns Restek — `restek/analytical-lc-columns` — Restek
3. Viales con filtro Restek — `restek/viales-con-filtro` — Restek
4. Columnas de protección HPLC Restek — `restek/columnas-proteccion` — Restek
5. Cromatógrafo de gases TRACE 1600 / 1610 — `thermo-trace-1600-series` — Thermo Scientific
6. Dionex™ ICS-6000 Standard Bore and Microbore HPIC™ Systems — `thermo-dionex-ics-6000-hpic` — Thermo Scientific
7. Detector electroquímico Dionex ICS-6000 ED — `thermo-ics6000-detector` — Thermo Scientific
8. Dionex™ Inuvion™ IC System — `thermo-dionex-inuvion` — Thermo Scientific
9. Vanquish™ Horizon UHPLC System — `thermo-vanquish-horizon` — Thermo Scientific
10. Vanquish™ Flex UHPLC Systems — `thermo-vanquish-flex` — Thermo Scientific
11. Muestreador automático para líquidos TriPlus 100 LS — `thermo-triplus-100-ls` — Thermo Scientific
12. Kit de estándares de pesticidas de Arizona Restek — `restek-kit-pesticidas-arizona` — Restek

### Espectrometría de masa (15 publicados)

1. ISQ 7610 Single Quadrupole GC-MS — `thermo-isq7610` — Thermo Scientific
2. Orbitrap IQ-X Tribrid Mass Spectrometer — `thermo-orbitrap-iqx` — Thermo Scientific
3. Orbitrap Exploris GC Mass Spectrometer — `thermo-orbitrap-exploris-gc` — Thermo Scientific
4. Orbitrap Exploris Mass Spectrometer — `thermo-orbitrap-exploris` — Thermo Scientific
5. Orbitrap Astral Mass Spectrometer — `thermo-orbitrap-astral` — Thermo Scientific
6. Orbitrap Eclipse Tribrid Mass Spectrometer — `thermo-orbitrap-eclipse-tribrid` — Thermo Scientific
7. Q Exactive Plus Hybrid Quadrupole-Orbitrap Mass Spectrometer — `thermo-q-exactive-plus` — Thermo Scientific
8. TSQ Quantis Plus Triple Quadrupole Mass Spectrometer — `thermo-tsq-quantis-plus` — Thermo Scientific
9. TSQ Altis Plus Triple Quadrupole Mass Spectrometer — `thermo-tsq-altis-plus` — Thermo Scientific
10. TSQ Fortis Plus Triple Quadrupole Mass Spectrometer — `thermo-tsq-fortis-plus` — Thermo Scientific
11. DELTA Q Isotope Ratio Mass Spectrometer — `thermo-delta-q-irms` — Thermo Scientific
12. Espectrómetro de masa de cuadrupolo simple ISQ EC — `thermo-isq-ec` — Thermo Scientific

### Preparación de muestras (50 publicados)

1. EXTREVA ASE Accelerated Solvent Extractor — `thermo-extreva-ase` — Thermo Scientific
2. Extractor Soxhlet automático SOX606 — `hanon-sox606` — Hanon
3. Digestor Kjeldahl bloque de grafito SH220F — `hanon-sh220f` — Hanon
4. Analizador de grasa SOX406 — `hanon-sox406` — Hanon
5. Analizador de fibra F800 — `hanon-f800` — Hanon
6. Sistema de digestión por microondas ETHOS UP — `milestone-ethos-up` — Milestone
7. Viales con filtro Restek — `restek/viales-con-filtro` — Restek
8. Liofilizador LYO60B — `infitek-lyo60b-series` — Infitek
9. Cargador de crisoles DEPL25 / DEPL50 — `decent-cargador-electrico-crisoles` — Decent
10. Cargador de crisoles DMPL25 / DMPL50 — `decent-cargador-manual-crisoles` — Decent
11. Copelas de magnesia Serie 2X–14 — `decent-copelas-magnesio` — Decent
12. Dosificador de flux DAFS84 — `decent-dosificador-automatico-litargirio` — Decent

### Automatización (32 publicados)

1. Analizador Kjeldahl automático K1160 — `hanon-k1160` — Hanon
2. Analizador Kjeldahl automático K9860 — `hanon-k9860` — Hanon
3. Analizador Kjeldahl K9840 — `hanon-k9840` — Hanon
4. Extractor Soxhlet automático SOX606 — `hanon-sox606` — Hanon
5. Digestor Kjeldahl bloque de grafito SH220F — `hanon-sh220f` — Hanon
6. Digestor Kjeldahl bloque de grafito SH420F — `hanon-sh420f` — Hanon
7. Analizador Kjeldahl automático K1100F — `hanon-k1100f` — Hanon
8. Digestor automático Kjeldahl SH520/SH508 — `hanon-sh520` — Hanon
9. Sistema de agotamiento de gases S402 — `hanon-s402` — Hanon
10. Analizador de fibra F800 — `hanon-f800` — Hanon
11. Analizador Dumas D50/D200 — `hanon-d50-d200` — Hanon
12. Analizador elemental orgánico E500 — `hanon-e500` — Hanon

### Bioprocesos (4 publicados)

1. Distek BIOne Bioreactor — `distek-bione-bioreactor` — Distek
2. Distek BIOne Fermentor — `distek-bione-fermentor` — Distek
3. Controlador de bioprocesos BIOne 1250 — `distek-bione-1250` — Distek
4. Sistema de mezcla BIOne — `distek-bione-mixing-system` — Distek

### Área farmacéutica (15 publicados) — usa orden explícito desde esta tarea

1. Probador de desintegración sin baño sensIR 3200 — `distek-sensir-3200` — Distek
2. Distek OLERA — `distek-olera` — Distek
3. Distek OLERA Plus — `distek-olera-plus` — Distek
4. Distek OLERA Select — `distek-olera-select` — Distek
5. Distek Eclipse 5300 — `distek-eclipse-5300` — Distek
6. Distek Opt-Diss 410 — `distek-opt-diss-410` — Distek
7. Titulador Karl Fischer TITR-50VC — `infitek-titr-50vc` — Infitek
8. Analizador Kjeldahl automático K1160 — `hanon-k1160` — Hanon
9. Analizador Kjeldahl automático K9860 — `hanon-k9860` — Hanon
10. Analizador Kjeldahl automático K1100F — `hanon-k1100f` — Hanon
11. Digestor Kjeldahl bloque de grafito SH420F — `hanon-sh420f` — Hanon
12. Analizador elemental orgánico E500 — `hanon-e500` — Hanon

*(los 3 restantes, no mostrados por el tope de 12: iCAP PRO XP, Gallery Enzyme
Master y easyFILL — este último no figura en el listado de 15 porque su
`filters` propio no incluye "Área farmacéutica" hoy; aparece en la lista
explícita de `catalogCategoryOrder` pero, igual que iCAP PRO XP, no se
mostrará dentro del filtro hasta que también se le agregue esa etiqueta —
ver nota en `src/content/catalog-order.ts` y "Faltantes y dudas" del
reporte de esta tarea.)*

### Equipamiento menor (8 publicados)

1. Humedad MCA110 — `infitek-mca-series` — Infitek
2. Ultrasónico USC-M — `infitek-usc-m-series` — Infitek
3. Horno DON-H — `infitek-don-h-series` — Infitek
4. Campana sin ductos FMH — `infitek-fmh-series` — Infitek
5. Campana de PP FMH-P — `infitek-fmh-pa-series` — Infitek
6. Baño de agua WB-1R2H-7 — `infitek-wb-series` — Infitek
7. Refrigerador PR5-1500 — `infitek-pr5-series` — Infitek
8. Horno de secado DDO — `decent-hornos-secado` — Decent

### Equipamiento analítico (49 publicados)

1. iCAP TQs ICP-MS — `thermo-icap-tqs` — Thermo Scientific
2. iCAP TQe ICP-MS — `thermo-icap-tqe` — Thermo Scientific
3. iCAP PRO / iCAP PRO X ICP-OES Radial — `thermo-icap-pro-radial` — Thermo Scientific
4. iCAP PRO XPS ICP-OES — `thermo-icap-pro-xps` — Thermo Scientific
5. iCAP PRO XP ICP-OES — `thermo-icap-pro-xp` — Thermo Scientific
6. Element Series HR-ICP-MS — `thermo-element-series` — Thermo Scientific
7. ISQ 7610 Single Quadrupole GC-MS — `thermo-isq7610` — Thermo Scientific
8. Gallery Enzyme Master — `thermo-gallery-enzyme-master` — Thermo Scientific
9. EXTREVA ASE Accelerated Solvent Extractor — `thermo-extreva-ase` — Thermo Scientific
10. Orbitrap IQ-X Tribrid Mass Spectrometer — `thermo-orbitrap-iqx` — Thermo Scientific
11. Orbitrap Exploris GC Mass Spectrometer — `thermo-orbitrap-exploris-gc` — Thermo Scientific
12. Orbitrap Exploris Mass Spectrometer — `thermo-orbitrap-exploris` — Thermo Scientific

### Minería (18 publicados)

1. Sistema de digestión por microondas ETHOS UP — `milestone-ethos-up` — Milestone
2. Cargador de crisoles DEPL25 / DEPL50 — `decent-cargador-electrico-crisoles` — Decent
3. Cargador de crisoles DMPL25 / DMPL50 — `decent-cargador-manual-crisoles` — Decent
4. Copelas de magnesia Serie 2X–14 — `decent-copelas-magnesio` — Decent
5. Dosificador de flux DAFS84 — `decent-dosificador-automatico-litargirio` — Decent
6. Horno de cupelación DE-50CF / DE-100CF / DE-168CF — `decent-hornos-cupelacion` — Decent
7. Horno de cupelación DE-100CF-1500 — `decent-horno-copelacion-alta-temperatura` — Decent
8. Horno de fusión DE-20FF / DE-25FF — `decent-hornos-fusion-ensayo-fuego` — Decent
9. Mezclador DPT25 / DPT50 / DPT84 — `decent-mezclador-crisoles` — Decent
10. Molino DP1000 — `decent-molino-pulverizador-dp1000` — Decent
11. Divisor giratorio DRSD05 — `decent-drsd05` — Decent
12. Divisor rotativo DRSD40 — `decent-drsd40` — Decent

### Análisis de agua (23 publicados)

1. Analizador de DQO COD-100B — `infitek-cod-analyzer` — Infitek
2. Multiparamétrico BEP-M300F — `infitek-bep-m300f` — Infitek
3. Medidor pH PH-B100BD — `infitek-ph-b100bd` — Infitek
4. Halógenos XplorerPlus AOX/TOX — `te-instruments-xplorer-aox-tox` — Trace Elemental
5. Nitrógeno XplorerPlus TN — `te-instruments-xplorer-tn` — Trace Elemental
6. Hyperpurex EUE — `hyperpurex-serie-eue` — Hyperpurex
7. Hyperpurex SU Smart — `hyperpurex-serie-su-smart` — Hyperpurex
8. Hyperpurex LU Discovery — `hyperpurex-serie-lu-discovery` — Hyperpurex
9. Hyperpurex X Flagship — `hyperpurex-serie-x-flagship` — Hyperpurex
10. Hyperpurex P Pursuit — `hyperpurex-serie-p-pursuit` — Hyperpurex
11. Hyperpurex FX Flagship — `hyperpurex-serie-fx-flagship` — Hyperpurex
12. Hyperpurex FE Eminent — `hyperpurex-serie-fe-eminente` — Hyperpurex

### Purificadores de agua (8 publicados)

1. Hyperpurex EUE — `hyperpurex-serie-eue` — Hyperpurex
2. Hyperpurex SU Smart — `hyperpurex-serie-su-smart` — Hyperpurex
3. Hyperpurex LU Discovery — `hyperpurex-serie-lu-discovery` — Hyperpurex
4. Hyperpurex X Flagship — `hyperpurex-serie-x-flagship` — Hyperpurex
5. Hyperpurex P Pursuit — `hyperpurex-serie-p-pursuit` — Hyperpurex
6. Hyperpurex FX Flagship — `hyperpurex-serie-fx-flagship` — Hyperpurex
7. Hyperpurex FE Eminent — `hyperpurex-serie-fe-eminente` — Hyperpurex
8. Hyperpurex FS Smart — `hyperpurex-serie-fs-smart` — Hyperpurex

### Trace Elemental (4 publicados)

1. Halógenos XplorerPlus AOX/TOX — `te-instruments-xplorer-aox-tox` — Trace Elemental
2. Nitrógeno XplorerPlus TN — `te-instruments-xplorer-tn` — Trace Elemental
3. Autosampler VECTRA — `te-instruments-vectra` — Trace Elemental
4. Autosampler NEWTON — `te-instruments-newton` — Trace Elemental

### Fire Assay (8 publicados)

1. Cargador de crisoles DEPL25 / DEPL50 — `decent-cargador-electrico-crisoles` — Decent
2. Cargador de crisoles DMPL25 / DMPL50 — `decent-cargador-manual-crisoles` — Decent
3. Copelas de magnesia Serie 2X–14 — `decent-copelas-magnesio` — Decent
4. Dosificador de flux DAFS84 — `decent-dosificador-automatico-litargirio` — Decent
5. Horno de cupelación DE-50CF / DE-100CF / DE-168CF — `decent-hornos-cupelacion` — Decent
6. Horno de cupelación DE-100CF-1500 — `decent-horno-copelacion-alta-temperatura` — Decent
7. Horno de fusión DE-20FF / DE-25FF — `decent-hornos-fusion-ensayo-fuego` — Decent
8. Mezclador DPT25 / DPT50 / DPT84 — `decent-mezclador-crisoles` — Decent

### Alimentos (11 publicados)

1. Analizador Kjeldahl automático K1160 — `hanon-k1160` — Hanon
2. Analizador Kjeldahl automático K9860 — `hanon-k9860` — Hanon
3. Analizador Kjeldahl K9840 — `hanon-k9840` — Hanon
4. Extractor Soxhlet automático SOX606 — `hanon-sox606` — Hanon
5. Digestor Kjeldahl bloque de grafito SH220F — `hanon-sh220f` — Hanon
6. Digestor Kjeldahl bloque de grafito SH420F — `hanon-sh420f` — Hanon
7. Analizador Kjeldahl automático K1100F — `hanon-k1100f` — Hanon
8. Digestor automático Kjeldahl SH520/SH508 — `hanon-sh520` — Hanon
9. Analizador de grasa SOX406 — `hanon-sox406` — Hanon
10. Liofilizador LYO60B — `infitek-lyo60b-series` — Infitek
11. Mezclador tipo V DVM — `decent-mezclador-tipo-v` — Decent

### Ambiental (14 publicados)

1. Analizador Kjeldahl automático K1160 — `hanon-k1160` — Hanon
2. Analizador Kjeldahl automático K9860 — `hanon-k9860` — Hanon
3. Analizador Kjeldahl K9840 — `hanon-k9840` — Hanon
4. Extractor Soxhlet automático SOX606 — `hanon-sox606` — Hanon
5. Digestor Kjeldahl bloque de grafito SH220F — `hanon-sh220f` — Hanon
6. Digestor Kjeldahl bloque de grafito SH420F — `hanon-sh420f` — Hanon
7. Analizador Kjeldahl automático K1100F — `hanon-k1100f` — Hanon
8. Digestor automático Kjeldahl SH520/SH508 — `hanon-sh520` — Hanon
9. Sistema de agotamiento de gases S402 — `hanon-s402` — Hanon
10. Sistema de digestión por microondas ETHOS UP — `milestone-ethos-up` — Milestone
11. Analizador de DQO COD-100B — `infitek-cod-analyzer` — Infitek
12. Multiparamétrico BEP-M300F — `infitek-bep-m300f` — Infitek

### Academia / I+D (7 publicados)

1. Analizador Kjeldahl automático K1160 — `hanon-k1160` — Hanon
2. Analizador de DQO COD-100B — `infitek-cod-analyzer` — Infitek
3. Multiparamétrico BEP-M300F — `infitek-bep-m300f` — Infitek
4. Autosampler VECTRA — `te-instruments-vectra` — Trace Elemental
5. Autosampler NEWTON — `te-instruments-newton` — Trace Elemental
6. Divisor giratorio DRSD05 — `decent-drsd05` — Decent
7. Divisor rotativo DRSD40 — `decent-drsd40` — Decent

### Marcas (filtros de marca del mega-menú/sidebar)

*("Marcas" como categoría agrupa estos 13 sub-filtros; no es un listado
plano propio.)*

#### Marca · Hanon (15 publicados)

1. Analizador Kjeldahl automático K1160 — `hanon-k1160` — Hanon
2. Analizador Kjeldahl automático K9860 — `hanon-k9860` — Hanon
3. Analizador Kjeldahl K9840 — `hanon-k9840` — Hanon
4. Extractor Soxhlet automático SOX606 — `hanon-sox606` — Hanon
5. Digestor Kjeldahl bloque de grafito SH220F — `hanon-sh220f` — Hanon
6. Digestor Kjeldahl bloque de grafito SH420F — `hanon-sh420f` — Hanon
7. Analizador Kjeldahl automático K1100F — `hanon-k1100f` — Hanon
8. Digestor automático Kjeldahl SH520/SH508 — `hanon-sh520` — Hanon
9. Sistema de agotamiento de gases S402 — `hanon-s402` — Hanon
10. Analizador de grasa SOX406 — `hanon-sox406` — Hanon
11. Analizador de fibra F800 — `hanon-f800` — Hanon
12. Analizador Dumas D50/D200 — `hanon-d50-d200` — Hanon

#### Marca · Milestone (13 publicados)

1. Sistema de digestión por microondas ETHOS UP — `milestone-ethos-up` — Milestone
2. Sistema de digestión por microondas ETHOS EASY — `milestone-ethos-easy` — Milestone
3. Sistema de digestión por microondas compacto ETHOS LEAN — `milestone-ethos-lean` — Milestone
4. Sistema de extracción por microondas ETHOS X — `milestone-ethos-x` — Milestone
5. Sistema de extracción por microondas ETHOS X 2.0 — `milestone-ethos-x-2-0` — Milestone
6. Sistema de extracción por microondas ETHOS XL — `milestone-ethos-xl` — Milestone
7. Analizador directo de mercurio DMA-80 evo Tricell — `milestone-dma-80-evo-tricell` — Milestone
8. Insertos para análisis de ultra trazas con bajos niveles de blanco — `milestone-insertos-ultra-trazas` — Milestone
9. Sistema de destilación por sub-ebullición duoPUR y subPUR — `milestone-duopur-subpur` — Milestone
10. Estación de dosificación automatizada easyFILL — `milestone-easyfill` — Milestone
11. Sistema de digestión por microondas ultraCLAVE — `milestone-ultraclave` — Milestone
12. Sistema de digestión por microondas ultraWAVE — `milestone-ultrawave` — Milestone

#### Marca · Restek (5 publicados)

1. Columnas capilares de sílice fundida Restek — `restek/columnas-capilares-silice-fundida` — Restek
2. Analytical LC Columns Restek — `restek/analytical-lc-columns` — Restek
3. Viales con filtro Restek — `restek/viales-con-filtro` — Restek
4. Columnas de protección HPLC Restek — `restek/columnas-proteccion` — Restek
5. Kit de estándares de pesticidas de Arizona Restek — `restek-kit-pesticidas-arizona` — Restek

#### Marca · Infitek (12 publicados)

1. Analizador de DQO COD-100B — `infitek-cod-analyzer` — Infitek
2. Multiparamétrico BEP-M300F — `infitek-bep-m300f` — Infitek
3. Humedad MCA110 — `infitek-mca-series` — Infitek
4. Medidor pH PH-B100BD — `infitek-ph-b100bd` — Infitek
5. Ultrasónico USC-M — `infitek-usc-m-series` — Infitek
6. Horno DON-H — `infitek-don-h-series` — Infitek
7. Liofilizador LYO60B — `infitek-lyo60b-series` — Infitek
8. Campana sin ductos FMH — `infitek-fmh-series` — Infitek
9. Campana de PP FMH-P — `infitek-fmh-pa-series` — Infitek
10. Baño de agua WB-1R2H-7 — `infitek-wb-series` — Infitek
11. Refrigerador PR5-1500 — `infitek-pr5-series` — Infitek
12. Titulador Karl Fischer TITR-50VC — `infitek-titr-50vc` — Infitek

#### Marca · Hyperpurex (8 publicados)

1. Hyperpurex EUE — `hyperpurex-serie-eue` — Hyperpurex
2. Hyperpurex SU Smart — `hyperpurex-serie-su-smart` — Hyperpurex
3. Hyperpurex LU Discovery — `hyperpurex-serie-lu-discovery` — Hyperpurex
4. Hyperpurex X Flagship — `hyperpurex-serie-x-flagship` — Hyperpurex
5. Hyperpurex P Pursuit — `hyperpurex-serie-p-pursuit` — Hyperpurex
6. Hyperpurex FX Flagship — `hyperpurex-serie-fx-flagship` — Hyperpurex
7. Hyperpurex FE Eminent — `hyperpurex-serie-fe-eminente` — Hyperpurex
8. Hyperpurex FS Smart — `hyperpurex-serie-fs-smart` — Hyperpurex

#### Marca · Distek (11 publicados)

1. Distek ezfill+ — `distek-ezfill-plus` — Distek
2. Distek OLERA — `distek-olera` — Distek
3. Distek OLERA Plus — `distek-olera-plus` — Distek
4. Distek OLERA Select — `distek-olera-select` — Distek
5. Distek Opt-Diss 410 — `distek-opt-diss-410` — Distek
6. Distek Eclipse 5300 — `distek-eclipse-5300` — Distek
7. Distek BIOne Bioreactor — `distek-bione-bioreactor` — Distek
8. Distek BIOne Fermentor — `distek-bione-fermentor` — Distek
9. Controlador de bioprocesos BIOne 1250 — `distek-bione-1250` — Distek
10. Sistema de mezcla BIOne — `distek-bione-mixing-system` — Distek
11. Probador de desintegración sin baño sensIR 3200 — `distek-sensir-3200` — Distek

#### Marca · EuroVector (1 publicados)

1. Analizador elemental EA3100 — `eurovector-ea3100` — EuroVector

#### Marca · ColdBlock (3 publicados)

1. Digestor ColdBlock Pro Series CBL — `coldblock-pro-series-cbl` — ColdBlock
2. Digestor ColdBlock Pro Series CBM — `coldblock-pro-series-cbm` — ColdBlock
3. Digestor ColdBlock Pro Series CBS — `coldblock-pro-series-cbs` — ColdBlock

#### Marca · Skalar (5 publicados)

1. Analizador de flujo continuo Skalar SAN++® — `skalar-serie-san-plus-plus` — Skalar
2. Analizador discreto de agua Skalar BLUVISION® — `skalar-bluvision` — Skalar
3. Analizador robótico Skalar SP2000 — `skalar-sp2000-series` — Skalar
4. Analizadores TOC/TN FORMACS™ — `skalar-formacs-series` — Skalar
5. Analizadores de sólidos PRIMACS™ — `skalar-primacs-series` — Skalar

#### Marca · Trace Elemental (10 publicados)

1. Halógenos XplorerPlus AOX/TOX — `te-instruments-xplorer-aox-tox` — Trace Elemental
2. Nitrógeno XplorerPlus TN — `te-instruments-xplorer-tn` — Trace Elemental
3. Autosampler VECTRA — `te-instruments-vectra` — Trace Elemental
4. Autosampler NEWTON — `te-instruments-newton` — Trace Elemental
5. Muestreador automático de columnas TUSCAN AOX/TOX — `te-instruments-tuscan` — Trace Elemental
6. Analizador TOC/TNb Xpert — `te-instruments-xpert-toc-tnb` — Trace Elemental
7. Analizador de azufre total Xplorer-S — `te-instruments-xplorer-s` — Trace Elemental
8. Analizador de cloruro y azufre total Xplorer TX/TS — `te-instruments-xplorer-tx-ts` — Trace Elemental
9. Analizador de nitrógeno y azufre total Xplorer-NS — `te-instruments-xplorer-ns` — Trace Elemental
10. Analizador vertical de nitrógeno y azufre Xplorer-V NS — `te-instruments-xplorer-v-ns` — Trace Elemental

#### Marca · Decent (24 publicados)

1. Cargador de crisoles DEPL25 / DEPL50 — `decent-cargador-electrico-crisoles` — Decent
2. Cargador de crisoles DMPL25 / DMPL50 — `decent-cargador-manual-crisoles` — Decent
3. Copelas de magnesia Serie 2X–14 — `decent-copelas-magnesio` — Decent
4. Dosificador de flux DAFS84 — `decent-dosificador-automatico-litargirio` — Decent
5. Horno de cupelación DE-50CF / DE-100CF / DE-168CF — `decent-hornos-cupelacion` — Decent
6. Horno de cupelación DE-100CF-1500 — `decent-horno-copelacion-alta-temperatura` — Decent
7. Horno de fusión DE-20FF / DE-25FF — `decent-hornos-fusion-ensayo-fuego` — Decent
8. Mezclador DPT25 / DPT50 / DPT84 — `decent-mezclador-crisoles` — Decent
9. Molino DP1000 — `decent-molino-pulverizador-dp1000` — Decent
10. Divisor giratorio DRSD05 — `decent-drsd05` — Decent
11. Divisor rotativo DRSD40 — `decent-drsd40` — Decent
12. Trituradora de martillo de laboratorio — `decent-trituradora-martillo` — Decent

#### Marca · Thermo Scientific (34 publicados)

1. iCAP TQs ICP-MS — `thermo-icap-tqs` — Thermo Scientific
2. iCAP TQe ICP-MS — `thermo-icap-tqe` — Thermo Scientific
3. iCAP PRO / iCAP PRO X ICP-OES Radial — `thermo-icap-pro-radial` — Thermo Scientific
4. iCAP PRO XPS ICP-OES — `thermo-icap-pro-xps` — Thermo Scientific
5. iCAP PRO XP ICP-OES — `thermo-icap-pro-xp` — Thermo Scientific
6. Element Series HR-ICP-MS — `thermo-element-series` — Thermo Scientific
7. ISQ 7610 Single Quadrupole GC-MS — `thermo-isq7610` — Thermo Scientific
8. Gallery Enzyme Master — `thermo-gallery-enzyme-master` — Thermo Scientific
9. EXTREVA ASE Accelerated Solvent Extractor — `thermo-extreva-ase` — Thermo Scientific
10. Orbitrap IQ-X Tribrid Mass Spectrometer — `thermo-orbitrap-iqx` — Thermo Scientific
11. Orbitrap Exploris GC Mass Spectrometer — `thermo-orbitrap-exploris-gc` — Thermo Scientific
12. Orbitrap Exploris Mass Spectrometer — `thermo-orbitrap-exploris` — Thermo Scientific

#### Marca · Sievers (6 publicados)

1. Analizador de COT de Laboratorio Sievers M5310 C — `sievers-m5310-c-laboratorio` — Sievers
2. Analizador de COT en Línea Sievers M5310 C — `sievers-m5310-c-en-linea` — Sievers
3. Analizador de COT Portátil Sievers M5310 C — `sievers-m5310-c-portatil` — Sievers
4. Analizador de carbono orgánico total de laboratorio Sievers InnovOx ES — `sievers-innovox-es` — Sievers
5. CheckPoint Sensor de TOC portátil / en línea Sievers — `sievers-checkpoint` — Sievers
6. Analizador de carbono orgánico total en línea Sievers M500 — `sievers-m500` — Sievers

## 3. Productos con prioridad editorial hoy

- `thermo-dionex-ics-6000-hpic` (prioridad 1) — Dionex™ ICS-6000 Standard Bore and Microbore HPIC™ Systems — Thermo Scientific
- `thermo-dionex-ase-350` (prioridad 1) — Dionex™ ASE™ 350 Accelerated Solvent Extractor — Thermo Scientific
- `thermo-dionex-autotrace-280` (prioridad 1) — Dionex™ AutoTrace™ 280 SPE Instrument — Thermo Scientific
- `thermo-dionex-inuvion` (prioridad 1) — Dionex™ Inuvion™ IC System — Thermo Scientific
- `thermo-vanquish-horizon` (prioridad 1) — Vanquish™ Horizon UHPLC System — Thermo Scientific
- `thermo-vanquish-flex` (prioridad 1) — Vanquish™ Flex UHPLC Systems — Thermo Scientific
