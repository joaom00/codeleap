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
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#7695EC',
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
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
