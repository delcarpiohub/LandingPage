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
        mono: ["var(--font-mono)", "sans-serif"],
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
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "gradient-foreground-1": "gradient-foreground-1 8s infinite",
        "gradient-foreground-2": "gradient-foreground-2 8s infinite",
        "gradient-foreground-3": "gradient-foreground-3 8s infinite",
        "gradient-background-1": "gradient-background-1 8s infinite",
        "gradient-background-2": "gradient-background-2 8s infinite",
        "gradient-background-3": "gradient-background-3 8s infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        // Cada palabra alterna gradiente <-> texto plano en un ciclo de 8s
        // dividido en tercios (0-33%, 33-66%, 66-100%), con transiciones
        // suaves de 1/12 de ciclo entre estados.
        "gradient-foreground-1": {
          "0%, 16.667%, 100%": { opacity: "1" },
          "33.333%, 83.333%": { opacity: "0" },
        },
        "gradient-background-1": {
          "0%, 16.667%, 100%": { opacity: "0" },
          "25%, 91.667%": { opacity: "1" },
        },
        "gradient-foreground-2": {
          "0%, 100%": { opacity: "0" },
          "33.333%, 50%": { opacity: "1" },
          "16.667%, 66.667%": { opacity: "0" },
        },
        "gradient-background-2": {
          "0%, 100%": { opacity: "1" },
          "33.333%, 50%": { opacity: "0" },
          "25%, 58.333%": { opacity: "1" },
        },
        "gradient-foreground-3": {
          "0%, 50%, 100%": { opacity: "0" },
          "66.667%, 83.333%": { opacity: "1" },
        },
        "gradient-background-3": {
          "0%, 58.333%, 91.667%, 100%": { opacity: "1" },
          "66.667%, 83.333%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
