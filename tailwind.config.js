/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['mundial', 'sans-serif'],
      pixel: ['lores-12', 'sans-serif'],
    },
    extend: {
      colors: {
        kitchensKelly: {
          DEFAULT: '#0EB747',
          light: '#4AC975',
          dark: '#0B9239',
        },
        leafyGreen: { DEFAULT: '#0F2C15', dark: '#08200D', light: '#244E2C' },
        whippedCream: {
          DEFAULT: '#F8F5EC',
          dark: '#EEEADE',
        },
      },
      animation: {
        block: 'showBlock 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
      },
      keyframes: {
        showBlock: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
