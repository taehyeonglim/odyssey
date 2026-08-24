/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bronze: {
          50: '#faf6f0',
          100: '#f4ede0',
          200: '#e8d9c2',
          300: '#d7be9b',
          400: '#c39e73',
          500: '#ad7f50',
          600: '#946540',
          700: '#774e35',
          800: '#634030',
          900: '#52372a',
        },
        aegean: {
          50: '#f0f7fb',
          100: '#deeff6',
          200: '#c2e1ee',
          300: '#98cde3',
          400: '#67b1d3',
          500: '#4395c0',
          600: '#327aa4',
          700: '#2b6286',
          800: '#27526f',
          900: '#24455d',
          950: '#0d1c29',
        },
        terracotta: {
          500: '#c45d3e',
          600: '#aa4729',
          700: '#8c381e',
        },
        parchment: {
          100: '#faf6ee',
          200: '#f4ecdc',
          300: '#eadebe',
          800: '#231d17',
          900: '#15110d',
          950: '#0c0a07',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Pretendard"', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
