import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D5542B",   // terracota — botones, CTAs, links (único color de acción)
          strong: "#B8431E",    // hover/active
          foreground: "#ffffff",
        },
        ink: {
          DEFAULT: "#101820",
          muted: "#5b6870",
          bg: "#f7f9f8",
          surface: "#e6eeeb",
          border: "#d4dfdc",
          borderStrong: "#9fb1ac",
        },
        sector: {
          alimentos:    "#FBE369", // amarillo del logo
          mineria:      "#D5542B", // terracota del logo
          farmaceutica: "#101820", // ink — sin color de marca asignado todavía
          aguas:        "#53843A", // verde oliva del logo
          ambiental:    "#53843A", // verde oliva — igual que aguas por ahora
          academia:     "#101820", // ink — sin color de marca asignado todavía
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        sans:    ["var(--font-geist)", "sans-serif"],
        mono:    ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
