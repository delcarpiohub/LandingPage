// Fuente única de las marcas representadas por Del Carpio. La usan tanto la
// franja del home (src/components/sections/lab-photos.tsx) como la grilla de
// /marcas (src/components/marcas/marcas-grid.tsx). Los logos son los recursos
// entregados en "Marcas Respresentadas" y se muestran siempre contenidos.
export type Brand = {
  name: string;
  logo: string;
  website: string;
  width: number;
  height: number;
  scale?: number;
};

export const brands: Brand[] = [
  {
    name: "Analytika",
    logo: "/marcas/marca-analytika.png.webp",
    website: "https://www.analytika.net/?sl=en",
    width: 555,
    height: 124,
  },
  {
    name: "Coldblock",
    logo: "/marcas/marca-coldblock.png.webp",
    website: "https://coldblock.ca/",
    width: 446,
    height: 133,
  },
  {
    name: "Decent",
    logo: "/marcas/marca-decent.png.webp",
    website: "https://www.decent-group.com/",
    width: 611,
    height: 185,
    scale: 0.92,
  },
  {
    name: "Distek",
    logo: "/marcas/marca-distek.png.webp",
    website: "https://www.distekinc.com/",
    width: 1402,
    height: 340,
    scale: 0.9,
  },
  {
    name: "Eurovector",
    logo: "/marcas/marca-eurovector.png.webp",
    website: "https://www.eurovector.it/",
    width: 707,
    height: 246,
  },
  {
    name: "Hanon",
    logo: "/marcas/marca-hanon.png.webp",
    website: "https://www.hanonlab.com/",
    width: 1744,
    height: 796,
    scale: 0.86,
  },
  {
    name: "Hyperpurex",
    logo: "/marcas/marca-hyperpurex.png.webp",
    website: "https://www.hpurex.com/",
    width: 743,
    height: 201,
  },
  {
    name: "Milestone",
    logo: "/marcas/marca-milestone.png.webp",
    website: "https://www.milestonesrl.com/",
    width: 452,
    height: 111,
  },
  {
    name: "PSA",
    logo: "/marcas/marca-psa.png.webp",
    website: "https://www.psanalytical.com/",
    width: 433,
    height: 226,
    scale: 0.72,
  },
  {
    name: "Restek",
    logo: "/marcas/marca-restek.png.webp",
    website: "https://www.restek.com/en_US/",
    width: 414,
    height: 141,
    scale: 0.86,
  },
  {
    name: "Skalar",
    logo: "/marcas/marca-skalar.png.webp",
    website: "https://www.skalar.com/",
    width: 393,
    height: 98,
  },
  {
    name: "Thermo",
    logo: "/marcas/marca-thermo.png.webp",
    website: "https://www.thermofisher.com/",
    width: 801,
    height: 583,
    scale: 1,
  },
  {
    name: "Trace",
    logo: "/marcas/marca-trace.png.webp",
    website: "https://www.teinstruments.com/",
    width: 914,
    height: 213,
    scale: 0.9,
  },
  {
    name: "Veolia",
    logo: "/marcas/marca-veolia.webp.webp",
    website: "https://www.veoliawatertechnologies.com/",
    width: 1279,
    height: 320,
    scale: 0.9,
  },
];
