import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D5542B",
          strong: "#B54725",
          foreground: "#ffffff",
        },
        ink: {
          DEFAULT: "#333333",
          dark: "#101820",
          muted: "#666666",
          soft: "#8A8A8A",
          bg: "#F4F4F4",
          surface: "#FFFFFF",
          border: "#E8E8E8",
          borderStrong: "#D0C8C0",
        },
        sector: {
          alimentos: "#FBE369",
          mineria: "#D5542B",
          farmaceutica: "#333333",
          aguas: "#53843A",
          ambiental: "#53843A",
          academia: "#101820",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      maxWidth: {
        site: "980px",
        wide: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;
