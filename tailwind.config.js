/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'pink-pastel': '#FFD6E0',
        'lavender': '#C9B8FF',
        'cream': '#FFF5E4',
        'peach': '#FFCBA4',
        'rose-gold': '#E8A598',
        'gold': '#FFD700',
        'deep-pink': '#FF6B9D',
        'soft-purple': '#B8A9C9',
      },
      fontFamily: {
        cursive: ["'Dancing Script'", 'cursive'],
        elegant: ["'Playfair Display'", 'serif'],
        clean: ["'Inter'", 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'flicker': 'flicker 0.3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        sparkle: { '0%,100%': { opacity: '0.3', transform: 'scale(0.8)' }, '50%': { opacity: '1', transform: 'scale(1.2)' } },
        flicker: { '0%,100%': { transform: 'scaleY(1) scaleX(1)' }, '25%': { transform: 'scaleY(1.1) scaleX(0.9)' }, '50%': { transform: 'scaleY(0.9) scaleX(1.1)' }, '75%': { transform: 'scaleY(1.05) scaleX(0.95)' } },
        twinkle: { '0%,100%': { opacity: '0.3' }, '50%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
}
