import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config = {
  darkMode: ["class"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        text: "hsl(var(--text), <alpha-value>)",
        background: "hsl(var(--background), <alpha-value>)",
        brand: {
          50: "hsl(var(--brand-50), <alpha-value>)",
          100: "hsl(var(--brand-100), <alpha-value>)",
          200: "hsl(var(--brand-200), <alpha-value>)",
          300: "hsl(var(--brand-300), <alpha-value>)",
          400: "hsl(var(--brand-400), <alpha-value>)",
          500: "hsl(var(--brand-500), <alpha-value>)",
          600: "hsl(var(--brand-600), <alpha-value>)",
          700: "hsl(var(--brand-700), <alpha-value>)",
          800: "hsl(var(--brand-800), <alpha-value>)",
          900: "hsl(var(--brand-900), <alpha-value>)",
          950: "hsl(var(--brand-950), <alpha-value>)",
        },
        accent: {
          50: "hsl(var(--accent-50), <alpha-value>)",
          100: "hsl(var(--accent-100), <alpha-value>)",
          200: "hsl(var(--accent-200), <alpha-value>)",
          300: "hsl(var(--accent-300), <alpha-value>)",
          400: "hsl(var(--accent-400), <alpha-value>)",
          500: "hsl(var(--accent-500), <alpha-value>)",
          600: "hsl(var(--accent-600), <alpha-value>)",
          700: "hsl(var(--accent-700), <alpha-value>)",
          800: "hsl(var(--accent-800), <alpha-value>)",
          900: "hsl(var(--accent-900), <alpha-value>)",
          950: "hsl(var(--accent-950), <alpha-value>)",
        },
        link: {
          DEFAULT: "hsl(var(--link), <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "var(--font-inter)", "sans-serif"],
        display: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontSize: {
        md: "0.9rem",
      },
      brightness: {
        hover: "1.125",
        active: "0.875",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        lg: "rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 8px 12px, rgba(0, 0, 0, 0.1) 0px 16px 24px, rgba(0, 0, 0, 0.1) 0px 32px 48px, rgba(0, 0, 0, 0.1) 0px 64px 96px",
        md: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        sm: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        "inset-md":
          "rgba(70, 70, 93, 0.25) 0px 8px 16px -5px inset, rgba(70, 70, 93, 0.1) 0px 25px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 6px 12px -6px inset, rgba(0, 0, 0, 0.1) 0px 15px 30px -15px inset",
        "inset-sm":
          "rgba(0, 0, 0, 0.07) 0px 1px 2px inset, rgba(0, 0, 0, 0.07) 0px 2px 4px inset, rgba(0, 0, 0, 0.07) 0px 4px 8px inset, rgba(0, 0, 0, 0.07) 0px 8px 16px inset, rgba(0, 0, 0, 0.07) 0px 16px 32px inset, rgba(0, 0, 0, 0.07) 0px 32px 64px inset",
        "inverse-md":
          "rgba(0, 0, 0, 0.07) 0px -1px 2px, rgba(0, 0, 0, 0.07) 0px -2px 4px, rgba(0, 0, 0, 0.07) 0px -4px 8px, rgba(0, 0, 0, 0.07) 0px -8px 16px, rgba(0, 0, 0, 0.07) 0px -16px 32px, rgba(0, 0, 0, 0.07) 0px -32px 64px",
        "left-lg":
          "rgba(0, 0, 0, 0.1) -2px 0px 3px, rgba(0, 0, 0, 0.1) -4px 0px 6px, rgba(0, 0, 0, 0.1) -8px 0px 12px, rgba(0, 0, 0, 0.1) -16px 0px 24px, rgba(0, 0, 0, 0.1) -32px 0px 48px, rgba(0, 0, 0, 0.1) -64px 0px 96px",
        "right-lg":
          "rgba(0, 0, 0, 0.1) 2px 0px 3px, rgba(0, 0, 0, 0.1) 4px 0px 6px, rgba(0, 0, 0, 0.1) 8px 0px 12px, rgba(0, 0, 0, 0.1) 16px 0px 24px, rgba(0, 0, 0, 0.1) 32px 0px 48px, rgba(0, 0, 0, 0.1) 64px 0px 96px",
      },
      transitionProperty: {
        hover:
          "background, box-shadow, opacity, border-radius, transform, filter",
        raise: "background, opacity, border-radius, transform, filter",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    ({ addUtilities }: { addUtilities: PluginAPI["addUtilities"] }) => {
      addUtilities({
        ".disabled": {
          "@apply pointer-events-none select-none opacity-50 brightness-75": {},
        },
        ".hover-xs": {
          "@apply transition-hover hover:z-10 hover:scale-[1.025] hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".hover-sm": {
          "@apply transition-hover hover:z-10 hover:scale-105 hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".hover-md": {
          "@apply transition-hover hover:z-10 hover:scale-110 hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".hover-lg": {
          "@apply transition-hover hover:z-10 hover:scale-125 hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".raise-xs": {
          "@apply transition-raise hover:z-10 hover:scale-[1.025] hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".raise-sm": {
          "@apply transition-raise hover:z-10 hover:scale-105 hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".raise-md": {
          "@apply transition-raise hover:z-10 hover:scale-110 hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".raise-lg": {
          "@apply transition-raise hover:z-10 hover:scale-125 hover:rounded-sm hover:shadow-lg hover:brightness-hover":
            {},
        },
        ".active-sm": {
          "@apply active:scale-95 active:rounded-none active:shadow-inset-sm active:brightness-active":
            {},
        },
        ".active-md": {
          "@apply active:scale-[0.985] active:rounded-none active:shadow-inset-sm active:brightness-active":
            {},
        },
        ".active-lg": {
          "@apply active:scale-100 active:rounded-none active:shadow-inset-sm active:brightness-active":
            {},
        },
      });
    },
  ],
} satisfies Config;

export default config;
