// Fuente única de las marcas representadas por Del Carpio. La usan tanto la
// franja del home (src/components/sections/lab-photos.tsx) como la grilla de
// /marcas (src/components/marcas/marcas-grid.tsx). Los logos son los recursos
// entregados en "Marcas Respresentadas" y se muestran siempre contenidos.
export type Brand = {
  name: string;
  logo: string;
  width: number;
  height: number;
  scale?: number;
};

export const brands: Brand[] = [
  {
    name: "Analytika",
    logo: "/marcas/marca-analytika.png.webp",
    width: 555,
    height: 124,
  },
  {
    name: "Coldblock",
    logo: "/marcas/marca-coldblock.png.webp",
    width: 446,
    height: 133,
  },
  {
    name: "Decent",
    logo: "/marcas/marca-decent.png.webp",
    width: 611,
    height: 185,
    scale: 0.92,
  },
  {
    name: "Distek",
    logo: "/marcas/marca-distek.png.webp",
    width: 1402,
    height: 340,
    scale: 0.9,
  },
  {
    name: "Eurovector",
    logo: "/marcas/marca-eurovector.png.webp",
    width: 707,
    height: 246,
  },
  {
    name: "Hanon",
    logo: "/marcas/marca-hanon.png.webp",
    width: 1744,
    height: 796,
    scale: 0.86,
  },
  {
    name: "Hyperpurex",
    logo: "/marcas/marca-hyperpurex.png.webp",
    width: 743,
    height: 201,
  },
  {
    name: "Milestone",
    logo: "/marcas/marca-milestone.png.webp",
    width: 452,
    height: 111,
  },
  {
    name: "PSA",
    logo: "/marcas/marca-psa.png.webp",
    width: 433,
    height: 226,
    scale: 0.72,
  },
  {
    name: "Restek",
    logo: "/marcas/marca-restek.png.webp",
    width: 414,
    height: 141,
    scale: 0.86,
  },
  {
    name: "Skalar",
    logo: "/marcas/marca-skalar.png.webp",
    width: 393,
    height: 98,
  },
  {
    name: "Thermo",
    logo: "/marcas/marca-thermo.png.webp",
    width: 801,
    height: 583,
    scale: 1,
  },
  {
    name: "Trace",
    logo: "/marcas/marca-trace.png.webp",
    width: 914,
    height: 213,
    scale: 0.9,
  },
  {
    name: "Veolia",
    logo: "/marcas/marca-veolia.webp.webp",
    width: 1279,
    height: 320,
    scale: 0.9,
  },
];
