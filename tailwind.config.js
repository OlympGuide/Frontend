/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#BB4446',
        primaryRedDark: '#963638',
        primaryRedLight: '#C9696B',
        secondaryRed: '#710F0F',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
