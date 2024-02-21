import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsla(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
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
      // fontFamily: {
      //   sans: ['var(--font-grotesk)'],
      // },
      backgroundImage: {
        'dots': "url('/assets/black-bg.png')",
        'logo-symbol': "url('/assets/namada-logo-symbol.svg')",
        'logo-wordmark': "url('/assets/namada-logo-wordmark.svg')",
        'nam01': "url('/assets/Nam_01.svg')",
        'nam02': "url('/assets/Nam_02.svg')",
        'nam03': "url('/assets/Nam_03.svg')",
        'nam04': "url('/assets/Nam_04.svg')",
        'nam05': "url('/assets/Nam_05.svg')",
        'nam06': "url('/assets/Nam_06.svg')",
        'nam07': "url('/assets/Nam_07.svg')",
        'nam08': "url('/assets/Nam_08.svg')",
      },
      backgroundSize: {
        'dots': '40%',
      },
      // backgroundColor: {
      //   'cyan': '#00FFFF',
      //   'dark': '#0d0d0d',
      // },
      // stroke: {
      //   'yellow': 'yellow',
      // },
      // borderColor: {
      //   'light': '#e5e7eb',
      //   'cyan': '#00FFFF',
      // },
      // textColor: {
      //   'yellow': '#FFFF00',
      //   'cyan': '#00FFFF',
      // },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    require("tailwindcss-animate"),
    require('tailwind-scrollbar'),
  ],
};
export default config;
