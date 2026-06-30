import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F04A2A",
          strong: "#D93E22",
          foreground: "#ffffff",
        },
        science: {
          cyan: "#10B6CF",
          cyanDark: "#079FB7",
          cyanLight: "#52D3E6",
          strip: "#AFC5C7",
        },
        ink: {
          DEFAULT: "#333333",
          muted: "#666666",
          soft: "#8A8A8A",
          bg: "#F4F4F4",
          surface: "#FFFFFF",
          border: "#E8E8E8",
          borderStrong: "#B8C7CA",
        },
        sector: {
          alimentos: "#52D3E6",
          mineria: "#F04A2A",
          farmaceutica: "#333333",
          aguas: "#10B6CF",
          ambiental: "#079FB7",
          academia: "#AFC5C7",
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
