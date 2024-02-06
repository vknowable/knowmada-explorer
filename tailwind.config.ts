import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-grotesk)'],
      },
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
      },
      backgroundSize: {
        'dots': '180%',
      },
      backgroundColor: {
        'cyan': '#00FFFF',
        'dark': '#0d0d0d',
      },
      stroke: {
        'yellow': 'yellow',
      },
      borderColor: {
        'light': '#e5e7eb',
        'cyan': '#00FFFF',
      },
      textColor: {
        'yellow': '#FFFF00',
        'cyan': '#00FFFF',
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay"),],
};
export default config;
