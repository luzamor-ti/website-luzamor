import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores configuráveis via CMS
        // Valores padrão definidos aqui, sobrescritos por CSS variables no runtime
        primary: {
          DEFAULT: "#00B749",
          dark: "#005A23",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
        },
        accent: {
          DEFAULT: "#10b981",
        },
      },
    },
  },
};

export default config;
