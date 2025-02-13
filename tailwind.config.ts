import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontSize: {
        xxs: "0.5rem",
      },
      colors: {
        background: "var(--background)",
        border: "#4B5258",
        foreground: "#3F464C",
        font: "#FFFFFF",
        "font-secondary": "#878B8F",
        "font-secondary-gray": "#787D82",
      },
    },
  },
  plugins: [],
} satisfies Config;
