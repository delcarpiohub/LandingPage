// Fuente única de las marcas representadas por Del Carpio. La usan tanto la
// franja del home (src/components/sections/lab-photos.tsx) como la grilla de
// /marcas (src/components/marcas/marcas-grid.tsx) — para agregar, quitar o
// reemplazar una marca solo hay que editar este archivo, en ningún otro
// lugar. Logos reales en public/marcas/ (ver public/marcas/README.md):
// entregados por el cliente, nunca logos de plantilla.
export type Brand = {
  name: string;
  logo: string;
  width: number;
  height: number;
  className: string;
};

export const brands: Brand[] = [
  {
    name: "Thermo Fisher Scientific",
    logo: "/marcas/thermo-fisher-scientific.png",
    width: 3840,
    height: 864,
    className: "max-h-9 max-w-[132px] md:max-h-10 md:max-w-[150px]",
  },
  {
    name: "Milestone",
    logo: "/marcas/milestone.png",
    width: 800,
    height: 198,
    className: "max-h-9 max-w-[126px] md:max-h-10 md:max-w-[150px]",
  },
  {
    name: "Restek",
    logo: "/marcas/restek.png",
    width: 301,
    height: 96,
    className: "max-h-9 max-w-[116px] md:max-h-10 md:max-w-[132px]",
  },
  {
    name: "Suez",
    logo: "/marcas/suez.png",
    width: 900,
    height: 269,
    className: "max-h-9 max-w-[124px] md:max-h-10 md:max-w-[144px]",
  },
  {
    name: "Distek",
    logo: "/marcas/distek.png",
    width: 356,
    height: 146,
    className: "max-h-9 max-w-[112px] md:max-h-10 md:max-w-[130px]",
  },
  {
    name: "Infitek",
    logo: "/marcas/infitek.png",
    width: 180,
    height: 180,
    className: "max-h-10 max-w-[86px] md:max-h-11 md:max-w-[96px]",
  },
  {
    name: "JS Cartmay",
    logo: "/marcas/js-cartmay.png",
    width: 1000,
    height: 1000,
    className: "max-h-11 max-w-[76px] md:max-h-12 md:max-w-[84px]",
  },
];
