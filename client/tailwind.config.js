/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1720px',
      },
      colors: {
        accent: {
          1: 'hsl(var(--color-accent1) / <alpha-value>)',
          2: 'hsl(var(--color-accent2) / <alpha-value>)',
          3: 'hsl(var(--color-accent3) / <alpha-value>)',
        },
        bg: 'hsl(var(--color-bg) / <alpha-value>)',
        text: {
          1: 'hsl(var(--color-text1) / <alpha-value>)',
          2: 'hsl(var(--color-text2) / <alpha-value>)',
          3: 'hsl(var(--color-text3) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
