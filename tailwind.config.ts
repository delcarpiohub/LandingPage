import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D6532B",
          strong: "#B54725",
          foreground: "#ffffff",
        },
        ink: {
          DEFAULT: "#333333",
          dark: "#4A5560",
          muted: "#666666",
          soft: "#8A8A8A",
          bg: "#F4F4F4",
          surface: "#FFFFFF",
          border: "#E8E8E8",
          borderStrong: "#D0C8C0",
        },
        secondary: {
          DEFAULT: "#707E83",
        },
        sector: {
          alimentos: "#FBE369",
          mineria: "#D6532B",
          farmaceutica: "#333333",
          aguas: "#53843A",
          ambiental: "#53843A",
          academia: "#4A5560",
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
      boxShadow: {
        btn: "0 4px 14px rgba(214, 83, 43, 0.35)",
        card: "0 2px 12px rgba(74, 85, 96, 0.10)",
        nav: "0 1px 8px rgba(74, 85, 96, 0.12)",
        soft: "0 2px 8px rgba(74, 85, 96, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
