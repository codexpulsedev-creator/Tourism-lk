import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F766E",
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
          950: "#042F2E",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        brandDark: {
          DEFAULT: "#12312F",
          50: "#F4F7F7",
          100: "#E3ECEB",
          200: "#C6D7D5",
          300: "#9FBDBA",
          400: "#6B9B97",
          500: "#447874",
          600: "#2F5955",
          700: "#214240",
          800: "#183735",
          900: "#12312F",
          950: "#0A1E1D",
        },
        brandBg: "#F8FAF9",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(18, 49, 47, 0.05)",
        card: "0 8px 30px rgba(18, 49, 47, 0.07)",
        cardHover: "0 20px 40px rgba(18, 49, 47, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
