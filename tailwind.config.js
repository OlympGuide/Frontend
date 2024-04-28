/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#BB4446',
        primaryRedLight: 'rgb(202,109,111)',
        secondaryRed: '#710F0F',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
