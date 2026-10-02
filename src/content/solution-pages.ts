// Mapa de compatibilidad equipo-industria. Hasta 2026-10-02 respaldaba las
// páginas propias `/soluciones/[industria]` (eliminadas por decisión de
// jefatura — ver AGENTS.md y docs/archivo-soluciones-por-industria-2026-10.md);
// hoy alimenta únicamente las secciones por sector del mega-menú de
// navegación (`src/content/mega-menu-data.ts`).
//
// Slugs de `mockProducts` con compatibilidad TEXTUAL EXPLÍCITA con cada
// industria (mención literal en description/subtitle/advantages/tags/
// aplicaciones) — no solo coincidencia de categoría. Auditado a mano
// producto por producto el 2026-08-17; ver .agent-log/sessions.md para el
// detalle de la metodología y la lista de exclusiones.
export const compatibleEquipmentByIndustry: Record<string, string[]> = {
  alimentos: [
    "hanon-k1160",
    "hanon-k9860",
    "hanon-k9840",
    "hanon-k1100f",
    "hanon-sh420f",
    "hanon-sh520",
    "hanon-sox606",
    "hanon-sox406",
    "hanon-sh220f",
    "infitek-lyo60b-series",
    "decent-mezclador-tipo-v",
  ],
  mineria: [
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
    "decent-trituradora-doble-rodillo",
    "decent-hornos-secado",
    "decent-mezclador-tipo-v",
  ],
  farmaceutica: [
    "hanon-k1160",
    "hanon-k9840",
    "hanon-sh220f",
    "hanon-sh420f",
    "hanon-sh520",
    "infitek-pr5-series",
    "decent-mezclador-tipo-v",
  ],
  aguas: [
    "infitek-cod-analyzer",
    "infitek-bep-m300f",
    "te-instruments-xplorer-aox-tox",
    "milestone-ethos-up",
    "hanon-k9840",
  ],
  ambiental: [
    "hanon-k1160",
    "hanon-k9860",
    "hanon-k9840",
    "hanon-sox606",
    "hanon-sh220f",
    "hanon-sh420f",
    "hanon-k1100f",
    "hanon-sh520",
    "hanon-s402",
    "milestone-ethos-up",
    "te-instruments-xplorer-aox-tox",
    "te-instruments-vectra",
    "infitek-cod-analyzer",
    "infitek-bep-m300f",
  ],
  "academia-id": [
    "hanon-k1160",
    "te-instruments-vectra",
    "te-instruments-newton",
    "infitek-cod-analyzer",
    "infitek-bep-m300f",
    "decent-drsd05",
    "decent-drsd40",
  ],
};
