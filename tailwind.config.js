const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(224 76% 69% / <alpha-value>)',
          400: 'hsl(224 76% 75% / <alpha-value>)',
          500: 'hsl(224 76% 69% / <alpha-value>)',
        },
        gray: {
          1: 'hsl(var(--gray1) / <alpha-value>)',
          2: 'hsl(var(--gray2) / <alpha-value>)',
          3: 'hsl(var(--gray3) / <alpha-value>)',
          4: 'hsl(var(--gray4) / <alpha-value>)',
          5: 'hsl(var(--gray5) / <alpha-value>)',
          6: 'hsl(var(--gray6) / <alpha-value>)',
          7: 'hsl(var(--gray7) / <alpha-value>)',
          8: 'hsl(var(--gray8) / <alpha-value>)',
          9: 'hsl(var(--gray9) / <alpha-value>)',
          10: 'hsl(var(--gray10) / <alpha-value>)',
          11: 'hsl(var(--gray11) / <alpha-value>)',
          12: 'hsl(var(--gray12) / <alpha-value>)',
        },
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        overlayHide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentHide: {
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayHide: 'overlayHide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
