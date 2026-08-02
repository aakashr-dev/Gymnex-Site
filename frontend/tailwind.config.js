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
        crimson: {
          50: '#fff1f3',
          100: '#ffe4e8',
          200: '#fecdd6',
          300: '#fda4af',
          400: '#fb7185',
          500: '#DC143C', // Primary Crimson
          600: '#FF1E42', // Vivid Glow
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        dark: {
          base: '#050505',
          surface: '#09090b',
          card: '#121218',
          cardHover: '#181824',
          muted: '#27273a',
          subtle: '#1f1f2e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'crimson-radial': 'radial-gradient(circle at center, rgba(220, 20, 60, 0.18) 0%, transparent 70%)',
        'crimson-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 30, 66, 0.25) 0%, transparent 60%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(9, 9, 11, 0.8) 0%, rgba(5, 5, 5, 0.95) 100%)',
        'smoke-texture': "url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=2000')",
      },
      boxShadow: {
        'crimson-glow': '0 0 25px -5px rgba(220, 20, 60, 0.4)',
        'crimson-sm': '0 0 12px -2px rgba(255, 30, 66, 0.3)',
        'dark-elevation': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      borderWidth: {
        '1': '1px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
