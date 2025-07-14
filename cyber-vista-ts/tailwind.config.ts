import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class", // Enables toggling via class (for Shadcn Switch + next-themes)
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // Optional: if using /src folder
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      colors: {
        brand: {
          DEFAULT: "#06b6d4", // Tailwind cyan-500
          dark: "#0891b2",
          light: "#e0f7fa",
        },
        graphite: "#1e293b",
      },
      borderRadius: {
        xl: "1rem",
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in",
        rainbow: "rainbow 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("tailwind-scrollbar"),
    tailwindAnimate, // For framer-motion harmony
  ],
};

export default config;
