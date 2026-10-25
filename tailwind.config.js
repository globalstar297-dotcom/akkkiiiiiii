/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        akki: {
          obsidian: '#08090D',
          midnight: '#10121C',
          gold: '#D9B777',
          ivory: '#FFF4E5',
          rose: '#B77B85',
          silver: '#C5C7D0',
        },
      },
    },
  },
  plugins: [],
};
